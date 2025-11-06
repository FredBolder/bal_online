import { beforeEach, describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkForces } from "./force.js";
import { moveOrangeBalls } from "./orangeBalls.js";
import { copy2dArray } from "./utils.js";

describe("Orange ball", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    // ***** Move left *****

    it("moveOrangeBalls left A", () => {
        let orangeBalls = [{ x: 3, y: 4, direction: "left" }];
        let inputBack = zeroArray(6, 9);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 40, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 40, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveOrangeBalls(inputBack, input, { ...defaultGameInfo, orangeBalls }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(orangeBalls)).toBe(JSON.stringify([{ x: 2, y: 4, direction: "left" }]));
    });

    it("moveOrangeBalls left B", () => {
        let orangeBalls = [{ x: 3, y: 4, direction: "left" }];
        let inputBack = zeroArray(6, 9);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 5, 40, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = moveOrangeBalls(inputBack, input, { ...defaultGameInfo, orangeBalls }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(orangeBalls)).toBe(JSON.stringify([{ x: 3, y: 4, direction: "none" }]));
    });

    // ***** Move right *****

    it("moveOrangeBalls right A", () => {
        let orangeBalls = [{ x: 5, y: 4, direction: "right" }];
        let inputBack = zeroArray(6, 9);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 40, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 0, 40, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = moveOrangeBalls(inputBack, input, { ...defaultGameInfo, orangeBalls }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(orangeBalls)).toBe(JSON.stringify([{ x: 6, y: 4, direction: "right" }]));
    });

    it("moveOrangeBalls right B", () => {
        let orangeBalls = [{ x: 5, y: 4, direction: "right" }];
        let inputBack = zeroArray(6, 9);
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 0, 40, 5, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = copy2dArray(input);
        let info = moveOrangeBalls(inputBack, input, { ...defaultGameInfo, orangeBalls }, defaultGameVars);
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(false);
        expect(JSON.stringify(orangeBalls)).toBe(JSON.stringify([{ x: 5, y: 4, direction: "none" }]));
    });

    // ***** Move up by force *****

    it("Force orange ball up A", () => {
        let orangeBalls = [{ x: 5, y: 3, direction: "left" }];
        let input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 40, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 2, 0, 109, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 40, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 2, 0, 109, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let info = checkForces(input, { ...defaultGameInfo, forces: [{ x: 5, y: 5, direction: "up" }], orangeBalls: orangeBalls });
        expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
        expect(info).toBe(true);
        expect(JSON.stringify(orangeBalls)).toBe(JSON.stringify([{ x: 5, y: 2, direction: "none" }]));
    });


    // Insert new tests here
});