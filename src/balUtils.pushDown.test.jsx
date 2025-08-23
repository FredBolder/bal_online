import { describe, it, expect } from "vitest";
import { pushDown, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils pushDown", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let yellow01a = [{ x: 3, y: 3, direction: "none" }];
    let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, yellowBalls: yellow01a };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 9, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01a = zeroArray(7, 7);
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 2, 1, 1, 1],
        [1, 0, 0, 9, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = pushDown(inputBack01a, input01a, gameInfo01a, { ...defaultGameVars });
    it("pushDown A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });

    it("pushDown A yellow", () => {
        expect(JSON.stringify(yellow01a)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "down" }])
        );
    });

    it("pushDown A info", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({ player: true, sound: "" })
        );
    });

    it("pushDown A blueBall", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 28, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01b = zeroArray(7, 7);
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 2, 1, 1, 1],
        [1, 0, 0, 28, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = pushDown(inputBack01b, input01b, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, { ...defaultGameVars });
    it("pushDown B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });

    it("pushDown B info", () => {
        expect(JSON.stringify(info01b)).toBe(
            JSON.stringify({ player: true, sound: "" })
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 28, 1, 1, 1],
        [1, 0, 0, 28, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01c = zeroArray(7, 7);
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 28, 1, 1, 1],
        [1, 0, 0, 28, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = pushDown(inputBack01c, input01c, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, { ...defaultGameVars });
    it("pushDown C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });

    it("pushDown C info", () => {
        expect(JSON.stringify(info01c)).toBe(
            JSON.stringify({ player: false, sound: "" })
        );
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 28, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 109, 1, 1, 1],
    ];
    let inputBack01d = zeroArray(7, 7);
    let expectedOutput01d = input01d.map(row => [...row]);
    let info01d = pushDown(inputBack01d, input01d, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, forces: [{ x: 3, y: 6, direction: "up" }] }, { ...defaultGameVars });
    it("pushDown D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("pushDown D info", () => {
        expect(JSON.stringify(info01d)).toBe(
            JSON.stringify({ player: false, sound: "" })
        );
    });

    let yellow01e = [{ x: 3, y: 1, direction: "none" }];
    let gameInfo01e = { ...defaultGameInfo, blueBall: { x: 3, y: 0 }, yellowBalls: yellow01e };
    let input01e = [
        [1, 0, 0, 2, 0, 0, 1],
        [1, 0, 0, 9, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 1],
        [1, 0, 0, 9, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01e = zeroArray(7, 7);
    let info01e = pushDown(inputBack01e, input01e, gameInfo01e, { ...defaultGameVars });
    it("pushDown E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("pushDown E info", () => {
        expect(JSON.stringify(info01e)).toBe(
            JSON.stringify({ player: true, sound: "" })
        );
    });
    it("pushDown E blueBall", () => {
        expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 3, y: 1 }));
    });
    it("pushDown E yellow", () => {
        expect(JSON.stringify(yellow01e)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "down" }])
        );
    });

    // Insert new tests here
});