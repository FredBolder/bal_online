import { describe, it, expect } from "vitest";
import { codeToNumber, numberToCode } from "./codes.js";

describe("codes", () => {

    for (let i = 1; i <= 997; i++) {
        it(`Code Level ${i}`, () => {
            expect(codeToNumber(numberToCode(i))).toBe(i);
        });
    }


});