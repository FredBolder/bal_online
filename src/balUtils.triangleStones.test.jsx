import { beforeEach, describe, it, expect } from "vitest";
import { checkFalling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveOrangeBalls } from "./orangeBalls.js";
import { copy2dArray } from "./utils.js";

describe("balUtils Triangle stones", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("Triangled Walls A", () => {
        let inputBack = zeroArray(5, 7);
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 2, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    it("Triangled Walls B", () => {
        let inputBack = zeroArray(5, 7);
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 16, 1],
            [1, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 16, 1],
            [1, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    it("Triangled Walls C", () => {
        let inputBack = zeroArray(5, 7);
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 16, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    it("Triangled Walls D", () => {
        let inputBack = zeroArray(5, 7);
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 4, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    it("Triangled Walls E", () => {
        let inputBack = zeroArray(5, 7);
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 4, 5, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    it("Triangled Walls F", () => {
        let input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 2, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 15, 0, 0, 0, 1],
            [1, 1, 1, 15, 0, 0, 1],
            [1, 1, 1, 1, 15, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let inputBack = zeroArray(8, 7);
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 3, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 15, 0, 0, 0, 0, 1],
            [1, 1, 15, 0, 0, 0, 1],
            [1, 1, 1, 15, 0, 0, 1],
            [1, 1, 1, 1, 15, 2, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        let info;
        for (let i = 0; i < 5; i++) {
            info = checkFalling(inputBack, input, defaultGameInfo, defaultGameVars);
        }
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    // GRAVITY UP

    it("Triangled Walls Gravity Up A", () => {
        let inputBack = zeroArray(5, 8);

        let gameInfo = { ...defaultGameInfo, blueBall: { x: 6, y: 2 }, orangeBalls: [{ x: 2, y: 2, direction: "none" }] };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 0, 0, 0, 18, 1],
            [1, 0, 40, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 40, 0, 2, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(
            JSON.stringify({ x: 5, y: 1 })
        );
        expect(JSON.stringify(gameInfo.orangeBalls)).toBe(
            JSON.stringify([{ x: 3, y: 1, direction: "upright" }])
        );
    });

    // Orange ball continues after 
    it("Triangled Walls Gravity Up B", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 5, y: 1 }, orangeBalls: [{ x: 3, y: 1, direction: "upright" }] };
        let inputBack = zeroArray(5, 8);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 40, 0, 2, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 0, 40, 2, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveOrangeBalls(inputBack, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.orangeBalls)).toBe(
            JSON.stringify([{ x: 4, y: 1, direction: "right" }])
        );
    });

    it("Triangled Walls Gravity Up C", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, orangeBalls: [{ x: 6, y: 2, direction: "none" }] };
        let inputBack = zeroArray(5, 8);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 0, 0, 0, 18, 1],
            [1, 0, 2, 0, 0, 0, 40, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 2, 0, 40, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkFalling(inputBack, input, gameInfo, { ...defaultGameVars, gravity: "up" });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(info)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
        expect(JSON.stringify(gameInfo.blueBall)).toBe(
            JSON.stringify({ x: 3, y: 1 })
        );
        expect(JSON.stringify(gameInfo.orangeBalls)).toBe(
            JSON.stringify([{ x: 5, y: 1, direction: "upleft" }])
        );
    });

    // Orange ball continues after 
    it("Triangled Walls Gravity Up D", () => {
        let gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, orangeBalls: [{ x: 5, y: 1, direction: "upleft" }] };
        let inputBack = zeroArray(5, 8);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 2, 0, 40, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 17, 2, 40, 0, 18, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveOrangeBalls(inputBack, input, gameInfo, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(gameInfo.orangeBalls)).toBe(
            JSON.stringify([{ x: 4, y: 1, direction: "left" }])
        );
    });

    // Insert new tests here
});        