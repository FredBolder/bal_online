let blueNoiseBuffer = null;
let brownNoiseBuffer = null;
let crashNoiseBuffer = null;
let hihatNoiseBuffer = null;
let pinkNoiseBuffer = null;
let rideNoiseBuffer = null;
let violetNoiseBuffer = null;
let whiteNoiseBuffer = null;

export function clearCrashNoiseBuffer() {
    crashNoiseBuffer = null;
}

export function clearHihatNoiseBuffer() {
    hihatNoiseBuffer = null;
}

export function clearRideNoiseBuffer() {
    rideNoiseBuffer = null;
}

function createBlueNoiseBuffer(audioCtx, durationInSeconds) {
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

function createBrownNoiseBuffer(audioCtx, durationInSeconds) {
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

// --- helpers (your existing functions) ---
function xfnv1a(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
}
function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

// --- unified metal noise generator with lots of options ---
export function createMetalNoiseBuffer(audioCtx, durationInSeconds, options = {}) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = Math.max(1, Math.floor(durationInSeconds * sampleRate));
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    // default options (comprehensive)
    const defaults = {
        seed: null,

        // strike / hit envelope
        strikeTime: 0.02,       // initial hit window (s)
        noiseDecay: 0.12,       // white/noise strike decay (s)

        // overall spectral control
        brightness: 0.7,        // 0..1 : bias toward highs (1 = bright)
        fMin: 200,              // lowest partial (Hz)
        fMax: 14000,            // highest partial (Hz)

        // component levels
        scrapeLevel: 0.35,      // 0..1: high-frequency scrape / sizzle
        noiseWeight: 0.9,       // how much the raw noise/strike contributes
        combWeight: 0.6,        // weight of comb resonators
        partialWeight: 0.9,     // weight of decaying partial sines
        ringModDepth: 0.25,     // subtle ring modulation depth

        // counts and complexity
        combCount: 8,
        partialCount: 60,

        // comb delay range (seconds)
        combMinDelay: 0.002,    // 0.002 ~ 500 Hz
        combMaxDelay: 0.018,    // 0.018 ~ 55 Hz

        // comb behavior ranges (feedback/damp)
        combFeedbackMin: 0.5,
        combFeedbackMax: 0.85,
        combDampMin: 0.15,
        combDampMax: 0.6,

        // partial decay shaping
        partialBaseDecayMin: 0.12,
        partialBaseDecayMax: 1.8,

        // optionally force some low modal frequencies (Hz)
        forcedModes: [],        // e.g. [180, 330, 450]

        // misc
        overallDecay: 1.0,
        normalize: true,

        // extra color
        ringFreqMin: 2000,
        ringFreqMax: 8000
    };

    // merge
    const opt = Object.assign({}, defaults, options);

    // seeded RNG
    let rng;
    if (opt.seed !== undefined && opt.seed !== null) {
        let seedInt;
        if (typeof opt.seed === 'string') seedInt = xfnv1a(opt.seed.toString());
        else seedInt = (opt.seed >>> 0) || xfnv1a(String(opt.seed));
        rng = mulberry32(seedInt);
    } else {
        rng = Math.random;
    }

    // --- strike / envelope arrays ---
    const strikeSamples = Math.max(1, Math.floor(opt.strikeTime * sampleRate));
    const strikeEnv = new Float32Array(bufferSize);
    for (let i = 0; i < bufferSize; i++) {
        if (i < strikeSamples) {
            const t = i / strikeSamples;
            strikeEnv[i] = Math.exp(-t * 6); // quick-ish burst
        } else {
            strikeEnv[i] = 0;
        }
    }

    // optional noise longer tail envelope (for "woomph" body)
    const noiseDecaySamples = Math.max(1, Math.floor(opt.noiseDecay * sampleRate));
    const noiseEnv = new Float32Array(bufferSize);
    for (let i = 0; i < bufferSize; i++) {
        const t = i / Math.max(1, noiseDecaySamples);
        noiseEnv[i] = Math.exp(-t * 6); // tail for raw noise
    }

    // --- comb filter bank setup ---
    const combs = [];
    // include forcedModes first (if any)
    for (let fm = 0; fm < (opt.forcedModes || []).length; fm++) {
        const freq = opt.forcedModes[fm];
        if (!isFinite(freq) || freq <= 0) continue;
        const delaySec = 1 / freq;
        const delaySamples = Math.max(1, Math.floor(delaySec * sampleRate));
        combs.push({
            buf: new Float32Array(delaySamples + 1),
            bufLen: delaySamples + 1,
            writeIndex: 0,
            delaySamples,
            feedback: Math.min(0.98, opt.combFeedbackMax),
            damp: Math.min(0.9, opt.combDampMax),
            lastOut: 0
        });
    }

    for (let c = 0; c < opt.combCount; c++) {
        // bias delays slightly by brightness: brighter => slightly shorter delays (higher freq modes)
        const r = rng();
        const delaySec = opt.combMinDelay + (opt.combMaxDelay - opt.combMinDelay) * Math.pow(r, 0.9) * (1 - 0.35 * opt.brightness);
        const delaySamples = Math.max(1, Math.floor(delaySec * sampleRate));
        const feedback = opt.combFeedbackMin + rng() * (opt.combFeedbackMax - opt.combFeedbackMin);
        const damp = opt.combDampMin + rng() * (opt.combDampMax - opt.combDampMin);
        combs.push({
            buf: new Float32Array(delaySamples + 1),
            bufLen: delaySamples + 1,
            writeIndex: 0,
            delaySamples,
            feedback,
            damp,
            lastOut: 0
        });
    }

    // --- partials (decaying sines) setup ---
    const partials = [];
    const fMin = opt.fMin;
    const fMax = opt.fMax;
    for (let p = 0; p < opt.partialCount; p++) {
        const r = rng();

        // frequency distribution shaped by brightness:
        // brightness 1 => favors highs, brightness 0 => favors lows
        const shape = Math.max(0.01, 1.5 - opt.brightness); // 1.5..0.5
        const freq = fMin + (fMax - fMin) * Math.pow(r, shape);

        const phase = rng() * Math.PI * 2;

        // decay: slower for low frequencies
        let baseDecay = opt.partialBaseDecayMin + rng() * (opt.partialBaseDecayMax - opt.partialBaseDecayMin);
        if (freq < 400) baseDecay *= 2.2;
        else if (freq < 800) baseDecay *= 1.6;

        const decayTime = baseDecay * (1.4 - Math.min(1, freq / fMax)); // slightly longer for lows
        const phaseInc = 2 * Math.PI * freq / sampleRate;
        const decayPerSample = Math.exp(-1 / (decayTime * sampleRate));

        // amplitude: favor low-mid body and shimmer region
        let amp = (0.7 + rng() * 1.3);
        if (freq < 500) amp *= 2.0;         // strong body
        else if (freq < 1000) amp *= 1.4;   // mid body
        // shimmer around 3-8kHz
        amp *= 1.0 - Math.abs((freq - 5000) / 12000);
        amp *= 0.6; // global scaling
        partials.push({
            phase, phaseInc, amp, decayPerSample, currentAmp: amp
        });
    }

    // ring-modulator base
    const ringFreq = opt.ringFreqMin + rng() * (opt.ringFreqMax - opt.ringFreqMin);
    let ringPhase = rng() * Math.PI * 2;
    const ringInc = 2 * Math.PI * ringFreq / sampleRate;

    // --- main synthesis loop ---
    let maxAmp = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = rng() * 2 - 1;
        const noiseStrike = white * strikeEnv[i] * noiseEnv[i];

        // persistent scrape noise (decays faster for lower brightness)
        const scrape = (rng() * 2 - 1) * opt.scrapeLevel * (0.7 + 0.3 * rng());
        // scrape envelope: faster when brightness is high, slower when darker
        const scrapeDecaySec = 0.02 + (0.6 * (1 - opt.brightness)); // 0.02..0.62
        const scrapeEnv = Math.exp(-i / (sampleRate * scrapeDecaySec));
        const scrapeVal = scrape * scrapeEnv;

        // combine initial input (strike + scrape)
        const input = noiseStrike + scrapeVal;

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

        // ring modulation
        const ring = Math.sin(ringPhase);
        ringPhase += ringInc;
        if (ringPhase > Math.PI * 2) ringPhase -= Math.PI * 2;

        const out =
            opt.noiseWeight * input +
            (opt.combWeight * combOutSum + opt.partialWeight * partialSum) * (1 + opt.ringModDepth * ring) * opt.overallDecay;

        data[i] = out;
        const absv = Math.abs(out);
        if (absv > maxAmp) maxAmp = absv;
    }

    // normalize
    if (opt.normalize && maxAmp > 0) {
        const norm = 0.98 / maxAmp;
        for (let i = 0; i < bufferSize; i++) data[i] *= norm;
    }

    return buffer;
}

export function getMetalNoisePreset(instrument = "crash", flavor = "default") {
    const common = {
        seed: instrument + (flavor ? "_" + flavor : ""),
        brightness: 0.6,
        scrapeLevel: 0.35,
        combCount: 8,
        partialCount: 60,
        fMin: 200,
        fMax: 14000,
        combMinDelay: 0.002,
        combMaxDelay: 0.018,
        noiseDecay: 0.12,
        strikeTime: 0.02,
        overallDecay: 1.0,
        combFeedbackMin: 0.5,
        combFeedbackMax: 0.85,
        combDampMin: 0.15,
        combDampMax: 0.6,
        forcedModes: []
    };

    const presets = {
        hihat: {
            ...common,
            brightness: 0.95,
            scrapeLevel: 0.9,
            combCount: 4,
            partialCount: 40,
            fMin: 2000,
            fMax: 14000,
            combMinDelay: 0.0005,
            combMaxDelay: 0.004,
            noiseDecay: 0.06,
            strikeTime: 0.008,
            combFeedbackMin: 0.35,
            combFeedbackMax: 0.6,
            forcedModes: []
        },

        splash: {
            ...common,
            brightness: 0.85,
            scrapeLevel: 0.5,
            combCount: 6,
            partialCount: 44,
            fMin: 400,
            fMax: 14000,
            combMinDelay: 0.001,
            combMaxDelay: 0.012,
            noiseDecay: 0.08,
            strikeTime: 0.01,
            forcedModes: [300, 520]
        },

        ride: {
            ...common,
            brightness: 0.6,
            scrapeLevel: 0.45,
            combCount: 12,
            partialCount: 80,
            fMin: 300,
            fMax: 12000,
            combMinDelay: 0.002,
            combMaxDelay: 0.02,
            noiseDecay: 0.45,
            strikeTime: 0.02,
            combFeedbackMin: 0.5,
            combFeedbackMax: 0.9,
            forcedModes: [220, 360, 540]
        },

        crash: {
            ...common,
            brightness: 0.55,
            scrapeLevel: 0.3,
            combCount: 12,
            partialCount: 100,
            fMin: 200,
            fMax: 14000,
            combMinDelay: 0.002,
            combMaxDelay: 0.018,
            noiseDecay: 0.18,
            strikeTime: 0.02,
            combFeedbackMin: 0.55,
            combFeedbackMax: 0.9,
            forcedModes: [180, 330, 500]
        }
    };

    return presets[instrument] || presets.crash;
}


function createPinkNoiseBuffer(audioCtx, durationInSeconds) {
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

function createVioletNoiseBuffer(audioCtx, durationInSeconds) {
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

function createWhiteNoiseBuffer(audioCtx, durationInSeconds) {
    const sampleRate = audioCtx.sampleRate;
    const bufferSize = durationInSeconds * sampleRate;
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // range: -1 to +1
    }
    return buffer;
}

export function getBlueNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (blueNoiseBuffer === null) {
        blueNoiseBuffer = createBlueNoiseBuffer(audioCtx, durationInSeconds);
    }
    return blueNoiseBuffer;
}

export function getBrownNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (brownNoiseBuffer === null) {
        brownNoiseBuffer = createBrownNoiseBuffer(audioCtx, durationInSeconds);
    }
    return brownNoiseBuffer;
}

export function getCrashNoiseBuffer(audioCtx, durationInSeconds = 3) {
    if (crashNoiseBuffer === null) {
        const opts = getMetalNoisePreset("crash");
        crashNoiseBuffer = createMetalNoiseBuffer(audioCtx, durationInSeconds, opts);
    }
    return crashNoiseBuffer;
}

export function getHihatNoiseBuffer(audioCtx, durationInSeconds = 1) {
    if (hihatNoiseBuffer === null) {
        const opts = getMetalNoisePreset("hihat");
        hihatNoiseBuffer = createMetalNoiseBuffer(audioCtx, durationInSeconds, opts);
    }
    return hihatNoiseBuffer;
}

export function getPinkNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (pinkNoiseBuffer === null) {
        pinkNoiseBuffer = createPinkNoiseBuffer(audioCtx, durationInSeconds);
    }
    return pinkNoiseBuffer;
}

export function getRideNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (rideNoiseBuffer === null) {
        const opts = getMetalNoisePreset("ride");
        rideNoiseBuffer = createMetalNoiseBuffer(audioCtx, durationInSeconds, opts);
    }
    return rideNoiseBuffer;
}

export function getVioletNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (violetNoiseBuffer === null) {
        violetNoiseBuffer = createVioletNoiseBuffer(audioCtx, durationInSeconds);
    }
    return violetNoiseBuffer;
}

export function getWhiteNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (whiteNoiseBuffer === null) {
        whiteNoiseBuffer = createWhiteNoiseBuffer(audioCtx, durationInSeconds);
    }
    return whiteNoiseBuffer;
}


