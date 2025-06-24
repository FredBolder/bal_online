import { hasWeight, updateObject } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";

export function movePurpleBar(backData, gameData, gameInfo, direction) {
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;
    let error = false;
    let weight = false;
    let maxCol = 0;
    let stop = false;
    let xmin = -1;
    let ymin = -1;
    let xmax = -1;
    let ymax = -1;
    let update = false;
    let vertical = false;

    if (gameData.length > 2) {
        error = false;
        maxCol = gameData[0].length - 1;
        switch (direction) {
            case "down":
                if (y < gameData.length - 2) {
                    if ([100, 101, 102, 103].includes(gameData[y + 1][x])) {
                        xmin = x;
                        xmax = x;
                        ymin = y + 1;
                        ymax = y + 1;
                        vertical = (gameData[y + 1][x] === 103);
                        if (vertical) {
                            stop = false;
                            for (let i = y + 2; (i < gameData.length) && !stop; i++) {
                                const el = gameData[i][x];
                                if ((el === 104) || (el === 102)) {
                                    ymax++;
                                } else {
                                    stop = true;
                                    error = true;
                                }
                                if (el !== 102) {
                                    stop = true;
                                }
                            }
                        } else {
                            if ((x > 0) && (gameData[y + 1][x] !== 100)) {
                                stop = false;
                                for (let i = x - 1; (i >= 0) && !stop; i--) {
                                    const el = gameData[y + 1][i];
                                    if ((el === 100) || (el === 102)) {
                                        xmin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                            if ((x < maxCol) && (gameData[y + 1][x] !== 101)) {
                                stop = false;
                                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                    const el = gameData[y + 1][i];
                                    if ((el === 101) || (el === 102)) {
                                        xmax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case "left":
                if (x > 1) {
                    if ([101, 102, 103, 104].includes(gameData[y][x - 1])) {
                        xmin = x - 1;
                        xmax = x - 1;
                        ymin = y;
                        ymax = y;
                        vertical = !(gameData[y][x - 1] === 101);
                        if (vertical) {
                            if ((y > 0) && (gameData[y][x - 1] !== 103)) {
                                stop = false;
                                for (let i = y - 1; (i >= 0) && !stop; i--) {
                                    const el = gameData[i][x - 1];
                                    if ((el === 103) || (el === 102)) {
                                        ymin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                            if ((y < gameData.length - 1) && (gameData[y][x - 1] !== 104)) {
                                stop = false;
                                for (let i = y + 1; (i < gameData.length - 1) && !stop; i++) {
                                    const el = gameData[i][x - 1];
                                    if ((el === 104) || (el === 102)) {
                                        ymax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                        } else {
                            stop = false;
                            for (let i = x - 2; (i >= 0) && !stop; i--) {
                                const el = gameData[y][i];
                                if ((el === 100) || (el === 102)) {
                                    xmin--;
                                } else {
                                    stop = true;
                                    error = true;
                                }
                                if (el !== 102) {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
                break;
            case "right":
                if (x < maxCol - 1) {
                    if ([100, 102, 103, 104].includes(gameData[y][x + 1])) {
                        xmin = x + 1;
                        xmax = x + 1;
                        ymin = y;
                        ymax = y;
                        vertical = !(gameData[y][x + 1] === 100);
                        if (vertical) {
                            if ((y > 0) && (gameData[y][x + 1] !== 103)) {
                                stop = false;
                                for (let i = y - 1; (i >= 0) && !stop; i--) {
                                    const el = gameData[i][x + 1];
                                    if ((el === 103) || (el === 102)) {
                                        ymin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                            if ((y < gameData.length - 1) && (gameData[y][x + 1] !== 104)) {
                                stop = false;
                                for (let i = y + 1; (i < gameData.length - 1) && !stop; i++) {
                                    const el = gameData[i][x + 1];
                                    if ((el === 104) || (el === 102)) {
                                        ymax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                        } else {
                            stop = false;
                            for (let i = x + 2; (i < maxCol) && !stop; i++) {
                                const el = gameData[y][i];
                                if ((el === 101) || (el === 102)) {
                                    xmax++;
                                } else {
                                    stop = true;
                                    error = true;
                                }
                                if (el !== 102) {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
                break;
            case "up":
                if (y > 1) {
                    if ([100, 101, 102, 104].includes(gameData[y - 1][x])) {
                        xmin = x;
                        xmax = x;
                        ymin = y - 1;
                        ymax = y - 1;
                        vertical = (gameData[y - 1][x] === 104);
                        if (vertical) {
                            stop = false;
                            for (let i = y - 2; (i >= 0) && !stop; i--) {
                                const el = gameData[i][x];
                                if ((el === 103) || (el === 102)) {
                                    ymin--;
                                } else {
                                    stop = true;
                                    error = true;
                                }
                                if (el !== 102) {
                                    stop = true;
                                }
                            }
                        } else {
                            if ((x > 0) && (gameData[y - 1][x] !== 100)) {
                                stop = false;
                                for (let i = x - 1; (i >= 0) && !stop; i--) {
                                    const el = gameData[y - 1][i];
                                    if ((el === 100) || (el === 102)) {
                                        xmin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                            if ((x < maxCol) && (gameData[y - 1][x] !== 101)) {
                                stop = false;
                                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                    const el = gameData[y - 1][i];
                                    if ((el === 101) || (el === 102)) {
                                        xmax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 102) {
                                        stop = true;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }

        update = false;
        if (!error && (xmin >= 0) && (ymin >= 0) && (xmax >= 0) && (ymax >= 0)) {
            weight = hasWeight(backData, gameData, gameInfo, xmin, xmax, ymin, false);
            switch (direction) {
                case "down":
                    if (vertical) {
                        update = false;
                        if (ymax < gameData.length - 1) {
                            if ((gameData[ymax + 1][xmin] === 0) && !hasForceUp(gameData, gameInfo, xmin, ymax + 1)) {
                                update = true;
                                for (let i = ymax; i >= ymin; i--) {
                                    gameData[i + 1][xmin] = gameData[i][xmin];
                                }
                                gameData[ymin][xmin] = 0;
                            }
                        }
                    } else {
                        update = true;
                        for (let i = xmin; i <= xmax; i++) {
                            const el = gameData[y + 2][i];
                            if ((el !== 0) || hasForceUp(gameData, gameInfo, i, y + 2)) {
                                update = false;
                            }
                        }
                        if (update) {
                            for (let i = xmin; i <= xmax; i++) {
                                gameData[y + 2][i] = gameData[y + 1][i];
                                gameData[y + 1][i] = 0;
                            }
                        }
                    }
                    if (update) {
                        for (let i = xmin; i <= xmax; i++) {
                            stop = false;
                            for (let j = ymin; (j > 0) && !stop; j--) {
                                const el = gameData[j - 1][i];
                                if ([2, 4, 8, 40, 93, 94].includes(el)) {
                                    gameData[j][i] = gameData[j - 1][i];
                                    gameData[j - 1][i] = 0;
                                    switch (el) {
                                        case 2:
                                            gameInfo.blueBall.x = i;
                                            gameInfo.blueBall.y = j;
                                            break;
                                        case 8:
                                        case 93:
                                        case 94:
                                            updateObject(gameInfo.redBalls, i, j - 1, i, j);
                                            break;
                                        case 40:
                                            updateObject(gameInfo.orangeBalls, i, j - 1, i, j);
                                            break;
                                        default:
                                            break;
                                    }
                                } else {
                                    stop = true;
                                }
                            }
                        }
                    }
                    break;
                case "left":
                    if (!weight) {
                        if (vertical) {
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = gameData[i][x - 2];
                                if ((el !== 0) || hasForceRight(gameData, gameInfo, x - 2, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    gameData[i][x - 2] = gameData[i][x - 1];
                                    gameData[i][x - 1] = 0;
                                }
                            }
                        } else {
                            update = false;
                            if (xmin > 0) {
                                if ((gameData[ymin][xmin - 1] === 0) && !hasForceRight(gameData, gameInfo, xmin - 1, ymin)) {
                                    update = true;
                                    for (let i = xmin - 1; i < xmax; i++) {
                                        gameData[ymin][i] = gameData[ymin][i + 1];
                                    }
                                    gameData[ymin][xmax] = 0;
                                }
                            }
                        }
                    }
                    break;
                case "right":
                    if (!weight) {
                        if (vertical) {
                            // Do not move when there is an object with weight on top
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = gameData[i][x + 2];
                                if ((el !== 0) || hasForceLeft(gameData, gameInfo, x + 2, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    gameData[i][x + 2] = gameData[i][x + 1];
                                    gameData[i][x + 1] = 0;
                                }
                            }
                        } else {
                            update = false;
                            if (xmin > 0) {
                                if ((gameData[ymin][xmax + 1] === 0) && !hasForceLeft(gameData, gameInfo, xmax + 1, ymin)) {
                                    update = true;
                                    for (let i = xmax; i >= xmin; i--) {
                                        gameData[ymin][i + 1] = gameData[ymin][i];
                                    }
                                    gameData[ymin][xmin] = 0;
                                }
                            }
                        }
                    }
                    break;
                case "up":
                    if (!weight) {
                        if (vertical) {
                            update = false;
                            if (ymin > 0) {
                                if ((gameData[ymin - 1][xmin] === 0) && !hasForceDown(gameData, gameInfo, xmin, ymin - 1)) {
                                    update = true;
                                    for (let i = ymin - 1; i < ymax; i++) {
                                        gameData[i][xmin] = gameData[i + 1][xmin];
                                    }
                                    gameData[ymax][xmin] = 0;
                                }
                            }
                        } else {
                            update = true;
                            for (let i = xmin; i <= xmax; i++) {
                                const el = gameData[y - 2][i];
                                if ((el !== 0) || hasForceDown(gameData, gameInfo, i, y - 2)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = xmin; i <= xmax; i++) {
                                    gameData[y - 2][i] = gameData[y - 1][i];
                                    gameData[y - 1][i] = 0;
                                }
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return update;
}

