import { describe, it, expect } from "vitest";
import { moveObjects } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils moveObjects", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    let expectedGameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 5, direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01a, { ...defaultGameVars }, "insertRow", 4);
    it("moveObjects A", () => {
        expect(JSON.stringify(gameInfo01a)).toBe(JSON.stringify(expectedGameInfo01a));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    let expectedGameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 4, y: 4, direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01b, { ...defaultGameVars }, "insertColumn", 3);
    it("moveObjects B", () => {
        expect(JSON.stringify(gameInfo01b)).toBe(JSON.stringify(expectedGameInfo01b));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    let expectedGameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 3, direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01c, { ...defaultGameVars }, "deleteRow", 3);
    it("moveObjects C", () => {
        expect(JSON.stringify(gameInfo01c)).toBe(JSON.stringify(expectedGameInfo01c));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    let expectedGameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01d, { ...defaultGameVars }, "deleteRow", 5);
    it("moveObjects D", () => {
        expect(JSON.stringify(gameInfo01d)).toBe(JSON.stringify(expectedGameInfo01d));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 3, y: 4, direction: "left", group: 1 }],
    };
    let expectedGameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        conveyorBelts: [{ x: 2, y: 4, direction: "left", group: 1 }],
    };
    moveObjects(gameInfo01e, { ...defaultGameVars }, "deleteColumn", 1);
    it("moveObjects E", () => {
        expect(JSON.stringify(gameInfo01e)).toBe(JSON.stringify(expectedGameInfo01e));
    });

    // Insert new tests here
});