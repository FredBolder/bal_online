import { percentageToBoost, resonancePercentToQ } from "./filter.js";
import {
    getBlueNoiseBuffer,
    getBrownNoiseBuffer,
    getCrashNoiseBuffer,
    getHihatNoiseBuffer,
    getPinkNoiseBuffer,
    getRideNoiseBuffer,
    getVioletNoiseBuffer,
    getWhiteNoiseBuffer
} from "./noise.js";
import { tryParseInt } from "./utils.js";

function createDistortionCurve({
    type = "tanh",       // "tanh", "greek", "tube", "hard"
    k = 5,
    maxAmplitude = 1.0,
    samples = 1024
}) {
    const curve = new Float32Array(samples);

    for (let i = 0; i < samples; i++) {
        const x = (i * 2 / samples) - 1; // -1..1

        let y;

        switch (type) {

            // ---------------------------------------------------
            // 1. Soft clipping (tanh)
            // ---------------------------------------------------
            case "tanh":
                y = Math.tanh(x * k);
                break;

            // ---------------------------------------------------
            // 2. Greek "TZOUK" bouzouki curve
            //    Asymmetric bright clipping + slight gate
            // ---------------------------------------------------
            case "greek": {
                const gate = 0.12;   // low-amplitude suppression
                let s = x;

                // Apply "string buzz" deadzone
                if (Math.abs(s) < gate) {
                    s = 0.7 * s; // slightly muted low levels
                }

                // Asymmetric processing
                if (s >= 0) {
                    // Positive side: exponential soft knee → bright
                    y = 1 - Math.exp(-k * s);
                } else {
                    // Negative side: harder cubic knee → odd harmonics
                    y = -(Math.pow(-s * k, 3) / (1 + Math.pow(-s * k, 3)));
                }

                break;
            }

            // ---------------------------------------------------
            // 3. Tube saturation (smooth, musical)
            // ---------------------------------------------------
            case "tube":
                y = x / (1 + Math.abs(k * x));
                break;

            // ---------------------------------------------------
            // 4. Hard clip (near square, but normalized)
            // ---------------------------------------------------
            case "hard":
                y = Math.max(-1, Math.min(1, x * k));
                break;

            default:
                y = x;
        }

        curve[i] = y;
    }

    // Normalize to maxAmplitude
    let max = 0;
    for (let i = 0; i < samples; i++) {
        const a = Math.abs(curve[i]);
        if (a > max) max = a;
    }
    if (max < 0.00001) return curve;

    for (let i = 0; i < samples; i++) {
        curve[i] = (curve[i] / max) * maxAmplitude;
    }

    return curve;
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

export function getPreDelay() {
    return 20 / 1000;
}

function safeTarget(v) {
    return Math.max(v, 0.0001);
}

class Operator {
    constructor(audioContext, waveform, frequency, detuneOrResonance, volume, attack, decay, sustain, release, postFilterGain = null) {
        this.audioContext = audioContext;
        this.filter = null;
        this.oscList = [];
        this.postGain = null;
        this.started = false;
        this.startScheduled = false;
        this.startTime = null;
        this.stopped = false;
        this.stopScheduled = false;
        this.waveShaper = null;
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

        const isBuffer = ["blueNoise", "brownNoise", "crashNoise", "crashNoiseAndBPF", "hihatNoise", "hihatNoiseAndBPF",
            "noise", "noiseAndBPF", "noiseAndHPF", "noiseAndLPF", "noiseAndLSF", "pinkNoise", "pinkNoiseAndBPF", 
            "rideNoise", "rideNoiseAndBPF", "violetNoise"].includes(waveform);
        let oscillator = null;

        nOscillators = 1;
        if (!isBuffer && (detuneOrResonance !== 0)) {
            if (detuneOrResonance > 0) {
                nOscillators = 3;
            } else {
                // Negative detune means only two oscillators
                nOscillators = 2;
            }
        }

        for (let i = 0; i < nOscillators; i++) {
            if (isBuffer) {
                oscillator = audioContext.createBufferSource();
                // Buffer
                switch (waveform) {
                    case "blueNoise":
                        oscillator.buffer = getBlueNoiseBuffer(audioContext);
                        break;
                    case "brownNoise":
                        oscillator.buffer = getBrownNoiseBuffer(audioContext);
                        break;
                    case "crashNoise":
                    case "crashNoiseAndBPF":
                        oscillator.buffer = getCrashNoiseBuffer(audioContext);
                        break;
                    case "hihatNoise":
                    case "hihatNoiseAndBPF":
                        oscillator.buffer = getHihatNoiseBuffer(audioContext);
                        break;
                    case "pinkNoise":
                    case "pinkNoiseAndBPF":
                        oscillator.buffer = getPinkNoiseBuffer(audioContext);
                        break;
                    case "rideNoise":
                    case "rideNoiseAndBPF":
                        oscillator.buffer = getRideNoiseBuffer(audioContext);
                        break;
                    case "violetNoise":
                        oscillator.buffer = getVioletNoiseBuffer(audioContext);
                        break;
                    default:
                        oscillator.buffer = getWhiteNoiseBuffer(audioContext);
                        break;
                }
                // Filter
                switch (waveform) {
                    case "crashNoiseAndBPF":
                    case "hihatNoiseAndBPF":
                    case "noiseAndBPF":
                    case "pinkNoiseAndBPF":
                    case "rideNoiseAndBPF":
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
                let detune = Math.abs(detuneOrResonance) / 1200;
                if (nOscillators === 2) {
                    detune = detune / 2;
                }
                switch (i) {
                    case 1:
                        freq = this.dcoSettings.frequency * Math.pow(2, detune);
                        break;
                    case 2:
                        freq = this.dcoSettings.frequency * Math.pow(2, -detune);
                        break;
                    default:
                        if (nOscillators === 2) {
                            freq = this.dcoSettings.frequency * Math.pow(2, -detune);
                        } else {
                            freq = this.dcoSettings.frequency;
                        }
                        break;
                }
                oscillator.frequency.value = freq;
                if (postFilterGain !== null) {
                    this.postGain = audioContext.createGain();
                    this.postGain.gain.value = postFilterGain;
                }
            }
            const oscGain = audioContext.createGain();
            oscGain.gain.value = 1 / nOscillators;
            this.oscList.push({ osc: oscillator, gain: oscGain });
        }
        this.makeConnections();
    }

    makeConnections() {
        // Disconnect audio nodes
        for (const { osc, gain } of this.oscList) {
            try { osc.disconnect(); } catch { /* error */ }
            try { gain.disconnect(); } catch { /* error */ }
        }
        try { this.waveShaper?.disconnect(); } catch { /* error */ }
        try { this.filter?.disconnect(); } catch { /* error */ }
        try { this.postGain?.disconnect(); } catch { /* error */ }
        try { this.amp.disconnect(); } catch { /* error */ }

        // Disconnect LFO routing
        try { this.lfo.disconnect(); } catch { /* error */ }
        try { this.lfoGain.disconnect(); } catch { /* error */ }
        try { this.tremolo.disconnect(); } catch { /* error */ }
        try { this.tremoloOffset.disconnect(); } catch { /* error */ }

        // Build audio processing chain ---
        const chain = [];
        if (this.waveShaper) chain.push(this.waveShaper);
        if (this.filter) chain.push(this.filter);
        if (this.postGain) chain.push(this.postGain);
        chain.push(this.amp);
        const firstNode = chain[0];

        // Connect oscillators
        const lfoDest = this.lfoSettings.destination;

        if (lfoDest === "dca") {
            for (const { osc, gain } of this.oscList) {
                osc.connect(gain);
                gain.connect(this.tremolo);
            }
            this.tremolo.connect(firstNode);
        } else {
            for (const { osc, gain } of this.oscList) {
                osc.connect(gain);
                gain.connect(firstNode);
            }
        }

        // Connect audio chain
        for (let i = 0; i < chain.length - 1; i++) {
            chain[i].connect(chain[i + 1]);
        }

        // LFO routing
        if (lfoDest === "dco") {
            this.lfo.connect(this.lfoGain);
            this.lfoGain.gain.value = this.lfoSettings.depth * 1200; // cents

            for (const { osc } of this.oscList) {
                this.lfoGain.connect(osc.detune);
            }
        }
        if (lfoDest === "dca") {
            this.lfo.connect(this.lfoGain);
            this.lfoGain.gain.value = this.lfoSettings.depth;
            this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
            this.lfoGain.connect(this.tremolo.gain);
            this.tremoloOffset.connect(this.tremolo.gain);
        }
    }



    setFilter(filterType, filterFrequency, filterResonance) {
        this.filter = this.audioContext.createBiquadFilter();
        this.filter.type = filterType;
        this.filter.frequency.value = filterFrequency;
        this.filter.Q.value = resonancePercentToQ(filterResonance);
        this.makeConnections();
    }

    setLfo(destination, waveform, frequency, depth, delay) {
        this.lfoSettings.destination = destination;  // "dco" | "dca" | "none"
        this.lfoSettings.waveform = waveform;
        this.lfoSettings.frequency = frequency;
        this.lfoSettings.depth = depth;
        this.lfoSettings.delay = delay;

        this.lfo.type = waveform;
        this.lfo.frequency.value = frequency;

        this.makeConnections();
    }

    setPitchEnv(start, time, end) {
        this.pitchEnvSettings.start = start;
        this.pitchEnvSettings.time = time;
        this.pitchEnvSettings.end = end;
    }

    setWaveShaper(type, k, maxAmplitude = null) {
        if (maxAmplitude === null) {
            maxAmplitude = this.dcaSettings.volume;
        }
        this.waveShaper = this.audioContext.createWaveShaper();
        this.waveShaper.curve = createDistortionCurve(type, k, maxAmplitude);
        this.makeConnections();
    }

    async start(preDelay) {
        if (this.startScheduled) return;

        this.startScheduled = true;
        const startTime = this.audioContext.currentTime + preDelay;
        this.startTime = startTime;
        const at = this.dcaSettings.attack / 1000;
        const dt = this.dcaSettings.decay / 1000;
        this.amp.gain.setValueAtTime(safeTarget(0), startTime);
        this.amp.gain.linearRampToValueAtTime(safeTarget(this.dcaSettings.volume), startTime + at);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(this.dcaSettings.sustain), startTime + at + dt);
        for (let i = 0; i < this.oscList.length; i++) {
            this.oscList[i].osc.detune.setValueAtTime(this.pitchEnvSettings.start * 1200, startTime);
            this.oscList[i].osc.detune.linearRampToValueAtTime(this.pitchEnvSettings.end * 1200, startTime + (this.pitchEnvSettings.time / 1000));
            this.oscList[i].osc.start(startTime);
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
        const rt = this.dcaSettings.release / 1000;

        if (isFirefox) {
            // Calculate current amp gain
            const maxVolume = this.dcaSettings.volume;
            const sustainVolume = this.dcaSettings.sustain;
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
            this.oscList[i].osc.stop(stopTime + rt + 0.02);
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
