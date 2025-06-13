import { findElementByCoordinate, updateYellow } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";

function isNotMovingYellowBall(gameData, gameInfo, x, y) {
    let idx = -1;
    let result = false;

    if (gameData[y][x] === 9) {
        idx = findElementByCoordinate(x, y, gameInfo.yellowBalls);
        if (idx >= 0) {
            result = (gameInfo.yellowBalls[idx].direction === "none");
        }
    }
    return result;
}

export function checkYellowBallPushersTrigger(gameData, gameInfo, gameVars) {
    let result = { updated: false };
    if ((gameInfo.yellowBallPushersTrigger.x >= 0) && (gameInfo.yellowBallPushersTrigger.y > 0)) {
        if (gameVars.ballPushersActive) {
            if (![2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowBallPushersTrigger.y - 1][gameInfo.yellowBallPushersTrigger.x])) {
                gameVars.ballPushersActive = false;
            }
        } else {
            if ([2, 4, 8, 40, 93, 94].includes(gameData[gameInfo.yellowBallPushersTrigger.y - 1][gameInfo.yellowBallPushersTrigger.x])) {
                gameVars.ballPushersActive = true;
                for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
                    const yellowBallPusher = gameInfo.yellowBallPushers[i];
                    const x = yellowBallPusher.x;
                    const y = yellowBallPusher.y;
                    if (x < gameData[0].length - 2) {
                        if (isNotMovingYellowBall(gameData, gameInfo, x + 1, y) && (gameData[y][x + 2] === 0) && !hasForceLeft(gameData, gameInfo, x + 1, y)) {
                            gameData[y][x + 2] = 9;
                            gameData[y][x + 1] = 0;
                            updateYellow(gameInfo.yellowBalls, x + 1, y, x + 2, y, "right");
                            result.updated = true;
                        }
                    }
                    if (x > 2) {
                        if (isNotMovingYellowBall(gameData, gameInfo, x - 1, y) && (gameData[y][x - 2] === 0) && !hasForceRight(gameData, gameInfo, x - 1, y)) {
                            gameData[y][x - 2] = 9;
                            gameData[y][x - 1] = 0;
                            updateYellow(gameInfo.yellowBalls, x - 1, y, x - 2, y, "left");
                            result.updated = true;
                        }
                    }
                    if (y < gameData.length - 2) {
                        if (isNotMovingYellowBall(gameData, gameInfo, x, y + 1) && (gameData[y + 2][x] === 0) && !hasForceUp(gameData, gameInfo, x, y + 1)) {
                            gameData[y + 2][x] = 9;
                            gameData[y + 1][x] = 0;
                            updateYellow(gameInfo.yellowBalls, x, y + 1, x, y + 2, "down");
                            result.updated = true;
                        }
                    }
                    if (y > 2) {
                        if (isNotMovingYellowBall(gameData, gameInfo, x, y - 1) && (gameData[y - 2][x] === 0) && !hasForceDown(gameData, gameInfo, x, y - 1)) {
                            gameData[y - 2][x] = 9;
                            gameData[y - 1][x] = 0;
                            updateYellow(gameInfo.yellowBalls, x, y - 1, x, y - 2, "up");
                            result.updated = true;
                        }
                    }
                }
            }
        }
    }
    return result;
}

