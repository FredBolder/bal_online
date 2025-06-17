import { describe, it, expect } from "vitest";
import {
    checkFalling,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils Triangle stones", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01abcde = zeroArray(5, 7);
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 2, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkFalling(inputBack01abcde, input01a, { ...defaultGameInfo });
    it("Triangled Walls A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Triangled Walls A info", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({ update: true, ballX: 2, ballY: 2, sound: "" })
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 16, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 16, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkFalling(inputBack01abcde, input01b, { ...defaultGameInfo });
    it("Triangled Walls B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Triangled Walls B info", () => {
        expect(JSON.stringify(info01b)).toBe(
            JSON.stringify({ update: true, ballX: 4, ballY: 2, sound: "" })
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 16, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 16, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = checkFalling(inputBack01abcde, input01c, { ...defaultGameInfo });
    it("Triangled Walls C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Triangled Walls C info", () => {
        expect(JSON.stringify(info01c)).toBe(
            JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: "" })
        );
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 4, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = checkFalling(inputBack01abcde, input01d, { ...defaultGameInfo });
    it("Triangled Walls D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Triangled Walls D info", () => {
        expect(JSON.stringify(info01d)).toBe(
            JSON.stringify({ update: true, ballX: -1, ballY: -1, sound: "" })
        );
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 5, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 5, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = checkFalling(inputBack01abcde, input01e, { ...defaultGameInfo });
    it("Triangled Walls E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Triangled Walls E info", () => {
        expect(JSON.stringify(info01e)).toBe(
            JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: "" })
        );
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 15, 0, 0, 0, 1],
        [1, 1, 1, 15, 0, 0, 1],
        [1, 1, 1, 1, 15, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01f = zeroArray(8, 7);
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 15, 0, 0, 0, 1],
        [1, 1, 1, 15, 0, 0, 1],
        [1, 1, 1, 1, 15, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f;
    for (let i = 0; i < 5; i++) {
        info01f = checkFalling(inputBack01f, input01f, { ...defaultGameInfo });
    }
    it("Triangled Walls F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Triangled Walls F info", () => {
        expect(JSON.stringify(info01f)).toBe(
            JSON.stringify({ update: true, ballX: 5, ballY: 6, sound: "" })
        );
    });


    // Insert new tests here
});        