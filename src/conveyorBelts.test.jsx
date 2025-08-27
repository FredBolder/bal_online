import { describe, it, expect } from "vitest";
import { moveConveyorBelts } from "./conveyorBelts.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("moveConveyorBelts", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    // moveConveyorBelts

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 4, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 4, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveConveyorBelts(input01a, gameInfo01a, { ...defaultGameVars });
    it("moveConveyorBelts A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("moveConveyorBelts A info", () => {
        expect(info01a).toBe(true);
    });
    it("moveConveyorBelts A blueBall", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "left", group: 1 }],
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 4, 2, 0, 0, 1],
        [1, 0, 0, 4, 4, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 4, 0, 0, 0, 0, 1],
        [1, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 4, 2, 0, 0, 0, 1],
        [1, 0, 4, 4, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = moveConveyorBelts(input01b, gameInfo01b, { ...defaultGameVars });
    it("moveConveyorBelts B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("moveConveyorBelts B info", () => {
        expect(info01b).toBe(true);
    });
    it("moveConveyorBelts B blueBall", () => {
        expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
    };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 5, 0, 0, 1],
        [1, 0, 2, 4, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 5, 0, 0, 1],
        [1, 0, 0, 2, 4, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = moveConveyorBelts(input01c, gameInfo01c, { ...defaultGameVars });
    it("moveConveyorBelts C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("moveConveyorBelts C info", () => {
        expect(info01c).toBe(true);
    });
    it("moveConveyorBelts C blueBall", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        conveyorBelts: [{ x: 2, y: 5, mode: "notrigger", direction: "right", group: 1 }],
    };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 2, 0, 0, 1],
        [1, 0, 171, 172, 172, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = copy2dArray(input01d);
    let info01d = moveConveyorBelts(input01d, gameInfo01d, { ...defaultGameVars });
    it("moveConveyorBelts D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("moveConveyorBelts D info", () => {
        expect(info01d).toBe(false);
    });
    it("moveConveyorBelts D blueBall", () => {
        expect(JSON.stringify(gameInfo01d.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    let redBall01e = { x: 4, y: 4, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 };
    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        conveyorBelts: [{ x: 3, y: 2, mode: "notrigger", direction: "none", group: 1 }, { x: 2, y: 5, direction: "right", group: 1 }],
        redBalls: [redBall01e],
    };
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 171, 173, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 4, 8, 0, 0, 1],
        [1, 0, 171, 172, 172, 173, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 171, 173, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 4, 8, 0, 1],
        [1, 0, 171, 172, 172, 173, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = moveConveyorBelts(input01e, gameInfo01e, { ...defaultGameVars });
    it("moveConveyorBelts E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("moveConveyorBelts E info", () => {
        expect(info01e).toBe(true);
    });
    it("moveConveyorBelts E blueBall", () => {
        expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });
    it("moveConveyorBelts E redBalls", () => {
        expect(JSON.stringify(gameInfo01e.redBalls)).toBe(JSON.stringify(
            [{ x: 5, y: 4, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]
        ));
    });

    // GRAVITY UP

    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        conveyorBelts: [{ x: 2, y: 2, mode: "notrigger", direction: "left", group: 1 }],
    };
    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 0, 2, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 0, 0, 2, 4, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = moveConveyorBelts(input02a, gameInfo02a, { ...defaultGameVars, gravity: "up" });
    it("moveConveyorBelts Gravity Up A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("moveConveyorBelts Gravity Up A info", () => {
        expect(info02a).toBe(true);
    });
    it("moveConveyorBelts Gravity Up A blueBall", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        conveyorBelts: [{ x: 2, y: 2, mode: "notrigger", direction: "right", group: 1 }],
    };
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 0, 0, 4, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 171, 172, 173, 0, 0, 1],
        [1, 0, 4, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02b = moveConveyorBelts(input02b, gameInfo02b, { ...defaultGameVars, gravity: "up" });
    it("moveConveyorBelts Gravity Up B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("moveConveyorBelts Gravity Up B info", () => {
        expect(info02b).toBe(true);
    });
    it("moveConveyorBelts Gravity Up B blueBall", () => {
        expect(JSON.stringify(gameInfo02b.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });

    // Insert new tests here
});