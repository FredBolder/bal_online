export function checkTrapDoors(gameData, gameInfo) {
  let result = {};
  result.updated = false;
  result.sound = false;
  let data = 0;

  for (let i = 0; i < gameInfo.trapDoors.length; i++) {
    let trapDoor = gameInfo.trapDoors[i];
    data = gameData[trapDoor.y - 1][trapDoor.x];
    if (
      data === 0 &&
      (gameData[trapDoor.y][trapDoor.x] === 0 ||
        gameData[trapDoor.y][trapDoor.x] === 13 ||
        gameData[trapDoor.y][trapDoor.x] === 14)
    ) {
      gameData[trapDoor.y][trapDoor.x] = 13;
      result.updated = true;
      trapDoor.status = 0;
    }
    if (data === 2 || data === 4 || data === 8) {
      if (trapDoor.status >= 0) {
        trapDoor.status++;
      }
      if (trapDoor.status >= 10) {
        gameData[trapDoor.y][trapDoor.x] = 14;
        result.updated = true;
      }
      if (trapDoor.status === 10) {
        result.sound = true;
      }
      if (trapDoor.status >= 20) {
        gameData[trapDoor.y][trapDoor.x] = 0;
        result.updated = true;
        trapDoor.status = -1;
      }
    }
  }
  return result;
}

