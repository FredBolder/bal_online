import { describe, it, expect } from "vitest";
import { checkLevel } from "./levels.js";

describe("levels", () => {

    let data01a = [
        "1111111111",
        "13       1",
        "1        1",
        "1        1",
        "1  2     1",
        "1111111111"
    ];
    let settings01a = [];
    let info01a = checkLevel(data01a, settings01a);
    it("checkLevel A info", () => {
        expect(info01a).toBe("");
    });

    let data01b = [
        "1111111111",
        "1        1",
        "1        1",
        "1        1",
        "1  2     1",
        "1111111111"
    ];
    let settings01b = [];
    let info01b = checkLevel(data01b, settings01b);
    it("checkLevel B info", () => {
        expect(info01b).toBe("There is no small green ball.\n");
    });

    let data01c = [
        "1111111111",
        "1        1",
        "1        1",
        "1        1",
        "1  4     1",
        "1111111111"
    ];
    let settings01c = [];
    let info01c = checkLevel(data01c, settings01c);
    it("checkLevel C info", () => {
        expect(info01c).toBe("There is no blue ball (player).\nThere is no small green ball.\n");
    });

    let data01d = [
        "1111111111",
        "13       1",
        "1        1",
        "1        1",
        "1  2     1",
        "1111111111"
    ];
    let settings01d = ["$pistonmode: 1, 4, repeatfast"];
    let info01d = checkLevel(data01d, settings01d);
    it("checkLevel D info", () => {
        expect(info01d).toBe("Setting 1: No piston found at the coordinates 1, 4.\n");
    });

    let data01e = [
        "1111111111",
        "13       1",
        "1        1",
        "1        1",
        "1Ù 2     1",
        "1111111111"
    ];
    let settings01e = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 2"];
    let info01e = checkLevel(data01e, settings01e);
    it("checkLevel E info", () => {
        expect(info01e).toBe("");
    });

    let data01f = [
        "1111111111",
        "13       1",
        "1        1",
        "1        1",
        "1Ù 2     1",
        "1111111111"
    ];
    let settings01f = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 1000"];
    let info01f = checkLevel(data01f, settings01f);
    it("checkLevel F info", () => {
        expect(info01f).toBe("Setting 2: Invalid value 1000 for group.\n");
    });

    // Insert new tests here
});