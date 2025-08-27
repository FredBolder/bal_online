import { numberToCode, secretSeriesCodePart } from "./codes.js";
import { checkDetonator } from "./detonator.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { getHiddenMiniStart } from "./levels.js";
import { moveLightBlueBar } from "./lightBlueBar.js";
import { moverCanMoveBlueBall, moversDirections } from "./movers.js";
import { moveOrangeBallInDirection, updateOrangeBall } from "./orangeBalls.js";
import { checkPistonsTriggers } from "./pistons.js";
import { movePurpleBar } from "./purpleBar.js";
import { findTheOtherTeleport, isWhiteTeleport } from "./teleports.js";
import { getTimeBombsTime, updateTimeBomb } from "./timeBombs.js";
import { updateYellowBall } from "./yellowBalls.js";
import { moveYellowBar } from "./yellowBars.js";
import { checkYellowPausers } from "./yellowPausers.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStoppers } from "./yellowStoppers.js";

function canBeTakenOrIsEmpty() {
  return [0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168, 179];
}

function canMoveAlone(n) {
  // Object that can move, but not together with another object
  return [9, 28, 40, 82, 84, 85, 86, 98, 109, 110, 111, 112, 115, 117, 138, 139, 155, 171, 172, 173, 178].includes(n);
}

export function changeDirection(gameData, gameInfo, x, y, direction) {
  let idx = -1;

  if (["left", "right", "none"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinate(x, y, gameInfo.conveyorBelts);
      if (idx >= 0) {
        gameInfo.conveyorBelts[idx].direction = direction;
      }
    }
  }
  if (["left", "right"].includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinate(x, y, gameInfo.horizontalElevators);
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
      idx = findElementByCoordinate(x, y, gameInfo.elevators);
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
  if (moversDirections().includes(direction)) {
    if (idx === -1) {
      idx = findElementByCoordinate(x, y, gameInfo.movers);
      if (idx >= 0) {
        gameInfo.movers[idx].direction = direction;
      }
    }
  }
  return idx;
}

export function changeGroup(gameInfo, x, y, group) {
  let idx = -1;

  idx = findElementByCoordinate(x, y, gameInfo.conveyorBelts);
  if (idx >= 0) {
    gameInfo.conveyorBelts[idx].group = group;
  }
  if (idx === -1) {
    idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
      gameInfo.musicBoxes[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinate(x, y, gameInfo.pistonsTriggers);
    if (idx >= 0) {
      gameInfo.pistonsTriggers[idx].group = group;
    }
  }
  if (idx === -1) {
    idx = findElementByCoordinate(x, y, gameInfo.pistons);
    if (idx >= 0) {
      gameInfo.pistons[idx].group = group;
    }
  }
  return idx;
}

export function changeIntelligence(gameData, gameInfo, x, y, intelligence) {
  let idx = -1;

  idx = findElementByCoordinate(x, y, gameInfo.redBalls);
  if (idx >= 0) {
    gameInfo.redBalls[idx].smart = intelligence;
    gameData[y][x] = [8, 93, 94][intelligence];
  }
  return idx;
}

export function changePistonInverted(gameInfo, x, y) {
  let idx = -1;

  idx = findElementByCoordinate(x, y, gameInfo.pistons);
  if (idx >= 0) {
    gameInfo.pistons[idx].inverted = !gameInfo.pistons[idx].inverted;
  }
  return idx;
}

export function changePistonMode(gameInfo, x, y, mode) {
  let idx = -1;

  idx = findElementByCoordinate(x, y, gameInfo.pistons);
  if (idx >= 0) {
    gameInfo.pistons[idx].mode = mode;
  }
  return idx;
}

export function changePistonSticky(gameInfo, x, y) {
  let idx = -1;

  idx = findElementByCoordinate(x, y, gameInfo.pistons);
  if (idx >= 0) {
    gameInfo.pistons[idx].sticky = !gameInfo.pistons[idx].sticky;
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
        let element1 = gameData[i][j];
        let element2 = gameData[i + 1][j];

        if ((element2 === 22) && ([2, 4, 8, 9, 40, 93, 94].includes(element1))) {
          // lava
          result.update = true;
          if (gameVars.soundLava !== "never") {
            if (element1 === 2) {
              result.sound = "pain";
            } else {
              if (gameVars.soundLava !== "player") {
                result.sound = "splash1";
              }
            }
          }
          gameData[i][j] = 0;
          switch (element1) {
            case 8:
            case 93:
            case 94:
              idx = findElementByCoordinate(j, i, gameInfo.redBalls);
              if (idx >= 0) {
                gameInfo.redBalls.splice(idx, 1);
              }
              break;
            case 9:
              idx = findElementByCoordinate(j, i, gameInfo.yellowBalls);
              if (idx >= 0) {
                gameInfo.yellowBalls.splice(idx, 1);
              }
              break;
            case 40:
              idx = findElementByCoordinate(j, i, gameInfo.orangeBalls);
              if (idx >= 0) {
                gameInfo.orangeBalls.splice(idx, 1);
              }
              break;
            default:
              break;
          }
        }

        if (j < gameData[i].length - 1) {
          if (
            // wall |\
            element2 === 15 && [2, 4, 8, 40, 93, 94].includes(element1) &&
            gameData[i][j + 1] === 0 && gameData[i + 1][j + 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "downright", true);
              gameData[i][j + 1] = gameData[i][j];
              gameData[i][j] = 0;
            } else {
              moveObject(gameData, gameInfo, j, i, j + 1, i);
            }
          }
        }

        if (j >= 1) {
          if (
            // wall /|
            element2 === 16 && [2, 4, 8, 40, 93, 94].includes(element1) &&
            gameData[i][j - 1] === 0 && gameData[i + 1][j - 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "downleft", true);
              gameData[i][j - 1] = gameData[i][j];
              gameData[i][j] = 0;
            } else {
              moveObject(gameData, gameInfo, j, i, j - 1, i);
            }
          }
        }
      }
    }

    for (let i = gameData.length - 2; i >= 0; i--) {
      for (let j = 0; j < gameData[i].length; j++) {
        let element1 = gameData[i][j];
        let element2 = gameData[i + 1][j];

        forceUp = hasForceUp(gameData, gameInfo, j, i);

        if (element2 === 0 &&
          (([2, 8, 93, 94].includes(element1) && falling(j, i, backData, gameData, gameInfo, gameVars)) ||
            (((element1 === 4) || (element1 === 40)) && !forceUp))) {
          skip = ((element1 === 2) && (gameVars.skipFalling > 0));
          if (skip) {
            gameVars.skipFalling--;
          } else {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "down", true);
              gameData[i + 1][j] = gameData[i][j];
              gameData[i][j] = 0;
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
        let element1 = gameData[i][j];
        let element2 = gameData[i - 1][j];

        if (j < gameData[i].length - 1) {
          if (
            // wall |/
            element2 === 17 && [2, 4, 8, 40, 93, 94].includes(element1) &&
            gameData[i][j + 1] === 0 && gameData[i - 1][j + 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "upright", true);
              gameData[i][j + 1] = gameData[i][j];
              gameData[i][j] = 0;
            } else {
              moveObject(gameData, gameInfo, j, i, j + 1, i);
            }
          }
        }

        if (j >= 1) {
          if (
            // wall \|
            element2 === 18 && [2, 4, 8, 40, 93, 94].includes(element1) &&
            gameData[i][j - 1] === 0 && gameData[i - 1][j - 1] === 0 && !inWater(j, i, backData) &&
            (!gameInfo.hasPropeller || (element1 !== 2))
          ) {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "upleft", true);
              gameData[i][j - 1] = gameData[i][j];
              gameData[i][j] = 0;
            } else {
              moveObject(gameData, gameInfo, j, i, j - 1, i);
            }
          }
        }
      }
    }

    for (let i = 1; i <= gameData.length - 1; i++) {
      for (let j = 0; j < gameData[i].length; j++) {
        let element1 = gameData[i][j];
        let element2 = gameData[i - 1][j];

        forceDown = hasForceDown(gameData, gameInfo, j, i);

        if (element2 === 0 &&
          (([2, 8, 93, 94].includes(element1) && falling(j, i, backData, gameData, gameInfo, gameVars)) ||
            (((element1 === 4) || (element1 === 40)) && !forceDown))) {
          skip = ((element1 === 2) && (gameVars.skipFalling > 0));
          if (skip) {
            gameVars.skipFalling--;
          } else {
            result.update = true;
            if (element1 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "up", true);
              gameData[i - 1][j] = gameData[i][j];
              gameData[i][j] = 0;
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

export function findElementByCoordinate(x, y, elements) {
  let result = -1;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].x === x && elements[i].y === y) {
      result = i;
    }
  }
  return result;
}

export function freeToSwim(x1, x2, y, gameData) {
  let found = false;

  if (y >= 0 && y < gameData.length && x1 !== x2) {
    if (x2 > x1) {
      for (let i = x1 + 1; i < x2; i++) {
        if (gameData[y][i] !== 0) {
          found = true;
        }
      }
    } else {
      for (let i = x2 + 1; i < x1; i++) {
        if (gameData[y][i] !== 0) {
          found = true;
        }
      }
    }
  }
  return !found;
}

export function hasWeight(backData, gameData, gameInfo, xmin, xmax, y, pushingDown) {
  let weight = false;
  let result = false;

  if (y > 0) {
    for (let i = xmin; i <= xmax; i++) {
      const el = gameData[y - 1][i];
      weight = [2, 4, 8, 40, 93, 94].includes(el);
      if (!pushingDown || (i !== gameInfo.blueBall.x) || ((y - 1) !== gameInfo.blueBall.y)) {
        if ((el === 2) && !hasForceDown(gameData, gameInfo, i, y - 1)) {
          if (gameInfo.hasPropeller || [20, 23, 25, 90, 137].includes(backData[y - 1][i]) || isHorizontalRope(i, y - 2, backData)) {
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

export function falling(x, y, backData, gameData, gameInfo, gameVars) {
  const element = gameData[y][x];
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;

  // Depending on the gravity direction, falling has another meaning

  if (gameVars.gravity === "down") {
    if (y >= gameData.length - 1) {
      return false;
    }

    if ((gameData[y + 1][x] === 0) ||
      ((gameData[y + 1][x] === 15) && (gameData[y + 1][x + 1] === 0) && (gameData[y][x + 1] === 0)) ||
      ((gameData[y + 1][x] === 16) && (gameData[y + 1][x - 1] === 0) && (gameData[y][x - 1] === 0))
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
      ((gameData[y - 1][x] === 17) && (gameData[y - 1][x + 1] === 0) && (gameData[y][x + 1] === 0)) ||
      ((gameData[y - 1][x] === 18) && (gameData[y - 1][x - 1] === 0) && (gameData[y][x - 1] === 0))
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

export function fallingOrRising(x, y, backData, gameData, gameInfo, gameVars) {
  return (falling(x, y, backData, gameData, gameInfo, gameVars) || rising(x, y, gameData, gameInfo, gameVars));
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
      if ([20, 23, 25, 80, 90, 137, 170].includes(data)) {
        rowBackData.push(data);
        rowGameData.push(0);
      } else {
        if (data === 27) {
          // Fish is always in the water
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
    case 171:
      updateObject(gameInfo.conveyorBelts, oldX, oldY, newX, newY);
      break;
    case 178:
      updateObject(gameInfo.movers, oldX, oldY, newX, newY);
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

  for (let i = 0; i < gameInfo.forces.length; i++) {
    refs.push(gameInfo.forces[i]);
  }

  for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
    refs.push(gameInfo.horizontalElevators[i]);
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

  for (let i = 0; i < gameInfo.pistons.length; i++) {
    refs.push(gameInfo.pistons[i]);
  }

  for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
    refs.push(gameInfo.pistonsTriggers[i]);
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

function take(gameData, gameInfo, result, x, y) {
  switch (gameData[y][x]) {
    case 0:
      result.sound = "";
      break;
    case 3:
      result.sound = "";
      result.eating = true;
      break;
    case 12:
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
      result.message += "purple ball, moveable gray ball, orange ball, direction changer, time bomb, conveyor belt part, ";
      result.message += "mover";
      break;
    case 156:
      result.slowDownYellow = 250;
      break;
    case 168:
      gameInfo.twoBlue = true;
      result.message = "You are duplicated! By pressing the B key or the S button you can set ";
      result.message += "which one you control."
      break;
    case 179:
      result.message = "The code for the hidden mini series 1 is: " + numberToCode(getHiddenMiniStart());
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

function whiteOrBlue(n) {
  return n === 4 || n === 5;
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
  if (moverCanMoveBlueBall(gameData, gameInfo)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars) || hasForceRight(gameData, gameInfo, x, y)) {
    return result;
  }

  if (x > 0) {
    // empty space, green ball, diving glasses, key etc.
    if (!result.player && (canBeTakenOrIsEmpty().includes(row[x - 1]) ||
      (((row[x - 1] === 12) || (row[x - 1] === 35)) && gameInfo.hasPickaxe))) {
      result.sound = "take";
      take(gameData, gameInfo, result, x - 1, y);
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
    if (!result.player && (whiteOrBlue(row[x - 1]) || (canMoveAlone(row[x - 1]) && (row[x - 1] !== 111))) && row[x - 2] === 0 &&
      !hasForceRight(gameData, gameInfo, x - 1, y)) {
      row[x - 2] = row[x - 1];
      row[x - 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 1;
      switch (row[x - 2]) {
        case 9:
          updateYellowBall(gameInfo.yellowBalls, x - 1, y, x - 2, y, "left");
          break;
        case 40:
          moveOrangeBallInDirection(gameInfo.orangeBalls, x - 1, y, "left", true);
          break;
        case 82:
          row[x - 2] = 83;
          break;
        case 98:
          row[x - 2] = 82;
          break;
        case 109:
        case 110:
        case 112:
          updateObject(gameInfo.forces, x - 1, y, x - 2, y);
          break;
        case 115:
          updateObject(gameInfo.yellowBallPushers, x - 1, y, x - 2, y);
          break;
        case 117:
          idx1 = findElementByCoordinate(x - 1, y, gameInfo.timeBombs);
          if (idx1 >= 0) {
            gameInfo.timeBombs[idx1].x = x - 2;
            gameInfo.timeBombs[idx1].status = getTimeBombsTime();
          }
          break;
        case 171:
          updateObject(gameInfo.conveyorBelts, x - 1, y, x - 2, y);
          break;
        case 178:
          updateObject(gameInfo.movers, x - 1, y, x - 2, y);
          break;
        default:
          break;
      }
      result.player = true;
    }
    if (!result.player && ((row[x - 1] === 11) || ((row[x - 1] === 30) && gameInfo.hasKey)) && row[x - 2] === 0) {
      row[x - 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x - 2;
      result.player = true;
      if (row[x - 1] === 30) {
        result.sound = "unlock";
      }
    }
    if (!result.player && [89, 183, 184, 185].includes(row[x - 1]) && row[x - 2] === 0) {
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
    if (
      !result.player &&
      whiteOrBlue(row[x - 1]) &&
      whiteOrBlue(row[x - 2]) &&
      row[x - 3] === 0
    ) {
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
      idx1 = findElementByCoordinate(x - 1, y, gameInfo.teleports);
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
    const teleport = findElementByCoordinate(x, y, gameInfo.teleports);
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
    if (movePurpleBar(backData, gameData, gameInfo, "left")) {
      result.player = true;
      gameData[y][x - 1] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x - 1;
    }
  }
  if (!result.player && ([122, 123, 124, 125].includes(gameData[y][x - 1]))) {
    if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, "left", -1)) {
      result.player = true;
      gameData[y][x - 1] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.x = x - 1;
    }
  }
  if (!result.player && ([127, 128, 129, 130].includes(gameData[y][x - 1]))) {
    if (moveLightBlueBar(backData, gameData, gameInfo, "left")) {
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
  if (moverCanMoveBlueBall(gameData, gameInfo)) {
    return result;
  }
  if (fallingOrRising(x, y, backData, gameData, gameInfo, gameVars) || hasForceLeft(gameData, gameInfo, x, y)) {
    return result;
  }

  maxX = gameData[0].length - 1;
  if (x < maxX) {
    // empty space, green ball, diving glasses, key etc.
    if (!result.player && (canBeTakenOrIsEmpty().includes(row[x + 1]) ||
      (((row[x + 1] === 12) || (row[x + 1] === 35)) && gameInfo.hasPickaxe))) {
      result.sound = "take";
      take(gameData, gameInfo, result, x + 1, y);
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
    if (!result.player && (whiteOrBlue(row[x + 1]) || (canMoveAlone(row[x + 1]) && (row[x + 1] !== 112))) && row[x + 2] === 0 &&
      !hasForceLeft(gameData, gameInfo, x + 1, y)) {
      row[x + 2] = row[x + 1];
      row[x + 1] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 1;
      switch (row[x + 2]) {
        case 9:
          updateYellowBall(gameInfo.yellowBalls, x + 1, y, x + 2, y, "right");
          break;
        case 40:
          moveOrangeBallInDirection(gameInfo.orangeBalls, x + 1, y, "right", true);
          break;
        case 82:
          row[x + 2] = 83;
          break;
        case 98:
          row[x + 2] = 82;
          break;
        case 109:
        case 110:
        case 111:
          updateObject(gameInfo.forces, x + 1, y, x + 2, y);
          break;
        case 115:
          updateObject(gameInfo.yellowBallPushers, x + 1, y, x + 2, y);
          break;
        case 117:
          idx1 = findElementByCoordinate(x + 1, y, gameInfo.timeBombs);
          if (idx1 >= 0) {
            gameInfo.timeBombs[idx1].x = x + 2;
            gameInfo.timeBombs[idx1].status = getTimeBombsTime();
          }
          break;
        case 171:
          updateObject(gameInfo.conveyorBelts, x + 1, y, x + 2, y);
          break;
        case 178:
          updateObject(gameInfo.movers, x + 1, y, x + 2, y);
          break;
        default:
          break;
      }
      result.player = true;
    }
    if (!result.player && ((row[x + 1] === 10) || ((row[x + 1] === 30) && gameInfo.hasKey)) && row[x + 2] === 0) {
      row[x + 2] = 2;
      row[x] = element;
      gameInfo.blueBall.x = x + 2;
      result.player = true;
      if (row[x + 1] === 30) {
        result.sound = "unlock";
      }
    }
    if (!result.player && [89, 183, 184, 185].includes(row[x + 1]) && row[x + 2] === 0) {
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
    if (!result.player && whiteOrBlue(row[x + 1]) && whiteOrBlue(row[x + 2]) && row[x + 3] === 0) {
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
      idx1 = findElementByCoordinate(x + 1, y, gameInfo.teleports);
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
    const teleport = findElementByCoordinate(x, y, gameInfo.teleports);
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
    if (movePurpleBar(backData, gameData, gameInfo, "right")) {
      result.player = true;
      gameData[y][x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      gameData[y][x] = element;
    }
  }
  if (!result.player && ([121, 123, 124, 125].includes(gameData[y][x + 1]))) {
    if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, "right", -1)) {
      result.player = true;
      gameData[y][x + 1] = 2;
      gameInfo.blueBall.x = x + 1;
      gameData[y][x] = element;
    }
  }
  if (!result.player && ([126, 128, 129, 130].includes(gameData[y][x + 1]))) {
    if (moveLightBlueBar(backData, gameData, gameInfo, "right")) {
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
  let minY = 0;
  let maxY = 0;
  let oneDirection = 0;
  let idx = -1;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
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
  if (moverCanMoveBlueBall(gameData, gameInfo)) {
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
    // Skip the first time if the blue ball has no coil spring
    if (!result.player && ((i !== 0) || gameInfo.hasCoilSpring)) {
      if ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY))) {
        if (((i !== 0) || ((gameData[y + dy1][x] === 0))) &&
          ((i !== 0) || ((![25, 137, 90].includes(backData[y + dy1][x])) && (![25, 137, 90].includes(backData[y][x])))) &&
          (![80].includes(backData[y + dy2][x]))) {
          if (canBeTakenOrIsEmpty().includes(gameData[y + dy2][x]) ||
            ((i !== 0) && [12, 35].includes(gameData[y - 1][x]) && gameInfo.hasPickaxe)
          ) {
            result.sound = "take";
            take(gameData, gameInfo, result, x, y + dy2);
            if (gameData[y + dy2][x] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            if ((i !== 0) && !gameInfo.hasWeakStone && gameInfo.hasLadder && (gameData[y - 1][x] === 0)) {
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
    if ((canMoveAlone(gameData[y + dy1][x]) && (gameData[y + dy1][x] !== 110)) && gameData[y + dy2][x] === 0 &&
      !hasForceDown(gameData, gameInfo, x, y + dy1)) {
      gameData[y + dy2][x] = gameData[y + dy1][x];
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      switch (gameData[y + dy2][x]) {
        case 9:
          updateYellowBall(gameInfo.yellowBalls, x, y + dy1, x, y + dy2, direction);
          break;
        case 82:
          gameData[y + dy2][x] = 83;
          break;
        case 98:
          gameData[y + dy2][x] = 82;
          break;
        case 109:
        case 111:
        case 112:
          updateObject(gameInfo.forces, x, y + dy1, x, y + dy2);
          break;
        case 115:
          updateObject(gameInfo.yellowBallPushers, x, y + dy1, x, y + dy2);
          break;
        case 117:
          idx = findElementByCoordinate(x, y + dy1, gameInfo.timeBombs);
          if (idx >= 0) {
            gameInfo.timeBombs[idx].y = y + dy2;
            gameInfo.timeBombs[idx].status = getTimeBombsTime();
          }
          break;
        case 171:
          updateObject(gameInfo.conveyorBelts, x, y + dy1, x, y + dy2);
          break;
        case 178:
          updateObject(gameInfo.movers, x, y + dy1, x, y + dy2);
          break;
        default:
          break;
      }
      result.player = true;
    }
    if (
      !result.player &&
      gameData[y + dy1][x] === oneDirection &&
      gameData[y + dy2][x] === 0
    ) {
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
    if (!result.player && ([100, 101, 102, 104].includes(gameData[y + dy1][x]))) {
      if (movePurpleBar(backData, gameData, gameInfo, direction)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
    if (!result.player && ([121, 122, 123, 125].includes(gameData[y + dy1][x]))) {
      if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, direction, -1)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
    if (!result.player && ([126, 127, 128, 130].includes(gameData[y + dy1][x]))) {
      if (moveLightBlueBar(backData, gameData, gameInfo, direction)) {
        result.player = true;
        gameData[y + dy1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + dy1;
      }
    }
  }
  return result;
}

export function jumpLeftOrRight(backData, gameData, gameInfo, gameVars, direction) {
  let dx = 0;
  let dy1 = 0;
  let dy2 = 0;
  let minY = 0;
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
  if (moverCanMoveBlueBall(gameData, gameInfo)) {
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
      break;
    case "right":
      dx = 1;
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
    // Skip the first time if the blue ball has no coil spring
    if (!result.player && ((i !== 0) || gameInfo.hasCoilSpring)) {
      if ((x > 0) && ((gravityDown && (y >= minY)) || (gravityUp && (y <= maxY)))) {
        if ((gameData[y + dy1][x] === 0) && (gameData[y + dy2][x] === 0) && ![80].includes(backData[y + dy2][x + dx])) {
          if (canBeTakenOrIsEmpty().includes(gameData[y + dy2][x + dx])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x + dx, y + dy2);
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
  }
  return result;
}

export function pushObject(backData, gameData, gameInfo, gameVars) {
  let direction = "";
  let dy1 = 0;
  let dy2 = 0;
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

  if ((gravityUp && (y >= minY) && !hasForceDown(gameData, gameInfo, x, y)) || (gravityDown && (y <= maxY) && !hasForceUp(gameData, gameInfo, x, y))) {
    if (!result.player && (canMoveAlone(gameData[y + dy1][x]) && ![109, 178].includes(gameData[y + dy1][x])) && gameData[y + dy2][x] === 0 &&
      !hasForceUp(gameData, gameInfo, x, y + dy1)) {
      gameData[y + dy2][x] = gameData[y + dy1][x];
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      switch (gameData[y + dy2][x]) {
        case 9:
          updateYellowBall(gameInfo.yellowBalls, x, y + dy1, x, y + dy2, direction);
          break;
        case 82:
          gameData[y + dy2][x] = 83;
          break;
        case 98:
          gameData[y + dy2][x] = 82;
          break;
        case 110:
        case 111:
        case 112:
          updateObject(gameInfo.forces, x, y + dy1, x, y + dy2);
          break;
        case 115:
          updateObject(gameInfo.yellowBallPushers, x, y + dy1, x, y + dy2);
          break;
        case 117:
          idx = findElementByCoordinate(x, y + dy1, gameInfo.timeBombs);
          if (idx >= 0) {
            gameInfo.timeBombs[idx].y = y + dy2;
            gameInfo.timeBombs[idx].status = getTimeBombsTime();
          }
          break;
        case 171:
          updateObject(gameInfo.conveyorBelts, x, y + dy1, x, y + dy2);
          break;
        default:
          break;
      }
      result.player = true;
    }
    if (
      !result.player &&
      gameData[y + dy1][x] === oneDirection &&
      gameData[y + dy2][x] === 0
    ) {
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
    if (y > 0) {
      if (!result.player && (gameData[y + dy1][x] === 0) && (backData[y - dy1][x] === 80)) {
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
    if (!result.player && ((gameData[y + dy1][x] === 12) || (gameData[y + dy1][x] === 35)) && gameInfo.hasPickaxe) {
      gameData[y + dy1][x] = 2;
      gameData[y][x] = element;
      gameInfo.blueBall.y = y + dy1;
      result.player = true;
      result.sound = "pickaxe";
    }
    if (!result.player && ([100, 101, 102, 103].includes(gameData[y + dy1][x]))) {
      if (movePurpleBar(backData, gameData, gameInfo, direction)) {
        // Blue ball is updated in movePurpleBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    if (!result.player && ([121, 122, 123, 124].includes(gameData[y + dy1][x]))) {
      if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, direction, -1)) {
        // Blue ball is updated in moveYellowBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    if (!result.player && ([126, 127, 128, 129].includes(gameData[y + dy1][x]))) {
      if (moveLightBlueBar(backData, gameData, gameInfo, direction)) {
        // Blue ball is updated in moveLightBlueBar when moving down
        result.player = true;
        if (gameData[y][x] === 0) {
          gameData[y][x] = element;
        }
      }
    }
    if (!result.player && [37, 116, 131, 136, 158].includes(gameData[y + dy1][x])) {
      if (!hasWeight(backData, gameData, gameInfo, x, x, y + dy1, false)) {
        result.player = true;
        switch (gameData[y + dy1][x]) {
          case 37:
            info = checkDetonator(backData, gameData, gameInfo, true);
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
  if (moverCanMoveBlueBall(gameData, gameInfo)) {
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
}



