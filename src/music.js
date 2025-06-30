const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

export async function playNote(note, attack, decay) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const frequency = noteToFreq(note);

  oscillator.frequency.value = frequency;
  oscillator.type = 'triangle';

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now  = audioCtx.currentTime;
  const attackSec = attack / 1000;
  const decaySec = decay  / 1000;
  const maxVol  = 0.5;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(maxVol, now + attackSec);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + attackSec + decaySec);

  oscillator.start(now);
  oscillator.stop(now + attackSec + decaySec);

  await new Promise(resolve => setTimeout(resolve, attack + decay));
  oscillator.disconnect();
  gainNode.disconnect();
}