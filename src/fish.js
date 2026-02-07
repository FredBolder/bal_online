import { inWater } from "./balUtils.js";
import { dist } from "./graphicUtils.js";
import { getConnectedWater } from "./water.js";

export function fishIsCloseToBlueBall(gameInfo) {
  let result = false;

  for (let i = 0; i < gameInfo.redFish.length && !result; i++) {
    const fish = gameInfo.redFish[i];
    if (!fish.isDead) {
      if (!result && (fish.y === gameInfo.blueBall1.y) && (Math.abs(fish.x - gameInfo.blueBall1.x) <= 1)) {
        result = true;
      }
      if (!result && (fish.x === gameInfo.blueBall1.x) && (Math.abs(fish.y - gameInfo.blueBall1.y) <= 1)) {
        result = true;
      }
      if (!result && gameInfo.twoBlue && (fish.y === gameInfo.blueBall2.y) && (Math.abs(fish.x - gameInfo.blueBall2.x) <= 1)) {
        result = true;
      }
      if (!result && gameInfo.twoBlue && (fish.x === gameInfo.blueBall2.x) && (Math.abs(fish.y - gameInfo.blueBall2.y) <= 1)) {
        result = true;
      }
    }
  }
  return result;
}

export function freeToSwim(x1, x2, y, backData, gameData, clownFish) {
  function isFree(x, y) {
      return ((gameData[y][x] === 0) && ((backData[y][x] !== 252) || clownFish));
  }

  if (Math.abs(x1 - x2) < 2) return true;
  if (x2 > x1) {
    for (let i = x1 + 1; i < x2; i++) {
      if (!isFree) return false;
    }
  } else {
    for (let i = x2 + 1; i < x1; i++) {
      if (!isFree) return false;
    }
  }
  return true;
}

export function moveFish(backData, gameData, gameInfo) {
  let attack = false;
  let ball1 = false;
  let ball2 = false;
  let blueX = -1;
  let blueY = -1;
  let changed = false;
  let down = false;
  let up = false;
  let upOrDown = false;
  const maxX = gameData[0].length - 1;
  const maxY = gameData.length - 1;

  for (let i = 0; i < gameInfo.redFish.length; i++) {
    attack = false;
    down = false;
    up = false;
    upOrDown = false;
    const fish = gameInfo.redFish[i];

    if (![20, 23, 252].includes(backData[fish.y][fish.x])) continue;

    gameData[fish.y][fish.x] = 0;

    if (fish.isDead) {
      if (fish.y < maxY) {
        if ((gameData[fish.y + 1][fish.x] === 0) && [23, 252].includes(backData[fish.y + 1][fish.x])) {
          fish.y += 1;
        }
      }
      gameData[fish.y][fish.x] = 27;
      continue;
    }

    ball1 = false;
    ball2 = false;
    if (inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData) || inWater(gameInfo.blueBall1.x, gameInfo.blueBall1.y, backData) ||
      (gameInfo.twoBlue && inWater(gameInfo.blueBall2.x, gameInfo.blueBall2.y, backData))) {
      const connectedWater = getConnectedWater(backData, fish.x, fish.y);
      ball1 = (connectedWater.has(`${gameInfo.blueBall.x},${gameInfo.blueBall.y}`) ||
        connectedWater.has(`${gameInfo.blueBall1.x},${gameInfo.blueBall1.y}`));
      ball2 = (gameInfo.twoBlue && connectedWater.has(`${gameInfo.blueBall2.x},${gameInfo.blueBall2.y}`));
    }
    if (ball1 || ball2) {
      if (ball1 && ball2) {
        if (dist(fish.x, fish.y, gameInfo.blueBall1.x, gameInfo.blueBall1.y) < dist(fish.x, fish.y, gameInfo.blueBall2.x, gameInfo.blueBall2.y)) {
          ball2 = false;
        } else {
          ball1 = false;
        }
      }
      if (ball1) {
        blueX = gameInfo.blueBall1.x;
        blueY = gameInfo.blueBall1.y;
      } else {
        blueX = gameInfo.blueBall2.x;
        blueY = gameInfo.blueBall2.y;
      }
      attack = true;
    }
    if (attack) {
      if (fish.x > blueX) {
        fish.direction = fish.blocked ? 6 : 4;
      } else {
        fish.direction = fish.blocked ? 4 : 6;
      }
      if (fish.blocked) {
        upOrDown = true;
      }
      fish.blocked = false;
      if (fish.y > blueY) {
        if (freeToSwim(blueX, fish.x, fish.y - 1, backData, gameData, false) && freeToSwim(blueX, fish.x, fish.y, backData, gameData, false)) {
          up = true;
        }
      }
      if (fish.y < blueY) {
        if (freeToSwim(blueX, fish.x, fish.y + 1, backData, gameData, false) && freeToSwim(blueX, fish.x, fish.y, backData, gameData, false)) {
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
      if (fish.x < maxX) {
        if ((gameData[fish.y][fish.x + 1] === 0) && (backData[fish.y][fish.x + 1] === 23)) {
          fish.x++;
          changed = true;
        }
      }
      if (!changed) {
        if ((fish.x > 0) && !attack) {
          if ((gameData[fish.y][fish.x - 1] === 0) && (backData[fish.y][fish.x - 1] === 23)) {
            fish.direction = 4;
            changed = true;
          }
        }
        upOrDown = !changed;
      }
    } else if (fish.direction === 4) {
      changed = false;
      if (fish.x > 0) {
        if ((gameData[fish.y][fish.x - 1] === 0) && (backData[fish.y][fish.x - 1] === 23)) {
          fish.x--;
          changed = true;
        }
      }
      if (!changed) {
        if ((fish.x < maxX) && !attack) {
          if ((gameData[fish.y][fish.x + 1] === 0) && (backData[fish.y][fish.x + 1] === 23)) {
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
      if (fish.y > 0) {
        if ((gameData[fish.y - 1][fish.x] === 0) && (backData[fish.y - 1][fish.x] === 23)) {
          fish.y--;
        } else if (!changed) {
          fish.blocked = true;
        }
      }
    }
    if (down) {
      if (fish.y < maxY) {
        if ((gameData[fish.y + 1][fish.x] === 0) && (backData[fish.y + 1][fish.x] === 23)) {
          fish.y++;
        } else if (!changed) {
          fish.blocked = true;
        }
      }
    }

    gameData[fish.y][fish.x] = 27;
  }
}

