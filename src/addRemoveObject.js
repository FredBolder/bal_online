import { findElementByCoordinates, getListByObjectNumber } from "./balUtils.js";
import { objectNumberToDirection } from "./objects.js";
import { getPurpleTeleportColor } from "./teleports.js";

export function addObject(backData, gameData, gameInfo, x, y, objectNumber) {
    let ignore = false;

    if (!backData || !gameData || !gameInfo) {
        return;
    }
    if ((x < 0) || (x >= gameData[0].length) || (y < 0) || (y >= gameData.length) ||
        (x >= backData[0].length) || (y >= backData.length)) {
        return;
    }
    removeObject(backData, gameData, gameInfo, x, y);
    switch (objectNumber) {
        case 2:
            if ((gameInfo.blueBall1.x === -1) && (gameInfo.blueBall1.y === -1)) {
                gameInfo.blueBall1.x = x;
                gameInfo.blueBall1.y = y;
                gameInfo.blueBall = gameInfo.blueBall1;
            } else if ((gameInfo.blueBall2.x === -1) && (gameInfo.blueBall2.y === -1)) {
                gameInfo.blueBall2.x = x;
                gameInfo.blueBall2.y = y;
            } else {
                ignore = true;
            }
            break;
        case 3:
            gameInfo.greenBalls += 1;
            break;
        case 6:
        case 106: {
            let elevator = {
                x,
                y,
                up: objectNumber === 106,
                hasBlueBall: false
            };
            gameInfo.elevators.push(elevator);
            break;
        }
        case 7:
        case 107: {
            let elevator = {
                x,
                y,
                right: objectNumber === 107,
                hasBlueBall: false
            };
            gameInfo.horizontalElevators.push(elevator);
            break;
        }
        case 8:
        case 93:
        case 94: {
            let redBall = { x, y };
            switch (objectNumber) {
                case 93:
                    redBall.smart = 1;
                    break;
                case 94:
                    redBall.smart = 2;
                    break;
                default:
                    redBall.smart = 0;
                    break;
            }
            redBall.direction = "none";
            redBall.skipElevatorCount = 0;
            redBall.skipFollowCount = 0;
            gameInfo.redBalls.push(redBall);
            break;
        }
        case 9: {
            let yellowBall = { x, y, direction: "none" };
            gameInfo.yellowBalls.push(yellowBall);
            break;
        }
        case 12: {
            let damagedStone = { x, y, status: 0 };
            gameInfo.damagedStones.push(damagedStone);
            break;
        }
        case 13: {
            let trap = { x, y, status: 0 };
            gameInfo.trapDoors.push(trap);
            break;
        }
        case 22: {
            let lava = { x, y }
            gameInfo.lava.push(lava);
            break;
        }
        case 27: {
            let fish = {
                x,
                y,
                xStart: x,
                yStart: y,
                maxDistX: 0,
                direction: Math.random() > 0.5 ? 6 : 4,
                blocked: false,
                outOfWater: 0,
                isDead: false
            };
            gameInfo.redFish.push(fish);
            break;
        }
        case 29: {
            let key = { x, y, color: "default" }
            gameInfo.keys.push(key);
            break;
        }
        case 30: {
            let lockedDoor = { x, y, color: "default" }
            gameInfo.lockedDoors.push(lockedDoor);
            break;
        }
        case 31:
        case 92: {
            // Purple teleports (170) are in backData
            let teleport = {
                x,
                y,
                selfDestructing: objectNumber === 92,
                color: "white",
                group: 1
            };
            gameInfo.teleports.push(teleport);
            break;
        }
        case 37:
            if ((gameInfo.detonator.x !== -1) && (gameInfo.detonator.y !== -1)) {
                gameData[gameInfo.detonator.y][gameInfo.detonator.x] = 0;
            }
            gameInfo.detonator.x = x;
            gameInfo.detonator.y = y;
            break;
        case 39:
            gameInfo.elevatorInOuts.push({ x, y, player: false, status: 0 });
            break;
        case 40: {
            let orangeBall = { x, y, direction: "none" };
            gameInfo.orangeBalls.push(orangeBall);
            break;
        }
        case 91: {
            let elec = { x, y };
            gameInfo.electricity.push(elec);
            break;
        }
        case 97: {
            let copier = { x, y, color: "white" };
            gameInfo.copiers.push(copier);
            break;
        }
        case 109:
        case 110:
        case 111:
        case 112: {
            const direction = objectNumberToDirection(objectNumber);
            let force = { x, y, direction, movable: true };
            gameInfo.forces.push(force);
            break;
        }
        case 115: {
            let yellowBallPusher = { x, y };
            gameInfo.yellowBallPushers.push(yellowBallPusher);
            break;
        }
        case 116: {
            let yellowBallPushersTrigger = { x, y, pressed: false };
            gameInfo.yellowBallPushersTriggers.push(yellowBallPushersTrigger);
            break;
        }
        case 117: {
            let timeBomb = { x, y, status: -1 };
            gameInfo.timeBombs.push(timeBomb);
            break;
        }
        case 119: {
            let magnet = { x, y };
            gameInfo.magnets.push(magnet);
            break;
        }
        case 121:
        case 124: {
            let yellowBar = { x, y, direction: "none" };
            gameInfo.yellowBars.push(yellowBar);
            break;
        }
        case 131: {
            let yellowStopper = { x, y, pressed: false };
            gameInfo.yellowStoppers.push(yellowStopper);
            break;
        }
        case 132:
            if ((gameInfo.travelGate.x !== -1) && (gameInfo.travelGate.y !== -1)) {
                gameData[gameInfo.travelGate.y][gameInfo.travelGate.x] = 0;
            }
            gameInfo.travelGate.x = x;
            gameInfo.travelGate.y = y;
            break;
        case 136: {
            let yellowPauser = { x, y, pressed: false };
            gameInfo.yellowPausers.push(yellowPauser);
            break;
        }
        case 157: {
            let musicBox = {
                x,
                y,
                instrument: "xylophone",
                volume: 90,
                mode: "note",
                active: false,
                ended: false,
                delay: 5,
                delayCounter: 0,
                notes: ["C4"],
                noteIndex: 0,
                noteOverride: "none",
                octaves: 1,
                tripletStart: -1,
                stepsPerMeasure: 0,
                onOne: false,
                chordTypeOrInterval: "?",
                chordsPlaced: false,
                part: "bottom",
                direction: "up",
                group: 1
            };
            gameInfo.musicBoxes.push(musicBox);
            break;
        }
        case 158: {
            let pistonTrigger = { x, y, pressed: false, group: 1 };
            gameInfo.pistonsTriggers.push(pistonTrigger);
            break;
        }
        case 159:
        case 161:
        case 163:
        case 165: {
            const direction = objectNumberToDirection(objectNumber);
            let piston = { x, y, activated: false, sticky: false, inverted: false, direction, mode: "toggle", group: 1 };
            gameInfo.pistons.push(piston);
            break;
        }
        case 167: {
            let delay = { x, y, count: 0, gameTicks: 3 };
            gameInfo.delays.push(delay);
            break;
        }
        case 170: {
            let teleport = {
                x,
                y,
                selfDestructing: true,
                color: getPurpleTeleportColor(),
                group: 1
            };
            gameInfo.teleports.push(teleport);
            break;
        }
        case 171: {
            let conveyorBelt = { x, y, mode: "notrigger", direction: "right", group: 1 };
            gameInfo.conveyorBelts.push(conveyorBelt);
            break;
        }
        case 178: {
            let mover = { x, y, direction: "right", activeSides: ["top"], mode: "all", inverted: false, counter: 0 };
            gameInfo.movers.push(mover);
            break;
        }
        case 198: {
            let disappearingStone = { x, y, status: 0, countDown: false, pattern: [5, 3], patternIndex: 0, patternCounter: 0, mode: "pattern", group: 1 };
            gameInfo.disappearingStones.push(disappearingStone);
            break;
        }
        case 200: {
            let whiteBallSynchroniser = { x, y, skip: false };
            gameInfo.whiteBallSynchronisers.push(whiteBallSynchroniser);
            break;
        }
        case 203: {
            let pinkBall = { x, y, delete: false, counter: 0 };
            gameInfo.pinkBalls.push(pinkBall);
            break;
        }
        case 206: {
            let waterWithIce = { x, y, status: 0, objectNumber: 20 };
            gameInfo.waterWithIceObjects.push(waterWithIce);
            break;
        }
        case 208: {
            let copier = { x, y, color: "yellow" };
            gameInfo.copiers.push(copier);
            break;
        }
        case 209: {
            let pusher = { x, y, direction: "right", mode: "onestep", keepMoving: false, movable: true, group: 1 };
            gameInfo.pushers.push(pusher);
            break;
        }
        case 241: {
            let questionStone = { x, y, question: "1+1", answer: "2", disappeared: false };
            gameInfo.questionStones.push(questionStone);
            break;
        }
        case 242:
        case 245: {
            const color = objectNumber === 242 ? "purple" : "white";
            let answerBall = { x, y, answer: "2", color, mode: "answerball", delete: false };
            gameInfo.answerBalls.push(answerBall);
            break;
        }
        case 243: {
            let fish = {
                x,
                y,
                xStart: x,
                yStart: y,
                maxDistX: 0,
                direction: Math.random() > 0.5 ? 6 : 4,
                palette: 2,
                shape: 2,
                tail: 2,
                fins: 3,
                stripes: 5,
                tailStripes: 0,
                eyePercentage: 50,
                pupilPercentage: 40,
                eyeOffsetX: 0,
                eyeOffsetY: -10,
                blocked: false,
                outOfWater: 0,
                isDead: false,
                counter: 0,
                answer: "fish"
            };
            gameInfo.tropicalFish.push(fish);
            break;
        }
        case 244: {
            let changer = {
                x,
                y,
                color1: "lightblue",
                color2: "white",
                horizontal: false,
                ready: true
            };
            gameInfo.changers.push(changer);
            break;
        }
        case 248: {
            let jellyfish = {
                x,
                y,
                time: 0,
                outOfWater: 0,
                isDead: false
            };
            gameInfo.jellyfish.push(jellyfish);
            break;
        }
        case 251: {
            let food = {
                x,
                y,
                floats: true,
                foodLeft: 8,
                counter: 0,
            };
            gameInfo.fishFood.push(food);
            break;
        }
        case 252: {
            let seaAnemone = {
                x,
                y,
                palette: 1,
                shape: 1
            };
            gameInfo.seaAnemones.push(seaAnemone);
            break;
        }
        case 253: {
            let brownBall = { x, y, delete: false, counter: 0 };
            gameInfo.brownBalls.push(brownBall);
            break;
        }
        case 255: {
            let detector = {
                x, y, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, 
                movable: true, condition: "", event: "", text: "", group: 1
            };
            gameInfo.detectors.push(detector);
            break;
        }
        case 257: {
            let flamethrower = { x, y, active: false, direction: "right", range: 3, display: "default", movable: true, group: 1 };
            gameInfo.flamethrowers.push(flamethrower);
            break;
        }
        default:
            break;
    }
    if (ignore) {
        return;
    }
    switch (objectNumber) {
        case 20:
        case 22:
        case 23:
        case 25:
        case 80:
        case 90:
        case 137:
        case 170:
        case 252:
        case 258:
            backData[y][x] = objectNumber;
            break;
        default:
            gameData[y][x] = objectNumber;
            if ([27, 243, 248, 249].includes(objectNumber)) {
                backData[y][x] = 23;
            }
            break;
    }
}

export function removeObject(backData, gameData, gameInfo, x, y, deleteBackData = false) {
    let list = null;
    let objectNumber = 0;
    let idx = -1;

    if (!gameData || !gameInfo) {
        return;
    }
    if ((x < 0) || (x >= gameData[0].length) || (y < 0) || (y >= gameData.length)) {
        return;
    }

    if (deleteBackData) {
        objectNumber = backData[y][x];
        list = getListByObjectNumber(gameInfo, objectNumber);
        if (list !== null) {
            idx = findElementByCoordinates(x, y, list);
            if (idx >= 0) {
                list.splice(idx, 1);
            }
        }
        backData[y][x] = 0;
    }

    objectNumber = gameData[y][x];
    list = getListByObjectNumber(gameInfo, objectNumber);
    if (list !== null) {
        idx = findElementByCoordinates(x, y, list);
        if (idx >= 0) {
            list.splice(idx, 1);
        }
    }
    switch (objectNumber) {
        case 2:
            if (gameInfo.blueBall1.x === x && gameInfo.blueBall1.y === y) {
                gameInfo.blueBall1.x = -1;
                gameInfo.blueBall1.y = -1;
            }
            if (gameInfo.blueBall2.x === x && gameInfo.blueBall2.y === y) {
                gameInfo.blueBall2.x = -1;
                gameInfo.blueBall2.y = -1;
            }
            gameInfo.blueBall = gameInfo.blueBall1;
            break;
        case 3:
            gameInfo.greenBalls -= 1;
            break;
        case 37:
            gameInfo.detonator.x = -1;
            gameInfo.detonator.y = -1;
            break;
        case 117:
            idx = findElementByCoordinates(x, y, gameInfo.timeBombs);
            if (idx >= 0) {
                gameInfo.timeBombs[idx].status = -1;
            }
            break;
        case 132:
            gameInfo.travelGate.x = -1;
            gameInfo.travelGate.y = -1;
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            switch (objectNumber) {
                case 159:
                    if (y > 0) {
                        if (gameData[y - 1][x] === 160) {
                            gameData[y - 1][x] = 0;
                        }
                    }
                    break;
                case 161:
                    if (y < (gameData.length - 1)) {
                        if (gameData[y + 1][x] === 162) {
                            gameData[y + 1][x] = 0;
                        }
                    }
                    break;
                case 163:
                    if (x > 0) {
                        if (gameData[y][x - 1] === 164) {
                            gameData[y][x - 1] = 0;
                        }
                    }
                    break;
                case 165:
                    if (x < (gameData[0].length - 1)) {
                        if (gameData[y][x + 1] === 166) {
                            gameData[y][x + 1] = 0;
                        }
                    }
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    gameData[y][x] = 0;
}