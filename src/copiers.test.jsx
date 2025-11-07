import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkCopiers } from "./copiers.js";
import { copy2dArray } from "./utils.js";


describe("Copiers", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    it("checkCopiers A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3, color: "white" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 0, 1],
            [1, 2, 0, 0, 0, 97, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 97, 0, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
    });

    it("checkCopiers B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3, color: "white" }],
            greenBalls: 1,
        };
        gameInfo.redBalls.push({ smart: 1, x: 5, y: 2, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 });

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 93, 0, 0, 1],
            [1, 2, 0, 4, 0, 97, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 93, 97, 0, 93, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.redBalls).toEqual([
            { smart: 1, x: 4, y: 3, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 },
            { smart: 1, x: 7, y: 3, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }
        ]);
    });

    it("checkCopiers C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3, color: "white" }],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 4, 0, 0, 1],
            [1, 2, 0, 0, 4, 97, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false });
    });

    it("checkCopiers D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3, color: "white" }],
            greenBalls: 1,
            pinkBalls: [{ x: 5, y: 2, delete: false, counter: 0 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 203, 0, 0, 1],
            [1, 2, 0, 0, 0, 97, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 203, 0, 97, 0, 203, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.pinkBalls).toEqual([
            { x: 3, y: 3, delete: false, counter: 0 },
            { x: 7, y: 3, delete: false, counter: 0 }
        ]);
    });

    it("checkCopiers E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3, color: "white" }],
            greenBalls: 1,
            orangeBalls: [{ x: 5, y: 2, direction: "none" }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 40, 0, 0, 1],
            [1, 2, 0, 0, 0, 97, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 40, 0, 97, 0, 40, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.orangeBalls).toEqual([
            { x: 3, y: 3, direction: "none" },
            { x: 7, y: 3, direction: "none" }
        ]);
    });

    it("checkCopiers F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 1, color: "yellow" }],
            greenBalls: 1,
            yellowBalls: [{ x: 5, y: 2, direction: "none" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 208, 0, 0, 1],
            [1, 0, 0, 0, 0, 9, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 9, 208, 9, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 1, direction: "left" }, { x: 6, y: 1, direction: "right" }]);
    });

    it("checkCopiers G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 7, y: 2, color: "yellow" }, { x: 4, y: 3, color: "yellow" }],
            greenBalls: 1,
            yellowBalls: [{ x: 6, y: 2, direction: "none" }, { x: 5, y: 3, direction: "none" }]
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 9, 208, 1],
            [1, 0, 0, 0, 208, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 9, 1],
            [1, 0, 0, 0, 9, 0, 0, 208, 1],
            [1, 0, 0, 0, 208, 0, 0, 9, 1],
            [1, 0, 0, 0, 9, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkCopiers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true });
        expect(gameInfo.yellowBalls).toEqual([
            { x: 7, y: 1, direction: "up" },
            { x: 4, y: 2, direction: "up" },
            { x: 7, y: 3, direction: "down" },
            { x: 4, y: 4, direction: "down" },
        ]);
    });

    // Insert new tests here
});