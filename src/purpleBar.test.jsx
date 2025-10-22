import { beforeEach, describe, it, expect } from "vitest";
import { jump, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { movePurpleBar } from "./purpleBar.js";
import { copy2dArray } from "./utils.js";

describe("Purple bar", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** Horizontal purple bar *****

    it("Horizontal purple bar A", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Horizontal purple bar B", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar C", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 2 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, gameInfo, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });

    it("Horizontal purple bar D", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 0, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar E", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 100, 102, 102, 101, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Horizontal purple bar F", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 100, 102, 102, 101, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar G", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar H", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 100, 102, 102, 101, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 100, 102, 102, 101, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Horizontal purple bar I", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 100, 102, 102, 101, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar J", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 93, 0, 0, 1],
            [1, 0, 2, 100, 102, 102, 101, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar K", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: "down" }] }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar L", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 100, 102, 102, 101, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: "up" }] }, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar M", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [111, 0, 0, 100, 102, 102, 101, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: "right" }] }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal purple bar N", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 100, 102, 102, 101, 0, 112],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: "left" }] }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });


    // ***** Vertical purple bar *****

    it("Vertical purple bar A", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Vertical purple bar B", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar C", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, gameInfo, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    it("Vertical purple bar D", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar E", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 103, 0, 0, 0, 0, 1],
            [1, 0, 0, 102, 0, 0, 0, 0, 1],
            [1, 0, 0, 102, 0, 0, 0, 0, 1],
            [1, 0, 0, 104, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Vertical purple bar F", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 4, 104, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar G", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar H", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 2, 104, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 103, 0, 0, 1],
            [1, 0, 0, 0, 0, 102, 0, 0, 1],
            [1, 0, 0, 0, 0, 102, 0, 0, 1],
            [1, 0, 0, 2, 0, 104, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Vertical purple bar I", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: "down" }] }, { ...defaultGameVars }, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar J", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: "up" }] }, { ...defaultGameVars }, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar K", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 111, 0, 0, 104, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: "right" }] }, { ...defaultGameVars }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical purple bar L", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 2, 104, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: "left" }] }, { ...defaultGameVars }, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    // GRAVITY UP

    // ***** Horizontal purple bar *****

    it("Horizontal purple bar Gravity Up A", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 100, 102, 102, 101, 2, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = movePurpleBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 2 } }, { ...defaultGameVars, gravity: "up" }, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });


    // ***** Vertical purple bar *****

    it("Vertical purple bar Gravity Up A", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 103, 0, 0, 0, 1],
            [1, 0, 0, 0, 102, 0, 0, 0, 1],
            [1, 0, 0, 0, 104, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = jump(backData, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(JSON.stringify({
            eating: false,
            freezeTime: -1,
            player: true,
            sound: "",
        }));
    });


    // Insert new tests here
});