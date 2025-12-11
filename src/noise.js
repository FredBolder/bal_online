let blueNoiseBuffer = null;
let brownNoiseBuffer = null;
let crashNoiseBuffer = null;
let crashNoiseRecipe = null;
let hihatNoiseBuffer = null;
let hihatNoiseRecipe = null;
let pinkNoiseBuffer = null;
let rideNoiseBuffer = null;
let rideNoiseRecipe = null;
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

// Functions for metal noise
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

// Simple sine lookup table for performance
const SINE_LUT_BITS = 14;
const SINE_LUT_SIZE = 1 << SINE_LUT_BITS;
const sineLut = (() => {
    const a = new Float32Array(SINE_LUT_SIZE);
    for (let i = 0; i < SINE_LUT_SIZE; i++) {
        a[i] = Math.sin((i / SINE_LUT_SIZE) * (2 * Math.PI));
    }
    return a;
})();
function fastSin(phase) {
    // phase assumed in [0, 2π)
    const idx = (phase / (2 * Math.PI)) * SINE_LUT_SIZE;
    const idx0 = idx | 0;
    return sineLut[idx0 & (SINE_LUT_SIZE - 1)];
}

/**
 * Generate (or retrieve from cache) a “recipe” for the metal noise.
 * This contains all static parameters needed to synthesize the noise deterministically.
 * @param {object} options
 * @returns {object} recipe
 */
export function getMetalNoiseRecipe(options = {}) {
    // Merge with defaults
    const defaults = {
        seed: null,
        strikeTime: 0.02,
        noiseDecay: 0.12,
        brightness: 0.7,
        fMin: 200,
        fMax: 14000,
        scrapeLevel: 0.35,
        noiseWeight: 0.9,
        combWeight: 0.6,
        partialWeight: 0.9,
        ringModDepth: 0.25,
        combCount: 8,
        partialCount: 60,
        combMinDelay: 0.002,
        combMaxDelay: 0.018,
        combFeedbackMin: 0.5,
        combFeedbackMax: 0.85,
        combDampMin: 0.15,
        combDampMax: 0.6,
        partialBaseDecayMin: 0.12,
        partialBaseDecayMax: 1.8,
        forcedModes: [],
        overallDecay: 1.0,
        normalize: true,
        ringFreqMin: 2000,
        ringFreqMax: 8000
    };
    const opt = Object.assign({}, defaults, options);

    // Seeded RNG
    let rng;
    if (opt.seed !== undefined && opt.seed !== null) {
        let seedInt;
        if (typeof opt.seed === 'string') seedInt = xfnv1a(opt.seed.toString());
        else seedInt = (opt.seed >>> 0) || xfnv1a(String(opt.seed));
        rng = mulberry32(seedInt);
    } else {
        rng = Math.random;
    }

    const recipe = {
        opt,
        // these will be filled below
        strikeSamples: null,
        noiseDecaySamples: null,
        combs: [],
        partials: [],
        ringFreq: null
    };

    // compute sample counts (per sample-rate; but sample-rate will come from AudioContext)
    recipe.strikeTime = opt.strikeTime;
    recipe.noiseDecay = opt.noiseDecay;

    // combs
    for (const fm of opt.forcedModes) {
        if (!isFinite(fm) || fm <= 0) continue;
        const delaySec = 1 / fm;
        recipe.combs.push({ forced: true, delaySec, feedback: Math.min(0.98, opt.combFeedbackMax), damp: Math.min(0.9, opt.combDampMax) });
    }
    for (let c = 0; c < opt.combCount; c++) {
        const r = rng();
        const delaySec = opt.combMinDelay + (opt.combMaxDelay - opt.combMinDelay) * Math.pow(r, 0.9) * (1 - 0.35 * opt.brightness);
        const feedback = opt.combFeedbackMin + rng() * (opt.combFeedbackMax - opt.combFeedbackMin);
        const damp = opt.combDampMin + rng() * (opt.combDampMax - opt.combDampMin);
        recipe.combs.push({ forced: false, delaySec, feedback, damp });
    }

    // partials
    for (let p = 0; p < opt.partialCount; p++) {
        const r = rng();
        const shape = Math.max(0.01, 1.5 - opt.brightness);
        const freq = opt.fMin + (opt.fMax - opt.fMin) * Math.pow(r, shape);
        const phase0 = rng() * Math.PI * 2;

        let baseDecay = opt.partialBaseDecayMin + rng() * (opt.partialBaseDecayMax - opt.partialBaseDecayMin);
        if (freq < 400) baseDecay *= 2.2;
        else if (freq < 800) baseDecay *= 1.6;

        const decayTime = baseDecay * (1.4 - Math.min(1, freq / opt.fMax));
        const amp0 = (0.7 + rng() * 1.3) * 0.6 * (1.0 - Math.abs((freq - 5000) / 12000));
        recipe.partials.push({ freq, phase0, amp0, decayTime });
    }

    // ring mod
    recipe.ringFreq = opt.ringFreqMin + rng() * (opt.ringFreqMax - opt.ringFreqMin);

    return recipe;
}

/**
 * Synthesize an AudioBuffer from a recipe — fast.
 * @param {AudioContext} audioCtx
 * @param {object} recipe — from getMetalNoiseRecipe
 * @returns {AudioBuffer}
 */
export function buildMetalNoiseBuffer(audioCtx, recipe) {
    const sampleRate = audioCtx.sampleRate;
    const durationInSeconds = recipe.opt.durationInSeconds !== undefined
        ? recipe.opt.durationInSeconds
        : recipe.opt.strikeTime + recipe.opt.noiseDecay + 0.1;
    const bufferSize = Math.max(1, Math.floor(durationInSeconds * sampleRate));
    const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    const { opt } = recipe;

    const strikeSamples = Math.max(1, Math.floor(opt.strikeTime * sampleRate));
    const noiseDecaySamples = Math.max(1, Math.floor(opt.noiseDecay * sampleRate));

    const combs = recipe.combs.map(c => {
        const delaySamples = Math.max(1, Math.floor(c.delaySec * sampleRate));
        return {
            buf: new Float32Array(delaySamples + 1),
            bufLen: delaySamples + 1,
            writeIndex: 0,
            delaySamples,
            feedback: c.feedback,
            damp: c.damp,
            lastOut: 0
        };
    });

    const partials = recipe.partials.map(p => {
        return {
            phase: p.phase0,
            phaseInc: 2 * Math.PI * p.freq / sampleRate,
            currentAmp: p.amp0,
            decayPerSample: Math.exp(-1 / (p.decayTime * sampleRate))
        };
    });

    const ringFreq = recipe.ringFreq;
    let ringPhase = 0;
    const ringInc = 2 * Math.PI * ringFreq / sampleRate;

    let maxAmp = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = 2 * (Math.random() - 0.5);
        const noiseStrike = white * Math.exp(- (i / strikeSamples) * 6) * Math.exp(- (i / noiseDecaySamples) * 6);

        const scrape = (Math.random() * 2 - 1) * opt.scrapeLevel * (0.7 + 0.3 * Math.random());
        const scrapeDecaySec = 0.02 + (0.6 * (1 - opt.brightness));
        const scrapeEnv = Math.exp(- i / (sampleRate * scrapeDecaySec));
        const scrapeVal = scrape * scrapeEnv;

        const input = noiseStrike + scrapeVal;

        let combOutSum = 0;
        for (const comb of combs) {
            const readIndex = (comb.writeIndex + 1) % comb.bufLen;
            let delayed = comb.buf[readIndex];
            delayed = comb.lastOut * (1 - comb.damp) + delayed * comb.damp;
            comb.lastOut = delayed;
            combOutSum += delayed;
            const fbVal = input + delayed * comb.feedback;
            comb.buf[comb.writeIndex] = fbVal;
            comb.writeIndex = (comb.writeIndex + 1) % comb.bufLen;
        }

        let partialSum = 0;
        for (const part of partials) {
            partialSum += fastSin(part.phase) * part.currentAmp;
            part.phase += part.phaseInc;
            if (part.phase >= 2 * Math.PI) part.phase -= 2 * Math.PI;
            part.currentAmp *= part.decayPerSample;
        }

        const ring = fastSin(ringPhase);
        ringPhase += ringInc;
        if (ringPhase >= 2 * Math.PI) ringPhase -= 2 * Math.PI;

        const out =
            opt.noiseWeight * input +
            (opt.combWeight * combOutSum + opt.partialWeight * partialSum) * (1 + opt.ringModDepth * ring) * opt.overallDecay;

        data[i] = out;
        const absv = Math.abs(out);
        if (absv > maxAmp) maxAmp = absv;
    }

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

export function getCrashNoiseBuffer(audioCtx) {
    if (crashNoiseRecipe === null) {
        const opts = getMetalNoisePreset("crash");
        crashNoiseRecipe = getMetalNoiseRecipe(opts);
    }
    if (crashNoiseBuffer === null) {
        crashNoiseBuffer = buildMetalNoiseBuffer(audioCtx, crashNoiseRecipe)
    }
    return crashNoiseBuffer;
}

export function getHihatNoiseBuffer(audioCtx) {
    if (hihatNoiseRecipe === null) {
        const opts = getMetalNoisePreset("hihat");
        hihatNoiseRecipe = getMetalNoiseRecipe(opts);
    }
    if (hihatNoiseBuffer === null) {
        hihatNoiseBuffer = buildMetalNoiseBuffer(audioCtx, hihatNoiseRecipe)
    }
    return hihatNoiseBuffer;
}

export function getPinkNoiseBuffer(audioCtx, durationInSeconds = 2) {
    if (pinkNoiseBuffer === null) {
        pinkNoiseBuffer = createPinkNoiseBuffer(audioCtx, durationInSeconds);
    }
    return pinkNoiseBuffer;
}

export function getRideNoiseBuffer(audioCtx) {
    if (rideNoiseRecipe === null) {
        const opts = getMetalNoisePreset("ride");
        rideNoiseRecipe = getMetalNoiseRecipe(opts);
    }
    if (rideNoiseBuffer === null) {
        rideNoiseBuffer = buildMetalNoiseBuffer(audioCtx, rideNoiseRecipe)
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


