import { answerBallModes } from "./answerBalls.js";
import { changerDirections } from "./changers.js";
import { getGameDataValue } from "./balUtils.js";
import { conveyorBeltDirections, conveyorBeltModes } from "./conveyorBelts.js";
import { detectorDisplayModes, detectorMaxRange, detectorModes, detectorTargets } from "./detectors.js";
import { disappearingStoneModes } from "./disappearingStones.js";
import { elevatorDirections, horizontalElevatorDirections } from "./elevators.js";
import { flamethrowerDirections, flamethrowerDisplayModes, flamethrowerMaxRange } from "./flamethrowers.js";
import { lockedDoorColors } from "./lockedDoors.js";
import { moverDirections, moverModes } from "./movers.js";
import { musicBoxDirections, musicBoxModes } from "./musicBoxes.js";
import { objectNumberToObjectName } from "./objects.js"
import { pistonModes } from "./pistons.js";
import { pusherDirections, pusherModes } from "./pushers.js";
import { tropicalFishStripes, tropicalFishTailStripes } from "./tropicalFish.js";

export function setProp(gameData, gameInfo, x, y, prop, value, message) {
    let error = false;
    let found = false;
    let isAnswerBall = false;
    let isChanger = false;
    let isConveyorBelt = false;
    let isDetector = false;
    let isDisappearingStone = false;
    let isElevator = false;
    let isFlamethrower = false;
    let isForce = false;
    let isHorizontalElevator = false;
    let isKey = false;
    let isLockedDoor = false;
    let isMover = false;
    let isMusicBox = false;
    let isPiston = false;
    let isPistonsTrigger = false;
    let isPusher = false;
    let isQuestionStone = false;
    let isTeleport = false;
    let isTropicalFish = false;
    let list = "";
    let maxValue = 0;
    let msg = "";

    const objectNumber = getGameDataValue(gameData, x, y);
    const objectName = objectNumberToObjectName(objectNumber).toLowerCase();

    switch (objectNumber) {
        case 6:
        case 106:
            isElevator = true;
            break;
        case 7:
        case 107:
            isHorizontalElevator = true;
            break;
        case 29:
            isKey = true;
            break;    
        case 30:
            isLockedDoor = true;
            break;    
        case 31:
        case 92:
        case 170:
            isTeleport = true;
            break;
        case 109:
        case 110:
        case 111:
        case 112:
            isForce = true;
            break;
        case 157:
            isMusicBox = true;
            break;
        case 158:
            isPistonsTrigger = true;
            break;
        case 159:
        case 161:
        case 163:
        case 165:
            isPiston = true;
            break;
        case 171:
            isConveyorBelt = true;
            break;
        case 178:
            isMover = true;
            break;
        case 198:    
            isDisappearingStone = true;
            break;
        case 209:
            isPusher = true;
            break;
        case 241:
            isQuestionStone = true;
            break;
        case 242:
        case 245:
            isAnswerBall = true;
            break;
        case 243:
            isTropicalFish = true;
            break;
        case 244:
            isChanger = true;
            break;
        case 255:
            isDetector = true;
            break;
        case 257:
            isFlamethrower = true;
            break;
        default:
            break;
    }

    // Check value
    switch (prop) {
        case "answer":
        case "condition":
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
        case "color":
            if (typeof value !== "string") {
                error = true;
                break;
            }
            if ((isKey || isLockedDoor) && !lockedDoorColors().includes(value)) {
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
            if (isFlamethrower && !flamethrowerDirections().includes(value)) {
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
            if (isFlamethrower && !flamethrowerDisplayModes().includes(value)) {
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
            if (isDisappearingStone && !disappearingStoneModes().includes(value)) {
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
        case "eyeOffsetX":
        case "eyeOffsetY":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            if ((value < -50) || (value > 50)) {
                error = true;
            }
            break;
        case "eyePercentage":
        case "pupilPercentage":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            if ((value < 0) || (value > 100)) {
                error = true;
            }
            break;
        case "range":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            if (isDetector && ((value < 1) || (value > detectorMaxRange))) {
                error = true;
            }
            if (isFlamethrower && ((value < 1) || (value > flamethrowerMaxRange))) {
                error = true;
            }
            break;
        case "stripes":
        case "tailStripes":
            if (typeof value !== "number") {
                error = true;
                break;
            }
            maxValue = (prop === "stripes") ? tropicalFishStripes : tropicalFishTailStripes; 
            if ((value < 0) || (value > maxValue)) {
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
    if (isDetector && ["condition", "display", "group", "movable", "mode", "oneTime", "range", "sequence", "target", "text", "value"].includes(prop)) {
        list = "detectors";
    }
    if (isDisappearingStone && ["group", "mode"].includes(prop)) {
        list = "disappearingStones";
    }
    if (isForce && ["movable"].includes(prop)) {
        list = "forces";
    }
    if (isFlamethrower && ["direction", "display", "group", "movable", "range"].includes(prop)) {
        list = "flamethrowers";
    }
    if (isKey && ["color"].includes(prop)) {
        list = "keys";
    }
    if (isLockedDoor && ["color"].includes(prop)) {
        list = "lockedDoors";
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
    if (isTropicalFish && ["answer", "eyeOffsetX", "eyeOffsetY", "eyePercentage", "pupilPercentage",  "stripes", "tailStripes"].includes(prop)) {
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