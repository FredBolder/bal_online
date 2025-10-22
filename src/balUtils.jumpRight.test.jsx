import { beforeEach, describe, it, expect } from "vitest";
import { jumpLeftOrRight, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils jump right", () => {
  let defaultGameInfo;
  let defaultGameVars;

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
  });

  it("jump right A", () => {
    let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
    let inputBack = zeroArray(5, 5);
    let input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 0, 2, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, gameInfo, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
  });

  it("jump right B", () => {
    let inputBack = zeroArray(5, 5);
    let input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 4, 2, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 2, 1],
      [1, 4, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
  });

  it("jump right C", () => {
    let inputBack = zeroArray(5, 5);
    let input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 0, 0, 1],
      [1, 4, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 0, 2, 1],
      [1, 4, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("jump right D", () => {
    let inputBack = zeroArray(5, 5);
    let input = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("jump right E", () => {
    let inputBack = zeroArray(5, 5);
    let input = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("jump right F", () => {
    let inputBack = zeroArray(5, 5);
    let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
    let input = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 3, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 2, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 2, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let info = jumpLeftOrRight(inputBack, input, gameInfo, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 3, y: 1 }));
  });

  it("jumpLeft G", () => {
    let inputBack = zeroArray(5, 5);
    let gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 2 } };
    let input = [
      [1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 16, 1, 1],
      [1, 1, 1, 1, 1],
    ];
    let expectedOutput = copy2dArray(input);
    let info = jumpLeftOrRight(inputBack, input, gameInfo, { ...defaultGameVars }, "right");
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
    expect(JSON.stringify(gameInfo.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
  });

  // Insert new tests here
});