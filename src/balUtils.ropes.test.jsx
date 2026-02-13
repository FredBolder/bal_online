import { beforeEach, describe, it, expect } from "vitest";
import { jump, jumpLeftOrRight, pushObject } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("Ropes", () => {
    let defaultGameInfo;
    let defaultGameVars;

    const inputBackHorizontal = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 80, 80, 80, 80, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const inputBackVertical = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 137, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // *** Horizontal ropes ***

    it("Horizontal rope A", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 2 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBackHorizontal, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Horizontal rope B", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = jump(inputBackHorizontal, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 2 });
    });

    it("Horizontal rope C", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBackHorizontal, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 5 });
    });

    it("Horizontal rope D", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, yellowBalls: [{ x: 3, y: 5, direction: "none" }] };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 9, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 9, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBackHorizontal, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 5 });
        expect(gameInfo.yellowBalls).toEqual([{ x: 3, y: 6, direction: "down" }]);
    });

    it("Horizontal rope E", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = jumpLeftOrRight(inputBackHorizontal, input, gameInfo, defaultGameVars, "right");
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: false, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Horizontal rope F", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, hasCoilSpring: true };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = jumpLeftOrRight(inputBackHorizontal, input, gameInfo, defaultGameVars, "right");
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
    });

    it("Horizontal rope G", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = jumpLeftOrRight(inputBackHorizontal, input, gameInfo, defaultGameVars, "left");
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: false, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Horizontal rope H", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, hasCoilSpring: true };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = jumpLeftOrRight(inputBackHorizontal, input, gameInfo, defaultGameVars, "left");
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
    });

    // *** Vertical ropes ***

    it("Vertical rope A", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 3 } };
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBackVertical, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 4 });
    });

    it("Vertical rope B", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 4 } };
        const input = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBackVertical, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 5 });
    });

    // Insert new tests here
});