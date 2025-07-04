export function getGameInfo(backData, gameData) {
    let result = {};
    initGameInfo(result);
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData[i].length; j++) {
            switch (gameData[i][j]) {
                case 2:
                    result.blueBall.x = j;
                    result.blueBall.y = i;
                    break;
                case 3:
                    result.greenBalls++;
                    break;
                case 37:
                    result.detonator.x = j;
                    result.detonator.y = i;
                    break;
                case 39:
                    result.elevatorInOuts.push({ x: j, y: i, player: false, status: 0 });
                    break;
                case 8:
                case 93:
                case 94:
                    {
                        let redBall = { x: j, y: i };
                        switch (gameData[i][j]) {
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
                        result.redBalls.push(redBall);
                        break;
                    }
                case 106:
                case 6: {
                    let elevator = {
                        x: j,
                        y: i,
                        up: gameData[i][j] === 106
                    };
                    result.elevators.push(elevator);
                    break;
                }
                case 107:
                case 7: {
                    let elevator = {
                        x: j,
                        y: i,
                        right: gameData[i][j] === 107
                    };
                    result.horizontalElevators.push(elevator);
                    break;
                }
                case 9: {
                    let yellowBall = {
                        x: j,
                        y: i,
                        direction: "none"
                    };
                    result.yellowBalls.push(yellowBall);
                    break;
                }
                case 40: {
                    let orangeBall = {
                        x: j,
                        y: i,
                        direction: "none"
                    };
                    result.orangeBalls.push(orangeBall);
                    break;
                }
                case 31:
                case 92: {
                    let teleport = {
                        x: j,
                        y: i,
                        selfDestructing: gameData[i][j] === 92
                    };
                    result.teleports.push(teleport);
                    break;
                }
                case 95:
                case 96:
                    result.hasMirror = true;
                    break;
                case 27: {
                    let fish = {
                        x: j,
                        y: i,
                        direction: Math.random() > 0.5 ? 6 : 4,
                        isDead: false
                    };
                    result.redFish.push(fish);
                    break;
                }
                case 91: {
                    let elec = { x: j, y: i };
                    result.electricity.push(elec);
                    break;
                }
                case 12: {
                    let damagedStone = {
                        x: j,
                        y: i,
                        status: 0
                    };
                    result.damagedStones.push(damagedStone);
                    break;
                }
                case 13: {
                    let trap = {
                        x: j,
                        y: i,
                        status: 0
                    };
                    result.trapDoors.push(trap);
                    break;
                }
                case 97: {
                    let copier = { x: j, y: i };
                    result.copiers.push(copier);
                    break;
                }
                case 109: {
                    let force = { x: j, y: i, direction: 8 };
                    result.forces.push(force);
                    break;
                }
                case 110: {
                    let force = { x: j, y: i, direction: 2 };
                    result.forces.push(force);
                    break;
                }
                case 111: {
                    let force = { x: j, y: i, direction: 6 };
                    result.forces.push(force);
                    break;
                }
                case 112: {
                    let force = { x: j, y: i, direction: 4 };
                    result.forces.push(force);
                    break;
                }
                case 115: {
                    let yellowBallPusher = { x: j, y: i };
                    result.yellowBallPushers.push(yellowBallPusher);
                    break;
                }
                case 116:
                    result.yellowBallPushersTrigger.x = j;
                    result.yellowBallPushersTrigger.y = i;
                    break;
                case 117: {
                    let timeBomb = { x: j, y: i, status: -1 };
                    result.timeBombs.push(timeBomb);
                    break;
                }
                case 119: {
                    let magnet = { x: j, y: i };
                    result.magnets.push(magnet);
                    break;
                }
                case 121:
                case 124: {
                    let yellowBar = {
                        x: j,
                        y: i,
                        direction: "none"
                    };
                    result.yellowBars.push(yellowBar);
                    break;
                }
                case 131:
                    result.yellowStopper.x = j;
                    result.yellowStopper.y = i;
                    break;
                case 132:
                    result.travelGate.x = j;
                    result.travelGate.y = i;
                    result.hasTravelGate = true;
                    break;
                case 136:
                    result.yellowPauser.x = j;
                    result.yellowPauser.y = i;
                    break;
                case 157: {
                    let musicBox = { x: j, y: i, notes: ["C4"], noteIndex: 0, instrument: "", volume: 90 };
                    result.musicBoxes.push(musicBox);
                    break;
                }
                case 158: {
                    let pistonTrigger = { x: j, y: i, pressed: false, group: 1 };
                    result.pistonsTriggers.push(pistonTrigger);
                    break;
                }
                case 159:
                case 161:
                case 163:
                case 165: {
                    let direction = "up";
                    switch (gameData[i][j]) {
                        case 159:
                            direction = "up";
                            break;
                        case 161:
                            direction = "down";
                            break;
                        case 163:
                            direction = "left";
                            break;
                        case 165:
                            direction = "right";
                            break;
                        default:
                            break;
                    }
                    let piston = { x: j, y: i, activated: false, sticky: false, direction: direction, mode: "normal", group: 1 };
                    result.pistons.push(piston);
                    result.hasPiston = true;
                    break;
                }
                case 167: {
                    let delay = { x: j, y: i, count: 0};
                    result.delays.push(delay);
                    break;
                }
                default:
                    break;
            }
            if (backData[i][j] === 20 || backData[i][j] === 23 || gameData[i][j] === 113 || gameData[i][j] === 114) {
                result.hasWater = true;
            }
        }
    }
    return result;
}

export function initGameInfo(info) {
    info.blueBall = { x: -1, y: -1 };
    info.copiers = [];
    info.damagedStones = [];
    info.delays = [];
    info.detonator = { x: -1, y: -1 };
    info.electricity = [];
    info.electricityActive = false;
    info.elevatorInOuts = [];
    info.elevators = [];
    info.forces = [];
    info.greenBalls = 0;
    info.hasCoilSpring = false;
    info.hasDivingGlasses = false;
    info.hasKey = false;
    info.hasLadder = false;
    info.hasMirror = false;
    info.hasPickaxe = false;
    info.hasPiston = false;
    info.hasPropeller = false;
    info.hasTelekineticPower = false;
    info.hasTravelGate = false;
    info.hasWater = false;
    info.hasWeakStone = false;
    info.horizontalElevators = [];
    info.magnets = [];
    info.musicBoxes = [];
    info.orangeBalls = [];
    info.pistons = [];
    info.pistonsTriggers = [];
    info.redBalls = [];
    info.redFish = [];
    info.teleports = [];
    info.timeBombs = [];
    info.trapDoors = [];
    info.travelGate = { x: -1, y: -1 };
    info.yellowBalls = [];
    info.yellowBallPushers = [];
    info.yellowBallPushersTrigger = { x: -1, y: -1 };
    info.yellowBars = [];
    info.yellowPauser = { x: -1, y: -1 };
    info.yellowStopper = { x: -1, y: -1 };
}

export function initGameVars(vars) {
    vars.ballPushersActive = false;
    vars.bgcolor = [];
    vars.currentLevel = 200;
    vars.elecActiveSaved = false;
    vars.electricityCounter = 0;
    vars.elevatorCounter = 0;
    vars.explosionCounter = 0;
    vars.fgcolor = [];
    vars.fishCounter = 0;
    vars.fishCountTo = 12;
    vars.gameOver = false;
    vars.gateTravelling = 0;
    vars.hint = "";
    vars.laser = null;
    vars.orangeCounter = 0;
    vars.pistonsActivated = [];
    for (let i = 0; i < 10; i++) {
        vars.pistonsActivated.push(false);
    }
    vars.pistonsRepeatFastModeActive = false;
    vars.pistonsRepeatFastModeCounter = 0;
    vars.pistonsRepeatFastModeCountTo = 15;
    vars.pistonsRepeatSlowModeActive = false;
    vars.pistonsRepeatSlowModeCounter = 0;
    vars.pistonsRepeatSlowModeCountTo = 1;
    vars.redCounter = 0;
    vars.refreshCounter = 0;
    vars.refreshCountTo = 12;
    vars.skipFalling = 0;
    vars.soundLava = "default";
    vars.startlevelmessage = "";
    vars.teleporting = 0;
    vars.timeFreezer = 0;
    vars.wave1 = 0;
    vars.wave2 = 0;
    vars.yellowCounter = 0;
    vars.yellowPaused = false;
    vars.yellowPauserActive = false;
    vars.yellowStopperActive = false;
    vars.yellowSlowCounter = 0;
}

