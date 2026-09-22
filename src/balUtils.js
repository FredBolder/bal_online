import { checkColor } from "./changers.js";
import { numberToCode, secretSeriesCodePart } from "./codes.js";
import { detectorDisplayModes } from "./detectors.js";
import { checkDetonator } from "./detonator.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { getHiddenMiniStart } from "./levels.js";
import { moveLightBlueBar } from "./lightBlueBar.js";
import { canOpen } from "./lockedDoors.js";
import { moverIsMovingBlueBall } from "./movers.js";
import { updateOrangeBall } from "./orangeBalls.js";
import { checkPistonsTriggers } from "./pistons.js";
import { movePurpleBar } from "./purpleBar.js";
import { removeStyle } from "./questionStones.js";
import { seaAnemonesPalettes, seaAnemonesShapes } from "./seaAnemone.js";
import { hasSpikeBallWeightAbove, hasSpikeBallWeightBelow } from "./spikeBalls.js";
import { findTheOtherTeleport, isWhiteTeleport } from "./teleports.js";
import { getTimeBombsTime, updateTimeBomb } from "./timeBombs.js";
import { hasBottomGlideLeftToRight, hasBottomGlideRightToLeft, hasTopGlideLeftToRight, hasTopGlideRightToLeft } from "./triangleStones.js";
import { tropicalFishPalettes, tropicalFishShapes } from "./tropicalFish.js";
import { updateYellowBall } from "./yellowBalls.js";
import { moveYellowBar } from "./yellowBars.js";
import { checkYellowPausers } from "./yellowPausers.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStoppers } from "./yellowStoppers.js";

export const canFall = [2, 4, 8, 40, 93, 94, 245, 256];
const phaseThroughObjects = [1, 10, 11, 12, 15, 16, 17, 18, 21, 30, 35, 87, 88, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 169, 198];

function canBeTakenOrIsEmpty(gameInfo, object) {
  let result = [0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168, 179, 186, 187, 188, 189, 190, 191, 193, 194, 199, 205, 207, 226, 227, 228, 229, 230, 231, 232, 233, 250].includes(object);
  switch (object) {
    case 192:
      result = !gameInfo.hasWhiteBall;
      break;
    case 195:
      result = !gameInfo.hasLightBlueBall;
      break;
    case 196:
      result = !gameInfo.hasYellowBall;
      break;
    case 197:
      result = !gameInfo.hasPurpleBall;
      break;
    case 201:
      result = !gameInfo.hasRedBall;
      break;
    case 202:
      result = !gameInfo.hasOrangeBall;
      break;
    case 204:
      result = !gameInfo.hasPinkBall;
      break;
    case 254:
      result = !gameInfo.hasBrownBall;
      break;
    default:
      break;
  }
  return result;
}

function canMoveAlone(gameData, gameInfo, x, y, parent = "") {
  // Object that can be moved by the blue ball, but not together with another object
  let idx = -1;
  const el = gameData[y][x];

  switch (el) {
    case 9:
    case 27:
    case 28:
    case 40:
    case 82:
    case 84:
    case 85:
    case 86:
    case 98:
    case 115:
    case 117:
    case 138:
    case 139:
    case 155:
    case 171:
    case 172:
    case 173:
    case 200:
    case 242:
    case 243:
    case 244:
    case 246:
    case 247:
    case 251:
    case 256:
      return true;
    case 1:
    case 35:
      return gameInfo.playerCanMoveStones;
    case 109:
    case 110:
    case 111:
    case 112:
      idx = findElementByCoordinates(x, y, gameInfo.forces);
      if (idx >= 0) {
        if (!gameInfo.forces[idx].movable) {
          return false;
        }
        return (el !== 109 || parent !== "pushObject") && (el !== 110 || parent !== "jump") &&
          (el !== 111 || parent !== "moveLeft") && (el !== 112 || parent !== "moveRight");
      }
      return false;
    case 157:
      idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
      if (idx >= 0) {
        return (gameInfo.musicBoxes[idx].mode === "keyboard");
      }
      return false;
    case 159:
    case 161:
    case 163:
    case 165:
      idx = findElementByCoordinates(x, y, gameInfo.pistons);
      if (idx >= 0) {
        const piston = gameInfo.pistons[idx];
        return (["blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball",
          "pinkball"].includes(piston.mode) && !piston.activated);
      }
      return false;
    case 178:
      idx = findElementByCoordinates(x, y, gameInfo.movers);
      if (idx >= 0) {
        return (
          (parent !== "moveLeft") || !gameInfo.movers[idx].activeSides.includes("right") &&
          (parent !== "moveRight") || !gameInfo.movers[idx].activeSides.includes("left") &&
          (parent !== "jump") || !gameInfo.movers[idx].activeSides.includes("bottom") &&
          (parent !== "pushObject") || !gameInfo.movers[idx].activeSides.includes("top")
        );
      }
      return false;
    case 209:
      idx = findElementByCoordinates(x, y, gameInfo.pushers);
      if (idx >= 0) {
        return gameInfo.pushers[idx].movable;
      }
      return false;
    case 255:
      idx = findElementByCoordinates(x, y, gameInfo.detectors);
      if (idx >= 0) {
        return gameInfo.detectors[idx].movable;
      }
      return false;
    default:
      return false;
  }
}

export function changeChangerColors(gameInfo, x, y, colors) {
  let idx = -1;
  const colorList = colors.split(",");

  if (colorList.length !== 2) return idx;

  const color1 = colorList[0].trim().toLowerCase();
  const color2 = colorList[1].trim().toLowerCase();

  if (!checkColor(color1) || !checkColor(color2)) return idx;

  idx = findElementByCoordinates(x, y, gameInfo.changers);
  if (idx >= 0) {
    gameInfo.changers[idx].color1 = color1;
    gameInfo.changers[idx].color2 = color2;
  }
  return idx;
}

export function changeCommand(gameInfo, x, y, command) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.detectors);
  if (idx >= 0) {
    gameInfo.detectors[idx].target = "command";
    gameInfo.detectors[idx].value = command;
  }
  return idx;
}

export function changeDisplay(gameInfo, x, y, decrease) {
  const step = decrease ? -1 : 1;
  const values = detectorDisplayModes();
  let idx = -1;
  let n = 0;

  idx = findElementByCoordinates(x, y, gameInfo.detectors);
  if (idx >= 0) {
    n = values.indexOf(gameInfo.detectors[idx].display) + step;
    if (n < 0 || n >= values.length) {
      n = 0;
    }
    gameInfo.detectors[idx].display = values[n];
  }
  return idx;
}

export function changeIntelligence(gameData, gameInfo, x, y, intelligence) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.redBalls);
  if (idx >= 0) {
    gameInfo.redBalls[idx].smart = intelligence;
    gameData[y][x] = [8, 93, 94][intelligence];
  }
  return idx;
}

export function changeMessage(gameInfo, x, y, message) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.detectors);
  if (idx >= 0) {
    gameInfo.detectors[idx].display = "stone";
    gameInfo.detectors[idx].target = "setting";
    gameInfo.detectors[idx].value = "$message: " + message;
  }
  return idx;
}

export function changePalette(gameInfo, x, y, decrease) {
  const step = decrease ? -1 : 1;
  let idx = -1;
  let palette = -1;

  idx = findElementByCoordinates(x, y, gameInfo.seaAnemones);
  if (idx >= 0) {
    palette = gameInfo.seaAnemones[idx].palette + step;
    if (palette > seaAnemonesPalettes) {
      palette = 1;
    }
    if (palette < 1) {
      palette = seaAnemonesPalettes;
    }
    gameInfo.seaAnemones[idx].palette = palette;
    return idx;
  }

  idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
  if (idx >= 0) {
    palette = gameInfo.tropicalFish[idx].palette + step;
    if (palette > tropicalFishPalettes) {
      palette = 1;
    }
    if (palette < 1) {
      palette = tropicalFishPalettes;
    }
    gameInfo.tropicalFish[idx].palette = palette;
    return idx;
  }

  return idx;
}

export function changeShape(gameInfo, x, y, decrease) {
  const step = decrease ? -1 : 1;
  let idx = -1;
  let shape = -1;

  idx = findElementByCoordinates(x, y, gameInfo.seaAnemones);
  if (idx >= 0) {
    shape = gameInfo.seaAnemones[idx].shape + step;
    if (shape > seaAnemonesShapes) {
      shape = 1;
    }
    if (shape < 1) {
      shape = seaAnemonesShapes;
    }
    gameInfo.seaAnemones[idx].shape = shape;
    return idx;
  }

  idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
  if (idx >= 0) {
    shape = gameInfo.tropicalFish[idx].shape + step;
    if (shape > tropicalFishShapes) {
      shape = 1;
    }
    if (shape < 1) {
      shape = tropicalFishShapes;
    }
    gameInfo.tropicalFish[idx].shape = shape;
    return idx;
  }

  return idx;
}

export function changeSides(gameInfo, x, y, sides) {
  let idx = -1;

  if ((sides !== null) && (sides.length !== 0)) {
    idx = findElementByCoordinates(x, y, gameInfo.movers);
    if (idx >= 0) {
      gameInfo.movers[idx].activeSides.length = 0;
      for (let i = 0; i < sides.length; i++) {
        gameInfo.movers[idx].activeSides.push(sides[i]);
      }
    }
    if (idx < 0) {
      idx = findElementByCoordinates(x, y, gameInfo.detectors);
      if (idx >= 0) {
        gameInfo.detectors[idx].activeSides.length = 0;
        for (let i = 0; i < sides.length; i++) {
          gameInfo.detectors[idx].activeSides.push(sides[i]);
        }
      }
    }
  }
  return idx;
}

export function changeStyle(gameInfo, x, y, style) {
  let idx = -1;
  let question = "";

  idx = findElementByCoordinates(x, y, gameInfo.questionStones);
  if (idx >= 0) {
    question = gameInfo.questionStones[idx].question;
    question = removeStyle(question);
    question = "{" + style + "}" + question;
    gameInfo.questionStones[idx].question = question;
  }
  return idx;
}

export function changeTicks(gameInfo, x, y, ticks) {
  let idx = -1;

  if (ticks < 0) {
    return idx;
  }

  idx = findElementByCoordinates(x, y, gameInfo.delays);
  if (idx >= 0) {
    gameInfo.delays[idx].gameTicks = ticks;
  }
  return idx;
}

export function charToNumber(c) {
  // More possible characters
  // https://www.w3schools.com/charsets/ref_utf_cyrillic.asp
  switch (c) {
    case "0":
    case " ":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "D":
      return 6;
    case "L":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case ">":
      return 10;
    case "<":
      return 11;
    case "F":
      return 12;
    case "-":
      return 13;
    case "G":
      return 15;
    case "H":
      return 16;
    case "I":
      return 17;
    case "J":
      return 18;
    case "W":
      return 20;
    case "P":
      return 21;
    case "V":
      return 22;
    case "w":
      return 23;
    case "@":
      return 24;
    case "=":
      return 25;
    case "d":
      return 26;
    case "f":
      return 27;
    case "p":
      return 28;
    case "k":
      return 29;
    case "l":
      return 30;
    case "T":
      return 31;
    case "Y":
      return 34;
    case "y":
      return 35;
    case "B":
      return 36;
    case "b":
      return 37;
    case "*":
      return 38;
    case "E":
      return 39;
    case "O":
      return 40;
    case "_":
      return 80;
    case "X":
      return 81;
    case "o":
      return 82;
    case ".":
      return 83;
    case "C":
      return 84;
    case "c":
      return 85;
    case "+":
      return 86;
    case "^":
      return 87;
    case "v":
      return 88;
    case "t":
      return 89;
    case "h":
      return 90;
    case "!":
      return 91;
    case "τ":
      return 92;
    case "s":
      return 93;
    case "S":
      return 94;
    case "α":
      return 95;
    case "β":
      return 96;
    case "Δ":
      return 97;
    case "δ":
      return 98;
    case "π":
      return 99;
    case "á":
      return 100;
    case "à":
      return 101;
    case "ä":
      return 102;
    case "Á":
      return 103;
    case "À":
      return 104;
    case "λ":
      return 105;
    case "U":
      return 106;
    case "R":
      return 107;
    case "Λ":
      return 108;
    case "Ω":
      return 109;
    case "ω":
      return 110;
    case "Φ":
      return 111;
    case "φ":
      return 112;
    case "ς":
      return 113;
    case "σ":
      return 114;
    case "Ψ":
      return 115;
    case "ψ":
      return 116;
    case "Ξ":
      return 117;
    case "j":
      return 118;
    case "μ":
      return 119;
    case "u":
      return 120;
    case "ó":
      return 121;
    case "ò":
      return 122;
    case "ö":
      return 123;
    case "Ó":
      return 124;
    case "Ò":
      return 125;
    case "é":
      return 126;
    case "è":
      return 127;
    case "e": // without two dots
      return 128;
    case "É":
      return 129;
    case "È":
      return 130;
    case "Σ":
      return 131;
    case "g":
      return 132;
    case "γ":
      return 133;
    case "Γ":
      return 134;
    case "ξ":
      return 135;
    case "ρ":
      return 136;
    case "ι":
      return 137;
    case "Â":
      return 138;
    case "â":
      return 139;
    case "°":
      return 140;
    case "i":
      return 141;
    case "í":
      return 142;
    case "ì":
      return 143;
    case "î":
      return 144;
    case "ü":
      return 145;
    case "ú":
      return 146;
    case "ù":
      return 147;
    case "û":
      return 148;
    case "ά":
      return 149;
    case "έ":
      return 150;
    case "ί":
      return 151;
    case "ό":
      return 152;
    case "ή":
      return 153;
    case "ώ":
      return 154;
    case "&":
      return 155;
    case "~":
      return 156;
    case "M":
      return 157;
    case "m":
      return 158;
    case "Ù":
      return 159;
    case "Û":
      return 160;
    case "Ì":
      return 161;
    case "Î":
      return 162;
    case "Ö":
      return 163;
    case "Ô":
      return 164;
    case "Ë":
      return 165;
    case "Ê":
      return 166;
    case ")":
      return 167;
    case "%":
      return 168;
    case "ß":
      return 169;
    case "Π":
      return 170;
    case "{":
      return 171;
    case "Ø":
      return 172;
    case "}":
      return 173;
    case ":":
      return 174;
    case ";":
      return 175;
    case ",":
      return 176;
    case "'":
      return 177;
    case "η":
      return 178;
    case "Ć":
      return 179;
    case "Ĉ":
      return 180;
    case "Ċ":
      return 181;
    case "Č":
      return 182;
    case "Ä":
      return 183;
    case "Є":
      return 184;
    case "З":
      return 185;
    case "ш":
      return 186;
    case "щ":
      return 187;
    case "Ц":
      return 188;
    case "Ч":
      return 189;
    case "И":
      return 190;
    case "Й":
      return 191;
    case "б":
      return 192;
    case "Я":
      return 193;
    case "я":
      return 194;
    case "Б":
      return 195;
    case "Л":
      return 196;
    case "Ъ":
      return 197;
    case "Џ":
      return 198;
    case "Љ":
      return 199;
    case "Ѩ":
      return 200;
    case "Ӭ":
      return 201;
    case "ӭ":
      return 202;
    case "Ѥ":
      return 203;
    case "ѥ":
      return 204;
    case "Ж":
      return 205;
    case "ж":
      return 206;
    case "Ѫ":
      return 207;
    case "Ѳ":
      return 208;
    case "њ":
      return 209;
    case "Ѭ":
      return 210;
    case "ѭ":
      return 211;
    case "Ѯ":
      return 212;
    case "ѯ":
      return 213;
    case "Ѵ":
      return 214;
    case "ѵ":
      return 215;
    case "Ѷ":
      return 216;
    case "ѷ":
      return 217;
    case "Ѹ":
      return 218;
    case "ѹ":
      return 219;
    case "Ѻ":
      return 220;
    case "ѻ":
      return 221;
    case "Ѽ":
      return 222;
    case "ѽ":
      return 223;
    case "Ѿ":
      return 224;
    case "ѿ":
      return 225;
    case "Ґ":
      return 226;
    case "ґ":
      return 227;
    case "Ҡ":
      return 228;
    case "ҡ":
      return 229;
    case "Ң":
      return 230;
    case "ң":
      return 231;
    case "Ҥ":
      return 232;
    case "ҥ":
      return 233;
    case "Ҧ":
      return 234;
    case "ҧ":
      return 235;
    case "Ҩ":
      return 236;
    case "ҩ":
      return 237;
    case "Ұ":
      return 238;
    case "ұ":
      return 239;
    case "Ҵ":
      return 240;
    case "Ҹ":
      return 241;
    case "ҹ":
      return 242;
    case "Ҽ":
      return 243;
    case "Ӄ":
      return 244;
    case "Ӆ":
      return 245;
    case "Ӈ":
      return 246;
    case "ӈ":
      return 247;
    case "Ӊ":
      return 248;
    case "Ӌ":
      return 249;
    case "Ӎ":
      return 250;
    case "ӎ":
      return 251;
    case "Ӑ":
      return 252;
    case "Ь":
      return 253;
    case "ъ":
      return 254;
    case "ђ":
      return 255;
    case "Ѓ":
      return 256;
    case "|":
      return 1000;
    default:
      return -1;
  }
}

export function checkFalling(backData, gameData, gameInfo, gameVars) {
  let forceDown = false;
  let forceUp = false;
  let idx = -1;
  let skip = false;
  let result = {};
  result.update = false;
  result.sound = "";

  // Depending on the gravity direction, falling has another meaning

  // GRAVITY DOWN (NORMAL)
  if (gameVars.gravity === "down") {
    for (let i = gameData.length - 2; i >= 0; i--) {
      for (let j = 0; j < gameData[i].length; j++) {
        const element1 = getGameDataValue(gameData, j, i);
        const element2 = getGameDataValue(gameData, j, i + 1);
        const element3 = getGameDataValue(gameData, j, i + 2);
        const elementBottomLeft = getGameDataValue(gameData, j - 1, i + 1);
        const elementBottomRight = getGameDataValue(gameData, j + 1, i + 1);

        if (hasWeightAbove(backData, gameData, gameInfo, gameVars, j, j, i + 1, false) && (element2 === 251)) {
          result.update = true;
          if (element3 === 0) {
            moveObject(gameData, gameInfo, j, i + 1, j, i + 2);
          } else if (elementBottomLeft === 0) {
            moveObject(gameData, gameInfo, j, i + 1, j - 1, i + 1);
          } else if (elementBottomRight === 0) {
            moveObject(gameData, gameInfo, j, i + 1, j + 1, i + 1);
          } else {
            // When the food can go nowhere, it will be removed
            idx = findElementByCoordinates(j, i + 1, gameInfo.fishFood);
            if (idx >= 0) {
              const food = gameInfo.fishFood[idx];
              food.foodLeft = 0;
              gameData[food.y][food.x] = 0;
            }
          }
        }

        if (j < gameData[i].length - 1) {
          if (
            // wall |\
            hasTopGlideLeftToRight(element2) && canFall.includes(element1) &&
            gameData[i][j + 1] === 0 && gameData[i + 1][j + 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            moveObject(gameData, gameInfo, j, i, j + 1, i);
            if (element1 === 40) {
              updateOrangeBall(gameInfo.orangeBalls, j + 1, i, j + 1, i, "downright");
            }
          }
        }

        if (j >= 1) {
          if (
            // wall /|
            hasTopGlideRightToLeft(element2) && canFall.includes(element1) &&
            gameData[i][j - 1] === 0 && gameData[i + 1][j - 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            moveObject(gameData, gameInfo, j, i, j - 1, i);
            if (element1 === 40) {
              updateOrangeBall(gameInfo.orangeBalls, j - 1, i, j - 1, i, "downleft");
            }
          }
        }
      }
    }

    for (let i = gameData.length - 2; i >= 0; i--) {
      for (let j = 0; j < gameData[i].length; j++) {
        const element1 = getGameDataValue(gameData, j, i);
        const element2 = getGameDataValue(gameData, j, i + 1);

        if (element2 !== 0) continue;

        forceUp = hasForceUp(gameData, gameInfo, j, i);

        if (([2, 8, 93, 94].includes(element1) && falling(j, i, backData, gameData, gameInfo, gameVars)) ||
          ([4, 40, 245, 256].includes(element1) && !forceUp) ||
          ([27, 243, 248].includes(element1) && !forceUp && (backData[i][j] !== 23 || hasSpikeBallWeightAbove(gameData, gameInfo, j, i)))) {
          skip = ((element1 === 2) && (gameVars.skipFalling > 0));
          if (skip) {
            gameVars.skipFalling--;
          } else {
            result.update = true;
            if (element1 === 40) {
              idx = findElementByCoordinates(j, i, gameInfo.orangeBalls);
              if (idx >= 0) {
                const orangeBall = gameInfo.orangeBalls[idx];
                switch (orangeBall.direction) {
                  case "downright":
                    orangeBall.direction = "right";
                    break;
                  case "downleft":
                    orangeBall.direction = "left";
                    break;
                  default:
                    orangeBall.direction = "down";
                    break;
                }
                gameData[orangeBall.y][orangeBall.x] = 0;
                orangeBall.x = j;
                orangeBall.y = i + 1;
                gameData[orangeBall.y][orangeBall.x] = 40;
              }
            } else {
              moveObject(gameData, gameInfo, j, i, j, i + 1);
            }
            if (!inWater(j, i, backData) && inWater(j, i + 1, backData)) {
              result.sound = "splash1";
            }
          }
        }
      }
    }
  }

  // GRAVITY UP
  if (gameVars.gravity === "up") {
    for (let i = 1; i <= gameData.length - 1; i++) {
      for (let j = 0; j < gameData[i].length; j++) {
        const element1 = getGameDataValue(gameData, j, i);
        const element2 = getGameDataValue(gameData, j, i - 1);

        if (j < gameData[i].length - 1) {
          if (
            // wall |/
            hasBottomGlideLeftToRight(element2) && canFall.includes(element1) &&
            gameData[i][j + 1] === 0 && gameData[i - 1][j + 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            moveObject(gameData, gameInfo, j, i, j + 1, i);
            if (element1 === 40) {
              updateOrangeBall(gameInfo.orangeBalls, j + 1, i, j + 1, i, "upright");
            }
          }
        }

        if (j >= 1) {
          if (
            // wall \|
            hasBottomGlideRightToLeft(element2) && canFall.includes(element1) &&
            gameData[i][j - 1] === 0 && gameData[i - 1][j - 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            moveObject(gameData, gameInfo, j, i, j - 1, i);
            if (element1 === 40) {
              updateOrangeBall(gameInfo.orangeBalls, j - 1, i, j - 1, i, "upleft");
            }
          }
        }
      }
    }

    for (let i = 1; i <= gameData.length - 1; i++) {
      for (let j = 0; j < gameData[i].length; j++) {
        const element1 = getGameDataValue(gameData, j, i);
        const element2 = getGameDataValue(gameData, j, i - 1);

        forceDown = hasForceDown(gameData, gameInfo, j, i);

        if (element2 === 0 &&
          (([2, 8, 93, 94].includes(element1) && falling(j, i, backData, gameData, gameInfo, gameVars)) ||
            ([4, 40, 245, 256].includes(element1) && !forceDown))) {
          skip = ((element1 === 2) && (gameVars.skipFalling > 0));
          if (skip) {
            gameVars.skipFalling--;
          } else {
            result.update = true;
            if (element1 === 40) {
              idx = findElementByCoordinates(j, i, gameInfo.orangeBalls);
              if (idx >= 0) {
                const orangeBall = gameInfo.orangeBalls[idx];
                switch (orangeBall.direction) {
                  case "upright":
                    orangeBall.direction = "right";
                    break;
                  case "upleft":
                    orangeBall.direction = "left";
                    break;
                  default:
                    orangeBall.direction = "up";
                    break;
                }
                gameData[orangeBall.y][orangeBall.x] = 0;
                orangeBall.x = j;
                orangeBall.y = i - 1;
                gameData[orangeBall.y][orangeBall.x] = 40;
              }
            } else {
              moveObject(gameData, gameInfo, j, i, j, i - 1);
            }
            if (!inWater(j, i, backData) && inWater(j, i - 1, backData)) {
              result.sound = "splash1";
            }
          }
        }
      }
    }
  }

  return result;
}

export function displayColor(color) {
  let result = "";

  switch (color.toLowerCase()) {
    case "brown":
      result = "#5C3920";
      break;
    case "lightblue":
      // was #90D5FF"
      result = "#00BFFF";
      break;
    case "orange":
      result = "#ED7014";
      break;
    case "pink":
      result = "#FF69B4";
      break;
    case "purple":
      result = "#800080";
      break;
    case "silver":
      result = "#B0B0B0";
      break;
    default:
      result = color;
      break;
  }
  return result;
}

export function dropObject(gameData, gameInfo, object) {
  let result = { update: false };
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let xTarget = -1;
  let yTarget = -1;

  if (((object === "brownBall") && !gameInfo.hasBrownBall) ||
    ((object === "lightBlueBall") && !gameInfo.hasLightBlueBall) ||
    ((object === "orangeBall") && !gameInfo.hasOrangeBall) ||
    ((object === "pinkBall") && !gameInfo.hasPinkBall) ||
    ((object === "purpleBall") && !gameInfo.hasPurpleBall) ||
    ((object === "redBall") && !gameInfo.hasRedBall) ||
    ((object === "whiteBall") && !gameInfo.hasWhiteBall) ||
    ((object === "yellowBall") && !gameInfo.hasYellowBall)) {
    return result;
  }
  result.update = true;
  if (gameData[y][x + 1] === 0) {
    xTarget = x + 1;
    yTarget = y;
  } else if (gameData[y][x - 1] === 0) {
    xTarget = x - 1;
    yTarget = y;
  } else {
    result.update = false;
  }
  if (result.update) {
    switch (object) {
      case "brownBall":
        gameData[yTarget][xTarget] = 253;
        gameInfo.brownBalls.push({ x: xTarget, y: yTarget, delete: false, counter: 0 });
        gameInfo.hasBrownBall = false;
        break;
      case "lightBlueBall":
        gameData[yTarget][xTarget] = 5;
        gameInfo.hasLightBlueBall = false;
        break;
      case "orangeBall":
        gameData[yTarget][xTarget] = 40;
        gameInfo.orangeBalls.push({ x: xTarget, y: yTarget, direction: "none" });
        gameInfo.hasOrangeBall = false;
        break;
      case "pinkBall":
        gameData[yTarget][xTarget] = 203;
        gameInfo.pinkBalls.push({ x: xTarget, y: yTarget, delete: false, counter: 0 });
        gameInfo.hasPinkBall = false;
        break;
      case "purpleBall":
        gameData[yTarget][xTarget] = 28;
        gameInfo.hasPurpleBall = false;
        break;
      case "redBall":
        gameData[yTarget][xTarget] = 8;
        gameInfo.redBalls.push({ x: xTarget, y: yTarget, smart: 0, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 });
        gameInfo.hasRedBall = false;
        break;
      case "whiteBall":
        gameData[yTarget][xTarget] = 4;
        gameInfo.hasWhiteBall = false;
        break;
      case "yellowBall":
        gameData[yTarget][xTarget] = 9;
        gameInfo.yellowBalls.push({ x: xTarget, y: yTarget, direction: "none" });
        gameInfo.hasYellowBall = false;
        break;
      default:
        break;
    }
  }
  return result;
}

export function findElementByCoordinates(x, y, elements) {
  let result = -1;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].x === x && elements[i].y === y) {
      result = i;
    }
  }
  return result;
}

export function hasWeightAbove(backData, gameData, gameInfo, gameVars, xmin, xmax, y, pushingDown) {
  const gravityDown = (gameVars.gravity === "down");
  let animal = null;
  let animalList = null;
  let idx = -1;
  let result = false;

  if (y > 0) {
    for (let i = xmin; i <= xmax; i++) {
      let weight = false;
      const back = getGameDataValue(backData, i, y);
      const backAbove = getGameDataValue(backData, i, y - 1);
      const elAbove = getGameDataValue(gameData, i, y - 1);
      const forceDown = hasForceDown(gameData, gameInfo, i, y - 1);
      const pushing = (pushingDown && (i === gameInfo.blueBall.x) && ((y - 1) === gameInfo.blueBall.y));
      if ([2, 4, 8, 27, 40, 93, 94, 203, 243, 245, 248, 253, 256].includes(elAbove)) {
        if (pushing || gravityDown || forceDown) {
          weight = true;
        }
      }
      if ((elAbove === 2) && !forceDown && !pushing) {
        if (gameInfo.hasPropeller || [25, 90, 137].includes(back) || [20, 23, 25, 80, 90, 137, 252].includes(backAbove) || isHorizontalRope(i, y - 2, backData)) {
          weight = false;
        }
      }
      if ([27, 243, 248].includes(elAbove) && !forceDown) {
        switch (elAbove) {
          case 27:
            animalList = "redFish";
            break;
          case 243:
            animalList = "tropicalFish";
            break;
          case 248:
            animalList = "jellyfish";
            break;
          default:
            animalList = "redFish";
            break;
        }
        idx = findElementByCoordinates(i, y - 1, gameInfo[animalList]);
        if (idx >= 0) {
          animal = gameInfo[animalList][idx];
          if (!animal.isDead && (backAbove === 23)) {
            weight = false;
          }
        }
      }
      if (weight) {
        result = true;
      }
    }
  }
  return result;
}

export function hasWeightBelow(backData, gameData, gameInfo, gameVars, xmin, xmax, y, pushingUp) {
  const gravityUp = (gameVars.gravity === "up");
  let result = false;

  if (y < gameData.length - 1) {
    for (let i = xmin; i <= xmax; i++) {
      let weight = false;
      const back = getGameDataValue(backData, i, y);
      const backBelow = getGameDataValue(backData, i, y + 1);
      const elBelow = gameData[y + 1][i];
      const forceUp = hasForceUp(gameData, gameInfo, i, y + 1);
      const pushing = (pushingUp && (i === gameInfo.blueBall.x) && ((y + 1) === gameInfo.blueBall.y));
      if ([2, 4, 8, 40, 93, 94, 203, 245, 253, 256].includes(elBelow)) {
        if (pushing || gravityUp || forceUp) {
          weight = true;
        }
      }
      if ((elBelow === 2) && !forceUp && !pushing) {
        if (gameInfo.hasPropeller || [25, 90, 137].includes(back) || [20, 23, 25, 90, 137, 252].includes(backBelow) || isHorizontalRope(i, y + 2, backData)) {
          weight = false;
        }
      }
      if (weight) {
        result = true;
      }
    }
  }
  return result;
}

export function getListByObjectNumber(gameInfo, objectNumber) {
  switch (objectNumber) {
    case 6:
    case 106:
      return gameInfo.elevators;
    case 7:
    case 107:
      return gameInfo.horizontalElevators;
    case 8:
    case 93:
    case 94:
      return gameInfo.redBalls;
    case 9:
      return gameInfo.yellowBalls;
    case 12:
      return gameInfo.damagedStones;
    case 13:
      return gameInfo.trapDoors;
    case 22:
      return gameInfo.lava;
    case 27:
      return gameInfo.redFish;
    case 29:
      return gameInfo.keys;
    case 30:
      return gameInfo.lockedDoors;
    case 31:
    case 92:
    case 170:
      return gameInfo.teleports;
    case 39:
      return gameInfo.elevatorInOuts;
    case 40:
      return gameInfo.orangeBalls;
    case 91:
      return gameInfo.electricity;
    case 97:
    case 208:
      return gameInfo.copiers;
    case 109:
    case 110:
    case 111:
    case 112:
      return gameInfo.forces;
    case 115:
      return gameInfo.yellowBallPushers;
    case 116:
      return gameInfo.yellowBallPushersTriggers;
    case 117:
      return gameInfo.timeBombs;
    case 119:
      return gameInfo.magnets;
    case 121:
    case 124:
      return gameInfo.yellowBars;
    case 131:
      return gameInfo.yellowStoppers;
    case 136:
      return gameInfo.yellowPausers;
    case 157:
      return gameInfo.musicBoxes;
    case 158:
      return gameInfo.pistonsTriggers;
    case 159:
    case 161:
    case 163:
    case 165:
      return gameInfo.pistons;
    case 167:
      return gameInfo.delays;
    case 171:
      return gameInfo.conveyorBelts;
    case 178:
      return gameInfo.movers;
    case 198:
      return gameInfo.disappearingStones;
    case 200:
      return gameInfo.whiteBallSynchronisers;
    case 203:
      return gameInfo.pinkBalls;
    case 206:
      return gameInfo.waterWithIceObjects;
    case 209:
      return gameInfo.pushers;
    case 241:
      return gameInfo.questionStones;
    case 242:
    case 245:
      return gameInfo.answerBalls;
    case 243:
      return gameInfo.tropicalFish;
    case 244:
      return gameInfo.changers;
    case 248:
      return gameInfo.jellyfish;
    case 251:
      return gameInfo.fishFood;
    case 252:
      return gameInfo.seaAnemones;
    case 253:
      return gameInfo.brownBalls;
    case 255:
      return gameInfo.detectors;
    default:
      return null;
  }
}

export function getGameDataValue(gameData, x, y) {
  let result = -1;

  if (gameData.length === 0) {
    return result;
  }
  if (gameData[0].length === 0) {
    return result;
  }
  if ((x >= 0) && (y >= 0) && (x < gameData[0].length) && (y < gameData.length)) {
    result = gameData[y][x];
  }
  return result;
}

export function inWater(x, y, backData) {
  let result = [20, 23, 252].includes(backData[y][x]);
  return result;
}

export function isEmpty(gameData, columnOrRow, start, end, horizontal = true) {
  let n1 = 0;
  let n2 = 0;
  let result = true;

  if (Math.abs(end - start) > 1) {
    if (end > start) {
      n1 = start + 1;
      n2 = end - 1;
    } else {
      n1 = end + 1;
      n2 = start - 1;
    }
    for (let i = n1; i <= n2; i++) {
      if (horizontal) {
        if (![0, 20, 23].includes(gameData[columnOrRow][i])) {
          result = false;
        }
      } else {
        if (![0, 20, 23].includes(gameData[i][columnOrRow])) {
          result = false;
        }
      }
    }
  }
  return result;
}

function isLadder(x, y, backData) {
  let result = false;
  if (y < backData.length) {
    if (x < backData[0].length) {
      result = [25, 90].includes(backData[y][x]);
    }
  }
  return result;
}

export function isHorizontalRope(x, y, backData) {
  return (getGameDataValue(backData, x, y) === 80);
}

function isTravelGate(x, y, travelGate) {
  return ((x === travelGate.x) && (y === travelGate.y));
}

export function falling(x, y, backData, gameData, gameInfo, gameVars, ignoreTriangle = false) {
  // Numbers are like numeric keyboard
  const backObj2 = getGameDataValue(backData, x, y + 1);
  const backObj5 = getGameDataValue(backData, x, y);
  const backObj8 = getGameDataValue(backData, x, y - 1);
  const obj1 = getGameDataValue(gameData, x - 1, y + 1);
  const obj2 = getGameDataValue(gameData, x, y + 1);
  const obj3 = getGameDataValue(gameData, x + 1, y + 1);
  const obj4 = getGameDataValue(gameData, x - 1, y);
  const obj5 = getGameDataValue(gameData, x, y);
  const obj6 = getGameDataValue(gameData, x + 1, y);
  const obj7 = getGameDataValue(gameData, x - 1, y - 1);
  const obj8 = getGameDataValue(gameData, x, y - 1);
  const obj9 = getGameDataValue(gameData, x + 1, y - 1);
  const isBlue = (obj5 === 2);
  const spikeBallAbove = hasSpikeBallWeightAbove(gameData, gameInfo, x, y);
  const spikeBallBelow = hasSpikeBallWeightBelow(gameData, gameInfo, x, y);
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;

  // Depending on the gravity direction, falling has another meaning

  if (gameVars.gravity === "down") {
    if (y >= gameData.length - 1) {
      return false;
    }

    if ((obj2 === 0) ||
      (!ignoreTriangle && hasTopGlideLeftToRight(obj2) && (obj3 === 0) && (obj6 === 0)) ||
      (!ignoreTriangle && hasTopGlideRightToLeft(obj2) && (obj1 === 0) && (obj4 === 0))
    ) {
      result = true;
      // ladder
      if (isBlue && !spikeBallAbove && (isLadder(x, y, backData) || isLadder(x, y + 1, backData))) {
        result = false;
      }
      // teleport
      if (isBlue && isWhiteTeleport(x, y, gameInfo.teleports)) {
        result = false;
      }
      // Water
      if (isBlue && !spikeBallAbove && inWater(x, y, backData)) {
        result = false;
      }
      // Rope
      if (isBlue && !spikeBallAbove) {
        if ((backObj2 === 80) || (backObj5 === 137)) {
          result = false;
        }
        if (y > 0) {
          if (backObj8 === 80) {
            result = false;
          }
        }
      }
      // Propeller
      if (isBlue && !spikeBallAbove && gameInfo.hasPropeller) {
        result = false;
      }
      // Force up
      if (forceUp) {
        result = false;
      }
    }
  }

  if (gameVars.gravity === "up") {
    if (y <= 0) {
      return false;
    }

    if ((obj8 === 0) ||
      (!ignoreTriangle && hasBottomGlideLeftToRight(obj8) && (obj9 === 0) && (obj6 === 0)) ||
      (!ignoreTriangle && hasBottomGlideRightToLeft(obj8) && (obj7 === 0) && (obj4 === 0))
    ) {
      result = true;
      // ladder
      if (isBlue && !spikeBallBelow && (isLadder(x, y, backData) || isLadder(x, y - 1, backData))) {
        result = false;
      }
      // teleport
      if (isBlue && isWhiteTeleport(x, y, gameInfo.teleports)) {
        result = false;
      }
      // Water
      if (isBlue && !spikeBallBelow && inWater(x, y, backData)) {
        result = false;
      }
      // Rope
      if (isBlue && !spikeBallBelow) {
        if ((backObj8 === 80) || (backObj5 === 137)) {
          result = false;
        }
        if (y < (backData.length - 1)) {
          if (backObj2 === 80) {
            result = false;
          }
        }
      }
      // Propeller
      if (isBlue && !spikeBallBelow && gameInfo.hasPropeller) {
        result = false;
      }
      // Force up
      if (forceUp) {
        result = false;
      }
    }
  }

  return result;
}

export function fallingOrRising(x, y, backData, gameData, gameInfo, gameVars, ignoreTriangle = false) {
  return (falling(x, y, backData, gameData, gameInfo, gameVars, ignoreTriangle) || rising(x, y, gameData, gameInfo, gameVars));
}

export function rising(x, y, gameData, gameInfo, gameVars) {
  let forceDown = hasForceDown(gameData, gameInfo, x, y);
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;
  // Depending on the gravity direction, rising has another meaning

  if (gameVars.gravity === "down") {
    if (y <= 0) {
      return false;
    }

    if ((gameData[y - 1][x] === 0) && forceUp && !forceDown) {
      result = true;
    }
  }

  if (gameVars.gravity === "up") {
    if (y >= (gameData.length - 1)) {
      return false;
    }

    if ((gameData[y + 1][x] === 0) && !forceUp && forceDown) {
      result = true;
    }
  }

  return result;
}

export function numberToChar(n) {
  switch (n) {
    case 0:
      return " ";
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "D";
    case 7:
      return "L";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return ">";
    case 11:
      return "<";
    case 12:
      return "F";
    case 13:
      return "-";
    case 15:
      return "G";
    case 16:
      return "H";
    case 17:
      return "I";
    case 18:
      return "J";
    case 20:
      return "W";
    case 21:
      return "P";
    case 22:
      return "V";
    case 23:
      return "w";
    case 24:
      return "@";
    case 25:
      return "=";
    case 26:
      return "d";
    case 27:
      return "f";
    case 28:
      return "p";
    case 29:
      return "k";
    case 30:
      return "l";
    case 31:
      return "T";
    case 34:
      return "Y";
    case 35:
      return "y";
    case 36:
      return "B";
    case 37:
      return "b";
    case 38:
      return "*";
    case 39:
      return "E";
    case 40:
      return "O";
    case 80:
      return "_";
    case 81:
      return "X";
    case 82:
      return "o";
    case 83:
      return ".";
    case 84:
      return "C";
    case 85:
      return "c";
    case 86:
      return "+";
    case 87:
      return "^";
    case 88:
      return "v";
    case 89:
      return "t";
    case 90:
      return "h";
    case 91:
      return "!";
    case 92:
      return "τ";
    case 93:
      return "s";
    case 94:
      return "S";
    case 95:
      return "α";
    case 96:
      return "β";
    case 97:
      return "Δ";
    case 98:
      return "δ";
    case 99:
      return "π";
    case 100:
      return "á";
    case 101:
      return "à";
    case 102:
      return "ä";
    case 103:
      return "Á";
    case 104:
      return "À";
    case 105:
      return "λ";
    case 106:
      return "U";
    case 107:
      return "R";
    case 108:
      return "Λ";
    case 109:
      return "Ω";
    case 110:
      return "ω";
    case 111:
      return "Φ";
    case 112:
      return "φ";
    case 113:
      return "ς";
    case 114:
      return "σ";
    case 115:
      return "Ψ";
    case 116:
      return "ψ";
    case 117:
      return "Ξ";
    case 118:
      return "j";
    case 119:
      return "μ";
    case 120:
      return "u";
    case 121:
      return "ó";
    case 122:
      return "ò";
    case 123:
      return "ö";
    case 124:
      return "Ó";
    case 125:
      return "Ò";
    case 126:
      return "é";
    case 127:
      return "è";
    case 128:
      return "e"; // without two dots
    case 129:
      return "É";
    case 130:
      return "È";
    case 131:
      return "Σ";
    case 132:
      return "g";
    case 133:
      return "γ";
    case 134:
      return "Γ";
    case 135:
      return "ξ";
    case 136:
      return "ρ";
    case 137:
      return "ι";
    case 138:
      return "Â";
    case 139:
      return "â";
    case 140:
      return "°";
    case 141:
      return "i";
    case 142:
      return "í";
    case 143:
      return "ì";
    case 144:
      return "î";
    case 145:
      return "ü";
    case 146:
      return "ú";
    case 147:
      return "ù";
    case 148:
      return "û";
    case 149:
      return "ά";
    case 150:
      return "έ";
    case 151:
      return "ί";
    case 152:
      return "ό";
    case 153:
      return "ή";
    case 154:
      return "ώ";
    case 155:
      return "&";
    case 156:
      return "~";
    case 157:
      return "M";
    case 158:
      return "m";
    case 159:
      return "Ù";
    case 160:
      return "Û";
    case 161:
      return "Ì";
    case 162:
      return "Î";
    case 163:
      return "Ö";
    case 164:
      return "Ô";
    case 165:
      return "Ë";
    case 166:
      return "Ê";
    case 167:
      return ")";
    case 168:
      return "%";
    case 169:
      return "ß";
    case 170:
      return "Π";
    case 171:
      return "{";
    case 172:
      return "Ø";
    case 173:
      return "}";
    case 174:
      return ":";
    case 175:
      return ";";
    case 176:
      return ",";
    case 177:
      return "'";
    case 178:
      return "η";
    case 179:
      return "Ć";
    case 180:
      return "Ĉ";
    case 181:
      return "Ċ";
    case 182:
      return "Č";
    case 183:
      return "Ä";
    case 184:
      return "Є";
    case 185:
      return "З";
    case 186:
      return "ш";
    case 187:
      return "щ";
    case 188:
      return "Ц";
    case 189:
      return "Ч";
    case 190:
      return "И";
    case 191:
      return "Й";
    case 192:
      return "б";
    case 193:
      return "Я";
    case 194:
      return "я";
    case 195:
      return "Б";
    case 196:
      return "Л";
    case 197:
      return "Ъ";
    case 198:
      return "Џ";
    case 199:
      return "Љ";
    case 200:
      return "Ѩ";
    case 201:
      return "Ӭ";
    case 202:
      return "ӭ";
    case 203:
      return "Ѥ";
    case 204:
      return "ѥ";
    case 205:
      return "Ж";
    case 206:
      return "ж";
    case 207:
      return "Ѫ";
    case 208:
      return "Ѳ";
    case 209:
      return "њ";
    case 210:
      return "Ѭ";
    case 211:
      return "ѭ";
    case 212:
      return "Ѯ";
    case 213:
      return "ѯ";
    case 214:
      return "Ѵ";
    case 215:
      return "ѵ";
    case 216:
      return "Ѷ";
    case 217:
      return "ѷ";
    case 218:
      return "Ѹ";
    case 219:
      return "ѹ";
    case 220:
      return "Ѻ";
    case 221:
      return "ѻ";
    case 222:
      return "Ѽ";
    case 223:
      return "ѽ";
    case 224:
      return "Ѿ";
    case 225:
      return "ѿ";
    case 226:
      return "Ґ";
    case 227:
      return "ґ";
    case 228:
      return "Ҡ";
    case 229:
      return "ҡ";
    case 230:
      return "Ң";
    case 231:
      return "ң";
    case 232:
      return "Ҥ";
    case 233:
      return "ҥ";
    case 234:
      return "Ҧ";
    case 235:
      return "ҧ";
    case 236:
      return "Ҩ";
    case 237:
      return "ҩ";
    case 238:
      return "Ұ";
    case 239:
      return "ұ";
    case 240:
      return "Ҵ";
    case 241:
      return "Ҹ";
    case 242:
      return "ҹ";
    case 243:
      return "Ҽ";
    case 244:
      return "Ӄ";
    case 245:
      return "Ӆ";
    case 246:
      return "Ӈ";
    case 247:
      return "ӈ";
    case 248:
      return "Ӊ";
    case 249:
      return "Ӌ";
    case 250:
      return "Ӎ";
    case 251:
      return "ӎ";
    case 252:
      return "Ӑ";
    case 253:
      return "Ь";
    case 254:
      return "ъ";
    case 255:
      return "ђ";
    case 256:
      return "Ѓ";
    case 1000:
      // For manual only
      return "|";
    default:
      return "?";
  }
}

export function numberArrayToStringArray(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let row = "";
    for (let j = 0; j < arr[i].length; j++) {
      row += numberToChar(arr[i][j]);
    }
    result.push(row);
  }
  return result;
}

export function stringArrayToNumberArray(arr, importing = false) {
  let result = { backData: [], gameData: [] };
  let data = 0;

  for (let i = 0; i < arr.length; i++) {
    const rowBackData = [];
    const rowGameData = [];
    for (let j = 0; j < arr[i].length; j++) {
      data = charToNumber(arr[i][j]);
      if (importing) {
        if ([133, 134, 135, 179, 180, 181, 182].includes(data)) {
          data = 0;
        }
      }
      if ([20, 22, 23, 25, 80, 90, 137, 170, 252].includes(data)) {
        rowBackData.push(data);
        rowGameData.push(0);
      } else {
        if ([27, 243, 248, 249].includes(data)) {
          // Fish, jellyfish and coral reef plants are always in the water
          rowBackData.push(23);
        } else {
          rowBackData.push(0);
        }
        rowGameData.push(data);
      }
    }
    result.backData.push(rowBackData);
    result.gameData.push(rowGameData);
  }
  return result;
}

function getCodePartMessage(n) {
  const codePart = secretSeriesCodePart(n);
  switch (n) {
    case 1:
      return `The first code part to enter the secret series is: ${codePart}`;
    case 2:
      return `The second code part to enter the secret series is: ${codePart}`;
    case 3:
      return `The third and last code part to enter the secret series is: ${codePart}`;
    default:
      return "";
  }
}

export function modeToColor(mode) {
  switch (mode) {
    case "blueball":
      return "blue";
    case "brownball":
      return displayColor("brown");
    case "whiteball":
      return "white";
    case "lightblueball":
      return displayColor("lightblue");
    case "yellowball":
      return "yellow";
    case "redball":
      return "red";
    case "purpleball":
      return displayColor("purple");
    case "orangeball":
      return displayColor("orange");
    case "pinkball":
      return displayColor("pink");
    default:
      return "gray";
  }
}


export function moveObject(gameData, gameInfo, oldX, oldY, newX, newY) {
  const element = gameData[oldY][oldX];
  let idx = -1;
  let list = null;

  gameData[newY][newX] = element;
  gameData[oldY][oldX] = 0;
  switch (element) {
    case 2:
      if ((gameInfo.blueBall.x === oldX) && (gameInfo.blueBall.y === oldY)) {
        gameInfo.blueBall.x = newX;
        gameInfo.blueBall.y = newY;
      }
      if ((gameInfo.blueBall1.x === oldX) && (gameInfo.blueBall1.y === oldY)) {
        gameInfo.blueBall1.x = newX;
        gameInfo.blueBall1.y = newY;
      }
      if (gameInfo.twoBlue && (gameInfo.blueBall2.x === oldX) && (gameInfo.blueBall2.y === oldY)) {
        gameInfo.blueBall2.x = newX;
        gameInfo.blueBall2.y = newY;
      }
      break;
    case 9:
      updateYellowBall(gameInfo.yellowBalls, oldX, oldY, newX, newY, "none");
      break;
    case 40:
      updateOrangeBall(gameInfo.orangeBalls, oldX, oldY, newX, newY, "none");
      break;
    case 82:
      gameData[newY][newX] = 83;
      break;
    case 98:
      gameData[newY][newX] = 82;
      break;
    case 117:
      updateTimeBomb(gameInfo.timeBombs, oldX, oldY, newX, newY);
      break;
    case 244:
      updateObject(gameInfo.changers, oldX, oldY, newX, newY);
      idx = findElementByCoordinates(newX, newY, gameInfo.changers);
      if (idx >= 0) {
        gameInfo.changers[idx].ready = true;
      }
      break;
    default:
      list = getListByObjectNumber(gameInfo, element);
      if (list !== null) {
        updateObject(list, oldX, oldY, newX, newY);
      }
      break;
  }
}

export function moveObjectInDirection(gameData, gameInfo, x, y, direction, onlyIfEmpty = false) {
  let newX = x;
  let newY = y;
  switch (direction) {
    case "down":
      newY++;
      break;
    case "left":
      newX--;
      break;
    case "right":
      newX++;
      break;
    case "up":
      newY--;
      break;
    default:
      break;
  }
  const obj = getGameDataValue(gameData, newX, newY);
  if (obj === 0 || !onlyIfEmpty) {
    moveObject(gameData, gameInfo, x, y, newX, newY);
  }
}

export function moveObjects(gameInfo, mode, x1, y1, x2, y2) {
  const refs = [];

  refs.push(gameInfo.blueBall1);

  refs.push(gameInfo.blueBall2);

  for (let i = 0; i < gameInfo.answerBalls.length; i++) {
    refs.push(gameInfo.answerBalls[i]);
  }

  for (let i = 0; i < gameInfo.brownBalls.length; i++) {
    refs.push(gameInfo.brownBalls[i]);
  }

  for (let i = 0; i < gameInfo.changers.length; i++) {
    refs.push(gameInfo.changers[i]);
  }

  for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
    refs.push(gameInfo.conveyorBelts[i]);
  }

  for (let i = 0; i < gameInfo.copiers.length; i++) {
    refs.push(gameInfo.copiers[i]);
  }

  for (let i = 0; i < gameInfo.damagedStones.length; i++) {
    refs.push(gameInfo.damagedStones[i]);
  }

  for (let i = 0; i < gameInfo.delays.length; i++) {
    refs.push(gameInfo.delays[i]);
  }

  for (let i = 0; i < gameInfo.detectors.length; i++) {
    refs.push(gameInfo.detectors[i]);
  }

  for (let i = 0; i < gameInfo.disappearingStones.length; i++) {
    refs.push(gameInfo.disappearingStones[i]);
  }

  refs.push(gameInfo.detonator);

  for (let i = 0; i < gameInfo.electricity.length; i++) {
    refs.push(gameInfo.electricity[i]);
  }

  for (let i = 0; i < gameInfo.electricityActive.length; i++) {
    refs.push(gameInfo.electricityActive[i]);
  }

  for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
    refs.push(gameInfo.elevatorInOuts[i]);
  }

  for (let i = 0; i < gameInfo.elevators.length; i++) {
    refs.push(gameInfo.elevators[i]);
  }

  for (let i = 0; i < gameInfo.fishFood.length; i++) {
    refs.push(gameInfo.fishFood[i]);
  }

  for (let i = 0; i < gameInfo.forces.length; i++) {
    refs.push(gameInfo.forces[i]);
  }

  for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
    refs.push(gameInfo.horizontalElevators[i]);
  }

  for (let i = 0; i < gameInfo.jellyfish.length; i++) {
    refs.push(gameInfo.jellyfish[i]);
  }

  for (let i = 0; i < gameInfo.keys.length; i++) {
    refs.push(gameInfo.keys[i]);
  }

  for (let i = 0; i < gameInfo.lava.length; i++) {
    refs.push(gameInfo.lava[i]);
  }

  for (let i = 0; i < gameInfo.lockedDoors.length; i++) {
    refs.push(gameInfo.lockedDoors[i]);
  }

  for (let i = 0; i < gameInfo.magnets.length; i++) {
    refs.push(gameInfo.magnets[i]);
  }

  for (let i = 0; i < gameInfo.movers.length; i++) {
    refs.push(gameInfo.movers[i]);
  }

  for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
    refs.push(gameInfo.musicBoxes[i]);
  }

  for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
    refs.push(gameInfo.orangeBalls[i]);
  }

  for (let i = 0; i < gameInfo.pinkBalls.length; i++) {
    refs.push(gameInfo.pinkBalls[i]);
  }

  for (let i = 0; i < gameInfo.pistons.length; i++) {
    refs.push(gameInfo.pistons[i]);
  }

  for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
    refs.push(gameInfo.pistonsTriggers[i]);
  }

  for (let i = 0; i < gameInfo.pushers.length; i++) {
    refs.push(gameInfo.pushers[i]);
  }

  for (let i = 0; i < gameInfo.questionStones.length; i++) {
    refs.push(gameInfo.questionStones[i]);
  }

  for (let i = 0; i < gameInfo.redBalls.length; i++) {
    refs.push(gameInfo.redBalls[i]);
  }

  for (let i = 0; i < gameInfo.redFish.length; i++) {
    refs.push(gameInfo.redFish[i]);
  }

  for (let i = 0; i < gameInfo.seaAnemones.length; i++) {
    refs.push(gameInfo.seaAnemones[i]);
  }

  for (let i = 0; i < gameInfo.teleports.length; i++) {
    refs.push(gameInfo.teleports[i]);
  }

  for (let i = 0; i < gameInfo.timeBombs.length; i++) {
    refs.push(gameInfo.timeBombs[i]);
  }

  for (let i = 0; i < gameInfo.trapDoors.length; i++) {
    refs.push(gameInfo.trapDoors[i]);
  }

  refs.push(gameInfo.travelGate);

  for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
    refs.push(gameInfo.tropicalFish[i]);
  }

  for (let i = 0; i < gameInfo.waterWithIceObjects.length; i++) {
    refs.push(gameInfo.waterWithIceObjects[i]);
  }

  for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
    refs.push(gameInfo.whiteBallSynchronisers[i]);
  }

  for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
    refs.push(gameInfo.yellowBalls[i]);
  }

  for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
    refs.push(gameInfo.yellowBallPushers[i]);
  }

  for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
    refs.push(gameInfo.yellowBallPushersTriggers[i]);
  }

  for (let i = 0; i < gameInfo.yellowBars.length; i++) {
    refs.push(gameInfo.yellowBars[i]);
  }

  for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
    refs.push(gameInfo.yellowPausers[i]);
  }

  for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
    refs.push(gameInfo.yellowStoppers[i]);
  }

  for (let i = 0; i < refs.length; i++) {
    const p = refs[i];
    if ((p.x !== -1) && (p.y !== -1)) {
      switch (mode) {
        case "deleteColumn":
          if (p.x > x1) {
            p.x = p.x - 1;
          }
          break;
        case "deleteRow":
          if (p.y > y1) {
            p.y = p.y - 1;
          }
          break;
        case "insertColumn":
          if (p.x >= x1) {
            p.x = p.x + 1;
          }
          break;
        case "insertRow":
          if (p.y >= y1) {
            p.y = p.y + 1;
          }
          break;
        case "moveCell":
          if ((p.x === x1) && (p.y === y1)) {
            p.x = x2;
            p.y = y2;
          }
          break;
        default:
          break;
      }
    }
    if (Object.prototype.hasOwnProperty.call(p, "xStart")) {
      p.xStart = p.x;
    }
    if (Object.prototype.hasOwnProperty.call(p, "yStart")) {
      p.yStart = p.y;
    }
  }
}

function take(backData, gameData, gameInfo, gameVars, result, x, y) {
  let idx = -1;
  const obj = gameData[y][x];

  function smallBallText(color) {
    let msg = `You have now one ${color} ball that you can drop at the right of you by pressing the Space bar or the A button. `;
    msg += "If there is no space on the right, the ball is dropped on the left if there is space there. ";
    msg += "It is also possible to drop the ball after using a teleport or a travel gate.";
    return msg;
  }

  switch (obj) {
    case 0:
      result.sound = "";
      break;
    case 3:
      result.sound = "";
      result.eating = true;
      break;
    case 12:
      idx = findElementByCoordinates(x, y, gameInfo.damagedStones);
      if (idx >= 0) {
        gameInfo.damagedStones[idx].status = -1;
      }
      result.sound = "pickaxe";
      break;
    case 35:
      result.sound = "pickaxe";
      break;
    case 26:
      gameInfo.hasDivingGlasses = true;
      break;
    case 29:
      idx = findElementByCoordinates(x, y, gameInfo.keys);
      if (idx >= 0) {
        switch (gameInfo.keys[idx].color) {
          case "default":
            gameInfo.hasKey = true;
            break;
          case "blue":
            gameInfo.hasBlueKey = true;
            break;
          case "green":
            gameInfo.hasGreenKey = true;
            break;
          case "pink":
            gameInfo.hasPinkKey = true;
            break;
          case "purple":
            gameInfo.hasPurpleKey = true;
            break;
          case "red":
            gameInfo.hasRedKey = true;
            break;
          case "white":
            gameInfo.hasWhiteKey = true;
            break;
          case "yellow":
            gameInfo.hasYellowKey = true;
            break;
          default:
            gameInfo.hasKey = true;
            break;
        }
        gameInfo.keys.splice(idx, 1);
        result.sound = "key";
      }      
      break;
    case 34:
      gameInfo.hasPickaxe = true;
      break;
    case 81:
      gameInfo.hasPropeller = true;
      break;
    case 99:
      gameInfo.hasWeakStone = true;
      break;
    case 108:
      gameInfo.hasLadder = true;
      break;
    case 118:
      gameInfo.hasCoilSpring = true;
      break;
    case 120:
      result.freezeTime = 250;
      break;
    case 133:
      result.message = getCodePartMessage(1);
      break;
    case 134:
      result.message = getCodePartMessage(2);
      break;
    case 135:
      result.message = getCodePartMessage(3);
      break;
    case 140:
      gameInfo.hasTelekineticPower = true;
      result.message = "You have now telekinetic power! By pressing the Space bar or the A button you can move the ";
      result.message += "following objects that are close to you (one at the time): white ball, light blue ball, yellow ball, "
      result.message += "purple ball, answer ball, moveable gray ball, orange ball, pink ball, brown ball, direction changer, ";
      result.message += "time bomb, conveyor belt part, mover";
      break;
    case 156:
      result.slowDownYellow = gameVars.yellowSlowdownerDurationTicks;
      break;
    case 168:
      gameInfo.twoBlue = true;
      result.message = "You are duplicated!";
      if (!gameInfo.twoBlueConnected) {
        result.message += " By pressing the B key or the S button you can set which one you control."
      }
      break;
    case 179:
      result.message = "The code for the hidden mini series 1 is: " + numberToCode(getHiddenMiniStart());
      break;
    case 186:
      result.major = true;
      break;
    case 187:
      result.minor = true;
      break;
    case 188:
      result.aug = true;
      break;
    case 189:
      result.dim = true;
      break;
    case 190:
      result.sus2 = true;
      break;
    case 191:
      result.sus4 = true;
      break;
    case 226:
      result.dom7 = true;
      break;
    case 227:
      result.maj7 = true;
      break;
    case 228:
      result.intervalP5 = true;
      break;
    case 229:
      result.intervalP8 = true;
      break;
    case 230:
      result.intervalP4 = true;
      break;
    case 231:
      result.intervalMajor2 = true;
      break;
    case 232:
      result.intervalMinor3 = true;
      break;
    case 233:
      result.intervalMajor3 = true;
      break;
    case 192:
      if (!gameInfo.hasWhiteBall) {
        result.message = smallBallText("white");
        gameInfo.hasWhiteBall = true;
      }
      break;
    case 193:
      if (!gameInfo.hasTeleportsCreator) {
        result.message = "You have now a teleports creator. You can create teleports by pressing the Space bar or the A button and ";
        result.message += "after that pressing a move key or button to indicate the direction (for example the right arrow key)."
        gameInfo.hasTeleportsCreator = true;
      }
      break;
    case 194:
      if (!gameInfo.hasSelfDestructingTeleportsCreator) {
        result.message = "You have now a self-destructing teleports creator. You can create self-destructing teleports by pressing the Space ";
        result.message += "bar or the A button and after that pressing a move key or button to indicate the direction (for example the right arrow key)."
        gameInfo.hasSelfDestructingTeleportsCreator = true;
      }
      break;
    case 195:
      if (!gameInfo.hasLightBlueBall) {
        result.message = smallBallText("light blue");
        gameInfo.hasLightBlueBall = true;
      }
      break;
    case 196:
      if (!gameInfo.hasYellowBall) {
        result.message = smallBallText("yellow");
        gameInfo.hasYellowBall = true;
      }
      break;
    case 197:
      if (!gameInfo.hasPurpleBall) {
        result.message = smallBallText("purple");
        gameInfo.hasPurpleBall = true;
      }
      break;
    case 199:
      if (!gameInfo.hasShrinker) {
        result.message = "You have now a shrinker. You can shrink white, light blue, red, yellow, purple, orange, pink and brown balls by pressing the Space bar or ";
        result.message += "the A button and after that pressing a move key or button to indicate the direction (for example the right arrow key)."
        gameInfo.hasShrinker = true;
      }
      break;
    case 201:
      if (!gameInfo.hasRedBall) {
        result.message = smallBallText("red");
        gameInfo.hasRedBall = true;
      }
      break;
    case 202:
      if (!gameInfo.hasOrangeBall) {
        result.message = smallBallText("orange");
        gameInfo.hasOrangeBall = true;
      }
      break;
    case 204:
      if (!gameInfo.hasPinkBall) {
        result.message = smallBallText("pink");
        gameInfo.hasPinkBall = true;
      }
      break;
    case 205:
      if (!gameInfo.hasFreezeGun) {
        result.message = "You have now a freeze gun. You can freeze the surface of water by pressing the Space bar or ";
        result.message += "the A button and after that pressing a move key or button to indicate the direction (for example the right arrow key)."
        gameInfo.hasFreezeGun = true;
      }
      break;
    case 206:
      backData[y][x] = 20;
      gameInfo.waterWithIceObjects.splice(0, gameInfo.waterWithIceObjects.length,
        ...gameInfo.waterWithIceObjects.filter(obj => ((obj.x !== x) || (obj.y !== y)))
      );
      result.sound = "pickaxe";
      break;
    case 207:
      gameVars.remainingPhaseTicks = gameVars.phaseTicks;
      break;
    case 250:
      gameInfo.hasFishFood = true;
      result.message = "You have now fish food. You can feed tropical fish by pressing the Space bar or the A button and ";
      result.message += "after that pressing a move key or button to indicate the direction (for example the right arrow key)."
      break;
    case 254:
      if (!gameInfo.hasBrownBall) {
        result.message = smallBallText("brown");
        gameInfo.hasBrownBall = true;
      }
      break;
    default:
      break;
  }
}

export function updateObject(objects, x1, y1, x2, y2) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].x === x1 && objects[i].y === y1) {
      objects[i].x = x2;
      objects[i].y = y2;
    }
  }
}

export function updateObjectByObjectNumber(gameInfo, objectNumber, x1, y1, x2, y2) {
  let direction = "none";
  const list = getListByObjectNumber(gameInfo, objectNumber);

  if (list === null) {
    return;
  }
  if (x2 < x1) {
    direction = "left";
  }
  if (x2 > x1) {
    direction = "right";
  }
  if (y2 < y1) {
    direction = "up";
  }
  if (y2 > y1) {
    direction = "down";
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].x === x1 && list[i].y === y1) {
      list[i].x = x2;
      list[i].y = y2;
      switch (objectNumber) {
        case 9:
        case 40:
          list[i].direction = direction;
          break;
        case 117:
          list[i].status = getTimeBombsTime();
          break;
        case 203:
          list[i].counter = 0;
          break;
        case 244:
          list[i].ready = true;
          break;
        case 253:
          list[i].counter = 0;
          break;
        default:
          break;
      }
      break;
    }
  }
}

function whiteBluePinkBrown(n) {
  return [4, 5, 203, 245, 253].includes(n);
}

export function zeroArray(rows, columns) {
  let result = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(0);
    }
    result.push(row);
  }
  return result;
}

export function moveLeft(backData, gameData, gameInfo, gameVars) {
  let idx1 = -1;
  let idx2 = -1;
  let objectNumber = 0;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  let row = gameData[y];
  result.action = "";
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length <= 0) {
    return result;
  }
  if (moverIsMovingBlueBall(gameData, gameInfo, gameVars)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars) || hasForceRight(gameData, gameInfo, x, y)) {
    return result;
  }

  if (x > 0) {
    // empty space, green ball, diving glasses, key etc.
    if (!result.player && (canBeTakenOrIsEmpty(gameInfo, row[x - 1]) ||
      ([12, 35, 206].includes(row[x - 1]) && gameInfo.hasPickaxe))) {
      result.sound = "take";
      take(backData, gameData, gameInfo, gameVars, result, x - 1, y);
      if (row[x - 1] === 168) {
        row[x] = 2;
        gameInfo.blueBall2.x = gameInfo.blueBall1.x;
        gameInfo.blueBall2.y = gameInfo.blueBall1.y;
      } else {
        row[x] = element;
      }
      row[x - 1] = 2;
      gameInfo.blueBall.x = x - 1;
      result.player = true;
    }
  }
  if (x > 1) {
    // 1 object
    objectNumber = row[x - 1];
    if (!result.player && (whiteBluePinkBrown(objectNumber) || canMoveAlone(gameData, gameInfo, x - 1, y, "moveLeft")) && (row[x - 2] === 0) &&
      !hasForceRight(gameData, gameInfo, x - 1, y)) {
      row[x - 2] = row[x - 1];
      row[x - 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 1;
      switch (objectNumber) {
        case 82:
          row[x - 2] = 83;
          break;
        case 98:
          row[x - 2] = 82;
          break;
        default:
          updateObjectByObjectNumber(gameInfo, objectNumber, x - 1, y, x - 2, y);
          break;
      }
      result.player = true;
    }
    if (!result.player && ((row[x - 1] === 11) || canOpen(gameData, gameInfo, x - 1, y)) && (row[x - 2] === 0)) {
      row[x - 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 2;
      result.player = true;
      if (row[x - 1] === 30) {
        result.sound = "unlock";
      }
    }
    if (!result.player && (gameVars.remainingPhaseTicks > 0) && phaseThroughObjects.includes(row[x - 1]) && (row[x - 2] === 0)) {
      row[x - 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 2;
      result.player = true;
    }
    if (!result.player && [89, 183, 184, 185].includes(row[x - 1]) && (row[x - 2] === 0)) {
      row[x - 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 2;
      result.player = true;
      switch (row[x - 1]) {
        case 89:
          result.action = "rotateRight";
          break;
        case 183:
          result.action = "rotateLeft";
          break;
        case 184:
          result.action = "gravityUp";
          break;
        case 185:
          result.action = "gravityDown";
          break;
        default:
          break;
      }
    }
  }
  if (x > 2) {
    // 2 white or blue balls
    if (!result.player && whiteBluePinkBrown(row[x - 1]) && whiteBluePinkBrown(row[x - 2]) && (row[x - 3] === 0)) {
      updateObjectByObjectNumber(gameInfo, row[x - 2], x - 2, y, x - 3, y);
      updateObjectByObjectNumber(gameInfo, row[x - 1], x - 1, y, x - 2, y);
      row[x - 3] = row[x - 2];
      row[x - 2] = row[x - 1];
      row[x - 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 1;
      result.player = true;
    }
  }
  if (!result.player && x > 0) {
    if ((row[x - 1] === 31) || (row[x - 1] === 92)) {
      idx1 = findElementByCoordinates(x - 1, y, gameInfo.teleports);
      if (idx1 === -1) {
        idx2 = -1;
      } else {
        idx2 = findTheOtherTeleport(idx1, gameInfo.teleports);
      }
      if (idx2 !== -1) {
        row[x - 1] = 2;
        row[x] = element;
        gameInfo.blueBall.x = x - 1;
        result.player = true;
        result.action = "teleporting";
      }
    }
  }
  if (result.player) {
    const teleport = findElementByCoordinates(x, y, gameInfo.teleports);
    if (teleport >= 0) {
      if (gameInfo.teleports[teleport].color === "white") {
        if (gameInfo.teleports[teleport].selfDestructing) {
          row[x] = 0;
        } else {
          row[x] = 31;
        }
      }
    }
  }
  if (!result.player && x > 0) {
    if (row[x - 1] === 132) {
      row[x - 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 1;
      result.player = true;
      result.action = "gateTravelling";
    }
  }
  if (result.player) {
    if ((x === gameInfo.travelGate.x) && (y === gameInfo.travelGate.y)) {
      row[x] = 132;
    }
  }
  if (!result.player && ([101, 102, 103, 104].includes(gameData[y][x - 1]))) {
    if (movePurpleBar(backData, gameData, gameInfo, gameVars, "left")) {
      result.player = true;
      gameData[y][x - 1] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x - 1;
    }
  }
  if (!result.player && ([122, 123, 124, 125].includes(gameData[y][x - 1]))) {
    if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, gameVars, "left", -1)) {
      result.player = true;
      gameData[y][x - 1] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x - 1;
    }
  }
  if (!result.player && ([127, 128, 129, 130].includes(gameData[y][x - 1]))) {
    if (moveLightBlueBar(backData, gameData, gameInfo, gameVars, "left")) {
      result.player = true;
      gameData[y][x - 1] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x - 1;
    }
  }
  return result;
}

export function moveRight(backData, gameData, gameInfo, gameVars) {
  let idx1 = -1;
  let idx2 = -1;
  let objectNumber = 0;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  let row = gameData[y];
  let maxX = 0;
  result.action = "";
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length <= 0) {
    return result;
  }
  if (moverIsMovingBlueBall(gameData, gameInfo, gameVars)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars) || hasForceLeft(gameData, gameInfo, x, y)) {
    return result;
  }

  maxX = gameData[0].length - 1;
  if (x < maxX) {
    // empty space, green ball, diving glasses, key etc.
    if (!result.player && (canBeTakenOrIsEmpty(gameInfo, row[x + 1]) ||
      ([12, 35, 206].includes(row[x + 1]) && gameInfo.hasPickaxe))) {
      result.sound = "take";
      take(backData, gameData, gameInfo, gameVars, result, x + 1, y);
      if (row[x + 1] === 168) {
        row[x] = 2;
        gameInfo.blueBall2.x = gameInfo.blueBall1.x;
        gameInfo.blueBall2.y = gameInfo.blueBall1.y;
      } else {
        row[x] = element;
      }
      row[x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      result.player = true;
    }
  }
  if (x < maxX - 1) {
    // 1 object
    objectNumber = row[x + 1];
    if (!result.player && (whiteBluePinkBrown(objectNumber) || canMoveAlone(gameData, gameInfo, x + 1, y, "moveRight")) && (row[x + 2] === 0) &&
      !hasForceLeft(gameData, gameInfo, x + 1, y)) {
      row[x + 2] = row[x + 1];
      row[x + 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 1;
      switch (objectNumber) {
        case 82:
          row[x + 2] = 83;
          break;
        case 98:
          row[x + 2] = 82;
          break;
        default:
          updateObjectByObjectNumber(gameInfo, objectNumber, x + 1, y, x + 2, y);
          break;
      }
      result.player = true;
    }
    if (!result.player && ((row[x + 1] === 10) || canOpen(gameData, gameInfo, x + 1, y)) && (row[x + 2] === 0)) {
      row[x + 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 2;
      result.player = true;
      if (row[x + 1] === 30) {
        result.sound = "unlock";
      }
    }
    if (!result.player && (gameVars.remainingPhaseTicks > 0) && phaseThroughObjects.includes(row[x + 1]) && (row[x + 2] === 0)) {
      row[x + 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 2;
      result.player = true;
    }
    if (!result.player && [89, 183, 184, 185].includes(row[x + 1]) && (row[x + 2] === 0)) {
      row[x + 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 2;
      result.player = true;
      switch (row[x + 1]) {
        case 89:
          result.action = "rotateRight";
          break;
        case 183:
          result.action = "rotateLeft";
          break;
        case 184:
          result.action = "gravityUp";
          break;
        case 185:
          result.action = "gravityDown";
          break;
        default:
          break;
      }
    }
  }
  if (x < maxX - 2) {
    // 2 white or blue balls
    if (!result.player && whiteBluePinkBrown(row[x + 1]) && whiteBluePinkBrown(row[x + 2]) && (row[x + 3] === 0)) {
      updateObjectByObjectNumber(gameInfo, row[x + 2], x + 2, y, x + 3, y);
      updateObjectByObjectNumber(gameInfo, row[x + 1], x + 1, y, x + 2, y);
      row[x + 3] = row[x + 2];
      row[x + 2] = row[x + 1];
      row[x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      row[x] = element;
      result.player = true;
    }
  }
  if (!result.player && x < gameData[0].length - 1) {
    if ((row[x + 1] === 31) || (row[x + 1] === 92)) {
      idx1 = findElementByCoordinates(x + 1, y, gameInfo.teleports);
      if (idx1 === -1) {
        idx2 = -1;
      } else {
        idx2 = findTheOtherTeleport(idx1, gameInfo.teleports);
      }
      if (idx2 !== -1) {
        row[x + 1] = 2;
        row[x] = element;
        gameInfo.blueBall.x = x + 1;
        result.player = true;
        result.action = "teleporting";
      }
    }
  }
  if (result.player) {
    const teleport = findElementByCoordinates(x, y, gameInfo.teleports);
    if (teleport >= 0) {
      if (gameInfo.teleports[teleport].color === "white") {
        if (gameInfo.teleports[teleport].selfDestructing) {
          row[x] = 0;
        } else {
          row[x] = 31;
        }
      }
    }
  }
  if (!result.player && x > 0) {
    if (row[x + 1] === 132) {
      row[x + 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 1;
      result.player = true;
      result.action = "gateTravelling";
    }
  }
  if (result.player) {
    if ((x === gameInfo.travelGate.x) && (y === gameInfo.travelGate.y)) {
      row[x] = 132;
    }
  }
  if (!result.player && ([100, 102, 103, 104].includes(gameData[y][x + 1]))) {
    if (movePurpleBar(backData, gameData, gameInfo, gameVars, "right")) {
      result.player = true;
      gameData[y][x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      gameData[y][x] = element;
    }
  }
  if (!result.player && ([121, 123, 124, 125].includes(gameData[y][x + 1]))) {
    if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, gameVars, "right", -1)) {
      result.player = true;
      gameData[y][x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      gameData[y][x] = element;
    }
  }
  if (!result.player && ([126, 128, 129, 130].includes(gameData[y][x + 1]))) {
    if (moveLightBlueBar(backData, gameData, gameInfo, gameVars, "right")) {
      result.player = true;
      gameData[y][x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      gameData[y][x] = element;
    }
  }
  return result;
}

export function jump(backData, gameData, gameInfo, gameVars) {
  let direction = 0;
  let dy1 = 0;
  let dy2 = 0;
  let el = 0;
  let minY = 0;
  let maxY = 0;
  let objectNumber = 0;
  let oneDirection = 0;
  let info = null;
  const x = gameInfo.blueBall.x;
  const y = gameInfo.blueBall.y;
  let result = {};
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;
  const gravityDown = (gameVars.gravity === "down");
  const gravityUp = (gameVars.gravity === "up");

  // A jump is always against the gravity direction
  if (gameData.length <= 0) {
    return result;
  }
  if (isWhiteTeleport(x, y, gameInfo.teleports) || isTravelGate(x, y, gameInfo.travelGate)) {
    return result;
  }
  if (moverIsMovingBlueBall(gameData, gameInfo, gameVars)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars)) {
    return result;
  }
  if ((gravityDown && hasForceDown(gameData, gameInfo, x, y)) ||
    (gravityUp && hasForceUp(gameData, gameInfo, x, y))) {
    return result;
  }

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      minY = 2;
      maxY = gameData.length - 3;
      if (gravityDown) {
        dy1 = -1;
        dy2 = -2;
      } else {
        dy1 = 1;
        dy2 = 2;
      }
    } else {
      minY = 1;
      maxY = gameData.length - 2;
      if (gravityDown) {
        dy1 = -1;
        dy2 = -1;
      } else {
        dy1 = 1;
        dy2 = 1;
      }
    }
    if (result.player) break;

    // Skip the first time if the blue ball has no coil spring or it is in the water
    if ((i === 0) && (!gameInfo.hasCoilSpring || [20, 23, 252].includes(backData[y][x]))) continue;

    if ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY))) {
      if (((i !== 0) || ((gameData[y + dy1][x] === 0))) &&
        ((i !== 0) || ((![25, 137, 90].includes(backData[y + dy1][x])) && (![25, 137, 90].includes(backData[y][x])))) &&
        (![80].includes(backData[y + dy2][x]))) {
        if (canBeTakenOrIsEmpty(gameInfo, gameData[y + dy2][x]) ||
          ((i !== 0) && [12, 35, 206].includes(gameData[y + dy1][x]) && gameInfo.hasPickaxe)
        ) {
          result.sound = "take";
          take(backData, gameData, gameInfo, gameVars, result, x, y + dy2);
          if (gameData[y + dy2][x] === 168) {
            gameData[y][x] = 2;
            gameInfo.blueBall2.x = gameInfo.blueBall1.x;
            gameInfo.blueBall2.y = gameInfo.blueBall1.y;
          } else {
            gameData[y][x] = element;
          }
          if ((i !== 0) && !gameInfo.hasWeakStone && gameInfo.hasLadder && (gameData[y + dy1][x] === 0)) {
            backData[y][x] = 25;
          }
          gameData[y + dy2][x] = 2;
          gameInfo.blueBall.x = x;
          gameInfo.blueBall.y = y + dy2;
          result.player = true;
        }
      }
    }
  }

  minY = 1;
  maxY = gameData.length - 2;
  if (gravityDown) {
    direction = "up";
    dy1 = -1;
    dy2 = -2;
    oneDirection = 87;
  } else {
    direction = "down";
    dy1 = 1;
    dy2 = 2;
    oneDirection = 88;
  }
  if (!result.player && ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY)))) {
    objectNumber = gameData[y + dy1][x];
    if (canMoveAlone(gameData, gameInfo, x, y + dy1, "jump") && gameData[y + dy2][x] === 0 &&
      ((gravityDown && !hasForceDown(gameData, gameInfo, x, y + dy1)) ||
        (gravityUp && !hasForceUp(gameData, gameInfo, x, y + dy1)))
    ) {
      gameData[y + dy2][x] = gameData[y + dy1][x];
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      switch (objectNumber) {
        case 82:
          gameData[y + dy2][x] = 83;
          break;
        case 98:
          gameData[y + dy2][x] = 82;
          break;
        default:
          updateObjectByObjectNumber(gameInfo, objectNumber, x, y + dy1, x, y + dy2);
          break;
      }
      result.player = true;
    }
    if (!result.player && (gameData[y + dy2][x] === 0) &&
      ((gameData[y + dy1][x] === oneDirection) || canOpen(gameData, gameInfo, x, y + dy1))) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
      if (gameData[y + dy1][x] === 30) {
        result.sound = "unlock";
      }
    }
    if (!result.player && (gameVars.remainingPhaseTicks > 0) && phaseThroughObjects.includes(gameData[y + dy1][x]) && (gameData[y + dy2][x]) === 0) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
    }

    // Horizontal rope
    if (!result.player && (gameData[y + dy1][x] === 0) && (gameData[y + dy2][x] === 0) && (backData[y + dy1][x] === 80)) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
    }
    el = gravityDown ? 104 : 103;
    if (!result.player && ([100, 101, 102, el].includes(gameData[y + dy1][x]))) {
      if (movePurpleBar(backData, gameData, gameInfo, gameVars, direction)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
    el = gravityDown ? 125 : 124;
    if (!result.player && ([121, 122, 123, el].includes(gameData[y + dy1][x]))) {
      if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, gameVars, direction, -1)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
    el = gravityDown ? 130 : 129;
    if (!result.player && ([el].includes(gameData[y + dy1][x]))) {
      if (moveLightBlueBar(backData, gameData, gameInfo, gameVars, direction)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
  }

  if (!result.player && !gravityDown && [37, 116, 131, 136, 158].includes(gameData[y + dy1][x])) {
    if (!hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y + dy1, false)) {
      result.player = true;
      switch (gameData[y + dy1][x]) {
        case 37:
          info = checkDetonator(backData, gameData, gameInfo, gameVars, true);
          if (info.explosion) {
            result.sound = "explosion";
          }
          break;
        case 116:
          checkYellowPushersTriggers(backData, gameData, gameInfo, gameVars, true);
          break;
        case 131:
          checkYellowStoppers(backData, gameData, gameInfo, gameVars, true);
          break;
        case 136:
          checkYellowPausers(backData, gameData, gameInfo, gameVars, true);
          break;
        case 158:
          checkPistonsTriggers(backData, gameData, gameInfo, gameVars, true);
          break;
        default:
          break;
      }
    }
  }

  return result;
}

export function jumpLeftOrRight(backData, gameData, gameInfo, gameVars, direction) {
  let dx = 0;
  let dy1 = 0;
  let dy2 = 0;
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;
  const x = gameInfo.blueBall.x;
  const y = gameInfo.blueBall.y;
  const result = {};
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  const element = gameInfo.hasWeakStone ? 35 : 0;
  const gravityDown = (gameVars.gravity === "down");
  const gravityUp = (gameVars.gravity === "up");

  // A jump is always against the gravity direction
  if (gameData.length <= 0) {
    return result;
  }
  if (isWhiteTeleport(x, y, gameInfo.teleports) || isTravelGate(x, y, gameInfo.travelGate)) {
    return result;
  }
  if (moverIsMovingBlueBall(gameData, gameInfo, gameVars)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars)) {
    return result;
  }
  if ((gravityDown && hasForceDown(gameData, gameInfo, x, y)) ||
    (gravityUp && hasForceUp(gameData, gameInfo, x, y))) {
    return result;
  }

  switch (direction) {
    case "left":
      dx = -1;
      minX = 1;
      maxX = gameData[0].length - 1;
      break;
    case "right":
      dx = 1;
      minX = 0;
      maxX = gameData[0].length - 2;
      break;
    default:
      break;
  }

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      minY = 2;
      maxY = gameData.length - 3;
      if (gravityDown) {
        dy1 = -1;
        dy2 = -2;
      } else {
        dy1 = 1;
        dy2 = 2;
      }
    } else {
      minY = 1;
      maxY = gameData.length - 2;
      if (gravityDown) {
        dy1 = -1;
        dy2 = -1;
      } else {
        dy1 = 1;
        dy2 = 1;
      }
    }

    if (result.player) break;

    // Skip the first time if the blue ball has no coil spring or it is in the water
    if ((i === 0) && (!gameInfo.hasCoilSpring || [20, 23, 252].includes(backData[y][x]))) continue;

    if ((x >= minX) && (x <= maxX) && ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY)))) {
      if ((gameData[y + dy1][x] === 0) && (gameData[y + dy2][x] === 0) && ![80].includes(backData[y + dy2][x + dx])) {
        if (canBeTakenOrIsEmpty(gameInfo, gameData[y + dy2][x + dx])) {
          result.sound = "take";
          take(backData, gameData, gameInfo, gameVars, result, x + dx, y + dy2);
          if (gameData[y + dy2][x + dx] === 168) {
            gameData[y][x] = 2;
            gameInfo.blueBall2.x = gameInfo.blueBall1.x;
            gameInfo.blueBall2.y = gameInfo.blueBall1.y;
          } else {
            gameData[y][x] = element;
          }
          gameData[y + dy2][x + dx] = 2;
          gameInfo.blueBall.x = x + dx;
          gameInfo.blueBall.y = y + dy2;
          result.player = true;
        }
      }
    }
  }
  return result;
}

export function pushObject(backData, gameData, gameInfo, gameVars) {
  let back2 = -1;
  let direction = "";
  let dy1 = 0;
  let dy2 = 0;
  let el = 0;
  let element1 = -1;
  let element2 = -1;
  let idx = -1;
  let info = null;
  let minY = 0;
  let maxY = 0;
  let oneDirection = 0;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;
  const gravityDown = (gameVars.gravity === "down");
  const gravityUp = (gameVars.gravity === "up");

  // A push is always in the gravity direction
  if (gameData.length <= 0) {
    return result;
  }
  if (isWhiteTeleport(x, y, gameInfo.teleports) || isTravelGate(x, y, gameInfo.travelGate)) {
    return result;
  }

  minY = 1;
  maxY = gameData.length - 2;
  if (gravityDown) {
    direction = "down";
    dy1 = 1;
    dy2 = 2;
    oneDirection = 88;
  } else {
    direction = "up";
    dy1 = -1;
    dy2 = -2;
    oneDirection = 87;
  }
  element1 = getGameDataValue(gameData, x, y + dy1);
  back2 = getGameDataValue(backData, x, y + dy2);
  element2 = getGameDataValue(gameData, x, y + dy2);

  if ((gravityUp && (y >= minY) && !hasForceDown(gameData, gameInfo, x, y + dy1)) || (gravityDown && (y <= maxY) && !hasForceUp(gameData, gameInfo, x, y + dy1))) {
    if (!result.player && canMoveAlone(gameData, gameInfo, x, y + dy1, "pushObject") && (element2 === 0)) {
      gameData[y + dy2][x] = element1;
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      switch (element1) {
        case 82:
          gameData[y + dy2][x] = 83;
          break;
        case 98:
          gameData[y + dy2][x] = 82;
          break;
        default:
          updateObjectByObjectNumber(gameInfo, element1, x, y + dy1, x, y + dy2);
          break;
      }
      result.player = true;
    }
    if (!result.player && (element1 === 248) && (element2 === 0) && (back2 === 23)) {
      moveObject(gameData, gameInfo, x, y + dy1, x, y + dy2);
      moveObject(gameData, gameInfo, x, y, x, y + dy1);
      result.player = true;
    }

    if (!result.player && (element2 === 0) && ((element1 === oneDirection) || canOpen(gameData, gameInfo, x, y + dy1))) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
      if (element1 === 30) {
        result.sound = "unlock";
      }
    }

    if (!result.player && (gameVars.remainingPhaseTicks > 0) && phaseThroughObjects.includes(element1) && (element2) === 0) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
    }
    // Horizontal rope
    if (!result.player && (element1 === 0) && (element2 === 0) && (backData[y + dy1][x] === 80)) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
    }
    if (y > 0) {
      if (!result.player && (element1 === 0) && (backData[y - dy1][x] === 80)) {
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
        result.player = true;
      }
    }

    if (
      !result.player &&
      gameData[y + dy1][x] === 0 &&
      (inWater(x, y, backData) ||
        [25, 90, 137].includes(backData[y][x]) ||
        [25, 90].includes(backData[y + dy1][x]) ||
        gameInfo.hasPropeller)
    ) {
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      result.player = true;
    }
    if (!result.player && [12, 35, 206].includes(element1) && gameInfo.hasPickaxe) {
      if (element1 === 12) {
        idx = findElementByCoordinates(x, y + dy1, gameInfo.damagedStones);
        if (idx >= 0) {
          gameInfo.damagedStones[idx].status = -1;
        }
      }
      if (element1 === 206) {
        backData[y + dy1][x] = 20;
        gameInfo.waterWithIceObjects.splice(0, gameInfo.waterWithIceObjects.length,
          ...gameInfo.waterWithIceObjects.filter(obj => ((obj.x !== x) || (obj.y !== (y + dy1))))
        );
      }
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      result.player = true;
      result.sound = "pickaxe";
    }
    el = gravityDown ? 103 : 104;
    if (!result.player && ([100, 101, 102, el].includes(element1))) {
      if (movePurpleBar(backData, gameData, gameInfo, gameVars, direction)) {
        // Blue ball is updated in movePurpleBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    el = gravityDown ? 124 : 125;
    if (!result.player && ([121, 122, 123, el].includes(element1))) {
      if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, gameVars, direction, -1)) {
        // Blue ball is updated in moveYellowBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    el = gravityDown ? 129 : 130;
    if (!result.player && ([el].includes(element1))) {
      if (moveLightBlueBar(backData, gameData, gameInfo, gameVars, direction)) {
        // Blue ball is updated in moveLightBlueBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    if (!result.player && gravityDown && [37, 116, 131, 136, 158].includes(element1)) {
      if (!hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y + dy1, false)) {
        result.player = true;
        switch (element1) {
          case 37:
            info = checkDetonator(backData, gameData, gameInfo, gameVars, true);
            if (info.explosion) {
              result.sound = "explosion";
            }
            break;
          case 116:
            checkYellowPushersTriggers(backData, gameData, gameInfo, gameVars, true);
            break;
          case 131:
            checkYellowStoppers(backData, gameData, gameInfo, gameVars, true);
            break;
          case 136:
            checkYellowPausers(backData, gameData, gameInfo, gameVars, true);
            break;
          case 158:
            checkPistonsTriggers(backData, gameData, gameInfo, gameVars, true);
            break;
          default:
            break;
        }
      }
    }
  }
  return result;
}

export function moveDiagonal(backData, gameData, gameInfo, gameVars, direction) {
  let dx = 0;
  let dy = 0;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let minY = 0;
  let maxY = 0;
  let result = {};
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;
  const gravityDown = (gameVars.gravity === "down");
  const gravityUp = (gameVars.gravity === "up");

  if (isWhiteTeleport(x, y, gameInfo.teleports) || isTravelGate(x, y, gameInfo.travelGate)) {
    return result;
  }
  if (gameData.length <= 0) {
    return result;
  }
  if (moverIsMovingBlueBall(gameData, gameInfo, gameVars)) {
    return result;
  }

  minY = 1;
  maxY = gameData.length - 2;
  // The vertical movement is always in the gravity direction
  if (direction === "left") {
    dx = -1;
  } else {
    dx = 1;
  }
  if (gravityDown) {
    dy = +1;
  } else {
    dy = -1;
  }
  if ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY))) {
    if (
      gameData[y + dy][x + dx] === 0 &&
      gameData[y + dy][x] === 0 &&
      (inWater(x, y, backData) || gameInfo.hasPropeller)
    ) {
      gameData[y + dy][x + dx] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x + dx;
      gameInfo.blueBall.y = y + dy;
      result.player = true;
    }
  }
  return result;
}



