export function electricityTarget(backData, gameData, x, y) {
    let target = -1;
    let p = y + 1;

    while (p < gameData.length && target === -1) {
        if (gameData[p][x] !== 0 || backData[p][x] !== 0) {
            target = p;
        }
        p++;
    }
    return target;
}