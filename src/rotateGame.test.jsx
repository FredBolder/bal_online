import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { rotateArea } from "./rotateGame.js";

describe("Rotate game", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // ROTATE RIGHT

    it("rotateGame right 01", () => {
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
            [1, 0, 9, 0, 3, 1],
            [1, 2, 0, 0, 0, 1],
            [1, 4, 4, 8, 8, 1],
            [1, 0, 0, 0, 0, 1],
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
        const info = rotateArea(inputBack, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 2 });
        expect(gameInfo.redBalls).toEqual([
            { x: 4, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 3, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ]);
        expect(gameInfo.yellowBalls).toEqual([{ x: 2, y: 1, direction: "left" }]);
    });

    it("rotateGame right 02", () => {
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
            [1, 0, 107, 0, 17, 18, 1],
            [1, 0, 0, 0, 15, 16, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 1],
            [1, 2, 0, 0, 0, 3, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            elevators: [{ x: 1, y: 4, up: true }],
            greenBalls: 1,
        };
        const info = rotateArea(inputBack, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.elevators).toEqual([]);
        expect(gameInfo.horizontalElevators).toEqual(
            [{ x: 2, y: 1, right: true }]
        );
    });

    it("rotateGame right 03", () => {
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
            [1, 115, 9, 0, 0, 1],
            [1, 2, 0, 0, 0, 1],
            [1, 116, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 1],
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
        const info = rotateArea(inputBack, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 2 });
        expect(gameInfo.yellowBalls).toEqual(
            [{ x: 2, y: 1, direction: "none" }]
        );
        expect(gameInfo.yellowBallPushers).toEqual(
            [{ x: 1, y: 1 }]
        );
        expect(gameInfo.yellowBallPushersTriggers).toEqual(
            [{ x: 1, y: 3, pressed: false }]
        );
    });

    it("rotateGame right 04", () => {
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
            [1, 2, 0, 0, 0, 1],
            [1, 178, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
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
        const info = rotateArea(inputBack, input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 2 });
        expect(gameInfo.movers).toEqual([
            { x: 1, y: 3, direction: "down", activeSides: ["right", "bottom"], mode: "all", inverted: false, counter: 0 }
        ]);
    });

    // ROTATE LEFT

    it("rotateGame left 01", () => {
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
            [1, 0, 0, 0, 0, 1],
            [1, 8, 8, 4, 4, 1],
            [1, 0, 0, 0, 2, 1],
            [1, 3, 0, 9, 0, 1],
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
        const info = rotateArea(inputBack, input, gameInfo, true);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 3 });
        expect(gameInfo.redBalls).toEqual([
            { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ]);
        expect(gameInfo.yellowBalls).toEqual([{ x: 3, y: 4, direction: "right" }]);
    });

    it("rotateGame left 02", () => {
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
            [1, 3, 0, 0, 0, 2, 1],
            [1, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 17, 18, 0, 0, 0, 1],
            [1, 15, 16, 0, 7, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            elevators: [{ x: 1, y: 4, up: true }],
            greenBalls: 1,
        };
        const info = rotateArea(inputBack, input, gameInfo, true);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.elevators).toEqual([]);
        expect(gameInfo.horizontalElevators).toEqual([{ x: 4, y: 5, right: false }]);
    });

    it("rotateGame left 03", () => {
        const inputBack = zeroArray(7, 7);
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 203, 1],
            [1, 0, 0, 0, 203, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 203, 2, 1],
            [1, 0, 0, 0, 0, 203, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            greenBalls: 1,
            pinkBalls: [{ x: 5, y: 4 }, { x: 4, y: 5 }]
        };
        const info = rotateArea(inputBack, input, gameInfo, true);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.pinkBalls).toEqual([{ x: 4, y: 1 }, { x: 5, y: 2 }]);
    });

    it("rotateGame left 04", () => {
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
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 178, 1],
            [1, 0, 0, 0, 2, 1],
            [1, 3, 0, 0, 0, 1],
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
        const info = rotateArea(inputBack, input, gameInfo, true);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 3 });
        expect(gameInfo.movers).toEqual([
            { x: 4, y: 2, direction: "up", activeSides: ["left", "top"], mode: "all", inverted: false, counter: 0 }
        ]);
    });

    it("rotateGame left 05", () => {
        const inputBack = zeroArray(6, 6);
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 163, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 16, 1],
            [1, 165, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 161, 0, 18, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 165, 2, 0, 0, 1],
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
        const info = rotateArea(inputBack, input, gameInfo, true, 2, 1, 4, 3);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 4 });
        expect(gameInfo.pistons).toEqual([
            { x: 2, y: 1, activated: false, sticky: false, inverted: false, direction: "down", mode: "momentary", group: 1 },
            { x: 1, y: 4, activated: false, sticky: false, inverted: false, direction: "right", mode: "momentary", group: 1 }
        ]);
    });


    // Insert new tests here
});
