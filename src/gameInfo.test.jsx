import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { getGameInfo, initGameInfo } from "./gameInfo.js";

describe("Game info", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    it("getGameInfo A", () => {
        let inputBack = zeroArray(5, 5);
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 3, 1],
            [1, 8, 0, 0, 1],
            [1, 8, 3, 2, 1],
            [1, 1, 1, 1, 1],
        ];
        let expectedOutput = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            greenBalls: 2,
            redBalls: [
                { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ],
        };
        expectedOutput.blueBall = expectedOutput.blueBall1;
        expect(getGameInfo(inputBack, input)).toEqual(expectedOutput);
    });

    it("getGameInfo B", () => {
        let inputBack = zeroArray(5, 10);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 1, 0, 0, 3, 3, 1],
            [1, 8, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 8, 1, 2, 0, 0, 3, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            greenBalls: 4,
            redBalls: [
                { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ],
        };
        expectedOutput.blueBall = expectedOutput.blueBall1;
        expect(getGameInfo(inputBack, input)).toEqual(expectedOutput);
    });

    it("getGameInfo C", () => {
        let inputBack = zeroArray(5, 10);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 3, 1, 3, 0, 0, 3, 1],
            [1, 0, 3, 0, 0, 0, 0, 0, 1, 1],
            [1, 3, 3, 2, 0, 0, 3, 1, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            greenBalls: 8,
        };
        expectedOutput.blueBall = expectedOutput.blueBall1;
        expect(getGameInfo(inputBack, input)).toEqual(expectedOutput);
    });

    it("getGameInfo D", () => {
        let inputBack = zeroArray(7, 10);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 3, 3, 0, 0, 0, 1],
            [1, 36, 0, 0, 0, 0, 0, 0, 6, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 106, 0, 2, 0, 4, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = {
            ...defaultGameInfo,
            blueBall1: { x: 4, y: 5 },
            elevators: [
                { x: 8, y: 2, up: false, hasBlueBall: false },
                { x: 2, y: 5, up: true, hasBlueBall: false },
            ],
            greenBalls: 2,
            yellowBalls: [{ x: 1, y: 4, direction: "none" }],
            detonator: { x: 8, y: 5 },
        };
        expectedOutput.blueBall = expectedOutput.blueBall1;
        expect(getGameInfo(inputBack, input)).toEqual(expectedOutput);
    });

    it("getGameInfo E", () => {
        let inputBack = zeroArray(5, 5);
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 3, 1],
            [1, 93, 0, 0, 1],
            [1, 8, 3, 2, 1],
            [1, 1, 1, 1, 1],
        ];
        let expectedOutput = {
            ...defaultGameInfo,
            blueBall1: { x: 3, y: 3 },
            greenBalls: 2,
            redBalls: [
                { x: 1, y: 2, smart: 1, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 1, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ],
        };
        expectedOutput.blueBall = expectedOutput.blueBall1;
        expect(getGameInfo(inputBack, input)).toEqual(expectedOutput);
    });


    // Insert new tests here
});