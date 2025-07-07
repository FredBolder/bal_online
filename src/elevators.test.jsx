import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { moveElevators, moveHorizontalElevators } from "./elevators.js";

describe("Elevators", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** MOVE ELEVATORS *****

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        elevators: [{ x: 6, y: 2, up: false }, { x: 3, y: 5, up: true }],
    };
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
    let info01a = moveElevators(input01a, gameInfo01a);
    it("moveElevators A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("moveElevators A info", () => {
        expect(info01a).toBe(true);
    });
    it("moveElevators A blue ball", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 7 },
        elevators: [{ x: 5, y: 2, up: false }, { x: 6, y: 2, up: false }, { x: 3, y: 5, up: true }]
    };
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
    let info01b = moveElevators(input01b, gameInfo01b);
    it("moveElevators B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("moveElevators B info", () => {
        expect(info01b).toBe(true);
    });
    it("moveElevators B blue ball", () => {
        expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 1, y: 7 }));
    });

    // ***** MOVE HORIZONTAL ELEVATORS *****

    let elevatorsInput02a = [{ x: 5, y: 6, right: false }];
    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        horizontalElevators: elevatorsInput02a
    };
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
    let info02a = moveHorizontalElevators(input02a, gameInfo02a);
    it("moveHorizontalElevators A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("moveHorizontalElevators A info", () => {
        expect(info02a).toBe(true);
    });
    it("moveHorizontalElevators A elevators", () => {
        expect(JSON.stringify(elevatorsInput02a)).toBe(
            JSON.stringify([{ x: 4, y: 6, right: false }])
        );
    });
    it("moveHorizontalElevators A blue ball", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    let elevatorsInput02b = [{ x: 5, y: 6, right: true }];
    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        horizontalElevators: elevatorsInput02b
    };
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
    let info02b = moveHorizontalElevators(input02b, gameInfo02b);
    it("moveHorizontalElevators B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("moveHorizontalElevators B info", () => {
        expect(info02b).toBe(true);
    });
    it("moveHorizontalElevators B elevators", () => {
        expect(JSON.stringify(elevatorsInput02b)).toBe(
            JSON.stringify([{ x: 6, y: 6, right: true }])
        );
    });
    it("moveHorizontalElevators B blue ball", () => {
        expect(JSON.stringify(gameInfo02b.blueBall)).toBe(JSON.stringify({ x: 6, y: 4 }));
    });

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
    let gameInfo02c = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        horizontalElevators: elevatorsInput02c,
        redBalls: redInput02c
    };
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
    let info02c = moveHorizontalElevators(input02c, gameInfo02c);
    it("moveHorizontalElevators C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("moveHorizontalElevators C info", () => {
        expect(info02c).toBe(true);
    });
    it("moveHorizontalElevators C elevators", () => {
        expect(JSON.stringify(elevatorsInput02c)).toBe(
            JSON.stringify(elevatorsExpected02c)
        );
    });
    it("moveHorizontalElevators C red", () => {
        expect(JSON.stringify(redInput02c)).toBe(JSON.stringify([{ x: 2, y: 2 }]));
    });
    it("moveHorizontalElevators C blue ball", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });


    // Insert new tests here
});