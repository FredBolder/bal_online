import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsTriggers } from "./pistons.js";

describe("Pistons", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);
    const pistonGroupsActivated = [];
    for (let i = 0; i < 32; i++) {
        pistonGroupsActivated.push(false);
    }

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
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
    let info01a = checkPistonsTriggers(backData, input01a, gameInfo01a, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkPistonsTriggers A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        yellowBalls: [{ x: 4, y: 3, direction: "none" }],
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
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
    let info01b = checkPistonsTriggers(backData, input01b, gameInfo01b, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkPistonsTriggers B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTriggers B yellow", () => {
        expect(JSON.stringify(gameInfo01b.yellowBalls)).toBe(JSON.stringify([{ x: 5, y: 3, direction: "none" }]));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        yellowBalls: [{ x: 5, y: 2, direction: "none" }],
        pistons: [{ x: 7, y: 2, activated: false, sticky: false, inverted: false, direction: "left", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
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
    let info01c = checkPistonsTriggers(backData, input01c, gameInfo01c, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkPistonsTriggers C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTriggers C yellow", () => {
        expect(JSON.stringify(gameInfo01c.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "none" }]));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 5 },
        yellowBalls: [{ x: 6, y: 2, direction: "none" }],
        pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 1 }, 
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }],
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
    let info01d = checkPistonsTriggers(backData, input01d, gameInfo01d, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("checkPistonsTriggers D info", () => {
        expect(JSON.stringify(info01d)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkPistonsTriggers D yellow", () => {
        expect(JSON.stringify(gameInfo01d.yellowBalls)).toBe(JSON.stringify([{ x: 6, y: 3, direction: "none" }]));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
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
    let info01e = checkPistonsTriggers(backData, input01e, gameInfo01e, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("checkPistonsTriggers E info", () => {
        expect(JSON.stringify(info01e)).toBe(JSON.stringify({ updated: false }));
    });

    let gameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 5 },
        pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 2 }, 
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }, { x: 7, y: 6, pressed: false, group: 2 }],
    }
    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 161, 0, 1],
        [1, 0, 0, 0, 0, 0, 5, 0, 1],
        [1, 0, 0, 97, 0, 0, 5, 0, 1],
        [1, 0, 0, 84, 0, 0, 0, 0, 1],
        [1, 2, 0, 138, 0, 0, 0, 0, 1],
        [1, 158, 0, 159, 0, 0, 0, 158, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 161, 0, 1],
        [1, 0, 0, 97, 0, 0, 5, 0, 1],
        [1, 0, 0, 84, 0, 0, 5, 0, 1],
        [1, 0, 0, 138, 0, 0, 0, 0, 1],
        [1, 2, 0, 160, 0, 0, 0, 0, 1],
        [1, 158, 0, 159, 0, 0, 0, 158, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f = checkPistonsTriggers(backData, input01f, gameInfo01f, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("checkPistonsTriggers F info", () => {
        expect(JSON.stringify(info01f)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: true, sticky: true, inverted: false, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
    }
    let pistonGroupsActivated01g = [...pistonGroupsActivated];
    pistonGroupsActivated01g[0] = true;
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 166, 5, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 0, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01g = checkPistonsTriggers(backData, input01g, gameInfo01g, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated01g }, false);
    it("checkPistonsTriggers G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("checkPistonsTriggers G info", () => {
        expect(JSON.stringify(info01g)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01h = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
    }
    let pistonGroupsActivated01h = [...pistonGroupsActivated];
    pistonGroupsActivated01h[0] = true;
    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 166, 5, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 0, 5, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = checkPistonsTriggers(backData, input01h, gameInfo01h, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated01h }, false);
    it("checkPistonsTriggers H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("checkPistonsTriggers H info", () => {
        expect(JSON.stringify(info01h)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01i = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
    }
    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 28, 5, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 166, 5, 28, 5, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01i = checkPistonsTriggers(backData, input01i, gameInfo01i, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("checkPistonsTriggers I info", () => {
        expect(JSON.stringify(info01i)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01j = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "momentary", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
    }
    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 28, 5, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = input01j.map(row => [...row]);
    let info01j = checkPistonsTriggers(backData, input01j, gameInfo01j, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("checkPistonsTriggers J info", () => {
        expect(JSON.stringify(info01j)).toBe(JSON.stringify({ updated: false }));
    });

    let gameInfo01k = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 3 },
        pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "toggle", group: 1 }],
        pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
    }
    let input01k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 165, 5, 28, 5, 0, 1],
        [1, 158, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01k = input01k.map(row => [...row]);
    let info01k = checkPistonsTriggers(backData, input01k, gameInfo01k, { ...defaultGameVars, pistonGroupsActivated: [...pistonGroupsActivated] }, false);
    it("checkPistonsTriggers K", () => {
        expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
    });
    it("checkPistonsTriggers K info", () => {
        expect(JSON.stringify(info01k)).toBe(JSON.stringify({ updated: false }));
    });

    // Insert new tests here
});
