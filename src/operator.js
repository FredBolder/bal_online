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

function resonancePercentToQ(percent) {
    const minQ = 0.7;
    const maxQ = 20;
    const t = percent / 100;
    return minQ * Math.pow(maxQ / minQ, t);
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
        this.lfoSettings = { destination: "none", waveform: "sine", frequency: 4, depth: 0.1 };
        this.dcoSettings = { waveform, frequency };
        this.dcaSettings = { volume, attack, decay, sustain, release };
        this.filterSettings = { type: "none", freq1: 10, freq2: 10, freq3: 10, freq4: 10, resonance: 0, attack: 5, decay: 1000, release: 500 };

        this.tremolo = audioContext.createGain();
        this.tremoloOffset = audioContext.createConstantSource();
        this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
        this.lfo = audioContext.createOscillator();
        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        this.lfoGain = audioContext.createGain();
        this.lfoGain.gain.value = this.lfoSettings.depth;
        this.filter = audioContext.createBiquadFilter();
        this.filter.type = "highpass";
        this.filter.frequency.value = this.filterSettings.freq1;
        this.filter.Q.value = resonancePercentToQ(this.filterSettings.resonance);
        this.amp = audioContext.createGain();
        this.osc = audioContext.createOscillator();
        if (this.dcoSettings.waveform.startsWith("pulse")) {
            if (this.dcoSettings.waveform.length > 5) {
                pulseWidth = tryParseInt(this.dcoSettings.waveform.slice(5), -1);
                if (pulseWidth < 1) {
                    pulseWidth = 25;
                }
            }
            this.osc.setPeriodicWave(createPulseWave(audioContext, pulseWidth / 100, 20));
        } else {
            this.osc.type = this.dcoSettings.waveform;
        }
        this.osc.frequency.value = this.dcoSettings.frequency;
        this.osc.connect(this.filter);
        this.filter.connect(this.amp);
    }

    setFilter(type, freq1, freq2, freq3, freq4, resonance, attack, decay, release) {
        const freqMin = 10;

        this.filterSettings.type = type;
        this.filterSettings.freq1 = Math.max(freqMin, freq1); // start
        this.filterSettings.freq2 = Math.max(freqMin, freq2);
        this.filterSettings.freq3 = Math.max(freqMin, freq3); // sustain
        this.filterSettings.freq4 = Math.max(freqMin, freq4);
        this.filterSettings.resonance = resonance;
        this.filterSettings.attack = attack;
        this.filterSettings.decay = decay;
        this.filterSettings.release = release;

        this.filter.type = this.filterSettings.type;
        this.filter.frequency.value = this.filterSettings.freq1;
        this.filter.Q.value = resonancePercentToQ(this.filterSettings.resonance);
    }

    setLfo(destination, waveform, frequency, depth) {
        this.filter.disconnect();
        this.lfo.disconnect();
        this.lfoGain.disconnect();
        this.osc.disconnect();
        this.tremolo.disconnect();
        this.tremoloOffset.disconnect();

        this.lfoSettings.destination = destination;
        this.lfoSettings.waveform = waveform;
        this.lfoSettings.frequency = frequency;
        this.lfoSettings.depth = depth;

        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        if (this.lfoSettings.destination !== "none") {
            this.lfo.connect(this.lfoGain);
        }
        this.osc.connect(this.filter);
        switch (this.lfoSettings.destination) {
            case "dco":
                this.lfoGain.gain.value = this.lfoSettings.depth * 1200;
                this.lfoGain.connect(this.osc.detune);
                this.filter.connect(this.amp);
                break;
            case "dca":
                this.lfoGain.gain.value = this.lfoSettings.depth;
                this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
                this.lfoGain.connect(this.tremolo.gain);
                this.tremoloOffset.connect(this.tremolo.gain);
                this.filter.connect(this.tremolo).connect(this.amp);
                break;
            default:
                this.filter.connect(this.amp);
                break;
        }
    }

    async start() {
        const startTime = this.audioContext.currentTime;
        if (this.startScheduled) return;
        this.startScheduled = true;
        const at = this.dcaSettings.attack / 1000;
        const dt = this.dcaSettings.decay / 1000;
        this.amp.gain.setValueAtTime(safeTarget(0), startTime);
        this.amp.gain.linearRampToValueAtTime(safeTarget(this.dcaSettings.volume), startTime + at);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(this.dcaSettings.sustain), startTime + at + dt);

        const fat = this.filterSettings.attack / 1000;
        const fdt = this.filterSettings.decay / 1000;
        if (this.filterSettings.type !== "none") {
            this.filter.frequency.setValueAtTime(safeTarget(this.filterSettings.freq1), startTime);
            this.filter.frequency.linearRampToValueAtTime(safeTarget(this.filterSettings.freq2), startTime + fat);
            this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.freq3), startTime + fat + fdt);
        }

        this.osc.start(startTime);
        if (this.lfoSettings.destination === "dca") {
            this.tremoloOffset.start(startTime);
        }
        if (this.lfoSettings.destination !== "none") {
            this.lfo.start(startTime);
        }
        this.started = true;
        await new Promise(resolve => setTimeout(resolve, (startTime + 2 - this.audioContext.currentTime) * 1000));
        this.stop();
    }

    async stop() {
        const stopTime = this.audioContext.currentTime;
        if (this.stopScheduled) return;
        this.stopScheduled = true;
        const rt = this.dcaSettings.release / 1000;
        const frt = this.filterSettings.release / 1000;

        // The next two lines are needed, because exponentialRampToValueAtTime does not keep track of the current value
        this.amp.gain.cancelScheduledValues(stopTime);
        this.amp.gain.setValueAtTime(this.amp.gain.value, stopTime);
        this.amp.gain.exponentialRampToValueAtTime(safeTarget(0), stopTime + rt);

        if (this.filterSettings.type !== "none") {
            this.filter.frequency.cancelScheduledValues(stopTime);
            this.filter.frequency.setValueAtTime(this.filter.frequency.value, stopTime);
            this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.freq4), stopTime + frt);
        }
        this.osc.stop(stopTime + rt + 0.02);
        if (this.lfoSettings.destination !== "none") {
            this.lfo.stop(stopTime + rt + 0.02);
        }
        if (this.lfoSettings.destination === "dca") {
            this.tremoloOffset.stop(stopTime + rt + 0.02);
        }
        await new Promise(resolve => setTimeout(resolve, (stopTime + rt + 0.02 - this.audioContext.currentTime) * 1000));
        this.stopped = true;
    }
}

export { Operator };
