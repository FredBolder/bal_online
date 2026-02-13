import { beforeEach, describe, it, expect } from "vitest";
import { jump, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";


describe("balUtils jump", () => {
  let defaultGameInfo;
  let defaultGameVars;

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
  });

  it("jump A", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, gameInfo, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
  });

  it("jump B", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 2, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 0, 4, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
  });

  it("jump C", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 3, 1],
      [1, 2, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 3, 1],
      [1, 2, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, { ...defaultGameInfo, blueBall: { x: 1, y: 3 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("jump D", () => {
    const inputBack = zeroArray(5, 5);
    const input = [
      [1, 1, 1, 1, 1],
      [1, 3, 110, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 28, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = jump(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, forces: [{ x: 2, y: 2, direction: "down" }] }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.player).toBe(false);
  });

  it("jump E", () => {
    const inputBack = zeroArray(5, 5);
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, gameInfo, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 2, y: 1 }));
  });

  it("jump F", () => {
    const inputBack = zeroArray(5, 5);
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
    const input = [
      [1, 1, 1, 1, 1],
      [1, 0, 120, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, gameInfo, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(info.freezeTime).greaterThan(0);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 2, y: 1 }));
  });

  // Insert new tests here
});