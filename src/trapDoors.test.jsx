import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { checkTrapDoors } from "./trapDoors.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils checkTrapDoors", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let inputBack01 = zeroArray(7, 6);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 5 },
        trapDoors: [{ x: 3, y: 3, status: 0 }]
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 40, 0, 1],
        [1, 1, 1, 13, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 40, 0, 1],
        [1, 1, 1, 13, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkTrapDoors(inputBack01, input01a, gameInfo01a, { ...defaultGameVars });
    it("checkTrapDoors A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkTrapDoors A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: false, sound: false }));
    });
    it("checkTrapDoors A trapDoors", () => {
        expect(JSON.stringify(gameInfo01a.trapDoors)).toBe(JSON.stringify([{ x: 3, y: 3, status: 1 }]));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 2 },
        hasPropeller: true,
        trapDoors: [{ x: 1, y: 3, status: 0 }, { x: 3, y: 3, status: 0 }]
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 1],
        [1, 2, 0, 4, 0, 1],
        [1, 13, 1, 13, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 1],
        [1, 2, 0, 4, 0, 1],
        [1, 13, 1, 13, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkTrapDoors(inputBack01, input01b, gameInfo01b, { ...defaultGameVars });
    it("checkTrapDoors B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkTrapDoors B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: true, sound: false }));
    });
    it("checkTrapDoors B trapDoors", () => {
        expect(JSON.stringify(gameInfo01b.trapDoors)).toBe(JSON.stringify([{ x: 1, y: 3, status: 0 }, { x: 3, y: 3, status: 1 }]));
    });




    // Insert new tests here
});