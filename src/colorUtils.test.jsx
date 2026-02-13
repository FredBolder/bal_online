import { describe, it, expect } from "vitest";
import { deleteColorsAtColumn, deleteColorsAtRow, insertColorsAtColumn, insertColorsAtRow } from "./colorUtils.js";

describe("colorUtils", () => {
    const colors01a = [
        { x: 10, y: 3, w: 30, h: 4, color: "green" },
        { x: 0, y: 2, w: 5, h: 1, color: "blue" },
        { x: 5, y: 0, w: 10, h: 5, color: "red" }
    ];
    deleteColorsAtRow(colors01a, 2);
    it("deleteColorsAtRow A", () => {
        expect(JSON.stringify(colors01a)).toBe(JSON.stringify([
            { x: 10, y: 2, w: 30, h: 4, color: "green" },
            { x: 5, y: 0, w: 10, h: 4, color: "red" }
        ]));
    });

    const colors02a = [
        { x: 3, y: 10, w: 4, h: 30, color: "green" },
        { x: 2, y: 0, w: 1, h: 5, color: "blue" },
        { x: 0, y: 5, w: 5, h: 10, color: "red" }
    ];
    deleteColorsAtColumn(colors02a, 2);
    it("deleteColorsAtColumn A", () => {
        expect(JSON.stringify(colors02a)).toBe(JSON.stringify([
            { x: 2, y: 10, w: 4, h: 30, color: "green" },
            { x: 0, y: 5, w: 4, h: 10, color: "red" }
        ]));
    });

    const colors03a = [
        { x: 10, y: 3, w: 30, h: 4, color: "green" },
        { x: 0, y: 2, w: 5, h: 1, color: "blue" },
        { x: 5, y: 0, w: 10, h: 5, color: "red" }
    ];
    insertColorsAtRow(colors03a, 2);
    it("insertColorsAtRow A", () => {
        expect(JSON.stringify(colors03a)).toBe(JSON.stringify([
            { x: 10, y: 4, w: 30, h: 4, color: "green" },
            { x: 0, y: 3, w: 5, h: 1, color: "blue" },
            { x: 5, y: 0, w: 10, h: 6, color: "red" }
        ]));
    });

    const colors04a = [
        { x: 3, y: 10, w: 4, h: 30, color: "green" },
        { x: 2, y: 0, w: 1, h: 5, color: "blue" },
        { x: 0, y: 5, w: 5, h: 10, color: "red" }
    ];
    insertColorsAtColumn(colors04a, 2);
    it("insertColorsAtColumn A", () => {
        expect(JSON.stringify(colors04a)).toBe(JSON.stringify([
            { x: 4, y: 10, w: 4, h: 30, color: "green" },
            { x: 3, y: 0, w: 1, h: 5, color: "blue" },
            { x: 0, y: 5, w: 6, h: 10, color: "red" }
        ]));
    });


});