import { hasWeightAbove } from "./balUtils.js";

export function checkTrapDoors(backData, gameData, gameInfo, gameVars) {
  let result = {};
  result.updated = false;
  result.sound = false;
  let weight = false;

  for (let i = 0; i < gameInfo.trapDoors.length; i++) {
    let trapDoor = gameInfo.trapDoors[i];
    weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, trapDoor.x, trapDoor.x, trapDoor.y, false);
    if (!weight && [0, 13, 14].includes(gameData[trapDoor.y][trapDoor.x])) {
      gameData[trapDoor.y][trapDoor.x] = 13;
      result.updated = true;
      trapDoor.status = 0;
    }
    if (weight) {
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

