import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkLava } from "./lava.js";

describe("Lava", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkLava A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 5 },
            greenBalls: 1,
            lava: [
                { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
                { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
            ],
            pinkBalls: [
                { x: 3, y: 5, delete: false, counter: defaultGameVars.pinkCountTo },
            ],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 203, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const info = checkLava(input, gameInfo, defaultGameVars);
        expect(info).toEqual({ update: true, sound: "pain", gameOver: true });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.pinkBalls).toEqual([]);
    });

    it("checkLava B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            greenBalls: 1,
            lava: [
                { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
                { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
            ],
            pinkBalls: [
                { x: 3, y: 5, delete: false, counter: defaultGameVars.pinkCountTo },
            ],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const info = checkLava(input, gameInfo, defaultGameVars);
        expect(info).toEqual({ update: true, sound: "", gameOver: false });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.pinkBalls).toEqual([]);
    });



    // Insert new tests here
});