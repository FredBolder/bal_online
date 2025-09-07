import { resonancePercentToQ } from "./filter.js";
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

        const noise = ["blueNoise", "brownNoise", "noise", "noiseAndBPF", "noiseAndHPF", "noiseAndLPF", "pinkNoise", "violetNoise"].includes(waveform);
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
