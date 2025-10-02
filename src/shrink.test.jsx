import { describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { shrinkObject } from "./shrink.js";

describe("Shrinker", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    it("shrinkObject A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            yellowBalls: [{ x: 1, y: 3, direction: "none" }],
        }
        let input = [
            [1, 1, 1, 1, 1],
            [1, 3, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 9, 0, 0, 1],
            [1, 2, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1],
            [1, 3, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 196, 0, 0, 1],
            [1, 2, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        shrinkObject(input, gameInfo, "up");
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.yellowBalls).toEqual([]);
    });

    it("shrinkObject B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            redBalls: [
                { x: 3, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 1, y: 4, smart: 1, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }
            ],
        }
        let input = [
            [1, 1, 1, 1, 1],
            [1, 3, 0, 8, 1],
            [1, 0, 0, 1, 1],
            [1, 2, 0, 0, 1],
            [1, 93, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1],
            [1, 3, 0, 8, 1],
            [1, 0, 0, 1, 1],
            [1, 2, 0, 0, 1],
            [1, 201, 0, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        shrinkObject(input, gameInfo, "down");
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.redBalls).toEqual([{ x: 3, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]);
    });

    // Insert new tests here
});
