import { beforeEach, describe, it, expect } from "vitest";
import { checkFalling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils checkFalling", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkFalling A", () => {
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 8, 4, 1],
            [1, 0, 0, 0, 4, 1],
            [1, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let inputBack = zeroArray(5, 6);
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 8, 4, 1],
            [1, 2, 0, 0, 4, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, { ...defaultGameInfo, redBalls: [{ x: 3, y: 1 }] }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    it("checkFalling B", () => {
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 1],
            [1, 4, 4, 2, 0, 1],
            [1, 0, 0, 0, 8, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let inputBack = zeroArray(5, 6);
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 4, 4, 2, 8, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, { ...defaultGameInfo, redBalls: [{ x: 4, y: 3 }] }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    it("checkFalling C", () => {
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 3, 1],
            [1, 4, 2, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let inputBack = zeroArray(4, 5);
        let expectedOutput = copy2dArray(input);
        let info = checkFalling(inputBack, input, { ...defaultGameInfo }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    // Insert new tests here
});    