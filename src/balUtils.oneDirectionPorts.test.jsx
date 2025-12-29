import { beforeEach, describe, it, expect } from "vitest";
import {
    moveLeft,
    moveRight,
    jump,
    pushObject,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils One direction ports", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const inputBack_4_7 = zeroArray(4, 7);
    const inputBack_5_7 = zeroArray(5, 7);

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("One direction ports A", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 0, 2, 10, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 0, 0, 10, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveRight(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: true, sound: "" });
    });

    it("One direction ports B", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 11, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 2, 11, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveLeft(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info.player).toBe(true);
    });

    it("One direction ports C", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 2, 11, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 2, 11, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveRight(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info.player).toBe(false);
    });

    it("One direction ports D", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 10, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 10, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveLeft(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info.player).toBe(false);
    });

    it("One direction ports E", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 2, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = jump(inputBack_5_7, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 1 });
    });

    it("One direction ports F", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 4, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 4, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = jump(inputBack_5_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: false, sound: "" });
    });

    it("One direction ports G", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = pushObject(inputBack_5_7, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 3 });
    });

    it("One direction ports H", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = pushObject(inputBack_5_7, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: false, sound: "" });
    });

    it("One direction ports I", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 1],
            [1, 1, 88, 1, 87, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 1],
            [1, 1, 88, 1, 87, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = pushObject(inputBack_5_7, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: false, sound: "" });
    });

    it("One direction ports J", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 88, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 88, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = jump(inputBack_5_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: false, sound: "" });
    });

    // GRAVITY UP

    it("One direction ports Gravity Up A", () => {

        let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 1 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 2, 0, 0, 0, 1],
            [1, 1, 88, 1, 88, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 88, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = jump(inputBack_5_7, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 3 });
    });

    it("One direction ports Gravity Up B", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 2, 0, 0, 0, 1],
            [1, 1, 87, 1, 88, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = pushObject(inputBack_5_7, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "" });
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 1 });
    });

    // Insert new tests here
});
