import { setArray } from "./utils";

function rotateActiveSides(obj, rotateLeft, xmin, ymin, xmax, ymax) {
  if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
    return;
  }

  const bottom = obj.activeSides.includes("bottom");
  const left = obj.activeSides.includes("left");
  const right = obj.activeSides.includes("right");
  const top = obj.activeSides.includes("top");

  obj.activeSides.length = 0;
  if (rotateLeft) {
    if (top) {
      obj.activeSides.push("left");
    }
    if (bottom) {
      obj.activeSides.push("right");
    }
    if (left) {
      obj.activeSides.push("bottom");
    }
    if (right) {
      obj.activeSides.push("top");
    }
  } else {
    if (top) {
      obj.activeSides.push("right");
    }
    if (bottom) {
      obj.activeSides.push("left");
    }
    if (left) {
      obj.activeSides.push("top");
    }
    if (right) {
      obj.activeSides.push("bottom");
    }
  }
}

export function rotateDirection(obj, rotateLeft, xmin, ymin, xmax, ymax) {
  let direction = "";

  if (xmin !== null && ymin !== null && xmax !== null && xmax !== null) {
    if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
      return;
    }
  }

  if (rotateLeft) {
    switch (obj.direction) {
      case "down":
        direction = "right";
        break;
      case "right":
        direction = "up";
        break;
      case "up":
        direction = "left";
        break;
      case "left":
        direction = "down";
        break;
      case "downleft":
        direction = "downright";
        break;
      case "downright":
        direction = "upright";
        break;
      case "upright":
        direction = "upleft";
        break;
      case "upleft":
        direction = "downleft";
        break;
      default:
        direction = obj.direction;
        break;
    }
  } else {
    switch (obj.direction) {
      case "down":
        direction = "left";
        break;
      case "left":
        direction = "up";
        break;
      case "up":
        direction = "right";
        break;
      case "right":
        direction = "down";
        break;
      case "downleft":
        direction = "upleft";
        break;
      case "upleft":
        direction = "upright";
        break;
      case "upright":
        direction = "downright";
        break;
      case "downright":
        direction = "downleft";
        break;
      default:
        direction = obj.direction;
        break;
    }
  }
  obj.direction = direction;
}

function rotateXY(obj, rows, rotateLeft, xmin, ymin, xmax, ymax) {
  if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
    return;
  }

  let x = obj.x - xmin;
  let y = obj.y - ymin;

  if (rotateLeft) {
    obj.y = rows - (x + 1);
    obj.x = y;
  } else {
    obj.y = x;
    obj.x = rows - (y + 1);
  }

  obj.x += xmin;
  obj.y += ymin;
}

export function rotateArea(backData, gameData, gameInfo, rotateLeft = false, xmin = null, ymin = null, xmax = null, ymax = null) {
  let newBackData = [];
  let newGameData = [];
  let x = 0;
  let y = 0;

  const gameRows = gameData.length;
  if (gameRows <= 0) {
    return false;
  }

  const gameColumns = gameData[0].length;
  if (gameColumns <= 0) {
    return false;
  }

  if (xmin === null && ymin === null && xmax === null && ymax === null) {
    xmin = 0;
    ymin = 0;
    xmax = gameColumns - 1;
    ymax = gameRows - 1;
  }

  if (xmin === null || ymin === null || xmax === null || ymax === null) {
    return false;
  }

  if (xmin < 0 || ymin < 0 || xmax >= gameColumns || ymax >= gameRows ||
    xmax < xmin || ymax < ymin
  ) {
    return false;
  }

  const columns = (xmax - xmin) + 1;
  const rows = (ymax - ymin) + 1;

  if (columns !== rows) {
    return false;
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
      174: 177, 175: 176, 176: 174, 177: 175,
      213: 212, 212: 211, 211: 210, 210: 213,
      217: 216, 216: 215, 215: 214, 214: 217,
      221: 220, 220: 219, 219: 218, 218: 221,
      225: 224, 224: 223, 223: 222, 222: 225,
      234: 235, 235: 234, 236: 237, 237: 236, 238: 239, 239: 238,
      246: 247, 247: 246,
      259: 260, 260: 262, 261: 259, 262: 261,
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
      174: 176, 175: 177, 176: 175, 177: 174,
      210: 211, 211: 212, 212: 213, 213: 210,
      214: 215, 215: 216, 216: 217, 217: 214,
      218: 219, 219: 220, 220: 221, 221: 218,
      222: 223, 223: 224, 224: 225, 225: 222,
      234: 235, 235: 234, 236: 237, 237: 236, 238: 239, 239: 238,
      246: 247, 247: 246,
      259: 261, 260: 259, 261: 262, 262: 260,
    };

    bdMap = {
      25: 90,
      80: 137,
      90: 25,
      137: 80
    };
  }

  const size = columns;

  newGameData = new Array(size);
  newBackData = new Array(size);

  const sourceYStart = rotateLeft ? ymin : ymax;
  const sourceYStep = rotateLeft ? 1 : -1;

  for (let i = 0; i < size; i++) {
    newGameData[i] = new Array(size);
    newBackData[i] = new Array(size);

    const sourceX = rotateLeft ? xmax - i : xmin + i;
    let sourceY = sourceYStart;

    for (let j = size - 1; j >= 0; j--) {
      let gd = gameData[sourceY][sourceX];
      let bd = backData[sourceY][sourceX];

      const mappedGd = gdMap[gd];
      if (mappedGd !== undefined) gd = mappedGd;

      const mappedBd = bdMap[bd];
      if (mappedBd !== undefined) bd = mappedBd;

      const targetIndex = size - 1 - j;

      newGameData[i][targetIndex] = gd;
      newBackData[i][targetIndex] = bd;

      sourceY += sourceYStep;
    }
  }

  for (let i = 0; i < size; i++) {
    const targetY = ymin + i;

    for (let j = 0; j < size; j++) {
      const targetX = xmin + j;

      backData[targetY][targetX] = newBackData[i][j];
      gameData[targetY][targetX] = newGameData[i][j];
    }
  }

  // Answer balls
  for (let i = 0; i < gameInfo.answerBalls.length; i++) {
    rotateXY(gameInfo.answerBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Blue ball
  rotateXY(gameInfo.blueBall1, rows, rotateLeft, xmin, ymin, xmax, ymax);
  if (gameInfo.twoBlue) {
    rotateXY(gameInfo.blueBall2, rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Brown balls
  for (let i = 0; i < gameInfo.brownBalls.length; i++) {
    rotateXY(gameInfo.brownBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Changers
  for (let i = 0; i < gameInfo.changers.length; i++) {
    const obj = gameInfo.changers[i];
    if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
      continue;
    }

    let swap = false;
    rotateXY(obj, rows, rotateLeft, xmin, ymin, xmax, ymax);
    const c1 = obj.color1;
    const c2 = obj.color2;
    if (obj.horizontal) {
      swap = rotateLeft;
      obj.horizontal = false;
    } else {
      swap = !rotateLeft;
      obj.horizontal = true;
    }
    if (swap) {
      obj.color1 = c2;
      obj.color2 = c1;
    }
  }

  // Copiers
  for (let i = 0; i < gameInfo.copiers.length; i++) {
    rotateXY(gameInfo.copiers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // ConveyorBelts
  for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
    rotateXY(gameInfo.conveyorBelts[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Damaged stones
  for (let i = 0; i < gameInfo.damagedStones.length; i++) {
    rotateXY(gameInfo.damagedStones[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Delays
  for (let i = 0; i < gameInfo.delays.length; i++) {
    rotateXY(gameInfo.delays[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Detectors
  for (let i = 0; i < gameInfo.detectors.length; i++) {
    const obj = gameInfo.detectors[i];
    rotateXY(obj, rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateActiveSides(obj, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Disappearing stones
  for (let i = 0; i < gameInfo.disappearingStones.length; i++) {
    rotateXY(gameInfo.disappearingStones[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Electricity
  for (let i = 0; i < gameInfo.electricity.length; i++) {
    rotateXY(gameInfo.electricity[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Elevators
  let newHorElevators = [];
  let newVerElevators = [];
  for (let i = 0; i < gameInfo.elevators.length; i++) {
    x = gameInfo.elevators[i].x;
    y = gameInfo.elevators[i].y;

    if (x < xmin || y < ymin || x > xmax || y > ymax) {
      newVerElevators.push(gameInfo.elevators[i]);
      continue;
    }

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
  for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
    x = gameInfo.horizontalElevators[i].x;
    y = gameInfo.horizontalElevators[i].y;

    if (x < xmin || y < ymin || x > xmax || y > ymax) {
      newHorElevators.push(gameInfo.horizontalElevators[i]);
      continue;
    }

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
  setArray(gameInfo.horizontalElevators, newHorElevators);
  setArray(gameInfo.elevators, newVerElevators);

  // Elevator entrances and exits
  for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
    rotateXY(gameInfo.elevatorInOuts[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Fish food
  for (let i = 0; i < gameInfo.fishFood.length; i++) {
    rotateXY(gameInfo.fishFood[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Flamethrowers
  for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
    rotateXY(gameInfo.flamethrowers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.flamethrowers[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Forces
  for (let i = 0; i < gameInfo.forces.length; i++) {
    rotateXY(gameInfo.forces[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.forces[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Jellyfish
  for (let i = 0; i < gameInfo.jellyfish.length; i++) {
    rotateXY(gameInfo.jellyfish[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Keys
  for (let i = 0; i < gameInfo.keys.length; i++) {
    rotateXY(gameInfo.keys[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Locked doors
  for (let i = 0; i < gameInfo.lockedDoors.length; i++) {
    rotateXY(gameInfo.lockedDoors[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Lava
  for (let i = 0; i < gameInfo.lava.length; i++) {
    rotateXY(gameInfo.lava[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Magnets
  for (let i = 0; i < gameInfo.magnets.length; i++) {
    rotateXY(gameInfo.magnets[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Movers
  for (let i = 0; i < gameInfo.movers.length; i++) {
    const obj = gameInfo.movers[i];
    rotateXY(obj, rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(obj, rotateLeft, xmin, ymin, xmax, ymax);
    rotateActiveSides(obj, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Music boxes
  for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
    rotateXY(gameInfo.musicBoxes[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.musicBoxes[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Orange balls
  for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
    rotateXY(gameInfo.orangeBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.orangeBalls[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Pink balls
  for (let i = 0; i < gameInfo.pinkBalls.length; i++) {
    rotateXY(gameInfo.pinkBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Pistons
  for (let i = 0; i < gameInfo.pistons.length; i++) {
    rotateXY(gameInfo.pistons[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.pistons[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Pushers
  for (let i = 0; i < gameInfo.pushers.length; i++) {
    rotateXY(gameInfo.pushers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.pushers[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Question stones
  for (let i = 0; i < gameInfo.questionStones.length; i++) {
    rotateXY(gameInfo.questionStones[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Red balls
  for (let i = 0; i < gameInfo.redBalls.length; i++) {
    rotateXY(gameInfo.redBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Red fish
  for (let i = 0; i < gameInfo.redFish.length; i++) {
    rotateXY(gameInfo.redFish[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Sea anemones
  for (let i = 0; i < gameInfo.seaAnemones.length; i++) {
    rotateXY(gameInfo.seaAnemones[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Teleports
  for (let i = 0; i < gameInfo.teleports.length; i++) {
    rotateXY(gameInfo.teleports[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Time bombs
  for (let i = 0; i < gameInfo.timeBombs.length; i++) {
    rotateXY(gameInfo.timeBombs[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Trap doors
  for (let i = 0; i < gameInfo.trapDoors.length; i++) {
    rotateXY(gameInfo.trapDoors[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Tropical fish
  for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
    rotateXY(gameInfo.tropicalFish[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // User objects
  for (let i = 0; i < gameInfo.userObjects.length; i++) {
    rotateXY(gameInfo.userObjects[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.userObjects[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Water with ice
  for (let i = 0; i < gameInfo.waterWithIceObjects.length; i++) {
    rotateXY(gameInfo.waterWithIceObjects[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // White ball synchronisers
  for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
    rotateXY(gameInfo.whiteBallSynchronisers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Yellow balls
  for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
    rotateXY(gameInfo.yellowBalls[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.yellowBalls[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Yellow bars
  for (let i = 0; i < gameInfo.yellowBars.length; i++) {
    rotateXY(gameInfo.yellowBars[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
    rotateDirection(gameInfo.yellowBars[i], rotateLeft, xmin, ymin, xmax, ymax);
  }

  // Triggers, detonators etc
  rotateXY(gameInfo.detonator, rows, rotateLeft, xmin, ymin, xmax, ymax);
  for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
    rotateXY(gameInfo.pistonsTriggers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }
  rotateXY(gameInfo.travelGate, rows, rotateLeft, xmin, ymin, xmax, ymax);
  for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
    rotateXY(gameInfo.yellowBallPushers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }
  for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
    rotateXY(gameInfo.yellowBallPushersTriggers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }
  for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
    rotateXY(gameInfo.yellowStoppers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }
  for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
    rotateXY(gameInfo.yellowPausers[i], rows, rotateLeft, xmin, ymin, xmax, ymax);
  }

  return true;
}

