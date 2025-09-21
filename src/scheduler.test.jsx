import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { gameScheduler } from "./scheduler.js";

describe("gameScheduler", () => {
    it("gameScheduler A", async () => {
        const defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        const defaultGameVars = {};
        initGameVars(defaultGameVars);

        let inputBack01 = zeroArray(5, 5);

        let gameInfo01a = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 3, y: 3 },
            horizontalElevators: [{ x: 3, y: 5, right: true }],
        };
        let input01a = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 107, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput01a = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 107, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info01a = await gameScheduler(inputBack01, input01a, gameInfo01a,
            { ...defaultGameVars, elevatorCounter: defaultGameVars.elevatorCountTo });
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({
            gateTravelling: false,
            playSounds: [],
            updateCanvas: true,
            updateGreen: false,
            updateLevelNumber: false,
        }));
    });

    // Insert new tests here
});