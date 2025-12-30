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
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = checkFalling(inputBack, input, { ...defaultGameInfo }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ update: false, sound: "" })
    );
  });

  it("Ladders B", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = pushObject(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ player: true, sound: "" })
    );
  });

  it("Ladders C", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = checkFalling(inputBack, input, { ...defaultGameInfo }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({ update: true, sound: "" })
    );
  });

  it("Ladders D", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = jump(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } }, defaultGameVars);
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