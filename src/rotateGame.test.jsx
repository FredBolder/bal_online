import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { rotateGame } from "./rotateGame.js";

describe("Rotate game", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    // ROTATE RIGHT

    it("rotateGame right A", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(
            JSON.stringify({ x: 1, y: 2 })
        );
        expect(JSON.stringify(gameInfo.redBalls)).toBe(
            JSON.stringify([
                { x: 4, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 3, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ])
        );
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "left" }])
        );
    });

    it("rotateGame right B", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.elevators)).toBe(JSON.stringify([]));
        expect(JSON.stringify(gameInfo.horizontalElevators)).toBe(
            JSON.stringify([{ x: 2, y: 1, right: true }])
        );
    });

    it("rotateGame right C", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(
            JSON.stringify({ x: 1, y: 2 })
        );
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }])
        );
        expect(JSON.stringify(gameInfo.yellowBallPushers)).toBe(
            JSON.stringify([{ x: 1, y: 1 }])
        );
        expect(JSON.stringify(gameInfo.yellowBallPushersTriggers)).toBe(
            JSON.stringify([{ x: 1, y: 3, pressed: false }])
        );
    });

    // ROTATE LEFT

    it("rotateGame left A", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo, true);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(
            JSON.stringify({ x: 4, y: 3 })
        );
        expect(JSON.stringify(gameInfo.redBalls)).toBe(
            JSON.stringify([
                { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ])
        );
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "right" }])
        );
    });

    it("rotateGame left B", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo, true);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.elevators)).toBe(JSON.stringify([]));
        expect(JSON.stringify(gameInfo.horizontalElevators)).toBe(
            JSON.stringify([{ x: 4, y: 5, right: false }])
        );
    });

    it("rotateGame left C", () => {
        initGameInfo(defaultGameInfo);
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
        const info = rotateGame(inputBack, input, gameInfo, true);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.pinkBalls)).toBe(JSON.stringify([{ x: 4, y: 1 }, { x: 5, y: 2 }]));
    });

    // Insert new tests here
});
