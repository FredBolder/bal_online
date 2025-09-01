import { describe, it, expect } from "vitest";
import { initGameInfo } from "./gameInfo.js";
import { checkForces, hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { copy2dArray } from "./utils.js";

describe("Force", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

    // ***** Force up *****

    let gameInfo01a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        forces: [{ x: 4, y: 4, direction: "up" }]
    };
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
    let info01a = checkForces(input01a, gameInfo01a);
    it("Force up A", () => {
        expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
    });
    it("Force up A info", () => {
        expect(info01a).toBe(true);
    });
    it("Force up A blueBall", () => {
        expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let gameInfo01b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        forces: [{ x: 4, y: 4, direction: "up" }]
    };
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
    let info01b = checkForces(input01b, gameInfo01b);
    it("Force up B", () => {
        expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
    });
    it("Force up B info", () => {
        expect(info01b).toBe(true);
    });
    it("Force up B blueBall", () => {
        expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 4, y: 1 }));
    });

    let gameInfo01c = {
        ...defaultGameInfo,
        blueBall: { x: 3, y: 4 },
        forces: [{ x: 4, y: 4, direction: "up" }]
    };
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
    let info01c = checkForces(input01c, gameInfo01c);
    it("Force up C", () => {
        expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
    });
    it("Force up C info", () => {
        expect(info01c).toBe(true);
    });
    it("Force up C blueBall", () => {
        expect(JSON.stringify(gameInfo01c.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });


    let gameInfo01d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        forces: [{ x: 4, y: 4, direction: "up" }, { x: 7, y: 4, direction: "up" }]
    };
    let input01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 17, 0, 0, 18, 1],
        [1, 0, 0, 0, 2, 0, 0, 4, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 109, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 17, 2, 4, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 109, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01d = checkForces(input01d, gameInfo01d);
    it("Force up D", () => {
        expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
    });
    it("Force up D info", () => {
        expect(info01d).toBe(true);
    });
    it("Force up D blueBall", () => {
        expect(JSON.stringify(gameInfo01d.blueBall)).toBe(JSON.stringify({ x: 5, y: 1 }));
    });

    let gameInfo01e = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        forces: [{ x: 4, y: 6, direction: "up" }]
    };
    let input01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 17, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 17, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 17, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 17, 4, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01e = checkForces(input01e, gameInfo01e);
    it("Force up E", () => {
        expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
    });
    it("Force up E info", () => {
        expect(info01e).toBe(true);
    });
    it("Force up E blueBall", () => {
        expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let gameInfo01f = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        forces: [{ x: 4, y: 6, direction: "up" }]
    };
    let input01f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 17, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 17, 0, 0, 0, 1],
        [1, 0, 0, 0, 4, 5, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01f = copy2dArray(input01f);
    let info01f = checkForces(input01f, gameInfo01f);
    it("Force up F", () => {
        expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
    });
    it("Force up F info", () => {
        expect(info01f).toBe(false);
    });
    it("Force up F blueBall", () => {
        expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 4, y: 2 }));
    });

    let gameInfo01g = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 2 },
        forces: [{ x: 4, y: 6, direction: "up" }, { x: 7, y: 6, direction: "up" }]
    };
    let input01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 18, 0, 0, 18, 1],
        [1, 0, 0, 0, 2, 0, 0, 4, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 109, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput01g = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 2, 18, 0, 4, 18, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 109, 0, 0, 109, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info01g = checkForces(input01g, gameInfo01g);
    it("Force up G", () => {
        expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
    });
    it("Force up G info", () => {
        expect(info01g).toBe(true);
    });
    it("Force up G blueBall", () => {
        expect(JSON.stringify(gameInfo01g.blueBall)).toBe(JSON.stringify({ x: 3, y: 1 }));
    });

    // ***** Force right *****

    let gameInfo02a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 2, y: 4, direction: "right" }]
    };
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
    let info02a = checkForces(input02a, gameInfo02a);
    it("Force right A", () => {
        expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
    });
    it("Force right A info", () => {
        expect(info02a).toBe(true);
    });
    it("Force right A blueBall", () => {
        expect(JSON.stringify(gameInfo02a.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });

    let gameInfo02b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 2, y: 4, direction: "right" }]
    };
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
    let info02b = checkForces(input02b, gameInfo02b);
    it("Force right B", () => {
        expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
    });
    it("Force right B info", () => {
        expect(info02b).toBe(true);
    });
    it("Force right B blueBall", () => {
        expect(JSON.stringify(gameInfo02b.blueBall)).toBe(JSON.stringify({ x: 5, y: 4 }));
    });

    let gameInfo02c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 2, y: 4, direction: "right" }]
    };
    let input02c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 111, 5, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02c = copy2dArray(input02c);
    let info02c = checkForces(input02c, gameInfo02c);
    it("Force right C", () => {
        expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
    });
    it("Force right C info", () => {
        expect(info02c).toBe(false);
    });
    it("Force right C blueBall", () => {
        expect(JSON.stringify(gameInfo02c.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    let gameInfo02d = {
        ...defaultGameInfo, forces: [{ x: 2, y: 4, direction: "right" }],
        blueBall: { x: 1, y: 4 },
        orangeBalls: [{ x: 4, y: 4, direction: "none" }]
    };
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
    it("Force right D blueBall", () => {
        expect(JSON.stringify(gameInfo02d.blueBall)).toBe(JSON.stringify({ x: 1, y: 4 }));
    });

    let gameInfo02e = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 1, y: 4, direction: "right" }]
    };
    let input02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 111, 0, 0, 2, 16, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02e = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 2, 0, 0, 1],
        [1, 111, 0, 0, 0, 16, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info02e = checkForces(input02e, gameInfo02e);
    it("Force right E", () => {
        expect(JSON.stringify(input02e)).toBe(JSON.stringify(expectedOutput02e));
    });
    it("Force right E info", () => {
        expect(info02e).toBe(true);
    });
    it("Force right E blueBall", () => {
        expect(JSON.stringify(gameInfo02e.blueBall)).toBe(JSON.stringify({ x: 5, y: 3 }));
    });

    let gameInfo02f = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 1, y: 4, direction: "right" }]
    };
    let input02f = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 5, 0, 0, 1],
        [1, 111, 0, 0, 2, 16, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput02f = copy2dArray(input02f);
    let info02f = checkForces(input02f, gameInfo02f);
    it("Force right F", () => {
        expect(JSON.stringify(input02f)).toBe(JSON.stringify(expectedOutput02f));
    });
    it("Force right F info", () => {
        expect(info02f).toBe(false);
    });
    it("Force right F blueBall", () => {
        expect(JSON.stringify(gameInfo02f.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });

    // ***** Force left *****

    let gameInfo03a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        forces: [{ x: 5, y: 3, direction: "left" }]
    };
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
    let info03a = checkForces(input03a, gameInfo03a);
    it("Force left A", () => {
        expect(JSON.stringify(input03a)).toBe(JSON.stringify(expectedOutput03a));
    });
    it("Force left A info", () => {
        expect(info03a).toBe(true);
    });
    it("Force left A blueBall", () => {
        expect(JSON.stringify(gameInfo03a.blueBall)).toBe(JSON.stringify({ x: 1, y: 3 }));
    });

    let gameInfo03b = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        forces: [{ x: 5, y: 3, direction: "left" }]
    };
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
    let info03b = checkForces(input03b, gameInfo03b);
    it("Force left B", () => {
        expect(JSON.stringify(input03b)).toBe(JSON.stringify(expectedOutput03b));
    });
    it("Force left B info", () => {
        expect(info03b).toBe(true);
    });
    it("Force left B blueBall", () => {
        expect(JSON.stringify(gameInfo03b.blueBall)).toBe(JSON.stringify({ x: 1, y: 3 }));
    });

    let gameInfo03c = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 3 },
        forces: [{ x: 5, y: 3, direction: "left" }]
    };
    let input03c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 2, 5, 0, 112, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03c = copy2dArray(input03c);
    let info03c = checkForces(input03c, gameInfo03c);
    it("Force left C", () => {
        expect(JSON.stringify(input03c)).toBe(JSON.stringify(expectedOutput03c));
    });
    it("Force left C info", () => {
        expect(info03c).toBe(false);
    });
    it("Force left C blueBall", () => {
        expect(JSON.stringify(gameInfo03c.blueBall)).toBe(JSON.stringify({ x: 2, y: 3 }));
    });

    let gameInfo03d = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 4 },
        forces: [{ x: 7, y: 4, direction: "left" }]
    };
    let input03d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 15, 2, 0, 0, 111, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput03d = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 0, 0, 0, 0, 1],
        [1, 0, 0, 15, 0, 0, 0, 111, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info03d = checkForces(input03d, gameInfo03d);
    it("Force left D", () => {
        expect(JSON.stringify(input03d)).toBe(JSON.stringify(expectedOutput03d));
    });
    it("Force left D info", () => {
        expect(info03d).toBe(true);
    });
    it("Force left D blueBall", () => {
        expect(JSON.stringify(gameInfo03d.blueBall)).toBe(JSON.stringify({ x: 3, y: 3 }));
    });


    // ***** Force down *****

    let gameInfo04a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        forces: [{ x: 4, y: 1, direction: "down" }]
    };
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
    let info04a = checkForces(input04a, gameInfo04a);
    it("Force down A", () => {
        expect(JSON.stringify(input04a)).toBe(JSON.stringify(expectedOutput04a));
    });
    it("Force down A info", () => {
        expect(info04a).toBe(true);
    });
    it("Force down A blueBall", () => {
        expect(JSON.stringify(gameInfo04a.blueBall)).toBe(JSON.stringify({ x: 4, y: 4 }));
    });


    let gameInfo04b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        forces: [{ x: 4, y: 1, direction: "down" }]
    };
    let input04b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 16, 0, 0, 111, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput04b = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 2, 16, 0, 0, 111, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let info04b = checkForces(input04b, gameInfo04b);
    it("Force down B", () => {
        expect(JSON.stringify(input04b)).toBe(JSON.stringify(expectedOutput04b));
    });
    it("Force down B info", () => {
        expect(info04b).toBe(true);
    });
    it("Force down B blueBall", () => {
        expect(JSON.stringify(gameInfo04b.blueBall)).toBe(JSON.stringify({ x: 3, y: 4 }));
    });

    let gameInfo04c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 3 },
        forces: [{ x: 4, y: 1, direction: "down" }]
    };
    let input04c = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 0, 0, 110, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 0, 5, 16, 0, 0, 111, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput04c = copy2dArray(input04c);
    let info04c = checkForces(input04c, gameInfo04c);
    it("Force down C", () => {
        expect(JSON.stringify(input04c)).toBe(JSON.stringify(expectedOutput04c));
    });
    it("Force down C info", () => {
        expect(info04c).toBe(false);
    });
    it("Force down C blueBall", () => {
        expect(JSON.stringify(gameInfo04c.blueBall)).toBe(JSON.stringify({ x: 4, y: 3 }));
    });


    // ***** hasForceRight *****

    let gameInfo05a = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        forces: [{ x: 1, y: 1, direction: "right" }]
    };
    let input5a = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 0, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5a = hasForceRight(input5a, gameInfo05a, 4, 1);
    it("hasForceRight A", () => {
        expect(info5a).toBe(true);
    });

    let gameInfo05b = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        forces: [{ x: 1, y: 1, direction: "right" }]
    };
    let input5b = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 4, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5b = hasForceRight(input5b, gameInfo05b, 4, 1);
    it("hasForceRight B", () => {
        expect(info5b).toBe(true);
    });

    let gameInfo05c = {
        ...defaultGameInfo,
        blueBall: { x: 4, y: 1 },
        forces: [{ x: 1, y: 1, direction: "right" }]
    };
    let input5c = [
        [1, 1, 1, 1, 1, 1],
        [1, 111, 5, 0, 2, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info5c = hasForceRight(input5c, gameInfo05c, 4, 1);
    it("hasForceRight C", () => {
        expect(info5c).toBe(false);
    });

    // ***** hasForceLeft *****
    let gameInfo06a = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        forces: [{ x: 4, y: 1, direction: "left" }]
    };
    let input6a = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6a = hasForceLeft(input6a, gameInfo06a, 1, 1);
    it("hasForceLeft A", () => {
        expect(info6a).toBe(true);
    });

    let gameInfo06b = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        forces: [{ x: 4, y: 1, direction: "left" }]
    };
    let input6b = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 4, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6b = hasForceLeft(input6b, gameInfo06b, 1, 1);
    it("hasForceLeft B", () => {
        expect(info6b).toBe(true);
    });

    let gameInfo06c = {
        ...defaultGameInfo,
        blueBall: { x: 1, y: 1 },
        forces: [{ x: 4, y: 1, direction: "left" }]
    };
    let input6c = [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 5, 0, 112, 1],
        [1, 1, 1, 1, 1, 1],
    ];
    let info6c = hasForceLeft(input6c, gameInfo06c, 1, 1);
    it("hasForceLeft C", () => {
        expect(info6c).toBe(false);
    });

    // ***** hasForceUp *****
    let gameInfo07a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 2 },
        forces: [{ x: 2, y: 4, direction: "up" }]
    };
    let input7a = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7a = hasForceUp(input7a, gameInfo07a, 2, 2);
    it("hasForceUp A", () => {
        expect(info7a).toBe(true);
    });

    let gameInfo07b = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 2 },
        forces: [{ x: 2, y: 4, direction: "up" }]
    };
    let input7b = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 4, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7b = hasForceUp(input7b, gameInfo07b, 2, 2);
    it("hasForceUp B", () => {
        expect(info7b).toBe(true);
    });

    let gameInfo07c = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 2 },
        forces: [{ x: 2, y: 4, direction: "up" }]
    };
    let input7c = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 0, 5, 0, 1],
        [1, 0, 109, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info7c = hasForceUp(input7c, gameInfo07c, 2, 2);
    it("hasForceUp C", () => {
        expect(info7c).toBe(false);
    });

    let gameInfo07d = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 2 },
        forces: [{ x: 2, y: 4, direction: "up" }, { x: 2, y: 7, direction: "up" }]
    };
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
    let info7d = hasForceUp(input7d, gameInfo07d, 2, 2);
    it("hasForceUp D", () => {
        expect(info7d).toBe(true);
    });

    // ***** hasForceDown *****
    let gameInfo08a = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        forces: [{ x: 2, y: 1, direction: "down" }]
    };
    let input8a = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8a = hasForceDown(input8a, gameInfo08a, 2, 4);
    it("hasForceDown A", () => {
        expect(info8a).toBe(true);
    });

    let gameInfo08b = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        forces: [{ x: 2, y: 1, direction: "down" }]
    };
    let input8b = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 4, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8b = hasForceDown(input8b, gameInfo08b, 2, 4);
    it("hasForceDown B", () => {
        expect(info8b).toBe(true);
    });

    let gameInfo08c = {
        ...defaultGameInfo,
        blueBall: { x: 2, y: 4 },
        forces: [{ x: 2, y: 1, direction: "down" }]
    };
    let input8c = [
        [1, 1, 1, 1, 1],
        [1, 0, 110, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 5, 0, 1],
        [1, 0, 2, 0, 1],
        [1, 1, 1, 1, 1],
    ];
    let info8c = hasForceDown(input8c, gameInfo08c, 2, 4);
    it("hasForceDown C", () => {
        expect(info8c).toBe(false);
    });

    // Insert new tests here
});
