import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkYellowPushersTrigger } from "./yellowPushers.js";

describe("Yellow ball pushers", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** checkYellowBallPushersTrigger *****

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        yellowBallPushers: [{ x: 4, y: 2 }],
        yellowBallPushersTrigger: { x: 7, y: 4 },
        yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
    };

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 115, 9, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 9, 0, 115, 0, 9, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkYellowPushersTrigger(backData, input01a, gameInfo01a, { ...defaultGameVars }, false);
    it("checkYellowBallPushersTrigger A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkYellowBallPushersTrigger A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkYellowBallPushersTrigger A yellow balls", () => {
        expect(JSON.stringify(gameInfo01a.yellowBalls)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "right" }]));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 4 },
        yellowBallPushers: [{ x: 4, y: 3 }],
        yellowBallPushersTrigger: { x: 7, y: 5 },
        yellowBalls: [{ x: 4, y: 2, direction: "none" }, { x: 4, y: 4, direction: "none" }],
    };

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 9, 0, 0, 0, 1],
        [1, 0, 0, 0, 115, 0, 0, 0, 1],
        [1, 0, 0, 0, 9, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 9, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 115, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 9, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkYellowPushersTrigger(backData, input01b, gameInfo01b, { ...defaultGameVars }, false);
    it("checkYellowBallPushersTrigger B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkYellowBallPushersTrigger B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkYellowBallPushersTrigger B yellow balls", () => {
        expect(JSON.stringify(gameInfo01b.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "up" }, { x: 4, y: 5, direction: "down" }]));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        forces: [{ x: 1, y: 2, direction: 6 }],
        yellowBallPushers: [{ x: 4, y: 2 }],
        yellowBallPushersTrigger: { x: 7, y: 4 },
        yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
    };

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 111, 0, 9, 115, 9, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 111, 0, 9, 115, 0, 9, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = checkYellowPushersTrigger(backData, input01c, gameInfo01c, { ...defaultGameVars }, false);
    it("checkYellowBallPushersTrigger C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkYellowBallPushersTrigger C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkYellowBallPushersTrigger C yellow balls", () => {
        expect(JSON.stringify(gameInfo01c.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "none" }, { x: 6, y: 2, direction: "right" }]));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        yellowBallPushers: [{ x: 4, y: 2 }],
        yellowBallPushersTrigger: { x: 7, y: 4 },
        yellowBalls: [{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }],
    };

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 115, 9, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 116, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = input01d.map(row => [...row]);
    let info01d = checkYellowPushersTrigger(backData, input01d, gameInfo01d, { ...defaultGameVars }, false);
    it("checkYellowBallPushersTrigger D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("checkYellowBallPushersTrigger D info", () => {
        expect(JSON.stringify(info01d)).toBe(JSON.stringify({ updated: false }));
    });
    it("checkYellowBallPushersTrigger D yellow balls", () => {
        expect(JSON.stringify(gameInfo01d.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }]));
    });



    // Insert new tests here
});
