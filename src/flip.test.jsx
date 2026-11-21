import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { flipArea } from "./flip.js";

describe("flip", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("flipArea 01", () => {
        const inputBack = zeroArray(6, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 8, 0, 1],
            [1, 0, 0, 8, 0, 1],
            [1, 9, 0, 4, 0, 1],
            [1, 0, 2, 4, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 8, 0, 3, 1],
            [1, 0, 8, 0, 0, 1],
            [1, 0, 4, 0, 9, 1],
            [1, 0, 4, 2, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 2, y: 4 },
            greenBalls: 1,
            redBalls: [
                { x: 3, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 3, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ],
            yellowBalls: [{ x: 1, y: 3, direction: "down" }],
        };
        gameInfo.blueBall = gameInfo.blueBall1;
        const info = flipArea(inputBack, input, gameInfo, 0, 0, 5, 5);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
        expect(gameInfo.redBalls).toEqual([
            { x: 2, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ]);
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 3, direction: "down" }]);
    });

    it("flipArea 02", () => {
        const inputBack = zeroArray(7, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 17, 18, 0, 5, 3, 1],
            [1, 15, 16, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 106, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 5, 0, 17, 18, 1],
            [1, 0, 0, 0, 15, 16, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 106, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            elevators: [{ x: 1, y: 4, up: true }],
            greenBalls: 1,
        };
        const info = flipArea(inputBack, input, gameInfo, 0, 0, 6, 6);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.elevators).toEqual([{ x: 5, y: 4, up: true }]);
    });

    it("flipArea 03", () => {
        const inputBack = zeroArray(6, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 1],
            [1, 115, 2, 116, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 1],
            [1, 0, 116, 2, 115, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 2, y: 4 },
            greenBalls: 1,
            yellowBalls: [{ x: 1, y: 3, direction: "none" }],
            yellowBallPushers: [{ x: 1, y: 4 }],
            yellowBallPushersTriggers: [{ x: 3, y: 4, pressed: false }],
        };
        gameInfo.blueBall = gameInfo.blueBall1;
        const info = flipArea(inputBack, input, gameInfo, 0, 0, 5, 5);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
        expect(gameInfo.yellowBalls).toEqual(
            [{ x: 4, y: 3, direction: "none" }]
        );
        expect(gameInfo.yellowBallPushers).toEqual(
            [{ x: 4, y: 4 }]
        );
        expect(gameInfo.yellowBallPushersTriggers).toEqual(
            [{ x: 2, y: 4, pressed: false }]
        );
    });

    it("flipArea 04", () => {
        const inputBack = zeroArray(6, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 2, 178, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 178, 2, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 2, y: 4 },
            movers: [
                { x: 3, y: 4, direction: "right", activeSides: ["top", "right"], mode: "all", inverted: false, counter: 0 }
            ]
        };
        gameInfo.blueBall = gameInfo.blueBall1;
        const info = flipArea(inputBack, input, gameInfo, 0, 0, 5, 5);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
        expect(gameInfo.movers).toEqual([
            { x: 2, y: 4, direction: "left", activeSides: ["left", "top"], mode: "all", inverted: false, counter: 0 }
        ]);
    });

    it("flipArea 05", () => {
        const inputBack = zeroArray(6, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 163, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 165, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 165, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 165, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall1: { x: 2, y: 4 },
            pistons: [
                { x: 4, y: 1, activated: false, sticky: false, inverted: false, direction: "left", mode: "momentary", group: 1 },
                { x: 1, y: 4, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }
            ],
        };
        gameInfo.blueBall = gameInfo.blueBall1;
        const info = flipArea(inputBack, input, gameInfo, 2, 1, 4, 4);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
        expect(gameInfo.pistons).toEqual([
            { x: 2, y: 1, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 },
            { x: 1, y: 4, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }
        ]);
    });

    // Insert new tests here
});
