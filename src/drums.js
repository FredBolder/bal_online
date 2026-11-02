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
    // Frequency is only used for noiseAndBPF, noiseAndHPF and noiseAndLPF
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
