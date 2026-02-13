import { beforeEach, describe, it, expect } from "vitest";
import { checkFalling, jump, pushObject } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils Ladders", () => {
  let defaultGameInfo;
  let defaultGameVars;
  let inputBack;

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
    inputBack = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 25, 0, 0, 0, 0],
      [0, 0, 25, 0, 0, 0, 0],
      [0, 0, 25, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  });

  it("Ladders A", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = checkFalling(inputBack, input, { ...defaultGameInfo }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ update: false, sound: "" })
    );
  });

  it("Ladders B", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = pushObject(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ player: true, sound: "" })
    );
  });

  it("Ladders C", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = checkFalling(inputBack, input, { ...defaultGameInfo }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ update: true, sound: "" })
    );
  });

  it("Ladders D", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = jump(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "",
      })
    );
  });

  // Insert new tests here
});