import { describe, it, expect } from "vitest";
import { intervalP5, intervalP8 } from "./intervals.js";

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

    function checkInterval(intervalToCheck, interval) {
        const notesToCheck = [];
        for (let i = 0; i < intervalToCheck.length; i++) {
            // Without number
            notesToCheck.push(intervalToCheck[i].slice(0, -1));
        }
        for (let root = 0; root < 12; root++) {
            let idx = null;
            switch (interval) {
                case "P5":
                    idx = [fixIndex(root), fixIndex(root + 7)];
                    break;
                case "P8":
                    idx = [fixIndex(root), fixIndex(root + 12)];
                    break;
                default:
                    idx = [fixIndex(root), fixIndex(root + 7)];
                    break;
            }
            const intervalNotes = idx.flatMap((k) => notes[k]);
            let ok = true;
            for (let i = 0; i < notesToCheck.length; i++) {
                if (!intervalNotes.includes(notesToCheck[i])) {
                    ok = false;
                }
            }
            if (ok) return true;
        }
        return false;
    }

    intervalP5().forEach((interval, i) => {
        it(`intervalP5 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "P5")).toBe(true);
        });
    });
    
    intervalP8().forEach((interval, i) => {
        it(`intervalP8 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "P8")).toBe(true);
        });
    });
});
