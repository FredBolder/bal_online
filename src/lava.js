import { removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";
import { deleteIfPurpleTeleport } from "./teleports.js";

function canStopLava(objectNumber) {
    return [1, 15, 16, 17, 18, 36, 38, 91, 119, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 241].includes(objectNumber);
}

export function checkLava(gameData, gameInfo, gameVars) {
    const result = { update: false, sound: "", gameOver: false };
    for (let i = 0; i < gameInfo.lava.length; i++) {
        const lava = gameInfo.lava[i];
        const objectNumber = gameData[lava.y][lava.x];
        if ((objectNumber > 0) && !canStopLava(objectNumber)) {
            result.update = true;
            if ([2, 3].includes(objectNumber)) {
                result.gameOver = true;
            }
            removeObject(gameData, gameInfo, lava.x, lava.y);
            if ((gameVars.soundLava !== "never") && (objectNumber === 2)) {
                result.sound = "pain";
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

export function moveLava(backData, gameData, gameInfo, gameVars) {
    const result = { update: false, sound: "", gameOver: false };
    let foundGap = false;
    const movedDown = [];
    const movedLeft = [];
    const movedRight = [];
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let newX = -1;
    let newY = -1;
    for (let i = 0; i < gameInfo.lava.length; i++) {
        const lava = gameInfo.lava[i];
        const lavaAbove = getGameDataValue(backData, lava.x, lava.y - 1) === 22;
        const lavaUnder = getGameDataValue(backData, lava.x, lava.y + 1) === 22;
        const lavaLeft = getGameDataValue(backData, lava.x - 1, lava.y) === 22;
        const lavaRight = getGameDataValue(backData, lava.x + 1, lava.y) === 22;
        const elUnder = getGameDataValue(gameData, lava.x, lava.y + 1);
        const elLeft = getGameDataValue(gameData, lava.x - 1, lava.y);
        const elRight = getGameDataValue(gameData, lava.x + 1, lava.y);
        newX = -1;
        newY = -1;
        if ((lava.y < maxY) && !canStopLava(elUnder) && !lavaUnder) {
            newX = lava.x;
            newY = lava.y + 1;
            movedDown.push(i);
        } else if ((lava.x > 0) && !canStopLava(elLeft) && !lavaLeft && (lavaRight || lavaAbove)) {
            newX = lava.x - 1;
            newY = lava.y;
            movedLeft.push(i);
        } else if ((lava.x < maxX) && !canStopLava(elRight) && !lavaRight && (lavaLeft || lavaAbove)) {
            newX = lava.x + 1;
            newY = lava.y;
            movedRight.push(i);
        }
        if ((newX >= 0) && (newY >= 0)) {
            if ([2, 3].includes(gameData[newY][newX])) {
                result.gameOver = true;
            }
            if ((gameVars.soundLava !== "never") && (gameData[newY][newX] === 2)) {
                result.sound = "pain";
            }
            removeObject(gameData, gameInfo, newX, newY);
            deleteIfPurpleTeleport(backData, gameInfo, newX, newY);
            backData[lava.y][lava.x] = 0;
            lava.x = newX;
            lava.y = newY;
            backData[lava.y][lava.x] = 22;
            result.update = true;
        }
    }
    if (result.update) {
        do {
            foundGap = false;
            for (let i = 0; i < gameInfo.lava.length; i++) {
                const lava = gameInfo.lava[i];
                const lavaUnder = getGameDataValue(backData, lava.x, lava.y + 1) === 22;
                const lavaUnderLeft = getGameDataValue(backData, lava.x - 1, lava.y + 1) === 22;
                const lavaUnderRight = getGameDataValue(backData, lava.x + 1, lava.y + 1) === 22;
                const lavaSecondUnder = getGameDataValue(backData, lava.x, lava.y + 2) === 22;
                const lavaSecondUnderLeft = getGameDataValue(backData, lava.x - 1, lava.y + 2) === 22;
                const lavaSecondUnderRight = getGameDataValue(backData, lava.x + 1, lava.y + 2) === 22;
                const elUnder = getGameDataValue(gameData, lava.x, lava.y + 1);
                const elUnderLeft = getGameDataValue(gameData, lava.x - 1, lava.y + 1);
                const elUnderRight = getGameDataValue(gameData, lava.x + 1, lava.y + 1);
                const elSecondUnder = getGameDataValue(gameData, lava.x, lava.y + 2);
                const elSecondUnderLeft = getGameDataValue(gameData, lava.x - 1, lava.y + 2);
                const elSecondUnderRight = getGameDataValue(gameData, lava.x + 1, lava.y + 2);
                const notMoved = !movedDown.includes(i) && !movedLeft.includes(i) && !movedRight.includes(i);
                if (lava.y >= maxY) continue;
                if ((elUnder === 0) && !lavaUnder && (lavaSecondUnder || lavaUnderLeft || lavaUnderRight || canStopLava(elSecondUnder)) && !movedDown.includes(i)) {
                    foundGap = true;
                    backData[lava.y][lava.x] = 0;
                    lava.y++;
                    backData[lava.y][lava.x] = 22;
                } else if ((elUnderLeft === 0) && !lavaUnderLeft && (lavaSecondUnderLeft || lavaUnder || lavaUnderRight || canStopLava(elSecondUnderLeft)) && notMoved) {
                    foundGap = true;
                    backData[lava.y][lava.x] = 0;
                    lava.x--;
                    lava.y++;
                    backData[lava.y][lava.x] = 22;
                } else if ((elUnderRight === 0) && !lavaUnderRight && (lavaSecondUnderRight || lavaUnderLeft || lavaUnder || canStopLava(elSecondUnderRight)) && notMoved) {
                    foundGap = true;
                    backData[lava.y][lava.x] = 0;
                    lava.x++;
                    lava.y++;
                    backData[lava.y][lava.x] = 22;
                }
            }
        } while (foundGap);
    }
    return result;
}


