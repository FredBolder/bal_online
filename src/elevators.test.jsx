import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveElevators, moveHorizontalElevators } from "./elevators.js";

describe("Elevators", () => {
    const backData = zeroArray(20, 20); // bigger array, so it can be used for more tests
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // ***** MOVE ELEVATORS *****

    it("moveElevators A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 6, y: 2, up: false, hasBlueBall: false }, { x: 3, y: 5, up: true, hasBlueBall: true }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 6, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 6, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
    });

    it("moveElevators B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 7 },
            elevators: [
                { x: 5, y: 2, up: false, hasBlueBall: false }, 
                { x: 6, y: 2, up: false, hasBlueBall: false }, 
                { x: 3, y: 5, up: true, hasBlueBall: false }
            ]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 4, 5, 1],
            [1, 0, 0, 4, 0, 6, 6, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 5, 1],
            [1, 0, 0, 4, 0, 4, 0, 1],
            [1, 0, 0, 4, 0, 6, 6, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 1, y: 7 }));
    });

    it("moveElevators C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 5, up: false, hasBlueBall: false }],
            hasPropeller: true
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    it("moveElevators D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 2, up: false, hasBlueBall: false }],
            hasPropeller: true
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
        expect(JSON.stringify(gameInfo.elevators)).toBe(JSON.stringify([{ x: 3, y: 2, up: true, hasBlueBall: false }]));
    });

    it("moveElevators E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 2, up: false, hasBlueBall: false }],
            greenBalls: 1
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    it("moveElevators F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            elevators: [{ x: 3, y: 5, up: true, hasBlueBall: true }],
            greenBalls: 1,
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 25, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backInput, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    it("moveElevators G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            elevators: [{ x: 3, y: 5, up: true, hasBlueBall: false }],
            greenBalls: 1,
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 25, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backInput, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    // ***** MOVE HORIZONTAL ELEVATORS *****

    it("moveHorizontalElevators A", () => {
        const elevatorsInput = [{ x: 5, y: 6, right: false, hasBlueBall: true }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 6, right: false, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    it("moveHorizontalElevators B", () => {
        const elevatorsInput = [{ x: 5, y: 6, right: true, hasBlueBall: true }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 107, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 4, 1],
            [1, 0, 0, 0, 0, 0, 107, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 6, y: 6, right: true, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 6, y: 4 }));
    });

    it("moveHorizontalElevators C", () => {
        const elevatorsInput = [
            { x: 1, y: 3, right: true, hasBlueBall: false },
            { x: 5, y: 6, right: false, hasBlueBall: true },
            { x: 6, y: 8, right: true, hasBlueBall: false },
        ];
        const elevatorsExpected = [
            { x: 2, y: 3, right: true, hasBlueBall: false },
            { x: 4, y: 6, right: false, hasBlueBall: false },
            { x: 6, y: 8, right: false, hasBlueBall: false },
        ];
        const redInput = [{ x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput,
            redBalls: redInput
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 8, 0, 0, 0, 4, 0, 1],
            [1, 107, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 5, 2, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 107, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 8, 0, 0, 4, 0, 1],
            [1, 0, 107, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 5, 2, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 7, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];

        const info = moveHorizontalElevators(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify(elevatorsExpected)
        );
        expect(JSON.stringify(redInput)).toBe(JSON.stringify(
            [{ x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]
        ));
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });

    it("moveHorizontalElevators D", () => {
        const elevatorsInput = [{ x: 5, y: 3, right: false, hasBlueBall: false }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 2 },
            horizontalElevators: elevatorsInput
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 25, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backInput, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 3, right: false, hasBlueBall: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 2 }));
    });

    it("moveHorizontalElevators E", () => {
        const elevatorsInput = [{ x: 5, y: 3, right: false, hasBlueBall: true }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 2 },
            horizontalElevators: elevatorsInput
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 25, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backInput, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 3, right: false, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    // GRAVITY UP

    it("moveHorizontalElevators Gravity Up A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: [{ x: 5, y: 2, right: false, hasBlueBall: true }],
            greenBalls: 1
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.horizontalElevators)).toBe(
            JSON.stringify([{ x: 4, y: 2, right: false, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    it("moveHorizontalElevators Gravity Up B", () => {
        const elevatorsInput = [{ x: 5, y: 2, right: false, hasBlueBall: false }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 3 },
            horizontalElevators: elevatorsInput
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 25, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backInput, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 2, right: false, hasBlueBall: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 3 }));
    });

    it("moveHorizontalElevators Gravity Up C", () => {
        const elevatorsInput = [{ x: 5, y: 2, right: false, hasBlueBall: true }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 3 },
            horizontalElevators: elevatorsInput
        };
        const backInput = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 25, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 7, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveHorizontalElevators(backInput, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 2, right: false, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });

    it("moveElevators Gravity Up A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            elevators: [{ x: 5, y: 2, up: false, hasBlueBall: true }],
            greenBalls: 1
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 6, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 6, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 3, up: false, hasBlueBall: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 5 }));
    });

    it("moveElevators Gravity Up B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            elevators: [{ x: 5, y: 2, up: false, hasBlueBall: false }],
            hasPropeller: true,
            greenBalls: 1
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 6, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 106, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 2, up: true, hasBlueBall: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });

    it("moveElevators Gravity Up C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            elevators: [{ x: 5, y: 4, up: true, hasBlueBall: false }],
            greenBalls: 1
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 106, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 6, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveElevators(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 4, up: false, hasBlueBall: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 5 }));
    });


    // Insert new tests here
});