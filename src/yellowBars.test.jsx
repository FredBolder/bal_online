import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { zeroArray } from "./balUtils.js";
import { moveYellowBar, moveYellowBars } from "./yellowBars.js";
import { copy2dArray } from "./utils.js";

describe("Yellow bar", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** Horizontal yellow bar *****

    it("Horizontal yellow bar A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(4, 4, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 2, direction: "up" }]);
    });

    it("Horizontal yellow bar B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 4, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(4, 2, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 3 });
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 4, direction: "down" }]);
    });

    it("Horizontal yellow bar D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 2, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 121, 123, 123, 122, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(7, 3, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 2, y: 3, direction: "left" }]);
    });

    it("Horizontal yellow bar F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 121, 123, 123, 122, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(7, 3, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(7, 3, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 121, 123, 123, 122, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 121, 123, 123, 122, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(2, 3, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 3, direction: "right" }]);
    });

    it("Horizontal yellow bar I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 121, 123, 123, 122, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(2, 3, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar J", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 93, 0, 0, 1],
            [1, 0, 2, 121, 123, 123, 122, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(2, 3, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar K", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 4, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar L", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 4, y: 4, direction: "up" }],
            yellowBars: [{ x: 3, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 1, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 2, direction: "none" }]);
    });

    it("Horizontal yellow bar M", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            forces: [{ x: 0, y: 3, direction: "right" }],
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [111, 0, 0, 121, 123, 123, 122, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(7, 3, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bar N", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            forces: [{ x: 8, y: 3, direction: "left" }],
            yellowBars: [{ x: 3, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 121, 123, 123, 122, 0, 112],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(2, 3, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    // ***** Vertical yellow bar *****

    it("Vertical yellow bar A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 4, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(4, 4, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 1, direction: "up" }]);
    });

    it("Vertical yellow bar B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 5 },
            yellowBars: [{ x: 4, y: 3, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 5, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 3, direction: "none" }]);
    });

    it("Vertical yellow bar C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            yellowBars: [{ x: 4, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(4, 1, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 3, direction: "down" }]);
    });

    it("Vertical yellow bar D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            yellowBars: [{ x: 4, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 1, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 2, direction: "none" }]);
    });

    it("Vertical yellow bar E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            yellowBars: [{ x: 4, y: 1, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 124, 0, 0, 0, 0, 1],
            [1, 0, 0, 123, 0, 0, 0, 0, 1],
            [1, 0, 0, 123, 0, 0, 0, 0, 1],
            [1, 0, 0, 125, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(5, 4, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 1, direction: "left" }]);
    });

    it("Vertical yellow bar F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            yellowBars: [{ x: 4, y: 1, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 4, 125, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(5, 4, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 1, direction: "none" }]);
    });

    it("Vertical yellow bar G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            yellowBars: [{ x: 4, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(5, 4, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 2, direction: "none" }]);
    });

    it("Vertical yellow bar H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            yellowBars: [{ x: 4, y: 1, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 2, 125, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 124, 0, 0, 1],
            [1, 0, 0, 0, 0, 123, 0, 0, 1],
            [1, 0, 0, 0, 0, 123, 0, 0, 1],
            [1, 0, 0, 2, 0, 125, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBar(3, 4, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 5, y: 1, direction: "right" }]);
    });

    it("Vertical yellow bar I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 7 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            yellowBars: [{ x: 4, y: 4, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 7, backData, input, gameInfo, defaultGameVars, "up", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 4, direction: "none" }]);
    });

    it("Vertical yellow bar J", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 4, y: 7, direction: "up" }],
            yellowBars: [{ x: 4, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 125, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(4, 1, backData, input, gameInfo, defaultGameVars, "down", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 2, direction: "none" }]);
    });

    it("Vertical yellow bar K", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            forces: [{ x: 1, y: 4, direction: "right" }],
            yellowBars: [{ x: 4, y: 1, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 111, 0, 0, 125, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(5, 4, backData, input, gameInfo, defaultGameVars, "left", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 1, direction: "none" }]);
    });

    it("Vertical yellow bar L", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            forces: [{ x: 7, y: 4, direction: "left" }],
            yellowBars: [{ x: 4, y: 1, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 124, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 0, 123, 0, 0, 0, 1],
            [1, 0, 0, 2, 125, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBar(3, 4, backData, input, gameInfo, defaultGameVars, "right", -1);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 1, direction: "none" }]);
    });

    // ***** Horizontal yellow bars *****

    it("Horizontal yellow bars A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 3, y: 3, direction: "none" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBars(backData, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 3, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bars B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 3, y: 3, direction: "left" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 121, 123, 123, 122, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBars(backData, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 2, y: 3, direction: "left" }]);
    });

    it("Horizontal yellow bars C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 1, y: 3, direction: "left" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 121, 123, 123, 122, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveYellowBars(backData, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.yellowBars).toEqual([{ x: 1, y: 3, direction: "none" }]);
    });

    it("Horizontal yellow bars D", () => {
        const gameInfo03d = {
            ...defaultGameInfo,
            blueBall: { x: 6, y: 2 },
            yellowBars: [{ x: 3, y: 3, direction: "left" }],
        };
        const input03d = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 2, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput03d = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 2, 0, 0, 1],
            [1, 0, 121, 123, 123, 122, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info03d = moveYellowBars(backData, input03d, gameInfo03d, defaultGameVars);
        expect(input03d).toEqual(expectedOutput03d);
        expect(info03d).toBe(true);
        expect(gameInfo03d.yellowBars).toEqual([{ x: 2, y: 3, direction: "left" }]);
        expect(gameInfo03d.blueBall).toEqual({ x: 5, y: 2 });
    });

    // ***** Vertical yellow bars *****

    it("Vertical yellow bars A", () => {
        const gameInfo04a = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            yellowBars: [{ x: 3, y: 2, direction: "left" }, { x: 6, y: 3, direction: "up" }]
        };
        const input04a = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 124, 0, 0, 0, 0, 1],
            [1, 0, 0, 123, 0, 0, 124, 0, 1],
            [1, 0, 0, 123, 0, 0, 125, 0, 1],
            [1, 0, 0, 125, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput04a = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 124, 0, 0, 0, 124, 0, 1],
            [1, 0, 123, 0, 0, 0, 125, 0, 1],
            [1, 0, 123, 0, 0, 0, 0, 0, 1],
            [1, 0, 125, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info04a = moveYellowBars(backData, input04a, gameInfo04a, defaultGameVars);
        expect(input04a).toEqual(expectedOutput04a);
        expect(info04a).toBe(true);
        expect(gameInfo04a.yellowBars).toEqual([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "up" }]);
    });

    // GRAVITY UP

    // ***** Horizontal yellow bars *****

    it("Horizontal yellow bars Gravity Up A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 6, y: 3 },
            yellowBars: [{ x: 3, y: 2, direction: "left" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 121, 123, 123, 122, 0, 1],
            [1, 0, 0, 0, 0, 4, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 121, 123, 123, 122, 0, 0, 1],
            [1, 0, 0, 0, 4, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveYellowBars(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.yellowBars).toEqual([{ x: 2, y: 2, direction: "left" }]);
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 3 });
    });


    // Insert new tests here
});