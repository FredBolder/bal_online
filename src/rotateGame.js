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
      x = gameInfo.blueBall.x;
      y = gameInfo.blueBall.y;
      gameInfo.blueBall.y = x;
      gameInfo.blueBall.x = rows - (y + 1);

      // Red balls
      for (let i = 0; i < gameInfo.redBalls.length; i++) {
        x = gameInfo.redBalls[i].x;
        y = gameInfo.redBalls[i].y;
        gameInfo.redBalls[i].y = x;
        gameInfo.redBalls[i].x = rows - (y + 1);
      }

      // Teleports
      for (let i = 0; i < gameInfo.teleports.length; i++) {
        x = gameInfo.teleports[i].x;
        y = gameInfo.teleports[i].y;
        gameInfo.teleports[i].y = x;
        gameInfo.teleports[i].x = rows - (y + 1);
      }

      // Yellow balls
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

      // Yellow bars
      for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        x = gameInfo.yellowBars[i].x;
        y = gameInfo.yellowBars[i].y;
        gameInfo.yellowBars[i].y = x;
        gameInfo.yellowBars[i].x = rows - (y + 1);
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

      // Forces
      for (let i = 0; i < gameInfo.forces.length; i++) {
        x = gameInfo.forces[i].x;
        y = gameInfo.forces[i].y;
        gameInfo.forces[i].y = x;
        gameInfo.forces[i].x = rows - (y + 1);
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

      // Time bombs
      for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        const timeBomb = gameInfo.timeBombs[i];
        x = timeBomb.x;
        y = timeBomb.y;
        timeBomb.y = x;
        timeBomb.x = rows - (y + 1);        
      }
    }
  }
  return rotated;
}

