import { describe, it, expect } from "vitest";
import {
  jumpLeftOrRight,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";

describe("balUtils jump left", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
  let inputBack01_5_5 = zeroArray(5, 5);
  let input01a = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01a = jumpLeftOrRight(inputBack01_5_5, input01a, gameInfo01a, { ...defaultGameVars }, "left");
  it("jump left A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("jump left A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("jump left A player", () => {
    expect(info01a.player).toBe(true);
  });
  it("jump left A blueBall", () => {
    expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 1, y: 2 }));
  });

  let input01b = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 0, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01b = jumpLeftOrRight(inputBack01_5_5, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "left");
  it("jump left B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("jump left B eating", () => {
    expect(info01b.eating).toBe(true);
  });
  it("jump left B player", () => {
    expect(info01b.player).toBe(true);
  });

  let input01c = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01c = jumpLeftOrRight(inputBack01_5_5, input01c, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "left");
  it("jump left C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("jump left C eating", () => {
    expect(info01c.eating).toBe(false);
  });
  it("jump left C player", () => {
    expect(info01c.player).toBe(true);
  });

  let input01d = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01d = jumpLeftOrRight(inputBack01_5_5, input01d, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "left");
  it("jump left D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("jump left D eating", () => {
    expect(info01d.eating).toBe(false);
  });
  it("jump left D player", () => {
    expect(info01d.player).toBe(false);
  });

  let input01e = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01e = jumpLeftOrRight(inputBack01_5_5, input01e, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars }, "left");
  it("jump left E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("jump left E eating", () => {
    expect(info01e.eating).toBe(false);
  });
  it("jump left E player", () => {
    expect(info01e.player).toBe(false);
  });

  let gameInfo01f = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
  let input01f = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01f = [
    [1, 1, 1, 1, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01f = jumpLeftOrRight(inputBack01_5_5, input01f, gameInfo01f, { ...defaultGameVars }, "left");
  it("jump left F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("jump left F eating", () => {
    expect(info01f.eating).toBe(true);
  });
  it("jump left F player", () => {
    expect(info01f.player).toBe(true);
  });
  it("jump left F blueBall", () => {
    expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 1, y: 1 }));
  });

  let gameInfo01g = { ...defaultGameInfo, blueBall: { x: 2, y: 2 } };
  let input01g = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 15, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01g = copy2dArray(input01g);
  let info01g = jumpLeftOrRight(inputBack01_5_5, input01g, gameInfo01g, { ...defaultGameVars }, "left");
  it("jump left G", () => {
    expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
  });
  it("jump left G eating", () => {
    expect(info01g.eating).toBe(false);
  });
  it("jump left G player", () => {
    expect(info01g.player).toBe(false);
  });
  it("jump left G blueBall", () => {
    expect(JSON.stringify(gameInfo01g.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
  });


  // Insert new tests here
});