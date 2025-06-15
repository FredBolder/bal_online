import { freeToSwim, inWater } from "./balUtils.js";

export function moveFish(backData, gameData, gameInfo, x, y) {
  let attack = false;
  let changed = false;
  let down = false;
  let up = false;
  let upOrDown = false;

  attack = inWater(x, y, backData);
  for (let i = 0; i < gameInfo.redFish.length; i++) {
    down = false;
    up = false;
    upOrDown = false;
    const fish = gameInfo.redFish[i];
    gameData[fish.y][fish.x] = 0;

    if (fish.isDead) {
      if (fish.y < gameData.length - 1) {
        if (
          gameData[fish.y + 1][fish.x] === 0 &&
          backData[fish.y + 1][fish.x] === 23
        ) {
          fish.y += 1;
        }
      }
    } else {
      if (attack) {
        if (fish.x > x) {
          fish.direction = 4;
        } else {
          fish.direction = 6;
        }
        if (fish.y > y) {
          if (
            freeToSwim(x, fish.x, fish.y - 1, gameData) ||
            freeToSwim(x, fish.x, fish.y, gameData)
          ) {
            up = true;
          }
        }
        if (fish.y < y) {
          if (
            freeToSwim(x, fish.x, fish.y + 1, gameData) ||
            freeToSwim(x, fish.x, fish.y, gameData)
          ) {
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
        if (fish.x < gameData[0].length - 1) {
          if (
            gameData[fish.y][fish.x + 1] === 0 &&
            backData[fish.y][fish.x + 1] === 23
          ) {
            fish.x += 1;
            changed = true;
          }
        }
        if (!changed) {
          if (fish.x > 1 && !attack) {
            if (
              gameData[fish.y][fish.x - 1] === 0 &&
              backData[fish.y][fish.x - 1] === 23
            ) {
              fish.direction = 4;
              changed = true;
            }
          }
          upOrDown = !changed;
        }
      } else if (fish.direction === 4) {
        changed = false;
        if (fish.x > 1) {
          if (
            gameData[fish.y][fish.x - 1] === 0 &&
            backData[fish.y][fish.x - 1] === 23
          ) {
            fish.x -= 1;
            changed = true;
          }
        }
        if (!changed) {
          if (fish.x < gameData[0].length - 1 && !attack) {
            if (
              gameData[fish.y][fish.x + 1] === 0 &&
              backData[fish.y][fish.x + 1] === 23
            ) {
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
        if (fish.y > 1) {
          if (
            gameData[fish.y - 1][fish.x] === 0 &&
            backData[fish.y - 1][fish.x] === 23
          ) {
            fish.y -= 1;
          }
        }
      }
      if (down) {
        if (fish.y < gameData.length - 1) {
          if (
            gameData[fish.y + 1][fish.x] === 0 &&
            backData[fish.y + 1][fish.x] === 23
          ) {
            fish.y += 1;
          }
        }
      }
    }
    gameData[fish.y][fish.x] = 27;
  }
}

