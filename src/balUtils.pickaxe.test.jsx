import { describe, it, expect } from "vitest";
import {
  jump,
  moveRight,
  pushObject,
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

  let input01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 35, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01c = pushObject(inputBack01, input01c, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, hasPickaxe: true }, { ...defaultGameVars });
  it("Pickaxe C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("Pickaxe C info", () => {
    expect(JSON.stringify(info01c)).toBe(
      JSON.stringify({
        player: true,
        sound: "pickaxe",
      })
    );
  });

  let input01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 35, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01d = jump(inputBack01, input01d, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, hasPickaxe: true }, { ...defaultGameVars });
  it("Pickaxe D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("Pickaxe D info", () => {
    expect(JSON.stringify(info01d)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "pickaxe",
      })
    );
  });

  let gameInfo01e = {
    ...defaultGameInfo,
    blueBall: { x: 3, y: 2 },
    hasPickaxe: true,
    damagedStones: [{ x: 3, y: 1, status: 0 }]
  };
  let input01e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 12, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01e = jump(inputBack01, input01e, gameInfo01e, { ...defaultGameVars });
  it("Pickaxe E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("Pickaxe E info", () => {
    expect(JSON.stringify(info01e)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "pickaxe",
      })
    );
  });
  it("Pickaxe E damagedStones", () => {
    expect(JSON.stringify(gameInfo01e.damagedStones)).toBe(JSON.stringify([{ x: 3, y: 1, status: -1 }]));
  });

  // GRAVITY UP

  let inputBack02 = zeroArray(4, 7);

  let input02a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 35, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput02a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info02a = jump(inputBack02, input02a, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, hasPickaxe: true }, { ...defaultGameVars, gravity: "up" });
  it("Pickaxe Gravity Up A", () => {
    expect(JSON.stringify(input02a)).toBe(JSON.stringify(expectedOutput02a));
  });
  it("Pickaxe Gravity Up A info", () => {
    expect(JSON.stringify(info02a)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        sound: "pickaxe",
      })
    );
  });

  let input02b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 35, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput02b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info02b = pushObject(inputBack02, input02b, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, hasPickaxe: true }, { ...defaultGameVars, gravity: "up" });
  it("Pickaxe Gravity Up B", () => {
    expect(JSON.stringify(input02b)).toBe(JSON.stringify(expectedOutput02b));
  });
  it("Pickaxe Gravity Up B info", () => {
    expect(JSON.stringify(info02b)).toBe(
      JSON.stringify({
        player: true,
        sound: "pickaxe",
      })
    );
  });

  let gameInfo02c = {
    ...defaultGameInfo,
    blueBall: { x: 3, y: 2 },
    hasPickaxe: true,
    damagedStones: [{ x: 3, y: 1, status: 0 }]
  };
  let input02c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 12, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput02c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info02c = pushObject(inputBack02, input02c, gameInfo02c, { ...defaultGameVars, gravity: "up" });
  it("Pickaxe Gravity Up C", () => {
    expect(JSON.stringify(input02c)).toBe(JSON.stringify(expectedOutput02c));
  });
  it("Pickaxe Gravity Up C info", () => {
    expect(JSON.stringify(info02c)).toBe(
      JSON.stringify({
        player: true,
        sound: "pickaxe",
      })
    );
  });
  it("Pickaxe Gravity Up C damagedStones", () => {
    expect(JSON.stringify(gameInfo02c.damagedStones)).toBe(JSON.stringify([{ x: 3, y: 1, status: -1 }]));
  });


  // Insert new tests here
});    