import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkForces, hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { copy2dArray } from "./utils.js";

describe("Force", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    // ***** Force up *****

    it("Force up A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 4, y: 4, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
    });

    it("Force up B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 4, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 1 });
    });

    it("Force up C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            forces: [{ x: 4, y: 4, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 2, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Force up D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 4, direction: "up" }, { x: 7, y: 4, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 17, 0, 0, 18, 1],
            [1, 0, 0, 0, 2, 0, 0, 4, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 109, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 17, 2, 4, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 109, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 1 });
    });

    it("Force up E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 6, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 17, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 17, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 17, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 17, 4, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
    });

    it("Force up F", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 6, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 17, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 17, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 5, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
    });

    it("Force up G", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 2 },
            forces: [{ x: 4, y: 6, direction: "up" }, { x: 7, y: 6, direction: "up" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 18, 0, 0, 18, 1],
            [1, 0, 0, 0, 2, 0, 0, 4, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 109, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 2, 18, 0, 4, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 109, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 1 });
    });

    it("Force up H", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            forces: [{ x: 4, y: 4, direction: "up" }],
            greenBalls: 1,
            pinkBalls: [{ x: 4, y: 3, delete: false, skipFalling: 0 }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 203, 0, 0, 0, 1],
            [1, 0, 0, 2, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 203, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
        expect(gameInfo.pinkBalls).toEqual([{ x: 4, y: 2, delete: false, skipFalling: 0 }]);
    });

    // ***** Force right *****

    it("Force right A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 2, y: 4, direction: "right" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 111, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 111, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 4 });
    });

    it("Force right B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 2, y: 4, direction: "right" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 111, 4, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 111, 0, 4, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 4 });
    });

    it("Force right C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 2, y: 4, direction: "right" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 111, 5, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    it("Force right D", () => {
        let gameInfo = {
            ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }],
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            orangeBalls: [{ x: 4, y: 4, direction: "none" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 111, 0, 40, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 111, 0, 0, 40, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.orangeBalls).toEqual([{ x: 5, y: 4, direction: "none" }]);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    it("Force right E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 1, y: 4, direction: "right" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 0, 2, 16, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 1],
            [1, 111, 0, 0, 0, 16, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 5, y: 3 });
    });

    it("Force right F", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 1, y: 4, direction: "right" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 0, 1],
            [1, 111, 0, 0, 2, 16, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    // ***** Force left *****

    it("Force left A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            forces: [{ x: 5, y: 3, direction: "left" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 112, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 112, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 3 });
    });

    it("Force left B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            forces: [{ x: 5, y: 3, direction: "left" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 4, 112, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 112, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 3 });
    });

    it("Force left C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            forces: [{ x: 5, y: 3, direction: "left" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 5, 0, 112, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 3 });
    });

    it("Force left D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            forces: [{ x: 7, y: 4, direction: "left" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 15, 2, 0, 0, 111, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 15, 0, 0, 0, 111, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
    });

    // ***** Force down *****

    it("Force down A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    it("Force down B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 16, 0, 0, 111, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 16, 0, 0, 111, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Force down C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            forces: [{ x: 4, y: 1, direction: "down" }],
            greenBalls: 1
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 5, 16, 0, 0, 111, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkForces(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 3 });
    });

    // ***** hasForceRight *****

    it("hasForceRight A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 1, y: 1, direction: "right" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 111, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceRight(input, gameInfo, 4, 1);
        expect(info).toBe(true);
    });

    it("hasForceRight B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 1, y: 1, direction: "right" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 111, 4, 0, 2, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceRight(input, gameInfo, 4, 1);
        expect(info).toBe(true);
    });

    it("hasForceRight C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 1 },
            forces: [{ x: 1, y: 1, direction: "right" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 111, 5, 0, 2, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceRight(input, gameInfo, 4, 1);
        expect(info).toBe(false);
    });

    // ***** hasForceLeft *****

    it("hasForceLeft A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            forces: [{ x: 4, y: 1, direction: "left" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceLeft(input, gameInfo, 1, 1);
        expect(info).toBe(true);
    });

    it("hasForceLeft B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            forces: [{ x: 4, y: 1, direction: "left" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 2, 4, 0, 112, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceLeft(input, gameInfo, 1, 1);
        expect(info).toBe(true);
    });

    it("hasForceLeft C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            forces: [{ x: 4, y: 1, direction: "left" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 2, 5, 0, 112, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceLeft(input, gameInfo, 1, 1);
        expect(info).toBe(false);
    });

    it("hasForceLeft D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            forces: [{ x: 4, y: 1, direction: "left" }],
            pinkBalls: [{ x: 2, y: 1, delete: false, skipFalling: 0 }],
        };
        let input = [
            [1, 1, 1, 1, 1, 1],
            [1, 2, 203, 0, 112, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        let info = hasForceLeft(input, gameInfo, 1, 1);
        expect(info).toBe(true);
    });

    // ***** hasForceUp *****

    it("hasForceUp A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            forces: [{ x: 2, y: 4, direction: "up" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 109, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceUp(input, gameInfo, 2, 2);
        expect(info).toBe(true);
    });

    it("hasForceUp B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            forces: [{ x: 2, y: 4, direction: "up" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 0, 4, 0, 1],
            [1, 0, 109, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceUp(input, gameInfo, 2, 2);
        expect(info).toBe(true);
    });

    it("hasForceUp C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            forces: [{ x: 2, y: 4, direction: "up" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 0, 5, 0, 1],
            [1, 0, 109, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceUp(input, gameInfo, 2, 2);
        expect(info).toBe(false);
    });

    it("hasForceUp D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 2 },
            forces: [{ x: 2, y: 4, direction: "up" }, { x: 2, y: 7, direction: "up" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 109, 0, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1],
            [1, 1, 109, 1, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceUp(input, gameInfo, 2, 2);
        expect(info).toBe(true);
    });

    // ***** hasForceDown *****

    it("hasForceDown A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            forces: [{ x: 2, y: 1, direction: "down" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 110, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceDown(input, gameInfo, 2, 4);
        expect(info).toBe(true);
    });

    it("hasForceDown B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            forces: [{ x: 2, y: 1, direction: "down" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 110, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 4, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceDown(input, gameInfo, 2, 4);
        expect(info).toBe(true);
    });

    it("hasForceDown C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            forces: [{ x: 2, y: 1, direction: "down" }]
        };
        let input = [
            [1, 1, 1, 1, 1],
            [1, 0, 110, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 5, 0, 1],
            [1, 0, 2, 0, 1],
            [1, 1, 1, 1, 1],
        ];
        let info = hasForceDown(input, gameInfo, 2, 4);
        expect(info).toBe(false);
    });

    // Insert new tests here
});
