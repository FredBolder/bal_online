import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkCopiers } from "./copiers.js";
import { copy2dArray } from "./utils.js";


describe("Copiers", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 1, y: 3 }, copiers: [{ x: 5, y: 3 }] };
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 4, 0, 0, 1],
        [1, 2, 0, 0, 0, 97, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 4, 0, 97, 0, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkCopiers(input01a, gameInfo01a);
    it("checkCopiers A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("checkCopiers A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ updated: true }));
    });

    let gameInfo01b = { ...defaultGameInfo, blueBall: { x: 1, y: 3 }, copiers: [{ x: 5, y: 3 }] };
    gameInfo01b.redBalls.push({ smart: 1, x: 5, y: 2, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 93, 0, 0, 1],
        [1, 2, 0, 4, 0, 97, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 4, 93, 97, 0, 93, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkCopiers(input01b, gameInfo01b);
    it("checkCopiers B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("checkCopiers B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ updated: true }));
    });
    it("checkCopiers B red balls", () => {
        expect(gameInfo01b.redBalls.length).toBe(2);
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 1, y: 3 }, copiers: [{ x: 5, y: 3 }] };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 4, 0, 0, 1],
        [1, 2, 0, 0, 4, 97, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = copy2dArray(input01c);
    let info01c = checkCopiers(input01c, gameInfo01c);
    it("checkCopiers C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("checkCopiers C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ updated: false }));
    });


    // Insert new tests here
});