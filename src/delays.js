import { hasWeightAbove, moveObject } from "./balUtils.js";

export function checkDelays(backData, gameData, gameInfo, gameVars) {
    let update = false;
    for (let i = 0; i < gameInfo.delays.length; i++) {
        const delay = gameInfo.delays[i];
        if (hasWeightAbove(backData, gameData, gameInfo, gameVars, delay.x, delay.x, delay.y, false)) {
            if (delay.count >= delay.gameTicks) {
                delay.count = 0;
                if (gameData[delay.y + 1][delay.x] === 0) {
                    update = true;
                    moveObject(gameData, gameInfo, delay.x, delay.y - 1, delay.x, delay.y + 1);
                }
            }
            delay.count++;
        } else {
            delay.count = 0;
        }
    }
    return update;
}