import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";

export function checkCopiers(gameData, gameInfo) {
    let copied = false;
    let element = 0;
    let elementBottom = -1;
    let elementLeft = -1;
    let elementRight = -1;
    let elementTop = -1;
    let idx = -1;
    let info = { updated: false };
    let orangeBall1 = null;
    let orangeBall2 = null;
    let pinkBall1 = null;
    let pinkBall2 = null;
    let redBall1 = null;
    let redBall2 = null;
    let yellowBall1 = null;
    let yellowBall2 = null;
    let x = 0;

    for (let i = 0; i < gameInfo.copiers.length; i++) {
        const copier = gameInfo.copiers[i];
        switch (copier.color) {
            case "white":
                redBall1 = null;
                redBall2 = null;
                if ((copier.x > 2) && (copier.x < (gameData[0].length - 2))) {
                    element = gameData[copier.y - 1][copier.x];
                    if (([4, 40, 93, 94, 203].includes(element)) && (gameData[copier.y][copier.x - 1] === 0) && (gameData[copier.y][copier.x + 1] === 0)) {
                        info.updated = true;
                        gameData[copier.y - 1][copier.x] = 0;
                        if (gameData[copier.y][copier.x - 2] === 0) {
                            x = copier.x - 2;
                        } else {
                            x = copier.x - 1;
                        }
                        gameData[copier.y][x] = element;
                        switch (element) {
                            case 40:
                                idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.orangeBalls);
                                if (idx >= 0) {
                                    orangeBall1 = gameInfo.orangeBalls[idx];
                                    orangeBall1.x = x;
                                    orangeBall1.y = copier.y;
                                    orangeBall1.direction = "none";
                                }
                                break;
                            case 93:
                            case 94:
                                idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.redBalls);
                                if (idx >= 0) {
                                    redBall1 = gameInfo.redBalls[idx];
                                    redBall1.x = x;
                                    redBall1.y = copier.y;
                                    redBall1.direction = "none";
                                    redBall1.skipElevatorCount = 0;
                                    redBall1.skipFollowCount = 0;
                                }
                                break;
                            case 203:
                                idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.pinkBalls);
                                if (idx >= 0) {
                                    pinkBall1 = gameInfo.pinkBalls[idx];
                                    pinkBall1.x = x;
                                    pinkBall1.y = copier.y;
                                    pinkBall1.counter = 0;
                                }
                                break;
                            default:
                                break;
                        }
                        if (gameData[copier.y][copier.x + 2] === 0) {
                            x = copier.x + 2;
                        } else {
                            x = copier.x + 1;
                        }
                        gameData[copier.y][x] = element;
                        switch (element) {
                            case 40:
                                orangeBall2 = { x: x, y: copier.y, direction: "none" };
                                gameInfo.orangeBalls.push(orangeBall2);
                                break;
                            case 93:
                            case 94:
                                redBall2 = { x: x, y: copier.y, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 };
                                if (element === 94) {
                                    redBall2.smart = 2;
                                } else {
                                    redBall2.smart = 1;
                                }
                                gameInfo.redBalls.push(redBall2);
                                break;
                            case 203:
                                pinkBall2 = { x: x, y: copier.y, delete: false, counter: 0 };
                                gameInfo.pinkBalls.push(pinkBall2);
                                break;
                            default:
                                break;
                        }
                    }
                }
                break;
            case "yellow":
                copied = false;
                elementTop = getGameDataValue(gameData, copier.x, copier.y - 1);
                elementBottom = getGameDataValue(gameData, copier.x, copier.y + 1);
                elementLeft = getGameDataValue(gameData, copier.x - 1, copier.y);
                elementRight = getGameDataValue(gameData, copier.x + 1, copier.y);
                if (!copied && (elementTop === 9) && (elementLeft === 0) && (elementRight === 0)) {
                    idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.yellowBalls);
                    if (idx >= 0) {
                        yellowBall1 = gameInfo.yellowBalls[idx];
                        if (yellowBall1.direction === "none") {
                            yellowBall1.x = copier.x - 1;
                            yellowBall1.y = copier.y;
                            yellowBall1.direction = "left";
                            yellowBall2 = { x: copier.x + 1, y: copier.y, direction: "right" };
                            gameInfo.yellowBalls.push(yellowBall2);
                            gameData[copier.y - 1][copier.x] = 0;
                            gameData[copier.y][copier.x - 1] = 9;
                            gameData[copier.y][copier.x + 1] = 9;
                            copied = true;
                        }
                    }
                }
                if (!copied && (elementBottom === 9) && (elementLeft === 0) && (elementRight === 0)) {
                    idx = findElementByCoordinates(copier.x, copier.y + 1, gameInfo.yellowBalls);
                    if (idx >= 0) {
                        yellowBall1 = gameInfo.yellowBalls[idx];
                        if (yellowBall1.direction === "none") {
                            yellowBall1.x = copier.x - 1;
                            yellowBall1.y = copier.y;
                            yellowBall1.direction = "left";
                            yellowBall2 = { x: copier.x + 1, y: copier.y, direction: "right" };
                            gameInfo.yellowBalls.push(yellowBall2);
                            gameData[copier.y + 1][copier.x] = 0;
                            gameData[copier.y][copier.x - 1] = 9;
                            gameData[copier.y][copier.x + 1] = 9;
                            copied = true;
                        }
                    }
                }
                if (!copied && (elementLeft === 9) && (elementTop === 0) && (elementBottom === 0)) {
                    idx = findElementByCoordinates(copier.x - 1, copier.y, gameInfo.yellowBalls);
                    if (idx >= 0) {
                        yellowBall1 = gameInfo.yellowBalls[idx];
                        if (yellowBall1.direction === "none") {
                            yellowBall1.x = copier.x;
                            yellowBall1.y = copier.y - 1;
                            yellowBall1.direction = "up";
                            yellowBall2 = { x: copier.x, y: copier.y + 1, direction: "down" };
                            gameInfo.yellowBalls.push(yellowBall2);
                            gameData[copier.y][copier.x - 1] = 0;
                            gameData[copier.y - 1][copier.x] = 9;
                            gameData[copier.y + 1][copier.x] = 9;
                            copied = true;
                        }
                    }
                }
                if (!copied && (elementRight === 9) && (elementTop === 0) && (elementBottom === 0)) {
                    idx = findElementByCoordinates(copier.x + 1, copier.y, gameInfo.yellowBalls);
                    if (idx >= 0) {
                        yellowBall1 = gameInfo.yellowBalls[idx];
                        if (yellowBall1.direction === "none") {
                            yellowBall1.x = copier.x;
                            yellowBall1.y = copier.y - 1;
                            yellowBall1.direction = "up";
                            yellowBall2 = { x: copier.x, y: copier.y + 1, direction: "down" };
                            gameInfo.yellowBalls.push(yellowBall2);
                            gameData[copier.y][copier.x + 1] = 0;
                            gameData[copier.y - 1][copier.x] = 9;
                            gameData[copier.y + 1][copier.x] = 9;
                            copied = true;
                        }
                    }
                }
                if (copied) {
                    info.updated = true;
                }
                break;
            default:
                break;
        }
    }
    return info;
}

