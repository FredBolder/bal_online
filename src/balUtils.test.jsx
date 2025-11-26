import { beforeEach, describe, it, expect } from "vitest";
import {
  charToNumber,
  hasWeightAbove,
  isEmpty,
  numberArrayToStringArray,
  numberToChar,
  stringArrayToNumberArray,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";

describe("balUtils", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

  const inputBack_7_7 = zeroArray(7, 7);


  // stringArrayToNumberArray

  it("stringArrayToNumberArray A", () => {
    const input = ["111111", "13 3 1", "1 2481", "111111"];
    const expectedOutput = {
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
    const output = stringArrayToNumberArray(input);
    expect(output).toEqual(expectedOutput);
  });

  it("stringArrayToNumberArray B", () => {
    const input = [
      "111111111",
      "1=     31",
      "1=      1",
      "1=  42  1",
      "111111111",
    ];
    const expectedOutput = {
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
    const output = stringArrayToNumberArray(input);
    expect(output).toEqual(expectedOutput);
  });

  // numberArrayToStringArray

  it("numberArrayToStringArray", () => {
    const input = [
      [1, 1, 1, 1, 1, 1],
      [1, 3, 0, 3, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 2, 4, 8, 1],
      [1, 1, 1, 1, 1, 1],
    ];
    const expectedOutput = ["111111", "13 3 1", "1    1", "1 2481", "111111"];
    const output = numberArrayToStringArray(input);
    expect(output).toEqual(expectedOutput);
  });

  // isEmpty

  it("isEmpty A", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 2, 0, 0, 0, 8, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const result = isEmpty(input, 2, 1, 5);
    expect(result).toBe(true);
  });

  it("isEmpty B", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 3, 1],
      [1, 2, 4, 0, 0, 8, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const result = isEmpty(input, 2, 1, 5);
    expect(result).toBe(false);
  });

  it("isEmpty C", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 5, 0, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const result = isEmpty(input, 3, 5, 1, false);
    expect(result).toBe(true);
  });

  it("isEmpty D", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 5, 0, 0, 3, 1],
      [1, 0, 0, 9, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    const result = isEmpty(input, 3, 1, 3, false);
    expect(result).toBe(false);
  });

  it("isEmpty E", () => {
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 5, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const result = isEmpty(input, 3, 1, 2, false);
    expect(result).toBe(true);
  });

  // charToNumber and numberToChar

  // Increase 242 when there are objects with a higher number
  for (let i = 0; i <= 242; i++) {
    const input = i;
    const expectedOutput = input;
    const ch = numberToChar(input);
    const output4a = charToNumber(ch);
    if (ch !== "?") {
      it(`charToNumber and numberToChar Number: ${input} `, () => {
        expect(output4a).toBe(expectedOutput);
      });
    }
  }

  // hasWeight

  it("hasWeight A", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 1, y: 5 }, yellowBars: [{ x: 2, y: 3, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 4, 0, 0, 0, 1],
      [1, 0, 121, 123, 122, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = hasWeightAbove(inputBack_7_7, input, gameInfo, { ...defaultGameVars }, 2, 4, 3, false);
    expect(info).toBe(true);
  });

  it("hasWeight B", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 1, y: 5 }, yellowBars: [{ x: 2, y: 3, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 5, 0, 0, 0, 1],
      [1, 0, 121, 123, 122, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = hasWeightAbove(inputBack_7_7, input, gameInfo, { ...defaultGameVars }, 2, 4, 3, false);
    expect(info).toBe(false);
  });

  it("hasWeight C", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 3, y: 2 }, yellowBars: [{ x: 2, y: 3, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 1],
      [1, 0, 121, 123, 122, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const inputBack = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 25, 0, 0, 0],
      [0, 0, 0, 25, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const info = hasWeightAbove(inputBack, input, gameInfo, { ...defaultGameVars }, 2, 4, 3, false);
    expect(info).toBe(false);
  });

  it("hasWeight D", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 1, y: 5 }, yellowBars: [{ x: 2, y: 3, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 4, 0, 0, 1],
      [1, 0, 121, 123, 122, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const inputBack = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 25, 0, 0, 0],
      [0, 0, 0, 25, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const info = hasWeightAbove(inputBack, input, gameInfo, { ...defaultGameVars }, 2, 4, 3, false);
    expect(info).toBe(true);
  });

  it("hasWeight E", () => {
    const gameInfo = { ...defaultGameInfo, blueBall: { x: 4, y: 2 }, yellowBars: [{ x: 2, y: 3, direction: "none" }] };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 2, 0, 1],
      [1, 0, 121, 123, 122, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = hasWeightAbove(inputBack_7_7, input, gameInfo, { ...defaultGameVars }, 2, 4, 3, false);
    expect(info).toBe(true);
  });

  it("hasWeight F", () => {
    const gameInfo = {
      ...defaultGameInfo,
      blueBall: { x: 1, y: 5 },
      redBalls: [{ x: 2, y: 2, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 }]
    };
    const input = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 0, 0, 1],
      [1, 0, 8, 0, 0, 0, 1],
      [1, 0, 5, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    const info = hasWeightAbove(inputBack_7_7, input, gameInfo, { ...defaultGameVars }, 2, 2, 3, false);
    expect(info).toBe(true);
  });


  // Insert new tests here
});
