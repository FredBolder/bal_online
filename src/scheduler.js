import { checkFalling, findElementByCoordinate, } from "./balUtils.js";
import { moveConveyorBelts } from "./conveyorBelts.js";
import { checkCopiers } from "./copiers.js";
import { checkDamagedStones } from "./damagedStones.js";
import { checkDelays } from "./delays.js";
import { checkDetonator } from "./detonator.js";
import { checkGameOver } from "./gameOver.js";
import { globalVars } from "./glob.js";
import { checkForces } from "./force.js";
import { clearBitMapLava } from "./drawLevel.js";
import { checkElevatorInOuts, moveElevators, moveHorizontalElevators } from "./elevators.js";
import { moveFish } from "./fish.js";
import { checkMagnets } from "./magnets.js";
import { clearMemory, loadFromMemory, saveToMemory } from "./memory.js";
import { checkMovers } from "./movers.js";
import { checkMusicBoxes } from "./musicBoxes.js"
import { moveOrangeBalls } from "./orangeBalls.js";
import { checkPistonsTriggers, pistonsRepeatFast, pistonsRepeatSlow } from "./pistons.js";
import { checkPurpleTeleports, deleteTeleports, findTheOtherTeleport } from "./teleports.js";
import { moveRedBalls } from "./redBalls.js";
import { playSound } from "./sound.js";
import { checkTimeBombs } from "./timeBombs.js";
import { checkTrapDoors } from "./trapDoors.js";
import { moveYellowBalls, stopYellowBallsThatAreBlocked } from "./yellowBalls.js";
import { moveYellowBars } from "./yellowBars.js";
import { checkYellowPausers } from "./yellowPausers.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStoppers } from "./yellowStoppers.js";

async function loadLevelFromMemory(backData, gameData, gameInfo, gameVars, idx) {
    const data = loadFromMemory(idx);
    if (data !== null) {
        gameData = null;
        gameData = data.gameData;
        backData = null;
        backData = data.backData;
        gameInfo = null;
        gameInfo = data.gameInfo;
        if (gameInfo.player === 2) {
            gameInfo.blueBall = gameInfo.blueBall2;
        } else {
            gameInfo.blueBall = gameInfo.blueBall1;
        }
        gameVars = null;
        gameVars = data.gameVars;
    }
}

export async function gameScheduler(backData, gameData, gameInfo, gameVars) {
    let info = {};
    let saveCoilSpring = false;
    let saveDivingGlasses = false;
    let saveKey = false;
    let saveLadder = false;
    let savePickaxe = false;
    let savePropeller = false;
    let saveTelekineticPower = false;
    let saveWeakStone = false;
    let updateCanvas = false;
    let updateGreen = false;
    let updateLevelNumber = false;

    function loadItems() {
        gameInfo.hasCoilSpring = saveCoilSpring;
        gameInfo.hasDivingGlasses = saveDivingGlasses;
        gameInfo.hasKey = saveKey;
        gameInfo.hasLadder = saveLadder;
        gameInfo.hasPickaxe = savePickaxe;
        gameInfo.hasPropeller = savePropeller;
        gameInfo.hasTelekineticPower = saveTelekineticPower;
        gameInfo.hasWeakStone = saveWeakStone;
    }

    function saveItems() {
        saveCoilSpring = gameInfo.hasCoilSpring;
        saveDivingGlasses = gameInfo.hasDivingGlasses;
        saveKey = gameInfo.hasKey;
        saveLadder = gameInfo.hasLadder;
        savePickaxe = gameInfo.hasPickaxe;
        savePropeller = gameInfo.hasPropeller;
        saveTelekineticPower = gameInfo.hasTelekineticPower;
        saveWeakStone = gameInfo.hasWeakStone;
    }

    // SCHEDULER
    if (gameVars.timeFreezer > 0) {
        gameVars.timeFreezer--;
    }

    if (checkMagnets(gameInfo)) {
        playSound("magnet");
    }

    if (checkDelays(gameData, gameInfo)) {
        updateCanvas = true;
    }

    if (checkMusicBoxes(gameData, gameInfo)) {
        updateCanvas = true;
    }

    if (checkPurpleTeleports(backData, gameData, gameInfo)) {
        updateCanvas = true;
        playSound("teleport");
    }

    info = checkTrapDoors(backData, gameData, gameInfo);
    if (info.sound) {
        playSound("trap");
    }
    if (info.updated) {
        updateCanvas = true;
    }
    info = checkDamagedStones(gameData, gameInfo);
    if (info.sound === 1) {
        playSound("breaking1");
    }
    if (info.sound === 2) {
        playSound("breaking2");
    }
    if (info.updated) {
        updateCanvas = true;
    }

    if (checkForces(gameData, gameInfo)) {
        updateCanvas = true;
    }

    info = checkCopiers(gameData, gameInfo);
    if (info.updated) {
        updateCanvas = true;
    }

    gameVars.refreshCounter++;
    if (gameVars.refreshCounter >= gameVars.refreshCountTo) {
        gameVars.refreshCounter = 0;
        clearBitMapLava();
        updateCanvas = true;
    }

    if ((gameVars.timeFreezer === 0) && (gameInfo.redFish.length > 0)) {
        if (gameVars.fishCounter >= gameVars.fishCountTo) {
            gameVars.fishCounter = 0;
            moveFish(backData, gameData, gameInfo, gameInfo.blueBall.x, gameInfo.blueBall.y);
            updateCanvas = true;
        }
        gameVars.fishCounter++;
    }

    gameVars.wave1++;
    if (gameVars.wave1 > 5) {
        gameVars.wave1 = 1;
        gameVars.wave2++;
        if (gameVars.wave2 > 3) {
            gameVars.wave2 = 1;
        }
        updateCanvas = true;
    }

    if (gameVars.timeFreezer === 0) {
        if (checkMovers(gameData, gameInfo)) {
            updateCanvas = true;
        }

        if (gameVars.elevatorCounter >= gameVars.elevatorCountTo) {
            gameVars.elevatorCounter = 0;
            if (moveElevators(gameData, gameInfo)) {
                updateCanvas = true;
            }
            if (moveHorizontalElevators(gameData, gameInfo)) {
                updateCanvas = true;
            }
        }
        gameVars.elevatorCounter++;

        if (checkElevatorInOuts(gameData, gameInfo)) {
            updateCanvas = true;
        }

        if ((gameVars.conveyorBeltCounter === gameVars.conveyorBeltCountTo) ||
            (gameVars.conveyorBeltCounter === Math.round(gameVars.conveyorBeltCountTo * 0.5))) {
            updateCanvas = true;
            gameVars.conveyorBeltAngleLeft -= Math.PI / 4;
            if (gameVars.conveyorBeltAngleLeft <= 0) {
                gameVars.conveyorBeltAngleLeft = Math.PI * 2;
            }
            gameVars.conveyorBeltAngleRight += Math.PI / 4;
            if (gameVars.conveyorBeltAngleRight >= Math.PI * 2) {
                gameVars.conveyorBeltAngleRight = 0;
            }
        }

        if (gameVars.conveyorBeltCounter >= gameVars.conveyorBeltCountTo) {
            gameVars.conveyorBeltCounter = 0;
            if (moveConveyorBelts(gameData, gameInfo)) {
                updateCanvas = true;

            }
        }
        gameVars.conveyorBeltCounter++;

        if (gameVars.redCounter > 0) {
            gameVars.redCounter--;
        } else {
            gameVars.redCounter = 2;
            info = moveRedBalls(backData, gameData, gameInfo);
            if (info.updated) {
                updateCanvas = true;
            }
            if (info.eating) {
                playSound("eat");
            }
        }
    }

    if (!gameVars.yellowPaused) {
        if (gameVars.yellowSlowCounter > 0) {
            gameVars.yellowSlowCounter--;
        }
        if (gameVars.yellowCounter > 0) {
            if (gameVars.yellowCounter === 1) {
                stopYellowBallsThatAreBlocked(gameData, gameInfo.yellowBalls);
            }
            gameVars.yellowCounter--;
        } else {
            if (gameVars.yellowSlowCounter > 0) {
                gameVars.yellowCounter = 5;
            } else {
                gameVars.yellowCounter = 1;
            }
            if (moveYellowBalls(gameData, gameInfo.yellowBalls)) {
                updateCanvas = true;
            }
            if (moveYellowBars(backData, gameData, gameInfo)) {
                updateCanvas = true;
            }
        }
    }
    if (gameVars.orangeCounter > 0) {
        gameVars.orangeCounter--;
    } else {
        gameVars.orangeCounter = 1;
        if (moveOrangeBalls(gameData, gameInfo.orangeBalls)) {
            updateCanvas = true;
        }
    }

    if (gameVars.explosionCounter > 0) {
        gameVars.explosionCounter--;
    } else {
        gameVars.explosionCounter = 2;
        info = checkDetonator(backData, gameData, gameInfo, false);
        if (info.explosion) {
            playSound("explosion");
        }
        if (info.updated) {
            updateCanvas = true;
        }
    }

    if (gameVars.timeFreezer === 0) {
        info = checkTimeBombs(gameData, backData, gameInfo);
        if (info.explosion) {
            playSound("explosion");
        }
        if (info.updated) {
            updateCanvas = true;
        }
        if (info.gameOver) {
            gameVars.gameOver = true;
            updateCanvas = true;
        }
    }

    if ((gameInfo.pistons.length > 0) || (gameInfo.musicBoxes.length > 0) || (gameInfo.conveyorBelts.length > 0)) {
        info = checkPistonsTriggers(backData, gameData, gameInfo, gameVars, false);
        if (info.updated) {
            updateCanvas = true;
        }
        if (gameVars.pistonsRepeatFastModeCounter > 0) {
            gameVars.pistonsRepeatFastModeCounter--;
        } else {
            gameVars.pistonsRepeatFastModeCounter = gameVars.pistonsRepeatFastModeCountTo;
            if (pistonsRepeatFast(gameData, gameInfo, gameVars)) {
                updateCanvas = true;
            }
            if (gameVars.pistonsRepeatSlowModeCounter > 0) {
                gameVars.pistonsRepeatSlowModeCounter--;
            } else {
                gameVars.pistonsRepeatSlowModeCounter = gameVars.pistonsRepeatSlowModeCountTo;
                if (pistonsRepeatSlow(gameData, gameInfo, gameVars)) {
                    updateCanvas = true;
                }
            }
        }
    }

    info = checkYellowPushersTriggers(backData, gameData, gameInfo, gameVars, false);
    if (info.updated) {
        updateCanvas = true;
    }
    checkYellowPausers(backData, gameData, gameInfo, gameVars, false);
    checkYellowStoppers(backData, gameData, gameInfo, gameVars, false);

    if (gameInfo.teleports.length > 0) {
        let teleport1 = -1;
        let teleport2 = -1;
        switch (gameVars.teleporting) {
            case 1:
                playSound("teleport");
                gameVars.teleporting = 2;
                break;
            case 2:
                teleport1 = findElementByCoordinate(gameInfo.blueBall.x, gameInfo.blueBall.y, gameInfo.teleports);
                if (teleport1 >= 0) {
                    if (gameInfo.teleports[teleport1].selfDestructing) {
                        gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
                    } else {
                        gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 31;
                    }
                    teleport2 = findTheOtherTeleport(teleport1, gameInfo.teleports);
                    if (teleport2 >= 0) {
                        gameInfo.blueBall.x = gameInfo.teleports[teleport2].x;
                        gameInfo.blueBall.y = gameInfo.teleports[teleport2].y;
                    }
                    if (gameInfo.teleports[teleport1].selfDestructing) {
                        deleteTeleports("white", true, gameInfo);
                    }
                }
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
                updateCanvas = true;
                gameVars.teleporting = 0;
                break;
            default:
                break;
        }
    }

    if (gameInfo.hasTravelGate) {
        switch (gameVars.gateTravelling) {
            case 1:
                playSound("teleport");
                gameVars.gateTravelling = 2;
                break;
            case 2:
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 132;
                clearMemory(0); // Prevent conflicts between two worlds          
                if (globalVars.isInOtherWorld) {
                    globalVars.isInOtherWorld = false;
                    saveToMemory(gameData, backData, gameInfo, gameVars, 2);
                    saveItems();
                    await loadLevelFromMemory(backData, gameData, gameInfo, gameVars, 1);
                    loadItems();
                } else {
                    globalVars.isInOtherWorld = true;
                    saveToMemory(gameData, backData, gameInfo, gameVars, 1);
                    saveItems();
                    await loadLevelFromMemory(backData, gameData, gameInfo, gameVars, 2);
                    loadItems();
                }
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
                gameInfo.blueBall.x = gameInfo.travelGate.x;
                gameInfo.blueBall.y = gameInfo.travelGate.y;
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
                gameVars.gateTravelling = 0;
                updateCanvas = true;
                updateGreen = true;
                updateLevelNumber = true;
                break;
            default:
                break;
        }
    }

    if ((gameVars.timeFreezer === 0) && (gameInfo.electricity.length > 0)) {
        if (gameVars.electricityCounter > 110) {
            gameVars.electricityCounter = 0;
        }
        gameInfo.electricityActive = false;
        if (
            (gameVars.electricityCounter > 50 && gameVars.electricityCounter < 60) ||
            (gameVars.electricityCounter > 90 && gameVars.electricityCounter < 100)
        ) {
            gameInfo.electricityActive = true;
        }
        if (!gameVars.elecActiveSaved && gameInfo.electricityActive) {
            playSound("electricity");
        }
        if (
            gameInfo.electricityActive ||
            gameVars.elecActiveSaved !== gameInfo.electricityActive
        ) {
            updateCanvas = true;
        }
        gameVars.elecActiveSaved = gameInfo.electricityActive;
        gameVars.electricityCounter++;
    }

    info = checkFalling(backData, gameData, gameInfo, gameVars);
    if (info.update) {
        updateCanvas = true;
    }
    if (info.sound !== "") {
        playSound(info.sound);
    }
    if (info.sound === "pain") {
        gameVars.gameOver = true;
        updateCanvas = true;
    }

    if (updateCanvas) {
        checkGameOver(backData, gameData, gameInfo, gameVars);
    }

    return { updateCanvas, updateGreen, updateLevelNumber };
}

