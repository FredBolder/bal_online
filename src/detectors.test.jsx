import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsTriggers } from "./pistons.js";

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

    it("detectors A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, activeSides: ["top"], target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, group: 1 },
                { x: 4, y: 5, activeSides: ["top"], target: "group", value: "", display: "default", activated: false, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 5, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 5, 0, 0, 0, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 5, 164, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 5, 0, 0, 0, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("Hello, this is a test!");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: true, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }]);
    });

    it("detectors B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, activeSides: ["top"], target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, group: 1 },
                { x: 4, y: 5, activeSides: ["top"], target: "group", value: "", display: "default", activated: false, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 1 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 5, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 83, 0, 5, 0, 0, 0, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 5, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 83, 0, 5, 0, 0, 0, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("Hello, this is a test!");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 1 }]);
    });

    it("detectors C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 4, activeSides: ["right"], target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, group: 1 },
                { x: 4, y: 4, activeSides: ["right"], target: "group", value: "", display: "default", activated: false, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 5, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 255, 0, 255, 4, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 5, 164, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 255, 0, 255, 4, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: true, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }]);
    });

    it("detectors D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 4, activeSides: ["right"], target: "setting", value: "$message: Καλημέρα!", display: "stone", activated: false, group: 1 },
                { x: 4, y: 4, activeSides: ["left"], target: "group", value: "", display: "default", activated: false, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 5, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 255, 2, 255, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 5, 164, 163, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 255, 2, 255, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("Καλημέρα!");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: true, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }]);
    });


    // Insert new tests here
});
