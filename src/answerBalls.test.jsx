import { beforeEach, describe, it, expect } from "vitest";
import { checkComparisons, updateWeight } from "./answerBalls.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("answerBalls", () => {
    let defaultGameInfo;
    let defaultGameVars;
    let inputBack = zeroArray(20, 20);

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkComparisons A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "2", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "3", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "5", color: "purple", mode: "answerball", delete: false },
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
                { x: 1, y: 4, answer: "2", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "3", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "6", color: "purple", mode: "answerball", delete: false },
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
                { x: 3, y: 1, answer: "3", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 2, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 3, answer: "4", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 5, answer: "7", color: "purple", mode: "answerball", delete: false },
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
                { x: 3, y: 1, answer: "3", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 2, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 3, answer: "4", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 5, answer: "6", color: "purple", mode: "answerball", delete: false },
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
                { x: 1, y: 4, answer: "6", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "-", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "1", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "1", color: "purple", mode: "answerball", delete: false },
                { x: 6, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 7, y: 4, answer: "4", color: "purple", mode: "answerball", delete: false },
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
                { x: 1, y: 4, answer: "6", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "-", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "1", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "1", color: "purple", mode: "answerball", delete: false },
                { x: 6, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 7, y: 3, answer: "4", color: "purple", mode: "answerball", delete: false },
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
                { x: 1, y: 4, answer: "%q", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "%e.", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "%s", color: "purple", mode: "answerball", delete: false },
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
                { x: 1, y: 4, answer: "%q", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "%e.", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "%s.", color: "purple", mode: "answerball", delete: false },
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

    it("checkComparisons H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "%q..", color: "purple", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "=", color: "purple", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "%q", color: "purple", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "%e", color: "purple", mode: "answerball", delete: false },
                { x: 6, y: 4, answer: "+", color: "purple", mode: "answerball", delete: false },
                { x: 7, y: 4, answer: "%s", color: "purple", mode: "answerball", delete: false },
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
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkComparisons(input, gameInfo);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("checkComparisons I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 4, answer: "2", color: "white", mode: "answerball", delete: false },
                { x: 2, y: 4, answer: "+", color: "white", mode: "answerball", delete: false },
                { x: 3, y: 4, answer: "3", color: "white", mode: "answerball", delete: false },
                { x: 4, y: 4, answer: "=", color: "white", mode: "answerball", delete: false },
                { x: 5, y: 4, answer: "5", color: "white", mode: "answerball", delete: false },
            ],
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 245, 245, 245, 245, 245, 1],
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

    it("updateWeight A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 2, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 3, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 4, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
            ],
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            pinkBalls: [
                { x: 4, y: 4, delete: false, counter: defaultGameVars.pinkCountTo },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 40, 0, 0, 1],
            [1, 2, 0, 4, 203, 0, 1],
            [1, 242, 242, 242, 242, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        updateWeight(inputBack, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(gameInfo.answerBalls).toEqual([
            { x: 1, y: 5, answer: "1", color: "purple", mode: "scale", delete: false },
            { x: 2, y: 5, answer: "0", color: "purple", mode: "scale", delete: false },
            { x: 3, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
            { x: 4, y: 5, answer: "0.5", color: "purple", mode: "scale", delete: false },
        ]);
    });

    it("updateWeight B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            answerBalls: [
                { x: 1, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 2, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 3, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
                { x: 4, y: 5, answer: "2", color: "purple", mode: "scale", delete: false },
            ],
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            hasPropeller: true,
            pinkBalls: [
                { x: 4, y: 4, delete: false, counter: defaultGameVars.pinkCountTo },
            ],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 1],
            [1, 0, 0, 5, 0, 0, 1],
            [1, 2, 0, 4, 28, 0, 1],
            [1, 242, 242, 242, 242, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        updateWeight(inputBack, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(gameInfo.answerBalls).toEqual([
            { x: 1, y: 5, answer: "0", color: "purple", mode: "scale", delete: false },
            { x: 2, y: 5, answer: "0", color: "purple", mode: "scale", delete: false },
            { x: 3, y: 5, answer: "1", color: "purple", mode: "scale", delete: false },
            { x: 4, y: 5, answer: "0", color: "purple", mode: "scale", delete: false },
        ]);
    });

    // Insert new tests here
});