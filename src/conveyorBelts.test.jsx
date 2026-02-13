import { beforeEach, describe, it, expect } from "vitest";
import { moveConveyorBelts } from "./conveyorBelts.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("moveConveyorBelts", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // moveConveyorBelts

    it("moveConveyorBelts A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 4, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("moveConveyorBelts B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "left", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 4, 2, 0, 0, 1],
            [1, 0, 0, 4, 4, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 4, 0, 0, 0, 0, 1],
            [1, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 4, 2, 0, 0, 0, 1],
            [1, 0, 4, 4, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
    });

    it("moveConveyorBelts C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 5, 0, 0, 1],
            [1, 0, 2, 4, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 5, 0, 0, 1],
            [1, 0, 0, 2, 4, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("moveConveyorBelts D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 4 },
            conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 2, 0, 0, 1],
            [1, 0, 171, 172, 172, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveConveyorBelts(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    it("moveConveyorBelts E", () => {
        const redBall = { x: 4, y: 4, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 };
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            conveyorBelts: [{ x: 3, y: 2, mode: "notrigger", direction: "none", group: 1 }, { x: 2, y: 5, direction: "right", group: 1 }],
            redBalls: [redBall],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 171, 173, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 8, 0, 0, 1],
            [1, 0, 171, 172, 172, 173, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 171, 173, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 4, 8, 0, 1],
            [1, 0, 171, 172, 172, 173, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
        expect(gameInfo.redBalls).toEqual([{ x: 5, y: 4, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]);
    });

    // GRAVITY UP

    it("moveConveyorBelts Gravity Up A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            conveyorBelts: [{ x: 2, y: 2, mode: "notrigger", direction: "left", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 0, 2, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 0, 0, 2, 4, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
    });

    it("moveConveyorBelts Gravity Up B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 4, y: 3 },
            conveyorBelts: [{ x: 2, y: 2, mode: "notrigger", direction: "right", group: 1 }],
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 0, 0, 4, 2, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 171, 172, 173, 0, 0, 1],
            [1, 0, 4, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveConveyorBelts(input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
    });

    // Insert new tests here
});