import { findElementByCoordinates, hasWeightAbove, hasWeightBelow } from "./balUtils.js";
import { hasForceLeft, hasForceRight } from "./force.js";

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

    function calcHorizontalRange(xStart) {
        stop = false;
        x = xStart;
        xMin = x;
        xMax = x;
        while (!stop) {
            x--;
            if ((x >= 0) && (gameData[y][x] === 200)) {
                xMin = x;
            } else {
                stop = true;
            }
        }
        stop = false;
        x = xStart;
        while (!stop) {
            x++;
            if ((x <= maxX) && (gameData[y][x] === 200)) {
                xMax = x;
            } else {
                stop = true;
            }
        }
    }

    function calcVerticalRange(yStart) {
        stop = false;
        y = yStart;
        yMin = y;
        yMax = y;
        while (!stop) {
            y--;
            if ((y >= 0) && (gameData[y][x] === 200)) {
                yMin = y;
            } else {
                stop = true;
            }
        }
        stop = false;
        y = yStart;
        while (!stop) {
            y++;
            if ((y <= maxY) && (gameData[y][x] === 200)) {
                yMax = y;
            } else {
                stop = true;
            }
        }
    }

    for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
        gameInfo.whiteBallSynchronisers[i].skip = false;
    }

    for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
        const synchroniser = gameInfo.whiteBallSynchronisers[i];

        // Down
        y = synchroniser.y;
        if (!synchroniser.skip && (y > 0) && (y < maxY)) {
            calcHorizontalRange(synchroniser.x);
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

        // Up
        y = synchroniser.y;
        if (!synchroniser.skip && (y > 0) && (y < maxY)) {
            calcHorizontalRange(synchroniser.x);
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
                if ((gameData[y + 1][x] !== 4) || (gameData[y - 1][x] !== 0) || !hasWeightBelow(backData, gameData, gameInfo, gameVars, x, x, y, false)) {
                    all = false;
                    break;
                }
            }
            if (all) {
                result.update = true;
                for (let j = xMin; j <= xMax; j++) {
                    x = j;
                    gameData[y + 1][x] = 0;
                    gameData[y - 1][x] = 4;
                    idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                    if (idx >= 0) {
                        gameInfo.whiteBallSynchronisers[idx].skip = true;
                    }
                }
            }
        }

        // Left
        x = synchroniser.x;
        if (!synchroniser.skip && (x > 0) && (x < maxX)) {
            calcVerticalRange(synchroniser.y);
            all = true;
            for (let j = yMin; j <= yMax; j++) {
                y = j;
                idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                if (idx >= 0) {
                    if (gameInfo.whiteBallSynchronisers[idx].skip) {
                        all = false;
                        break;
                    }
                }
                if ((gameData[y][x + 1] !== 4) || (gameData[y][x - 1] !== 0) || !hasForceLeft(gameData, gameInfo, x, y)) {
                    all = false;
                    break;
                }
            }
            if (all) {
                result.update = true;
                for (let j = yMin; j <= yMax; j++) {
                    y = j;
                    gameData[y][x + 1] = 0;
                    gameData[y][x - 1] = 4;
                    idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                    if (idx >= 0) {
                        gameInfo.whiteBallSynchronisers[idx].skip = true;
                    }
                }
            }
        }

        // Right
        x = synchroniser.x;
        if (!synchroniser.skip && (x > 0) && (x < maxX)) {
            calcVerticalRange(synchroniser.y);
            all = true;
            for (let j = yMin; j <= yMax; j++) {
                y = j;
                idx = findElementByCoordinates(x, y, gameInfo.whiteBallSynchronisers);
                if (idx >= 0) {
                    if (gameInfo.whiteBallSynchronisers[idx].skip) {
                        all = false;
                        break;
                    }
                }
                if ((gameData[y][x - 1] !== 4) || (gameData[y][x + 1] !== 0) || !hasForceRight(gameData, gameInfo, x, y)) {
                    all = false;
                    break;
                }
            }
            if (all) {
                result.update = true;
                for (let j = yMin; j <= yMax; j++) {
                    y = j;
                    gameData[y][x - 1] = 0;
                    gameData[y][x + 1] = 4;
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