import { readFileSync } from "fs";
import { describe, it, expect } from "vitest";
import { checkLevel, seriesEasy1Start, seriesEasy1End, seriesEasy2Start, seriesEasy2End } from "./levels.js";

describe("levels", () => {

    it("checkLevel A info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("");
    });

    it("checkLevel B info", () => {
        const data = [
            "1111111111",
            "1        1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("There is no small green ball.\n");
    });

    it("checkLevel C info", () => {
        const data = [
            "1111111111",
            "1        1",
            "1        1",
            "1        1",
            "1  4     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("There is no blue ball (player).\nThere is no small green ball.\n");
    });

    it("checkLevel D info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast"];
        const info = checkLevel(data, settings);
        expect(info).toBe("Setting 1: No piston found at the coordinates 1, 4.\n");
    });

    it("checkLevel E info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1Ù 2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 2"];
        const info = checkLevel(data, settings);
        expect(info).toBe("");
    });

    it("checkLevel F info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1Ù 2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 1000"];
        const info = checkLevel(data, settings);
        expect(info).toBe("Setting 2: Invalid value 1000 for group.\n");
    });

    it("Hints in all easy levels", () => {
        const levels = [];
        const missing = [];
        for (let i = seriesEasy1Start; i <= seriesEasy1End; i++) {
            levels.push(i);
        }
        for (let i = seriesEasy2Start; i <= seriesEasy2End; i++) {
            levels.push(i);
        }
        for (let i = 0; i < levels.length; i++) {
            const filePath = `Public/Levels/${levels[i]}.dat`;
            const text = readFileSync(filePath, "utf8");
            const found = text.includes("$hint:");
            if (!found) {
                missing.push(levels[i]);
            }
        }
        expect(missing).toEqual([]);
    });

    // Insert new tests here
});