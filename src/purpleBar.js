import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp } from "./force";

export function movePurpleBar(arr, gameInfo, x, y, direction) {
    let error = false;
    let maxCol = 0;
    let stop = false;
    let xmin = -1;
    let ymin = -1;
    let xmax = -1;
    let ymax = -1;
    let update = false;
    let vertical = false;

    if (arr.length > 2) {
        error = false;
        maxCol = arr[0].length - 1;
        switch (direction) {
            case 2:
                if (y < arr.length - 2) {
                    if ([100, 101, 102, 103].includes(arr[y + 1][x])) {
                        xmin = x;
                        xmax = x;
                        ymin = y + 1;
                        ymax = y + 1;
                        vertical = (arr[y + 1][x] === 103);
                        if (vertical) {
                            stop = false;
                            for (let i = y + 2; (i < arr.length) && !stop; i++) {
                                const el = arr[i][x];
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
                            if ((x > 0) && (arr[y + 1][x] !== 100)) {
                                stop = false;
                                for (let i = x - 1; (i >= 0) && !stop; i--) {
                                    const el = arr[y + 1][i];
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
                            if ((x < maxCol) && (arr[y + 1][x] !== 101)) {
                                stop = false;
                                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                    const el = arr[y + 1][i];
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
            case 4:
                if (x > 1) {
                    if ([101, 102, 103, 104].includes(arr[y][x - 1])) {
                        xmin = x - 1;
                        xmax = x - 1;
                        ymin = y;
                        ymax = y;
                        vertical = !(arr[y][x - 1] === 101);
                        if (vertical) {
                            if ((y > 0) && (arr[y][x - 1] !== 103)) {
                                stop = false;
                                for (let i = y - 1; (i >= 0) && !stop; i--) {
                                    const el = arr[i][x - 1];
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
                            if ((y < arr.length - 1) && (arr[y][x - 1] !== 104)) {
                                stop = false;
                                for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                                    const el = arr[y][i - 1];
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
                                const el = arr[y][i];
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
            case 6:
                if (x < maxCol - 1) {
                    if ([100, 102, 103, 104].includes(arr[y][x + 1])) {
                        xmin = x + 1;
                        xmax = x + 1;
                        ymin = y;
                        ymax = y;
                        vertical = !(arr[y][x + 1] === 100);
                        if (vertical) {
                            if ((y > 0) && (arr[y][x + 1] !== 103)) {
                                stop = false;
                                for (let i = y - 1; (i >= 0) && !stop; i--) {
                                    const el = arr[i][x + 1];
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
                            if ((y < arr.length - 1) && (arr[y][x + 1] !== 104)) {
                                stop = false;
                                for (let i = y + 1; (i < arr.length - 1) && !stop; i++) {
                                    const el = arr[y][i + 1];
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
                                const el = arr[y][i];
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
            case 8:
                if (y > 1) {
                    if ([100, 101, 102, 104].includes(arr[y - 1][x])) {
                        xmin = x;
                        xmax = x;
                        ymin = y - 1;
                        ymax = y - 1;
                        vertical = (arr[y - 1][x] === 104);
                        if (vertical) {
                            stop = false;
                            for (let i = y - 2; (i >= 0) && !stop; i--) {
                                const el = arr[i][x];
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
                            if ((x > 0) && (arr[y - 1][x] !== 100)) {
                                stop = false;
                                for (let i = x - 1; (i >= 0) && !stop; i--) {
                                    const el = arr[y - 1][i];
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
                            if ((x < maxCol) && (arr[y - 1][x] !== 101)) {
                                stop = false;
                                for (let i = x + 1; (i < maxCol) && !stop; i++) {
                                    const el = arr[y - 1][i];
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
            switch (direction) {
                case 2:
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
                            const el = arr[y + 2][i];
                            if ((el !== 0) || hasForceUp(arr, gameInfo, i, y + 2)) {
                                update = false;
                            }
                        }
                        if (update) {
                            for (let i = xmin; i <= xmax; i++) {
                                arr[y + 2][i] = arr[y + 1][i];
                                arr[y + 1][i] = 0;
                            }
                        }
                    }
                    break;
                case 4:
                    if (vertical) {
                        // Do not move when there is an object with weight on top of a horizontal bar
                        if ([4, 8, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = arr[i][x - 2];
                                if ((el !== 0) || hasForceRight(arr, gameInfo, x - 2, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    arr[i][x - 2] = arr[i][x - 1];
                                    arr[i][x - 1] = 0;
                                }
                            }
                        }
                    } else {
                        update = false;
                        if (xmin > 0) {
                            if ((arr[ymin][xmin - 1] === 0) && !hasForceRight(arr, gameInfo, xmin - 1, ymin)) {
                                update = true;

                                // Do not move when there is an object with weight on top of a horizontal bar
                                for (let i = xmin; i <= xmax; i++) {
                                    if ([4, 8, 93, 94].includes(arr[ymin - 1][i])) {
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
                case 6:
                    if (vertical) {
                        // Do not move when there is an object with weight on top of a horizontal bar
                        if ([4, 8, 93, 94].includes(arr[ymin - 1][xmin]) === false) {
                            update = true;
                            for (let i = ymin; i <= ymax; i++) {
                                const el = arr[i][x + 2];
                                if ((el !== 0) || hasForceLeft(arr, gameInfo, x + 2, i)) {
                                    update = false;
                                }
                            }
                            if (update) {
                                for (let i = ymin; i <= ymax; i++) {
                                    arr[i][x + 2] = arr[i][x + 1];
                                    arr[i][x + 1] = 0;
                                }
                            }
                        }
                    } else {
                        update = false;
                        if (xmin > 0) {
                            if ((arr[ymin][xmax + 1] === 0) && !hasForceLeft(arr, gameInfo, xmax + 1, ymin)) {
                                update = true;

                                // Do not move when there is an object with weight on top of a horizontal bar
                                for (let i = xmin; i <= xmax; i++) {
                                    if ([4, 8, 93, 94].includes(arr[ymin - 1][i])) {
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
                case 8:
                    if (vertical) {
                        update = false;
                        if (ymin > 0) {
                            if ((arr[ymin - 1][xmin] === 0) && !hasForceDown(arr, gameInfo, xmin, ymin - 1)) {
                                update = true;
                                for (let i = ymin - 1; i < ymax; i++) {
                                    arr[i][xmin] = arr[i + 1][xmin];
                                }
                                arr[ymax][xmin] = 0;
                            }
                        }
                    } else {
                        update = true;
                        for (let i = xmin; i <= xmax; i++) {
                            const el = arr[y - 2][i];
                            if ((el !== 0) || hasForceDown(arr, gameInfo, i, y - 2)) {
                                update = false;
                            }
                        }
                        if (update) {
                            for (let i = xmin; i <= xmax; i++) {
                                arr[y - 2][i] = arr[y - 1][i];
                                arr[y - 1][i] = 0;
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

