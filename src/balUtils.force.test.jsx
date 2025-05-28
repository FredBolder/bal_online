import { describe, it, expect } from "vitest";
import {
    initGameInfo,
    checkForces,
} from "./balUtils.js";


describe("balUtils", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** Force up *****

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = checkForces(input01a, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: 8 }] });
    it("Force up A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Force up A info", () => {
        expect(JSON.stringify(info01a)).toBe(JSON.stringify({ update: true, playerX: 4, playerY: 2 }));
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01b = checkForces(input01b, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: 8 }] });
    it("Force up B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Force up B info", () => {
        expect(JSON.stringify(info01b)).toBe(JSON.stringify({ update: true, playerX: 4, playerY: 1 }));
    });

    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 2, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = checkForces(input01c, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: 8 }] });
    it("Force up C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Force up C info", () => {
        expect(JSON.stringify(info01c)).toBe(JSON.stringify({ update: true, playerX: -1, playerY: -1 }));
    });

    // ***** Force right *****

    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 0, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = checkForces(input02a, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: 6 }] });
    it("Force right A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Force right A info", () => {
        expect(JSON.stringify(info02a)).toBe(JSON.stringify({ update: true, playerX: 5, playerY: 4 }));
    });

    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 4, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 0, 4, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02b = checkForces(input02b, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: 6 }] });
    it("Force right B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Force right B info", () => {
        expect(JSON.stringify(info02b)).toBe(JSON.stringify({ update: true, playerX: 5, playerY: 4 }));
    });

    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 5, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = input02c;
    let info02c = checkForces(input02c, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: 6 }] });
    it("Force right C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Force right C info", () => {
        expect(JSON.stringify(info02c)).toBe(JSON.stringify({ update: false, playerX: -1, playerY: -1 }));
    });

    // ***** Force left *****

    let input03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03a = checkForces(input03a, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: 4 }] });
    it("Force left A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Force left A info", () => {
        expect(JSON.stringify(info03a)).toBe(JSON.stringify({ update: true, playerX: 1, playerY: 3 }));
    });

    let input03b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 4, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 4, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03b = checkForces(input03b, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: 4 }] });
    it("Force left B", () => {
        expect(JSON.stringify(input03b)).toBe(JSON.stringify(expectedOutput03b));
    });
    it("Force left B info", () => {
        expect(JSON.stringify(info03b)).toBe(JSON.stringify({ update: true, playerX: 1, playerY: 3 }));
    });

    let input03c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 5, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03c = input03c;
    let info03c = checkForces(input03c, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: 4 }] });
    it("Force left C", () => {
        expect(JSON.stringify(input03c)).toBe(JSON.stringify(expectedOutput03c));
    });
    it("Force left C info", () => {
        expect(JSON.stringify(info03c)).toBe(JSON.stringify({ update: false, playerX: -1, playerY: -1 }));
    });

    // ***** Force down *****

    let input04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info04a = checkForces(input04a, { ...defaultGameInfo, forces: [{ x: 4, y: 1, direction: 2 }] });
    it("Force down A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("Force down A info", () => {
        expect(JSON.stringify(info04a)).toBe(JSON.stringify({ update: true, playerX: 4, playerY: 4 }));
    });




    // Insert new tests here
});
