import { beforeEach, describe, it, expect } from "vitest";
import { moveLeft, moveRight, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

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
    let inputBack = zeroArray(4, 7);
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, hasKey: true }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({
        action: "",
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "unlock",
      })
    );
  });

  it("Locks B", () => {
    let inputBack = zeroArray(4, 7);
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveRight(inputBack, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({
        action: "",
        eating: false,
        freezeTime: -1,
        player: false,
        sound: "",
      })
    );
  });

  it("Locks C", () => {
    let inputBack = zeroArray(4, 7);
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 30, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveLeft(inputBack, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 }, hasKey: true }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
      JSON.stringify({
        action: "",
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "unlock",
      })
    );
  });

  it("Locks D", () => {
    let inputBack = zeroArray(4, 7);
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 30, 2, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveLeft(inputBack, input, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } }, defaultGameVars);
    expect(JSON.stringify(input)).toBe(JSON.stringify(expectedOutput));
    expect(JSON.stringify(info)).toBe(
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