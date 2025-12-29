import { beforeEach, describe, it, expect } from "vitest";
import {
  jump,
  moveRight,
  pushObject,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils Pickaxe", () => {
  let defaultGameInfo;
  let defaultGameVars;
  const inputBack_4_7 = zeroArray(4, 7);

  beforeEach(() => {
    defaultGameInfo = {};
    initGameInfo(defaultGameInfo);
    defaultGameVars = {};
    initGameVars(defaultGameVars);
  });


  it("Pickaxe A", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 35, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveRight(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, hasPickaxe: true }, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: true, sound: "pickaxe" });
  });

  it("Pickaxe B", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 35, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 2, 35, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = moveRight(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 2, y: 2 } }, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ action: "", eating: false, freezeTime: -1, player: false, sound: "" });
  });

  it("Pickaxe C", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 35, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = pushObject(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, hasPickaxe: true }, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ player: true, sound: "pickaxe" });
  });

  it("Pickaxe D", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 35, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = jump(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, hasPickaxe: true }, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "pickaxe" });
  });

  it("Pickaxe E", () => {
    let gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 2 },
      hasPickaxe: true,
      damagedStones: [{ x: 3, y: 1, status: 0 }]
    };
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 12, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = jump(inputBack_4_7, input, gameInfo, defaultGameVars);
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "pickaxe" });
    expect(gameInfo.damagedStones).toEqual([{ x: 3, y: 1, status: -1 }]);
  });

  // GRAVITY UP

  it("Pickaxe Gravity Up A", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 35, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = jump(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, hasPickaxe: true }, { ...defaultGameVars, gravity: "up" });
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ eating: false, freezeTime: -1, player: true, sound: "pickaxe" });
  });

  it("Pickaxe Gravity Up B", () => {
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 35, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = pushObject(inputBack_4_7, input, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, hasPickaxe: true }, { ...defaultGameVars, gravity: "up" });
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ player: true, sound: "pickaxe" });
  });

  it("Pickaxe Gravity Up C", () => {
    let gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 3, y: 2 },
      hasPickaxe: true,
      damagedStones: [{ x: 3, y: 1, status: 0 }]
    };
    let input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 12, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let expectedOutput = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 2, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    let info = pushObject(inputBack_4_7, input, gameInfo, { ...defaultGameVars, gravity: "up" });
    expect(input).toEqual(expectedOutput);
    expect(info).toEqual({ player: true, sound: "pickaxe" });
    expect(gameInfo.damagedStones).toEqual([{ x: 3, y: 1, status: -1 }]);
  });


  // Insert new tests here
});    