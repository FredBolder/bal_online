import { findElementByCoordinate, moveObject } from "./balUtils.js";

export function checkMovers(gameData, gameInfo) {
    let update = false;

    for (let i = 0; i < gameInfo.movers.length; i++) {
        const mover = gameInfo.movers[i];
        if (mover.y > 0) {
            const el = gameData[mover.y - 1][mover.x];
            if ([2, 4, 5, 8, 9, 28, 40, 82, 98, 84, 85, 86, 93, 94, 138, 139, 171, 172, 173].includes(el)) {
                switch (mover.direction) {
                    case "left":
                        if (mover.x > 0) {
                            if (gameData[mover.y - 1][mover.x - 1] === 0) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x - 1, mover.y - 1);
                                update = true;
                            }
                        }
                        break;
                    case "right":
                        if (mover.x < (gameData[0].length - 1)) {
                            if (gameData[mover.y - 1][mover.x + 1] === 0) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x + 1, mover.y - 1);
                                update = true;
                            }
                        }
                        break;
                    case "up":
                        if (mover.y > 1) {
                            if ((gameData[mover.y - 2][mover.x] === 0) && ![2, 8, 93, 94].includes(gameData[mover.y - 1][mover.x])) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x, mover.y - 2);
                                update = true;
                            }
                        }
                        break;
                    case "down":
                        if (mover.y < (gameData.length - 1)) {
                            if (gameData[mover.y + 1][mover.x] === 0) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x, mover.y + 1);
                                update = true;
                            }
                        }
                        break;
                    case "upleft":
                        if ((mover.x > 0) && (mover.y > 1)) {
                            if ((gameData[mover.y - 2][mover.x - 1] === 0) && (gameData[mover.y - 2][mover.x] === 0)) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x - 1, mover.y - 2);
                                update = true;
                            }
                        }
                        break;
                    case "upright":
                        if ((mover.x < (gameData[0].length - 1)) && (mover.y > 1)) {
                            if ((gameData[mover.y - 2][mover.x + 1] === 0) && (gameData[mover.y - 2][mover.x] === 0)) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x + 1, mover.y - 2);
                                update = true;
                            }
                        }
                        break;
                    case "downleft":
                        if (mover.x > 0) {
                            if ((gameData[mover.y][mover.x - 1] === 0) && (gameData[mover.y - 1][mover.x - 1] === 0)) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x - 1, mover.y);
                                update = true;
                            }
                        }
                        break;
                    case "downright":
                        if (mover.x < (gameData[0].length - 1)) {
                            if ((gameData[mover.y][mover.x + 1] === 0) && (gameData[mover.y - 1][mover.x + 1] === 0)) {
                                moveObject(gameData, gameInfo, mover.x, mover.y - 1, mover.x + 1, mover.y);
                                update = true;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return update;
}

export function moverCanMoveBlueBall(gameData, gameInfo) {
    let result = false;
    let idx = -1;
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;

    if (y < (gameData.length - 1)) {
        if (gameData[y + 1][x] === 178) {
            idx = findElementByCoordinate(x, y + 1, gameInfo.movers);
            if (idx >= 0) {
                const mover = gameInfo.movers[idx];
                switch (mover.direction) {
                    case "left":
                        if (mover.x > 0) {
                            if (gameData[mover.y - 1][mover.x - 1] === 0) {
                                result = true;
                            }
                        }
                        break;
                    case "right":
                        if (mover.x < (gameData[0].length - 1)) {
                            if (gameData[mover.y - 1][mover.x + 1] === 0) {
                                result = true;
                            }
                        }
                        break;
                    case "up":
                        if (mover.y > 1) {
                            if ((gameData[mover.y - 2][mover.x] === 0) && ![2, 8, 93, 94].includes(gameData[mover.y - 1][mover.x])) {
                                result = true;
                            }
                        }
                        break;
                    case "down":
                        if (mover.y < (gameData.length - 1)) {
                            if (gameData[mover.y + 1][mover.x] === 0) {
                                result = true;
                            }
                        }
                        break;
                    case "upleft":
                        if ((mover.x > 0) && (mover.y > 0)) {
                            if ((gameData[mover.y - 2][mover.x - 1] === 0) && (gameData[mover.y - 2][mover.x] === 0)) {
                                result = true;
                            }
                        }
                        break;
                    case "upright":
                        if ((mover.x < (gameData[0].length - 1)) && (mover.y > 0)) {
                            if ((gameData[mover.y - 2][mover.x + 1] === 0) && (gameData[mover.y - 2][mover.x] === 0)) {
                                result = true;
                            }
                        }
                        break;
                    case "downleft":
                        if (mover.x > 0) {
                            if ((gameData[mover.y][mover.x - 1] === 0) && (gameData[mover.y - 1][mover.x - 1] === 0)) {
                                result = true;
                            }
                        }
                        break;
                    case "downright":
                        if (mover.x < (gameData[0].length - 1)) {
                            if ((gameData[mover.y][mover.x + 1] === 0) && (gameData[mover.y - 1][mover.x + 1] === 0)) {
                                result = true;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return result;
}

export function moversDirections() {
    return ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
}

