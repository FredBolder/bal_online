import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { moveYellowBar, moveYellowBars } from "./yellowBars.js";

describe("Yellow bar", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** Horizontal yellow bar *****

    let input01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01a = moveYellowBar(input01a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal yellow bar A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Horizontal yellow bar A info", () => {
        expect(info01a).toBe(true);
    });

    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = input01b.map(row => [...row]);
    let info01b = moveYellowBar(input01b, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Horizontal yellow bar B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Horizontal yellow bar B info", () => {
        expect(info01b).toBe(false);
    });

    let gameInfo01c = { ...defaultGameInfo, blueBall: { x: 4, y: 2 } };
    let input01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01c = moveYellowBar(input01c, gameInfo01c, "down");
    it("Horizontal yellow bar C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Horizontal yellow bar C info", () => {
        expect(info01c).toBe(true);
    });
    it("Horizontal yellow bar C blue ball", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });

    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = input01d.map(row => [...row]);
    let info01d = moveYellowBar(input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, "down");
    it("Horizontal yellow bar D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Horizontal yellow bar D info", () => {
        expect(info01d).toBe(false);
    });

    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 121, 123, 123, 122, 0, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = moveYellowBar(input01e, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal yellow bar E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Horizontal yellow bar E info", () => {
        expect(info01e).toBe(true);
    });

    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = input01f.map(row => [...row]);
    let info01f = moveYellowBar(input01f, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal yellow bar F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Horizontal yellow bar F info", () => {
        expect(info01f).toBe(false);
    });

    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = input01g.map(row => [...row]);
    let info01g = moveYellowBar(input01g, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, "left");
    it("Horizontal yellow bar G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Horizontal yellow bar G info", () => {
        expect(info01g).toBe(false);
    });

    let input01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 0, 121, 123, 123, 122, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01h = moveYellowBar(input01h, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal yellow bar H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Horizontal yellow bar H info", () => {
        expect(info01h).toBe(true);
    });

    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = input01i.map(row => [...row]);
    let info01i = moveYellowBar(input01i, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal yellow bar I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("Horizontal yellow bar I info", () => {
        expect(info01i).toBe(false);
    });

    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 93, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = input01j.map(row => [...row]);
    let info01j = moveYellowBar(input01j, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, "right");
    it("Horizontal yellow bar J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("Horizontal yellow bar J info", () => {
        expect(info01j).toBe(false);
    });

    let input01k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01k = input01k.map(row => [...row]);
    let info01k = moveYellowBar(input01k, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: 2 }] }, "up");
    it("Horizontal yellow bar K", () => {
        expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
    });
    it("Horizontal yellow bar K info", () => {
        expect(info01k).toBe(false);
    });

    let input01l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01l = input01l.map(row => [...row]);
    let info01l = moveYellowBar(input01l, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: 8 }] }, "down");
    it("Horizontal yellow bar L", () => {
        expect(JSON.stringify(input01l)).toBe(JSON.stringify(expectedOutput01l));
    });
    it("Horizontal yellow bar L info", () => {
        expect(info01l).toBe(false);
    });

    let input01m = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [111, 0, 0, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01m = input01m.map(row => [...row]);
    let info01m = moveYellowBar(input01m, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: 6 }] }, "left");
    it("Horizontal yellow bar M", () => {
        expect(JSON.stringify(input01m)).toBe(JSON.stringify(expectedOutput01m));
    });
    it("Horizontal yellow bar M info", () => {
        expect(info01m).toBe(false);
    });

    let input01n = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 0, 112],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01n = input01n.map(row => [...row]);
    let info01n = moveYellowBar(input01n, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: 4 }] }, "right");
    it("Horizontal yellow bar N", () => {
        expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
    });
    it("Horizontal yellow bar N info", () => {
        expect(info01n).toBe(false);
    });


    // ***** Vertical yellow bar *****

    let input02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02a = moveYellowBar(input02a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, "up");
    it("Vertical yellow bar A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Vertical yellow bar A info", () => {
        expect(info02a).toBe(true);
    });

    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = input02b.map(row => [...row]);
    let info02b = moveYellowBar(input02b, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, "up");
    it("Vertical yellow bar B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Vertical yellow bar B info", () => {
        expect(info02b).toBe(false);
    });

    let gameInfo02c = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02c = moveYellowBar(input02c, gameInfo02c, "down");
    it("Vertical yellow bar C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Vertical yellow bar C info", () => {
        expect(info02c).toBe(true);
    });
    it("Vertical yellow bar C blue ball", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = input02d.map(row => [...row]);
    let info02d = moveYellowBar(input02d, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, "down");
    it("Vertical yellow bar D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Vertical yellow bar D info", () => {
        expect(info02d).toBe(false);
    });

    let input02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 124, 0, 0, 0, 0, 1],
        [1, 0, 0, 123, 0, 0, 0, 0, 1],
        [1, 0, 0, 123, 0, 0, 0, 0, 1],
        [1, 0, 0, 125, 0, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02e = moveYellowBar(input02e, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical yellow bar E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("Vertical yellow bar E info", () => {
        expect(info02e).toBe(true);
    });

    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 4, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = input02f.map(row => [...row]);
    let info02f = moveYellowBar(input02f, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical yellow bar F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("Vertical yellow bar F info", () => {
        expect(info02f).toBe(false);
    });

    let input02g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02g = input02g.map(row => [...row]);
    let info02g = moveYellowBar(input02g, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, "left");
    it("Vertical yellow bar G", () => {
        expect(JSON.stringify(input02g)).toBe(JSON.stringify(expectedOutput02g));
    });
    it("Vertical yellow bar G info", () => {
        expect(info02g).toBe(false);
    });

    let input02h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 2, 125, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02h = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 124, 0, 0, 1],
        [1, 0, 0, 0, 0, 123, 0, 0, 1],
        [1, 0, 0, 0, 0, 123, 0, 0, 1],
        [1, 0, 0, 2, 0, 125, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02h = moveYellowBar(input02h, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, "right");
    it("Vertical yellow bar H", () => {
        expect(JSON.stringify(input02h)).toBe(JSON.stringify(expectedOutput02h));
    });
    it("Vertical yellow bar H info", () => {
        expect(info02h).toBe(true);
    });

    let input02i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02i = input02i.map(row => [...row]);
    let info02i = moveYellowBar(input02i, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: 2 }] }, "up");
    it("Vertical yellow bar I", () => {
        expect(JSON.stringify(input02i)).toBe(JSON.stringify(expectedOutput02i));
    });
    it("Vertical yellow bar I info", () => {
        expect(info02i).toBe(false);
    });

    let input02j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02j = input02j.map(row => [...row]);
    let info02j = moveYellowBar(input02j, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: 8 }] }, "down");
    it("Vertical yellow bar J", () => {
        expect(JSON.stringify(input02j)).toBe(JSON.stringify(expectedOutput02j));
    });
    it("Vertical yellow bar J info", () => {
        expect(info02j).toBe(false);
    });

    let input02k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 111, 0, 0, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02k = input02k.map(row => [...row]);
    let info02k = moveYellowBar(input02k, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: 6 }] }, "left");
    it("Vertical yellow bar K", () => {
        expect(JSON.stringify(input02k)).toBe(JSON.stringify(expectedOutput02k));
    });
    it("Vertical yellow bar K info", () => {
        expect(info02k).toBe(false);
    });

    let input02l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 2, 125, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02l = input02l.map(row => [...row]);
    let info02l = moveYellowBar(input02l, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: 4 }] }, "right");
    it("Vertical yellow bar L", () => {
        expect(JSON.stringify(input02l)).toBe(JSON.stringify(expectedOutput02l));
    });
    it("Vertical yellow bar L info", () => {
        expect(info02l).toBe(false);
    });

    // ***** Horizontal yellow bars *****

    let gameInfo03a = { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, yellowBars: [{ x: 3, y: 3, direction: "none" }] };
    let input03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03a = input03a.map(row => [...row]);
    let info03a = moveYellowBars(input03a, gameInfo03a);
    it("Horizontal yellow bars A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Horizontal yellow bars A info", () => {
        expect(info03a).toBe(false);
    });
    it("Horizontal yellow bars A yellowBars", () => {
        expect(JSON.stringify(gameInfo03a.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo03b = { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, yellowBars: [{ x: 3, y: 3, direction: "left" }] };
    let input03b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 121, 123, 123, 122, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03b = moveYellowBars(input03b, gameInfo03b);
    it("Horizontal yellow bars B", () => {
        expect(JSON.stringify(input03b)).toBe(JSON.stringify(expectedOutput03b));
    });
    it("Horizontal yellow bars B info", () => {
        expect(info03b).toBe(true);
    });
    it("Horizontal yellow bars B yellowBars", () => {
        expect(JSON.stringify(gameInfo03b.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 3, direction: "left" }]));
    });

    let gameInfo03c = { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, yellowBars: [{ x: 1, y: 3, direction: "left" }] };
    let input03c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 121, 123, 123, 122, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03c = input03c.map(row => [...row]);
    let info03c = moveYellowBars(input03c, gameInfo03c);
    it("Horizontal yellow bars C", () => {
        expect(JSON.stringify(input03c)).toBe(JSON.stringify(expectedOutput03c));
    });
    it("Horizontal yellow bars C info", () => {
        expect(info03c).toBe(false);
    });
    it("Horizontal yellow bars C yellowBars", () => {
        expect(JSON.stringify(gameInfo03c.yellowBars)).toBe(JSON.stringify([{ x: 1, y: 3, direction: "none" }]));
    });

    // ***** Vertical yellow bars *****

    let gameInfo04a = {
        ...defaultGameInfo, blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 3, y: 2, direction: "left" }, { x: 6, y: 3, direction: "up" }]
    };
    let input04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 124, 0, 0, 0, 0, 1],
        [1, 0, 0, 123, 0, 0, 124, 0, 1],
        [1, 0, 0, 123, 0, 0, 125, 0, 1],
        [1, 0, 0, 125, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput04a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 124, 0, 0, 0, 124, 0, 1],
        [1, 0, 123, 0, 0, 0, 125, 0, 1],
        [1, 0, 123, 0, 0, 0, 0, 0, 1],
        [1, 0, 125, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info04a = moveYellowBars(input04a, gameInfo04a);
    it("Vertical yellow bars A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("Vertical yellow bars A info", () => {
        expect(info04a).toBe(true);
    });
    it("Vertical yellow bars A yellowBars", () => {
        expect(JSON.stringify(gameInfo04a.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "up" }]));
    });



    // Insert new tests here
});