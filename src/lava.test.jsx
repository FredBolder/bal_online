import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkLava, getLavaRegions } from "./lava.js";

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
        const inputBack = zeroArray(8, 7);
        const gameInfo = {
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
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 203, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const info = checkLava(inputBack, input, gameInfo, defaultGameVars);
        expect(info).toEqual({ update: true, sound: "pain", gameOver: true });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.pinkBalls).toEqual([]);
    });

    it("checkLava B", () => {
        const inputBack = zeroArray(8, 7);
        const gameInfo = {
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
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 203, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const info = checkLava(inputBack, input, gameInfo, defaultGameVars);
        expect(info).toEqual({ update: true, sound: "", gameOver: false });
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.pinkBalls).toEqual([]);
    });

    it("getLavaRegions A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 2 },
            greenBalls: 1,
            lava: [
                { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
                { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
            ],
        };
        const inputBack = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 22, 22, 22, 22, 22, 0],
            [0, 22, 22, 22, 22, 22, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const info = getLavaRegions(gameInfo, inputBack);
        expect(info.length).toBe(1); // 1 region
        expect(info[0].length).toBe(10); // 10 lava objects in the region
    });

    it("getLavaRegions B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 2 },
            greenBalls: 1,
            lava: [
                { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
                { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 },
            ],
        };
        const inputBack = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 22, 22, 0, 22, 22, 0],
            [0, 22, 22, 0, 22, 22, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const info = getLavaRegions(gameInfo, inputBack);
        expect(info.length).toBe(2); // 2 regions
        expect(info[0].length).toBe(4); // 4 lava objects in the first region
        expect(info[1].length).toBe(4); // 4 lava objects in the second region
    });

    it("getLavaRegions C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 2 },
            greenBalls: 1,
            lava: [
                { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 },
                { x: 1, y: 5 }, { x: 2, y: 5 },
                { x: 1, y: 6 }, { x: 2, y: 6 },
            ],
        };
        const inputBack = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 22, 0],
            [0, 0, 0, 0, 0, 22, 0],
            [0, 0, 0, 0, 0, 22, 0],
            [0, 0, 0, 0, 0, 22, 0],
            [0, 22, 22, 0, 0, 0, 0],
            [0, 22, 22, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const info = getLavaRegions(gameInfo, inputBack);
        expect(info.length).toBe(2); // 2 regions
        expect(info[0].length).toBe(4); // 4 lava objects in the first region
        expect(info[1].length).toBe(4); // 4 lava objects in the second region
    });


    // Insert new tests here
});