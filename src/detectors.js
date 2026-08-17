import { findElementByCoordinates } from "./balUtils.js";
import { rotateDirection } from "./rotateGame.js";

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
    return ["group", "setting", "rotategroupleft", "rotategroupright"];
}

export function rotateGroup(gameData, gameInfo, group, rotateLeft) {
    // Pushers
    for (let i = 0; i < gameInfo.pushers.length; i++) {
        const pusher = gameInfo.pushers[i];
        if (pusher.group === group) {
            pusher.direction = rotateDirection(pusher.direction, rotateLeft);
        }
    }
}