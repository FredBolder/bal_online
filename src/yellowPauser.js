export function checkYellowPauser(gameData, gameInfo, gameVars) {
    if ((gameInfo.yellowPauser.x >= 0) && (gameInfo.yellowPauser.y >= 0)) {
        if (gameVars.yellowPauserActive) {
            if (![2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowPauser.y - 1][gameInfo.yellowPauser.x])) {
                gameVars.yellowPauserActive = false;
            }
        } else {
            if ([2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowPauser.y - 1][gameInfo.yellowPauser.x])) {
                gameVars.yellowPauserActive = true;
                gameVars.yellowPaused = !gameVars.yellowPaused;
            }
        }
    }
}