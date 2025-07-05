import { Operator } from "./operator.js";
import { Reverb } from "./reverb.js";
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const reverb = new Reverb(audioCtx, "src/Sounds/reverb.wav");

let operatorsList = [];

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
  let attack = 5;
  let decay = 500;
  let f1 = 1;
  let f2 = 1;
  let frequency = noteToFreq(note);
  let maxVolume = (volume / 100) * 0.5;
  const newOperatorsList = [];
  let operators = [];

  const convolver = reverb.getConvolver();
  if (convolver) {

    for (let i = 0; i < operatorsList.length; i++) {
      if ((operatorsList[i].instrument === instrument)) {
        operatorsList[i].operator.stop();
      }
      if (operatorsList[i].operator.stopped) {
        operatorsList[i].operator.osc.disconnect();
        operatorsList[i].operator.amp.disconnect();
      } else {
        newOperatorsList.push(operatorsList[i]);
      }
    }
    operatorsList = newOperatorsList;

    switch (instrument) {
      case "bass": {
        operators.push(new Operator(audioCtx, "pulse45", frequency * 0.5, maxVolume, 3, 1700, 0, 425));
        operators[0].setFilter("lowpass", 500, 500, 90, 90, 0, 5, 1000, 250);
        break;
      }
      case "clarinet":
        attack = 7;
        decay = 250;
        f1 = 1 / 6.48;
        f2 = 0.5;
        operators.push(new Operator(audioCtx, "sine", frequency, maxVolume * f1, attack, decay, maxVolume * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 2, maxVolume * 0.215 * f1, attack, decay, maxVolume * 0.215 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 3, maxVolume * 0.9 * f1, attack, decay, maxVolume * 0.9 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 4, maxVolume * 0.4 * f1, attack, decay, maxVolume * 0.4 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 5, maxVolume * 0.725 * f1, attack, decay, maxVolume * 0.725 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 6, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 7, maxVolume * 0.525 * f1, attack, decay, maxVolume * 0.525 * f1 * f2, 20));
        operators.push(new Operator(audioCtx, "sine", frequency * 8, maxVolume * 0.1 * f1, attack, decay, maxVolume * 0.1 * f1 * f2, 20));
        break;
      case "cowbell":
        f1 = 1 / 1.275;
        operators.push(new Operator(audioCtx, "sine", 565, maxVolume * 0.767 * f1, 4, 250, 0, 20));
        operators.push(new Operator(audioCtx, "sine", 565 * 1.81061946902655, maxVolume * 0.079 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 2.55221238938053, maxVolume * 0.082 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 3.09557522123894, maxVolume * 0.082 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 3.46194690265487, maxVolume * 0.034 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 4.03185840707965, maxVolume * 0.129 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 6.16637168141593, maxVolume * 0.038 * f1, 4, 250, 0, 62));
        operators.push(new Operator(audioCtx, "sine", 565 * 8.37522123893805, maxVolume * 0.064 * f1, 4, 250, 0, 62));
        break;
      case "guitar":
        operators.push(new Operator(audioCtx, "pulse85", frequency, maxVolume, 1, 2200, 0, 500));
        operators[0].setFilter("lowpass", 2000, 2000, 1600, 1600, 0, 1, 800, 600);
        break;
      case "harpsichord":
        operators.push(new Operator(audioCtx, "pulse40", frequency, maxVolume * 0.4, 1, 1500, 0, 375));
        operators.push(new Operator(audioCtx, "sawtooth", frequency * 2, maxVolume * 0.6, 1, 1500, 0, 375));
        for (let i = 0; i < 2; i++) {
          operators[0].setFilter("lowpass", 2000, 2000, 400, 400, 55, 1, 500, 125);
        }
        break;
      case "kalimba":
        operators.push(new Operator(audioCtx, "sine", frequency, maxVolume * 0.8, 5, 1000, 0, 250));
        operators.push(new Operator(audioCtx, "sine", frequency * 6.3, maxVolume * 0.2, 5, 250, 0, 62));
        break;
      case "vibraphone":
        operators.push(new Operator(audioCtx, "sine", frequency, maxVolume * 0.5, 5, 1000, 0, 250));
        operators.push(new Operator(audioCtx, "sine", frequency * 4, maxVolume * 0.3, 5, 750, 0, 187));
        operators.push(new Operator(audioCtx, "sine", frequency * 10, maxVolume * 0.2, 5, 400, 0, 100));
        for (let i = 0; i < 3; i++) {
          operators[i].setLfo("dca", "sine", 4, 0.5);
        }
        break;
      default:
        operators.push(new Operator(audioCtx, "triangle", frequency, maxVolume, 5, 1000, 0, 250));
        break;
    }
    for (let i = 0; i < operators.length; i++) {
      operatorsList.push({ instrument, operator: operators[i] });
    }

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];

      reverb.connectSource(operator.amp); // With reverb
      //operator.amp.connect(audioCtx.destination); // Without reverb

      operator.start();
    }
  }
}