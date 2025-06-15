export function checkMagnets(gameInfo) {
    let result = false;
    const x = gameInfo.blueBall.x;
    const y = gameInfo.blueBall.y;
    if (gameInfo.hasCoilSpring || gameInfo.hasKey || gameInfo.hasPickaxe) {
        for (let i = 0; i < gameInfo.magnets.length; i++) {
            const magnet = gameInfo.magnets[i];
            if (((x === (magnet.x - 1)) && (y === magnet.y)) || ((x === (magnet.x + 1)) && (y === magnet.y)) ||
                ((x === magnet.x) && (y === (magnet.y - 1))) || ((x === magnet.x) && (y === (magnet.y + 1)))) {
                gameInfo.hasCoilSpring = false;
                gameInfo.hasKey = false;
                gameInfo.hasPickaxe = false;
                result = true;
            }
        }
    }
    return result;
}

