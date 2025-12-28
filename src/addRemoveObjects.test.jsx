import { beforeEach, describe, it, expect } from "vitest";
import { addObject, removeObject } from "./addRemoveObject.js";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("addRemoveObject", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

    // removeObject

    it("removeObject A", () => {
        let yellow = [{ x: 3, y: 3, direction: "none" }, { x: 4, y: 3, direction: "none" }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 9, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        removeObject(input, gameInfo, 3, 3);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }]));
    });

    it("removeObject B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            detonator: { x: 6, y: 2 },
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 37, 1],
            [1, 0, 2, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        removeObject(input, gameInfo, 6, 2);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(gameInfo.detonator)).toBe(JSON.stringify({ x: -1, y: -1 }));
    });

    // addObject

    it("addObject A", () => {
        let inputBack = zeroArray(5, 8);
        let yellow = [{ x: 4, y: 3, direction: "none" }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 9, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        addObject(inputBack, input, gameInfo, 3, 3, 9);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }, { x: 3, y: 3, direction: "none" }]));
    });

    it("addObject B", () => {
        let inputBack = zeroArray(5, 8);
        let yellow = [{ x: 4, y: 3, direction: "none" }];
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 165, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        addObject(inputBack, input, gameInfo, 4, 3, 165);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(JSON.stringify(yellow)).toBe(JSON.stringify([]));
        expect(JSON.stringify(gameInfo.pistons)).toBe(JSON.stringify(
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