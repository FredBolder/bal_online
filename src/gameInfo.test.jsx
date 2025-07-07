import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { getGameInfo, initGameInfo } from "./gameInfo.js";

describe("Game info", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let inputBack01a = zeroArray(5, 5);
    let input01a = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 3, 1],
        [1, 8, 0, 0, 1],
        [1, 8, 3, 2, 1],
        [1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        blueBall1: { x: 3, y: 3 },
        greenBalls: 2,
        redBalls: [
            { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ],
    };
    it("getGameInfo A", () => {
        expect(JSON.stringify(getGameInfo(inputBack01a, input01a))).toBe(
            JSON.stringify(expectedOutput01a)
        );
    });

    let inputBack01b = zeroArray(5, 10);
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 1, 0, 0, 3, 3, 1],
        [1, 8, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 8, 1, 2, 0, 0, 3, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        blueBall1: { x: 3, y: 3 },
        greenBalls: 4,
        redBalls: [
            { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ],
    };
    it("getGameInfo B", () => {
        expect(JSON.stringify(getGameInfo(inputBack01b, input01b))).toBe(
            JSON.stringify(expectedOutput01b)
        );
    });

    let inputBack01c = zeroArray(5, 10);
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 3, 1, 3, 0, 0, 3, 1],
        [1, 0, 3, 0, 0, 0, 0, 0, 1, 1],
        [1, 3, 3, 2, 0, 0, 3, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        blueBall1: { x: 3, y: 3 },
        greenBalls: 8,
    };
    it("getGameInfo C", () => {
        expect(JSON.stringify(getGameInfo(inputBack01c, input01c))).toBe(
            JSON.stringify(expectedOutput01c)
        );
    });

    let inputBack01d = zeroArray(7, 10);
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 3, 3, 0, 0, 0, 1],
        [1, 36, 0, 0, 0, 0, 0, 0, 6, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 106, 0, 2, 0, 4, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 5 },
        blueBall1: { x: 4, y: 5 },
        elevators: [
            { x: 8, y: 2, up: false },
            { x: 2, y: 5, up: true },
        ],
        greenBalls: 2,
        yellowBalls: [{ x: 1, y: 4, direction: "none" }],
        detonator: { x: 8, y: 5 },
    };
    it("getGameInfo D", () => {
        expect(JSON.stringify(getGameInfo(inputBack01d, input01d))).toBe(
            JSON.stringify(expectedOutput01d)
        );
    });

    let inputBack01e = zeroArray(5, 5);
    let input01e = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 3, 1],
        [1, 93, 0, 0, 1],
        [1, 8, 3, 2, 1],
        [1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        blueBall1: { x: 3, y: 3 },
        greenBalls: 2,
        redBalls: [
            { x: 1, y: 2, smart: 1, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ],
    };
    it("getGameInfo E", () => {
        expect(JSON.stringify(getGameInfo(inputBack01e, input01e))).toBe(
            JSON.stringify(expectedOutput01e)
        );
    });


    // Insert new tests here
});