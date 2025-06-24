import { hasWeight } from "./balUtils.js";

export function checkYellowStopper(backData, gameData, gameInfo, gameVars, pushingDown) {
    let weight = false;
    let xTrigger = gameInfo.yellowStopper.x;
    let yTrigger = gameInfo.yellowStopper.y;

    if ((xTrigger >= 0) && (yTrigger >= 0)) {
        weight = hasWeight(backData, gameData, gameInfo, xTrigger, xTrigger, yTrigger, pushingDown);
        if (gameVars.yellowStopperActive) {
            if (!weight) {
                gameVars.yellowStopperActive = false;
            }
        } else {
            if (weight) {
                gameVars.yellowStopperActive = true;
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
    }
}