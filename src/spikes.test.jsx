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

    let inputBack01 = zeroArray(6, 8);

    it("checkSpikes A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            blueBall1: { x: 3, y: 3 },
            blueBall2: { x: 6, y: 3 },
            twoBlue: true,
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 2, 1],
            [1, 0, 0, 175, 0, 0, 174, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
            forces: [{ x: 3, y: 4, direction: "up" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 5, 0, 0, 0, 1],
            [1, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(false);
    });

    it("checkSpikes F", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 4 },
            forces: [{ x: 3, y: 4, direction: "right" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 111, 0, 2, 177, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes G", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            forces: [{ x: 6, y: 4, direction: "left" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 3, 1],
            [1, 176, 2, 0, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    it("checkSpikes H", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            hasPropeller: true,
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(false);
    });

    it("checkSpikes I", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
            hasPropeller: true,
            forces: [{ x: 3, y: 1, direction: "down" }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 110, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack01, input, gameInfo, { ...defaultGameVars });
        expect(info).toBe(true);
    });

    // GRAVITY UP

    let inputBack02 = zeroArray(6, 8);

    it("checkSpikes Gravity Up A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 3 },
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 174, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack02, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(false);
    });

    it("checkSpikes Gravity Up B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 2 },
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 175, 0, 0, 0, 1],
            [1, 1, 0, 2, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkSpikes(inputBack02, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(info).toBe(true);
    });


    // Insert new tests here
});