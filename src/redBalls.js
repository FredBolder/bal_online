import { isEmpty, falling } from "./balUtils.js";
import { randomInt } from "./utils.js";

export function checkRedBalls(arr, redBalls) {
  let direction = 0;
  let hit = -1; // -1 = not known yet, 0 = no, 1 = yes 
  let result = [];
  let checkX = 0;
  let checkY = 0;

  for (let i = 0; (i < redBalls.length) && (hit !== 1); i++) {
    const red = redBalls[i];
    for (let j = 0; (j < 2) && (hit !== 1); j++) {
      hit = -1;
      if (j === 0) {
        direction = 4;
      } else {
        direction = 6;
      }
      result = [];
      result.push({ x: red.x, y: red.y });
      checkX = red.x;
      checkY = red.y;
      while (hit === -1) {
        switch (direction) {
          case 2:
            if (checkY < arr.length - 1) {
              checkY++;
            } else {
              hit = 0;
            }
            break;
          case 4:
            if (checkX > 0) {
              checkX--;
            } else {
              hit = 0;
            }
            break;
          case 6:
            if (checkX < arr[checkY].length) {
              checkX++;
            } else {
              hit = 0;
            }
            break;
          case 8:
            if (checkY > 0) {
              checkY--;
            } else {
              hit = 0;
            }
            break;
          default:
            break;
        }
        switch (arr[checkY][checkX]) {
          case 0:
            break;
          case 2:
            hit = 1;
            result.push({ x: checkX, y: checkY });
            break;
          case 95:
            // Mirror /
            result.push({ x: checkX, y: checkY });
            switch (direction) {
              case 2:
                direction = 4;
                break;
              case 4:
                direction = 2;
                break;
              case 6:
                direction = 8;
                break;
              case 8:
                direction = 6;
                break;
              default:
                break;
            }
            break;
          case 96:
            // Mirror \
            result.push({ x: checkX, y: checkY });
            switch (direction) {
              case 2:
                direction = 6;
                break;
              case 4:
                direction = 8;
                break;
              case 6:
                direction = 2;
                break;
              case 8:
                direction = 4;
                break;
              default:
                break;
            }
            break;
          default:
            hit = 0;
            break;
        }
      }
    }
  }
  if (hit !== 1) {
    result = [];
  }
  return result;
}

export function isRedBall(element) {
  return [8, 93, 94].includes(element);
}

export function moveRedBalls(
  backData,
  gameData,
  gameInfo,
) {
  let changeDirection = false;
  let directionAfterJump = "none";
  let maxX = 0;
  let n1 = 0;
  let n2 = 0;
  let lightBulb = "";
  let prevX = 0;
  let result = { updated: false, eating: false };
  let saveRed = 93;
  let waitLeft = false;
  let waitRight = false;
  let x = gameInfo.blueBall.x;
  let y = gameInfo.blueBall.y;

  if (gameData.length > 0) {
    maxX = gameData[0].length - 1;
    for (let i = 0; i < gameInfo.redBalls.length; i++) {
      const red = gameInfo.redBalls[i];
      prevX = red.x;

      if ((red.smart > 0) && !falling(red.x, red.y, backData, gameData, gameInfo, false)) {
        changeDirection = false;

        waitLeft = false;
        waitRight = false;
        if (red.skipElevatorCount > 0) {
          red.skipElevatorCount--;
        } else {
          if ((red.y > 0) && [0].includes(gameData[red.y - 1][red.x])) {
            for (let j = 0; j <= red.y; j++) {
              if (red.x > 0) {
                if ([6, 106].includes(gameData[j][red.x - 1])) {
                  waitLeft = true;
                } else {
                  if (gameData[j][red.x - 1] !== 0) {
                    waitLeft = false;
                  }
                }
              }
              if (red.x < maxX) {
                if ([6, 106].includes(gameData[j][red.x + 1])) {
                  waitRight = true;
                } else {
                  if (gameData[j][red.x + 1] !== 0) {
                    waitRight = false;
                  }
                }
              }
            }
          }
        }

        if (!waitLeft && !waitRight) {
          n1 = randomInt(1, 20);
          switch (n1) {
            case 5:
              changeDirection = true;
              break;
            default:
              break;
          }
          if (changeDirection) {
            n2 = randomInt(0, 2);
            switch (n2) {
              case 0:
                red.direction = "none";
                break;
              case 1:
                red.direction = "left";
                break;
              case 2:
                red.direction = "right";
                break;
              default:
                break;
            }
          }
        }
        if (waitLeft) {
          if (red.x > 0) {
            if ([6, 106].includes(gameData[red.y][red.x - 1])) {
              waitLeft = false;
              waitRight = false;
              red.direction = "upLeft"
              directionAfterJump = "none";
            }
          }
        }
        if (waitRight) {
          if (red.x < maxX) {
            if ([6, 106].includes(gameData[red.y][red.x + 1])) {
              waitLeft = false;
              waitRight = false;
              red.direction = "upRight"
              directionAfterJump = "none";
            }
          }
        }

        if (!waitLeft && !waitRight) {
          if (red.smart > 1) {
            if (red.skipFollowCount > 0) {
              red.skipFollowCount--;
            } else {
              if (![6, 106, 7, 107].includes(gameData[red.y + 1][red.x])) {
                if ((x > red.x) && [0, 20, 23].includes(gameData[red.y][red.x + 1])) {
                  red.direction = "right";
                }
                if ((x < red.x) && [0, 20, 23].includes(gameData[red.y][red.x - 1])) {
                  red.direction = "left";
                }
              }
            }
          }

          if (red.y > 0) {
            if ((red.direction === "left") && (red.x > 0)) {
              if (![0].includes(gameData[red.y][red.x - 1]) && [0].includes(gameData[red.y - 1][red.x]) && [0].includes(gameData[red.y - 1][red.x - 1])) {
                red.direction = "upLeft";
                directionAfterJump = "left";
              }
            }
            if ((red.direction === "right") && (red.x < maxX)) {
              if (![0].includes(gameData[red.y][red.x + 1]) && [0].includes(gameData[red.y - 1][red.x]) && [0].includes(gameData[red.y - 1][red.x + 1])) {
                red.direction = "upRight";
                directionAfterJump = "right";
              }
            }
          }

          if ((red.smart > 1) && (red.y === (y + 1))) {
            if (isEmpty(gameData, y, red.x - 1, x)) {
              red.direction = "up";
              directionAfterJump = "none";
            }
          }
          lightBulb = seesLightBulb(gameData, red);
          if (lightBulb !== "") {
            red.direction = lightBulb;
          }
          if ((red.smart === 1) && (gameData[red.y - 1][red.x] === 105)) {
            // Eat light bulb
            directionAfterJump = red.direction;
            red.direction = "up";
          }
          saveRed = gameData[red.y][red.x];
          switch (red.direction) {
            case "left":
              if (red.x > 0) {
                if ([0].includes(gameData[red.y][red.x - 1])) {
                  gameData[red.y][red.x] = 0;
                  red.x--;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              if ((red.smart > 1) && (red.x > 1)) {
                // One direction
                if ((gameData[red.y][red.x - 1] === 11) && (gameData[red.y][red.x - 2] === 0)) {
                  gameData[red.y][red.x] = 0;
                  red.x = red.x - 2;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              break;
            case "right":
              if (red.x < maxX) {
                if ([0].includes(gameData[red.y][red.x + 1])) {
                  gameData[red.y][red.x] = 0;
                  red.x++;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              if ((red.smart > 1) && (red.x < (maxX - 1))) {
                // One direction
                if ((gameData[red.y][red.x + 1] === 10) && (gameData[red.y][red.x + 2] === 0)) {
                  gameData[red.y][red.x] = 0;
                  red.x = red.x + 2;
                  gameData[red.y][red.x] = saveRed;
                  result.updated = true;
                }
              }
              break;
            case "up":
              if (red.y > 0) {
                if ([0, 105].includes(gameData[red.y - 1][red.x])) {
                  if (gameData[red.y - 1][red.x] === 105) {
                    result.eating = true;
                    if (red.smart === 1) {
                      red.smart = 2;
                      saveRed = 94;
                    }
                  }
                  gameData[red.y][red.x] = 0;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            case "upLeft":
              if ((red.x > 0) && (red.y > 0)) {
                if ([0].includes(gameData[red.y - 1][red.x - 1]) && [0].includes(gameData[red.y - 1][red.x])) {
                  gameData[red.y][red.x] = 0;
                  red.x--;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            case "upRight":
              if ((red.x < maxX) && (red.y > 0)) {
                if ([0].includes(gameData[red.y - 1][red.x + 1]) && [0].includes(gameData[red.y - 1][red.x])) {
                  gameData[red.y][red.x] = 0;
                  red.x++;
                  red.y--;
                  gameData[red.y][red.x] = saveRed;
                }
              }
              red.direction = directionAfterJump;
              result.updated = true;
              break;
            default:
              break;
          }
        }
        if ([6, 106, 7, 107].includes(gameData[red.y + 1][red.x])) {
          red.skipElevatorCount = 25;
        }
        if (red.smart > 1) {
          if (red.x === x) {
            red.skipFollowCount = 50;
            result.updated = true;
          }
          if (!waitLeft && !waitRight && (red.skipFollowCount === 0) && (prevX === red.x)) {
            if ((x > red.x) && (red.direction === "right")) {
              red.direction = "left";
              red.skipFollowCount = 50;
              result.updated = true;
            }
            if ((x < red.x) && (red.direction === "left")) {
              red.direction = "right";
              red.skipFollowCount = 50;
              result.updated = true;
            }
          }
        }
      }
    }
  }
  return result;
}

function seesLightBulb(gameData, red) {
  let result = "";
  let stop = false;
  const maxX = gameData[0].length - 1;

  if (red.smart === 1) {
    stop = false;
    for (let i = red.x + 1; (i <= maxX) && !stop; i++) {
      const el = gameData[red.y][i];
      if (el !== 0) {
        stop = true;
        if (el === 105) {
          result = "right";
        }
      }
    }
    if (result === "") {
      stop = false;
      for (let i = red.x - 1; (i > 0) && !stop; i--) {
        const el = gameData[red.y][i];
        if (el !== 0) {
          stop = true;
          if (el === 105) {
            result = "left";
          }
        }
      }
    }
  }
  return result;
}

