import { hasWeightAbove } from "./balUtils.js";

export function checkDetonator(backData, gameData, gameInfo, gameVars, pushingDown) {
    let info = { updated: false, explosion: false };
    let detonator = false;
    const x = gameInfo.detonator.x;
    const y = gameInfo.detonator.y;

    if (y > 0) {
        detonator = hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y, pushingDown);
        for (let i = 0; i < gameData.length; i++) {
            for (let j = 0; j < gameData[i].length; j++) {
                if (gameData[i][j] === 36 && detonator) {
                    info.explosion = true;
                    info.updated = true;
                    gameData[i][j] = 38;
                } else if (gameData[i][j] === 38) {
                    info.updated = true;
                    gameData[i][j] = 0;
                }
            }
        }
    }
    return info;
}

