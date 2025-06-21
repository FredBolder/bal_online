let memoryStrings = ["", "", "", "", ""];

export function clearMemory(idx) {
    memoryStrings[idx] = "";
}

export function loadFromMemory(idx) {
    if (memoryStrings[idx] === "") {
        return null;
    } else {
        return JSON.parse(memoryStrings[idx]);
    }
}

export function saveToMemory(gameData, backData, gameInfo, gameVars, idx) {
    memoryStrings[idx] = JSON.stringify({ gameData, backData, gameInfo, gameVars });
}