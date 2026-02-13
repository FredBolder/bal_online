import { beforeEach, describe, it, expect } from "vitest";
import { jumpLeftOrRight, zeroArray, } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils jump left", () => {
  let defaultGameInfo;
  let defaultGameVars;

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
  });

  it("jump left A", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 2, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, gameInfo, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 1, y: 2 }));
  });

  it("jump left B", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 2, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1],
      [1, 2, 0, 0, 1],
      [1, 0, 0, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
  });

  it("jump left C", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 2, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 2, 0, 0, 1],
      [1, 1, 0, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("jump left D", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("jump left E", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("jump left F", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jumpLeftOrRight(inputBack, input, gameInfo, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 1, y: 1 }));
  });

  it("jump left G", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 2 } };
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 15, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = jumpLeftOrRight(inputBack, input, gameInfo, defaultGameVars, "left");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
  });


  // Insert new tests here
});