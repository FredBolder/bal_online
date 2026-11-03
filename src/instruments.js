import { noteToNumber } from "./music.js";
import { Operator } from "./operator.js";

export function createAccordion(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;
    const attack = 20;
    const decay = 80;
    const detune = 11;
    const f1 = 1 / 2.67;
    const f2 = 0.9;
    const release = 100;

    operators.push(new Operator(audioCtx, "sine", frequency, detune, maxVolume * 1 * f1, attack, decay, maxVolume * 1 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, detune, maxVolume * 0.5 * f1, attack, decay, maxVolume * 0.5 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, detune, maxVolume * 0.35 * f1, attack, decay, maxVolume * 0.35 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, detune, maxVolume * 0.25 * f1, attack, decay, maxVolume * 0.25 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, detune, maxVolume * 0.2 * f1, attack, decay, maxVolume * 0.2 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, detune, maxVolume * 0.15 * f1, attack, decay, maxVolume * 0.15 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, detune, maxVolume * 0.12 * f1, attack, decay, maxVolume * 0.12 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, detune, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 9, detune, maxVolume * 0.07 * f1, attack, decay, maxVolume * 0.07 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 10, detune, maxVolume * 0.05 * f1, attack, decay, maxVolume * 0.05 * f1 * f2, release));
    filter1.setFilter("lowpass", 8000, 0);
}

export function createAltsax(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const f1 = 1 / 3.02;
    const f2 = 0.9;
    const f3 = 0.05;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.9 * f1, 20, 1000, maxVolume * 0.9 * f1 * f2, 1000 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.7 * f1, 30, 900, maxVolume * 0.7 * f1 * f2, 900 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.55 * f1, 30, 800, maxVolume * 0.55 * f1 * f2, 800 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.35 * f1, 40, 700, maxVolume * 0.35 * f1 * f2, 700 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.25 * f1, 50, 600, maxVolume * 0.25 * f1 * f2, 600 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.15 * f1, 50, 500, maxVolume * 0.15 * f1 * f2, 500 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.08 * f1, 50, 400, maxVolume * 0.08 * f1 * f2, 400 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.04 * f1, 60, 300, maxVolume * 0.04 * f1 * f2, 300 * f3));
    for (let i = 0; i < operators.length; i++) {
        operators[i].setSimplePitchEnvelope(-15, 40, 0);
        operators[i].setReleasePitchEnvelope(40, 0);
    }
}

export function createBass(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;

    operators.push(new Operator(audioCtx, "pulse45", frequency * 0.5, 0, maxVolume, 3, 1700, 0, 425));
    filter1.setFilter("lowpass", 500, 0);
    filter1.setSimpleFilterEnvelope(500, 1000, 90);
    filter1.setReleaseFilterEnvelope(250, 90);
}

export function createBell(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const decay = 2000;
    const f1 = 0.5;

    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 1 * f1, 5, decay, 0, 500));
    operators.push(new Operator(audioCtx, "sine", frequency * 3.0102, 0, maxVolume * 0.8 * f1, 5, decay * 0.8, 0, 500 * 0.8));
    operators.push(new Operator(audioCtx, "sine", frequency * 4.1658, 0, maxVolume * 0.8 * f1, 5, decay * 0.7, 0, 500 * 0.7));
    operators.push(new Operator(audioCtx, "sine", frequency * 5.4317, 0, maxVolume * 0.7 * f1, 5, decay * 0.6, 0, 500 * 0.6));
    operators.push(new Operator(audioCtx, "sine", frequency * 6.7974, 0, maxVolume * 0.65 * f1, 5, decay * 0.5, 0, 500 * 0.5));
    operators.push(new Operator(audioCtx, "sine", frequency * 8.2159, 0, maxVolume * 0.55 * f1, 5, decay * 0.4, 0, 500 * 0.4));
}

export function createBouzouki(context) {
    const { audioCtx, frequency, maxVolume, musicalNote, operators } = context;
    const noteNum = noteToNumber(musicalNote);
    const referenceNote = 48; // C4 reference

    // Band-pass cutoff tracking for sawtooth oscillator
    const cutoffBase = 2200;
    const hzPerSemitone = 15;
    const bandPassFrequency = Math.max(60, cutoffBase + (noteNum - referenceNote) * hzPerSemitone);
    const bandPassResonancePercent = 40;

    // Detune tracking
    const maxDetune = 6;
    const minDetune = 2;
    const noteLow = 24;  // C2
    const noteHigh = 72; // C6
    const clampedNote = Math.min(Math.max(noteNum, noteLow), noteHigh);
    const detuneTotal = maxDetune - (clampedNote - noteLow) / (noteHigh - noteLow) * (maxDetune - minDetune);

    const decayFactor = 1.1;
    const releaseFactor = 0.5;
    const volumeFactor = 1 / 2.3;

    operators.push(new Operator(audioCtx, "triangle", frequency * 1, detuneTotal, maxVolume * 1.0 * volumeFactor, 1, decayFactor * 1400, 0, releaseFactor * 1400));
    operators[0].setFilter("bandpass", bandPassFrequency, bandPassResonancePercent);
    operators[0].setSimplePitchEnvelope(6, 15, 0);
    operators[0].setReleasePitchEnvelope(15, 0);
    operators[0].setWaveShaper(2, 5, 0.6);
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.55 * volumeFactor, 0.5, decayFactor * 1200, 0, releaseFactor * 1200));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.35 * volumeFactor, 0.5, decayFactor * 1000, 0, releaseFactor * 1000));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.27 * volumeFactor, 0.5, decayFactor * 700, 0, releaseFactor * 700));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.19 * volumeFactor, 0.5, decayFactor * 450, 0, releaseFactor * 450));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.16 * volumeFactor, 0.5, decayFactor * 320, 0, releaseFactor * 320));
    // Pick
    operators.push(new Operator(audioCtx, "noiseAndBPF", 4000, 50, maxVolume * 0.18 * volumeFactor, 0, 50, 0, 8));
    // Body resonance
    //operators.push(new Operator(audioCtx, "sine", frequency * 0.6, 0, maxVolume * 0.003 * volumeFactor, 1, decayFactor * 2000, 0, releaseFactor * 2000));
    //operators[operators.length - 1].setFilter("lowpass", 800, 0);
}

export function createClarinet(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const attack = 7;
    const decay = 250;
    const f1 = 1 / 6.48;
    const f2 = 0.5;
    const release = 30;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.215 * f1, attack, decay, maxVolume * 0.215 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.9 * f1, attack, decay, maxVolume * 0.9 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.4 * f1, attack, decay, maxVolume * 0.4 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.725 * f1, attack, decay, maxVolume * 0.725 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.525 * f1, attack, decay, maxVolume * 0.525 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, release));
}

export function createGuitar(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;

    operators.push(new Operator(audioCtx, "pulse75", frequency, 0, maxVolume * 0.8, 2, 2200, 0, 500));
    filter1.setFilter("lowpass", 1500, 10, 0);
    filter1.setSimpleFilterEnvelope(1500, 800, 1100);
    filter1.setReleaseFilterEnvelope(600, 1100);
}

export function createHammondOrgan(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const attack = 3;
    const decay = 50;
    const f1 = 1 / 3;
    const f2 = 1;
    const f3 = 0.7;

    operators.push(new Operator(audioCtx, "sine", frequency * 1, 0, maxVolume * 0.9 * f1, attack, decay, maxVolume * 0.9 * f1 * f2, 80));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 7, maxVolume * 0.6 * f1, attack, decay, maxVolume * 0.6 * f1 * f2, 80));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 7, maxVolume * 0.45 * f1, attack, decay, maxVolume * 0.4 * f1 * f2, 70));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.35 * f1, attack, decay, maxVolume * 0.35 * f1 * f2, 70));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.27 * f1, attack, decay, maxVolume * 0.22 * f1 * f2, 60));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.12 * f1, attack, decay, maxVolume * 0.12 * f1 * f2, 60));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.06 * f1, attack, decay, maxVolume * 0.06 * f1 * f2, 60));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, 50));
    operators.push(new Operator(audioCtx, "sine", frequency * 9, 0, maxVolume * 0.05 * f1, attack, decay, maxVolume * 0.05 * f1 * f2, 50));
    operators.push(new Operator(audioCtx, "sine", frequency * 10, 0, maxVolume * 0.04 * f1, attack, decay, maxVolume * 0.04 * f1 * f2, 40));
    operators.push(new Operator(audioCtx, "sine", frequency * 11, 0, maxVolume * 0.02 * f1, attack, decay, maxVolume * 0.02 * f1 * f2, 40));
    operators.push(new Operator(audioCtx, "sine", frequency * 12, 0, maxVolume * 0.02 * f1, attack, decay, maxVolume * 0.02 * f1 * f2, 40));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 3500, 10, maxVolume * 0.06 * f1, 0, 30, 0, 0));
    operators[1].setLfo("dco", "sine", 5.5, 1 * f3 / 1200, 0);
    operators[2].setLfo("dco", "sine", 5.5, 3 * f3 / 1200, 0);
    operators[3].setLfo("dco", "sine", 5.5, 4 * f3 / 1200, 0);
    operators[4].setLfo("dco", "sine", 5.5, 6 * f3 / 1200, 0);
    operators[5].setLfo("dco", "sine", 5.5, 8 * f3 / 1200, 0);
    operators[6].setLfo("dco", "sine", 5.5, 10 * f3 / 1200, 0);
    operators[7].setLfo("dco", "sine", 5.5, 12 * f3 / 1200, 0);
    operators[8].setLfo("dco", "sine", 5.5, 14 * f3 / 1200, 0);
    operators[9].setLfo("dco", "sine", 5.5, 16 * f3 / 1200, 0);
    operators[10].setLfo("dco", "sine", 5.5, 18 * f3 / 1200, 0);
    operators[11].setLfo("dco", "sine", 5.5, 20 * f3 / 1200, 0);
}

export function createHarp(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;

    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.4, 4, 2200, 0, 500));
    operators.push(new Operator(audioCtx, "square", frequency * 2, 0, maxVolume * 0.4, 4, 2200, 0, 500));
    filter1.setFilter("lowpass", 1200, 0);
    filter1.setSimpleFilterEnvelope(1200, 300, 500);
    filter1.setReleaseFilterEnvelope(250, 300);
}

export function createHarpsichord(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;

    operators.push(new Operator(audioCtx, "pulse40", frequency, 0, maxVolume * 0.4, 1, 1500, 0, 375));
    operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, 0, maxVolume * 0.6, 1, 1500, 0, 375));
    filter1.setFilter("lowpass", 5000, 50);
    filter1.setSimpleFilterEnvelope(5000, 500, 2500);
    filter1.setReleaseFilterEnvelope(125, 2500);
}

export function createKalimba(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.8, 5, 1000, 0, 250));
    operators.push(new Operator(audioCtx, "sine", frequency * 6.3, 0, maxVolume * 0.2, 5, 250, 0, 62));
}

export function createPiano(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;
    const decayFactorOsc1 = 2;
    let f1 = 1 / 1.62;
    const filterCutoff = Math.max(50, Math.min(300, frequency * 0.2));
    const fStart = 50;
    const fEnd = 300;
    const fCenter = (fStart + fEnd) / 2;
    const fVolume = 0.55;

    if ((frequency > fStart) && (frequency < fEnd)) {
        f1 = f1 * ((fVolume * (Math.abs(frequency - fCenter) / (fCenter - fStart))) + (1 - fVolume));
    }
    operators.push(new Operator(audioCtx, "sine", frequency * 1, 5, maxVolume * f1 * 0.9, 4, 900 * decayFactorOsc1, 0, 500));
    operators.push(new Operator(audioCtx, "triangle", frequency * 2, 5, maxVolume * f1 * 0.34, 3, 700 * decayFactorOsc1, 0, 420));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * f1 * 0.14, 3, 500, 0, 300));
    operators.push(new Operator(audioCtx, "sine", frequency * 3.02, 0, maxVolume * f1 * 0.06, 2, 160, 0, 180));
    operators.push(new Operator(audioCtx, "triangle", frequency * 5.3, 0, maxVolume * f1 * 0.08, 2, 140, 0, 160));
    operators.push(new Operator(audioCtx, "pulse10", frequency * 1, 0, maxVolume * f1 * 0.1, 1, 45, 0, 80));
    filter1.setFilter("highpass", filterCutoff, 5);
}

export function createPipeOrgan(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const attack = 3;
    const f1 = 1 / 4.82;
    const f2 = 0.9;
    const decay = 50;
    const release = 80;

    operators.push(new Operator(audioCtx, "sine", frequency * 1, 0, maxVolume * 0.5 * f1, attack, decay, maxVolume * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.5 * f1, attack, decay, maxVolume * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine5", frequency * 2, 0, maxVolume * 0.85 * f1, attack, decay, maxVolume * 0.85 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine8", frequency * 3, 0, maxVolume * 0.65 * f1, attack, decay, maxVolume * 0.65 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine4", frequency * 4, 0, maxVolume * 0.5 * f1, attack, decay, maxVolume * 0.5 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.3 * f1, attack, decay, maxVolume * 0.3 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine1", frequency * 6, 0, maxVolume * 0.2 * f1, attack, decay, maxVolume * 0.2 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine3", frequency * 7, 0, maxVolume * 0.12 * f1, attack, decay, maxVolume * 0.12 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine7", frequency * 8, 0, maxVolume * 0.08 * f1, attack, decay, maxVolume * 0.08 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine3", frequency * 9, 0, maxVolume * 0.05 * f1, attack, decay, maxVolume * 0.05 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine2", frequency * 10, 0, maxVolume * 0.04 * f1, attack, decay, maxVolume * 0.04 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine1", frequency * 11, 0, maxVolume * 0.02 * f1, attack, decay, maxVolume * 0.02 * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sine", frequency * 12, 0, maxVolume * 0.01 * f1, attack, decay, maxVolume * 0.01 * f1 * f2, release));
}

export function createSquareLead(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;
    const attack = 7;
    const decay = 1000;
    const f1 = 0.8;
    const f2 = 0.6;
    const release = 100;

    operators.push(new Operator(audioCtx, "square", frequency, 7, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
    filter1.setFilter("lowpass", 2500, 0);
    operators[0].setSimplePitchEnvelope(60, 50, 0);
    operators[0].setReleasePitchEnvelope(50, 0);
}

export function createStrings1(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;
    const attack = 100;
    const decay = 1000;
    const f1 = 1;
    const f2 = 0.8;
    const release = 100;

    operators.push(new Operator(audioCtx, "sawtooth", frequency, 10, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
    operators[0].setLfo("dco", "sine", 4, 0.005, 250);
    filter1.setFilter("lowpass", 2000, 0);
    filter1.setFilterEnvelope(2000, [
        { time: attack, value: 2500, curveType: "exponential" },
        { time: decay, value: 2000, curveType: "exponential" }
    ]);
    filter1.setReleaseFilterEnvelope(release, 2000);
}

export function createStrings2(context) {
    const { audioCtx, filter1, frequency, maxVolume, operators } = context;
    const attack = 100;
    const decay = 1000;
    const f1 = 0.5;
    const f2 = 0.8;
    const release = 100;

    operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
    operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
    operators[0].setLfo("dco", "triangle", 5, 0.002, 100); // LFO only for the first oscillator
    filter1.setFilter("lowpass", 2500, 0);
    filter1.setFilterEnvelope(2500, [
        { time: attack, value: 3000, curveType: "exponential" },
        { time: decay, value: 2500, curveType: "exponential" }
    ]);
    filter1.setReleaseFilterEnvelope(release, 2500);
}

export function createTrombone(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const f1 = 1 / 3.02;
    const f2 = 0.5;
    const f3 = 0.05;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.95 * f1, 30, 1200, maxVolume * 0.95 * f1 * f2, 1200 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.85 * f1, 30, 1000, maxVolume * 0.85 * f1 * f2, 1000 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.65 * f1, 40, 900, maxVolume * 0.65 * f1 * f2, 900 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.5 * f1, 40, 800, maxVolume * 0.5 * f1 * f2, 800 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.35 * f1, 50, 700, maxVolume * 0.35 * f1 * f2, 700 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.25 * f1, 50, 600, maxVolume * 0.25 * f1 * f2, 600 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.12 * f1, 50, 500, maxVolume * 0.12 * f1 * f2, 500 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.06 * f1, 60, 400, maxVolume * 0.06 * f1 * f2, 400 * f3));
    for (let i = 0; i < operators.length; i++) {
        operators[i].setSimplePitchEnvelope(20, 50, 0);
        operators[i].setReleasePitchEnvelope(50, 0);
    }
}

export function createTrumpet(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const f1 = 1 / 3.35;
    const f2 = 0.9;
    const f3 = 0.05;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.95 * f1, 10, 1000, maxVolume * 0.95 * f1 * f2, 1000 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.75 * f1, 20, 800, maxVolume * 0.75 * f1 * f2, 800 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.55 * f1, 30, 700, maxVolume * 0.55 * f1 * f2, 700 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.45 * f1, 30, 600, maxVolume * 0.45 * f1 * f2, 600 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.3 * f1, 40, 500, maxVolume * 0.3 * f1 * f2, 500 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.2 * f1, 40, 400, maxVolume * 0.2 * f1 * f2, 400 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.1 * f1, 40, 300, maxVolume * 0.1 * f1 * f2, 300 * f3));
    operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.05 * f1, 50, 200, maxVolume * 0.05 * f1 * f2, 200 * f3));
    for (let i = 0; i < operators.length; i++) {
        operators[i].setSimplePitchEnvelope(10, 20, 0);
        operators[i].setReleasePitchEnvelope(20, 0);
    }
}

export function createVibraphone(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const f1 = 1.2;

    operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.5, 5, 1000 * f1, 0, 500 * f1));
    operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.3, 5, 750 * f1, 0, 375 * f1));
    operators.push(new Operator(audioCtx, "sine", frequency * 10, 0, maxVolume * 0.2, 5, 400 * f1, 0, 200 * f1));
    for (let i = 0; i < operators.length; i++) {
        operators[i].setLfo("dca", "sine", 4, 0.5, 0);
    }
}

export function createXylophone(context) {
    const { audioCtx, frequency, maxVolume, operators } = context;
    const decay = 1000;
    const f1 = 0.6;

    operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 1 * f1, 4, decay, 0, decay));
    operators.push(new Operator(audioCtx, "sine", frequency * 5.512, 0, maxVolume * 0.15 * f1, 4, decay * 0.5, 0, decay * 0.5));
    operators.push(new Operator(audioCtx, "sine", frequency * 10.808, 0, maxVolume * 0.5 * f1, 4, decay * 0.3, 0, decay * 0.3));
}
