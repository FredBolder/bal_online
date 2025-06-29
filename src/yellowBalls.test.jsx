import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkSynchroniser, moveYellowBalls } from "./yellowBalls.js";

describe("Yellow ball", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // *** moveYellowBalls ***

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 9, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01a = [{ x: 3, y: 2, direction: "left" }];
    moveYellowBalls(input01a, yellow01a);
    it("moveYellowBalls A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });

    it("moveYellowBalls A yellow", () => {
        expect(JSON.stringify(yellow01a)).toBe(
            JSON.stringify([{ x: 2, y: 2, direction: "left" }])
        );
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 1],
        [1, 9, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 1],
        [1, 9, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01b = [{ x: 1, y: 2, direction: "left" }];
    moveYellowBalls(input01b, yellow01b);
    it("moveYellowBalls B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });

    it("moveYellowBalls B yellow", () => {
        expect(JSON.stringify(yellow01b)).toBe(
            JSON.stringify([{ x: 1, y: 2, direction: "none" }])
        );
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 9, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 0, 9, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01c = [{ x: 5, y: 2, direction: "right" }];
    moveYellowBalls(input01c, yellow01c);
    it("moveYellowBalls C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });

    it("moveYellowBalls C yellow", () => {
        expect(JSON.stringify(yellow01c)).toBe(
            JSON.stringify([{ x: 6, y: 2, direction: "right" }])
        );
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 1],
        [1, 85, 0, 9, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 1],
        [1, 85, 0, 9, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01d = [{ x: 3, y: 2, direction: "right" }];
    moveYellowBalls(input01d, yellow01d);
    it("moveYellowBalls D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });

    it("moveYellowBalls D yellow", () => {
        expect(JSON.stringify(yellow01d)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "none" }])
        );
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 9, 84, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 9, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 9, 0, 1],
        [1, 0, 2, 0, 0, 84, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01e = [
        { x: 1, y: 2, direction: "up" },
        { x: 4, y: 4, direction: "right" },
    ];
    moveYellowBalls(input01e, yellow01e);
    it("moveYellowBalls E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });

    it("moveYellowBalls E yellow", () => {
        expect(JSON.stringify(yellow01e)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 5, y: 3, direction: "up" },
            ])
        );
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 86, 0, 3, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 9, 0, 1],
        [1, 0, 2, 0, 0, 84, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 86, 0, 3, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 9, 84, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01f = [
        { x: 1, y: 2, direction: "up" },
        { x: 5, y: 3, direction: "down" },
    ];
    moveYellowBalls(input01f, yellow01f);
    it("moveYellowBalls F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });

    it("moveYellowBalls F yellow", () => {
        expect(JSON.stringify(yellow01f)).toBe(
            JSON.stringify([
                { x: 1, y: 2, direction: "down" },
                { x: 4, y: 4, direction: "left" },
            ])
        );
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 9, 86, 1],
        [1, 0, 0, 0, 0, 9, 1, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 85, 0, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 9, 86, 1],
        [1, 0, 0, 0, 0, 9, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 85, 9, 0, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01g = [
        { x: 5, y: 1, direction: "right" },
        { x: 5, y: 2, direction: "right" },
        { x: 1, y: 3, direction: "down" },
    ];
    moveYellowBalls(input01g, yellow01g);
    it("moveYellowBalls G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });

    it("moveYellowBalls G yellow", () => {
        expect(JSON.stringify(yellow01g)).toBe(
            JSON.stringify([
                { x: 5, y: 1, direction: "left" },
                { x: 5, y: 2, direction: "none" },
                { x: 2, y: 4, direction: "right" },
            ])
        );
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 84, 0, 9, 0, 85, 3, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 9, 0, 0, 1],
        [1, 0, 9, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 85, 0, 0, 0, 84, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 84, 9, 0, 0, 85, 3, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 9, 0, 0, 0, 1],
        [1, 0, 0, 9, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 85, 0, 0, 0, 84, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01h = [
        { x: 3, y: 1, direction: "right" },
        { x: 4, y: 3, direction: "left" },
        { x: 2, y: 4, direction: "right" },
    ];
    for (let i = 0; i < 13; i++) {
        moveYellowBalls(input01h, yellow01h);
    }
    it("moveYellowBalls H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });

    it("moveYellowBalls H yellow", () => {
        expect(JSON.stringify(yellow01h)).toBe(
            JSON.stringify([
                { x: 2, y: 1, direction: "right" },
                { x: 3, y: 3, direction: "none" },
                { x: 3, y: 4, direction: "none" },
            ])
        );
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 138, 9, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 9, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 139, 0, 0, 1],
        [1, 0, 2, 0, 9, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01i = [
        { x: 1, y: 2, direction: "up" },
        { x: 5, y: 3, direction: "left" },
    ];
    moveYellowBalls(input01i, yellow01i);
    it("moveYellowBalls I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("moveYellowBalls I yellow", () => {
        expect(JSON.stringify(yellow01i)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 4, y: 4, direction: "down" },
            ])
        );
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 3, 0, 0, 0, 1],
        [1, 9, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 139, 9, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 9, 0, 3, 0, 0, 0, 1],
        [1, 0, 0, 0, 9, 0, 0, 1],
        [1, 0, 0, 0, 138, 0, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow01j = [
        { x: 1, y: 2, direction: "up" },
        { x: 5, y: 3, direction: "left" },
    ];
    moveYellowBalls(input01j, yellow01j);
    it("moveYellowBalls J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("moveYellowBalls J yellow", () => {
        expect(JSON.stringify(yellow01j)).toBe(
            JSON.stringify([
                { x: 1, y: 1, direction: "up" },
                { x: 4, y: 2, direction: "up" },
            ])
        );
    });

    // *** checkSynchroniser ***

    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 9, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 2, 0, 9, 155, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 9, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 2, 0, 0, 155, 9, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow02a = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "right" }];
    let result02a = checkSynchroniser(input02a, yellow02a, 4, 3, "right");
    it("checkSynchroniser A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("checkSynchroniser A yellow", () => {
        expect(JSON.stringify(yellow02a)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 5, y: 3, direction: "right" }, { x: 5, y: 4, direction: "right" }, { x: 5, y: 5, direction: "right" }])
        );
    });
    it("checkSynchroniser A result", () => {
        expect(JSON.stringify(result02a)).toBe(JSON.stringify([1, 2, 3]));
    });

    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 9, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 2, 9, 0, 155, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = input02b.map(row => [...row]);
    let yellow02b = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 2, y: 5, direction: "right" }];
    let result02b = checkSynchroniser(input02b, yellow02b, 4, 3, "right");
    it("checkSynchroniser B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("checkSynchroniser B yellow", () => {
        expect(JSON.stringify(yellow02b)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 2, y: 5, direction: "right" }])
        );
    });
    it("checkSynchroniser B result", () => {
        expect(JSON.stringify(result02b)).toBe(JSON.stringify([]));
    });

    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 9, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 2, 0, 9, 155, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = input02c.map(row => [...row]);
    let yellow02c = [{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "up" }];
    let result02c = checkSynchroniser(input02c, yellow02c, 4, 3, "right");
    it("checkSynchroniser C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("checkSynchroniser C yellow", () => {
        expect(JSON.stringify(yellow02c)).toBe(
            JSON.stringify([{ x: 2, y: 1, direction: "none" }, { x: 3, y: 3, direction: "right" }, { x: 3, y: 4, direction: "right" }, { x: 3, y: 5, direction: "up" }])
        );
    });
    it("checkSynchroniser C result", () => {
        expect(JSON.stringify(result02c)).toBe(JSON.stringify([]));
    });

    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow02d = [{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }];
    let result02d = checkSynchroniser(input02d, yellow02d, 3, 3, "up");
    it("checkSynchroniser D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("checkSynchroniser D yellow", () => {
        expect(JSON.stringify(yellow02d)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "up" }, { x: 4, y: 2, direction: "up" }])
        );
    });
    it("checkSynchroniser D result", () => {
        expect(JSON.stringify(result02d)).toBe(JSON.stringify([0, 1]));
    });

    let input02e = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 5, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02e = input02e.map(row => [...row]);
    let yellow02e = [{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }];
    let result02e = checkSynchroniser(input02e, yellow02e, 3, 3, "up");
    it("checkSynchroniser E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("checkSynchroniser E yellow", () => {
        expect(JSON.stringify(yellow02e)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "up" }, { x: 4, y: 4, direction: "up" }])
        );
    });
    it("checkSynchroniser E result", () => {
        expect(JSON.stringify(result02e)).toBe(JSON.stringify([]));
    });

    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow02f = [{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }];
    let result02f = checkSynchroniser(input02f, yellow02f, 3, 3, "down");
    it("checkSynchroniser F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("checkSynchroniser F yellow", () => {
        expect(JSON.stringify(yellow02f)).toBe(
            JSON.stringify([{ x: 3, y: 4, direction: "down" }, { x: 4, y: 4, direction: "down" }])
        );
    });
    it("checkSynchroniser F result", () => {
        expect(JSON.stringify(result02f)).toBe(JSON.stringify([0, 1]));
    });

    let input02g = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 9, 0, 0, 1],
        [1, 0, 0, 155, 155, 0, 0, 1],
        [1, 0, 0, 28, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02g = input02g.map(row => [...row]);
    let yellow02g = [{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }];
    let result02g = checkSynchroniser(input02g, yellow02g, 3, 3, "down");
    it("checkSynchroniser G", () => {
        expect(JSON.stringify(input02g)).toBe(JSON.stringify(expectedOutput02g));
    });
    it("checkSynchroniser G yellow", () => {
        expect(JSON.stringify(yellow02g)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "down" }, { x: 4, y: 2, direction: "down" }])
        );
    });
    it("checkSynchroniser G result", () => {
        expect(JSON.stringify(result02g)).toBe(JSON.stringify([]));
    });

    let input02h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 2, 0, 0, 155, 9, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02h = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 0, 0, 9, 155, 0, 0, 1],
        [1, 2, 0, 9, 155, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let yellow02h = [{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }];
    let result02h = checkSynchroniser(input02h, yellow02h, 4, 2, "left");
    it("checkSynchroniser H", () => {
        expect(JSON.stringify(input02h)).toBe(JSON.stringify(expectedOutput02h));
    });
    it("checkSynchroniser H yellow", () => {
        expect(JSON.stringify(yellow02h)).toBe(
            JSON.stringify([{ x: 3, y: 2, direction: "left" }, { x: 3, y: 3, direction: "left" }, { x: 3, y: 4, direction: "left" }, { x: 3, y: 5, direction: "left" }])
        );
    });
    it("checkSynchroniser H result", () => {
        expect(JSON.stringify(result02h)).toBe(JSON.stringify([0, 1, 2, 3]));
    });

    let input02i = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 0, 0, 5, 155, 9, 0, 1],
        [1, 0, 0, 0, 155, 9, 0, 1],
        [1, 2, 0, 0, 155, 9, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02i = input02i.map(row => [...row]);
    let yellow02i = [{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }];
    let result02i = checkSynchroniser(input02i, yellow02i, 4, 2, "left");
    it("checkSynchroniser I", () => {
        expect(JSON.stringify(input02i)).toBe(JSON.stringify(expectedOutput02i));
    });
    it("checkSynchroniser I yellow", () => {
        expect(JSON.stringify(yellow02i)).toBe(
            JSON.stringify([{ x: 5, y: 2, direction: "left" }, { x: 5, y: 3, direction: "left" }, { x: 5, y: 4, direction: "left" }, { x: 5, y: 5, direction: "left" }])
        );
    });
    it("checkSynchroniser I result", () => {
        expect(JSON.stringify(result02i)).toBe(JSON.stringify([]));
    });


    // Insert new tests here
});