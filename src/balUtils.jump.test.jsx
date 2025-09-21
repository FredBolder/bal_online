import { describe, it, expect } from "vitest";
import { jump, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { copy2dArray } from "./utils.js";


describe("balUtils jump", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);
  const defaultGameVars = {};
  initGameVars(defaultGameVars);

  let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
  let inputBack01_5_5 = zeroArray(5, 5);
  let input01a = [
    [1, 1, 1, 1, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01a = jump(inputBack01_5_5, input01a, gameInfo01a, { ...defaultGameVars });
  it("jump A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("jump A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("jump A player", () => {
    expect(info01a.player).toBe(true);
  });
  it("jump A blueBall", () => {
    expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 2, y: 2 }));
  });

  let input01b = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01b = jump(inputBack01_5_5, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } }, { ...defaultGameVars });
  it("jump B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("jump B eating", () => {
    expect(info01b.eating).toBe(true);
  });
  it("jump B player", () => {
    expect(info01b.player).toBe(true);
  });

  let input01c = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 3, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 3, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01c = jump(inputBack01_5_5, input01c, { ...defaultGameInfo, blueBall: { x: 1, y: 3 } }, { ...defaultGameVars });
  it("jump C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("jump C eating", () => {
    expect(info01c.eating).toBe(false);
  });
  it("jump C player", () => {
    expect(info01c.player).toBe(false);
  });

  let inputBack01d = zeroArray(5, 5);
  let input01d = [
    [1, 1, 1, 1, 1],
    [1, 3, 110, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 28, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = copy2dArray(input01d);
  let info01d = jump(inputBack01d, input01d, { ...defaultGameInfo, blueBall: { x: 2, y: 4 }, forces: [{ x: 2, y: 2, direction: "down" }] }, { ...defaultGameVars });
  it("jump D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("jump D player", () => {
    expect(info01d.player).toBe(false);
  });

  let gameInfo01e = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
  let input01e = [
    [1, 1, 1, 1, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01e = jump(inputBack01_5_5, input01e, gameInfo01e, { ...defaultGameVars });
  it("jump E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("jump E eating", () => {
    expect(info01e.eating).toBe(true);
  });
  it("jump E player", () => {
    expect(info01e.player).toBe(true);
  });
  it("jump E blueBall", () => {
    expect(JSON.stringify(gameInfo01e.blueBall)).toBe(JSON.stringify({ x: 2, y: 1 }));
  });

  let gameInfo01f = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
  let input01f = [
    [1, 1, 1, 1, 1],
    [1, 0, 120, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01f = [
    [1, 1, 1, 1, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01f = jump(inputBack01_5_5, input01f, gameInfo01f, { ...defaultGameVars });
  it("jump F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("jump F eating", () => {
    expect(info01f.eating).toBe(false);
  });
  it("jump F player", () => {
    expect(info01f.player).toBe(true);
  });
  it("jump F time freezer", () => {
    expect(info01f.freezeTime).greaterThan(0);
  });
  it("jump F blueBall", () => {
    expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 2, y: 1 }));
  });


  // Insert new tests here
});