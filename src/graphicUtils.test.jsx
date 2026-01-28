import { describe, it, expect } from "vitest";
import { dist } from "./graphicUtils.js";

describe("graphicUtils", () => {
    it("dist A", () => {
        const output = dist(1, 2, 4, 6);
        expect(output).toBeCloseTo(5);
    });

    it("dist B", () => {
        const output = dist(4, 6, 1, 2);
        expect(output).toBeCloseTo(5);
    });

    // Insert new tests here
});
