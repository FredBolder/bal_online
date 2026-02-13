import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { checkTrapDoors } from "./trapDoors.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils checkTrapDoors", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkTrapDoors A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
            trapDoors: [{ x: 3, y: 3, status: 0 }]
        };
        const inputBack01 = zeroArray(7, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 40, 0, 1],
            [1, 1, 1, 13, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 40, 0, 1],
            [1, 1, 1, 13, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = checkTrapDoors(inputBack01, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: false, sound: false }));
        expect(JSON.stringify(gameInfo.trapDoors)).toBe(JSON.stringify([{ x: 3, y: 3, status: 1 }]));
    });

    it("checkTrapDoors B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 2 },
            greenBalls: 1,
            hasPropeller: true,
            trapDoors: [{ x: 1, y: 3, status: 0 }, { x: 3, y: 3, status: 0 }]
        };
        const inputBack01 = zeroArray(7, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 1],
            [1, 2, 0, 4, 0, 1],
            [1, 13, 1, 13, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 1],
            [1, 2, 0, 4, 0, 1],
            [1, 13, 1, 13, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = checkTrapDoors(inputBack01, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true, sound: false }));
        expect(JSON.stringify(gameInfo.trapDoors)).toBe(JSON.stringify([{ x: 1, y: 3, status: 0 }, { x: 3, y: 3, status: 1 }]));
    });


    // Insert new tests here
});