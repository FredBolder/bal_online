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
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
        };

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 9, 0, 115, 0, 9, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkYellowPushersTriggers(backData, input, gameInfo, defaultGameVars, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "right" }]));
    });

    it("checkYellowBallPushersTrigger B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 4 },
            yellowBallPushers: [{ x: 4, y: 3 }],
            yellowBallPushersTriggers: [{ x: 7, y: 5 }],
            yellowBalls: [{ x: 4, y: 2, direction: "none" }, { x: 4, y: 4, direction: "none" }],
        };

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 0, 1],
            [1, 0, 0, 0, 115, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 9, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 115, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 9, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkYellowPushersTriggers(backData, input, gameInfo, defaultGameVars, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "up" }, { x: 4, y: 5, direction: "down" }]));
    });

    it("checkYellowBallPushersTrigger C", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            forces: [{ x: 1, y: 2, direction: "right" }],
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "none" }, { x: 5, y: 2, direction: "none" }],
        };

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 111, 0, 9, 115, 0, 9, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkYellowPushersTriggers(backData, input, gameInfo, defaultGameVars, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: true }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "none" }, { x: 6, y: 2, direction: "right" }]));
    });

    it("checkYellowBallPushersTrigger D", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 7, y: 3 },
            yellowBallPushers: [{ x: 4, y: 2 }],
            yellowBallPushersTriggers: [{ x: 7, y: 4 }],
            yellowBalls: [{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }],
        };

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 9, 115, 9, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 116, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkYellowPushersTriggers(backData, input, gameInfo, defaultGameVars, false);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({ updated: false }));
        expect(JSON.stringify(gameInfo.yellowBalls)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "up" }, { x: 5, y: 2, direction: "down" }]));
    });

    // Insert new tests here
});
