import { describe, it, expect } from "vitest";
import {
  moveRight,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils Pickaxe", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  let inputBack01 = zeroArray(4, 7);
  let input01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 35, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01a = moveRight(inputBack01, input01a, { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, hasPickaxe: true }, { ...defaultGameVars });
  it("Pickaxe A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });

  it("Pickaxe A info", () => {
    expect(JSON.stringify(info01a)).toBe(
      JSON.stringify({
        action: "",
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "pickaxe",
      })
    );
  });

  let input01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 35, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 35, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01b = moveRight(inputBack01, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, { ...defaultGameVars });
  it("Pickaxe B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });

  it("Pickaxe B info", () => {
    expect(JSON.stringify(info01b)).toBe(
      JSON.stringify({
        action: "",
        eating: false,
        freezeTime: -1,
        player: false,
        sound: "",
      })
    );
  });

  // Insert new tests here
});    