import { Reverb } from "./reverb.js";
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const reverb = new Reverb(audioCtx, "src/Sounds/reverb.wav");

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

export async function playNote(instrument, volume, note) {
  let totalTime = 0;

  // Oscillator 1
  let attack1 = 5;
  let attackSec1 = 0;
  let decay1 = 1000;
  let decaySec1 = 0;
  let frequency1 = noteToFreq(note);
  let maxVol1 = 0.5 * volume;
  let totalTime1 = 0;
  const oscillator1 = audioCtx.createOscillator();
  const gainNode1 = audioCtx.createGain();

  // Oscillator 2
  let attack2 = 5;
  let attackSec2 = 0;
  let decay2 = 1000;
  let decaySec2 = 0;
  let frequency2 = frequency1;
  let maxVol2 = maxVol1;
  let totalTime2 = 0;
  let useOscillator2 = false;
  const oscillator2 = audioCtx.createOscillator();
  const gainNode2 = audioCtx.createGain();
  const now = audioCtx.currentTime;

  const convolver = reverb.getConvolver();
  if (convolver) {

    switch (instrument) {
      case "kalimba":
        oscillator1.frequency.value = frequency1;
        oscillator1.type = 'sine';
        decay1 = 1000;
        totalTime1 = attack1 + decay1;
        useOscillator2 = true;
        frequency2 = frequency1 * 6.6;
        oscillator2.frequency.value = frequency2
        oscillator2.type = 'sine';
        decay2 = decay1 * 0.25;
        totalTime2 = attack2 + decay2;
        maxVol2 = maxVol1 * 0.5;
        break;
      default:
        oscillator1.frequency.value = frequency1;
        oscillator1.type = 'triangle';
        decay1 = 1000;
        totalTime1 = attack1 + decay1;
        break;
    }

    oscillator1.connect(gainNode1);
    reverb.connectSource(gainNode1);
    attackSec1 = attack1 / 1000;
    decaySec1 = decay1 / 1000;
    gainNode1.gain.setValueAtTime(0, now);
    gainNode1.gain.linearRampToValueAtTime(maxVol1, now + attackSec1);
    gainNode1.gain.exponentialRampToValueAtTime(0.001, now + attackSec1 + decaySec1);
    oscillator1.start(now);
    oscillator1.stop(now + attackSec1 + decaySec1);
    if (useOscillator2) {
      oscillator2.connect(gainNode2);
      reverb.connectSource(gainNode2);
      attackSec2 = attack2 / 1000;
      decaySec2 = decay2 / 1000;
      gainNode2.gain.setValueAtTime(0, now);
      gainNode2.gain.linearRampToValueAtTime(maxVol2, now + attackSec2);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, now + attackSec2 + decaySec2);
      oscillator2.start(now);
      oscillator2.stop(now + attackSec2 + decaySec2);
    }

    if (totalTime1 > totalTime2) {
      totalTime = totalTime1;
    } else {
      totalTime = totalTime2;
    }
    await new Promise(resolve => setTimeout(resolve, totalTime));
    oscillator1.disconnect();
    gainNode1.disconnect();
    if (useOscillator2) {
      oscillator2.disconnect();
      gainNode2.disconnect();
    }
  }
}