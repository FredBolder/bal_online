import { describe, it, expect } from "vitest";
import {
  checkFalling,
  jump,
  pushDown,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils Ladders", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  let inputBack01abcd = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let input01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01a = checkFalling(inputBack01abcd, input01a, { ...defaultGameInfo }, { ...defaultGameVars });
  it("Ladders A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("Ladders A info", () => {
    expect(JSON.stringify(info01a)).toBe(
      JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: "" })
    );
  });

  let input01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01b = pushDown(inputBack01abcd, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } }, { ...defaultGameVars });
  it("Ladders B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("Ladders B info", () => {
    expect(JSON.stringify(info01b)).toBe(
      JSON.stringify({ player: true, sound: "" })
    );
  });

  let input01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01c = checkFalling(inputBack01abcd, input01c, { ...defaultGameInfo }, { ...defaultGameVars });
  it("Ladders C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("Ladders C info", () => {
    expect(JSON.stringify(info01c)).toBe(
      JSON.stringify({ update: true, ballX: 2, ballY: 6, sound: "" })
    );
  });

  let input01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01d = jump(inputBack01abcd, input01d, { ...defaultGameInfo, blueBall: { x: 2, y: 4 } });
  it("Ladders D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("Ladders D info", () => {
    expect(JSON.stringify(info01d)).toBe(
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