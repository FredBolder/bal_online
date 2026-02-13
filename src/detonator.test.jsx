import { beforeEach, describe, it, expect } from "vitest";
import { pushObject, zeroArray } from "./balUtils.js";
import { checkDetonator } from "./detonator.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("detonator", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const inputBack_7_7 = zeroArray(7, 7);

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("checkDetonator A", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 } };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 36, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 38, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = checkDetonator(inputBack_7_7, input, gameInfo, defaultGameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: true, explosion: true });
    });

    it("checkDetonator B", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 }, hasPropeller: true };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 36, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = copy2dArray(input);
        const info = checkDetonator(inputBack_7_7, input, gameInfo, defaultGameVars, false);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ updated: false, explosion: false });
    });

    it("checkDetonator C (via pushObject)", () => {
        const gameInfo = { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, detonator: { x: 5, y: 5 }, hasPropeller: true };
        const input = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 36, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const expectedOutput = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 4, 0, 0, 0, 0, 1],
            [1, 38, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 37, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const info = pushObject(inputBack_7_7, input, gameInfo, defaultGameVars);
        expect(input).toEqual(expectedOutput);
        expect(info).toEqual({ player: true, sound: "explosion" });
    });

    // Insert new tests here
});