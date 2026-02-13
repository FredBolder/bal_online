import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { gameScheduler } from "./scheduler.js";

describe("gameScheduler", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

    it("gameScheduler A", async () => {
        const inputBack = zeroArray(5, 5);

        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 3, y: 3 },
            horizontalElevators: [{ x: 3, y: 5, right: true }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 107, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 107, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = await gameScheduler(inputBack, input, gameInfo,
            { ...defaultGameVars, elevatorCounter: defaultGameVars.elevatorCountTo });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({
            gateTravelling: false,
            playSounds: [],
            updateCanvas: true,
            updateGreen: false,
            updateLevelNumber: false,
        }));
    });

    // Insert new tests here
});