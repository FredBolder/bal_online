export function checkYellowStopper(gameData, gameInfo, gameVars) {
    if ((gameInfo.yellowStopper.x >= 0) && (gameInfo.yellowStopper.y >= 0)) {
        if (gameVars.yellowStopperActive) {
            if (![2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowStopper.y - 1][gameInfo.yellowStopper.x])) {
                gameVars.yellowStopperActive = false;
            }
        } else {
            if ([2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowStopper.y - 1][gameInfo.yellowStopper.x])) {
                gameVars.yellowStopperActive = true;
                for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
                    const yellowBall = gameInfo.yellowBalls[i];
                    yellowBall.direction = "none";
                }
                for (let i = 0; i < gameInfo.yellowBars.length; i++) {
                    const yellowBar = gameInfo.yellowBars[i];
                    yellowBar.direction = "none";
                }
            }
        }
    }
}