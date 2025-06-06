let memoryString = "";

export function loadFromMemory() {
    if (memoryString === "") {
        return null;
    } else {
        return JSON.parse(memoryString);
    }
}

export function saveToMemory(gameData, backData, gameInfo, gameVars) {
    memoryString = JSON.stringify({ gameData, backData, gameInfo, gameVars });
}