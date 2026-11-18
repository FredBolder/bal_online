import { beforeEach, describe, it, expect } from "vitest";
import { checkUserObjects } from "./userObjects.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("user objects", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkUserObjects 01", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            userObjects: [
                {
                    x: 6, y: 2, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 12
                },
                {
                    x: 2, y: 3, color1: "green", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 2, delIfNearSameId: true, delete: false, group: 1
                },
                {
                    x: 3, y: 3, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 1
                },
                {
                    x: 3, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 1
                },
                {
                    x: 6, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: false, delete: false, group: 1
                },
                {
                    x: 3, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 1
                },
                {
                    x: 5, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 1
                },
                {
                    x: 6, y: 5, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                    movable: true, id: 1, delIfNearSameId: true, delete: false, group: 1
                },
            ],
            greenBalls: 1,
        };
        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 0, 263, 263, 0, 0, 1, 1],
            [1, 0, 0, 263, 0, 0, 263, 1],
            [1, 2, 0, 263, 0, 263, 263, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 0, 263, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 263, 1],
            [1, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkUserObjects(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
        expect(gameInfo.userObjects).toEqual([
            {
                x: 6, y: 2, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                movable: true, id: 1, delIfNearSameId: true, delete: false, group: 12
            },
            {
                x: 2, y: 3, color1: "green", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                movable: true, id: 2, delIfNearSameId: true, delete: false, group: 1
            },
            {
                x: 6, y: 4, color1: "stone", color2: "stone", shape: 1, parameters: [50, 50, 50, 50], direction: "up",
                movable: true, id: 1, delIfNearSameId: false, delete: false, group: 1
            }
        ]);
    });



    // Insert new tests here
});