import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkSeaAnemones } from "./seaAnemone.js";

describe("Sea anemones", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const inputBack = [
        [23, 23, 23, 23, 23, 23, 23, 23],
        [23, 23, 23, 23, 23, 23, 23, 23],
        [23, 23, 252, 23, 23, 23, 252, 252],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkSeaAnemones A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 6, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 6, y: 2 },
            greenBalls: 1,
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(true);
    });

    it("checkSeaAnemones B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 0, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 0, y: 2 },
            greenBalls: 1,
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(false);
    });

    it("checkSeaAnemones C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 0, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 0, y: 2 },
            greenBalls: 1,
            redFish: [{ x: 7, y: 2, direction: 6, blocked: false, outOfWater: 0, isDead: false }]
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(false);
        expect(gameInfo.redFish).toEqual([{ x: 7, y: 2, direction: 6, blocked: false, outOfWater: 0, isDead: true }]);
    });

    it("checkSeaAnemones D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 0, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 0, y: 2 },
            greenBalls: 1,
            redFish: [{ x: 7, y: 1, direction: 6, blocked: false, outOfWater: 0, isDead: false }]
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(false);
        expect(gameInfo.redFish).toEqual([{ x: 7, y: 1, direction: 6, blocked: false, outOfWater: 0, isDead: false }]);
    });

    it("checkSeaAnemones E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 0, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 0, y: 2 },
            greenBalls: 1,
            tropicalFish: [{
                x: 2,
                y: 2,
                direction: 4,
                palette: 2,
                shape: 2,
                tail: 2,
                fins: 3,
                stripes: 5,
                blocked: false,
                outOfWater: 0,
                isDead: false,
                counter: 0,
                answer: "fish"
            }]
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(false);
        expect(gameInfo.tropicalFish).toEqual([{
            x: 2,
            y: 2,
            direction: 4,
            palette: 2,
            shape: 2,
            tail: 2,
            fins: 3,
            stripes: 5,
            blocked: false,
            outOfWater: 0,
            isDead: true,
            counter: 0,
            answer: "fish"
        }]);
    });

    it("checkSeaAnemones F (clownfish)", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 0, y: 2 },
            blueBall2: { x: -1, y: -1 },
            blueBall: { x: 0, y: 2 },
            greenBalls: 1,
            tropicalFish: [{
                x: 2,
                y: 2,
                direction: 4,
                palette: 8,
                shape: 2,
                tail: 6,
                fins: 1,
                stripes: 15,
                blocked: false,
                outOfWater: 0,
                isDead: false,
                counter: 0,
                answer: "fish"
            }]
        };
        const gameVars = { ...defaultGameVars };
        checkSeaAnemones(inputBack, gameInfo, gameVars);
        expect(gameVars.gameOver).toBe(false);
        expect(gameInfo.tropicalFish).toEqual([{
            x: 2,
            y: 2,
            direction: 4,
            palette: 8,
            shape: 2,
            tail: 6,
            fins: 1,
            stripes: 15,
            blocked: false,
            outOfWater: 0,
            isDead: false,
            counter: 0,
            answer: "fish"
        }]);
    });

    // Insert new tests here
});