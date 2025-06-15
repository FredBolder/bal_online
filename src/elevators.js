import { updateObject } from "./balUtils.js";
import { moveOrangeBallInDirection } from "./orangeBalls.js";
import { isRedBall } from "./redBalls.js";

export function checkElevatorInOuts(arr, gameInfo) {
  let data1 = 0;
  let data2 = 0;
  let data3 = 0;
  let data4 = 0;
  let data5 = 0;
  let info = { updated: false, playerX: -1, playerY: -1 };

  for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
    const elevatorInOut = gameInfo.elevatorInOuts[i];
    data1 = arr[elevatorInOut.y][elevatorInOut.x + 1];
    data2 = arr[elevatorInOut.y - 1][elevatorInOut.x];
    data3 = arr[elevatorInOut.y - 1][elevatorInOut.x + 1];
    data4 = arr[elevatorInOut.y - 1][elevatorInOut.x - 1];
    data5 = arr[elevatorInOut.y][elevatorInOut.x - 1];
    elevatorInOut.player = false;
    switch (elevatorInOut.status) {
      case 0:
        if ([6, 7, 106, 107].includes(data1)) {
          if ([2, 4, 8, 40, 93, 94].includes(data2) && (data3 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the left
            info.updated = true;
            arr[elevatorInOut.y - 1][elevatorInOut.x + 1] = data2;
            arr[elevatorInOut.y - 1][elevatorInOut.x] = 0;
            if (data2 === 2) {
              elevatorInOut.player = true;
              info.playerX = elevatorInOut.x + 1;
              info.playerY = elevatorInOut.y - 1;
            }
            if ([8, 93, 94].includes(data2)) {
              updateObject(gameInfo.redBalls, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x + 1, elevatorInOut.y - 1);
            }
            if (data2 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x, elevatorInOut.y - 1, "right", false);
            }
            elevatorInOut.status = 10;
          }
          if ([2, 4, 8, 40, 93, 94].includes(data3) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the left
            info.updated = true;
            arr[elevatorInOut.y - 1][elevatorInOut.x] = data3;
            arr[elevatorInOut.y - 1][elevatorInOut.x + 1] = 0;
            if (data3 === 2) {
              elevatorInOut.player = true;
              info.playerX = elevatorInOut.x;
              info.playerY = elevatorInOut.y - 1;
            }
            if ([8, 93, 94].includes(data3)) {
              updateObject(gameInfo.redBalls, elevatorInOut.x + 1, elevatorInOut.y - 1, elevatorInOut.x, elevatorInOut.y - 1);
            }
            if (data3 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x + 1, elevatorInOut.y - 1, "left", false);
            }
            elevatorInOut.status = 1;
          }
        }
        if ([6, 7, 106, 107].includes(data5)) {
          if ([2, 4, 8, 40, 93, 94].includes(data2) && (data4 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the right
            info.updated = true;
            arr[elevatorInOut.y - 1][elevatorInOut.x - 1] = data2;
            arr[elevatorInOut.y - 1][elevatorInOut.x] = 0;
            if (data2 === 2) {
              elevatorInOut.player = true;
              info.playerX = elevatorInOut.x - 1;
              info.playerY = elevatorInOut.y - 1;
            }
            if ([8, 93, 94].includes(data2)) {
              updateObject(gameInfo.redBalls, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x - 1, elevatorInOut.y - 1);
            }
            if (data2 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x, elevatorInOut.y - 1, "left", false);
            }
            elevatorInOut.status = 10;
          }
          if ([2, 4, 8, 40, 93, 94].includes(data4) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the right
            info.updated = true;
            arr[elevatorInOut.y - 1][elevatorInOut.x] = data4;
            arr[elevatorInOut.y - 1][elevatorInOut.x - 1] = 0;
            if (data4 === 2) {
              elevatorInOut.player = true;
              info.playerX = elevatorInOut.x;
              info.playerY = elevatorInOut.y - 1;
            }
            if ([8, 93, 94].includes(data4)) {
              updateObject(gameInfo.redBalls, elevatorInOut.x - 1, elevatorInOut.y - 1, elevatorInOut.x, elevatorInOut.y - 1);
            }
            if (data4 === 40) {
              moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x - 1, elevatorInOut.y - 1, "right", false);
            }
            elevatorInOut.status = 2;
          }
        }
        break;
      case 1:
        if (data4 === 0) {
          // Further to the left
          info.updated = true;
          arr[elevatorInOut.y - 1][elevatorInOut.x - 1] = arr[elevatorInOut.y - 1][elevatorInOut.x];
          arr[elevatorInOut.y - 1][elevatorInOut.x] = 0;
          if (arr[elevatorInOut.y - 1][elevatorInOut.x - 1] === 2) {
            info.playerX = elevatorInOut.x - 1;
            info.playerY = elevatorInOut.y - 1;
          }
          if ([8, 93, 94].includes(arr[elevatorInOut.y - 1][elevatorInOut.x - 1])) {
            updateObject(gameInfo.redBalls, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x - 1, elevatorInOut.y - 1);
          }
          if (arr[elevatorInOut.y - 1][elevatorInOut.x - 1] === 40) {
            moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x, elevatorInOut.y - 1, "left", false);
          }
        }
        elevatorInOut.status = 10;
        break;
      case 2:
        if (data3 === 0) {
          // Further to the right
          info.updated = true;
          arr[elevatorInOut.y - 1][elevatorInOut.x + 1] = arr[elevatorInOut.y - 1][elevatorInOut.x];
          arr[elevatorInOut.y - 1][elevatorInOut.x] = 0;
          if (arr[elevatorInOut.y - 1][elevatorInOut.x + 1] === 2) {
            info.playerX = elevatorInOut.x + 1;
            info.playerY = elevatorInOut.y - 1;
          }
          if ([8, 93, 94].includes(arr[elevatorInOut.y - 1][elevatorInOut.x + 1])) {
            updateObject(gameInfo.redBalls, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x + 1, elevatorInOut.y - 1);
          }
          if (arr[elevatorInOut.y - 1][elevatorInOut.x + 1] === 40) {
            moveOrangeBallInDirection(gameInfo.orangeBalls, elevatorInOut.x, elevatorInOut.y - 1, "right", false);
          }
        }
        elevatorInOut.status = 10;
        break;
      case 10:
        if (![6, 7, 106, 107].includes(data1) && ![6, 7, 106, 107].includes(data5)) {
          elevatorInOut.status = 0;
        }
        break;
      default:
        break;
    }
  }
  return info;
}

export function moveElevators(arr, elevators, redBalls, orangeBalls) {
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
        if (![2, 4, 8, 40, 93, 94, 6, 106].includes(arr[j][elevators[i].x])) {
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
                updateObject(redBalls, x, j + 1, x, j);
                break;
              case 40:
                moveOrangeBallInDirection(orangeBalls, x, j + 1, "up", false);
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
          for (let j = y; j >= 0; j--) {
            if (arr[j + 1][x] === 0 && [2, 4, 8, 40, 93, 94].includes(arr[j][x])) {
              if (arr[j][x] === 2) {
                result.playerX = x;
                result.playerY = j + 1;
              }
              if (isRedBall(arr[j][x])) {
                updateObject(redBalls, x, j, x, j + 1);
              }
              if (arr[j][x] === 40) {
                moveOrangeBallInDirection(orangeBalls, x, j, "down", false);
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

export function moveHorizontalElevators(arr, elevators, redBalls, orangeBalls) {
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
          if ([2, 4, 8, 40, 93, 94].includes(arr[j][x]) && arr[j][x + 1] === 0) {
            if (isRedBall(arr[j][x])) {
              updateObject(redBalls, x, j, x + 1, j);
            }
            if (arr[j][x] === 40) {
              moveOrangeBallInDirection(orangeBalls, x, j, "right", false);
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
          if ([2, 4, 8, 40, 93, 94].includes(arr[j][x]) && arr[j][x - 1] === 0) {
            if (isRedBall(arr[j][x])) {
              updateObject(redBalls, x, j, x - 1, j);
            }
            if (arr[j][x] === 40) {
              moveOrangeBallInDirection(orangeBalls, x, j, "left", false);
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

