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

export function moveYellowBalls(gameData, yellowBalls) {
    let found = false;
    let info = null;
    let points = [];
    let updated = false;

    for (let i = 0; i < yellowBalls.length; i++) {
        let moved = false;
        let xOld = yellowBalls[i].x;
        let yOld = yellowBalls[i].y;
        info = null;
        switch (yellowBalls[i].direction) {
            case "left":
                info = checkDirectionChanger(gameData, xOld - 1, yOld);
                switch (info.directionChanger) {
                    case 0:
                        if (gameData[yOld][xOld - 1] === 0) {
                            moved = true;
                            yellowBalls[i].x--;
                        }
                        break;
                    case 1:
                        if (gameData[yOld + 1][xOld - 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "down";
                            yellowBalls[i].x--;
                            yellowBalls[i].y++;
                        }
                        break;
                    case 2:
                        if (gameData[yOld - 1][xOld - 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "up";
                            yellowBalls[i].x--;
                            yellowBalls[i].y--;
                        }
                        break;
                    case 3:
                        moved = true;
                        yellowBalls[i].direction = "right";
                        break;
                    default:
                        break;
                }
                break;
            case "right":
                info = checkDirectionChanger(gameData, xOld + 1, yOld);
                switch (info.directionChanger) {
                    case 0:
                        if (gameData[yOld][xOld + 1] === 0) {
                            moved = true;
                            yellowBalls[i].x++;
                        }
                        break;
                    case 1:
                        if (gameData[yOld - 1][xOld + 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "up";
                            yellowBalls[i].x++;
                            yellowBalls[i].y--;
                        }
                        break;
                    case 2:
                        if (gameData[yOld + 1][xOld + 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "down";
                            yellowBalls[i].x++;
                            yellowBalls[i].y++;
                        }
                        break;
                    case 3:
                        moved = true;
                        yellowBalls[i].direction = "left";
                        break;
                    default:
                        break;
                }
                break;
            case "up":
                info = checkDirectionChanger(gameData, xOld, yOld - 1);
                switch (info.directionChanger) {
                    case 0:
                        if (gameData[yOld - 1][xOld] === 0) {
                            moved = true;
                            yellowBalls[i].y--;
                        }
                        break;
                    case 1:
                        if (gameData[yOld - 1][xOld + 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "right";
                            yellowBalls[i].x++;
                            yellowBalls[i].y--;
                        }
                        break;
                    case 2:
                        if (gameData[yOld - 1][xOld - 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "left";
                            yellowBalls[i].x--;
                            yellowBalls[i].y--;
                        }
                        break;
                    case 3:
                        moved = true;
                        yellowBalls[i].direction = "down";
                        break;
                    default:
                        break;
                }
                break;
            case "down":
                info = checkDirectionChanger(gameData, xOld, yOld + 1);
                switch (info.directionChanger) {
                    case 0:
                        if (gameData[yOld + 1][xOld] === 0) {
                            moved = true;
                            yellowBalls[i].y++;
                        }
                        break;
                    case 1:
                        if (gameData[yOld + 1][xOld - 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "left";
                            yellowBalls[i].x--;
                            yellowBalls[i].y++;
                        }
                        break;
                    case 2:
                        if (gameData[yOld + 1][xOld + 1] === 0) {
                            moved = true;
                            yellowBalls[i].direction = "right";
                            yellowBalls[i].x++;
                            yellowBalls[i].y++;
                        }
                        break;
                    case 3:
                        moved = true;
                        yellowBalls[i].direction = "up";
                        break;
                    default:
                        break;
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
        if (moved) {
            gameData[yOld][xOld] = 0;
            gameData[yellowBalls[i].y][yellowBalls[i].x] = 9;
            updated = true;
        } else {
            yellowBalls[i].direction = "none";
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
                if (![0, 84, 85, 86, 138, 139].includes(arr[y][x - 1])) {
                    stop = true;
                }
                break;
            case "right":
                if (![0, 84, 85, 86, 138, 139].includes(arr[y][x + 1])) {
                    stop = true;
                }
                break;
            case "up":
                if (![0, 84, 85, 86, 138, 139].includes(arr[y - 1][x])) {
                    stop = true;
                }
                break;
            case "down":
                if (![0, 84, 85, 86, 138, 139].includes(arr[y + 1][x])) {
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

