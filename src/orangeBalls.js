import { fallingOrRising } from "./balUtils.js";

export function moveOrangeBalls(backData, gameData, gameInfo, gameVars) {
    let update = false;

    for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
        const orangeBall = gameInfo.orangeBalls[i];
        if (fallingOrRising(orangeBall.x, orangeBall.y, backData, gameData, gameInfo, gameVars, true)) {
            break;
        }
        switch (orangeBall.direction) {
            case "left":
                if ((orangeBall.x > 0) && (gameData[orangeBall.y][orangeBall.x - 1] === 0)) {
                    gameData[orangeBall.y][orangeBall.x] = 0;
                    gameData[orangeBall.y][orangeBall.x - 1] = 40;
                    orangeBall.x--;
                    update = true;
                } else {
                    orangeBall.direction = "none";
                }
                break;
            case "right":
                if ((orangeBall.x < gameData[0].length - 1) && (gameData[orangeBall.y][orangeBall.x + 1] === 0)) {
                    gameData[orangeBall.y][orangeBall.x] = 0;
                    gameData[orangeBall.y][orangeBall.x + 1] = 40;
                    orangeBall.x++;
                    update = true;
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

export function updateOrangeBall(orangeBalls, x1, y1, x2, y2, direction) {
    for (let i = 0; i < orangeBalls.length; i++) {
        if (orangeBalls[i].x === x1 && orangeBalls[i].y === y1) {
            orangeBalls[i].x = x2;
            orangeBalls[i].y = y2;
            orangeBalls[i].direction = direction;
        }
    }
}

