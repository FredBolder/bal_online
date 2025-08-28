
import { inWater } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { electricityTarget } from "./electricity.js";
import { checkRedBalls } from "./redBalls.js";
import { checkSpikes } from "./spikes.js";

export function checkGameOver(backData, gameData, gameInfo, gameVars) {
    let target = -1;

    let playSounds = [];
    let updateCanvas = false;

    if (!globalVars.loading && !gameVars.gameOver && gameInfo.electricity.length > 0 && gameInfo.electricityActive) {
        for (let i = 0; i < gameInfo.electricity.length; i++) {
            const elec = gameInfo.electricity[i];
            target = electricityTarget(backData, gameData, elec.x, elec.y);
            if (target > 0) {
                if (gameData[target][elec.x] === 2) {
                    gameVars.gameOver = true;
                }
                if (backData[target][elec.x] === 20 || backData[target][elec.x] === 23) {
                    if (inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData) ||
                        inWater(gameInfo.blueBall1.x, gameInfo.blueBall1.y, backData) ||
                        (gameInfo.twoBlue && inWater(gameInfo.blueBall2.x, gameInfo.blueBall2.y, backData))) {
                        gameVars.gameOver = true;
                    }
                    for (let j = 0; j < gameInfo.redFish.length; j++) {
                        const fish = gameInfo.redFish[j];
                        fish.isDead = true;
                    }
                }
            }
        }
    }
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
        if ([20, 23].includes(backData[gameInfo.blueBall1.y][gameInfo.blueBall1.x])) {
            gameVars.gameOver = true;
        }
        if (gameInfo.twoBlue && [20, 23].includes(backData[gameInfo.blueBall2.y][gameInfo.blueBall2.x])) {
            gameVars.gameOver = true;
        }
    }
    if ((gameVars.timeFreezer === 0) && !gameVars.gameOver && (gameInfo.redFish.length > 0)) {
        for (let i = 0; i < gameInfo.redFish.length && !gameVars.gameOver; i++) {
            const fish = gameInfo.redFish[i];
            if (!fish.isDead &&
                (((Math.abs(gameInfo.blueBall.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall.y - fish.y) < 2)) ||
                    ((Math.abs(gameInfo.blueBall1.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall1.y - fish.y) < 2)) ||
                    (gameInfo.twoBlue && (Math.abs(gameInfo.blueBall2.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall2.y - fish.y) < 2)))
            ) {
                gameVars.gameOver = true;
            }
        }
    }
    if (checkSpikes(backData, gameData, gameInfo, gameVars)) {
        gameVars.gameOver = true;
        playSounds.push("pain");
    }
    if (gameVars.gameOver) {
        updateCanvas = true;
    }

    return { playSounds, updateCanvas };
}

