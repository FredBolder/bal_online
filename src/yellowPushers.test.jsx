import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { copy2dArray } from "./utils.js";

describe("Yellow ball pushers", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** checkYellowBallPushersTriggers *****

    it("checkYellowBallPushersTrigger A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
        };

        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 115, 0, 9, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkYellowPushersTriggers(backData, input, gameInfo, { ...defaultGameVars }, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "right" }]));
    });

    it("checkYellowBallPushersTrigger B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 4 },
            yellowBallPushers: [{ x: 4, y: 3 }],
            yellowBallPushersTriggers: [{ x: 7, y: 5 }],
            yellowBalls: [{ x: 4, y: 2, direction: "none" }, { x: 4, y: 4, direction: "none" }],
        };

        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 0, 1],
            [1, 0, 0, 0, 115, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 9, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 115, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 9, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkYellowPushersTriggers(backData, input, gameInfo, { ...defaultGameVars }, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "up" }, { x: 4, y: 5, direction: "down" }]));
    });

    it("checkYellowBallPushersTrigger C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            forces: [{ x: 1, y: 2, direction: "right" }],
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
        };

        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 9, 115, 0, 9, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkYellowPushersTriggers(backData, input, gameInfo, { ...defaultGameVars }, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "none" }, { x: 6, y: 2, direction: "right" }]));
    });

    it("checkYellowBallPushersTrigger D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }],
        };

        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkYellowPushersTriggers(backData, input, gameInfo, { ...defaultGameVars }, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: false }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }]));
    });

    // Insert new tests here
});
