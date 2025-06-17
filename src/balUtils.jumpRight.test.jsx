import { describe, it, expect } from "vitest";
import {
    jumpRight,
    zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils jumpRight", () => {
    const defaultGameInfo = {};
    initGameInfo(defaultGameInfo);

  let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 2, y: 3 } };
  let inputBack01_5_5 = zeroArray(5, 5);
  let input01a = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 2, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01a = jumpRight(inputBack01_5_5, input01a, gameInfo01a);
  it("jumpRight A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("jumpRight A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("jumpRight A player", () => {
    expect(info01a.player).toBe(true);
  });
  it("jumpRight A blueBall", () => {
    expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
  });

  let input01b = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 4, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 2, 1],
    [1, 4, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01b = jumpRight(inputBack01_5_5, input01b, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpRight B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("jumpRight B eating", () => {
    expect(info01b.eating).toBe(true);
  });
  it("jumpRight B player", () => {
    expect(info01b.player).toBe(true);
  });

  let input01c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 0, 1],
    [1, 4, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 2, 1],
    [1, 4, 0, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01c = jumpRight(inputBack01_5_5, input01c, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpRight C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("jumpRight C eating", () => {
    expect(info01c.eating).toBe(false);
  });
  it("jumpRight C player", () => {
    expect(info01c.player).toBe(true);
  });

  let input01d = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01d = jumpRight(inputBack01_5_5, input01d, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpRight D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("jumpRight D eating", () => {
    expect(info01d.eating).toBe(false);
  });
  it("jumpRight D player", () => {
    expect(info01d.player).toBe(false);
  });

  let input01e = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01e = jumpRight(inputBack01_5_5, input01e, { ...defaultGameInfo, blueBall: { x: 2, y: 3 } });
  it("jumpRight E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("jumpRight E eating", () => {
    expect(info01e.eating).toBe(false);
  });
  it("jumpRight E player", () => {
    expect(info01e.player).toBe(false);
  });

  let gameInfo01f = { ...defaultGameInfo, blueBall: { x: 2, y: 3 }, hasCoilSpring: true };
  let input01f = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput01f = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 2, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info01f = jumpRight(inputBack01_5_5, input01f, gameInfo01f);
  it("jumpRight F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("jumpRight F eating", () => {
    expect(info01f.eating).toBe(true);
  });
  it("jumpRight F player", () => {
    expect(info01f.player).toBe(true);
  });
  it("jumpRight F blueBall", () => {
    expect(JSON.stringify(gameInfo01f.blueBall)).toBe(JSON.stringify({ x: 3, y: 1 }));
  });


    // Insert new tests here
});