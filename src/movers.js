import { findElementByCoordinates, getGameDataValue, moveObject } from "./balUtils.js";

const moveableObjects = [2, 4, 5, 8, 9, 28, 40, 82, 98, 84, 85, 86, 93, 94, 138, 139, 171, 172, 173, 203, 242, 244, 245, 246, 247];

function canMove(objectNumber, mode, inverted) {
    let result = false;
    if (!moveableObjects.includes(objectNumber)) return false;

    switch (mode.toLowerCase()) {
        case "all":
            return true;
        case "blueball":
            result = objectNumber === 2;
            break;
        case "directionchanger":
            result = [84, 85, 86, 138, 139].includes(objectNumber);
            break;
        case "grayball":
            result = [82, 98].includes(objectNumber);
            break;
        case "lightblueball":
            result = objectNumber === 5;
            break;
        case "orangeball":
            result = objectNumber === 40;
            break;
        case "pinkball":
            result = objectNumber === 203;
            break;
        case "purpleball":
            result = [28, 242].includes(objectNumber);
            break;
        case "redball":
            result = [8, 93, 94].includes(objectNumber);
            break;
        case "whiteball":
            result = [4, 245].includes(objectNumber);
            break;
        case "yellowball":
            result = objectNumber === 9;
            break;
        default:
            return false;
    }
    if (inverted) {
        result = !result;
    }
    return result;
}

export function changeMoverInverted(gameInfo, x, y) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.movers);
    if (idx >= 0) {
        gameInfo.movers[idx].inverted = !gameInfo.movers[idx].inverted;
    }
    return idx;
}

export function changeMoverMode(gameInfo, x, y, mode) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.movers);
    if (idx >= 0) {
        gameInfo.movers[idx].mode = mode;
    }
    return idx;
}

export function checkMovers(gameData, gameInfo, gameVars, checkBlue) {
    const top = 0;
    const bottom = 1;
    const left = 2;
    const right = 3;
    let el = -1;
    let elX = -1;
    let elY = -1;
    let gd1 = -1;
    let gd2 = -1;
    let newX = -1;
    let newY = -1;
    let sideStr = "?";
    let result = false;

    for (let i = 0; i < gameInfo.movers.length; i++) {
        const mover = gameInfo.movers[i];
        const mode = mover.mode;
        const inverted = mover.inverted;
        const elTop = getGameDataValue(gameData, mover.x, mover.y - 1);
        const elBottom = getGameDataValue(gameData, mover.x, mover.y + 1);
        const elLeft = getGameDataValue(gameData, mover.x - 1, mover.y);
        const elRight = getGameDataValue(gameData, mover.x + 1, mover.y);
        if (!canMove(elTop, mode, inverted) && !canMove(elBottom, mode, inverted) &&
            !canMove(elLeft, mode, inverted) && !canMove(elRight, mode, inverted)) {
            if (!checkBlue) {
                mover.counter = 0;
            }
            continue;
        }
        if (mover.counter < gameVars.moverCountTo) {
            if (!checkBlue) {
                mover.counter++;
            }
        } else {
            for (let side = 0; side < 4; side++) {
                switch (side) {
                    case top:
                        el = elTop;
                        elX = mover.x;
                        elY = mover.y - 1;
                        sideStr = "top";
                        break;
                    case bottom:
                        el = elBottom;
                        elX = mover.x;
                        elY = mover.y + 1;
                        sideStr = "bottom";
                        break;
                    case left:
                        el = elLeft;
                        elX = mover.x - 1;
                        elY = mover.y;
                        sideStr = "left";
                        break;
                    case right:
                        el = elRight;
                        elX = mover.x + 1;
                        elY = mover.y;
                        sideStr = "right";
                        break;
                    default:
                        break;
                }
                if (!mover.activeSides.includes(sideStr) || !canMove(el, mode, inverted)) {
                    continue;
                }

                if (!checkBlue) {
                    mover.counter = 0;
                }
                newX = elX;
                newY = elY;
                gd1 = 0;
                switch (mover.direction) {
                    case "left":
                        newX--;
                        if (side === right) {
                            newX--;
                        }
                        break;
                    case "right":
                        newX++;
                        if (side === left) {
                            newX++;
                        }
                        break;
                    case "up":
                        if ((side !== top) || ![2, 8, 93, 94].includes(el)) {
                            newY--;
                            if (side === bottom) {
                                newY--;
                            }
                        }
                        break;
                    case "down":
                        newY++;
                        if ((side !== bottom) || ![2, 8, 93, 94].includes(el)) {
                            if (side === top) {
                                newY++;
                            }
                        }
                        break;
                    case "upleft":
                        newX--;
                        newY--;
                        gd1 = getGameDataValue(gameData, elX, newY);
                        break;
                    case "upright":
                        newX++;
                        newY--;
                        gd1 = getGameDataValue(gameData, elX, newY);
                        break;
                    case "downleft":
                        newX--;
                        newY++;
                        gd1 = getGameDataValue(gameData, newX, elY);
                        break;
                    case "downright":
                        newX++;
                        newY++;
                        gd1 = getGameDataValue(gameData, newX, elY);
                        break;
                    default:
                        break;
                }
                gd2 = getGameDataValue(gameData, newX, newY);
                if ((gd1 === 0) && (gd2 === 0)) {
                    if (checkBlue) {
                        if ((elX === gameInfo.blueBall.x) && (elY === gameInfo.blueBall.y)) {
                            result = true;
                        }
                    } else {
                        moveObject(gameData, gameInfo, elX, elY, newX, newY);
                        result = true;
                    }
                }
            }
        }
    }
    return result;
}

export function moverIsMovingBlueBall(gameData, gameInfo, gameVars) {
    return checkMovers(gameData, gameInfo, gameVars, true);
}

export function moverDirections() {
    return ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
}

export function moverModes() {
    return ["all", "blueball", "directionchanger", "grayball", "lightblueball", "orangeball", "pinkball", "purpleball", "redball", "whiteball", "yellowball"];
}


