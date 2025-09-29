import { findElementByCoordinates, hasWeightAbove } from "./balUtils.js";

export function checkWhiteBallSynchronisers(backData, gameData, gameInfo, gameVars) {
    const result = { update: false };
    let all = false;
    let idx = -1;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let stop = false;
    let x = 0;
    let y = 0;
    let xMin = 0;
    let yMin = 0;
    let xMax = 0;
    let yMax = 0;

    for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
        gameInfo.whiteBallSynchronisers[i].skip = false;
    }

    for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
        const synchroniser = gameInfo.whiteBallSynchronisers[i];

        if (synchroniser.skip) {
            break;
        }

        x = synchroniser.x;
        y = synchroniser.y;
        xMin = x;
        xMax = x;
        yMin = y;
        yMax = y;
        // Down
        if ((y > 0) && (y < maxY)) {
            stop = false;
            x = synchroniser.x;
            while (!stop) {
                x--;
                if ((x >= 0) && (gameData[y][x] === 200)) {
                    xMin = x;
                } else {
                    stop = true;
                }
            }
            stop = false;
            x = synchroniser.x;
            while (!stop) {
                x++;
                if ((x <= maxX) && (gameData[y][x] === 200)) {
                    xMax = x;
                } else {
                    stop = true;
                }
            }
            console.log(xMin, xMax);
            all = true;
            for (let j = xMin; j <= xMax; j++) {
                x = j;
                idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                if (idx >= 0) {
                    if (gameInfo.whiteBallSynchronisers[idx].skip) {
                        all = false;
                        break;
                    }
                }
                if ((gameData[y - 1][x] !== 4) || (gameData[y + 1][x] !== 0) || !hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y, false)) {
                    all = false;
                    break;
                }
            }
            if (all) {
                result.update = true;
                for (let j = xMin; j <= xMax; j++) {
                    x = j;
                    gameData[y - 1][x] = 0;
                    gameData[y + 1][x] = 4;
                    idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                    if (idx >= 0) {
                        gameInfo.whiteBallSynchronisers[idx].skip = true;
                    }
                }
            }
        }
    }
    return result;
}