import { hasWeightAbove } from "./balUtils.js";
import { hasForceLeft, hasForceRight, hasForceUp } from "./force.js";

export function checkSpikes(backData, gameData, gameInfo, gameVars) {
    let gameOver = false;
    const points = [];
    let x = -1;
    let y = -1;
    const xMax = gameData[0].length - 1;
    const yMax = gameData.length - 1;

    if (gameInfo.twoBlue) {
        points.push({ x: gameInfo.blueBall1.x, y: gameInfo.blueBall1.y });
        points.push({ x: gameInfo.blueBall2.x, y: gameInfo.blueBall2.y });
    } else {
        points.push({ x: gameInfo.blueBall.x, y: gameInfo.blueBall.y });
    }

    for (let i = 0; i < points.length; i++) {
        x = points[i].x;
        y = points[i].y;
        if ((x !== -1) && (y !== -1)) {
            if (y < yMax) {
                if (gameData[y + 1][x] === 174) {
                    // Spike up
                    if (hasWeightAbove(backData, gameData, gameInfo, gameVars, x, x, y + 1, false)) {
                        gameOver = true;
                    }
                }
            }
            if (y > 0) {
                if (gameData[y - 1][x] === 175) {
                    // Spike down
                    if (hasForceUp(gameData, gameInfo, x, y)) {
                        gameOver = true;
                    }
                }
            }
            if (x > 0) {
                if (gameData[y][x - 1] === 176) {
                    // Spike right
                    if (hasForceLeft(gameData, gameInfo, x, y)) {
                        gameOver = true;
                    }
                }
            }
            if (x < xMax) {
                if (gameData[y][x + 1] === 177) {
                    // Spike left
                    if (hasForceRight(gameData, gameInfo, x, y)) {
                        gameOver = true;
                    }
                }
            }
        }
    }
    return gameOver;
}