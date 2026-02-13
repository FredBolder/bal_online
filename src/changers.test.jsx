import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { checkChangers } from "./changers.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("changers", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkChangers A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            changers: [
                { x: 3, y: 3, color1: "lightblue", color2: "white", horizontal: false, ready: true },
                { x: 5, y: 5, color1: "yellow", color2: "white", horizontal: true, ready: false },
            ],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 244, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 244, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 244, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 244, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkChangers(backData, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
    });

    it("checkChangers B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            changers: [
                { x: 2, y: 3, color1: "lightblue", color2: "white", horizontal: false, ready: true },
                { x: 5, y: 5, color1: "yellow", color2: "white", horizontal: true, ready: true },
            ],
            greenBalls: 1,
            yellowBalls: [{ x: 2, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 244, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 244, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 244, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 9, 244, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkChangers(backData, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
        expect(gameInfo.yellowBalls).toEqual([
            { x: 2, y: 2, direction: "none" },
            { x: 4, y: 5, direction: "none" }
        ]);
    });

    it("checkChangers C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            changers: [
                { x: 2, y: 3, color1: "lightblue", color2: "white", horizontal: false, ready: true },
                { x: 5, y: 5, color1: "yellow", color2: "white", horizontal: true, ready: false },
            ],
            greenBalls: 1,
            yellowBalls: [{ x: 2, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 244, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 244, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkChangers(backData, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
        expect(gameInfo.yellowBalls).toEqual([
            { x: 2, y: 2, direction: "none" },
        ]);
    });


    // Insert new tests here
});