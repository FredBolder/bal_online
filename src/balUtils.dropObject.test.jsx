import { beforeEach, describe, expect, test } from "vitest";
import { dropObject } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils dropObject", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    test("dropObject A", () => {
        const gameInfo = { ...defaultGameInfo, hasWhiteBall: true, blueBall: { x: 2, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "whiteBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.hasWhiteBall).toBe(false);
    });

    test("dropObject B", () => {
        const gameInfo = { ...defaultGameInfo, hasWhiteBall: true, blueBall: { x: 5, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "whiteBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.hasWhiteBall).toBe(false);
    });

    test("dropObject C", () => {
        const gameInfo = { ...defaultGameInfo, hasWhiteBall: false, blueBall: { x: 5, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = dropObject(input, gameInfo, "whiteBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(false);
        expect(gameInfo.hasWhiteBall).toBe(false);
    });

    test("dropObject D", () => {
        const gameInfo = { ...defaultGameInfo, hasYellowBall: true, blueBall: { x: 4, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 9, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "yellowBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.yellowBalls).toEqual([{ x: 5, y: 3, direction: "none" }]);
        expect(gameInfo.hasYellowBall).toBe(false);
    });

    test("dropObject E", () => {
        const gameInfo = { ...defaultGameInfo, yellowBalls: [{ x: 4, y: 2, direction: "none" }], hasYellowBall: true, blueBall: { x: 4, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 1],
            [1, 0, 0, 0, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 1],
            [1, 0, 0, 0, 2, 9, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "yellowBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 2, direction: "none" }, { x: 5, y: 3, direction: "none" }]);
        expect(gameInfo.hasYellowBall).toBe(false);
    });

    test("dropObject F", () => {
        const gameInfo = { ...defaultGameInfo, hasLightBlueBall: true, blueBall: { x: 2, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 5, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "lightBlueBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.hasLightBlueBall).toBe(false);
    });

    test("dropObject G", () => {
        const gameInfo = { ...defaultGameInfo, hasLightBlueBall: true, blueBall: { x: 2, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 2, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = dropObject(input, gameInfo, "lightBlueBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(false);
        expect(gameInfo.hasLightBlueBall).toBe(true);
    });

    test("dropObject H", () => {
        const gameInfo = { ...defaultGameInfo, hasWhiteBall: true, hasPurpleBall: true, blueBall: { x: 5, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 28, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "purpleBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.hasPurpleBall).toBe(false);
        expect(gameInfo.hasWhiteBall).toBe(true);
    });

    test("dropObject I", () => {
        const gameInfo = { ...defaultGameInfo, hasPinkBall: true, blueBall: { x: 2, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 4, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 203, 2, 4, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = dropObject(input, gameInfo, "pinkBall");
        expect(input).toEqual(expectedOutput);
        expect(info.update).toBe(true);
        expect(gameInfo.hasPinkBall).toBe(false);
        expect(gameInfo.pinkBalls).toEqual([{ x: 1, y: 3, delete: false, counter: 0 }]);
    });

    // Insert new tests here
});