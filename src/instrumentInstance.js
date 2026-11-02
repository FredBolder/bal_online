import { globalVars } from "./glob.js";
import { envelopeDuration } from "./envelopes.js";

export class InstrumentInstance {
    constructor(instrument) {
        this.instrument = instrument;

        this.operators = [];
        this.filters1 = [];
        this.filters2 = [];
        this.combFilters = [];
        this.waveShapers = [];
        this.extraNodes = [];

        this.autoClearTimer = null;
        this.clearPromise = null;
        this.startScheduled = false;
        this.delete = false;
    }

    addOperator(operator) {
        this.operators.push(operator);
    }

    addFilter1(filter) {
        this.filters1.push(filter);
    }

    addFilter2(filter) {
        this.filters2.push(filter);
    }

    addCombFilter(combFilter) {
        this.combFilters.push(combFilter);
    }

    addWaveShaper(waveShaper) {
        this.waveShapers.push(waveShaper);
    }

    addNode(node) {
        this.extraNodes.push(node);
    }

    clear() {
        if (!this.clearPromise) {
            if (this.autoClearTimer !== null) {
                clearTimeout(this.autoClearTimer);
                this.autoClearTimer = null;
            }

            this.clearPromise = this.clearInternal();
        }

        return this.clearPromise;
    }

    async clearInternal() {
        const operators = [...this.operators];
        const filters1 = [...this.filters1];
        const filters2 = [...this.filters2];
        const combFilters = [...this.combFilters];
        const extraNodes = [...this.extraNodes];

        // Stop all items
        const results = await Promise.allSettled([
            ...operators.map(item => item.stop()),
            ...filters1.map(item => item.stop()),
            ...filters2.map(item => item.stop()),
            ...combFilters.map(item => item.stop())
        ]);

        for (const result of results) {
            if (result.status === "rejected") {
                console.error("Instrument stop error:", result.reason);
            }
        }

        const safeDisconnect = (callback) => {
            try {
                callback();
            } catch (error) {
                console.error("Instrument disconnect error:", error);
            }
        };

        try {
            for (const operator of operators) {
                safeDisconnect(() => operator.disconnectNodes());
                operator.oscList.length = 0;
            }

            for (const filter of filters1) {
                safeDisconnect(() => filter.filter.disconnect());
            }

            for (const filter of filters2) {
                safeDisconnect(() => filter.filter.disconnect());
            }

            for (const combFilter of combFilters) {
                safeDisconnect(() => combFilter.disconnect());
            }

            for (const node of extraNodes) {
                safeDisconnect(() => node.disconnect());
            }
        } finally {
            // Release all references
            this.operators.length = 0;
            this.filters1.length = 0;
            this.filters2.length = 0;
            this.combFilters.length = 0;
            this.extraNodes.length = 0;

            this.delete = true;

            const index = globalVars.instrumentInstances.indexOf(this);

            if (index !== -1) {
                globalVars.instrumentInstances.splice(index, 1);
            }
        }
    }

    start(preDelay) {
        if (this.startScheduled || this.delete) return;

        this.startScheduled = true;

        let duration = 0;

        for (const operator of this.operators) {
            duration = Math.max(
                duration,
                envelopeDuration(operator.ampEnvelope)
            );
        }

        //const delay = preDelay * 1000 + duration + 2000;
        const delay = (preDelay * 1000) + 2000;

        this.autoClearTimer = setTimeout(() => {
            this.autoClearTimer = null;

            this.clear().catch(error => {
                console.error("Error clearing instrument instance:", error);
            });
        }, delay);
    }

}
