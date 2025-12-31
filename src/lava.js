import { removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates } from "./balUtils.js";

export function checkLava(gameData, gameInfo, gameVars) {
    const result = { update: false, sound: "", gameOver: false };
    for (let i = 0; i < gameInfo.lava.length; i++) {
        const lava = gameInfo.lava[i];
        const objectNumber = gameData[lava.y][lava.x];
        if (objectNumber > 0) {
            result.update = true;
            if (objectNumber === 2) {
                result.gameOver = true;
            }
            removeObject(gameData, gameInfo, lava.x, lava.y);
            if ((gameVars.soundLava !== "never") && (objectNumber === 2)) {
                result.sound = "pain";
            }
            if ((gameVars.soundLava === "default") && (objectNumber !== 2) && (result.sound === "")) {
                result.sound = "splash1";
            }
        }
    }
    return result;
}


export function deleteIfLava(backData, gameInfo, x, y) {
    let idx = -1;

    if (backData[y][x] === 22) {
        idx = findElementByCoordinates(x, y, gameInfo.lava);
        if (idx >= 0) {
            gameInfo.lava.splice(idx, 1);
        }
        backData[y][x] = 0;
    }
}


