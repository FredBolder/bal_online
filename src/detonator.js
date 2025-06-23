import { isHorizontalRope } from "./balUtils.js";
import { hasForceDown } from "./force.js";

export function checkDetonator(backData, gameData, gameInfo, ignoreNoWeight) {
    let info = { updated: false, explosion: false };
    let detonator = false;
    let element = -1;
    const x = gameInfo.detonator.x;
    const y = gameInfo.detonator.y;

    if (y > 0) {
        element = gameData[y - 1][x];
        detonator = [2, 4, 8, 40, 93, 94].includes(element);
        if (!ignoreNoWeight) {
            if ((element === 2) && !hasForceDown(gameData, gameInfo, x, y - 1)) {
                if (gameInfo.hasPropeller || [25, 90, 137].includes(backData[y - 1][x]) || isHorizontalRope(x, y - 2, backData)) {
                    detonator = false;
                }
            }
        }
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

