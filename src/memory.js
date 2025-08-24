let memoryStrings = ["", "", "", "", "", ""];

// idx
// 0 Play - Save to memory / Load from memory
// 1 Play - Travel gate home
// 2 Play - Travel gate other world
// 3 Create level create / test
// 4 Create level undo
// 5 Create level redo

export function clearMemory(idx) {
    memoryStrings[idx] = "";
}

export function memoryIsEmpty(idx) {
    return (memoryStrings[idx] === "");
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