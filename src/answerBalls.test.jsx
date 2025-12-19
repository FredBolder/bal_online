import { beforeEach, describe, it, expect } from "vitest";
import { checkComparisons } from "./answerBalls.js";
import { initGameInfo } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("answerBalls", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    it("checkComparisons A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "2", color: "purple", delete: false },
                { x: 2, y: 4, answer: "+", color: "purple", delete: false },
                { x: 3, y: 4, answer: "3", color: "purple", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", delete: false },
                { x: 5, y: 4, answer: "5", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 242, 242, 242, 242, 242, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("checkComparisons B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "2", color: "purple", delete: false },
                { x: 2, y: 4, answer: "+", color: "purple", delete: false },
                { x: 3, y: 4, answer: "3", color: "purple", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", delete: false },
                { x: 5, y: 4, answer: "6", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 242, 242, 242, 242, 242, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("checkComparisons C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 3, y: 1, answer: "3", color: "purple", delete: false },
                { x: 3, y: 2, answer: "+", color: "purple", delete: false },
                { x: 3, y: 3, answer: "4", color: "purple", delete: false },
                { x: 3, y: 4, answer: "=", color: "purple", delete: false },
                { x: 3, y: 5, answer: "7", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 2, 0, 242, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("checkComparisons D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 3, y: 1, answer: "3", color: "purple", delete: false },
                { x: 3, y: 2, answer: "+", color: "purple", delete: false },
                { x: 3, y: 3, answer: "4", color: "purple", delete: false },
                { x: 3, y: 4, answer: "=", color: "purple", delete: false },
                { x: 3, y: 5, answer: "6", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 0, 0, 242, 0, 0, 1],
            [1, 2, 0, 242, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("checkComparisons E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "6", color: "purple", delete: false },
                { x: 2, y: 4, answer: "-", color: "purple", delete: false },
                { x: 3, y: 4, answer: "1", color: "purple", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", delete: false },
                { x: 5, y: 4, answer: "1", color: "purple", delete: false },
                { x: 6, y: 4, answer: "+", color: "purple", delete: false },
                { x: 7, y: 4, answer: "4", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 242, 242, 242, 242, 242, 242, 242, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
        ];
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("checkComparisons E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "6", color: "purple", delete: false },
                { x: 2, y: 4, answer: "-", color: "purple", delete: false },
                { x: 3, y: 4, answer: "1", color: "purple", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", delete: false },
                { x: 5, y: 4, answer: "1", color: "purple", delete: false },
                { x: 6, y: 4, answer: "+", color: "purple", delete: false },
                { x: 7, y: 3, answer: "4", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 242, 1],
            [1, 242, 242, 242, 242, 242, 242, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("checkComparisons F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "%Q", color: "purple", delete: false },
                { x: 2, y: 4, answer: "=", color: "purple", delete: false },
                { x: 3, y: 4, answer: "%e", color: "purple", delete: false },
                { x: 4, y: 4, answer: "+", color: "purple", delete: false },
                { x: 5, y: 4, answer: "%S", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 242, 242, 242, 242, 242, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("checkComparisons G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "%Q", color: "purple", delete: false },
                { x: 2, y: 4, answer: "=", color: "purple", delete: false },
                { x: 3, y: 4, answer: "%e", color: "purple", delete: false },
                { x: 4, y: 4, answer: "+", color: "purple", delete: false },
                { x: 5, y: 4, answer: "%s", color: "purple", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 242, 242, 242, 242, 242, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    // Insert new tests here
});