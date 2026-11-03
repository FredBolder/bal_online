import { CombFilter } from "./combFilter.js";
import { Operator } from "./operator.js";

export function createBassDrum(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let decayFactorOsc1 = 1;
    let freqOsc1 = 55;
    let phase = 20;
    let pitchDecay = 100;
    let pitchStart = 1200;
    let waveform = "sine";

    switch (variation) {
        case 1:
            pitchDecay = 75;
            waveform = "triangle";
            break;
        default:
            break;
    }
    if ((waveform === "sine") && (phase !== 0)) {
        waveform += phase.toString();
    }
    operators.push(new Operator(audioCtx, waveform, freqOsc1, 0, maxVolume * 1, 0, 400 * decayFactorOsc1, 0, 100));
    operators[0].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[0].setReleasePitchEnvelope(pitchDecay, 0);
}

export function createCowbell(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let decayFactorOsc1 = 1;
    let freqOsc1 = 565;
    const levelFactor = 1 / 1.275;

    switch (variation) {
        case 1:
            decayFactorOsc1 = 1.1;
            freqOsc1 = 500;
            break;
        default:
            break;
    }

    const release = 200 * decayFactorOsc1;
    operators.push(new Operator(audioCtx, "sine", freqOsc1, 0, maxVolume * 0.767 * levelFactor, 4, 250, 0, 20));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 1.81061946902655, 0, maxVolume * 0.079 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 2.55221238938053, 0, maxVolume * 0.082 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 3.09557522123894, 0, maxVolume * 0.082 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 3.46194690265487, 0, maxVolume * 0.034 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 4.03185840707965, 0, maxVolume * 0.129 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 6.16637168141593, 0, maxVolume * 0.038 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 8.37522123893805, 0, maxVolume * 0.064 * levelFactor, 4, 250 * decayFactorOsc1, 0, release));
}

export function createCrashCymbal(context, variation = 0) {
    const { audioCtx, filter1, filter2, maxVolume, operators } = context;
    let { combFilter } = context;
    let cf_delay = 4;
    let cf_feedback = 0.25;
    let cf_hp = 300;
    let cf_lp = 15000;
    let cf_wet = 0.3;
    let decayFactor = 1;
    let hp_f0 = 500;
    let hp_f1 = 500;
    let hp_f2 = 500;
    let hp_f3 = 500;
    let hp_f4 = 500;
    let hp_resonance = 0;
    let lp_f0 = 500;
    let lp_f1 = 500;
    let lp_f2 = 500;
    let lp_f3 = 500;
    let lp_f4 = 500;
    let lp_resonance = 0;
    let metalVolume = 0.8;
    let noiseVolume = 0.8;
    let t1 = 5;
    let t2 = 5;
    let t3 = 5;
    let t4 = 5;

    switch (variation) {
        case 1:
            cf_delay = 6;
            cf_feedback = 0.32;
            cf_hp = 220;
            cf_lp = 12000;
            cf_wet = 0.35;
            t1 = 5;
            t2 = 35;
            t3 = 150;
            t4 = 700;
            hp_f0 = 250;
            hp_f1 = 900;
            hp_f2 = 2200;
            hp_f3 = 1400;
            hp_f4 = 700;
            hp_resonance = 2;
            lp_f0 = 15500;
            lp_f1 = 7000;
            lp_f2 = 12000;
            lp_f3 = 8000;
            lp_f4 = 4500;
            lp_resonance = 2;
            metalVolume = 0.9;
            noiseVolume = 0.6;
            break;
        default:
            cf_delay = 4;
            cf_feedback = 0.25;
            cf_hp = 300;
            cf_lp = 15000;
            cf_wet = 0.3;
            t1 = 4;
            t2 = 20;
            t3 = 120;
            t4 = 600;
            hp_f0 = 400;
            hp_f1 = 1200;
            hp_f2 = 3000;
            hp_f3 = 1800;
            hp_f4 = 900;
            hp_resonance = 2;
            lp_f0 = 18000;
            lp_f1 = 9000;
            lp_f2 = 14000;
            lp_f3 = 9000;
            lp_f4 = 5000;
            lp_resonance = 2;
            metalVolume = 0.8;
            noiseVolume = 0.8;
            break;
    }
    operators.push(new Operator(audioCtx, "crashNoise", 1000, 0, maxVolume * metalVolume, 1.5, 3000 * decayFactor, 0, 1000 * decayFactor));
    operators.push(new Operator(audioCtx, "noise", 1000, 0, maxVolume * noiseVolume, 1.5, 2000 * decayFactor, 0, 700 * decayFactor));

    filter1.setFilter("highpass", hp_f1, hp_resonance);
    filter1.setFilterEnvelope(hp_f0, [
        { time: t1, value: hp_f1, curveType: "exponential" },
        { time: t2, value: hp_f2, curveType: "exponential" },
        { time: t3, value: hp_f3, curveType: "exponential" }
    ]);
    filter1.setReleaseFilterEnvelope(t4, hp_f4);

    filter2.setFilter("lowpass", lp_f0, lp_resonance);
    filter2.setFilterEnvelope(lp_f0, [
        { time: t1, value: lp_f1, curveType: "exponential" },
        { time: t2, value: lp_f2, curveType: "exponential" },
        { time: t3, value: lp_f3, curveType: "exponential" }
    ]);
    filter2.setReleaseFilterEnvelope(t4, lp_f4);

    combFilter = new CombFilter(audioCtx);
    combFilter.setWet(cf_wet);
    combFilter.setDelayTime(cf_delay);
    combFilter.setFeedback(cf_feedback);
    combFilter.setHP(cf_hp);
    combFilter.setLP(cf_lp);
}

export function createCrossStick(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;

    switch (variation) {
        case 1: {
            // Click (metallic rim)
            operators.push(new Operator(audioCtx, "noiseAndBPF", 7400, 68, maxVolume, 0, 6, 0, 6));

            // Main wood resonance 1 + inharmonic overtones
            let w1 = 1000;
            operators.push(new Operator(audioCtx, "sine", w1, 0, maxVolume * 0.20, 0, 35, 0, 35));
            operators.push(new Operator(audioCtx, "sine", w1 * 1.48 + 1.5, 0, maxVolume * 0.08, 0, 35, 0, 35));
            operators.push(new Operator(audioCtx, "sine", w1 * 2.03 + 2.5, 0, maxVolume * 0.04, 0, 35, 0, 35));

            // Main wood resonance 2 + inharmonic overtones
            let w2 = 700;
            operators.push(new Operator(audioCtx, "sine", w2, 0, maxVolume * 0.12, 0, 40, 0, 40));
            operators.push(new Operator(audioCtx, "sine", w2 * 1.52 + 1.2, 0, maxVolume * 0.05, 0, 40, 0, 40));
            operators.push(new Operator(audioCtx, "sine", w2 * 1.98 + 2.0, 0, maxVolume * 0.025, 0, 40, 0, 40));

            // Tiny metallic noise
            operators.push(new Operator(audioCtx, "noiseAndBPF", 11000, 80, maxVolume * 0.04, 0, 5, 0, 5));
            break;
        }
        default: {
            // Click (metallic rim)
            operators.push(new Operator(audioCtx, "noiseAndBPF", 6700, 64, maxVolume, 0, 7, 0, 7));

            // Main wood resonance 1 + inharmonic overtones
            let w3 = 820;
            operators.push(new Operator(audioCtx, "sine", w3, 0, maxVolume * 0.22, 0, 35, 0, 35));
            operators.push(new Operator(audioCtx, "sine", w3 * 1.47 + 1.2, 0, maxVolume * 0.12, 0, 35, 0, 35));
            operators.push(new Operator(audioCtx, "sine", w3 * 2.01 + 2.0, 0, maxVolume * 0.06, 0, 35, 0, 35));

            // Main wood resonance 2 + inharmonic overtones
            let w4 = 580;
            operators.push(new Operator(audioCtx, "sine", w4, 0, maxVolume * 0.15, 0, 40, 0, 40));
            operators.push(new Operator(audioCtx, "sine", w4 * 1.53 + 1.5, 0, maxVolume * 0.08, 0, 40, 0, 40));
            operators.push(new Operator(audioCtx, "sine", w4 * 1.97 + 2.5, 0, maxVolume * 0.04, 0, 40, 0, 40));

            // Tiny metallic noise
            operators.push(new Operator(audioCtx, "noiseAndBPF", 11500, 80, maxVolume * 0.04, 0, 5, 0, 5));
            break;
        }
    }
}

export function createHiHat(context, variation = 0) {
    const { audioCtx, filter1, maxVolume, operators } = context;
    let { combFilter } = context;
    let cf_delay = 6;
    let cf_feedback = 0.32;
    let cf_hp = 220;
    let cf_lp = 12000;
    let cf_wet = 0.5;
    let decayFactor = 1;
    let filterFreq = 1500;
    let filterResonance = 1500;
    let metalVolume = 0.7;
    let noiseVolume = 0.1;
    const volumeFactor = 3;

    switch (variation) {
        default: // Closed hi-hat 1
            cf_delay = 1.4;
            cf_feedback = 0.22;
            cf_hp = 250;
            cf_lp = 11000;
            decayFactor = 0.7;
            filterFreq = 8500;
            filterResonance = 8;
            metalVolume = 0.65;
            noiseVolume = 0.25;
            cf_wet = 0.35;
            break;
        case 1: // Open hi-hat 1
            cf_wet = 0.42;
            cf_delay = 1.4;
            cf_feedback = 0.30;
            cf_hp = 250;
            cf_lp = 13000;
            decayFactor = 4.2;
            filterFreq = 8500;
            filterResonance = 12;
            metalVolume = 0.70;
            noiseVolume = 0.28;
            break;
        case 2: // Closed hi-hat 2
            cf_wet = 0.40;
            cf_delay = 1.9;
            cf_feedback = 0.28;
            cf_hp = 300;
            cf_lp = 14000;
            decayFactor = 0.9;
            filterFreq = 10000;
            filterResonance = 5;
            metalVolume = 0.75;
            noiseVolume = 0.20;
            break;
        case 3: // Open hi-hat 2
            cf_wet = 0.50;
            cf_delay = 1.9;
            cf_feedback = 0.35;
            cf_hp = 300;
            cf_lp = 15000;
            decayFactor = 3.7;
            filterFreq = 10000;
            filterResonance = 10;
            metalVolume = 0.78;
            noiseVolume = 0.30;
            break;
    }
    operators.push(new Operator(audioCtx, "hihatNoise", 1000, 0, maxVolume * volumeFactor * metalVolume, 0, 200 * decayFactor, 0, 50));
    operators.push(new Operator(audioCtx, "noise", 1000, 0, maxVolume * volumeFactor * noiseVolume, 0, 180 * decayFactor, 0, 50));
    filter1.setFilter("highpass", filterFreq, filterResonance);
    combFilter = new CombFilter(audioCtx);
    combFilter.setWet(cf_wet);
    combFilter.setDelayTime(cf_delay);
    combFilter.setFeedback(cf_feedback);
    combFilter.setHP(cf_hp);
    combFilter.setLP(cf_lp);
}

export function createNoiseDrum(context, variation = 0) {
    const { audioCtx, filter1, maxVolume, operators } = context;
    let decayFactorOsc1 = 1;

    switch (variation) {
        case 1:
            decayFactorOsc1 = 1.3;
            break;
        default:
            break;
    }
    operators.push(new Operator(audioCtx, "noiseAndLSF", 600, 100, maxVolume * 1, 0, 1000 * decayFactorOsc1, 0, 500));
    filter1.setFilter("lowpass", 2000, 0);
    filter1.setSimpleFilterEnvelope(2000, 200, 500);
    filter1.setReleaseFilterEnvelope(200, 500);
}

export function createRideCymbal(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let { combFilter } = context;
    let cf_wet = 0.2;
    let cf_delay = 5;
    let cf_feedback = 0.3;
    let cf_hp = 180;
    let cf_lp = 12000;

    switch (variation) {
        case 2:
            // Jazz ride
            // Transient
            operators.push(new Operator(audioCtx, "sine", 4800, 0, maxVolume * 0.08, 2, 8, 0, 50));
            operators.push(new Operator(audioCtx, "noiseAndHPF", 4500, 0, maxVolume * 0.12, 0, 10, 0, 30, 0.22));
            // Body
            operators.push(new Operator(audioCtx, "pinkNoiseAndBPF", 750, 52, maxVolume * 0.38, 0, 1500, 0, 100, 0.30));
            operators.push(new Operator(audioCtx, "pinkNoiseAndBPF", 1100, 58, maxVolume * 0.42, 0, 1300, 0, 100, 0.44));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 1800, 62, maxVolume * 0.36, 0, 1200, 0, 100, 0.40));
            // Mid/high shimmer
            operators.push(new Operator(audioCtx, "noiseAndBPF", 2600, 70, maxVolume * 0.22, 0, 1700, 0, 100, 0.28));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 4200, 74, maxVolume * 0.18, 0, 1800, 0, 100, 0.22));
            // Metal partials
            operators.push(new Operator(audioCtx, "rideNoiseAndBPF", 800, 58, maxVolume * 0.8, 0, 2000, 0, 100, 0.85));
            operators.push(new Operator(audioCtx, "rideNoiseAndBPF", 1300, 58, maxVolume * 0.7, 0, 1800, 0, 100, 0.78));
            // Comb filter
            cf_delay = 6.5;
            cf_feedback = 0.28;
            cf_hp = 180;
            cf_lp = 9000;
            cf_wet = 0.25;
            break;
        case 1:
            // Ride bell
            // Transient for bell ping
            operators.push(new Operator(audioCtx, "sine", 5200, 0, maxVolume * 0.18, 0, 12, 0, 50));
            operators.push(new Operator(audioCtx, "noiseAndHPF", 7000, 0, maxVolume * 0.22, 0, 20, 0, 22, 0.32));
            // Bell metallic harmonics
            operators.push(new Operator(audioCtx, "sine", 900, 0, maxVolume * 0.14, 2, 1600, 0, 120));
            operators.push(new Operator(audioCtx, "sine", 1400, 0, maxVolume * 0.10, 2, 1300, 0, 120));
            // Metallic broadband wash
            operators.push(new Operator(audioCtx, "noiseAndBPF", 1000, 92, maxVolume * 0.9, 0, 1600, 0, 100, 0.60));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 1800, 92, maxVolume * 0.7, 0, 1200, 0, 100, 0.50));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 3000, 90, maxVolume * 0.55, 0, 1000, 0, 100, 0.48));
            // Comb filter
            cf_delay = 3.8;
            cf_feedback = 0.33;
            cf_hp = 300;
            cf_lp = 13500;
            cf_wet = 0.28;
            break;
        default:
            // Normal ride (bow)
            // Transient
            operators.push(new Operator(audioCtx, "sine", 5200, 0, maxVolume * 0.14, 2, 10, 0, 40));
            operators.push(new Operator(audioCtx, "noiseAndHPF", 6000, 0, maxVolume * 0.18, 0, 14, 0, 20, 0.30));
            // Body
            operators.push(new Operator(audioCtx, "pinkNoiseAndBPF", 650, 58, maxVolume * 0.40, 0, 1400, 0, 120, 0.32));
            operators.push(new Operator(audioCtx, "pinkNoiseAndBPF", 1200, 62, maxVolume * 0.55, 0, 900, 0, 120, 0.60));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 2400, 66, maxVolume * 0.45, 0, 850, 0, 120, 0.62));
            // High metal
            operators.push(new Operator(audioCtx, "noiseAndBPF", 3600, 76, maxVolume * 0.28, 0, 1500, 0, 120, 0.35));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 6000, 80, maxVolume * 1.0, 0, 1600, 0, 120, 0.38));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 9000, 84, maxVolume * 0.06, 0, 1500, 0, 120, 0.24));
            // Metallic broadband wash
            operators.push(new Operator(audioCtx, "rideNoiseAndBPF", 900, 60, maxVolume * 1.0, 0, 2000, 0, 120, 1.0));
            operators.push(new Operator(audioCtx, "rideNoiseAndBPF", 1400, 60, maxVolume * 0.85, 0, 1500, 0, 120, 0.9));
            // Comb filter
            cf_delay = 5.0;
            cf_feedback = 0.28;
            cf_hp = 200;
            cf_lp = 11000;
            cf_wet = 0.22;
            break;
    }

    combFilter = new CombFilter(audioCtx);
    combFilter.setWet(cf_wet);
    combFilter.setDelayTime(cf_delay);
    combFilter.setFeedback(cf_feedback);
    combFilter.setHP(cf_hp);
    combFilter.setLP(cf_lp);
}

export function createSnareDrum(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let decayFactorNoise = 1;
    let decayFactorOsc1 = 1;
    let freqNoise = 1000;
    let freqOsc1 = 250;
    let levelFactorNoise = 0.4;
    let levelFactorOsc1 = 0.6;
    let pitchDecay = 50;
    let pitchStart = 120;

    switch (variation) {
        case 1:
            decayFactorNoise = 0.9;
            decayFactorOsc1 = 1.1;
            freqOsc1 = 180;
            freqNoise = 800;
            levelFactorNoise = 0.3;
            levelFactorOsc1 = 0.7;
            break;
        default:
            break;
    }
    operators.push(new Operator(audioCtx, "noiseAndHPF", freqNoise, 40, maxVolume * levelFactorNoise, 0, 500 * decayFactorNoise, 0, 125));
    operators.push(new Operator(audioCtx, "sine", freqOsc1, 0, maxVolume * levelFactorOsc1, 0, 400 * decayFactorOsc1, 0, 100));
    operators[1].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[1].setReleasePitchEnvelope(pitchDecay, 0);
}

export function createSplashCymbal(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;

    switch (variation) {
        case 1:
            // Stick
            operators.push(new Operator(audioCtx, "noiseAndHPF", 13000, 0, maxVolume * 0.12, 0, 11, 0, 15, 1.1));
            // Body
            operators.push(new Operator(audioCtx, "noiseAndBPF", 2000, 62, maxVolume * 0.65, 0, 1000, 0, 80, 0.55));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 3300, 70, maxVolume * 0.85, 0, 820, 0, 80, 0.75));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 5200, 78, maxVolume * 0.55, 0, 600, 0, 80, 0.60));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 8200, 86, maxVolume * 0.35, 0, 420, 0, 80, 0.45));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 12000, 90, maxVolume * 0.22, 0, 320, 0, 80, 0.28));
            break;
        default:
            // Stick
            operators.push(new Operator(audioCtx, "noiseAndHPF", 11000, 0, maxVolume * 0.14, 0, 10, 0, 18, 1.1));
            // Mids
            operators.push(new Operator(audioCtx, "noiseAndBPF", 1500, 58, maxVolume * 0.80, 0, 1100, 0, 90, 0.9));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 2800, 64, maxVolume * 1.0, 0, 900, 0, 90, 1.2));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 4200, 70, maxVolume * 0.85, 0, 600, 0, 90, 1.0));
            // High
            operators.push(new Operator(audioCtx, "noiseAndBPF", 6500, 78, maxVolume * 0.60, 0, 420, 0, 90, 0.72));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 9000, 85, maxVolume * 0.45, 0, 350, 0, 90, 0.50));
            operators.push(new Operator(audioCtx, "noiseAndBPF", 12500, 90, maxVolume * 0.30, 0, 260, 0, 90, 0.33));
            break;
    }
}

export function createTom(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let decayFactorNoise = 1.1;
    let decayFactorOsc1 = 1.1;
    let decayFactorOsc2 = 1;
    let freqOsc1 = 165;
    let levelFactorNoise = 0.2;
    let levelFactorOsc1 = 0.5;
    let levelFactorOsc2 = 0.3;
    let pitchDecay = 100;
    let pitchStart = 120;
    let ratio1 = 1.92;

    switch (variation) {
        case 1:
            decayFactorNoise = 1.2;
            decayFactorOsc1 = 1.2;
            freqOsc1 = 124;
            break;
        case 2:
            decayFactorNoise = 1.3;
            decayFactorOsc1 = 1.3;
            freqOsc1 = 92.5;
            break;
        case 3:
            decayFactorNoise = 1.4;
            decayFactorOsc1 = 1.4;
            freqOsc1 = 69.3;
            break;
        default:
            break;
    }
    const freqOsc2 = freqOsc1 * ratio1;
    operators.push(new Operator(audioCtx, "triangle", freqOsc1, 0, maxVolume * levelFactorOsc1, 0, 600 * decayFactorOsc1, 0, 100));
    operators[0].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[0].setReleasePitchEnvelope(pitchDecay, 0);
    operators.push(new Operator(audioCtx, "triangle", freqOsc2, 0, maxVolume * levelFactorOsc2, 0, 500 * decayFactorOsc2, 0, 100));
    operators[1].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[1].setReleasePitchEnvelope(pitchDecay, 0);
    operators.push(new Operator(audioCtx, "pinkNoise", 1000, 40, maxVolume * levelFactorNoise, 0, 100 * decayFactorNoise, 0, 125));
}

