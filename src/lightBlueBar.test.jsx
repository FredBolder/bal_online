import { describe, it, expect } from "vitest";
import { zeroArray } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";
import { moveLightBlueBar } from "./lightBlueBar.js";

describe("Light blue bar", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all
    

    // ***** Horizontal light blue bar *****

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = input01a.map(row => [...row]);
    let info01a = moveLightBlueBar(backData, input01a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal light blue bar A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Horizontal light blue bar A info", () => {
        expect(info01a).toBe(false);
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = input01b.map(row => [...row]);
    let info01b = moveLightBlueBar(backData, input01b, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal light blue bar B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Horizontal light blue bar B info", () => {
        expect(info01b).toBe(false);
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 4, y: 2 } };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = input01c.map(row => [...row]);
    let info01c = moveLightBlueBar(backData, input01c, gameInfo01c, "down");
    it("Horizontal light blue bar C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Horizontal light blue bar C info", () => {
        expect(info01c).toBe(false);
    });
    it("Horizontal light blue bar C blue ball", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = input01d.map(row => [...row]);
    let info01d = moveLightBlueBar(backData, input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, "down");
    it("Horizontal light blue bar D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Horizontal light blue bar D info", () => {
        expect(info01d).toBe(false);
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 126, 128, 128, 127, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = moveLightBlueBar(backData, input01e, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal light blue bar E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Horizontal light blue bar E info", () => {
        expect(info01e).toBe(true);
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 126, 128, 128, 127, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = input01f.map(row => [...row]);
    let info01f = moveLightBlueBar(backData, input01f, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal light blue bar F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Horizontal light blue bar F info", () => {
        expect(info01f).toBe(false);
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = input01g.map(row => [...row]);
    let info01g = moveLightBlueBar(backData, input01g, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal light blue bar G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Horizontal light blue bar G info", () => {
        expect(info01g).toBe(false);
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 126, 128, 128, 127, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 126, 128, 128, 127, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = moveLightBlueBar(backData, input01h, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal light blue bar H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Horizontal light blue bar H info", () => {
        expect(info01h).toBe(true);
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 126, 128, 128, 127, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = input01i.map(row => [...row]);
    let info01i = moveLightBlueBar(backData, input01i, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal light blue bar I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("Horizontal light blue bar I info", () => {
        expect(info01i).toBe(false);
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 93, 0, 0, 1],
        [1, 0, 2, 126, 128, 128, 127, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = input01j.map(row => [...row]);
    let info01j = moveLightBlueBar(backData, input01j, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal light blue bar J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("Horizontal light blue bar J info", () => {
        expect(info01j).toBe(false);
    });

    let input01k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01k = input01k.map(row => [...row]);
    let info01k = moveLightBlueBar(backData, input01k, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: 2 }] }, "up");
    it("Horizontal light blue bar K", () => {
        expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
    });
    it("Horizontal light blue bar K info", () => {
        expect(info01k).toBe(false);
    });

    let input01l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 126, 128, 128, 127, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01l = input01l.map(row => [...row]);
    let info01l = moveLightBlueBar(backData, input01l, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: 8 }] }, "down");
    it("Horizontal light blue bar L", () => {
        expect(JSON.stringify(input01l)).toBe(JSON.stringify(expectedOutput01l));
    });
    it("Horizontal light blue bar L info", () => {
        expect(info01l).toBe(false);
    });

    let input01m = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [111, 0, 0, 126, 128, 128, 127, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01m = input01m.map(row => [...row]);
    let info01m = moveLightBlueBar(backData, input01m, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: 6 }] }, "left");
    it("Horizontal light blue bar M", () => {
        expect(JSON.stringify(input01m)).toBe(JSON.stringify(expectedOutput01m));
    });
    it("Horizontal light blue bar M info", () => {
        expect(info01m).toBe(false);
    });

    let input01n = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 126, 128, 128, 127, 0, 112],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01n = input01n.map(row => [...row]);
    let info01n = moveLightBlueBar(backData, input01n, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: 4 }] }, "right");
    it("Horizontal light blue bar N", () => {
        expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
    });
    it("Horizontal light blue bar N info", () => {
        expect(info01n).toBe(false);
    });


    // ***** Vertical light blue bar *****

    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = moveLightBlueBar(backData, input02a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Vertical light blue bar A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Vertical light blue bar A info", () => {
        expect(info02a).toBe(true);
    });

    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = input02b.map(row => [...row]);
    let info02b = moveLightBlueBar(backData, input02b, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, "up");
    it("Vertical light blue bar B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Vertical light blue bar B info", () => {
        expect(info02b).toBe(false);
    });

    let gameInfo02c = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02c = moveLightBlueBar(backData, input02c, gameInfo02c, "down");
    it("Vertical light blue bar C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Vertical light blue bar C info", () => {
        expect(info02c).toBe(true);
    });
    it("Vertical light blue bar C blue ball", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = input02d.map(row => [...row]);
    let info02d = moveLightBlueBar(backData, input02d, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, "down");
    it("Vertical light blue bar D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Vertical light blue bar D info", () => {
        expect(info02d).toBe(false);
    });

    let input02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02e = input02e.map(row => [...row]);
    let info02e = moveLightBlueBar(backData, input02e, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical light blue bar E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("Vertical light blue bar E info", () => {
        expect(info02e).toBe(false);
    });

    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 4, 130, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = input02f.map(row => [...row]);
    let info02f = moveLightBlueBar(backData, input02f, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical light blue bar F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("Vertical light blue bar F info", () => {
        expect(info02f).toBe(false);
    });

    let input02g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02g = input02g.map(row => [...row]);
    let info02g = moveLightBlueBar(backData, input02g, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical light blue bar G", () => {
        expect(JSON.stringify(input02g)).toBe(JSON.stringify(expectedOutput02g));
    });
    it("Vertical light blue bar G info", () => {
        expect(info02g).toBe(false);
    });

    let input02h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 2, 130, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02h = input02h.map(row => [...row]);
    let info02h = moveLightBlueBar(backData, input02h, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, "right");
    it("Vertical light blue bar H", () => {
        expect(JSON.stringify(input02h)).toBe(JSON.stringify(expectedOutput02h));
    });
    it("Vertical light blue bar H info", () => {
        expect(info02h).toBe(false);
    });

    let input02i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02i = input02i.map(row => [...row]);
    let info02i = moveLightBlueBar(backData, input02i, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: 2 }] }, "up");
    it("Vertical light blue bar I", () => {
        expect(JSON.stringify(input02i)).toBe(JSON.stringify(expectedOutput02i));
    });
    it("Vertical light blue bar I info", () => {
        expect(info02i).toBe(false);
    });

    let input02j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 130, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02j = input02j.map(row => [...row]);
    let info02j = moveLightBlueBar(backData, input02j, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: 8 }] }, "down");
    it("Vertical light blue bar J", () => {
        expect(JSON.stringify(input02j)).toBe(JSON.stringify(expectedOutput02j));
    });
    it("Vertical light blue bar J info", () => {
        expect(info02j).toBe(false);
    });

    let input02k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 111, 0, 0, 130, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02k = input02k.map(row => [...row]);
    let info02k = moveLightBlueBar(backData, input02k, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: 6 }] }, "left");
    it("Vertical light blue bar K", () => {
        expect(JSON.stringify(input02k)).toBe(JSON.stringify(expectedOutput02k));
    });
    it("Vertical light blue bar K info", () => {
        expect(info02k).toBe(false);
    });

    let input02l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 129, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 0, 128, 0, 0, 0, 1],
        [1, 0, 0, 2, 130, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02l = input02l.map(row => [...row]);
    let info02l = moveLightBlueBar(backData, input02l, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: 4 }] }, "right");
    it("Vertical light blue bar L", () => {
        expect(JSON.stringify(input02l)).toBe(JSON.stringify(expectedOutput02l));
    });
    it("Vertical light blue bar L info", () => {
        expect(info02l).toBe(false);
    });

    // Insert new tests here
});