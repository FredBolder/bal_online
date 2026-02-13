import { beforeEach, describe, it, expect } from "vitest";
import { pushObject, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils pushObject", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("pushObject A", () => {
        const yellow = [{ x: 3, y: 3, direction: "none" }];
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 2 }, 
            greenBalls: 1,
            yellowBalls: yellow, 
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 9, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const inputBack = zeroArray(7, 7);
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1],
            [1, 0, 0, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(yellow).toEqual([{ x: 3, y: 4, direction: "down" }]);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
    });

    it("pushObject B", () => {
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 2 }, 
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 28, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const inputBack = zeroArray(7, 7);
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1],
            [1, 0, 0, 28, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
    });

    it("pushObject C", () => {
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 2 }, 
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 28, 1, 1, 1],
            [1, 0, 0, 28, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const inputBack = zeroArray(7, 7);
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 28, 1, 1, 1],
            [1, 0, 0, 28, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: false, sound: "" });
    });

    it("pushObject D", () => {
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 2 }, 
            forces: [{ x: 3, y: 6, direction: "up" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 28, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 109, 1, 1, 1],
        ];
        const inputBack = zeroArray(7, 7);
        const expectedOutput = copy2dArray(input);
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: false, sound: "" });
    });

    it("pushObject E", () => {
        const yellow = [{ x: 3, y: 1, direction: "none" }];
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 0 }, 
            greenBalls: 1,
            yellowBalls: yellow 
        };
        const input = [
            [1, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 9, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const inputBack = zeroArray(7, 7);
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 1 });
        expect(yellow).toEqual([{ x: 3, y: 2, direction: "down" }]);
    });

    it("pushObject F", () => {
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 5 }, 
            greenBalls: 1,
            hasDivingGlasses: true,
        };
        const input = [
            [0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const inputBack = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [20, 20, 20, 20, 20, 20, 20],
            [23, 23, 23, 23, 23, 23, 23],
            [23, 23, 23, 23, 23, 23, 23],
        ];        
        const expectedOutput = [
            [0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
        ];
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 6 });
    });

    it("pushObject G", () => {
        const gameInfo = { 
            ...defaultGameInfo, 
            blueBall: { x: 3, y: 5 }, 
            greenBalls: 1,
            hasDivingGlasses: true,
            hasPropeller: true,
        };
        const input = [
            [0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const inputBack = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [20, 20, 20, 20, 20, 20, 20],
        ];        
        const expectedOutput = [
            [0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0],
        ];
        const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 6 });
    });

    // Insert new tests here
});