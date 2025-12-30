import { beforeEach, describe, expect, test } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";
import { checkWhiteBallSynchronisers } from "./whiteBallSynchronisers.js";

describe("checkWhiteBallSynchronisers", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    test("checkWhiteBallSynchronisers A", () => {
        const inputBack = zeroArray(8, 9);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            greenBalls: 1,
            whiteBallSynchronisers: [{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 4, 4, 4, 1],
            [1, 200, 200, 0, 0, 200, 200, 200, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 0, 0, 0, 1],
            [1, 200, 200, 0, 0, 200, 200, 200, 1],
            [1, 0, 0, 0, 0, 4, 4, 4, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkWhiteBallSynchronisers(inputBack, input, gameInfo, defaultGameVars)
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
    });

    test("checkWhiteBallSynchronisers B", () => {
        const inputBack = zeroArray(8, 9);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            greenBalls: 1,
            whiteBallSynchronisers: [{ x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 2, y: 5 }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 200, 200, 200, 1],
            [1, 0, 200, 0, 0, 4, 4, 4, 1],
            [1, 2, 4, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 4, 4, 1],
            [1, 0, 4, 0, 0, 200, 200, 200, 1],
            [1, 0, 200, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkWhiteBallSynchronisers(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" })
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
    });

    test("checkWhiteBallSynchronisers C", () => {
        const inputBack = zeroArray(8, 9);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            greenBalls: 1,
            forces: [{ x: 2, y: 1, direction: "right" }, { x: 7, y: 4, direction: "left" }, { x: 7, y: 5, direction: "left" }, { x: 7, y: 6, direction: "left" }],
            whiteBallSynchronisers: [{ x: 5, y: 1 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 111, 0, 4, 200, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 200, 4, 0, 112, 1],
            [1, 0, 0, 0, 200, 4, 0, 112, 1],
            [1, 2, 0, 0, 200, 4, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 111, 0, 0, 200, 4, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 200, 0, 0, 112, 1],
            [1, 0, 0, 4, 200, 0, 0, 112, 1],
            [1, 2, 0, 4, 200, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkWhiteBallSynchronisers(inputBack, input, gameInfo, defaultGameVars)
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
    });

    test("checkWhiteBallSynchronisers D", () => {
        const inputBack = zeroArray(8, 9);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            greenBalls: 1,
            whiteBallSynchronisers: [{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 4, 4, 4, 1],
            [1, 200, 200, 0, 0, 200, 200, 200, 1],
            [1, 0, 0, 0, 0, 0, 0, 5, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkWhiteBallSynchronisers(inputBack, input, gameInfo, defaultGameVars)
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(false);
    });

    test("checkWhiteBallSynchronisers E", () => {
        const inputBack = zeroArray(8, 9);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            forces: [{ x: 2, y: 7, direction: "up" }, { x: 7, y: 4, direction: "left" }, { x: 7, y: 5, direction: "left" }],
            greenBalls: 1,
            whiteBallSynchronisers: [{ x: 2, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 200, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 200, 4, 0, 112, 1],
            [1, 0, 0, 0, 200, 4, 0, 112, 1],
            [1, 2, 0, 0, 200, 4, 0, 0, 1],
            [1, 1, 109, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 0, 0, 0, 1],
            [1, 0, 200, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 200, 4, 0, 112, 1],
            [1, 0, 0, 0, 200, 4, 0, 112, 1],
            [1, 2, 0, 0, 200, 4, 0, 0, 1],
            [1, 1, 109, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkWhiteBallSynchronisers(inputBack, input, gameInfo, defaultGameVars)
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
    });

    // Insert new tests here
});