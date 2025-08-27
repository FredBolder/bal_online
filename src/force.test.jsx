import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkForces, hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { copy2dArray } from "./utils.js";

describe("Force", () => {
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
    let info01a = checkForces(input01a, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: "up" }] });
    it("Force up A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Force up A info", () => {
        expect(info01a).toBe(true);
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
    let info01b = checkForces(input01b, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: "up" }] });
    it("Force up B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Force up B info", () => {
        expect(info01b).toBe(true);
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
    let info01c = checkForces(input01c, { ...defaultGameInfo, forces: [{ x: 4, y: 4, direction: "up" }] });
    it("Force up C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Force up C info", () => {
        expect(info01c).toBe(true);
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
    let info02a = checkForces(input02a, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }] });
    it("Force right A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Force right A info", () => {
        expect(info02a).toBe(true);
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
    let info02b = checkForces(input02b, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }] });
    it("Force right B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Force right B info", () => {
        expect(info02b).toBe(true);
    });

    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 5, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = copy2dArray(input02c);
    let info02c = checkForces(input02c, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }] });
    it("Force right C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Force right C info", () => {
        expect(info02c).toBe(false);
    });

    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 111, 0, 40, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 111, 0, 0, 40, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let gameInfo02d = { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }], 
        orangeBalls: [{ x: 4, y: 4, direction: "none" }] };
    let info02d = checkForces(input02d, gameInfo02d);
    it("Force right D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Force right D info", () => {
        expect(info02d).toBe(true);
    });
    it("Force right D orangeBalls", () => {
        expect(JSON.stringify(gameInfo02d.orangeBalls)).toBe(JSON.stringify([{ x: 5, y: 4, direction: "none" }]));
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
    let info03a = checkForces(input03a, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: "left" }] });
    it("Force left A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Force left A info", () => {
        expect(info03a).toBe(true);
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
    let info03b = checkForces(input03b, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: "left" }] });
    it("Force left B", () => {
        expect(JSON.stringify(input03b)).toBe(JSON.stringify(expectedOutput03b));
    });
    it("Force left B info", () => {
        expect(info03b).toBe(true);
    });

    let input03c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 5, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03c = copy2dArray(input03c);
    let info03c = checkForces(input03c, { ...defaultGameInfo, forces: [{ x: 5, y: 3, direction: "left" }] });
    it("Force left C", () => {
        expect(JSON.stringify(input03c)).toBe(JSON.stringify(expectedOutput03c));
    });
    it("Force left C info", () => {
        expect(info03c).toBe(false);
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
    let info04a = checkForces(input04a, { ...defaultGameInfo, forces: [{ x: 4, y: 1, direction: "down" }] });
    it("Force down A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("Force down A info", () => {
        expect(info04a).toBe(true);
    });


    // ***** hasForceRight *****
    let input5a = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5a = hasForceRight(input5a, { ...defaultGameInfo, forces: [{ x: 1, y: 1, direction: "right" }] }, 4, 1);
    it("hasForceRight A", () => {
        expect(info5a).toBe(true);
    });

    let input5b = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 4, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5b = hasForceRight(input5b, { ...defaultGameInfo, forces: [{ x: 1, y: 1, direction: "right" }] }, 4, 1);
    it("hasForceRight B", () => {
        expect(info5b).toBe(true);
    });

    let input5c = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 5, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5c = hasForceRight(input5c, { ...defaultGameInfo, forces: [{ x: 1, y: 1, direction: "right" }] }, 4, 1);
    it("hasForceRight C", () => {
        expect(info5c).toBe(false);
    });

    // ***** hasForceLeft *****
    let input6a = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6a = hasForceLeft(input6a, { ...defaultGameInfo, forces: [{ x: 4, y: 1, direction: "left" }] }, 1, 1);
    it("hasForceLeft A", () => {
        expect(info6a).toBe(true);
    });

    let input6b = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 4, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6b = hasForceLeft(input6b, { ...defaultGameInfo, forces: [{ x: 4, y: 1, direction: "left" }] }, 1, 1);
    it("hasForceLeft B", () => {
        expect(info6b).toBe(true);
    });

    let input6c = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 5, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6c = hasForceLeft(input6c, { ...defaultGameInfo, forces: [{ x: 4, y: 1, direction: "left" }] }, 1, 1);
    it("hasForceLeft C", () => {
        expect(info6c).toBe(false);
    });

    // ***** hasForceUp *****
    let input7a = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7a = hasForceUp(input7a, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "up" }] }, 2, 2);
    it("hasForceUp A", () => {
        expect(info7a).toBe(true);
    });

    let input7b = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 4, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7b = hasForceUp(input7b, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "up" }] }, 2, 2);
    it("hasForceUp B", () => {
        expect(info7b).toBe(true);
    });

    let input7c = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 5, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7c = hasForceUp(input7c, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "up" }] }, 2, 2);
    it("hasForceUp C", () => {
        expect(info7c).toBe(false);
    });

    let input7d = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 109, 1, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7d = hasForceUp(input7d, { ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "up" }, { x: 2, y: 7, direction: "up" }] }, 2, 2);
    it("hasForceUp D", () => {
        expect(info7d).toBe(true);
    });

    // ***** hasForceDown *****
    let input8a = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8a = hasForceDown(input8a, { ...defaultGameInfo, forces: [{ x: 2, y: 1, direction: "down" }] }, 2, 4);
    it("hasForceDown A", () => {
        expect(info8a).toBe(true);
    });

    let input8b = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 4, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8b = hasForceDown(input8b, { ...defaultGameInfo, forces: [{ x: 2, y: 1, direction: "down" }] }, 2, 4);
    it("hasForceDown B", () => {
        expect(info8b).toBe(true);
    });

    let input8c = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 5, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8c = hasForceDown(input8c, { ...defaultGameInfo, forces: [{ x: 2, y: 1, direction: "down" }] }, 2, 4);
    it("hasForceDown C", () => {
        expect(info8c).toBe(false);
    });

    // Insert new tests here
});
