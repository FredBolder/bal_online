import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveLightBlueBar } from "./lightBlueBar.js";
import { copy2dArray } from "./utils.js";

describe("Light blue bar", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all


    // ***** Horizontal light blue bar *****

    it("Horizontal light blue bar A", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar B", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar C", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 2 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, gameInfo, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    it("Horizontal light blue bar D", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 0, 0, 4, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar E", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 126, 128, 128, 127, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Horizontal light blue bar F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 4, 126, 128, 128, 127, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar G", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 4, 0, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar H", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 126, 128, 128, 127, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 126, 128, 128, 127, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Horizontal light blue bar I", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 126, 128, 128, 127, 4, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar J", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 93, 0, 0, 1],
            [1, 0, 2, 126, 128, 128, 127, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar K", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: "down" }] }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar L", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 126, 128, 128, 127, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: "up" }] }, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar M", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [111, 0, 0, 126, 128, 128, 127, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: "right" }] }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Horizontal light blue bar N", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 126, 128, 128, 127, 0, 112],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: "left" }] }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });


    // ***** Vertical light blue bar *****

    it("Vertical light blue bar A", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
    });

    it("Vertical light blue bar B", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar C", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = moveLightBlueBar(backData, input, gameInfo, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    it("Vertical light blue bar D", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 4, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar E", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar F", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 4, 130, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar G", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 4, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar H", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 2, 130, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar I", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 110, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: "down" }] }, defaultGameVars, "up");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar J", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 0, 1],
            [1, 0, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 130, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 109, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: "up" }] }, defaultGameVars, "down");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar K", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 111, 0, 0, 130, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: "right" }] }, defaultGameVars, "left");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    it("Vertical light blue bar L", () => {
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 129, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 0, 128, 0, 0, 0, 1],
            [1, 0, 0, 2, 130, 0, 0, 112, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = moveLightBlueBar(backData, input, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: "left" }] }, defaultGameVars, "right");
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
    });

    // Insert new tests here
});