class Operator {
    constructor(audioContext, waveform, frequency, volume, attack, decay) {
        this.lfoSettings = { destination: "none", waveform: "sine", frequency: 4, depth: 0.1 };
        this.dcoSettings = { waveform, frequency };
        this.dcaSettings = { volume, attack, decay };

        this.tremolo = audioContext.createGain();
        this.tremoloOffset = audioContext.createConstantSource();
        this.tremoloOffset.offset.value = 1 - this.lfoSettings.depth;
        this.lfo = audioContext.createOscillator();
        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        this.lfoGain = audioContext.createGain();
        this.lfoGain.gain.value = this.lfoSettings.depth;
        this.tremoloOffset.connect(this.tremolo.gain);
        this.amp = audioContext.createGain();
        this.osc = audioContext.createOscillator();
        this.osc.type = this.dcoSettings.waveform;
        this.osc.frequency.value = this.dcoSettings.frequency;
        this.osc.connect(this.amp);
    }

    setLfo(destination, waveform, frequency, depth) {
        if (this.lfoSettings.destination !== "none") {
            this.lfo.disconnect();
        }
        switch (this.lfoSettings.destination) {
            case "volume":
                this.osc.disconnect();
                this.tremolo.disconnect();
                break;
            default:
                this.osc.disconnect();
                break;
        }

        this.lfoSettings.destination = destination;
        this.lfoSettings.waveform = waveform;
        this.lfoSettings.frequency = frequency;
        this.lfoSettings.depth = depth;

        this.lfo.type = this.lfoSettings.waveform;
        this.lfo.frequency.value = this.lfoSettings.frequency;
        this.lfoGain.gain.value = this.lfoSettings.depth;
        if (this.lfoSettings.destination !== "none") {
            this.lfo.connect(this.lfoGain);
        }
        if (this.lfoSettings.destination === "volume") {
            this.lfoGain.connect(this.tremolo.gain);
            this.osc.connect(this.tremolo).connect(this.amp);
        } else {
            this.osc.connect(this.amp);
        }

    }
}

export { Operator };
