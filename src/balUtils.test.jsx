import { describe, it, expect } from "vitest";
import {
  isEmpty,
  numberArrayToStringArray,
  stringArrayToNumberArray,
} from "./balUtils.js";
import { initGameInfo } from "./gameInfo.js";

describe("balUtils", () => {
  const defaultGameInfo = {};
  initGameInfo(defaultGameInfo);

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

  // Insert new tests here
});
