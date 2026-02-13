import { beforeEach, describe, it, expect } from "vitest";
import { jump, pushObject, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkSynchroniser, moveYellowBalls } from "./yellowBalls.js";
import { copy2dArray } from "./utils.js";

describe("Yellow ball", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // *** moveYellowBalls ***

    it("moveYellowBalls A", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 3, y: 2, direction: "left" }];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 2, y: 2, direction: "left" }])
        );
    });

    it("moveYellowBalls B", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 9, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 9, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 1, y: 2, direction: "left" }];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 1, y: 2, direction: "none" }])
        );
    });

    it("moveYellowBalls C", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 9, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 9, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 5, y: 2, direction: "right" }];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 6, y: 2, direction: "right" }])
        );
    });

    it("moveYellowBalls D", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 85, 0, 9, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 85, 0, 9, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 3, y: 2, direction: "right" }];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "none" }])
        );
    });

    it("moveYellowBalls E", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 84, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 9, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 9, 0, 1],
            [1, 0, 2, 0, 0, 84, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 1, y: 2, direction: "up" },
            { x: 4, y: 4, direction: "right" },
        ];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 5, y: 3, direction: "up" },
            ])
        );
    });

    it("moveYellowBalls F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 86, 0, 3, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 9, 0, 1],
            [1, 0, 2, 0, 0, 84, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 86, 0, 3, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 84, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 1, y: 2, direction: "up" },
            { x: 5, y: 3, direction: "down" },
        ];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 1, y: 2, direction: "down" },
                { x: 4, y: 4, direction: "left" },
            ])
        );
    });

    it("moveYellowBalls G", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 9, 86, 1],
            [1, 0, 0, 0, 0, 9, 1, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 85, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 9, 86, 1],
            [1, 0, 0, 0, 0, 9, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 85, 9, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 5, y: 1, direction: "right" },
            { x: 5, y: 2, direction: "right" },
            { x: 1, y: 3, direction: "down" },
        ];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 5, y: 1, direction: "left" },
                { x: 5, y: 2, direction: "none" },
                { x: 2, y: 4, direction: "right" },
            ])
        );
    });

    it("moveYellowBalls H", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 84, 0, 9, 0, 85, 3, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 9, 0, 0, 1],
            [1, 0, 9, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 85, 0, 0, 0, 84, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 84, 9, 0, 0, 85, 3, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 9, 0, 0, 0, 1],
            [1, 0, 0, 9, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 85, 0, 0, 0, 84, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 3, y: 1, direction: "right" },
            { x: 4, y: 3, direction: "left" },
            { x: 2, y: 4, direction: "right" },
        ];
        for (let i = 0; i < 13; i++) {
            moveYellowBalls(input, yellow);
        }
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 2, y: 1, direction: "right" },
                { x: 3, y: 3, direction: "none" },
                { x: 3, y: 4, direction: "none" },
            ])
        );
    });

    it("moveYellowBalls I", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 138, 9, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 9, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 139, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 1, y: 2, direction: "up" },
            { x: 5, y: 3, direction: "left" },
        ];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 4, y: 4, direction: "down" },
            ])
        );
    });

    it("moveYellowBalls J", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 9, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 139, 9, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 9, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 1],
            [1, 0, 0, 0, 138, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [
            { x: 1, y: 2, direction: "up" },
            { x: 5, y: 3, direction: "left" },
        ];
        moveYellowBalls(input, yellow);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 4, y: 2, direction: "up" },
            ])
        );
    });

    // *** checkSynchroniser ***

    it("checkSynchroniser A", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 2, 0, 9, 155, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 2, 0, 0, 155, 9, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "right" }];
        const result = checkSynchroniser(input, yellow, 4, 3, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 5, y: 3, direction: "right" }, { x: 5, y: 4, direction: "right" }, { x: 5, y: 5, direction: "right" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([1, 2, 3]));
    });

    it("checkSynchroniser B", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 2, 9, 0, 155, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const yellow = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 2, y: 5, direction: "right" }];
        const result = checkSynchroniser(input, yellow, 4, 3, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 2, y: 5, direction: "right" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([]));
    });

    it("checkSynchroniser C", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 2, 0, 9, 155, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const yellow = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "up" }];
        const result = checkSynchroniser(input, yellow, 4, 3, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "up" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([]));
    });

    it("checkSynchroniser D", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }];
        const result = checkSynchroniser(input, yellow, 3, 3, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "up" }, { x: 4, y: 2, direction: "up" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([0, 1]));
    });

    it("checkSynchroniser E", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const yellow = [{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }];
        const result = checkSynchroniser(input, yellow, 3, 3, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([]));
    });

    it("checkSynchroniser F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }];
        const result = checkSynchroniser(input, yellow, 3, 3, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "down" }, { x: 4, y: 4, direction: "down" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([0, 1]));
    });

    it("checkSynchroniser G", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 9, 0, 0, 1],
            [1, 0, 0, 155, 155, 0, 0, 1],
            [1, 0, 0, 28, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const yellow = [{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }];
        const result = checkSynchroniser(input, yellow, 3, 3, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([]));
    });

    it("checkSynchroniser H", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 2, 0, 0, 155, 9, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 0, 0, 9, 155, 0, 0, 1],
            [1, 2, 0, 9, 155, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const yellow = [{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }];
        const result = checkSynchroniser(input, yellow, 4, 2, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "left" }, { x: 3, y: 3, direction: "left" }, { x: 3, y: 4, direction: "left" }, { x: 3, y: 5, direction: "left" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([0, 1, 2, 3]));
    });

    it("checkSynchroniser I", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 0, 0, 5, 155, 9, 0, 1],
            [1, 0, 0, 0, 155, 9, 0, 1],
            [1, 2, 0, 0, 155, 9, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const yellow = [{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }];
        const result = checkSynchroniser(input, yellow, 4, 2, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(
            JSON.stringify([{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }])
        );
        expect(JSON.stringify(result)).toBe(JSON.stringify([]));
    });

    // GRAVITY UP

    it("jump (push yellow ball down) Gravity Up A", () => {
        const gameInfo3a = { ...defaultGameInfo, blueBall: { x: 2, y: 1 }, yellowBalls: [{ x: 2, y: 2, direction: "none" }] };
        const inputBack = zeroArray(6, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 2, 3, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info3a = jump(inputBack, input, gameInfo3a, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info3a)).toBe(JSON.stringify({
            eating: false,
            freezeTime: -1,
            player: true,
            sound: ""
        }));
        expect(JSON.stringify(gameInfo3a.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 3, direction: "down" }])
        );
    });

    it("pushObject Gravity Up B", () => {
        const gameInfo3b = { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, yellowBalls: [{ x: 2, y: 3, direction: "none" }] };
        const inputBack = zeroArray(6, 8);
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 3, 0, 0, 0, 1],
            [1, 0, 9, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info3b = pushObject(inputBack, input, gameInfo3b, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info3b)).toBe(JSON.stringify({
            player: true,
            sound: ""
        }));
        expect(JSON.stringify(gameInfo3b.yellowBalls)).toBe(
            JSON.stringify([{ x: 2, y: 2, direction: "up" }])
        );
    });


    // Insert new tests here
});