import { beforeEach, describe, it, expect } from "vitest";
import { checkMovers, moverCanMoveBlueBall } from "./movers.js";
import { initGameInfo } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("movers", () => {
    let defaultGameInfo;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
    });

    // checkMovers

    it("checkMovers A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right" },
                { x: 3, y: 5, direction: "right" },
                { x: 5, y: 5, direction: "right" }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 4, 0, 5, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 4 });
    });

    it("checkMovers B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "left" },
                { x: 3, y: 5, direction: "left" },
                { x: 5, y: 5, direction: "upleft" }
            ],
            yellowBalls: [{ x: 5, y: 4, direction: "none" }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 9, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 9, 0, 0, 1],
            [1, 2, 4, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
        expect(gameInfo.yellowBalls).toEqual([{ x: 4, y: 3, direction: "none" }]);
    });

    it("checkMovers C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 4, direction: "down" },
                { x: 3, y: 4, direction: "down" },
                { x: 5, y: 4, direction: "up" }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 2, 0, 4, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
    });

    it("checkMovers D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 3 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 4, direction: "upright" },
                { x: 3, y: 4, direction: "down" },
                { x: 5, y: 4, direction: "down" }
            ],
            pinkBalls: [{ x: 5, y: 3, delete: false, skipFalling: 0 }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 203, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 0, 0, 4, 0, 203, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
        expect(gameInfo.pinkBalls).toEqual([{ x: 5, y: 5, delete: false, skipFalling: 0 }]);
    });

    // moverCanMoveBlueBall

    it("moverCanMoveBlueBall A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right" },
                { x: 3, y: 5, direction: "right" },
                { x: 5, y: 5, direction: "right" }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);

        let info = moverCanMoveBlueBall(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    it("moverCanMoveBlueBall B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "left" },
                { x: 3, y: 5, direction: "right" },
                { x: 5, y: 5, direction: "right" }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 4, 0, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);

        let info = moverCanMoveBlueBall(input, gameInfo);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    // Insert new tests here
});