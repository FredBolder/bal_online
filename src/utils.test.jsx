import { describe, it, expect } from "vitest";
import { onlyOneIsTrue, polar, randomInt, reverseString } from "./utils.js";

describe("utils", () => {
  it("onlyOneIsTrue A", () => {
    const input = [false, false, true, false];
    const expectedOutput = true;
    const output = onlyOneIsTrue(input);
    expect(output).toBe(expectedOutput);
  });

  it("onlyOneIsTrue B", () => {
    const input = [true, false, true, false];
    const expectedOutput = false;
    const output = onlyOneIsTrue(input);
    expect(output).toBe(expectedOutput);
  });

  it("polar", () => {
    const input = { x: 100, y: 50 };
    const expectedOutput = { x: 150, y: 50 };
    const output = polar(input.x, input.y, 0, 50);
    expect(output).toEqual(expectedOutput);
  });

  it("randomInt 1 - 3", () => {
    const inputMin = 1;
    const inputMax = 3;
    let output = randomInt(inputMin, inputMax);
    let outputOk = output >= inputMin && output <= inputMax;
    expect(outputOk).toBe(true);
  });

  it("randomInt -2 - 2", () => {
    const inputMin = -2;
    const inputMax = 2;
    let output = randomInt(inputMin, inputMax);
    let outputOk = output >= inputMin && output <= inputMax;
    expect(outputOk).toBe(true);
  });

  it("reverseString", () => {
    const input = "Hello";
    const expectedOutput = "olleH";
    const output = reverseString(input);
    expect(output).toBe(expectedOutput);
  });

});
