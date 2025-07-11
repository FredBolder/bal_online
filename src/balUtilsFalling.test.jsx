import { describe, it, expect } from "vitest";
import { falling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils falling", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    let input01a = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 1],
        [1, 0, 16, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01a = falling(2, 2, backData, input01a, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } });
    it("falling A info", () => {
        expect(info01a).toBe(true);
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 1],
        [1, 4, 16, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01b = falling(2, 2, backData, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } });
    it("falling B info", () => {
        expect(info01b).toBe(false);
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 1, 1, 15, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01c = falling(3, 2, backData, input01c, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling C info", () => {
        expect(info01c).toBe(true);
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 1, 1, 15, 4, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01d = falling(3, 2, backData, input01d, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling D info", () => {
        expect(info01d).toBe(false);
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01e = falling(3, 2, backData, input01e, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling E info", () => {
        expect(info01e).toBe(true);
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let backData01f = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    let info01f = falling(3, 2, backData01f, input01f, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling F info", () => {
        expect(info01f).toBe(false);
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let backData01g = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 25, 0, 0],
        [0, 0, 0, 25, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    let info01g = falling(3, 2, backData01g, input01g, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling G info", () => {
        expect(info01g).toBe(false);
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info01h = falling(3, 2, backData, input01h, { ...defaultGameInfo, hasPropeller: true, blueBall: { x: 3, y: 2 } });
    it("falling H info", () => {
        expect(info01h).toBe(false);
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 109, 1, 1],
    ];
    let info01i = falling(3, 2, backData, input01i, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, forces: [{ x: 3, y: 4, direction: 8 }] });
    it("falling I info", () => {
        expect(info01i).toBe(false);
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let backData01j = [
        [0, 0, 0, 0, 0, 0],
        [0, 20, 20, 20, 20, 0],
        [0, 23, 23, 23, 23, 0],
        [0, 23, 23, 23, 23, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    let info01j = falling(3, 2, backData01j, input01j, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } });
    it("falling J info", () => {
        expect(info01j).toBe(false);
    });

    // Insert new tests here
});    