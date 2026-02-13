import { beforeEach, describe, it, expect } from "vitest";
import { checkFalling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils Triangle stones", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("Triangle stone A", () => {
        const inputBack = zeroArray(5, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 4, 0, 0, 1],
            [1, 15, 0, 210, 0, 0, 1],
            [1, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 2, 210, 4, 0, 1],
            [1, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
    });

    it("Triangle stone B", () => {
        const inputBack = zeroArray(5, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 4, 0, 2, 1],
            [1, 0, 0, 214, 0, 16, 1],
            [1, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 214, 2, 16, 1],
            [1, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
    });

    it("Triangle stone C", () => {
        const inputBack = zeroArray(5, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 16, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: false, sound: "" });
    });

    it("Triangle stone D", () => {
        const inputBack = zeroArray(5, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 4, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
    });

    it("Triangle stone E", () => {
        const inputBack = zeroArray(5, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 5, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: false, sound: "" });
    });

    it("Triangle stone F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 15, 0, 0, 0, 1],
            [1, 1, 1, 15, 0, 0, 1],
            [1, 1, 1, 1, 15, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const inputBack = zeroArray(8, 7);
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 15, 0, 0, 0, 1],
            [1, 1, 1, 15, 0, 0, 1],
            [1, 1, 1, 1, 15, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info;
        for (let i = 0; i < 5; i++) {
            info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        }
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
    });

    // GRAVITY UP

    it("Triangle stone Gravity Up A", () => {
        const inputBack = zeroArray(5, 8);

        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 6, y: 2 },
            greenBalls: 1,
            orangeBalls: [{ x: 2, y: 2, direction: "none" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 0, 0, 0, 18, 1],
            [1, 0, 40, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 40, 0, 2, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 1 });
        expect(gameInfo.orangeBalls).toEqual([{ x: 3, y: 1, direction: "right" }]);
    });

    it("Triangle stone Gravity Up B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            greenBalls: 1,
            orangeBalls: [{ x: 6, y: 2, direction: "none" }]
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 0, 0, 0, 18, 1],
            [1, 0, 2, 0, 0, 0, 40, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 2, 0, 40, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 1 });
        expect(gameInfo.orangeBalls).toEqual([{ x: 5, y: 1, direction: "left" }]);
    });

    it("Triangle stone Gravity Up C", () => {
        const inputBack = zeroArray(5, 8);

        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 6, y: 2 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 216, 0, 0, 0, 217, 1],
            [1, 0, 4, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 216, 4, 0, 2, 217, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkFalling(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ update: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 1 });
    });

    // Insert new tests here
});        