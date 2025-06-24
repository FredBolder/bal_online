import { hasWeight } from "./balUtils.js";

export function checkYellowPauser(backData, gameData, gameInfo, gameVars, pushingDown) {
    let weight = false;
    let xTrigger = gameInfo.yellowPauser.x;
    let yTrigger = gameInfo.yellowPauser.y;

    if ((xTrigger >= 0) && (yTrigger >= 0)) {
        weight = hasWeight(backData, gameData, gameInfo, xTrigger, xTrigger, yTrigger, pushingDown);
        if (gameVars.yellowPauserActive) {
            if (!weight) {
                gameVars.yellowPauserActive = false;
            }
        } else {
            if (weight) {
                gameVars.yellowPauserActive = true;
                gameVars.yellowPaused = !gameVars.yellowPaused;
            }
        }
    }
}