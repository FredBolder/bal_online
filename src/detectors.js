import { addObject, removeObject } from "./addRemoveObject.js";
import { findElementByCoordinates, getGameDataValue, moveObjectInDirection } from "./balUtils.js";
import { checkSettings, loadLevelSettings } from "./levels.js";
import { isSpike, isStone } from "./objects.js";
import { rotateDirection } from "./rotateGame.js";
import { setTimeBombsTime } from "./timeBombs.js";
import { presetTropicalFish } from "./tropicalFish.js";
import { isOdd, randomInt, tryParseInt } from "./utils.js";

export const detectorMaxRange = 50;

export function command(backData, gameData, gameInfo, gameVars, xRef, yRef, commandLine, oneCommand) {
    let absX = 0;
    let absY = 0;
    let checkSettingsResult = "";
    const coordinatesList = [];
    let coordinatesMode = "";
    let direction = "";
    let fish = null;
    let flamethrower = null;
    let idx = -1;
    const intValues = [];
    let key = null;
    let lockedDoor = null;
    let objectNumber = 0;
    let pusher = null;
    let source = null;
    let stone = null;
    let ticks = 50;
    let yellowBall = null;
    let val_int = 0;
    let valid = false;
    let variable = "";
    const value = commandLine.trim();
    const values = value.split(",");
    const valuesLowerCase = [];
    let n1 = 0;
    let n2 = 0;
    let n3 = 0;
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

    if (value === "" || values.length < 1) {
        return;
    }

    if (value.startsWith("$")) {
        checkSettingsResult = checkSettings(gameData, [value]);
        if (checkSettingsResult === "") {
            loadLevelSettings(backData, gameData, gameInfo, gameVars, [value], false);
            setTimeBombsTime(gameVars.timeBombsTime);
        } else {
            console.log(checkSettingsResult);
        }
    }

    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].trim();
        valuesLowerCase.push(values[i].toLowerCase());
        val_int = tryParseInt(values[i], null);
        intValues.push(val_int);
    }
    const cmd = valuesLowerCase[0];

    if (cmd === "activateelectricity" && values.length === 2) {
        ticks = intValues[1];
        if ((ticks > 0) && (ticks <= 50)) {
            gameVars.electricityCounter = ticks;
            gameInfo.electricityActive = true;
        }
        return;
    }
    if (cmd === "addcolumns" || cmd === "addrows") {
        let addStones = false;
        n1 = 1;
        if (values.length >= 2 && intValues[1] !== null) {
            n1 = intValues[1];
        }
        if (values.length >= 3 && valuesLowerCase[2] === "yes") {
            addStones = true;
        }
        if (cmd === "addcolumns") {
            addColumns(backData, gameData, n1, addStones);
        } else {
            addRows(backData, gameData, n1, addStones);
        }
    }
    if (cmd === "changedirection" && values.length === 2) {
        commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], -1, -1);
        return;
    }
    if ((cmd === "dec" || cmd === "inc") && (values.length >= 2)) {
        n1 = null;
        n2 = null;
        n3 = null;
        source = gameVars;
        variable = valuesLowerCase[1];
        if (values.length >= 3 && intValues[2] !== null) {
            n1 = intValues[2];
        }
        if (values.length >= 4 && intValues[3] !== null) {
            n2 = intValues[3];
        }
        if (values.length >= 5 && intValues[4] !== null) {
            n3 = intValues[4];
        }
        if (cmd === "inc") {
            commandInc(source, variable, n1, n2, n3);
        } else {
            commandDec(source, variable, n1, n2, n3);
        }
        return;
    }
    if (cmd === "gameover") {
        gameVars.gameOver = true; 
        return;
    }
    if (cmd === "random" && values.length === 4) {
        source = gameVars;
        variable = valuesLowerCase[1];
        n1 = intValues[2];
        n2 = intValues[3];
        if (n1 === null || n2 === null) {
            return;
        }
        commandRandom(source, variable, n1, n2);
        return;
    }
    if (cmd === "rotateleft" && values.length === 2) {
        commandRotate(backData, gameData, gameInfo, valuesLowerCase[1], -1, -1, true);
        return;
    }
    if (cmd === "rotateright" && values.length === 2) {
        commandRotate(backData, gameData, gameInfo, valuesLowerCase[1], -1, -1, false);
        return;
    }

    if ((["changedirection", "create", "delete", "rotateleft", "rotateright"].includes(cmd) && values.length >= 5 && isOdd(values.length)) ||
        (cmd === "move" && values.length >= 6 && !isOdd(values.length)) ||
        (cmd === "startsong" && values.length >= 4 && !isOdd(values.length)) 
    ) {
        // changedirection, object name, {abs|rel|player}, x1, y1 [, x2, y2] 
        // changedirection, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        // create, object name, {abs|rel|player}, x1, y1 [, x2, y2] 
        // create, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        // delete, object name, {abs|rel|player}, x1, y1 [, x2, y2] 
        // delete, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        // move, object name, {abs|rel|player}, x1, y1 [, x2, y2], direction
        // move, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...], direction
        // rotateleft, object name, {abs|rel|player}, x1, y1 [, x2, y2] 
        // rotateleft, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        // rotateright, object name, {abs|rel|player}, x1, y1 [, x2, y2] 
        // rotateright, object name, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        // startsong, {abs|rel|player}, x1, y1 [, x2, y2] 
        // startsong, {abslist|rellist|playerlist}, x1, y1 [, x2, y2, ...]
        if (cmd === "move") {
            direction = valuesLowerCase[values.length - 1];
            if (!["left", "right", "up", "down"].includes(direction)) {
                return;
            }
        }
        const deltaIndex = (cmd === "startsong") ? -1 : 0;
        coordinatesMode = valuesLowerCase[2 + deltaIndex];
        if (!["abs", "rel", "player", "abslist", "rellist", "playerlist"].includes(coordinatesMode)) {
            return;
        }
        if (coordinatesMode === "abslist" || coordinatesMode === "rellist" || coordinatesMode === "playerlist") {
            n1 = Math.trunc((values.length - (3 + deltaIndex)) / 2);
            if (n1 < 1) {
                return;
            }
            for (let i = 0; i < n1; i++) {
                x1 = intValues[(3 + deltaIndex) + (i * 2)];
                y1 = intValues[(4 + deltaIndex) + (i * 2)];
                if (x1 === null || y1 === null) {
                    return;
                }
                coordinatesList.push({ x: x1, y: y1 });
            }
        } else {
            x1 = intValues[3 + deltaIndex];
            y1 = intValues[4 + deltaIndex];
            if (x1 === null || y1 === null) {
                return;
            }
            if (values.length >= (7 + deltaIndex)) {
                x2 = intValues[5 + deltaIndex];
                y2 = intValues[6 + deltaIndex];
                if (x2 === null || y2 === null) {
                    return;
                }
            } else {
                x2 = x1;
                y2 = y1;
            }

            // Swap if needed
            if (x1 > x2) {
                [x1, x2] = [x2, x1];
            }
            if (y1 > y2) {
                [y1, y2] = [y2, y1];
            }

            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    coordinatesList.push({ x, y });
                }
            }
        }

        for (let i = 0; i < coordinatesList.length; i++) {
            const x = coordinatesList[i].x;
            const y = coordinatesList[i].y;
            if (coordinatesMode === "abs" || coordinatesMode === "abslist") {
                absX = x;
                absY = y;
            } else if (coordinatesMode === "player" || coordinatesMode === "playerlist") {
                absX = gameInfo.blueBall.x + x;
                absY = gameInfo.blueBall.y + y;
            } else {
                absX = xRef + x;
                absY = yRef + y;
            }
            const obj = getGameDataValue(gameData, absX, absY);
            if (obj === -1) {
                continue;
            }
            const objBack = getGameDataValue(backData, absX, absY);
            if (objBack === -1) {
                continue;
            }

            const objName = valuesLowerCase[1];
            if ((cmd === "delete" || cmd === "move") && !objectPossible(cmd, objName, obj)) {
                continue;
            }

            if (valid && oneCommand) {
                break;
            }

            valid = true;

            if (cmd === "changedirection") {
                commandChangeDirection(gameData, gameInfo, valuesLowerCase[1], absX, absY);
                continue;
            }
            if (cmd === "rotateleft") {
                commandRotate(backData, gameData, gameInfo, valuesLowerCase[1], absX, absY, true);
                continue;
            }
            if (cmd === "rotateright") {
                commandRotate(backData, gameData, gameInfo, valuesLowerCase[1], absX, absY, false);
                continue;
            }

            if (cmd === "startsong") {
                commandStartSong(gameData, gameInfo, absX, absY);
                continue;
            }

            if (cmd === "create") {
                objectNumber = nameToObjectNumber(objName);
                const isBackground = [20, 23, 25, 80, 90, 137, 258].includes(objectNumber);
                if (!isBackground && obj !== 0) {
                    continue;
                }
                if (isBackground && objBack !== 0) {
                    continue;
                }
                if (objectNumber > 0) {
                    if (isBackground) {
                        backData[absY][absX] = objectNumber;
                    } else {
                        addObject(backData, gameData, gameInfo, absX, absY, objectNumber);
                    }
                }
                if (objectNumber === 9 && ["movingyellowballdown", "movingyellowballleft", "movingyellowballright", "movingyellowballup"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.yellowBalls);
                    if (idx < 0) {
                        continue;
                    }
                    yellowBall = gameInfo.yellowBalls[idx];
                    yellowBall.direction = objName.slice(16);
                }
                if (objectNumber === 29 && ["bluekey", "greenkey", "pinkkey", "purplekey", "redkey", "whitekey", "yellowkey"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.keys);
                    if (idx < 0) {
                        continue;
                    }
                    key = gameInfo.keys[idx];
                    key.color = objName.slice(0, objName.length - 3);
                }
                if (objectNumber === 30 && ["bluelockeddoor", "greenlockeddoor", "pinklockeddoor", "purplelockeddoor", "redlockeddoor", "whitelockeddoor", "yellowlockeddoor"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.lockedDoors);
                    if (idx < 0) {
                        continue;
                    }
                    lockedDoor = gameInfo.lockedDoors[idx];
                    lockedDoor.color = objName.slice(0, objName.length - 10);
                }
                if (objectNumber === 198 && ["timeddisappearingstone1", "timeddisappearingstone2", "timeddisappearingstone3", "timeddisappearingstone4"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.disappearingStones);
                    if (idx < 0) {
                        continue;
                    }
                    stone = gameInfo.disappearingStones[idx];
                    stone.mode = "timed";
                    stone.pattern.length = 0;
                    stone.pattern.push(gameVars[`userInt${objName.slice(objName.length - 1)}`]);
                }
                if (objectNumber === 209 && ["movingpusherdown", "movingpusherleft", "movingpusherright", "movingpusherup"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.pushers);
                    if (idx < 0) {
                        continue;
                    }
                    pusher = gameInfo.pushers[idx];
                    pusher.group = 32;
                    pusher.mode = "continue";
                    pusher.movable = false;
                    pusher.keepMoving = true;
                    pusher.direction = objName.slice(12);
                }
                if (objectNumber === 243) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.tropicalFish);
                    if (idx < 0) {
                        continue;
                    }
                    fish = gameInfo.tropicalFish[idx];
                    presetTropicalFish(fish, objName);
                }
                if (objectNumber === 256) {
                    gameInfo.levelCanHaveSpikeBalls = true;
                }
                if (objectNumber === 257 && ["flamethrowerdown", "flamethrowerleft", "flamethrowerright", "flamethrowerup"].includes(objName)) {
                    idx = findElementByCoordinates(absX, absY, gameInfo.flamethrowers);
                    if (idx < 0) {
                        continue;
                    }
                    flamethrower = gameInfo.flamethrowers[idx];
                    flamethrower.direction = objName.slice(12);
                }
                continue;
            }
            if (cmd === "delete") {
                removeObject(backData, gameData, gameInfo, absX, absY, false);
                continue;
            }
            if (cmd === "move") {
                moveObjectInDirection(gameData, gameInfo, absX, absY, direction, true);
                continue;
            }
        }
    }
}

export function addColumns(backData, gameData, n, stones) {
    if ((n < 1) || (n > 25)) {
        return;
    }
    let data = 0;
    const newCellsEmpty = [];
    const newCellsStones = [];
    const newCells = [];
    for (let i = 0; i < n; i++) {
        newCellsEmpty.push(0);
        newCellsStones.push(1);
        if (stones && (i === (n - 1))) {
            data = 1;
        } else {
            data = 0;
        }
        newCells.push(data);
    }
    for (let i = 0; i < gameData.length; i++) {
        if (stones && (i === 0 || i === (gameData.length - 1))) {
            gameData[i].push(...newCellsStones);
        } else {
            gameData[i].push(...newCells);
        }
        backData[i].push(...newCellsEmpty);
    }
}

export function addRows(backData, gameData, n, stones) {
    if ((n < 1) || (n > 25)) {
        return;
    }

    const columns = gameData[0].length;
    let data = 0;
    const newRowEmpty = [];
    const newRowStones = [];
    const newRow = [];
    for (let i = 0; i < columns; i++) {
        newRowEmpty.push(0);
        newRowStones.push(1);
        if (stones && (i === 0 || i === (columns - 1))) {
            data = 1;
        } else {
            data = 0;
        }
        newRow.push(data);
    }
    for (let i = 0; i < n; i++) {
        if (stones && (i === (n - 1))) {
            gameData.push([...newRowStones]);
        } else {
            gameData.push([...newRow]);
        }
        backData.push([...newRowEmpty]);
    }
}

function commandChangeDirection(gameData, gameInfo, target, x, y) {
    let gd = -1;
    let idx = -1;

    if (x >= 0 && y >= 0) {
        gd = getGameDataValue(gameData, x, y);
        if (gd <= 0) {
            return;
        }
        if (target === "elevators") {
            if (gd === 6 || gd === 106) {
                idx = findElementByCoordinates(x, y, gameInfo.elevators);
                if (idx < 0) {
                    return;
                }
                const elevator = gameInfo.elevators[idx];
                if (gd === 6) {
                    gameData[y][x] = 106;
                    elevator.up = true;
                } else {
                    gameData[y][x] = 6;
                    elevator.up = false;
                }
            }
            if (gd === 7 || gd === 107) {
                idx = findElementByCoordinates(x, y, gameInfo.horizontalElevators);
                if (idx < 0) {
                    return;
                }
                const elevator = gameInfo.horizontalElevators[idx];
                if (gd === 7) {
                    gameData[y][x] = 107;
                    elevator.right = true;
                } else {
                    gameData[y][x] = 7;
                    elevator.right = false;
                }
            }
            return;
        }
        if (target === "flamethrower") {
            if (gd !== 257) {
                return;
            }
            idx = findElementByCoordinates(x, y, gameInfo.flamethrowers);
            if (idx < 0) {
                return;
            }
            const flamethrower = gameInfo.flamethrowers[idx];
            flamethrower.direction = flipDirection(flamethrower.direction);
            return;
        }

        if (gd === 10 && (target === "onedirectionports" || target === "onedirectionportright")) {
            gameData[y][x] = 11;
            return;
        }
        if (gd === 11 && (target === "onedirectionports" || target === "onedirectionportleft")) {
            gameData[y][x] = 10;
            return;
        }
        if (gd === 87 && (target === "onedirectionports" || target === "onedirectionportup")) {
            gameData[y][x] = 88;
            return;
        }
        if (gd === 88 && (target === "onedirectionports" || target === "onedirectionportdown")) {
            gameData[y][x] = 87;
            return;
        }

        if (target === "pusher") {
            if (gd !== 209) {
                return;
            }
            idx = findElementByCoordinates(x, y, gameInfo.pushers);
            if (idx < 0) {
                return;
            }
            const pusher = gameInfo.pushers[idx];
            pusher.direction = flipDirection(pusher.direction);
            return;
        }

        if (gd === 174 && (target === "spikes" || target === "spikeup")) {
            gameData[y][x] = 175;
            return;
        }
        if (gd === 175 && (target === "spikes" || target === "spikedown")) {
            gameData[y][x] = 174;
            return;
        }
        if (gd === 176 && (target === "spikes" || target === "spikeright")) {
            gameData[y][x] = 177;
            return;
        }
        if (gd === 177 && (target === "spikes" || target === "spikeleft")) {
            gameData[y][x] = 176;
            return;
        }

        if (target === "tropicalfish") {
            if (gd !== 243) {
                return;
            }
            idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
            if (idx < 0) {
                return;
            }
            const fish = gameInfo.tropicalFish[idx];
            switch (fish.direction) {
                case 4:
                    fish.direction = 6;
                    break;
                case 6:
                    fish.direction = 4;
                    break;
            }
            return;
        }
        return;
    }
    if (target === "elevators") {
        for (let i = 0; i < gameInfo.elevators.length; i++) {
            const elevator = gameInfo.elevators[i];
            if (elevator.up) {
                elevator.up = false;
                gameData[elevator.y][elevator.x] = 6;
            } else {
                elevator.up = true;
                gameData[elevator.y][elevator.x] = 106;
            }
        }
        for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
            const elevator = gameInfo.horizontalElevators[i];
            if (elevator.right) {
                elevator.right = false;
                gameData[elevator.y][elevator.x] = 7;
            } else {
                elevator.right = true;
                gameData[elevator.y][elevator.x] = 107;
            }
        }
        return;
    }
    if (target === "flamethrower") {
        for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
            const flamethrower = gameInfo.flamethrowers[i];
            flamethrower.direction = flipDirection(flamethrower.direction);
        }
        return;
    }
    if (target === "pusher") {
        for (let i = 0; i < gameInfo.pushers.length; i++) {
            const pusher = gameInfo.pushers[i];
            pusher.direction = flipDirection(pusher.direction);
        }
    }
}

function getVariable(source, name) {
    switch (name) {
        case "browncountto":
            return source.brownCountTo;
        case "conveyorbeltcountto":
            return source.conveyorBeltCountTo;
        case "darkpercentage":
            return source.darkPercentage;
        case "disappearingstonescountto":
            return source.disappearingStonesCountTo;
        case "elevatorcountto":
            return source.elevatorCountTo;
        case "fishcountto":
            return source.fishCountTo;
        case "pinkcountto":
            return source.pinkCountTo;
        case "pistonsrepeatfastmodecountto":
            return source.pistonsRepeatFastModeCountTo;
        case "tropicalfishcounttooverride":
            return source.tropicalFishCountToOverride;
        case "userint1":
            return source.userInt1;
        case "userint2":
            return source.userInt2;
        case "userint3":
            return source.userInt3;
        case "userint4":
            return source.userInt4;
        default:
            return 0;
    }
}

function setVariable(source, name, value) {
    switch (name) {
        case "browncountto":
            if (value < 1) {
                return;
            }
            source.brownCountTo = value;
            break;
        case "conveyorbeltcountto":
            if (value < 1) {
                return;
            }
            source.conveyorBeltCountTo = value;
            break;
        case "darkpercentage":
            if (value < 0 || value > 100) {
                return;
            }
            source.darkPercentage = value;
            break;
        case "disappearingstonescountto":
            if (value < 1) {
                return;
            }
            source.disappearingStonesCountTo = value;
            break;
        case "elevatorcountto":
            if (value < 1) {
                return;
            }
            source.elevatorCountTo = value;
            break;
        case "fishcountto":
            if (value < 1) {
                return;
            }
            source.fishCountTo = value;
            break;
        case "pinkcountto":
            if (value < 1) {
                return;
            }
            source.pinkCountTo = value;
            break;
        case "pistonsrepeatfastmodecountto":
            if (value < 1) {
                return;
            }
            source.pistonsRepeatFastModeCountTo = value;
            break;
        case "tropicalfishcounttooverride":
            if (value < 0) {
                return;
            }
            source.tropicalFishCountToOverride = value;
            break;
        case "userint1":
            source.userInt1 = value;
            break;
        case "userint2":
            source.userInt2 = value;
            break;
        case "userint3":
            source.userInt3 = value;
            break;
        case "userint4":
            source.userInt4 = value;
            break;
        default:
            break;
    }
}

function commandDec(source, name, decrement, min, reset) {
    if (decrement === null) {
        decrement = 1;
    }

    let value = getVariable(source, name) - decrement;

    if (min !== null && value < min) {
        if (reset === null || reset < min) {
            reset = min;
        }
        value = reset;
    }

    setVariable(source, name, value);
}

function commandInc(source, name, increment, max, reset) {
    if (increment === null) {
        increment = 1;
    }

    let value = getVariable(source, name) + increment;

    if (max !== null && value > max) {
        if (reset === null || reset > max) {
            reset = max;
        }
        value = reset;
    }

    setVariable(source, name, value);
}

function commandRandom(source, name, min, max) {
    if (max <= min) {
        return;
    }

    let value = randomInt(min, max);
    setVariable(source, name, value);
}

export function commands(backData, gameData, gameInfo, gameVars, detector) {
    const value = detector.value.trim();
    let commandLine = "";
    const commandList = value.split("|");

    if (value === "" || commandList.length < 1) {
        return;
    }

    if (detector.sequence) {
        if (detector.activatedCount > commandList.length) {
            detector.activatedCount = 1;
        }
        commandLine = commandList[detector.activatedCount - 1].trim();
        command(backData, gameData, gameInfo, gameVars, detector.x, detector.y, commandLine, detector.oneCommand);
        return;
    }
    for (let i = 0; i < commandList.length; i++) {
        commandLine = commandList[i].trim();
        command(backData, gameData, gameInfo, gameVars, detector.x, detector.y, commandLine, detector.oneCommand);
    }
}

export function detectorModes() {
    return ["all", "blueball", "whiteball", "lightblueball", "yellowball", "redball", "purpleball", "orangeball", "pinkball", "brownball", "event"];
}

export function detectorTargets() {
    return ["bombs", "command", "gravitydown", "gravityup", "group", "rotategroupleft", "rotategroupright", "setting", "yellowpushers"];
}

export function flipDirection(direction) {
    switch (direction) {
        case "down":
            return "up";
        case "right":
            return "left";
        case "up":
            return "down";
        case "left":
            return "right";
        case "downleft":
            return "upright";
        case "downright":
            return "upleft";
        case "upright":
            return "downleft";
        case "upleft":
            return "downright";
        default:
            return direction;
    }
}

function nameToObjectNumber(objName) {
    switch (objName) {
        case "backgroundstone":
            return 258;
        case "bomb":
            return 36;
        case "brownball":
            return 253;
        case "coilspring":
            return 118;
        case "conveyorbeltleft":
            return 171;
        case "conveyorbeltmiddle":
            return 172;
        case "conveyorbeltright":
            return 173;
        case "copier":
            return 97;
        case "detector":
            return 255;
        case "detonator":
            return 37;
        case "disappearingstone":
        case "timeddisappearingstone1":
        case "timeddisappearingstone2":
        case "timeddisappearingstone3":
        case "timeddisappearingstone4":
            return 198;
        case "door":
            return 169;
        case "lockeddoor":
        case "bluelockeddoor":
        case "greenlockeddoor":
        case "pinklockeddoor":
        case "purplelockeddoor":
        case "redlockeddoor":
        case "whitelockeddoor":
        case "yellowlockeddoor":
            return 30;
        case "electricity":
            return 91;
        case "elevatordown":
            return 6;
        case "elevatorleft":
            return 7;
        case "elevatorright":
            return 107;
        case "elevatorup":
            return 109;
        case "flamethrowerdown":
        case "flamethrowerleft":
        case "flamethrowerright":
        case "flamethrowerup":
            return 257;
        case "forcedown":
            return 110;
        case "forceleft":
            return 112;
        case "forceright":
            return 111;
        case "forceup":
            return 0;
        case "grayball":
            return 83;
        case "grayballonemove":
            return 82;
        case "grayballtwomoves":
            return 98;
        case "horizontalladder":
            return 90;
        case "horizontalrope":
            return 80;
        case "jellyfish":
            return 248;
        case "key":
        case "bluekey":
        case "greenkey":
        case "pinkkey":
        case "purplekey":
        case "redkey":
        case "whitekey":
        case "yellowkey":
            return 29;
        case "ladder":
            return 25;
        case "lightblueball":
            return 5;
        case "magnet":
            return 119;
        case "mirror1":
            return 95;
        case "mirror2":
            return 96;
        case "onedirectionportdown":
            return 88;
        case "onedirectionportleft":
            return 11;
        case "onedirectionportright":
            return 10;
        case "onedirectionportup":
            return 87;
        case "orangeball":
            return 40;
        case "phaseability":
            return 207;
        case "pinkball":
            return 203;
        case "pistondown":
            return 161;
        case "pistonleft":
            return 163;
        case "pistonright":
            return 165;
        case "pistonstrigger":
            return 158;
        case "pistonup":
            return 159;
        case "purpleball":
            return 28;
        case "pusher":
        case "movingpusherdown":
        case "movingpusherleft":
        case "movingpusherright":
        case "movingpusherup":
            return 209;
        case "redball":
            return 8;
        case "redfish":
            return 27;
        case "shrinker":
            return 199;
        case "smallblueball":
            return 168;
        case "smallbrownball":
            return 254;
        case "smallgreenball":
            return 3;
        case "smalllightblueball":
            return 195;
        case "smallorangeball":
            return 202;
        case "smallpinkball":
            return 204;
        case "smallpurpleball":
            return 197;
        case "smallredball":
            return 201;
        case "smallsilverball":
            return 140;
        case "smallwhiteball":
            return 192;
        case "smallyellowball":
            return 196;
        case "spikeball":
            return 256;
        case "spikedown":
            return 175;
        case "spikeleft":
            return 177;
        case "spikeright":
            return 176;
        case "spikeup":
            return 174;
        case "stone":
            return 1;
        case "timebomb":
            return 117;
        case "timefreezer":
            return 120;
        case "trianglestonebottomleft":
            return 15;
        case "trianglestonebottomright":
            return 16;
        case "trianglestonetopleft":
            return 17;
        case "trianglestonetopright":
            return 18;
        case "verticalrope":
            return 137;
        case "whiteball":
            return 4;
        case "yellowball":
        case "movingyellowballdown":
        case "movingyellowballleft":
        case "movingyellowballright":
        case "movingyellowballup":
            return 9;
        case "water":
            return 23;
        case "watersurface":
            return 20;
        case "yellowcopier":
            return 208;
        case "yellowdirectionchanger1":
            return 84;
        case "yellowdirectionchanger2":
            return 85;
        case "yellowdirectionchanger3":
            return 86;
        case "yellowdirectionchanger4":
            return 138;
        case "yellowdirectionchanger5":
            return 139;
        case "yellowpusher":
            return 115;
        case "yellowpusherstrigger":
            return 116;
        case "albinoangelfish":
        case "bandedtilapia":
        case "bicoloranthias":
        case "blackneontetra":
        case "bluechromis":
        case "bluediamonddiscus":
        case "brighamssnapper":
        case "caribbeanreefshark":
        case "clownfish":
        case "electriccatfish":
        case "flagtailprochilodus":
        case "juvenilegoldentrevally":
        case "longtailredsnapper":
        case "orangereddiscus":
        case "purpletang":
        case "rainbowrunner":
        case "redtailshark":
        case "rustyjobfish":
        case "siamesealgaeeater":
        case "smallmouthgrunt":
        case "yellowfintuna":
        case "yellowtang":
        case "yellowtailaceicichlid":
        case "yellowtaildamselfish":
        case "zebraangelfish":
            return 243;
        default:
            return 0;
    }
}

function objectPossible(cmd, objName, obj) {
    if (cmd === "delete" || cmd === "move") {
        if (
            (objName === "brownball" && obj === 253) ||
            (objName === "changer" && obj === 244) ||
            (objName === "coilspring" && obj === 118) ||
            (objName === "conveyorbelt" && [171, 172, 173].includes(obj)) ||
            (objName === "conveyorbeltleft" && obj === 171) ||
            (objName === "conveyorbeltmiddle" && obj === 172) ||
            (objName === "conveyorbeltright" && obj === 173) ||
            (objName === "copier" && obj === 97) ||
            (objName === "door" && obj === 169) ||
            (objName === "elevator" && (obj === 6 || obj === 106)) ||
            (objName === "flamethrower" && obj === 257) ||
            (objName === "grayballs" && [82, 83, 98].includes(obj)) ||
            (objName === "horizontalelevator" && (obj === 7 || obj === 107)) ||
            (objName === "jellyfish" && obj === 248) ||
            (objName === "key" && obj === 29) ||
            (objName === "lightblueball" && obj === 5) ||
            (objName === "lockeddoor" && obj === 30) ||
            (objName === "onedirectionportdown" && obj === 88) ||
            (objName === "onedirectionportleft" && obj === 11) ||
            (objName === "onedirectionportright" && obj === 10) ||
            (objName === "onedirectionports" && [88, 11, 10, 87].includes(obj)) ||
            (objName === "onedirectionportup" && obj === 87) ||
            (objName === "orangeball" && obj === 40) ||
            (objName === "phaseability" && obj === 207) ||
            (objName === "pinkball" && obj === 203) ||
            (objName === "pinkball" && obj === 203) ||
            (objName === "pistonstrigger" && obj === 158) ||
            (objName === "purpleballs" && [28, 242].includes(obj)) ||
            (objName === "pusher" && obj === 209) ||
            (objName === "redball" && [8, 93, 94].includes(obj)) ||
            (objName === "redfish" && obj === 27) ||
            (objName === "shrinker" && obj === 199) ||
            (objName === "smallblueball" && obj === 168) ||
            (objName === "smallbrownball" && obj === 254) ||
            (objName === "smalllightblueball" && obj === 195) ||
            (objName === "smallorangeball" && obj === 202) ||
            (objName === "smallpinkball" && obj === 204) ||
            (objName === "smallpurpleball" && obj === 197) ||
            (objName === "smallredball" && obj === 201) ||
            (objName === "smallsilverball" && obj === 140) ||
            (objName === "smallwhiteball" && obj === 192) ||
            (objName === "smallyellowball" && obj === 196) ||
            (objName === "spike" && isSpike(obj)) ||
            (objName === "spikeball" && obj === 256) ||
            (objName === "stone" && obj === 1) ||
            (objName === "stones" && isStone(obj)) ||
            (objName === "timefreezer" && obj === 120) ||
            (objName === "tropicalfish" && obj === 243) ||
            (objName === "whiteball" && obj === 4) ||
            (objName === "whiteballs" && [4, 245].includes(obj)) ||
            (objName === "whiteballsynchroniser" && obj === 200) ||
            (objName === "yellowball" && obj === 9) ||
            (objName === "yellowcopier" && obj === 208) ||
            (objName === "yellowdirectionchanger1" && obj === 84) ||
            (objName === "yellowdirectionchanger2" && obj === 85) ||
            (objName === "yellowdirectionchanger3" && obj === 86) ||
            (objName === "yellowdirectionchanger4" && obj === 138) ||
            (objName === "yellowdirectionchanger5" && obj === 139) ||
            (objName === "yellowdirectionchangers" && [84, 85, 86, 138, 139].includes(obj)) ||
            (objName === "yellowballsynchroniser" && obj === 155) ||
            (objName === "yellowpusherstrigger" && obj === 116)
        ) {
            return true;
        }
    }
    if (cmd === "delete") {
        if (
            (objName === "smallballs" && [254, 195, 202, 204, 197, 201, 192, 196].includes(obj))
        ) {
            return true;
        }
    }
    if (cmd === "move") {
        if (
            (objName === "smallballs" && [254, 3, 195, 202, 204, 197, 201, 192, 196].includes(obj)) ||
            (objName === "smallgreenball" && obj === 3)
        ) {
            return true;
        }
    }
    return false;
}



export function rotateGroup(gameData, gameInfo, group, rotateLeft) {
    // Pushers
    for (let i = 0; i < gameInfo.pushers.length; i++) {
        const pusher = gameInfo.pushers[i];
        if (pusher.group === group) {
            pusher.direction = rotateDirection(pusher.direction, rotateLeft);
        }
    }
}

function commandRotate(backData, gameData, gameInfo, target, x, y, rotateLeft) {
    let bd = -1;
    let gd = -1;
    let idx = -1;
    let newObjectNumber = -1;

    if (x >= 0 && y >= 0) {
        bd = getGameDataValue(backData, x, y);
        gd = getGameDataValue(gameData, x, y);

        if (target === "elevators") {
            newObjectNumber = -1;
            switch (gd) {
                case 6:
                    newObjectNumber = rotateLeft ? 107 : 7;
                    break;
                case 7:
                    newObjectNumber = rotateLeft ? 6 : 106;
                    break;
                case 106:
                    newObjectNumber = rotateLeft ? 7 : 107;
                    break;
                case 107:
                    newObjectNumber = rotateLeft ? 106 : 6;
                    break;
                default:
                    break;
            }
            if (newObjectNumber >= 0) {
                removeObject(backData, gameData, gameInfo, x, y, false);
                addObject(backData, gameData, gameInfo, x, y, newObjectNumber);
            }
            return;
        }
        if (target === "flamethrower") {
            if (gd !== 257) {
                return;
            }
            idx = findElementByCoordinates(x, y, gameInfo.flamethrowers);
            if (idx < 0) {
                return;
            }
            const flamethrower = gameInfo.flamethrowers[idx];
            flamethrower.direction = rotateDirection(flamethrower.direction, rotateLeft);
            return;
        }

        if (gd === 95 && (target === "mirrors" || target === "mirror1")) {
            gameData[y][x] = 96;
            return;
        }
        if (gd === 96 && (target === "mirrors" || target === "mirror2")) {
            gameData[y][x] = 95;
            return;
        }

        if (gd === 10 && (target === "onedirectionports" || target === "onedirectionportright")) {
            gameData[y][x] = rotateLeft ? 87 : 88;
            return;
        }
        if (gd === 11 && (target === "onedirectionports" || target === "onedirectionportleft")) {
            gameData[y][x] = rotateLeft ? 88 : 87;
            return;
        }
        if (gd === 87 && (target === "onedirectionports" || target === "onedirectionportup")) {
            gameData[y][x] = rotateLeft ? 11 : 10;
            return;
        }
        if (gd === 88 && (target === "onedirectionports" || target === "onedirectionportdown")) {
            gameData[y][x] = rotateLeft ? 10 : 11;
            return;
        }

        if (target === "pusher") {
            if (gd !== 209) {
                return;
            }
            idx = findElementByCoordinates(x, y, gameInfo.pushers);
            if (idx < 0) {
                return;
            }
            const pusher = gameInfo.pushers[idx];
            pusher.direction = rotateDirection(pusher.direction, rotateLeft);
            return;
        }

        if (bd === 80 && (target === "ropes" || target === "horizontalrope")) {
            backData[y][x] = 137;
            return;
        }
        if (bd === 137 && (target === "ropes" || target === "verticalrope")) {
            backData[y][x] = 80;
            return;
        }

        if (gd === 174 && (target === "spikes" || target === "spikeup")) {
            gameData[y][x] = rotateLeft ? 177 : 176;
            return;
        }
        if (gd === 175 && (target === "spikes" || target === "spikedown")) {
            gameData[y][x] = rotateLeft ? 176 : 177;
            return;
        }
        if (gd === 176 && (target === "spikes" || target === "spikeright")) {
            gameData[y][x] = rotateLeft ? 174 : 175;
            return;
        }
        if (gd === 177 && (target === "spikes" || target === "spikeleft")) {
            gameData[y][x] = rotateLeft ? 175 : 174;
            return;
        }

        return;
    }

    if (target === "flamethrower") {
        for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
            const flamethrower = gameInfo.flamethrowers[i];
            flamethrower.direction = rotateDirection(flamethrower.direction);
        }
        return;
    }
    if (target === "pusher") {
        for (let i = 0; i < gameInfo.pushers.length; i++) {
            const pusher = gameInfo.pushers[i];
            pusher.direction = rotateDirection(pusher.direction);
        }
    }
}

function commandStartSong(gameData, gameInfo, x, y) {
    let gd = -1;
    let idx = -1;

    if (x < 0 || y < 0) {
        return;
    }

    gd = getGameDataValue(gameData, x, y);
    if (gd !== 157) {
        return;
    }

    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx < 0) {
        return;
    }

    const musicBox = gameInfo.musicBoxes[idx];

    if (musicBox.mode === "songstart") {
        musicBox.delayCounter = 0;
        musicBox.ended = false;
        musicBox.noteIndex = -1;
        musicBox.repeat = false;
        musicBox.tripletStart = -1;
        musicBox.active = true;
    }
}

