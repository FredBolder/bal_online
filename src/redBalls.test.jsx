import { describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkRedBalls } from "./redBalls.js";

describe("Red balls", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 8, 0, 0, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [{ x: 2, y: 3 }, { x: 5, y: 3 }];
    it("checkRedBalls A", () => {
        expect(JSON.stringify(checkRedBalls(input01a, [{ x: 2, y: 3 }]))).toBe(
            JSON.stringify(expectedOutput01a)
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 8, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [{ x: 5, y: 3 }, { x: 2, y: 3 }];
    it("checkRedBalls B", () => {
        expect(JSON.stringify(checkRedBalls(input01b, [{ x: 5, y: 3 }]))).toBe(
            JSON.stringify(expectedOutput01b)
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 8, 0, 4, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [];
    it("checkRedBalls C", () => {
        expect(JSON.stringify(checkRedBalls(input01c, [{ x: 2, y: 3 }]))).toBe(
            JSON.stringify(expectedOutput01c)
        );
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 4, 0, 8, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [];
    it("checkRedBalls D", () => {
        expect(JSON.stringify(checkRedBalls(input01d, [{ x: 5, y: 3 }]))).toBe(
            JSON.stringify(expectedOutput01d)
        );
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 8, 0, 1],
        [1, 0, 2, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [];
    it("checkRedBalls E", () => {
        expect(JSON.stringify(checkRedBalls(input01e, [{ x: 5, y: 2 }]))).toBe(
            JSON.stringify(expectedOutput01e)
        );
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 0, 0, 0, 8, 0, 1],
        [1, 0, 2, 0, 8, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = [{ x: 4, y: 3 }, { x: 2, y: 3 }];
    it("checkRedBalls F", () => {
        expect(JSON.stringify(checkRedBalls(input01f, [{ x: 5, y: 2 }, { x: 4, y: 3 },]))).toBe(JSON.stringify(expectedOutput01f));
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 95, 0, 0, 8, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 96, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = [{ x: 5, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 6, y: 3 }];
    it("checkRedBalls G", () => {
        expect(JSON.stringify(checkRedBalls(input01g, [{ x: 5, y: 1 }]))).toBe(JSON.stringify(expectedOutput01g));
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 95, 0, 0, 8, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 96, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [];
    it("checkRedBalls H", () => {
        expect(JSON.stringify(checkRedBalls(input01h, [{ x: 5, y: 1 }]))).toBe(JSON.stringify(expectedOutput01h));
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 95, 0, 0, 8, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 95, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = [];
    it("checkRedBalls I", () => {
        expect(JSON.stringify(checkRedBalls(input01i, [{ x: 5, y: 1 }]))).toBe(JSON.stringify(expectedOutput01i));
    });

    // Insert new tests here
});
