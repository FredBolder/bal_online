import { describe, it, expect } from "vitest";
import { moveLeft, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils moveLeft", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  const inputBack01_3_6 = zeroArray(3, 6);
  const inputBack01_8_6 = zeroArray(8, 6);

  it("moveLeft A", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 1, y: 1 } };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 0, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 0, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
    expect(gameInfo.blueBall).toEqual({ x: 1, y: 1 });
  });

  it("moveLeft B", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 1 } };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 0, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(gameInfo.blueBall).toEqual({ x: 1, y: 1 });
  });

  it("moveLeft C", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 2, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 0, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 2, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
  });

  it("moveLeft D", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 4, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 4, 4, 2, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("moveLeft E", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 4, 4, 2, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 4, 4, 2, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 3, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("moveLeft F", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 4, 4, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 4, 4, 4, 2, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 5, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("moveLeft G", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 5, 4, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 5, 4, 2, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("moveLeft H", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 111, 0, 5, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = moveLeft(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 1, y: 1, direction: "right" }] }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.player).toBe(false);
  });

  it("moveLeft I", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 2 }, yellowBars: [{ x: 3, y: 2, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 0, 124, 2, 1],
      [1, 0, 0, 123, 5, 1],
      [1, 0, 0, 123, 0, 1],
      [1, 0, 0, 125, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 124, 2, 0, 1],
      [1, 0, 123, 0, 5, 1],
      [1, 0, 123, 0, 0, 1],
      [1, 0, 125, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack01_8_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 2 });
    expect(gameInfo.yellowBars).toEqual([{ x: 2, y: 2, direction: "left" }]);
  });

  // Insert new tests here
});