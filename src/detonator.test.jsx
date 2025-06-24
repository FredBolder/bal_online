import { describe, it, expect } from "vitest";
import { pushDown, zeroArray } from "./balUtils.js";
import { checkDetonator } from "./detonator.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("detonator", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let backData01 = zeroArray(7, 7);

    let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 } };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 36, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 38, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkDetonator(backData01, input01a, gameInfo01a, false);
    it("checkDetonator A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkDetonator info A", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: true, explosion: true }));
    });

    let gameInfo01b = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 }, hasPropeller: true };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 36, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = input01b.map(row => [...row]);
    let info01b = checkDetonator(backData01, input01b, gameInfo01b, false);
    it("checkDetonator B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkDetonator info B", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: false, explosion: false }));
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 }, hasPropeller: true };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 36, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 38, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 37, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = pushDown(backData01, input01c, gameInfo01c, { ...defaultGameVars });
    it("checkDetonator C (via pushDown)", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkDetonator info C", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ player: true, sound: "explosion" }));
    });

    // Insert new tests here
});