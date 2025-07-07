import { moveObject } from "./balUtils.js";

export function checkElevatorInOuts(gameData, gameInfo) {
  let data1 = 0;
  let data2 = 0;
  let data3 = 0;
  let data4 = 0;
  let data5 = 0;
  let updated = false;

  for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
    const elevatorInOut = gameInfo.elevatorInOuts[i];
    data1 = gameData[elevatorInOut.y][elevatorInOut.x + 1];
    data2 = gameData[elevatorInOut.y - 1][elevatorInOut.x];
    data3 = gameData[elevatorInOut.y - 1][elevatorInOut.x + 1];
    data4 = gameData[elevatorInOut.y - 1][elevatorInOut.x - 1];
    data5 = gameData[elevatorInOut.y][elevatorInOut.x - 1];
    elevatorInOut.player = false;
    switch (elevatorInOut.status) {
      case 0:
        if ([6, 7, 106, 107].includes(data1)) {
          if ([2, 4, 8, 40, 93, 94].includes(data2) && (data3 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x + 1, elevatorInOut.y - 1);
            elevatorInOut.status = 10;
          }
          if ([2, 4, 8, 40, 93, 94].includes(data3) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x + 1, elevatorInOut.y - 1, elevatorInOut.x, elevatorInOut.y - 1);
            elevatorInOut.status = 1;
          }
        }
        if ([6, 7, 106, 107].includes(data5)) {
          if ([2, 4, 8, 40, 93, 94].includes(data2) && (data4 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the right
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x - 1, elevatorInOut.y - 1);
            elevatorInOut.status = 10;
          }
          if ([2, 4, 8, 40, 93, 94].includes(data4) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the right
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x - 1, elevatorInOut.y - 1, elevatorInOut.x, elevatorInOut.y - 1);
            elevatorInOut.status = 2;
          }
        }
        break;
      case 1:
        if (data4 === 0) {
          // Further to the left
          updated = true;
          moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x - 1, elevatorInOut.y - 1);
        }
        elevatorInOut.status = 10;
        break;
      case 2:
        if (data3 === 0) {
          // Further to the right
          updated = true;
          moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x + 1, elevatorInOut.y - 1);
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
  return updated;
}

export function moveElevators(gameData, gameInfo) {
  let updated = false;

  for (let i = 0; i < gameInfo.elevators.length; i++) {
    const elevator = gameInfo.elevators[i];
    let directionChanged = false;
    let downPossible = false;
    let upPossible = true;
    let emptyUp = -1;
    let x = 0;
    let y = 0;

    // Check in which directions it is possible to move
    for (let j = elevator.y; j >= 0; j--) {
      if (emptyUp === -1 && gameData[j][elevator.x] === 0) {
        emptyUp = j;
      }
      if (emptyUp === -1) {
        if (![2, 4, 8, 40, 93, 94, 6, 106].includes(gameData[j][elevator.x])) {
          upPossible = false;
        }
      }
    }
    if (emptyUp === -1) {
      upPossible = false;
    }
    if (elevator.y < gameData.length - 1) {
      downPossible = gameData[elevator.y + 1][elevator.x] === 0;
    }

    //console.log("downPossible: ", downPossible);
    //console.log("upPossible: ", upPossible);

    // Change the direction of the elevator if needed
    if (elevator.up) {
      if (!upPossible && downPossible) {
        elevator.up = false;
        gameData[elevator.y][elevator.x] = 6;
        directionChanged = true;
      }
    } else {
      if (!downPossible && upPossible) {
        elevator.up = true;
        gameData[elevator.y][elevator.x] = 106;
        directionChanged = true;
      }
    }

    if (!directionChanged) {
      // Move the elevator and everything that is on top of it
      x = elevator.x;
      y = elevator.y;
      if (elevator.up) {
        // Move up
        if (upPossible) {
          for (let j = emptyUp; j < y - 1; j++) {
            moveObject(gameData, gameInfo, x, j + 1, x, j);
          }
          elevator.y = y - 1;
          gameData[y - 1][x] = gameData[y][x];
          gameData[y][x] = 0;
          updated = true;
        }
      } else {
        // Move down
        if (downPossible) {
          gameData[y + 1][x] = gameData[y][x];
          gameData[y][x] = 0;
          elevator.y = y + 1;
          for (let j = y + 1; j >= 0; j--) {
            if (gameData[j + 1][x] === 0 && [2, 4, 8, 40, 93, 94].includes(gameData[j][x])) {
              moveObject(gameData, gameInfo, x, j, x, j + 1);
            }
          }
          updated = true;
        }
      }
    }
  }
  return updated;
}

export function moveHorizontalElevators(gameData, gameInfo) {
  let updated = false;
  let stop = false;

  for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
    const elevator = gameInfo.horizontalElevators[i];
    let directionChanged = false;
    let x = elevator.x;
    let y = elevator.y;

    if (elevator.right) {
      if (gameData[y][x + 1] !== 0 && gameData[y][x - 1] === 0) {
        elevator.right = false;
        gameData[y][x] = 7;
        directionChanged = true;
      }
    } else {
      if (gameData[y][x - 1] !== 0 && gameData[y][x + 1] === 0) {
        elevator.right = true;
        gameData[y][x] = 107;
        directionChanged = true;
      }
    }

    if (!directionChanged) {
      // Move right
      if (elevator.right && gameData[y][x + 1] === 0) {
        gameData[y][x + 1] = 107;
        gameData[y][x] = 0;
        elevator.x = x + 1;
        stop = false;
        for (let j = y - 1; j >= 0 && !stop; j--) {
          if ([2, 4, 8, 40, 93, 94].includes(gameData[j][x]) && gameData[j][x + 1] === 0) {
            moveObject(gameData, gameInfo, x, j, x + 1, j);
          } else {
            stop = true;
          }
        }
        updated = true;
      }

      // Move left
      if (!elevator.right && gameData[y][x - 1] === 0) {
        gameData[y][x - 1] = 7;
        gameData[y][x] = 0;
        elevator.x = x - 1;
        stop = false;
        for (let j = y - 1; j >= 0 && !stop; j--) {
          if ([2, 4, 8, 40, 93, 94].includes(gameData[j][x]) && gameData[j][x - 1] === 0) {
            moveObject(gameData, gameInfo, x, j, x - 1, j);
          } else {
            stop = true;
          }
        }
        updated = true;
      }
    }
  }
  return updated;
}

