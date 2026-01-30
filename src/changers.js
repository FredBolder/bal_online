import { getGameDataValue } from "./balUtils.js";
import { addObject, removeObject } from "./addRemoveObject.js";

export function checkColor(color) {
    return ["all", "lightblue", "orange", "pink", "purple", "red", "white", "yellow"].includes(color.toLowerCase());
}

function colorToObject(color) {
    let result = -1;

    switch (color.toLowerCase()) {
        case "white":
            result = 4;
            break;
        case "lightblue":
            result = 5;
            break;
        case "orange":
            result = 40;
            break;
        case "pink":
            result = 203;
            break;
        case "purple":
            result = 28;
            break;
        case "red":
            result = 8;
            break;
        case "yellow":
            result = 9;
            break;
        default:
            result = -1;
            break;
    }
    return result;
}

function objectToColor(objectNumber) {
    let result = "";

    switch (objectNumber) {
        case 4:
        case 245:
            result = "white";
            break;
        case 5:
            result = "lightblue";
            break;
        case 40:
            result = "orange";
            break;
        case 203:
            result = "pink";
            break;
        case 28:
        case 242:
            result = "purple";
            break;
        case 8:
        case 93:
        case 94:
            result = "red";
            break;
        case 9:
            result = "yellow";
            break;
        default:
            result = "";
            break;
    }
    return result;
}

export function checkChangers(backData, gameData, gameInfo) {
    let changed = false;
    let obj = -1;
    let update = false;

    for (let i = 0; i < gameInfo.changers.length; i++) {
        changed = false;
        const changer = gameInfo.changers[i];
        const elTop = getGameDataValue(gameData, changer.x, changer.y - 1);
        const elBottom = getGameDataValue(gameData, changer.x, changer.y + 1);
        const elLeft = getGameDataValue(gameData, changer.x - 1, changer.y);
        const elRight = getGameDataValue(gameData, changer.x + 1, changer.y);

        if (changer.ready) {
            const c1 = changer.color1.toLowerCase();
            const c2 = changer.color2.toLowerCase();
            if (changer.horizontal) {
                if (((objectToColor(elLeft) === c1) || (c1 === "all") && (checkColor(objectToColor(elLeft)))) && (elRight === 0)) {
                    obj = colorToObject(c2);
                    if (obj > 0) {
                        removeObject(gameData, gameInfo, changer.x - 1, changer.y);
                        addObject(backData, gameData, gameInfo, changer.x + 1, changer.y, obj);
                        changed = true;
                    }
                } else if (((objectToColor(elRight) === c2) || (c2 === "all") && (checkColor(objectToColor(elRight)))) && (elLeft === 0)) {
                    obj = colorToObject(c1);
                    if (obj > 0) {
                        removeObject(gameData, gameInfo, changer.x + 1, changer.y);
                        addObject(backData, gameData, gameInfo, changer.x - 1, changer.y, obj);
                        changed = true;
                    }
                }
            } else {
                if (((objectToColor(elTop) === c1) || (c1 === "all") && (checkColor(objectToColor(elTop)))) && (elBottom === 0)) {
                    obj = colorToObject(c2);
                    if (obj > 0) {
                        removeObject(gameData, gameInfo, changer.x, changer.y - 1);
                        addObject(backData, gameData, gameInfo, changer.x, changer.y + 1, obj);
                        changed = true;
                    }
                } else if (((objectToColor(elBottom) === c2) || (c2 === "all") && (checkColor(objectToColor(elBottom)))) && (elTop === 0)) {
                    obj = colorToObject(c1);
                    if (obj > 0) {
                        removeObject(gameData, gameInfo, changer.x, changer.y + 1);
                        addObject(backData, gameData, gameInfo, changer.x, changer.y - 1, obj);
                        changed = true;
                    }
                }
            }
        } else {
            changer.ready = ((changer.horizontal && (elLeft === 0) && (elRight === 0)) ||
                (!changer.horizontal && (elTop === 0) && (elBottom === 0)));
        }
        if (changed) {
            update = true;
            changer.ready = false;
        }
    }
    return update;
}