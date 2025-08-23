import { describe, it, expect } from "vitest";
import {
    moveLeft,
    moveRight,
    jump,
    pushDown,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils One direction ports", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let inputBack01abcd = zeroArray(4, 7);
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 10, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 3, 1],
        [1, 0, 0, 10, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveRight(inputBack01abcd, input01a, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } });
    it("One direction ports A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });

    it("One direction ports A info", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({
                eating: false,
                freezeTime: -1,
                gateTravelling: false,
                player: true,
                teleporting: false,
                rotateLeft: false,
                rotateRight: false,
                sound: "",
            })
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 11, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 2, 11, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = moveLeft(inputBack01abcd, input01b, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } });
    it("One direction ports B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });

    it("One direction ports B player", () => {
        expect(JSON.stringify(info01b.player)).toBe(JSON.stringify(true));
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 2, 11, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 2, 11, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = moveRight(inputBack01abcd, input01c, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } });
    it("One direction ports C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });

    it("One direction ports C player", () => {
        expect(JSON.stringify(info01c.player)).toBe(JSON.stringify(false));
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 10, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 10, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = moveLeft(inputBack01abcd, input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } });
    it("One direction ports D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });

    it("One direction ports D player", () => {
        expect(JSON.stringify(info01d.player)).toBe(JSON.stringify(false));
    });

    let gameInfo01e = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
    let inputBack01ej = zeroArray(5, 7);
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 2, 0, 0, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = jump(inputBack01ej, input01e, gameInfo01e);
    it("One direction ports E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });

    it("One direction ports E info", () => {
        expect(JSON.stringify(info01e)).toBe(
            JSON.stringify({
                eating: false,
                freezeTime: -1,
                player: true,
                sound: "",
            })
        );
    });

    it("One direction ports E blueBall", () => {
        expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 2, y: 1 }));
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 4, 0, 0, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 4, 0, 0, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f = jump(inputBack01ej, input01f, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
    it("One direction ports F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });

    it("One direction ports F info", () => {
        expect(JSON.stringify(info01f)).toBe(
            JSON.stringify({
                eating: false,
                freezeTime: -1,
                player: false,
                sound: "",
            })
        );
    });

    let gameInfo01g = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 0, 0, 2, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01g = pushDown(inputBack01ej, input01g, gameInfo01g, { ...defaultGameVars });
    it("One direction ports G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });

    it("One direction ports G info", () => {
        expect(JSON.stringify(info01g)).toBe(
            JSON.stringify({ player: true, sound: "" })
        );
    });

    it("One direction ports G blueBall", () => {
        expect(JSON.stringify(gameInfo01g.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 1],
        [1, 1, 87, 1, 88, 1, 1],
        [1, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = pushDown(inputBack01ej, input01h, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, { ...defaultGameVars });
    it("One direction ports H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });

    it("One direction ports G info", () => {
        expect(JSON.stringify(info01h)).toBe(
            JSON.stringify({ player: false, sound: "" })
        );
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 1],
        [1, 1, 88, 1, 87, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 1],
        [1, 1, 88, 1, 87, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01i = pushDown(inputBack01ej, input01i, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, { ...defaultGameVars });
    it("One direction ports I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });

    it("One direction ports I info", () => {
        expect(JSON.stringify(info01i)).toBe(
            JSON.stringify({ player: false, sound: "" })
        );
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 1, 88, 1, 88, 1, 1],
        [1, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 1, 88, 1, 88, 1, 1],
        [1, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01j = jump(inputBack01ej, input01j, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
    it("One direction ports J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });

    it("One direction ports J info", () => {
        expect(JSON.stringify(info01j)).toBe(
            JSON.stringify({
                eating: false,
                freezeTime: -1,
                player: false,
                sound: "",
            })
        );
    });



    // Insert new tests here
});
