import { describe, it, expect } from "vitest";
import { augmentedChords, diminishedChords, majorChords, minorChords, sus2Chords, sus4Chords } from "./chords.js";

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

    augmentedChords().forEach((chord, i) => {
        it(`augmentedChords ${i + 1}`, () => {
            expect(checkChord(chord, "augmented")).toBe(true);
        });
    });

    diminishedChords().forEach((chord, i) => {
        it(`diminishedChords ${i + 1}`, () => {
            expect(checkChord(chord, "diminished")).toBe(true);
        });
    });

    majorChords().forEach((chord, i) => {
        it(`majorChords ${i + 1}`, () => {
            expect(checkChord(chord, "major")).toBe(true);
        });
    });

    minorChords().forEach((chord, i) => {
        it(`minorChords ${i + 1}`, () => {
            expect(checkChord(chord, "minor")).toBe(true);
        });
    });

    sus2Chords().forEach((chord, i) => {
        it(`sus2Chords ${i + 1}`, () => {
            expect(checkChord(chord, "sus2")).toBe(true);
        });
    });

    sus4Chords().forEach((chord, i) => {
        it(`sus4Chords ${i + 1}`, () => {
            expect(checkChord(chord, "sus4")).toBe(true);
        });
    });
    
});
