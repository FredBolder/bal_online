import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";

export function checkDetectors(gameData, gameInfo, gameVars) {
    const top = 0;
    const bottom = 1;
    const left = 2;
    const right = 3;
    let el = -1;
    let elX = -1;
    let elY = -1;
    let sideStr = "?";
    let result = false;

    for (let i = 0; i < gameInfo.detectors.length; i++) {
        const detector = gameInfo.detectors[i];
        const elTop = getGameDataValue(gameData, detector.x, detector.y - 1);
        const elBottom = getGameDataValue(gameData, detector.x, detector.y + 1);
        const elLeft = getGameDataValue(gameData, detector.x - 1, detector.y);
        const elRight = getGameDataValue(gameData, detector.x + 1, detector.y);

        for (let side = 0; side < 4; side++) {
            switch (side) {
                case top:
                    el = elTop;
                    elX = detector.x;
                    elY = detector.y - 1;
                    sideStr = "top";
                    break;
                case bottom:
                    el = elBottom;
                    elX = detector.x;
                    elY = detector.y + 1;
                    sideStr = "bottom";
                    break;
                case left:
                    el = elLeft;
                    elX = detector.x - 1;
                    elY = detector.y;
                    sideStr = "left";
                    break;
                case right:
                    el = elRight;
                    elX = detector.x + 1;
                    elY = detector.y;
                    sideStr = "right";
                    break;
                default:
                    break;
            }
            if (!mover.activeSides.includes(sideStr)) {
                continue;
            }
            //TODO
        }
    }
    return result;
}
