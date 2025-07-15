import { findElementByCoordinate } from "./balUtils.js";

export function checkPurpleTeleports(backData, gameData, gameInfo) {
    let idx = -1;
    let update = false;
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;
    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if (teleport.color === "#FF80FF") {
            if (gameData[teleport.y][teleport.x] === 28) {
                x1 = teleport.x;
                y1 = teleport.y;
            }
        }
    }
    if ((x1 !== -1) && (y1 !== -1)) {
        for (let i = 0; i < gameInfo.teleports.length; i++) {
            const teleport = gameInfo.teleports[i];
            if ((teleport.color === "#FF80FF") && ((teleport.x !== x1) || (teleport.y !== y1))) {
                if (gameData[teleport.y][teleport.x] === 0) {
                    x2 = teleport.x;
                    y2 = teleport.y;
                }
            }
        }
    }
    if ((x1 !== -1) && (y1 !== -1) && (x2 !== -1) && (y2 !== -1)) {
        update = true;
        gameData[y1][x1] = 0;
        gameData[y2][x2] = 28;
        backData[y1][x1] = 0;
        backData[y2][x2] = 0;
        idx = findElementByCoordinate(x1, y1, gameInfo.teleports);
        if (idx >= 0) {
            gameInfo.teleports.splice(idx, 1);
        }
        idx = findElementByCoordinate(x2, y2, gameInfo.teleports);
        if (idx >= 0) {
            gameInfo.teleports.splice(idx, 1);
        }
    }
    return update;
}