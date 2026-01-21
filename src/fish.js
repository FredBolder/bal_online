import { inWater } from "./balUtils.js";

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

function freeToSwim(x1, x2, y, gameData) {
  let found = false;

  if (Math.abs(x1 - x2) < 2) return true;
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
  return !found;
}

export function moveFish(backData, gameData, gameInfo) {
  let attack = false;
  let changed = false;
  let down = false;
  let up = false;
  let upOrDown = false;
  const maxX = gameData[0].length - 1;
  const maxY = gameData.length - 1;
  const x = gameInfo.blueBall.x;
  const y = gameInfo.blueBall.y;

  attack = inWater(x, y, backData);
  for (let i = 0; i < gameInfo.redFish.length; i++) {
    down = false;
    up = false;
    upOrDown = false;
    const fish = gameInfo.redFish[i];

    if (![20, 23].includes(backData[fish.y][fish.x])) continue;

    gameData[fish.y][fish.x] = 0;

    if (fish.isDead) {
      if (fish.y < maxY) {
        if ((gameData[fish.y + 1][fish.x] === 0) && (backData[fish.y + 1][fish.x] === 23)) {
          fish.y += 1;
        }
      }
    } else {
      if (attack) {
        if (fish.x > x) {
          fish.direction = fish.blocked ? 6 : 4;
        } else {
          fish.direction = fish.blocked ? 4 : 6;
        }
        if (fish.blocked) {
          upOrDown = true;
        }
        fish.blocked = false;
        if (fish.y > y) {
          if (freeToSwim(x, fish.x, fish.y - 1, gameData) && freeToSwim(x, fish.x, fish.y, gameData)) {
            up = true;
          }
        }
        if (fish.y < y) {
          if (freeToSwim(x, fish.x, fish.y + 1, gameData) && freeToSwim(x, fish.x, fish.y, gameData)) {
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
          if (fish.x > 0 && !attack) {
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
          if (fish.x < maxX && !attack) {
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
    }
    gameData[fish.y][fish.x] = 27;
  }
}

