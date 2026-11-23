import { beforeEach, describe, it, expect } from "vitest";
import { checkUserObjects } from "./userObjects.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";
import { zeroArray } from "./balUtils.js";

describe("user objects", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkUserObjects 01", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            userObjects: [
                {
                    x: 6, y: 2, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 12
                },
                {
                    x: 2, y: 3, color1: "green", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 2, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 3, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 6, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 3, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 5, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
                {
                    x: 6, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                    combustible: false, activeSides: [], gameOverMode: "none", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(7, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 0, 263, 263, 0, 0, 1, 1],
            [1, 0, 0, 263, 0, 0, 263, 1],
            [1, 2, 0, 263, 0, 263, 263, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 0, 263, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: false, update: true });
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
        expect(gameInfo.userObjects).toEqual([
            {
                x: 6, y: 2, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                direction: "up", movable: true, id: 1, delIfNearSameId: true, delete: false,
                combustible: false, activeSides: [], gameOverMode: "none", group: 12
            },
            {
                x: 2, y: 3, color1: "green", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                direction: "up", movable: true, id: 2, delIfNearSameId: true, delete: false,
                combustible: false, activeSides: [], gameOverMode: "none", group: 1
            },
            {
                x: 6, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                direction: "up", movable: true, id: 1, delIfNearSameId: false, delete: false,
                combustible: false, activeSides: [], gameOverMode: "none", group: 1
            }
        ]);
    });

    it("checkUserObjects 02", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            userObjects: [
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: false, id: 0, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [ "left" ], gameOverMode: "nearactiveside", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 263, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: true, update: true });
    });

    it("checkUserObjects 03", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            userObjects: [
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: false, id: 0, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [ "left" ], gameOverMode: "none", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 263, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: false, update: false });
    });

    it("checkUserObjects 04", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            userObjects: [
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: false, id: 0, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [ "left" ], gameOverMode: "nearactiveside", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 263, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: false, update: false });
    });

    it("checkUserObjects 05", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            userObjects: [
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: false, id: 0, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [ "top" ], gameOverMode: "forceonactiveside", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 263, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        let info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: true, update: true });
        gameInfo.hasPropeller = true;
        info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(info).toEqual({ gameOver: false, update: false });
    });

    it("checkUserObjects 06", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 7, y: 3, direction: "left", movable: true }],
            userObjects: [
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50],
                    direction: "up", movable: false, id: 0, delIfNearSameId: false, delete: false,
                    combustible: false, activeSides: [ "right" ], gameOverMode: "forceonactiveside", group: 1
                },
            ],
            greenBalls: 1,
        };
        const inputBack = zeroArray(5, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 263, 2, 0, 0, 112],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        let info = checkUserObjects(inputBack, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ gameOver: true, update: true });
    });

    // Insert new tests here
});