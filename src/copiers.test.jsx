import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkCopiers } from "./copiers.js";
import { skipFallingTicks } from "./pinkBalls.js";
import { copy2dArray } from "./utils.js";


describe("Copiers", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    it("checkCopiers A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3 }],
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
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
    });

    it("checkCopiers B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3 }],
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
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(gameInfo.redBalls.length).toBe(2);
    });

    it("checkCopiers C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3 }],
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
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: false }));
    });

    it("checkCopiers D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3 }],
            greenBalls: 1,
            pinkBalls: [{ x: 5, y: 2, delete: false, skipFalling: skipFallingTicks() }],
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
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.pinkBalls)).toBe(JSON.stringify([
            { x: 3, y: 3, delete: false, skipFalling: skipFallingTicks() }, 
            { x: 7, y: 3, delete: false, skipFalling: skipFallingTicks() }
        ]));
    });

    it("checkCopiers E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            copiers: [{ x: 5, y: 3 }],
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
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.orangeBalls)).toBe(JSON.stringify([
            { x: 3, y: 3, direction: "none" }, 
            { x: 7, y: 3, direction: "none" }
        ]));
    });

    // Insert new tests here
});