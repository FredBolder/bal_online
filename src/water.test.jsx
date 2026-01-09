import { describe, it, expect } from "vitest";
import { getConnectedWater } from "./water.js";


describe("Water getConnectedWater", () => {
    it("getConnectedWater A", () => {
        let inputBack = [
            [0, 0, 0, 0, 0],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
        ];

        const expectedSet = new Set([
            "3,1", "4,1",
            "3,2", "4,2",
            "3,3", "4,3",
            "3,4", "4,4",
        ]);

        let info = getConnectedWater(inputBack, 4, 1);
        expect(info).toEqual(expectedSet);
    });

    it("getConnectedWater B", () => {
        let inputBack = [
            [0, 0, 0, 0, 0],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
            [23, 23, 0, 23, 23],
        ];

        const expectedSet = new Set([
            "0,1", "1,1",
            "0,2", "1,2",
            "0,3", "1,3",
            "0,4", "1,4",
        ]);

        let info = getConnectedWater(inputBack, 0, 1);
        expect(info).toEqual(expectedSet);
    });

    it("getConnectedWater C", () => {
        let inputBack = [
            [0, 0, 0, 0, 0],
            [23, 23, 23, 0, 23],
            [23, 23, 0, 23, 23],
            [23, 0, 0, 23, 23],
            [23, 23, 0, 23, 23],
        ];

        const expectedSet = new Set([
            "0,1", "1,1", "2,1",
            "0,2", "1,2",
            "0,3",
            "0,4", "1,4",
        ]);

        let info = getConnectedWater(inputBack, 0, 1);
        expect(info).toEqual(expectedSet);
    });

    // Insert new tests here
});