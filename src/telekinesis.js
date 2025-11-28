import { moveObjectInDirection } from "./balUtils.js";

export function getObjectCoordinates(gameData, gameInfo, gameVars) {
    let result = {};
    result.x = -1;
    result.y = -1;
    let found = false;
    const gravityDown = (gameVars.gravity === "down");
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;
    let maxX = gameData[0].length - 1;
    let maxY = gameData.length - 1;

    if (!gameInfo.hasTelekineticPower) {
        return;
    }
    if (!found && gravityDown && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y) && (gameData[y - 1][x - 1] === 0)) {
            result.x = x - 1;
            result.y = y;
            found = true;
        }
    }
    if (!found && !gravityDown && (x > 0) && (y < maxY)) {
        if (isMoveableObject(gameData, x - 1, y) && (gameData[y + 1][x - 1] === 0)) {
            result.x = x - 1;
            result.y = y;
            found = true;
        }
    }
    if (!found && gravityDown && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y) && (gameData[y - 1][x + 1] === 0)) {
            result.x = x + 1;
            result.y = y;
            found = true;
        }
    }
    if (!found && !gravityDown && (x <= maxX) && (y < maxY)) {
        if (isMoveableObject(gameData, x + 1, y) && (gameData[y + 1][x + 1] === 0)) {
            result.x = x + 1;
            result.y = y;
            found = true;
        }
    }
    if (!found && (x > 1)) {
        if (isMoveableObject(gameData, x - 2, y) && (gameData[y][x - 1] === 0)) {
            result.x = x - 2;
            result.y = y;
            found = true;
        }
    }
    if (!found && (x < maxX)) {
        if (isMoveableObject(gameData, x + 2, y) && (gameData[y][x + 1] === 0)) {
            result.x = x + 2;
            result.y = y;
            found = true;
        }
    }
    if (!found && gravityDown && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y - 1) && (gameData[y][x - 1] === 0)) {
            result.x = x - 1;
            result.y = y - 1;
            found = true;
        }
    }
    if (!found && !gravityDown && (x > 0) && (y < maxY)) {
        if (isMoveableObject(gameData, x - 1, y + 1) && (gameData[y][x - 1] === 0)) {
            result.x = x - 1;
            result.y = y + 1;
            found = true;
        }
    }
    if (!found && gravityDown && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y - 1) && (gameData[y][x + 1] === 0)) {
            result.x = x + 1;
            result.y = y - 1;
            found = true;
        }
    }
    if (!found && !gravityDown && (x <= maxX) && (y < maxY)) {
        if (isMoveableObject(gameData, x + 1, y + 1) && (gameData[y][x + 1] === 0)) {
            result.x = x + 1;
            result.y = y + 1;
            found = true;
        }
    }
    return result;
}

function isMoveableObject(gameData, x, y) {
    return [4, 5, 9, 28, 40, 82, 98, 84, 85, 86, 117, 138, 139, 171, 172, 173, 178, 203, 242].includes(gameData[y][x]);
}

export function moveObjectWithTelekineticPower(gameData, gameInfo, gameVars) {
    let result = {};
    result.eating = false;
    result.freezeTime = -1;
    result.player = false;
    result.sound = "";
    let found = false;
    const gravityDown = (gameVars.gravity === "down");
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;
    let maxX = gameData[0].length - 1;
    let maxY = gameData.length - 1;

    if (!gameInfo.hasTelekineticPower) {
        return result;
    }
    if (!found && gravityDown && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y) && (gameData[y - 1][x - 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x - 1, y, "up");
            found = true;
        }
    }
    if (!found && !gravityDown && (x > 0) && (y < maxY)) {
        if (isMoveableObject(gameData, x - 1, y) && (gameData[y + 1][x - 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x - 1, y, "down");
            found = true;
        }
    }
    if (!found && gravityDown && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y) && (gameData[y - 1][x + 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x + 1, y, "up");
            found = true;
        }
    }
    if (!found && !gravityDown && (x <= maxX) && (y < maxY)) {
        if (isMoveableObject(gameData, x + 1, y) && (gameData[y + 1][x + 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x + 1, y, "down");
            found = true;
        }
    }
    if (!found && (x > 1)) {
        if (isMoveableObject(gameData, x - 2, y) && (gameData[y][x - 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x - 2, y, "right");
            found = true;
        }
    }
    if (!found && (x < maxX)) {
        if (isMoveableObject(gameData, x + 2, y) && (gameData[y][x + 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x + 2, y, "left");
            found = true;
        }
    }
    if (!found && gravityDown && (x > 0) && (y > 0)) {
        if (isMoveableObject(gameData, x - 1, y - 1) && (gameData[y][x - 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x - 1, y - 1, "down");
            found = true;
        }
    }
    if (!found && !gravityDown && (x > 0) && (y < maxY)) {
        if (isMoveableObject(gameData, x - 1, y + 1) && (gameData[y][x - 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x - 1, y + 1, "up");
            found = true;
        }
    }
    if (!found && gravityDown && (x <= maxX) && (y > 0)) {
        if (isMoveableObject(gameData, x + 1, y - 1) && (gameData[y][x + 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x + 1, y - 1, "down");
            found = true;
        }
    }
    if (!found && !gravityDown && (x <= maxX) && (y < maxY)) {
        if (isMoveableObject(gameData, x + 1, y + 1) && (gameData[y][x + 1] === 0)) {
            moveObjectInDirection(gameData, gameInfo, x + 1, y + 1, "up");
            found = true;
        }
    }

    if (found) {
        result.player = true; // To force update
    }
    return result;
}