import { findElementByCoordinates } from "./balUtils.js";

export function shrinkObject(gameData, gameInfo, direction) {
    let deltaX = 0;
    let deltaY = 0;
    let idx = -1;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    const x = gameInfo.blueBall.x;
    const y = gameInfo.blueBall.y;
    let xTarget = -1;
    let yTarget = -1;

    switch (direction) {
        case "left":
            deltaX = -1;
            break;
        case "right":
            deltaX = 1;
            break;
        case "up":
            deltaY = -1;
            break;
        case "down":
            deltaY = 1;
            break;
        case "upleft":
            if ((y > 0) && (gameData[y - 1][x] === 0)) {
                deltaX = -1;
                deltaY = -1;
            }
            break;
        case "upright":
            if ((y > 0) && (gameData[y - 1][x] === 0)) {
                deltaX = 1;
                deltaY = -1;
            }
            break;
        case "downleft":
            if ((x > 0) && (y < maxY) && (gameData[y][x - 1] === 0)) {
                deltaX = -1;
                deltaY = 1;
            }
            break;
        case "downright":
            if ((x < maxX) && (y < maxY) && (gameData[y][x + 1] === 0)) {
                deltaX = 1;
                deltaY = 1;
            }
            break;
        default:
            break;
    }
    if ((deltaX === 0) && (deltaY === 0)) {
        return;
    }
    xTarget = x + deltaX;
    yTarget = y + deltaY;
    if ((xTarget < 0) || (xTarget > maxX) || (yTarget < 0) || (yTarget > maxY)) {
        return;
    }
    switch (gameData[yTarget][xTarget]) {
        case 4:
            gameData[yTarget][xTarget] = 192;
            break;
        case 5:
            gameData[yTarget][xTarget] = 195;
            break;
        case 8:
        case 93:
        case 94:
            gameData[yTarget][xTarget] = 201;
            idx = findElementByCoordinates(xTarget, yTarget, gameInfo.redBalls);
            if (idx >= 0) {
                gameInfo.redBalls.splice(idx, 1);
            }
            break;
        case 9:
            gameData[yTarget][xTarget] = 196;
            idx = findElementByCoordinates(xTarget, yTarget, gameInfo.yellowBalls);
            if (idx >= 0) {
                gameInfo.yellowBalls.splice(idx, 1);
            }
            break;
        case 28:
            gameData[yTarget][xTarget] = 197;
            break;
        case 40:
            gameData[yTarget][xTarget] = 202;
            idx = findElementByCoordinates(xTarget, yTarget, gameInfo.orangeBalls);
            if (idx >= 0) {
                gameInfo.orangeBalls.splice(idx, 1);
            }
            break;
        default:
            break;
    }
}