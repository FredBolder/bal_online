import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveElevators, moveHorizontalElevators } from "./elevators.js";

describe("Elevators", () => {
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
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 6, y: 2, up: false }, { x: 3, y: 5, up: true }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 6, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 6, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
    });

    it("moveElevators B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 7 },
            elevators: [{ x: 5, y: 2, up: false }, { x: 6, y: 2, up: false }, { x: 3, y: 5, up: true }]
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 1, y: 7 }));
    });

    it("moveElevators C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 5, up: false }],
            hasPropeller: true
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    it("moveElevators D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 2, up: false }],
            hasPropeller: true
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
        expect(JSON.stringify(gameInfo.elevators)).toBe(JSON.stringify([{ x: 3, y: 2, up: true }]));
    });

    it("moveElevators E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            elevators: [{ x: 3, y: 2, up: false }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 6, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 106, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });


    // ***** MOVE HORIZONTAL ELEVATORS *****

    it("moveHorizontalElevators A", () => {
        let elevatorsInput = [{ x: 5, y: 6, right: false }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveHorizontalElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 4, y: 6, right: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    it("moveHorizontalElevators B", () => {
        let elevatorsInput = [{ x: 5, y: 6, right: true }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveHorizontalElevators(input, gameInfo, { ...defaultGameVars });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(elevatorsInput)).toBe(
            JSON.stringify([{ x: 6, y: 6, right: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 6, y: 4 }));
    });

    it("moveHorizontalElevators C", () => {
        let elevatorsInput = [
            { x: 1, y: 3, right: true },
            { x: 5, y: 6, right: false },
            { x: 6, y: 8, right: true },
        ];
        let elevatorsExpected = [
            { x: 2, y: 3, right: true },
            { x: 4, y: 6, right: false },
            { x: 6, y: 8, right: false },
        ];
        let redInput = [{ x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: elevatorsInput,
            redBalls: redInput
        };
        let input = [
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
        let expectedOutput = [
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

        let info = moveHorizontalElevators(input, gameInfo, { ...defaultGameVars });
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

    // GRAVITY UP

    it("moveHorizontalElevators Gravity Up A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            horizontalElevators: [{ x: 5, y: 2, right: false }],
            greenBalls: 1
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveHorizontalElevators(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.horizontalElevators)).toBe(
            JSON.stringify([{ x: 4, y: 2, right: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    it("moveElevators Gravity Up A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            elevators: [{ x: 5, y: 2, up: false }],
            greenBalls: 1
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveElevators(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 3, up: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 5 }));
    });

    it("moveElevators Gravity Up B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            elevators: [{ x: 5, y: 2, up: false }],
            hasPropeller: true,
            greenBalls: 1
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveElevators(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 2, up: true }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });

    it("moveElevators Gravity Up C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            elevators: [{ x: 5, y: 4, up: true }],
            greenBalls: 1
        };
        let input = [
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
        let expectedOutput = [
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
        let info = moveElevators(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.elevators)).toBe(
            JSON.stringify([{ x: 5, y: 4, up: false }])
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 5, y: 5 }));
    });


    // Insert new tests here
});