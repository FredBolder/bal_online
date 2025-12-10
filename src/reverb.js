// ---------------------------------------------------------
// Global cache — persists across component mounts.
// Do NOT clear this when closing the AudioContext.
// ---------------------------------------------------------
let cachedIR = null;

class Reverb {
    constructor(audioContext, impulseResponseUrl) {
        const wetLevel = 0.15;

        this.audioContext = audioContext;

        this.dryGain = audioContext.createGain();
        this.wetGain = audioContext.createGain();

        this.dryGain.gain.value = 1 - wetLevel;
        this.wetGain.gain.value = wetLevel;

        this.convolver = null;
        this.loaded = false;

        // Load asynchronously (cached or not)
        this.loadReverb(impulseResponseUrl);
    }

    // ---------------------------------------------------------
    // Load + caching logic
    // ---------------------------------------------------------
    async loadReverb(url) {
        // If reinitializing after a new AudioContext: disconnect old nodes
        if (this.loaded) {
            this.loaded = false;

            if (this.convolver) this.convolver.disconnect();
            this.dryGain.disconnect();
            this.wetGain.disconnect();
        }

        try {
            // Always create a new node for the new AudioContext
            this.convolver = this.audioContext.createConvolver();

            // ------------------------------
            // FAST PATH: Cached IR
            // ------------------------------
            if (cachedIR) {
                this.convolver.buffer = cachedIR;
                this._connectGraph();
                this.loaded = true;
                return;
            }

            // ------------------------------
            // SLOW PATH: First time loading
            // ------------------------------
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();

            // Decode and store in global cache
            cachedIR = await this.audioContext.decodeAudioData(arrayBuffer);

            this.convolver.buffer = cachedIR;
            this._connectGraph();
            this.loaded = true;

        } catch (error) {
            console.warn("Error while loading reverb:", error);
        }
    }

    // ---------------------------------------------------------
    // Internal connection setup
    // ---------------------------------------------------------
    _connectGraph() {
        this.convolver.connect(this.wetGain);
        this.dryGain.connect(this.audioContext.destination);
        this.wetGain.connect(this.audioContext.destination);
    }

    // ---------------------------------------------------------
    // Public API
    // ---------------------------------------------------------
    getConvolver() {
        if (!this.loaded) {
            console.warn("Reverb not yet loaded");
            return null;
        }
        return this.convolver;
    }

    connectSource(source) {
        if (this.loaded) {
            source.connect(this.dryGain);
            source.connect(this.convolver);
        }
    }

    setWet(percentage) {
        const wetLevel = percentage / 100;
        this.dryGain.gain.value = 1 - wetLevel;
        this.wetGain.gain.value = wetLevel;
    }
}

export { Reverb };
