import { findElementByCoordinates } from "./balUtils.js";

export function shrinkObject(gameData, gameInfo, direction) {
    let deltaX = 0;
    let deltaY = 0;
    let idx = -1;
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
            deltaX = -1;
            deltaY = -1;
            break;
        case "upright":
            deltaX = 1;
            deltaY = -1;
            break;
        case "downleft":
            deltaX = -1;
            deltaY = 1;
            break;
        case "downright":
            deltaX = 1;
            deltaY = 1;
            break;
        default:
            break;
    }
    if ((deltaX === 0) && (deltaY === 0)) {
        return;
    }
    xTarget = x + deltaX;
    yTarget = y + deltaY;
    switch (gameData[yTarget][xTarget]) {
        case 4:
            gameData[yTarget][xTarget] = 192;
            break;
        case 5:
            gameData[yTarget][xTarget] = 195;
            break;
        case 9:
            gameData[yTarget][xTarget] = 196;
            idx = findElementByCoordinates(x, y, gameInfo.yellowBalls);
            if (idx >= 0) {
                gameInfo.yellowBalls.splice(idx, 1);
            }
            break;
        case 28:
            gameData[yTarget][xTarget] = 197;
            break;
        default:
            break;
    }
}