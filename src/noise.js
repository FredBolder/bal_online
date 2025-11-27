let blueNoiseBuffer = null;
let brownNoiseBuffer = null;
let metalNoiseBuffer = null;
let pinkNoiseBuffer = null;
let violetNoiseBuffer = null;
let whiteNoiseBuffer = null;

function createBlueNoiseBuffer(audioCtx, durationInSeconds = 1) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let lastWhite = 0.0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // difference emphasizes high frequencies
        data[i] = white - lastWhite;
        lastWhite = white;
    }
    // normalize to ~ -1..1 range
    let maxAmp = 0;
    for (let i = 0; i < bufferSize; i++) {
        if (Math.abs(data[i]) > maxAmp) maxAmp = Math.abs(data[i]);
    }
    if (maxAmp > 0) {
        for (let i = 0; i < bufferSize; i++) {
            data[i] /= maxAmp;
        }
    }
    return buffer;
}

function createBrownNoiseBuffer(audioCtx, durationInSeconds = 1) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // simple integrator, with slight damping to prevent drift
        lastOut = (lastOut + (0.02 * white)) / 1.02;
        data[i] = lastOut * 3.5; // scale to roughly -1..1
    }
    return buffer;
}

// --- small helpers: string -> seed and Mulberry32 PRNG ---
function xfnv1a(str) {
    // 32-bit FNV-1a hash (returns unsigned 32-bit int)
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
}
function mulberry32(seed) {
    // seed should be a 32-bit integer
    let t = seed >>> 0;
    return function () {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

// createMetalNoiseBuffer - generates a cymbal-like metallic noise AudioBuffer
// audioCtx : AudioContext
// durationInSeconds : length of buffer
// options (optional):
//   strikeTime: attack/decay for the initial hit (s) (default 0.02)
//   scrapeLevel: amount of high-frequency "scrape" noise (0..1) (default 0.6)
//   combCount: number of comb resonators (default 6)
//   partialCount: number of decaying sine partials (default 40)
//   brightness: (0..1) bias toward brighter (more high partials) (default 0.7)
//   decay: overall decay multiplier for resonators (0..1) (default 1.0)
export function createMetalNoiseBuffer(audioCtx, durationInSeconds = 1, options = {}) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = Math.max(1, Math.floor(durationInSeconds * sampleRate));
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // options (defaults)
    const strikeTime = options.strikeTime ?? 0.02;
    const scrapeLevel = options.scrapeLevel ?? 0.6;
    const combCount = options.combCount ?? 6;
    const partialCount = options.partialCount ?? 40;
    const brightness = ('brightness' in options) ? options.brightness : 0.7;
    const overallDecay = options.decay ?? 1.0;

    // seeded RNG (either from options.seed or fallback to Math.random)
    let rng;
    if (options.seed !== undefined && options.seed !== null) {
        let seedInt;
        if (typeof options.seed === 'string') {
            seedInt = xfnv1a(options.seed.toString());
        } else {
            // number -> convert to 32-bit unsigned
            seedInt = (options.seed >>> 0) || xfnv1a(String(options.seed));
        }
        rng = mulberry32(seedInt);
    } else {
        rng = Math.random;
    }

    // Precompute strike envelope (fast attack, exponential-ish decay)
    const strikeSamples = Math.max(1, Math.floor(strikeTime * sampleRate));
    const strikeEnv = new Float32Array(bufferSize);
    for (let i = 0; i < bufferSize; i++) {
        if (i < strikeSamples) {
            const t = i / strikeSamples;
            strikeEnv[i] = Math.exp(-t * 6);
        } else {
            strikeEnv[i] = 0;
        }
    }

    // --- Comb filter bank setup (deterministic via rng) ---
    const combs = [];
    for (let c = 0; c < combCount; c++) {
        const minDelay = 0.0006;
        const maxDelay = 0.010;
        // use rng instead of Math.random
        const r = rng();
        const delaySec = minDelay + (maxDelay - minDelay) * Math.pow(r, 0.8) * (0.5 + brightness * 0.5);
        const delaySamples = Math.max(1, Math.floor(delaySec * sampleRate));
        const buf = new Float32Array(delaySamples + 1);
        const feedback = 0.65 + rng() * 0.33;
        const damp = 0.2 + rng() * 0.6;
        combs.push({
            buf,
            bufLen: buf.length,
            writeIndex: 0,
            delaySamples,
            feedback,
            damp,
            lastOut: 0
        });
    }

    // --- Partial (decaying sine) bank setup (deterministic) ---
    const partials = [];
    const fMin = 800;
    const fMax = 14000;
    for (let p = 0; p < partialCount; p++) {
        const r = rng();
        const freq = fMin + (fMax - fMin) * Math.pow(r, 0.3 + 0.7 * brightness);
        const phase = rng() * Math.PI * 2;
        const baseDecay = 0.08 + rng() * 1.4;
        const decayTime = baseDecay * (1.2 - Math.min(1, freq / fMax));
        const amp = (0.6 + rng() * 0.8) * (1.0 - Math.abs((freq - 4000) / 8000)) * 0.7;
        const phaseInc = 2 * Math.PI * freq / sampleRate;
        const decayPerSample = Math.exp(-1 / (decayTime * sampleRate));
        partials.push({
            phase,
            phaseInc,
            amp,
            decayPerSample,
            currentAmp: amp
        });
    }

    // Ring/modulator deterministic init
    const ringFreq = 3000 + rng() * 8000;
    let ringPhase = rng() * Math.PI * 2;
    const ringInc = 2 * Math.PI * ringFreq / sampleRate;

    // Main sample loop: deterministic because we only use rng()
    let maxAmp = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = rng() * 2 - 1;
        const noiseStrike = white * strikeEnv[i];

        // persistent scrape noise (deterministic)
        const scrape = (rng() * 2 - 1) * scrapeLevel * (0.8 + 0.2 * rng()) * (1 - Math.min(1, i / (0.06 * sampleRate)));
        const scrapeEnv = Math.exp(-i / (sampleRate * (0.6 + 0.6 * (1 - brightness))));

        const input = noiseStrike + scrape * scrapeEnv;

        // comb bank
        let combOutSum = 0;
        for (let c = 0; c < combs.length; c++) {
            const comb = combs[c];
            const readIndex = (comb.writeIndex + 1) % comb.bufLen;
            let delayed = comb.buf[readIndex];

            delayed = comb.lastOut * (1 - comb.damp) + delayed * comb.damp;
            comb.lastOut = delayed;

            combOutSum += delayed;

            const fbVal = input + delayed * comb.feedback;
            comb.buf[comb.writeIndex] = fbVal;
            comb.writeIndex = (comb.writeIndex + 1) % comb.bufLen;
        }

        // partials
        let partialSum = 0;
        for (let p = 0; p < partials.length; p++) {
            const part = partials[p];
            const s = Math.sin(part.phase);
            partialSum += s * part.currentAmp;
            part.phase += part.phaseInc;
            if (part.phase > Math.PI * 2) part.phase -= Math.PI * 2;
            part.currentAmp *= part.decayPerSample;
        }

        const ring = Math.sin(ringPhase);
        ringPhase += ringInc;
        if (ringPhase > Math.PI * 2) ringPhase -= Math.PI * 2;

        const noiseWeight = 0.9;
        const combWeight = 0.6 * overallDecay;
        const partialWeight = 0.9 * overallDecay;
        const out = noiseWeight * input + (combWeight * combOutSum + partialWeight * partialSum) * (1 + 0.25 * ring);

        data[i] = out;
        const absv = Math.abs(out);
        if (absv > maxAmp) maxAmp = absv;
    }

    // normalize
    if (maxAmp > 0) {
        const norm = 0.98 / maxAmp;
        for (let i = 0; i < bufferSize; i++) data[i] *= norm;
    }

    return buffer;
}

function createPinkNoiseBuffer(audioCtx, durationInSeconds = 1) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // Paul Kellet's refined method for pink noise
    // https://www.firstpr.com.au/dsp/pink-noise/
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        // normalize to -1..1
        data[i] = pink * 0.11;
    }
    return buffer;
}

function createVioletNoiseBuffer(audioCtx, durationInSeconds = 1) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    let lastWhite = 0.0;
    let lastDiff = 0.0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const diff = white - lastWhite;       // 1st derivative → blue noise
        const violet = diff - lastDiff;       // 2nd derivative → violet noise
        data[i] = violet;
        lastWhite = white;
        lastDiff = diff;
    }
    // normalize to ~ -1..1
    let maxAmp = 0;
    for (let i = 0; i < bufferSize; i++) {
        if (Math.abs(data[i]) > maxAmp) maxAmp = Math.abs(data[i]);
    }
    if (maxAmp > 0) {
        for (let i = 0; i < bufferSize; i++) {
            data[i] /= maxAmp;
        }
    }
    return buffer;
}

function createWhiteNoiseBuffer(audioCtx, durationInSeconds = 1) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // range: -1 to +1
    }
    return buffer;
}

export function getBlueNoiseBuffer(audioCtx) {
    if (blueNoiseBuffer === null) {
        blueNoiseBuffer = createBlueNoiseBuffer(audioCtx);
    }
    return blueNoiseBuffer;
}

export function getBrownNoiseBuffer(audioCtx) {
    if (brownNoiseBuffer === null) {
        brownNoiseBuffer = createBrownNoiseBuffer(audioCtx);
    }
    return brownNoiseBuffer;
}

export function clearMetalNoiseBuffer() {
    metalNoiseBuffer = null;
}

export function getMetalNoiseBuffer(audioCtx) {
    if (metalNoiseBuffer === null) {
        metalNoiseBuffer = createMetalNoiseBuffer(audioCtx, 2, {
            brightness: 0.7, // 0.7
            combCount: 6, // 6
            decay: 1, // 1
            partialCount: 40, // 40
            scrapeLevel: 0.6, // 0.6
            seed: 12345, // 12345
            strikeTime: 0.02, // 0.02
        });
    }
    return metalNoiseBuffer;
}

export function getPinkNoiseBuffer(audioCtx) {
    if (pinkNoiseBuffer === null) {
        pinkNoiseBuffer = createPinkNoiseBuffer(audioCtx);
    }
    return pinkNoiseBuffer;
}

export function getVioletNoiseBuffer(audioCtx) {
    if (violetNoiseBuffer === null) {
        violetNoiseBuffer = createVioletNoiseBuffer(audioCtx);
    }
    return violetNoiseBuffer;
}

export function getWhiteNoiseBuffer(audioCtx) {
    if (whiteNoiseBuffer === null) {
        whiteNoiseBuffer = createWhiteNoiseBuffer(audioCtx);
    }
    return whiteNoiseBuffer;
}


