export function checkDisappearingStones(gameData, gameInfo) {
    let result = { update: false };
    let skipCount = false;

    for (let i = 0; i < gameInfo.disappearingStones.length; i++) {
        const disappearingStone = gameInfo.disappearingStones[i];
        if (disappearingStone.status <= 0) {
            disappearingStone.countDown = false;
        }
        if (disappearingStone.status >= 3) {
            disappearingStone.countDown = true;
        }
        skipCount = false;
        if ((disappearingStone.status === 0) || (disappearingStone.status === 3)) {
            if (disappearingStone.patternCounter >= disappearingStone.pattern[disappearingStone.patternIndex]) {
                disappearingStone.patternCounter = 0;
                disappearingStone.patternIndex++;
                if (disappearingStone.patternIndex >= disappearingStone.pattern.length) {
                    disappearingStone.patternIndex = 0;
                }
            } else {
                skipCount = true;
            }
            disappearingStone.patternCounter++;
        }
        if (!skipCount) {
            if (disappearingStone.countDown) {
                disappearingStone.status--;
            } else {
                disappearingStone.status++;
            }
        }
        if (disappearingStone.status === 3) {
            if (gameData[disappearingStone.y][disappearingStone.x] === 198) {
                gameData[disappearingStone.y][disappearingStone.x] = 0;
            }
        } else {
            if (gameData[disappearingStone.y][disappearingStone.x] === 0) {
                gameData[disappearingStone.y][disappearingStone.x] = 198;
            }
        }
        result.update = true;
    }
    return result;
}