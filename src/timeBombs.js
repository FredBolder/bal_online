import { findElementByCoordinate } from "./balUtils.js";

export function checkTimeBombs(gameData, backData, gameInfo) {
    let idx = -1;
    let el = 0;
    let xmin = 0;
    let ymin = 0;
    let xmax = 0;
    let ymax = 0;
    let result = { updated: false, explosion: false, gameOver: false };

    for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        const timeBomb = gameInfo.timeBombs[i];
        if (timeBomb.status === 10) {
            // Explode
            xmin = timeBomb.x - 1;
            if (xmin < 0) {
                xmin = 0;
            }
            ymin = timeBomb.y - 1;
            if (ymin < 0) {
                ymin = 0;
            }
            xmax = timeBomb.x + 1;
            if (xmax > gameData[0].length - 1) {
                xmax = gameData[0].length - 1;
            }
            ymax = timeBomb.y + 1;
            if (ymax > gameData.length - 2) {
                ymax = gameData.length - 2;
            }
            for (let x = xmin; x <= xmax; x++) {
                for (let y = ymin; y <= ymax; y++) {
                    if ((x !== timeBomb.x) || (y !== timeBomb.y)) {
                        el = gameData[y][x];
                        switch (el) {
                            case 2:
                            case 3:
                                result.gameOver = true;
                                break;
                            case 6:
                            case 106:
                                idx = findElementByCoordinate(x, y, gameInfo.elevators);
                                if (idx >= 0) {
                                    gameInfo.elevators.splice(idx, 1);
                                }
                                break;
                            case 7:
                            case 107:
                                idx = findElementByCoordinate(x, y, gameInfo.horizontalElevators);
                                if (idx >= 0) {
                                    gameInfo.horizontalElevators.splice(idx, 1);
                                }
                                break;
                            case 8:
                            case 93:
                            case 94:
                                idx = findElementByCoordinate(x, y, gameInfo.redBalls);
                                if (idx >= 0) {
                                    gameInfo.redBalls.splice(idx, 1);
                                }
                                break;
                            case 9:
                                idx = findElementByCoordinate(x, y, gameInfo.yellowBalls);
                                if (idx >= 0) {
                                    gameInfo.yellowBalls.splice(idx, 1);
                                }
                                break;
                            case 12:
                                idx = findElementByCoordinate(x, y, gameInfo.damagedStones);
                                if (idx >= 0) {
                                    gameInfo.damagedStones.splice(idx, 1);
                                }
                                break;
                            case 13:
                                idx = findElementByCoordinate(x, y, gameInfo.trapDoors);
                                if (idx >= 0) {
                                    gameInfo.trapDoors.splice(idx, 1);
                                }
                                break;
                            case 27:
                                idx = findElementByCoordinate(x, y, gameInfo.redFish);
                                if (idx >= 0) {
                                    gameInfo.redFish.splice(idx, 1);
                                }
                                break;
                            case 31:
                            case 92:
                                idx = findElementByCoordinate(x, y, gameInfo.teleports);
                                if (idx >= 0) {
                                    gameInfo.teleports.splice(idx, 1);
                                }
                                break;
                            case 37:
                                gameInfo.detonator.x = -1;
                                gameInfo.detonator.y = -1;
                                break;
                            case 39:
                                idx = findElementByCoordinate(x, y, gameInfo.elevatorInOuts);
                                if (idx >= 0) {
                                    gameInfo.elevatorInOuts.splice(idx, 1);
                                }
                                break;
                            case 40:
                                idx = findElementByCoordinate(x, y, gameInfo.orangeBalls);
                                if (idx >= 0) {
                                    gameInfo.orangeBalls.splice(idx, 1);
                                }
                                break;
                            case 91:
                                idx = findElementByCoordinate(x, y, gameInfo.electricity);
                                if (idx >= 0) {
                                    gameInfo.electricity.splice(idx, 1);
                                }
                                break;
                            case 97:
                                idx = findElementByCoordinate(x, y, gameInfo.copiers);
                                if (idx >= 0) {
                                    gameInfo.copiers.splice(idx, 1);
                                }
                                break;
                            case 109:
                            case 110:
                            case 111:
                            case 112:
                                idx = findElementByCoordinate(x, y, gameInfo.forces);
                                if (idx >= 0) {
                                    gameInfo.forces.splice(idx, 1);
                                }
                                break;
                            case 115:
                                idx = findElementByCoordinate(x, y, gameInfo.yellowBallPushers);
                                if (idx >= 0) {
                                    gameInfo.yellowBallPushers.splice(idx, 1);
                                }
                                break;
                            case 116:
                                idx = findElementByCoordinate(x, y, gameInfo.yellowBallPushersTriggers);
                                if (idx >= 0) {
                                    gameInfo.yellowBallPushersTriggers.splice(idx, 1);
                                }
                                break;
                            case 117:
                                idx = findElementByCoordinate(x, y, gameInfo.timeBombs);
                                if (idx >= 0) {
                                    gameInfo.timeBombs[idx].status = -1;
                                }
                                break;
                            case 131:
                                idx = findElementByCoordinate(x, y, gameInfo.yellowStoppers);
                                if (idx >= 0) {
                                    gameInfo.yellowStoppers.splice(idx, 1);
                                }
                                break;
                            case 132:
                                gameInfo.travelGate.x = -1;
                                gameInfo.travelGate.y = -1;
                                break;
                            case 136:
                                idx = findElementByCoordinate(x, y, gameInfo.yellowPausers);
                                if (idx >= 0) {
                                    gameInfo.yellowPausers.splice(idx, 1);
                                }
                                break;
                            case 158:
                                idx = findElementByCoordinate(x, y, gameInfo.pistonsTriggers);
                                if (idx >= 0) {
                                    gameInfo.pistonsTriggers.splice(idx, 1);
                                }
                                break;
                            case 159:
                            case 161:
                            case 163:
                            case 165:
                                idx = findElementByCoordinate(x, y, gameInfo.pistons);
                                if (idx >= 0) {
                                    gameInfo.pistons.splice(idx, 1);
                                }
                                switch (el) {
                                    case 159:
                                        if (y > 0) {
                                            if (gameData[y - 1][x] === 160) {
                                                gameData[y - 1][x] = 0;
                                            }
                                        }
                                        break;
                                    case 161:
                                        if (y < (gameData.length - 1)) {
                                            if (gameData[y + 1][x] === 162) {
                                                gameData[y + 1][x] = 0;
                                            }
                                        }
                                        break;
                                    case 163:
                                        if (x > 0) {
                                            if (gameData[y][x - 1] === 164) {
                                                gameData[y][x - 1] = 0;
                                            }
                                        }
                                        break;
                                    case 165:
                                        if (x < (gameData[0].length - 1)) {
                                            if (gameData[y][x + 1] === 166) {
                                                gameData[y][x + 1] = 0;
                                            }
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            default:
                                break;
                        }
                        gameData[y][x] = 0;
                        el = backData[y][x];
                        switch (el) {
                            case 25:
                            case 90:
                                backData[y][x] = 0;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            gameData[timeBomb.y][timeBomb.x] = 38;
            if ([25, 90].includes(backData[timeBomb.y][timeBomb.x])) {
                backData[timeBomb.y][timeBomb.x] = 0;
            }
            result.explosion = true;
            result.updated = true;
        }
        if (timeBomb.status === 0) {
            timeBomb.status = -1;
            gameData[timeBomb.y][timeBomb.x] = 0;
            result.updated = true;
        }
        if (timeBomb.status > 0) {
            timeBomb.status--;
        }
    }
    return result;
}

