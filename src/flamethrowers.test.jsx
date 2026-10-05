import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { checkFlames } from "./flamethrowers.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsTriggers } from "./pistons.js";

describe("Flamethrowers", () => {
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

    it("checkFlames A", () => {
        const inputBack = zeroArray(5, 8);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            detectors: [
                {
                    x: 2, y: 4, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "group",
                    value: "", display: "default", activated: false,
                    activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
                }
            ],
            flamethrowers: [
                { x: 6, y: 3, active: false, direction: "left", range: 3, display: "default", movable: false, group: 1 }
            ],
            yellowBalls: [{ x: 3, y: 3, direction: "none" }, { x: 4, y: 3, direction: "none" }],
            greenBalls: 1,
        };
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 9, 9, 0, 257, 1],
            [1, 1, 255, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 257, 1],
            [1, 1, 255, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(inputBack, input, gameInfo, gameVars, "scheduler");
        expect(info).toEqual({ updated: true, explosion: false });
        info = checkFlames(inputBack, input, gameInfo);
        expect(info).toEqual({ update: true, sound: "", gameOver: false });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.flamethrowers).toEqual([
            { x: 6, y: 3, active: true, direction: "left", range: 3, display: "default", movable: false, group: 1 }
        ]);
        expect(gameInfo.yellowBalls).toEqual([]);
    });

    it("checkFlames B", () => {
        const inputBack = zeroArray(5, 8);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            detectors: [
                {
                    x: 2, y: 4, mode: "blueball", oneTime: false, activeSides: ["top"], range: 1, target: "group",
                    value: "", display: "default", activated: false,
                    activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
                }
            ],
            flamethrowers: [
                { x: 6, y: 3, active: false, direction: "left", range: 4, display: "stone", movable: false, group: 1 }
            ],
            greenBalls: 1,
        };
        const gameVars = { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 5, 28, 257, 1],
            [1, 1, 255, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 257, 1],
            [1, 1, 255, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(inputBack, input, gameInfo, gameVars, "scheduler");
        expect(info).toEqual({ updated: true, explosion: false });
        info = checkFlames(inputBack, input, gameInfo);
        expect(info).toEqual({ update: true, sound: "pain", gameOver: true });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.flamethrowers).toEqual([
            { x: 6, y: 3, active: true, direction: "left", range: 4, display: "stone", movable: false, group: 1 }
        ]);
    });


    // Insert new tests here
});