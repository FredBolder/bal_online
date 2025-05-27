import { randomInt } from "./utils";

function canMoveAlone(n) {
  // Object that can move, but not together with another object
  return [9, 28, 82, 84, 85, 86, 98].includes(n);
}

export function hasForceUp(gameData, gameInfo, x, y) {
  let result = false;

  for (let i = 0; i < gameInfo.forces.length; i++) {
    const force = gameInfo.forces[i];
    if ((force.direction === 8) && (force.x === x) && (force.y > y)) {
      result = true;
      if (force.y > y + 1) {
        for (let j = y + 1; j < force.y; j++) {
          const element = gameData[j][x];
          if (![0].includes(element)) {
            result = false;
          }
        }
      }
    }
  }
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

export function findElementByCoordinate(x, y, elements) {
  let result = -1;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].x === x && elements[i].y === y) {
      result = i;
    }
  }
  return result;
}

export function inWater(x, y, backData) {
  let result = [20, 23].includes(backData[y][x]);
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

function isRedBall(element) {
  return [8, 93, 94].includes(element);
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

function notInAir(x, y, backData, gameData, gameInfo) {
  return (
    gameData[y + 1][x] !== 0 ||
    isLadder(x, y, backData) ||
    isLadder(x, y + 1, backData) ||
    inWater(x, y, backData) ||
    ((gameData[y - 1][x] !== 0) && hasForceUp(gameData, gameInfo, x, y))
  );
}

function charToNumber(c) {
  let result = 0;

  switch (c) {
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
    case "V":
      result = 22;
      break;
    case "w":
      result = 23;
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
    case "|":
      result = 1000;
      break;
    default:
      result = 0;
      break;
  }
  return result;
}

function numberToChar(n) {
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
    case 22:
      result = "V";
      break;
    case 23:
      result = "w";
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
    case 1000:
      // For manual only
      result = "|";
      break;
    default:
      result = " ";
      break;
  }
  return result;
}

export function stringArrayToNumberArray(arr) {
  let result = { backData: [], gameData: [] };
  let data = 0;

  for (let i = 0; i < arr.length; i++) {
    const rowBackData = [];
    const rowGameData = [];
    for (let j = 0; j < arr[i].length; j++) {
      data = charToNumber(arr[i][j]);
      if ([20, 23, 25, 90].includes(data)) {
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

function updateRed(redBalls, x1, y1, x2, y2) {
  for (let i = 0; i < redBalls.length; i++) {
    if (redBalls[i].x === x1 && redBalls[i].y === y1) {
      redBalls[i].x = x2;
      redBalls[i].y = y2;
    }
  }
}

function updateYellow(yellowBalls, x1, y1, x2, y2, direction) {
  for (let i = 0; i < yellowBalls.length; i++) {
    if (yellowBalls[i].x === x1 && yellowBalls[i].y === y1) {
      yellowBalls[i].x = x2;
      yellowBalls[i].y = y2;
      yellowBalls[i].direction = direction;
    }
  }
}

export function checkCopiers(arr, gameInfo) {
  let element = 0;
  let idx = -1;
  let info = { updated: false };
  let redBall1 = null;
  let redBall2 = null;
  let x = 0;

  for (let i = 0; i < gameInfo.copiers.length; i++) {
    const copier = gameInfo.copiers[i];
    redBall1 = null;
    redBall2 = null;
    if ((copier.x > 2) && (copier.x < (arr[0].length - 2))) {
      element = arr[copier.y - 1][copier.x];
      if (([4, 93, 94].includes(element)) && (arr[copier.y][copier.x - 1] === 0) && (arr[copier.y][copier.x + 1] === 0)) {
        info.updated = true;
        arr[copier.y - 1][copier.x] = 0;
        if (arr[copier.y][copier.x - 2] === 0) {
          x = copier.x - 2;
        } else {
          x = copier.x - 1;
        }
        arr[copier.y][x] = element;
        if ([93, 94].includes(element)) {
          idx = findElementByCoordinate(copier.x, copier.y - 1, gameInfo.redBalls);
          if (idx >= 0) {
            redBall1 = gameInfo.redBalls[idx];
            redBall1.x = x;
            redBall1.y = copier.y;
            redBall1.direction = "none";
            redBall1.skipElevatorCount = 0;
            redBall1.skipFollowCount = 0;
          }
        }
        if (arr[copier.y][copier.x + 2] === 0) {
          x = copier.x + 2;
        } else {
          x = copier.x + 1;
        }
        arr[copier.y][x] = element;
        if ([93, 94].includes(element)) {
          redBall2 = {};
          if (element === 94) {
            redBall2.smart = 2;
          } else {
            redBall2.smart = 1;
          }
          redBall2.x = x;
          redBall2.y = copier.y;
          redBall2.direction = "none";
          redBall2.skipElevatorCount = 0;
          redBall2.skipFollowCount = 0;
          gameInfo.redBalls.push(redBall2);
        }
      }
    }
  }
  return info;
}

export function checkDetonator(arr, x, y) {
  let info = { updated: false, explosion: false };
  let detonator = false;

  if (y > 0) {
    detonator = [2, 4, 8, 9].includes(arr[y - 1][x]);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 36 && detonator) {
          info.explosion = true;
          info.updated = true;
          arr[i][j] = 38;
        } else if (arr[i][j] === 38) {
          info.updated = true;
          arr[i][j] = 0;
        }
      }
    }
  }
  return info;
}

export function checkFalling(backData, gameData, gameInfo) {
  let forceUp = false;
  let result = {};
  result.update = false;
  result.ballX = -1;
  result.ballY = -1;
  result.sound = 0;

  for (let i = gameData.length - 2; i >= 0; i--) {
    for (let j = 0; j < gameData[i].length; j++) {
      let element1 = gameData[i][j];
      let element2 = gameData[i + 1][j];

      if ((element2 === 22) && ([2, 4, 8, 93, 94].includes(element1))) {
        // lava
        result.update = true;
        if (element1 === 2) {
          result.sound = 2;
        } else {
          result.sound = 1;
        }
        gameData[i][j] = 0;
      }

      if (j < gameData[i].length - 1) {
        if (
          // wall |\
          element2 === 15 && [2, 4, 8, 93, 94].includes(element1) &&
          gameData[i][j + 1] === 0 && gameData[i + 1][j + 1] === 0
        ) {
          result.update = true;
          if (element1 === 2) {
            result.ballX = j + 1;
            result.ballY = i;
          }
          if (isRedBall(element1)) {
            updateRed(gameInfo.redBalls, j, i, j + 1, i);
          }
          gameData[i][j + 1] = gameData[i][j];
          gameData[i][j] = 0;
        }
      }

      if (j >= 1) {
        if (
          // wall /|
          element2 === 16 && [2, 4, 8, 93, 94].includes(element1) &&
          gameData[i][j - 1] === 0 && gameData[i + 1][j - 1] === 0
        ) {
          result.update = true;
          if (element1 === 2) {
            result.ballX = j - 1;
            result.ballY = i;
          }
          if (isRedBall(element1)) {
            updateRed(gameInfo.redBalls, j, i, j - 1, i);
          }
          gameData[i][j - 1] = gameData[i][j];
          gameData[i][j] = 0;
        }
      }
    }
  }

  for (let i = gameData.length - 2; i >= 0; i--) {
    for (let j = 0; j < gameData[i].length; j++) {
      let element1 = gameData[i][j];
      let element2 = gameData[i + 1][j];

      forceUp = hasForceUp(gameData, gameInfo, j, i);

      if (
        element2 === 0 &&
        (([2, 8, 93, 94].includes(element1) &&
          !isLadder(j, i, backData) &&
          !isLadder(j, i + 1, backData) &&
          !inWater(j, i, backData) &&
          !forceUp
        ) ||
          ((element1 === 4) && !forceUp))
      ) {
        result.update = true;
        if (element1 === 2) {
          result.ballX = j;
          result.ballY = i + 1;
        }
        if (isRedBall(element1)) {
          updateRed(gameInfo.redBalls, j, i, j, i + 1);
        }
        if (!inWater(j, i, backData) && inWater(j, i + 1, backData)) {
          result.sound = 1;
        }
        gameData[i + 1][j] = gameData[i][j];
        gameData[i][j] = 0;
      }
    }
  }
  return result;
}

export function checkForces(gameData, gameInfo) {
  let emptyUp = -1
  let result = {};
  result.update = false;
  result.playerX = -1;
  result.playerY = -1;
  let upPossible = false;

  for (let i = 0; i < gameInfo.forces.length; i++) {
    const force = gameInfo.forces[i];
    emptyUp = -1;
    upPossible = false;
    for (let j = 0; j < force.y; j++) {
      const element = gameData[j][force.x];
      if ((element === 0) && (emptyUp === -1)) {
        emptyUp = j;
        upPossible = true;
      }
      if (emptyUp !== -1) {
        if (![0, 2, 4, 8, 93, 94].includes(gameData[j][force.x])) {
          upPossible = false;
          emptyUp = -1;
        }
      }
    }

    if (force.direction === 8) {
      // Move up
      if (upPossible) {
        result.update = true;
        for (let j = emptyUp; j < force.y - 1; j++) {
          gameData[j][force.x] = gameData[j + 1][force.x];
          gameData[j + 1][force.x] = 0;
          switch (gameData[j][force.x]) {
            case 2:
              result.playerX = force.x;
              result.playerY = j;
              break;
            case 8:
            case 93:
            case 94:
              updateRed(gameInfo.redBalls, force.x, j + 1, force.x, j);
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

function whiteOrBlue(n) {
  return n === 4 || n === 5;
}

export function moveLeft(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  let row = gameData[y];
  result.breaking = false;
  result.eating = false;
  result.takingKey = false;
  result.takingLadder = false;
  result.takingLightBulb = false;
  result.takingPickaxe = false;
  result.takingWeakStone = false;
  result.player = false;
  result.moveOneMore = false;
  result.teleporting = false;
  result.rotate = false;
  result.divingGlasses = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length > 0) {
    if (notInAir(x, y, backData, gameData, gameInfo)) {
      if (x > 0) {
        // empty space, green ball, diving glasses, key or pickaxe
        if (!result.player && ([0, 3, 26, 29, 34, 99, 105, 108].includes(row[x - 1]) || ((row[x - 1]) === 35) && gameInfo.hasPickaxe)) {
          switch (row[x - 1]) {
            case 3:
              result.eating = true;
              break;
            case 26:
              result.divingGlasses = true;
              break;
            case 29:
              result.takingKey = true;
              break;
            case 34:
              result.takingPickaxe = true;
              break;
            case 35:
              result.breaking = true;
              break;
            case 99:
              result.takingWeakStone = true;
              break;
            case 105:
              result.takingLightBulb = true;
              break;
            case 108:
              result.takingLadder = true;
              break;
            default:
              break;
          }
          row[x] = element;
          row[x - 1] = 2;
          result.player = true;
        }
      }
      if (x > 1) {
        // 1 object
        if (!result.player && (whiteOrBlue(row[x - 1]) || canMoveAlone(row[x - 1])) && row[x - 2] === 0) {
          row[x - 2] = row[x - 1];
          row[x - 1] = 2;
          row[x] = element;
          switch (row[x - 2]) {
            case 9:
              updateYellow(gameInfo.yellowBalls, x - 1, y, x - 2, y, "left");
              break;
            case 82:
              row[x - 2] = 83;
              break;
            case 98:
              row[x - 2] = 82;
              break;
            default:
              break;
          }
          result.player = true;
        }
        if (!result.player && ((row[x - 1] === 11) || ((row[x - 1] === 30) && gameInfo.hasKey)) && row[x - 2] === 0) {
          row[x - 2] = 2;
          row[x] = element;
          result.player = true;
          result.moveOneMore = true;
        }
        if (!result.player && row[x - 1] === 89 && row[x - 2] === 0) {
          row[x - 2] = 2;
          row[x] = element;
          result.player = true;
          result.rotate = true;
        }
      }
      if (x > 2) {
        // 2 white balls
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
          result.player = true;
        }
      }
      if (!result.player && x > 0) {
        if ((row[x - 1] === 31) || (row[x - 1] === 92)) {
          row[x - 1] = 2;
          row[x] = element;
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
      if (!result.player && ([101, 102, 103, 104].includes(gameData[y][x - 1]))) {
        if (movePurpleBar(gameData, x, y, 4)) {
          result.player = true;
          gameData[y][x - 1] = 2;
          gameData[y][x] = element;
        }
      }
    }
  }
  return result;
}

export function moveRight(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  let row = gameData[y];
  let maxX = 0;
  result.breaking = false;
  result.eating = false;
  result.takingKey = false;
  result.takingLadder = false;
  result.takingLightBulb = false;
  result.takingPickaxe = false;
  result.takingWeakStone = false;
  result.player = false;
  result.moveOneMore = false;
  result.teleporting = false;
  result.rotate = false;
  result.divingGlasses = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (gameData.length > 0) {
    if (notInAir(x, y, backData, gameData, gameInfo)) {
      maxX = gameData[0].length - 1;
      if (x < maxX) {
        // empty space, green ball, diving glasses, key or pickaxe
        if (!result.player && ([0, 3, 26, 29, 34, 99, 105, 108].includes(row[x + 1]) || ((row[x + 1]) === 35) && gameInfo.hasPickaxe)) {
          switch (row[x + 1]) {
            case 3:
              result.eating = true;
              break;
            case 26:
              result.divingGlasses = true;
              break;
            case 29:
              result.takingKey = true;
              break;
            case 34:
              result.takingPickaxe = true;
              break;
            case 35:
              result.breaking = true;
              break;
            case 99:
              result.takingWeakStone = true;
              break;
            case 105:
              result.takingLightBulb = true;
              break;
            case 108:
              result.takingLadder = true;
              break;
            default:
              break;
          }
          row[x] = element;
          row[x + 1] = 2;
          result.player = true;
        }
      }
      if (x < maxX - 1) {
        // 1 object
        if (!result.player && (whiteOrBlue(row[x + 1]) || canMoveAlone(row[x + 1])) && row[x + 2] === 0) {
          row[x + 2] = row[x + 1];
          row[x + 1] = 2;
          row[x] = element;
          switch (row[x + 2]) {
            case 9:
              updateYellow(gameInfo.yellowBalls, x + 1, y, x + 2, y, "right");
              break;
            case 82:
              row[x + 2] = 83;
              break;
            case 98:
              row[x + 2] = 82;
              break;
            default:
              break;
          }
          result.player = true;
        }
        if (!result.player && ((row[x + 1] === 10) || ((row[x + 1] === 30) && gameInfo.hasKey)) && row[x + 2] === 0) {
          row[x + 2] = 2;
          row[x] = element;
          result.player = true;
          result.moveOneMore = true;
        }
        if (!result.player && row[x + 1] === 89 && row[x + 2] === 0) {
          row[x + 2] = 2;
          row[x] = element;
          result.player = true;
          result.rotate = true;
        }
      }
      if (x < maxX - 2) {
        // 2 white balls
        if (
          !result.player &&
          whiteOrBlue(row[x + 1]) &&
          whiteOrBlue(row[x + 2]) &&
          row[x + 3] === 0
        ) {
          row[x + 3] = row[x + 2];
          row[x + 2] = row[x + 1];
          row[x + 1] = 2;
          row[x] = element;
          result.player = true;
        }
      }
      if (!result.player && x < gameData[0].length - 1) {
        if ((row[x + 1] === 31) || (row[x + 1] === 92)) {
          row[x + 1] = 2;
          row[x] = element;
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
      if (!result.player && ([100, 102, 103, 104].includes(gameData[y][x + 1]))) {
        if (movePurpleBar(gameData, x, y, 6)) {
          result.player = true;
          gameData[y][x + 1] = 2;
          gameData[y][x] = element;
        }
      }
    }
  }
  return result;
}

export function jump(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.breaking = false;
  result.eating = false;
  result.takingKey = false;
  result.takingLadder = false;
  result.takingLightBulb = false;
  result.takingPickaxe = false;
  result.takingWeakStone = false;
  result.player = false;
  result.moveOneMore = false;
  result.divingGlasses = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (y > 0 && notInAir(x, y, backData, gameData, gameInfo)) {
        if (!result.player && ([0, 3, 26, 29, 34, 99, 105, 108].includes(gameData[y - 1][x]) || ((gameData[y - 1][x]) === 35) && gameInfo.hasPickaxe)) {
          switch (gameData[y - 1][x]) {
            case 0:
              if (!gameInfo.hasWeakStone && gameInfo.hasLadder) {
                backData[y][x] = 25;
              }
              break;
            case 3:
              result.eating = true;
              break;
            case 26:
              result.divingGlasses = true;
              break;
            case 29:
              result.takingKey = true;
              break;
            case 34:
              result.takingPickaxe = true;
              break;
            case 35:
              result.breaking = true;
              break;
            case 99:
              result.takingWeakStone = true;
              break;
            case 105:
              result.takingLightBulb = true;
              break;
            case 108:
              result.takingLadder = true;
              break;
            default:
              break;
          }
          gameData[y - 1][x] = 2;
          gameData[y][x] = element;
          result.player = true;
        }
      }
      if (y > 1 && notInAir(x, y, backData, gameData, gameInfo)) {
        if (!result.player && canMoveAlone(gameData[y - 1][x]) && gameData[y - 2][x] === 0) {
          gameData[y - 2][x] = gameData[y - 1][x];
          gameData[y - 1][x] = 2;
          gameData[y][x] = element;
          switch (gameData[y - 2][x]) {
            case 9:
              updateYellow(gameInfo.yellowBalls, x, y - 1, x, y - 2, "up");
              break;
            case 82:
              gameData[y - 2][x] = 83;
              break;
            case 98:
              gameData[y - 2][x] = 82;
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
          result.player = true;
          result.moveOneMore = true;
        }
        if (!result.player && ([100, 101, 102, 104].includes(gameData[y - 1][x]))) {
          if (movePurpleBar(gameData, x, y, 8)) {
            result.player = true;
            gameData[y - 1][x] = 2;
            gameData[y][x] = element;
          }
        }
      }
    }
  }
  return result;
}

export function jumpLeft(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.eating = false;
  result.takingKey = false;
  result.takingLadder = false;
  result.takingLightBulb = false;
  result.takingPickaxe = false;
  result.takingWeakStone = false;
  result.player = false;
  result.divingGlasses = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (y > 0 && x > 0 && notInAir(x, y, backData, gameData, gameInfo)) {
        if (gameData[y - 1][x] === 0) {
          if ([0, 3, 26, 29, 34, 99, 105, 108].includes(gameData[y - 1][x - 1])) {
            switch (gameData[y - 1][x - 1]) {
              case 3:
                result.eating = true;
                break;
              case 26:
                result.divingGlasses = true;
                break;
              case 29:
                result.takingKey = true;
                break;
              case 34:
                result.takingPickaxe = true;
                break;
              case 99:
                result.takingWeakStone = true;
                break;
              case 105:
                result.takingLightBulb = true;
                break;
              case 108:
                result.takingLadder = true;
                break;
              default:
                break;
            }
            gameData[y - 1][x - 1] = 2;
            gameData[y][x] = element;
            result.player = true;
          }
        }
      }
    }
  }
  return result;
}

export function jumpRight(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.eating = false;
  result.takingKey = false;
  result.takingLadder = false;
  result.takingLightBulb = false;
  result.takingPickaxe = false;
  result.takingWeakStone = false;
  result.player = false;
  result.divingGlasses = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (
        y > 0 &&
        x < gameData[0].length - 1 &&
        notInAir(x, y, backData, gameData, gameInfo)
      ) {
        if (gameData[y - 1][x] === 0) {
          if ([0, 3, 26, 29, 34, 99, 105, 108].includes(gameData[y - 1][x + 1])) {
            switch (gameData[y - 1][x + 1]) {
              case 3:
                result.eating = true;
                break;
              case 26:
                result.divingGlasses = true;
                break;
              case 29:
                result.takingKey = true;
                break;
              case 34:
                result.takingPickaxe = true;
                break;
              case 99:
                result.takingWeakStone = true;
                break;
              case 105:
                result.takingLightBulb = true;
                break;
              case 108:
                result.takingLadder = true;
                break;
              default:
                break;
            }
            gameData[y - 1][x + 1] = 2;
            gameData[y][x] = element;
            result.player = true;
          }
        }
      }
    }
  }
  return result;
}

export function pushDown(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.breaking = false;
  result.player = false;
  result.moveOneMore = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (!result.player && canMoveAlone(gameData[y + 1][x]) && gameData[y + 2][x] === 0) {
        gameData[y + 2][x] = gameData[y + 1][x];
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        switch (gameData[y + 2][x]) {
          case 9:
            updateYellow(gameInfo.yellowBalls, x, y + 1, x, y + 2, "down");
            break;
          case 82:
            gameData[y + 2][x] = 83;
            break;
          case 98:
            gameData[y + 2][x] = 82;
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
        result.player = true;
        result.moveOneMore = true;
      }
      if (
        !result.player &&
        gameData[y + 1][x] === 0 &&
        (isLadder(x, y, backData) ||
          isLadder(x, y + 1, backData) ||
          inWater(x, y, backData))
      ) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        result.player = true;
      }
      if (!result.player && (gameData[y + 1][x] === 35) && gameInfo.hasPickaxe) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = element;
        result.player = true;
        result.breaking = true;
      }
      if (!result.player && ([100, 101, 102, 103].includes(gameData[y + 1][x]))) {
        if (movePurpleBar(gameData, x, y, 2)) {
          result.player = true;
          gameData[y + 1][x] = 2;
          gameData[y][x] = element;
        }
      }
    }
  }
  return result;
}

export function moveDownLeft(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.player = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x - 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        inWater(x, y, backData)
      ) {
        gameData[y + 1][x - 1] = 2;
        gameData[y][x] = element;
        result.player = true;
      }
    }
  }
  return result;
}

export function moveDownRight(
  backData,
  gameData,
  x,
  y,
  gameInfo
) {
  let result = {};
  result.player = false;
  let element = gameInfo.hasWeakStone ? 35 : 0;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x + 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        inWater(x, y, backData)
      ) {
        gameData[y + 1][x + 1] = 2;
        gameData[y][x] = element;
        result.player = true;
      }
    }
  }
  return result;
}

export function movePurpleBar(arr, x, y, direction) {
  let error = false;
  let maxCol = 0;
  let stop = false;
  let xmin = -1;
  let ymin = -1;
  let xmax = -1;
  let ymax = -1;
  let update = false;
  let vertical = false;

  if (arr.length > 2) {
    error = false;
    maxCol = arr[0].length - 1;
    switch (direction) {
      case 2:
        if (y < arr.length - 2) {
          if ([100, 101, 102, 103].includes(arr[y + 1][x])) {
            xmin = x;
            xmax = x;
            ymin = y + 1;
            ymax = y + 1;
            vertical = (arr[y + 1][x] === 103);
            if (vertical) {
              stop = false;
              for (let i = y + 2; (i < arr.length) && !stop; i++) {
                const el = arr[i][x];
                if ((el === 104) || (el === 102)) {
                  ymax++;
                } else {
                  stop = true;
                  error = true;
                }
                if (el !== 102) {
                  stop = true;
                }
              }
            } else {
              if ((x > 0) && (arr[y + 1][x] !== 100)) {
                stop = false;
                for (let i = x - 1; (i >= 0) && !stop; i--) {
                  const el = arr[y + 1][i];
                  if ((el === 100) || (el === 102)) {
                    xmin--;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
              if ((x < maxCol) && (arr[y + 1][x] !== 101)) {
                stop = false;
                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                  const el = arr[y + 1][i];
                  if ((el === 101) || (el === 102)) {
                    xmax++;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
            }
          }
        }
        break;
      case 4:
        if (x > 1) {
          if ([101, 102, 103, 104].includes(arr[y][x - 1])) {
            xmin = x - 1;
            xmax = x - 1;
            ymin = y;
            ymax = y;
            vertical = !(arr[y][x - 1] === 101);
            if (vertical) {
              if ((y > 0) && (arr[y][x - 1] !== 103)) {
                stop = false;
                for (let i = y - 1; (i >= 0) && !stop; i--) {
                  const el = arr[i][x - 1];
                  if ((el === 103) || (el === 102)) {
                    ymin--;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
              if ((y < arr.length - 1) && (arr[y][x - 1] !== 104)) {
                stop = false;
                for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                  const el = arr[y][i - 1];
                  if ((el === 104) || (el === 102)) {
                    ymax++;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
            } else {
              stop = false;
              for (let i = x - 2; (i >= 0) && !stop; i--) {
                const el = arr[y][i];
                if ((el === 100) || (el === 102)) {
                  xmin--;
                } else {
                  stop = true;
                  error = true;
                }
                if (el !== 102) {
                  stop = true;
                }
              }
            }
          }
        }
        break;
      case 6:
        if (x < maxCol - 1) {
          if ([100, 102, 103, 104].includes(arr[y][x + 1])) {
            xmin = x + 1;
            xmax = x + 1;
            ymin = y;
            ymax = y;
            vertical = !(arr[y][x + 1] === 100);
            if (vertical) {
              if ((y > 0) && (arr[y][x + 1] !== 103)) {
                stop = false;
                for (let i = y - 1; (i >= 0) && !stop; i--) {
                  const el = arr[i][x + 1];
                  if ((el === 103) || (el === 102)) {
                    ymin--;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
              if ((y < arr.length - 1) && (arr[y][x + 1] !== 104)) {
                stop = false;
                for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                  const el = arr[y][i + 1];
                  if ((el === 104) || (el === 102)) {
                    ymax++;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
            } else {
              stop = false;
              for (let i = x + 2; (i < maxCol) && !stop; i++) {
                const el = arr[y][i];
                if ((el === 101) || (el === 102)) {
                  xmax++;
                } else {
                  stop = true;
                  error = true;
                }
                if (el !== 102) {
                  stop = true;
                }
              }
            }
          }
        }
        break;
      case 8:
        if (y > 1) {
          if ([100, 101, 102, 104].includes(arr[y - 1][x])) {
            xmin = x;
            xmax = x;
            ymin = y - 1;
            ymax = y - 1;
            vertical = (arr[y - 1][x] === 104);
            if (vertical) {
              stop = false;
              for (let i = y - 2; (i >= 0) && !stop; i--) {
                const el = arr[i][x];
                if ((el === 103) || (el === 102)) {
                  ymin--;
                } else {
                  stop = true;
                  error = true;
                }
                if (el !== 102) {
                  stop = true;
                }
              }
            } else {
              if ((x > 0) && (arr[y - 1][x] !== 100)) {
                stop = false;
                for (let i = x - 1; (i >= 0) && !stop; i--) {
                  const el = arr[y - 1][i];
                  if ((el === 100) || (el === 102)) {
                    xmin--;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
              if ((x < maxCol) && (arr[y - 1][x] !== 101)) {
                stop = false;
                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                  const el = arr[y - 1][i];
                  if ((el === 101) || (el === 102)) {
                    xmax++;
                  } else {
                    stop = true;
                    error = true;
                  }
                  if (el !== 102) {
                    stop = true;
                  }
                }
              }
            }
          }
        }
        break;
      default:
        break;
    }

    update = false;
    if (!error && (xmin >= 0) && (ymin >= 0) && (xmax >= 0) && (ymax >= 0)) {
      switch (direction) {
        case 2:
          if (vertical) {
            update = false;
            if (ymax < arr.length - 1) {
              if (arr[ymax + 1][xmin] === 0) {
                update = true;
                for (let i = ymax; i >= ymin; i--) {
                  arr[i + 1][xmin] = arr[i][xmin];
                }
                arr[ymin][xmin] = 0;
              }
            }
          } else {
            update = true;
            for (let i = xmin; i <= xmax; i++) {
              const el = arr[y + 2][i];
              if (el !== 0) {
                update = false;
              }
            }
            if (update) {
              for (let i = xmin; i <= xmax; i++) {
                arr[y + 2][i] = arr[y + 1][i];
                arr[y + 1][i] = 0;
              }
            }
          }
          break;
        case 4:
          if (vertical) {
            // Do not move when there is an object with weight on top of a horizontal bar
            if ([4, 8, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
              update = true;
              for (let i = ymin; i <= ymax; i++) {
                const el = arr[i][x - 2];
                if (el !== 0) {
                  update = false;
                }
              }
              if (update) {
                for (let i = ymin; i <= ymax; i++) {
                  arr[i][x - 2] = arr[i][x - 1];
                  arr[i][x - 1] = 0;
                }
              }
            }
          } else {
            update = false;
            if (xmin > 0) {
              if (arr[ymin][xmin - 1] === 0) {
                update = true;

                // Do not move when there is an object with weight on top of a horizontal bar
                for (let i = xmin; i <= xmax; i++) {
                  if ([4, 8, 93, 94].includes(arr[ymin - 1][i])) {
                    update = false;
                  }
                }

                if (update) {
                  for (let i = xmin - 1; i < xmax; i++) {
                    arr[ymin][i] = arr[ymin][i + 1];
                  }
                  arr[ymin][xmax] = 0;
                }
              }
            }
          }
          break;
        case 6:
          if (vertical) {
            // Do not move when there is an object with weight on top of a horizontal bar
            if ([4, 8, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
              update = true;
              for (let i = ymin; i <= ymax; i++) {
                const el = arr[i][x + 2];
                if (el !== 0) {
                  update = false;
                }
              }
              if (update) {
                for (let i = ymin; i <= ymax; i++) {
                  arr[i][x + 2] = arr[i][x + 1];
                  arr[i][x + 1] = 0;
                }
              }
            }
          } else {
            update = false;
            if (xmin > 0) {
              if (arr[ymin][xmax + 1] === 0) {
                update = true;

                // Do not move when there is an object with weight on top of a horizontal bar
                for (let i = xmin; i <= xmax; i++) {
                  if ([4, 8, 93, 94].includes(arr[ymin - 1][i])) {
                    update = false;
                  }
                }

                if (update) {
                  for (let i = xmax; i >= xmin; i--) {
                    arr[ymin][i + 1] = arr[ymin][i];
                  }
                  arr[ymin][xmin] = 0;
                }
              }
            }
          }
          break;
        case 8:
          if (vertical) {
            update = false;
            if (ymin > 0) {
              if (arr[ymin - 1][xmin] === 0) {
                update = true;
                for (let i = ymin - 1; i < ymax; i++) {
                  arr[i][xmin] = arr[i + 1][xmin];
                }
                arr[ymax][xmin] = 0;
              }
            }
          } else {
            update = true;
            for (let i = xmin; i <= xmax; i++) {
              const el = arr[y - 2][i];
              if (el !== 0) {
                update = false;
              }
            }
            if (update) {
              for (let i = xmin; i <= xmax; i++) {
                arr[y - 2][i] = arr[y - 1][i];
                arr[y - 1][i] = 0;
              }
            }
          }
          break;
        default:
          break;
      }
    }
  }
  return update;
}

export function getGameInfo(backData, gameData) {
  let result = {};
  result.blueBall = { x: -1, y: -1 };
  result.elevators = [];
  result.forces = [];
  result.greenBalls = 0;
  result.horizontalElevators = [];
  result.redBalls = [];
  result.yellowBalls = [];
  result.detonator = { x: -1, y: -1 };
  result.teleports = [];
  result.hasMirror = false,
    result.hasWater = false;
  result.hasDivingGlasses = false;
  result.hasKey = false;
  result.hasLadder = false;
  result.hasPickaxe = false;
  result.hasWeakStone = false;
  result.redFish = [];
  result.electricity = [];
  result.electricityActive = false;
  result.trapDoors = [];
  result.copiers = [];

  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData[i].length; j++) {
      if (gameData[i][j] === 2) {
        result.blueBall = { x: j, y: i };
      }
      if (gameData[i][j] === 3) {
        result.greenBalls++;
      }
      if (gameData[i][j] === 37) {
        result.detonator = { x: j, y: i };
      }
      if (isRedBall(gameData[i][j])) {
        let redBall = {};
        redBall.x = j;
        redBall.y = i;
        switch (gameData[i][j]) {
          case 93:
            redBall.smart = 1;
            break;
          case 94:
            redBall.smart = 2;
            break;
          default:
            redBall.smart = 0;
            break;
        }
        redBall.direction = "none";
        redBall.skipElevatorCount = 0;
        redBall.skipFollowCount = 0;
        result.redBalls.push(redBall);
      }
      if (gameData[i][j] === 106 || gameData[i][j] === 6) {
        let elevator = {};
        elevator.x = j;
        elevator.y = i;
        elevator.up = gameData[i][j] === 106;
        result.elevators.push(elevator);
      }
      if (gameData[i][j] === 107 || gameData[i][j] === 7) {
        let elevator = {};
        elevator.x = j;
        elevator.y = i;
        elevator.right = gameData[i][j] === 107;
        result.horizontalElevators.push(elevator);
      }
      if (gameData[i][j] === 9) {
        let yellowBall = {};
        yellowBall.x = j;
        yellowBall.y = i;
        yellowBall.direction = "none";
        result.yellowBalls.push(yellowBall);
      }
      if (gameData[i][j] === 31) {
        let teleport = {};
        teleport.x = j;
        teleport.y = i;
        teleport.selfDestructing = false;
        result.teleports.push(teleport);
      }
      if (gameData[i][j] === 92) {
        let teleport = {};
        teleport.x = j;
        teleport.y = i;
        teleport.selfDestructing = true;
        result.teleports.push(teleport);
      }
      if (gameData[i][j] === 95 || gameData[i][j] === 96) {
        result.hasMirror = true;
      }
      if (backData[i][j] === 20 || backData[i][j] === 23) {
        result.hasWater = true;
      }
      if (gameData[i][j] === 27) {
        let fish = {};
        fish.x = j;
        fish.y = i;
        if (Math.random() > 0.5) {
          fish.direction = 6;
        } else {
          fish.direction = 4;
        }
        fish.isDead = false;
        result.redFish.push(fish);
      }
      if (gameData[i][j] === 91) {
        let elec = {};
        elec.x = j;
        elec.y = i;
        result.electricity.push(elec);
      }
      if (gameData[i][j] === 13) {
        let trap = {};
        trap.x = j;
        trap.y = i;
        trap.status = 0;
        result.trapDoors.push(trap);
      }
      if (gameData[i][j] === 97) {
        let copier = {};
        copier.x = j;
        copier.y = i;
        result.copiers.push(copier);
      }
      if (gameData[i][j] === 109) {
        let force = {};
        force.x = j;
        force.y = i;
        force.direction = 8;
        result.forces.push(force);
      }
    }
  }
  return result;
}

export function checkRed(arr, x, y, redBalls) {
  let direction = 0;
  let hit = -1; // -1 = not known yet, 0 = no, 1 = yes 
  let result = [];
  let checkX = 0;
  let checkY = 0;

  for (let i = 0; (i < redBalls.length) && (hit !== 1); i++) {
    const red = redBalls[i];
    for (let j = 0; (j < 2) && (hit !== 1); j++) {
      hit = -1;
      if (j === 0) {
        direction = 4;
      } else {
        direction = 6;
      }
      result = [];
      result.push({ x: red.x, y: red.y });
      checkX = red.x;
      checkY = red.y;
      while (hit === -1) {
        switch (direction) {
          case 2:
            if (checkY < arr.length - 1) {
              checkY++;
            } else {
              hit = 0;
            }
            break;
          case 4:
            if (checkX > 0) {
              checkX--;
            } else {
              hit = 0;
            }
            break;
          case 6:
            if (checkX < arr[checkY].length) {
              checkX++;
            } else {
              hit = 0;
            }
            break;
          case 8:
            if (checkY > 0) {
              checkY--;
            } else {
              hit = 0;
            }
            break;
          default:
            break;
        }
        switch (arr[checkY][checkX]) {
          case 0:
            break;
          case 2:
            hit = 1;
            result.push({ x: checkX, y: checkY });
            break;
          case 95:
            // Mirror /
            result.push({ x: checkX, y: checkY });
            switch (direction) {
              case 2:
                direction = 4;
                break;
              case 4:
                direction = 2;
                break;
              case 6:
                direction = 8;
                break;
              case 8:
                direction = 6;
                break;
              default:
                break;
            }
            break;
          case 96:
            // Mirror \
            result.push({ x: checkX, y: checkY });
            switch (direction) {
              case 2:
                direction = 6;
                break;
              case 4:
                direction = 8;
                break;
              case 6:
                direction = 2;
                break;
              case 8:
                direction = 4;
                break;
              default:
                break;
            }
            break;
          default:
            hit = 0;
            break;
        }
      }
    }
  }
  if (hit !== 1) {
    result = [];
  }
  return result;
}

export function checkTrapDoors(gameData, gameInfo) {
  let result = {};
  result.updated = false;
  result.sound = false;
  let data = 0;

  for (let i = 0; i < gameInfo.trapDoors.length; i++) {
    let trapDoor = gameInfo.trapDoors[i];
    data = gameData[trapDoor.y - 1][trapDoor.x];
    if (
      data === 0 &&
      (gameData[trapDoor.y][trapDoor.x] === 0 ||
        gameData[trapDoor.y][trapDoor.x] === 13 ||
        gameData[trapDoor.y][trapDoor.x] === 14)
    ) {
      gameData[trapDoor.y][trapDoor.x] = 13;
      result.updated = true;
      trapDoor.status = 0;
    }
    if (data === 2 || data === 4 || data === 8) {
      if (trapDoor.status >= 0) {
        trapDoor.status++;
      }
      if (trapDoor.status >= 5) {
        gameData[trapDoor.y][trapDoor.x] = 14;
        result.updated = true;
        result.sound = true;
      }
      if (trapDoor.status >= 10) {
        gameData[trapDoor.y][trapDoor.x] = 0;
        result.updated = true;
        trapDoor.status = -1;
      }
    }
  }
  return result;
}

export function moveElevators(arr, elevators, redBalls) {
  let result = {};
  result.playerX = -1; // Set to new position if player is moved
  result.playerY = -1; // Set to new position if player is moved

  for (let i = 0; i < elevators.length; i++) {
    let directionChanged = false;
    let downPossible = false;
    let upPossible = true;
    let emptyUp = -1;
    let x = 0;
    let y = 0;

    // Check in which directions it is possible to move
    for (let j = elevators[i].y; j >= 0; j--) {
      if (emptyUp === -1 && arr[j][elevators[i].x] === 0) {
        emptyUp = j;
      }
      if (emptyUp === -1) {
        if (![2, 4, 8, 93, 94, 6, 106].includes(arr[j][elevators[i].x])) {
          upPossible = false;
        }
      }
    }
    if (emptyUp === -1) {
      upPossible = false;
    }
    if (elevators[i].y < arr.length - 1) {
      downPossible = arr[elevators[i].y + 1][elevators[i].x] === 0;
    }

    //console.log("downPossible: ", downPossible);
    //console.log("upPossible: ", upPossible);

    // Change the direction of the elevator if needed
    if (elevators[i].up) {
      if (!upPossible && downPossible) {
        elevators[i].up = false;
        arr[elevators[i].y][elevators[i].x] = 6;
        directionChanged = true;
      }
    } else {
      if (!downPossible && upPossible) {
        elevators[i].up = true;
        arr[elevators[i].y][elevators[i].x] = 106;
        directionChanged = true;
      }
    }

    if (!directionChanged) {
      // Move the elevator and everything that is on top of it
      x = elevators[i].x;
      y = elevators[i].y;
      if (elevators[i].up) {
        // Move up
        if (upPossible) {
          for (let j = emptyUp; j < y; j++) {
            arr[j][x] = arr[j + 1][x];
            switch (arr[j][x]) {
              case 2:
                result.playerX = x;
                result.playerY = j;
                break;
              case 8:
              case 93:
              case 94:
                updateRed(redBalls, x, j + 1, x, j);
                break;
              default:
                break;
            }
          }
          elevators[i].y = y - 1;
          arr[y][x] = 0;
        }
      } else {
        // Move down
        if (downPossible) {
          arr[y + 1][x] = arr[y][x];
          arr[y][x] = 0;
          elevators[i].y = y + 1;
          for (let j = arr.length - 2; j >= 0; j--) {
            if (arr[j + 1][x] === 0 && [2, 4, 8, 93, 94].includes(arr[j][x])) {
              if (arr[j][x] === 2) {
                result.playerX = x;
                result.playerY = j + 1;
              }
              if (isRedBall(arr[j][x])) {
                updateRed(redBalls, x, j, x, j + 1);
              }
              arr[j + 1][x] = arr[j][x];
              arr[j][x] = 0;
            }
          }
        }
      }
    }
  }
  return result;
}

export function moveHorizontalElevators(arr, elevators, redBalls) {
  let result = {};
  let stop = false;

  result.playerX = -1; // Set to new position if player is moved
  result.playerY = -1; // Set to new position if player is moved

  for (let i = 0; i < elevators.length; i++) {
    let directionChanged = false;
    let x = elevators[i].x;
    let y = elevators[i].y;

    if (elevators[i].right) {
      if (arr[y][x + 1] !== 0 && arr[y][x - 1] === 0) {
        elevators[i].right = false;
        arr[y][x] = 7;
        directionChanged = true;
      }
    } else {
      if (arr[y][x - 1] !== 0 && arr[y][x + 1] === 0) {
        elevators[i].right = true;
        arr[y][x] = 107;
        directionChanged = true;
      }
    }

    if (!directionChanged) {
      // Move right
      if (elevators[i].right && arr[y][x + 1] === 0) {
        arr[y][x + 1] = 107;
        arr[y][x] = 0;
        elevators[i].x = x + 1;
        stop = false;
        for (let j = y - 1; j >= 0 && !stop; j--) {
          if ([2, 4, 8, 93, 94].includes(arr[j][x]) && arr[j][x + 1] === 0) {
            if (isRedBall(arr[j][x])) {
              updateRed(redBalls, x, j, x + 1, j);
            }
            if (arr[j][x] === 2) {
              result.playerX = x + 1;
              result.playerY = j;
            }
            arr[j][x + 1] = arr[j][x];
            arr[j][x] = 0;
          } else {
            stop = true;
          }
        }
      }

      // Move left
      if (!elevators[i].right && arr[y][x - 1] === 0) {
        arr[y][x - 1] = 7;
        arr[y][x] = 0;
        elevators[i].x = x - 1;
        stop = false;
        for (let j = y - 1; j >= 0 && !stop; j--) {
          if ([2, 4, 8, 93, 94].includes(arr[j][x]) && arr[j][x - 1] === 0) {
            if (isRedBall(arr[j][x])) {
              updateRed(redBalls, x, j, x - 1, j);
            }
            if (arr[j][x] === 2) {
              result.playerX = x - 1;
              result.playerY = j;
            }
            arr[j][x - 1] = arr[j][x];
            arr[j][x] = 0;
          } else {
            stop = true;
          }
        }
      }
    }
  }
  return result;
}

export function moveRedBalls(
  backData,
  gameData,
  x,
  y,
  gameInfo,
) {
  let changeDirection = false;
  let directionAfterJump = "none";
  let maxX = 0;
  let n1 = 0;
  let n2 = 0;
  let prevX = 0;
  let result = { updated: false, eating: false };
  let saveRed = 93;
  let waitLeft = false;
  let waitRight = false;

  if (gameData.length > 0) {
    maxX = gameData[0].length - 1;
    for (let i = 0; i < gameInfo.redBalls.length; i++) {
      const red = gameInfo.redBalls[i];
      prevX = red.x;

      if ((red.smart > 0) && notInAir(red.x, red.y, backData, gameData, gameInfo)) {
        changeDirection = false;

        waitLeft = false;
        waitRight = false;
        if (red.skipElevatorCount > 0) {
          red.skipElevatorCount--;
        } else {
          if ((red.y > 0) && [0].includes(gameData[red.y - 1][red.x])) {
            for (let j = 0; j <= red.y; j++) {
              if (red.x > 0) {
                if ([6, 106].includes(gameData[j][red.x - 1])) {
                  waitLeft = true;
                } else {
                  if (gameData[j][red.x - 1] !== 0) {
                    waitLeft = false;
                  }
                }
              }
              if (red.x < maxX) {
                if ([6, 106].includes(gameData[j][red.x + 1])) {
                  waitRight = true;
                } else {
                  if (gameData[j][red.x + 1] !== 0) {
                    waitRight = false;
                  }
                }
              }
            }
          }
        }

        if (!waitLeft && !waitRight) {
          n1 = randomInt(1, 20);
          switch (n1) {
            case 5:
              changeDirection = true;
              break;
            default:
              break;
          }
          if (changeDirection) {
            n2 = randomInt(0, 2);
            switch (n2) {
              case 0:
                red.direction = "none";
                break;
              case 1:
                red.direction = "left";
                break;
              case 2:
                red.direction = "right";
                break;
              default:
                break;
            }
          }
        }
        if (waitLeft) {
          if (red.x > 0) {
            if ([6, 106].includes(gameData[red.y][red.x - 1])) {
              waitLeft = false;
              waitRight = false;
              red.direction = "upLeft"
              directionAfterJump = "none";
            }
          }
        }
        if (waitRight) {
          if (red.x < maxX) {
            if ([6, 106].includes(gameData[red.y][red.x + 1])) {
              waitLeft = false;
              waitRight = false;
              red.direction = "upRight"
              directionAfterJump = "none";
            }
          }
        }

        if (!waitLeft && !waitRight) {
          if (red.smart > 1) {
            if (red.skipFollowCount > 0) {
              red.skipFollowCount--;
            } else {
              if (![6, 106, 7, 107].includes(gameData[red.y + 1][red.x])) {
                if ((x > red.x) && [0, 20, 23].includes(gameData[red.y][red.x + 1])) {
                  red.direction = "right";
                }
                if ((x < red.x) && [0, 20, 23].includes(gameData[red.y][red.x - 1])) {
                  red.direction = "left";
                }
              }
            }
          }

          if (red.y > 0) {
            if ((red.direction === "left") && (red.x > 0)) {
              if (![0].includes(gameData[red.y][red.x - 1]) && [0].includes(gameData[red.y - 1][red.x]) && [0].includes(gameData[red.y - 1][red.x - 1])) {
                red.direction = "upLeft";
                directionAfterJump = "left";
              }
            }
            if ((red.direction === "right") && (red.x < maxX)) {
              if (![0].includes(gameData[red.y][red.x + 1]) && [0].includes(gameData[red.y - 1][red.x]) && [0].includes(gameData[red.y - 1][red.x + 1])) {
                red.direction = "upRight";
                directionAfterJump = "right";
              }
            }
          }

          if ((red.smart > 1) && (red.y === (y + 1))) {
            if (isEmpty(gameData, y, red.x - 1, x)) {
              red.direction = "up";
              directionAfterJump = "none";
            }
          }
          if ((red.smart === 1) && (gameData[red.y - 1][red.x] === 105)) {
            // Eat light bulb
            directionAfterJump = red.direction;
            red.direction = "up";
          }
          saveRed = gameData[red.y][red.x];
          switch (red.direction) {
            case "left":
              if (red.x > 0) {
                if ([0].includes(gameData[red.y][red.x - 1])) {
                  gameData[red.y][red.x] = 0;
                  red.x--;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              break;
            case "right":
              if (red.x < maxX) {
                if ([0].includes(gameData[red.y][red.x + 1])) {
                  gameData[red.y][red.x] = 0;
                  red.x++;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              break;
            case "up":
              if (red.y > 0) {
                if ([0, 105].includes(gameData[red.y - 1][red.x])) {
                  if (gameData[red.y - 1][red.x] === 105) {
                    result.eating = true;
                    if (red.smart === 1) {
                      red.smart = 2;
                    }
                  }
                  gameData[red.y][red.x] = 0;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            case "upLeft":
              if ((red.x > 0) && (red.y > 0)) {
                if ([0].includes(gameData[red.y - 1][red.x - 1]) && [0].includes(gameData[red.y - 1][red.x])) {
                  gameData[red.y][red.x] = 0;
                  red.x--;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            case "upRight":
              if ((red.x < maxX) && (red.y > 0)) {
                if ([0].includes(gameData[red.y - 1][red.x + 1]) && [0].includes(gameData[red.y - 1][red.x])) {
                  gameData[red.y][red.x] = 0;
                  red.x++;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            default:
              break;
          }
        }
        if ([6, 106, 7, 107].includes(gameData[red.y + 1][red.x])) {
          red.skipElevatorCount = 25;
        }
        if (red.smart > 1) {
          if (red.x === x) {
            red.skipFollowCount = 50;
            result.updated = true;
          }
          if (!waitLeft && !waitRight && (red.skipFollowCount === 0) && (prevX === red.x)) {
            if ((x > red.x) && (red.direction === "right")) {
              red.direction = "left";
              red.skipFollowCount = 50;
              result.updated = true;
            }
            if ((x < red.x) && (red.direction === "left")) {
              red.direction = "right";
              red.skipFollowCount = 50;
              result.updated = true;
            }
          }
        }
      }
    }
  }
  return result;
}

export function moveYellowBalls(arr, yellowBalls) {
  let updated = false;

  for (let i = 0; i < yellowBalls.length; i++) {
    let moved = false;
    let xOld = yellowBalls[i].x;
    let yOld = yellowBalls[i].y;
    switch (yellowBalls[i].direction) {
      case "left":
        if (arr[yOld][xOld - 1] === 0) {
          moved = true;
          yellowBalls[i].x--;
        }
        if (arr[yOld][xOld - 1] === 86) {
          moved = true;
          yellowBalls[i].direction = "right";
        }
        if (arr[yOld][xOld - 1] === 84 && arr[yOld + 1][xOld - 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "down";
          yellowBalls[i].x--;
          yellowBalls[i].y++;
        }
        if (arr[yOld][xOld - 1] === 85 && arr[yOld - 1][xOld - 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "up";
          yellowBalls[i].x--;
          yellowBalls[i].y--;
        }
        break;
      case "right":
        if (arr[yOld][xOld + 1] === 0) {
          moved = true;
          yellowBalls[i].x++;
        }
        if (arr[yOld][xOld + 1] === 86) {
          moved = true;
          yellowBalls[i].direction = "left";
        }
        if (arr[yOld][xOld + 1] === 84 && arr[yOld - 1][xOld + 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "up";
          yellowBalls[i].x++;
          yellowBalls[i].y--;
        }
        if (arr[yOld][xOld + 1] === 85 && arr[yOld + 1][xOld + 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "down";
          yellowBalls[i].x++;
          yellowBalls[i].y++;
        }
        break;
      case "up":
        if (arr[yOld - 1][xOld] === 0) {
          moved = true;
          yellowBalls[i].y--;
        }
        if (arr[yOld - 1][xOld] === 86) {
          moved = true;
          yellowBalls[i].direction = "down";
        }
        if (arr[yOld - 1][xOld] === 84 && arr[yOld - 1][xOld + 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "right";
          yellowBalls[i].x++;
          yellowBalls[i].y--;
        }
        if (arr[yOld - 1][xOld] === 85 && arr[yOld - 1][xOld - 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "left";
          yellowBalls[i].x--;
          yellowBalls[i].y--;
        }
        break;
      case "down":
        if (arr[yOld + 1][xOld] === 0) {
          moved = true;
          yellowBalls[i].y++;
        }
        if (arr[yOld + 1][xOld] === 86) {
          moved = true;
          yellowBalls[i].direction = "up";
        }
        if (arr[yOld + 1][xOld] === 84 && arr[yOld + 1][xOld - 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "left";
          yellowBalls[i].x--;
          yellowBalls[i].y++;
        }
        if (arr[yOld + 1][xOld] === 85 && arr[yOld + 1][xOld + 1] === 0) {
          moved = true;
          yellowBalls[i].direction = "right";
          yellowBalls[i].x++;
          yellowBalls[i].y++;
        }
        break;
      default:
        break;
    }
    if (moved) {
      arr[yOld][xOld] = 0;
      arr[yellowBalls[i].y][yellowBalls[i].x] = 9;
      updated = true;
    } else {
      yellowBalls[i].direction = "none";
    }
  }
  return updated;
}

export function rotateGame(backData, gameData, gameInfo) {
  let rotated = false;
  let newBackData = [];
  let newGameData = [];
  let columns = 0;
  let rows = 0;
  let x = 0;
  let y = 0;

  if (gameData.length > 0) {
    rows = gameData.length;
    columns = gameData[0].length;
    if (rows === columns) {
      rotated = true;
      for (let i = 0; i < columns; i++) {
        let newGameRow = [];
        let newBackRow = [];
        for (let j = rows - 1; j >= 0; j--) {
          let gd = gameData[j][i];
          switch (gd) {
            case 15:
              gd = 17;
              break;
            case 16:
              gd = 15;
              break;
            case 17:
              gd = 18;
              break;
            case 18:
              gd = 16;
              break;
            case 6:
              gd = 7;
              break;
            case 7:
              gd = 106;
              break;
            case 106:
              gd = 107;
              break;
            case 107:
              gd = 6;
              break;
            case 10:
              gd = 88;
              break;
            case 88:
              gd = 11;
              break;
            case 11:
              gd = 87;
              break;
            case 87:
              gd = 10;
              break;
            case 84:
              gd = 85;
              break;
            case 85:
              gd = 84;
              break;
            default:
              break;
          }
          let bd = backData[j][i];
          switch (bd) {
            case 25:
              bd = 90;
              break;
            case 90:
              bd = 25;
              break;
            default:
              break;
          }
          newGameRow.push(gd);
          newBackRow.push(bd);
        }
        newGameData.push(newGameRow);
        newBackData.push(newBackRow);
      }
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          backData[i][j] = newBackData[i][j];
        }
      }
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          gameData[i][j] = newGameData[i][j];
        }
      }

      x = gameInfo.blueBall.x;
      y = gameInfo.blueBall.y;
      gameInfo.blueBall.y = x;
      gameInfo.blueBall.x = rows - (y + 1);
      for (let i = 0; i < gameInfo.redBalls.length; i++) {
        x = gameInfo.redBalls[i].x;
        y = gameInfo.redBalls[i].y;
        gameInfo.redBalls[i].y = x;
        gameInfo.redBalls[i].x = rows - (y + 1);
      }
      for (let i = 0; i < gameInfo.teleports.length; i++) {
        x = gameInfo.teleports[i].x;
        y = gameInfo.teleports[i].y;
        gameInfo.teleports[i].y = x;
        gameInfo.teleports[i].x = rows - (y + 1);
      }
      for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
        x = gameInfo.yellowBalls[i].x;
        y = gameInfo.yellowBalls[i].y;
        gameInfo.yellowBalls[i].y = x;
        gameInfo.yellowBalls[i].x = rows - (y + 1);
        let data = gameInfo.yellowBalls[i].direction;
        switch (data) {
          case "down":
            data = "left";
            break;
          case "left":
            data = "up";
            break;
          case "up":
            data = "right";
            break;
          case "right":
            data = "down";
            break;
          default:
            break;
        }
        gameInfo.yellowBalls[i].direction = data;
      }
      let newHorElevators = [];

      for (let i = 0; i < gameInfo.elevators.length; i++) {
        x = gameInfo.elevators[i].x;
        y = gameInfo.elevators[i].y;
        let newHor = {};
        newHor.x = rows - (y + 1);
        newHor.y = x;
        newHor.right = gameInfo.elevators[i].up;
        newHorElevators.push(newHor);
      }

      let newVerElevators = [];

      for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
        x = gameInfo.horizontalElevators[i].x;
        y = gameInfo.horizontalElevators[i].y;
        let newVer = {};
        newVer.x = rows - (y + 1);
        newVer.y = x;
        newVer.up = gameInfo.horizontalElevators[i].right;
        newVerElevators.push(newVer);
      }

      while (gameInfo.horizontalElevators.length > 0) {
        gameInfo.horizontalElevators.pop();
      }
      for (let i = 0; i < newHorElevators.length; i++) {
        gameInfo.horizontalElevators.push(newHorElevators[i]);
      }
      while (gameInfo.elevators.length > 0) {
        gameInfo.elevators.pop();
      }
      for (let i = 0; i < newVerElevators.length; i++) {
        gameInfo.elevators.push(newVerElevators[i]);
      }
    }
  }
  return rotated;
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

function freeToSwim(x1, x2, y, gameData) {
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

export function moveFish(backData, gameData, gameInfo, x, y) {
  let attack = false;
  let changed = false;
  let down = false;
  let up = false;
  let upOrDown = false;

  attack = inWater(x, y, backData);
  for (let i = 0; i < gameInfo.redFish.length; i++) {
    down = false;
    up = false;
    upOrDown = false;
    const fish = gameInfo.redFish[i];
    gameData[fish.y][fish.x] = 0;

    if (fish.isDead) {
      if (fish.y < gameData.length - 1) {
        if (
          gameData[fish.y + 1][fish.x] === 0 &&
          backData[fish.y + 1][fish.x] === 23
        ) {
          fish.y += 1;
        }
      }
    } else {
      if (attack) {
        if (fish.x > x) {
          fish.direction = 4;
        } else {
          fish.direction = 6;
        }
        if (fish.y > y) {
          if (
            freeToSwim(x, fish.x, fish.y - 1, gameData) ||
            freeToSwim(x, fish.x, fish.y, gameData)
          ) {
            up = true;
          }
        }
        if (fish.y < y) {
          if (
            freeToSwim(x, fish.x, fish.y + 1, gameData) ||
            freeToSwim(x, fish.x, fish.y, gameData)
          ) {
            down = true;
          }
        }
      } else {
        if (Math.random() < 0.1) {
          if (fish.direction === 6) {
            fish.direction = 4;
          } else {
            fish.direction = 6;
          }
        }
      }
      if (fish.direction === 6) {
        changed = false;
        if (fish.x < gameData[0].length - 1) {
          if (
            gameData[fish.y][fish.x + 1] === 0 &&
            backData[fish.y][fish.x + 1] === 23
          ) {
            fish.x += 1;
            changed = true;
          }
        }
        if (!changed) {
          if (fish.x > 1 && !attack) {
            if (
              gameData[fish.y][fish.x - 1] === 0 &&
              backData[fish.y][fish.x - 1] === 23
            ) {
              fish.direction = 4;
              changed = true;
            }
          }
          upOrDown = !changed;
        }
      } else if (fish.direction === 4) {
        changed = false;
        if (fish.x > 1) {
          if (
            gameData[fish.y][fish.x - 1] === 0 &&
            backData[fish.y][fish.x - 1] === 23
          ) {
            fish.x -= 1;
            changed = true;
          }
        }
        if (!changed) {
          if (fish.x < gameData[0].length - 1 && !attack) {
            if (
              gameData[fish.y][fish.x + 1] === 0 &&
              backData[fish.y][fish.x + 1] === 23
            ) {
              fish.direction = 6;
              changed = true;
            }
          }
          upOrDown = !changed;
        }
      }
      if (upOrDown) {
        if (Math.random() > 0.5) {
          if (!down) {
            up = true;
          }
        } else {
          if (!up) {
            down = true;
          }
        }
      }
      if (up) {
        if (fish.y > 1) {
          if (
            gameData[fish.y - 1][fish.x] === 0 &&
            backData[fish.y - 1][fish.x] === 23
          ) {
            fish.y -= 1;
          }
        }
      }
      if (down) {
        if (fish.y < gameData.length - 1) {
          if (
            gameData[fish.y + 1][fish.x] === 0 &&
            backData[fish.y + 1][fish.x] === 23
          ) {
            fish.y += 1;
          }
        }
      }
    }
    gameData[fish.y][fish.x] = 27;
  }
}

export function electricityTarget(backData, gameData, x, y) {
  let target = -1;
  let p = y + 1;

  while (p < gameData.length && target === -1) {
    if (gameData[p][x] !== 0 || backData[p][x] !== 0) {
      target = p;
    }
    p++;
  }
  return target;
}
