import { createMetalNoiseBuffer, getPreDelay, Operator } from "./operator.js";
import { Filter } from "./filter.js";
import { Reverb } from "./reverb.js";
let audioCtx = null;
let cymbalNoise = null;
let reverb = null;

if (typeof window !== "undefined") {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  reverb = new Reverb(audioCtx, "/Reverb/reverb.wav");
  cymbalNoise = createMetalNoiseBuffer(audioCtx, 2, {
    brightness: 0.7, // 0.7
    combCount: 6, // 6
    decay: 1, // 1
    partialCount: 40, // 40
    scrapeLevel: 0.6, // 0.6
    seed: 12345, // 12345
    strikeTime: 0.02, // 0.02
  });
}

let filtersList = [];
let operatorsList = [];

export function getCymbalNoise() {
  return cymbalNoise;
}

export function instruments() {
  return ["accordion", "altsax", "bass", "bassdrum", "bell", "clarinet", "cowbell", "drums", "guitar", "harp", "harpsichord", "hihat", "kalimba",
    "noisedrum", "piano", "pipeorgan", "snaredrum", "splashcymbal", "squarelead", "strings", "tom", "trombone", "trumpet", "vibraphone", "xylophone"]
}

export function noteToFreq(note) {
  const LETTER_SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  const match = note.match(/^([A-G])([#b]*)(-?\d+)$/i);
  if (!match) {
    throw new Error(`Invalid note format: "${note}"`);
  }

  let [, letter, accidentals, octaveStr] = match;
  letter = letter.toUpperCase();
  const octave = parseInt(octaveStr, 10);
  let semitone = LETTER_SEMITONES[letter];
  for (const char of accidentals) {
    if (char === '#') semitone += 1;
    else if (char === 'b') semitone -= 1;
  }
  const noteNumber = semitone + octave * 12;
  // A4 is semitone number 9 + 4*12 = 57; referenceFreq = 440 Hz
  const A4_NOTE_NUMBER = 9 + 4 * 12;
  const semitoneDiff = noteNumber - A4_NOTE_NUMBER;
  const freq = 440 * Math.pow(2, semitoneDiff / 12);
  return freq;
}

export async function playNote(instrument, volume, musicalNote) {
  let attack = 5;
  let decay = 500;
  let release = 100;
  let detune = 0;
  let f1 = 1;
  let f2 = 1;
  let f3 = 1;
  let frequency = 440;
  let maxVolume = 1;
  let note = "";
  let volumeFactor = 1;
  const newOperatorsList = [];
  let operators = [];
  const newFiltersList = [];
  let filter;

  // Variations
  let decayFactorNoise = 500;
  let decayFactorOsc1 = 500;
  let decayFactorOsc2 = 500;
  let filterResonance = 0;
  let filterResonanceFactor = 1;
  let freqNoise = 1000;
  let freqOsc1 = 500;
  let freqOsc2 = 500;
  let levelFactorNoise = 0.4;
  let levelFactorOsc1 = 0.6;
  let levelFactorOsc2 = 0;
  let phase = 0;
  let pitchDecay = 50;
  let pitchStart = 0.1;
  let ratio1 = 1;
  let waveform = "";
  let wf = "";

  function createBassDrum(variation = 0) {
    decayFactorOsc1 = 1;
    freqOsc1 = 55;
    phase = 20;
    pitchDecay = 100;
    pitchStart = 1;
    waveform = "sine";
    switch (variation) {
      case 1:
        pitchDecay = 75;
        waveform = "triangle";
        break;
      default:
        break;
    }
    wf = waveform;
    if ((waveform === "sine") && (phase !== 0)) {
      wf = "sine" + phase.toString();
    }
    operators.push(new Operator(audioCtx, wf, 55, 0, maxVolume * 1, 0, 400 * decayFactorOsc1, 0, 100));
    operators[0].setPitchEnv(1, pitchDecay, 0);
  }

  function createCowbell(variation = 0) {
    freqOsc1 = 565;
    decayFactorOsc1 = 1;
    switch (variation) {
      case 1:
        freqOsc1 = 500;
        decayFactorOsc1 = 1.1;
        break;
      default:
        break;
    }
    f1 = 1 / 1.275;
    release = 200 * decayFactorOsc1;
    operators.push(new Operator(audioCtx, "sine", freqOsc1, 0, maxVolume * 0.767 * f1, 4, 250, 0, 20));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 1.81061946902655, 0, maxVolume * 0.079 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 2.55221238938053, 0, maxVolume * 0.082 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 3.09557522123894, 0, maxVolume * 0.082 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 3.46194690265487, 0, maxVolume * 0.034 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 4.03185840707965, 0, maxVolume * 0.129 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 6.16637168141593, 0, maxVolume * 0.038 * f1, 4, 250 * decayFactorOsc1, 0, release));
    operators.push(new Operator(audioCtx, "sine", freqOsc1 * 8.37522123893805, 0, maxVolume * 0.064 * f1, 4, 250 * decayFactorOsc1, 0, release));
  }

  function createHiHat(variation = 0) {
    decayFactorOsc1 = 1;
    filterResonance = 15;
    switch (variation) {
      case 1:
        decayFactorOsc1 = 5;
        filterResonance = 50;
        break;
      default:
        break;
    }
    // Frequency is only used for noiseAndBPF, noiseAndHPF and noiseAndLPF
    operators.push(new Operator(audioCtx, "metalNoise", 1000, 0, maxVolume * 0.7, 0, 200 * decayFactorOsc1, 0, 50));
    operators.push(new Operator(audioCtx, "noise", 1000, 0, maxVolume * 0.1, 0, 200 * decayFactorOsc1, 0, 50));
    filter.setFilter("highpass", 1500, 1500, 1500, 1500, filterResonance, 0, 200 * decayFactorOsc1, 250);
  }

  function createNoiseDrum(variation = 0) {
    decayFactorOsc1 = 1;
    switch (variation) {
      case 1:
        decayFactorOsc1 = 1.3;
        break;
      default:
        break;
    }
    // Frequency is only used for noiseAndBPF, noiseAndHPF and noiseAndLPF
    operators.push(new Operator(audioCtx, "noiseAndLSF", 600, 100, maxVolume * 1, 0, 1000 * decayFactorOsc1, 0, 500));
    filter.setFilter("lowpass", 2000, 2000, 500, 500, 0, 0, 200, 200);
  }

  function createSnareDrum(variation = 0) {
    decayFactorNoise = 1;
    decayFactorOsc1 = 1;
    freqNoise = 1000;
    freqOsc1 = 250;
    levelFactorNoise = 0.4;
    levelFactorOsc1 = 0.6;
    pitchDecay = 50;
    pitchStart = 0.1;
    switch (variation) {
      case 1:
        freqOsc1 = 180;
        freqNoise = 800;
        decayFactorNoise = 0.9;
        decayFactorOsc1 = 1.1;
        levelFactorNoise = 0.3;
        levelFactorOsc1 = 0.7;
        break;
      default:
        break;
    }
    operators.push(new Operator(audioCtx, "noiseAndHPF", freqNoise, 40, maxVolume * levelFactorNoise, 0, 500 * decayFactorNoise, 0, 125));
    operators.push(new Operator(audioCtx, "sine", freqOsc1, 0, maxVolume * levelFactorOsc1, 0, 400 * decayFactorOsc1, 0, 100));
    operators[1].setPitchEnv(pitchStart, pitchDecay, 0);
  }

  function createSplashCymbal(variation = 0) {
    decayFactorOsc1 = 1;
    filterResonanceFactor = 1;
    f1 = 1;
    switch (variation) {
      case 1:
        filterResonanceFactor = 0.8;
        filterResonanceFactor = 0.9;
        break;
      default:
        break;
    }
    operators.push(new Operator(audioCtx, "noiseAndHPF", 4000, 0, maxVolume * f1, 0, 50, 0, 50, 1.5));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 1200, 64 * filterResonanceFactor, maxVolume * f1, 0, 1200 * decayFactorOsc1, 0, 100, 1.2));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 2400, 64 * filterResonanceFactor, maxVolume * f1, 0, 640 * decayFactorOsc1, 0, 100, 1.6));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 3600, 64 * filterResonanceFactor, maxVolume * f1, 0, 480 * decayFactorOsc1, 0, 100, 1.3));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 5200, 73 * filterResonanceFactor, maxVolume * f1, 0, 340 * decayFactorOsc1, 0, 100, 1));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 7500, 79 * filterResonanceFactor, maxVolume * f1, 0, 260 * decayFactorOsc1, 0, 100, 0.8));
    operators.push(new Operator(audioCtx, "noiseAndBPF", 10500, 85 * filterResonanceFactor, maxVolume * f1, 0, 180 * decayFactorOsc1, 0, 100, 0.6));
  }

  function createTom(variation = 0) {
    decayFactorNoise = 1;
    decayFactorOsc1 = 1;
    decayFactorOsc2 = 1;
    freqOsc1 = 165;
    levelFactorNoise = 0.2;
    levelFactorOsc1 = 0.5;
    levelFactorOsc2 = 0.3;
    pitchDecay = 100;
    pitchStart = 0.1;
    ratio1 = 1.92;
    switch (variation) {
      case 1:
        decayFactorNoise = 1.1;
        decayFactorOsc1 = 1.1;
        freqOsc1 = 124;
        break;
      case 2:
        decayFactorNoise = 1.2;
        decayFactorOsc1 = 1.2;
        freqOsc1 = 92.5;
        break;
      case 3:
        decayFactorNoise = 1.3;
        decayFactorOsc1 = 1.3;
        freqOsc1 = 69.3;
        break;
      default:
        break;
    }
    freqOsc2 = freqOsc1 * ratio1;
    operators.push(new Operator(audioCtx, "triangle", freqOsc1, 0, maxVolume * levelFactorOsc1, 0, 600 * decayFactorOsc1, 0, 100));
    operators.push(new Operator(audioCtx, "triangle", freqOsc2, 0, maxVolume * levelFactorOsc2, 0, 500 * decayFactorOsc2, 0, 100));
    operators.push(new Operator(audioCtx, "pinkNoise", 1000, 40, maxVolume * levelFactorNoise, 0, 100 * decayFactorNoise, 0, 125));
    operators[0].setPitchEnv(pitchStart, pitchDecay, 0);
    operators[1].setPitchEnv(pitchStart, pitchDecay, 0);
  }

  const convolver = reverb.getConvolver();

  if (!convolver) {
    return;
  }
  if ((musicalNote === "") || musicalNote.includes("-") || musicalNote.includes("_")) {
    return;
  }

  note = musicalNote;

  const masterVol = Math.max(0, Math.min(volume / 100, 1)); // 0..1
  volumeFactor = 0.75;
  if (note.startsWith("*")) { 
    volumeFactor = 1; note = note.slice(1); 
  } else if (note.startsWith(".")) { 
    volumeFactor = 0.5; note = note.slice(1); 
  }
  const BASE = 0.6;
  maxVolume = BASE * masterVol * volumeFactor;

  frequency = noteToFreq(note);
  filter = new Filter(audioCtx);
  filter.setFilter("highpass", 10, 10, 10, 10, 0, 5, 1000, 500);

  for (let i = 0; i < operatorsList.length; i++) {
    if ((operatorsList[i].instrument === instrument)) {
      operatorsList[i].operator.stop();
    }
    if (operatorsList[i].operator.stopped) {
      for (let j = 0; j < operatorsList[i].operator.oscList.length; j++) {
        operatorsList[i].operator.oscList[j].disconnect();
      }
      operatorsList[i].operator.amp.disconnect();
    } else {
      newOperatorsList.push(operatorsList[i]);
    }
  }
  operatorsList = newOperatorsList;

  for (let i = 0; i < filtersList.length; i++) {
    if ((filtersList[i].instrument === instrument)) {
      filtersList[i].filter.stop();
    }
    if (!filtersList[i].filter.stopped) {
      newFiltersList.push(filtersList[i]);
    }
  }
  filtersList = newFiltersList;

  switch (instrument) {
    case "accordion":
      attack = 20;
      decay = 80;
      release = 100;
      detune = 11;
      f1 = 1 / 2.67;
      f2 = 0.9;
      f3 = 0.9;
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
      filter.setFilter("lowpass", 8000, 8000, 8000, 8000, 0, 0, 500, 250);
      break;
    case "altsax":
      f1 = 1 / 3.02;
      f2 = 0.9;
      f3 = 0.05;
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.9 * f1, 20, 1000, maxVolume * 0.9 * f1 * f2, 1000 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.7 * f1, 30, 900, maxVolume * 0.7 * f1 * f2, 900 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.55 * f1, 30, 800, maxVolume * 0.55 * f1 * f2, 800 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.35 * f1, 40, 700, maxVolume * 0.35 * f1 * f2, 700 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.25 * f1, 50, 600, maxVolume * 0.25 * f1 * f2, 600 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.15 * f1, 50, 500, maxVolume * 0.15 * f1 * f2, 500 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.08 * f1, 50, 400, maxVolume * 0.08 * f1 * f2, 400 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.04 * f1, 60, 300, maxVolume * 0.04 * f1 * f2, 300 * f3));
      for (let i = 0; i < operators.length; i++) {
        operators[i].setPitchEnv(-15 / 1200, 40, 0);
      }
      break;
    case "bass":
      operators.push(new Operator(audioCtx, "pulse45", frequency * 0.5, 0, maxVolume, 3, 1700, 0, 425));
      filter.setFilter("lowpass", 500, 500, 90, 90, 0, 5, 1000, 250);
      break;
    case "bassdrum":
      switch (note) {
        case "C4":
          createBassDrum(0);
          break;
        case "D4":
          createBassDrum(1);
          break;
        default:
          break;
      }
      break;
    case "bell":
      decay = 2000;
      f1 = 0.5;
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 1 * f1, 5, decay, 0, 500));
      operators.push(new Operator(audioCtx, "sine", frequency * 3.0102, 0, maxVolume * 0.8 * f1, 5, decay * 0.8, 0, 500 * 0.8));
      operators.push(new Operator(audioCtx, "sine", frequency * 4.1658, 0, maxVolume * 0.8 * f1, 5, decay * 0.7, 0, 500 * 0.7));
      operators.push(new Operator(audioCtx, "sine", frequency * 5.4317, 0, maxVolume * 0.7 * f1, 5, decay * 0.6, 0, 500 * 0.6));
      operators.push(new Operator(audioCtx, "sine", frequency * 6.7974, 0, maxVolume * 0.65 * f1, 5, decay * 0.5, 0, 500 * 0.5));
      operators.push(new Operator(audioCtx, "sine", frequency * 8.2159, 0, maxVolume * 0.55 * f1, 5, decay * 0.4, 0, 500 * 0.4));
      break;
    case "clarinet":
      attack = 7;
      decay = 250;
      release = 30;
      f1 = 1 / 6.48;
      f2 = 0.5;
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.215 * f1, attack, decay, maxVolume * 0.215 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.9 * f1, attack, decay, maxVolume * 0.9 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.4 * f1, attack, decay, maxVolume * 0.4 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.725 * f1, attack, decay, maxVolume * 0.725 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.525 * f1, attack, decay, maxVolume * 0.525 * f1 * f2, release));
      operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, release));
      break;
    case "cowbell":
      switch (note) {
        case "C4":
          createCowbell(0);
          break;
        case "D4":
          createCowbell(1);
          break;
        default:
          break;
      }
      break;
    case "drums":
      switch (note) {
        case "C4":
          createBassDrum(0);
          break;
        case "D4":
          createBassDrum(1);
          break;
        case "E4":
          createSnareDrum(0);
          break;
        case "F4":
          createSnareDrum(1);
          break;
        case "G4":
          createHiHat(0);
          break;
        case "A4":
          createHiHat(1);
          break;
        case "B4":
          createTom(0);
          break;
        case "C5":
          createTom(1);
          break;
        case "D5":
          createTom(2);
          break;
        case "E5":
          createTom(3);
          break;
        case "F5":
          createCowbell(0);
          break;
        case "G5":
          createCowbell(1);
          break;
        case "A5":
          createNoiseDrum(0);
          break;
        case "B5":
          createNoiseDrum(1);
          break;
        case "C6":
          createSplashCymbal(0);
          break;
        case "D6":
          createSplashCymbal(1);
          break;
        default:
          break;
      }
      break;
    case "guitar":
      operators.push(new Operator(audioCtx, "pulse85", frequency, 0, maxVolume, 1, 2200, 0, 500));
      filter.setFilter("lowpass", 2000, 2000, 1600, 1600, 0, 0, 800, 600);
      break;
    case "harp":
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.4, 4, 2200, 0, 500));
      operators.push(new Operator(audioCtx, "square", frequency * 2, 0, maxVolume * 0.4, 4, 2200, 0, 500));
      filter.setFilter("lowpass", 1200, 1200, 500, 500, 0, 0, 300, 600);
      break;
    case "harpsichord":
      operators.push(new Operator(audioCtx, "pulse40", frequency, 0, maxVolume * 0.4, 1, 1500, 0, 375));
      operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, 0, maxVolume * 0.6, 1, 1500, 0, 375));
      filter.setFilter("lowpass", 5000, 5000, 2500, 2500, 50, 1, 500, 125);
      break;
    case "hihat":
      switch (note) {
        case "C4":
          createHiHat(0);
          break;
        case "D4":
          createHiHat(1);
          break;
        default:
          break;
      }
      break;
    case "kalimba":
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.8, 5, 1000, 0, 250));
      operators.push(new Operator(audioCtx, "sine", frequency * 6.3, 0, maxVolume * 0.2, 5, 250, 0, 62));
      break;
    case "noisedrum":
      switch (note) {
        case "C4":
          createNoiseDrum(0);
          break;
        case "D4":
          createNoiseDrum(1);
          break;
        default:
          break;
      }
      break;
    case "piano":
      f1 = 1 / 2.4;
      f2 = 1.7;
      f3 = 0.2;
      detune = 5;
      operators.push(new Operator(audioCtx, "sine", frequency, detune, maxVolume * 1 * f1, 2, 1000 * f2, 0, 1000 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 2, detune, maxVolume * 0.5 * f1, 2, 800 * f2, 0, 800 * f3));
      operators.push(new Operator(audioCtx, "cosine", frequency * 3, detune, maxVolume * 0.3 * f1, 2, 700 * f2, 0, 700 * f3));
      operators.push(new Operator(audioCtx, "cosine", frequency * 4, detune, maxVolume * 0.2 * f1, 2, 500 * f2, 0, 500 * f3));
      operators.push(new Operator(audioCtx, "cosine", frequency * 5, detune, maxVolume * 0.2 * f1, 2, 500 * f2, 0, 500 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 6, detune, maxVolume * 0.2 * f1, 2, 500 * f2, 0, 500 * f3));
      filter.setFilter("lowpass", 3000, 3000, 1200, 1200, 0, 0, 300, 300 * f3);
      break;
    case "pipeorgan":
      attack = 3;
      decay = 50;
      release = 80;
      f1 = 1 / 4.82;
      f2 = 0.9;
      operators.push(new Operator(audioCtx, "sine", frequency * 1, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
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
      break;
    case "snaredrum":
      switch (note) {
        case "C4":
          createSnareDrum(0);
          break;
        case "D4":
          createSnareDrum(1);
          break;
        default:
          break;
      }
      break;
    case "splashcymbal":
      switch (note) {
        case "C4":
          createSplashCymbal(0);
          break;
        case "D4":
          createSplashCymbal(1);
          break;
        default:
          break;
      }
      break;
    case "squarelead":
      attack = 7;
      decay = 1000;
      release = 100;
      f1 = 0.8;
      f2 = 0.6;
      operators.push(new Operator(audioCtx, "square", frequency, 7, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
      filter.setFilter("lowpass", 2500, 2500, 2500, 2500, 0, attack, decay, release);
      operators[0].setPitchEnv(60 / 1200, 50, 0);
      break;
    case "strings":
      attack = 100;
      decay = 1000;
      release = 100;
      f1 = 1;
      f2 = 0.8;
      operators.push(new Operator(audioCtx, "sawtooth", frequency, 10, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
      operators[0].setLfo("dco", "sine", 4, 0.005, 250);
      filter.setFilter("lowpass", 2000, 2500, 2000, 2000, 0, attack, decay, release);
      break;
    case "tom":
      switch (note) {
        case "C4":
          createTom(0);
          break;
        case "D4":
          createTom(1);
          break;
        case "E4":
          createTom(2);
          break;
        case "F4":
          createTom(3);
          break;
        default:
          break;
      }
      break;
    case "trombone":
      f1 = 1 / 3.02;
      f2 = 0.5;
      f3 = 0.05;
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.95 * f1, 30, 1200, maxVolume * 0.95 * f1 * f2, 1200 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.85 * f1, 30, 1000, maxVolume * 0.85 * f1 * f2, 1000 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.65 * f1, 40, 900, maxVolume * 0.65 * f1 * f2, 900 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.5 * f1, 40, 800, maxVolume * 0.5 * f1 * f2, 800 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.35 * f1, 50, 700, maxVolume * 0.35 * f1 * f2, 700 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.25 * f1, 50, 600, maxVolume * 0.25 * f1 * f2, 600 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.12 * f1, 50, 500, maxVolume * 0.12 * f1 * f2, 500 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.06 * f1, 60, 400, maxVolume * 0.06 * f1 * f2, 400 * f3));
      for (let i = 0; i < operators.length; i++) {
        operators[i].setPitchEnv(20 / 1200, 50, 0);
      }
      break;
    case "trumpet":
      f1 = 1 / 3.35;
      f2 = 0.9;
      f3 = 0.05;
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.95 * f1, 10, 1000, maxVolume * 0.95 * f1 * f2, 1000 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 0.75 * f1, 20, 800, maxVolume * 0.75 * f1 * f2, 800 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 3, 0, maxVolume * 0.55 * f1, 30, 700, maxVolume * 0.55 * f1 * f2, 700 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.45 * f1, 30, 600, maxVolume * 0.45 * f1 * f2, 600 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 5, 0, maxVolume * 0.3 * f1, 40, 500, maxVolume * 0.3 * f1 * f2, 500 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 6, 0, maxVolume * 0.2 * f1, 40, 400, maxVolume * 0.2 * f1 * f2, 400 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 7, 0, maxVolume * 0.1 * f1, 40, 300, maxVolume * 0.1 * f1 * f2, 300 * f3));
      operators.push(new Operator(audioCtx, "sine", frequency * 8, 0, maxVolume * 0.05 * f1, 50, 200, maxVolume * 0.05 * f1 * f2, 200 * f3));
      for (let i = 0; i < operators.length; i++) {
        operators[i].setPitchEnv(10 / 1200, 20, 0);
      }
      break;
    case "vibraphone":
      f1 = 1;
      operators.push(new Operator(audioCtx, "sine", frequency, 0, maxVolume * 0.5, 5, 1000 * f1, 0, 500 * f1));
      operators.push(new Operator(audioCtx, "sine", frequency * 4, 0, maxVolume * 0.3, 5, 750 * f1, 0, 375 * f1));
      operators.push(new Operator(audioCtx, "sine", frequency * 10, 0, maxVolume * 0.2, 5, 400 * f1, 0, 200 * f1));
      for (let i = 0; i < operators.length; i++) {
        operators[i].setLfo("dca", "sine", 4, 0.5, 0);
      }
      break;
    case "xylophone":
      decay = 1000;
      f1 = 0.6;
      operators.push(new Operator(audioCtx, "sine", frequency * 2, 0, maxVolume * 1 * f1, 4, decay, 0, decay));
      operators.push(new Operator(audioCtx, "sine", frequency * 5.512, 0, maxVolume * 0.15 * f1, 4, decay * 0.5, 0, decay * 0.5));
      operators.push(new Operator(audioCtx, "sine", frequency * 10.808, 0, maxVolume * 0.5 * f1, 4, decay * 0.3, 0, decay * 0.3));
      break;
    default:
      operators.push(new Operator(audioCtx, "triangle", frequency, 0, maxVolume, 5, 1000, 0, 250));
      break;
  }
  for (let i = 0; i < operators.length; i++) {
    operatorsList.push({ instrument, operator: operators[i] });
  }

  filtersList.push({ instrument, filter });
  filter.start(getPreDelay());

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    operator.amp.connect(filter.filter);
    operator.start(getPreDelay());
  }
  reverb.connectSource(filter.filter); // With reverb
  //filter.connect(audioCtx.destination); // Without reverb
}

export function transpose(note, semitones) {
  if (!Number.isInteger(semitones) || semitones < -24 || semitones > 24) {
    throw new RangeError('Semitones must be an integer between -24 and 24');
  }
  const m = String(note).trim().match(/^([A-Ga-g])([#b]?)(-?\d+)$/);
  if (!m) {
    throw new Error('Invalid note format. Examples: A4, Bb3, C#6');
  }

  const [, letter, accidental, octaveStr] = m;
  const octave = parseInt(octaveStr, 10);
  const baseOffsets = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const letterUpper = letter.toUpperCase();
  let noteIndex = baseOffsets[letterUpper];
  if (accidental === '#') {
    noteIndex += 1;
  } else if (accidental === 'b') {
    noteIndex -= 1;
  }
  let semitoneNumber = octave * 12 + noteIndex;
  const newSemitoneNumber = semitoneNumber + semitones;
  const newOctave = Math.floor(newSemitoneNumber / 12);
  const newIndex = newSemitoneNumber - newOctave * 12; // 0..11
  const sharpNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const flatNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const names = accidental === 'b' ? flatNames : sharpNames;
  return names[newIndex] + String(newOctave);
}