import { fishIsCloseToBlueBall } from "./fish.js";
import { globalVars } from "./glob.js";
import { electricityTarget } from "./electricity.js";
import { checkFirstCount } from "./musicBoxes.js";
import { checkRedBalls } from "./redBalls.js";
import { checkSpikes } from "./spikes.js";
import { getConnectedWater } from "./water.js";

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
                    const connectedWater = getConnectedWater(backData, elec.x, target);
                    if (connectedWater.has(`${gameInfo.blueBall.x},${gameInfo.blueBall.y}`) ||
                        connectedWater.has(`${gameInfo.blueBall1.x},${gameInfo.blueBall1.y}`)) {
                        gameVars.gameOver = true;
                    }
                    if (gameInfo.twoBlue &&
                        connectedWater.has(`${gameInfo.blueBall2.x},${gameInfo.blueBall2.y}`)) {
                        gameVars.gameOver = true;
                    }
                    for (let j = 0; j < gameInfo.redFish.length; j++) {
                        const fish = gameInfo.redFish[j];
                        if (connectedWater.has(`${fish.x},${fish.y}`)) {
                            fish.isDead = true;
                        }
                    }
                    for (let j = 0; j < gameInfo.tropicalFish.length; j++) {
                        const fish = gameInfo.tropicalFish[j];
                        if (connectedWater.has(`${fish.x},${fish.y}`)) {
                            fish.isDead = true;
                        }
                    }
                    for (let j = 0; j < gameInfo.jellyfish.length; j++) {
                        const jellyfish = gameInfo.jellyfish[j];
                        if (connectedWater.has(`${jellyfish.x},${jellyfish.y}`)) {
                            jellyfish.isDead = true;
                        }
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

