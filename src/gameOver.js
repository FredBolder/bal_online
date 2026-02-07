import { fishIsCloseToBlueBall } from "./fish.js";
import { checkElectricity } from "./electricity.js";
import { checkFirstCount } from "./musicBoxes.js";
import { checkRedBalls } from "./redBalls.js";
import { checkSeaAnemones } from "./seaAnemone.js";
import { checkSpikes } from "./spikes.js";

export function checkGameOver(backData, gameData, gameInfo, gameVars) {
    let playSounds = [];
    let updateCanvas = false;

    checkElectricity(backData, gameData, gameInfo, gameVars);

    checkSeaAnemones(backData, gameInfo, gameVars);

    if ((gameVars.timeFreezer === 0) && (!gameVars.gameOver)) {
        let redInfo = checkRedBalls(gameData, gameInfo.redBalls);
        if (redInfo.length > 0) {
            gameVars.laser = redInfo;
            gameVars.gameOver = true;
            playSounds.push("laser");
        } else {
            gameVars.laser = null;
        }
    }

    if (!gameVars.gameOver && !gameInfo.hasDivingGlasses) {
        if ([20, 23, 252].includes(backData[gameInfo.blueBall1.y][gameInfo.blueBall1.x])) {
            gameVars.gameOver = true;
        }
        if (gameInfo.twoBlue && [20, 23, 252].includes(backData[gameInfo.blueBall2.y][gameInfo.blueBall2.x])) {
            gameVars.gameOver = true;
        }
    }

    if ((gameVars.timeFreezer === 0) && !gameVars.gameOver && (gameInfo.redFish.length > 0)) {
        if (fishIsCloseToBlueBall(gameInfo)) {
            gameVars.gameOver = true;
        }
    }

    if (checkSpikes(backData, gameData, gameInfo, gameVars)) {
        gameVars.gameOver = true;
        playSounds.push("pain");
    }

    if (checkFirstCount(gameData, gameInfo)) {
        gameVars.gameOver = true;
    }

    if (gameVars.gameOver) {
        updateCanvas = true;
    }

    return { playSounds, updateCanvas };
}

