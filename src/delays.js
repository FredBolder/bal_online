import { moveObject } from "./balUtils.js";

export function checkDelays(gameData, gameInfo) {
    let update = false;
    for (let i = 0; i < gameInfo.delays.length; i++) {
        const delay = gameInfo.delays[i];
        const element1 = gameData[delay.y - 1][delay.x];
        const element2 = gameData[delay.y + 1][delay.x];
        if ([2, 4, 8, 40, 93, 94].includes(element1)) {
            if (delay.count < 3) {
                delay.count++;
            } else {
                if (element2 === 0) {
                    update = true;
                    moveObject(gameData, gameInfo, delay.x, delay.y - 1, delay.x, delay.y + 1);
                    delay.count = 0;
                }
            }
        }
    }
    return update;
}