import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";
import { movePurpleBar } from "./purpleBar.js";
import { copy2dArray } from "./utils.js";

describe("Purple bar", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** Horizontal purple bar *****

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = movePurpleBar(backData, input01a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal purple bar A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Horizontal purple bar A info", () => {
        expect(info01a).toBe(true);
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = copy2dArray(input01b);
    let info01b = movePurpleBar(backData, input01b, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal purple bar B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Horizontal purple bar B info", () => {
        expect(info01b).toBe(false);
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 4, y: 2 } };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = movePurpleBar(backData, input01c, gameInfo01c, "down");
    it("Horizontal purple bar C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Horizontal purple bar C info", () => {
        expect(info01c).toBe(true);
    });
    it("Horizontal purple bar C blue ball", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = copy2dArray(input01d);
    let info01d = movePurpleBar(backData, input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, "down");
    it("Horizontal purple bar D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Horizontal purple bar D info", () => {
        expect(info01d).toBe(false);
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 100, 102, 102, 101, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = movePurpleBar(backData, input01e, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal purple bar E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Horizontal purple bar E info", () => {
        expect(info01e).toBe(true);
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 100, 102, 102, 101, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = copy2dArray(input01f);
    let info01f = movePurpleBar(backData, input01f, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal purple bar F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Horizontal purple bar F info", () => {
        expect(info01f).toBe(false);
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = copy2dArray(input01g);
    let info01g = movePurpleBar(backData, input01g, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal purple bar G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Horizontal purple bar G info", () => {
        expect(info01g).toBe(false);
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 100, 102, 102, 101, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 100, 102, 102, 101, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = movePurpleBar(backData, input01h, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal purple bar H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Horizontal purple bar H info", () => {
        expect(info01h).toBe(true);
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 100, 102, 102, 101, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = copy2dArray(input01i);
    let info01i = movePurpleBar(backData, input01i, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal purple bar I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("Horizontal purple bar I info", () => {
        expect(info01i).toBe(false);
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 93, 0, 0, 1],
        [1, 0, 2, 100, 102, 102, 101, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = copy2dArray(input01j);
    let info01j = movePurpleBar(backData, input01j, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal purple bar J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("Horizontal purple bar J info", () => {
        expect(info01j).toBe(false);
    });

    let input01k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01k = copy2dArray(input01k);
    let info01k = movePurpleBar(backData, input01k, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: "down" }] }, "up");
    it("Horizontal purple bar K", () => {
        expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
    });
    it("Horizontal purple bar K info", () => {
        expect(info01k).toBe(false);
    });

    let input01l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 100, 102, 102, 101, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01l = copy2dArray(input01l);
    let info01l = movePurpleBar(backData, input01l, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: "up" }] }, "down");
    it("Horizontal purple bar L", () => {
        expect(JSON.stringify(input01l)).toBe(JSON.stringify(expectedOutput01l));
    });
    it("Horizontal purple bar L info", () => {
        expect(info01l).toBe(false);
    });

    let input01m = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [111, 0, 0, 100, 102, 102, 101, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01m = copy2dArray(input01m);
    let info01m = movePurpleBar(backData, input01m, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: "right" }] }, "left");
    it("Horizontal purple bar M", () => {
        expect(JSON.stringify(input01m)).toBe(JSON.stringify(expectedOutput01m));
    });
    it("Horizontal purple bar M info", () => {
        expect(info01m).toBe(false);
    });

    let input01n = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 100, 102, 102, 101, 0, 112],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01n = copy2dArray(input01n);
    let info01n = movePurpleBar(backData, input01n, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: "left" }] }, "right");
    it("Horizontal purple bar N", () => {
        expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
    });
    it("Horizontal purple bar N info", () => {
        expect(info01n).toBe(false);
    });


    // ***** Vertical purple bar *****

    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = movePurpleBar(backData, input02a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Vertical purple bar A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Vertical purple bar A info", () => {
        expect(info02a).toBe(true);
    });

    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = copy2dArray(input02b);
    let info02b = movePurpleBar(backData, input02b, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, "up");
    it("Vertical purple bar B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Vertical purple bar B info", () => {
        expect(info02b).toBe(false);
    });

    let gameInfo02c = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02c = movePurpleBar(backData, input02c, gameInfo02c, "down");
    it("Vertical purple bar C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Vertical purple bar C info", () => {
        expect(info02c).toBe(true);
    });
    it("Vertical purple bar C blue ball", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = copy2dArray(input02d);
    let info02d = movePurpleBar(backData, input02d, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, "down");
    it("Vertical purple bar D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Vertical purple bar D info", () => {
        expect(info02d).toBe(false);
    });

    let input02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 103, 0, 0, 0, 0, 1],
        [1, 0, 0, 102, 0, 0, 0, 0, 1],
        [1, 0, 0, 102, 0, 0, 0, 0, 1],
        [1, 0, 0, 104, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02e = movePurpleBar(backData, input02e, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical purple bar E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("Vertical purple bar E info", () => {
        expect(info02e).toBe(true);
    });

    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 4, 104, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = copy2dArray(input02f);
    let info02f = movePurpleBar(backData, input02f, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical purple bar F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("Vertical purple bar F info", () => {
        expect(info02f).toBe(false);
    });

    let input02g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02g = copy2dArray(input02g);
    let info02g = movePurpleBar(backData, input02g, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical purple bar G", () => {
        expect(JSON.stringify(input02g)).toBe(JSON.stringify(expectedOutput02g));
    });
    it("Vertical purple bar G info", () => {
        expect(info02g).toBe(false);
    });

    let input02h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 2, 104, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 103, 0, 0, 1],
        [1, 0, 0, 0, 0, 102, 0, 0, 1],
        [1, 0, 0, 0, 0, 102, 0, 0, 1],
        [1, 0, 0, 2, 0, 104, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02h = movePurpleBar(backData, input02h, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, "right");
    it("Vertical purple bar H", () => {
        expect(JSON.stringify(input02h)).toBe(JSON.stringify(expectedOutput02h));
    });
    it("Vertical purple bar H info", () => {
        expect(info02h).toBe(true);
    });

    let input02i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02i = copy2dArray(input02i);
    let info02i = movePurpleBar(backData, input02i, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: "down" }] }, "up");
    it("Vertical purple bar I", () => {
        expect(JSON.stringify(input02i)).toBe(JSON.stringify(expectedOutput02i));
    });
    it("Vertical purple bar I info", () => {
        expect(info02i).toBe(false);
    });

    let input02j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 104, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02j = copy2dArray(input02j);
    let info02j = movePurpleBar(backData, input02j, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: "up" }] }, "down");
    it("Vertical purple bar J", () => {
        expect(JSON.stringify(input02j)).toBe(JSON.stringify(expectedOutput02j));
    });
    it("Vertical purple bar J info", () => {
        expect(info02j).toBe(false);
    });

    let input02k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 111, 0, 0, 104, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02k = copy2dArray(input02k);
    let info02k = movePurpleBar(backData, input02k, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: "right" }] }, "left");
    it("Vertical purple bar K", () => {
        expect(JSON.stringify(input02k)).toBe(JSON.stringify(expectedOutput02k));
    });
    it("Vertical purple bar K info", () => {
        expect(info02k).toBe(false);
    });

    let input02l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 103, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 0, 102, 0, 0, 0, 1],
        [1, 0, 0, 2, 104, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02l = copy2dArray(input02l);
    let info02l = movePurpleBar(backData, input02l, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: "left" }] }, "right");
    it("Vertical purple bar L", () => {
        expect(JSON.stringify(input02l)).toBe(JSON.stringify(expectedOutput02l));
    });
    it("Vertical purple bar L info", () => {
        expect(info02l).toBe(false);
    });

    // Insert new tests here
});