import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { moveElevators, moveHorizontalElevators } from "./elevators.js";

describe("Elevators", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** MOVE ELEVATORS *****

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 6, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 106, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 6, 1],
        [1, 0, 0, 106, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveElevators(
        input01a,
        [
            { x: 6, y: 2, up: false },
            { x: 3, y: 5, up: true },
        ],
        [],
        []
    );
    it("moveElevators A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });

    it("moveElevators A player", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({ playerX: 3, playerY: 2 })
        );
    });

    let input01b = [
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
    let expectedOutput01b = [
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
    let info01b = moveElevators(
        input01b,
        [
            { x: 5, y: 2, up: false },
            { x: 6, y: 2, up: false },
            { x: 3, y: 5, up: true },
        ],
        [],
        []
    );
    it("moveElevators B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });

    it("moveElevators B player", () => {
        expect(JSON.stringify(info01b)).toBe(
            JSON.stringify({ playerX: -1, playerY: -1 })
        );
    });

    // ***** MOVE HORIZONTAL ELEVATORS *****

    let input02a = [
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
    let expectedOutput02a = [
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
    let elevatorsInput02a = [{ x: 5, y: 6, right: false }];
    let info02a = moveHorizontalElevators(input02a, elevatorsInput02a, [], []);
    it("moveHorizontalElevators A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });

    it("moveHorizontalElevators A player", () => {
        expect(JSON.stringify(info02a)).toBe(
            JSON.stringify({ playerX: 4, playerY: 4 })
        );
    });

    it("moveHorizontalElevators A elevators", () => {
        expect(JSON.stringify(elevatorsInput02a)).toBe(
            JSON.stringify([{ x: 4, y: 6, right: false }])
        );
    });

    let input02b = [
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
    let elevatorsInput02b = [{ x: 5, y: 6, right: true }];
    let expectedOutput02b = [
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
    let info02b = moveHorizontalElevators(input02b, elevatorsInput02b, [], []);
    it("moveHorizontalElevators B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });

    it("moveHorizontalElevators B player", () => {
        expect(JSON.stringify(info02b)).toBe(
            JSON.stringify({ playerX: 6, playerY: 4 })
        );
    });

    it("moveHorizontalElevators B elevators", () => {
        expect(JSON.stringify(elevatorsInput02b)).toBe(
            JSON.stringify([{ x: 6, y: 6, right: true }])
        );
    });

    let input02c = [
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
    let expectedOutput02c = [
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
    let elevatorsInput02c = [
        { x: 1, y: 3, right: true },
        { x: 5, y: 6, right: false },
        { x: 6, y: 8, right: true },
    ];
    let elevatorsExpected02c = [
        { x: 2, y: 3, right: true },
        { x: 4, y: 6, right: false },
        { x: 6, y: 8, right: false },
    ];
    let redInput02c = [{ x: 1, y: 2 }];
    let info02c = moveHorizontalElevators(
        input02c,
        elevatorsInput02c,
        redInput02c,
        []
    );
    it("moveHorizontalElevators C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });

    it("moveHorizontalElevators C player", () => {
        expect(JSON.stringify(info02c)).toBe(
            JSON.stringify({ playerX: -1, playerY: -1 })
        );
    });

    it("moveHorizontalElevators C elevators", () => {
        expect(JSON.stringify(elevatorsInput02c)).toBe(
            JSON.stringify(elevatorsExpected02c)
        );
    });

    it("moveHorizontalElevators C red", () => {
        expect(JSON.stringify(redInput02c)).toBe(JSON.stringify([{ x: 2, y: 2 }]));
    });


    // Insert new tests here
});