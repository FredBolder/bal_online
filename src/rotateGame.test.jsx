import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { rotateGame } from "./rotateGame.js";

describe("Rotate game", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let inputBack01a = zeroArray(6, 6);
    let input01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 8, 0, 1],
        [1, 0, 0, 8, 0, 1],
        [1, 9, 0, 4, 0, 1],
        [1, 0, 2, 4, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 9, 0, 3, 1],
        [1, 2, 0, 0, 0, 1],
        [1, 4, 4, 8, 8, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let gameInfo01a = {
        blueBall: { x: 2, y: 4 },
        elevatorInOuts: [],
        elevators: [],
        forces: [],
        greenBalls: 1,
        horizontalElevators: [],
        redBalls: [
            { x: 3, y: 1 },
            { x: 3, y: 2 },
        ],
        yellowBalls: [{ x: 1, y: 3, direction: "down" }],
        orangeBalls: [],
        detonator: { x: -1, y: -1 },
        teleports: [],
    };
    let info01a = rotateGame(inputBack01a, input01a, gameInfo01a);
    it("rotateGame A rotated", () => {
        expect(info01a).toBe(true);
    });
    it("rotateGame A game array", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("rotateGame A blue ball", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(
            JSON.stringify({ x: 1, y: 2 })
        );
    });
    it("rotateGame A red balls", () => {
        expect(JSON.stringify(gameInfo01a.redBalls)).toBe(
            JSON.stringify([
                { x: 4, y: 3 },
                { x: 3, y: 3 },
            ])
        );
    });
    it("rotateGame A yellow balls", () => {
        expect(JSON.stringify(gameInfo01a.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "left" }])
        );
    });

    let inputBack01b = zeroArray(7, 7);
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 17, 18, 0, 5, 3, 1],
        [1, 15, 16, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 106, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 107, 0, 17, 18, 1],
        [1, 0, 0, 0, 15, 16, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 5, 1],
        [1, 2, 0, 0, 0, 3, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let gameInfo01b = {
        blueBall: { x: 5, y: 5 },
        elevatorInOuts: [],
        elevators: [{ x: 1, y: 4, up: true }],
        forces: [],
        greenBalls: 1,
        horizontalElevators: [],
        redBalls: [],
        yellowBalls: [],
        orangeBalls: [],
        detonator: { x: -1, y: -1 },
        teleports: [],
    };
    let info01b = rotateGame(inputBack01b, input01b, gameInfo01b);
    it("rotateGame B rotated", () => {
        expect(info01b).toBe(true);
    });
    it("rotateGame B game array", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("rotateGame B elevators", () => {
        expect(JSON.stringify(gameInfo01b.elevators)).toBe(JSON.stringify([]));
    });
    it("rotateGame B horizontal elevators", () => {
        expect(JSON.stringify(gameInfo01b.horizontalElevators)).toBe(
            JSON.stringify([{ x: 2, y: 1, right: true }])
        );
    });


    // Insert new tests here
});
