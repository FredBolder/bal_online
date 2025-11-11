import { moveObject } from "./balUtils.js";

function canMove(element) {
    // Contains also objects that normally can not be moved
    return [2, 4, 5, 8, 9, 28, 40, 82, 84, 85, 86, 93, 94, 97, 98, 109, 110, 111, 112, 138, 139, 115, 117, 155, 169, 171, 172, 173, 178, 200, 203, 208, 209].includes(element);
}

export function movePusher(gameData, gameInfo, pusher) {
    let stop = false;
    let updated = false;
    let zeroPos = -1;

    switch (pusher.direction) {
        case "down":
            if (pusher.y < gameData.length - 2) {
                stop = false;
                for (let j = pusher.y + 1; (j < gameData.length) && !stop; j++) {
                    const element = gameData[j][pusher.x];
                    if (element === 0) {
                        zeroPos = j;
                        stop = true;
                    } else {
                        if (!canMove(element)) {
                            stop = true;
                        }
                    }
                }
                if (zeroPos >= 0) {
                    updated = true;
                    for (let j = zeroPos; j > pusher.y + 1; j--) {
                        moveObject(gameData, gameInfo, pusher.x, j - 1, pusher.x, j);
                    }
                    moveObject(gameData, gameInfo, pusher.x, pusher.y, pusher.x, pusher.y + 1);
                }
            }
            break;
        case "left":
            if (pusher.x > 1) {
                stop = false;
                for (let j = pusher.x - 1; (j >= 0) && !stop; j--) {
                    const element = gameData[pusher.y][j];
                    if (element === 0) {
                        zeroPos = j;
                        stop = true;
                    } else {
                        if (!canMove(element)) {
                            stop = true;
                        }
                    }
                }
                if (zeroPos >= 0) {
                    updated = true;
                    for (let j = zeroPos; j < pusher.x - 1; j++) {
                        moveObject(gameData, gameInfo, j + 1, pusher.y, j, pusher.y);
                    }
                    moveObject(gameData, gameInfo, pusher.x, pusher.y, pusher.x - 1, pusher.y);
                }
            }
            break;
        case "right":
            if (pusher.x < gameData[0].length - 2) {
                stop = false;
                for (let j = pusher.x + 1; (j < gameData[0].length) && !stop; j++) {
                    const element = gameData[pusher.y][j];
                    if (element === 0) {
                        zeroPos = j;
                        stop = true;
                    } else {
                        if (!canMove(element)) {
                            stop = true;
                        }
                    }
                }
                if (zeroPos >= 0) {
                    updated = true;
                    for (let j = zeroPos; j > pusher.x + 1; j--) {
                        moveObject(gameData, gameInfo, j - 1, pusher.y, j, pusher.y);
                    }
                    moveObject(gameData, gameInfo, pusher.x, pusher.y, pusher.x + 1, pusher.y);
                }
            }
            break;
        case "up":
            if (pusher.y > 1) {
                stop = false;
                for (let j = pusher.y - 1; (j >= 0) && !stop; j--) {
                    const element = gameData[j][pusher.x];
                    if (element === 0) {
                        zeroPos = j;
                        stop = true;
                    } else {
                        if (!canMove(element)) {
                            stop = true;
                        }
                    }
                }
                if (zeroPos >= 0) {
                    updated = true;
                    for (let j = zeroPos; j < pusher.y - 1; j++) {
                        moveObject(gameData, gameInfo, pusher.x, j + 1, pusher.x, j);
                    }
                    moveObject(gameData, gameInfo, pusher.x, pusher.y, pusher.x, pusher.y - 1);
                }
            }
            break;
        default:
            break;
    }

    return updated;
}