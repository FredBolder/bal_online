function rotateDirection(direction, rotateLeft) {
  let result = direction;

  if (rotateLeft) {
    switch (direction) {
      case "down":
        result = "right";
        break;
      case "right":
        result = "up";
        break;
      case "up":
        result = "left";
        break;
      case "left":
        result = "down";
        break;
      case "downleft":
        result = "downright";
        break;
      case "downright":
        result = "upright";
        break;
      case "upright":
        result = "upleft";
        break;
      case "upleft":
        result = "downleft";
        break;
      default:
        break;
    }
  } else {
    switch (direction) {
      case "down":
        result = "left";
        break;
      case "left":
        result = "up";
        break;
      case "up":
        result = "right";
        break;
      case "right":
        result = "down";
        break;
      case "downleft":
        result = "upleft";
        break;
      case "upleft":
        result = "upright";
        break;
      case "upright":
        result = "downright";
        break;
      case "downright":
        result = "downleft";
        break;
      default:
        break;
    }
  }
  return result;
}

function rotateXY(obj, rows, rotateLeft) {
  let x = obj.x;
  let y = obj.y;

  if ((x >= 0) && (y >= 0)) {
    if (rotateLeft) {
      obj.y = rows - (x + 1);
      obj.x = y;
    } else {
      obj.y = x;
      obj.x = rows - (y + 1);
    }
  }
}

export function rotateGame(backData, gameData, gameInfo, rotateLeft = false) {
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
          let gd = 0;
          let bd = 0;
          if (rotateLeft) {
            gd = gameData[(columns - 1) - j][(rows - 1) - i];
            bd = backData[(columns - 1) - j][(rows - 1) - i];
          } else {
            gd = gameData[j][i];
            bd = backData[j][i];
          }
          let gdMap = null;
          let bdMap = null;
          if (rotateLeft) {
            gdMap = {
              6: 107, 7: 6,
              10: 87, 11: 88,
              15: 16, 16: 18, 17: 15, 18: 17,
              84: 85, 85: 84,
              87: 11, 88: 10,
              95: 96, 96: 95,
              100: 104, 101: 103, 103: 100, 104: 101,
              106: 7, 107: 106,
              109: 112, 110: 111, 111: 109, 112: 110,
              121: 125, 122: 124, 124: 121, 125: 122,
              126: 130, 127: 129, 129: 126, 130: 127,
              138: 139, 139: 138,
              141: 142, 142: 144, 143: 141, 144: 143,
              145: 148, 146: 147, 147: 145, 148: 146,
              149: 150, 150: 152, 151: 149, 152: 151,
              159: 163, 161: 165, 163: 161, 165: 159,
              160: 164, 162: 166, 164: 162, 166: 160,
              174: 177, 175: 176, 176: 174, 177: 175
            };

            bdMap = {
              25: 90,
              80: 137,
              90: 25,
              137: 80
            };
          } else {
            gdMap = {
              6: 7, 7: 106,
              10: 88, 11: 87,
              15: 17, 16: 15, 17: 18, 18: 16,
              84: 85, 85: 84,
              87: 10, 88: 11,
              95: 96, 96: 95,
              100: 103, 101: 104, 103: 101, 104: 100,
              106: 107, 107: 6,
              109: 111, 110: 112, 111: 110, 112: 109,
              121: 124, 122: 125, 124: 122, 125: 121,
              126: 129, 127: 130, 129: 127, 130: 126,
              138: 139, 139: 138,
              141: 143, 142: 141, 143: 144, 144: 142,
              145: 147, 146: 148, 147: 146, 148: 145,
              149: 151, 150: 149, 151: 152, 152: 150,
              159: 165, 161: 163, 163: 159, 165: 161,
              160: 166, 162: 164, 164: 160, 166: 162,
              174: 176, 175: 177, 176: 175, 177: 174
            };

            bdMap = {
              25: 90,
              80: 137,
              90: 25,
              137: 80
            };
          }

          if (Object.prototype.hasOwnProperty.call(gdMap, gd)) gd = gdMap[gd];
          if (Object.prototype.hasOwnProperty.call(bdMap, bd)) bd = bdMap[bd];

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

      // Blue ball
      rotateXY(gameInfo.blueBall1, rows, rotateLeft);
      if (gameInfo.twoBlue) {
        rotateXY(gameInfo.blueBall2, rows, rotateLeft);
      }

      // Copiers
      for (let i = 0; i < gameInfo.copiers.length; i++) {
        rotateXY(gameInfo.copiers[i], rows, rotateLeft);
      }

      // ConveyorBelts
      for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        rotateXY(gameInfo.conveyorBelts[i], rows, rotateLeft);
      }

      // Damaged stones
      for (let i = 0; i < gameInfo.damagedStones.length; i++) {
        rotateXY(gameInfo.damagedStones[i], rows, rotateLeft);
      }

      // Delays
      for (let i = 0; i < gameInfo.delays.length; i++) {
        rotateXY(gameInfo.delay[i], rows, rotateLeft);
      }

      // Electricity
      for (let i = 0; i < gameInfo.electricity.length; i++) {
        rotateXY(gameInfo.electricity[i], rows, rotateLeft);
      }

      // Elevators
      let newHorElevators = [];
      for (let i = 0; i < gameInfo.elevators.length; i++) {
        x = gameInfo.elevators[i].x;
        y = gameInfo.elevators[i].y;
        let newHor = {};
        if (rotateLeft) {
          newHor.x = y;
          newHor.y = rows - (x + 1);
          newHor.right = !gameInfo.elevators[i].up;
        } else {
          newHor.x = rows - (y + 1);
          newHor.y = x;
          newHor.right = gameInfo.elevators[i].up;
        }
        newHorElevators.push(newHor);
      }
      let newVerElevators = [];
      for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
        x = gameInfo.horizontalElevators[i].x;
        y = gameInfo.horizontalElevators[i].y;
        let newVer = {};
        if (rotateLeft) {
          newVer.x = y;
          newVer.y = rows - (x + 1);
          newVer.up = gameInfo.horizontalElevators[i].right;
        } else {
          newVer.x = rows - (y + 1);
          newVer.y = x;
          newVer.up = !gameInfo.horizontalElevators[i].right;
        }
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

      // Elevator entrances and exits
      for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
        rotateXY(gameInfo.elevatorInOuts[i], rows, rotateLeft);
      }

      // Forces
      for (let i = 0; i < gameInfo.forces.length; i++) {
        rotateXY(gameInfo.forces[i], rows, rotateLeft);
        gameInfo.forces[i].direction = rotateDirection(gameInfo.forces[i].direction, rotateLeft);
      }

      // Magnets
      for (let i = 0; i < gameInfo.magnets.length; i++) {
        rotateXY(gameInfo.magnets[i], rows, rotateLeft);
      }

      // Movers
      for (let i = 0; i < gameInfo.movers.length; i++) {
        rotateXY(gameInfo.movers[i], rows, rotateLeft);
        gameInfo.movers[i].direction = rotateDirection(gameInfo.movers[i].direction, rotateLeft);
      }

      // Music boxes
      for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        rotateXY(gameInfo.musicBoxes[i], rows, rotateLeft);
      }

      // Orange balls
      for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
        rotateXY(gameInfo.orangeBalls[i], rows, rotateLeft);
        gameInfo.orangeBalls[i].direction = rotateDirection(gameInfo.orangeBalls[i].direction, rotateLeft);
      }

      // Pistons
      for (let i = 0; i < gameInfo.pistons.length; i++) {
        rotateXY(gameInfo.pistons[i], rows, rotateLeft);
        gameInfo.pistons[i].direction = rotateDirection(gameInfo.pistons[i].direction, rotateLeft);
      }

      // Red balls
      for (let i = 0; i < gameInfo.redBalls.length; i++) {
        rotateXY(gameInfo.redBalls[i], rows, rotateLeft);
      }

      // Red fish
      for (let i = 0; i < gameInfo.redFish.length; i++) {
        rotateXY(gameInfo.redFish[i], rows, rotateLeft);
      }

      // Teleports
      for (let i = 0; i < gameInfo.teleports.length; i++) {
        rotateXY(gameInfo.teleports[i], rows, rotateLeft);
      }

      // Time bombs
      for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        rotateXY(gameInfo.timeBombs[i], rows, rotateLeft);
      }

      // Trap doors
      for (let i = 0; i < gameInfo.trapDoors.length; i++) {
        rotateXY(gameInfo.trapDoors[i], rows, rotateLeft);
      }

      // Yellow balls
      for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
        rotateXY(gameInfo.yellowBalls[i], rows, rotateLeft);
        gameInfo.yellowBalls[i].direction = rotateDirection(gameInfo.yellowBalls[i].direction, rotateLeft);
      }

      // Yellow bars
      for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        rotateXY(gameInfo.yellowBars[i], rows, rotateLeft);
        gameInfo.yellowBars[i].direction = rotateDirection(gameInfo.yellowBars[i].direction, rotateLeft);
      }

      // Triggers, detonators etc
      rotateXY(gameInfo.detonator, rows, rotateLeft);
      for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        rotateXY(gameInfo.pistonsTriggers[i], rows, rotateLeft);
      }
      rotateXY(gameInfo.travelGate, rows, rotateLeft);
      for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
        rotateXY(gameInfo.yellowBallPushers[i], rows, rotateLeft);
      }
      for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
        rotateXY(gameInfo.yellowBallPushersTriggers[i], rows, rotateLeft);
      }
      for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
        rotateXY(gameInfo.yellowStoppers[i], rows, rotateLeft);
      }
      for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
        rotateXY(gameInfo.yellowPausers[i], rows, rotateLeft);
      }
    }
  }
  return rotated;
}

