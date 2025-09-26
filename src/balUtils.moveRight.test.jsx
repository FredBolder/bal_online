import { describe, it, expect } from "vitest";
import {
  moveRight,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils moveRight", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  const inputBack01_3_6 = zeroArray(3, 6);
  const inputBack01_3_7 = zeroArray(3, 7);
  const inputBack01_8_6 = zeroArray(8, 6);

  it("moveRight A", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
    expect(gameInfo.blueBall).toEqual({ x: 4, y: 1 });
  });

  it("moveRight B", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 1 } };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 2, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual(
      {
        action: "",
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "",
      }
    );
    expect(gameInfo.blueBall).toEqual({ x: 4, y: 1 });
  });

  it("moveRight C", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 2, 3, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 4, 0, 2, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 3, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(true);
    expect(info.player).toBe(true);
  });

  it("moveRight D", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 4, 4, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 4, 4, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("moveRight E", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 4, 4, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 4, 4, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 2, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("moveRight F", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 4, 4, 4, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 4, 4, 4, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_7, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("moveRight G", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 4, 5, 4, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 4, 5, 4, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_7, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(false);
  });

  it("moveRight H", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 5, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 5, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("moveRight I", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 28, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 28, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
  });

  it("moveRight J", () => {
    const input01j = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 9, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput01j = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 2, 9, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const yellow01j = [{ x: 2, y: 1, direction: "none" }];
    const info01j = moveRight(inputBack01_3_6, input01j, { ...defaultGameInfo, blueBall: { x: 1, y: 1 }, yellowBalls: yellow01j }, { ...defaultGameVars });
    expect(input01j).toEqual(expectedOutput01j);
    expect(info01j.eating).toBe(false);
    expect(info01j.player).toBe(true);
    expect(yellow01j).toEqual([{ x: 3, y: 1, direction: "right" }]);
  });

  it("moveRight K", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 2, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 109, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 2, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 109, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_8_6, input, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, forces: [{ x: 3, y: 6, direction: "up" }] }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.player).toBe(true);
  });

  it("moveRight L", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 109, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 109, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_8_6, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, forces: [{ x: 3, y: 6, direction: "up" }] }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.player).toBe(false);
  });

  it("moveRight M", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 5, 0, 112, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = moveRight(inputBack01_3_6, input, { ...defaultGameInfo, blueBall: { x: 1, y: 1 }, forces: [{ x: 4, y: 1, direction: "left" }] }, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.player).toBe(false);
  });

  it("moveRight N", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, yellowBars: [{ x: 3, y: 2, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 2, 124, 0, 1],
      [1, 0, 5, 123, 0, 1],
      [1, 0, 0, 123, 0, 1],
      [1, 0, 0, 125, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 1],
      [1, 0, 0, 2, 124, 1],
      [1, 0, 5, 0, 123, 1],
      [1, 0, 0, 0, 123, 1],
      [1, 0, 0, 0, 125, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack01_8_6, input, gameInfo, { ...defaultGameVars });
    expect(input).toEqual(expectedOutput);
    expect(info.eating).toBe(false);
    expect(info.player).toBe(true);
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 2 });
    expect(gameInfo.yellowBars).toEqual([{ x: 4, y: 2, direction: "right" }]);
  });

  // Insert new tests here
});