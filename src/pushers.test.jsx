import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPistonsTriggers } from "./pistons.js";

describe("Pushers", () => {
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
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            pistonsTriggers: [{ x: 1, y: 4, pressed: false, group: 1 }],
            pushers: [{ x: 3, y: 3, direction: "right", group: 1 }],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 209, 5, 28, 5, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 209, 5, 28, 5, 1],
            [1, 158, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pushers).toEqual([{ x: 4, y: 3, direction: "right", group: 1 }]);
    });

    it("checkPistonsTriggers B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            pistonsTriggers: [
                { x: 1, y: 5, pressed: false, group: 1 },
                { x: 7, y: 5, pressed: false, group: 2 },
            ],
            pushers: [
                { x: 4, y: 1, direction: "down", group: 1 },
                { x: 4, y: 2, direction: "up", group: 2 },
            ],
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 209, 0, 0, 0, 1],
            [1, 0, 0, 0, 209, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 209, 0, 0, 0, 1],
            [1, 0, 0, 0, 209, 0, 0, 0, 1],
            [1, 2, 0, 0, 5, 0, 0, 0, 1],
            [1, 158, 0, 0, 0, 0, 0, 158, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkPistonsTriggers(backData, input, gameInfo, { ...defaultGameVars, pistonGroupsActivated: [...defaultPistonGroupsActivated] }, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pushers).toEqual([
            { x: 4, y: 2, direction: "down", group: 1 },
            { x: 4, y: 3, direction: "up", group: 2 },
        ]);
    });


    // Insert new tests here
});
