import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { nextConveyorBeltDirection } from "./conveyorBelts.js";

function canMove(element) {
    // Contains also objects that normally can not be moved
    return [2, 4, 5, 8, 9, 28, 40, 82, 84, 85, 86, 93, 94, 97, 98, 109, 110, 111, 112, 138, 139, 115, 117, 155, 169, 171, 172, 173, 178].includes(element);
}

export function checkPistonsTriggers(backData, gameData, gameInfo, gameVars, pushingDown) {
    let groupsWithWeight = [];
    let result = { updated: false };
    let weight = false;
    let xTrigger = -1;
    let yTrigger = -1;

    for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        const pistonsTrigger = gameInfo.pistonsTriggers[i];
        xTrigger = pistonsTrigger.x;
        yTrigger = pistonsTrigger.y;
        weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xTrigger, xTrigger, yTrigger, pushingDown);
        if (weight) {
            if (!groupsWithWeight.includes(pistonsTrigger.group)) {
                groupsWithWeight.push(pistonsTrigger.group);
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
                for (let j = 0; j < gameInfo.conveyorBelts.length; j++) {
                    const conveyorBelt = gameInfo.conveyorBelts[j];
                    if (conveyorBelt.group === pistonsTrigger.group) {
                        nextConveyorBeltDirection(conveyorBelt);
                    }
                }
            }
        }
        for (let j = 0; j < gameInfo.pistons.length; j++) {
            const piston = gameInfo.pistons[j];
            if (piston.group === pistonsTrigger.group) {
                if (gameVars.pistonGroupsActivated[pistonsTrigger.group - 1] !== piston.inverted) {
                    if (activatePiston(gameData, gameInfo, piston, "toggle")) {
                        result.updated = true;
                    }
                } else {
                    if (deactivatePiston(gameData, gameInfo, piston, "toggle")) {
                        result.updated = true;
                    }
                }
            }
        }
        for (let j = 0; j < gameInfo.musicBoxes.length; j++) {
            const musicBox = gameInfo.musicBoxes[j];
            if (["firstcount", "song"].includes(musicBox.mode) && (musicBox.group === pistonsTrigger.group)) {
                if (gameVars.pistonGroupsActivated[pistonsTrigger.group - 1]) {
                    if (!musicBox.active) {
                        musicBox.ended = false;
                        musicBox.noteIndex = -1;
                        musicBox.delayCounter = 0;
                    }
                    musicBox.active = true;
                } else {
                    musicBox.active = false;
                }
            }
        }
    }
    for (let j = 0; j < gameInfo.pistons.length; j++) {
        const piston = gameInfo.pistons[j];
        if (piston.mode === "momentary") {
            // xor
            if (groupsWithWeight.includes(piston.group) !== piston.inverted) {
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

export function changePistonMode(gameInfo, x, y, mode) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.pistons);
  if (idx >= 0) {
    gameInfo.pistons[idx].mode = mode;
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
    return ["toggle", "momentary", "repeatfast", "repeatslow"];
}



