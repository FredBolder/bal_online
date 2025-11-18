import { removeObject } from "./addRemoveObject.js";
import { changeDirection, changeGroup, charToNumber, findElementByCoordinates } from "./balUtils.js";
import { changeConveyorBeltMode, conveyorBeltModes } from "./conveyorBelts.js";
import { globalVars } from "./glob.js";
import { moversDirections } from "./movers.js";
import { instruments } from "./music.js";
import { changeMusicBoxProperty, musicBoxModes } from "./musicBoxes.js";
import { pistonModes } from "./pistons.js";
import { solvedLevels } from "./progress.js";
import { maxStonePatterns } from "./stonePatterns.js";
import { deleteIfPurpleTeleport, getPurpleTeleportColor } from "./teleports.js";
import { randomInt, tryParseInt } from "./utils.js";

export const series1Start = 200;
export const series1End = 224;
export const series2Start = 300;
export const series2End = 328;
export const series3Start = 400;
export const series3End = 426;
export const series4Start = 700;
export const series4End = 749;
export const series5Start = 3300;
export const series5End = 3323;
export const seriesSmallStart = 750;
export const seriesSmallEnd = 764;
export const seriesExtremeStart = 901;
export const seriesExtremeEnd = 905;
export const seriesChoniaPollaStart = 990;
export const seriesChoniaPollaEnd = 993;
export const seriesSecretStart = 2000;
export const seriesSecretEnd = 2016;
export const seriesEasyStart = 3000;
export const seriesEasyEnd = 3022;
export const hiddenMiniSeries1Start = 3100;
export const hiddenMiniSeries1End = 3107;
export const seriesMusicStart = 3200;
export const seriesMusicEnd = 3207;
export const extraSeries1Start = 5000;
export const extraSeries1End = 5007;
export const extraSeriesEasyStart = 6000;
export const extraSeriesEasyEnd = 6008;
export const extraSeriesMusicStart = 6200;
export const extraSeriesMusicEnd = 6201;

export function addSolvedLevels(levelStr) {
  let level = -1;
  let levelStart = -1;
  let levelEnd = -1;
  const list = levelStr.split(",");
  let pFirst = -1;
  let pLast = -1;
  let remove = false;
  let s = "";
  for (let i = 0; i < list.length; i++) {
    s = list[i].trim();
    remove = false;
    pFirst = s.indexOf("-");
    if (pFirst >= 0) {
      pLast = s.lastIndexOf("-");
      if (pFirst === pLast) {
        levelStart = tryParseInt(s.slice(0, pFirst).trim(), -1);
        levelEnd = tryParseInt(s.slice(pFirst + 1).trim(), -1);
        if ((levelStart !== -1) && (levelEnd !== -1) && (levelEnd >= levelStart)) {
          for (let j = levelStart; j <= levelEnd; j++) {
            level = j;
            if ((level !== -1) && getAllLevels().includes(level) && !solvedLevels.includes(level)) {
              solvedLevels.push(level);
            }
          }
        }
      }
    } else {
      if (s.startsWith("!")) {
        remove = true;
        s = s.slice(1).trim();
      }
      level = tryParseInt(s, -1);
      if (remove) {
        if (solvedLevels.includes(level)) {
          solvedLevels.splice(0, solvedLevels.length,
            ...solvedLevels.filter(el => (el !== level))
          );
        }
      } else {
        if ((level !== -1) && getAllLevels().includes(level) && !solvedLevels.includes(level)) {
          solvedLevels.push(level);
        }
      }
    }
  }
}

export function checkLevel(data, settings) {
  let checkSettingsResult = "";
  let differentLength = false;
  let foundGravityChanger = false;
  let foundLava = false;
  let foundWater = false;
  let group = -1;
  let groups = [];
  let idx = -1;
  let msg = "";
  let nBlueBalls = 0;
  let nDetonators = 0;
  let nGameRotator = 0;
  let nPurpleSelfDestructingTeleports = [];
  let nSmallBlueBalls = 0;
  let nSmallGreenBalls = 0;
  let nSelfDestructingTeleports = [];
  let nTeleports = [];
  let nTravelgates = 0;
  let p1 = -1;
  let validXY = false;
  let x = -1;
  let y = -1;

  for (let i = 0; i < 32; i++) {
    nPurpleSelfDestructingTeleports.push(0);
    nSelfDestructingTeleports.push(0);
    nTeleports.push(0);
  }
  // Read the groups to be able to test more
  for (let i = 0; i < settings.length; i++) {
    const setting = settings[i];
    p1 = setting.indexOf(":");
    if (p1 >= 0) {
      const name = setting.slice(0, p1).toLowerCase().trim();
      const values = setting.slice(p1 + 1).split(",").map(value => value.trim());
      if (values.length >= 2) {
        x = tryParseInt(values[0], -1);
        y = tryParseInt(values[1], -1);
        validXY = ((x >= 0) && (y >= 0) && (x < data[0].length) && (y < data.length));
      }
      if ((name === "$group") && validXY) {
        group = tryParseInt(values[2], -1);
        if ((group >= 1) && (group <= 32)) {
          groups.push({ x, y, group });
        }
      }
    }
  }
  if (groups.length > 1) {
    // In case of duplicates, the last is used
    groups.reverse();
  }

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
          case "Є":
          case "З":
            foundGravityChanger = true;
            break;
          case "V":
            foundLava = true;
            break;
          case "Π":
            idx = findElementByCoordinates(j, i, groups);
            group = (idx >= 0) ? groups[idx].group - 1 : 0;
            nPurpleSelfDestructingTeleports[group]++;
            break;
          case "%":
            nSmallBlueBalls++;
            break;
          case "3":
            nSmallGreenBalls++;
            break;
          case "τ":
            idx = findElementByCoordinates(j, i, groups);
            group = (idx >= 0) ? groups[idx].group - 1 : 0;
            nSelfDestructingTeleports[group]++;
            break;
          case "T":
            idx = findElementByCoordinates(j, i, groups);
            group = (idx >= 0) ? groups[idx].group - 1 : 0;
            nTeleports[group]++;
            break;
          case "g":
            nTravelgates++;
            break;
          case "W":
          case "w":
          case "ς":
          case "σ":
          case "f":
            foundWater = true;
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
    if (foundGravityChanger && (foundWater || foundLava)) {
      msg += "There can be no gravity changer in a level with water and/or lava.\n";
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
    for (let i = 0; i < nTeleports.length; i++) {
      if ((nTeleports[i] !== 0) && (nTeleports[i] !== 2)) {
        msg += `There is an invalid number of teleports in group ${i + 1}.\n`;
      }
    }
    for (let i = 0; i < nSelfDestructingTeleports.length; i++) {
      if ((nSelfDestructingTeleports[i] !== 0) && (nSelfDestructingTeleports[i] !== 2)) {
        msg += `There is an invalid number of self-destructing teleports in group ${i + 1}.\n`;
      }
    }
    for (let i = 0; i < nPurpleSelfDestructingTeleports.length; i++) {
      if ((nPurpleSelfDestructingTeleports[i] !== 0) && (nPurpleSelfDestructingTeleports[i] !== 2)) {
        msg += `There is an invalid number of purple self-destructing teleports in group ${i + 1}.\n`;
      }
    }
    if (nTravelgates > 1) {
      msg += "There can be only one travel gate.\n";
    }
  } else {
    msg += "The level is empty.\n";
  }

  // Check Settings
  checkSettingsResult = checkSettings(data, settings);
  msg += checkSettingsResult;

  return msg;
}

export function checkSettings(data, settings) {
  // This function works with code 1 and code 2, so data with characters and data with numbers

  // For $hint and $startlevelmessage there can be a comma in the text and $notes and $addnotes have a variable
  // number of parameters.
  const settingsInfo = [
    { name: "$addnotes", params: 0, xy: true },
    { name: "$background", params: 5, xy: true },
    { name: "$bgcolor", params: 5, xy: true },
    { name: "$conveyorbeltmode", params: 3, xy: true },
    { name: "$direction", params: 3, xy: true },
    { name: "$displaysize", params: 2, xy: false },
    { name: "$extra", params: 1, xy: false },
    { name: "$fgcolor", params: 5, xy: true },
    { name: "$gameticks", params: 2, xy: false },
    { name: "$gameticksxy", params: 3, xy: true },
    { name: "$group", params: 3, xy: true },
    { name: "$has", params: 1, xy: false },
    { name: "$hint", params: 0, xy: false },
    { name: "$ignorepattern", params: 4, xy: true },
    { name: "$instrument", params: 4, xy: true },
    { name: "$inverted", params: 3, xy: true },
    { name: "$musicbox", params: 4, xy: true },
    { name: "$noteoverride", params: 3, xy: true },
    { name: "$notes", params: 0, xy: true },
    { name: "$part", params: 3, xy: true },
    { name: "$pattern", params: 0, xy: true },
    { name: "$pistonmode", params: 3, xy: true },
    { name: "$sound", params: 2, xy: false },
    { name: "$startlevelmessage", params: 0, xy: false },
    { name: "$stepspermeasure", params: 3, xy: true },
    { name: "$sticky", params: 3, xy: true },
    { name: "$stonepattern", params: 1, xy: false }
  ];

  let gameTicks = 0;
  let group = 0;
  let info = null;
  let msg = "";
  let msgExtra = "";
  let p1 = -1;
  let val_int = 0;
  let validXY = false;
  let volume = 0;
  let h = -1;
  let w = -1;
  let x = -1;
  let y = -1;

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
            case "$ignorepattern":
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
              if (validXY && !["{", 171].includes(data[y][x])) {
                msg += `${settingNr(i)}No conveyor found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$direction":
              switch (data[y][x]) {
                case "M":
                case 157:
                  if (!["left", "right", "up", "down"].includes(valuesLowerCase[2])) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for direction.\n`;
                  }
                  break;
                case "{":
                case 171:
                  if (!["left", "right", "none"].includes(valuesLowerCase[2])) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for direction.\n`;
                  }
                  break;
                case "η":
                case 178:
                  if (!moversDirections().includes(valuesLowerCase[2])) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for direction.\n`;
                  }
                  break;
                case "њ":
                case 209:
                  if (!["left", "right", "up", "down"].includes(valuesLowerCase[2])) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for direction.\n`;
                  }
                  break;
                default:
                  msg += `${settingNr(i)}No conveyor belt, mover, music box or pusher found at the coordinates ${x}, ${y}.\n`;
                  break;
              }
              break;
            case "$displaysize":
              w = tryParseInt(values[0], -1);
              h = tryParseInt(values[1], -1);
              if (w < 10) {
                msg += `${settingNr(i)}Invalid value ${values[0]} for columns.\n`;
              }
              if (h < 10) {
                msg += `${settingNr(i)}Invalid value ${values[1]} for rows.\n`;
              }
              break;
            case "$extra":
              val_int = tryParseInt(values[0], -1);
              if ((val_int < 0) || (val_int < 1)) {
                msg += `${settingNr(i)}Invalid value ${values[0]} for extra.\n`;
              }
              break;
            case "$gameticks":
              if (!["conveyorbelt", "disappearingstone", "fish", "elevator", "ice", "mover", "phaseability", "pinkball", "yellowslowdowner"].includes(valuesLowerCase[0])) {
                msg += `${settingNr(i)}Invalid value ${values[0]} for object name.\n`;
              }
              gameTicks = tryParseInt(values[1], -1);
              if ((gameTicks < 0) || ((gameTicks < 1) && !["mover"].includes(valuesLowerCase[0]))) {
                msg += `${settingNr(i)}Invalid value ${values[1]} for ticks.\n`;
              }
              break;
            case "$gameticksxy":
              if (validXY && ![")", 167].includes(data[y][x])) {
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
            case "$has":
              if (!["nothing", "coilspring", "divingglasses", "freezegun", "key", "ladder", "lightblueball", "orangeball", "pickaxe", "pinkball", "propeller",
                "purpleball", "redball", "selfdestructingteleportscreator", "shrinker", "telekineticpower", "teleportscreator", "whiteball",
                "weakstone", "yellowball"].includes(valuesLowerCase[0])) {
                msg += `${settingNr(i)}Invalid object or ability ${values[0]}.\n`;
              }
              break;
            case "$instrument":
              if (!instruments().includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid instrument ${values[2]}.\n`;
              }
              volume = tryParseInt(values[3], -1);
              if ((volume < 0) || (volume > 100)) {
                msg += `${settingNr(i)}Invalid value ${values[3]} for volume.\n`;
              }
              if (validXY && !["M", 157].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$musicbox":
              if (!musicBoxModes().includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid music box mode ${values[2]}.\n`;
              }
              gameTicks = tryParseInt(values[3], -1);
              if ((gameTicks < 1) || (gameTicks > 100)) {
                msg += `${settingNr(i)}Invalid value ${values[3]} for delay.\n`;
              }
              if (validXY && !["M", 157].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$part":
              switch (data[y][x]) {
                case "M":
                case 157:
                  if (!["top", "middle", "bottom"].includes(valuesLowerCase[2])) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for part.\n`;
                  }
                  break;
                default:
                  msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
                  break;
              }
              break;
            case "$pattern":
              if (values.length < 3) {
                msg += `${settingNr(i)}At least 3 arguments expected for ${name}.\n`;
              }
              if (validXY && !["Џ", 198].includes(data[y][x])) {
                msg += `${settingNr(i)}No disappearing stone found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$pistonmode":
              if (!pistonModes().includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}Invalid piston mode ${values[2]}.\n`;
              }
              if (validXY && !["Ù", "Ì", "Ö", "Ë", 159, 161, 163, 165].includes(data[y][x])) {
                msg += `${settingNr(i)}No piston found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$sound":
              if (!["default", "never", "player"].includes(valuesLowerCase[1])) {
                msg += `${settingNr(i)}Invalid sound mode ${values[1]}.\n`;
              }
              break;
            case "$stepspermeasure":
              switch (data[y][x]) {
                case "M":
                case 157:
                  val_int = tryParseInt(values[2], -1);
                  if (val_int < 2) {
                    msg += `${settingNr(i)}Invalid value ${values[2]} for the number of steps per measure.\n`;
                  }
                  break;
                default:
                  msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
                  break;
              }
              break;
            case "$inverted":
            case "$sticky":
              if (!["yes", "no"].includes(valuesLowerCase[2])) {
                msg += `${settingNr(i)}yes or no expected.\n`;
              }
              if (validXY && !["Ù", "Ì", "Ö", "Ë", 159, 161, 163, 165].includes(data[y][x])) {
                msg += `${settingNr(i)}No piston found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$stonepattern":
              val_int = tryParseInt(values[0], -1);
              if ((val_int < 0) || (val_int > maxStonePatterns)) {
                msg += `${settingNr(i)}Invalid value ${values[0]} for stone pattern number.\n`;
              }
              break;
            case "$addnotes":
            case "$notes":
              if (values.length < 3) {
                msg += `${settingNr(i)}At least 3 arguments expected for ${name}.\n`;
              }
              if (validXY && !["M", 157].includes(data[y][x])) {
                msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
              }
              break;
            case "$noteoverride":
              switch (data[y][x]) {
                case "M":
                case 157:
                  if (values[2].trim() === "") {
                    msg += `${settingNr(i)}Empty value for note override.\n`;
                  }
                  break;
                default:
                  msg += `${settingNr(i)}No music box found at the coordinates ${x}, ${y}.\n`;
                  break;
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
          case "$size":
          case "$maxsize":
            msgExtra = "$displaysize";
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
          case "$ignorestonepattern":
          case "$nopattern":
          case "$nostonepattern":
            msgExtra = "$ignorepattern";
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
          case "$timing":
            msgExtra = "$pattern";
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

export function firstOfSeries(level) {
  return [series1Start, series2Start, series3Start, series4Start, series5Start,
    seriesSmallStart, seriesEasyStart, seriesExtremeStart, seriesMusicStart, extraSeries1Start, 
    extraSeriesEasyStart, extraSeriesMusicStart].includes(level)
}

export function fixLevel(backData, gameData, gameInfo) {
  const empty = [];
  const gravityChangerPositions = [];
  let result = "";
  let deleteCells = [];
  let errorGameRotatorInNonSquareLevel = false;
  let errorMoreThanOneBlueBall = false;
  let errorMoreThanOneSmallBlueBall = false;
  let foundBlue = false;
  let foundGravityChanger = false;
  let foundLava = false;
  let foundSmallblue = false;
  let foundSmallGreen = false;
  let foundWater = false;
  let nPurpleSelfDestructingTeleports = [];
  let nSelfDestructingTeleports = [];
  let nSmallGreenBalls = 0;
  let nTeleports = [];
  let used = 0;
  const xMax = gameData[0].length - 1;
  const yMax = gameData.length - 1;
  let x = -1;
  let y = -1;

  for (let i = 0; i < 32; i++) {
    nPurpleSelfDestructingTeleports.push(0);
    nSelfDestructingTeleports.push(0);
    nTeleports.push(0);
  }

  for (let i = gameData.length - 1; i >= 0; i--) {
    for (let j = 0; j <= xMax; j++) {
      const gd = gameData[i][j];
      const bd = backData[i][j];
      switch (gd) {
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
        case 22:
          foundLava = true;
          break;
        case 89:
        case 183:
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
        case 184:
        case 185:
          foundGravityChanger = true;
          gravityChangerPositions.push({ x: j, y: i });
          break;
        default:
          break;
      }
      switch (bd) {
        case 20:
        case 23:
        case 113:
        case 114:
          foundWater = true;
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
  if (foundGravityChanger && (foundWater || foundLava)) {
    result += "There was a gravity changer in a level with water and/or lava.\n";
    for (let i = 0; i < gravityChangerPositions.length; i++) {
      const position = gravityChangerPositions[i];
      gameData[position.y][position.x] = 0;
    }
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

  for (let i = 0; i < gameInfo.teleports.length; i++) {
    const teleport = gameInfo.teleports[i];
    if (teleport.color === "white" && !teleport.selfDestructing) {
      nTeleports[teleport.group - 1]++;
    }
    if (teleport.color === "white" && teleport.selfDestructing) {
      nSelfDestructingTeleports[teleport.group - 1]++;
    }
    if (teleport.color === getPurpleTeleportColor() && teleport.selfDestructing) {
      nPurpleSelfDestructingTeleports[teleport.group - 1]++;
    }
  }
  for (let i = 0; i < nTeleports.length; i++) {
    if ((nTeleports[i] !== 0) && (nTeleports[i] !== 2)) {
      for (let j = 0; j < gameInfo.teleports.length; j++) {
        const teleport = gameInfo.teleports[j];
        if ((teleport.group === (i + 1)) && (teleport.color === "white") && !teleport.selfDestructing) {
          deleteCells.push({ x: teleport.x, y: teleport.y });
        }
      }
      result += `There was an invalid number of teleports in group ${i + 1}.\n`;
    }
  }
  for (let i = 0; i < nSelfDestructingTeleports.length; i++) {
    if ((nSelfDestructingTeleports[i] !== 0) && (nSelfDestructingTeleports[i] !== 2)) {
      for (let j = 0; j < gameInfo.teleports.length; j++) {
        const teleport = gameInfo.teleports[j];
        if ((teleport.group === (i + 1)) && (teleport.color === "white") && teleport.selfDestructing) {
          deleteCells.push({ x: teleport.x, y: teleport.y });
        }
      }
      result += `There was an invalid number of self-destructing teleports in group ${i + 1}.\n`;
    }
  }
  for (let i = 0; i < nPurpleSelfDestructingTeleports.length; i++) {
    if ((nPurpleSelfDestructingTeleports[i] !== 0) && (nPurpleSelfDestructingTeleports[i] !== 2)) {
      for (let j = 0; j < gameInfo.teleports.length; j++) {
        const teleport = gameInfo.teleports[j];
        if ((teleport.group === (i + 1)) && (teleport.color === getPurpleTeleportColor()) && teleport.selfDestructing) {
          deleteCells.push({ x: teleport.x, y: teleport.y });
        }
      }
      result += `There was an invalid number of purple self-destructing teleports in group ${i + 1}.\n`;
    }
  }
  for (let i = 0; i < deleteCells.length; i++) {
    x = deleteCells[i].x;
    y = deleteCells[i].y;
    if (backData[y][x] === 170) {
      deleteIfPurpleTeleport(backData, gameInfo, x, y);
    } else {
      removeObject(gameData, gameInfo, x, y);
    }
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
  for (let i = series5Start; i <= series5End; i++) {
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
  for (let i = hiddenMiniSeries1Start; i <= hiddenMiniSeries1End; i++) {
    levels.push(i);
  }
  for (let i = seriesMusicStart; i <= seriesMusicEnd; i++) {
    levels.push(i);
  }
  for (let i = extraSeries1Start; i <= extraSeries1End; i++) {
    levels.push(i);
  }
  for (let i = extraSeriesEasyStart; i <= extraSeriesEasyEnd; i++) {
    levels.push(i);
  }
  for (let i = extraSeriesMusicStart; i <= extraSeriesMusicEnd; i++) {
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

export function getHiddenMiniStart() {
  return hiddenMiniSeries1Start;
}

export function getSecretStart() {
  return seriesSecretStart;
}

export async function getLevel(n, gateTravelling = false) {
  let result = [];

  if ((n >= series1Start && n <= series1End) ||
    (n >= series2Start && n <= series2End) ||
    (n >= series3Start && n <= series3End) ||
    (n >= series4Start && n <= series4End) ||
    (n >= series5Start && n <= series5End) ||
    (n >= seriesSmallStart && n <= seriesSmallEnd) ||
    (n >= seriesEasyStart && n <= seriesEasyEnd) ||
    (n >= seriesExtremeStart && n <= seriesExtremeEnd) ||
    (n >= seriesMusicStart && n <= seriesMusicEnd) ||
    (n >= seriesSecretStart && n <= seriesSecretEnd) ||
    (n >= hiddenMiniSeries1Start && n <= hiddenMiniSeries1End) ||
    (n >= seriesChoniaPollaStart && n <= seriesChoniaPollaEnd) ||
    ((globalVars.fred || globalVars.userP) && (
      (n >= extraSeries1Start && n <= extraSeries1End) ||
      (n >= extraSeriesEasyStart && n <= extraSeriesEasyEnd) ||
      (n >= extraSeriesMusicStart && n <= extraSeriesMusicEnd)
    )) ||
    (n >= 9996) && n <= 9999) {
    result = await loadFromFile(n, gateTravelling);
  } else {
    result = await loadFromFile(1000, false);
  }
  return result;
}

export function getRandomLevel(currentLevel) {
  let levels = [];
  let result = currentLevel;

  levels.push(series1Start);
  levels.push(series2Start);
  levels.push(series3Start);
  levels.push(series4Start);
  levels.push(series5Start);
  levels.push(seriesSmallStart);
  levels.push(seriesEasyStart);
  levels.push(seriesExtremeStart);
  levels.push(seriesMusicStart);

  for (let i = 0; i < solvedLevels.length; i++) {
    const level = solvedLevels[i];
    if (!levels.includes(level)) {
      levels.push(level);
    }
    if (!levels.includes(level + 1)) {
      levels.push(level + 1);
    }
  }

  while (result === currentLevel) {
    result = levels[randomInt(0, levels.length - 1)];
  }
  return result;
}

export function isChroniaPolla(n) {
  return ((n >= seriesChoniaPollaStart) && (n <= seriesChoniaPollaEnd));
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

export function loadLevelSettings(backData, gameData, gameInfo, gameVars, levelSettings, initColors = true) {
  let color = "";
  let element = 0;
  let gameTicks = 0;
  let group = -1;
  let instrument = "kalimba";
  let h = -1;
  let idx = -1;
  let mode = "";
  let p1 = -1;
  let sound = "";
  let val_int = 0;
  let validXY = false;
  let volume = 90;
  let w = -1;
  let x = -1;
  let y = -1;

  if (initColors) {
    gameVars.bgcolor = null;
    gameVars.bgcolor = [];
    gameVars.fgcolor = null;
    gameVars.fgcolor = [];
  }
  for (let i = 0; i < levelSettings.length; i++) {
    const setting = levelSettings[i];
    p1 = setting.indexOf(":");
    if (p1 >= 0) {
      const name = setting.slice(0, p1).toLowerCase().trim();
      const value = setting.slice(p1 + 1).trim();
      const values = setting.slice(p1 + 1).split(",").map(value => value.trim());
      const valuesLowerCase = values.map(value => value.toLowerCase());
      if (values.length >= 2) {
        x = tryParseInt(values[0], -1);
        y = tryParseInt(values[1], -1);
        validXY = ((x >= 0) && (y >= 0) && (x < gameData[0].length) && (y < gameData.length));
      }
      switch (name) {
        case "$addnotes":
          if (values.length >= 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
              if (idx >= 0) {
                gameInfo.musicBoxes[idx].noteIndex = 0;
                for (let note = 2; note < values.length; note++) {
                  gameInfo.musicBoxes[idx].notes.push(values[note]);
                }
              }
            }
          }
          break;
        case "$background":
          if (values.length === 5) {
            w = tryParseInt(values[2], -1);
            h = tryParseInt(values[3], -1);
            element = tryParseInt(values[4], -1);
            if ((x >= 0) && (y >= 0) && ((x + w - 1) < backData[0].length) && ((y + h - 1) < backData.length) &&
              ([20, 23, 25, 80, 90, 137].includes(element))) {
              for (let posY = y; posY < (y + h); posY++) {
                for (let posX = x; posX < (x + w); posX++) {
                  backData[posY][posX] = element;
                }
              }
            }
          }
          break;
        case "$bgcolor":
        case "$fgcolor":
          if (values.length === 5) {
            w = tryParseInt(values[2], -1);
            h = tryParseInt(values[3], -1);
            color = values[4];
            if ((x >= 0) && (y >= 0) && (w > 0) && (h > 0) && (color !== "")) {
              if (name === "$bgcolor") {
                gameVars.bgcolor.push({ x, y, w, h, color });
              } else {
                gameVars.fgcolor.push({ x, y, w, h, color });
              }
            }
          }
          break;
        case "$conveyorbeltmode":
          if (values.length === 3) {
            if (validXY && (conveyorBeltModes().includes(valuesLowerCase[2]))) {
              changeConveyorBeltMode(gameInfo, x, y, valuesLowerCase[2]);
            }
          }
          break;
        case "$direction":
          if (values.length === 3) {
            if (["left", "right", "up", "down", "upleft", "upright", "downleft", "downright", "none"].includes(valuesLowerCase[2])) {
              changeDirection(gameData, gameInfo, x, y, valuesLowerCase[2]);
            }
          }
          break;
        case "$displaysize":
          w = tryParseInt(values[0], -1);
          h = tryParseInt(values[1], -1);
          if ((w >= 10) && (h >= 10)) {
            gameVars.displaySize.columns = w;
            gameVars.displaySize.rows = h;
          }
          break;
        case "$extra":
          val_int = tryParseInt(values[0], -1);
          if ((val_int >= 0) && (val_int <= 1)) {
            gameVars.extra = val_int;
          }
          break;
        case "$gameticks":
          if (values.length === 2) {
            gameTicks = tryParseInt(values[1], -1);
            if ((gameTicks >= 1) || ((gameTicks >= 0) && ["mover"].includes(valuesLowerCase[0]))) {
              switch (valuesLowerCase[0]) {
                case "conveyorbelt":
                  gameVars.conveyorBeltCountTo = gameTicks;
                  break;
                case "disappearingstone":
                  gameVars.disappearingStonesCountTo = gameTicks;
                  break;
                case "elevator":
                  gameVars.elevatorCountTo = gameTicks;
                  break;
                case "fish":
                  gameVars.fishCountTo = gameTicks;
                  break;
                case "ice":
                  gameVars.iceCountTo = gameTicks;
                  break;
                case "mover":
                  gameVars.moverCountTo = gameTicks;
                  break;
                case "phaseability":
                  gameVars.phaseTicks = gameTicks;
                  break;
                case "pinkball":
                  gameVars.pinkCountTo = gameTicks;
                  break;
                case "yellowslowdowner":
                  gameVars.yellowSlowdownerDurationTicks = gameTicks;
                  break;
                default:
                  break;
              }
            }
          }
          break;
        case "$gameticksxy":
          if (values.length === 3) {
            gameTicks = tryParseInt(values[2], -1);
            if (validXY && (gameTicks >= 1)) {
              idx = findElementByCoordinates(x, y, gameInfo.delays);
              if (idx >= 0) {
                gameInfo.delays[idx].gameTicks = gameTicks;
              }
            }
          }
          break;
        case "$group":
          if (values.length === 3) {
            group = tryParseInt(values[2], -1);
            if (validXY && (group >= 1) && (group <= 32)) {
              changeGroup(gameInfo, x, y, group);
            }
          }
          break;
        case "$has":
          switch (valuesLowerCase[0]) {
            case "nothing":
              gameInfo.hasCoilSpring = false;
              gameInfo.hasDivingGlasses = false;
              gameInfo.hasFreezeGun = false;
              gameInfo.hasKey = false;
              gameInfo.hasLadder = false;
              gameInfo.hasLightBlueBall = false;
              gameInfo.hasOrangeBall = false;
              gameInfo.hasPickaxe = false;
              gameInfo.hasPinkBall = false;
              gameInfo.hasPropeller = false;
              gameInfo.hasPurpleBall = false;
              gameInfo.hasRedBall = false;
              gameInfo.hasSelfDestructingTeleportsCreator = false;
              gameInfo.hasShrinker = false;
              gameInfo.hasTelekineticPower = false;
              gameInfo.hasTeleportsCreator = false;
              gameInfo.hasWeakStone = false;
              gameInfo.hasWhiteBall = false;
              gameInfo.hasYellowBall = false;
              break;
            case "coilspring":
              gameInfo.hasCoilSpring = true;
              break;
            case "divingglasses":
              gameInfo.hasDivingGlasses = true;
              break;
            case "freezegun":
              gameInfo.hasFreezeGun = true;
              break;
            case "key":
              gameInfo.hasKey = true;
              break;
            case "ladder":
              gameInfo.hasLadder = true;
              break;
            case "lightblueball":
              gameInfo.hasLightBlueBall = true;
              break;
            case "orangeball":
              gameInfo.hasOrangeBall = true;
              break;
            case "pickaxe":
              gameInfo.hasPickaxe = true;
              break;
            case "pinkball":
              gameInfo.hasPinkBall = true;
              break;
            case "propeller":
              gameInfo.hasPropeller = true;
              break;
            case "purpleball":
              gameInfo.hasPurpleBall = true;
              break;
            case "redball":
              gameInfo.hasRedBall = true;
              break;
            case "selfdestructingteleportscreator":
              gameInfo.hasSelfDestructingTeleportsCreator = true;
              break;
            case "shrinker":
              gameInfo.hasShrinker = true;
              break;
            case "telekineticpower":
              gameInfo.hasTelekineticPower = true;
              break;
            case "teleportscreator":
              gameInfo.hasTeleportsCreator = true;
              break;
            case "weakstone":
              gameInfo.hasWeakStone = true;
              break;
            case "whiteball":
              gameInfo.hasWhiteBall = true;
              break;
            case "yellowball":
              gameInfo.hasYellowBall = true;
              break;
            default:
              break;
          }
          break;
        case "$hint":
          gameVars.hint = value;
          break;
        case "$ignorepattern":
          if (values.length === 4) {
            w = tryParseInt(values[2], -1);
            h = tryParseInt(values[3], -1);
            if ((x >= 0) && (y >= 0) && (w > 0) && (h > 0)) {
              gameVars.ignorePattern.push({ x, y, w, h })
            }
          }
          break;
        case "$instrument":
          if (values.length >= 4) {
            instrument = valuesLowerCase[2];
            volume = tryParseInt(values[3], -1);
            if (validXY && (volume >= 0) && (volume <= 100)) {
              idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
              if (idx >= 0) {
                gameInfo.musicBoxes[idx].instrument = instrument;
                gameInfo.musicBoxes[idx].volume = volume;
              }
            }
          }
          break;
        case "$inverted":
          if (values.length === 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.pistons);
              if (idx >= 0) {
                switch (valuesLowerCase[2]) {
                  case "no":
                    gameInfo.pistons[idx].inverted = false;
                    break;
                  case "yes":
                    gameInfo.pistons[idx].inverted = true;
                    break;
                  default:
                    break;
                }
              }
            }
          }
          break;
        case "$musicbox":
          if (values.length === 4) {
            mode = valuesLowerCase[2];
            gameTicks = tryParseInt(values[3], -1);
            if (validXY && musicBoxModes().includes(mode) && (gameTicks >= 1) && (gameTicks <= 100)) {
              idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
              if (idx >= 0) {
                gameInfo.musicBoxes[idx].mode = mode;
                gameInfo.musicBoxes[idx].delay = gameTicks;
              }
            }
          }
          break;
        case "$noteoverride":
          if (values.length === 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
              if (idx >= 0) {
                gameInfo.musicBoxes[idx].noteOverride = values[2];
              }
            }
          }
          break;
        case "$notes":
          if (values.length >= 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
              if (idx >= 0) {
                gameInfo.musicBoxes[idx].notes = [];
                gameInfo.musicBoxes[idx].noteIndex = 0;
                for (let note = 2; note < values.length; note++) {
                  gameInfo.musicBoxes[idx].notes.push(values[note]);
                }
              }
            }
          }
          break;
        case "$part":
          if (values.length === 3) {
            if (["top", "middle", "bottom"].includes(valuesLowerCase[2])) {
              changeMusicBoxProperty(gameInfo, x, y, "part", valuesLowerCase[2]);
            }
          }
          break;
        case "$pattern":
          if (values.length >= 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.disappearingStones);
              if (idx >= 0) {
                gameInfo.disappearingStones[idx].pattern = [];
                gameInfo.disappearingStones[idx].patternIndex = 0;
                for (let value = 2; value < values.length; value++) {
                  gameInfo.disappearingStones[idx].pattern.push(tryParseInt(values[value], 1));
                }
              }
            }
          }
          break;
        case "$pistonmode":
          if (values.length === 3) {
            if (validXY && (pistonModes().includes(valuesLowerCase[2]))) {
              idx = findElementByCoordinates(x, y, gameInfo.pistons);
              if (idx >= 0) {
                gameInfo.pistons[idx].mode = valuesLowerCase[2];
              }
            }
          }
          break;
        case "$sound":
          if (values.length === 2) {
            element = tryParseInt(values[0], -1);
            sound = valuesLowerCase[1];
            if (["default", "never", "player"].includes(sound)) {
              switch (element) {
                case 22:
                  gameVars.soundLava = sound;
                  break;
                default:
                  break;
              }
            }
          }
          break;
        case "$startlevelmessage":
          gameVars.startlevelmessage = value;
          break;
        case "$stepspermeasure":
          val_int = tryParseInt(values[2], -1);
          if (val_int >= 2) {
            changeMusicBoxProperty(gameInfo, x, y, "stepspermeasure", val_int);
          }
          break;
        case "$sticky":
          if (values.length === 3) {
            if (validXY) {
              idx = findElementByCoordinates(x, y, gameInfo.pistons);
              if (idx >= 0) {
                switch (valuesLowerCase[2]) {
                  case "no":
                    gameInfo.pistons[idx].sticky = false;
                    break;
                  case "yes":
                    gameInfo.pistons[idx].sticky = true;
                    break;
                  default:
                    break;
                }
              }
            }
          }
          break;
        case "$stonepattern":
          val_int = tryParseInt(values[0], -1);
          if ((val_int >= 0) && (val_int <= maxStonePatterns)) {
            gameVars.stonePattern = val_int;
          }
          break;
        default:
          break;
      }
    }
  }
}

export function numberOfLevels() {
  let n = 0;
  n += (series1End - series1Start) + 1;
  n += (series2End - series2Start) + 1;
  n += (series3End - series3Start) + 1;
  n += (series4End - series4Start) + 1;
  n += (series5End - series5Start) + 1;
  n += (seriesSmallEnd - seriesSmallStart) + 1;
  n += (seriesEasyEnd - seriesEasyStart) + 1;
  n += (seriesExtremeEnd - seriesExtremeStart) + 1;
  n += (seriesMusicEnd - seriesMusicStart) + 1;
  n += (seriesSecretEnd - seriesSecretStart) + 1;
  n += (hiddenMiniSeries1End - hiddenMiniSeries1Start) + 1;
  n += (extraSeries1End - extraSeries1Start) + 1;
  n += (extraSeriesEasyEnd - extraSeriesEasyStart) + 1;
  return n;
}

function settingNr(index) {
  return `Setting ${index + 1}: `;
}




