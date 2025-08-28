import { findElementByCoordinate, hasWeightAbove, updateObject } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";

export function moveYellowBar(x, y, backData, gameData, gameInfo, gameVars, dir, index, pusher = false) {
    let changeDirection = false;
    let direction = "none";
    let element = 0;
    let error = false;
    let weight = false;
    let idx = -1;
    let maxCol = 0;
    let stop = false;
    let yellow = null;
    let xmin = -1;
    let ymin = -1;
    let xmax = -1;
    let ymax = -1;
    let update = false;
    let vertical = false;

    function findAndSetIndex(xIdx, yIdx) {
        if (idx === -1) {
            idx = findElementByCoordinate(xIdx, yIdx, gameInfo.yellowBars);
        }
    }

    if (gameData.length > 2) {
        error = false;
        maxCol = gameData[0].length - 1;
        idx = index;
        if (idx >= 0) {
            yellow = gameInfo.yellowBars[idx];
            direction = yellow.direction;
            if (direction !== "none") {
                xmin = yellow.x;
                xmax = yellow.x;
                ymin = yellow.y;
                ymax = yellow.y;
                element = gameData[yellow.y][yellow.x];
                vertical = ((element === 124) || (element === 125));
                switch (element) {
                    case 121:
                        // left part
                        stop = false;
                        for (let i = yellow.x + 1; (i <= maxCol) && !stop; i++) {
                            const el = gameData[yellow.y][i];
                            if ((el === 122) || (el === 123)) {
                                xmax++;
                            } else {
                                stop = true;
                                error = true;
                            }
                            if (el !== 123) {
                                stop = true;
                            }
                        }
                        break;
                    case 122:
                        // right part
                        stop = false;
                        for (let i = yellow.x - 1; (i >= 0) && !stop; i--) {
                            const el = gameData[yellow.y][i];
                            if ((el === 121) || (el === 123)) {
                                xmin--;
                            } else {
                                stop = true;
                                error = true;
                            }
                            if (el !== 123) {
                                stop = true;
                            }
                        }
                        break;
                    case 124:
                        // top part
                        stop = false;
                        for (let i = yellow.y + 1; (i < gameData.length) && !stop; i++) {
                            const el = gameData[i][yellow.x];
                            if ((el === 125) || (el === 123)) {
                                ymax++;
                            } else {
                                stop = true;
                                error = true;
                            }
                            if (el !== 123) {
                                stop = true;
                            }
                        }
                        break;
                    case 125:
                        // bottom part
                        stop = false;
                        for (let i = yellow.y - 1; (i >= 0) && !stop; i--) {
                            const el = gameData[i][yellow.x];
                            if ((el === 124) || (el === 123)) {
                                ymin--;
                            } else {
                                stop = true;
                                error = true;
                            }
                            if (el !== 123) {
                                stop = true;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        } else {
            direction = dir;
            switch (direction) {
                case "down":
                    if (y < gameData.length - 2) {
                        if ([121, 122, 123, 124].includes(gameData[y + 1][x])) {
                            xmin = x;
                            xmax = x;
                            ymin = y + 1;
                            ymax = y + 1;
                            vertical = (gameData[y + 1][x] === 124);
                            if (vertical) {
                                stop = false;
                                for (let i = y + 2; (i < gameData.length) && !stop; i++) {
                                    const el = gameData[i][x];
                                    if ((el === 125) || (el === 123)) {
                                        ymax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 123) {
                                        stop = true;
                                    }
                                }
                            } else {
                                if ((x > 0) && (gameData[y + 1][x] !== 121)) {
                                    stop = false;
                                    for (let i = x - 1; (i >= 0) && !stop; i--) {
                                        const el = gameData[y + 1][i];
                                        if ((el === 121) || (el === 123)) {
                                            xmin--;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                                if ((x < maxCol) && (gameData[y + 1][x] !== 122)) {
                                    stop = false;
                                    for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                        const el = gameData[y + 1][i];
                                        if ((el === 122) || (el === 123)) {
                                            xmax++;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "left":
                    error = false;
                    if (x > 1) {
                        if ([122, 123, 124, 125].includes(gameData[y][x - 1])) {
                            xmin = x - 1;
                            xmax = x - 1;
                            ymin = y;
                            ymax = y;
                            vertical = !(gameData[y][x - 1] === 122);
                            if (vertical) {
                                if ((y > 0) && (gameData[y][x - 1] !== 124)) {
                                    stop = false;
                                    for (let i = y - 1; (i >= 0) && !stop; i--) {
                                        const el = gameData[i][x - 1];
                                        if ((el === 124) || (el === 123)) {
                                            ymin--;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                                if ((y < gameData.length - 1) && (gameData[y][x - 1] !== 125)) {
                                    stop = false;
                                    for (let i = y + 1; (i < gameData.length - 1) && !stop; i++) {
                                        const el = gameData[i][x - 1];
                                        if ((el === 125) || (el === 123)) {
                                            ymax++;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                            } else {
                                stop = false;
                                for (let i = x - 2; (i >= 0) && !stop; i--) {
                                    const el = gameData[y][i];
                                    if ((el === 121) || (el === 123)) {
                                        xmin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 123) {
                                        stop = true;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "right":
                    if (x < maxCol - 1) {
                        if ([121, 123, 124, 125].includes(gameData[y][x + 1])) {
                            xmin = x + 1;
                            xmax = x + 1;
                            ymin = y;
                            ymax = y;
                            vertical = !(gameData[y][x + 1] === 121);
                            if (vertical) {
                                if ((y > 0) && (gameData[y][x + 1] !== 124)) {
                                    stop = false;
                                    for (let i = y - 1; (i >= 0) && !stop; i--) {
                                        const el = gameData[i][x + 1];
                                        if ((el === 124) || (el === 123)) {
                                            ymin--;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                                if ((y < gameData.length - 1) && (gameData[y][x + 1] !== 125)) {
                                    stop = false;
                                    for (let i = y + 1; (i < gameData.length - 1) && !stop; i++) {
                                        const el = gameData[i][x + 1];
                                        if ((el === 125) || (el === 123)) {
                                            ymax++;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                            } else {
                                stop = false;
                                for (let i = x + 2; (i < maxCol) && !stop; i++) {
                                    const el = gameData[y][i];
                                    if ((el === 122) || (el === 123)) {
                                        xmax++;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 123) {
                                        stop = true;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "up":
                    if (y > 1) {
                        if ([121, 122, 123, 125].includes(gameData[y - 1][x])) {
                            xmin = x;
                            xmax = x;
                            ymin = y - 1;
                            ymax = y - 1;
                            vertical = (gameData[y - 1][x] === 125);
                            if (vertical) {
                                stop = false;
                                for (let i = y - 2; (i >= 0) && !stop; i--) {
                                    const el = gameData[i][x];
                                    if ((el === 124) || (el === 123)) {
                                        ymin--;
                                    } else {
                                        stop = true;
                                        error = true;
                                    }
                                    if (el !== 123) {
                                        stop = true;
                                    }
                                }
                            } else {
                                if ((x > 0) && (gameData[y - 1][x] !== 121)) {
                                    stop = false;
                                    for (let i = x - 1; (i >= 0) && !stop; i--) {
                                        const el = gameData[y - 1][i];
                                        if ((el === 121) || (el === 123)) {
                                            xmin--;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
                                            stop = true;
                                        }
                                    }
                                }
                                if ((x < maxCol) && (gameData[y - 1][x] !== 122)) {
                                    stop = false;
                                    for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                        const el = gameData[y - 1][i];
                                        if ((el === 122) || (el === 123)) {
                                            xmax++;
                                        } else {
                                            stop = true;
                                            error = true;
                                        }
                                        if (el !== 123) {
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
        }

        update = false;
        findAndSetIndex(xmin, ymin);
        findAndSetIndex(xmax, ymin);
        findAndSetIndex(xmin, ymax);
        findAndSetIndex(xmax, ymax);
        if (!error && (xmin >= 0) && (ymin >= 0) && (xmax >= 0) && (ymax >= 0) && (idx >= 0)) {
            weight = hasWeightAbove(backData, gameData, gameInfo, gameVars, xmin, xmax, ymin, false);
            if (pusher && (gameInfo.yellowBars[idx].direction !== "none")) {
                return false;
            }
            switch (direction) {
                case "down":
                    if (vertical) {
                        update = false;
                        if (ymax < gameData.length - 1) {
                            if ((gameData[ymax + 1][xmin] === 86)) {
                                changeDirection = true;
                                direction = "up";
                            }
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
                            const el = gameData[ymax + 1][i];
                            if ((el !== 0) || hasForceUp(gameData, gameInfo, i, ymax + 1)) {
                                update = false;
                            }
                        }
                        if (update) {
                            for (let i = xmin; i <= xmax; i++) {
                                gameData[ymax + 1][i] = gameData[ymax][i];
                                gameData[ymax][i] = 0;
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
                                const el = gameData[i][xmin - 1];
                                if ((el !== 0) || hasForceRight(gameData, gameInfo, xmin - 1, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    gameData[i][xmin - 1] = gameData[i][xmin];
                                    gameData[i][xmin] = 0;
                                }
                            }
                        } else {
                            update = false;
                            if (xmin > 0) {
                                if ((gameData[ymin][xmin - 1] === 86)) {
                                    changeDirection = true;
                                    direction = "right";
                                }
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
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = gameData[i][xmax + 1];
                                if ((el !== 0) || hasForceLeft(gameData, gameInfo, xmax + 1, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    gameData[i][xmax + 1] = gameData[i][xmax];
                                    gameData[i][xmax] = 0;
                                }
                            }
                        } else {
                            update = false;
                            if (xmin > 0) {
                                if ((gameData[ymin][xmax + 1] === 86)) {
                                    changeDirection = true;
                                    direction = "left";
                                }
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
                        if (ymin > 0) {
                            if (vertical) {
                                update = false;
                                if ((gameData[ymin - 1][xmin] === 86)) {
                                    changeDirection = true;
                                    direction = "down";
                                }
                                if ((gameData[ymin - 1][xmin] === 0) && !hasForceDown(gameData, gameInfo, xmin, ymin - 1)) {
                                    update = true;
                                    for (let i = ymin - 1; i < ymax; i++) {
                                        gameData[i][xmin] = gameData[i + 1][xmin];
                                    }
                                    gameData[ymax][xmin] = 0;
                                }
                            } else {
                                update = true;
                                for (let i = xmin; i <= xmax; i++) {
                                    const el = gameData[ymin - 1][i];
                                    if ((el !== 0) || hasForceDown(gameData, gameInfo, i, ymin - 1)) {
                                        update = false;
                                    }
                                }
                                if (update) {
                                    for (let i = xmin; i <= xmax; i++) {
                                        gameData[ymin - 1][i] = gameData[ymin][i];
                                        gameData[ymin][i] = 0;
                                    }
                                }
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        if (idx >= 0) {
            if (update) {
                switch (direction) {
                    case "left":
                        gameInfo.yellowBars[idx].direction = "left";
                        gameInfo.yellowBars[idx].x--;
                        break;
                    case "right":
                        gameInfo.yellowBars[idx].direction = "right";
                        gameInfo.yellowBars[idx].x++;
                        break;
                    case "up":
                        gameInfo.yellowBars[idx].direction = "up";
                        gameInfo.yellowBars[idx].y--;
                        break;
                    case "down":
                        gameInfo.yellowBars[idx].direction = "down";
                        gameInfo.yellowBars[idx].y++;
                        break;
                    default:
                        break;
                }
            } else {
                if (changeDirection) {
                    gameInfo.yellowBars[idx].direction = direction;
                } else {
                    gameInfo.yellowBars[idx].direction = "none";
                }
            }
        }
    }
    return update;
}

export function moveYellowBars(backData, gameData, gameInfo, gameVars) {
    let update = false;

    for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        if (moveYellowBar(-1, -1, backData, gameData, gameInfo, gameVars, "none", i)) {
            update = true;
        }
    }
    return update;
}

