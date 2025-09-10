import { percentageToBoost, resonancePercentToQ } from "./filter.js";
import { getCymbalNoise } from "./music.js";
import { tryParseInt } from "./utils.js";

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
  return function() {
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

function createPulseWave(audioCtx, dutyCycle = 0.25, harmonics = 5, phaseDeg = 0) {
    const real = new Float32Array(harmonics + 1);
    const imag = new Float32Array(harmonics + 1);
    const phi = (phaseDeg * Math.PI) / 180.0;
    real[0] = 0;
    imag[0] = 0;
    for (let n = 1; n <= harmonics; n++) {
        const A = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * dutyCycle);
        real[n] = A * Math.cos(phi);
        imag[n] = A * Math.sin(phi);
    }
    return audioCtx.createPeriodicWave(real, imag, { disableNormalization: true });
}

function createSineWave(audioCtx, phaseDeg = 0) {
    const real = new Float32Array(2); // index 0 = DC, index 1 = 1st harmonic
    const imag = new Float32Array(2);
    const phi = (phaseDeg * Math.PI) / 180.0;
    real[0] = 0;
    imag[0] = 0;
    real[1] = Math.sin(phi);
    imag[1] = Math.cos(phi);
    return audioCtx.createPeriodicWave(real, imag, { disableNormalization: true });
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

export function getPreDelay() {
    return 20 / 1000;
}

function safeTarget(v) {
    return Math.max(v, 0.0001);
}


class Operator {
    constructor(audioContext, waveform, frequency, detuneOrResonance, volume, attack, decay, sustain, release) {
        this.audioContext = audioContext;
        this.filter = null;
        this.oscList = [];
        this.started = false;
        this.startScheduled = false;
        this.startTime = null;
        this.stopped = false;
        this.stopScheduled = false;
        let freq = 440;
        let nOscillators = 1;
        let phase = 0;
        let pulseWidth = 25;
        this.lfoSettings = { destination: "none", waveform: "sine", frequency: 4, delay: 0, depth: 0.1 };
        this.dcoSettings = { waveform, frequency };
        this.dcaSettings = { volume, attack, decay, sustain, release };
        this.pitchEnvSettings = { start: 0, time: 500, end: 0 };

        this.tremolo = audioContext.createGain();
        this.tremoloOffset = audioContext.createConstantSource();
        this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
        this.lfo = audioContext.createOscillator();
        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        this.lfoGain = audioContext.createGain();
        this.lfoGain.gain.value = this.lfoSettings.depth;
        this.amp = audioContext.createGain();

        const noise = ["blueNoise", "brownNoise", "metalNoise", "noise", "noiseAndBPF", "noiseAndHPF", "noiseAndLPF", "noiseAndLSF", "pinkNoise", "violetNoise"].includes(waveform);
        let oscillator = null;

        if (!noise && (detuneOrResonance !== 0)) {
            nOscillators = 3;
        } else {
            nOscillators = 1;
        }
        for (let i = 0; i < nOscillators; i++) {
            if (noise) {
                oscillator = audioContext.createBufferSource();
                // Noise type
                switch (waveform) {
                    case "blueNoise":
                        oscillator.buffer = createBlueNoiseBuffer(audioContext, 2);
                        break;
                    case "brownNoise":
                        oscillator.buffer = createBrownNoiseBuffer(audioContext, 2);
                        break;
                    case "metalNoise":
                        oscillator.buffer = getCymbalNoise();
                        break;
                    case "pinkNoise":
                        oscillator.buffer = createPinkNoiseBuffer(audioContext, 2);
                        break;
                    case "violetNoise":
                        oscillator.buffer = createVioletNoiseBuffer(audioContext, 2);
                        break;
                    default:
                        oscillator.buffer = createWhiteNoiseBuffer(audioContext, 2);
                        break;
                }
                // Filter
                switch (waveform) {
                    case "noiseAndBPF":
                        this.filter = audioContext.createBiquadFilter();
                        this.filter.type = "bandpass";
                        this.filter.frequency.value = frequency;
                        this.filter.Q.value = resonancePercentToQ(detuneOrResonance);
                        break;
                    case "noiseAndHPF":
                        this.filter = audioContext.createBiquadFilter();
                        this.filter.type = "highpass";
                        this.filter.frequency.value = frequency;
                        this.filter.Q.value = resonancePercentToQ(detuneOrResonance);
                        break;
                    case "noiseAndLPF":
                        this.filter = audioContext.createBiquadFilter();
                        this.filter.type = "lowpass";
                        this.filter.frequency.value = frequency;
                        this.filter.Q.value = resonancePercentToQ(detuneOrResonance);
                        break;
                    case "noiseAndLSF":
                        this.filter = audioContext.createBiquadFilter();
                        this.filter.type = "lowshelf";
                        this.filter.frequency.value = frequency;
                        this.filter.gain.value = percentageToBoost(detuneOrResonance);
                        break;
                    default:
                        this.filter = null;
                        break;
                }
            } else {
                oscillator = audioContext.createOscillator();
                if (waveform.startsWith("pulse")) {
                    if (waveform.length > 5) {
                        pulseWidth = tryParseInt(waveform.slice(5), -1);
                        if (pulseWidth < 1) {
                            pulseWidth = 25;
                        }
                    }
                    oscillator.setPeriodicWave(createPulseWave(audioContext, pulseWidth / 100, 20));
                } else if (waveform.startsWith("sine") && (waveform.length > 4)) {
                    phase = tryParseInt(waveform.slice(4), -1);
                    if (phase < 0) {
                        phase = 0;
                    }
                    oscillator.setPeriodicWave(createSineWave(audioContext, phase));
                } else if (waveform === "cosine") {
                    const real = new Float32Array(2);
                    const imag = new Float32Array(2);
                    real[0] = 0;
                    imag[0] = 0;
                    real[1] = 1; // cosine coefficient
                    imag[1] = 0; // sine coefficient
                    const wave = audioContext.createPeriodicWave(real, imag, { disableNormalization: true });
                    oscillator.setPeriodicWave(wave);
                } else {
                    oscillator.type = waveform;
                }
                switch (i) {
                    case 1:
                        freq = this.dcoSettings.frequency * Math.pow(2, -detuneOrResonance / 1200);
                        break;
                    case 2:
                        freq = this.dcoSettings.frequency * Math.pow(2, detuneOrResonance / 1200);
                        break;
                    default:
                        freq = this.dcoSettings.frequency;
                        break;
                }
                oscillator.frequency.value = freq;

            }
            if (this.filter !== null) {
                oscillator.connect(this.filter);
                this.filter.connect(this.amp);
            } else {
                oscillator.connect(this.amp);
            }
            this.oscList.push(oscillator);
        }
    }

    setLfo(destination, waveform, frequency, depth, delay) {
        this.lfo.disconnect();
        this.lfoGain.disconnect();
        for (let i = 0; i < this.oscList.length; i++) {
            this.oscList[i].disconnect();
        }
        this.tremolo.disconnect();
        this.tremoloOffset.disconnect();

        this.lfoSettings.destination = destination;
        this.lfoSettings.waveform = waveform;
        this.lfoSettings.frequency = frequency;
        this.lfoSettings.depth = depth;
        this.lfoSettings.delay = delay;

        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        if (this.lfoSettings.destination !== "none") {
            this.lfo.connect(this.lfoGain);
        }
        switch (this.lfoSettings.destination) {
            case "dco":
                this.lfoGain.gain.value = this.lfoSettings.depth * 1200;
                for (let i = 0; i < this.oscList.length; i++) {
                    this.lfoGain.connect(this.oscList[i].detune);
                    this.oscList[i].connect(this.amp);
                }
                break;
            case "dca":
                this.lfoGain.gain.value = this.lfoSettings.depth;
                this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
                this.lfoGain.connect(this.tremolo.gain);
                this.tremoloOffset.connect(this.tremolo.gain);
                for (let i = 0; i < this.oscList.length; i++) {
                    this.oscList[i].connect(this.tremolo).connect(this.amp);
                }
                break;
            default:
                for (let i = 0; i < this.oscList.length; i++) {
                    this.oscList[i].connect(this.amp);
                }
                break;
        }
    }

    setPitchEnv(start, time, end) {
        this.pitchEnvSettings.start = start;
        this.pitchEnvSettings.time = time;
        this.pitchEnvSettings.end = end;
    }

    async start(preDelay) {
        if (this.startScheduled) return;

        this.startScheduled = true;
        const startTime = this.audioContext.currentTime + preDelay;
        this.startTime = startTime;
        const at = this.dcaSettings.attack / 1000;
        const dt = this.dcaSettings.decay / 1000;
        this.amp.gain.setValueAtTime(safeTarget(0), startTime);
        this.amp.gain.linearRampToValueAtTime(safeTarget(this.dcaSettings.volume / this.oscList.length), startTime + at);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(this.dcaSettings.sustain / this.oscList.length), startTime + at + dt);
        for (let i = 0; i < this.oscList.length; i++) {
            this.oscList[i].detune.setValueAtTime(this.pitchEnvSettings.start * 1200, startTime);
            this.oscList[i].detune.linearRampToValueAtTime(this.pitchEnvSettings.end * 1200, startTime + (this.pitchEnvSettings.time / 1000));
            this.oscList[i].start(startTime);
        }
        if (this.lfoSettings.destination === "dca") {
            this.tremoloOffset.start(startTime);
        }
        if (this.lfoSettings.destination !== "none") {
            this.lfo.start(startTime + (this.lfoSettings.delay / 1000));
        }
        await new Promise(resolve => setTimeout(resolve, preDelay * 1000));
        this.started = true;
        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        this.stop();
    }

    async stop() {
        if (this.stopScheduled) return;

        const isFirefox = typeof InstallTrigger !== "undefined";
        let currentAmpGain = safeTarget(0);

        this.stopScheduled = true;
        const stopTime = this.audioContext.currentTime;
        const at = this.dcaSettings.attack / 1000;
        const dt = this.dcaSettings.decay / 1000;
        let rt = this.dcaSettings.release / 1000;

        if (isFirefox) {
            // Calculate current amp gain
            const maxVolume = this.dcaSettings.volume / this.oscList.length;
            const sustainVolume = this.dcaSettings.sustain / this.oscList.length;
            currentAmpGain = safeTarget(0);
            if (this.startTime !== null) {
                const elapsed = this.audioContext.currentTime - this.startTime;
                if (elapsed <= at) {
                    currentAmpGain = safeTarget(maxVolume * (elapsed / at));
                }
                if ((elapsed > at) && (elapsed <= (at + dt))) {
                    const decayElapsed = elapsed - at;
                    const decayRatio = decayElapsed / dt;
                    currentAmpGain = safeTarget(maxVolume * Math.pow(sustainVolume / maxVolume, decayRatio));
                }
                if (elapsed > (at + dt)) {
                    currentAmpGain = safeTarget(sustainVolume);
                }
            }
        }

        // exponentialRampToValueAtTime does not keep track of the current value
        this.amp.gain.cancelScheduledValues(stopTime);
        if (isFirefox) {
            this.amp.gain.setValueAtTime(currentAmpGain, stopTime);
        } else {
            this.amp.gain.setValueAtTime(this.amp.gain.value, stopTime); // Does not work in Firefox
        }
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(0), stopTime + rt);
        for (let i = 0; i < this.oscList.length; i++) {
            this.oscList[i].stop(stopTime + rt + 0.02);
        }
        if (this.lfoSettings.destination !== "none") {
            this.lfo.stop(stopTime + rt + 0.02);
        }
        if (this.lfoSettings.destination === "dca") {
            this.tremoloOffset.stop(stopTime + rt + 0.02);
        }
        await new Promise(resolve => setTimeout(resolve, (rt + 0.02) * 1000));
        this.stopped = true;
    }
}

export { Operator };
