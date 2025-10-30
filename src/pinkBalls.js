import { falling, findElementByCoordinates, inWater, moveObject } from "./balUtils.js";
import { hasForceDown, hasForceUp } from "./force.js";

export function movePinkBalls(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let forceDown = false;
    let forceUp = false;
    let idx = -1;
    // Depending on the gravity direction, falling has another meaning

    // GRAVITY DOWN (NORMAL)
    if (gameVars.gravity === "down") {
        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if (pinkBall.y === i) {
                    let elementUnder = gameData[i + 1][pinkBall.x];

                    if (elementUnder === 203) {
                        // Fall together
                        idx = findElementByCoordinates(pinkBall.x, i + 1, gameInfo.pinkBalls);
                        if (idx >= 0) {
                            if (gameInfo.pinkBalls[idx].counter > 0) {
                                pinkBall.counter = gameInfo.pinkBalls[idx].counter;
                            }
                        }
                    }

                    if (elementUnder === 22) {
                        // lava
                        pinkBall.delete = true;
                        gameData[pinkBall.y][pinkBall.x] = 0;
                        update = true;
                    }

                    if (pinkBall.x < gameData[i].length - 1) {
                        // wall |\
                        if ((elementUnder === 15) && (gameData[i][pinkBall.x + 1] === 0) &&
                            (gameData[i + 1][pinkBall.x + 1] === 0) && !inWater(pinkBall.x, i, backData)) {
                            if (pinkBall.counter < gameVars.pinkCountTo) {
                                pinkBall.counter++;
                            } else {
                                pinkBall.counter = 0;
                                moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x + 1, i + 1);
                                update = true;
                            }
                        }
                    }

                    if (pinkBall.x >= 1) {
                        // wall /|
                        if ((elementUnder === 16) && (gameData[i][pinkBall.x - 1]) === 0 &&
                            (gameData[i + 1][pinkBall.x - 1] === 0) && !inWater(pinkBall.x, i, backData)) {
                            if (pinkBall.counter < gameVars.pinkCountTo) {
                                pinkBall.counter++;
                            } else {
                                pinkBall.counter = 0;
                                moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x - 1, i + 1);
                                update = true;
                            }
                        }
                    }
                }
            }
        }

        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if (pinkBall.y === i) {
                    let elementUnder = gameData[i + 1][pinkBall.x];
                    forceUp = hasForceUp(gameData, gameInfo, pinkBall.x, i);
                    if (elementUnder === 0 && (falling(pinkBall.x, i, backData, gameData, gameInfo, gameVars) || !forceUp)) {
                        if (pinkBall.counter < gameVars.pinkCountTo) {
                            pinkBall.counter++;
                        } else {
                            pinkBall.counter = 0;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x, i + 1);
                            update = true;
                        }
                    } else {
                        if (![15, 16].includes(elementUnder)) {
                            pinkBall.counter = 0;
                        }
                    }
                }
            }
        }
    }

    // GRAVITY UP
    if (gameVars.gravity === "up") {
        for (let i = 1; i <= gameData.length - 1; i++) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if (pinkBall.y === i) {
                    let elementAbove = gameData[i - 1][pinkBall.x];

                    if (elementAbove === 203) {
                        // Fall together
                        idx = findElementByCoordinates(pinkBall.x, i - 1, gameInfo.pinkBalls);
                        if (idx >= 0) {
                            if (gameInfo.pinkBalls[idx].counter > 0) {
                                pinkBall.counter = gameInfo.pinkBalls[idx].counter;
                            }
                        }
                    }

                    if (pinkBall.x < gameData[i].length - 1) {
                        // wall |/
                        if ((elementAbove === 17) && (gameData[i][pinkBall.x + 1] === 0) &&
                            (gameData[i - 1][pinkBall.x + 1] === 0) && !inWater(pinkBall.x, i, backData)
                        ) {
                            if (pinkBall.counter < gameVars.pinkCountTo) {
                                pinkBall.counter++;
                            } else {
                                pinkBall.counter = 0;
                                moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x + 1, i - 1);
                                update = true;
                            }
                        }
                    }

                    if (pinkBall.x >= 1) {
                        // wall \|
                        if (
                            (elementAbove === 18) && (gameData[i][pinkBall.x - 1] === 0) &&
                            (gameData[i - 1][pinkBall.x - 1] === 0) && !inWater(pinkBall.x, i, backData)) {
                            if (pinkBall.counter < gameVars.pinkCountTo) {
                                pinkBall.counter++;
                            } else {
                                pinkBall.counter = 0;
                                moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x - 1, i - 1);
                                update = true;
                            }
                        }
                    }
                }
            }
        }

        for (let i = 1; i <= gameData.length - 1; i++) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if (pinkBall.y === i) {
                    let elementAbove = gameData[i - 1][pinkBall.x];
                    forceDown = hasForceDown(gameData, gameInfo, pinkBall.x, i);
                    if (elementAbove === 0 && (falling(pinkBall.x, i, backData, gameData, gameInfo, gameVars) || !forceDown)) {
                        if (pinkBall.counter < gameVars.pinkCountTo) {
                            pinkBall.counter++;
                        } else {
                            pinkBall.counter = 0;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x, i - 1);
                            update = true;
                        }
                    } else {
                        if (![17, 18].includes(elementAbove)) {
                            pinkBall.counter = 0;
                        }
                    }
                }
            }
        }
    }

    // Delete pink balls that fell in the lava
    gameInfo.pinkBalls.splice(0, gameInfo.pinkBalls.length,
        ...gameInfo.pinkBalls.filter(ball => !ball.delete)
    );



    return update;
}
