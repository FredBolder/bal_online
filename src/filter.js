import { envelopeDuration, envelopeValue, startEnvelope } from "./envelopes.js";
import { setArray } from "./utils.js";

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

class Filter {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.filter = audioContext.createBiquadFilter();
        this.filterSettings = { type: "highpass", frequency: 10, resonance: 0 };
        this.filterEnvelopeStartValue = 10;
        this.filterEnvelope = [{ time: 5, value: 10, curveType: "lineair" }];
        this.filterReleaseEnvelope = [{ time: 5, value: 10, curveType: "lineair" }];
        this.started = false;
        this.startScheduled = false;
        this.stopped = false;
        this.stopScheduled = false;
    }

    setFilter(type, frequency, resonance) {
        this.filterSettings.type = type;
        this.filterSettings.frequency = frequency;
        this.filterSettings.resonance = resonance;

        this.filter.type = type;
        this.filter.frequency.value = frequency;
        if (["highshelf", "lowshelf"].includes(type)) {
            this.filter.gain.value = percentageToBoost(resonance);
        } else {
            this.filter.Q.value = resonancePercentToQ(resonance);
        }
        // By default the envelopes don't change the frequency
        this.setSimpleFilterEnvelope(frequency, 5, frequency);
        this.setReleaseFilterEnvelope(5, frequency);
    }

    setFilterEnvelope(startValue, envelope) {
        this.filterEnvelopeStartValue = startValue;
        setArray(this.filterEnvelope, envelope);
    }

    setReleaseFilterEnvelope(release, endValue) {
        setArray(this.filterReleaseEnvelope, [{ time: release, value: endValue, curveType: "exponential" }]);
    }

    setSimpleFilterEnvelope(startValue, decay, endValue) {
        this.filterEnvelopeStartValue = startValue;
        setArray(this.filterEnvelope, [{ time: decay, value: endValue, curveType: "exponential" }]);
    }

    async start(preDelay) {
        if (this.startScheduled) return;

        this.startScheduled = true;
        const startTime = this.audioContext.currentTime + preDelay;
        startEnvelope(this.filter.frequency, startTime, this.filterEnvelopeStartValue, this.filterEnvelope);

        await new Promise(resolve => setTimeout(resolve, preDelay * 1000));
        this.started = true;
    }

    stop() {
        if (this.stopped) {
            return Promise.resolve();
        }

        if (this.stopPromise) {
            return this.stopPromise;
        }

        this.stopPromise = this.stopInternal();
        return this.stopPromise;
    }

    async stopInternal() {
        if (this.stopScheduled) return;

        this.stopScheduled = true;
        const stopTime = this.audioContext.currentTime;
        const elapsed = (stopTime - this.startTime) * 1000;
        const currentFreq = envelopeValue(this.filter.frequency, this.filterEnvelopeStartValue, this.filterEnvelope, elapsed);
        this.filter.frequency.cancelScheduledValues(stopTime);
        startEnvelope(this.filter.frequency, stopTime, currentFreq, this.filterReleaseEnvelope);

        const duration = envelopeDuration(this.filterReleaseEnvelope);
        await new Promise(resolve => setTimeout(resolve, duration + 20));
        this.stopped = true;
    }
}

export { Filter };
