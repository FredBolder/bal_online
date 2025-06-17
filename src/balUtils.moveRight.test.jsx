import { describe, it, expect } from "vitest";
import {
  moveRight,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils moveRight", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);

  let gameInfo01a = { ...defaultGameInfo, blueBall: { x: 4, y: 1 } };
  let inputBack01_3_6 = zeroArray(3, 6);
  let input01a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01a = moveRight(inputBack01_3_6, input01a, gameInfo01a);
  it("moveRight A", () => {
    expect(JSON.stringify(input01a)).toBe(JSON.stringify(expectedOutput01a));
  });
  it("moveRight A eating", () => {
    expect(info01a.eating).toBe(false);
  });
  it("moveRight A player", () => {
    expect(info01a.player).toBe(false);
  });
  it("moveRight A blueBall", () => {
    expect(JSON.stringify(gameInfo01a.blueBall)).toBe(JSON.stringify({ x: 4, y: 1 }));
  });

  let gameInfo01b = { ...defaultGameInfo, blueBall: { x: 3, y: 1 } };
  let input01b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01b = moveRight(inputBack01_3_6, input01b, gameInfo01b);
  it("moveRight B", () => {
    expect(JSON.stringify(input01b)).toBe(JSON.stringify(expectedOutput01b));
  });
  it("moveRight B info", () => {
    expect(JSON.stringify(info01b)).toBe(
      JSON.stringify({
        eating: false,
        freezeTime: -1,
        player: true,
        teleporting: false,
        rotate: false,
        sound: "",
      })
    );
  });
  it("moveRight B blueBall", () => {
    expect(JSON.stringify(gameInfo01b.blueBall)).toBe(JSON.stringify({ x: 4, y: 1 }));
  });

  let input01c = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 2, 3, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01c = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01c = moveRight(inputBack01_3_6, input01c, { ...defaultGameInfo, blueBall: { x: 3, y: 1 } });
  it("moveRight C", () => {
    expect(JSON.stringify(input01c)).toBe(JSON.stringify(expectedOutput01c));
  });
  it("moveRight C eating", () => {
    expect(info01c.eating).toBe(true);
  });
  it("moveRight C player", () => {
    expect(info01c.player).toBe(true);
  });

  let input01d = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01d = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01d = moveRight(inputBack01_3_6, input01d, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } });
  it("moveRight D", () => {
    expect(JSON.stringify(input01d)).toBe(JSON.stringify(expectedOutput01d));
  });
  it("moveRight D eating", () => {
    expect(info01d.eating).toBe(false);
  });
  it("moveRight D player", () => {
    expect(info01d.player).toBe(true);
  });

  let input01e = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01e = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01e = moveRight(inputBack01_3_6, input01e, { ...defaultGameInfo, blueBall: { x: 2, y: 1 } });
  it("moveRight E", () => {
    expect(JSON.stringify(input01e)).toBe(JSON.stringify(expectedOutput01e));
  });
  it("moveRight E eating", () => {
    expect(info01e.eating).toBe(false);
  });
  it("moveRight E player", () => {
    expect(info01e.player).toBe(false);
  });

  let inputBack01_3_7 = zeroArray(3, 7);
  let input01f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01f = moveRight(inputBack01_3_7, input01f, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } });
  it("moveRight F", () => {
    expect(JSON.stringify(input01f)).toBe(JSON.stringify(expectedOutput01f));
  });
  it("moveRight F eating", () => {
    expect(info01f.eating).toBe(false);
  });
  it("moveRight F player", () => {
    expect(info01f.player).toBe(false);
  });

  let input01g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 5, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 5, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info01g = moveRight(inputBack01_3_7, input01g, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } });
  it("moveRight G", () => {
    expect(JSON.stringify(input01g)).toBe(JSON.stringify(expectedOutput01g));
  });
  it("moveRight G eating", () => {
    expect(info01g.eating).toBe(false);
  });
  it("moveRight G player", () => {
    expect(info01g.player).toBe(false);
  });

  let input01h = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 5, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01h = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 5, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01h = moveRight(inputBack01_3_6, input01h, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } });
  it("moveRight H", () => {
    expect(JSON.stringify(input01h)).toBe(JSON.stringify(expectedOutput01h));
  });
  it("moveRight H eating", () => {
    expect(info01h.eating).toBe(false);
  });
  it("moveRight H player", () => {
    expect(info01h.player).toBe(true);
  });

  let input01i = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 28, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01i = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 28, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01i = moveRight(inputBack01_3_6, input01i, { ...defaultGameInfo, blueBall: { x: 1, y: 1 } });
  it("moveRight I", () => {
    expect(JSON.stringify(input01i)).toBe(JSON.stringify(expectedOutput01i));
  });
  it("moveRight I eating", () => {
    expect(info01i.eating).toBe(false);
  });
  it("moveRight I player", () => {
    expect(info01i.player).toBe(true);
  });

  let input01j = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 9, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01j = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 9, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let yellow01j = [{ x: 2, y: 1, direction: "none" }];
  let info01j = moveRight(inputBack01_3_6, input01j, { ...defaultGameInfo, blueBall: { x: 1, y: 1 }, yellowBalls: yellow01j });
  it("moveRight J", () => {
    expect(JSON.stringify(input01j)).toBe(JSON.stringify(expectedOutput01j));
  });
  it("moveRight J eating", () => {
    expect(info01j.eating).toBe(false);
  });
  it("moveRight J player", () => {
    expect(info01j.player).toBe(true);
  });
  it("moveRight J yellow", () => {
    expect(JSON.stringify(yellow01j)).toBe(
      JSON.stringify([{ x: 3, y: 1, direction: "right" }])
    );
  });

  let inputBack01_8_6 = zeroArray(8, 6);

  let input01k = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 109, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01k = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 109, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01k = moveRight(inputBack01_8_6, input01k, { ...defaultGameInfo, blueBall: { x: 3, y: 1 }, forces: [{ x: 3, y: 6, direction: 8 }] });
  it("moveRight K", () => {
    expect(JSON.stringify(input01k)).toBe(JSON.stringify(expectedOutput01k));
  });
  it("moveRight K player", () => {
    expect(info01k.player).toBe(true);
  });

  let input01l = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 109, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01l = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 109, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01l = moveRight(inputBack01_8_6, input01l, { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, forces: [{ x: 3, y: 6, direction: 8 }] });
  it("moveRight L", () => {
    expect(JSON.stringify(input01l)).toBe(JSON.stringify(expectedOutput01l));
  });
  it("moveRight L player", () => {
    expect(info01l.player).toBe(false);
  });

  let input01m = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 5, 0, 112, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01m = input01m.map(row => [...row]);
  let info01m = moveRight(inputBack01_3_6, input01m, { ...defaultGameInfo, blueBall: { x: 1, y: 1 }, forces: [{ x: 4, y: 1, direction: 4 }] });
  it("moveRight M", () => {
    expect(JSON.stringify(input01m)).toBe(JSON.stringify(expectedOutput01m));
  });
  it("moveRight M player", () => {
    expect(info01m.player).toBe(false);
  });

  let gameInfo01n = { ...defaultGameInfo, blueBall: { x: 2, y: 2 }, yellowBars: [{ x: 3, y: 2, direction: "none" }] };
  let input01n = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 2, 124, 0, 1],
    [1, 0, 5, 123, 0, 1],
    [1, 0, 0, 123, 0, 1],
    [1, 0, 0, 125, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput01n = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1],
    [1, 0, 0, 2, 124, 1],
    [1, 0, 5, 0, 123, 1],
    [1, 0, 0, 0, 123, 1],
    [1, 0, 0, 0, 125, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info01n = moveRight(inputBack01_8_6, input01n, gameInfo01n);
  it("moveRight N", () => {
    expect(JSON.stringify(input01n)).toBe(JSON.stringify(expectedOutput01n));
  });
  it("moveRight N eating", () => {
    expect(info01n.eating).toBe(false);
  });
  it("moveRight N player", () => {
    expect(info01n.player).toBe(true);
  });
  it("moveRight N blueBall", () => {
    expect(JSON.stringify(gameInfo01n.blueBall)).toBe(JSON.stringify({ x: 3, y: 2 }));
  });
  it("moveRight N yellowBars", () => {
    expect(JSON.stringify(gameInfo01n.yellowBars)).toBe(JSON.stringify([{ x: 4, y: 2, direction: "right" }]));
  });


  // Insert new tests here
});