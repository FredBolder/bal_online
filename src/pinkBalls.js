import { falling, inWater, moveObject } from "./balUtils.js";
import { hasForceDown, hasForceUp } from "./force.js";

export function movePinkBalls(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let forceDown = false;
    let forceUp = false;

    // Depending on the gravity direction, falling has another meaning

    // GRAVITY DOWN (NORMAL)
    if (gameVars.gravity === "down") {
        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if ((pinkBall.y === i) && (pinkBall.skipFalling === 0)) {
                    let elementUnder = gameData[i + 1][pinkBall.x];

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
                            update = true;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x + 1, i);
                        }
                    }

                    if (pinkBall.x >= 1) {
                        // wall /|
                        if ((elementUnder === 16) && (gameData[i][pinkBall.x - 1]) === 0 &&
                            (gameData[i + 1][pinkBall.x - 1] === 0) && !inWater(pinkBall.x, i, backData)) {
                            update = true;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x - 1, i);
                        }
                    }
                }
            }
        }

        for (let i = gameData.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if ((pinkBall.y === i) && (pinkBall.skipFalling === 0)) {
                    let elementUnder = gameData[i + 1][pinkBall.x];
                    forceUp = hasForceUp(gameData, gameInfo, pinkBall.x, i);
                    if (elementUnder === 0 && (falling(pinkBall.x, i, backData, gameData, gameInfo, gameVars) || !forceUp)) {
                        update = true;
                        moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x, i + 1);
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
                if ((pinkBall.y === i) && (pinkBall.skipFalling === 0)) {
                    let elementAbove = gameData[i - 1][pinkBall.x];

                    if (pinkBall.x < gameData[i].length - 1) {
                        // wall |/
                        if ((elementAbove === 17) && (gameData[i][pinkBall.x + 1] === 0) &&
                            (gameData[i - 1][pinkBall.x + 1] === 0) && !inWater(pinkBall.x, i, backData)
                        ) {
                            update = true;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x + 1, i);
                        }
                    }

                    if (pinkBall.x >= 1) {
                        // wall \|
                        if (
                            (elementAbove === 18) && (gameData[i][pinkBall.x - 1] === 0) &&
                            (gameData[i - 1][pinkBall.x - 1] === 0) && !inWater(pinkBall.x, i, backData)) {
                            update = true;
                            moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x - 1, i);
                        }
                    }
                }
            }
        }

        for (let i = 1; i <= gameData.length - 1; i++) {
            for (let j = 0; j < gameInfo.pinkBalls.length; j++) {
                const pinkBall = gameInfo.pinkBalls[j];
                if ((pinkBall.y === i) && (pinkBall.skipFalling === 0)) {
                    let elementAbove = gameData[i - 1][pinkBall.x];
                    forceDown = hasForceDown(gameData, gameInfo, pinkBall.x, i);
                    if (elementAbove === 0 && (falling(pinkBall.x, i, backData, gameData, gameInfo, gameVars) || !forceDown)) {
                        update = true;
                        moveObject(gameData, gameInfo, pinkBall.x, i, pinkBall.x, i - 1);
                    }
                }
            }
        }
    }

    // Delete pink balls that fell in the lava
    gameInfo.pinkBalls.splice(0, gameInfo.pinkBalls.length,
        ...gameInfo.pinkBalls.filter(ball => !ball.delete)
    );

    // Decrement skip falling
    for (let i = 0; i < gameInfo.pinkBalls.length; i++) {
        const pinkBall = gameInfo.pinkBalls[i];
        if (pinkBall.skipFalling > 0) {
            pinkBall.skipFalling--;
        }
    }

    return update;
}

export function skipFallingTicks() {
    return 1;
}