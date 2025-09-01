import { moveObject } from "./balUtils.js";

const moveableOrEmpty = [0, 2, 4, 8, 40, 93, 94];

export function checkForces(gameData, gameInfo) {
    let elBottom = -1;
    let elBottomLeft = -1;
    let elBottomRight = -1;
    let elLeft = -1;
    let elRight = -1;
    let elTop = -1;
    let elTopLeft = -1;
    let elTopRight = -1;
    let emptyOrTriangle = -1;
    let maxX = 0;
    let maxY = 0;
    let newX = -1;
    let newY = -1;
    let possible = false;
    let updated = false;

    if (gameData.length > 0) {
        maxX = gameData[0].length - 1;
        maxY = gameData.length - 1;
        for (let i = 0; i < gameInfo.forces.length; i++) {
            const force = gameInfo.forces[i];
            emptyOrTriangle = -1;
            possible = false;
            switch (force.direction) {
                case "down":
                    for (let j = gameData.length - 1; j > force.y; j--) {
                        const element = gameData[j][force.x];
                        elBottom = (j < maxY) ? gameData[j + 1][force.x] : -1;
                        elBottomLeft = ((j < maxY) && (force.x > 0)) ? gameData[j + 1][force.x - 1] : -1;
                        elBottomRight = ((j < maxY) && (force.x < maxX)) ? gameData[j + 1][force.x + 1] : -1;
                        elLeft = (force.x > 0) ? gameData[j][force.x - 1] : -1;
                        elRight = (force.x < maxX) ? gameData[j][force.x + 1] : -1;
                        elTop = (j > 0) ? gameData[j - 1][force.x] : -1;
                        elTopLeft = ((j > 0) && (force.x > 0)) ? gameData[j - 1][force.x - 1] : -1;
                        elTopRight = ((j > 0) && (force.x < maxX)) ? gameData[j - 1][force.x + 1] : -1;
                        switch (element) {
                            case 0:
                                if (emptyOrTriangle === -1) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                }
                                break;
                            case 15:
                                if ((elRight === 0) && (elTopRight === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            case 16:
                                if ((elLeft === 0) && (elTopLeft === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            default:
                                if (!moveableOrEmpty.includes(element)) {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                        }
                    }

                    if (possible) {
                        for (let j = emptyOrTriangle; j > force.y + 1; j--) {
                            if (gameData[j - 1][force.x] > 0) {
                                newX = force.x;
                                newY = j;
                                switch (gameData[newY][newX]) {
                                    case 0:
                                        break;
                                    case 15:
                                        newX++;
                                        break;
                                    case 16:
                                        newX--;
                                        break;
                                    default:
                                        break;
                                }
                                moveObject(gameData, gameInfo, force.x, j - 1, newX, newY);
                                updated = true;
                            }
                        }
                    }
                    break;
                case "left":
                    for (let j = 0; j < force.x; j++) {
                        const element = gameData[force.y][j];
                        elBottom = (force.y < maxY) ? gameData[force.y + 1][j] : -1;
                        elBottomLeft = ((force.y < maxY) && (j > 0)) ? gameData[force.y + 1][j - 1] : -1;
                        elBottomRight = ((force.y < maxY) && (j < maxX)) ? gameData[force.y + 1][j + 1] : -1;
                        elLeft = (j > 0) ? gameData[force.y][j - 1] : -1;
                        elRight = (j < maxX) ? gameData[force.y][j + 1] : -1;
                        elTop = (force.y > 0) ? gameData[force.y - 1][j] : -1;
                        elTopLeft = ((force.y > 0) && (j > 0)) ? gameData[force.y - 1][j - 1] : -1;
                        elTopRight = ((force.y > 0) && (j < maxX)) ? gameData[force.y - 1][j + 1] : -1;
                        switch (element) {
                            case 0:
                                if (emptyOrTriangle === -1) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                }
                                break;
                            case 15:
                                if ((elTop === 0) && (elTopRight === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            case 17:
                                if ((elBottom === 0) && (elBottomRight === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            default:
                                if (!moveableOrEmpty.includes(element)) {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                        }
                    }

                    if (possible) {
                        for (let j = emptyOrTriangle; j < force.x - 1; j++) {
                            if (gameData[force.y][j + 1] > 0) {
                                newX = j;
                                newY = force.y;
                                switch (gameData[newY][newX]) {
                                    case 0:
                                        break;
                                    case 15:
                                        newY--;
                                        break;
                                    case 17:
                                        newY++;
                                        break;
                                    default:
                                        break;
                                }
                                moveObject(gameData, gameInfo, j + 1, force.y, newX, newY);
                                updated = true;
                            }
                        }
                    }
                    break;
                case "right":
                    for (let j = maxX; j > force.x; j--) {
                        const element = gameData[force.y][j];
                        elBottom = (force.y < maxY) ? gameData[force.y + 1][j] : -1;
                        elBottomLeft = ((force.y < maxY) && (j > 0)) ? gameData[force.y + 1][j - 1] : -1;
                        elBottomRight = ((force.y < maxY) && (j < maxX)) ? gameData[force.y + 1][j + 1] : -1;
                        elLeft = (j > 0) ? gameData[force.y][j - 1] : -1;
                        elRight = (j < maxX) ? gameData[force.y][j + 1] : -1;
                        elTop = (force.y > 0) ? gameData[force.y - 1][j] : -1;
                        elTopLeft = ((force.y > 0) && (j > 0)) ? gameData[force.y - 1][j - 1] : -1;
                        elTopRight = ((force.y > 0) && (j < maxX)) ? gameData[force.y - 1][j + 1] : -1;
                        switch (element) {
                            case 0:
                                if (emptyOrTriangle === -1) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                }
                                break;
                            case 16:
                                if ((elTop === 0) && (elTopLeft === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            case 18:
                                if ((elBottom === 0) && (elBottomLeft === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            default:
                                if (!moveableOrEmpty.includes(element)) {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                        }
                    }

                    if (possible) {
                        for (let j = emptyOrTriangle; j > force.x + 1; j--) {
                            if (gameData[force.y][j - 1] > 0) {
                                newX = j;
                                newY = force.y;
                                switch (gameData[newY][newX]) {
                                    case 0:
                                        break;
                                    case 16:
                                        newY--;
                                        break;
                                    case 18:
                                        newY++;
                                        break;
                                    default:
                                        break;
                                }
                                moveObject(gameData, gameInfo, j - 1, force.y, newX, newY);
                                updated = true;
                            }
                        }
                    }
                    break;
                case "up":
                    for (let j = 0; j < force.y; j++) {
                        const element = gameData[j][force.x];
                        elBottom = (j < maxY) ? gameData[j + 1][force.x] : -1;
                        elBottomLeft = ((j < maxY) && (force.x > 0)) ? gameData[j + 1][force.x - 1] : -1;
                        elBottomRight = ((j < maxY) && (force.x < maxX)) ? gameData[j + 1][force.x + 1] : -1;
                        elLeft = (force.x > 0) ? gameData[j][force.x - 1] : -1;
                        elRight = (force.x < maxX) ? gameData[j][force.x + 1] : -1;
                        elTop = (j > 0) ? gameData[j - 1][force.x] : -1;
                        elTopLeft = ((j > 0) && (force.x > 0)) ? gameData[j - 1][force.x - 1] : -1;
                        elTopRight = ((j > 0) && (force.x < maxX)) ? gameData[j - 1][force.x + 1] : -1;
                        switch (element) {
                            case 0:
                                if (emptyOrTriangle === -1) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                }
                                break;
                            case 17:
                                if ((elRight === 0) && (elBottomRight === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            case 18:
                                if ((elLeft === 0) && (elBottomLeft === 0)) {
                                    emptyOrTriangle = j;
                                    possible = true;
                                } else {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                            default:
                                if (!moveableOrEmpty.includes(element)) {
                                    possible = false;
                                    emptyOrTriangle = -1;
                                }
                                break;
                        }
                    }

                    if (possible) {
                        for (let j = emptyOrTriangle; j < force.y - 1; j++) {
                            if (gameData[j + 1][force.x] > 0) {
                                newX = force.x;
                                newY = j;
                                switch (gameData[newY][newX]) {
                                    case 0:
                                        break;
                                    case 17:
                                        newX++;
                                        break;
                                    case 18:
                                        newX--;
                                        break;
                                    default:
                                        break;
                                }
                                moveObject(gameData, gameInfo, force.x, j + 1, newX, newY);
                                updated = true;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return updated;
}

export function hasForceDown(gameData, gameInfo, x, y) {
    let result = false;

    for (let i = 0; i < gameInfo.forces.length; i++) {
        let found = false;
        const force = gameInfo.forces[i];
        if ((force.direction === "down") && (force.x === x) && (force.y < y)) {
            found = true;
            if (force.y < y - 1) {
                for (let j = y - 1; j > force.y; j--) {
                    const element = gameData[j][x];
                    if (!moveableOrEmpty.includes(element)) {
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
        if ((force.direction === "left") && (force.y === y) && (force.x > x)) {
            found = true;
            if (force.x > x + 1) {
                for (let j = x + 1; j < force.x; j++) {
                    const element = gameData[y][j];
                    if (!moveableOrEmpty.includes(element)) {
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
        if ((force.direction === "right") && (force.y === y) && (force.x < x)) {
            found = true;
            if (force.x < x - 1) {
                for (let j = x - 1; j > force.x; j--) {
                    const element = gameData[y][j];
                    if (!moveableOrEmpty.includes(element)) {
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
        if ((force.direction === "up") && (force.x === x) && (force.y > y)) {
            found = true;
            if (force.y > y + 1) {
                for (let j = y + 1; j < force.y; j++) {
                    const element = gameData[j][x];
                    if (!moveableOrEmpty.includes(element)) {
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

