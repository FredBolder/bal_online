import { findElementByCoordinates } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { getConnectedWater } from "./water.js";

export function checkElectricity(backData, gameData, gameInfo, gameVars) {
    let idx = -1;
    let target = -1;

    if (!globalVars.loading && !gameVars.gameOver && gameInfo.electricity.length > 0 && gameInfo.electricityActive) {
        for (let i = 0; i < gameInfo.electricity.length; i++) {
            const elec = gameInfo.electricity[i];
            target = electricityTarget(backData, gameData, elec.x, elec.y);
            if (target > 0) {
                switch (gameData[target][elec.x]) {
                    case 2:
                        gameVars.gameOver = true;
                        break;
                    case 27:
                        idx = findElementByCoordinates(elec.x, target, gameInfo.redFish);
                        if (idx >= 0) {
                            gameInfo.redFish[idx].isDead = true;
                        }
                        break;
                    case 243:
                        idx = findElementByCoordinates(elec.x, target, gameInfo.tropicalFish);
                        if (idx >= 0) {
                            gameInfo.tropicalFish[idx].isDead = true;
                        }
                        break;
                    default:
                        break;
                }

                if ((backData[target][elec.x] === 20 || backData[target][elec.x] === 23) &&
                    ![6, 7, 106, 107, 209].includes(gameData[target][elec.x])) {
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
}

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