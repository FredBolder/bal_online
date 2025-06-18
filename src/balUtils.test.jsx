import { describe, it, expect } from "vitest";
import {
  charToNumber,
  hasWeight,
  isEmpty,
  numberArrayToStringArray,
  numberToChar,
  stringArrayToNumberArray,
  zeroArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);

  // stringArrayToNumberArray

  let input01a = ["111111", "13 3 1", "1 2481", "111111"];
  let expectedOutput01a = {
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
  let output01a = stringArrayToNumberArray(input01a);
  it("stringArrayToNumberArray A", () => {
    expect(JSON.stringify(output01a)).toBe(JSON.stringify(expectedOutput01a));
  });

  let input01b = [
    "111111111",
    "1=     31",
    "1=      1",
    "1=  42  1",
    "111111111",
  ];
  let expectedOutput01b = {
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
  let output01b = stringArrayToNumberArray(input01b);
  it("stringArrayToNumberArray B", () => {
    expect(JSON.stringify(output01b)).toBe(JSON.stringify(expectedOutput01b));
  });

  // numberArrayToStringArray

  let input02a = [
    [1, 1, 1, 1, 1, 1],
    [1, 3, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 2, 4, 8, 1],
    [1, 1, 1, 1, 1, 1],
  ];
  let expectedOutput02a = ["111111", "13 3 1", "1    1", "1 2481", "111111"];
  let output02a = numberArrayToStringArray(input02a);
  it("numberArrayToStringArray", () => {
    expect(JSON.stringify(output02a)).toBe(JSON.stringify(expectedOutput02a));
  });

  // isEmpty

  let input03a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 2, 0, 0, 0, 8, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let result03a = isEmpty(input03a, 2, 1, 5);
  it("isEmpty A", () => {
    expect(result03a).toBe(true);
  });

  let input03b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 3, 1],
    [1, 2, 4, 0, 0, 8, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let result03b = isEmpty(input03b, 2, 1, 5);
  it("isEmpty B", () => {
    expect(result03b).toBe(false);
  });

  let input03c = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 5, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let result03c = isEmpty(input03c, 3, 5, 1, false);
  it("isEmpty C", () => {
    expect(result03c).toBe(true);
  });

  let input03d = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 5, 0, 0, 3, 1],
    [1, 0, 0, 9, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let result03d = isEmpty(input03d, 3, 1, 3, false);
  it("isEmpty D", () => {
    expect(result03d).toBe(false);
  });

  let input03e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 5, 0, 3, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let result03e = isEmpty(input03e, 3, 1, 2, false);
  it("isEmpty E", () => {
    expect(result03e).toBe(true);
  });

  // charToNumber and numberToChar

  // Increase 150 when there are objects with a higher number
  for (let i = 0; i < 150; i++) {
    let input04a = i;
    let expectedOutput04a = input04a;
    let ch = numberToChar(input04a);
    let output4a = charToNumber(ch);
    if (ch !== "?") {
      it(`charToNumber and numberToChar Number: ${input04a} `, () => {
        expect(output4a).toBe(expectedOutput04a);
      });
    }
  }

  // hasWeight

  let input05a = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 4, 0, 0, 0, 1],
    [1, 0, 121, 123, 122, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack05_7_7 = zeroArray(7, 7);
  let info05a = hasWeight(inputBack05_7_7, input05a, 2, 4, 3);
  it("hasWeight A", () => {
    expect(info05a).toBe(true);
  });

  let input05b = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 5, 0, 0, 0, 1],
    [1, 0, 121, 123, 122, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info05b = hasWeight(inputBack05_7_7, input05b, 2, 4, 3);
  it("hasWeight B", () => {
    expect(info05b).toBe(false);
  });

  let input05c = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 0, 121, 123, 122, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack05c = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 0, 0, 0],
    [0, 0, 0, 25, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let info05c = hasWeight(inputBack05c, input05c, 2, 4, 3);
  it("hasWeight C", () => {
    expect(info05c).toBe(false);
  });

  let input05d = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 4, 0, 0, 1],
    [1, 0, 121, 123, 122, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let inputBack05d = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 25, 0, 0, 0],
    [0, 0, 0, 25, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  let info05d = hasWeight(inputBack05d, input05d, 2, 4, 3);
  it("hasWeight D", () => {
    expect(info05d).toBe(true);
  });

  let input05e = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 1],
    [1, 0, 121, 123, 122, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info05e = hasWeight(inputBack05_7_7, input05e, 2, 4, 3);
  it("hasWeight E", () => {
    expect(info05e).toBe(true);
  });

  let input05f = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 0, 1],
    [1, 0, 8, 0, 0, 0, 1],
    [1, 0, 5, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  let info05f = hasWeight(inputBack05_7_7, input05f, 2, 2, 3);
  it("hasWeight F", () => {
    expect(info05f).toBe(true);
  });


  // Insert new tests here
});
