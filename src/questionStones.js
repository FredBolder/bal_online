import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";

export function checkQuestionStones(gameData, gameInfo) {
    let el = -1;
    let idx = -1;
    let update = false;
    let x = 0;
    let y = 0;

    for (let i = 0; i < gameInfo.questionStones.length; i++) {
        const questionStone = gameInfo.questionStones[i];
        if (questionStone.disappeared) {
            continue;
        }
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0:
                    x = questionStone.x - 1;
                    y = questionStone.y;
                    break;
                case 1:
                    x = questionStone.x + 1;
                    y = questionStone.y;
                    break;
                case 2:
                    x = questionStone.x;
                    y = questionStone.y - 1;
                    break;
                case 3:
                    x = questionStone.x;
                    y = questionStone.y + 1;
                    break;
                default:
                    x = -1;
                    y = -1;
                    break;
            }
            el = getGameDataValue(gameData, x, y)
            if ((gameData[questionStone.y][questionStone.x] === 241) && [242, 243, 245].includes(el)) {
                idx = findElementByCoordinates(x, y, gameInfo.answerBalls);
                if (idx >= 0) {
                    if (gameInfo.answerBalls[idx].answer === questionStone.answer) {
                        questionStone.disappeared = true;
                        gameData[questionStone.y][questionStone.x] = 0;
                        update = true;
                    }
                }
                if (!questionStone.disappeared) {
                    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
                    if (idx >= 0) {
                        if (gameInfo.tropicalFish[idx].answer === questionStone.answer) {
                            questionStone.disappeared = true;
                            gameData[questionStone.y][questionStone.x] = 0;
                            update = true;
                        }
                    }
                }
            }
        }
    }
    return update;
}