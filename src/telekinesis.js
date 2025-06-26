import { findElementByCoordinate } from "./balUtils.js";

function isMoveableObject(gameData, x, y) {
    return [4, 5, 9, 28, 40, 82, 98, 84, 85, 86, 138, 139].includes(gameData[y][x]);
}

function moveObject(gameData, gameInfo, x, y, direction) {
    let element = gameData[y][x];
    let idx = -1;
    let newX = x;
    let newY = y;
    switch (direction) {
        case "down":
            newY++;
            break;
        case "left":
            newX--;
            break;
        case "right":
            newX++;
            break;
        case "up":
            newY--;
            break;
        default:
            break;
    }
    gameData[y][x] = 0;
    gameData[newY][newX] = element;
    switch (element) {
        case 9:
            idx = findElementByCoordinate(x, y, gameInfo.yellowBalls);
            if (idx >= 0) {
              gameInfo.yellowBalls[idx].x = newX;
              gameInfo.yellowBalls[idx].y = newY;
              gameInfo.yellowBalls[idx].direction = "none";
            }
            break;
        case 40:
            idx = findElementByCoordinate(x, y, gameInfo.orangeBalls);
            if (idx >= 0) {
              gameInfo.orangeBalls[idx].x = newX;
              gameInfo.orangeBalls[idx].y = newY;
              gameInfo.orangeBalls[idx].direction = "none";
            }
            break;
        case 82:
            gameData[newY][newX] = 83;
            break;    
        case 98:
            gameData[newY][newX] = 82;
            break;    
        default:
            break;
    }
}

export function moveObjectWithTelekineticPower(gameData, gameInfo) {
    let result = {};
    result.eating = false;
    result.freezeTime = -1;
    result.player = false;
    result.sound = "";
    let found = false;
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;
    let maxX = gameData[0].length - 1;

    if (!gameInfo.hasTelekineticPower) {
        return;
    }
    if (!found && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y) && (gameData[y - 1][x - 1] === 0)) {
            moveObject(gameData, gameInfo, x - 1, y, "up");
            found = true;
        }
    }
    if (!found && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y) && (gameData[y - 1][x + 1] === 0)) {
            moveObject(gameData, gameInfo, x + 1, y, "up");
            found = true;
        }
    }
    if (!found && (x > 1)) {
        if (isMoveableObject(gameData, x - 2, y) && (gameData[y][x - 1] === 0)) {
            moveObject(gameData, gameInfo, x - 2, y, "right");
            found = true;
        }
    }
    if (!found && (x < maxX)) {
        if (isMoveableObject(gameData, x + 2, y) && (gameData[y][x + 1] === 0)) {
            moveObject(gameData, gameInfo, x + 2, y, "left");
            found = true;
        }
    }
    if (!found && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y - 1) && (gameData[y][x - 1] === 0)) {
            moveObject(gameData, gameInfo, x - 1, y - 1, "down");
            found = true;
        }
    }
    if (!found && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y - 1) && (gameData[y][x + 1] === 0)) {
            moveObject(gameData, gameInfo, x + 1, y - 1, "down");
            found = true;
        }
    }

    if (found) {
        result.player = true; // To force update
    }
    return result;
}