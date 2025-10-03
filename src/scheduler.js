import { checkFalling, findElementByCoordinates, } from "./balUtils.js";
import { moveConveyorBelts } from "./conveyorBelts.js";
import { checkCopiers } from "./copiers.js";
import { checkDamagedStones } from "./damagedStones.js";
import { checkDelays } from "./delays.js";
import { checkDetonator } from "./detonator.js";
import { checkDisappearingStones } from "./disappearingStones.js";
import { checkGameOver } from "./gameOver.js";
import { checkForces } from "./force.js";
import { clearBitMapLava } from "./drawLevel.js";
import { checkElevatorInOuts, moveElevators, moveHorizontalElevators } from "./elevators.js";
import { moveFish } from "./fish.js";
import { checkMagnets } from "./magnets.js";
import { checkMovers } from "./movers.js";
import { checkMusicBoxes } from "./musicBoxes.js"
import { moveOrangeBalls } from "./orangeBalls.js";
import { movePinkBalls } from "./pinkBalls.js";
import { checkPistonsDetector, checkPistonsTriggers, pistonsRepeatFast, pistonsRepeatSlow } from "./pistons.js";
import { checkPurpleTeleports, deleteTeleports, findTheOtherTeleport } from "./teleports.js";
import { moveRedBalls } from "./redBalls.js";
import { checkTimeBombs } from "./timeBombs.js";
import { checkTrapDoors } from "./trapDoors.js";
import { checkWhiteBallSynchronisers } from "./whiteBallSynchronisers.js";
import { moveYellowBalls, stopYellowBallsThatAreBlocked } from "./yellowBalls.js";
import { moveYellowBars } from "./yellowBars.js";
import { checkYellowPausers } from "./yellowPausers.js";
import { checkYellowPushersTriggers } from "./yellowPushers.js";
import { checkYellowStoppers } from "./yellowStoppers.js";

export async function gameScheduler(backData, gameData, gameInfo, gameVars, checkAll = true) {
    let info = {};

    let gateTravelling = false;
    let playSounds = [];
    let updateCanvas = false;
    let updateGreen = false;
    let updateLevelNumber = false;

    if (checkAll) {
        if (gameVars.timeFreezer > 0) {
            gameVars.timeFreezer--;
        }
    }

    if (checkMagnets(gameInfo)) {
        playSounds.push("magnet");
    }

    if (checkAll) {
        if (checkDelays(backData, gameData, gameInfo, gameVars)) {
            updateCanvas = true;
        }

        if (checkMusicBoxes(backData, gameData, gameInfo, gameVars)) {
            updateCanvas = true;
        }

        if (checkPurpleTeleports(backData, gameData, gameInfo)) {
            updateCanvas = true;
            playSounds.push("teleport");
        }

        info = checkTrapDoors(backData, gameData, gameInfo, gameVars);
        if (info.sound) {
            playSounds.push("trap");
        }
        if (info.updated) {
            updateCanvas = true;
        }
        info = checkDamagedStones(backData, gameData, gameInfo, gameVars);
        if (info.sound === 1) {
            playSounds.push("breaking1");
        }
        if (info.sound === 2) {
            playSounds.push("breaking2");
        }
        if (info.update) {
            updateCanvas = true;
        }
        if (gameVars.disappearingStonesCounter >= gameVars.disappearingStonesCountTo) {
            gameVars.disappearingStonesCounter = 0;
            info = checkDisappearingStones(gameData, gameInfo);
            if (info.update) {
                updateCanvas = true;
            }
        }
        gameVars.disappearingStonesCounter++;

        info = checkWhiteBallSynchronisers(backData, gameData, gameInfo, gameVars);
        if (info.update) {
            updateCanvas = true;
        }
    }

    if (checkForces(gameData, gameInfo)) {
        updateCanvas = true;
    }

    if (checkAll) {
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
                moveFish(backData, gameData, gameInfo);
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
                if (moveElevators(gameData, gameInfo, gameVars)) {
                    updateCanvas = true;
                }
                if (moveHorizontalElevators(gameData, gameInfo, gameVars)) {
                    updateCanvas = true;
                }
            }
            gameVars.elevatorCounter++;

            if (checkElevatorInOuts(gameData, gameInfo, gameVars)) {
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
                if (moveConveyorBelts(gameData, gameInfo, gameVars)) {
                    updateCanvas = true;

                }
            }
            gameVars.conveyorBeltCounter++;

            if (gameVars.redCounter > 0) {
                gameVars.redCounter--;
            } else {
                gameVars.redCounter = 2;
                info = moveRedBalls(backData, gameData, gameInfo, gameVars);
                if (info.updated) {
                    updateCanvas = true;
                }
                if (info.eating) {
                    playSounds.push("eat");
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
                if (moveYellowBars(backData, gameData, gameInfo, gameVars)) {
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
            info = checkDetonator(backData, gameData, gameInfo, gameVars, false);
            if (info.explosion) {
                playSounds.push("explosion");
                gameVars.explosionCounter = 2;
            }
            if (info.updated) {
                updateCanvas = true;
            }
        }

        if (gameVars.timeFreezer === 0) {
            info = checkTimeBombs(gameData, backData, gameInfo);
            if (info.explosion) {
                playSounds.push("explosion");
            }
            if (info.updated) {
                updateCanvas = true;
            }
            if (info.gameOver) {
                gameVars.gameOver = true;
                updateCanvas = true;
            }
        }
    }

    if ((gameInfo.pistons.length > 0) || (gameInfo.musicBoxes.length > 0) || (gameInfo.conveyorBelts.length > 0)) {
        info = checkPistonsDetector(gameData, gameInfo);
        if (info.updated) {
            updateCanvas = true;
        }
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

    if (checkAll) {
        if (gameInfo.teleports.length > 0) {
            let teleport1 = -1;
            let teleport2 = -1;
            switch (gameVars.teleporting) {
                case 1:
                    playSounds.push("teleport");
                    gameVars.teleporting = 2;
                    break;
                case 2:
                    teleport1 = findElementByCoordinates(gameInfo.blueBall.x, gameInfo.blueBall.y, gameInfo.teleports);
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
                            deleteTeleports("white", true, gameInfo.teleports[teleport1].group, gameInfo);
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

        if (gameInfo.hasTravelGate && (gameVars.gateTravelling > 0)) {
            gateTravelling = true;
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
                playSounds.push("electricity");
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

        if (gameVars.pinkCounter >= gameVars.pinkCountTo) {
            gameVars.pinkCounter = 0;
            if (movePinkBalls(backData, gameData, gameInfo, gameVars)) {
                updateCanvas = true;
            }
        }
        gameVars.pinkCounter++;

        info = checkFalling(backData, gameData, gameInfo, gameVars);
        if (info.update) {
            updateCanvas = true;
        }
        if (info.sound !== "") {
            playSounds.push(info.sound);
        }
        if (info.sound === "pain") {
            gameVars.gameOver = true;
            updateCanvas = true;
        }
    }

    if (updateCanvas) {
        const gameOverResult = checkGameOver(backData, gameData, gameInfo, gameVars);
        for (let i = 0; i < gameOverResult.playSounds.length; i++) {
            const snd = gameOverResult.playSounds[i];
            if (!playSounds.includes(snd)) {
                playSounds.push(snd);
            }
        }
    }

    return { gateTravelling, playSounds, updateCanvas, updateGreen, updateLevelNumber };
}

export function schedulerTime() {
    return 50;
}

