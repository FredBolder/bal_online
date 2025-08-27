import { describe, it, expect } from "vitest";
import { checkFalling, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { moveOrangeBalls } from "./orangeBalls.js";
import { copy2dArray } from "./utils.js";

describe("balUtils Triangle stones", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01abcde = zeroArray(5, 7);
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 2, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkFalling(inputBack01abcde, input01a, { ...defaultGameInfo }, { ...defaultGameVars });
    it("Triangled Walls A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Triangled Walls A info", () => {
        expect(JSON.stringify(info01a)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 16, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 16, 1],
        [1, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkFalling(inputBack01abcde, input01b, { ...defaultGameInfo }, { ...defaultGameVars });
    it("Triangled Walls B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Triangled Walls B info", () => {
        expect(JSON.stringify(info01b)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 16, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = copy2dArray(input01c);
    let info01c = checkFalling(inputBack01abcde, input01c, { ...defaultGameInfo }, { ...defaultGameVars });
    it("Triangled Walls C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Triangled Walls C info", () => {
        expect(JSON.stringify(info01c)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 4, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = checkFalling(inputBack01abcde, input01d, { ...defaultGameInfo }, { ...defaultGameVars });
    it("Triangled Walls D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Triangled Walls D info", () => {
        expect(JSON.stringify(info01d)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 4, 5, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 0, 0, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = copy2dArray(input01e);
    let info01e = checkFalling(inputBack01abcde, input01e, { ...defaultGameInfo }, { ...defaultGameVars });
    it("Triangled Walls E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Triangled Walls E info", () => {
        expect(JSON.stringify(info01e)).toBe(
            JSON.stringify({ update: false, sound: "" })
        );
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 15, 0, 0, 0, 1],
        [1, 1, 1, 15, 0, 0, 1],
        [1, 1, 1, 1, 15, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let inputBack01f = zeroArray(8, 7);
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 3, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 15, 0, 0, 0, 0, 1],
        [1, 1, 15, 0, 0, 0, 1],
        [1, 1, 1, 15, 0, 0, 1],
        [1, 1, 1, 1, 15, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
    ];
    let info01f;
    for (let i = 0; i < 5; i++) {
        info01f = checkFalling(inputBack01f, input01f, { ...defaultGameInfo }, { ...defaultGameVars });
    }
    it("Triangled Walls F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Triangled Walls F info", () => {
        expect(JSON.stringify(info01f)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });

    // GRAVITY UP

    let inputBack02 = zeroArray(5, 8);

    let gameInfo02a = { ...defaultGameInfo, blueBall: { x: 6, y: 2 }, orangeBalls: [{ x: 2, y: 2, direction: "none" }] };
    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 0, 0, 0, 18, 1],
        [1, 0, 40, 0, 0, 0, 2, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 40, 0, 2, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = checkFalling(inputBack02, input02a, gameInfo02a, { ...defaultGameVars, gravity: "up" });
    it("Triangled Walls Gravity Up A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Triangled Walls Gravity Up A info", () => {
        expect(JSON.stringify(info02a)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });
    it("Triangled Walls Gravity Up A blueBall", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(
            JSON.stringify({ x: 5, y: 1 })
        );
    });
    it("Triangled Walls Gravity Up A orangeBalls", () => {
        expect(JSON.stringify(gameInfo02a.orangeBalls)).toBe(
            JSON.stringify([{ x: 3, y: 1, direction: "upright" }])
        );
    });

    // Orange ball continues after 02a
    let gameInfo02b = { ...defaultGameInfo, blueBall: { x: 5, y: 1 }, orangeBalls: [{ x: 3, y: 1, direction: "upright" }] };
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 40, 0, 2, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 0, 40, 2, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02b = moveOrangeBalls(input02b, gameInfo02b.orangeBalls);
    it("Triangled Walls Gravity Up B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Triangled Walls Gravity Up B info", () => {
        expect(info02b).toBe(true);
    });
    it("Triangled Walls Gravity Up B orangeBalls", () => {
        expect(JSON.stringify(gameInfo02b.orangeBalls)).toBe(
            JSON.stringify([{ x: 4, y: 1, direction: "right" }])
        );
    });

    let gameInfo02c = { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, orangeBalls: [{ x: 6, y: 2, direction: "none" }] };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 0, 0, 0, 18, 1],
        [1, 0, 2, 0, 0, 0, 40, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 2, 0, 40, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02c = checkFalling(inputBack02, input02c, gameInfo02c, { ...defaultGameVars, gravity: "up" });
    it("Triangled Walls Gravity Up C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Triangled Walls Gravity Up C info", () => {
        expect(JSON.stringify(info02c)).toBe(
            JSON.stringify({ update: true, sound: "" })
        );
    });
    it("Triangled Walls Gravity Up C blueBall", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(
            JSON.stringify({ x: 3, y: 1 })
        );
    });
    it("Triangled Walls Gravity Up C orangeBalls", () => {
        expect(JSON.stringify(gameInfo02c.orangeBalls)).toBe(
            JSON.stringify([{ x: 5, y: 1, direction: "upleft" }])
        );
    });

    // Orange ball continues after 02c
    let gameInfo02d = { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, orangeBalls: [{ x: 5, y: 1, direction: "upleft" }] };
    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 2, 0, 40, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 17, 2, 40, 0, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02d = moveOrangeBalls(input02d, gameInfo02d.orangeBalls);
    it("Triangled Walls Gravity Up D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Triangled Walls Gravity Up D info", () => {
        expect(info02d).toBe(true);
    });
    it("Triangled Walls Gravity Up D orangeBalls", () => {
        expect(JSON.stringify(gameInfo02d.orangeBalls)).toBe(
            JSON.stringify([{ x: 4, y: 1, direction: "left" }])
        );
    });




    // Insert new tests here
});        