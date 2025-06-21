import { describe, it, expect } from "vitest";
import { codeToNumber, numberToCode } from "./codes.js";

describe("codes", () => {

    for (let i = 200; i <= 210; i++) {
        it(`Code A Level ${i}`, () => {
            expect(codeToNumber(numberToCode(i))).toBe(i);
        });
    }
    for (let i = 2090; i <= 2100; i++) {
        it(`Code B Level ${i}`, () => {
            expect(codeToNumber(numberToCode(i))).toBe(i);
        });
    }

});