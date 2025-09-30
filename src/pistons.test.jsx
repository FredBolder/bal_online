import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsDetector, checkPistonsTriggers } from "./pistons.js";
import { copy2dArray } from "./utils.js";

describe("Pistons", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);
    const defaultPistonGroupsActivated = [];
    for (let i = 0; i < 32; i++) {
        defaultPistonGroupsActivated.push(false);
    }

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // checkPistonsTriggers

    it("checkPistonsTriggers A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            yellowBalls: [{ x: 4, y: 3, direction: "none" }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 9, 5, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 9, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 5, y: 3, direction: "none" }]);
    });

    it("checkPistonsTriggers C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            yellowBalls: [{ x: 5, y: 2, direction: "none" }],
            pistons: [{ x: 7, y: 2, activated: false, sticky: false, inverted: false, direction: "left", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 9, 5, 163, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 5, 9, 5, 164, 163, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 2, direction: "none" }]);
    });

    it("checkPistonsTriggers D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            yellowBalls: [{ x: 6, y: 2, direction: "none" }],
            pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 1 },
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 0, 0, 0, 9, 0, 1],
            [1, 0, 0, 98, 0, 0, 5, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 2, 0, 5, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 82, 0, 0, 162, 0, 1],
            [1, 0, 0, 4, 0, 0, 9, 0, 1],
            [1, 0, 0, 5, 0, 0, 5, 0, 1],
            [1, 2, 0, 160, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 6, y: 3, direction: "none" }]);
    });

    it("checkPistonsTriggers E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 83, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    it("checkPistonsTriggers F", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            pistons: [{ x: 6, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "toggle", group: 2 },
            { x: 3, y: 6, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 6, pressed: false, group: 1 }, { x: 7, y: 6, pressed: false, group: 2 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 97, 0, 0, 5, 0, 1],
            [1, 0, 0, 84, 0, 0, 0, 0, 1],
            [1, 2, 0, 138, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 161, 0, 1],
            [1, 0, 0, 97, 0, 0, 5, 0, 1],
            [1, 0, 0, 84, 0, 0, 5, 0, 1],
            [1, 0, 0, 138, 0, 0, 0, 0, 1],
            [1, 2, 0, 160, 0, 0, 0, 0, 1],
            [1, 158, 0, 159, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers G", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: true, sticky: true, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let pistonGroupsActivated = [...defaultPistonGroupsActivated];
        pistonGroupsActivated[0] = true;
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 0, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers H", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: true, sticky: false, inverted: false, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let pistonGroupsActivated = [...defaultPistonGroupsActivated];
        pistonGroupsActivated[0] = true;
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 0, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: pistonGroupsActivated }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers I", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 166, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkPistonsTriggers J", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "momentary", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    it("checkPistonsTriggers K", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "toggle", group: 1 }],
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 165, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    // checkPistonsDetector

    it("checkPistonsDetector A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "whiteball", group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 4, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 166, 4, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: true, sticky: false, inverted: true, direction: "right", mode: "whiteball", group: 1 }]);
    });

    it("checkPistonsDetector B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            orangeBalls: [{ x: 4, y: 3, direction: "none" }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "whiteball", group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 40, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "whiteball", group: 1 }]);
    });

    it("checkPistonsDetector C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            orangeBalls: [{ x: 4, y: 3, direction: "none" }],
            pistons: [{ x: 3, y: 3, activated: false, sticky: false, inverted: true, direction: "right", mode: "orangeball", group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 40, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 165, 166, 40, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsDetector(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pistons).toEqual([{ x: 3, y: 3, activated: true, sticky: false, inverted: true, direction: "right", mode: "orangeball", group: 1 }]);
        expect(gameInfo.orangeBalls).toEqual([{ x: 5, y: 3, direction: "none" }]);
    });



    // Insert new tests here
});
