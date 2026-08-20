import { beforeEach, describe, it, expect } from "vitest";
import { checkSpikeBalls } from "./spikeBalls.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("Spikes", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameInfo.levelCanHaveSpikeBalls = true;
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const inputBack01 = zeroArray(8, 8);

    it("checkSpikeBalls 1", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 6 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 256, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 2", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 256, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 3", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 1 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 256, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 4", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 256, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 5", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 6, y: 6 },
            forces: [{ x: 1, y: 6, direction: "right" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 0, 0, 256, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 6", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 6 },
            forces: [{ x: 1, y: 6, direction: "right" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 0, 256, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 7", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 6 },
            forces: [{ x: 6, y: 6, direction: "left" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 256, 0, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 8", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 6 },
            forces: [{ x: 6, y: 6, direction: "left" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 256, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 9", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 4, y: 6, direction: "up" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 10", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 5 },
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 256, 2, 256, 0, 0, 1],
            [1, 0, 256, 256, 256, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 11", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 6 },
            forces: [{ x: 1, y: 6, direction: "right" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 0, 0, 2, 256, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 12", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 6 },
            forces: [{ x: 1, y: 6, direction: "right" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 0, 2, 256, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 13", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 6 },
            forces: [{ x: 6, y: 6, direction: "left" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 256, 2, 0, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 14", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 6 },
            forces: [{ x: 6, y: 6, direction: "left" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 256, 2, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 15", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 6, direction: "up" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 16", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 4, y: 6, direction: "up" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 17", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 6 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(true);
    });

    it("checkSpikeBalls 18", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 5 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    it("checkSpikeBalls 19", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 6 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 256, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkSpikeBalls(inputBack01, input, gameInfo, defaultGameVars);
        expect(info).toBe(false);
    });

    // Insert new tests here
});