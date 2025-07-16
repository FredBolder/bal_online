import { describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPurpleTeleports, deleteTeleports, findTheOtherTeleport, getPurpleTeleportColor, isWhiteTeleport } from "./teleports.js";

describe("Teleports", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let teleports01 = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    let gameInfo01a = { ...defaultGameInfo, teleports: [...teleports01] };
    let expectedOutput01a = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
    ];
    deleteTeleports(getPurpleTeleportColor(), true, gameInfo01a);
    it("deleteTeleports A", () => {
        expect(JSON.stringify(gameInfo01a.teleports)).toBe(JSON.stringify(expectedOutput01a));
    });

    let gameInfo01b = { ...defaultGameInfo, teleports: [...teleports01] };
    let expectedOutput01b = [
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    deleteTeleports("white", false, gameInfo01b);
    it("deleteTeleports B", () => {
        expect(JSON.stringify(gameInfo01b.teleports)).toBe(JSON.stringify(expectedOutput01b));
    });

    let gameInfo01c = { ...defaultGameInfo, teleports: [...teleports01] };
    let expectedOutput01c = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    deleteTeleports("white", true, gameInfo01c);
    it("deleteTeleports C", () => {
        expect(JSON.stringify(gameInfo01c.teleports)).toBe(JSON.stringify(expectedOutput01c));
    });

    let gameInfo01d = { ...defaultGameInfo, teleports: [...teleports01] };
    let expectedOutput01d = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    deleteTeleports(getPurpleTeleportColor(), false, gameInfo01d);
    it("deleteTeleports D", () => {
        expect(JSON.stringify(gameInfo01d.teleports)).toBe(JSON.stringify(expectedOutput01d));
    });

    let teleports02 = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    const info02a = findTheOtherTeleport(0, teleports02);
    it("findTheOtherTeleport A", () => {
        expect(info02a).toBe(3);
    });
    const info02b = findTheOtherTeleport(3, teleports02);
    it("findTheOtherTeleport B", () => {
        expect(info02b).toBe(0);
    });
    const info02c = findTheOtherTeleport(1, teleports02);
    it("findTheOtherTeleport C", () => {
        expect(info02c).toBe(5);
    });
    const info02d = findTheOtherTeleport(5, teleports02);
    it("findTheOtherTeleport D", () => {
        expect(info02d).toBe(1);
    });
    const info02e = findTheOtherTeleport(2, teleports02);
    it("findTheOtherTeleport E", () => {
        expect(info02e).toBe(4);
    });
    const info02f = findTheOtherTeleport(4, teleports02);
    it("findTheOtherTeleport F", () => {
        expect(info02f).toBe(2);
    });

    let teleports03 = [
        { x: 2, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
        { x: 2, y: 4, selfDestructing: true, color: "white" },
        { x: 4, y: 2, selfDestructing: false, color: "white" },
        { x: 4, y: 4, selfDestructing: true, color: "white" },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor() },
    ];
    const info03a = isWhiteTeleport(2, 2, teleports03);
    it("isWhiteTeleport A", () => {
        expect(info03a).toBe(true);
    });
    const info03b = isWhiteTeleport(4, 6, teleports03);
    it("isWhiteTeleport B", () => {
        expect(info03b).toBe(false);
    });
    const info03c = isWhiteTeleport(10, 10, teleports03);
    it("isWhiteTeleport C", () => {
        expect(info03c).toBe(false);
    });
    const info03d = isWhiteTeleport(2, 4, teleports03);
    it("isWhiteTeleport D", () => {
        expect(info03d).toBe(true);
    });

    let gameInfo04a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 4 },
        teleports: [
            { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor() },
            { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor() },
        ]
    }
    let input04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 28, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let backData04a = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 170, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 170, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let expectedOutput04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 28, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedBackData04a = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let info04a = checkPurpleTeleports(backData04a, input04a, gameInfo04a, { ...defaultGameVars });
    it("checkPurpleTeleports A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("checkPurpleTeleports A info", () => {
        expect(info04a).toBe(true);
    });
    it("checkPurpleTeleports A backData", () => {
        expect(JSON.stringify(backData04a)).toBe(JSON.stringify(expectedBackData04a));
    });

    let gameInfo04b = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 4 },
        teleports: [
            { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor() },
            { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor() },
        ]
    }
    let input04b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let backData04b = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 170, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 170, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let expectedOutput04b = input04b.map(row => [...row]);
    let expectedBackData04b = backData04b.map(row => [...row]);
    let info04b = checkPurpleTeleports(backData04b, input04b, gameInfo04b, { ...defaultGameVars });
    it("checkPurpleTeleports B", () => {
        expect(JSON.stringify(input04b)).toBe(JSON.stringify(expectedOutput04b));
    });
    it("checkPurpleTeleports B info", () => {
        expect(info04b).toBe(false);
    });
    it("checkPurpleTeleports B backData", () => {
        expect(JSON.stringify(backData04b)).toBe(JSON.stringify(expectedBackData04b));
    });

    // Insert new tests here
});
