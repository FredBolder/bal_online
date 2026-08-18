import { hasWeightAbove, hasWeightBelow } from "./balUtils.js";
import { hasForceLeft, hasForceRight } from "./force.js";

export function checkSpikes(backData, gameData, gameInfo, gameVars) {
    let gameOver = false;
    const points = [];
    const xMax = gameData[0].length - 1;
    const yMax = gameData.length - 1;

    if (gameInfo.twoBlue) {
        points.push({ x: gameInfo.blueBall1.x, y: gameInfo.blueBall1.y });
        points.push({ x: gameInfo.blueBall2.x, y: gameInfo.blueBall2.y });
    } else {
        points.push({ x: gameInfo.blueBall.x, y: gameInfo.blueBall.y });
    }

    for (let i = 0; i < points.length; i++) {
        const x = points[i].x;
        const y = points[i].y;

        if ((x === -1) || (y === -1)) {
            continue;
        }

        if (y < yMax) {
            if (gameData[y + 1][x] === 174) {
                // Spike up
                if (hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y + 1, false)) {
                    return true;
                }
            }
        }
        if (y > 0) {
            if (gameData[y - 1][x] === 175) {
                // Spike down
                if (hasWeightBelow(backData, gameData, gameInfo, gameVars, x, x, y - 1, false)) {
                    return true;
                }
            }
        }
        if (x > 0) {
            if (gameData[y][x - 1] === 176) {
                // Spike right
                if (hasForceLeft(gameData, gameInfo, x, y)) {
                    return true;
                }
            }
        }
        if (x < xMax) {
            if (gameData[y][x + 1] === 177) {
                // Spike left
                if (hasForceRight(gameData, gameInfo, x, y)) {
                    return true;
                }
            }
        }
    }
    return gameOver;
}