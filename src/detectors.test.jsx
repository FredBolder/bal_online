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

    it("detectors A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
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
                { x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
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
                { x: 2, y: 4, mode: "all", oneTime: false, activeSides: ["right"], range: 1, target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 4, mode: "all", oneTime: false, activeSides: ["right"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
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
                { x: 2, y: 4, mode: "all", oneTime: false, activeSides: ["right"], range: 1, target: "setting", value: "$message: Καλημέρα!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 4, mode: "all", oneTime: false, activeSides: ["left"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
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

    it("detectors E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 1, mode: "purpleball", oneTime: false, activeSides: ["bottom"], range: 1, target: "group", value: "", display: "stone", activated: false, activatedCount: 0, group: 3 },
                { x: 2, y: 5, mode: "lightblueball", oneTime: false, activeSides: ["top"], range: 1, target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }],
            pushers: [{ x: 7, y: 4, direction: "left", group: 3 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 255, 0, 0, 0, 5, 163, 1],
            [1, 0, 5, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 4, 0, 5, 0, 0, 209, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 255, 0, 0, 5, 164, 163, 1],
            [1, 0, 5, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 4, 0, 5, 0, 0, 209, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: true, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }]);
        expect(gameInfo.pushers).toEqual([{ x: 7, y: 4, direction: "left", group: 3 }]);
    });

    it("detectors F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 1, mode: "purpleball", oneTime: false, activeSides: ["bottom"], range: 1, target: "group", value: "", display: "stone", activated: false, activatedCount: 0, group: 3 },
                { x: 2, y: 5, mode: "lightblueball", oneTime: false, activeSides: ["top"], range: 1, target: "setting", value: "$message: Hello, this is a test!", display: "stone", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 2 }
            ],
            pistons: [{ x: 7, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }],
            pushers: [{ x: 7, y: 4, direction: "left", group: 3 }],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 255, 0, 0, 0, 5, 163, 1],
            [1, 0, 28, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 5, 0, 5, 0, 0, 209, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 255, 0, 0, 5, 164, 163, 1],
            [1, 0, 28, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 5, 0, 5, 0, 209, 0, 1],
            [1, 1, 255, 1, 255, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameVars.message).toBe("Hello, this is a test!");
        expect(gameInfo.pistons).toEqual([{ x: 7, y: 1, activated: true, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 2 }]);
        expect(gameInfo.pushers).toEqual([{ x: 6, y: 4, direction: "left", group: 3 }]);
    });

    it("detectors G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                    value: "move, smallgreenball, rel, 2, -2, right", display: "stone", activated: false, 
                    activatedCount: 0, group: 1 }
            ],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.detectors).toEqual([
            { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                value: "move, smallgreenball, rel, 2, -2, right", display: "stone", activated: true, 
                activatedCount: 1, group: 1 }
        ]);
    });

    it("detectors H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                    value: "create, spikeup, abs, 3, 4", display: "stone", activated: false, 
                    activatedCount: 0, group: 1 }
            ],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 174, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.detectors).toEqual([
            { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                value: "create, spikeup, abs, 3, 4", display: "stone", activated: true, 
                activatedCount: 1, group: 1 }
        ]);
    });

    it("detectors I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                    value: "delete, spike, rel, 1, -1", display: "stone", activated: false, 
                    activatedCount: 0, group: 1 }
            ],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 174, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.detectors).toEqual([
            { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                value: "delete, spike, rel, 1, -1", display: "stone", activated: true, 
                activatedCount: 1, group: 1 }
        ]);
    });

    it("detectors J", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 3, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                    value: "delete, stone, rel, 1, 0 | delete, stone, rel, 1, 1", display: "stone", activated: false, 
                    activatedCount: 0, group: 1 }
            ],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.detectors).toEqual([
            { x: 2, y: 3, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                value: "delete, stone, rel, 1, 0 | delete, stone, rel, 1, 1", display: "stone", activated: true, 
                activatedCount: 1, group: 1 }
        ]);
    });

    it("detectors K", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                    value: "create, pistonright, abs, 1, 1 | $group: 1, 1, 2", display: "stone", activated: false, 
                    activatedCount: 0, group: 1 }
            ],
        }
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 4, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 165, 4, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkPistonsTriggers(backData, input, gameInfo, gameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.detectors).toEqual([
            { x: 2, y: 5, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "command", 
                value: "create, pistonright, abs, 1, 1 | $group: 1, 1, 2", display: "stone", activated: true, 
                activatedCount: 1, group: 1 }
        ]);
        expect(gameInfo.pistons).toEqual([
            { x: 1, y: 1, activated: false, sticky: false, inverted: false, direction: "right", 
                mode: "toggle", group: 2 }
        ]);
    });

    // Insert new tests here
});
