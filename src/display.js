import { findElementByCoordinates, getGameDataValue, getListByObjectNumber } from "./balUtils.js";

export function changeDisplay(gameData, gameInfo, x, y, decrease) {
    const gd = getGameDataValue(gameData, x, y);
    if (gd < 0) {
        return -1;
    }

    const list = getListByObjectNumber(gameInfo, gd);
    if (list === null) {
        return -1;
    }

    const idx = findElementByCoordinates(x, y, list);
    if (idx < 0) {
        return -1;
    }

    let values = displayModes();
    const step = decrease ? -1 : 1;
    let n = values.indexOf(list[idx].display) + step;
    if (n < 0 || n >= values.length) {
        n = 0;
    }
    list[idx].display = values[n];
    return idx;
}

export function displayModes() {
    return ["default", "stone", "grayball"];
}

