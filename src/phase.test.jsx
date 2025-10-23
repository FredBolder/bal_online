import { beforeEach, describe, expect, test } from "vitest";
import { jump, moveLeft, moveRight, pushObject, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("phase (walk through object)", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });  

    test("phase A", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, greenBalls: 1 };
        const inputBack = zeroArray(6, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 2, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveRight(inputBack, input, gameInfo, {...defaultGameVars, remainingPhaseTicks: 1});
        expect(info.player).toBe(true);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    test("phase B", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, greenBalls: 1 };
        const inputBack = zeroArray(6, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 2, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveRight(inputBack, input, gameInfo, {...defaultGameVars, remainingPhaseTicks: 0});
        expect(info.player).toBe(false);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 4 });
    });

    test("phase C", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, greenBalls: 1 };
        const inputBack = zeroArray(6, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = jump(inputBack, input, gameInfo, {...defaultGameVars, remainingPhaseTicks: 5});
        expect(info.player).toBe(true);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
    });

    test("phase D", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, greenBalls: 1 };
        const inputBack = zeroArray(6, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 2, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveLeft(inputBack, input, gameInfo, {...defaultGameVars, remainingPhaseTicks: 1});
        expect(info.player).toBe(true);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 4 });
    });

    test("phase E", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, greenBalls: 1 };
        const inputBack = zeroArray(6, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBack, input, gameInfo, {...defaultGameVars, remainingPhaseTicks: 50});
        expect(info.player).toBe(true);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 4 });
    });

    // Insert new tests here
});