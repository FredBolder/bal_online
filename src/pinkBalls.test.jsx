import { describe, expect, test } from "vitest";
import { zeroArray } from "./balUtils.js";
import { movePinkBalls } from "./pinkBalls.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("Pink balls", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    test("movePinkBalls A", () => {
        const inputBack = zeroArray(6, 7);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            pinkBalls: [
                { x: 3, y: 2, delete: false, skipFalling: 0 },
                { x: 3, y: 3, delete: false, skipFalling: 0 },
                { x: 4, y: 3, delete: false, skipFalling: 0 },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 2, 203, 203, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = movePinkBalls(inputBack, input, gameInfo, { ...defaultGameVars });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 3, delete: false, skipFalling: 0 },
            { x: 3, y: 4, delete: false, skipFalling: 0 },
            { x: 4, y: 4, delete: false, skipFalling: 0 },
        ]);
    });

    test("movePinkBalls B", () => {
        const inputBack = zeroArray(6, 7);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pinkBalls: [
                { x: 3, y: 2, delete: false, skipFalling: 0 },
                { x: 3, y: 3, delete: false, skipFalling: 0 },
                { x: 4, y: 3, delete: false, skipFalling: 0 },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 2, 0, 203, 203, 0, 1],
            [1, 1, 22, 22, 22, 22, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 203, 0, 0, 1],
            [1, 1, 22, 22, 22, 22, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = movePinkBalls(inputBack, input, gameInfo, { ...defaultGameVars });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 3, delete: false, skipFalling: 0 },
        ]);
    });

    test("movePinkBalls C", () => {
        const inputBack = zeroArray(6, 7);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 1 },
            pinkBalls: [
                { x: 3, y: 2, delete: false, skipFalling: 0 },
                { x: 3, y: 3, delete: false, skipFalling: 0 },
                { x: 4, y: 3, delete: false, skipFalling: 0 },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 2, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 2, 203, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = movePinkBalls(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 1, delete: false, skipFalling: 0 },
            { x: 3, y: 2, delete: false, skipFalling: 0 },
            { x: 4, y: 2, delete: false, skipFalling: 0 },
        ]);
    });

    test("movePinkBalls D", () => {
        const inputBack = zeroArray(6, 7);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            pinkBalls: [
                { x: 3, y: 2, delete: false, skipFalling: 0 },
                { x: 3, y: 3, delete: false, skipFalling: 0 },
                { x: 4, y: 3, delete: false, skipFalling: 0 },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 2, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 2, 203, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = movePinkBalls(inputBack, input, gameInfo, { ...defaultGameVars });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 3, delete: false, skipFalling: 0 },
            { x: 3, y: 4, delete: false, skipFalling: 0 },
            { x: 4, y: 3, delete: false, skipFalling: 0 },
        ]);
    });

    test("movePinkBalls E", () => {
        const inputBack = zeroArray(6, 7);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            pinkBalls: [
                { x: 3, y: 2, delete: false, skipFalling: 1 },
                { x: 3, y: 3, delete: false, skipFalling: 1 },
                { x: 4, y: 3, delete: false, skipFalling: 1 },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 203, 203, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = movePinkBalls(inputBack, input, gameInfo, { ...defaultGameVars });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 2, delete: false, skipFalling: 0 },
            { x: 3, y: 3, delete: false, skipFalling: 0 },
            { x: 4, y: 3, delete: false, skipFalling: 0 },
        ]);
    });

    // Insert new tests here
});