import { describe, it, expect } from "vitest";
import { initGameInfo } from "./balUtils.js";
import { movePurpleBar } from "./purpleBar";

describe("Purple bar", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** Horizontal purple bars *****

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
    let info01a = movePurpleBar(input01a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, 8);
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
    let expectedOutput01b = input01b.map(row => [...row]);
    let info01b = movePurpleBar(input01b, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, 8);
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
    let info01c = movePurpleBar(input01c, gameInfo01c, 2);
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
    let expectedOutput01d = input01d.map(row => [...row]);
    let info01d = movePurpleBar(input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, 2);
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
    let info01e = movePurpleBar(input01e, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, 4);
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
    let expectedOutput01f = input01f.map(row => [...row]);
    let info01f = movePurpleBar(input01f, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, 4);
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
    let expectedOutput01g = input01g.map(row => [...row]);
    let info01g = movePurpleBar(input01g, { ...defaultGameInfo, blueBall: { x: 7, y: 3 } }, 4);
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
    let info01h = movePurpleBar(input01h, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, 6);
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
    let expectedOutput01i = input01i.map(row => [...row]);
    let info01i = movePurpleBar(input01i, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, 6);
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
    let expectedOutput01j = input01j.map(row => [...row]);
    let info01j = movePurpleBar(input01j, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, 6);
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
    let expectedOutput01k = input01k.map(row => [...row]);
    let info01k = movePurpleBar(input01k, { ...defaultGameInfo, blueBall: { x: 4, y: 4 }, forces: [{ x: 4, y: 1, direction: 2 }] }, 8);
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
    let expectedOutput01l = input01l.map(row => [...row]);
    let info01l = movePurpleBar(input01l, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 4, direction: 8 }] }, 2);
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
    let expectedOutput01m = input01m.map(row => [...row]);
    let info01m = movePurpleBar(input01m, { ...defaultGameInfo, blueBall: { x: 7, y: 3 }, forces: [{ x: 0, y: 3, direction: 6 }] }, 4);
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
    let expectedOutput01n = input01n.map(row => [...row]);
    let info01n = movePurpleBar(input01n, { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, forces: [{ x: 8, y: 3, direction: 4 }] }, 6);
    it("Horizontal purple bar N", () => {
        expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
    });
    it("Horizontal purple bar N info", () => {
        expect(info01n).toBe(false);
    });


    // ***** Vertical purple bars *****

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
    let info02a = movePurpleBar(input02a, { ...defaultGameInfo, blueBall: { x: 4, y: 4 } }, 8);
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
    let expectedOutput02b = input02b.map(row => [...row]);
    let info02b = movePurpleBar(input02b, { ...defaultGameInfo, blueBall: { x: 4, y: 5 } }, 8);
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
    let info02c = movePurpleBar(input02c, gameInfo02c, 2);
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
    let expectedOutput02d = input02d.map(row => [...row]);
    let info02d = movePurpleBar(input02d, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, 2);
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
    let info02e = movePurpleBar(input02e, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, 4);
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
    let expectedOutput02f = input02f.map(row => [...row]);
    let info02f = movePurpleBar(input02f, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, 4);
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
    let expectedOutput02g = input02g.map(row => [...row]);
    let info02g = movePurpleBar(input02g, { ...defaultGameInfo, blueBall: { x: 5, y: 4 } }, 4);
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
    let info02h = movePurpleBar(input02h, { ...defaultGameInfo, blueBall: { x: 3, y: 4 } }, 6);
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
    let expectedOutput02i = input02i.map(row => [...row]);
    let info02i = movePurpleBar(input02i, { ...defaultGameInfo, blueBall: { x: 4, y: 7 }, forces: [{ x: 4, y: 1, direction: 2 }] }, 8);
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
    let expectedOutput02j = input02j.map(row => [...row]);
    let info02j = movePurpleBar(input02j, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 4, y: 7, direction: 8 }] }, 2);
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
    let expectedOutput02k = input02k.map(row => [...row]);
    let info02k = movePurpleBar(input02k, { ...defaultGameInfo, blueBall: { x: 5, y: 4 }, forces: [{ x: 1, y: 4, direction: 6 }] }, 4);
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
    let expectedOutput02l = input02l.map(row => [...row]);
    let info02l = movePurpleBar(input02l, { ...defaultGameInfo, blueBall: { x: 3, y: 4 }, forces: [{ x: 7, y: 4, direction: 4 }] }, 6);
    it("Vertical purple bar L", () => {
        expect(JSON.stringify(input02l)).toBe(JSON.stringify(expectedOutput02l));
    });
    it("Vertical purple bar L info", () => {
        expect(info02l).toBe(false);
    });

    // Insert new tests here
});