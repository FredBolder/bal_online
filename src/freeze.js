import { findElementByCoordinates } from "./balUtils.js";

export function checkIce(backData, gameData, gameInfo, gameVars) {
    let update = false;
    const keep = [];

    for (let i = 0; i < gameInfo.waterWithIceObjects.length; i++) {
        const waterWithIce = gameInfo.waterWithIceObjects[i];
        if (waterWithIce.status < gameVars.iceCountTo) {
            keep.push(waterWithIce);
            waterWithIce.status++;
        } else {
            if ([20].includes(waterWithIce.objectNumber)) {
                backData[waterWithIce.y][waterWithIce.x] = waterWithIce.objectNumber;
                gameData[waterWithIce.y][waterWithIce.x] = 0;
            } else {
                backData[waterWithIce.y][waterWithIce.x] = 0;
                gameData[waterWithIce.y][waterWithIce.x] = waterWithIce.objectNumber;
            }
            update = true;
        }
    }
    if (update) {
        gameInfo.waterWithIceObjects.length = 0;
        for (let i = 0; i < keep.length; i++) {
            gameInfo.waterWithIceObjects.push(keep[i]);
        }
    }
    return update;
}

export function freezeWater(backData, gameData, gameInfo, direction) {
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
        case 113:
        case 114:
            gameInfo.waterWithIceObjects.push({ x: xTarget, y: yTarget, status: 0, objectNumber: gameData[yTarget][xTarget] });
            backData[yTarget][xTarget] = 0;
            gameData[yTarget][xTarget] = 206;
            break;
        case 206:
            idx = findElementByCoordinates(xTarget, yTarget, gameInfo.waterWithIceObjects);
            if (idx >= 0) {
                gameInfo.waterWithIceObjects[idx].status = 0;
            }
            break;
        default:
            break;
    }
    switch (backData[yTarget][xTarget]) {
        case 20:
            if (gameData[yTarget][xTarget] === 0) {
                gameInfo.waterWithIceObjects.push({ x: xTarget, y: yTarget, status: 0, objectNumber: backData[yTarget][xTarget] });
                backData[yTarget][xTarget] = 0;
                gameData[yTarget][xTarget] = 206;
            }
            break;
        default:
            break;
    }
}