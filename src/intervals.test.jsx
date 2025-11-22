import { describe, it, expect } from "vitest";
import { intervalMajor2, intervalMajor3, intervalMinor3, intervalP4, intervalP5, intervalP8 } from "./intervals.js";
import { noteToNumber } from "./music.js"

describe("intervals", () => {
    function checkInterval(intervalToCheck, interval) {
        if (intervalToCheck.length !== 2) return false;
        const noteNumber1 = noteToNumber(intervalToCheck[0]);
        const noteNumber2 = noteToNumber(intervalToCheck[1]);
        let steps = 0;
        switch (interval) {
            case "M2":
                steps = 2;
                break;
            case "m3":
                steps = 3;
                break;
            case "M3":
                steps = 4;
                break;
            case "P4":
                steps = 5;
                break;
            case "P5":
                steps = 7;
                break;
            case "P8":
                steps = 12;
                break;
            default:
                steps = 0;
                break;
        }
        return (Math.abs(noteNumber2 - noteNumber1) === steps);
    }

    intervalMajor2().forEach((interval, i) => {
        it(`intervalMajor2 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "M2")).toBe(true);
        });
    });
    
    intervalMajor3().forEach((interval, i) => {
        it(`intervalMajor3 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "M3")).toBe(true);
        });
    });
    
    intervalMinor3().forEach((interval, i) => {
        it(`intervalMinor3 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "m3")).toBe(true);
        });
    });
    
    intervalP4().forEach((interval, i) => {
        it(`intervalP4 notes ${i + 1}`, () => {
            expect(checkInterval(interval, "P4")).toBe(true);
        });
    });
    
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
