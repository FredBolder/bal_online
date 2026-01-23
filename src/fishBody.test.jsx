import { describe, it, expect } from "vitest";
import { buildBodyCurves, getBodyBottomFrame, getBodyTopFrame } from "./fishBody.js";

describe("fishBody", () => {
    const noBending = {
        topFrontBodyCpPos: 0.5,
        topFrontBodyCpDist: 0,
        topRearBodyCpPos: 0.5,
        topRearBodyCpDist: 0,
        bottomFrontBodyCpPos: 0.5,
        bottomFrontBodyCpDist: 0,
        bottomRearBodyCpPos: 0.5,
        bottomRearBodyCpDist: 0,
    };

    it("getBodyTopFrame 1", () => {
        const yc = 25;
        const geom = {
            midX: 50,
            bodyLeft: 0,
            bodyRight: 100,
            headRight: 100,
            headTopY: yc,
            headBottomY: yc,
            top: 0,
            bottom: 50,
            yc,
            connectionHeight: 10,
            isTang: false
        }
        const bodyCurves = buildBodyCurves(geom, noBending);

        const input = [0, 0.25, 0.5, 0.75, 1]; // 0 = right (head), 1 = left (tail)
        const expected = [
            { x: geom.headRight, y: yc },
            { x: (geom.headRight + geom.midX) * 0.5, y: (yc + geom.top) * 0.5 },
            { x: geom.midX, y: geom.top },
            { x: (geom.midX + geom.bodyLeft) * 0.5, y: (geom.top + (yc - (geom.connectionHeight * 0.5))) * 0.5 },
            { x: geom.bodyLeft, y: yc - (geom.connectionHeight * 0.5) }
        ];
        const result = [];
        for (let i = 0; i < input.length; i++) {
            const t = input[i];
            const ft = getBodyTopFrame(bodyCurves, t).p;
            result.push(ft);
        }
        expect(result).toEqual(expected);
    });

    it("getBodyTopFrame 2", () => {
        const yc = 25;
        const geom = {
            midX: 50,
            bodyLeft: 0,
            bodyRight: 80,
            headRight: 100,
            headTopY: yc - 10,
            headBottomY: yc + 10,
            top: 0,
            bottom: 50,
            yc,
            connectionHeight: 10,
            isTang: true
        }
        const bodyCurves = buildBodyCurves(geom, noBending);

        const input = [0, 0.25, 0.5, 0.75, 1]; // 0 = right (head), 1 = left (tail)
        const expected = [
            { x: geom.headRight, y: geom.headTopY },
            { x: (geom.headRight + geom.midX) * 0.5, y: (geom.headTopY + geom.top) * 0.5 },
            { x: geom.midX, y: geom.top },
            { x: (geom.midX + geom.bodyLeft) * 0.5, y: (geom.top + (yc - (geom.connectionHeight * 0.5))) * 0.5 },
            { x: geom.bodyLeft, y: yc - (geom.connectionHeight * 0.5) }
        ];
        const result = [];
        for (let i = 0; i < input.length; i++) {
            const t = input[i];
            const ft = getBodyTopFrame(bodyCurves, t).p;
            result.push(ft);
        }
        expect(result).toEqual(expected);
    });

    it("getBodyBottomFrame 1", () => {
        const yc = 25;
        const geom = {
            midX: 50,
            bodyLeft: 0,
            bodyRight: 100,
            headRight: 100,
            headTopY: yc,
            headBottomY: yc,
            top: 0,
            bottom: 50,
            yc,
            connectionHeight: 10,
            isTang: false
        }
        const bodyCurves = buildBodyCurves(geom, noBending);

        // 1 = right (head), 0 = left (tail)
        // Changed in fin drawing functions to "0 = right (head), 1 = left (tail)" for easier use
        const input = [1, 0.75, 0.5, 0.25, 0];
        const expected = [
            { x: geom.headRight, y: yc },
            { x: (geom.headRight + geom.midX) * 0.5, y: (yc + geom.bottom) * 0.5 },
            { x: geom.midX, y: geom.bottom },
            { x: (geom.midX + geom.bodyLeft) * 0.5, y: (geom.bottom + (yc + (geom.connectionHeight * 0.5))) * 0.5 },
            { x: geom.bodyLeft, y: yc + (geom.connectionHeight * 0.5) }
        ];
        const result = [];
        for (let i = 0; i < input.length; i++) {
            const t = input[i];
            const ft = getBodyBottomFrame(bodyCurves, t).p;
            result.push(ft);
        }
        expect(result).toEqual(expected);
    });

    it("getBodyBottomFrame 2", () => {
        const yc = 25;
        const geom = {
            midX: 50,
            bodyLeft: 0,
            bodyRight: 100,
            headRight: 100,
            headTopY: yc - 10,
            headBottomY: yc + 10,
            top: 0,
            bottom: 50,
            yc,
            connectionHeight: 10,
            isTang: true
        }
        const bodyCurves = buildBodyCurves(geom, noBending);

        // 1 = right (head), 0 = left (tail)
        // Changed in fin drawing functions to "0 = right (head), 1 = left (tail)" for easier use
        const input = [1, 0.75, 0.5, 0.25, 0];
        const expected = [
            { x: geom.headRight, y: geom.headBottomY },
            { x: (geom.headRight + geom.midX) * 0.5, y: (geom.headBottomY + geom.bottom) * 0.5 },
            { x: geom.midX, y: geom.bottom },
            { x: (geom.midX + geom.bodyLeft) * 0.5, y: (geom.bottom + (yc + (geom.connectionHeight * 0.5))) * 0.5 },
            { x: geom.bodyLeft, y: yc + (geom.connectionHeight * 0.5) }
        ];
        const result = [];
        for (let i = 0; i < input.length; i++) {
            const t = input[i];
            const ft = getBodyBottomFrame(bodyCurves, t).p;
            result.push(ft);
        }
        expect(result).toEqual(expected);
    });


    // Insert new tests here
});
