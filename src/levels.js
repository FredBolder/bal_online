import { randomInt } from "./utils.js";

const series1Start = 200;
const series1End = 224;
const series2Start = 300;
const series2End = 305;
const series3Start = 700;
const series3End = 749;
const seriesSmallStart = 750;
const seriesSmallEnd = 764;
const seriesExtremeStart = 901;
const seriesExtremeEnd = 902;
const seriesSecretStart = 2000;
const seriesSecretEnd = 2008;

export function checkLevel(data) {
  let differentLength = false;
  let msg = "";
  let nBlueBalls = 0;
  let nSmallBlueBalls = 0;
  let nSmallGreenBalls = 0;
  let nSmallSilverBalls = 0;
  let nSelfDestructingTeleports = 0;
  let nTeleports = 0;

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      if (line.length !== data[0].length) {
        differentLength = true;
      }
      for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        switch (ch) {
          case "2":
            nBlueBalls++;
            break;
          case "%":
            nSmallBlueBalls++;
            break;
          case "3":
            nSmallGreenBalls++;
            break;
          case "°":
            nSmallSilverBalls++;
            break;
          case "τ":
            nSelfDestructingTeleports++;
            break;
          case "T":
            nTeleports++;
            break;
          default:
            break;
        }
      }
    }
    if (differentLength) {
      msg += "Every data line must have the same length.\n";
    }
    if (nBlueBalls < 1) {
      msg += "There is no blue ball (player).\n";
    }
    if (nSmallBlueBalls > 1) {
      msg += "There can be only one small blue ball.\n";
    }
    if ((nSmallBlueBalls > 0) && (nSmallSilverBalls > 0)) {
      msg += "When there is a small silver ball, there can not be a small blue ball.\n";
    }
    if (nSmallGreenBalls < 1) {
      msg += "There is no small green ball.\n";
    }
    if (nBlueBalls > 1) {
      msg += "There can be only one blue ball (player).\n";
    }
    if ((nTeleports !== 0) && (nTeleports !== 2)) {
      msg += "There can be only 0 or 2 normal teleports.\n";
    }
    if ((nSelfDestructingTeleports !== 0) && (nSelfDestructingTeleports !== 2)) {
      msg += "There can be only 0 or 2 self-destructing teleports.\n";
    }
  } else {
    msg += "The level is empty.\n";
  }
  return msg;
}

export function getSecretStart() {
  return seriesSecretStart;
}

async function loadFromFile(n, gateTravelling = false) {
  let levelData = [];
  let levelSettings = [];
  let msg = "";
  let fn = n.toString();
  while (fn.length < 4) {
    fn = "0" + fn;
  }
  fn = `/Levels/` + fn;
  if (gateTravelling) {
    fn += "g";
  }
  fn += ".dat";
  try {
    const response = await fetch(fn);
    if (!response.ok) throw new Error(`Failed to load file: ${fn}`);

    const d = await response.text();
    const data = d.split("\n");
    for (let i = 0; i < data.length; i++) {
      const line = data[i].trim();
      if (line !== "") {
        if (line.startsWith("$")) {
          levelSettings.push(line);
        } else {
          levelData.push(line);
        }
      }
    }

    msg = checkLevel(levelData);
    if (msg !== "") {
      throw new Error(msg);
    }
  } catch (err) {
    alert(err.message);
    levelSettings = null;
    levelSettings = [];
    levelData = null;
    levelData = [
      "11111111111111111111111111111111111111111",
      "1                                       1",
      "1   55555  5555   5555    555   5555    1",
      "1   5      5   5  5   5  5   5  5   5   1",
      "1   555    5555   5555   5   5  5555    1",
      "1   5      5  5   5  5   5   5  5  5    1",
      "1   55555  5   5  5   5   555   5   5  31",
      "1 2                                     1",
      "11111111111111111111111111111111111111111"
    ];
  }
  return { levelSettings, levelData };
}

export async function getLevel(n, gateTravelling = false) {
  let result = [];

  if ((n >= series1Start && n <= series1End) || (n >= series2Start && n <= series2End) || (n >= series3Start && n <= series3End) ||
    (n >= seriesSmallStart && n <= seriesSmallEnd) || (n >= seriesExtremeStart && n <= seriesExtremeEnd) ||
    (n >= seriesSecretStart && n <= seriesSecretEnd) || (n >= 990 && n <= 991)) {
    result = await loadFromFile(n, gateTravelling);
  } else {
    result = await loadFromFile(1000, false);
  }
  return result;
}

export function getRandomLevel(currentLevel) {
  let levels = [];
  let result = currentLevel;

  for (let i = series1Start + 1; i <= series1End; i++) {
    levels.push(i);
  }
  for (let i = series2Start + 1; i <= series2End; i++) {
    levels.push(i);
  }
  for (let i = series3Start + 1; i <= series3End; i++) {
    levels.push(i);
  }
  for (let i = seriesSmallStart + 1; i <= seriesSmallEnd; i++) {
    levels.push(i);
  }
  // Exclude levels
  const exclude = [220, 221, 222, 223, 734, 735, 736, 737, 738];
  for (let i = 0; i < exclude.length; i++) {
    const level = exclude[i];
    const idx = levels.indexOf(level);
    if (idx >= 0) {
      levels.splice(idx);
    }
  }
  while (result === currentLevel) {
    result = levels[randomInt(0, levels.length - 1)];
  }
  return result;
}


