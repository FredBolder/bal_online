import { findElementByCoordinates, moveObject } from "./balUtils.js";

export function checkPurpleTeleports(backData, gameData, gameInfo) {
    let found = false;
    let group = -1;
    let idx1 = -1;
    let idx2 = -1;
    let update = false;
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;

    do {
        found = false;
        group = -1;
        idx1 = -1;
        idx2 = -1;
        x1 = -1;
        y1 = -1;
        x2 = -1;
        y2 = -1;
        for (let i = 0; i < gameInfo.teleports.length; i++) {
            const teleport = gameInfo.teleports[i];
            if (teleport.color === getPurpleTeleportColor()) {
                if ([28, 242].includes(gameData[teleport.y][teleport.x])) {
                    group = teleport.group;
                    x1 = teleport.x;
                    y1 = teleport.y;
                    idx1 = i;
                }
            }
        }
        if (idx1 !== -1) {
            idx2 = findTheOtherTeleport(idx1, gameInfo.teleports);
            if (idx2 !== -1) {
                const teleport = gameInfo.teleports[idx2];
                x2 = teleport.x;
                y2 = teleport.y;
            }
        }
        if ((x1 !== -1) && (y1 !== -1) && (x2 !== -1) && (y2 !== -1) && (group !== -1)) {
            if (gameData[y2][x2] === 0) {
                found = true;
                update = true;
                moveObject(gameData, gameInfo, x1, y1, x2, y2);
                backData[y1][x1] = 0;
                backData[y2][x2] = 0;
                deleteTeleports(getPurpleTeleportColor(), true, group, gameInfo);
            }
        }

    } while (found);
    return update;
}

export function createTeleports(backData, gameData, gameInfo, selfDestructing, direction) {
    let deltaX = 0;
    let deltaY = 0;
    let group = -1;
    let maxX = gameData[0].length - 1;
    let maxY = gameData.length - 1;
    let stop = false;
    let teleport1 = null;
    let teleport2 = null;
    let usedGroups = [];
    const x = gameInfo.blueBall.x;
    const y = gameInfo.blueBall.y;
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;
    let x3 = -1;
    let y3 = -1;

    // Search free group
    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if (teleport.selfDestructing === selfDestructing) {
            usedGroups.push(teleport.group)
        }
    }
    for (let i = 1; i <= 32; i++) {
        if (!usedGroups.includes(i)) {
            group = i;
            break;
        }
    }
    if (group === -1) {
        return;
    }

    // Search place for the first teleport next to the blue ball
    if ((gameData[y][x + 1] === 0) && (backData[y][x + 1] === 0)) {
        x1 = x + 1;
        y1 = y;
    } else if ((gameData[y][x - 1] === 0) && (backData[y][x - 1] === 0)) {
        x1 = x - 1;
        y1 = y;
    }
    // Search place for the second teleport 
    deltaX = 0;
    deltaY = 0;
    switch (direction) {
        case "left":
            deltaX = -1;
            break;
        case "right":
            deltaX = 1;
            break;
        case "up":
            deltaY = -1;
            break;
        case "down":
            deltaY = 1;
            break;
        case "upleft":
            deltaX = -1;
            deltaY = -1;
            break;
        case "upright":
            deltaX = 1;
            deltaY = -1;
            break;
        case "downleft":
            deltaX = -1;
            deltaY = 1;
            break;
        case "downright":
            deltaX = 1;
            deltaY = 1;
            break;
        default:
            break;
    }
    if ((deltaX !== 0) || (deltaY !== 0)) {
        stop = false;
        x3 = x;
        y3 = y;
        while (!stop) {
            x3 += deltaX;
            y3 += deltaY;
            if ((x3 < 0) || (y3 < 0) || (x3 > maxX) || (y3 > maxY)) {
                stop = true;
            }
            if (!stop && ((gameData[y3][x3] !== 0) || (backData[y3][x3] !== 0))) {
                stop = true;
            }
            if (!stop && (deltaX !== 0) && (deltaY !== 0)) {
                if (y3 > 0) {
                    if ((gameData[y3 - 1][x3] !== 0) || (backData[y3 - 1][x3] !== 0)) {
                        stop = true;
                    }
                } else {
                    stop = true;
                }
            }
            if (!stop && (gameData[y3][x3] === 0) && (backData[y3][x3] === 0) && ((x3 !== x1) || (y3 !== y1))) {
                x2 = x3;
                y2 = y3;
            }
        }
    }
    if ((x1 !== -1) && (y1 !== -1) && (x2 !== -1) && (y2 !== -1)) {
        teleport1 = { x: x1, y: y1, selfDestructing, color: "white", group };
        teleport2 = { x: x2, y: y2, selfDestructing, color: "white", group };
        gameData[y1][x1] = selfDestructing ? 92 : 31;
        gameInfo.teleports.push(teleport1);
        gameData[y2][x2] = selfDestructing ? 92 : 31;
        gameInfo.teleports.push(teleport2);
    }
}

export function deleteIfPurpleTeleport(backData, gameInfo, x, y) {
    let idx = -1;

    if (backData[y][x] === 170) {
        idx = findElementByCoordinates(x, y, gameInfo.teleports);
        if (idx >= 0) {
            gameInfo.teleports.splice(idx, 1);
        }
        backData[y][x] = 0;
    }
}

export function deleteTeleports(color, selfDestructing, group, gameInfo) {
    let newTeleports = [];

    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if ((teleport.color !== color) || (teleport.selfDestructing !== selfDestructing) || (teleport.group !== group)) {
            newTeleports.push(teleport);
        }
    }
    gameInfo.teleports = newTeleports;
}

export function findTheOtherTeleport(idx, teleports) {
    let result = -1;

    if ((idx >= 0) && (idx < teleports.length)) {
        const teleport1 = teleports[idx];
        for (let i = 0; i < teleports.length; i++) {
            const teleport2 = teleports[i];
            if ((i !== idx) && (teleport1.color === teleport2.color) &&
                (teleport1.selfDestructing === teleport2.selfDestructing) && (teleport1.group === teleport2.group)) {
                result = i;
            }
        }
    }
    return result;
}

export function getPurpleTeleportColor() {
    return "#FF80FF";
}

export function isWhiteTeleport(x, y, teleports) {
    let result = false;

    for (let i = 0; i < teleports.length; i++) {
        if ((teleports[i].x === x) && (teleports[i].y === y) && (teleports[i].color === "white")) {
            result = true;
        }
    }
    return result;
}

