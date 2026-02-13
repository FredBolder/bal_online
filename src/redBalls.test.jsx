import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkRedBalls } from "./redBalls.js";

describe("Red balls", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    it("checkRedBalls A", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 8, 0, 0, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [{ x: 2, y: 3 }, { x: 5, y: 3 }];
        expect(checkRedBalls(input, [{ x: 2, y: 3 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls B", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 8, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [{ x: 5, y: 3 }, { x: 2, y: 3 }];
        expect(checkRedBalls(input, [{ x: 5, y: 3 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls C", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 8, 0, 4, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [];
        expect(checkRedBalls(input, [{ x: 2, y: 3 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls D", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 0, 8, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [];
        expect(checkRedBalls(input, [{ x: 5, y: 3 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls E", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 8, 0, 1],
            [1, 0, 2, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [];
        expect(checkRedBalls(input, [{ x: 5, y: 2 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 3, 0, 0, 1],
            [1, 0, 0, 0, 0, 8, 0, 1],
            [1, 0, 2, 0, 8, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [{ x: 4, y: 3 }, { x: 2, y: 3 }];
        expect(checkRedBalls(input, [{ x: 5, y: 2 }, { x: 4, y: 3 },])).toEqual(expectedOutput);
    });

    it("checkRedBalls G", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 95, 0, 0, 8, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 96, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [{ x: 5, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: 6, y: 3 }];
        expect(checkRedBalls(input, [{ x: 5, y: 1 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls H", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 95, 0, 0, 8, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 96, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [];
        expect(checkRedBalls(input, [{ x: 5, y: 1 }])).toEqual(expectedOutput);
    });

    it("checkRedBalls I", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 95, 0, 0, 8, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 95, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [];
        expect(checkRedBalls(input, [{ x: 5, y: 1 }])).toEqual(expectedOutput);
    });

    // Insert new tests here
});
