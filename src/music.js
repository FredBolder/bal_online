import { Operator } from "./operator.js";
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
  let frequency = noteToFreq(note);
  let maxVolume = (volume / 100) * 0.5;
  let operators = [];
  let totalTime = 0;

  const convolver = reverb.getConvolver();
  if (convolver) {
    switch (instrument) {
      case "bass": {
        operators.push(new Operator(audioCtx, "pulse45", frequency * 0.5, maxVolume, 3, 1700));
        operators[0].setFilter("lowpass", 500, 90, 0, 5, 1000);
        break;
      }
      case "kalimba":
        operators.push(new Operator(audioCtx, "sine", frequency, maxVolume * 0.8, 5, 1000));
        operators.push(new Operator(audioCtx, "sine", frequency * 6.3, maxVolume * 0.2, 5, 250));
        break;
      case "vibraphone":
        operators.push(new Operator(audioCtx, "sine", frequency, maxVolume * 0.5, 5, 1000));
        operators.push(new Operator(audioCtx, "sine", frequency * 4, maxVolume * 0.3, 5, 750));
        operators.push(new Operator(audioCtx, "sine", frequency * 10, maxVolume * 0.2, 5, 400));
        for (let i = 0; i < 3; i++) {
          operators[i].setLfo("dca", "sine", 4, 0.5);
        }
        break;
      default:
        operators.push(new Operator(audioCtx, "triangle", frequency, maxVolume, 5, 1000));
        break;
    }

    totalTime = 0;
    for (let i = 0; i < operators.length; i++) {
      const now = audioCtx.currentTime;
      const operator = operators[i];

      reverb.connectSource(operator.amp); // With reverb
      //operator.amp.connect(audioCtx.destination); // Without reverb
      const at = operator.dcaSettings.attack / 1000;
      const dt = operator.dcaSettings.decay / 1000;
      if (operator.lfoSettings.destination === "dca") {
        operator.tremoloOffset.start(now);
      }
      if (operator.lfoSettings.destination !== "none") {
        operator.lfo.start(now);
      }
      operator.amp.gain.setValueAtTime(0, now);
      operator.amp.gain.linearRampToValueAtTime(operator.dcaSettings.volume, now + at);
      operator.amp.gain.exponentialRampToValueAtTime(0.001, now + at + dt);

      const fat = operator.filterSettings.attack / 1000;
      const fdt = operator.filterSettings.decay / 1000;
      if (operator.filterSettings.type !== "none") {
        operator.filter.frequency.setValueAtTime(0, now);
        operator.filter.frequency.linearRampToValueAtTime(operator.filterSettings.startFrequency, now + fat);
        operator.filter.frequency.exponentialRampToValueAtTime(operator.filterSettings.endFrequency, now + fat + fdt);
      }

      operator.osc.start(now);
      const stopTime = now + at + dt + 0.02;
      operator.osc.stop(stopTime);
      if (operator.lfoSettings.destination !== "none") {
        operator.lfo.stop(stopTime);
      }
      if (operator.lfoSettings.destination === "dca") {
        operator.tremoloOffset.stop(stopTime);
      }

      const time = operator.dcaSettings.attack + operator.dcaSettings.decay;
      if (time > totalTime) {
        totalTime = time;
      }
    }
    totalTime += 0.02;
    await new Promise(resolve => setTimeout(resolve, totalTime));
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      operator.osc.disconnect();
      operator.amp.disconnect();
    }
  }
}