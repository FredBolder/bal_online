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



class Operator {
    constructor(audioContext, waveform, frequency, volume, attack, decay) {
        let pulseWidth = 25;
        this.lfoSettings = { destination: "none", waveform: "sine", frequency: 4, depth: 0.1 };
        this.dcoSettings = { waveform, frequency };
        this.dcaSettings = { volume, attack, decay };
        this.filterSettings = { type: "none", startFrequency: 10, endFrequency: 10, resonance: 0, attack: 5, decay: 1000 };

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
        this.filter.frequency.value = this.filterSettings.startFrequency;
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

    setFilter(type, startFrequency, endFrequency, resonance, attack, decay) {
        this.filterSettings.type = type;
        this.filterSettings.startFrequency = startFrequency;
        this.filterSettings.endFrequency = endFrequency;
        this.filterSettings.resonance = resonance;
        this.filterSettings.attack = attack;
        this.filterSettings.decay = decay;

        this.filter.type = this.filterSettings.type;
        this.filter.frequency.value = this.filterSettings.startFrequency;
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
}

export { Operator };
