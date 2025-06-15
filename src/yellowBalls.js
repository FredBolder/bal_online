export function moveYellowBalls(arr, yellowBalls) {
    let updated = false;

    for (let i = 0; i < yellowBalls.length; i++) {
        let moved = false;
        let xOld = yellowBalls[i].x;
        let yOld = yellowBalls[i].y;
        switch (yellowBalls[i].direction) {
            case "left":
                if (arr[yOld][xOld - 1] === 0) {
                    moved = true;
                    yellowBalls[i].x--;
                }
                if (arr[yOld][xOld - 1] === 86) {
                    moved = true;
                    yellowBalls[i].direction = "right";
                }
                if (arr[yOld][xOld - 1] === 84 && arr[yOld + 1][xOld - 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "down";
                    yellowBalls[i].x--;
                    yellowBalls[i].y++;
                }
                if (arr[yOld][xOld - 1] === 85 && arr[yOld - 1][xOld - 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "up";
                    yellowBalls[i].x--;
                    yellowBalls[i].y--;
                }
                break;
            case "right":
                if (arr[yOld][xOld + 1] === 0) {
                    moved = true;
                    yellowBalls[i].x++;
                }
                if (arr[yOld][xOld + 1] === 86) {
                    moved = true;
                    yellowBalls[i].direction = "left";
                }
                if (arr[yOld][xOld + 1] === 84 && arr[yOld - 1][xOld + 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "up";
                    yellowBalls[i].x++;
                    yellowBalls[i].y--;
                }
                if (arr[yOld][xOld + 1] === 85 && arr[yOld + 1][xOld + 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "down";
                    yellowBalls[i].x++;
                    yellowBalls[i].y++;
                }
                break;
            case "up":
                if (arr[yOld - 1][xOld] === 0) {
                    moved = true;
                    yellowBalls[i].y--;
                }
                if (arr[yOld - 1][xOld] === 86) {
                    moved = true;
                    yellowBalls[i].direction = "down";
                }
                if (arr[yOld - 1][xOld] === 84 && arr[yOld - 1][xOld + 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "right";
                    yellowBalls[i].x++;
                    yellowBalls[i].y--;
                }
                if (arr[yOld - 1][xOld] === 85 && arr[yOld - 1][xOld - 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "left";
                    yellowBalls[i].x--;
                    yellowBalls[i].y--;
                }
                break;
            case "down":
                if (arr[yOld + 1][xOld] === 0) {
                    moved = true;
                    yellowBalls[i].y++;
                }
                if (arr[yOld + 1][xOld] === 86) {
                    moved = true;
                    yellowBalls[i].direction = "up";
                }
                if (arr[yOld + 1][xOld] === 84 && arr[yOld + 1][xOld - 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "left";
                    yellowBalls[i].x--;
                    yellowBalls[i].y++;
                }
                if (arr[yOld + 1][xOld] === 85 && arr[yOld + 1][xOld + 1] === 0) {
                    moved = true;
                    yellowBalls[i].direction = "right";
                    yellowBalls[i].x++;
                    yellowBalls[i].y++;
                }
                break;
            default:
                break;
        }
        if (moved) {
            arr[yOld][xOld] = 0;
            arr[yellowBalls[i].y][yellowBalls[i].x] = 9;
            updated = true;
        } else {
            yellowBalls[i].direction = "none";
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
                if (![0, 84, 85, 86].includes(arr[y][x - 1])) {
                    stop = true;
                }
                break;
            case "right":
                if (![0, 84, 85, 86].includes(arr[y][x + 1])) {
                    stop = true;
                }
                break;
            case "up":
                if (![0, 84, 85, 86].includes(arr[y - 1][x])) {
                    stop = true;
                }
                break;
            case "down":
                if (![0, 84, 85, 86].includes(arr[y + 1][x])) {
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

