import { findElementByCoordinates } from "./balUtils.js";

function checkDirectionChanger(gameData, x, y) {
    let result = { directionChanger: 0, pointToAdd: null };
    switch (gameData[y][x]) {
        case 84:
            result.directionChanger = 1;
            break;
        case 85:
            result.directionChanger = 2;
            break;
        case 86:
            result.directionChanger = 3;
            break;
        case 138:
            result.directionChanger = 1;
            result.pointToAdd = { x, y };
            break;
        case 139:
            result.directionChanger = 2;
            result.pointToAdd = { x, y };
            break;
        default:
            break;
    }
    return result;
}

export function checkSynchroniser(gameData, yellowBalls, x, y, direction) {
    let blocked = false;
    let complete = false;
    let found = false;
    let idx = -1;
    let skip = [];
    let stop = false;
    let xmin = x;
    let ymin = y;
    let xmax = x;
    let ymax = y;

    if (gameData[y][x] !== 155) {
        return [];
    }

    if ((direction === "up") || (direction === "down")) {
        stop = false;
        for (let i = x; (i >= 0) && !stop; i--) {
            if (gameData[y][i] === 155) {
                xmin = i;
            } else {
                stop = true;
            }
        }
        stop = false;
        for (let i = x; (i < gameData[0].length) && !stop; i++) {
            if (gameData[y][i] === 155) {
                xmax = i;
            } else {
                stop = true;
            }
        }
    }
    if ((direction === "left") || (direction === "right")) {
        stop = false;
        for (let i = y; (i >= 0) && !stop; i--) {
            if (gameData[i][x] === 155) {
                ymin = i;
            } else {
                stop = true;
            }
        }
        stop = false;
        for (let i = y; (i < gameData.length) && !stop; i++) {
            if (gameData[i][x] === 155) {
                ymax = i;
            } else {
                stop = true;
            }
        }
    }
    switch (direction) {
        case "left":
            if (x > 0) {
                blocked = false;
                complete = true;
                for (let i = ymin; i <= ymax; i++) {
                    if (gameData[i][x - 1] !== 0) {
                        blocked = true;
                    }
                    found = false;
                    if (gameData[i][x + 1] === 9) {
                        idx = findElementByCoordinates(x + 1, i, yellowBalls);
                        if (idx >= 0) {
                            if (yellowBalls[idx].direction === "left") {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        complete = false;
                    }
                }
                if (!blocked && complete) {
                    for (let i = ymin; i <= ymax; i++) {
                        gameData[i][x - 1] = gameData[i][x + 1];
                        gameData[i][x + 1] = 0;
                        idx = findElementByCoordinates(x + 1, i, yellowBalls);
                        if (idx >= 0) {
                            yellowBalls[idx].x = x - 1;
                            skip.push(idx);
                        }
                    }
                }
            }
            break;
        case "right":
            if (x < gameData[0].length - 1) {
                blocked = false;
                complete = true;
                for (let i = ymin; i <= ymax; i++) {
                    if (gameData[i][x + 1] !== 0) {
                        blocked = true;
                    }
                    found = false;
                    if (gameData[i][x - 1] === 9) {
                        idx = findElementByCoordinates(x - 1, i, yellowBalls);
                        if (idx >= 0) {
                            if (yellowBalls[idx].direction === "right") {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        complete = false;
                    }
                }
                if (!blocked && complete) {
                    for (let i = ymin; i <= ymax; i++) {
                        gameData[i][x + 1] = gameData[i][x - 1];
                        gameData[i][x - 1] = 0;
                        idx = findElementByCoordinates(x - 1, i, yellowBalls);
                        if (idx >= 0) {
                            yellowBalls[idx].x = x + 1;
                            skip.push(idx);
                        }
                    }
                }
            }
            break;
        case "up":
            if (y > 0) {
                blocked = false;
                complete = true;
                for (let i = xmin; i <= xmax; i++) {
                    if (gameData[y - 1][i] !== 0) {
                        blocked = true;
                    }
                    found = false;
                    if (gameData[y + 1][i] === 9) {
                        idx = findElementByCoordinates(i, y + 1, yellowBalls);
                        if (idx >= 0) {
                            if (yellowBalls[idx].direction === "up") {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        complete = false;
                    }
                }
                if (!blocked && complete) {
                    for (let i = xmin; i <= xmax; i++) {
                        gameData[y - 1][i] = gameData[y + 1][i];
                        gameData[y + 1][i] = 0;
                        idx = findElementByCoordinates(i, y + 1, yellowBalls);
                        if (idx >= 0) {
                            yellowBalls[idx].y = y - 1;
                            skip.push(idx);
                        }
                    }
                }
            }
            break;
        case "down":
            if (y < gameData.length - 1) {
                blocked = false;
                complete = true;
                for (let i = xmin; i <= xmax; i++) {
                    if (gameData[y + 1][i] !== 0) {
                        blocked = true;
                    }
                    found = false;
                    if (gameData[y - 1][i] === 9) {
                        idx = findElementByCoordinates(i, y - 1, yellowBalls);
                        if (idx >= 0) {
                            if (yellowBalls[idx].direction === "down") {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        complete = false;
                    }
                }
                if (!blocked && complete) {
                    for (let i = xmin; i <= xmax; i++) {
                        gameData[y + 1][i] = gameData[y - 1][i];
                        gameData[y - 1][i] = 0;
                        idx = findElementByCoordinates(i, y - 1, yellowBalls);
                        if (idx >= 0) {
                            yellowBalls[idx].y = y + 1;
                            skip.push(idx);
                        }
                    }
                }
            }
            break;
        default:
            break;
    }
    return skip;
}

export function moveYellowBalls(gameData, yellowBalls) {
    let found = false;
    let info = null;
    let newSkip = null;
    let points = [];
    let skip = [];
    let updated = false;

    function addSkip(add) {
        for (let i = 0; i < add.length; i++) {
            const idx = add[i];
            if (!skip.includes(idx)) {
                skip.push(idx);
            }
        }
    }

    for (let i = 0; i < yellowBalls.length; i++) {
        if (!skip.includes(i)) {
            let doNotStop = false;
            let xOld = yellowBalls[i].x;
            let yOld = yellowBalls[i].y;
            info = null;
            switch (yellowBalls[i].direction) {
                case "left":
                    if (gameData[yOld][xOld - 1] === 155) {
                        newSkip = checkSynchroniser(gameData, yellowBalls, xOld - 1, yOld, "left");
                        addSkip(newSkip);
                        doNotStop = true;
                    } else {
                        info = checkDirectionChanger(gameData, xOld - 1, yOld);
                        switch (info.directionChanger) {
                            case 0:
                                if (gameData[yOld][xOld - 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].x--;
                                }
                                break;
                            case 1:
                                if (gameData[yOld + 1][xOld - 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "down";
                                    yellowBalls[i].x--;
                                    yellowBalls[i].y++;
                                }
                                break;
                            case 2:
                                if (gameData[yOld - 1][xOld - 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "up";
                                    yellowBalls[i].x--;
                                    yellowBalls[i].y--;
                                }
                                break;
                            case 3:
                                doNotStop = true;
                                yellowBalls[i].direction = "right";
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "right":
                    if (gameData[yOld][xOld + 1] === 155) {
                        newSkip = checkSynchroniser(gameData, yellowBalls, xOld + 1, yOld, "right");
                        addSkip(newSkip);
                        doNotStop = true;
                    } else {
                        info = checkDirectionChanger(gameData, xOld + 1, yOld);
                        switch (info.directionChanger) {
                            case 0:
                                if (gameData[yOld][xOld + 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].x++;
                                }
                                break;
                            case 1:
                                if (gameData[yOld - 1][xOld + 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "up";
                                    yellowBalls[i].x++;
                                    yellowBalls[i].y--;
                                }
                                break;
                            case 2:
                                if (gameData[yOld + 1][xOld + 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "down";
                                    yellowBalls[i].x++;
                                    yellowBalls[i].y++;
                                }
                                break;
                            case 3:
                                doNotStop = true;
                                yellowBalls[i].direction = "left";
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "up":
                    if (gameData[yOld - 1][xOld] === 155) {
                        newSkip = checkSynchroniser(gameData, yellowBalls, xOld, yOld - 1, "up");
                        addSkip(newSkip);
                        doNotStop = true;
                    } else {
                        info = checkDirectionChanger(gameData, xOld, yOld - 1);
                        switch (info.directionChanger) {
                            case 0:
                                if (gameData[yOld - 1][xOld] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].y--;
                                }
                                break;
                            case 1:
                                if (gameData[yOld - 1][xOld + 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "right";
                                    yellowBalls[i].x++;
                                    yellowBalls[i].y--;
                                }
                                break;
                            case 2:
                                if (gameData[yOld - 1][xOld - 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "left";
                                    yellowBalls[i].x--;
                                    yellowBalls[i].y--;
                                }
                                break;
                            case 3:
                                doNotStop = true;
                                yellowBalls[i].direction = "down";
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case "down":
                    if (gameData[yOld + 1][xOld] === 155) {
                        newSkip = checkSynchroniser(gameData, yellowBalls, xOld, yOld + 1, "down");
                        addSkip(newSkip);
                        doNotStop = true;
                    } else {
                        info = checkDirectionChanger(gameData, xOld, yOld + 1);
                        switch (info.directionChanger) {
                            case 0:
                                if (gameData[yOld + 1][xOld] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].y++;
                                }
                                break;
                            case 1:
                                if (gameData[yOld + 1][xOld - 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "left";
                                    yellowBalls[i].x--;
                                    yellowBalls[i].y++;
                                }
                                break;
                            case 2:
                                if (gameData[yOld + 1][xOld + 1] === 0) {
                                    doNotStop = true;
                                    yellowBalls[i].direction = "right";
                                    yellowBalls[i].x++;
                                    yellowBalls[i].y++;
                                }
                                break;
                            case 3:
                                doNotStop = true;
                                yellowBalls[i].direction = "up";
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (info !== null) {
                if (info.pointToAdd !== null) {
                    found = false;
                    for (let p = 0; (p < points.length) && !found; p++) {
                        if ((points[p].x === info.pointToAdd.x) && (points[p].y === info.pointToAdd.y)) {
                            found = true;
                        }
                    }
                    if (!found) {
                        points.push(info.pointToAdd);
                    }
                }
            }
            if (doNotStop) {
                gameData[yOld][xOld] = 0;
                gameData[yellowBalls[i].y][yellowBalls[i].x] = 9;
                updated = true;
            } else {
                yellowBalls[i].direction = "none";
            }
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (gameData[points[i].y][points[i].x] === 139) {
            gameData[points[i].y][points[i].x] = 138;
        } else if (gameData[points[i].y][points[i].x] === 138) {
            gameData[points[i].y][points[i].x] = 139;
        }
    }
    return updated;
}

export function stopYellowBallsThatAreBlocked(arr, yellowBalls) {
    // This makes makes it a little easier to stop a yellow ball by a falling ball (Level 901 by Panagiotis)
    for (let i = 0; i < yellowBalls.length; i++) {
        let stop = false;
        let x = yellowBalls[i].x;
        let y = yellowBalls[i].y;
        switch (yellowBalls[i].direction) {
            case "left":
                if (![0, 84, 85, 86, 138, 139, 155].includes(arr[y][x - 1])) {
                    stop = true;
                }
                break;
            case "right":
                if (![0, 84, 85, 86, 138, 139, 155].includes(arr[y][x + 1])) {
                    stop = true;
                }
                break;
            case "up":
                if (![0, 84, 85, 86, 138, 139, 155].includes(arr[y - 1][x])) {
                    stop = true;
                }
                break;
            case "down":
                if (![0, 84, 85, 86, 138, 139, 155].includes(arr[y + 1][x])) {
                    stop = true;
                }
                break;
            default:
                break;
        }
        if (stop) {
            yellowBalls[i].direction = "none";
        }
    }
}

export function updateYellowBall(yellowBalls, x1, y1, x2, y2, direction) {
    for (let i = 0; i < yellowBalls.length; i++) {
        if (yellowBalls[i].x === x1 && yellowBalls[i].y === y1) {
            yellowBalls[i].x = x2;
            yellowBalls[i].y = y2;
            yellowBalls[i].direction = direction;
        }
    }
}

