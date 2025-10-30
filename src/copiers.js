import { findElementByCoordinates } from "./balUtils.js";

export function checkCopiers(arr, gameInfo) {
    let element = 0;
    let idx = -1;
    let info = { updated: false };
    let orangeBall1 = null;
    let orangeBall2 = null;
    let pinkBall1 = null;
    let pinkBall2 = null;
    let redBall1 = null;
    let redBall2 = null;
    let x = 0;

    for (let i = 0; i < gameInfo.copiers.length; i++) {
        const copier = gameInfo.copiers[i];
        redBall1 = null;
        redBall2 = null;
        if ((copier.x > 2) && (copier.x < (arr[0].length - 2))) {
            element = arr[copier.y - 1][copier.x];
            if (([4, 40, 93, 94, 203].includes(element)) && (arr[copier.y][copier.x - 1] === 0) && (arr[copier.y][copier.x + 1] === 0)) {
                info.updated = true;
                arr[copier.y - 1][copier.x] = 0;
                if (arr[copier.y][copier.x - 2] === 0) {
                    x = copier.x - 2;
                } else {
                    x = copier.x - 1;
                }
                arr[copier.y][x] = element;
                switch (element) {
                    case 40:
                        idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.orangeBalls);
                        if (idx >= 0) {
                            orangeBall1 = gameInfo.orangeBalls[idx];
                            orangeBall1.x = x;
                            orangeBall1.y = copier.y;
                            orangeBall1.direction = "none";
                        }
                        break;    
                    case 93:
                    case 94:
                        idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.redBalls);
                        if (idx >= 0) {
                            redBall1 = gameInfo.redBalls[idx];
                            redBall1.x = x;
                            redBall1.y = copier.y;
                            redBall1.direction = "none";
                            redBall1.skipElevatorCount = 0;
                            redBall1.skipFollowCount = 0;
                        }
                        break;
                    case 203:
                        idx = findElementByCoordinates(copier.x, copier.y - 1, gameInfo.pinkBalls);
                        if (idx >= 0) {
                            pinkBall1 = gameInfo.pinkBalls[idx];
                            pinkBall1.x = x;
                            pinkBall1.y = copier.y;
                            pinkBall1.counter = 0;
                        }
                        break;    
                    default:
                        break;
                }
                if (arr[copier.y][copier.x + 2] === 0) {
                    x = copier.x + 2;
                } else {
                    x = copier.x + 1;
                }
                arr[copier.y][x] = element;
                switch (element) {
                    case 40:
                        orangeBall2 = { x: x, y: copier.y, direction: "none" };
                        gameInfo.orangeBalls.push(orangeBall2);
                        break;
                    case 93:
                    case 94:
                        redBall2 = { x: x, y: copier.y, direction: "none", skipElevatorCount: 0, skipFollowCount: 0 };
                        if (element === 94) {
                            redBall2.smart = 2;
                        } else {
                            redBall2.smart = 1;
                        }
                        gameInfo.redBalls.push(redBall2);
                        break;
                    case 203:
                        pinkBall2 = { x: x, y: copier.y, delete: false, counter: 0 };
                        gameInfo.pinkBalls.push(pinkBall2);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return info;
}

