import { describe, it, expect } from "vitest";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { zeroArray } from "./balUtils.js";
import { moveYellowBar, moveYellowBars } from "./yellowBars.js";
import { copy2dArray } from "./utils.js";

describe("Yellow bar", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    const defaultGameVars = {};
    initGameVars(defaultGameVars);

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    // ***** Horizontal yellow bar *****

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
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
    let info01a = moveYellowBar(4, 4, backData, input01a, gameInfo01a, { ...defaultGameVars }, "up", -1);
    it("Horizontal yellow bar A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Horizontal yellow bar A info", () => {
        expect(info01a).toBe(true);
    });
    it("Horizontal yellow bar A yellowBars", () => {
        expect(JSON.stringify(gameInfo01a.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "up" }]));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01b = copy2dArray(input01b);
    let info01b = moveYellowBar(4, 4, backData, input01b, gameInfo01b, { ...defaultGameVars }, "up", -1);
    it("Horizontal yellow bar B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Horizontal yellow bar B info", () => {
        expect(info01b).toBe(false);
    });
    it("Horizontal yellow bar B yellowBars", () => {
        expect(JSON.stringify(gameInfo01b.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });


    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
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
    let info01c = moveYellowBar(4, 2, backData, input01c, gameInfo01c, { ...defaultGameVars }, "down", -1);
    it("Horizontal yellow bar C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Horizontal yellow bar C info", () => {
        expect(info01c).toBe(true);
    });
    it("Horizontal yellow bar C blue ball", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });
    it("Horizontal yellow bar C yellowBars", () => {
        expect(JSON.stringify(gameInfo01c.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 4, direction: "down" }]));
    });

    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 4, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = copy2dArray(input01d);
    let info01d = moveYellowBar(4, 2, backData, input01d, gameInfo01d, { ...defaultGameVars }, "down", -1);
    it("Horizontal yellow bar D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Horizontal yellow bar D info", () => {
        expect(info01d).toBe(false);
    });
    it("Horizontal yellow bar D yellowBars", () => {
        expect(JSON.stringify(gameInfo01d.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
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
    let info01e = moveYellowBar(7, 3, backData, input01e, gameInfo01e, { ...defaultGameVars }, "left", -1);
    it("Horizontal yellow bar E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Horizontal yellow bar E info", () => {
        expect(info01e).toBe(true);
    });
    it("Horizontal yellow bar E yellowBars", () => {
        expect(JSON.stringify(gameInfo01e.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 3, direction: "left" }]));
    });

    let gameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = copy2dArray(input01f);
    let info01f = moveYellowBar(7, 3, backData, input01f, gameInfo01f, { ...defaultGameVars }, "left", -1);
    it("Horizontal yellow bar F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Horizontal yellow bar F info", () => {
        expect(info01f).toBe(false);
    });
    it("Horizontal yellow bar F yellowBars", () => {
        expect(JSON.stringify(gameInfo01f.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 4, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = copy2dArray(input01g);
    let info01g = moveYellowBar(7, 3, backData, input01g, gameInfo01g, { ...defaultGameVars }, "left", -1);
    it("Horizontal yellow bar G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Horizontal yellow bar G info", () => {
        expect(info01g).toBe(false);
    });
    it("Horizontal yellow bar G yellowBars", () => {
        expect(JSON.stringify(gameInfo01g.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01h = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
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
    let info01h = moveYellowBar(2, 3, backData, input01h, gameInfo01h, { ...defaultGameVars }, "right", -1);
    it("Horizontal yellow bar H", () => {
        expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
    });
    it("Horizontal yellow bar H info", () => {
        expect(info01h).toBe(true);
    });
    it("Horizontal yellow bar H yellowBars", () => {
        expect(JSON.stringify(gameInfo01h.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "right" }]));
    });

    let gameInfo01i = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01i = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01i = copy2dArray(input01i);
    let info01i = moveYellowBar(2, 3, backData, input01i, gameInfo01i, { ...defaultGameVars }, "right", -1);
    it("Horizontal yellow bar I", () => {
        expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
    });
    it("Horizontal yellow bar I info", () => {
        expect(info01i).toBe(false);
    });
    it("Horizontal yellow bar I yellowBars", () => {
        expect(JSON.stringify(gameInfo01i.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01j = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01j = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 93, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01j = copy2dArray(input01j);
    let info01j = moveYellowBar(2, 3, backData, input01j, gameInfo01j, { ...defaultGameVars }, "right", -1);
    it("Horizontal yellow bar J", () => {
        expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
    });
    it("Horizontal yellow bar J info", () => {
        expect(info01j).toBe(false);
    });
    it("Horizontal yellow bar J yellowBars", () => {
        expect(JSON.stringify(gameInfo01j.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01k = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 4, y: 1, direction: "down" }],
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01k = copy2dArray(input01k);
    let info01k = moveYellowBar(4, 4, backData, input01k, gameInfo01k, { ...defaultGameVars }, "up", -1);
    it("Horizontal yellow bar K", () => {
        expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
    });
    it("Horizontal yellow bar K info", () => {
        expect(info01k).toBe(false);
    });
    it("Horizontal yellow bar K yellowBars", () => {
        expect(JSON.stringify(gameInfo01k.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01l = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        forces: [{ x: 4, y: 4, direction: "up" }],
        yellowBars: [{ x: 3, y: 2, direction: "none" }],
    };
    let input01l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01l = copy2dArray(input01l);
    let info01l = moveYellowBar(4, 1, backData, input01l, gameInfo01l, { ...defaultGameVars }, "down", -1);
    it("Horizontal yellow bar L", () => {
        expect(JSON.stringify(input01l)).toBe(JSON.stringify(expectedOutput01l));
    });
    it("Horizontal yellow bar L info", () => {
        expect(info01l).toBe(false);
    });
    it("Horizontal yellow bar L yellowBars", () => {
        expect(JSON.stringify(gameInfo01l.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 2, direction: "none" }]));
    });

    let gameInfo01m = {
        ...defaultGameInfo,
        blueBall: { x: 7, y: 3 },
        forces: [{ x: 0, y: 3, direction: "right" }],
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01m = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [111, 0, 0, 121, 123, 123, 122, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01m = copy2dArray(input01m);
    let info01m = moveYellowBar(7, 3, backData, input01m, gameInfo01m, { ...defaultGameVars }, "left", -1);
    it("Horizontal yellow bar M", () => {
        expect(JSON.stringify(input01m)).toBe(JSON.stringify(expectedOutput01m));
    });
    it("Horizontal yellow bar M info", () => {
        expect(info01m).toBe(false);
    });
    it("Horizontal yellow bar M yellowBars", () => {
        expect(JSON.stringify(gameInfo01m.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo01n = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        forces: [{ x: 8, y: 3, direction: "left" }],
        yellowBars: [{ x: 3, y: 3, direction: "none" }],
    };
    let input01n = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 121, 123, 123, 122, 0, 112],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01n = copy2dArray(input01n);
    let info01n = moveYellowBar(2, 3, backData, input01n, gameInfo01n, { ...defaultGameVars }, "right", -1);
    it("Horizontal yellow bar N", () => {
        expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
    });
    it("Horizontal yellow bar N info", () => {
        expect(info01n).toBe(false);
    });
    it("Horizontal yellow bar N yellowBars", () => {
        expect(JSON.stringify(gameInfo01n.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    // ***** Vertical yellow bar *****

    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 4, y: 2, direction: "none" }],
    };
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
    let info02a = moveYellowBar(4, 4, backData, input02a, gameInfo02a, { ...defaultGameVars }, "up", -1);
    it("Vertical yellow bar A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Vertical yellow bar A info", () => {
        expect(info02a).toBe(true);
    });
    it("Vertical yellow bar A yellowBars", () => {
        expect(JSON.stringify(gameInfo02a.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "up" }]));
    });

    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 5 },
        yellowBars: [{ x: 4, y: 3, direction: "none" }],
    };
    let input02b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02b = copy2dArray(input02b);
    let info02b = moveYellowBar(4, 5, backData, input02b, gameInfo02b, { ...defaultGameVars }, "up", -1);
    it("Vertical yellow bar B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Vertical yellow bar B info", () => {
        expect(info02b).toBe(false);
    });
    it("Vertical yellow bar B yellowBars", () => {
        expect(JSON.stringify(gameInfo02b.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "none" }]));
    });

    let gameInfo02c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        yellowBars: [{ x: 4, y: 2, direction: "none" }],
    };
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
    let info02c = moveYellowBar(4, 1, backData, input02c, gameInfo02c, { ...defaultGameVars }, "down", -1);
    it("Vertical yellow bar C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Vertical yellow bar C info", () => {
        expect(info02c).toBe(true);
    });
    it("Vertical yellow bar C blue ball", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });
    it("Vertical yellow bar C yellowBars", () => {
        expect(JSON.stringify(gameInfo02c.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 3, direction: "down" }]));
    });

    let gameInfo02d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        yellowBars: [{ x: 4, y: 2, direction: "none" }],
    };
    let input02d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02d = copy2dArray(input02d);
    let info02d = moveYellowBar(4, 1, backData, input02d, gameInfo02d, { ...defaultGameVars }, "down", -1);
    it("Vertical yellow bar D", () => {
        expect(JSON.stringify(input02d)).toBe(JSON.stringify(expectedOutput02d));
    });
    it("Vertical yellow bar D info", () => {
        expect(info02d).toBe(false);
    });
    it("Vertical yellow bar D yellowBars", () => {
        expect(JSON.stringify(gameInfo02d.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "none" }]));
    });

    let gameInfo02e = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        yellowBars: [{ x: 4, y: 1, direction: "none" }],
    };
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
    let info02e = moveYellowBar(5, 4, backData, input02e, gameInfo02e, { ...defaultGameVars }, "left", -1);
    it("Vertical yellow bar E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("Vertical yellow bar E info", () => {
        expect(info02e).toBe(true);
    });
    it("Vertical yellow bar E yellowBars", () => {
        expect(JSON.stringify(gameInfo02e.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 1, direction: "left" }]));
    });

    let gameInfo02f = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        yellowBars: [{ x: 4, y: 1, direction: "none" }],
    };
    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 4, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = copy2dArray(input02f);
    let info02f = moveYellowBar(5, 4, backData, input02f, gameInfo02f, { ...defaultGameVars }, "left", -1);
    it("Vertical yellow bar F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("Vertical yellow bar F info", () => {
        expect(info02f).toBe(false);
    });
    it("Vertical yellow bar F yellowBars", () => {
        expect(JSON.stringify(gameInfo02f.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "none" }]));
    });

    let gameInfo02g = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        yellowBars: [{ x: 4, y: 2, direction: "none" }],
    };
    let input02g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02g = copy2dArray(input02g);
    let info02g = moveYellowBar(5, 4, backData, input02g, gameInfo02g, { ...defaultGameVars }, "left", -1);
    it("Vertical yellow bar G", () => {
        expect(JSON.stringify(input02g)).toBe(JSON.stringify(expectedOutput02g));
    });
    it("Vertical yellow bar G info", () => {
        expect(info02g).toBe(false);
    });
    it("Vertical yellow bar G yellowBars", () => {
        expect(JSON.stringify(gameInfo02g.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "none" }]));
    });

    let gameInfo02h = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 4 },
        yellowBars: [{ x: 4, y: 1, direction: "none" }],
    };
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
    let info02h = moveYellowBar(3, 4, backData, input02h, gameInfo02h, { ...defaultGameVars }, "right", -1);
    it("Vertical yellow bar H", () => {
        expect(JSON.stringify(input02h)).toBe(JSON.stringify(expectedOutput02h));
    });
    it("Vertical yellow bar H info", () => {
        expect(info02h).toBe(true);
    });
    it("Vertical yellow bar H yellowBars", () => {
        expect(JSON.stringify(gameInfo02h.yellowBars)).toBe(JSON.stringify([{ x: 5, y: 1, direction: "right" }]));
    });

    let gameInfo02i = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 7 },
        forces: [{ x: 4, y: 1, direction: "down" }],
        yellowBars: [{ x: 4, y: 4, direction: "none" }],
    };
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
    let expectedOutput02i = copy2dArray(input02i);
    let info02i = moveYellowBar(4, 7, backData, input02i, gameInfo02i, { ...defaultGameVars }, "up", -1);
    it("Vertical yellow bar I", () => {
        expect(JSON.stringify(input02i)).toBe(JSON.stringify(expectedOutput02i));
    });
    it("Vertical yellow bar I info", () => {
        expect(info02i).toBe(false);
    });
    it("Vertical yellow bar I yellowBars", () => {
        expect(JSON.stringify(gameInfo02i.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 4, direction: "none" }]));
    });

    let gameInfo02j = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        forces: [{ x: 4, y: 7, direction: "up" }],
        yellowBars: [{ x: 4, y: 2, direction: "none" }],
    };
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
    let expectedOutput02j = copy2dArray(input02j);
    let info02j = moveYellowBar(4, 1, backData, input02j, gameInfo02j, { ...defaultGameVars }, "down", -1);
    it("Vertical yellow bar J", () => {
        expect(JSON.stringify(input02j)).toBe(JSON.stringify(expectedOutput02j));
    });
    it("Vertical yellow bar J info", () => {
        expect(info02j).toBe(false);
    });
    it("Vertical yellow bar J yellowBars", () => {
        expect(JSON.stringify(gameInfo02j.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "none" }]));
    });

    let gameInfo02k = {
        ...defaultGameInfo,
        blueBall: { x: 5, y: 4 },
        forces: [{ x: 1, y: 4, direction: "right" }],
        yellowBars: [{ x: 4, y: 1, direction: "none" }],
    };
    let input02k = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 111, 0, 0, 125, 2, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02k = copy2dArray(input02k);
    let info02k = moveYellowBar(5, 4, backData, input02k, gameInfo02k, { ...defaultGameVars }, "left", -1);
    it("Vertical yellow bar K", () => {
        expect(JSON.stringify(input02k)).toBe(JSON.stringify(expectedOutput02k));
    });
    it("Vertical yellow bar K info", () => {
        expect(info02k).toBe(false);
    });
    it("Vertical yellow bar K yellowBars", () => {
        expect(JSON.stringify(gameInfo02k.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "none" }]));
    });

    let gameInfo02l = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 4 },
        forces: [{ x: 7, y: 4, direction: "left" }],
        yellowBars: [{ x: 4, y: 1, direction: "none" }],
    };
    let input02l = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 124, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 0, 123, 0, 0, 0, 1],
        [1, 0, 0, 2, 125, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02l = copy2dArray(input02l);
    let info02l = moveYellowBar(3, 4, backData, input02l, gameInfo02l, { ...defaultGameVars }, "right", -1);
    it("Vertical yellow bar L", () => {
        expect(JSON.stringify(input02l)).toBe(JSON.stringify(expectedOutput02l));
    });
    it("Vertical yellow bar L info", () => {
        expect(info02l).toBe(false);
    });
    it("Vertical yellow bar L yellowBars", () => {
        expect(JSON.stringify(gameInfo02l.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 1, direction: "none" }]));
    });

    // ***** Horizontal yellow bars *****

    let gameInfo03a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 3, y: 3, direction: "none" }]
    };
    let input03a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03a = copy2dArray(input03a);
    let info03a = moveYellowBars(backData, input03a, gameInfo03a, { ...defaultGameVars });
    it("Horizontal yellow bars A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Horizontal yellow bars A info", () => {
        expect(info03a).toBe(false);
    });
    it("Horizontal yellow bars A yellowBars", () => {
        expect(JSON.stringify(gameInfo03a.yellowBars)).toBe(JSON.stringify([{ x: 3, y: 3, direction: "none" }]));
    });

    let gameInfo03b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 3, y: 3, direction: "left" }]
    };
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
    let info03b = moveYellowBars(backData, input03b, gameInfo03b, { ...defaultGameVars });
    it("Horizontal yellow bars B", () => {
        expect(JSON.stringify(input03b)).toBe(JSON.stringify(expectedOutput03b));
    });
    it("Horizontal yellow bars B info", () => {
        expect(info03b).toBe(true);
    });
    it("Horizontal yellow bars B yellowBars", () => {
        expect(JSON.stringify(gameInfo03b.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 3, direction: "left" }]));
    });

    let gameInfo03c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        yellowBars: [{ x: 1, y: 3, direction: "left" }]
    };
    let input03c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 121, 123, 123, 122, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03c = copy2dArray(input03c);
    let info03c = moveYellowBars(backData, input03c, gameInfo03c, { ...defaultGameVars });
    it("Horizontal yellow bars C", () => {
        expect(JSON.stringify(input03c)).toBe(JSON.stringify(expectedOutput03c));
    });
    it("Horizontal yellow bars C info", () => {
        expect(info03c).toBe(false);
    });
    it("Horizontal yellow bars C yellowBars", () => {
        expect(JSON.stringify(gameInfo03c.yellowBars)).toBe(JSON.stringify([{ x: 1, y: 3, direction: "none" }]));
    });

    let gameInfo03d = {
        ...defaultGameInfo,
        blueBall: { x: 6, y: 2 },
        yellowBars: [{ x: 3, y: 3, direction: "left" }],
    };
    let input03d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 4, 2, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 2, 0, 0, 1],
        [1, 0, 121, 123, 123, 122, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03d = moveYellowBars(backData, input03d, gameInfo03d, { ...defaultGameVars });
    it("Horizontal yellow bars D", () => {
        expect(JSON.stringify(input03d)).toBe(JSON.stringify(expectedOutput03d));
    });
    it("Horizontal yellow bars D info", () => {
        expect(info03d).toBe(true);
    });
    it("Horizontal yellow bars D yellowBars", () => {
        expect(JSON.stringify(gameInfo03d.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 3, direction: "left" }]));
    });
    it("Horizontal yellow bars D blueBall", () => {
        expect(JSON.stringify(gameInfo03d.blueBall)).toBe(JSON.stringify({ x: 5, y: 2 }));
    });

    // ***** Vertical yellow bars *****

    let gameInfo04a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
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
    let info04a = moveYellowBars(backData, input04a, gameInfo04a, { ...defaultGameVars });
    it("Vertical yellow bars A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("Vertical yellow bars A info", () => {
        expect(info04a).toBe(true);
    });
    it("Vertical yellow bars A yellowBars", () => {
        expect(JSON.stringify(gameInfo04a.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }, { x: 6, y: 2, direction: "up" }]));
    });

    // GRAVITY UP

    // ***** Horizontal yellow bars *****

    let gameInfo05a = {
        ...defaultGameInfo,
        blueBall: { x: 6, y: 3 },
        yellowBars: [{ x: 3, y: 2, direction: "left" }],
    };
    let input05a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 121, 123, 123, 122, 0, 1],
        [1, 0, 0, 0, 0, 4, 2, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput05a = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 121, 123, 123, 122, 0, 0, 1],
        [1, 0, 0, 0, 4, 2, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info05a = moveYellowBars(backData, input05a, gameInfo05a, { ...defaultGameVars, gravity: "up" });
    it("Horizontal yellow bars Gravity Up A", () => {
        expect(JSON.stringify(input05a)).toBe(JSON.stringify(expectedOutput05a));
    });
    it("Horizontal yellow bars Gravity Up A info", () => {
        expect(info05a).toBe(true);
    });
    it("Horizontal yellow bars Gravity Up A yellowBars", () => {
        expect(JSON.stringify(gameInfo05a.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }]));
    });
    it("Horizontal yellow bars Gravity Up A blueBall", () => {
        expect(JSON.stringify(gameInfo05a.blueBall)).toBe(JSON.stringify({ x: 5, y: 3 }));
    });


    // Insert new tests here
});