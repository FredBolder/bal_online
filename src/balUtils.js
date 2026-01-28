import { checkColor } from "./changers.js";
import { numberToCode, secretSeriesCodePart } from "./codes.js";
import { checkDetonator } from "./detonator.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { getHiddenMiniStart } from "./levels.js";
import { moveLightBlueBar } from "./lightBlueBar.js";
import { moverIsMovingBlueBall, moverDirections } from "./movers.js";
import { updateOrangeBall } from "./orangeBalls.js";
import { checkPistonsTriggers } from "./pistons.js";
import { movePurpleBar } from "./purpleBar.js";
import { findTheOtherTeleport, isWhiteTeleport } from "./teleports.js";
import { getTimeBombsTime, updateTimeBomb } from "./timeBombs.js";
import { hasBottomGlideLeftToRight, hasBottomGlideRightToLeft, hasTopGlideLeftToRight, hasTopGlideRightToLeft } from "./triangleStones.js";
import { updateYellowBall } from "./yellowBalls.js";
import { moveYellowBar } from "./yellowBars.js";
import { checkYellowPausers } from "./yellowPausers.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStoppers } from "./yellowStoppers.js";

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
    default:
      break;
  }
  return result;
}

function canMoveAlone(gameData, gameInfo, x, y, parent = "") {
  // Object that can move, but not together with another object
  let result = false;
  let idx = -1;
  const el = gameData[y][x];

  if ([9, 27, 28, 40, 82, 84, 85, 86, 98, 109, 110, 111, 112, 115, 117, 138, 139, 155, 171, 172, 173, 200, 209, 242, 243, 244, 246, 247, 251].includes(el)) {
    result = true;
  } else {
    switch (el) {
      case 109:
        result = (parent !== "pushObject");
        break;
      case 110:
        result = (parent !== "jump");
        break;
      case 111:
        result = (parent !== "moveLeft");
        break;
      case 112:
        result = (parent !== "moveRight");
        break;
      case 157:
        idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
        if (idx >= 0) {
          result = (gameInfo.musicBoxes[idx].mode === "keyboard");
        }
        break;
      case 159:
      case 161:
      case 163:
      case 165:
        idx = findElementByCoordinates(x, y, gameInfo.pistons);
        if (idx >= 0) {
          const piston = gameInfo.pistons[idx];
          result = (["blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball",
            "pinkball"].includes(piston.mode) && !piston.activated);
        }
        break;
      case 178:
        idx = findElementByCoordinates(x, y, gameInfo.movers);
        if (idx >= 0) {
          result = true;
          if (
            (parent === "moveLeft") && gameInfo.movers[idx].activeSides.includes("right") ||
            (parent === "moveRight") && gameInfo.movers[idx].activeSides.includes("left") ||
            (parent === "jump") && gameInfo.movers[idx].activeSides.includes("bottom") ||
            (parent === "pushObject") && gameInfo.movers[idx].activeSides.includes("top")
          ) {
            result = false;
          }
        }
        break;
      default:
        break;
    }
  }

  return result;
}

export function changeAnswer(gameInfo, x, y, answer) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.answerBalls);
  if (idx >= 0) {
    gameInfo.answerBalls[idx].answer = answer;
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.questionStones);
    if (idx >= 0) {
      gameInfo.questionStones[idx].answer = answer;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
      gameInfo.tropicalFish[idx].answer = answer;
    }
  }
  return idx;
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

export function changeDirection(gameData, gameInfo, x, y, direction) {
  let idx = -1;

  if (["left", "right", "up", "down"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
      if (idx >= 0) {
        gameInfo.musicBoxes[idx].direction = direction;
      }
    }
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.pushers);
      if (idx >= 0) {
        gameInfo.pushers[idx].direction = direction;
      }
    }
  }
  if (["left", "right", "none"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.conveyorBelts);
      if (idx >= 0) {
        gameInfo.conveyorBelts[idx].direction = direction;
      }
    }
  }
  if (["left", "right"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.horizontalElevators);
      if (idx >= 0) {
        gameInfo.horizontalElevators[idx].right = (direction === "right");
        if (direction === "right") {
          gameData[y][x] = 107;
        } else {
          gameData[y][x] = 7;
        }
      }
    }
  }
  if (["up", "down"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.elevators);
      if (idx >= 0) {
        gameInfo.elevators[idx].up = (direction === "up");
        if (direction === "up") {
          gameData[y][x] = 106;
        } else {
          gameData[y][x] = 6;
        }
      }
    }
  }
  if (moverDirections().includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.movers);
      if (idx >= 0) {
        gameInfo.movers[idx].direction = direction;
      }
    }
  }
  if (["horizontal", "vertical"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinates(x, y, gameInfo.changers);
      if (idx >= 0) {
        gameInfo.changers[idx].horizontal = (direction === "horizontal");
      }
    }
  }
  return idx;
}

export function changeGroup(gameInfo, x, y, group) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.conveyorBelts);
  if (idx >= 0) {
    gameInfo.conveyorBelts[idx].group = group;
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
      gameInfo.musicBoxes[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.pistonsTriggers);
    if (idx >= 0) {
      gameInfo.pistonsTriggers[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.pistons);
    if (idx >= 0) {
      gameInfo.pistons[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.pushers);
    if (idx >= 0) {
      gameInfo.pushers[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinates(x, y, gameInfo.teleports);
    if (idx >= 0) {
      gameInfo.teleports[idx].group = group;
    }
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

export function changeQuestion(gameInfo, x, y, question) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.questionStones);
  if (idx >= 0) {
    gameInfo.questionStones[idx].question = question;
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
  let result = 0;

  switch (c) {
    case "0":
    case " ":
      result = 0;
      break;
    case "1":
      result = 1;
      break;
    case "2":
      result = 2;
      break;
    case "3":
      result = 3;
      break;
    case "4":
      result = 4;
      break;
    case "5":
      result = 5;
      break;
    case "D":
      result = 6;
      break;
    case "L":
      result = 7;
      break;
    case "8":
      result = 8;
      break;
    case "9":
      result = 9;
      break;
    case ">":
      result = 10;
      break;
    case "<":
      result = 11;
      break;
    case "F":
      result = 12;
      break;
    case "-":
      result = 13;
      break;
    case "G":
      result = 15;
      break;
    case "H":
      result = 16;
      break;
    case "I":
      result = 17;
      break;
    case "J":
      result = 18;
      break;
    case "W":
      result = 20;
      break;
    case "P":
      result = 21;
      break;
    case "V":
      result = 22;
      break;
    case "w":
      result = 23;
      break;
    case "@":
      result = 24;
      break;
    case "=":
      result = 25;
      break;
    case "d":
      result = 26;
      break;
    case "f":
      result = 27;
      break;
    case "p":
      result = 28;
      break;
    case "k":
      result = 29;
      break;
    case "l":
      result = 30;
      break;
    case "T":
      result = 31;
      break;
    case "Y":
      result = 34;
      break;
    case "y":
      result = 35;
      break;
    case "B":
      result = 36;
      break;
    case "b":
      result = 37;
      break;
    case "*":
      result = 38;
      break;
    case "E":
      result = 39;
      break;
    case "O":
      result = 40;
      break;
    case "_":
      result = 80;
      break;
    case "X":
      result = 81;
      break;
    case "o":
      result = 82;
      break;
    case ".":
      result = 83;
      break;
    case "C":
      result = 84;
      break;
    case "c":
      result = 85;
      break;
    case "+":
      result = 86;
      break;
    case "^":
      result = 87;
      break;
    case "v":
      result = 88;
      break;
    case "t":
      result = 89;
      break;
    case "h":
      result = 90;
      break;
    case "!":
      result = 91;
      break;
    case "τ":
      result = 92;
      break;
    case "s":
      result = 93;
      break;
    case "S":
      result = 94;
      break;
    case "α":
      result = 95;
      break;
    case "β":
      result = 96;
      break;
    case "Δ":
      result = 97;
      break;
    case "δ":
      result = 98;
      break;
    case "π":
      result = 99;
      break;
    case "á":
      result = 100;
      break;
    case "à":
      result = 101;
      break;
    case "ä":
      result = 102;
      break;
    case "Á":
      result = 103;
      break;
    case "À":
      result = 104;
      break;
    case "λ":
      result = 105;
      break;
    case "U":
      result = 106;
      break;
    case "R":
      result = 107;
      break;
    case "Λ":
      result = 108;
      break;
    case "Ω":
      result = 109;
      break;
    case "ω":
      result = 110;
      break;
    case "Φ":
      result = 111;
      break;
    case "φ":
      result = 112;
      break;
    case "ς":
      result = 113;
      break;
    case "σ":
      result = 114;
      break;
    case "Ψ":
      result = 115;
      break;
    case "ψ":
      result = 116;
      break;
    case "Ξ":
      result = 117;
      break;
    case "j":
      result = 118;
      break;
    case "μ":
      result = 119;
      break;
    case "u":
      result = 120;
      break;
    case "ó":
      result = 121;
      break;
    case "ò":
      result = 122;
      break;
    case "ö":
      result = 123;
      break;
    case "Ó":
      result = 124;
      break;
    case "Ò":
      result = 125;
      break;
    case "é":
      result = 126;
      break;
    case "è":
      result = 127;
      break;
    case "e": // without two dots
      result = 128;
      break;
    case "É":
      result = 129;
      break;
    case "È":
      result = 130;
      break;
    case "Σ":
      result = 131;
      break;
    case "g":
      result = 132;
      break;
    case "γ":
      result = 133;
      break;
    case "Γ":
      result = 134;
      break;
    case "ξ":
      result = 135;
      break;
    case "ρ":
      result = 136;
      break;
    case "ι":
      result = 137;
      break;
    case "Â":
      result = 138;
      break;
    case "â":
      result = 139;
      break;
    case "°":
      result = 140;
      break;
    case "i":
      result = 141;
      break;
    case "í":
      result = 142;
      break;
    case "ì":
      result = 143;
      break;
    case "î":
      result = 144;
      break;
    case "ü":
      result = 145;
      break;
    case "ú":
      result = 146;
      break;
    case "ù":
      result = 147;
      break;
    case "û":
      result = 148;
      break;
    case "ά":
      result = 149;
      break;
    case "έ":
      result = 150;
      break;
    case "ί":
      result = 151;
      break;
    case "ό":
      result = 152;
      break;
    case "ή":
      result = 153;
      break;
    case "ώ":
      result = 154;
      break;
    case "&":
      result = 155;
      break;
    case "~":
      result = 156;
      break;
    case "M":
      result = 157;
      break;
    case "m":
      result = 158;
      break;
    case "Ù":
      result = 159;
      break;
    case "Û":
      result = 160;
      break;
    case "Ì":
      result = 161;
      break;
    case "Î":
      result = 162;
      break;
    case "Ö":
      result = 163;
      break;
    case "Ô":
      result = 164;
      break;
    case "Ë":
      result = 165;
      break;
    case "Ê":
      result = 166;
      break;
    case ")":
      result = 167;
      break;
    case "%":
      result = 168;
      break;
    case "ß":
      result = 169;
      break;
    case "Π":
      result = 170;
      break;
    case "{":
      result = 171;
      break;
    case "Ø":
      result = 172;
      break;
    case "}":
      result = 173;
      break;
    case ":":
      result = 174;
      break;
    case ";":
      result = 175;
      break;
    case ",":
      result = 176;
      break;
    case "'":
      result = 177;
      break;
    case "η":
      result = 178;
      break;
    case "Ć":
      result = 179;
      break;
    case "Ĉ":
      result = 180;
      break;
    case "Ċ":
      result = 181;
      break;
    case "Č":
      result = 182;
      break;
    case "Ä":
      result = 183;
      break;
    case "Є":
      result = 184;
      break;
    case "З":
      result = 185;
      break;
    case "ш":
      result = 186;
      break;
    case "щ":
      result = 187;
      break;
    case "Ц":
      result = 188;
      break;
    case "Ч":
      result = 189;
      break;
    case "И":
      result = 190;
      break;
    case "Й":
      result = 191;
      break;
    case "б":
      result = 192;
      break;
    case "Я":
      result = 193;
      break;
    case "я":
      result = 194;
      break;
    case "Б":
      result = 195;
      break;
    case "Л":
      result = 196;
      break;
    case "Ъ":
      result = 197;
      break;
    case "Џ":
      result = 198;
      break;
    case "Љ":
      result = 199;
      break;
    case "Ѩ":
      result = 200;
      break;
    case "Ӭ":
      result = 201;
      break;
    case "ӭ":
      result = 202;
      break;
    case "Ѥ":
      result = 203;
      break;
    case "ѥ":
      result = 204;
      break;
    case "Ж":
      result = 205;
      break;
    case "ж":
      result = 206;
      break;
    case "Ѫ":
      result = 207;
      break;
    case "Ѳ":
      result = 208;
      break;
    case "њ":
      result = 209;
      break;
    case "Ѭ":
      result = 210;
      break;
    case "ѭ":
      result = 211;
      break;
    case "Ѯ":
      result = 212;
      break;
    case "ѯ":
      result = 213;
      break;
    case "Ѵ":
      result = 214;
      break;
    case "ѵ":
      result = 215;
      break;
    case "Ѷ":
      result = 216;
      break;
    case "ѷ":
      result = 217;
      break;
    case "Ѹ":
      result = 218;
      break;
    case "ѹ":
      result = 219;
      break;
    case "Ѻ":
      result = 220;
      break;
    case "ѻ":
      result = 221;
      break;
    case "Ѽ":
      result = 222;
      break;
    case "ѽ":
      result = 223;
      break;
    case "Ѿ":
      result = 224;
      break;
    case "ѿ":
      result = 225;
      break;
    case "Ґ":
      result = 226;
      break;
    case "ґ":
      result = 227;
      break;
    case "Ҡ":
      result = 228;
      break;
    case "ҡ":
      result = 229;
      break;
    case "Ң":
      result = 230;
      break;
    case "ң":
      result = 231;
      break;
    case "Ҥ":
      result = 232;
      break;
    case "ҥ":
      result = 233;
      break;
    case "Ҧ":
      result = 234;
      break;
    case "ҧ":
      result = 235;
      break;
    case "Ҩ":
      result = 236;
      break;
    case "ҩ":
      result = 237;
      break;
    case "Ұ":
      result = 238;
      break;
    case "ұ":
      result = 239;
      break;
    case "Ҵ":
      result = 240;
      break;
    case "Ҹ":
      result = 241;
      break;
    case "ҹ":
      result = 242;
      break;
    case "Ҽ":
      result = 243;
      break;
    case "Ӄ":
      result = 244;
      break;
    case "Ӆ":
      result = 245;
      break;
    case "Ӈ":
      result = 246;
      break;
    case "ӈ":
      result = 247;
      break;
    case "Ӊ":
      result = 248;
      break;
    case "Ӌ":
      result = 249;
      break;
    case "Ӎ":
      result = 250;
      break;
    case "ӎ":
      result = 251;
      break;
    case "|":
      result = 1000;
      break;
    default:
      result = -1;
      break;
  }
  // More possible characters
  // https://www.w3schools.com/charsets/ref_utf_cyrillic.asp
  return result;
}

export function checkFalling(backData, gameData, gameInfo, gameVars) {
  const canFall = [2, 4, 8, 40, 93, 94, 245];
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
          ([4, 40, 245].includes(element1) && !forceUp) ||
          ([27, 243, 248].includes(element1) && !forceUp && backData[i][j] !== 23)) {
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
            ([4, 40, 245].includes(element1) && !forceDown))) {
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

  if (((object === "lightBlueBall") && !gameInfo.hasLightBlueBall) ||
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
      if ([2, 4, 8, 27, 40, 93, 94, 203, 243, 245, 248].includes(elAbove)) {
        if (pushing || gravityDown || forceDown) {
          weight = true;
        }
      }
      if ((elAbove === 2) && !forceDown && !pushing) {
        if (gameInfo.hasPropeller || [25, 90, 137].includes(back) || [20, 23, 25, 80, 90, 137].includes(backAbove) || isHorizontalRope(i, y - 2, backData)) {
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
      if ([2, 4, 8, 40, 93, 94, 203, 245].includes(elBelow)) {
        if (pushing || gravityUp || forceUp) {
          weight = true;
        }
      }
      if ((elBelow === 2) && !forceUp && !pushing) {
        if (gameInfo.hasPropeller || [25, 90, 137].includes(back) || [20, 23, 25, 90, 137].includes(backBelow) || isHorizontalRope(i, y + 2, backData)) {
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
  let result = null;

  switch (objectNumber) {
    case 6:
    case 106:
      result = gameInfo.elevators;
      break;
    case 7:
    case 107:
      result = gameInfo.horizontalElevators;
      break;
    case 8:
    case 93:
    case 94:
      result = gameInfo.redBalls;
      break;
    case 9:
      result = gameInfo.yellowBalls;
      break;
    case 12:
      result = gameInfo.damagedStones;
      break;
    case 13:
      result = gameInfo.trapDoors;
      break;
    case 22:
      result = gameInfo.lava;
      break;
    case 27:
      result = gameInfo.redFish;
      break;
    case 31:
    case 92:
    case 170:
      result = gameInfo.teleports;
      break;
    case 39:
      result = gameInfo.elevatorInOuts;
      break;
    case 40:
      result = gameInfo.orangeBalls;
      break;
    case 91:
      result = gameInfo.electricity;
      break;
    case 97:
    case 208:
      result = gameInfo.copiers;
      break;
    case 109:
    case 110:
    case 111:
    case 112:
      result = gameInfo.forces;
      break;
    case 115:
      result = gameInfo.yellowBallPushers;
      break;
    case 116:
      result = gameInfo.yellowBallPushersTriggers;
      break;
    case 117:
      result = gameInfo.timeBombs;
      break;
    case 119:
      result = gameInfo.magnets;
      break;
    case 121:
    case 124:
      result = gameInfo.yellowBars;
      break;
    case 131:
      result = gameInfo.yellowStoppers;
      break;
    case 136:
      result = gameInfo.yellowPausers;
      break;
    case 157:
      result = gameInfo.musicBoxes;
      break;
    case 158:
      result = gameInfo.pistonsTriggers;
      break;
    case 159:
    case 161:
    case 163:
    case 165:
      result = gameInfo.pistons;
      break;
    case 167:
      result = gameInfo.delays;
      break;
    case 171:
      result = gameInfo.conveyorBelts;
      break;
    case 178:
      result = gameInfo.movers;
      break;
    case 198:
      result = gameInfo.disappearingStones;
      break;
    case 200:
      result = gameInfo.whiteBallSynchronisers;
      break;
    case 203:
      result = gameInfo.pinkBalls;
      break;
    case 206:
      result = gameInfo.waterWithIceObjects;
      break;
    case 209:
      result = gameInfo.pushers;
      break;
    case 241:
      result = gameInfo.questionStones;
      break;
    case 242:
    case 245:
      result = gameInfo.answerBalls;
      break;
    case 243:
      result = gameInfo.tropicalFish;
      break;
    case 244:
      result = gameInfo.changers;
      break;
    case 248:
      result = gameInfo.jellyfish;
      break;
    case 251:
      result = gameInfo.fishFood;
      break;
    default:
      result = null;
      break;
  }

  return result;
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
  let result = [20, 23].includes(backData[y][x]);
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
  let result = false;
  if (y < backData.length) {
    if (x < backData[0].length) {
      result = (backData[y][x] === 80);
    }
  }
  return result;
}

function isTravelGate(x, y, travelGate) {
  return ((x === travelGate.x) && (y === travelGate.y));
}

export function falling(x, y, backData, gameData, gameInfo, gameVars, ignoreTriangle = false) {
  const element = gameData[y][x];
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;

  // Depending on the gravity direction, falling has another meaning

  if (gameVars.gravity === "down") {
    if (y >= gameData.length - 1) {
      return false;
    }

    if ((gameData[y + 1][x] === 0) ||
      (!ignoreTriangle && hasTopGlideLeftToRight(gameData[y + 1][x]) && (gameData[y + 1][x + 1] === 0) && (gameData[y][x + 1] === 0)) ||
      (!ignoreTriangle && hasTopGlideRightToLeft(gameData[y + 1][x]) && (gameData[y + 1][x - 1] === 0) && (gameData[y][x - 1] === 0))
    ) {
      result = true;
      // ladder
      if ([2].includes(element) && (isLadder(x, y, backData) || isLadder(x, y + 1, backData))) {
        result = false;
      }
      // teleport
      if ([2].includes(element) && isWhiteTeleport(x, y, gameInfo.teleports)) {
        result = false;
      }
      // Water
      if ([2].includes(element) && inWater(x, y, backData)) {
        result = false;
      }
      // Rope
      if ([2].includes(element)) {
        if ((backData[y + 1][x] === 80) || (backData[y][x] === 137)) {
          result = false;
        }
        if (y > 0) {
          if (backData[y - 1][x] === 80) {
            result = false;
          }
        }
      }
      // Propeller
      if ([2].includes(element) && gameInfo.hasPropeller) {
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

    if ((gameData[y - 1][x] === 0) ||
      (!ignoreTriangle && hasBottomGlideLeftToRight(gameData[y - 1][x]) && (gameData[y - 1][x + 1] === 0) && (gameData[y][x + 1] === 0)) ||
      (!ignoreTriangle && hasBottomGlideRightToLeft(gameData[y - 1][x]) && (gameData[y - 1][x - 1] === 0) && (gameData[y][x - 1] === 0))
    ) {
      result = true;
      // ladder
      if ([2].includes(element) && (isLadder(x, y, backData) || isLadder(x, y - 1, backData))) {
        result = false;
      }
      // teleport
      if ([2].includes(element) && isWhiteTeleport(x, y, gameInfo.teleports)) {
        result = false;
      }
      // Water
      if ([2].includes(element) && inWater(x, y, backData)) {
        result = false;
      }
      // Rope
      if ([2].includes(element)) {
        if ((backData[y - 1][x] === 80) || (backData[y][x] === 137)) {
          result = false;
        }
        if (y < (backData.length - 1)) {
          if (backData[y + 1][x] === 80) {
            result = false;
          }
        }
      }
      // Propeller
      if ([2].includes(element) && gameInfo.hasPropeller) {
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
  let result = " ";

  switch (n) {
    case 0:
      result = " ";
      break;
    case 1:
      result = "1";
      break;
    case 2:
      result = "2";
      break;
    case 3:
      result = "3";
      break;
    case 4:
      result = "4";
      break;
    case 5:
      result = "5";
      break;
    case 6:
      result = "D";
      break;
    case 7:
      result = "L";
      break;
    case 8:
      result = "8";
      break;
    case 9:
      result = "9";
      break;
    case 10:
      result = ">";
      break;
    case 11:
      result = "<";
      break;
    case 12:
      result = "F";
      break;
    case 13:
      result = "-";
      break;
    case 15:
      result = "G";
      break;
    case 16:
      result = "H";
      break;
    case 17:
      result = "I";
      break;
    case 18:
      result = "J";
      break;
    case 20:
      result = "W";
      break;
    case 21:
      result = "P";
      break;
    case 22:
      result = "V";
      break;
    case 23:
      result = "w";
      break;
    case 24:
      result = "@";
      break;
    case 25:
      result = "=";
      break;
    case 26:
      result = "d";
      break;
    case 27:
      result = "f";
      break;
    case 28:
      result = "p";
      break;
    case 29:
      result = "k";
      break;
    case 30:
      result = "l";
      break;
    case 31:
      result = "T";
      break;
    case 34:
      result = "Y";
      break;
    case 35:
      result = "y";
      break;
    case 36:
      result = "B";
      break;
    case 37:
      result = "b";
      break;
    case 38:
      result = "*";
      break;
    case 39:
      result = "E";
      break;
    case 40:
      result = "O";
      break;
    case 80:
      result = "_";
      break;
    case 81:
      result = "X";
      break;
    case 82:
      result = "o";
      break;
    case 83:
      result = ".";
      break;
    case 84:
      result = "C";
      break;
    case 85:
      result = "c";
      break;
    case 86:
      result = "+";
      break;
    case 87:
      result = "^";
      break;
    case 88:
      result = "v";
      break;
    case 89:
      result = "t";
      break;
    case 90:
      result = "h";
      break;
    case 91:
      result = "!";
      break;
    case 92:
      result = "τ";
      break;
    case 93:
      result = "s";
      break;
    case 94:
      result = "S";
      break;
    case 95:
      result = "α";
      break;
    case 96:
      result = "β";
      break;
    case 97:
      result = "Δ";
      break;
    case 98:
      result = "δ";
      break;
    case 99:
      result = "π";
      break;
    case 100:
      result = "á";
      break;
    case 101:
      result = "à";
      break;
    case 102:
      result = "ä";
      break;
    case 103:
      result = "Á";
      break;
    case 104:
      result = "À";
      break;
    case 105:
      result = "λ";
      break;
    case 106:
      result = "U";
      break;
    case 107:
      result = "R";
      break;
    case 108:
      result = "Λ";
      break;
    case 109:
      result = "Ω";
      break;
    case 110:
      result = "ω";
      break;
    case 111:
      result = "Φ";
      break;
    case 112:
      result = "φ";
      break;
    case 113:
      result = "ς";
      break;
    case 114:
      result = "σ";
      break;
    case 115:
      result = "Ψ";
      break;
    case 116:
      result = "ψ";
      break;
    case 117:
      result = "Ξ";
      break;
    case 118:
      result = "j";
      break;
    case 119:
      result = "μ";
      break;
    case 120:
      result = "u";
      break;
    case 121:
      result = "ó";
      break;
    case 122:
      result = "ò";
      break;
    case 123:
      result = "ö";
      break;
    case 124:
      result = "Ó";
      break;
    case 125:
      result = "Ò";
      break;
    case 126:
      result = "é";
      break;
    case 127:
      result = "è";
      break;
    case 128:
      result = "e"; // without two dots
      break;
    case 129:
      result = "É";
      break;
    case 130:
      result = "È";
      break;
    case 131:
      result = "Σ";
      break;
    case 132:
      result = "g";
      break;
    case 133:
      result = "γ";
      break;
    case 134:
      result = "Γ";
      break;
    case 135:
      result = "ξ";
      break;
    case 136:
      result = "ρ";
      break;
    case 137:
      result = "ι";
      break;
    case 138:
      result = "Â";
      break;
    case 139:
      result = "â";
      break;
    case 140:
      result = "°";
      break;
    case 141:
      result = "i";
      break;
    case 142:
      result = "í";
      break;
    case 143:
      result = "ì";
      break;
    case 144:
      result = "î";
      break;
    case 145:
      result = "ü";
      break;
    case 146:
      result = "ú";
      break;
    case 147:
      result = "ù";
      break;
    case 148:
      result = "û";
      break;
    case 149:
      result = "ά";
      break;
    case 150:
      result = "έ";
      break;
    case 151:
      result = "ί";
      break;
    case 152:
      result = "ό";
      break;
    case 153:
      result = "ή";
      break;
    case 154:
      result = "ώ";
      break;
    case 155:
      result = "&";
      break;
    case 156:
      result = "~";
      break;
    case 157:
      result = "M";
      break;
    case 158:
      result = "m";
      break;
    case 159:
      result = "Ù";
      break;
    case 160:
      result = "Û";
      break;
    case 161:
      result = "Ì";
      break;
    case 162:
      result = "Î";
      break;
    case 163:
      result = "Ö";
      break;
    case 164:
      result = "Ô";
      break;
    case 165:
      result = "Ë";
      break;
    case 166:
      result = "Ê";
      break;
    case 167:
      result = ")";
      break;
    case 168:
      result = "%";
      break;
    case 169:
      result = "ß";
      break;
    case 170:
      result = "Π";
      break;
    case 171:
      result = "{";
      break;
    case 172:
      result = "Ø";
      break;
    case 173:
      result = "}";
      break;
    case 174:
      result = ":";
      break;
    case 175:
      result = ";";
      break;
    case 176:
      result = ",";
      break;
    case 177:
      result = "'";
      break;
    case 178:
      result = "η";
      break;
    case 179:
      result = "Ć";
      break;
    case 180:
      result = "Ĉ";
      break;
    case 181:
      result = "Ċ";
      break;
    case 182:
      result = "Č";
      break;
    case 183:
      result = "Ä";
      break;
    case 184:
      result = "Є";
      break;
    case 185:
      result = "З";
      break;
    case 186:
      result = "ш";
      break;
    case 187:
      result = "щ";
      break;
    case 188:
      result = "Ц";
      break;
    case 189:
      result = "Ч";
      break;
    case 190:
      result = "И";
      break;
    case 191:
      result = "Й";
      break;
    case 192:
      result = "б";
      break;
    case 193:
      result = "Я";
      break;
    case 194:
      result = "я";
      break;
    case 195:
      result = "Б";
      break;
    case 196:
      result = "Л";
      break;
    case 197:
      result = "Ъ";
      break;
    case 198:
      result = "Џ";
      break;
    case 199:
      result = "Љ";
      break;
    case 200:
      result = "Ѩ";
      break;
    case 201:
      result = "Ӭ";
      break;
    case 202:
      result = "ӭ";
      break;
    case 203:
      result = "Ѥ";
      break;
    case 204:
      result = "ѥ";
      break;
    case 205:
      result = "Ж";
      break;
    case 206:
      result = "ж";
      break;
    case 207:
      result = "Ѫ";
      break;
    case 208:
      result = "Ѳ";
      break;
    case 209:
      result = "њ";
      break;
    case 210:
      result = "Ѭ";
      break;
    case 211:
      result = "ѭ";
      break;
    case 212:
      result = "Ѯ";
      break;
    case 213:
      result = "ѯ";
      break;
    case 214:
      result = "Ѵ";
      break;
    case 215:
      result = "ѵ";
      break;
    case 216:
      result = "Ѷ";
      break;
    case 217:
      result = "ѷ";
      break;
    case 218:
      result = "Ѹ";
      break;
    case 219:
      result = "ѹ";
      break;
    case 220:
      result = "Ѻ";
      break;
    case 221:
      result = "ѻ";
      break;
    case 222:
      result = "Ѽ";
      break;
    case 223:
      result = "ѽ";
      break;
    case 224:
      result = "Ѿ";
      break;
    case 225:
      result = "ѿ";
      break;
    case 226:
      result = "Ґ";
      break;
    case 227:
      result = "ґ";
      break;
    case 228:
      result = "Ҡ";
      break;
    case 229:
      result = "ҡ";
      break;
    case 230:
      result = "Ң";
      break;
    case 231:
      result = "ң";
      break;
    case 232:
      result = "Ҥ";
      break;
    case 233:
      result = "ҥ";
      break;
    case 234:
      result = "Ҧ";
      break;
    case 235:
      result = "ҧ";
      break;
    case 236:
      result = "Ҩ";
      break;
    case 237:
      result = "ҩ";
      break;
    case 238:
      result = "Ұ";
      break;
    case 239:
      result = "ұ";
      break;
    case 240:
      result = "Ҵ";
      break;
    case 241:
      result = "Ҹ";
      break;
    case 242:
      result = "ҹ";
      break;
    case 243:
      result = "Ҽ";
      break;
    case 244:
      result = "Ӄ";
      break;
    case 245:
      result = "Ӆ";
      break;
    case 246:
      result = "Ӈ";
      break;
    case 247:
      result = "ӈ";
      break;
    case 248:
      result = "Ӊ";
      break;
    case 249:
      result = "Ӌ";
      break;
    case 250:
      result = "Ӎ";
      break;
    case 251:
      result = "ӎ";
      break;
    case 1000:
      // For manual only
      result = "|";
      break;
    default:
      result = "?";
      break;
  }
  return result;
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
      if ([20, 22, 23, 25, 80, 90, 137, 170].includes(data)) {
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
  let msg = "";
  switch (n) {
    case 1:
      msg = `The first code part to enter the secret series is: ${codePart}`;
      break;
    case 2:
      msg = `The second code part to enter the secret series is: ${codePart}`;
      break;
    case 3:
      msg = `The third and last code part to enter the secret series is: ${codePart}`;
      break;
    default:
      break;
  }
  return msg;
}

export function moveObject(gameData, gameInfo, oldX, oldY, newX, newY) {
  const element = gameData[oldY][oldX];
  let idx = -1;

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
    case 8:
    case 93:
    case 94:
      updateObject(gameInfo.redBalls, oldX, oldY, newX, newY);
      break;
    case 9:
      updateYellowBall(gameInfo.yellowBalls, oldX, oldY, newX, newY, "none");
      break;
    case 27:
      updateObject(gameInfo.redFish, oldX, oldY, newX, newY);
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
    case 97:
    case 208:
      updateObject(gameInfo.copiers, oldX, oldY, newX, newY);
      break;
    case 109:
    case 110:
    case 111:
    case 112:
      updateObject(gameInfo.forces, oldX, oldY, newX, newY);
      break;
    case 117:
      updateTimeBomb(gameInfo.timeBombs, oldX, oldY, newX, newY);
      break;
    case 157:
      updateObject(gameInfo.musicBoxes, oldX, oldY, newX, newY);
      break;
    case 158:
      updateObject(gameInfo.pistonsTriggers, oldX, oldY, newX, newY);
      break;
    case 171:
      updateObject(gameInfo.conveyorBelts, oldX, oldY, newX, newY);
      break;
    case 178:
      updateObject(gameInfo.movers, oldX, oldY, newX, newY);
      break;
    case 198:
      updateObject(gameInfo.disappearingStones, oldX, oldY, newX, newY);
      break;
    case 200:
      updateObject(gameInfo.whiteBallSynchronisers, oldX, oldY, newX, newY);
      break;
    case 203:
      updateObject(gameInfo.pinkBalls, oldX, oldY, newX, newY);
      break;
    case 209:
      updateObject(gameInfo.pushers, oldX, oldY, newX, newY);
      break;
    case 241:
      updateObject(gameInfo.questionStones, oldX, oldY, newX, newY);
      break;
    case 242:
    case 245:
      updateObject(gameInfo.answerBalls, oldX, oldY, newX, newY);
      break;
    case 243:
      updateObject(gameInfo.tropicalFish, oldX, oldY, newX, newY);
      break;
    case 244:
      updateObject(gameInfo.changers, oldX, oldY, newX, newY);
      idx = findElementByCoordinates(newX, newY, gameInfo.changers);
      if (idx >= 0) {
        gameInfo.changers[idx].ready = true;
      }
      break;
    case 248:
      updateObject(gameInfo.jellyfish, oldX, oldY, newX, newY);
      break;
    case 251:
      updateObject(gameInfo.fishFood, oldX, oldY, newX, newY);
      break;
    default:
      break;
  }
}

export function moveObjectInDirection(gameData, gameInfo, x, y, direction) {
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
  moveObject(gameData, gameInfo, x, y, newX, newY);
}

export function moveObjects(gameInfo, mode, x1, y1, x2, y2) {
  const refs = [];

  refs.push(gameInfo.blueBall1);

  refs.push(gameInfo.blueBall2);

  for (let i = 0; i < gameInfo.answerBalls.length; i++) {
    refs.push(gameInfo.answerBalls[i]);
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

  for (let i = 0; i < gameInfo.lava.length; i++) {
    refs.push(gameInfo.lava[i]);
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
      gameInfo.hasKey = true;
      result.sound = "key";
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
      result.message += "purple ball, answer ball, moveable gray ball, orange ball, pink ball, direction changer, time bomb, ";
      result.message += "conveyor belt part, mover";
      break;
    case 156:
      result.slowDownYellow = gameVars.yellowSlowdownerDurationTicks;
      break;
    case 168:
      gameInfo.twoBlue = true;
      result.message = "You are duplicated! By pressing the B key or the S button you can set ";
      result.message += "which one you control."
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
        result.message = "You have now a shrinker. You can shrink white, light blue, red, yellow, purple and orange balls by pressing the Space bar or ";
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
      result.message = "You have now fish food. You can feed fish by pressing the Space bar or the A button and ";
      result.message += "after that pressing a move key or button to indicate the direction (for example the right arrow key)."
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
        default:
          break;
      }
      break;
    }
  }
}

function whiteOrBlueOrPink(n) {
  return [4, 5, 203, 245].includes(n);
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
    if (!result.player && (whiteOrBlueOrPink(objectNumber) || canMoveAlone(gameData, gameInfo, x - 1, y, "moveLeft")) && (row[x - 2] === 0) &&
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
    if (!result.player && ((row[x - 1] === 11) || ((row[x - 1] === 30) && gameInfo.hasKey)) && (row[x - 2] === 0)) {
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
    if (!result.player && whiteOrBlueOrPink(row[x - 1]) && whiteOrBlueOrPink(row[x - 2]) && (row[x - 3] === 0)) {
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
    if (!result.player && (whiteOrBlueOrPink(objectNumber) || canMoveAlone(gameData, gameInfo, x + 1, y, "moveRight")) && (row[x + 2] === 0) &&
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
    if (!result.player && ((row[x + 1] === 10) || ((row[x + 1] === 30) && gameInfo.hasKey)) && (row[x + 2] === 0)) {
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
    if (!result.player && whiteOrBlueOrPink(row[x + 1]) && whiteOrBlueOrPink(row[x + 2]) && (row[x + 3] === 0)) {
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
    if ((i === 0) && (!gameInfo.hasCoilSpring || [20, 23].includes(backData[y][x]))) continue;

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
    if (!result.player && (gameData[y + dy1][x] === oneDirection) && (gameData[y + dy2][x] === 0)) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
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
    if ((i === 0) && (!gameInfo.hasCoilSpring || [20, 23].includes(backData[y][x]))) continue;

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
    if (!result.player && (element1 === oneDirection) && (element2 === 0)) {
      gameData[y + dy2][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy2;
      result.player = true;
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



