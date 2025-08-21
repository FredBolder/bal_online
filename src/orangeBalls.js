export function moveOrangeBalls(arr, orangeBalls) {
    let update = false;

    for (let i = 0; i < orangeBalls.length; i++) {
        const orangeBall = orangeBalls[i];
        switch (orangeBall.direction) {
            case "left":
                if ((orangeBall.x > 0) && (arr[orangeBall.y][orangeBall.x - 1] === 0)) {
                    arr[orangeBall.y][orangeBall.x] = 0;
                    arr[orangeBall.y][orangeBall.x - 1] = 40;
                    orangeBall.x--;
                    update = true;
                } else {
                    orangeBall.direction = "none";
                }
                break;
            case "downleft":
                if ((orangeBall.x > 0) && (arr[orangeBall.y][orangeBall.x - 1] === 0)) {
                    arr[orangeBall.y][orangeBall.x] = 0;
                    update = true;
                    if ((orangeBall.y < arr.length - 1) && (arr[orangeBall.y + 1][orangeBall.x - 1] === 0)) {
                        arr[orangeBall.y + 1][orangeBall.x - 1] = 40;
                        orangeBall.x--;
                        orangeBall.y++;
                    } else {
                        arr[orangeBall.y][orangeBall.x - 1] = 40;
                        orangeBall.x--;
                        orangeBall.direction = "left";
                    }
                } else {
                    orangeBall.direction = "none";
                }
                break;
            case "right":
                if ((orangeBall.x < arr[0].length - 1) && (arr[orangeBall.y][orangeBall.x + 1] === 0)) {
                    arr[orangeBall.y][orangeBall.x] = 0;
                    arr[orangeBall.y][orangeBall.x + 1] = 40;
                    orangeBall.x++;
                    update = true;
                } else {
                    orangeBall.direction = "none";
                }
                break;
            case "downright":
                if ((orangeBall.x < arr[0].length - 1) && (arr[orangeBall.y][orangeBall.x + 1] === 0)) {
                    arr[orangeBall.y][orangeBall.x] = 0;
                    update = true;
                    if ((orangeBall.y < arr.length - 1) && (arr[orangeBall.y + 1][orangeBall.x + 1] === 0)) {
                        arr[orangeBall.y + 1][orangeBall.x + 1] = 40;
                        orangeBall.x++;
                        orangeBall.y++;
                    } else {
                        arr[orangeBall.y][orangeBall.x + 1] = 40;
                        orangeBall.x++;
                        orangeBall.direction = "right";
                    }
                } else {
                    orangeBall.direction = "none";
                }
                break;
            default:
                break;
        }
    }
    return update;
}

export function moveOrangeBallInDirection(orangeBalls, x, y, direction, continueInDirection) {
    for (let i = 0; i < orangeBalls.length; i++) {
        const orangeBall = orangeBalls[i];
        if ((orangeBall.x === x) && (orangeBall.y === y)) {
            if (continueInDirection) {
                orangeBall.direction = direction;
            } else {
                orangeBall.direction = "none";
            }
            switch (direction) {
                case "down":
                    orangeBall.y++;
                    break;
                case "left":
                    orangeBall.x--;
                    break;
                case "right":
                    orangeBall.x++;
                    break;
                case "downleft":
                    orangeBall.x--;
                    orangeBall.y++;
                    break;
                case "upleft":
                    orangeBall.x--;
                    orangeBall.y--;
                    break;
                case "up":
                    orangeBall.y--;
                    break;
                case "downright":
                    orangeBall.x++;
                    orangeBall.y++;
                    break;
                case "upright":
                    orangeBall.x++;
                    orangeBall.y--;
                    break;
                default:
                    break;
            }
        }
    }
}

export function updateOrangeBall(orangeBalls, x1, y1, x2, y2, direction) {
    for (let i = 0; i < orangeBalls.length; i++) {
        if (orangeBalls[i].x === x1 && orangeBalls[i].y === y1) {
            orangeBalls[i].x = x2;
            orangeBalls[i].y = y2;
            orangeBalls[i].direction = direction;
        }
    }
}

