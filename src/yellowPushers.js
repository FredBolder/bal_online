import { findElementByCoordinate, hasWeightAbove } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";
import { updateYellowBall } from "./yellowBalls.js";
import { moveYellowBar } from "./yellowBars.js";

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

export function checkYellowPushersTriggers(backData, gameData, gameInfo, gameVars, pushingDown) {
    let result = { updated: false };
    let trigger = false;
    let weight = false;
    let xTrigger = -1;
    let yTrigger = -1;

    for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
        const yellowBallPushersTrigger = gameInfo.yellowBallPushersTriggers[i];
        xTrigger = yellowBallPushersTrigger.x;
        yTrigger = yellowBallPushersTrigger.y;
        weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xTrigger, xTrigger, yTrigger, pushingDown);
        if (yellowBallPushersTrigger.pressed) {
            if (!weight) {
                yellowBallPushersTrigger.pressed = false;
            }
        } else {
            if (weight) {
                yellowBallPushersTrigger.pressed = true;
                trigger = true;
            }
        }
    }
    if (trigger) {
        for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
            const yellowBallPusher = gameInfo.yellowBallPushers[i];
            const x = yellowBallPusher.x;
            const y = yellowBallPusher.y;
            if (x < gameData[0].length - 2) {
                if (isNotMovingYellowBall(gameData, gameInfo, x + 1, y) && (gameData[y][x + 2] === 0) && !hasForceLeft(gameData, gameInfo, x + 1, y)) {
                    gameData[y][x + 2] = 9;
                    gameData[y][x + 1] = 0;
                    updateYellowBall(gameInfo.yellowBalls, x + 1, y, x + 2, y, "right");
                    result.updated = true;
                }
                if (moveYellowBar(x, y, backData, gameData, gameInfo, gameVars, "right", -1, true)) {
                    result.updated = true;
                }
            }
            if (x > 2) {
                if (isNotMovingYellowBall(gameData, gameInfo, x - 1, y) && (gameData[y][x - 2] === 0) && !hasForceRight(gameData, gameInfo, x - 1, y)) {
                    gameData[y][x - 2] = 9;
                    gameData[y][x - 1] = 0;
                    updateYellowBall(gameInfo.yellowBalls, x - 1, y, x - 2, y, "left");
                    result.updated = true;
                }
                if (moveYellowBar(x, y, backData, gameData, gameInfo, gameVars, "left", -1, true)) {
                    result.updated = true;
                }
            }
            if (y < gameData.length - 2) {
                if (isNotMovingYellowBall(gameData, gameInfo, x, y + 1) && (gameData[y + 2][x] === 0) && !hasForceUp(gameData, gameInfo, x, y + 1)) {
                    gameData[y + 2][x] = 9;
                    gameData[y + 1][x] = 0;
                    updateYellowBall(gameInfo.yellowBalls, x, y + 1, x, y + 2, "down");
                    result.updated = true;
                }
                if (moveYellowBar(x, y, backData, gameData, gameInfo, gameVars, "down", -1, true)) {
                    result.updated = true;
                }
            }
            if (y > 2) {
                if (isNotMovingYellowBall(gameData, gameInfo, x, y - 1) && (gameData[y - 2][x] === 0) && !hasForceDown(gameData, gameInfo, x, y - 1)) {
                    gameData[y - 2][x] = 9;
                    gameData[y - 1][x] = 0;
                    updateYellowBall(gameInfo.yellowBalls, x, y - 1, x, y - 2, "up");
                    result.updated = true;
                }
                if (moveYellowBar(x, y, backData, gameData, gameInfo, gameVars, "up", -1, true)) {
                    result.updated = true;
                }
            }

        }
    }
    return result;
}

