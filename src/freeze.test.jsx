import { beforeEach, describe, expect, test } from "vitest";
import { freezeWater } from "./freeze.js";
import { initGameInfo } from "./gameInfo.js";

describe("freeze", () => {
    let defaultGameInfo;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });  

    test("freezeWater A", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 1, y: 2 }, greenBalls: 1 };
        const backData = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 20, 20, 20, 0, 0],
            [0, 0, 23, 23, 23, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const expectedBackData = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 20, 20, 0, 0],
            [0, 0, 23, 23, 23, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 1, 206, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        freezeWater(backData, input, gameInfo, "downright");
        expect(input).toEqual(expectedOutput);
        expect(backData).toEqual(expectedBackData);
        expect(gameInfo.waterWithIceObjects).toEqual([{ x: 2, y: 3, status: 0, objectNumber: 20 }]);
    });

    test("freezeWater B", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, greenBalls: 1, hasDivingGlasses: true };
        const backData = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 20, 20, 20, 0, 0],
            [0, 0, 23, 23, 23, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const expectedBackData = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 20, 0, 20, 0, 0],
            [0, 0, 23, 23, 23, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 206, 0, 1, 1],
            [1, 1, 0, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        freezeWater(backData, input, gameInfo, "up");
        expect(input).toEqual(expectedOutput);
        expect(backData).toEqual(expectedBackData);
        expect(gameInfo.waterWithIceObjects).toEqual([{ x: 3, y: 3, status: 0, objectNumber: 20 }]);
    });

    // Insert new tests here
});