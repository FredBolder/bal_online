import { beforeEach, describe, it, expect } from "vitest";
import { moveObjects } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils moveObjects", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    it("moveObjects A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 5, mode: "notrigger", direction: "left", group: 1 }],
        };
        moveObjects(gameInfo, "insertRow", 0, 4, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 4, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        moveObjects(gameInfo, "insertColumn", 3, 0, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 3, mode: "notrigger", direction: "left", group: 1 }],
        };
        moveObjects(gameInfo, "deleteRow", 0, 3, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        moveObjects(gameInfo, "deleteRow", 0, 5, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects E", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 3, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            conveyorBelts: [{ x: 2, y: 4, mode: "notrigger", direction: "left", group: 1 }],
        };
        moveObjects(gameInfo, "deleteColumn", 1, 0, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects F", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            yellowBalls: [{ x: 10, y: 5, direction: "none" }, { x: 5, y: 5, direction: "none" }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            yellowBalls: [{ x: 11, y: 5, direction: "none" }, { x: 5, y: 5, direction: "none" }],
        };
        moveObjects(gameInfo, "insertColumn", 7, 0, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects G", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            orangeBalls: [{ x: 3, y: 5, direction: "none" }, { x: 5, y: 10, direction: "none" }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            orangeBalls: [{ x: 3, y: 6, direction: "none" }, { x: 5, y: 11, direction: "none" }],
        };
        moveObjects(gameInfo, "insertRow", 0, 5, 0, 0);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    it("moveObjects H", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            orangeBalls: [{ x: 3, y: 5, direction: "none" }, { x: 5, y: 10, direction: "none" }],
        };
        const expectedGameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 1 },
            orangeBalls: [{ x: 10, y: 4, direction: "none" }, { x: 5, y: 10, direction: "none" }],
        };
        moveObjects(gameInfo, "moveCell", 3, 5, 10, 4);
        expect(JSON.stringify(gameInfo)).toBe(JSON.stringify(expectedGameInfo));
    });

    // Insert new tests here
});