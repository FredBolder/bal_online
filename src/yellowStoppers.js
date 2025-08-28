import { hasWeightAbove } from "./balUtils.js";

export function checkYellowStoppers(backData, gameData, gameInfo, gameVars, pushingDown) {
    let weight = false;
    let trigger = false;
    let xTrigger = -1;
    let yTrigger = -1;

    for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
        const yellowStopper = gameInfo.yellowStoppers[i];
        xTrigger = yellowStopper.x;
        yTrigger = yellowStopper.y;
        weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xTrigger, xTrigger, yTrigger, pushingDown);
        if (yellowStopper.pressed) {
            if (!weight) {
                yellowStopper.pressed = false;
            }
        } else {
            if (weight) {
                yellowStopper.pressed = true;
                trigger = true;
            }
        }
    }
    if (trigger) {
        for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
            const yellowBall = gameInfo.yellowBalls[i];
            yellowBall.direction = "none";
        }
        for (let i = 0; i < gameInfo.yellowBars.length; i++) {
            const yellowBar = gameInfo.yellowBars[i];
            yellowBar.direction = "none";
        }
        gameVars.yellowPaused = false;
    }
}
