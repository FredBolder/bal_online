import { describe, it, expect } from "vitest";
import { removeStyle } from "./questionStones.js";

describe("Question stones", () => {
    it("removeStyle A", () => {
        const input = "{center}Test";
        const expectedOutput = "Test";
        const output = removeStyle(input);
        expect(output).toBe(expectedOutput);
    });

    it("removeStyle B", () => {
        const input = "2+{left}3";
        const expectedOutput = "2+3";
        const output = removeStyle(input);
        expect(output).toBe(expectedOutput);
    });

    it("removeStyle C", () => {
        const input = "{right}5-7{middle}";
        const expectedOutput = "5-7";
        const output = removeStyle(input);
        expect(output).toBe(expectedOutput);
    });

    it("removeStyle D", () => {
        const input = "{center}{red}Test";
        const expectedOutput = "Test";
        const output = removeStyle(input);
        expect(output).toBe(expectedOutput);
    });
    
    // Insert new tests here
});