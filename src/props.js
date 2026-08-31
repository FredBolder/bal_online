import { answerBallModes } from "./answerBalls.js";
import { changerDirections } from "./changers.js";
import { getGameDataValue } from "./balUtils.js";
import { conveyorBeltDirections, conveyorBeltModes } from "./conveyorBelts.js";
import { detectorDisplayModes, detectorMaxRange, detectorModes, detectorTargets } from "./detectors.js";
import { elevatorDirections, horizontalElevatorDirections } from "./elevators.js";
import { moverDirections, moverModes } from "./movers.js";
import { musicBoxDirections, musicBoxModes } from "./musicBoxes.js";
import { pistonModes } from "./pistons.js";
import { pusherDirections, pusherModes } from "./pushers.js";

export function setProp(gameData, gameInfo, x, y, prop, value, message) {
    let error = false;
    let found = false;
    let isAnswerBall = false;
    let isChanger = false;
    let isConveyorBelt = false;
    let isDetector = false;
    let isElevator = false;
    let isHorizontalElevator = false;
    let isMover = false;
    let isMusicBox = false;
    let isPiston = false;
    let isPistonsTrigger = false;
    let isPusher = false;
    let isQuestionStone = false;
    let isTeleport = false;
    let isTropicalFish = false;
    let list = "";
    let msg = "";
    let objectName = "";

    const objectNumber = getGameDataValue(gameData, x, y);

    switch (objectNumber) {
        case 6:
        case 106:
            isElevator = true;
            objectName = "elevator";
            break;
        case 7:
        case 107:
            isHorizontalElevator = true;
            objectName = "horizontal elevator";
            break;
        case 31:
        case 92:
        case 170:
            isTeleport = true;
            objectName = "teleport";
            break;
        case 157:
            isMusicBox = true;
            objectName = "music box";
            break;
        case 158:
            isPistonsTrigger = true;
            objectName = "pistons trigger";
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            isPiston = true;
            objectName = "piston";
            break;
        case 171:
            isConveyorBelt = true;
            objectName = "conveyor belt";
            break;
        case 178:
            isMover = true;
            objectName = "mover";
            break;
        case 209:
            isPusher = true;
            objectName = "pusher";
            break;
        case 241:
            isQuestionStone = true;
            objectName = "question stone";
            break;
        case 242:
        case 245:
            isAnswerBall = true;
            objectName = "answer ball";
            break;
        case 243:
            isTropicalFish = true;
            objectName = "tropical fish";
            break;
        case 244:
            isChanger = true;
            objectName = "changer";
            break;
        case 255:
            isDetector = true;
            objectName = "detector";
            break;
        default:
            break;
    }

    // Check value
    switch (prop) {
        case "answer":
        case "question":
        case "text":
        case "value":
            if (typeof value !== "string") {
                error = true;
            }
            break;
        case "group":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            if ((value < 1) || (value > 32)) {
                error = true;
            }
            break;
        case "inverted":
        case "movable":
        case "oneTime":
        case "sequence":
        case "sticky":
            if (typeof value !== "boolean") {
                error = true;
            }
            break;
        case "direction":
            if (typeof value !== "string") {
                error = true;
                break;
            }
            if (isChanger && !changerDirections().includes(value)) {
                error = true;
            }
            if (isConveyorBelt && !conveyorBeltDirections().includes(value)) {
                error = true;
            }
            if (isElevator && !elevatorDirections().includes(value)) {
                error = true;
            }
            if (isHorizontalElevator && !horizontalElevatorDirections().includes(value)) {
                error = true;
            }
            if (isMover && !moverDirections().includes(value)) {
                error = true;
            }
            if (isMusicBox && !musicBoxDirections().includes(value)) {
                error = true;
            }
            if (isPusher && !pusherDirections().includes(value)) {
                error = true;
            }
            break;
        case "display":
            if (typeof value !== "string") {
                error = true;
                break;
            }
            if (isDetector && !detectorDisplayModes().includes(value)) {
                error = true;
            }
            break;
        case "mode":
            if (typeof value !== "string") {
                error = true;
                break;
            }
            if (isAnswerBall && !answerBallModes().includes(value)) {
                error = true;
            }
            if (isConveyorBelt && !conveyorBeltModes().includes(value)) {
                error = true;
            }
            if (isDetector && !detectorModes().includes(value)) {
                error = true;
            }
            if (isMover && !moverModes().includes(value)) {
                error = true;
            }
            if (isMusicBox && !musicBoxModes().includes(value)) {
                error = true;
            }
            if (isPiston && !pistonModes().includes(value)) {
                error = true;
            }
            if (isPusher && !pusherModes().includes(value)) {
                error = true;
            }
            break;
        case "range":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            if ((value < 1) || (value > detectorMaxRange)) {
                error = true;
            }
            break;
        case "target":
            if (typeof value !== "string") {
                error = true;
                break;
            }
            if (isDetector && !detectorTargets().includes(value)) {
                error = true;
            }
            break;
        default:
            break;
    }
    if (error) {
        if (message) {
            msg = `Invalid value ${value} for `;
            if (objectName !== "") {
                msg += objectName + " ";
            }
            msg += `property ${prop}`;
        }
        return msg;
    }

    if (isChanger && prop === "direction") {
        prop = "horizontal";
        value = (value === "horizontal");
        list = "changers";
    }

    if (isElevator && prop === "direction") {
        prop = "up";
        value = (value === "up");
        if (value) {
          gameData[y][x] = 106;
        } else {
          gameData[y][x] = 6;
        }        
        list = "elevators";
    }

    if (isHorizontalElevator && prop === "direction") {
        prop = "right";
        value = (value === "right");
        if (value) {
          gameData[y][x] = 107;
        } else {
          gameData[y][x] = 7;
        }        
        list = "horizontalElevators";
    }

    if (isAnswerBall && ["answer", "mode"].includes(prop)) {
        list = "answerBalls";
    }
    if (isConveyorBelt && ["direction", "group", "mode"].includes(prop)) {
        list = "conveyorBelts";
    }
    if (isDetector && ["display", "group", "movable", "mode", "oneTime", "range", "sequence", "target", "text", "value"].includes(prop)) {
        list = "detectors";
    }
    if (isMover && ["direction", "inverted", "mode"].includes(prop)) {
        list = "movers";
    }
    if (isMusicBox && ["direction", "group", "mode"].includes(prop)) {
        list = "musicBoxes";
    }
    if (isPiston && ["group", "inverted", "mode", "sticky"].includes(prop)) {
        list = "pistons";
    }
    if (isPistonsTrigger && ["group"].includes(prop)) {
        list = "pistonsTriggers";
    }
    if (isPusher && ["direction", "group", "mode", "movable"].includes(prop)) {
        list = "pushers";
    }
    if (isQuestionStone && ["answer", "question"].includes(prop)) {
        list = "questionStones";
    }
    if (isTeleport && ["group"].includes(prop)) {
        list = "teleports";
    }
    if (isTropicalFish && ["answer"].includes(prop)) {
        list = "tropicalFish";
    }

    if (list !== "") {
        for (let j = 0; j < gameInfo[list].length; j++) {
            const obj = gameInfo[list][j];
            if (obj.x === x && obj.y === y) {
                obj[prop] = value;
                found = true;
                break;
            }
        }
    }

    if (!found && message) {
        msg = `Property ${prop} does not exist on object.`;
    }
    return msg;
}