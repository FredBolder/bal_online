import { findElementByCoordinates, getGameDataValue, moveObjectInDirection } from "./balUtils.js";
import { rotateDirection } from "./rotateGame.js";
import { tryParseInt } from "./utils.js";

export function changeDetectorMode(gameInfo, x, y, mode) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.detectors);
    if (idx >= 0) {
        gameInfo.detectors[idx].mode = mode;
    }
    return idx;
}

export function command(gameData, gameInfo, detector) {
    let absX = 0;
    let absY = 0;
    const invalidInt = -10000;
    const intValues = [];
    let val_int = 0;
    const value = detector.value.trim();
    const values = value.split(",");
    const valuesLowerCase = [];
    let x = 0;
    let y = 0;

    if (value === "" || values.length < 1) {
        return;
    }
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].trim();
        valuesLowerCase.push(values[i].toLowerCase());
        val_int = tryParseInt(values[i], invalidInt);
        intValues.push(val_int);
    }
    const cmd = valuesLowerCase[0];
    if (cmd === "move" && values.length === 6) {
        // move, object name, rel or abs, x, y, direction
        if (!["abs", "rel", "absolute", "relative"].includes(valuesLowerCase[2])) {
            return;
        }
        x = intValues[3];
        y = intValues[4];
        if (x === invalidInt || y === invalidInt) {
            return;
        }
        if (!["left", "right", "up", "down"].includes(valuesLowerCase[5])) {
            return;
        }
        if (valuesLowerCase[2] === "abs" || valuesLowerCase[2] === "absolute") {
            absX = x;
            absY = y;
        } else {
            absX = detector.x + x;
            absY = detector.y + y;
        }
        const obj = getGameDataValue(gameData, absX, absY);
        if (obj === -1) {
            return;
        }
        const objName = valuesLowerCase[1];
        if (
            (objName === "all") ||
            (objName === "brownball" && obj === 253) ||
            (objName === "changer" && obj === 244) ||
            (objName === "lightblueball" && obj === 5) ||
            (objName === "orangeball" && obj === 40) ||
            (objName === "pinkball" && obj === 203) ||
            (objName === "purpleball" && obj === 28) ||
            (objName === "purpleballs" && [28, 242].includes(obj)) ||
            (objName === "pusher" && obj === 209) ||
            (objName === "smallgreenball" && obj === 3) ||
            (objName === "spike" && obj === [174, 175, 176, 177].includes(obj)) ||
            (objName === "stone" && obj === 1) ||
            (objName === "whiteball" && obj === 4) ||
            (objName === "whiteballs" && [4, 245].includes(obj)) ||
            (objName === "yellowball" &&  obj === 9)
        ) {
            moveObjectInDirection(gameData, gameInfo, absX, absY, valuesLowerCase[5], true);
        }
    }

}

export function detectorDisplayModes() {
    return ["default", "stone", "grayball"];
}

export function detectorModes() {
    return ["all", "blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball"];
}

export function detectorTargets() {
    return ["group", "setting", "rotategroupleft", "rotategroupright", "command"];
}

export function rotateGroup(gameData, gameInfo, group, rotateLeft) {
    // Pushers
    for (let i = 0; i < gameInfo.pushers.length; i++) {
        const pusher = gameInfo.pushers[i];
        if (pusher.group === group) {
            pusher.direction = rotateDirection(pusher.direction, rotateLeft);
        }
    }
}