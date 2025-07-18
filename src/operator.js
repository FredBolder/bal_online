import { tryParseInt } from "./utils.js";

function createPulseWave(audioCtx, dutyCycle = 0.25, harmonics = 3) {
    const real = new Float32Array(harmonics + 1);
    const imag = new Float32Array(harmonics + 1);

    for (let n = 1; n <= harmonics; n++) {
        real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * dutyCycle);
        imag[n] = 0;
    }
    return audioCtx.createPeriodicWave(real, imag, { disableNormalization: true });
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
    constructor(audioContext, waveform, frequency, volume, attack, decay, sustain, release) {
        this.audioContext = audioContext;
        this.started = false;
        this.startScheduled = false;
        this.stopped = false;
        this.stopScheduled = false;
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
        if (this.dcoSettings.waveform === "noise") {
            this.osc = audioContext.createBufferSource();
            this.osc.buffer = createWhiteNoiseBuffer(audioContext, 1);
        } else {
            this.osc = audioContext.createOscillator();
            if (this.dcoSettings.waveform.startsWith("pulse")) {
                if (this.dcoSettings.waveform.length > 5) {
                    pulseWidth = tryParseInt(this.dcoSettings.waveform.slice(5), -1);
                    if (pulseWidth < 1) {
                        pulseWidth = 25;
                    }
                }
                this.osc.setPeriodicWave(createPulseWave(audioContext, pulseWidth / 100, 20));
            } else if (this.dcoSettings.waveform === "cosine") {
                const real = new Float32Array([0, 0]); // cosine terms
                const imag = new Float32Array([0, 1]); // sine terms
                const wave = audioContext.createPeriodicWave(real, imag, { disableNormalization: true });
                this.osc.setPeriodicWave(wave);
            } else {
                this.osc.type = this.dcoSettings.waveform;
            }
            this.osc.frequency.value = this.dcoSettings.frequency;

        }
        this.osc.connect(this.amp);
    }

    setLfo(destination, waveform, frequency, depth, delay) {
        this.lfo.disconnect();
        this.lfoGain.disconnect();
        this.osc.disconnect();
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
                this.lfoGain.connect(this.osc.detune);
                this.osc.connect(this.amp);
                break;
            case "dca":
                this.lfoGain.gain.value = this.lfoSettings.depth;
                this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
                this.lfoGain.connect(this.tremolo.gain);
                this.tremoloOffset.connect(this.tremolo.gain);
                this.osc.connect(this.tremolo).connect(this.amp);
                break;
            default:
                this.osc.connect(this.amp);
                break;
        }
    }

    setPitchEnv(start, time, end) {
        this.pitchEnvSettings.start = start;
        this.pitchEnvSettings.time = time;
        this.pitchEnvSettings.end = end;
    }

    async start(preDelay) {
        const startTime = this.audioContext.currentTime + preDelay;
        if (this.startScheduled) return;
        this.startScheduled = true;
        const at = this.dcaSettings.attack / 1000;
        const dt = this.dcaSettings.decay / 1000;
        this.amp.gain.setValueAtTime(safeTarget(0), startTime);
        this.amp.gain.linearRampToValueAtTime(safeTarget(this.dcaSettings.volume), startTime + at);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(this.dcaSettings.sustain), startTime + at + dt);
        this.osc.detune.setValueAtTime(this.pitchEnvSettings.start * 1200, startTime);
        this.osc.detune.linearRampToValueAtTime(this.pitchEnvSettings.end * 1200, startTime + (this.pitchEnvSettings.time / 1000));
        this.osc.start(startTime);
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
        const stopTime = this.audioContext.currentTime;
        if (this.stopScheduled) return;
        this.stopScheduled = true;
        const rt = this.dcaSettings.release / 1000;

        // exponentialRampToValueAtTime does not keep track of the current value
        this.amp.gain.cancelScheduledValues(stopTime);
        this.amp.gain.setValueAtTime(this.amp.gain.value, stopTime);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(0), stopTime + rt);
        this.osc.stop(stopTime + rt + 0.02);
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
