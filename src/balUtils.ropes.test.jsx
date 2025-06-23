import { describe, it, expect } from "vitest";
import { jump, jumpLeft, jumpRight, pushDown } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("Ropes", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // *** Horizontal ropes ***

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
    it("Horizontal rope A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Horizontal rope A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Horizontal rope A blueBall", () => {
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
    it("Horizontal rope B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Horizontal rope B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Horizontal rope B blueBall", () => {
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
    it("Horizontal rope C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Horizontal rope C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Horizontal rope C blueBall", () => {
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
    it("Horizontal rope D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Horizontal rope D info", () => {
        expect(JSON.stringify(info01d)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Horizontal rope D blueBall", () => {
        expect(JSON.stringify(gameInfo01d.blueBall)).toBe(JSON.stringify({ x: 3, y: 5 }));
    });
    it("Horizontal rope D yellowBalls", () => {
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
    it("Horizontal rope E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Horizontal rope E info", () => {
        expect(JSON.stringify(info01e)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: false, sound: "" }));
    });
    it("Horizontal rope E blueBall", () => {
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
    it("Horizontal rope F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Horizontal rope F info", () => {
        expect(JSON.stringify(info01f)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Horizontal rope F blueBall", () => {
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
    it("Horizontal rope G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Horizontal rope G info", () => {
        expect(JSON.stringify(info01g)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: false, sound: "" }));
    });
    it("Horizontal rope G blueBall", () => {
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
    it("Horizontal rope H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Horizontal rope H info", () => {
        expect(JSON.stringify(info01h)).toBe(JSON.stringify({ eating: false, freezeTime: -1, player: true, sound: "" }));
    });
    it("Horizontal rope H blueBall", () => {
        expect(JSON.stringify(gameInfo01h.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
    });

    // *** Vertical ropes ***

    let inputBack02 = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    let gameInfo02a = { ...defaultGameInfo, blueBall: { x: 3, y: 3 } };
    let input02a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info02a = pushDown(inputBack02, input02a, gameInfo02a);
    it("Vertical rope A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Vertical rope A info", () => {
        expect(JSON.stringify(info02a)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Vertical rope A blueBall", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo02b = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
    let input02b = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info02b = pushDown(inputBack02, input02b, gameInfo02b);
    it("Vertical rope B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Vertical rope B info", () => {
        expect(JSON.stringify(info02b)).toBe(JSON.stringify({ player: true, sound: "" }));
    });
    it("Vertical rope B blueBall", () => {
        expect(JSON.stringify(gameInfo02b.blueBall)).toBe(JSON.stringify({ x: 3, y: 5 }));
    });


    // Insert new tests here
});