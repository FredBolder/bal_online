import { updateObject } from "./balUtils.js";
import { moveOrangeBallInDirection } from "./orangeBalls.js";

export function checkForces(gameData, gameInfo) {
    let empty = -1
    let maxX = 0;
    let result = {};
    result.update = false;
    result.playerX = -1;
    result.playerY = -1;
    let possible = false;

    if (gameData.length > 0) {
        maxX = gameData[0].length - 1;
        for (let i = 0; i < gameInfo.forces.length; i++) {
            const force = gameInfo.forces[i];
            empty = -1;
            possible = false;
            switch (force.direction) {
                case 2:
                    for (let j = gameData.length - 1; j > force.y; j--) {
                        const element = gameData[j][force.x];
                        if ((element === 0) && (empty === -1)) {
                            empty = j;
                            possible = true;
                        }
                        if (empty !== -1) {
                            if (![0, 2, 4, 8, 40, 93, 94].includes(gameData[j][force.x])) {
                                possible = false;
                                empty = -1;
                            }
                        }
                    }

                    // Move down
                    if (possible) {
                        for (let j = empty; j > force.y + 1; j--) {
                            result.update = true;
                            gameData[j][force.x] = gameData[j - 1][force.x];
                            gameData[j - 1][force.x] = 0;
                            switch (gameData[j][force.x]) {
                                case 2:
                                    result.playerX = force.x;
                                    result.playerY = j;
                                    break;
                                case 8:
                                case 93:
                                case 94:
                                    updateObject(gameInfo.redBalls, force.x, j - 1, force.x, j);
                                    break;
                                case 40:
                                    moveOrangeBallInDirection(gameInfo.orangeBalls, force.x, j - 1, "down", false);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
                case 4:
                    for (let j = 0; j < force.x; j++) {
                        const element = gameData[force.y][j];
                        if ((element === 0) && (empty === -1)) {
                            empty = j;
                            possible = true;
                        }
                        if (empty !== -1) {
                            if (![0, 2, 4, 8, 40, 93, 94].includes(gameData[force.y][j])) {
                                possible = false;
                                empty = -1;
                            }
                        }
                    }

                    // Move left
                    if (possible) {
                        for (let j = empty; j < force.x - 1; j++) {
                            result.update = true;
                            gameData[force.y][j] = gameData[force.y][j + 1];
                            gameData[force.y][j + 1] = 0;
                            switch (gameData[force.y][j]) {
                                case 2:
                                    result.playerX = j;
                                    result.playerY = force.y;
                                    break;
                                case 8:
                                case 93:
                                case 94:
                                    updateObject(gameInfo.redBalls, j + 1, force.y, j, force.y);
                                    break;
                                case 40:
                                    moveOrangeBallInDirection(gameInfo.orangeBalls, j + 1, force.y, "left", false);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
                case 6:
                    for (let j = maxX; j > force.x; j--) {
                        const element = gameData[force.y][j];
                        if ((element === 0) && (empty === -1)) {
                            empty = j;
                            possible = true;
                        }
                        if (empty !== -1) {
                            if (![0, 2, 4, 8, 40, 93, 94].includes(gameData[force.y][j])) {
                                possible = false;
                                empty = -1;
                            }
                        }
                    }

                    // Move right
                    if (possible) {
                        for (let j = empty; j > force.x + 1; j--) {
                            result.update = true;
                            gameData[force.y][j] = gameData[force.y][j - 1];
                            gameData[force.y][j - 1] = 0;
                            switch (gameData[force.y][j]) {
                                case 2:
                                    result.playerX = j;
                                    result.playerY = force.y;
                                    break;
                                case 8:
                                case 93:
                                case 94:
                                    updateObject(gameInfo.redBalls, j - 1, force.y, j, force.y);
                                    break;
                                case 40:
                                    moveOrangeBallInDirection(gameInfo.orangeBalls, j - 1, force.y, "right", false);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
                case 8:
                    for (let j = 0; j < force.y; j++) {
                        const element = gameData[j][force.x];
                        if ((element === 0) && (empty === -1)) {
                            empty = j;
                            possible = true;
                        }
                        if (empty !== -1) {
                            if (![0, 2, 4, 8, 40, 93, 94].includes(gameData[j][force.x])) {
                                possible = false;
                                empty = -1;
                            }
                        }
                    }

                    // Move up
                    if (possible) {
                        for (let j = empty; j < force.y - 1; j++) {
                            result.update = true;
                            gameData[j][force.x] = gameData[j + 1][force.x];
                            gameData[j + 1][force.x] = 0;
                            switch (gameData[j][force.x]) {
                                case 2:
                                    result.playerX = force.x;
                                    result.playerY = j;
                                    break;
                                case 8:
                                case 93:
                                case 94:
                                    updateObject(gameInfo.redBalls, force.x, j + 1, force.x, j);
                                    break;
                                case 40:
                                    moveOrangeBallInDirection(gameInfo.orangeBalls, force.x, j + 1, "up", false);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return result;
}

export function hasForceDown(gameData, gameInfo, x, y) {
    let result = false;

    for (let i = 0; i < gameInfo.forces.length; i++) {
        let found = false;
        const force = gameInfo.forces[i];
        if ((force.direction === 2) && (force.x === x) && (force.y < y)) {
            found = true;
            if (force.y < y - 1) {
                for (let j = y - 1; j > force.y; j--) {
                    const element = gameData[j][x];
                    if (![0, 2, 4, 8, 40, 93, 94].includes(element)) {
                        found = false;
                    }
                }
            }
        }
        if (found) {
            result = true;
        }
    }
    return result;
}

export function hasForceLeft(gameData, gameInfo, x, y) {
    let result = false;

    for (let i = 0; i < gameInfo.forces.length; i++) {
        let found = false;
        const force = gameInfo.forces[i];
        if ((force.direction === 4) && (force.y === y) && (force.x > x)) {
            found = true;
            if (force.x > x + 1) {
                for (let j = x + 1; j < force.x; j++) {
                    const element = gameData[y][j];
                    if (![0, 2, 4, 8, 40, 93, 94].includes(element)) {
                        found = false;
                    }
                }
            }
        }
        if (found) {
            result = true;
        }
    }
    return result;
}

export function hasForceRight(gameData, gameInfo, x, y) {
    let result = false;

    for (let i = 0; i < gameInfo.forces.length; i++) {
        let found = false;
        const force = gameInfo.forces[i];
        if ((force.direction === 6) && (force.y === y) && (force.x < x)) {
            found = true;
            if (force.x < x - 1) {
                for (let j = x - 1; j > force.x; j--) {
                    const element = gameData[y][j];
                    if (![0, 2, 4, 8, 40, 93, 94].includes(element)) {
                        found = false;
                    }
                }
            }
        }
        if (found) {
            result = true;
        }
    }
    return result;
}

export function hasForceUp(gameData, gameInfo, x, y) {
    let result = false;

    for (let i = 0; i < gameInfo.forces.length; i++) {
        let found = false;
        const force = gameInfo.forces[i];
        if ((force.direction === 8) && (force.x === x) && (force.y > y)) {
            found = true;
            if (force.y > y + 1) {
                for (let j = y + 1; j < force.y; j++) {
                    const element = gameData[j][x];
                    if (![0, 2, 4, 8, 40, 93, 94].includes(element)) {
                        found = false;
                    }
                }
            }
        }
        if (found) {
            result = true;
        }
    }
    return result;
}

