import { beforeEach, describe, it, expect } from "vitest";
import { checkBrownBalls } from "./brownBalls.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("brown balls", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkBrownBalls A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            brownBalls: [
                { x: 6, y: 2, delete: false, counter: defaultGameVars.brownCountTo },
                { x: 3, y: 3, delete: false, counter: defaultGameVars.brownCountTo },
                { x: 3, y: 4, delete: false, counter: defaultGameVars.brownCountTo },
                { x: 3, y: 5, delete: false, counter: defaultGameVars.brownCountTo },
                { x: 5, y: 5, delete: false, counter: defaultGameVars.brownCountTo },
                { x: 6, y: 5, delete: false, counter: defaultGameVars.brownCountTo },
            ],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 253, 1],
            [1, 0, 0, 253, 0, 0, 1, 1],
            [1, 0, 0, 253, 0, 0, 0, 1],
            [1, 2, 0, 253, 0, 253, 253, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 253, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkBrownBalls(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
        expect(gameInfo.brownBalls).toEqual([
            { x: 6, y: 2, delete: false, counter: defaultGameVars.brownCountTo },
        ]);
    });



    // Insert new tests here
});