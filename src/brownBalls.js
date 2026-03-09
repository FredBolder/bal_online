import { falling, findElementByCoordinates, getGameDataValue, inWater, moveObject } from "./balUtils.js";
import { hasForceDown, hasForceUp } from "./force.js";
import { hasBottomGlideLeftToRight, hasBottomGlideRightToLeft, hasTopGlideLeftToRight, hasTopGlideRightToLeft } from "./triangleStones.js";

export function checkBrownBalls(gameData, gameInfo) {
    let update = false;
    const newBrownBalls = [];

    for (let i = 0; i < gameInfo.brownBalls.length; i++) {
        const brownBall = gameInfo.brownBalls[i];
        const eTop = getGameDataValue(gameData, brownBall.x, brownBall.y - 1);
        const eBottom = getGameDataValue(gameData, brownBall.x, brownBall.y + 1);
        const eLeft = getGameDataValue(gameData, brownBall.x - 1, brownBall.y);
        const eRight = getGameDataValue(gameData, brownBall.x + 1, brownBall.y);
        if ((eTop === 253 || eBottom === 253 || eLeft === 253 || eRight === 253)) {
            update = true;            
            brownBall.delete = true;
        } else {
            newBrownBalls.push(brownBall);
        }
    }

    if (!update) return false;

    for (let i = 0; i < gameInfo.brownBalls.length; i++) {
        const brownBall = gameInfo.brownBalls[i];
        if (brownBall.delete) {
            gameData[brownBall.y][brownBall.x] = 0;
        }        
    }

    gameInfo.brownBalls = newBrownBalls;
    return update;
}

export function moveBrownBalls(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let forceDown = false;
    let forceUp = false;
    let idx = -1;
    // Depending on the gravity direction, falling has another meaning

    // GRAVITY DOWN (NORMAL)
    if (gameVars.gravity === "down") {
        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.brownBalls.length; j++) {
                const brownBall = gameInfo.brownBalls[j];
                if (brownBall.y === i) {
                    let elementUnder = gameData[i + 1][brownBall.x];

                    if (elementUnder === 253) {
                        // Fall together
                        idx = findElementByCoordinates(brownBall.x, i + 1, gameInfo.brownBalls);
                        if (idx >= 0) {
                            if (gameInfo.brownBalls[idx].counter > 0) {
                                brownBall.counter = gameInfo.brownBalls[idx].counter;
                            }
                        }
                    }

                    if (brownBall.x < gameData[i].length - 1) {
                        // wall |\
                        if (hasTopGlideLeftToRight(elementUnder) && (gameData[i][brownBall.x + 1] === 0) &&
                            (gameData[i + 1][brownBall.x + 1] === 0) && !inWater(brownBall.x, i, backData)) {
                            if (brownBall.counter < gameVars.brownCountTo) {
                                brownBall.counter++;
                            } else {
                                brownBall.counter = 0;
                                moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x + 1, i + 1);
                                update = true;
                            }
                        }
                    }

                    if (brownBall.x >= 1) {
                        // wall /|
                        if (hasTopGlideRightToLeft(elementUnder) && (gameData[i][brownBall.x - 1]) === 0 &&
                            (gameData[i + 1][brownBall.x - 1] === 0) && !inWater(brownBall.x, i, backData)) {
                            if (brownBall.counter < gameVars.brownCountTo) {
                                brownBall.counter++;
                            } else {
                                brownBall.counter = 0;
                                moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x - 1, i + 1);
                                update = true;
                            }
                        }
                    }
                }
            }
        }

        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.brownBalls.length; j++) {
                const brownBall = gameInfo.brownBalls[j];
                if (brownBall.y === i) {
                    let elementUnder = gameData[i + 1][brownBall.x];
                    forceUp = hasForceUp(gameData, gameInfo, brownBall.x, i);
                    if (elementUnder === 0 && (falling(brownBall.x, i, backData, gameData, gameInfo, gameVars) || !forceUp)) {
                        if (brownBall.counter < gameVars.brownCountTo) {
                            brownBall.counter++;
                        } else {
                            brownBall.counter = 0;
                            moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x, i + 1);
                            update = true;
                        }
                    } else {
                        if (!hasTopGlideLeftToRight(elementUnder) && !hasTopGlideRightToLeft(elementUnder)) {
                            brownBall.counter = 0;
                        }
                    }
                }
            }
        }
    }

    // GRAVITY UP
    if (gameVars.gravity === "up") {
        for (let i = 1; i <= gameData.length - 1; i++) {
            for (let j = 0; j < gameInfo.brownBalls.length; j++) {
                const brownBall = gameInfo.brownBalls[j];
                if (brownBall.y === i) {
                    let elementAbove = gameData[i - 1][brownBall.x];

                    if (elementAbove === 253) {
                        // Fall together
                        idx = findElementByCoordinates(brownBall.x, i - 1, gameInfo.brownBalls);
                        if (idx >= 0) {
                            if (gameInfo.brownBalls[idx].counter > 0) {
                                brownBall.counter = gameInfo.brownBalls[idx].counter;
                            }
                        }
                    }

                    if (brownBall.x < gameData[i].length - 1) {
                        // wall |/
                        if (hasBottomGlideLeftToRight(elementAbove) && (gameData[i][brownBall.x + 1] === 0) &&
                            (gameData[i - 1][brownBall.x + 1] === 0) && !inWater(brownBall.x, i, backData)
                        ) {
                            if (brownBall.counter < gameVars.brownCountTo) {
                                brownBall.counter++;
                            } else {
                                brownBall.counter = 0;
                                moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x + 1, i - 1);
                                update = true;
                            }
                        }
                    }

                    if (brownBall.x >= 1) {
                        // wall \|
                        if (
                            hasBottomGlideRightToLeft(elementAbove) && (gameData[i][brownBall.x - 1] === 0) &&
                            (gameData[i - 1][brownBall.x - 1] === 0) && !inWater(brownBall.x, i, backData)) {
                            if (brownBall.counter < gameVars.brownCountTo) {
                                brownBall.counter++;
                            } else {
                                brownBall.counter = 0;
                                moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x - 1, i - 1);
                                update = true;
                            }
                        }
                    }
                }
            }
        }

        for (let i = 1; i <= gameData.length - 1; i++) {
            for (let j = 0; j < gameInfo.brownBalls.length; j++) {
                const brownBall = gameInfo.brownBalls[j];
                if (brownBall.y === i) {
                    let elementAbove = gameData[i - 1][brownBall.x];
                    forceDown = hasForceDown(gameData, gameInfo, brownBall.x, i);
                    if (elementAbove === 0 && (falling(brownBall.x, i, backData, gameData, gameInfo, gameVars) || !forceDown)) {
                        if (brownBall.counter < gameVars.brownCountTo) {
                            brownBall.counter++;
                        } else {
                            brownBall.counter = 0;
                            moveObject(gameData, gameInfo, brownBall.x, i, brownBall.x, i - 1);
                            update = true;
                        }
                    } else {
                        if (!hasBottomGlideLeftToRight(elementAbove) && !hasBottomGlideRightToLeft(elementAbove)) {
                            brownBall.counter = 0;
                        }
                    }
                }
            }
        }
    }
    return update;
}
