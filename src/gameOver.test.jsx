import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkGameOver } from "./gameOver.js";

describe("Game over", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkGameOver A", () => {
        const inputBack = [
            [0, 0, 0, 0, 0],
            [0, 23, 23, 23, 0],
            [0, 23, 23, 23, 0],
            [0, 23, 23, 23, 0],
            [0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 3, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 2, 27, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 1, y: 2 },
            hasDivingGlasses: true,
            greenBalls: 1,
            redFish: [
                {
                    x: 2,
                    y: 2,
                    xStart: 2,
                    yStart: 2,
                    maxDistX: 0,
                    direction: 6,
                    blocked: false,
                    outOfWater: 0,
                    isDead: false
                }
            ],
        };
        const gameVars = { ...defaultGameVars };
        gameInfo.blueBall = gameInfo.blueBall1;
        gameVars.gameOver = false;
        expect(checkGameOver(inputBack, input, gameInfo, gameVars)).toEqual({ playSounds: [], updateCanvas: true });
        expect(gameVars.gameOver).toBe(true);

        gameVars.gameOver = false;
        gameInfo.redFish[0].isDead = true;
        expect(checkGameOver(inputBack, input, gameInfo, gameVars)).toEqual({ playSounds: [], updateCanvas: false });
        expect(gameVars.gameOver).toBe(false);
    });


    // Insert new tests here
});