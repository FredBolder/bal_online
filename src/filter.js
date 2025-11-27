export function percentageToBoost(percent) {
    //   0% = strongest cut -12dB
    //  50% = no boost or cut
    // 100% = strongest boost +12dB
    return ((percent / 100) * 2 - 1) * 12;
}

export function resonancePercentToQ(percent) {
    const minQ = 0.7;
    const maxQ = 20;
    const t = percent / 100;
    return minQ * Math.pow(maxQ / minQ, t);
}

function safeTarget(v) {
    return Math.max(v, 0.0001);
}


class Filter {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.filter = audioContext.createBiquadFilter();
        this.filterSettings = { type: "highpass", freq1: 10, freq2: 10, freq3: 10, freq4: 10, resonance: 0, attack: 5, decay: 1000, release: 500 };
        this.started = false;
        this.startScheduled = false;
        this.stopped = false;
        this.stopScheduled = false;
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
        if (["highshelf", "lowshelf"].includes(type)) {
            this.filter.gain.value = percentageToBoost(this.filterSettings.resonance);
        } else {
            this.filter.Q.value = resonancePercentToQ(this.filterSettings.resonance);
        }
    }

    async start(preDelay) {
        if (this.startScheduled) return;
        this.startScheduled = true;

        const startTime = this.audioContext.currentTime + preDelay;

        const fat = this.filterSettings.attack / 1000;
        const fdt = this.filterSettings.decay / 1000;
        this.filter.frequency.setValueAtTime(safeTarget(this.filterSettings.freq1), startTime);
        this.filter.frequency.linearRampToValueAtTime(safeTarget(this.filterSettings.freq2), startTime + fat);
        this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.freq3), startTime + fat + fdt);

        await new Promise(resolve => setTimeout(resolve, preDelay * 1000));
        this.started = true;
        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        this.stop();
    }

    async stop() {
        if (this.stopScheduled) return;

        const isFirefox = typeof InstallTrigger !== "undefined";
        let currentFreq = safeTarget(this.filterSettings.freq1);        

        this.stopScheduled = true;
        const stopTime = this.audioContext.currentTime;
        const fat = this.filterSettings.attack / 1000;
        const fdt = this.filterSettings.decay / 1000;
        const frt = this.filterSettings.release / 1000;

        if (isFirefox) {
            // Calculate current frequency
            currentFreq = safeTarget(this.filterSettings.freq1);
            if (this.startTime !== null) {
                const elapsed = this.audioContext.currentTime - this.startTime;
                if (elapsed <= fat) {
                    currentFreq = safeTarget(this.filterSettings.freq2 * (elapsed / fat));
                }
                if ((elapsed > fat) && (elapsed <= (fat + fdt))) {
                    const decayElapsed = elapsed - fat;
                    const decayRatio = decayElapsed / fdt;
                    currentFreq = safeTarget(this.filterSettings.freq2 * Math.pow(this.filterSettings.freq3 / this.filterSettings.freq2, decayRatio));
                }
                if (elapsed > (fat + fdt)) {
                    currentFreq = safeTarget(this.filterSettings.freq3);
                }
            }
        }

        // exponentialRampToValueAtTime does not keep track of the current value
        this.filter.frequency.cancelScheduledValues(stopTime);
        if (isFirefox) {
            this.filter.frequency.setValueAtTime(currentFreq, stopTime);
        } else {
            this.filter.frequency.setValueAtTime(this.filter.frequency.value, stopTime); // Does not work in Firefox
        }
        this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.freq4), stopTime + frt);

        await new Promise(resolve => setTimeout(resolve, (frt + 0.02) * 1000));
        try { this.filter.disconnect(); } catch(e) { /* ignore */ }
        this.stopped = true;
    }
}

export { Filter };
