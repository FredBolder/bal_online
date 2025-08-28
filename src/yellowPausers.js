import { hasWeightAbove } from "./balUtils.js";

export function checkYellowPausers(backData, gameData, gameInfo, gameVars, pushingDown) {
    let weight = false;
    let trigger = false;
    let xTrigger = -1;
    let yTrigger = -1;

    for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
        const yellowPauser = gameInfo.yellowPausers[i];
        xTrigger = yellowPauser.x;
        yTrigger = yellowPauser.y;
        weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xTrigger, xTrigger, yTrigger, pushingDown);
        if (yellowPauser.pressed) {
            if (!weight) {
                yellowPauser.pressed = false;
            }
        } else {
            if (weight) {
                yellowPauser.pressed = true;
                trigger = true;
            }
        }
    }
    if (trigger) {
        gameVars.yellowPaused = !gameVars.yellowPaused;
    }
}