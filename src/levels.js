import { randomInt } from "./utils.js";

const series1Start = 200;
const series1End = 223;
const series2Start = 300;
const series2End = 305;
const series3Start = 700;
const series3End = 749;
const seriesSmallStart = 750;
const seriesSmallEnd = 763;
const seriesExtremeStart = 901;
const seriesExtremeEnd = 902;
const seriesSecretStart = 2000;
const seriesSecretEnd = 2005;

export function getSecretStart() {
  return seriesSecretStart;
}

async function loadFromFile(n, gateTravelling = false) {
  let levelData = [];
  let levelSettings = [];
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

    if (levelData.length > 0) {
      const lineLength = levelData[0].length;
      if (!levelData.every(line => line.length === lineLength)) {
        throw new Error("Inconsistent line lengths");
      }
    } else {
        throw new Error("Level is empty");
    }
  } catch (err) {
    console.error(err);
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
  const exclude = [ 220, 221, 222, 734, 735, 736, 737, 738 ];
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


