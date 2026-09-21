import { findElementByCoordinates, getGameDataValue } from "./balUtils";

export function canOpen(gameData, gameInfo, x, y) {
    if (getGameDataValue(gameData, x, y) !== 30) {
        return false;
    }
    const idx = findElementByCoordinates(x, y, gameInfo.lockedDoors);
    if (idx >= 0) {
        const lockedDoor = gameInfo.lockedDoors[idx];
        switch (lockedDoor.color) {
            case "default":
                return gameInfo.hasKey;
            case "blue":
                return gameInfo.hasBlueKey;
            case "green":
                return gameInfo.hasGreenKey;
            case "pink":
                return gameInfo.hasPinkKey;
            case "purple":
                return gameInfo.hasPurpleKey;
            case "red":
                return gameInfo.hasRedKey;
            case "white":
                return gameInfo.hasWhiteKey;
            case "yellow":
                return gameInfo.hasYellowKey;
            default:
                return false;
        }
    } else {
        return false;
    }
}

export function lockedDoorColors() {
    return ["default", "blue", "green", "pink", "purple", "red", "white", "yellow"];
}