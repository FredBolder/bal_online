import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkForces } from "./force.js";
import { moveOrangeBalls } from "./orangeBalls.js";

describe("Orange ball", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** Move left *****

    let orangeBalls01a = [{ x: 3, y: 4, direction: "left" }];
    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 40, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 40, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveOrangeBalls(input01a, orangeBalls01a);
    it("moveOrangeBalls left A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("moveOrangeBalls left A info", () => {
        expect(info01a).toBe(true);
    });
    it("moveOrangeBalls left A orangeBalls", () => {
        expect(JSON.stringify(orangeBalls01a)).toBe(JSON.stringify([{ x: 2, y: 4, direction: "left" }]));
    });

    let orangeBalls01b = [{ x: 3, y: 4, direction: "left" }];
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 5, 40, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = input01b.map(row => [...row]);
    let info01b = moveOrangeBalls(input01b, orangeBalls01b);
    it("moveOrangeBalls left B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("moveOrangeBalls left B info", () => {
        expect(info01b).toBe(false);
    });
    it("moveOrangeBalls left B orangeBalls", () => {
        expect(JSON.stringify(orangeBalls01b)).toBe(JSON.stringify([{ x: 3, y: 4, direction: "none" }]));
    });

    // ***** Move right *****

    let orangeBalls02a = [{ x: 5, y: 4, direction: "right" }];
    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 40, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 40, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = moveOrangeBalls(input02a, orangeBalls02a);
    it("moveOrangeBalls right A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("moveOrangeBalls right A info", () => {
        expect(info02a).toBe(true);
    });
    it("moveOrangeBalls right A orangeBalls", () => {
        expect(JSON.stringify(orangeBalls02a)).toBe(JSON.stringify([{ x: 6, y: 4, direction: "right" }]));
    });

    let orangeBalls02b = [{ x: 5, y: 4, direction: "right" }];
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 40, 5, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = input02b.map(row => [...row]);
    let info02b = moveOrangeBalls(input02b, orangeBalls02b);
    it("moveOrangeBalls right B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("moveOrangeBalls right B info", () => {
        expect(info02b).toBe(false);
    });
    it("moveOrangeBalls right B orangeBalls", () => {
        expect(JSON.stringify(orangeBalls02b)).toBe(JSON.stringify([{ x: 5, y: 4, direction: "none" }]));
    });

    // ***** Move up by force *****

    let orangeBalls03a = [{ x: 5, y: 3, direction: "left" }];
    let input03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 40, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 2, 0, 109, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 40, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 2, 0, 109, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03a = checkForces(input03a, { ...defaultGameInfo, forces: [{ x: 5, y: 5, direction: 8 }], orangeBalls: orangeBalls03a });
    it("Force orange ball up A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Force orange ball up A info", () => {
        expect(info03a).toBe(true);
    });
    it("Force orange ball up A orangeBalls", () => {
        expect(JSON.stringify(orangeBalls03a)).toBe(JSON.stringify([{ x: 5, y: 2, direction: "none" }]));
    });


    // Insert new tests here
});