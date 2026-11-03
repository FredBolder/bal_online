import { 
  createBassDrum, 
  createCowbell, 
  createCrashCymbal,
  createCrossStick,
  createHiHat, 
  createNoiseDrum, 
  createRideCymbal, 
  createSnareDrum, 
  createSplashCymbal, 
  createTom
} from "./drums.js";

import { Filter } from "./filter.js";
import { globalVars } from "./glob.js";
import { InstrumentInstance } from "./instrumentInstance.js";

import {
  createAccordion,
  createAltsax,
  createBass,
  createBell,
  createBouzouki,
  createClarinet,
  createGuitar,
  createHammondOrgan,
  createHarp,
  createHarpsichord,
  createKalimba,
  createPiano,
  createPipeOrgan,
  createSquareLead,
  createStrings1,
  createStrings2,
  createTrombone,
  createTrumpet,
  createVibraphone,
  createXylophone
} from "./instruments.js";

import {
  clearCrashNoiseBuffer,
  clearHihatNoiseBuffer,
  clearRideNoiseBuffer,
  getCrashNoiseBuffer,
  getHihatNoiseBuffer,
  getRideNoiseBuffer
} from "./noise.js";

import { getPreDelay, Operator } from "./operator.js";
import { Reverb } from "./reverb.js";

import { 
  createExplosion,
  createLaserGun,
  createSqueakyDoor
} from "./soundEffects.js";

let audioCtx = null;
let reverb = null;

export function initAudio() {
  if (audioCtx) return audioCtx; // already initialized

  if (typeof window !== "undefined") {
    console.log("Initializing AudioContext...");
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    reverb = new Reverb(audioCtx, "/Reverb/reverb.wav");

    // Preload noise
    getCrashNoiseBuffer(audioCtx);
    getHihatNoiseBuffer(audioCtx);
    getRideNoiseBuffer(audioCtx);
  }

  return audioCtx;
}

export function getAudioContext() {
  if (!audioCtx) initAudio();    // ensure it exists
  return audioCtx;
}

export function closeAudio() {
  console.log("Closing AudioContext...");
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  reverb = null;
  clearCrashNoiseBuffer();
  clearHihatNoiseBuffer();
  clearRideNoiseBuffer();
}

export function instruments() {
  // Add test for test sound
  return ["test", "accordion", "altsax", "bass", "bassdrum", "bell", "bouzouki", "clarinet", "cowbell", "crashcymbal", "crossstick", "drums", "guitar", "hammondorgan", "harp",
    "harpsichord", "hihat", "kalimba", "noisedrum", "piano", "pipeorgan", "ridecymbal", "sfx", "snaredrum", "splashcymbal", "squarelead", "strings1", "strings2",
    "tom", "trombone", "trumpet", "vibraphone", "xylophone"]
}

export function noteToFreq(note) {
  const noteNumber = noteToNumber(note);
  // A4 is semitone number 9 + 4*12 = 57; referenceFreq = 440 Hz
  const A4_NOTE_NUMBER = 9 + (4 * 12);
  const semitoneDiff = noteNumber - A4_NOTE_NUMBER;
  const freq = 440 * Math.pow(2, semitoneDiff / 12);
  return freq;
}

export function noteToNumber(note) {
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
  return noteNumber;
}

export async function playNote(instrument, volume, musicalNote, noteOverride, delay = 0) {
  let frequency = 440;
  let maxVolume = 1;
  let note = "";
  let notes = null;
  let volumeFactor = 1;
  let operators = [];
  let filter1 = null;
  let filter2 = null;
  let combFilter = null;

  function createTest() {
    const attack = 100;
    const decay = 1000;
    const release = 100;
    const f1 = 0.5;
    const f2 = 0.8;
    operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, 0, maxVolume * f1, attack, decay, maxVolume * f1 * f2, release));
  }

  if (typeof window === "undefined") {
    // Testing
    return;
  }

  const convolver = reverb.getConvolver();

  if (!convolver) {
    return;
  }
  if ((musicalNote === "") || musicalNote.includes("-")) {
    return;
  }

  stopInstrument(instrument);

  if (musicalNote.includes("_")) {
    return;
  }

  notes = musicalNote.split("&");

  for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
    note = notes[noteIndex].trim();

    if (noteOverride.toLowerCase() !== "none") {
      note = noteOverride;
    }

    if (note === "") {
      break;
    }

    maxVolume = 1;
    volumeFactor = 1;
    operators = null;
    operators = [];
    filter1 = null;
    filter2 = null;
    combFilter = null;

    const masterVol = Math.max(0, Math.min(volume / 100, 1)); // 0..1
    volumeFactor = 0.75;
    if (note.startsWith("*")) {
      volumeFactor = 1;
      note = note.slice(1);
    } else if (note.startsWith(".")) {
      volumeFactor = 0.5;
      note = note.slice(1);
    }
    const BASE = 0.6;
    maxVolume = BASE * masterVol * volumeFactor;


    frequency = noteToFreq(note);

    filter1 = new Filter(audioCtx);
    filter1.setFilter("highpass", 10, 0);
    filter2 = new Filter(audioCtx);
    filter2.setFilter("highpass", 10, 0);

    const context = {
      audioCtx,
      combFilter,
      filter1,
      filter2,
      frequency,
      maxVolume,
      musicalNote,
      operators,
    }


    switch (instrument) {
      case "accordion":
        createAccordion(context);
        break;
      case "altsax":
        createAltsax(context);
        break;
      case "bass":
        createBass(context);
        break;
      case "bassdrum":
        switch (note) {
          case "C4":
            createBassDrum(context, 0);
            break;
          case "D4":
            createBassDrum(context, 1);
            break;
          default:
            break;
        }
        break;
      case "bell":
        createBell(context);
        break;
      case "bouzouki":
        createBouzouki(context);
        break;
      case "clarinet":
        createClarinet(context);
        break;
      case "cowbell":
        switch (note) {
          case "C4":
            createCowbell(context, 0);
            break;
          case "D4":
            createCowbell(context, 1);
            break;
          default:
            break;
        }
        break;
      case "crossstick":
        switch (note) {
          case "C4":
            createCrossStick(context, 0);
            break;
          case "D4":
            createCrossStick(context, 1);
            break;
          default:
            break;
        }
        break;
      case "crashcymbal":
        switch (note) {
          case "C4":
            createCrashCymbal(context, 0);
            break;
          case "D4":
            createCrashCymbal(context, 1);
            break;
          default:
            break;
        }
        break;
      case "drums":
        switch (note) {
          case "C4":
            createBassDrum(context, 0);
            break;
          case "D4":
            createBassDrum(context, 1);
            break;
          case "E4":
            createSnareDrum(context, 0);
            break;
          case "F4":
            createSnareDrum(context, 1);
            break;
          case "G4":
            createHiHat(context, 0);
            break;
          case "A4":
            createHiHat(context, 1);
            break;
          case "B4":
            createTom(context, 0);
            break;
          case "C5":
            createTom(context, 1);
            break;
          case "D5":
            createTom(context, 2);
            break;
          case "E5":
            createTom(context, 3);
            break;
          case "F5":
            createCowbell(context, 0);
            break;
          case "G5":
            createCowbell(context, 1);
            break;
          case "A5":
            createNoiseDrum(context, 0);
            break;
          case "B5":
            createNoiseDrum(context, 1);
            break;
          case "C6":
            createSplashCymbal(context, 0);
            break;
          case "D6":
            createSplashCymbal(context, 1);
            break;
          case "E6":
            createRideCymbal(context, 0);
            break;
          case "F6":
            createRideCymbal(context, 1);
            break;
          case "G6":
            createHiHat(context, 2);
            break;
          case "A6":
            createHiHat(context, 3);
            break;
          case "B6":
            createCrashCymbal(context, 0);
            break;
          case "C7":
            createCrashCymbal(context, 1);
            break;
          case "D7":
            createCrossStick(context, 0);
            break;
          case "E7":
            createCrossStick(context, 1);
            break;
          default:
            break;
        }
        break;
      case "guitar":
        createGuitar(context);
        break;
      case "hammondorgan":
        createHammondOrgan(context);
        break;
      case "harp":
        createHarp(context);
        break;
      case "harpsichord":
        createHarpsichord(context);
        break;
      case "hihat":
        switch (note) {
          case "C4":
            createHiHat(context, 0);
            break;
          case "D4":
            createHiHat(context, 1);
            break;
          case "E4":
            createHiHat(context, 2);
            break;
          case "F4":
            createHiHat(context, 3);
            break;
          default:
            break;
        }
        break;
      case "kalimba":
        createKalimba(context);
        break;
      case "noisedrum":
        switch (note) {
          case "C4":
            createNoiseDrum(context, 0);
            break;
          case "D4":
            createNoiseDrum(context, 1);
            break;
          default:
            break;
        }
        break;
      case "piano": {
        createPiano(context);
        break;
      }
      case "pipeorgan":
        createPipeOrgan(context);
        break;
      case "ridecymbal":
        switch (note) {
          case "C4":
            createRideCymbal(context, 0);
            break;
          case "D4":
            createRideCymbal(context, 1);
            break;
          case "E4":
            createRideCymbal(context, 2);
            break;
          default:
            break;
        }
        break;
      case "sfx":
        switch (note) {
          case "C4":
            createLaserGun(context, 0);
            break;
          case "D4":
            createLaserGun(context, 1);
            break;
          case "E4":
            createLaserGun(context, 2);
            break;
          case "F4":
            createExplosion(context, 0);
            break;
          case "G4":
            createExplosion(context, 1);
            break;
          case "A4":
            createSqueakyDoor(context);
            break;
          default:
            break;
        }
        break;
      case "snaredrum":
        switch (note) {
          case "C4":
            createSnareDrum(context, 0);
            break;
          case "D4":
            createSnareDrum(context, 1);
            break;
          default:
            break;
        }
        break;
      case "splashcymbal":
        switch (note) {
          case "C4":
            createSplashCymbal(context, 0);
            break;
          case "D4":
            createSplashCymbal(context, 1);
            break;
          default:
            break;
        }
        break;
      case "squarelead":
        createSquareLead(context);
        break;
      case "strings1":
        createStrings1(context);
        break;
      case "strings2":
        createStrings2(context);
        break;
      case "test":
        createTest();
        break;
      case "tom":
        switch (note) {
          case "C4":
            createTom(context, 0);
            break;
          case "D4":
            createTom(context, 1);
            break;
          case "E4":
            createTom(context, 2);
            break;
          case "F4":
            createTom(context, 3);
            break;
          default:
            break;
        }
        break;
      case "trombone":
        createTrombone(context);
        break;
      case "trumpet":
        createTrumpet(context);
        break;
      case "vibraphone":
        createVibraphone(context);
        break;
      case "xylophone":
        createXylophone(context);
        break;
      default:
        operators.push(new Operator(audioCtx, "triangle", frequency, 0, maxVolume, 5, 1000, 0, 250));
        break;
    }

    filter1.start(getPreDelay() + delay);
    filter2.start(getPreDelay() + delay);

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      operator.amp.connect(filter1.filter);
      operator.start(getPreDelay() + delay);
    }
    filter1.filter.connect(filter2.filter);
    if (combFilter !== null) {
      combFilter.setSend(1.0); // how much of source -> loop
      combFilter.setHP(400);
      combFilter.setLP(12000);
      combFilter.connectSource(filter2.filter);
      reverb.connectSource(combFilter.combOutput);
    } else {
      reverb.connectSource(filter2.filter); // With reverb
      //filter.filter.connect(audioCtx.destination); // Without reverb
    }

    const instance = new InstrumentInstance(instrument);

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      instance.addOperator(operator);
    }
    instance.addFilter1(filter1);
    instance.addFilter2(filter2);
    if (combFilter !== null) {
      instance.addCombFilter(combFilter);
    }
    //instance.addWaveShaper(waveShaper);
    
    instance.start(getPreDelay() + delay);
    globalVars.instrumentInstances.push(instance);

  }
}

async function stopInstrument(instrument) {
  const instances = globalVars.instrumentInstances.filter(
    instance => instance.instrument === instrument
  );

  await Promise.all(instances.map(instance => instance.clear()));

  globalVars.instrumentInstances =
    globalVars.instrumentInstances.filter(instance => !instance.delete);
}

export function transpose(note, semitones) {
  if (!Number.isInteger(semitones) || semitones < -24 || semitones > 24) {
    return note;
  }
  const m = String(note).trim().match(/^([A-Ga-g])([#b]?)(-?\d+)$/);
  if (!m) {
    return note;
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