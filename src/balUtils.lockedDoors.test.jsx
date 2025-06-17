import { describe, it, expect } from "vitest";
import {
    moveLeft,
    moveRight,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils Locked doors", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

  let inputBack01abcd = zeroArray(4, 7);
  let input01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 30, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 30, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01a = moveRight(inputBack01abcd, input01a, { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, hasKey: true });
  it("Locks A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });

  it("Locks A info", () => {
    expect(JSON.stringify(info01a)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        teleporting: false,
        rotate: false,
        sound: "unlock",
      })
    );
  });

  let input01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 30, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 30, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01b = moveRight(inputBack01abcd, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } });
  it("Locks B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });

  it("Locks B info", () => {
    expect(JSON.stringify(info01b)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: false,
        teleporting: false,
        rotate: false,
        sound: "",
      })
    );
  });

  let input01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 30, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 30, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01c = moveLeft(inputBack01abcd, input01c, { ...defaultGameInfo, blueBall: { x: 4, y: 2 }, hasKey: true });
  it("Locks C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });

  it("Locks C info", () => {
    expect(JSON.stringify(info01c)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        teleporting: false,
        rotate: false,
        sound: "unlock",
      })
    );
  });

  let input01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 30, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 30, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01d = moveLeft(inputBack01abcd, input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 2 } });
  it("Locks D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });

  it("Locks D info", () => {
    expect(JSON.stringify(info01d)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: false,
        teleporting: false,
        rotate: false,
        sound: "",
      })
    );
  });

    // Insert new tests here
});    