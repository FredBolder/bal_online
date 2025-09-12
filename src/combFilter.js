class CombFilter {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.stopped = false;
        this.stopScheduled = false;

        // nodes
        this.combDelay = audioContext.createDelay();
        this.combFb = audioContext.createGain();
        this.combWet = audioContext.createGain();    // wet path out
        this.combSendGain = audioContext.createGain(); // how much of input -> loop
        this.combHighpass = audioContext.createBiquadFilter(); // in-loop HPF
        this.combLowpass = audioContext.createBiquadFilter();  // in-loop LPF
        this.combDry = audioContext.createGain();    // dry path to output
        this.combOutput = audioContext.createGain(); // final output (wet+dry)

        // default params
        this.delayTime_s = 0.0022;
        this.feedbackGain = 0.18;
        this.sendGain = 1.0;
        this.wetLevel = 0.12;   // user-facing wet fraction (0..1)
        this.dryLevel = 0.88;   // user-facing dry fraction (0..1)
        this.hpCut = 400;
        this.lpCut = 12000;

        // configure nodes
        this.combDelay.delayTime.value = this.delayTime_s;
        this.combFb.gain.value = this.feedbackGain;
        this.combSendGain.gain.value = this.sendGain;
        this.combWet.gain.value = this.wetLevel;

        this.combHighpass.type = "highpass";
        this.combHighpass.frequency.value = this.hpCut;
        this.combHighpass.Q.value = 0.7;

        this.combLowpass.type = "lowpass";
        this.combLowpass.frequency.value = this.lpCut;
        this.combLowpass.Q.value = 0.7;

        // wire the loop: delay -> hp -> lp -> feedback -> delay
        this.combDelay.connect(this.combHighpass);
        this.combHighpass.connect(this.combLowpass);
        this.combLowpass.connect(this.combFb);
        this.combFb.connect(this.combDelay);

        // wire loop output to wet gain (tap the delay output)
        this.combDelay.connect(this.combWet);

        // mix wet + dry into combOutput (summing node)
        this.combWet.connect(this.combOutput);
        this.combDry.connect(this.combOutput);

        // set default dry/wet
        this.setWet(this.wetLevel); // sets combWet.gain and combDry.gain
    }

    // connect a source node (e.g. the summed ride signal). It will route the incoming
    // node to both the comb loop (via combSendGain) and to the dry path.
    connectSource(sourceNode) {
        // connect source -> combSendGain -> combDelay (start of loop)
        sourceNode.connect(this.combSendGain);
        this.combSendGain.connect(this.combDelay);

        // connect source -> combDry (dry path to comb output)
        sourceNode.connect(this.combDry);
    }

    // connect the comb output to your next stage (masterBus / reverb / destination)
    connectOutput(destNode) {
        this.combOutput.connect(destNode);
    }

    // convenience: set dry/wet mix (wet: 0..1). We compute dry = 1-wet.
    // Also optionally scale wet a bit to avoid runaway (simple safety).
    // Note: this only sets the audible mix; sendGain still controls how much is fed into the comb loop.
    setWet(wet) {
        wet = Math.max(0, Math.min(1, wet));
        const dry = 1 - wet;

        // simple safety: if wet is very large, scale it slightly down to prevent huge peaks:
        // (you can remove this if you prefer raw control)
        const safetyFactor = wet > 0.6 ? 0.9 : 1.0;

        this.combWet.gain.value = wet * safetyFactor;
        this.combDry.gain.value = dry;
        this.wetLevel = wet;
        this.dryLevel = dry;
    }

    // parameter setters for delay, feedback, send, hp, lp
    setDelayTime(ms) {
        this.delayTime_s = Math.max(0.0005, ms / 1000);
        this.combDelay.delayTime.value = this.delayTime_s;
    }
    setFeedback(g) {
        this.feedbackGain = Math.max(0, Math.min(0.95, g));
        this.combFb.gain.value = this.feedbackGain;
    }
    setSend(g) {
        this.sendGain = Math.max(0, Math.min(2.0, g));
        this.combSendGain.gain.value = this.sendGain;
    }
    setHP(cutHz) {
        this.hpCut = Math.max(10, cutHz);
        this.combHighpass.frequency.value = this.hpCut;
    }
    setLP(cutHz) {
        this.lpCut = Math.max(100, cutHz);
        this.combLowpass.frequency.value = this.lpCut;
    }

    // optional convenience: disconnect and free nodes
    disconnect() {
        try {
            this.combSendGain.disconnect();
            this.combDelay.disconnect();
            this.combHighpass.disconnect();
            this.combLowpass.disconnect();
            this.combFb.disconnect();
            this.combWet.disconnect();
            this.combDry.disconnect();
            this.combOutput.disconnect();
        } catch (e) { /* ignore */ }
    }

    async stop() {
        if (this.stopScheduled) return;

        this.stopScheduled = true;

        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        this.disconnect();
        this.stopped = true;
    }
}

export { CombFilter };
