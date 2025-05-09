import { describe, it, expect } from "vitest";
import { polar, randomInt } from "./utils";

describe("utils", () => {
  const input2 = { x: 100, y: 50 };
  const expectedOutput2 = { x: 150, y: 50 };
  const output2 = polar(input2.x, input2.y, 0, 50);
  it("polar", () => {
    expect(JSON.stringify(output2)).toBe(JSON.stringify(expectedOutput2));
  });

  const input3aMin = 1;
  const input3aMax = 3;
  let output3a = randomInt(input3aMin, input3aMax);
  let output3aOk = output3a >= input3aMin && output3a <= input3aMax;
  it("randomInt 1 - 3", () => {
    expect(output3aOk).toBe(true);
  });

  const input3bMin = -2;
  const input3bMax = 2;
  let output3b = randomInt(input3bMin, input3bMax);
  let output3bOk = output3b >= input3bMin && output3b <= input3bMax;
  it("randomInt -2 - 2", () => {
    expect(output3bOk).toBe(true);
  });

});
