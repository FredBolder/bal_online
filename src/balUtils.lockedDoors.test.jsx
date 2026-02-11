import { beforeEach, describe, it, expect } from "vitest";
import { jump, moveLeft, moveRight, pushObject, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils Locked doors", () => {
  let defaultGameInfo;
  let defaultGameVars;

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
  });

  it("Locks A", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 2, y: 2 },
      greenBalls: 1,
      hasKey: true
    };
    const inputBack = zeroArray(4, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = moveRight(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: true, sound: "unlock" });
    expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
  });

  it("Locks B", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 2, y: 2 },
      greenBalls: 1,
    };
    const inputBack = zeroArray(4, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = moveRight(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: false, sound: "" });
    expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
  });

  it("Locks C", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 4, y: 2 },
      greenBalls: 1,
      hasKey: true
    };
    const inputBack = zeroArray(4, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = moveLeft(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: true, sound: "unlock" });
    expect(gameInfo.blueBall).toEqual({ x: 2, y: 2 });
  });

  it("Locks D", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 4, y: 2 },
      greenBalls: 1,
    };
    const inputBack = zeroArray(4, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = moveLeft(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: false, sound: "" });
    expect(gameInfo.blueBall).toEqual({ x: 4, y: 2 });
  });

  it("Locks E", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 1 },
      greenBalls: 1,
      hasKey: true
    };
    const inputBack = zeroArray(5, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ player: true, sound: "unlock" });
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
  });

  it("Locks F", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 1 },
      greenBalls: 1
    };
    const inputBack = zeroArray(5, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = pushObject(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ player: false, sound: "" });
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 1 });
  });

  it("Locks G", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 3 },
      greenBalls: 1,
      hasKey: true
    };
    const inputBack = zeroArray(5, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "unlock" });
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 1 });
});

  it("Locks H", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 3 },
      greenBalls: 1
    };
    const inputBack = zeroArray(5, 7);
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 1, 1, 30, 1, 1, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = copy2dArray(input);
    const info = jump(inputBack, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ eating: false, freezeTime: -1, player: false, sound: "" });
    expect(gameInfo.blueBall).toEqual({ x: 3, y: 3 });
  });

  // Insert new tests here
});    