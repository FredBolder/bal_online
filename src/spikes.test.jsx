import { describe, it, expect } from "vitest";
import { checkSpikes } from "./spikes.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("Spikes", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let inputBack01 = zeroArray(6, 8);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 174, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkSpikes(inputBack01, input01a, gameInfo01a);
    it("checkSpikes A", () => {
        expect(info01a).toBe(true);
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        blueBall1: { x: 3, y: 3 },
        blueBall2: { x: 6, y: 3 },
        twoBlue: true,
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 2, 0, 0, 2, 1],
        [1, 0, 0, 175, 0, 0, 174, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkSpikes(inputBack01, input01b, gameInfo01b);
    it("checkSpikes B", () => {
        expect(info01b).toBe(true);
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 2 },
        forces: [{ x: 3, y: 4, direction: "up" }],
    };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 175, 0, 0, 0, 1],
        [1, 1, 0, 2, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = checkSpikes(inputBack01, input01c, gameInfo01c);
    it("checkSpikes C", () => {
        expect(info01c).toBe(true);
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 2 },
        forces: [{ x: 3, y: 4, direction: "up" }],
    };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 175, 0, 0, 0, 1],
        [1, 1, 0, 2, 0, 0, 0, 1],
        [1, 3, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = checkSpikes(inputBack01, input01d, gameInfo01d);
    it("checkSpikes D", () => {
        expect(info01d).toBe(true);
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 2 },
        forces: [{ x: 3, y: 4, direction: "up" }],
    };
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 175, 0, 0, 0, 1],
        [1, 1, 0, 2, 0, 0, 0, 1],
        [1, 3, 0, 5, 0, 0, 0, 1],
        [1, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = checkSpikes(inputBack01, input01e, gameInfo01e);
    it("checkSpikes E", () => {
        expect(info01e).toBe(false);
    });

    let gameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        forces: [{ x: 3, y: 4, direction: "right" }],
    };
    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 111, 0, 2, 177, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f = checkSpikes(inputBack01, input01f, gameInfo01f);
    it("checkSpikes F", () => {
        expect(info01f).toBe(true);
    });

    let gameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        forces: [{ x: 6, y: 4, direction: "left" }],
    };
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 1],
        [1, 176, 2, 0, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01g = checkSpikes(inputBack01, input01g, gameInfo01g);
    it("checkSpikes G", () => {
        expect(info01g).toBe(true);
    });

    let gameInfo01h = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        hasPropeller: true,
    };
    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 174, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = checkSpikes(inputBack01, input01h, gameInfo01h);
    it("checkSpikes H", () => {
        expect(info01h).toBe(false);
    });

    let gameInfo01i = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 3 },
        hasPropeller: true,
        forces: [{ x: 3, y: 1, direction: "down" }],
    };
    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 110, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 174, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01i = checkSpikes(inputBack01, input01i, gameInfo01i);
    it("checkSpikes I", () => {
        expect(info01i).toBe(true);
    });



    // Insert new tests here
});