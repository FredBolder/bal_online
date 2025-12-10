class CombFilter {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.stopped = false;
        this.stopScheduled = false;

        // nodes
        this.combDelay = audioContext.createDelay();
        this.combFb = audioContext.createGain();
        this.combWet = audioContext.createGain();
        this.combSendGain = audioContext.createGain();
        this.combHighpass = audioContext.createBiquadFilter();
        this.combLowpass = audioContext.createBiquadFilter();
        this.combDry = audioContext.createGain();
        this.combOutput = audioContext.createGain();

        // default params
        this.delayTime_s = 0.0022;
        this.feedbackGain = 0.18;
        this.sendGain = 1.0;
        this.wetLevel = 0.12;   // 0..1
        this.dryLevel = 0.88;   // 0..1
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

        // wire the loop: delay -> feedback -> delay
        this.combDelay.connect(this.combFb);
        this.combFb.connect(this.combDelay);

        // tap the loop output
        this.combDelay.connect(this.combHighpass);
        this.combHighpass.connect(this.combLowpass);
        this.combLowpass.connect(this.combWet);

        // mix wet + dry into combOutput (summing node)
        this.combWet.connect(this.combOutput);
        this.combDry.connect(this.combOutput);

        // set default dry/wet
        this.setWet(this.wetLevel); // sets combWet.gain and combDry.gain
    }

    connectSource(sourceNode) {
        sourceNode.connect(this.combSendGain);
        this.combSendGain.connect(this.combDelay);
        sourceNode.connect(this.combDry);
    }

    connectOutput(destNode) {
        this.combOutput.connect(destNode);
    }

    setWet(wet) {
        wet = Math.max(0, Math.min(1, wet));
        const dry = 1 - wet;
        const safetyFactor = wet > 0.6 ? 0.9 : 1.0;
        this.combWet.gain.value = wet * safetyFactor;
        this.combDry.gain.value = dry;
        this.wetLevel = wet;
        this.dryLevel = dry;
    }

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
