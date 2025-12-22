export function moveTropicalFish(backData, gameData, gameInfo) {
    let changed = false;
    let down = false;
    let up = false;
    let upOrDown = false;

    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        down = false;
        up = false;
        upOrDown = false;
        const fish = gameInfo.tropicalFish[i];
        gameData[fish.y][fish.x] = 0;

        if (fish.isDead) {
            if (fish.y < gameData.length - 1) {
                if (
                    gameData[fish.y + 1][fish.x] === 0 &&
                    backData[fish.y + 1][fish.x] === 23
                ) {
                    fish.y += 1;
                }
            }
        } else {
            if (Math.random() < 0.1) {
                if (fish.direction === 6) {
                    fish.direction = 4;
                } else {
                    fish.direction = 6;
                }
            }
            if (fish.direction === 6) {
                changed = false;
                if (fish.x < gameData[0].length - 1) {
                    if (
                        gameData[fish.y][fish.x + 1] === 0 &&
                        backData[fish.y][fish.x + 1] === 23
                    ) {
                        fish.x += 1;
                        changed = true;
                    }
                }
                if (!changed) {
                    if (fish.x > 1) {
                        if (
                            gameData[fish.y][fish.x - 1] === 0 &&
                            backData[fish.y][fish.x - 1] === 23
                        ) {
                            fish.direction = 4;
                            changed = true;
                        }
                    }
                    upOrDown = !changed;
                }
            } else if (fish.direction === 4) {
                changed = false;
                if (fish.x > 1) {
                    if (
                        gameData[fish.y][fish.x - 1] === 0 &&
                        backData[fish.y][fish.x - 1] === 23
                    ) {
                        fish.x -= 1;
                        changed = true;
                    }
                }
                if (!changed) {
                    if (fish.x < gameData[0].length - 1) {
                        if (
                            gameData[fish.y][fish.x + 1] === 0 &&
                            backData[fish.y][fish.x + 1] === 23
                        ) {
                            fish.direction = 6;
                            changed = true;
                        }
                    }
                    upOrDown = !changed;
                }
            }
            if (upOrDown) {
                if (Math.random() > 0.5) {
                    if (!down) {
                        up = true;
                    }
                } else {
                    if (!up) {
                        down = true;
                    }
                }
            }
            if (up) {
                if (fish.y > 1) {
                    if (
                        gameData[fish.y - 1][fish.x] === 0 &&
                        backData[fish.y - 1][fish.x] === 23
                    ) {
                        fish.y -= 1;
                    }
                }
            }
            if (down) {
                if (fish.y < gameData.length - 1) {
                    if (
                        gameData[fish.y + 1][fish.x] === 0 &&
                        backData[fish.y + 1][fish.x] === 23
                    ) {
                        fish.y += 1;
                    }
                }
            }
        }
        gameData[fish.y][fish.x] = 243;
    }

}