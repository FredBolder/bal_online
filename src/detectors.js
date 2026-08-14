import { findElementByCoordinates } from "./balUtils.js";

export function changeDetectorMode(gameInfo, x, y, mode) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.detectors);
    if (idx >= 0) {
        gameInfo.detectors[idx].mode = mode;
    }
    return idx;
}

export function detectorDisplayModes() {
    return ["default", "stone", "grayball"];
}

export function detectorModes() {
    return ["all", "blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball"];
}

export function detectorTargets() {
    return ["group", "setting"];
}