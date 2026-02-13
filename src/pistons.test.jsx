import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsDetector, checkPistonsTriggers } from "./pistons.js";
import { copy2dArray } from "./utils.js";

describe("Pistons", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

    const defaultPistonGroupsActivated = [];
    for (let i = 0; i < 32; i++) {
        defaultPistonGroupsActivated.push(false);
    }

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // checkPistonsTriggers

    it("checkPistonsTriggers A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
            yellowBalls: [{ x: 4, y: 3, direction: "none" }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 9, 5, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 9, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 5, y: 3, direction: "none" }]);
    });

    it("checkPistonsTriggers C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 7, y: 2, activated: false, sticky: false, inverted: false, direction: "left", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
            yellowBalls: [{ x: 5, y: 2, direction: "none" }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 9, 5, 163, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 5, 9, 5, 164, 163, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 2, direction: "none" }]);
    });

    it("checkPistonsTriggers D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
            pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 1 },
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }],
            yellowBalls: [{ x: 6, y: 2, direction: "none" }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 0, 0, 0, 9, 0, 1],
            [1, 0, 0, 98, 0, 0, 5, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 2, 0, 5, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 82, 0, 0, 162, 0, 1],
            [1, 0, 0, 4, 0, 0, 9, 0, 1],
            [1, 0, 0, 5, 0, 0, 5, 0, 1],
            [1, 2, 0, 160, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 6, y: 3, direction: "none" }]);
    });

    it("checkPistonsTriggers E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 83, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    it("checkPistonsTriggers F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
            pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 2 },
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }, { x: 7, y: 6, pressed: false, group: 2 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 97, 0, 0, 5, 0, 1],
            [1, 0, 0, 84, 0, 0, 0, 0, 1],
            [1, 2, 0, 138, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 97, 0, 0, 5, 0, 1],
            [1, 0, 0, 84, 0, 0, 5, 0, 1],
            [1, 0, 0, 138, 0, 0, 0, 0, 1],
            [1, 2, 0, 160, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: true, sticky: true, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const pistonGroupsActivated = [...defaultPistonGroupsActivated];
        pistonGroupsActivated[0] = true;
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 0, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const pistonGroupsActivated = [...defaultPistonGroupsActivated];
        pistonGroupsActivated[0] = true;
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 0, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers J", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "momentary", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    it("checkPistonsTriggers K", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    // checkPistonsDetector

    it("checkPistonsDetector A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "whiteball", group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 4, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 166, 4, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "whiteball", group: 1 }]);
    });

    it("checkPistonsDetector B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            orangeBalls: [{ x: 4, y: 3, direction: "none" }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "whiteball", group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 40, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "whiteball", group: 1 }]);
    });

    it("checkPistonsDetector C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            orangeBalls: [{ x: 4, y: 3, direction: "none" }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "orangeball", group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 40, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 166, 40, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "orangeball", group: 1 }]);
        expect(gameInfo.orangeBalls).toEqual([{ x: 5, y: 3, direction: "none" }]);
    });

    it("checkPistonsDetector D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            pistons: [{ x: 5, y: 3, activated: false, sticky: false, inverted: false, direction: "left", mode: "redball", group: 1 }],
            redBalls: [{ x: 4, y: 3, smart: 1, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 93, 163, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 93, 164, 163, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 5, y: 3, activated: true, sticky: false, inverted: false, direction: "left", mode: "redball", group: 1 }]);
        expect(gameInfo.redBalls).toEqual([{ x: 3, y: 3, smart: 1, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]);
    });

    it("checkPistonsDetector E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            pinkBalls: [{ x: 4, y: 3, delete: false, skipFalling: 0 }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "pinkball", group: 1 }],
        }
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 203, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 166, 203, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "pinkball", group: 1 }]);
        expect(gameInfo.pinkBalls).toEqual([{ x: 5, y: 3, delete: false, skipFalling: 0 }]);
    });

    // Insert new tests here
});
