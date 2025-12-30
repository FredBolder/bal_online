import { beforeEach, describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkPurpleTeleports, deleteTeleports, findTheOtherTeleport, getPurpleTeleportColor, isWhiteTeleport } from "./teleports.js";
import { copy2dArray } from "./utils.js";

describe("Teleports", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    let teleports01 = [
        { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 2, y: 10, selfDestructing: false, color: "white", group: 2 },
        { x: 4, y: 10, selfDestructing: false, color: "white", group: 2 },
    ];

    it("deleteTeleports A", () => {
        let gameInfo = { ...defaultGameInfo, teleports: [...teleports01] };
        let expectedOutput = [
            { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 2, y: 10, selfDestructing: false, color: "white", group: 2 },
            { x: 4, y: 10, selfDestructing: false, color: "white", group: 2 },
        ];
        deleteTeleports(getPurpleTeleportColor(), true, 1, gameInfo);
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify(expectedOutput));
    });

    it("deleteTeleports B", () => {
        let gameInfo = { ...defaultGameInfo, teleports: [...teleports01] };
        let expectedOutput = [
            { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 2, y: 10, selfDestructing: false, color: "white", group: 2 },
            { x: 4, y: 10, selfDestructing: false, color: "white", group: 2 },
        ];
        deleteTeleports("white", false, 1, gameInfo);
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify(expectedOutput));
    });

    it("deleteTeleports C", () => {
        let gameInfo = { ...defaultGameInfo, teleports: [...teleports01] };
        let expectedOutput = [
            { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 2, y: 10, selfDestructing: false, color: "white", group: 2 },
            { x: 4, y: 10, selfDestructing: false, color: "white", group: 2 },
        ];
        deleteTeleports("white", true, 1, gameInfo);
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify(expectedOutput));
    });

    it("deleteTeleports D", () => {
        let gameInfo = { ...defaultGameInfo, teleports: [...teleports01] };
        let expectedOutput = [
            { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 2, y: 10, selfDestructing: false, color: "white", group: 2 },
            { x: 4, y: 10, selfDestructing: false, color: "white", group: 2 },
        ];
        deleteTeleports(getPurpleTeleportColor(), false, 1, gameInfo);
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify(expectedOutput));
    });

    it("deleteTeleports E", () => {
        let gameInfo = { ...defaultGameInfo, teleports: [...teleports01] };
        let expectedOutput = [
            { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
            { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
            { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        ];
        deleteTeleports("white", false, 2, gameInfo);
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify(expectedOutput));
    });

    let teleports02 = [
        { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 2, y: 8, selfDestructing: false, color: "white", group: 5 },
        { x: 4, y: 8, selfDestructing: false, color: "white", group: 5 },
    ];

    it("findTheOtherTeleport A", () => {
        const info = findTheOtherTeleport(0, teleports02);
        expect(info).toBe(3);
    });

    it("findTheOtherTeleport B", () => {
        const info = findTheOtherTeleport(3, teleports02);
        expect(info).toBe(0);
    });

    it("findTheOtherTeleport C", () => {
        const info = findTheOtherTeleport(1, teleports02);
        expect(info).toBe(5);
    });

    it("findTheOtherTeleport D", () => {
        const info = findTheOtherTeleport(5, teleports02);
        expect(info).toBe(1);
    });

    it("findTheOtherTeleport E", () => {
        const info = findTheOtherTeleport(2, teleports02);
        expect(info).toBe(4);
    });

    it("findTheOtherTeleport F", () => {
        const info = findTheOtherTeleport(4, teleports02);
        expect(info).toBe(2);
    });

    it("findTheOtherTeleport G", () => {
        const info = findTheOtherTeleport(7, teleports02);
        expect(info).toBe(6);
    });

    let teleports03 = [
        { x: 2, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 4, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 2, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 4, y: 2, selfDestructing: false, color: "white", group: 1 },
        { x: 4, y: 4, selfDestructing: true, color: "white", group: 1 },
        { x: 2, y: 6, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        { x: 3, y: 8, selfDestructing: false, color: "white", group: 32 },
        { x: 5, y: 8, selfDestructing: false, color: "white", group: 32 },
    ];

    it("isWhiteTeleport A", () => {
        const info = isWhiteTeleport(2, 2, teleports03);
        expect(info).toBe(true);
    });

    it("isWhiteTeleport B", () => {
        const info = isWhiteTeleport(4, 6, teleports03);
        expect(info).toBe(false);
    });

    it("isWhiteTeleport C", () => {
        const info = isWhiteTeleport(10, 10, teleports03);
        expect(info).toBe(false);
    });

    it("isWhiteTeleport D", () => {
        const info = isWhiteTeleport(2, 4, teleports03);
        expect(info).toBe(true);
    });

    it("isWhiteTeleport E", () => {
        const info = isWhiteTeleport(3, 8, teleports03);
        expect(info).toBe(true);
    });

    it("checkPurpleTeleports A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            teleports: [
                { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
                { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            ]
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 28, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let backData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 170, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 170, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 28, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedBackData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let info = checkPurpleTeleports(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(backData)).toBe(JSON.stringify(expectedBackData));
    });

    it("checkPurpleTeleports B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            teleports: [
                { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
                { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            ]
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let backData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 170, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 170, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let expectedOutput = copy2dArray(input);
        let expectedBackData = copy2dArray(backData);
        let info = checkPurpleTeleports(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(backData)).toBe(JSON.stringify(expectedBackData));
    });

    it("checkPurpleTeleports C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            teleports: [
                { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
                { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            ]
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 4, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 28, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let backData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 170, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 170, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let expectedOutput = copy2dArray(input);
        let expectedBackData = copy2dArray(backData);
        let info = checkPurpleTeleports(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(backData)).toBe(JSON.stringify(expectedBackData));
    });

    it("checkPurpleTeleports D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            teleports: [
                { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
                { x: 1, y: 2, selfDestructing: true, color: getPurpleTeleportColor(), group: 32 },
                { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
                { x: 6, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 32 },
            ]
        }
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 28, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let backData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 170, 0, 0],
            [0, 170, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 170, 0, 0, 170, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 28, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedBackData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 170, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 170, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let info = checkPurpleTeleports(backData, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(backData)).toBe(JSON.stringify(expectedBackData));
        expect(JSON.stringify(gameInfo.teleports)).toBe(JSON.stringify([
            { x: 6, y: 1, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
            { x: 3, y: 4, selfDestructing: true, color: getPurpleTeleportColor(), group: 1 },
        ]));
    });



    // Insert new tests here
});
