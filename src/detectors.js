import { addObject, removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates, getGameDataValue, moveObjectInDirection } from "./balUtils.js";
import { checkSettings, loadLevelSettings } from "./levels.js";
import { rotateDirection } from "./rotateGame.js";
import { setTimeBombsTime } from "./timeBombs.js";
import { presetTropicalFish } from "./tropicalFish.js";
import { tryParseInt } from "./utils.js";

export const detectorMaxRange = 50;

export function command(backData, gameData, gameInfo, gameVars, xRef, yRef, commandLine) {
    let absX = 0;
    let absY = 0;
    let checkSettingsResult = "";
    let idx = -1;
    const invalidInt = -10000;
    const intValues = [];
    let objectNumber = 0;
    let val_int = 0;
    const value = commandLine.trim();
    const values = value.split(",");
    const valuesLowerCase = [];
    let x = 0;
    let y = 0;

    if (value === "" || values.length < 1) {
        return;
    }

    if (value.startsWith("$")) {
        checkSettingsResult = checkSettings(gameData, [value]);
        if (checkSettingsResult === "") {
            loadLevelSettings(backData, gameData, gameInfo, gameVars, [value], false);
            setTimeBombsTime(gameVars.timeBombsTime);
        } else {
            console.log(checkSettingsResult);
        }
    }

    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].trim();
        valuesLowerCase.push(values[i].toLowerCase());
        val_int = tryParseInt(values[i], invalidInt);
        intValues.push(val_int);
    }
    const cmd = valuesLowerCase[0];
    if (cmd === "changedirection" && values.length === 2) {
        commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], -1, -1);
    }
    if ((cmd === "changedirection" && values.length === 5) || (cmd === "create" && values.length === 5) ||
        (cmd === "delete" && values.length === 5) || (cmd === "move" && values.length === 6)) {
        // create, object name, rel or abs, x, y
        // delete, object name, rel or abs, x, y
        // move, object name, rel or abs, x, y, direction
        if (!["abs", "rel", "absolute", "relative"].includes(valuesLowerCase[2])) {
            return;
        }
        x = intValues[3];
        y = intValues[4];
        if (x === invalidInt || y === invalidInt) {
            return;
        }
        if (cmd === "move") {
            if (!["left", "right", "up", "down"].includes(valuesLowerCase[5])) {
                return;
            }
        }
        if (valuesLowerCase[2] === "abs" || valuesLowerCase[2] === "absolute") {
            absX = x;
            absY = y;
        } else {
            absX = xRef + x;
            absY = yRef + y;
        }
        const obj = getGameDataValue(gameData, absX, absY);
        if (obj === -1) {
            return;
        }

        const objName = valuesLowerCase[1];
        if (cmd !== "changedirection" && cmd !== "create" && !objectPossible(cmd, objName, obj)) {
            return;
        }

        if (cmd === "changedirection") {
            commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], absX, absY);
        }
        if (cmd === "create") {
            if (obj !== 0) {
                return;
            }
            switch (objName) {
                case "brownball":
                    objectNumber = 253;
                    break;
                case "detector":
                    objectNumber = 255;
                    break;
                case "elevatordown":
                    objectNumber = 6;
                    break;
                case "elevatorleft":
                    objectNumber = 7;
                    break;
                case "elevatorright":
                    objectNumber = 107;
                    break;
                case "elevatorup":
                    objectNumber = 109;
                    break;
                case "forcedown":
                    objectNumber = 110;
                    break;
                case "forceleft":
                    objectNumber = 112;
                    break;
                case "forceright":
                    objectNumber = 111;
                    break;
                case "forceup":
                    objectNumber = 0;
                    break;
                case "grayball":
                    objectNumber = 83;
                    break;
                case "grayballonemove":
                    objectNumber = 82;
                    break;
                case "grayballtwomoves":
                    objectNumber = 98;
                    break;
                case "jellyfish":
                    objectNumber = 248;
                    break;
                case "lightblueball":
                    objectNumber = 5;
                    break;
                case "onedirectionportdown":
                    objectNumber = 88;
                    break;
                case "onedirectionportleft":
                    objectNumber = 11;
                    break;
                case "onedirectionportright":
                    objectNumber = 10;
                    break;
                case "onedirectionportup":
                    objectNumber = 87;
                    break;
                case "orangeball":
                    objectNumber = 40;
                    break;
                case "pinkball":
                    objectNumber = 203;
                    break;
                case "pistondown":
                    objectNumber = 161;
                    break;
                case "pistonleft":
                    objectNumber = 163;
                    break;
                case "pistonright":
                    objectNumber = 165;
                    break;
                case "pistonstrigger":
                    objectNumber = 158;
                    break;
                case "pistonup":
                    objectNumber = 159;
                    break;
                case "purpleball":
                    objectNumber = 28;
                    break;
                case "pusher":
                    objectNumber = 209;
                    break;
                case "redball":
                    objectNumber = 8;
                    break;
                case "redfish":
                    objectNumber = 27;
                    break;
                case "spikeball":
                    objectNumber = 256;
                    break;
                case "spikedown":
                    objectNumber = 175;
                    break;
                case "spikeleft":
                    objectNumber = 177;
                    break;
                case "spikeright":
                    objectNumber = 176;
                    break;
                case "spikeup":
                    objectNumber = 174;
                    break;
                case "stone":
                    objectNumber = 1;
                    break;
                case "whiteball":
                    objectNumber = 4;
                    break;
                case "yellowball":
                    objectNumber = 9;
                    break;
                case "yellowdirectionchanger1":
                    objectNumber = 84;
                    break;
                case "yellowdirectionchanger2":
                    objectNumber = 85;
                    break;
                case "yellowdirectionchanger3":
                    objectNumber = 86;
                    break;
                case "yellowdirectionchanger4":
                    objectNumber = 138;
                    break;
                case "yellowdirectionchanger5":
                    objectNumber = 139;
                    break;
                case "yellowpusher":
                    objectNumber = 115;
                    break;
                case "yellowpusherstrigger":
                    objectNumber = 116;
                    break;
                case "bicoloranthias":
                case "blackneontetra":
                case "bluediamonddiscus":
                case "brighamssnapper":
                case "clownfish":
                case "juvenilegoldentrevally":
                case "orangereddiscus":
                case "purpletang":
                case "redtailshark":
                case "siamesealgaeeater":
                case "smallmouthgrunt":
                case "yellowtang":
                case "yellowtailaceicichlid":
                case "yellowtaildamselfish":
                case "zebraangelfish":
                    objectNumber = 243;
                    break;
                default:
                    objectNumber = 0;
                    break;
            }
            if (objectNumber > 0) {
                addObject(backData, gameData, gameInfo, absX, absY, objectNumber);
            }
            if (objectNumber === 243) {
                idx = findElementByCoordinates(absX, absY, gameInfo.tropicalFish);
                if (idx < 0) {
                    return;
                }
                presetTropicalFish(gameInfo, idx, objName);
            }
        }
        if (cmd === "delete") {
            removeObject(backData, gameData, gameInfo, absX, absY, false);
        }
        if (cmd === "move") {
            moveObjectInDirection(gameData, gameInfo, absX, absY, valuesLowerCase[5], true);
        }
    }

}

function commandChangeDirection(gameData, gameInfo, target, x, y) {
    let gd = -1;

    if (x >= 0 && y >= 0) {
        gd = getGameDataValue(gameData, x, y);
        if (gd <= 0) {
            return;
        }
        if (target === "onedirectionport") {
            switch (gd) {
                case 10:
                    gameData[y][x] = 11;
                    break;
                case 11:
                    gameData[y][x] = 10;
                    break;
                case 87:
                    gameData[y][x] = 88;
                    break;
                case 88:
                    gameData[y][x] = 87;
                    break;
                default:
                    break;
            }
            return;
        }
        return;
    }
    if (target === "elevator") {
        for (let i = 0; i < gameInfo.elevators.length; i++) {
            const elevator = gameInfo.elevators[i];
            if (elevator.up) {
                elevator.up = false;
                gameData[elevator.y][elevator.x] = 6;
            } else {
                elevator.up = true;
                gameData[elevator.y][elevator.x] = 106;
            }
        }
        for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
            const elevator = gameInfo.horizontalElevators[i];
            if (elevator.right) {
                elevator.right = false;
                gameData[elevator.y][elevator.x] = 7;
            } else {
                elevator.right = true;
                gameData[elevator.y][elevator.x] = 107;
            }
        }
        return;
    }
    if (target === "pusher") {
        for (let i = 0; i < gameInfo.pushers.length; i++) {
            const pusher = gameInfo.pushers[i];
            switch (pusher.direction) {
                case "left":
                    pusher.direction = "right";
                    break;
                case "right":
                    pusher.direction = "left";
                    break;
                case "up":
                    pusher.direction = "down";
                    break;
                case "down":
                    pusher.direction = "up";
                    break;
                default:
                    break;
            }
        }
    }
}

export function commands(backData, gameData, gameInfo, gameVars, detector) {
    const value = detector.value.trim();
    let commandLine = "";
    const commandList = value.split("|");

    if (value === "" || commandList.length < 1) {
        return;
    }

    if (detector.sequence) {
        if (detector.activatedCount > commandList.length) {
            detector.activatedCount = 1;
        }
        commandLine = commandList[detector.activatedCount - 1].trim();
        command(backData, gameData, gameInfo, gameVars, detector.x, detector.y, commandLine);
        return;
    }
    for (let i = 0; i < commandList.length; i++) {
        commandLine = commandList[i].trim();
        command(backData, gameData, gameInfo, gameVars, detector.x, detector.y, commandLine);
    }
}

export function detectorDisplayModes() {
    return ["default", "stone", "grayball"];
}

export function detectorModes() {
    return ["all", "blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball"];
}

export function detectorTargets() {
    return ["command", "gravitydown", "gravityup", "group", "rotategroupleft", "rotategroupright", "setting"];
}

function isStone(obj) {
    if ([1, 241, 35, 12].includes(obj)) {
        return true;
    }
    if (obj >= 15 && obj <= 18) {
        return true;
    }
    if (obj >= 210 && obj <= 225) {
        return true;
    }
    if (obj >= 141 && obj <= 154) {
        return true;
    }
    if (obj >= 234 && obj <= 240) {
        return true;
    }
    return false;
}

function objectPossible(cmd, objName, obj) {
    if (cmd === "delete" || cmd === "move") {
        if (
            (objName === "brownball" && obj === 253) ||
            (objName === "changer" && obj === 244) ||
            (objName === "grayballs" && [82, 83, 98].includes(obj)) ||
            (objName === "lightblueball" && obj === 5) ||
            (objName === "onedirectionportdown" && obj === 88) ||
            (objName === "onedirectionportleft" && obj === 11) ||
            (objName === "onedirectionportright" && obj === 10) ||
            (objName === "onedirectionports" && [88, 11, 10, 87].includes(obj)) ||
            (objName === "onedirectionportup" && obj === 87) ||
            (objName === "orangeball" && obj === 40) ||
            (objName === "phaseability" && obj === 207) ||
            (objName === "pinkball" && obj === 203) ||
            (objName === "pinkball" && obj === 203) ||
            (objName === "pistonstrigger" && obj === 158) ||
            (objName === "purpleballs" && [28, 242].includes(obj)) ||
            (objName === "pusher" && obj === 209) ||
            (objName === "redball" && [8, 93, 94].includes(obj)) ||
            (objName === "shrinker" && obj === 199) ||
            (objName === "smallbrownball" && obj === 254) ||
            (objName === "smalllightblueball" && obj === 195) ||
            (objName === "smallorangeball" && obj === 202) ||
            (objName === "smallpinkball" && obj === 204) ||
            (objName === "smallpurpleball" && obj === 197) ||
            (objName === "smallredball" && obj === 201) ||
            (objName === "smallwhiteball" && obj === 192) ||
            (objName === "smallyellowball" && obj === 196) ||
            (objName === "spike" && [174, 175, 176, 177].includes(obj)) ||
            (objName === "spikeball" && obj === 256) ||
            (objName === "stone" && obj === 1) ||
            (objName === "stones" && isStone(obj)) ||
            (objName === "whiteball" && obj === 4) ||
            (objName === "whiteballs" && [4, 245].includes(obj)) ||
            (objName === "whiteballsynchroniser" && obj === 200) ||
            (objName === "yellowball" && obj === 9) ||
            (objName === "yellowdirectionchanger1" && obj === 84) ||
            (objName === "yellowdirectionchanger2" && obj === 85) ||
            (objName === "yellowdirectionchanger3" && obj === 86) ||
            (objName === "yellowdirectionchanger4" && obj === 138) ||
            (objName === "yellowdirectionchanger5" && obj === 139) ||
            (objName === "yellowdirectionchangers" && [84, 85, 86, 138, 139].includes(obj)) ||
            (objName === "yellowballsynchroniser" && obj === 155) ||
            (objName === "yellowpusherstrigger" && obj === 116)
        ) {
            return true;
        }
    }
    if (cmd === "delete") {
        if (
            (objName === "smallballs" && [254, 195, 202, 204, 197, 201, 192, 196].includes(obj))
        ) {
            return true;
        }
    }
    if (cmd === "move") {
        if (
            (objName === "smallballs" && [254, 3, 195, 202, 204, 197, 201, 192, 196].includes(obj)) ||
            (objName === "smallgreenball" && obj === 3)
        ) {
            return true;
        }
    }
    return false;
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