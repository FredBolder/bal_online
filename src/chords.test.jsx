import { describe, it, expect } from "vitest";
import { augmentedChords, diminishedChords, majorChords, minorChords, sus2Chords, sus4Chords } from "./chords.js";
import { noteToFreq } from "./music.js";

describe("chords", () => {
    const notes = [
        ["C"],
        ["C#", "Db"],
        ["D"],
        ["D#", "Eb"],
        ["E"],
        ["F"],
        ["F#", "Gb"],
        ["G"],
        ["G#", "Ab"],
        ["A"],
        ["A#", "Bb"],
        ["B"],
    ];

    const fixIndex = (index) => ((index % 12) + 12) % 12;

    function checkChord(chord, chordType) {
        const chordNotesToCheck = [];
        for (let i = 0; i < chord.length; i++) {
            // Without number
            chordNotesToCheck.push(chord[i].slice(0, -1));
        }
        for (let root = 0; root < 12; root++) {
            let idx = null;
            switch (chordType) {
                case "augmented":
                    idx = [fixIndex(root), fixIndex(root + 4), fixIndex(root + 8)];
                    break;
                case "diminished":
                    idx = [fixIndex(root), fixIndex(root + 3), fixIndex(root + 6)];
                    break;
                case "major":
                    idx = [fixIndex(root), fixIndex(root + 4), fixIndex(root + 7)];
                    break;
                case "minor":
                    idx = [fixIndex(root), fixIndex(root + 3), fixIndex(root + 7)];
                    break;
                case "sus2":
                    idx = [fixIndex(root), fixIndex(root + 2), fixIndex(root + 7)];
                    break;
                case "sus4":
                    idx = [fixIndex(root), fixIndex(root + 5), fixIndex(root + 7)];
                    break;
                default:
                    idx = [fixIndex(root), fixIndex(root + 4), fixIndex(root + 7)];
                    break;
            }
            const chordNotes = idx.flatMap((k) => notes[k]);
            let ok = true;
            for (let i = 0; i < chordNotesToCheck.length; i++) {
                if (!chordNotes.includes(chordNotesToCheck[i])) {
                    ok = false;
                }
            }
            if (ok) return true;
        }
        return false;
    }

    function increasingPitch(chord) {
        let freq1 = 0;
        let freq2 = 0;
        let increasing = true;        
        for (let i = 0; i < chord.length; i++) {
            freq1 = noteToFreq(chord[i]);
            if ((i > 0) && (freq1 < freq2)) {
                increasing = false;
                break;
            }
            freq2 = freq1;
        }
        return increasing;
    }

    augmentedChords().forEach((chord, i) => {
        it(`augmentedChords notes ${i + 1}`, () => {
            expect(checkChord(chord, "augmented")).toBe(true);
        });
        it(`augmentedChords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });

    diminishedChords().forEach((chord, i) => {
        it(`diminishedChords notes ${i + 1}`, () => {
            expect(checkChord(chord, "diminished")).toBe(true);
        });
        it(`diminishedChords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });

    majorChords().forEach((chord, i) => {
        it(`majorChords notes ${i + 1}`, () => {
            expect(checkChord(chord, "major")).toBe(true);
        });
        it(`majorChords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });

    minorChords().forEach((chord, i) => {
        it(`minorChords notes ${i + 1}`, () => {
            expect(checkChord(chord, "minor")).toBe(true);
        });
        it(`minorChords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });

    sus2Chords().forEach((chord, i) => {
        it(`sus2Chords notes ${i + 1}`, () => {
            expect(checkChord(chord, "sus2")).toBe(true);
        });
        it(`sus2Chords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });

    sus4Chords().forEach((chord, i) => {
        it(`sus4Chords notes ${i + 1}`, () => {
            expect(checkChord(chord, "sus4")).toBe(true);
        });
        it(`sus4Chords increasing pitch ${i + 1}`, () => {
            expect(increasingPitch(chord)).toBe(true);
        });
    });
    
});
