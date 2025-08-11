import { findElementByCoordinate } from "./balUtils.js";

export function checkPurpleTeleports(backData, gameData, gameInfo) {
    let idx1 = -1;
    let idx2 = -1;
    let update = false;
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;
    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if (teleport.color === getPurpleTeleportColor()) {
            if (gameData[teleport.y][teleport.x] === 28) {
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
    if ((x1 !== -1) && (y1 !== -1) && (x2 !== -1) && (y2 !== -1)) {
        if (gameData[y2][x2] === 0) {
            update = true;
            gameData[y1][x1] = 0;
            gameData[y2][x2] = 28;
            backData[y1][x1] = 0;
            backData[y2][x2] = 0;
            deleteTeleports(getPurpleTeleportColor(), true, gameInfo);
        }
    }
    return update;
}

export function deleteIfPurpleTeleport(backData, gameInfo, x, y) {
    let idx = -1;

    if (backData[y][x] === 170) {
        idx = findElementByCoordinate(x, y, gameInfo.teleports);
        if (idx >= 0) {
            gameInfo.teleports.splice(idx, 1);
        }
        backData[y][x] = 0;
    }
}

export function deleteTeleports(color, selfDestructing, gameInfo) {
    let newTeleports = [];

    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if ((teleport.color !== color) || (teleport.selfDestructing !== selfDestructing)) {
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
            if ((i !== idx) && (teleport1.color === teleport2.color) && (teleport1.selfDestructing === teleport2.selfDestructing)) {
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

