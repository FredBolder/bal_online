import { describe, it, expect } from "vitest";
import { checkMovers } from "./movers.js";
import { initGameInfo } from "./gameInfo.js";

describe("checkMovers", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        movers: [
            { x: 1, y: 5, direction: "right" },
            { x: 3, y: 5, direction: "right" },
            { x: 5, y: 5, direction: "right" }
        ]
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 4, 0, 5, 0, 1],
        [1, 178, 1, 178, 1, 178, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 4, 0, 5, 1],
        [1, 178, 1, 178, 1, 178, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkMovers(input01a, gameInfo01a);
    it("checkMovers A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkMovers A info", () => {
        expect(info01a).toBe(true);
    });
    it("checkMovers A blueBall", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 2, y: 4 }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        yellowBalls: [{ x: 5, y: 4, direction: "none" }],
        movers: [
            { x: 1, y: 5, direction: "left" },
            { x: 3, y: 5, direction: "left" },
            { x: 5, y: 5, direction: "upleft" }
        ]
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 4, 0, 9, 0, 1],
        [1, 178, 1, 178, 1, 178, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 9, 0, 0, 1],
        [1, 2, 4, 0, 0, 0, 0, 1],
        [1, 178, 1, 178, 1, 178, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkMovers(input01b, gameInfo01b);
    it("checkMovers B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkMovers B info", () => {
        expect(info01b).toBe(true);
    });
    it("checkMovers B blueBall", () => {
        expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 1, y: 4 }));
    });
    it("checkMovers B yellowBalls", () => {
        expect(JSON.stringify(gameInfo01b.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }]));
    });


    // Insert new tests here
});