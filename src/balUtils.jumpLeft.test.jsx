import { describe, it, expect } from "vitest";
import {
    jumpLeft,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils jumpLeft", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

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
  let info01a = jumpLeft(inputBack01_5_5, input01a, gameInfo01a);
  it("jumpLeft A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("jumpLeft A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("jumpLeft A player", () => {
    expect(info01a.player).toBe(true);
  });
  it("jumpLeft A blueBall", () => {
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
  let info01b = jumpLeft(inputBack01_5_5, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpLeft B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("jumpLeft B eating", () => {
    expect(info01b.eating).toBe(true);
  });
  it("jumpLeft B player", () => {
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
  let info01c = jumpLeft(inputBack01_5_5, input01c, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpLeft C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("jumpLeft C eating", () => {
    expect(info01c.eating).toBe(false);
  });
  it("jumpLeft C player", () => {
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
  let info01d = jumpLeft(inputBack01_5_5, input01d, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpLeft D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("jumpLeft D eating", () => {
    expect(info01d.eating).toBe(false);
  });
  it("jumpLeft D player", () => {
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
  let info01e = jumpLeft(inputBack01_5_5, input01e, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpLeft E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("jumpLeft E eating", () => {
    expect(info01e.eating).toBe(false);
  });
  it("jumpLeft E player", () => {
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
  let info01f = jumpLeft(inputBack01_5_5, input01f, gameInfo01f);
  it("jumpLeft F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("jumpLeft F eating", () => {
    expect(info01f.eating).toBe(true);
  });
  it("jumpLeft F player", () => {
    expect(info01f.player).toBe(true);
  });
  it("jumpLeft F blueBall", () => {
    expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 1, y: 1 }));
  });



    // Insert new tests here
});