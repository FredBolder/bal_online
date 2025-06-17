import { findElementByCoordinate, updateObject } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force.js";

export function moveYellowBar(arr, gameInfo, dir, index = - 1) {
    let x = gameInfo.blueBall.x;
    let y = gameInfo.blueBall.y;
    let direction = "none";
    let element = 0;
    let error = false;
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


    if (arr.length > 2) {
        error = false;
        maxCol = arr[0].length - 1;
        idx = index;
        if (idx >= 0) {
            yellow = gameInfo.yellowBars[idx];
            direction = yellow.direction;
            if (direction !== "none") {
                xmin = yellow.x;
                xmax = yellow.x;
                ymin = yellow.y;
                ymax = yellow.y;
                element = arr[yellow.y][yellow.x];
                vertical = ((element === 124) || (element === 125));
                switch (element) {
                    case 121:
                        // left part
                        stop = false;
                        for (let i = yellow.x + 1; (i <= maxCol) && !stop; i++) {
                            const el = arr[yellow.y][i];
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
                            const el = arr[yellow.y][i];
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
                        for (let i = yellow.y + 1; (i < arr.length) && !stop; i++) {
                            const el = arr[i][yellow.x];
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
                            const el = arr[i][yellow.x];
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
                    if (y < arr.length - 2) {
                        if ([121, 122, 123, 124].includes(arr[y + 1][x])) {
                            xmin = x;
                            xmax = x;
                            ymin = y + 1;
                            ymax = y + 1;
                            vertical = (arr[y + 1][x] === 124);
                            if (vertical) {
                                stop = false;
                                for (let i = y + 2; (i < arr.length) && !stop; i++) {
                                    const el = arr[i][x];
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
                                if ((x > 0) && (arr[y + 1][x] !== 121)) {
                                    stop = false;
                                    for (let i = x - 1; (i >= 0) && !stop; i--) {
                                        const el = arr[y + 1][i];
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
                                if ((x < maxCol) && (arr[y + 1][x] !== 122)) {
                                    stop = false;
                                    for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                        const el = arr[y + 1][i];
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
                        if ([122, 123, 124, 125].includes(arr[y][x - 1])) {
                            xmin = x - 1;
                            xmax = x - 1;
                            ymin = y;
                            ymax = y;
                            vertical = !(arr[y][x - 1] === 122);
                            if (vertical) {
                                if ((y > 0) && (arr[y][x - 1] !== 124)) {
                                    stop = false;
                                    for (let i = y - 1; (i >= 0) && !stop; i--) {
                                        const el = arr[i][x - 1];
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
                                if ((y < arr.length - 1) && (arr[y][x - 1] !== 125)) {
                                    stop = false;
                                    for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                                        const el = arr[i][x - 1];
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
                                    const el = arr[y][i];
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
                        if ([121, 123, 124, 125].includes(arr[y][x + 1])) {
                            xmin = x + 1;
                            xmax = x + 1;
                            ymin = y;
                            ymax = y;
                            vertical = !(arr[y][x + 1] === 121);
                            if (vertical) {
                                if ((y > 0) && (arr[y][x + 1] !== 124)) {
                                    stop = false;
                                    for (let i = y - 1; (i >= 0) && !stop; i--) {
                                        const el = arr[i][x + 1];
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
                                if ((y < arr.length - 1) && (arr[y][x + 1] !== 125)) {
                                    stop = false;
                                    for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                                        const el = arr[i][x + 1];
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
                                    const el = arr[y][i];
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
                        if ([121, 122, 123, 125].includes(arr[y - 1][x])) {
                            xmin = x;
                            xmax = x;
                            ymin = y - 1;
                            ymax = y - 1;
                            vertical = (arr[y - 1][x] === 125);
                            if (vertical) {
                                stop = false;
                                for (let i = y - 2; (i >= 0) && !stop; i--) {
                                    const el = arr[i][x];
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
                                if ((x > 0) && (arr[y - 1][x] !== 121)) {
                                    stop = false;
                                    for (let i = x - 1; (i >= 0) && !stop; i--) {
                                        const el = arr[y - 1][i];
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
                                if ((x < maxCol) && (arr[y - 1][x] !== 122)) {
                                    stop = false;
                                    for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                        const el = arr[y - 1][i];
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
        if (!error && (xmin >= 0) && (ymin >= 0) && (xmax >= 0) && (ymax >= 0)) {
            switch (direction) {
                case "down":
                    if (vertical) {
                        update = false;
                        if (ymax < arr.length - 1) {
                            if ((arr[ymax + 1][xmin] === 0) && !hasForceUp(arr, gameInfo, xmin, ymax + 1)) {
                                update = true;
                                for (let i = ymax; i >= ymin; i--) {
                                    arr[i + 1][xmin] = arr[i][xmin];
                                }
                                arr[ymin][xmin] = 0;
                            }
                        }
                    } else {
                        update = true;
                        for (let i = xmin; i <= xmax; i++) {
                            const el = arr[ymax + 1][i];
                            if ((el !== 0) || hasForceUp(arr, gameInfo, i, ymax + 1)) {
                                update = false;
                            }
                        }
                        if (update) {
                            for (let i = xmin; i <= xmax; i++) {
                                arr[ymax + 1][i] = arr[ymax][i];
                                arr[ymax][i] = 0;
                            }
                        }
                    }
                    if (update) {
                        for (let i = xmin; i <= xmax; i++) {
                            stop = false;
                            for (let j = ymin; (j > 0) && !stop; j--) {
                                const el = arr[j - 1][i];
                                if ([2, 4, 8, 40, 93, 94].includes(el)) {
                                    arr[j][i] = arr[j - 1][i];
                                    arr[j - 1][i] = 0;
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
                    if (vertical) {
                        // Do not move when there is an object with weight on top
                        if ([4, 8, 40, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = arr[i][xmin - 1];
                                if ((el !== 0) || hasForceRight(arr, gameInfo, xmin - 1, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    arr[i][xmin - 1] = arr[i][xmin];
                                    arr[i][xmin] = 0;
                                }
                            }
                        }
                    } else {
                        update = false;
                        if (xmin > 0) {
                            if ((arr[ymin][xmin - 1] === 0) && !hasForceRight(arr, gameInfo, xmin - 1, ymin)) {
                                update = true;

                                // Do not move when there is an object with weight on top
                                for (let i = xmin; i <= xmax; i++) {
                                    if ([4, 8, 40, 93, 94].includes(arr[ymin - 1][i])) {
                                        update = false;
                                    }
                                }

                                if (update) {
                                    for (let i = xmin - 1; i < xmax; i++) {
                                        arr[ymin][i] = arr[ymin][i + 1];
                                    }
                                    arr[ymin][xmax] = 0;
                                }
                            }
                        }
                    }
                    break;
                case "right":
                    if (vertical) {
                        // Do not move when there is an object with weight on top
                        if ([4, 8, 40, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = arr[i][xmax + 1];
                                if ((el !== 0) || hasForceLeft(arr, gameInfo, xmax + 1, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    arr[i][xmax + 1] = arr[i][xmax];
                                    arr[i][xmax] = 0;
                                }
                            }
                        }
                    } else {
                        update = false;
                        if (xmin > 0) {
                            if ((arr[ymin][xmax + 1] === 0) && !hasForceLeft(arr, gameInfo, xmax + 1, ymin)) {
                                update = true;

                                // Do not move when there is an object with weight on top
                                for (let i = xmin; i <= xmax; i++) {
                                    if ([4, 8, 40, 93, 94].includes(arr[ymin - 1][i])) {
                                        update = false;
                                    }
                                }

                                if (update) {
                                    for (let i = xmax; i >= xmin; i--) {
                                        arr[ymin][i + 1] = arr[ymin][i];
                                    }
                                    arr[ymin][xmin] = 0;
                                }
                            }
                        }
                    }
                    break;
                case "up":
                    if (ymin > 0) {
                        if (vertical) {
                            update = false;
                            if ((arr[ymin - 1][xmin] === 0) && !hasForceDown(arr, gameInfo, xmin, ymin - 1)) {
                                update = true;
                                for (let i = ymin - 1; i < ymax; i++) {
                                    arr[i][xmin] = arr[i + 1][xmin];
                                }
                                arr[ymax][xmin] = 0;
                            }
                        } else {
                            update = true;
                            for (let i = xmin; i <= xmax; i++) {
                                const el = arr[ymin - 1][i];
                                if ((el !== 0) || hasForceDown(arr, gameInfo, i, ymin - 1)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = xmin; i <= xmax; i++) {
                                    arr[ymin - 1][i] = arr[ymin][i];
                                    arr[ymin][i] = 0;
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
            gameInfo.yellowBars[idx].direction = "none";
        }
    }
    return update;
}

export function moveYellowBars(arr, gameInfo) {
    let update = false;

    for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        if (moveYellowBar(arr, gameInfo, "none", i)) {
            update = true;
        }
    }
    return update;
}

