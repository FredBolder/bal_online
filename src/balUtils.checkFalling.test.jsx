import { describe, it, expect } from "vitest";
import { checkFalling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils checkFalling", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let input01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 8, 4, 1],
        [1, 0, 0, 0, 4, 1],
        [1, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let inputBack01a = zeroArray(5, 6);
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 8, 4, 1],
        [1, 2, 0, 0, 4, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkFalling(inputBack01a, input01a, { ...defaultGameInfo, redBalls: [{ x: 3, y: 1 }] }, { ...defaultGameVars });
    it("checkFalling A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkFalling A info", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 0, 1],
        [1, 4, 4, 2, 0, 1],
        [1, 0, 0, 0, 8, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let inputBack01b = zeroArray(5, 6);
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 4, 4, 2, 8, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkFalling(inputBack01b, input01b, { ...defaultGameInfo, redBalls: [{ x: 4, y: 3 }] }, { ...defaultGameVars });
    it("checkFalling B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkFalling B info", () => {
        expect(JSON.stringify(info01b)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 3, 1],
        [1, 4, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let inputBack01c = zeroArray(4, 5);
    let expectedOutput01c = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 3, 1],
        [1, 4, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info01c = checkFalling(inputBack01c, input01c, { ...defaultGameInfo }, { ...defaultGameVars });
    it("checkFalling C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkFalling C info", () => {
        expect(JSON.stringify(info01c)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    // Insert new tests here
});    