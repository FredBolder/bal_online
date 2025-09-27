import { addObject, removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { deleteIfPurpleTeleport } from "./teleports.js";

export function copyCell(backData, gameData, gameInfo, x1, y1, x2, y2) {
    let idx1 = -1;
    let idx2 = -1;
    let obj = 0;

    obj = gameData[y1][x1];
    if (obj === 0) {
        obj = backData[y1][x1];
    }
    addObject(backData, gameData, gameInfo, x2, y2, obj);
    switch (obj) {
        case 8:
        case 93:
        case 94:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.redBalls);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.redBalls);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.redBalls[idx2].smart = gameInfo.redBalls[idx1].smart;
            }
            break;
        case 106:
        case 6:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.elevators);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.elevators);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.elevators[idx2].up = gameInfo.elevators[idx1].up;
            }
            break;
        case 107:
        case 7:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.horizontalElevators);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.horizontalElevators);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.horizontalElevators[idx2].right = gameInfo.horizontalElevators[idx1].right;
            }
            break;
        case 157:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.musicBoxes);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.musicBoxes);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.musicBoxes[idx2].instrument = gameInfo.musicBoxes[idx1].instrument;
                gameInfo.musicBoxes[idx2].volume = gameInfo.musicBoxes[idx1].volume;
                gameInfo.musicBoxes[idx2].mode = gameInfo.musicBoxes[idx1].mode;
                gameInfo.musicBoxes[idx2].delay = gameInfo.musicBoxes[idx1].delay;
                gameInfo.musicBoxes[idx2].notes.length = 0;
                for (let i = 0; i < gameInfo.musicBoxes[idx1].notes.length; i++) {
                    gameInfo.musicBoxes[idx2].notes.push(gameInfo.musicBoxes[idx1].notes[i]);
                }
                gameInfo.musicBoxes[idx2].stepsPerMeasure = gameInfo.musicBoxes[idx1].stepsPerMeasure;
                gameInfo.musicBoxes[idx2].part = gameInfo.musicBoxes[idx1].part;
                gameInfo.musicBoxes[idx2].direction = gameInfo.musicBoxes[idx1].direction;
                gameInfo.musicBoxes[idx2].group = gameInfo.musicBoxes[idx1].group;
            }
            break;
        case 158:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.pistonsTriggers);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.pistonsTriggers);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.pistonsTriggers[idx2].group = gameInfo.pistonsTriggers[idx1].group;
            }
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.pistons);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.pistons);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.pistons[idx2].sticky = gameInfo.pistons[idx1].sticky;
                gameInfo.pistons[idx2].inverted = gameInfo.pistons[idx1].inverted;
                gameInfo.pistons[idx2].direction = gameInfo.pistons[idx1].direction;
                gameInfo.pistons[idx2].mode = gameInfo.pistons[idx1].mode;
                gameInfo.pistons[idx2].group = gameInfo.pistons[idx1].group;
            }
            break;
        case 167:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.delays);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.delays);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.delays[idx2].gameTicks = gameInfo.delays[idx1].gameTicks;
            }
            break;
        case 171:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.conveyorBelts);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.conveyorBelts);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.conveyorBelts[idx2].mode = gameInfo.conveyorBelts[idx1].mode;
                gameInfo.conveyorBelts[idx2].direction = gameInfo.conveyorBelts[idx1].direction;
                gameInfo.conveyorBelts[idx2].group = gameInfo.conveyorBelts[idx1].group;
            }
            break;
        case 178:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.movers);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.movers);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.movers[idx2].direction = gameInfo.movers[idx1].direction;
            }
            break;
        case 198:
            idx1 = findElementByCoordinates(x1, y1, gameInfo.disappearingStones);
            idx2 = findElementByCoordinates(x2, y2, gameInfo.disappearingStones);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.disappearingStones[idx2].pattern.length = 0;
                for (let i = 0; i < gameInfo.disappearingStones[idx1].pattern.length; i++) {
                    gameInfo.disappearingStones[idx2].pattern.push(gameInfo.disappearingStones[idx1].pattern[i]);
                }
            }
            break;
        default:
            break;
    }
}

function getObjectInfo(gameInfo, x, y, n) {
    let idx = -1;

    switch (n) {
        case 8:
        case 93:
        case 94:
            idx = findElementByCoordinates(x, y, gameInfo.redBalls);
            if (idx >= 0) {
                return { arr: gameInfo.redBalls, idx };
            }
            break;
        case 6:
        case 106:
            idx = findElementByCoordinates(x, y, gameInfo.elevators);
            if (idx >= 0) {
                return { arr: gameInfo.elevators, idx };
            }
            break;
        case 7:
        case 107:
            idx = findElementByCoordinates(x, y, gameInfo.horizontalElevators);
            if (idx >= 0) {
                return { arr: gameInfo.horizontalElevators, idx };
            }
            break;
        case 157:
            idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
            if (idx >= 0) {
                return { arr: gameInfo.musicBoxes, idx };
            }
            break;
        case 158:
            idx = findElementByCoordinates(x, y, gameInfo.pistonsTriggers);
            if (idx >= 0) {
                return { arr: gameInfo.pistonsTriggers, idx };
            }
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            idx = findElementByCoordinates(x, y, gameInfo.pistons);
            if (idx >= 0) {
                return { arr: gameInfo.pistons, idx };
            }
            break;
        case 167:
            idx = findElementByCoordinates(x, y, gameInfo.delays);
            if (idx >= 0) {
                return { arr: gameInfo.delays, idx };
            }
            break;
        case 171:
            idx = findElementByCoordinates(x, y, gameInfo.conveyorBelts);
            if (idx >= 0) {
                return { arr: gameInfo.conveyorBelts, idx };
            }
            break;
        case 178:
            idx = findElementByCoordinates(x, y, gameInfo.movers);
            if (idx >= 0) {
                return { arr: gameInfo.movers, idx };
            }
            break;
        case 198:
            idx = findElementByCoordinates(x, y, gameInfo.disappearingStones);
            if (idx >= 0) {
                return { arr: gameInfo.disappearingStones, idx };
            }
            break;
        default:
            break;
    }
    return null;
}

export function loadCellForUndo(backData, gameData, gameInfo, obj) {
    let createLevelObject = 0;
    let objectInfo = null;
    let x = -1;
    let y = -1;

    if (obj !== null) {
        x = obj.x;
        y = obj.y;
        if (obj.gd === 0) {
            removeObject(gameData, gameInfo, x, y);
        }
        if (obj.bd === 0) {
            deleteIfPurpleTeleport(backData, gameInfo, x, y);
            if ([20, 23, 25, 90].includes(backData[y][x])) {
                backData[y][x] = 0;
            }
        }
        createLevelObject = obj.gd;
        if (createLevelObject === 0) {
            createLevelObject = obj.bd;
        }
        if (createLevelObject >= 0) {
            deleteIfPurpleTeleport(backData, gameInfo, x, y);
            addObject(backData, gameData, gameInfo, x, y, createLevelObject);
            if (obj.gi !== null) {
                objectInfo = getObjectInfo(gameInfo, x, y, obj.gd);
                if (objectInfo !== null) {
                    // Copy properties into existing object
                    Object.assign(objectInfo.arr[objectInfo.idx], obj.gi);
                }
            }
        }
    }
}

export function menuToNumber(s) {
    let result = -1;

    switch (globalVars.createLevelMenuPage) {
        case 1:
            switch (s) {
                case "delete":
                    result = 1;
                    break;
                case "select":
                    result = 2;
                    break;
                case "stones":
                    result = 3;
                    break;
                case "balls":
                    result = 4;
                    break;
                case "redballs":
                    result = 5;
                    break;
                case "yellowballs":
                    result = 6;
                    break;
                case "pistons":
                    result = 7;
                    break;
                case "elevators":
                    result = 8;
                    break;
                case "conveyorbelts":
                    result = 9;
                    break;
                case "doors":
                    result = 10;
                    break;
                case "water":
                    result = 11;
                    break;
                case "groups":
                    result = 12;
                    break;
                case "foregroundcolors":
                    result = 13;
                    break;
                case "backgroundcolors":
                    result = 14;
                    break;
                case "info":
                    result = 15;
                    break;
                default:
                    result = -1;
                    break;
            }
            break;
        case 2:
            switch (s) {
                case "delete":
                    result = 1;
                    break;
                case "select":
                    result = 2;
                    break;
                case "teleports":
                    result = 3;
                    break;
                case "musicboxes":
                    result = 4;
                    break;
                case "misc":
                    result = 5;
                    break;
                case "info":
                    result = 15;
                    break;
                default:
                    result = -1;
                    break;
            }
            break;
        default:
            break;
    }
    return result;
}

export function saveCellForUndo(backData, gameData, gameInfo, x, y) {
    const obj = {};
    let objectInfo = null;
    obj.x = x;
    obj.y = y;
    obj.bd = backData[y][x];
    obj.gd = gameData[y][x];
    obj.gi = null;
    objectInfo = getObjectInfo(gameInfo, x, y, obj.gd);
    if (objectInfo !== null) {
        obj.gi = objectInfo.arr[objectInfo.idx]
    }
    return obj;
}