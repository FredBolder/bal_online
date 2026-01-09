import { getGameDataValue } from "./balUtils";

export function checkJellyfish(backData, gameData, gameInfo) {
    const result = { update: false, gameOver: false };
    const sinkSpeed = 0.5; // seconds per row
    const t = performance.now() * 0.001;

    for (let i = 0; i < gameInfo.jellyfish.length; i++) {
        const jellyfish = gameInfo.jellyfish[i];
        const backBelow = getGameDataValue(backData, jellyfish.x, jellyfish.y + 1);
        const elBelow = getGameDataValue(gameData, jellyfish.x, jellyfish.y + 1);
        const elLeft = getGameDataValue(gameData, jellyfish.x - 1, jellyfish.y);
        const elRight = getGameDataValue(gameData, jellyfish.x + 1, jellyfish.y);

        if (jellyfish.isDead) {
            if (t - jellyfish.time >= sinkSpeed) {
                if ((jellyfish.y < (gameData.length - 1)) && (elBelow === 0) && (backBelow === 23)) {
                    gameData[jellyfish.y][jellyfish.x] = 0;
                    jellyfish.y++;
                    gameData[jellyfish.y][jellyfish.x] = 248;
                    result.update = true;
                }
                jellyfish.time = t;
            }
            continue;
        }

        if ((elBelow === 2) || (elLeft === 2) || (elRight === 2)) {
            result.gameOver = true;
        }
    }
    return result;
}