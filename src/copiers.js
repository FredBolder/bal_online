import { findElementByCoordinate } from "./balUtils.js";

export function checkCopiers(arr, gameInfo) {
    let element = 0;
    let idx = -1;
    let info = { updated: false };
    let redBall1 = null;
    let redBall2 = null;
    let x = 0;

    for (let i = 0; i < gameInfo.copiers.length; i++) {
        const copier = gameInfo.copiers[i];
        redBall1 = null;
        redBall2 = null;
        if ((copier.x > 2) && (copier.x < (arr[0].length - 2))) {
            element = arr[copier.y - 1][copier.x];
            if (([4, 93, 94].includes(element)) && (arr[copier.y][copier.x - 1] === 0) && (arr[copier.y][copier.x + 1] === 0)) {
                info.updated = true;
                arr[copier.y - 1][copier.x] = 0;
                if (arr[copier.y][copier.x - 2] === 0) {
                    x = copier.x - 2;
                } else {
                    x = copier.x - 1;
                }
                arr[copier.y][x] = element;
                if ([93, 94].includes(element)) {
                    idx = findElementByCoordinate(copier.x, copier.y - 1, gameInfo.redBalls);
                    if (idx >= 0) {
                        redBall1 = gameInfo.redBalls[idx];
                        redBall1.x = x;
                        redBall1.y = copier.y;
                        redBall1.direction = "none";
                        redBall1.skipElevatorCount = 0;
                        redBall1.skipFollowCount = 0;
                    }
                }
                if (arr[copier.y][copier.x + 2] === 0) {
                    x = copier.x + 2;
                } else {
                    x = copier.x + 1;
                }
                arr[copier.y][x] = element;
                if ([93, 94].includes(element)) {
                    redBall2 = {};
                    if (element === 94) {
                        redBall2.smart = 2;
                    } else {
                        redBall2.smart = 1;
                    }
                    redBall2.x = x;
                    redBall2.y = copier.y;
                    redBall2.direction = "none";
                    redBall2.skipElevatorCount = 0;
                    redBall2.skipFollowCount = 0;
                    gameInfo.redBalls.push(redBall2);
                }
            }
        }
    }
    return info;
}

