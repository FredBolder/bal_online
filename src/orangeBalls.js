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
            case "leftDown":
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
            case "rightDown":
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
                case "leftDown":
                    orangeBall.x--;
                    orangeBall.y++;
                    break;
                case "leftUp":
                    orangeBall.x--;
                    orangeBall.y--;
                    break;
                case "up":
                    orangeBall.y--;
                    break;
                case "rightDown":
                    orangeBall.x++;
                    orangeBall.y++;
                    break;
                case "rightUp":
                    orangeBall.x++;
                    orangeBall.y--;
                    break;
                default:
                    break;
            }
        }
    }
}

