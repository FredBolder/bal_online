import { randomInt } from "./utils";

const series1Start = 200;
const series1End = 219;
const series2Start = 700;
const series2End = 731;
const seriesSmallStart = 750;
const seriesSmallEnd = 760;

async function loadFromFile(n) {
  let data = [];
  const fn = `/Levels/${n}.dat`;
  try {
    const response = await fetch(fn);
    if (!response.ok) throw new Error(`Failed to load file: ${fn}`);
    
    const d = await response.text();
    data = d.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    
    const lineLength = data[0].length;
    if (!data.every(line => line.length === lineLength)) {
      throw new Error("Inconsistent line lengths");
    }
  } catch (err) {
    console.error(err);
    data = [
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
  return data;
}

async function getLevel(n) {
  let data = [];

  if ((n >= series1Start && n <= series1End) || (n >= series2Start && n <= series2End) || 
  (n >= seriesSmallStart && n <= seriesSmallEnd) || (n >= 990 && n <= 991)) {
    data = await loadFromFile(n);
  } else {
    data = await loadFromFile(1000);
  }
  return data;
}

function getRandomLevel(currentLevel) {
  let levels = [];
  let result = currentLevel;

  for (let i = series1Start + 1; i <= series1End; i++) {
    levels.push(i);
  }
  for (let i = series2Start + 1; i <= series2End; i++) {
    levels.push(i);
  }
  for (let i = seriesSmallStart + 1; i <= seriesSmallEnd; i++) {
    levels.push(i);
  }
  while (result === currentLevel) {
    result = levels[randomInt(0, levels.length - 1)];
  }
  return result;
}

export { getLevel, getRandomLevel };
