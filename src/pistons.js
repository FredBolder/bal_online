import { hasWeight, moveObject } from "./balUtils.js";

function canMove(element) {
    // Contains also objects that normally can not be moved
    return [2, 4, 5, 8, 9, 28, 40, 82, 84, 85, 86, 93, 94, 97, 98, 109, 110, 111, 112, 138, 139, 115, 117, 155].includes(element);
}

export function checkPistonsTrigger(backData, gameData, gameInfo, gameVars, pushingDown) {
    let result = { updated: false };
    let stop = false;
    let weight = false;
    let xTrigger = gameInfo.pistonsTrigger.x;
    let yTrigger = gameInfo.pistonsTrigger.y;
    let zeroPos = -1;

    if ((xTrigger >= 0) && (yTrigger > 0)) {
        weight = hasWeight(backData, gameData, gameInfo, xTrigger, xTrigger, yTrigger, pushingDown);
        if (gameVars.pistonsTriggerActive) {
            if (!weight) {
                gameVars.pistonsTriggerActive = false;
            }
        } else {
            if (weight) {
                gameVars.pistonsTriggerActive = true;
                gameVars.pistonsActivated = !gameVars.pistonsActivated;
                for (let i = 0; i < gameInfo.pistons.length; i++) {
                    const piston = gameInfo.pistons[i];
                    zeroPos = -1;
                    if (piston.y > 0) {
                        if (gameVars.pistonsActivated) {
                            if (!piston.activated) {
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
                                    result.updated = true;
                                    for (let j = zeroPos; j < piston.y - 1; j++) {
                                        moveObject(gameData, gameInfo, piston.x, j + 1, piston.x, j);
                                    }
                                    gameData[piston.y - 1][piston.x] = 160;
                                }
                            }
                        } else {
                            if (piston.activated) {
                                piston.activated = false;
                                gameData[piston.y - 1][piston.x] = 0;
                                result.updated = true;
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}
