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
        ...defaultGameInfo,
        blueBall1: { x: 2, y: 4 },
        greenBalls: 1,
        redBalls: [
            { x: 3, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 3, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ],
        yellowBalls: [{ x: 1, y: 3, direction: "down" }],
    };
    gameInfo01a.blueBall = gameInfo01a.blueBall1;
    let info01a = rotateGame(inputBack01a, input01a, gameInfo01a);
    it("rotateGame right A rotated", () => {
        expect(info01a).toBe(true);
    });
    it("rotateGame right A game array", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("rotateGame right A blue ball", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(
            JSON.stringify({ x: 1, y: 2 })
        );
    });
    it("rotateGame right A red balls", () => {
        expect(JSON.stringify(gameInfo01a.redBalls)).toBe(
            JSON.stringify([
                { x: 4, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 3, y: 3, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ])
        );
    });
    it("rotateGame right A yellow balls", () => {
        expect(JSON.stringify(gameInfo01a.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "left" }])
        );
    });

    initGameInfo(defaultGameInfo);
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
        ...defaultGameInfo,
        blueBall: { x: 5, y: 5 },
        elevators: [{ x: 1, y: 4, up: true }],
        greenBalls: 1,
    };
    let info01b = rotateGame(inputBack01b, input01b, gameInfo01b);
    it("rotateGame right B rotated", () => {
        expect(info01b).toBe(true);
    });
    it("rotateGame right B game array", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("rotateGame right B elevators", () => {
        expect(JSON.stringify(gameInfo01b.elevators)).toBe(JSON.stringify([]));
    });
    it("rotateGame right B horizontal elevators", () => {
        expect(JSON.stringify(gameInfo01b.horizontalElevators)).toBe(
            JSON.stringify([{ x: 2, y: 1, right: true }])
        );
    });

    // ROTATE LEFT

    initGameInfo(defaultGameInfo);
    let inputBack02a = zeroArray(6, 6);
    let input02a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 8, 0, 1],
        [1, 0, 0, 8, 0, 1],
        [1, 9, 0, 4, 0, 1],
        [1, 0, 2, 4, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 8, 8, 4, 4, 1],
        [1, 0, 0, 0, 2, 1],
        [1, 3, 0, 9, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall1: { x: 2, y: 4 },
        greenBalls: 1,
        redBalls: [
            { x: 3, y: 1, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { x: 3, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
        ],
        yellowBalls: [{ x: 1, y: 3, direction: "down" }],
    };
    gameInfo02a.blueBall = gameInfo02a.blueBall1;
    let info02a = rotateGame(inputBack02a, input02a, gameInfo02a, true);
    it("rotateGame left A rotated", () => {
        expect(info02a).toBe(true);
    });
    it("rotateGame left A game array", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("rotateGame left A blue ball", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(
            JSON.stringify({ x: 4, y: 3 })
        );
    });
    it("rotateGame left A red balls", () => {
        expect(JSON.stringify(gameInfo02a.redBalls)).toBe(
            JSON.stringify([
                { x: 1, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
                { x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            ])
        );
    });
    it("rotateGame left A yellow balls", () => {
        expect(JSON.stringify(gameInfo02a.yellowBalls)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "right" }])
        );
    });

    initGameInfo(defaultGameInfo);
    let inputBack02b = zeroArray(7, 7);
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 17, 18, 0, 5, 3, 1],
        [1, 15, 16, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 106, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 2, 1],
        [1, 5, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 17, 18, 0, 0, 0, 1],
        [1, 15, 16, 0, 7, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 5 },
        elevators: [{ x: 1, y: 4, up: true }],
        greenBalls: 1,
    };
    let info02b = rotateGame(inputBack02b, input02b, gameInfo02b, true);
    it("rotateGame left B rotated", () => {
        expect(info02b).toBe(true);
    });
    it("rotateGame left B game array", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("rotateGame left B elevators", () => {
        expect(JSON.stringify(gameInfo02b.elevators)).toBe(JSON.stringify([]));
    });
    it("rotateGame left B horizontal elevators", () => {
        expect(JSON.stringify(gameInfo02b.horizontalElevators)).toBe(
            JSON.stringify([{ x: 4, y: 5, right: false }])
        );
    });




    // Insert new tests here
});
