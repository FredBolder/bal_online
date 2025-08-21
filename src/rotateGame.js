function rotateXY(obj, rows) {
  let x = obj.x;
  let y = obj.y;
  if ((x >= 0) && (y >= 0)) {
    obj.y = x;
    obj.x = rows - (y + 1);
  }
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
            case 6:
              gd = 7;
              break;
            case 7:
              gd = 106;
              break;
            case 10:
              gd = 88;
              break;
            case 11:
              gd = 87;
              break;
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
            case 84:
              gd = 85;
              break;
            case 85:
              gd = 84;
              break;
            case 87:
              gd = 10;
              break;
            case 88:
              gd = 11;
              break;
            case 95:
              gd = 96;
              break;
            case 96:
              gd = 95;
              break;
            case 100:
              gd = 103;
              break;
            case 101:
              gd = 104;
              break;
            case 103:
              gd = 101;
              break;
            case 104:
              gd = 100;
              break;
            case 106:
              gd = 107;
              break;
            case 107:
              gd = 6;
              break;
            case 109:
              gd = 111;
              break;
            case 110:
              gd = 112;
              break;
            case 111:
              gd = 110;
              break;
            case 112:
              gd = 109;
              break;
            case 121:
              gd = 124;
              break;
            case 122:
              gd = 125;
              break;
            case 124:
              gd = 122;
              break;
            case 125:
              gd = 121;
              break;
            case 126:
              gd = 129;
              break;
            case 127:
              gd = 130;
              break;
            case 129:
              gd = 127;
              break;
            case 130:
              gd = 126;
              break;
            case 138:
              gd = 139;
              break;
            case 139:
              gd = 138;
              break;
            case 141:
              gd = 143;
              break;
            case 142:
              gd = 141;
              break;
            case 143:
              gd = 144;
              break;
            case 144:
              gd = 142;
              break;
            case 145:
              gd = 147;
              break;
            case 146:
              gd = 148;
              break;
            case 147:
              gd = 146;
              break;
            case 148:
              gd = 145;
              break;
            case 149:
              gd = 151;
              break;
            case 150:
              gd = 149;
              break;
            case 151:
              gd = 152;
              break;
            case 152:
              gd = 150;
              break;
            case 159:
              gd = 165;
              break;
            case 161:
              gd = 163;
              break;
            case 163:
              gd = 159;
              break;
            case 165:
              gd = 161;
              break;
            case 160:
              gd = 166;
              break;
            case 162:
              gd = 164;
              break;
            case 164:
              gd = 160;
              break;
            case 166:
              gd = 162;
              break;
            case 174:
              gd = 176;
              break;
            case 175:
              gd = 177;
              break;
            case 176:
              gd = 175;
              break;
            case 177:
              gd = 174;
              break;
            default:
              break;
          }
          let bd = backData[j][i];
          switch (bd) {
            case 25:
              bd = 90;
              break;
            case 80:
              bd = 137;
              break;
            case 90:
              bd = 25;
              break;
            case 137:
              bd = 80;
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

      // Blue ball
      rotateXY(gameInfo.blueBall1, rows);
      if (gameInfo.twoBlue) {
        rotateXY(gameInfo.blueBall2, rows);
      }

      // Copiers
      for (let i = 0; i < gameInfo.copiers.length; i++) {
        rotateXY(gameInfo.copiers[i], rows);
      }

      // ConveyorBelts
      for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        rotateXY(gameInfo.conveyorBelts[i], rows);
      }

      // Damaged stones
      for (let i = 0; i < gameInfo.damagedStones.length; i++) {
        rotateXY(gameInfo.damagedStones[i], rows);
      }

      // Delays
      for (let i = 0; i < gameInfo.delays.length; i++) {
        rotateXY(gameInfo.delay[i], rows);
      }

      // Electricity
      for (let i = 0; i < gameInfo.electricity.length; i++) {
        rotateXY(gameInfo.electricity[i], rows);
      }

      // Elevators
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

      // Elevator entrances and exits
      for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
        rotateXY(gameInfo.elevatorInOuts[i], rows);
      }

      // Forces
      for (let i = 0; i < gameInfo.forces.length; i++) {
        rotateXY(gameInfo.forces[i], rows);
        let data = gameInfo.forces[i].direction;
        switch (data) {
          case 2:
            data = 4;
            break;
          case 4:
            data = 8;
            break;
          case 6:
            data = 2;
            break;
          case 8:
            data = 6;
            break;
          default:
            break;
        }
        gameInfo.forces[i].direction = data;
      }

      // Magnets
      for (let i = 0; i < gameInfo.magnets.length; i++) {
        rotateXY(gameInfo.magnets[i], rows);
      }

      // Movers
      for (let i = 0; i < gameInfo.movers.length; i++) {
        rotateXY(gameInfo.movers[i], rows);
        let data = gameInfo.movers[i].direction;
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
          case "downleft":
            data = "upleft";
            break;
          case "upleft":
            data = "upright";
            break;
          case "upright":
            data = "downright";
            break;
          case "downright":
            data = "downleft";
            break;
          default:
            break;
        }
        gameInfo.movers[i].direction = data;
      }

      // Music boxes
      for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        rotateXY(gameInfo.musicBoxes[i], rows);
      }

      // Orange balls
      for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
        rotateXY(gameInfo.orangeBalls[i], rows);
        let data = gameInfo.orangeBalls[i].direction;
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
          case "downleft":
            data = "upleft";
            break;
          case "upleft":
            data = "upright";
            break;
          case "upright":
            data = "downright";
            break;
          case "downright":
            data = "downleft";
            break;
          default:
            break;
        }
        gameInfo.orangeBalls[i].direction = data;
      }

      // Pistons
      for (let i = 0; i < gameInfo.pistons.length; i++) {
        rotateXY(gameInfo.pistons[i], rows);
        let data = gameInfo.pistons[i].direction;
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
        gameInfo.pistons[i].direction = data;
      }

      // Red balls
      for (let i = 0; i < gameInfo.redBalls.length; i++) {
        rotateXY(gameInfo.redBalls[i], rows);
      }

      // Red fish
      for (let i = 0; i < gameInfo.redFish.length; i++) {
        rotateXY(gameInfo.redFish[i], rows);
      }

      // Teleports
      for (let i = 0; i < gameInfo.teleports.length; i++) {
        rotateXY(gameInfo.teleports[i], rows);
      }

      // Time bombs
      for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        rotateXY(gameInfo.timeBombs[i], rows);
      }

      // Trap doors
      for (let i = 0; i < gameInfo.trapDoors.length; i++) {
        rotateXY(gameInfo.trapDoors[i], rows);
      }

      // Yellow balls
      for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
        rotateXY(gameInfo.yellowBalls[i], rows);
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

      // Yellow bars
      for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        rotateXY(gameInfo.yellowBars[i], rows);
        let data = gameInfo.yellowBars[i].direction;
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
        gameInfo.yellowBars[i].direction = data;
      }

      // Triggers, detonators etc
      rotateXY(gameInfo.detonator, rows);
      for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        rotateXY(gameInfo.pistonsTriggers[i], rows);
      }
      rotateXY(gameInfo.travelGate, rows);
      for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
        rotateXY(gameInfo.yellowBallPushersTriggers[i], rows);
      }
      for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
        rotateXY(gameInfo.yellowStoppers[i], rows);
      }
      for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
        rotateXY(gameInfo.yellowPausers[i], rows);
      }
    }
  }
  return rotated;
}

