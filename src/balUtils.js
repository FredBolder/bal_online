import { secretSeriesCodePart } from "./codes.js";
import { checkDetonator } from "./detonator.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { moveLightBlueBar } from "./lightBlueBar.js";
import { moveOrangeBallInDirection } from "./orangeBalls.js";
import { checkPistonsTriggers } from "./pistons.js";
import { movePurpleBar } from "./purpleBar.js";
import { updateYellowBall } from "./yellowBalls.js";
import { moveYellowBar } from "./yellowBars.js";
import { checkYellowPauser } from "./yellowPauser.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStopper } from "./yellowStopper.js";

const timeBombsTime = 100;

function canMoveAlone(n) {
  // Object that can move, but not together with another object
  return [9, 28, 40, 82, 84, 85, 86, 98, 109, 110, 111, 112, 115, 117, 138, 139, 155].includes(n);
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
    case "|":
      result = 1000;
      break;
    default:
      result = -1;
      break;
  }
  return result;
}

export function checkFalling(backData, gameData, gameInfo, gameVars) {
  let forceUp = false;
  let idx = -1;
  let skip = false;
  let result = {};
  result.update = false;
  result.sound = "";

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
            moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "rightDown", true);
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
            moveOrangeBallInDirection(gameInfo.orangeBalls, j, i, "leftDown", true);
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
        (([2, 8, 93, 94].includes(element1) && falling(j, i, backData, gameData, gameInfo, element1)) ||
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

export function getTimeBombsTime() {
  return timeBombsTime;
}

export function hasWeight(backData, gameData, gameInfo, xmin, xmax, y, pushingDown) {
  let weight = false;
  let result = false;

  if (y > 0) {
    for (let i = xmin; i <= xmax; i++) {
      const el = gameData[y - 1][i];
      weight = [2, 4, 8, 40, 93, 94].includes(el);
      if (!pushingDown) {
        if ((el === 2) && !hasForceDown(gameData, gameInfo, i, y - 1)) {
          if (gameInfo.hasPropeller || [25, 90, 137].includes(backData[y - 1][i]) || isHorizontalRope(i, y - 2, backData)) {
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

function isTeleport(x, y, teleports) {
  let result = false;

  for (let i = 0; i < teleports.length; i++) {
    if (teleports[i].x === x && teleports[i].y === y) {
      result = true;
    }
  }
  return result;
}

function isTravelGate(x, y, travelGate) {
  return ((x === travelGate.x) && (y === travelGate.y));
}

export function falling(x, y, backData, gameData, gameInfo, element = 2) {
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;

  if (gameData[y + 1][x] === 0) {
    result = true;
    // ladder
    if ([2].includes(element) && (isLadder(x, y, backData) || isLadder(x, y + 1, backData))) {
      result = false;
    }
    // teleport
    if ([2].includes(element) && isTeleport(x, y, gameInfo.teleports)) {
      result = false;
    }
    // Water
    if ([2].includes(element) && inWater(x, y, backData)) {
      result = false;
    }
    // Rope
    if ([2].includes(element) && ((backData[y + 1][x] === 80) || (backData[y - 1][x] === 80) ||
      (backData[y][x] === 137))) {
      result = false;
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
  return result;
}

export function fallingOrRising(x, y, backData, gameData, gameInfo, element = 2) {
  return (falling(x, y, backData, gameData, gameInfo, element) || rising(x, y, gameData, gameInfo));
}

export function rising(x, y, gameData, gameInfo) {
  let forceDown = hasForceDown(gameData, gameInfo, x, y);
  let forceUp = hasForceUp(gameData, gameInfo, x, y);
  let result = false;

  if ((gameData[y - 1][x] === 0) && forceUp && !forceDown) {
    result = true;
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
        if ([133, 134, 135].includes(data)) {
          data = 0;
        }
      }
      if ([20, 23, 25, 80, 90, 137].includes(data)) {
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
      for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
        const orangeBall = gameInfo.orangeBalls[i];
        if ((orangeBall.x === oldX) && (orangeBall.y === oldY)) {
          orangeBall.x = newX;
          orangeBall.y = newY;
          orangeBall.direction = "none";
        }
      }
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
      updateObject(gameInfo.timeBombs, oldX, oldY, newX, newY);
      break;
    default:
      break;
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
      result.message = "You have now telekinetic power! By pressing the ! key or the ! button you can move the ";
      result.message += "following objects that are close to you (one at the time): white ball, light blue ball, yellow ball, "
      result.message += "purple ball, moveable gray ball, orange ball, direction changer, time bomb";
      break;
    case 156:
      result.slowDownYellow = 250;
      break;
    case 168:
      gameInfo.twoBlue = true;
      result.message = "You are duplicated! By pressing the ! key or the ! button you can set ";
      result.message += "which one you control."
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

export function moveLeft(backData, gameData, gameInfo) {
  let idx = -1;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  let row = gameData[y];
  result.eating = false;
  result.freezeTime = -1;
  result.gateTravelling = false;
  result.player = false;
  result.teleporting = false;
  result.rotate = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length > 0) {
    if (!fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceRight(gameData, gameInfo, x, y)) {
      if (x > 0) {
        // empty space, green ball, diving glasses, key etc.
        if (!result.player && ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(row[x - 1]) ||
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
              idx = findElementByCoordinate(x - 1, y, gameInfo.timeBombs);
              if (idx >= 0) {
                gameInfo.timeBombs[idx].x = x - 2;
                gameInfo.timeBombs[idx].status = timeBombsTime;
              }
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
        if (!result.player && row[x - 1] === 89 && row[x - 2] === 0) {
          row[x - 2] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x - 2;
          result.player = true;
          result.rotate = true;
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
          row[x - 1] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x - 1;
          result.player = true;
          result.teleporting = true;
        }
      }
      if (result.player) {
        const teleport = findElementByCoordinate(x, y, gameInfo.teleports);
        if (teleport >= 0) {
          if (gameInfo.teleports[teleport].selfDestructing) {
            row[x] = 0;
          } else {
            row[x] = 31;
          }
        }
      }
      if (!result.player && x > 0) {
        if (row[x - 1] === 132) {
          row[x - 1] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x - 1;
          result.player = true;
          result.gateTravelling = true;
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
    }
  }
  return result;
}

export function moveRight(backData, gameData, gameInfo) {
  let idx = -1;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  let row = gameData[y];
  let maxX = 0;
  result.eating = false;
  result.freezeTime = -1;
  result.gateTravelling = false;
  result.player = false;
  result.teleporting = false;
  result.rotate = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length > 0) {
    if (!fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceLeft(gameData, gameInfo, x, y)) {
      maxX = gameData[0].length - 1;
      if (x < maxX) {
        // empty space, green ball, diving glasses, key etc.
        if (!result.player && ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(row[x + 1]) ||
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
              idx = findElementByCoordinate(x + 1, y, gameInfo.timeBombs);
              if (idx >= 0) {
                gameInfo.timeBombs[idx].x = x + 2;
                gameInfo.timeBombs[idx].status = timeBombsTime;
              }
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
        if (!result.player && row[x + 1] === 89 && row[x + 2] === 0) {
          row[x + 2] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x + 2;
          result.player = true;
          result.rotate = true;
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
          row[x + 1] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x + 1;
          result.player = true;
          result.teleporting = true;
        }
      }
      if (result.player) {
        const teleport = findElementByCoordinate(x, y, gameInfo.teleports);
        if (teleport >= 0) {
          if (gameInfo.teleports[teleport].selfDestructing) {
            row[x] = 0;
          } else {
            row[x] = 31;
          }
        }
      }
      if (!result.player && x > 0) {
        if (row[x + 1] === 132) {
          row[x + 1] = 2;
          row[x] = element;
          gameInfo.blueBall.x = x + 1;
          result.player = true;
          result.gateTravelling = true;
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
    }
  }
  return result;
}

export function jump(backData, gameData, gameInfo) {
  let idx = -1;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0) {
      if (gameInfo.hasCoilSpring && (y > 1) && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if ((gameData[y - 1][x] === 0) && (![25, 137, 90].includes(backData[y - 1][x])) && (![25, 137, 90].includes(backData[y][x])) && (![80].includes(backData[y - 2][x]))) {
          if ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 2][x])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x, y - 2);
            if (gameData[y - 2][x] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            gameData[y - 2][x] = 2;
            gameInfo.blueBall.x = x;
            gameInfo.blueBall.y = y - 2;
            result.player = true;
          }
        }
      }
      if (!result.player && (y > 0) && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if (![80].includes(backData[y - 1][x])) {
          if (([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 1][x]) ||
            (((gameData[y - 1][x] === 12) || (gameData[y - 1][x] === 35)) && gameInfo.hasPickaxe))) {
            result.sound = "take";
            take(gameData, gameInfo, result, x, y - 1);
            if (gameData[y - 1][x] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            if (!gameInfo.hasWeakStone && gameInfo.hasLadder && (gameData[y - 1][x] === 0)) {
              backData[y][x] = 25;
            }
            gameData[y - 1][x] = 2;
            gameInfo.blueBall.y = y - 1;
            result.player = true;
          }
        }
      }
      if (!result.player && y > 1 && !fallingOrRising(x, y, backData, gameData, gameInfo)) {
        if ((canMoveAlone(gameData[y - 1][x]) && (gameData[y - 1][x] !== 110)) && gameData[y - 2][x] === 0 &&
          !hasForceDown(gameData, gameInfo, x, y - 1)) {
          gameData[y - 2][x] = gameData[y - 1][x];
          gameData[y - 1][x] = 2;
          gameData[y][x] = element;
          gameInfo.blueBall.y = y - 1;
          switch (gameData[y - 2][x]) {
            case 9:
              updateYellowBall(gameInfo.yellowBalls, x, y - 1, x, y - 2, "up");
              break;
            case 82:
              gameData[y - 2][x] = 83;
              break;
            case 98:
              gameData[y - 2][x] = 82;
              break;
            case 109:
            case 111:
            case 112:
              updateObject(gameInfo.forces, x, y - 1, x, y - 2);
              break;
            case 115:
              updateObject(gameInfo.yellowBallPushers, x, y - 1, x, y - 2);
              break;
            case 117:
              idx = findElementByCoordinate(x, y - 1, gameInfo.timeBombs);
              if (idx >= 0) {
                gameInfo.timeBombs[idx].y = y - 2;
                gameInfo.timeBombs[idx].status = timeBombsTime;
              }
              break;
            default:
              break;
          }
          result.player = true;
        }
        if (
          !result.player &&
          gameData[y - 1][x] === 87 &&
          gameData[y - 2][x] === 0
        ) {
          gameData[y - 2][x] = 2;
          gameData[y][x] = element;
          gameInfo.blueBall.y = y - 2;
          result.player = true;
        }
        // Horizontal rope
        if (!result.player && (gameData[y - 1][x] === 0) && (gameData[y - 2][x] === 0) && (backData[y - 1][x] === 80)) {
          gameData[y - 2][x] = 2;
          gameData[y][x] = element;
          gameInfo.blueBall.y = y - 2;
          result.player = true;
        }
        if (!result.player && ([100, 101, 102, 104].includes(gameData[y - 1][x]))) {
          if (movePurpleBar(backData, gameData, gameInfo, "up")) {
            result.player = true;
            gameData[y - 1][x] = 2;
            gameData[y][x] = element;
            gameInfo.blueBall.y = y - 1;
          }
        }
        if (!result.player && ([121, 122, 123, 125].includes(gameData[y - 1][x]))) {
          if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, "up", -1)) {
            result.player = true;
            gameData[y - 1][x] = 2;
            gameData[y][x] = element;
            gameInfo.blueBall.y = y - 1;
          }
        }
        if (!result.player && ([126, 127, 128, 130].includes(gameData[y - 1][x]))) {
          if (moveLightBlueBar(backData, gameData, gameInfo, "up")) {
            result.player = true;
            gameData[y - 1][x] = 2;
            gameData[y][x] = element;
            gameInfo.blueBall.y = y - 1;
          }
        }
      }
    }
  }
  return result;
}

export function jumpLeft(backData, gameData, gameInfo) {
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0) {
      if (gameInfo.hasCoilSpring && y > 1 && x > 0 && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if ((gameData[y - 1][x] === 0) && (gameData[y - 2][x] === 0) && (![80].includes(backData[y - 2][x - 1]))) {
          if ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 2][x - 1])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x - 1, y - 2);
            if (gameData[y - 2][x - 1] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            gameData[y - 2][x - 1] = 2;
            gameInfo.blueBall.x = x - 1;
            gameInfo.blueBall.y = y - 2;
            result.player = true;
          }
        }
      }
      if (!result.player && y > 0 && x > 0 && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if ((gameData[y - 1][x] === 0) && (![80].includes(backData[y - 1][x - 1]))) {
          if ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 1][x - 1])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x - 1, y - 1);
            if (gameData[y - 1][x - 1] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            gameData[y - 1][x - 1] = 2;
            gameInfo.blueBall.x = x - 1;
            gameInfo.blueBall.y = y - 1;
            result.player = true;
          }
        }
      }
    }
  }
  return result;
}

export function jumpRight(backData, gameData, gameInfo) {
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.eating = false;
  result.freezeTime = -1;
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0) {
      if (gameInfo.hasCoilSpring && y > 1 && x < gameData[0].length - 1 && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if ((gameData[y - 1][x] === 0) && (gameData[y - 2][x] === 0) && (![80].includes(backData[y - 2][x + 1]))) {
          if ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 2][x + 1])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x + 1, y - 2);
            if (gameData[y - 2][x + 1] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            gameData[y - 2][x + 1] = 2;
            gameInfo.blueBall.x = x + 1;
            gameInfo.blueBall.y = y - 2;
            result.player = true;
          }
        }
      }
      if (!result.player && y > 0 && x < gameData[0].length - 1 && !fallingOrRising(x, y, backData, gameData, gameInfo) && !hasForceDown(gameData, gameInfo, x, y)) {
        if ((gameData[y - 1][x] === 0) && (![80].includes(backData[y - 1][x + 1]))) {
          if ([0, 3, 26, 29, 34, 81, 99, 105, 108, 118, 120, 133, 134, 135, 140, 156, 168].includes(gameData[y - 1][x + 1])) {
            result.sound = "take";
            take(gameData, gameInfo, result, x + 1, y - 1);
            if (gameData[y - 1][x + 1] === 168) {
              gameData[y][x] = 2;
              gameInfo.blueBall2.x = gameInfo.blueBall1.x;
              gameInfo.blueBall2.y = gameInfo.blueBall1.y;
            } else {
              gameData[y][x] = element;
            }
            gameData[y - 1][x + 1] = 2;
            gameInfo.blueBall.x = x + 1;
            gameInfo.blueBall.y = y - 1;
            result.player = true;
          }
        }
      }
    }
  }
  return result;
}

export function pushDown(backData, gameData, gameInfo, gameVars) {
  let idx = -1;
  let info = null;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!gameVars) {
    return null;
  }
  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0 && y < gameData.length - 2 && !hasForceUp(gameData, gameInfo, x, y)) {
      if (!result.player && (canMoveAlone(gameData[y + 1][x]) && (gameData[y + 1][x] !== 109)) && gameData[y + 2][x] === 0 &&
        !hasForceUp(gameData, gameInfo, x, y + 1)) {
        gameData[y + 2][x] = gameData[y + 1][x];
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 1;
        switch (gameData[y + 2][x]) {
          case 9:
            updateYellowBall(gameInfo.yellowBalls, x, y + 1, x, y + 2, "down");
            break;
          case 82:
            gameData[y + 2][x] = 83;
            break;
          case 98:
            gameData[y + 2][x] = 82;
            break;
          case 110:
          case 111:
          case 112:
            updateObject(gameInfo.forces, x, y + 1, x, y + 2);
            break;
          case 115:
            updateObject(gameInfo.yellowBallPushers, x, y + 1, x, y + 2);
            break;
          case 117:
            idx = findElementByCoordinate(x, y + 1, gameInfo.timeBombs);
            if (idx >= 0) {
              gameInfo.timeBombs[idx].y = y + 2;
              gameInfo.timeBombs[idx].status = timeBombsTime;
            }
            break;
          default:
            break;
        }
        result.player = true;
      }
      if (
        !result.player &&
        gameData[y + 1][x] === 88 &&
        gameData[y + 2][x] === 0
      ) {
        gameData[y + 2][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 2;
        result.player = true;
      }

      // Horizontal rope
      if (!result.player && (gameData[y + 1][x] === 0) && (gameData[y + 2][x] === 0) && (backData[y + 1][x] === 80)) {
        gameData[y + 2][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 2;
        result.player = true;
      }
      if (!result.player && (gameData[y + 1][x] === 0) && (backData[y - 1][x] === 80)) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 1;
        result.player = true;
      }

      if (
        !result.player &&
        gameData[y + 1][x] === 0 &&
        (inWater(x, y, backData) ||
          [25, 90, 137].includes(backData[y][x]) ||
          [25, 90].includes(backData[y + 1][x]) ||
          gameInfo.hasPropeller)
      ) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 1;
        result.player = true;
      }
      if (!result.player && ((gameData[y + 1][x] === 12) || (gameData[y + 1][x] === 35)) && gameInfo.hasPickaxe) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.y = y + 1;
        result.player = true;
        result.sound = "pickaxe";
      }
      if (!result.player && ([100, 101, 102, 103].includes(gameData[y + 1][x]))) {
        if (movePurpleBar(backData, gameData, gameInfo, "down")) {
          // Blue ball is updated in movePurpleBar when moving down
          result.player = true;
          if (gameData[y][x] === 0) {
            gameData[y][x] = element;
          }
        }
      }
      if (!result.player && ([121, 122, 123, 124].includes(gameData[y + 1][x]))) {
        if (moveYellowBar(gameInfo.blueBall.x, gameInfo.blueBall.y, backData, gameData, gameInfo, "down", -1)) {
          // Blue ball is updated in moveYellowBar when moving down
          result.player = true;
          if (gameData[y][x] === 0) {
            gameData[y][x] = element;
          }
        }
      }
      if (!result.player && ([126, 127, 128, 129].includes(gameData[y + 1][x]))) {
        if (moveLightBlueBar(backData, gameData, gameInfo, "down")) {
          // Blue ball is updated in moveLightBlueBar when moving down
          result.player = true;
          if (gameData[y][x] === 0) {
            gameData[y][x] = element;
          }
        }
      }
      if (!result.player && [37, 116, 131, 136, 158].includes(gameData[y + 1][x])) {
        if (!hasWeight(backData, gameData, gameInfo, x, x, y + 1, false)) {
          result.player = true;
          switch (gameData[y + 1][x]) {
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
              checkYellowStopper(backData, gameData, gameInfo, gameVars, true);
              break;
            case 136:
              checkYellowPauser(backData, gameData, gameInfo, gameVars, true);
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
  }
  return result;
}

export function moveDownLeft(backData, gameData, gameInfo) {
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x - 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        (inWater(x, y, backData) || gameInfo.hasPropeller)
      ) {
        gameData[y + 1][x - 1] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.x = x - 1;
        gameInfo.blueBall.y = y + 1;
        result.player = true;
      }
    }
  }
  return result;
}

export function moveDownRight(backData, gameData, gameInfo) {
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;
  let result = {};
  result.player = false;
  result.sound = "";
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports) && !isTravelGate(x, y, gameInfo.travelGate)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x + 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        (inWater(x, y, backData) || gameInfo.hasPropeller)
      ) {
        gameData[y + 1][x + 1] = 2;
        gameData[y][x] = element;
        gameInfo.blueBall.x = x + 1;
        gameInfo.blueBall.y = y + 1;
        result.player = true;
      }
    }
  }
  return result;
}


