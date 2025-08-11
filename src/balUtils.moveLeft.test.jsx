import { describe, it, expect } from "vitest";
import { moveLeft, zeroArray } from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils moveLeft", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);

  let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 1, y: 1 } };
  let inputBack01_3_6 = zeroArray(3, 6);
  let input01a = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01a = moveLeft(inputBack01_3_6, input01a, gameInfo01a);
  it("moveLeft A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("moveLeft A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("moveLeft A player", () => {
    expect(info01a.player).toBe(false);
  });
  it("moveLeft A blueBall", () => {
    expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 1, y: 1 }));
  });

  let gameInfo01b = { ...defaultGameInfo, blueBall: { x: 2, y: 1 } };
  let input01b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01b = moveLeft(inputBack01_3_6, input01b, gameInfo01b);
  it("moveLeft B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("moveLeft B eating", () => {
    expect(info01b.eating).toBe(false);
  });
  it("moveLeft B player", () => {
    expect(info01b.player).toBe(true);
  });
  it("moveLeft B blueBall", () => {
    expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 1, y: 1 }));
  });

  let input01c = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 2, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01c = moveLeft(inputBack01_3_6, input01c, { ...defaultGameInfo, blueBall: { x: 2, y: 1 } });
  it("moveLeft C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("moveLeft C eating", () => {
    expect(info01c.eating).toBe(true);
  });
  it("moveLeft C player", () => {
    expect(info01c.player).toBe(true);
  });

  let input01d = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01d = moveLeft(inputBack01_3_6, input01d, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } });
  it("moveLeft D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("moveLeft D eating", () => {
    expect(info01d.eating).toBe(false);
  });
  it("moveLeft D player", () => {
    expect(info01d.player).toBe(true);
  });

  let input01e = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01e = moveLeft(inputBack01_3_6, input01e, { ...defaultGameInfo, blueBall: { x: 3, y: 1 } });
  it("moveLeft E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("moveLeft E eating", () => {
    expect(info01e.eating).toBe(false);
  });
  it("moveLeft E player", () => {
    expect(info01e.player).toBe(false);
  });

  let input01f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01f = moveLeft(inputBack01_3_6, input01f, { ...defaultGameInfo, blueBall: { x: 5, y: 1 } });
  it("moveLeft F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("moveLeft F eating", () => {
    expect(info01f.eating).toBe(false);
  });
  it("moveLeft F player", () => {
    expect(info01f.player).toBe(false);
  });

  let input01g = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 5, 4, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01g = [
    [1, 1, 1, 1, 1, 1],
    [1, 5, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01g = moveLeft(inputBack01_3_6, input01g, { ...defaultGameInfo, blueBall: { x: 4, y: 1 } });
  it("moveLeft G", () => {
    expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
  });
  it("moveLeft G eating", () => {
    expect(info01g.eating).toBe(false);
  });
  it("moveLeft G player", () => {
    expect(info01g.player).toBe(true);
  });

  let input01h = [
    [1, 1, 1, 1, 1, 1],
    [1, 111, 0, 5, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01h = input01h.map(row => [...row]);
  let info01h = moveLeft(inputBack01_3_6, input01h, { ...defaultGameInfo, blueBall: { x: 4, y: 1 }, forces: [{ x: 1, y: 1, direction: 6 }] });
  it("moveLeft H", () => {
    expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
  });
  it("moveLeft H player", () => {
    expect(info01h.player).toBe(false);
  });

  let gameInfo01i = { ...defaultGameInfo, blueBall: { x: 4, y: 2 }, yellowBars: [{ x: 3, y: 2, direction: "none" }] };
  let inputBack01_8_6 = zeroArray(8, 6);
  let input01i = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 0, 124, 2, 1],
    [1, 0, 0, 123, 5, 1],
    [1, 0, 0, 123, 0, 1],
    [1, 0, 0, 125, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01i = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 124, 2, 0, 1],
    [1, 0, 123, 0, 5, 1],
    [1, 0, 123, 0, 0, 1],
    [1, 0, 125, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01i = moveLeft(inputBack01_8_6, input01i, gameInfo01i);
  it("moveLeft I", () => {
    expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
  });
  it("moveLeft I eating", () => {
    expect(info01i.eating).toBe(false);
  });
  it("moveLeft I player", () => {
    expect(info01i.player).toBe(true);
  });
  it("moveLeft I blueBall", () => {
    expect(JSON.stringify(gameInfo01i.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
  });
  it("moveLeft I yellowBars", () => {
    expect(JSON.stringify(gameInfo01i.yellowBars)).toBe(JSON.stringify([{ x: 2, y: 2, direction: "left" }]));
  });


  // Insert new tests here
});