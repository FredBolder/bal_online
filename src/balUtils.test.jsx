import { describe, it, expect } from "vitest";
import {
  numberArrayToStringArray,
  stringArrayToNumberArray,
  checkFalling,
  moveLeft,
  moveRight,
  jump,
  jumpLeft,
  jumpRight,
  getGameInfo,
  checkRed,
  moveElevators,
  moveHorizontalElevators,
  moveYellowBalls,
  pushDown,
  rotateGame,
  zeroArray,
} from "./balUtils.js";

describe("balUtils", () => {
  let input1a = ["111111", "13 3 1", "1 2481", "111111"];
  let expectedOutput1a = {
    backData: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    gameData: [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 3, 0, 1],
      [1, 0, 2, 4, 8, 1],
      [1, 1, 1, 1, 1, 1],
    ],
  };
  let output1a = stringArrayToNumberArray(input1a);
  it("stringArrayToNumberArray A", () => {
    expect(JSON.stringify(output1a)).toBe(JSON.stringify(expectedOutput1a));
  });

  let input1b = [
    "111111111",
    "1=     31",
    "1=      1",
    "1=  42  1",
    "111111111",
  ];
  let expectedOutput1b = {
    backData: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 25, 0, 0, 0, 0, 0, 0, 0],
      [0, 25, 0, 0, 0, 0, 0, 0, 0],
      [0, 25, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    gameData: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 4, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  };
  let output1b = stringArrayToNumberArray(input1b);
  it("stringArrayToNumberArray B", () => {
    expect(JSON.stringify(output1b)).toBe(JSON.stringify(expectedOutput1b));
  });

  let input2 = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 4, 8, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput2 = ["111111", "13 3 1", "1    1", "1 2481", "111111"];
  let output2 = numberArrayToStringArray(input2);
  it("numberArrayToStringArray", () => {
    expect(JSON.stringify(output2)).toBe(JSON.stringify(expectedOutput2));
  });

  let input3a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 8, 4, 1],
    [1, 0, 0, 0, 4, 1],
    [1, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let inputBack3a = zeroArray(5, 6);
  let expectedOutput3a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 8, 4, 1],
    [1, 2, 0, 0, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info3a = checkFalling(inputBack3a, input3a, {
    redBalls: [{ x: 3, y: 1 }],
  });
  it("checkFalling A", () => {
    expect(JSON.stringify(input3a)).toBe(JSON.stringify(expectedOutput3a));
  });
  it("checkFalling A info", () => {
    expect(JSON.stringify(info3a)).toBe(
      JSON.stringify({ update: true, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let input3b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 0, 0, 0, 8, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let inputBack3b = zeroArray(5, 6);
  let expectedOutput3b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 4, 4, 2, 8, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info3b = checkFalling(inputBack3b, input3b, {
    redBalls: [{ x: 4, y: 3 }],
  });
  it("checkFalling B", () => {
    expect(JSON.stringify(input3b)).toBe(JSON.stringify(expectedOutput3b));
  });
  it("checkFalling B info", () => {
    expect(JSON.stringify(info3b)).toBe(
      JSON.stringify({ update: true, ballX: 3, ballY: 3, sound: 0 })
    );
  });

  let input3c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 4, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let inputBack3c = zeroArray(4, 5);
  let expectedOutput3c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 4, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info3c = checkFalling(inputBack3c, input3c, {
    redBalls: [],
  });
  it("checkFalling C", () => {
    expect(JSON.stringify(input3c)).toBe(JSON.stringify(expectedOutput3c));
  });
  it("checkFalling C info", () => {
    expect(JSON.stringify(info3c)).toBe(
      JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let inputBack4abcdefg = zeroArray(3, 6);
  let input4a = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4a = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4a = moveLeft(inputBack4abcdefg, input4a, 1, 1);
  it("moveLeft A", () => {
    expect(JSON.stringify(input4a)).toBe(JSON.stringify(expectedOutput4a));
  });
  it("moveLeft A eating", () => {
    expect(info4a.eating).toBe(false);
  });
  it("moveLeft A player", () => {
    expect(info4a.player).toBe(false);
  });

  let input4b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4b = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4b = moveLeft(inputBack4abcdefg, input4b, 2, 1);
  it("moveLeft B", () => {
    expect(JSON.stringify(input4b)).toBe(JSON.stringify(expectedOutput4b));
  });
  it("moveLeft B eating", () => {
    expect(info4b.eating).toBe(false);
  });
  it("moveLeft B player", () => {
    expect(info4b.player).toBe(true);
  });

  let input4c = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 2, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4c = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4c = moveLeft(inputBack4abcdefg, input4c, 2, 1);
  it("moveLeft C", () => {
    expect(JSON.stringify(input4c)).toBe(JSON.stringify(expectedOutput4c));
  });
  it("moveLeft C eating", () => {
    expect(info4c.eating).toBe(true);
  });
  it("moveLeft C player", () => {
    expect(info4c.player).toBe(true);
  });

  let input4d = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4d = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4d = moveLeft(inputBack4abcdefg, input4d, 4, 1);
  it("moveLeft D", () => {
    expect(JSON.stringify(input4d)).toBe(JSON.stringify(expectedOutput4d));
  });
  it("moveLeft D eating", () => {
    expect(info4d.eating).toBe(false);
  });
  it("moveLeft D player", () => {
    expect(info4d.player).toBe(true);
  });

  let input4e = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4e = [
    [1, 1, 1, 1, 1, 1],
    [1, 4, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4e = moveLeft(inputBack4abcdefg, input4e, 3, 1);
  it("moveLeft E", () => {
    expect(JSON.stringify(input4e)).toBe(JSON.stringify(expectedOutput4e));
  });
  it("moveLeft E eating", () => {
    expect(info4e.eating).toBe(false);
  });
  it("moveLeft E player", () => {
    expect(info4e.player).toBe(false);
  });

  let input4f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 4, 4, 4, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info4f = moveLeft(inputBack4abcdefg, input4f, 5, 1);
  it("moveLeft F", () => {
    expect(JSON.stringify(input4f)).toBe(JSON.stringify(expectedOutput4f));
  });
  it("moveLeft F eating", () => {
    expect(info4f.eating).toBe(false);
  });
  it("moveLeft F player", () => {
    expect(info4f.player).toBe(false);
  });

  let input4g = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 5, 4, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput4g = [
    [1, 1, 1, 1, 1, 1],
    [1, 5, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info4g = moveLeft(inputBack4abcdefg, input4g, 4, 1);
  it("moveLeft G", () => {
    expect(JSON.stringify(input4g)).toBe(JSON.stringify(expectedOutput4g));
  });
  it("moveLeft G eating", () => {
    expect(info4g.eating).toBe(false);
  });
  it("moveLeft G player", () => {
    expect(info4g.player).toBe(true);
  });

  let inputBack5abcde = zeroArray(3, 6);
  let input5a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5a = moveRight(inputBack5abcde, input5a, 4, 1);
  it("moveRight A", () => {
    expect(JSON.stringify(input5a)).toBe(JSON.stringify(expectedOutput5a));
  });
  it("moveRight A eating", () => {
    expect(info5a.eating).toBe(false);
  });
  it("moveRight A player", () => {
    expect(info5a.player).toBe(false);
  });

  let input5b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5b = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5b = moveRight(inputBack5abcde, input5b, 3, 1);
  it("moveRight B", () => {
    expect(JSON.stringify(input5b)).toBe(JSON.stringify(expectedOutput5b));
  });
  it("moveRight B info", () => {
    expect(JSON.stringify(info5b)).toBe(
      JSON.stringify({
        eating: false,
        player: true,
        oneDirection: false,
        teleporting: false,
        rotate: false,
        divingGlasses: false,
      })
    );
  });

  let input5c = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 2, 3, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5c = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 4, 0, 2, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5c = moveRight(inputBack5abcde, input5c, 3, 1);
  it("moveRight C", () => {
    expect(JSON.stringify(input5c)).toBe(JSON.stringify(expectedOutput5c));
  });
  it("moveRight C eating", () => {
    expect(info5c.eating).toBe(true);
  });
  it("moveRight C player", () => {
    expect(info5c.player).toBe(true);
  });

  let input5d = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5d = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5d = moveRight(inputBack5abcde, input5d, 1, 1);
  it("moveRight D", () => {
    expect(JSON.stringify(input5d)).toBe(JSON.stringify(expectedOutput5d));
  });
  it("moveRight D eating", () => {
    expect(info5d.eating).toBe(false);
  });
  it("moveRight D player", () => {
    expect(info5d.player).toBe(true);
  });

  let input5e = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5e = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 4, 4, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5e = moveRight(inputBack5abcde, input5e, 2, 1);
  it("moveRight E", () => {
    expect(JSON.stringify(input5e)).toBe(JSON.stringify(expectedOutput5e));
  });
  it("moveRight E eating", () => {
    expect(info5e.eating).toBe(false);
  });
  it("moveRight E player", () => {
    expect(info5e.player).toBe(false);
  });

  let inputBack5fg = zeroArray(3, 7);
  let input5f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 4, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info5f = moveRight(inputBack5fg, input5f, 1, 1);
  it("moveRight F", () => {
    expect(JSON.stringify(input5f)).toBe(JSON.stringify(expectedOutput5f));
  });
  it("moveRight F eating", () => {
    expect(info5f.eating).toBe(false);
  });
  it("moveRight F player", () => {
    expect(info5f.player).toBe(false);
  });

  let input5g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 5, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 4, 5, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info5g = moveRight(inputBack5fg, input5g, 1, 1);
  it("moveRight G", () => {
    expect(JSON.stringify(input5g)).toBe(JSON.stringify(expectedOutput5g));
  });
  it("moveRight G eating", () => {
    expect(info5g.eating).toBe(false);
  });
  it("moveRight G player", () => {
    expect(info5g.player).toBe(false);
  });

  let input5h = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 5, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5h = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 5, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5h = moveRight(inputBack5abcde, input5h, 1, 1);
  it("moveRight H", () => {
    expect(JSON.stringify(input5h)).toBe(JSON.stringify(expectedOutput5h));
  });
  it("moveRight H eating", () => {
    expect(info5h.eating).toBe(false);
  });
  it("moveRight H player", () => {
    expect(info5h.player).toBe(true);
  });

  let input5i = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 28, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5i = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 28, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let info5i = moveRight(inputBack5abcde, input5i, 1, 1);
  it("moveRight I", () => {
    expect(JSON.stringify(input5i)).toBe(JSON.stringify(expectedOutput5i));
  });
  it("moveRight I eating", () => {
    expect(info5i.eating).toBe(false);
  });
  it("moveRight I player", () => {
    expect(info5i.player).toBe(true);
  });

  let input5j = [
    [1, 1, 1, 1, 1, 1],
    [1, 2, 9, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput5j = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 2, 9, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let yellow5j = [{ x: 2, y: 1, direction: "none" }];
  let info5j = moveRight(inputBack5abcde, input5j, 1, 1, {
    yellowBalls: yellow5j,
    teleports: [],
  });
  it("moveRight J", () => {
    expect(JSON.stringify(input5j)).toBe(JSON.stringify(expectedOutput5j));
  });
  it("moveRight J eating", () => {
    expect(info5j.eating).toBe(false);
  });
  it("moveRight J player", () => {
    expect(info5j.player).toBe(true);
  });
  it("moveRight J yellow", () => {
    expect(JSON.stringify(yellow5j)).toBe(
      JSON.stringify([{ x: 3, y: 1, direction: "right" }])
    );
  });

  // ***** JUMP *****

  let inputBack6abc = zeroArray(5, 5);
  let input6a = [
    [1, 1, 1, 1, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput6a = [
    [1, 1, 1, 1, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info6a = jump(inputBack6abc, input6a, 2, 3);
  it("jump A", () => {
    expect(JSON.stringify(input6a)).toBe(JSON.stringify(expectedOutput6a));
  });
  it("jump A eating", () => {
    expect(info6a.eating).toBe(false);
  });
  it("jump A player", () => {
    expect(info6a.player).toBe(true);
  });

  let input6b = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 3, 0, 1],
    [1, 0, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput6b = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 0, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info6b = jump(inputBack6abc, input6b, 2, 3);
  it("jump B", () => {
    expect(JSON.stringify(input6b)).toBe(JSON.stringify(expectedOutput6b));
  });
  it("jump B eating", () => {
    expect(info6b.eating).toBe(true);
  });
  it("jump B player", () => {
    expect(info6b.player).toBe(true);
  });

  let input6c = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 3, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput6c = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 3, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info6c = jump(inputBack6abc, input6c, 1, 3);
  it("jump C", () => {
    expect(JSON.stringify(input6c)).toBe(JSON.stringify(expectedOutput6c));
  });
  it("jump C eating", () => {
    expect(info6c.eating).toBe(false);
  });
  it("jump C player", () => {
    expect(info6c.player).toBe(false);
  });

  let inputBack7abcde = zeroArray(5, 5);
  let input7a = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput7a = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info7a = jumpLeft(inputBack7abcde, input7a, 2, 3);
  it("jumpLeft A", () => {
    expect(JSON.stringify(input7a)).toBe(JSON.stringify(expectedOutput7a));
  });
  it("jumpLeft A eating", () => {
    expect(info7a.eating).toBe(false);
  });
  it("jumpLeft A player", () => {
    expect(info7a.player).toBe(true);
  });

  let input7b = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput7b = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 0, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info7b = jumpLeft(inputBack7abcde, input7b, 2, 3);
  it("jumpLeft B", () => {
    expect(JSON.stringify(input7b)).toBe(JSON.stringify(expectedOutput7b));
  });
  it("jumpLeft B eating", () => {
    expect(info7b.eating).toBe(true);
  });
  it("jumpLeft B player", () => {
    expect(info7b.player).toBe(true);
  });

  let input7c = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 2, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput7c = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 2, 0, 0, 1],
    [1, 1, 0, 4, 1],
    [1, 1, 1, 1, 1],
  ];
  let info7c = jumpLeft(inputBack7abcde, input7c, 2, 3);
  it("jumpLeft C", () => {
    expect(JSON.stringify(input7c)).toBe(JSON.stringify(expectedOutput7c));
  });
  it("jumpLeft C eating", () => {
    expect(info7c.eating).toBe(false);
  });
  it("jumpLeft C player", () => {
    expect(info7c.player).toBe(true);
  });

  let input7d = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput7d = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info7d = jumpLeft(inputBack7abcde, input7d, 2, 3);
  it("jumpLeft D", () => {
    expect(JSON.stringify(input7d)).toBe(JSON.stringify(expectedOutput7d));
  });
  it("jumpLeft D eating", () => {
    expect(info7d.eating).toBe(false);
  });
  it("jumpLeft D player", () => {
    expect(info7d.player).toBe(false);
  });

  let input7e = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput7e = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info7e = jumpLeft(inputBack7abcde, input7e, 2, 3);
  it("jumpLeft E", () => {
    expect(JSON.stringify(input7e)).toBe(JSON.stringify(expectedOutput7e));
  });
  it("jumpLeft E eating", () => {
    expect(info7e.eating).toBe(false);
  });
  it("jumpLeft E player", () => {
    expect(info7e.player).toBe(false);
  });

  let inputBack8abcde = zeroArray(5, 5);
  let input8a = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput8a = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 2, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info8a = jumpRight(inputBack8abcde, input8a, 2, 3);
  it("jumpRight A", () => {
    expect(JSON.stringify(input8a)).toBe(JSON.stringify(expectedOutput8a));
  });
  it("jumpRight A eating", () => {
    expect(info8a.eating).toBe(false);
  });
  it("jumpRight A player", () => {
    expect(info8a.player).toBe(true);
  });

  let input8b = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 4, 2, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput8b = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 2, 1],
    [1, 4, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];
  let info8b = jumpRight(inputBack8abcde, input8b, 2, 3);
  it("jumpRight B", () => {
    expect(JSON.stringify(input8b)).toBe(JSON.stringify(expectedOutput8b));
  });
  it("jumpRight B eating", () => {
    expect(info8b.eating).toBe(true);
  });
  it("jumpRight B player", () => {
    expect(info8b.player).toBe(true);
  });

  let input8c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 0, 1],
    [1, 4, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput8c = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 0, 0, 2, 1],
    [1, 4, 0, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info8c = jumpRight(inputBack8abcde, input8c, 2, 3);
  it("jumpRight C", () => {
    expect(JSON.stringify(input8c)).toBe(JSON.stringify(expectedOutput8c));
  });
  it("jumpRight C eating", () => {
    expect(info8c.eating).toBe(false);
  });
  it("jumpRight C player", () => {
    expect(info8c.player).toBe(true);
  });

  let input8d = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput8d = [
    [1, 1, 1, 1, 1],
    [1, 3, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info8d = jumpRight(inputBack8abcde, input8d, 2, 3);
  it("jumpRight D", () => {
    expect(JSON.stringify(input8d)).toBe(JSON.stringify(expectedOutput8d));
  });
  it("jumpRight D eating", () => {
    expect(info8d.eating).toBe(false);
  });
  it("jumpRight D player", () => {
    expect(info8d.player).toBe(false);
  });

  let input8e = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput8e = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 2, 1, 1],
    [1, 1, 1, 1, 1],
  ];
  let info8e = jumpRight(inputBack8abcde, input8e, 2, 3);
  it("jumpRight E", () => {
    expect(JSON.stringify(input8e)).toBe(JSON.stringify(expectedOutput8e));
  });
  it("jumpRight E eating", () => {
    expect(info8e.eating).toBe(false);
  });
  it("jumpRight E player", () => {
    expect(info8e.player).toBe(false);
  });

  // ***** GAME INFO *****

  let inputBack9a = zeroArray(5, 5);
  let input9a = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1],
    [1, 8, 0, 0, 1],
    [1, 8, 3, 2, 1],
    [1, 1, 1, 1, 1],
  ];
  let expectedOutput9a = {
    blueBall: { x: 3, y: 3 },
    elevators: [],
    greenBalls: 2,
    horizontalElevators: [],
    redBalls: [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
    yellowBalls: [],
    detonator: { x: -1, y: -1 },
    teleports: [],
    hasWater: false,
    hasDivingGlasses: false,
    redFish: [],
    electricity: [],
    electricityActive: false,
    trapDoors: [],
  };
  it("getGameInfo A", () => {
    expect(JSON.stringify(getGameInfo(inputBack9a, input9a))).toBe(
      JSON.stringify(expectedOutput9a)
    );
  });

  let inputBack9b = zeroArray(5, 10);
  let input9b = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 1, 0, 0, 3, 3, 1],
    [1, 8, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 8, 1, 2, 0, 0, 3, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput9b = {
    blueBall: { x: 3, y: 3 },
    elevators: [],
    greenBalls: 4,
    horizontalElevators: [],
    redBalls: [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ],
    yellowBalls: [],
    detonator: { x: -1, y: -1 },
    teleports: [],
    hasWater: false,
    hasDivingGlasses: false,
    redFish: [],
    electricity: [],
    electricityActive: false,
    trapDoors: [],
 };
  it("getGameInfo B", () => {
    expect(JSON.stringify(getGameInfo(inputBack9b, input9b))).toBe(
      JSON.stringify(expectedOutput9b)
    );
  });

  let inputBack9c = zeroArray(5, 10);
  let input9c = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 3, 1, 3, 0, 0, 3, 1],
    [1, 0, 3, 0, 0, 0, 0, 0, 1, 1],
    [1, 3, 3, 2, 0, 0, 3, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput9c = {
    blueBall: { x: 3, y: 3 },
    elevators: [],
    greenBalls: 8,
    horizontalElevators: [],
    redBalls: [],
    yellowBalls: [],
    detonator: { x: -1, y: -1 },
    teleports: [],
    hasWater: false,
    hasDivingGlasses: false,
    redFish: [],
    electricity: [],
    electricityActive: false,
    trapDoors: [],
 };
  it("getGameInfo C", () => {
    expect(JSON.stringify(getGameInfo(inputBack9c, input9c))).toBe(
      JSON.stringify(expectedOutput9c)
    );
  });

  let inputBack9d = zeroArray(7, 10);
  let input9d = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 3, 3, 0, 0, 0, 1],
    [1, 36, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 9, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 106, 0, 2, 0, 4, 0, 37, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput9d = {
    blueBall: { x: 4, y: 5 },
    elevators: [
      { x: 8, y: 2, up: false },
      { x: 2, y: 5, up: true },
    ],
    greenBalls: 2,
    horizontalElevators: [],
    redBalls: [],
    yellowBalls: [{ x: 1, y: 4, direction: "none" }],
    detonator: { x: 8, y: 5 },
    teleports: [],
    hasWater: false,
    hasDivingGlasses: false,
    redFish: [],
    electricity: [],
    electricityActive: false,
    trapDoors: [],
 };
  it("getGameInfo D", () => {
    expect(JSON.stringify(getGameInfo(inputBack9d, input9d))).toBe(
      JSON.stringify(expectedOutput9d)
    );
  });

  // ***** CHECK RED BALLS *****

  let input10a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10a = {
    hit: true,
    x1: 3,
    x2: 4,
    y: 3,
  };
  it("checkRed A", () => {
    expect(JSON.stringify(checkRed(input10a, 5, 3, [{ x: 2, y: 3 }]))).toBe(
      JSON.stringify(expectedOutput10a)
    );
  });

  let input10b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 8, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10b = {
    hit: true,
    x1: 3,
    x2: 4,
    y: 3,
  };
  it("checkRed B", () => {
    expect(JSON.stringify(checkRed(input10b, 2, 3, [{ x: 5, y: 3 }]))).toBe(
      JSON.stringify(expectedOutput10b)
    );
  });

  let input10c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 4, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10c = {
    hit: false,
    x1: -1,
    x2: -1,
    y: -1,
  };
  it("checkRed C", () => {
    expect(JSON.stringify(checkRed(input10c, 5, 3, [{ x: 2, y: 3 }]))).toBe(
      JSON.stringify(expectedOutput10c)
    );
  });

  let input10d = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 4, 0, 8, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10d = {
    hit: false,
    x1: -1,
    x2: -1,
    y: -1,
  };
  it("checkRed D", () => {
    expect(JSON.stringify(checkRed(input10d, 2, 3, [{ x: 5, y: 3 }]))).toBe(
      JSON.stringify(expectedOutput10d)
    );
  });

  let input10e = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 8, 0, 1],
    [1, 0, 2, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10e = {
    hit: false,
    x1: -1,
    x2: -1,
    y: -1,
  };
  it("checkRed E", () => {
    expect(JSON.stringify(checkRed(input10e, 2, 3, [{ x: 5, y: 2 }]))).toBe(
      JSON.stringify(expectedOutput10e)
    );
  });

  let input10f = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 8, 0, 1],
    [1, 0, 2, 0, 8, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput10f = {
    hit: true,
    x1: 3,
    x2: 3,
    y: 3,
  };
  it("checkRed F", () => {
    expect(
      JSON.stringify(
        checkRed(input10f, 2, 3, [
          { x: 5, y: 2 },
          { x: 4, y: 3 },
        ])
      )
    ).toBe(JSON.stringify(expectedOutput10f));
  });

  // ***** MOVE ELEVATORS *****

  let input11a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 6, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 106, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput11a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 6, 1],
    [1, 0, 0, 106, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let info11a = moveElevators(
    input11a,
    [
      { x: 6, y: 2, up: false },
      { x: 3, y: 5, up: true },
    ],
    []
  );
  it("moveElevators A", () => {
    expect(JSON.stringify(input11a)).toBe(JSON.stringify(expectedOutput11a));
  });

  it("moveElevators A player", () => {
    expect(JSON.stringify(info11a)).toBe(
      JSON.stringify({ playerX: 3, playerY: 2 })
    );
  });

  let input11b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 4, 5, 1],
    [1, 0, 0, 4, 0, 6, 6, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 106, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput11b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 5, 1],
    [1, 0, 0, 4, 0, 4, 0, 1],
    [1, 0, 0, 4, 0, 6, 6, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 6, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let info11b = moveElevators(
    input11b,
    [
      { x: 5, y: 2, up: false },
      { x: 6, y: 2, up: false },
      { x: 3, y: 5, up: true },
    ],
    []
  );
  it("moveElevators B", () => {
    expect(JSON.stringify(input11b)).toBe(JSON.stringify(expectedOutput11b));
  });

  it("moveElevators B player", () => {
    expect(JSON.stringify(info11b)).toBe(
      JSON.stringify({ playerX: -1, playerY: -1 })
    );
  });

  // ***** MOVE HORIZONTAL ELEVATORS *****

  let input12a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 7, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput12a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 1],
    [1, 0, 0, 0, 7, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let elevatorsInput12a = [{ x: 5, y: 6, right: false }];
  let info12a = moveHorizontalElevators(input12a, elevatorsInput12a, []);
  it("moveHorizontalElevators A", () => {
    expect(JSON.stringify(input12a)).toBe(JSON.stringify(expectedOutput12a));
  });

  it("moveHorizontalElevators A player", () => {
    expect(JSON.stringify(info12a)).toBe(
      JSON.stringify({ playerX: 4, playerY: 4 })
    );
  });

  it("moveHorizontalElevators A elevators", () => {
    expect(JSON.stringify(elevatorsInput12a)).toBe(
      JSON.stringify([{ x: 4, y: 6, right: false }])
    );
  });

  let input12b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 107, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let elevatorsInput12b = [{ x: 5, y: 6, right: true }];
  let expectedOutput12b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 4, 1],
    [1, 0, 0, 0, 0, 0, 107, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let info12b = moveHorizontalElevators(input12b, elevatorsInput12b, []);
  it("moveHorizontalElevators B", () => {
    expect(JSON.stringify(input12b)).toBe(JSON.stringify(expectedOutput12b));
  });

  it("moveHorizontalElevators B player", () => {
    expect(JSON.stringify(info12b)).toBe(
      JSON.stringify({ playerX: 6, playerY: 4 })
    );
  });

  it("moveHorizontalElevators B elevators", () => {
    expect(JSON.stringify(elevatorsInput12b)).toBe(
      JSON.stringify([{ x: 6, y: 6, right: true }])
    );
  });

  let input12c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 8, 0, 0, 0, 4, 0, 1],
    [1, 107, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 5, 2, 0, 1],
    [1, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 0, 7, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 107, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput12c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 4, 0, 1],
    [1, 0, 107, 0, 0, 4, 0, 1],
    [1, 0, 0, 0, 5, 2, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 1],
    [1, 0, 0, 0, 7, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 7, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let elevatorsInput12c = [
    { x: 1, y: 3, right: true },
    { x: 5, y: 6, right: false },
    { x: 6, y: 8, right: true },
  ];
  let elevatorsExpected12c = [
    { x: 2, y: 3, right: true },
    { x: 4, y: 6, right: false },
    { x: 6, y: 8, right: false },
  ];
  let redInput12c = [{ x: 1, y: 2 }];
  let info12c = moveHorizontalElevators(
    input12c,
    elevatorsInput12c,
    redInput12c
  );
  it("moveHorizontalElevators C", () => {
    expect(JSON.stringify(input12c)).toBe(JSON.stringify(expectedOutput12c));
  });

  it("moveHorizontalElevators C player", () => {
    expect(JSON.stringify(info12c)).toBe(
      JSON.stringify({ playerX: -1, playerY: -1 })
    );
  });

  it("moveHorizontalElevators C elevators", () => {
    expect(JSON.stringify(elevatorsInput12c)).toBe(
      JSON.stringify(elevatorsExpected12c)
    );
  });

  it("moveHorizontalElevators C red", () => {
    expect(JSON.stringify(redInput12c)).toBe(JSON.stringify([{ x: 2, y: 2 }]));
  });

  // ***** MOVE YELLOW BALLS *****

  let input13a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 9, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13a = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 9, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13a = [{ x: 3, y: 2, direction: "left" }];
  moveYellowBalls(input13a, yellow13a);
  it("moveYellowBalls A", () => {
    expect(JSON.stringify(input13a)).toBe(JSON.stringify(expectedOutput13a));
  });

  it("moveYellowBalls A yellow", () => {
    expect(JSON.stringify(yellow13a)).toBe(
      JSON.stringify([{ x: 2, y: 2, direction: "left" }])
    );
  });

  let input13b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 1],
    [1, 9, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13b = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 1],
    [1, 9, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13b = [{ x: 1, y: 2, direction: "left" }];
  moveYellowBalls(input13b, yellow13b);
  it("moveYellowBalls B", () => {
    expect(JSON.stringify(input13b)).toBe(JSON.stringify(expectedOutput13b));
  });

  it("moveYellowBalls B yellow", () => {
    expect(JSON.stringify(yellow13b)).toBe(
      JSON.stringify([{ x: 1, y: 2, direction: "none" }])
    );
  });

  let input13c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 9, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 9, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13c = [{ x: 5, y: 2, direction: "right" }];
  moveYellowBalls(input13c, yellow13c);
  it("moveYellowBalls C", () => {
    expect(JSON.stringify(input13c)).toBe(JSON.stringify(expectedOutput13c));
  });

  it("moveYellowBalls C yellow", () => {
    expect(JSON.stringify(yellow13c)).toBe(
      JSON.stringify([{ x: 6, y: 2, direction: "right" }])
    );
  });

  let input13d = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 1],
    [1, 85, 0, 9, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13d = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 1],
    [1, 85, 0, 9, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13d = [{ x: 3, y: 2, direction: "right" }];
  moveYellowBalls(input13d, yellow13d);
  it("moveYellowBalls D", () => {
    expect(JSON.stringify(input13d)).toBe(JSON.stringify(expectedOutput13d));
  });

  it("moveYellowBalls D yellow", () => {
    expect(JSON.stringify(yellow13d)).toBe(
      JSON.stringify([{ x: 3, y: 2, direction: "none" }])
    );
  });

  let input13e = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 3, 0, 0, 0, 1],
    [1, 9, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 9, 84, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13e = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 9, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 9, 0, 1],
    [1, 0, 2, 0, 0, 84, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13e = [
    { x: 1, y: 2, direction: "up" },
    { x: 4, y: 4, direction: "right" },
  ];
  moveYellowBalls(input13e, yellow13e);
  it("moveYellowBalls E", () => {
    expect(JSON.stringify(input13e)).toBe(JSON.stringify(expectedOutput13e));
  });

  it("moveYellowBalls E yellow", () => {
    expect(JSON.stringify(yellow13e)).toBe(
      JSON.stringify([
        { x: 1, y: 1, direction: "up" },
        { x: 5, y: 3, direction: "up" },
      ])
    );
  });

  let input13f = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 86, 0, 3, 0, 0, 0, 1],
    [1, 9, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 9, 0, 1],
    [1, 0, 2, 0, 0, 84, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13f = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 86, 0, 3, 0, 0, 0, 1],
    [1, 9, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 9, 84, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13f = [
    { x: 1, y: 2, direction: "up" },
    { x: 5, y: 3, direction: "down" },
  ];
  moveYellowBalls(input13f, yellow13f);
  it("moveYellowBalls F", () => {
    expect(JSON.stringify(input13f)).toBe(JSON.stringify(expectedOutput13f));
  });

  it("moveYellowBalls F yellow", () => {
    expect(JSON.stringify(yellow13f)).toBe(
      JSON.stringify([
        { x: 1, y: 2, direction: "down" },
        { x: 4, y: 4, direction: "left" },
      ])
    );
  });

  let input13g = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 9, 86, 1],
    [1, 0, 0, 0, 0, 9, 1, 1],
    [1, 9, 0, 0, 0, 0, 0, 1],
    [1, 85, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13g = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 9, 86, 1],
    [1, 0, 0, 0, 0, 9, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 85, 9, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13g = [
    { x: 5, y: 1, direction: "right" },
    { x: 5, y: 2, direction: "right" },
    { x: 1, y: 3, direction: "down" },
  ];
  moveYellowBalls(input13g, yellow13g);
  it("moveYellowBalls G", () => {
    expect(JSON.stringify(input13g)).toBe(JSON.stringify(expectedOutput13g));
  });

  it("moveYellowBalls G yellow", () => {
    expect(JSON.stringify(yellow13g)).toBe(
      JSON.stringify([
        { x: 5, y: 1, direction: "left" },
        { x: 5, y: 2, direction: "none" },
        { x: 2, y: 4, direction: "right" },
      ])
    );
  });

  let input13h = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 84, 0, 9, 0, 85, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 9, 0, 0, 1],
    [1, 0, 9, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 85, 0, 0, 0, 84, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput13h = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 84, 9, 0, 0, 85, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 9, 0, 0, 0, 1],
    [1, 0, 0, 9, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 85, 0, 0, 0, 84, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow13h = [
    { x: 3, y: 1, direction: "right" },
    { x: 4, y: 3, direction: "left" },
    { x: 2, y: 4, direction: "right" },
  ];
  for (let i = 0; i < 13; i++) {
    moveYellowBalls(input13h, yellow13h);
  }
  it("moveYellowBalls H", () => {
    expect(JSON.stringify(input13h)).toBe(JSON.stringify(expectedOutput13h));
  });

  it("moveYellowBalls H yellow", () => {
    expect(JSON.stringify(yellow13h)).toBe(
      JSON.stringify([
        { x: 2, y: 1, direction: "right" },
        { x: 3, y: 3, direction: "none" },
        { x: 3, y: 4, direction: "none" },
      ])
    );
  });

  // ***** PUSH DOWN *****

  let input14a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 9, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack14a = zeroArray(7, 7);
  let expectedOutput14a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 2, 1, 1, 1],
    [1, 0, 0, 9, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let yellow14a = [{ x: 3, y: 3, direction: "none" }];
  let info14a = pushDown(inputBack14a, input14a, 3, 2, {
    yellowBalls: yellow14a,
    teleports: [],
  });
  it("pushDown A", () => {
    expect(JSON.stringify(input14a)).toBe(JSON.stringify(expectedOutput14a));
  });

  it("pushDown A yellow", () => {
    expect(JSON.stringify(yellow14a)).toBe(
      JSON.stringify([{ x: 3, y: 4, direction: "down" }])
    );
  });

  it("pushDown A info", () => {
    expect(JSON.stringify(info14a)).toBe(
      JSON.stringify({ player: true, oneDirection: false })
    );
  });

  let input14b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 28, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack14b = zeroArray(7, 7);
  let expectedOutput14b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 2, 1, 1, 1],
    [1, 0, 0, 28, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info14b = pushDown(inputBack14b, input14b, 3, 2);
  it("pushDown B", () => {
    expect(JSON.stringify(input14b)).toBe(JSON.stringify(expectedOutput14b));
  });

  it("pushDown B info", () => {
    expect(JSON.stringify(info14b)).toBe(
      JSON.stringify({ player: true, oneDirection: false })
    );
  });

  let input14c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 28, 1, 1, 1],
    [1, 0, 0, 28, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack14c = zeroArray(7, 7);
  let expectedOutput14c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 28, 1, 1, 1],
    [1, 0, 0, 28, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info14c = pushDown(inputBack14c, input14c, 3, 2);
  it("pushDown C", () => {
    expect(JSON.stringify(input14c)).toBe(JSON.stringify(expectedOutput14c));
  });

  it("pushDown C info", () => {
    expect(JSON.stringify(info14c)).toBe(
      JSON.stringify({ player: false, oneDirection: false })
    );
  });

  // ***** ONE DIRECTION PORTS *****

  let inputBack15abcd = zeroArray(4, 7);
  let input15a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 2, 10, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 10, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15a = moveRight(inputBack15abcd, input15a, 2, 2);
  it("One direction ports A", () => {
    expect(JSON.stringify(input15a)).toBe(JSON.stringify(expectedOutput15a));
  });

  it("One direction ports A info", () => {
    expect(JSON.stringify(info15a)).toBe(
      JSON.stringify({
        eating: false,
        player: true,
        oneDirection: true,
        teleporting: false,
        rotate: false,
        divingGlasses: false,
      })
    );
  });

  let input15b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 11, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 2, 11, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15b = moveLeft(inputBack15abcd, input15b, 4, 2);
  it("One direction ports B", () => {
    expect(JSON.stringify(input15b)).toBe(JSON.stringify(expectedOutput15b));
  });

  it("One direction ports B player", () => {
    expect(JSON.stringify(info15b.player)).toBe(JSON.stringify(true));
  });

  let input15c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 2, 11, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 2, 11, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15c = moveRight(inputBack15abcd, input15c, 2, 2, []);
  it("One direction ports C", () => {
    expect(JSON.stringify(input15c)).toBe(JSON.stringify(expectedOutput15c));
  });

  it("One direction ports C player", () => {
    expect(JSON.stringify(info15c.player)).toBe(JSON.stringify(false));
  });

  let input15d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 10, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 10, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15d = moveLeft(inputBack15abcd, input15d, 4, 2, []);
  it("One direction ports D", () => {
    expect(JSON.stringify(input15d)).toBe(JSON.stringify(expectedOutput15d));
  });

  it("One direction ports D player", () => {
    expect(JSON.stringify(info15d.player)).toBe(JSON.stringify(false));
  });

  let inputBack15ej = zeroArray(5, 7);
  let input15e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 2, 0, 0, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15e = jump(inputBack15ej, input15e, 2, 3);
  it("One direction ports E", () => {
    expect(JSON.stringify(input15e)).toBe(JSON.stringify(expectedOutput15e));
  });

  it("One direction ports E info", () => {
    expect(JSON.stringify(info15e)).toBe(
      JSON.stringify({ eating: false, player: true, oneDirection: true, divingGlasses: false })
    );
  });

  let input15f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 4, 0, 0, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 4, 0, 0, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15f = jump(inputBack15ej, input15f, 2, 3);
  it("One direction ports F", () => {
    expect(JSON.stringify(input15f)).toBe(JSON.stringify(expectedOutput15f));
  });

  it("One direction ports F info", () => {
    expect(JSON.stringify(info15f)).toBe(
      JSON.stringify({ eating: false, player: false, oneDirection: false, divingGlasses: false })
    );
  });

  let input15g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15g = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 0, 0, 2, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15g = pushDown(inputBack15ej, input15g, 4, 1);
  it("One direction ports G", () => {
    expect(JSON.stringify(input15g)).toBe(JSON.stringify(expectedOutput15g));
  });

  it("One direction ports G info", () => {
    expect(JSON.stringify(info15g)).toBe(
      JSON.stringify({ player: true, oneDirection: true })
    );
  });

  let input15h = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 0, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15h = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 1],
    [1, 1, 87, 1, 88, 1, 1],
    [1, 0, 0, 0, 4, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15h = pushDown(inputBack15ej, input15h, 4, 1);
  it("One direction ports H", () => {
    expect(JSON.stringify(input15h)).toBe(JSON.stringify(expectedOutput15h));
  });

  it("One direction ports G info", () => {
    expect(JSON.stringify(info15h)).toBe(
      JSON.stringify({ player: false, oneDirection: false })
    );
  });

  let input15i = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 1],
    [1, 1, 88, 1, 87, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15i = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 2, 0, 1],
    [1, 1, 88, 1, 87, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15i = pushDown(inputBack15ej, input15i, 4, 1);
  it("One direction ports I", () => {
    expect(JSON.stringify(input15i)).toBe(JSON.stringify(expectedOutput15i));
  });

  it("One direction ports I info", () => {
    expect(JSON.stringify(info15i)).toBe(
      JSON.stringify({ player: false, oneDirection: false })
    );
  });

  let input15j = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 1, 88, 1, 88, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput15j = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 1, 88, 1, 88, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info15j = jump(inputBack15ej, input15j, 2, 3);
  it("One direction ports J", () => {
    expect(JSON.stringify(input15j)).toBe(JSON.stringify(expectedOutput15j));
  });

  it("One direction ports J info", () => {
    expect(JSON.stringify(info15j)).toBe(
      JSON.stringify({ eating: false, player: false, oneDirection: false, divingGlasses: false })
    );
  });

  // ***** TRIANGLED WALLS *****

  let input16a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack16abcde = zeroArray(5, 7);
  let expectedOutput16a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 15, 2, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16a = checkFalling(inputBack16abcde, input16a, {
    redBalls: [],
  });
  it("Triangled Walls A", () => {
    expect(JSON.stringify(input16a)).toBe(JSON.stringify(expectedOutput16a));
  });
  it("Triangled Walls A info", () => {
    expect(JSON.stringify(info16a)).toBe(
      JSON.stringify({ update: true, ballX: 2, ballY: 2, sound: 0 })
    );
  });

  let input16b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 0, 16, 1],
    [1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput16b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 16, 1],
    [1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16b = checkFalling(inputBack16abcde, input16b, {
    redBalls: [],
  });
  it("Triangled Walls B", () => {
    expect(JSON.stringify(input16b)).toBe(JSON.stringify(expectedOutput16b));
  });
  it("Triangled Walls B info", () => {
    expect(JSON.stringify(info16b)).toBe(
      JSON.stringify({ update: true, ballX: 4, ballY: 2, sound: 0 })
    );
  });

  let input16c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 1],
    [1, 16, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput16c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 1],
    [1, 16, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16c = checkFalling(inputBack16abcde, input16c, {
    redBalls: [],
  });
  it("Triangled Walls C", () => {
    expect(JSON.stringify(input16c)).toBe(JSON.stringify(expectedOutput16c));
  });
  it("Triangled Walls C info", () => {
    expect(JSON.stringify(info16c)).toBe(
      JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let input16d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput16d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 15, 4, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16d = checkFalling(inputBack16abcde, input16d, {
    redBalls: [],
  });
  it("Triangled Walls D", () => {
    expect(JSON.stringify(input16d)).toBe(JSON.stringify(expectedOutput16d));
  });
  it("Triangled Walls D info", () => {
    expect(JSON.stringify(info16d)).toBe(
      JSON.stringify({ update: true, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let input16e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 4, 5, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput16e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 4, 5, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16e = checkFalling(inputBack16abcde, input16e, {
    redBalls: [],
  });
  it("Triangled Walls E", () => {
    expect(JSON.stringify(input16e)).toBe(JSON.stringify(expectedOutput16e));
  });
  it("Triangled Walls E info", () => {
    expect(JSON.stringify(info16e)).toBe(
      JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let input16f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 15, 0, 0, 0, 1],
    [1, 1, 1, 15, 0, 0, 1],
    [1, 1, 1, 1, 15, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack16f = zeroArray(8, 7);
  let expectedOutput16f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 15, 0, 0, 0, 0, 1],
    [1, 1, 15, 0, 0, 0, 1],
    [1, 1, 1, 15, 0, 0, 1],
    [1, 1, 1, 1, 15, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info16f;
  for (let i = 0; i < 5; i++) {
    info16f = checkFalling(inputBack16f, input16f, {
      redBalls: [],
    });
  }
  it("Triangled Walls F", () => {
    expect(JSON.stringify(input16f)).toBe(JSON.stringify(expectedOutput16f));
  });
  it("Triangled Walls F info", () => {
    expect(JSON.stringify(info16f)).toBe(
      JSON.stringify({ update: true, ballX: 5, ballY: 6, sound: 0 })
    );
  });

  // ***** LADDERS *****

  let inputBack17abcd = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 25, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let input17a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput17a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info17a = checkFalling(inputBack17abcd, input17a, {
    redBalls: [],
  });
  it("Ladders A", () => {
    expect(JSON.stringify(input17a)).toBe(JSON.stringify(expectedOutput17a));
  });
  it("Ladders A info", () => {
    expect(JSON.stringify(info17a)).toBe(
      JSON.stringify({ update: false, ballX: -1, ballY: -1, sound: 0 })
    );
  });

  let input17b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput17b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info17b = pushDown(inputBack17abcd, input17b, 2, 4, {
    yellowBalls: [],
    teleports: [],
  });
  it("Ladders B", () => {
    expect(JSON.stringify(input17b)).toBe(JSON.stringify(expectedOutput17b));
  });
  it("Ladders B info", () => {
    expect(JSON.stringify(info17b)).toBe(
      JSON.stringify({ player: true, oneDirection: false })
    );
  });

  let input17c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput17c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info17c = checkFalling(inputBack17abcd, input17c, {
    redBalls: [],
  });
  it("Ladders C", () => {
    expect(JSON.stringify(input17c)).toBe(JSON.stringify(expectedOutput17c));
  });
  it("Ladders C info", () => {
    expect(JSON.stringify(info17c)).toBe(
      JSON.stringify({ update: true, ballX: 2, ballY: 6, sound: 0 })
    );
  });

  let input17d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput17d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info17d = jump(inputBack17abcd, input17d, 2, 4, {
    yellowBalls: [],
    teleports: [],
  });
  it("Ladders D", () => {
    expect(JSON.stringify(input17d)).toBe(JSON.stringify(expectedOutput17d));
  });
  it("Ladders D info", () => {
    expect(JSON.stringify(info17d)).toBe(
      JSON.stringify({ eating: false, player: true, oneDirection: false, divingGlasses: false })
    );
  });

  // ***** ROTATE GAME *****

  let inputBack18a = zeroArray(6, 6);
  let input18a = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 8, 0, 1],
    [1, 0, 0, 8, 0, 1],
    [1, 9, 0, 4, 0, 1],
    [1, 0, 2, 4, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput18a = [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 9, 0, 3, 1],
    [1, 2, 0, 0, 0, 1],
    [1, 4, 4, 8, 8, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let gameInfo18a = {
    blueBall: { x: 2, y: 4 },
    elevators: [],
    greenBalls: 1,
    horizontalElevators: [],
    redBalls: [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
    yellowBalls: [{ x: 1, y: 3, direction: "down" }],
    detonator: { x: -1, y: -1 },
    teleports: [],
  };
  let info18a = rotateGame(inputBack18a, input18a, gameInfo18a);
  it("rotateGame A rotated", () => {
    expect(info18a).toBe(true);
  });
  it("rotateGame A game array", () => {
    expect(JSON.stringify(input18a)).toBe(JSON.stringify(expectedOutput18a));
  });
  it("rotateGame A blue ball", () => {
    expect(JSON.stringify(gameInfo18a.blueBall)).toBe(
      JSON.stringify({ x: 1, y: 2 })
    );
  });
  it("rotateGame A red balls", () => {
    expect(JSON.stringify(gameInfo18a.redBalls)).toBe(
      JSON.stringify([
        { x: 4, y: 3 },
        { x: 3, y: 3 },
      ])
    );
  });
  it("rotateGame A yellow balls", () => {
    expect(JSON.stringify(gameInfo18a.yellowBalls)).toBe(
      JSON.stringify([{ x: 2, y: 1, direction: "left" }])
    );
  });

  let inputBack18b = zeroArray(7, 7);
  let input18b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 17, 18, 0, 5, 3, 1],
    [1, 15, 16, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 106, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput18b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 107, 0, 17, 18, 1],
    [1, 0, 0, 0, 15, 16, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 5, 1],
    [1, 2, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let gameInfo18b = {
    blueBall: { x: 5, y: 5 },
    elevators: [{ x: 1, y: 4, up: true }],
    greenBalls: 1,
    horizontalElevators: [],
    redBalls: [],
    yellowBalls: [],
    detonator: { x: -1, y: -1 },
    teleports: [],
  };
  let info18b = rotateGame(inputBack18b, input18b, gameInfo18b);
  it("rotateGame B rotated", () => {
    expect(info18b).toBe(true);
  });
  it("rotateGame B game array", () => {
    expect(JSON.stringify(input18b)).toBe(JSON.stringify(expectedOutput18b));
  });
  it("rotateGame B elevators", () => {
    expect(JSON.stringify(gameInfo18b.elevators)).toBe(JSON.stringify([]));
  });
  it("rotateGame B horizontal elevators", () => {
    expect(JSON.stringify(gameInfo18b.horizontalElevators)).toBe(
      JSON.stringify([{ x: 2, y: 1, right: true }])
    );
  });

  // Insert new tests here
});
