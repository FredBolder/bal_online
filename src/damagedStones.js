import { hasWeightAbove, hasWeightBelow } from "./balUtils";

export function checkDamagedStones(backData, gameData, gameInfo, gameVars) {
    let result = { update: false, sound: 0 };

    for (let i = 0; i < gameInfo.damagedStones.length; i++) {
        const damagedStone = gameInfo.damagedStones[i];
        if (damagedStone.status !== -1) {
            if (hasWeightAbove(backData, gameData, gameInfo, gameVars, damagedStone.x, damagedStone.x, damagedStone.y, false) ||
                hasWeightBelow(backData, gameData, gameInfo, gameVars, damagedStone.x, damagedStone.x, damagedStone.y, false)) {
                damagedStone.status++;
                if ((damagedStone.status === 5) && (result.sound === 0)) {
                    result.sound = 1;
                }
                if (damagedStone.status === 12) {
                    result.sound = 2;
                }
                if (damagedStone.status >= 12) {
                    damagedStone.status = -1;
                    gameData[damagedStone.y][damagedStone.x] = 0;
                    result.update = true;
                }
            } else {
                damagedStone.status = 0;
            }
        }
    }
    return result;
}

