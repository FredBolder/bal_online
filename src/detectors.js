import { addObject, removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates, getGameDataValue, moveObjectInDirection } from "./balUtils.js";
import { checkSettings, loadLevelSettings } from "./levels.js";
import { rotateDirection } from "./rotateGame.js";
import { setTimeBombsTime } from "./timeBombs.js";
import { presetTropicalFish } from "./tropicalFish.js";
import { isOdd, tryParseInt } from "./utils.js";

export const detectorMaxRange = 50;

export function command(backData, gameData, gameInfo, gameVars, xRef, yRef, commandLine) {
    let absX = 0;
    let absY = 0;
    let checkSettingsResult = "";
    const coordinatesList = [];
    let coordinatesMode = "";
    let direction = "";
    let fish = null;
    let idx = -1;
    const invalidInt = -10000;
    const intValues = [];
    let key = null;
    let lockedDoor = null;
    let objectNumber = 0;
    let pusher = null;
    let ticks = 50;
    let yellowBall = null;
    let val_int = 0;
    const value = commandLine.trim();
    const values = value.split(",");
    const valuesLowerCase = [];
    let n1 = 0;
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

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

    if (cmd === "activateelectricity" && values.length === 2) {
        ticks = intValues[1];
        if ((ticks > 0) && (ticks <= 50)) {
            gameVars.electricityCounter = ticks;
            gameInfo.electricityActive = true;
        }
        return;
    }
    if (cmd === "changedirection" && values.length === 2) {
        commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], -1, -1);
        return;
    }

    if ((cmd === "changedirection" && values.length === 5) || (cmd === "create" && values.length >= 5 && isOdd(values.length)) ||
        (cmd === "delete" && values.length >= 5 && isOdd(values.length)) || (cmd === "move" && values.length >= 6 && !isOdd(values.length))) {
        // create, object name, {abs|rel}, x1, y1 [, x2, y2] 
        // create, object name, {abslist|rellist}, x1, y1 [, x2, y2, ...]
        // delete, object name, {abs|rel}, x1, y1 [, x2, y2] 
        // delete, object name, {abslist|rellist}, x1, y1 [, x2, y2, ...]
        // move, object name, {abs|rel}, x1, y1 [, x2, y2], direction
        // move, object name, {abslist|rellist}, x1, y1 [, x2, y2, ...], direction
        if (cmd === "move") {
            direction = valuesLowerCase[values.length - 1];
            if (!["left", "right", "up", "down"].includes(direction)) {
                return;
            }
        }
        coordinatesMode = valuesLowerCase[2];
        if (!["abs", "rel", "abslist", "rellist"].includes(coordinatesMode)) {
            return;
        }
        if (coordinatesMode === "abslist" || coordinatesMode === "rellist") {
            n1 = Math.trunc((values.length - 3) / 2);
            if (n1 < 1) {
                return;
            }
            for (let i = 0; i < n1; i++) {
                x1 = intValues[3 + (i * 2)];
                y1 = intValues[4 + (i * 2)];
                if (x1 === invalidInt || y1 === invalidInt) {
                    return;
                }
                coordinatesList.push({ x: x1, y: y1 });
            }
        } else {
            x1 = intValues[3];
            y1 = intValues[4];
            if (x1 === invalidInt || y1 === invalidInt) {
                return;
            }
            if ((cmd === "create" || cmd === "delete" || cmd === "move") && values.length >= 7) {
                x2 = intValues[5];
                y2 = intValues[6];
                if (x2 === invalidInt || y2 === invalidInt) {
                    return;
                }
            } else {
                x2 = x1;
                y2 = y1;
            }

            // Swap if needed
            if (x1 > x2) {
                [x1, x2] = [x2, x1];
            }
            if (y1 > y2) {
                [y1, y2] = [y2, y1];
            }

            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    coordinatesList.push({ x, y });
                }
            }
        }

        for (let i = 0; i < coordinatesList.length; i++) {
            const x = coordinatesList[i].x;
            const y = coordinatesList[i].y;
            if (coordinatesMode === "abs" || coordinatesMode === "abslist") {
                absX = x;
                absY = y;
            } else {
                absX = xRef + x;
                absY = yRef + y;
            }
            const obj = getGameDataValue(gameData, absX, absY);
            if (obj === -1) {
                continue;
            }

            const objName = valuesLowerCase[1];
            if (cmd !== "changedirection" && cmd !== "create" && !objectPossible(cmd, objName, obj)) {
                continue;
            }

            if (cmd === "changedirection") {
                commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], absX, absY);
            }
            if (cmd === "create") {
                if (obj !== 0) {
                    continue;
                }
                objectNumber = nameToObjectNumber(objName);
                if (objectNumber > 0) {
                    addObject(backData, gameData, gameInfo, absX, absY, objectNumber);
                }
                if (objectNumber === 9 && ["movingyellowballdown", "movingyellowballleft", "movingyellowballright", "movingyellowballup"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.yellowBalls);
                    if (idx < 0) {
                        continue;
                    }
                    yellowBall = gameInfo.yellowBalls[idx];
                    yellowBall.direction = objName.slice(16);
                }
                if (objectNumber === 29 && ["bluekey", "greenkey", "pinkkey", "purplekey", "redkey", "whitekey", "yellowkey"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.keys);
                    if (idx < 0) {
                        continue;
                    }
                    key = gameInfo.keys[idx];
                    key.color = objName.slice(0, objName.length - 3);
                }
                if (objectNumber === 30 && ["bluelockeddoor", "greenlockeddoor", "pinklockeddoor", "purplelockeddoor", "redlockeddoor", "whitelockeddoor", "yellowlockeddoor"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.lockedDoors);
                    if (idx < 0) {
                        continue;
                    }
                    lockedDoor = gameInfo.lockedDoors[idx];
                    lockedDoor.color = objName.slice(0, objName.length - 10);
                }
                if (objectNumber === 209 && ["movingpusherdown", "movingpusherleft", "movingpusherright", "movingpusherup"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.pushers);
                    if (idx < 0) {
                        continue;
                    }
                    pusher = gameInfo.pushers[idx];
                    pusher.group = 32;
                    pusher.mode = "continue";
                    pusher.movable = false;
                    pusher.keepMoving = true;
                    pusher.direction = objName.slice(0, objName.length - 12);
                }
                if (objectNumber === 243) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.tropicalFish);
                    if (idx < 0) {
                        continue;
                    }
                    fish = gameInfo.tropicalFish[idx];
                    presetTropicalFish(fish, objName);
                }
                if (objectNumber === 256) {
                    gameInfo.levelCanHaveSpikeBalls = true;
                }
            }
            if (cmd === "delete") {
                removeObject(backData, gameData, gameInfo, absX, absY, false);
            }
            if (cmd === "move") {
                moveObjectInDirection(gameData, gameInfo, absX, absY, direction, true);
            }
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
    return ["bombs", "command", "gravitydown", "gravityup", "group", "rotategroupleft", "rotategroupright", "setting", "yellowpushers"];
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

function nameToObjectNumber(objName) {
    switch (objName) {
        case "brownball":
            return 253;
        case "detector":
            return 255;
        case "lockeddoor":
        case "bluelockeddoor":
        case "greenlockeddoor":
        case "pinklockeddoor":
        case "purplelockeddoor":
        case "redlockeddoor":
        case "whitelockeddoor":
        case "yellowlockeddoor":
            return 30;
        case "electricity":
            return 91;
        case "elevatordown":
            return 6;
        case "elevatorleft":
            return 7;
        case "elevatorright":
            return 107;
        case "elevatorup":
            return 109;
        case "forcedown":
            return 110;
        case "forceleft":
            return 112;
        case "forceright":
            return 111;
        case "forceup":
            return 0;
        case "grayball":
            return 83;
        case "grayballonemove":
            return 82;
        case "grayballtwomoves":
            return 98;
        case "horizontalladder":
            return 90;
        case "horizontalrope":
            return 80;
        case "jellyfish":
            return 248;
        case "key":
        case "bluekey":
        case "greenkey":
        case "pinkkey":
        case "purplekey":
        case "redkey":
        case "whitekey":
        case "yellowkey":
            return 29;
        case "ladder":
            return 25;
        case "lightblueball":
            return 5;
        case "magnet":
            return 119;
        case "onedirectionportdown":
            return 88;
        case "onedirectionportleft":
            return 11;
        case "onedirectionportright":
            return 10;
        case "onedirectionportup":
            return 87;
        case "orangeball":
            return 40;
        case "pinkball":
            return 203;
        case "pistondown":
            return 161;
        case "pistonleft":
            return 163;
        case "pistonright":
            return 165;
        case "pistonstrigger":
            return 158;
        case "pistonup":
            return 159;
        case "purpleball":
            return 28;
        case "pusher":
        case "movingpusherdown":
        case "movingpusherleft":
        case "movingpusherright":
        case "movingpusherup":
            return 209;
        case "redball":
            return 8;
        case "redfish":
            return 27;
        case "shrinker":
            return 199;
        case "smallblueball":
            return 168;
        case "smallbrownball":
            return 254;
        case "smallgreenball":
            return 3;
        case "smalllightblueball":
            return 195;
        case "smallorangeball":
            return 202;
        case "smallpinkball":
            return 204;
        case "smallpurpleball":
            return 197;
        case "smallredball":
            return 201;
        case "smallsilverball":
            return 140;
        case "smallwhiteball":
            return 192;
        case "smallyellowball":
            return 196;
        case "spikeball":
            return 256;
        case "spikedown":
            return 175;
        case "spikeleft":
            return 177;
        case "spikeright":
            return 176;
        case "spikeup":
            return 174;
        case "stone":
            return 1;
        case "trianglestonebottomleft":
            return 15;    
        case "trianglestonebottomright":
            return 16;    
        case "trianglestonetopleft":
            return 17;    
        case "trianglestonetopright":
            return 18;    
        case "verticalrope":
            return 137;
        case "whiteball":
            return 4;
        case "yellowball":
        case "movingyellowballdown":
        case "movingyellowballleft":
        case "movingyellowballright":
        case "movingyellowballup":
            return 9;
        case "yellowdirectionchanger1":
            return 84;
        case "yellowdirectionchanger2":
            return 85;
        case "yellowdirectionchanger3":
            return 86;
        case "yellowdirectionchanger4":
            return 138;
        case "yellowdirectionchanger5":
            return 139;
        case "yellowpusher":
            return 115;
        case "yellowpusherstrigger":
            return 116;
        case "albinoangelfish":
        case "bandedtilapia":
        case "bicoloranthias":
        case "blackneontetra":
        case "bluechromis":
        case "bluediamonddiscus":
        case "brighamssnapper":
        case "caribbeanreefshark":
        case "clownfish":
        case "electriccatfish":
        case "flagtailprochilodus":
        case "juvenilegoldentrevally":
        case "longtailredsnapper":
        case "orangereddiscus":
        case "purpletang":
        case "rainbowrunner":
        case "redtailshark":
        case "rustyjobfish":
        case "siamesealgaeeater":
        case "smallmouthgrunt":
        case "yellowfintuna":
        case "yellowtang":
        case "yellowtailaceicichlid":
        case "yellowtaildamselfish":
        case "zebraangelfish":
            return 243;
        default:
            return 0;
    }
}

function objectPossible(cmd, objName, obj) {
    if (cmd === "delete" || cmd === "move") {
        if (
            (objName === "brownball" && obj === 253) ||
            (objName === "changer" && obj === 244) ||
            (objName === "elevator" && (obj === 6 || obj === 106)) ||
            (objName === "grayballs" && [82, 83, 98].includes(obj)) ||
            (objName === "horizontalelevator" && (obj === 7 || obj === 107)) ||
            (objName === "key" && obj === 29) ||
            (objName === "lightblueball" && obj === 5) ||
            (objName === "lockeddoor" && obj === 30) ||
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
            (objName === "smallblueball" && obj === 168) ||
            (objName === "smallbrownball" && obj === 254) ||
            (objName === "smalllightblueball" && obj === 195) ||
            (objName === "smallorangeball" && obj === 202) ||
            (objName === "smallpinkball" && obj === 204) ||
            (objName === "smallpurpleball" && obj === 197) ||
            (objName === "smallredball" && obj === 201) ||
            (objName === "smallsilverball" && obj === 140) ||
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