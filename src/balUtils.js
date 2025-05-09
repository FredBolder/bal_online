function canMoveAlone(n) {
  // Object that can move, but not together with another object
  return [9, 28, 84, 85, 86].includes(n);
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

function isTeleport(x, y, teleports) {
  let result = false;

  if (teleports.length === 2) {
    if (
      (teleports[0].x === x && teleports[0].y === y) ||
      (teleports[1].x === x && teleports[1].y === y)
    ) {
      result = true;
    }
  }
  return result;
}

function notInAir(x, y, backData, gameData) {
  return (
    gameData[y + 1][x] !== 0 ||
    isLadder(x, y, backData) ||
    isLadder(x, y + 1, backData) ||
    inWater(x, y, backData)
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
    case "U":
      result = 106;
      break;
    case "D":
      result = 6;
      break;
    case "L":
      result = 7;
      break;
    case "R":
      result = 107;
      break;
    case "8":
      result = 8;
      break;
    case "9":
      result = 9;
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
    case "=":
      result = 25;
      break;
    case "p":
      result = 28;
      break;
    case "T":
      result = 31;
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
    case "C":
      result = 84;
      break;
    case "c":
      result = 85;
      break;
    case "+":
      result = 86;
      break;
    case ">":
      result = 10;
      break;
    case "<":
      result = 11;
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
    case "W":
      result = 20;
      break;
    case "w":
      result = 23;
      break;
    case "d":
      result = 26;
      break;
    case "f":
      result = 27;
      break;
    case "!":
      result = 91;
      break;
    case "-":
      result = 13;
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
    case 106:
      result = "U";
      break;
    case 6:
      result = "D";
      break;
    case 7:
      result = "L";
      break;
    case 107:
      result = "R";
      break;
    case 8:
      result = "8";
      break;
    case 9:
      result = "9";
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
    case 25:
      result = "=";
      break;
    case 28:
      result = "p";
      break;
    case 31:
      result = "T";
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
    case 84:
      result = "C";
      break;
    case 85:
      result = "c";
      break;
    case 86:
      result = "+";
      break;
    case 10:
      result = ">";
      break;
    case 11:
      result = "<";
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
    case 20:
      result = "W";
      break;
    case 23:
      result = "w";
      break;
    case 26:
      result = "d";
      break;
    case 27:
      result = "f";
      break;
    case 91:
      result = "!";
      break;
    case 13:
      result = "-";
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
  let result = {};
  result.update = false;
  result.ballX = -1;
  result.ballY = -1;
  result.sound = 0;

  for (let i = gameData.length - 2; i >= 0; i--) {
    for (let j = 0; j < gameData[i].length; j++) {
      let element1 = gameData[i][j];
      let element2 = gameData[i + 1][j];

      if (j < gameData[i].length - 1) {
        if (
          element2 === 15 &&
          (element1 === 2 || element1 === 4 || element1 === 8) &&
          gameData[i][j + 1] === 0 &&
          gameData[i + 1][j + 1] === 0
        ) {
          result.update = true;
          if (element1 === 2) {
            result.ballX = j + 1;
            result.ballY = i;
          }
          if (element1 === 8) {
            updateRed(gameInfo.redBalls, j, i, j + 1, i);
          }
          gameData[i][j + 1] = gameData[i][j];
          gameData[i][j] = 0;
        }
      }

      if (j >= 1) {
        if (
          element2 === 16 &&
          (element1 === 2 || element1 === 4 || element1 === 8) &&
          gameData[i][j - 1] === 0 &&
          gameData[i + 1][j - 1] === 0
        ) {
          result.update = true;
          if (element1 === 2) {
            result.ballX = j - 1;
            result.ballY = i;
          }
          if (element1 === 8) {
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

      if (
        element2 === 0 &&
        ((element1 === 2 &&
          !isLadder(j, i, backData) &&
          !isLadder(j, i + 1, backData) &&
          !inWater(j, i, backData)) ||
          element1 === 4 ||
          element1 === 8)
      ) {
        result.update = true;
        if (element1 === 2) {
          result.ballX = j;
          result.ballY = i + 1;
        }
        if (element1 === 8) {
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

function whiteOrBlue(n) {
  return n === 4 || n === 5;
}

export function moveLeft(
  backData,
  gameData,
  x,
  y,
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  let row = gameData[y];
  result.eating = false;
  result.player = false;
  result.oneDirection = false;
  result.teleporting = false;
  result.rotate = false;
  result.divingGlasses = false;

  if (gameData.length > 0) {
    if (notInAir(x, y, backData, gameData)) {
      if (x > 0) {
        // empty space, green ball or diving glasses
        if (!result.player && [0, 3, 26].includes(row[x - 1])) {
          if (row[x - 1] === 3) {
            result.eating = true;
          }
          if (row[x - 1] === 26) {
            result.divingGlasses = true;
          }
          row[x] = 0;
          row[x - 1] = 2;
          result.player = true;
        }
      }
      if (x > 1) {
        // 1 object
        if (
          !result.player &&
          (whiteOrBlue(row[x - 1]) || canMoveAlone(row[x - 1])) &&
          row[x - 2] === 0
        ) {
          if (row[x - 1] === 9) {
            updateYellow(gameInfo.yellowBalls, x - 1, y, x - 2, y, "left");
          }
          row[x - 2] = row[x - 1];
          row[x - 1] = 2;
          row[x] = 0;
          result.player = true;
        }
        if (!result.player && row[x - 1] === 11 && row[x - 2] === 0) {
          row[x - 2] = 2;
          row[x] = 0;
          result.player = true;
          result.oneDirection = true;
        }
        if (!result.player && row[x - 1] === 89 && row[x - 2] === 0) {
          row[x - 2] = 2;
          row[x] = 0;
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
          row[x] = 0;
          result.player = true;
        }
      }
      if (!result.player && x > 0) {
        if (row[x - 1] === 31) {
          row[x - 1] = 2;
          row[x] = 0;
          result.player = true;
          result.teleporting = true;
        }
      }
      if (result.player && gameInfo.teleports.length === 2) {
        if (isTeleport(x, y, gameInfo.teleports)) {
          row[x] = 31;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  let row = gameData[y];
  let maxX = 0;
  result.eating = false;
  result.player = false;
  result.oneDirection = false;
  result.teleporting = false;
  result.rotate = false;
  result.divingGlasses = false;

  if (gameData.length > 0) {
    if (notInAir(x, y, backData, gameData)) {
      maxX = gameData[0].length - 1;
      if (x < maxX) {
        // empty space, green ball or diving glasses
        if (!result.player && [0, 3, 26].includes(row[x + 1])) {
          if (row[x + 1] === 3) {
            result.eating = true;
          }
          if (row[x + 1] === 26) {
            result.divingGlasses = true;
          }
          row[x] = 0;
          row[x + 1] = 2;
          result.player = true;
        }
      }
      if (x < maxX - 1) {
        // 1 object
        if (
          !result.player &&
          (whiteOrBlue(row[x + 1]) || canMoveAlone(row[x + 1])) &&
          row[x + 2] === 0
        ) {
          if (row[x + 1] === 9) {
            updateYellow(gameInfo.yellowBalls, x + 1, y, x + 2, y, "right");
          }
          row[x + 2] = row[x + 1];
          row[x + 1] = 2;
          row[x] = 0;
          result.player = true;
        }
        if (!result.player && row[x + 1] === 10 && row[x + 2] === 0) {
          row[x + 2] = 2;
          row[x] = 0;
          result.player = true;
          result.oneDirection = true;
        }
        if (!result.player && row[x + 1] === 89 && row[x + 2] === 0) {
          row[x + 2] = 2;
          row[x] = 0;
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
          row[x] = 0;
          result.player = true;
        }
      }
      if (!result.player && x < gameData[0].length - 1) {
        if (row[x + 1] === 31) {
          row[x + 1] = 2;
          row[x] = 0;
          result.player = true;
          result.teleporting = true;
        }
      }
      if (result.player && gameInfo.teleports.length === 2) {
        if (isTeleport(x, y, gameInfo.teleports)) {
          row[x] = 31;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.eating = false;
  result.player = false;
  result.oneDirection = false;
  result.divingGlasses = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (y > 0 && notInAir(x, y, backData, gameData)) {
        if (!result.player && [0, 3, 26].includes(gameData[y - 1][x])) {
          if (gameData[y - 1][x] === 3) {
            result.eating = true;
          }
          if (gameData[y - 1][x] === 26) {
            result.divingGlasses = true;
          }
          gameData[y - 1][x] = 2;
          gameData[y][x] = 0;
          result.player = true;
        }
      }
      if (y > 1 && notInAir(x, y, backData, gameData)) {
        if (
          !result.player &&
          canMoveAlone(gameData[y - 1][x]) &&
          gameData[y - 2][x] === 0
        ) {
          if (gameData[y - 1][x] === 9) {
            updateYellow(gameInfo.yellowBalls, x, y - 1, x, y - 2, "up");
          }
          gameData[y - 2][x] = gameData[y - 1][x];
          gameData[y - 1][x] = 2;
          gameData[y][x] = 0;
          result.player = true;
        }
        if (
          !result.player &&
          gameData[y - 1][x] === 87 &&
          gameData[y - 2][x] === 0
        ) {
          gameData[y - 2][x] = 2;
          gameData[y][x] = 0;
          result.player = true;
          result.oneDirection = true;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.eating = false;
  result.player = false;
  result.divingGlasses = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (y > 0 && x > 0 && notInAir(x, y, backData, gameData)) {
        if (gameData[y - 1][x] === 0) {
          if ([0, 3, 26].includes(gameData[y - 1][x - 1])) {
            if (gameData[y - 1][x - 1] === 3) {
              result.eating = true;
            }
            if (gameData[y - 1][x - 1] === 26) {
              result.divingGlasses = true;
            }
            gameData[y - 1][x - 1] = 2;
            gameData[y][x] = 0;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.eating = false;
  result.player = false;
  result.divingGlasses = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0) {
      if (
        y > 0 &&
        x < gameData[0].length - 1 &&
        notInAir(x, y, backData, gameData)
      ) {
        if (gameData[y - 1][x] === 0) {
          if ([0, 3, 26].includes(gameData[y - 1][x + 1])) {
            if (gameData[y - 1][x + 1] === 3) {
              result.eating = true;
            }
            if (gameData[y - 1][x + 1] === 26) {
              result.divingGlasses = true;
            }
            gameData[y - 1][x + 1] = 2;
            gameData[y][x] = 0;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.player = false;
  result.oneDirection = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        !result.player &&
        canMoveAlone(gameData[y + 1][x]) &&
        gameData[y + 2][x] === 0
      ) {
        gameData[y + 2][x] = gameData[y + 1][x];
        gameData[y + 1][x] = 2;
        gameData[y][x] = 0;
        if (gameData[y + 2][x] === 9) {
          updateYellow(gameInfo.yellowBalls, x, y + 1, x, y + 2, "down");
        }
        result.player = true;
      }
      if (
        !result.player &&
        gameData[y + 1][x] === 88 &&
        gameData[y + 2][x] === 0
      ) {
        gameData[y + 2][x] = 2;
        gameData[y][x] = 0;
        result.player = true;
        result.oneDirection = true;
      }
      if (
        !result.player &&
        gameData[y + 1][x] === 0 &&
        (isLadder(x, y, backData) ||
          isLadder(x, y + 1, backData) ||
          inWater(x, y, backData))
      ) {
        gameData[y + 1][x] = 2;
        gameData[y][x] = 0;
        result.player = true;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.player = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x - 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        inWater(x, y, backData)
      ) {
        gameData[y + 1][x - 1] = 2;
        gameData[y][x] = 0;
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
  gameInfo = { yellowBalls: [], teleports: [] }
) {
  let result = {};
  result.player = false;

  if (!isTeleport(x, y, gameInfo.teleports)) {
    if (gameData.length > 0 && y < gameData.length - 2) {
      if (
        gameData[y + 1][x + 1] === 0 &&
        gameData[y + 1][x] === 0 &&
        inWater(x, y, backData)
      ) {
        gameData[y + 1][x + 1] = 2;
        gameData[y][x] = 0;
        result.player = true;
      }
    }
  }
  return result;
}

export function getGameInfo(backData, gameData) {
  let result = {};
  result.blueBall = { x: -1, y: -1 };
  result.elevators = [];
  result.greenBalls = 0;
  result.horizontalElevators = [];
  result.redBalls = [];
  result.yellowBalls = [];
  result.detonator = { x: -1, y: -1 };
  result.teleports = [];
  result.hasWater = false;
  result.hasDivingGlasses = false;
  result.redFish = [];
  result.electricity = [];
  result.electricityActive = false;
  result.trapDoors = [];

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
      if (gameData[i][j] === 8) {
        let redBall = {};
        redBall.x = j;
        redBall.y = i;
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
        result.teleports.push(teleport);
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
    }
  }
  return result;
}

export function checkRed(arr, x, y, redBalls) {
  let result = {};
  result.hit = false;
  result.x1 = -1;
  result.x2 = -1;
  result.y = -1;
  for (let i = 0; i < redBalls.length; i++) {
    if (redBalls[i].y === y) {
      result.y = y;
      result.hit = true;
      if (redBalls[i].x > x) {
        result.x1 = x + 1;
        result.x2 = redBalls[i].x - 1;
      } else {
        result.x1 = redBalls[i].x + 1;
        result.x2 = x - 1;
      }
      if (result.x2 >= result.x1) {
        for (let j = result.x1; j <= result.x2; j++) {
          if (arr[y][j] !== 0) {
            result.hit = false;
            result.x1 = -1;
            result.x2 = -1;
            result.y = -1;
          }
        }
      }
    }
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

  //console.log("moveElevators");
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
        if (![2, 4, 8, 6, 106].includes(arr[j][elevators[i].x])) {
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
            if (arr[j + 1][x] === 0 && [2, 4, 8].includes(arr[j][x])) {
              if (arr[j][x] === 2) {
                result.playerX = x;
                result.playerY = j + 1;
              }
              if (arr[j][x] === 8) {
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
          if ([2, 4, 8].includes(arr[j][x]) && arr[j][x + 1] === 0) {
            if (arr[j][x] === 8) {
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
          if ([2, 4, 8].includes(arr[j][x]) && arr[j][x - 1] === 0) {
            if (arr[j][x] === 8) {
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
