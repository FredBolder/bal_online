import { charToNumber } from "./balUtils.js";
import { conveyorBeltModes } from "./conveyorBelts.js";
import { randomInt, tryParseInt } from "./utils.js";

const series1Start = 200;
const series1End = 224;
const series2Start = 300;
const series2End = 327;
const series3Start = 400;
const series3End = 409;
const series4Start = 700;
const series4End = 749;
const seriesSmallStart = 750;
const seriesSmallEnd = 764;
const seriesExtremeStart = 901;
const seriesExtremeEnd = 904;
const seriesChoniaPollaStart = 990;
const seriesChoniaPollaEnd = 991;
const seriesSecretStart = 2000;
const seriesSecretEnd = 2016;
const seriesEasyStart = 3000;
const seriesEasyEnd = 3014;

export function fixLevel(gameData, gameInfo) {
  const empty = [];
  let result = "";
  let errorGameRotatorInNonSquareLevel = false;
  let errorMoreThanOneBlueBall = false;
  let errorMoreThanOneSmallBlueBall = false;
  let foundBlue = false;
  let foundSmallblue = false;
  let foundSmallGreen = false;
  let nSmallGreenBalls = 0;
  let used = 0;
  const xMax = gameData[0].length - 1;
  const yMax = gameData.length - 1;
  let x = -1;
  let y = -1;

  for (let i = gameData.length - 1; i >= 0; i--) {
    for (let j = 0; j <= xMax; j++) {
      const el = gameData[i][j];
      switch (el) {
        case 0:
          if ((empty.length < 5) && (j > 0) && (i > 0) && (j < xMax) && (i < (gameData.length - 1))) {
            empty.push({ x: j, y: i });
          }
          break;
        case 3:
          foundSmallGreen = true;
          nSmallGreenBalls++;
          break;
        case 2:
          if (foundBlue) {
            errorMoreThanOneBlueBall = true;
            gameData[i][j] = 0;
          } else {
            gameInfo.blueBall.x = j;
            gameInfo.blueBall.y = i;
          }
          foundBlue = true;
          break;
        case 89:
          if (xMax !== yMax) {
            errorGameRotatorInNonSquareLevel = true;
            gameData[i][j] = 0;
          }
          break;
        case 168:
          if (foundSmallblue) {
            errorMoreThanOneSmallBlueBall = true;
            gameData[i][j] = 0;
          }
          foundSmallblue = true;
          break;
        default:
          break;
      }
    }
  }

  if (errorGameRotatorInNonSquareLevel) {
    result += "There was a game rotator in a non square level.\n";
  }
  if (errorMoreThanOneBlueBall) {
    result += "There was more than one blue ball.\n";
  }
  if (errorMoreThanOneSmallBlueBall) {
    result += "There was more than one small blue ball.\n";
  }

  if (!foundBlue) {
    result += "There was no blue ball.\n";
    if (used < empty.length) {
      x = empty[used].x;
      y = empty[used].y;
      used++;
    } else {
      x = 1;
      y = gameData.length - 2;
    }
    gameData[y][x] = 2;
    gameInfo.blueBall.x = x;
    gameInfo.blueBall.y = y;
  }

  if (!foundSmallGreen) {
    result += "There was no small green ball.\n";
    if (used < empty.length) {
      x = empty[used].x;
      y = empty[used].y;
      used++;
    } else {
      x = 2;
      y = gameData.length - 2;
    }
    gameData[y][x] = 3;
    nSmallGreenBalls = 1;
  }
  gameInfo.greenBalls = nSmallGreenBalls;

  if (result !== "") {
    result = "The folowing problems were fixed. Please review the level.\n" + result;
  }
  return result;
}

export function getAllLevels() {
  let levels = [];

  for (let i = series1Start; i <= series1End; i++) {
    levels.push(i);
  }
  for (let i = series2Start; i <= series2End; i++) {
    levels.push(i);
  }
  for (let i = series3Start; i <= series3End; i++) {
    levels.push(i);
  }
  for (let i = series4Start; i <= series4End; i++) {
    levels.push(i);
  }
  for (let i = seriesSmallStart; i <= seriesSmallEnd; i++) {
    levels.push(i);
  }
  for (let i = seriesExtremeStart; i <= seriesExtremeEnd; i++) {
    levels.push(i);
  }
  for (let i = seriesSecretStart; i <= seriesSecretEnd; i++) {
    levels.push(i);
  }
  for (let i = seriesEasyStart; i <= seriesEasyEnd; i++) {
    levels.push(i);
  }
  return levels;
}

function getSettingInfo(name, settingsInfo) {
  let info = null;

  for (let i = 0; i < settingsInfo.length; i++) {
    if (name === settingsInfo[i].name) {
      info = settingsInfo[i];
    }
  }
  return info;
}

function settingNr(index) {
  return `Setting ${index + 1}: `;
}

export function checkLevel(data, settings) {
  // For $hint and $startlevelmessage there can be a comma in the text and $notes and $addnotes have a variable
  // number of parameters.
  const settingsInfo = [
    { name: "$addnotes", params: 0, xy: true },
    { name: "$background", params: 5, xy: true },
    { name: "$bgcolor", params: 5, xy: true },
    { name: "$conveyorbeltmode", params: 3, xy: true },
    { name: "$direction", params: 3, xy: true },
    { name: "$fgcolor", params: 5, xy: true },
    { name: "$gameticks", params: 2, xy: false },
    { name: "$gameticksxy", params: 3, xy: true },
    { name: "$group", params: 3, xy: true },
    { name: "$hint", params: 0, xy: false },
    { name: "$instrument", params: 4, xy: true },
    { name: "$inverted", params: 3, xy: true },
    { name: "$musicbox", params: 4, xy: true },
    { name: "$notes", params: 0, xy: true },
    { name: "$pistonmode", params: 3, xy: true },
    { name: "$sound", params: 2, xy: false },
    { name: "$startlevelmessage", params: 0, xy: false },
    { name: "$sticky", params: 3, xy: true }
  ];
  let differentLength = false;
  let gameTicks = 0;
  let group = 0;
  let info = null;
  let msg = "";
  let msgExtra = "";
  let nBlueBalls = 0;
  let nDetonators = 0;
  let nGameRotator = 0;
  let nPurpleSelfDestructingTeleports = 0;
  let nSmallBlueBalls = 0;
  let nSmallGreenBalls = 0;
  let nSelfDestructingTeleports = 0;
  let nTeleports = 0;
  let nTravelgates = 0;
  let p1 = -1;
  let validXY = false;
  let volume = 0;
  let h = -1;
  let w = -1;
  let x = -1;
  let y = -1;

  // Check Data
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      if (line.length !== data[0].length) {
        differentLength = true;
      }
      for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        if (charToNumber(ch) === -1) {
          msg += `There is an invalid character (${ch}) in the data.\n`;
        }
        switch (ch) {
          case "2":
            nBlueBalls++;
            break;
          case "b":
            nDetonators++;
            break;
          case "Π":
            nPurpleSelfDestructingTeleports++;
            break;
          case "%":
            nSmallBlueBalls++;
            break;
          case "3":
            nSmallGreenBalls++;
            break;
          case "τ":
            nSelfDestructingTeleports++;
            break;
          case "T":
            nTeleports++;
            break;
          case "g":
            nTravelgates++;
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
    if (nBlueBalls > 1) {
      msg += "There can be only one blue ball (player).\n";
    }
    if (nDetonators > 1) {
      msg += "There can be only one detonator.\n";
    }
    if ((nGameRotator > 0) && (data.length !== data[0].length)) {
      msg += "There can only be a game rotator when the number of columns is the same as the number of rows.\n";
    }
    if (nSmallBlueBalls > 1) {
      msg += "There can be only one small blue ball.\n";
    }
    if ((nSmallBlueBalls > 0) && (nTravelgates > 0)) {
      msg += "When there is a travel gate, there can not be a small blue ball.\n";
    }
    if (nSmallGreenBalls < 1) {
      msg += "There is no small green ball.\n";
    }
    if ((nTeleports !== 0) && (nTeleports !== 2)) {
      msg += "There can be only 0 or 2 normal teleports.\n";
    }
    if ((nSelfDestructingTeleports !== 0) && (nSelfDestructingTeleports !== 2)) {
      msg += "There can be only 0 or 2 self-destructing teleports.\n";
    }
    if ((nPurpleSelfDestructingTeleports !== 0) && (nPurpleSelfDestructingTeleports !== 2)) {
      msg += "There can be only 0 or 2 purple self-destructing teleports.\n";
    }
    if (nTravelgates > 1) {
      msg += "There can be only one travel gate.\n";
    }
  } else {
    msg += "The level is empty.\n";
  }

  // Check Settings
  for (let i = 0; i < settings.length; i++) {
    const setting = settings[i];
    p1 = setting.indexOf(":");
    if (p1 >= 0) {
      const name = setting.slice(0, p1).toLowerCase().trim();
      const values = setting.slice(p1 + 1).split(",").map(value => value.trim());
      const valuesLowerCase = values.map(value => value.toLowerCase());
      if (values.length >= 2) {
        x = tryParseInt(values[0], -1);
        y = tryParseInt(values[1], -1);
        validXY = ((x >= 0) && (y >= 0) && (x < data[0].length) && (y < data.length));
      }
      info = getSettingInfo(name, settingsInfo);
      if (info !== null) {
        if (info.xy && !validXY) {
          msg += `${settingNr(i)}Invalid or missing coordinates.\n`;
        }
        if ((info.params === 0) || (values.length === info.params)) {
          switch (name) {
            case "$background":
            case "$bgcolor":
            case "$fgcolor":
              w = tryParseInt(values[2], -1);
              h = tryParseInt(values[3], -1);
              if (w < 1) {
                msg += `${settingNr(i)}Invalid value ${values[2]} for width.\n`;
              }
              if (h < 1) {
                msg += `${settingNr(i)}Invalid value ${values[2]} for height.\n`;
              }
              if (((x + w - 1) >= data[0].length) || ((y + h - 1) >= data.length)) {
                msg += `${settingNr(i)}The area exceeds the game raster.\n`;
              }
              break;
            case "$conveyorbeltmode":
              if (!conveyorBeltModes().includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid conveyor mode ${values[2]}.\n`;
              }
              if (validXY && (data[y][x] !== "{")) {
                console.log(data[y][x]);
                msg += `${settingNr(i)}No conveyor found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$direction":
              if (!["left", "right", "none"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid value ${values[2]} for direction.\n`;
              }
              break;
            case "$gameticks":
              if (!["conveyorbelt", "fish", "elevator"].includes(valuesLowerCase[0])) {
                msg += `${settingNr(i)}Invalid value ${values[0]} for object name.\n`;
              }
              gameTicks = tryParseInt(values[1], -1);
              if (gameTicks < 1) {
                msg += `${settingNr(i)}Invalid value ${values[1]} for ticks.\n`;
              }
              break;
            case "$gameticksxy":
              if (validXY && ![")"].includes(data[y][x])) {
                msg += `${settingNr(i)}No delay found at the coordinates ${x}, ${y}.\n`;
              }
              gameTicks = tryParseInt(values[2], -1);
              if (gameTicks < 1) {
                msg += `${settingNr(i)}Invalid value ${values[2]} for ticks.\n`;
              }
              break;
            case "$group":
              group = tryParseInt(values[2], -1);
              if ((group < 1) || (group > 32)) {
                msg += `${settingNr(i)}Invalid value ${values[2]} for group.\n`;
              }
              break;
            case "$instrument":
              if (!["accordion", "altsax", "bass", "bassdrum", "bell", "clarinet", "cowbell", "guitar", "harp", "harpsichord", "hihat", "kalimba",
                "piano", "snaredrum", "strings", "trombone", "trumpet", "vibraphone", "xylophone"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid instrument ${values[2]}.\n`;
              }
              volume = tryParseInt(values[3], -1);
              if ((volume < 0) || (volume > 100)) {
                msg += `${settingNr(i)}Invalid value ${values[3]} for volume.\n`;
              }
              if (validXY && !["M"].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$musicbox":
              if (!["note", "song"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid music box mode ${values[2]}.\n`;
              }
              gameTicks = tryParseInt(values[3], -1);
              if ((gameTicks < 1) || (gameTicks > 100)) {
                msg += `${settingNr(i)}Invalid value ${values[3]} for delay.\n`;
              }
              if (validXY && !["M"].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$pistonmode":
              if (!["momentary", "repeatfast", "repeatslow", "toggle"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid piston mode ${values[2]}.\n`;
              }
              if (validXY && !["Ù", "Ì", "Ö", "Ë"].includes(data[y][x])) {
                msg += `${settingNr(i)}No piston found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$sound":
              if (!["default", "never", "player"].includes(valuesLowerCase[1])) {
                msg += `${settingNr(i)}Invalid sound mode ${values[1]}.\n`;
              }
              break;
            case "$inverted":
            case "$sticky":
              if (!["yes", "no"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}yes or no expected.\n`;
              }
              if (validXY && !["Ù", "Ì", "Ö", "Ë"].includes(data[y][x])) {
                msg += `${settingNr(i)}No piston found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$addnotes":
            case "$notes":
              if (values.length < 3) {
                msg += `${settingNr(i)}At least 3 arguments expected for ${name}.\n`;
              }
              if (validXY && !["M"].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            default:
              break;
          }
        } else {
          msg += `${settingNr(i)}${info.params} arguments expected for ${name}.\n`;
        }
      } else {
        msg += `${settingNr(i)}Invalid setting name ${name}.`;
        switch (name) {
          case "$addnote":
            msgExtra = "$addnotes";
            break;
          case "$backcolor":
          case "$backcolour":
          case "$backgroundcolor":
          case "$backgroundcolour":
          case "$bgcolour":
            msgExtra = "$bgcolor";
            break;
          case "$conveyerbeltmode":
          case "$conveyorbandmode":
          case "$conveyormode":
          case "$conveyerbandmode":
          case "$conveyermode":
            msgExtra = "$conveyorbeltmode";
            break;
          case "$delay":
          case "$ticks":
          case "$time":
            msgExtra = "$gameticks";
            break;
          case "$delayxy":
          case "$ticksxy":
          case "$timexy":
            msgExtra = "$gameticksxy";
            break;
          case "$color":
          case "$colour":
          case "$fgcolour":
          case "$foregroundcolor":
          case "$foregroundcolour":
          case "$frontcolor":
          case "$frontcolour":
            msgExtra = "$fgcolor";
            break;
          case "$help":
            msgExtra = "$hint";
            break;
          case "$invert":
          case "$reverse":
            msgExtra = "$inverted";
            break;
          case "$note":
            msgExtra = "$notes";
            break;
          case "$jukebox":
          case "$musicblock":
          case "$noteblock":
          case "$notebox":
            msgExtra = "$musicbox";
            break;
          case "$startmessage":
          case "$startupmessage":
            msgExtra = "$startlevelmessage";
            break;
          default:
            msgExtra = "";
            break;
        }
        if (msgExtra !== "") {
          msg += ` Perhaps you mean ${msgExtra}.`;
        }
        msg += "\n";
      }

    } else {
      msg += `${settingNr(i)}Colon (:) expected.\n`;
    }
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
      if ((line !== "") && !line.startsWith("//")) {
        if (line.startsWith("$")) {
          levelSettings.push(line);
        } else {
          levelData.push(line);
        }
      }
    }

    msg = checkLevel(levelData, levelSettings);
    if (msg !== "") {
      throw new Error(msg);
    }
  } catch (err) {
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
  return { levelSettings, levelData, error: msg };
}

export async function getLevel(n, gateTravelling = false) {
  let result = [];

  if ((n >= series1Start && n <= series1End) ||
    (n >= series2Start && n <= series2End) ||
    (n >= series3Start && n <= series3End) ||
    (n >= series4Start && n <= series4End) ||
    (n >= seriesSmallStart && n <= seriesSmallEnd) ||
    (n >= seriesEasyStart && n <= seriesEasyEnd) ||
    (n >= seriesExtremeStart && n <= seriesExtremeEnd) ||
    (n >= seriesSecretStart && n <= seriesSecretEnd) ||
    (n >= seriesChoniaPollaStart && n <= seriesChoniaPollaEnd) ||
    (n === 9999)) {
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
  for (let i = series4Start + 1; i <= series4End; i++) {
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
      levels.splice(idx, 1);
    }
  }
  while (result === currentLevel) {
    result = levels[randomInt(0, levels.length - 1)];
  }
  return result;
}


