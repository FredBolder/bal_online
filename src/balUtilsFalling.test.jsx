import { beforeEach, describe, it, expect } from "vitest";
import { falling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils falling", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const inputBack = zeroArray(20, 20); // bigger array, so it can be used for all

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("falling A info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 1],
            [1, 0, 16, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(2, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
        expect(info).toBe(true);
    });

    it("falling B info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 1],
            [1, 4, 16, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(2, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling C info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 1, 1, 15, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(3, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(true);
    });

    it("falling D info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 1, 1, 15, 4, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(3, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling E info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(3, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(true);
    });

    it("falling F info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const backData = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 137, 0, 0],
            [0, 0, 0, 137, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        const info = falling(3, 2, backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling G info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const backData = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 25, 0, 0],
            [0, 0, 0, 25, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        const info = falling(3, 2, backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling H info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = falling(3, 2, inputBack, input, { ...defaultGameInfo, hasPropeller: true, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling I info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 109, 1, 1],
        ];
        const info = falling(3, 2, inputBack, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, forces: [{ x: 3, y: 4, direction: "up" }] }, defaultGameVars);
        expect(info).toBe(false);
    });

    it("falling J info", () => {
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const backData = [
            [0, 0, 0, 0, 0, 0],
            [0, 20, 20, 20, 20, 0],
            [0, 23, 23, 23, 23, 0],
            [0, 23, 23, 23, 23, 0],
            [0, 0, 0, 0, 0, 0],
        ];
        const info = falling(3, 2, backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 } }, defaultGameVars);
        expect(info).toBe(false);
    });

    // Insert new tests here
});    