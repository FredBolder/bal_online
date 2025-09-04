import { findElementByCoordinates } from "./balUtils.js";
import { getPurpleTeleportColor } from "./teleports.js";

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
                    // Purple teleports (170) are in backData
                    let teleport = {
                        x: j,
                        y: i,
                        selfDestructing: gameData[i][j] === 92,
                        color: "white",
                        group: 1
                    };
                    result.teleports.push(teleport);
                    break;
                }
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
                    let force = { x: j, y: i, direction: "up" };
                    result.forces.push(force);
                    break;
                }
                case 110: {
                    let force = { x: j, y: i, direction: "down" };
                    result.forces.push(force);
                    break;
                }
                case 111: {
                    let force = { x: j, y: i, direction: "right" };
                    result.forces.push(force);
                    break;
                }
                case 112: {
                    let force = { x: j, y: i, direction: "left" };
                    result.forces.push(force);
                    break;
                }
                case 115: {
                    let yellowBallPusher = { x: j, y: i };
                    result.yellowBallPushers.push(yellowBallPusher);
                    break;
                }
                case 116: {
                    let yellowBallPushersTrigger = { x: j, y: i, pressed: false };
                    result.yellowBallPushersTriggers.push(yellowBallPushersTrigger);
                    break;
                }
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
                case 131: {
                    let yellowStopper = { x: j, y: i, pressed: false };
                    result.yellowStoppers.push(yellowStopper);
                    break;
                }
                case 132:
                    result.travelGate.x = j;
                    result.travelGate.y = i;
                    result.hasTravelGate = true;
                    break;
                case 136: {
                    let yellowPauser = { x: j, y: i, pressed: false };
                    result.yellowPausers.push(yellowPauser);
                    break;
                }
                case 157: {
                    let musicBox = { x: j, y: i, instrument: "xylophone", volume: 90, mode: "note", active: false, delay: 5, delayCounter: 0, notes: ["C4"], noteIndex: 0, part: "bottom", group: 1 };
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
                    let piston = { x: j, y: i, activated: false, sticky: false, inverted: false, direction: direction, mode: "toggle", group: 1 };
                    result.pistons.push(piston);
                    break;
                }
                case 167: {
                    let delay = { x: j, y: i, count: 0, gameTicks: 3 };
                    result.delays.push(delay);
                    break;
                }
                case 171: {
                    let conveyorBelt = { x: j, y: i, mode: "notrigger", direction: "right", group: 1 };
                    result.conveyorBelts.push(conveyorBelt);
                    break;
                }
                case 178: {
                    let mover = { x: j, y: i, direction: "right" };
                    result.movers.push(mover);
                    break;
                }
                default:
                    break;
            }
            switch (backData[i][j]) {
                case 170: {
                    // The other teleports (31 and 92) are in gameData
                    let teleport = {
                        x: j,
                        y: i,
                        selfDestructing: true,
                        color: getPurpleTeleportColor(),
                        group: 1
                    };
                    result.teleports.push(teleport);
                    break;
                }
                default:
                    break;
            }
        }
    }
    return result;
}

export function getInfoByCoordinates(backData, gameData, gameInfo, x, y, all) {
    let backInfo = "";
    let extraBackInfo = "Additional object information not found!";
    let extraInfo = "Additional object information not found!";
    let firstNote = "";
    let idx = -1;
    let info = "";
    let obj = null;
    let result = "";

    if (all) {
        switch (backData[y][x]) {
            case 20:
                backInfo = "Water surface";
                break;
            case 23:
                backInfo = "Water";
                break;
            case 25:
                backInfo = "Ladder";
                break;
            case 80:
                backInfo = "Horizontal rope";
                break;
            case 90:
                backInfo = "Horizontal ladder";
                break;
            case 137:
                backInfo = "Vertical rope";
                break;
            case 170:
                idx = findElementByCoordinates(x, y, gameInfo.teleports);
                if (idx >= 0) {
                    obj = gameInfo.teleports[idx];
                    extraBackInfo = `Self-destructing: ${obj.selfDestructing}, Color: ${obj.color}, group: ${obj.group}`;
                }
                backInfo = `Purple self-destructing teleport, ` + extraBackInfo;
                break;
            default:
                backInfo = "";
                break;
        }
    }

    switch (gameData[y][x]) {
        case 157:
            idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
            if (idx >= 0) {
                firstNote = "none";
                obj = gameInfo.musicBoxes[idx];
                if (obj.notes.length > 0) {
                    firstNote = obj.notes[0];
                }
                extraInfo = `Instrument: ${obj.instrument}, Volume: ${obj.volume}, Mode: ${obj.mode}, Active: ${obj.active}, Delay: ${obj.delay}, Number of notes: ${obj.notes.length}, First note: ${firstNote}, Note index: ${obj.noteIndex}, Part: ${obj.part}, Group: ${obj.group}`;
            }
            info = `Music box, ` + extraInfo;
            break;
        case 158:
            idx = findElementByCoordinates(x, y, gameInfo.pistonsTriggers);
            if (idx >= 0) {
                obj = gameInfo.pistonsTriggers[idx];
                extraInfo = `Pressed: ${obj.pressed}, Group: ${obj.group}`;
            }
            info = `Pistons trigger, ` + extraInfo;
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            idx = findElementByCoordinates(x, y, gameInfo.pistons);
            if (idx >= 0) {
                obj = gameInfo.pistons[idx];
                extraInfo = `Activated: ${obj.activated}, Group: ${obj.group}, Direction: ${obj.direction}, Mode: ${obj.mode}, Sticky: ${obj.sticky}, Inverted: ${obj.inverted}`;
            }
            info = `Piston, ` + extraInfo;
            break;
        case 167:
            idx = findElementByCoordinates(x, y, gameInfo.delays);
            if (idx >= 0) {
                obj = gameInfo.delays[idx];
                extraInfo = `Game ticks: ${obj.gameTicks}`;
            }
            info = `Delay, ` + extraInfo;
            break;
        case 171:
            idx = findElementByCoordinates(x, y, gameInfo.conveyorBelts);
            if (idx >= 0) {
                obj = gameInfo.conveyorBelts[idx];
                extraInfo = `Direction: ${obj.direction}, Mode: ${obj.mode}, Group: ${obj.group}`;
            }
            info = `Conveyor belt, ` + extraInfo;
            break;
        case 178:
            idx = findElementByCoordinates(x, y, gameInfo.movers);
            if (idx >= 0) {
                obj = gameInfo.movers[idx];
                extraInfo = `Direction: ${obj.direction}`;
            }
            info = `Mover, ` + extraInfo;
            break;
        default:
            if (all) {
                switch (gameData[y][x]) {
                    case 1:
                        info = `Stone`;
                        break;
                    case 2:
                        info = `Blue ball (player)`;
                        break;
                    case 3:
                        info = `Small green ball`;
                        break;
                    case 4:
                        info = `White ball`;
                        break;
                    case 5:
                        info = `Light blue ball`;
                        break;
                    case 6:
                    case 106:
                        idx = findElementByCoordinates(x, y, gameInfo.elevators);
                        if (idx >= 0) {
                            obj = gameInfo.elevators[idx];
                            extraInfo = `Up: ${obj.up}`;
                        }
                        info = `Elevator, ` + extraInfo;
                        break;
                    case 7:
                    case 107:
                        idx = findElementByCoordinates(x, y, gameInfo.horizontalElevators);
                        if (idx >= 0) {
                            obj = gameInfo.horizontalElevators[idx];
                            extraInfo = `Right: ${obj.right}`;
                        }
                        info = `Horizontal elevator, ` + extraInfo;
                        break;
                    case 8:
                    case 93:
                    case 94:
                        idx = findElementByCoordinates(x, y, gameInfo.redBalls);
                        if (idx >= 0) {
                            obj = gameInfo.redBalls[idx];
                            extraInfo = `Smart: ${obj.smart}, Direction: ${obj.direction}, Skip elevator count: ${obj.skipElevatorCount}, Skip follow count: ${obj.skipFollowCount}`;
                        }
                        info = `Red ball, ` + extraInfo;
                        break;
                    case 9:
                        idx = findElementByCoordinates(x, y, gameInfo.yellowBalls);
                        if (idx >= 0) {
                            obj = gameInfo.yellowBalls[idx];
                            extraInfo = `Direction: ${obj.direction}`;
                        }
                        info = `Yellow ball, ` + extraInfo;
                        break;
                    case 10:
                        info = `One direction port right`;
                        break;
                    case 11:
                        info = `One direction port left`;
                        break;
                    case 12:
                        idx = findElementByCoordinates(x, y, gameInfo.damagedStones);
                        if (idx >= 0) {
                            obj = gameInfo.damagedStones[idx];
                            extraInfo = `Status: ${obj.status}`;
                        }
                        info = `Damaged stone, ` + extraInfo;
                        break;
                    case 13:
                        idx = findElementByCoordinates(x, y, gameInfo.trapDoors);
                        if (idx >= 0) {
                            obj = gameInfo.trapDoors[idx];
                            extraInfo = `Status: ${obj.status}`;
                        }
                        info = `Trap door, ` + extraInfo;
                        break;
                    case 14:
                        info = `Trap door half open`;
                        break;
                    case 15:
                        info = `Triangle stone bottom left`;
                        break;
                    case 16:
                        info = `Triangle stone bottom right`;
                        break;
                    case 17:
                        info = `Triangle stone top left`;
                        break;
                    case 18:
                        info = `Triangle stone top right`;
                        break;
                    case 21:
                        info = `Palm tree trunk part`;
                        break;
                    case 22:
                        info = `Lava`;
                        break;
                    case 24:
                        info = `Panagiotis (creator of this level)`;
                        break;
                    case 26:
                        info = `Diving glasses`;
                        break;
                    case 27:
                        idx = findElementByCoordinates(x, y, gameInfo.redFish);
                        if (idx >= 0) {
                            obj = gameInfo.redFish[idx];
                            extraInfo = `Direction: ${obj.direction}, Dead: ${obj.isDead}`;
                        }
                        info = `Red fish, ` + extraInfo;
                        break;
                    case 28:
                        info = `Purple ball`;
                        break;
                    case 29:
                        info = `Key`;
                        break;
                    case 30:
                        info = `Locked door`;
                        break;
                    case 31:
                        idx = findElementByCoordinates(x, y, gameInfo.teleports);
                        if (idx >= 0) {
                            obj = gameInfo.teleports[idx];
                            extraInfo = `Self-destructing: ${obj.selfDestructing}, Color: ${obj.color}, group: ${obj.group}`;
                        }
                        info = `Teleport, ` + extraInfo;
                        break;
                    case 34:
                        info = `Pickaxe`;
                        break;
                    case 35:
                        info = `Weak stone`;
                        break;
                    case 36:
                        info = `Bomb`;
                        break;
                    case 37:
                        info = `Detonator`;
                        break;
                    case 38:
                        info = `Explosion`;
                        break;
                    case 39:
                        idx = findElementByCoordinates(x, y, gameInfo.elevatorInOuts);
                        if (idx >= 0) {
                            obj = gameInfo.elevatorInOuts[idx];
                            extraInfo = `Player: ${obj.player}, Status: ${obj.status}`;
                        }
                        info = `Elevator entrance and exit, ` + extraInfo;
                        break;
                    case 40:
                        idx = findElementByCoordinates(x, y, gameInfo.orangeBalls);
                        if (idx >= 0) {
                            obj = gameInfo.orangeBalls[idx];
                            extraInfo = `Direction: ${obj.direction}`;
                        }
                        info = `Orange ball, ` + extraInfo;
                        break;
                    case 81:
                        info = `Propeller`;
                        break;
                    case 82:
                        info = `Gray ball one move`;
                        break;
                    case 83:
                        info = `Gray ball`;
                        break;
                    case 84:
                        info = `Direction changer 1`;
                        break;
                    case 85:
                        info = `Direction changer 2`;
                        break;
                    case 86:
                        info = `Direction changer 3`;
                        break;
                    case 87:
                        info = `One direction port up`;
                        break;
                    case 88:
                        info = `One direction port down`;
                        break;
                    case 89:
                        info = `Game rotator right`;
                        break;
                    case 91:
                        info = `Electricity`;
                        break;
                    case 92:
                        idx = findElementByCoordinates(x, y, gameInfo.teleports);
                        if (idx >= 0) {
                            obj = gameInfo.teleports[idx];
                            extraInfo = `Self-destructing: ${obj.selfDestructing}, Color: ${obj.color}, group: ${obj.group}`;
                        }
                        info = `Self-destructing teleport, ` + extraInfo;
                        break;
                    case 95:
                        info = `Mirror 1`;
                        break;
                    case 96:
                        info = `Mirror 2`;
                        break;
                    case 97:
                        info = `Copier`;
                        break;
                    case 98:
                        info = `Gray ball two moves`;
                        break;
                    case 99:
                        info = `Small weak stone`;
                        break;
                    case 100:
                        info = `Purple bar left`;
                        break;
                    case 101:
                        info = `Purple bar right`;
                        break;
                    case 102:
                        info = `Purple bar middle`;
                        break;
                    case 103:
                        info = `Purple bar top`;
                        break;
                    case 104:
                        info = `Purple bar bottom`;
                        break;
                    case 105:
                        info = `Light bulb`;
                        break;
                    case 108:
                        info = `Small ladder`;
                        break;
                    case 109:
                    case 110:
                    case 111:
                    case 112:
                        idx = findElementByCoordinates(x, y, gameInfo.forces);
                        if (idx >= 0) {
                            obj = gameInfo.forces[idx];
                            extraInfo = `Direction: ${obj.direction}`;
                        }
                        info = `Force, ` + extraInfo;
                        break;
                    case 113:
                        info = `Water surface right`;
                        break;
                    case 114:
                        info = `Water surface left`;
                        break;
                    case 115:
                        info = `Yellow pusher`;
                        break;
                    case 116:
                        idx = findElementByCoordinates(x, y, gameInfo.yellowBallPushersTriggers);
                        if (idx >= 0) {
                            obj = gameInfo.yellowBallPushersTriggers[idx];
                            extraInfo = `Pressed: ${obj.pressed}`;
                        }
                        info = `Yellow pushers trigger, ` + extraInfo;
                        break;
                    case 117:
                        idx = findElementByCoordinates(x, y, gameInfo.timeBombs);
                        if (idx >= 0) {
                            obj = gameInfo.timeBombs[idx];
                            extraInfo = `Status: ${obj.status}`;
                        }
                        info = `Time bomb, ` + extraInfo;
                        break;
                    case 118:
                        info = `Coil spring`;
                        break;
                    case 119:
                        info = `Magnet`;
                        break;
                    case 120:
                        info = `Time freezer`;
                        break;
                    case 121:
                    case 124:
                        idx = findElementByCoordinates(x, y, gameInfo.yellowBars);
                        if (idx >= 0) {
                            obj = gameInfo.yellowBars[idx];
                            extraInfo = `Direction: ${obj.direction}`;
                        }
                        info = `Yellow bar, ` + extraInfo;
                        break;
                    case 122:
                        info = `Yellow bar right`;
                        break;
                    case 123:
                        info = `Yellow bar middle`;
                        break;
                    case 125:
                        info = `Yellow bar bottom`;
                        break;
                    case 126:
                        info = `Light blue bar left`;
                        break;
                    case 127:
                        info = `Light blue bar right`;
                        break;
                    case 128:
                        info = `Light blue bar middle`;
                        break;
                    case 129:
                        info = `Light blue bar top`;
                        break;
                    case 130:
                        info = `Light blue bar bottom`;
                        break;
                    case 131:
                        idx = findElementByCoordinates(x, y, gameInfo.yellowStoppers);
                        if (idx >= 0) {
                            obj = gameInfo.yellowStoppers[idx];
                            extraInfo = `Pressed: ${obj.pressed}`;
                        }
                        info = `Yellow stopper, ` + extraInfo;
                        break;
                    case 132:
                        info = `Travel gate`;
                        break;
                    case 133:
                        info = `Yellow diamant`;
                        break;
                    case 134:
                        info = `Blue diamant`;
                        break;
                    case 135:
                        info = `Red diamant`;
                        break;
                    case 136:
                        idx = findElementByCoordinates(x, y, gameInfo.yellowPausers);
                        if (idx >= 0) {
                            obj = gameInfo.yellowPausers[idx];
                            extraInfo = `Pressed: ${obj.pressed}`;
                        }
                        info = `Yellow pauser, ` + extraInfo;
                        break;
                    case 138:
                        info = `Direction changer 4`;
                        break;
                    case 139:
                        info = `Direction changer 5`;
                        break;
                    case 140:
                        info = `Small silver ball`;
                        break;
                    case 141:
                        info = `Quarter circle stone bottom left`;
                        break;
                    case 142:
                        info = `Quarter circle stone bottom right`;
                        break;
                    case 143:
                        info = `Quarter circle stone top left`;
                        break;
                    case 144:
                        info = `Quarter circle stone top right`;
                        break;
                    case 145:
                        info = `Half stone left`;
                        break;
                    case 146:
                        info = `Half stone right`;
                        break;
                    case 147:
                        info = `Half stone top`;
                        break;
                    case 148:
                        info = `Half stone bottom`;
                        break;
                    case 149:
                        info = `Quarter stone bottom left`;
                        break;
                    case 150:
                        info = `Quarter stone bottom right`;
                        break;
                    case 151:
                        info = `Quarter stone top left`;
                        break;
                    case 152:
                        info = `Quarter stone top right`;
                        break;
                    case 153:
                        info = `Stone pattern 1`;
                        break;
                    case 154:
                        info = `Stone pattern 2`;
                        break;
                    case 155:
                        info = `Yellow ball synchroniser`;
                        break;
                    case 156:
                        info = `Yellow slowdowner`;
                        break;
                    case 160:
                        info = `Piston up extended part`;
                        break;
                    case 162:
                        info = `Piston down extended part`;
                        break;
                    case 164:
                        info = `Piston left extended part`;
                        break;
                    case 166:
                        info = `Piston right extended part`;
                        break;
                    case 168:
                        info = `Small blue ball`;
                        break;
                    case 169:
                        info = `Door`;
                        break;
                    case 172:
                        info = `Conveyor belt middle`;
                        break;
                    case 173:
                        info = `Conveyor belt right`;
                        break;
                    case 174:
                        info = `Spike up`;
                        break;
                    case 175:
                        info = `Spike down`;
                        break;
                    case 176:
                        info = `Spike right`;
                        break;
                    case 177:
                        info = `Spike left`;
                        break;
                    case 179:
                        info = `Yellow star`;
                        break;
                    case 180:
                        info = `Blue star`;
                        break;
                    case 181:
                        info = `Silver star`;
                        break;
                    case 182:
                        info = `Red star`;
                        break;
                    case 183:
                        info = `Game rotator left`;
                        break;
                    case 184:
                        info = `Gravity changer up`;
                        break;
                    case 185:
                        info = `Gravity changer down`;
                        break;
                    default:
                        break;
                }
            }
            break;
    }

    if (backInfo !== "") {
        backInfo = "Background object: " + backInfo;
    }

    if (info !== "") {
        info = "Object: " + info;
    }

    if (all || (info !== "")) {
        if (info !== "") {
            info += ", ";
        }
        info += `Position: ${x}, ${y}`;
    }

    if (all) {
        if (backInfo !== "") {
            backInfo += "\n";
        }
        result = backInfo + info;
    } else {
        result = info;
    }
    return result;
}

export function initGameInfo(info) {
    info.blueBall1 = { x: -1, y: -1 };
    info.blueBall2 = { x: -1, y: -1 };
    info.blueBall = info.blueBall1;
    info.conveyorBelts = [];
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
    info.has = [];
    info.hasCoilSpring = false;
    info.hasDivingGlasses = false;
    info.hasKey = false;
    info.hasLadder = false;
    info.hasPickaxe = false;
    info.hasPropeller = false;
    info.hasTelekineticPower = false;
    info.hasTravelGate = false;
    info.hasWeakStone = false;
    info.horizontalElevators = [];
    info.magnets = [];
    info.movers = [];
    info.musicBoxes = [];
    info.orangeBalls = [];
    info.pistons = [];
    info.pistonsTriggers = [];
    info.player = 1;
    info.redBalls = [];
    info.redFish = [];
    info.teleports = [];
    info.timeBombs = [];
    info.trapDoors = [];
    info.travelGate = { x: -1, y: -1 };
    info.twoBlue = false;
    info.yellowBalls = [];
    info.yellowBallPushers = [];
    info.yellowBallPushersTriggers = [];
    info.yellowBars = [];
    info.yellowPausers = [];
    info.yellowStoppers = [];
}

export function initGameVars(vars) {
    vars.ballPushersActive = false;
    vars.bgcolor = [];
    vars.conveyorBeltAngleLeft = Math.PI * 2;
    vars.conveyorBeltAngleRight = 0;
    vars.conveyorBeltCounter = 0;
    vars.conveyorBeltCountTo = 5;
    vars.currentLevel = 200;
    vars.elecActiveSaved = false;
    vars.electricityCounter = 0;
    vars.elevatorCounter = 0;
    vars.elevatorCountTo = 5;
    vars.explosionCounter = 0;
    vars.fgcolor = [];
    vars.fishCounter = 0;
    vars.fishCountTo = 12;
    vars.gameOver = false;
    vars.gateTravelling = 0;
    vars.gravity = "down";
    vars.hint = "";
    vars.laser = null;
    vars.orangeCounter = 0;
    vars.pistonGroupsActivated = [];
    for (let i = 0; i < 32; i++) {
        vars.pistonGroupsActivated.push(false);
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
    vars.yellowSlowCounter = 0;
}

export function switchPlayer(gameInfo) {
    if (gameInfo.twoBlue) {
        if (gameInfo.player === 2) {
            gameInfo.player = 1;
        } else {
            gameInfo.player = 2;
        }
    } else {
        gameInfo.player = 1;
    }
    if (gameInfo.player === 2) {
        gameInfo.blueBall = gameInfo.blueBall2;
    } else {
        gameInfo.blueBall = gameInfo.blueBall1;
    }
}

