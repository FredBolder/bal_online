import { findElementByCoordinate } from "./balUtils.js";

export function checkTimeBombs(gameData, backData, gameInfo) {
    let idx1 = -1;
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
                                idx1 = findElementByCoordinate(x, y, gameInfo.elevators);
                                if (idx1 >= 0) {
                                    gameInfo.elevators.splice(idx1, 1);
                                }
                                break;
                            case 7:
                            case 107:
                                idx1 = findElementByCoordinate(x, y, gameInfo.horizontalElevators);
                                if (idx1 >= 0) {
                                    gameInfo.horizontalElevators.splice(idx1, 1);
                                }
                                break;
                            case 8:
                            case 93:
                            case 94:
                                idx1 = findElementByCoordinate(x, y, gameInfo.redBalls);
                                if (idx1 >= 0) {
                                    gameInfo.redBalls.splice(idx1, 1);
                                }
                                break;
                            case 9:
                                idx1 = findElementByCoordinate(x, y, gameInfo.yellowBalls);
                                if (idx1 >= 0) {
                                    gameInfo.yellowBalls.splice(idx1, 1);
                                }
                                break;
                            case 12:
                                idx1 = findElementByCoordinate(x, y, gameInfo.damagedStones);
                                if (idx1 >= 0) {
                                    gameInfo.damagedStones.splice(idx1, 1);
                                }
                                break;
                            case 13:
                                idx1 = findElementByCoordinate(x, y, gameInfo.trapDoors);
                                if (idx1 >= 0) {
                                    gameInfo.trapDoors.splice(idx1, 1);
                                }
                                break;
                            case 27:
                                idx1 = findElementByCoordinate(x, y, gameInfo.redFish);
                                if (idx1 >= 0) {
                                    gameInfo.redFish.splice(idx1, 1);
                                }
                                break;
                            case 31:
                            case 92:
                                idx1 = findElementByCoordinate(x, y, gameInfo.teleports);
                                if (idx1 >= 0) {
                                    gameInfo.teleports.splice(idx1, 1);
                                }
                                break;
                            case 37:
                                gameInfo.detonator.x = -1;
                                gameInfo.detonator.y = -1;
                                break;
                            case 39:
                                idx1 = findElementByCoordinate(x, y, gameInfo.elevatorInOuts);
                                if (idx1 >= 0) {
                                    gameInfo.elevatorInOuts.splice(idx1, 1);
                                }
                                break;
                            case 40:
                                idx1 = findElementByCoordinate(x, y, gameInfo.orangeBalls);
                                if (idx1 >= 0) {
                                    gameInfo.orangeBalls.splice(idx1, 1);
                                }
                                break;
                            case 91:
                                idx1 = findElementByCoordinate(x, y, gameInfo.electricity);
                                if (idx1 >= 0) {
                                    gameInfo.electricity.splice(idx1, 1);
                                }
                                break;
                            case 97:
                                idx1 = findElementByCoordinate(x, y, gameInfo.copiers);
                                if (idx1 >= 0) {
                                    gameInfo.copiers.splice(idx1, 1);
                                }
                                break;
                            case 109:
                            case 110:
                            case 111:
                            case 112:
                                idx1 = findElementByCoordinate(x, y, gameInfo.forces);
                                if (idx1 >= 0) {
                                    gameInfo.forces.splice(idx1, 1);
                                }
                                break;
                            case 115:
                                idx1 = findElementByCoordinate(x, y, gameInfo.yellowBallPushers);
                                if (idx1 >= 0) {
                                    gameInfo.yellowBallPushers.splice(idx1, 1);
                                }
                                break;
                            case 116:
                                idx1 = findElementByCoordinate(x, y, gameInfo.yellowBallPushersTriggers);
                                if (idx1 >= 0) {
                                    gameInfo.yellowBallPushersTriggers.splice(idx1, 1);
                                }
                                break;
                            case 117:
                                idx1 = findElementByCoordinate(x, y, gameInfo.timeBombs);
                                if (idx1 >= 0) {
                                    gameInfo.timeBombs[idx1].status = -1;
                                }
                                break;
                            case 131:
                                idx1 = findElementByCoordinate(x, y, gameInfo.yellowStoppers);
                                if (idx1 >= 0) {
                                    gameInfo.yellowStoppers.splice(idx1, 1);
                                }
                                break;
                            case 132:
                                gameInfo.travelGate.x = -1;
                                gameInfo.travelGate.y = -1;
                                break;
                            case 136:
                                idx1 = findElementByCoordinate(x, y, gameInfo.yellowPausers);
                                if (idx1 >= 0) {
                                    gameInfo.yellowPausers.splice(idx1, 1);
                                }
                                break;
                            case 158:
                                idx1 = findElementByCoordinate(x, y, gameInfo.pistonsTriggers);
                                if (idx1 >= 0) {
                                    gameInfo.pistonsTriggers.splice(idx1, 1);
                                }
                                break;
                            case 159:
                            case 161:
                            case 163:
                            case 165:
                                idx1 = findElementByCoordinate(x, y, gameInfo.pistons);
                                if (idx1 >= 0) {
                                    gameInfo.pistons.splice(idx1, 1);
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

