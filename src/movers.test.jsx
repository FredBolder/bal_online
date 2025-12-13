import { beforeEach, describe, it, expect } from "vitest";
import { checkMovers, moverIsMovingBlueBall } from "./movers.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("movers", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // checkMovers

    it("checkMovers A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 3, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 5, y: 5, direction: "right", activeSides: ["top"], counter: 0 }
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
        let info = checkMovers(input, gameInfo, defaultGameVars);
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
                { x: 1, y: 5, direction: "left", activeSides: ["top"], counter: 0 },
                { x: 3, y: 5, direction: "left", activeSides: ["top"], counter: 0 },
                { x: 5, y: 5, direction: "upleft", activeSides: ["top"], counter: 0 }
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
        let info = checkMovers(input, gameInfo, defaultGameVars);
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
                { x: 1, y: 4, direction: "down", activeSides: ["top"], counter: 0 },
                { x: 3, y: 4, direction: "down", activeSides: ["top"], counter: 0 },
                { x: 5, y: 4, direction: "up", activeSides: ["top"], counter: 0 }
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
        let info = checkMovers(input, gameInfo, defaultGameVars);
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
                { x: 1, y: 4, direction: "upright", activeSides: ["top"], counter: 0 },
                { x: 3, y: 4, direction: "down", activeSides: ["top"], counter: 0 },
                { x: 5, y: 4, direction: "down", activeSides: ["top"], counter: 0 }
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
        let info = checkMovers(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
        expect(gameInfo.pinkBalls).toEqual([{ x: 5, y: 5, delete: false, skipFalling: 0 }]);
    });

    it("checkMovers E", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 3, y: 5, direction: "right", activeSides: ["top"], counter: 5 },
                { x: 5, y: 5, direction: "right", activeSides: ["top"], counter: 3 }
            ],
            pinkBalls: [{ x: 3, y: 4, delete: false, counter: 0 }]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 203, 0, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 0, 0, 203, 5, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo, { ...defaultGameVars, moverCountTo: 5 });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
        expect(gameInfo.pinkBalls).toEqual([{ x: 4, y: 4, delete: false, counter: 0 }]);
    });

    it("checkMovers F", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 4, direction: "right", activeSides: ["bottom"], counter: 0 },
                { x: 3, y: 4, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 5, y: 4, direction: "right", activeSides: ["bottom"], counter: 0 }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 2, 0, 5, 0, 5, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 0, 2, 5, 0, 0, 5, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 2, y: 5 });
    });

    it("checkMovers G", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            greenBalls: 1,
            movers: [
                { x: 4, y: 2, direction: "right", activeSides: ["right"], counter: 0 },
                { x: 4, y: 5, direction: "left", activeSides: ["right"], counter: 0 },
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 5, 0, 0, 1],
            [1, 0, 0, 0, 178, 5, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 178, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 5, 0, 0, 1],
            [1, 0, 0, 0, 178, 0, 5, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 178, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 3, y: 5 });
    });

    it("checkMovers H", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 5, y: 5 },
            greenBalls: 1,
            movers: [
                { x: 4, y: 2, direction: "right", activeSides: ["right", "top"], counter: 0 },
                { x: 4, y: 5, direction: "upleft", activeSides: ["right"], counter: 0 },
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 5, 0, 0, 1],
            [1, 0, 0, 0, 178, 5, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 178, 2, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 5, 0, 1],
            [1, 0, 0, 0, 178, 0, 5, 1],
            [1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 0, 0, 1],
            [1, 0, 0, 0, 178, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkMovers(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 4, y: 4 });
    });

    // moverIsMovingBlueBall

    it("moverIsMovingBlueBall A", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 3, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 5, y: 5, direction: "right", activeSides: ["top"], counter: 0 }
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

        let info = moverIsMovingBlueBall(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    it("moverIsMovingBlueBall B", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "left", activeSides: ["top"], counter: 0 },
                { x: 3, y: 5, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 5, y: 5, direction: "right", activeSides: ["top"], counter: 0 }
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

        let info = moverIsMovingBlueBall(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    it("moverIsMovingBlueBall C", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 4 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 5, direction: "right", activeSides: ["top"], counter: 1 },
                { x: 3, y: 5, direction: "right", activeSides: ["top"], counter: 1 },
                { x: 5, y: 5, direction: "right", activeSides: ["top"], counter: 1 }
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

        let info = moverIsMovingBlueBall(input, gameInfo, { ...defaultGameVars, moverCountTo: 5 });
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(false);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 4 });
    });

    it("moverIsMovingBlueBall D", () => {
        let gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 1, y: 5 },
            greenBalls: 1,
            movers: [
                { x: 1, y: 4, direction: "right", activeSides: ["bottom"], counter: 0 },
                { x: 3, y: 4, direction: "right", activeSides: ["top"], counter: 0 },
                { x: 5, y: 4, direction: "right", activeSides: ["bottom"], counter: 0 }
            ]
        };
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 178, 1, 178, 1, 178, 1, 1],
            [1, 2, 0, 5, 0, 5, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);

        let info = moverIsMovingBlueBall(input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toBe(true);
        expect(gameInfo.blueBall).toEqual({ x: 1, y: 5 });
    });



    // Insert new tests here
});