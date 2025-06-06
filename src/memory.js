let memoryString = "";

export function loadFromMemory() {
    return JSON.parse(memoryString);
}

export function SaveToMemory(gameData, backData, gameInfo) {
    memoryString = JSON.stringify({ gameData, backData, gameInfo });
}