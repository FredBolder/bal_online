import { findElementByCoordinates, hasWeightAbove, getGameDataValue, getListByObjectNumber, moveObject } from "./balUtils.js";
import { nextConveyorBeltDirection } from "./conveyorBelts.js";
import { commands, rotateGroup } from "./detectors.js";
import { activateAllBombs } from "./detonator.js";
import { checkSettings, loadLevelSettings } from "./levels.js";
import { movePusher } from "./pushers.js";
import { setTimeBombsTime } from "./timeBombs.js";
import { activateYellowPushers } from "./yellowPushers.js";

function canMove(element) {
    // Contains also objects that normally can not be moved
    return [2, 4, 5, 8, 9, 27, 28, 40, 82, 84, 85, 86, 93, 94, 97, 98, 109, 110, 111, 112, 138, 139, 115, 117, 155, 169, 171, 172, 173, 178, 200, 203, 208, 209, 242, 243, 244, 245, 246, 247, 248, 253, 255, 256].includes(element);
}

function checkCondition(gameData, gameInfo, x, y, condition) {
    // Result 
    // -1 = invalid, 0 = false, 1 = true
    const compChars = "=<>";
    let n = 0;
    let sComp = "";
    let sVal1 = "";
    let sVal2 = "";
    let sVar = "";

    condition = condition.trim();
    if (condition === "") {
        return 1;
    }

    n = 0;
    for (let i = 0; i < condition.length; i++) {
        const s = condition[i];
        if (s === " ") {
            continue;
        }
        if ((n === 0) && compChars.includes(s)) {
            n = 1;
        }
        if ((n === 1) && !compChars.includes(s)) {
            n = 2;
        }
        switch (n) {
            case 0:
                sVar = sVar + s;
                break;
            case 1:
                sComp = sComp + s;
                break;
            case 2:
                sVal2 = sVal2 + s;
                break;
            default:
                break;
        }
    }
    if ((sVar === "") || !["=", "<>", ">", "<", ">=", "<="].includes(sComp)) {
        return -1;
    }

    const elementNumber = getGameDataValue(gameData, x, y);
    const list = getListByObjectNumber(gameInfo, elementNumber);
    if (list === null) {
        return -1;
    }
    
    const idx = findElementByCoordinates(x, y, list);
    if (idx < 0) {
        return -1;
    }
    const element = list[idx];
    if (Object.hasOwn(element, sVar)) {
        console.log(sVar, sComp, sVal2);
        sVal1 = element[sVar].toString();
        switch (sComp) {
            case "=":
                return sVal1 === sVal2 ? 1 : 0;
            case "<>":
                return sVal1 !== sVal2 ? 1 : 0;
            case ">":
                return sVal1 > sVal2 ? 1 : 0;
            case "<":
                return sVal1 < sVal2 ? 1 : 0;
            case ">=":
                return sVal1 >= sVal2 ? 1 : 0;
            case "<=":
                return sVal1 <= sVal2 ? 1 : 0;
            default:
                return -1;
        }
    } else {
        return -1;
    }
}

export function checkPistonsDetector(gameData, gameInfo) {
    let activate = false;
    const result = { updated: false };
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;

    for (let i = 0; i < gameInfo.pistons.length; i++) {
        let x = -1;
        let y = -1;
        const piston = gameInfo.pistons[i];
        if (["blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball"].includes(piston.mode)) {
            x = piston.x;
            y = piston.y;
            switch (piston.direction) {
                case "up":
                    y--;
                    break;
                case "down":
                    y++;
                    break;
                case "left":
                    x--;
                    break;
                case "right":
                    x++;
                    break;
                default:
                    break;
            }
        }
        if ((x >= 0) && (x <= maxX) && (y >= 0) && (y <= maxY)) {
            activate = ((gameData[y][x] === 2) && (piston.mode === "blueball")) ||
                ([4, 245].includes(gameData[y][x]) && (piston.mode === "whiteball")) ||
                ((gameData[y][x] === 5) && (piston.mode === "lightblueball")) ||
                ((gameData[y][x] === 9) && (piston.mode === "yellowball")) ||
                ([8, 93, 94].includes(gameData[y][x]) && (piston.mode === "redball")) ||
                ([28, 242].includes(gameData[y][x]) && (piston.mode === "purpleball")) ||
                ((gameData[y][x] === 40) && (piston.mode === "orangeball")) ||
                ((gameData[y][x] === 203) && (piston.mode === "pinkball")) ||
                ((gameData[y][x] === 253) && (piston.mode === "brownball"));
            if (activate) {
                if (activatePiston(gameData, gameInfo, piston, piston.mode)) {
                    result.updated = true;
                }
            } else {
                if (deactivatePiston(gameData, gameInfo, piston, piston.mode)) {
                    result.updated = true;
                }
            }
        }
    }
    return result;
}

export function checkPistonsTriggers(backData, gameData, gameInfo, gameVars, pushingDown) {
    const top = 0;
    const bottom = 1;
    const left = 2;
    const right = 3;
    let activeGroups = [];
    let bombResult = null;
    let checkSettingsResult = "";
    let detect = false;
    let el = -1;
    let setting = "";
    let sideStr = "?";
    let result = { updated: false, explosion: false };
    let weight = false;
    let x = -1;
    let y = -1;
    let xTrigger = -1;
    let yTrigger = -1;

    if (!pushingDown) {
        for (let i = 0; i < gameInfo.detectors.length; i++) {
            const detector = gameInfo.detectors[i];

            if (detector.oneTime && detector.activatedCount > 0) {
                continue;
            }

            detect = false;
            for (let r = 1; r <= detector.range; r++) {
                if (detect) {
                    break;
                }

                const elTop = getGameDataValue(gameData, detector.x, detector.y - r);
                const elBottom = getGameDataValue(gameData, detector.x, detector.y + r);
                const elLeft = getGameDataValue(gameData, detector.x - r, detector.y);
                const elRight = getGameDataValue(gameData, detector.x + r, detector.y);

                for (let side = 0; side < 4; side++) {
                    if (detect) {
                        break;
                    }
                    switch (side) {
                        case top:
                            el = elTop;
                            sideStr = "top";
                            x = detector.x;
                            y = detector.y - r;
                            break;
                        case bottom:
                            el = elBottom;
                            sideStr = "bottom";
                            x = detector.x;
                            y = detector.y + r;
                            break;
                        case left:
                            el = elLeft;
                            sideStr = "left";
                            x = detector.x - r;
                            y = detector.y;
                            break;
                        case right:
                            el = elRight;
                            sideStr = "right";
                            x = detector.x + r;
                            y = detector.y;
                            break;
                        default:
                            break;
                    }
                    if (detector.activeSides.includes(sideStr)) {
                        switch (detector.mode) {
                            case "all":
                                if (el > 0) {
                                    detect = true;
                                }
                                break;
                            case "blueball":
                                if (el === 2) {
                                    detect = true;
                                }
                                break;
                            case "whiteball":
                                if (el === 4 || el === 245) {
                                    detect = true;
                                }
                                break;
                            case "lightblueball":
                                if (el === 5) {
                                    detect = true;
                                }
                                break;
                            case "yellowball":
                                if (el === 9) {
                                    detect = true;
                                }
                                break;
                            case "redball":
                                if (el === 8 || el === 93 || el === 94) {
                                    detect = true;
                                }
                                break;
                            case "purpleball":
                                if (el === 28 || el === 242) {
                                    detect = true;
                                }
                                break;
                            case "orangeball":
                                if (el === 40) {
                                    detect = true;
                                }
                                break;
                            case "pinkball":
                                if (el === 203) {
                                    detect = true;
                                }
                                break;
                            case "brownball":
                                if (el === 253) {
                                    detect = true;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    if (detect) {
                        if (checkCondition(gameData, gameInfo, x, y, detector.condition) !== 1) {
                            detect = false;
                        }
                    }
                }
            }

            if (detect && detector.target === "group" && !activeGroups.includes(detector.group)) {
                activeGroups.push(detector.group);
            }
            if (detector.activated) {
                if (!detect) {
                    detector.activated = false;
                }
            } else {
                if (detect) {
                    detector.activated = true;
                    detector.activatedCount = detector.activatedCount + 1;
                    if (detector.target === "bombs") {
                        bombResult = activateAllBombs(gameData);
                        if (bombResult.explosion) {
                            result.explosion = true;
                        }
                        if (bombResult.updated) {
                            result.updated = true;
                        }
                    }
                    if (detector.target === "command") {
                        commands(backData, gameData, gameInfo, gameVars, detector);
                        result.updated = true;
                    }
                    if (detector.target === "gravitydown") {
                        gameVars.gravity = "down";
                        result.updated = true;
                    }
                    if (detector.target === "gravityup") {
                        gameVars.gravity = "up";
                        result.updated = true;
                    }
                    if (detector.target === "group") {
                        gameVars.pistonGroupsActivated[detector.group - 1] = !gameVars.pistonGroupsActivated[detector.group - 1];
                        if (updateGroup(gameData, gameInfo, gameVars, detector.group)) {
                            result.updated = true;
                        }
                    }
                    if (detector.target === "rotategroupleft") {
                        rotateGroup(gameData, gameInfo, detector.group, true);
                        result.updated = true;
                    }
                    if (detector.target === "rotategroupright") {
                        rotateGroup(gameData, gameInfo, detector.group, false);
                        result.updated = true;
                    }
                    if (detector.target === "setting") {
                        setting = detector.value;
                        if (!setting.startsWith("$")) {
                            setting = "$" + setting;
                        }
                        checkSettingsResult = checkSettings(gameData, [setting]);
                        if (checkSettingsResult === "") {
                            loadLevelSettings(backData, gameData, gameInfo, gameVars, [setting], false);
                            setTimeBombsTime(gameVars.timeBombsTime);
                            result.updated = true;
                        } else {
                            console.log(checkSettingsResult);
                        }
                    }
                    if (detector.target === "yellowpushers") {
                        activateYellowPushers(backData, gameData, gameInfo, gameVars);
                        result.updated = true;
                    }
                }
            }
        }
    }

    for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        const pistonsTrigger = gameInfo.pistonsTriggers[i];
        xTrigger = pistonsTrigger.x;
        yTrigger = pistonsTrigger.y;
        weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xTrigger, xTrigger, yTrigger, pushingDown);
        if (weight) {
            if (!activeGroups.includes(pistonsTrigger.group)) {
                activeGroups.push(pistonsTrigger.group);
            }
        }
        if (pistonsTrigger.pressed) {
            if (!weight) {
                pistonsTrigger.pressed = false;
            }
        } else {
            if (weight) {
                pistonsTrigger.pressed = true;
                gameVars.pistonGroupsActivated[pistonsTrigger.group - 1] = !gameVars.pistonGroupsActivated[pistonsTrigger.group - 1];
                if (updateGroup(gameData, gameInfo, gameVars, pistonsTrigger.group)) {
                    result.updated = true;
                }
            }
        }
    }

    for (let j = 0; j < gameInfo.pistons.length; j++) {
        const piston = gameInfo.pistons[j];
        if (piston.mode === "momentary") {
            // xor
            if (activeGroups.includes(piston.group) !== piston.inverted) {
                if (activatePiston(gameData, gameInfo, piston, "momentary")) {
                    result.updated = true;
                }
            } else {
                if (deactivatePiston(gameData, gameInfo, piston, "momentary")) {
                    result.updated = true;
                }
            }
        }
    }

    return result;
}

export function pistonsRepeatFast(gameData, gameInfo, gameVars) {
    let update = false;

    gameVars.pistonsRepeatFastModeActive = !gameVars.pistonsRepeatFastModeActive;
    for (let i = 0; i < gameInfo.pistons.length; i++) {
        const piston = gameInfo.pistons[i];
        if (piston.mode === "repeatfast") {
            if (gameVars.pistonsRepeatFastModeActive !== piston.inverted) {
                if (activatePiston(gameData, gameInfo, piston, "repeatfast")) {
                    update = true;
                }
            } else {
                if (deactivatePiston(gameData, gameInfo, piston, "repeatfast")) {
                    update = true;
                }
            }
        }
    }
    return update;
}

export function pistonsRepeatSlow(gameData, gameInfo, gameVars) {
    let update = false;

    gameVars.pistonsRepeatSlowModeActive = !gameVars.pistonsRepeatSlowModeActive;
    for (let i = 0; i < gameInfo.pistons.length; i++) {
        const piston = gameInfo.pistons[i];
        if (piston.mode === "repeatslow") {
            if (gameVars.pistonsRepeatSlowModeActive !== piston.inverted) {
                if (activatePiston(gameData, gameInfo, piston, "repeatslow")) {
                    update = true;
                }
            } else {
                if (deactivatePiston(gameData, gameInfo, piston, "repeatslow")) {
                    update = true;
                }
            }
        }
    }
    return update;
}

function activatePiston(gameData, gameInfo, piston, mode) {
    let stop = false;
    let updated = false;
    let zeroPos = -1;

    if (mode !== piston.mode) {
        return false;
    }

    if (!piston.activated) {
        switch (piston.direction) {
            case "down":
                if (piston.y < gameData.length - 2) {
                    stop = false;
                    for (let j = piston.y + 1; (j < gameData.length) && !stop; j++) {
                        const element = gameData[j][piston.x];
                        if (element === 0) {
                            zeroPos = j;
                            stop = true;
                        } else {
                            if (!canMove(element)) {
                                stop = true;
                            }
                        }
                    }
                    if (zeroPos >= 0) {
                        piston.activated = true;
                        updated = true;
                        for (let j = zeroPos; j > piston.y + 1; j--) {
                            moveObject(gameData, gameInfo, piston.x, j - 1, piston.x, j);
                        }
                        gameData[piston.y + 1][piston.x] = 162;
                    }
                }
                break;
            case "left":
                if (piston.x > 1) {
                    stop = false;
                    for (let j = piston.x - 1; (j >= 0) && !stop; j--) {
                        const element = gameData[piston.y][j];
                        if (element === 0) {
                            zeroPos = j;
                            stop = true;
                        } else {
                            if (!canMove(element)) {
                                stop = true;
                            }
                        }
                    }
                    if (zeroPos >= 0) {
                        piston.activated = true;
                        updated = true;
                        for (let j = zeroPos; j < piston.x - 1; j++) {
                            moveObject(gameData, gameInfo, j + 1, piston.y, j, piston.y);
                        }
                        gameData[piston.y][piston.x - 1] = 164;
                    }
                }
                break;
            case "right":
                if (piston.x < gameData[0].length - 2) {
                    stop = false;
                    for (let j = piston.x + 1; (j < gameData[0].length) && !stop; j++) {
                        const element = gameData[piston.y][j];
                        if (element === 0) {
                            zeroPos = j;
                            stop = true;
                        } else {
                            if (!canMove(element)) {
                                stop = true;
                            }
                        }
                    }
                    if (zeroPos >= 0) {
                        piston.activated = true;
                        updated = true;
                        for (let j = zeroPos; j > piston.x + 1; j--) {
                            moveObject(gameData, gameInfo, j - 1, piston.y, j, piston.y);
                        }
                        gameData[piston.y][piston.x + 1] = 166;
                    }
                }
                break;
            case "up":
                if (piston.y > 1) {
                    stop = false;
                    for (let j = piston.y - 1; (j >= 0) && !stop; j--) {
                        const element = gameData[j][piston.x];
                        if (element === 0) {
                            zeroPos = j;
                            stop = true;
                        } else {
                            if (!canMove(element)) {
                                stop = true;
                            }
                        }
                    }
                    if (zeroPos >= 0) {
                        piston.activated = true;
                        updated = true;
                        for (let j = zeroPos; j < piston.y - 1; j++) {
                            moveObject(gameData, gameInfo, piston.x, j + 1, piston.x, j);
                        }
                        gameData[piston.y - 1][piston.x] = 160;
                    }
                }
                break;
            default:
                break;
        }
    }
    return updated;
}

function deactivatePiston(gameData, gameInfo, piston, mode) {
    let updated = false;

    if (mode !== piston.mode) {
        return false;
    }

    if (piston.activated) {
        piston.activated = false;
        switch (piston.direction) {
            case "down":
                if (piston.y < gameData.length - 2) {
                    gameData[piston.y + 1][piston.x] = 0;
                    if (piston.sticky) {
                        if (canMove(gameData[piston.y + 2][piston.x])) {
                            moveObject(gameData, gameInfo, piston.x, piston.y + 2, piston.x, piston.y + 1);
                        }
                    }
                }
                break;
            case "left":
                if (piston.x > 1) {
                    gameData[piston.y][piston.x - 1] = 0;
                    if (piston.sticky) {
                        if (canMove(gameData[piston.y][piston.x - 2])) {
                            moveObject(gameData, gameInfo, piston.x - 2, piston.y, piston.x - 1, piston.y);
                        }
                    }
                }
                break;
            case "right":
                if (piston.x < gameData[0].length - 2) {
                    gameData[piston.y][piston.x + 1] = 0;
                    if (piston.sticky) {
                        if (canMove(gameData[piston.y][piston.x + 2])) {
                            moveObject(gameData, gameInfo, piston.x + 2, piston.y, piston.x + 1, piston.y);
                        }
                    }
                }
                break;
            case "up":
                if (piston.y > 1) {
                    gameData[piston.y - 1][piston.x] = 0;
                    if (piston.sticky) {
                        if (canMove(gameData[piston.y - 2][piston.x])) {
                            moveObject(gameData, gameInfo, piston.x, piston.y - 2, piston.x, piston.y - 1);
                        }
                    }
                }
                break;
            default:
                break;
        }
        updated = true;
    }
    return updated;
}

export function changePistonInverted(gameInfo, x, y) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.pistons);
    if (idx >= 0) {
        gameInfo.pistons[idx].inverted = !gameInfo.pistons[idx].inverted;
    }
    return idx;
}

export function changePistonSticky(gameInfo, x, y) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.pistons);
    if (idx >= 0) {
        gameInfo.pistons[idx].sticky = !gameInfo.pistons[idx].sticky;
    }
    return idx;
}

export function pistonModes() {
    return ["toggle", "momentary", "repeatfast", "repeatslow", "blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball"];
}

function updateGroup(gameData, gameInfo, gameVars, group) {
    let needsRefresh = false;

    for (let i = 0; i < gameInfo.pistons.length; i++) {
        const piston = gameInfo.pistons[i];
        if (piston.group === group) {
            if (gameVars.pistonGroupsActivated[group - 1] !== piston.inverted) {
                if (activatePiston(gameData, gameInfo, piston, "toggle")) {
                    needsRefresh = true;
                }
            } else {
                if (deactivatePiston(gameData, gameInfo, piston, "toggle")) {
                    needsRefresh = true;
                }
            }
        }
    }
    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const musicBox = gameInfo.musicBoxes[i];
        if (["firstcount", "song"].includes(musicBox.mode) && (musicBox.group === group)) {
            if (gameVars.pistonGroupsActivated[group - 1]) {
                if (!musicBox.active) {
                    musicBox.ended = false;
                    musicBox.noteIndex = -1;
                    musicBox.tripletStart = -1;
                    musicBox.delayCounter = 0;
                }
                musicBox.active = true;
            } else {
                musicBox.active = false;
            }
        }
    }

    for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        const conveyorBelt = gameInfo.conveyorBelts[i];
        if (conveyorBelt.group === group) {
            nextConveyorBeltDirection(conveyorBelt);
            needsRefresh = true;
        }
    }

    for (let i = 0; i < gameInfo.pushers.length; i++) {
        const pusher = gameInfo.pushers[i];
        if (pusher.group === group) {
            if (pusher.mode === "continue") {
                pusher.keepMoving = true;
                continue;
            }
            if (movePusher(gameData, gameInfo, pusher)) {
                needsRefresh = true;
            }
        }
    }

    return needsRefresh;
}



