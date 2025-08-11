import { removeObject } from "./addRemoveObject.js";

export function checkTimeBombs(gameData, backData, gameInfo) {
    let el = 0;
    let xmin = 0;
    let ymin = 0;
    let xmax = 0;
    let ymax = 0;
    let result = { updated: false, explosion: false, gameOver: false };

    for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        const timeBomb = gameInfo.timeBombs[i];
        if (timeBomb.status === 10) {
            // Explode
            xmin = timeBomb.x - 1;
            if (xmin < 0) {
                xmin = 0;
            }
            ymin = timeBomb.y - 1;
            if (ymin < 0) {
                ymin = 0;
            }
            xmax = timeBomb.x + 1;
            if (xmax > gameData[0].length - 1) {
                xmax = gameData[0].length - 1;
            }
            ymax = timeBomb.y + 1;
            if (ymax > gameData.length - 2) {
                ymax = gameData.length - 2;
            }
            for (let x = xmin; x <= xmax; x++) {
                for (let y = ymin; y <= ymax; y++) {
                    if ((x !== timeBomb.x) || (y !== timeBomb.y)) {
                        el = gameData[y][x];
                        if ((el === 2) || (el === 3)) {
                            result.gameOver = true;                            
                        }
                        removeObject(gameData, gameInfo, x, y);

                        el = backData[y][x];
                        switch (el) {
                            case 25:
                            case 90:
                                backData[y][x] = 0;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            gameData[timeBomb.y][timeBomb.x] = 38;
            if ([25, 90].includes(backData[timeBomb.y][timeBomb.x])) {
                backData[timeBomb.y][timeBomb.x] = 0;
            }
            result.explosion = true;
            result.updated = true;
        }
        if (timeBomb.status === 0) {
            timeBomb.status = -1;
            gameData[timeBomb.y][timeBomb.x] = 0;
            result.updated = true;
        }
        if (timeBomb.status > 0) {
            timeBomb.status--;
        }
    }
    return result;
}

