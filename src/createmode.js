import { addObject } from "./addRemoveObject.js";
import { findElementByCoordinate } from "./balUtils.js";

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
            idx1 = findElementByCoordinate(x1, y1, gameInfo.redBalls);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.redBalls);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.redBalls[idx2].smart = gameInfo.redBalls[idx1].smart;
            }
            break;
        case 106:
        case 6:
            idx1 = findElementByCoordinate(x1, y1, gameInfo.elevators);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.elevators);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.elevators[idx2].up = gameInfo.elevators[idx1].up;
            }
            break;
        case 107:
        case 7: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.horizontalElevators);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.horizontalElevators);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.horizontalElevators[idx2].right = gameInfo.horizontalElevators[idx1].right;
            }
            break;        
        case 157: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.musicBoxes);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.musicBoxes);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.musicBoxes[idx2].instrument = gameInfo.musicBoxes[idx1].instrument;
                gameInfo.musicBoxes[idx2].volume = gameInfo.musicBoxes[idx1].volume;
                gameInfo.musicBoxes[idx2].mode = gameInfo.musicBoxes[idx1].mode;
                gameInfo.musicBoxes[idx2].delay = gameInfo.musicBoxes[idx1].delay;
                gameInfo.musicBoxes[idx2].group = gameInfo.musicBoxes[idx1].group;
            }
            break;          
        
        case 158: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.pistonsTriggers);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.pistonsTriggers);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.pistonsTriggers[idx2].group = gameInfo.pistonsTriggers[idx1].group;
            }
            break;          
        case 159:
        case 161:
        case 163:
        case 165: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.pistons);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.pistons);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.pistons[idx2].sticky = gameInfo.pistons[idx1].sticky;
                gameInfo.pistons[idx2].inverted = gameInfo.pistons[idx1].inverted;
                gameInfo.pistons[idx2].direction = gameInfo.pistons[idx1].direction;
                gameInfo.pistons[idx2].mode = gameInfo.pistons[idx1].mode;
                gameInfo.pistons[idx2].group = gameInfo.pistons[idx1].group;
            }
            break;          
        case 167: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.delays);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.delays);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.delays[idx2].gameTicks = gameInfo.delays[idx1].gameTicks;
            }
            break;          

        case 171: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.conveyorBelts);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.conveyorBelts);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.conveyorBelts[idx2].mode = gameInfo.conveyorBelts[idx1].mode;
                gameInfo.conveyorBelts[idx2].direction = gameInfo.conveyorBelts[idx1].direction;
                gameInfo.conveyorBelts[idx2].group = gameInfo.conveyorBelts[idx1].group;
            }
            break;         
        case 178: 
            idx1 = findElementByCoordinate(x1, y1, gameInfo.movers);
            idx2 = findElementByCoordinate(x2, y2, gameInfo.movers);
            if ((idx1 >= 0) && (idx2 >= 0)) {
                gameInfo.movers[idx2].direction = gameInfo.movers[idx1].direction;
            }
            break;         

        default:
            break;
    }
}

export function menuToNumber(s) {
    let result = -1;

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
        case "yellowballs":
            result = 5;
            break;
        case "pistons":
            result = 6;
            break;
        case "elevators":
            result = 7;
            break;
        case "conveyorbelts":
            result = 8;
            break;
        case "doors":
            result = 9;
            break;
        case "water":
            result = 10;
            break;
        case "misc":
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
        default:
            result = -1;
            break;
    }
    return result;
}