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
        this.filterSettings = { type: "highpass", f0: 10, f1: 10, f2: 10, f3: 10, f4: 10, resonance: 0, t1msec: 5, t2msec: 1000, t3msec: 5, t4msec: 500 };
        this.started = false;
        this.startScheduled = false;
        this.stopped = false;
        this.stopScheduled = false;
    }

    setFilter(type, f0, f1, f2, f3, f4, resonance, t1msec, t2msec, t3msec, t4msec) {
        const freqMin = 10;

        this.filterSettings.type = type;
        this.filterSettings.f0 = Math.max(freqMin, f0); // start frequency
        this.filterSettings.f1 = Math.max(freqMin, f1);
        this.filterSettings.f2 = Math.max(freqMin, f2); 
        this.filterSettings.f3 = Math.max(freqMin, f3);
        this.filterSettings.f4 = Math.max(freqMin, f4);
        this.filterSettings.resonance = resonance;
        this.filterSettings.t1msec = t1msec;
        this.filterSettings.t2msec = t2msec;
        this.filterSettings.t3msec = t3msec;
        this.filterSettings.t4msec = t4msec;

        this.filter.type = this.filterSettings.type;
        this.filter.frequency.value = this.filterSettings.f0;
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

        const t1sec = this.filterSettings.t1msec / 1000;
        const t2sec = this.filterSettings.t2msec / 1000;
        const t3sec = this.filterSettings.t3msec / 1000;
        this.filter.frequency.setValueAtTime(safeTarget(this.filterSettings.f0), startTime);
        this.filter.frequency.linearRampToValueAtTime(safeTarget(this.filterSettings.f1), startTime + t1sec);
        this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.f2), startTime + t1sec + t2sec);
        this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.f3), startTime + t1sec + t2sec + t3sec);

        await new Promise(resolve => setTimeout(resolve, preDelay * 1000));
        this.started = true;
        await new Promise(resolve => setTimeout(resolve, 2 * 1000));
        this.stop();
    }

    async stop() {
        if (this.stopScheduled) return;

        const isFirefox = typeof InstallTrigger !== "undefined";
        let currentFreq = safeTarget(this.filterSettings.f0);        

        this.stopScheduled = true;
        const stopTime = this.audioContext.currentTime;
        const t1sec = this.filterSettings.t1msec / 1000;
        const t2sec = this.filterSettings.t2msec / 1000;
        const t3sec = this.filterSettings.t3msec / 1000;
        const t4sec = this.filterSettings.t4msec / 1000;

        if (isFirefox) {
            // Calculate current frequency
            currentFreq = safeTarget(this.filterSettings.f0);
            if (this.startTime !== null) {
                const elapsed = this.audioContext.currentTime - this.startTime;
                if (elapsed <= t1sec) {
                    currentFreq = safeTarget(this.filterSettings.f1 * (elapsed / t1sec));
                }
                if ((elapsed > t1sec) && (elapsed <= (t1sec + t2sec))) {
                    const t2secElapsed = elapsed - t1sec;
                    const t2secRatio = t2secElapsed / t2sec;
                    currentFreq = safeTarget(this.filterSettings.f1 * Math.pow(this.filterSettings.f2 / this.filterSettings.f1, t2secRatio));
                }
                if ((elapsed > (t1sec + t2sec)) && (elapsed <= (t1sec + t2sec + t3sec))) {
                    const t3secElapsed = elapsed - (t1sec + t2sec);
                    const t3secRatio = t3secElapsed / t3sec;
                    currentFreq = safeTarget(this.filterSettings.f2 * Math.pow(this.filterSettings.f3 / this.filterSettings.f2, t3secRatio));
                }
                if (elapsed > (t1sec + t2sec + t3sec)) {
                    currentFreq = safeTarget(this.filterSettings.f3);
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
        this.filter.frequency.exponentialRampToValueAtTime(safeTarget(this.filterSettings.f4), stopTime + t4sec);

        await new Promise(resolve => setTimeout(resolve, (t4sec + 0.02) * 1000));
        try { this.filter.disconnect(); } catch(e) { /* ignore */ }
        this.stopped = true;
    }
}

export { Filter };
