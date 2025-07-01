import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsTrigger } from "./pistons.js";

describe("Pistons", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, direction: "right", mode: "normal" }],
        pistonsTrigger: { x: 1, y: 4 },
    }
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 28, 5, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 166, 5, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkPistonsTrigger(backData, input01a, gameInfo01a, { ...defaultGameVars }, false);
    it("checkPistonsTrigger A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkPistonsTrigger A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        yellowBalls: [{ x: 4, y: 3, direction: "none" }],
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, direction: "right", mode: "normal" }],
        pistonsTrigger: { x: 1, y: 4 },
    }
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 9, 5, 0, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 166, 9, 5, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkPistonsTrigger(backData, input01b, gameInfo01b, { ...defaultGameVars }, false);
    it("checkPistonsTrigger B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkPistonsTrigger B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTrigger B yellow", () => {
        expect(JSON.stringify(gameInfo01b.yellowBalls)).toBe(JSON.stringify([{ x: 5, y: 3, direction: "none" }]));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        yellowBalls: [{ x: 5, y: 2, direction: "none" }],
        pistons: [{ x: 7, y: 2, activated: false, sticky: false, direction: "left", mode: "normal" }],
        pistonsTrigger: { x: 1, y: 4 },
    }
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 5, 9, 5, 163, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 5, 9, 5, 164, 163, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = checkPistonsTrigger(backData, input01c, gameInfo01c, { ...defaultGameVars }, false);
    it("checkPistonsTrigger C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkPistonsTrigger C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTrigger C yellow", () => {
        expect(JSON.stringify(gameInfo01c.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "none" }]));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 5 },
        yellowBalls: [{ x: 6, y: 2, direction: "none" }],
        pistons: [{ x: 6, y: 1, activated: false, sticky: false, direction: "down", mode: "normal" }, { x: 3, y: 6, activated: false, sticky: false, direction: "up", mode: "normal" }],
        pistonsTrigger: { x: 1, y: 6 },
    }
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 161, 0, 1],
        [1, 0, 0, 0, 0, 0, 9, 0, 1],
        [1, 0, 0, 98, 0, 0, 5, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 2, 0, 5, 0, 0, 0, 0, 1],
        [1, 158, 0, 159, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 161, 0, 1],
        [1, 0, 0, 82, 0, 0, 162, 0, 1],
        [1, 0, 0, 4, 0, 0, 9, 0, 1],
        [1, 0, 0, 5, 0, 0, 5, 0, 1],
        [1, 2, 0, 160, 0, 0, 0, 0, 1],
        [1, 158, 0, 159, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = checkPistonsTrigger(backData, input01d, gameInfo01d, { ...defaultGameVars }, false);
    it("checkPistonsTrigger D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("checkPistonsTrigger D info", () => {
        expect(JSON.stringify(info01d)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTrigger D yellow", () => {
        expect(JSON.stringify(gameInfo01d.yellowBalls)).toBe(JSON.stringify([{ x: 6, y: 3, direction: "none" }]));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, direction: "right", mode: "normal" }],
        pistonsTrigger: { x: 1, y: 4 },
    }
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 28, 83, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = input01e.map(row => [...row]);
    let info01e = checkPistonsTrigger(backData, input01e, gameInfo01e, { ...defaultGameVars }, false);
    it("checkPistonsTrigger E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("checkPistonsTrigger E info", () => {
        expect(JSON.stringify(info01e)).toBe(JSON.stringify({ updated: false }));
    });

    // Insert new tests here
});
