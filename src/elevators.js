import { moveObject } from "./balUtils.js";

const moveableByElevator = [2, 4, 8, 40, 93, 94];

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
          if (moveableByElevator.includes(data2) && (data3 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x + 1, elevatorInOut.y - 1);
            elevatorInOut.status = 10;
          }
          if (moveableByElevator.includes(data3) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x + 1, elevatorInOut.y - 1, elevatorInOut.x, elevatorInOut.y - 1);
            elevatorInOut.status = 1;
          }
        }
        if ([6, 7, 106, 107].includes(data5)) {
          if (moveableByElevator.includes(data2) && (data4 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the right
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y - 1, elevatorInOut.x - 1, elevatorInOut.y - 1);
            elevatorInOut.status = 10;
          }
          if (moveableByElevator.includes(data4) && (data2 === 0) && (elevatorInOut.status === 0)) {
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

export function moveElevators(gameData, gameInfo, gameVars) {
  const gravityDown = (gameVars.gravity === "down");
  let stop = false;
  let updated = false;

  for (let i = 0; i < gameInfo.elevators.length; i++) {
    const elevator = gameInfo.elevators[i];
    let directionChanged = false;
    let downPossible = false;
    let upPossible = false;
    let emptyDown = -1;
    let emptyUp = -1;
    let x = 0;
    let y = 0;

    // Check in which directions it is possible to move
    emptyUp = -1;
    upPossible = true;
    for (let j = elevator.y - 1; ((j >= 0) && (emptyUp === -1)); j--) {
      if (emptyUp === -1 && gameData[j][elevator.x] === 0) {
        emptyUp = j;
      }
      if (emptyUp === -1) {
        if (!moveableByElevator.includes(gameData[j][elevator.x])) {
          upPossible = false;
        }
      }
    }
    if (emptyUp === -1) {
      upPossible = false;
    }

    emptyDown = -1;
    downPossible = true;
    for (let j = elevator.y + 1; ((j < gameData.length) && (emptyDown === -1)); j++) {
      if (emptyDown === -1 && gameData[j][elevator.x] === 0) {
        emptyDown = j;
      }
      if (emptyDown === -1) {
        if (!moveableByElevator.includes(gameData[j][elevator.x])) {
          downPossible = false;
        }
      }
    }
    if (emptyDown === -1) {
      downPossible = false;
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
      // Move the elevator and the objects
      x = elevator.x;
      y = elevator.y;
      if (elevator.up) {
        // Move up
        if (upPossible) {
          elevator.y = y - 1;
          gameData[y][x] = 0;
          updated = true;
          if (gravityDown) {
            for (let j = emptyUp; j < y - 1; j++) {
              moveObject(gameData, gameInfo, x, j + 1, x, j);
            }
          } else {
            stop = false;
            for (let j = y + 1; ((j < gameData.length) && !stop); j++) {
              if ((gameData[j][x] === 2) && gameInfo.hasPropeller) {
                stop = true;
              }
              if (!stop && (gameData[j - 1][x] === 0) && moveableByElevator.includes(gameData[j][x])) {
                moveObject(gameData, gameInfo, x, j, x, j - 1);
              } else {
                stop = true;
              }
            }
          }
          gameData[y - 1][x] = 106;
        }
      } else {
        // Move down
        if (downPossible) {
          gameData[y][x] = 0;
          elevator.y = y + 1;
          if (gravityDown) {
            stop = false;
            for (let j = y - 1; ((j >= 0) && !stop); j--) {
              if ((gameData[j][x] === 2) && gameInfo.hasPropeller) {
                stop = true;
              }
              if (!stop && (gameData[j + 1][x] === 0) && moveableByElevator.includes(gameData[j][x])) {
                moveObject(gameData, gameInfo, x, j, x, j + 1);
              } else {
                stop = true;
              }
            }
          } else {
            for (let j = emptyDown; j > y; j--) {
              moveObject(gameData, gameInfo, x, j - 1, x, j);
            }
          }
          gameData[y + 1][x] = 6;
          updated = true;
        }
      }
    }
  }
  return updated;
}

export function moveHorizontalElevators(gameData, gameInfo, gameVars) {
  let dx = 0;
  let el = 0;
  const gravityDown = (gameVars.gravity === "down");
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
      if (elevator.right) {
        dx = 1;
        el = 107;
      } else {
        dx = -1;
        el = 7;
      }
      if (gameData[y][x + dx] === 0) {
        gameData[y][x + dx] = el;
        gameData[y][x] = 0;
        elevator.x = x + dx;
        stop = false;
        if (gravityDown) {
          for (let j = y - 1; j >= 0 && !stop; j--) {
            if (moveableByElevator.includes(gameData[j][x]) && gameData[j][x + dx] === 0) {
              moveObject(gameData, gameInfo, x, j, x + dx, j);
            } else {
              stop = true;
            }
          }
        } else {
          for (let j = y + 1; j < gameData.length && !stop; j++) {
            if (moveableByElevator.includes(gameData[j][x]) && gameData[j][x + dx] === 0) {
              moveObject(gameData, gameInfo, x, j, x + dx, j);
            } else {
              stop = true;
            }
          }
        }
        updated = true;
      }
    }
  }
  return updated;
}

