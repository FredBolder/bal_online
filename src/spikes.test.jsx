import { beforeEach, describe, it, expect } from "vitest";
import { checkSpikes } from "./spikes.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("Spikes", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const inputBack01 = zeroArray(6, 8);

    it("checkSpikes A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            blueBall1: { x: 3, y: 3 },
            blueBall2: { x: 6, y: 3 },
            twoBlue: true,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 2, 1],
            [1, 0, 0, 175, 0, 0, 174, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikes F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            forces: [{ x: 3, y: 4, direction: "right" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 111, 0, 2, 177, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            forces: [{ x: 6, y: 4, direction: "left" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 176, 2, 0, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikes H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            hasPropeller: true,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikes I", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            hasPropeller: true,
            forces: [{ x: 3, y: 1, direction: "down" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 110, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    // GRAVITY UP

    const inputBack02 = zeroArray(6, 8);

    it("checkSpikes Gravity Up A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack02, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(false);
    });

    it("checkSpikes Gravity Up B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikes(inputBack02, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(true);
    });


    // Insert new tests here
});