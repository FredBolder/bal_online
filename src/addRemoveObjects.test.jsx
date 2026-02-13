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
        const inputBack = zeroArray(5, 8);
        const yellow = [{ x: 3, y: 3, direction: "none" }, { x: 4, y: 3, direction: "none" }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 9, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        removeObject(inputBack, input, gameInfo, 3, 3);
        expect(input).toEqual(expectedOutput);
        expect(yellow).toEqual([{ x: 4, y: 3, direction: "none" }]);
    });

    it("removeObject B", () => {
        const inputBack = zeroArray(5, 8);
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            detonator: { x: 6, y: 2 },
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 37, 1],
            [1, 0, 2, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        removeObject(inputBack, input, gameInfo, 6, 2);
        expect(input).toEqual(expectedOutput);
        expect(gameInfo.detonator).toEqual({ x: -1, y: -1 });
    });

    // addObject

    it("addObject A", () => {
        const inputBack = zeroArray(5, 8);
        const yellow = [{ x: 4, y: 3, direction: "none" }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 9, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        addObject(inputBack, input, gameInfo, 3, 3, 9);
        expect(input).toEqual(expectedOutput);
        expect(yellow).toEqual([{ x: 4, y: 3, direction: "none" }, { x: 3, y: 3, direction: "none" }]);
    });

    it("addObject B", () => {
        const inputBack = zeroArray(5, 8);
        const yellow = [{ x: 4, y: 3, direction: "none" }];
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 3 },
            yellowBalls: yellow,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 9, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 165, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        addObject(inputBack, input, gameInfo, 4, 3, 165);
        expect(input).toEqual(expectedOutput);
        expect(yellow).toEqual([]);
        expect(gameInfo.pistons).toEqual(
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
        );
    });


    // Insert new tests here
});