import { describe, it, expect } from "vitest";
import { addObject, removeObject } from "./addRemoveObject.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("addRemoveObject", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    // removeObject

    let yellow01a = [{ x: 3, y: 3, direction: "none" }, { x: 4, y: 3, direction: "none" }];
    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBalls: yellow01a,
    };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 9, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    removeObject(input01a, gameInfo01a, 3, 3);
    it("removeObject A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("removeObject A yellowBalls", () => {
        expect(JSON.stringify(yellow01a)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }]));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        detonator: { x: 6, y: 2 },
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 37, 1],
        [1, 0, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    removeObject(input01b, gameInfo01b, 6, 2);
    it("removeObject B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("removeObject B detonator", () => {
        expect(JSON.stringify(gameInfo01b.detonator)).toBe(JSON.stringify({ x: -1, y: -1 }));
    });

    // addObject

    let yellow02a = [{ x: 4, y: 3, direction: "none" }];
    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBalls: yellow02a,
    };
    let inputBack02 = zeroArray(5, 8);
    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 9, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    addObject(inputBack02, input02a, gameInfo02a, 3, 3, 9);
    it("addObject A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("addObject A yellowBalls", () => {
        expect(JSON.stringify(yellow02a)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }, { x: 3, y: 3, direction: "none" }]));
    });

    let yellow02b = [{ x: 4, y: 3, direction: "none" }];
    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBalls: yellow02b,
    };
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 165, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    addObject(inputBack02, input02b, gameInfo02b, 4, 3, 165);
    it("addObject B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("addObject B yellowBalls", () => {
        expect(JSON.stringify(yellow02b)).toBe(JSON.stringify([]));
    });
    it("addObject B pistons", () => {
        expect(JSON.stringify(gameInfo02b.pistons)).toBe(JSON.stringify(
            [{
                x: 4,
                y: 3,
                activated: false,
                sticky: false,
                inverted: false,
                direction: "right",
                mode: "toggle",
                group: 1
            }]
        ));
    });


    // Insert new tests here
});