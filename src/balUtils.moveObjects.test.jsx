import { describe, it, expect } from "vitest";
import { moveObjects } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils moveObjects", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    let expectedGameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 5, mode: "notrigger", direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01a, "insertRow", 0, 4, 0, 0);
    it("moveObjects A", () => {
        expect(JSON.stringify(gameInfo01a)).toBe(JSON.stringify(expectedGameInfo01a));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    let expectedGameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 4, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01b, "insertColumn", 3, 0, 0, 0);
    it("moveObjects B", () => {
        expect(JSON.stringify(gameInfo01b)).toBe(JSON.stringify(expectedGameInfo01b));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    let expectedGameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 3, mode: "notrigger", direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01c, "deleteRow", 0, 3, 0, 0);
    it("moveObjects C", () => {
        expect(JSON.stringify(gameInfo01c)).toBe(JSON.stringify(expectedGameInfo01c));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    let expectedGameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01d, "deleteRow", 0, 5, 0, 0);
    it("moveObjects D", () => {
        expect(JSON.stringify(gameInfo01d)).toBe(JSON.stringify(expectedGameInfo01d));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    let expectedGameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 2, y: 4, mode: "notrigger", direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01e, "deleteColumn", 1, 0, 0, 0);
    it("moveObjects E", () => {
        expect(JSON.stringify(gameInfo01e)).toBe(JSON.stringify(expectedGameInfo01e));
    });

    let gameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        yellowBalls: [{ x: 10, y: 5, direction: "none" }, { x: 5, y: 5, direction: "none" }],
    };
    let expectedGameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        yellowBalls: [{ x: 11, y: 5, direction: "none" }, { x: 5, y: 5, direction: "none" }],
    };
    moveObjects(gameInfo01f, "insertColumn", 7, 0, 0, 0);
    it("moveObjects F", () => {
        expect(JSON.stringify(gameInfo01f)).toBe(JSON.stringify(expectedGameInfo01f));
    });

    let gameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        orangeBalls: [{ x: 3, y: 5, direction: "none" }, { x: 5, y: 10, direction: "none" }],
    };
    let expectedGameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        orangeBalls: [{ x: 3, y: 6, direction: "none" }, { x: 5, y: 11, direction: "none" }],
    };
    moveObjects(gameInfo01g, "insertRow", 0, 5, 0, 0);
    it("moveObjects G", () => {
        expect(JSON.stringify(gameInfo01g)).toBe(JSON.stringify(expectedGameInfo01g));
    });

    let gameInfo01h = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        orangeBalls: [{ x: 3, y: 5, direction: "none" }, { x: 5, y: 10, direction: "none" }],
    };
    let expectedGameInfo01h = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        orangeBalls: [{ x: 10, y: 4, direction: "none" }, { x: 5, y: 10, direction: "none" }],
    };
    moveObjects(gameInfo01h, "moveCell", 3, 5, 10, 4);
    it("moveObjects H", () => {
        expect(JSON.stringify(gameInfo01h)).toBe(JSON.stringify(expectedGameInfo01h));
    });

    // Insert new tests here
});