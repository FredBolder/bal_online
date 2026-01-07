import { getGameDataValue, hasWeightAbove, hasWeightBelow, moveObject } from "./balUtils.js";

function moveableByElevator(gameInfo, n) {
  let result = false;

  switch (n) {
    case 4:
    case 8:
    case 40:
    case 93:
    case 94:
    case 203:
    case 245:
      result = true;
      break;
    case 2:
      result = !gameInfo.hasPropeller;
      break;
    default:
      result = false;
      break;
  }
  return result;
}

export function checkElevatorInOuts(gameData, gameInfo, gameVars) {
  let data1 = 0;
  let data2 = 0;
  let data3 = 0;
  let data4 = 0;
  let data5 = 0;
  let dy = 0;
  let updated = false;

  if (gameVars.gravity === "down") {
    dy = -1;
  } else {
    dy = 1;
  }

  for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
    const elevatorInOut = gameInfo.elevatorInOuts[i];
    data1 = gameData[elevatorInOut.y][elevatorInOut.x + 1];
    data2 = gameData[elevatorInOut.y + dy][elevatorInOut.x];
    data3 = gameData[elevatorInOut.y + dy][elevatorInOut.x + 1];
    data4 = gameData[elevatorInOut.y + dy][elevatorInOut.x - 1];
    data5 = gameData[elevatorInOut.y][elevatorInOut.x - 1];
    elevatorInOut.player = false;
    switch (elevatorInOut.status) {
      case 0:
        if ([6, 7, 106, 107].includes(data1)) {
          if (moveableByElevator(gameInfo, data2) && (data3 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y + dy, elevatorInOut.x + 1, elevatorInOut.y + dy);
            elevatorInOut.status = 10;
          }
          if (moveableByElevator(gameInfo, data3) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the left
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x + 1, elevatorInOut.y + dy, elevatorInOut.x, elevatorInOut.y + dy);
            elevatorInOut.status = 1;
          }
        }
        if ([6, 7, 106, 107].includes(data5)) {
          if (moveableByElevator(gameInfo, data2) && (data4 === 0) && (elevatorInOut.status === 0)) {
            // Enter from the right
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y + dy, elevatorInOut.x - 1, elevatorInOut.y + dy);
            elevatorInOut.status = 10;
          }
          if (moveableByElevator(gameInfo, data4) && (data2 === 0) && (elevatorInOut.status === 0)) {
            // Exit to the right
            updated = true;
            moveObject(gameData, gameInfo, elevatorInOut.x - 1, elevatorInOut.y + dy, elevatorInOut.x, elevatorInOut.y + dy);
            elevatorInOut.status = 2;
          }
        }
        break;
      case 1:
        if (data4 === 0) {
          // Further to the left
          updated = true;
          moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y + dy, elevatorInOut.x - 1, elevatorInOut.y + dy);
        }
        elevatorInOut.status = 10;
        break;
      case 2:
        if (data3 === 0) {
          // Further to the right
          updated = true;
          moveObject(gameData, gameInfo, elevatorInOut.x, elevatorInOut.y + dy, elevatorInOut.x + 1, elevatorInOut.y + dy);
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

export function moveElevators(backData, gameData, gameInfo, gameVars) {
  let changeElevators = [];
  let found = false;
  const gravityDown = (gameVars.gravity === "down");
  let updated = false;

  for (let i = 0; i < gameInfo.elevators.length; i++) {
    const elevator = gameInfo.elevators[i];
    const elAbove = getGameDataValue(gameData, elevator.x, elevator.y - 1);
    const elBelow = getGameDataValue(gameData, elevator.x, elevator.y + 1);
    let directionChanged = false;
    let downPossible = false;
    let hasBlue = elevator.hasBlueBall;
    let upPossible = false;
    let emptyDown = -1;
    let emptyUp = -1;
    let x = 0;
    let y = 0;

    // Check for direction changer
    if ((elAbove === 246) || (elBelow === 247)) {
      changeElevators.push({ index: i, direction: "right" });
      continue;
    } else if ((elAbove === 247) || (elBelow === 246)) {
      changeElevators.push({ index: i, direction: "left" });
      continue;
    }

    // Check in which directions it is possible to move
    emptyUp = -1;
    upPossible = true;
    for (let j = elevator.y - 1; j >= 0; j--) {
      const objectNumber = gameData[j][elevator.x];
      if (objectNumber === 0) {
        emptyUp = j;
        break;
      }
      if (!moveableByElevator(gameInfo, objectNumber)) {
        upPossible = false;
      }
      if (upPossible && (objectNumber === 2)) {
        if (!elevator.hasBlueBall && gravityDown && !hasWeightAbove(backData, gameData, gameInfo, gameVars, elevator.x, elevator.x, j + 1, false)) {
          upPossible = false;
        }
        if (!elevator.hasBlueBall && !gravityDown && !hasWeightBelow(backData, gameData, gameInfo, gameVars, elevator.x, elevator.x, j - 1, false)) {
          upPossible = false;
        }
      }
    }
    if (emptyUp === -1) {
      upPossible = false;
    }

    emptyDown = -1;
    downPossible = true;
    for (let j = elevator.y + 1; j < gameData.length; j++) {
      const objectNumber = gameData[j][elevator.x];
      if (objectNumber === 0) {
        emptyDown = j;
        break;
      }
      if (!moveableByElevator(gameInfo, objectNumber)) {
        downPossible = false;
      }
      if (downPossible && (objectNumber === 2)) {
        if (!elevator.hasBlueBall && gravityDown && !hasWeightAbove(backData, gameData, gameInfo, gameVars, elevator.x, elevator.x, j + 1, false)) {
          downPossible = false;
        }
        if (!elevator.hasBlueBall && !gravityDown && !hasWeightBelow(backData, gameData, gameInfo, gameVars, elevator.x, elevator.x, j - 1, false)) {
          downPossible = false;
        }
      }
    }
    if (emptyDown === -1) {
      downPossible = false;
    }
    if (gravityDown && (elevator.y < gameData.length - 1)) {
      if ((gameData[elevator.y + 1][elevator.x] !== 0)) {
        downPossible = false;
      }
    }
    if (!gravityDown && (elevator.y > 0)) {
      if ((gameData[elevator.y - 1][elevator.x] !== 0)) {
        upPossible = false;
      }
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
          gameData[elevator.y][elevator.x] = 0;
          elevator.y--;
          hasBlue = false;
          updated = true;
          if (gravityDown) {
            for (let j = emptyUp; j < y - 1; j++) {
              if (gameData[j + 1][x] === 2) {
                hasBlue = true;
              }
              moveObject(gameData, gameInfo, x, j + 1, x, j);
            }
          } else {
            for (let j = y + 1; j < gameData.length; j++) {
              const objectNumber = gameData[j][x];
              if ((gameData[j - 1][x] !== 0) || !moveableByElevator(gameInfo, objectNumber)) {
                break;
              }
              if ((objectNumber === 2) && !elevator.hasBlueBall && !hasWeightBelow(backData, gameData, gameInfo, gameVars, x, x, j - 1, false)) {
                break;
              }
              moveObject(gameData, gameInfo, x, j, x, j - 1);
              if (objectNumber === 2) {
                hasBlue = true;
              }
            }
          }
          gameData[elevator.y][elevator.x] = 106;
        }
      } else {
        // Move down
        if (downPossible) {
          gameData[elevator.y][elevator.x] = 0;
          elevator.y++;
          hasBlue = false;
          updated = true;
          if (gravityDown) {
            for (let j = y - 1; j >= 0; j--) {
              const objectNumber = gameData[j][x];
              if ((gameData[j + 1][x] !== 0) || !moveableByElevator(gameInfo, objectNumber)) {
                break;
              }
              if ((objectNumber === 2) && !elevator.hasBlueBall && !hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, j + 1, false)) {
                break;
              }
              moveObject(gameData, gameInfo, x, j, x, j + 1);
              if (objectNumber === 2) {
                hasBlue = true;
              }
            }
          } else {
            for (let j = emptyDown; j > y + 1; j--) {
              if (gameData[j - 1][x] === 2) {
                hasBlue = true;
              }
              moveObject(gameData, gameInfo, x, j - 1, x, j);
            }
          }
          gameData[elevator.y][elevator.x] = 6;
        }
      }
    }
    elevator.hasBlueBall = hasBlue;
  }

  if (changeElevators.length > 0) {
    updated = true;
    for (let i = 0; i < changeElevators.length; i++) {
      const index = changeElevators[i].index;
      const direction = changeElevators[i].direction;
      const elevatorOld = gameInfo.elevators[index];
      const elevatorNew = {
        x: elevatorOld.x,
        y: elevatorOld.y,
        right: direction === "right",
        hasBlueBall: elevatorOld.hasBlueBall
      };
      gameInfo.horizontalElevators.push(elevatorNew);
      gameData[elevatorNew.y][elevatorNew.x] = (direction === "right") ? 107 : 7;
    }
    // Delete changed elevators
    const newElevators = [];
    for (let i = 0; i < gameInfo.elevators.length; i++) {
      const elevator = gameInfo.elevators[i];
      found = false;
      for (let j = 0; j < changeElevators.length; j++) {
        if (changeElevators[j].index === i) {
          found = true;
        }
      }
      if (!found) {
        newElevators.push(elevator);
      }
    }
    gameInfo.elevators.length = 0;
    gameInfo.elevators = newElevators;
  }
  return updated;
}

export function moveHorizontalElevators(backData, gameData, gameInfo, gameVars) {
  let changeElevators = [];
  let dx = 0;
  let el = 0;
  let found = false;
  const gravityDown = (gameVars.gravity === "down");
  let updated = false;
  let yFrom = -1;
  let yObject = -1;
  let yStep = -1;
  let yTo = -1;
  let stop = false;

  for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
    const elevator = gameInfo.horizontalElevators[i];
    const x = elevator.x;
    const y = elevator.y;
    const elLeft = getGameDataValue(gameData, x - 1, y);
    const elRight = getGameDataValue(gameData, x + 1, y);
    let directionChanged = false;
    let hasBlue = false;

    // Check for direction changer
    if ((elLeft === 246) || (elRight === 247)) {
      changeElevators.push({ index: i, direction: "down" });
      continue;
    } else if ((elLeft === 247) || (elRight === 246)) {
      changeElevators.push({ index: i, direction: "up" });
      continue;
    }

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
          yFrom = y - 1;
          yTo = 0;
          yStep = -1;
        } else {
          yFrom = y + 1;
          yTo = gameData.length - 1;
          yStep = 1;
        }
        yObject = yFrom;
        while (!stop && (((yObject >= yTo) && gravityDown) || ((yObject <= yTo) && !gravityDown))) {
          const objectNumber = gameData[yObject][x];
          if (moveableByElevator(gameInfo, objectNumber) && gameData[yObject][x + dx] === 0) {
            if (objectNumber === 2) {
              if (!elevator.hasBlueBall && gravityDown && !hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, yObject - yStep, false)) {
                stop = true;
              }
              if (!elevator.hasBlueBall && !gravityDown && !hasWeightBelow(backData, gameData, gameInfo, gameVars, x, x, yObject - yStep, false)) {
                stop = true;
              }
              hasBlue = !stop;
            }
            if (!stop) {
              moveObject(gameData, gameInfo, x, yObject, x + dx, yObject);
            }
          } else {
            stop = true;
          }
          yObject += yStep;
        }
        updated = true;
      }
    }
    elevator.hasBlueBall = hasBlue;
  }

  if (changeElevators.length > 0) {
    updated = true;
    for (let i = 0; i < changeElevators.length; i++) {
      const index = changeElevators[i].index;
      const direction = changeElevators[i].direction;
      const elevatorOld = gameInfo.horizontalElevators[index];
      const elevatorNew = {
        x: elevatorOld.x,
        y: elevatorOld.y,
        up: direction === "up",
        hasBlueBall: elevatorOld.hasBlueBall
      };
      gameInfo.elevators.push(elevatorNew);
      gameData[elevatorNew.y][elevatorNew.x] = (direction === "up") ? 106 : 6;
    }
    // Delete changed elevators
    const newElevators = [];
    for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
      const elevator = gameInfo.horizontalElevators[i];
      found = false;
      for (let j = 0; j < changeElevators.length; j++) {
        if (changeElevators[j].index === i) {
          found = true;
        }
      }
      if (!found) {
        newElevators.push(elevator);
      }
    }
    gameInfo.horizontalElevators.length = 0;
    gameInfo.horizontalElevators = newElevators;
  }
  return updated;
}

