import { describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveObjectWithTelekineticPower } from "./telekinesis.js";
import { getTimeBombsTime } from "./timeBombs.js";
import { copy2dArray } from "./utils.js";

describe("moveObjectWithTelekineticPower", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        hasTelekineticPower: true
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 5, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 5, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveObjectWithTelekineticPower(input01a, gameInfo01a, { ...defaultGameVars });
    it("moveObjectWithTelekineticPower A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("moveObjectWithTelekineticPower A info.player", () => {
        expect(info01a.player).toBe(true);
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 5, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = copy2dArray(input01b);

    let info01b = moveObjectWithTelekineticPower(input01b, gameInfo01b, { ...defaultGameVars });
    it("moveObjectWithTelekineticPower B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("moveObjectWithTelekineticPower B info.player", () => {
        expect(info01b.player).toBe(false);
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        yellowBalls: [{ x: 2, y: 4, direction: "none" }],
        hasTelekineticPower: true
    };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 9, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 9, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = moveObjectWithTelekineticPower(input01c, gameInfo01c, { ...defaultGameVars });
    it("moveObjectWithTelekineticPower C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("moveObjectWithTelekineticPower C info.player", () => {
        expect(info01c.player).toBe(true);
    });
    it("moveObjectWithTelekineticPower C yellowBalls", () => {
        expect(JSON.stringify(gameInfo01c.yellowBalls)).toBe(JSON.stringify([{ x: 2, y: 3, direction: "none" }]));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        timeBombs: [{ x: 6, y: 4, status: -1 }],
        hasTelekineticPower: true
    };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 117, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 117, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = moveObjectWithTelekineticPower(input01d, gameInfo01d, { ...defaultGameVars });
    it("moveObjectWithTelekineticPower D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("moveObjectWithTelekineticPower D info.player", () => {
        expect(info01d.player).toBe(true);
    });
    it("moveObjectWithTelekineticPower D timeBombs", () => {
        expect(JSON.stringify(gameInfo01d.timeBombs)).toBe(JSON.stringify([{ x: 5, y: 4, status: getTimeBombsTime() }]));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        hasTelekineticPower: true
    };
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 28, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 28, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = moveObjectWithTelekineticPower(input01e, gameInfo01e, { ...defaultGameVars });
    it("moveObjectWithTelekineticPower E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("moveObjectWithTelekineticPower E info.player", () => {
        expect(info01e.player).toBe(true);
    });

    // GRAVITY UP

    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        hasTelekineticPower: true
    };
    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 5, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 5, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = moveObjectWithTelekineticPower(input02a, gameInfo02a, { ...defaultGameVars, gravity: "up" });
    it("moveObjectWithTelekineticPower Gravity Up A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("moveObjectWithTelekineticPower Gravity Up A info.player", () => {
        expect(info02a.player).toBe(true);
    });

    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        hasTelekineticPower: true
    };
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 5, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 0, 5, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02b = moveObjectWithTelekineticPower(input02b, gameInfo02b, { ...defaultGameVars, gravity: "up" });
    it("moveObjectWithTelekineticPower Gravity Up B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("moveObjectWithTelekineticPower Gravity Up B info.player", () => {
        expect(info02b.player).toBe(true);
    });

    let gameInfo02c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        hasTelekineticPower: true
    };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 0, 5, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 5, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02c = moveObjectWithTelekineticPower(input02c, gameInfo02c, { ...defaultGameVars, gravity: "up" });
    it("moveObjectWithTelekineticPower Gravity Up C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("moveObjectWithTelekineticPower Gravity Up C info.player", () => {
        expect(info02c.player).toBe(true);
    });

    let gameInfo02d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        hasTelekineticPower: true
    };
    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 0, 0, 82, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 83, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02d = moveObjectWithTelekineticPower(input02d, gameInfo02d, { ...defaultGameVars, gravity: "up" });
    it("moveObjectWithTelekineticPower Gravity Up D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("moveObjectWithTelekineticPower Gravity Up D info.player", () => {
        expect(info02d.player).toBe(true);
    });

    // Insert new tests here
});