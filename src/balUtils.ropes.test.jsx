import { describe, it, expect } from "vitest";
import { jump, jumpLeft, jumpRight, pushDown } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("Ropes", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let inputBack01 = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 80, 80, 80, 80, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 3, y: 2 } };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = pushDown(inputBack01, input01a, gameInfo01a);
    it("Ropes A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Ropes A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Ropes A blueBall", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo01b = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = jump(inputBack01, input01b, gameInfo01b);
    it("Ropes B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Ropes B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Ropes B blueBall", () => {
        expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = pushDown(inputBack01, input01c, gameInfo01c);
    it("Ropes C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Ropes C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Ropes C blueBall", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 3, y: 5 }));
    });

    let gameInfo01d = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, yellowBalls: [{ x: 3, y: 5, direction: "none" }] };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 9, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 9, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = pushDown(inputBack01, input01d, gameInfo01d);
    it("Ropes D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Ropes D info", () => {
        expect(JSON.stringify(info01d)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Ropes D blueBall", () => {
        expect(JSON.stringify(gameInfo01d.blueBall)).toBe(JSON.stringify({ x: 3, y: 5 }));
    });
    it("Ropes D yellowBalls", () => {
        expect(JSON.stringify(gameInfo01d.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 6, direction: "down" }]));
    });

    let gameInfo01e = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = input01e.map(row => [...row]);
    let info01e = jumpRight(inputBack01, input01e, gameInfo01e);
    it("Ropes E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Ropes E info", () => {
        expect(JSON.stringify(info01e)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: false, sound: "" }));
    });
    it("Ropes E blueBall", () => {
        expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo01f = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, hasCoilSpring: true };
    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f = jumpRight(inputBack01, input01f, gameInfo01f);
    it("Ropes F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Ropes F info", () => {
        expect(JSON.stringify(info01f)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Ropes F blueBall", () => {
        expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let gameInfo01g = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = input01g.map(row => [...row]);
    let info01g = jumpLeft(inputBack01, input01g, gameInfo01g);
    it("Ropes G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Ropes G info", () => {
        expect(JSON.stringify(info01g)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: false, sound: "" }));
    });
    it("Ropes G blueBall", () => {
        expect(JSON.stringify(gameInfo01g.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo01h = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, hasCoilSpring: true };
    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = jumpLeft(inputBack01, input01h, gameInfo01h);
    it("Ropes H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Ropes H info", () => {
        expect(JSON.stringify(info01h)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Ropes H blueBall", () => {
        expect(JSON.stringify(gameInfo01h.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
    });


    // Insert new tests here
});