function flipActiveSides(obj, xmin, ymin, xmax, ymax) {
    if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
        return;
    }

    const bottom = obj.activeSides.includes("bottom");
    const left = obj.activeSides.includes("left");
    const right = obj.activeSides.includes("right");
    const top = obj.activeSides.includes("top");

    obj.activeSides.length = 0;
    if (bottom) {
        obj.activeSides.push("bottom");
    }
    if (right) {
        obj.activeSides.push("left");
    }
    if (left) {
        obj.activeSides.push("right");
    }
    if (top) {
        obj.activeSides.push("top");
    }
}

export function flipDirection(obj, xmin, ymin, xmax, ymax) {
    let direction = "";

    if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
        return;
    }

    switch (obj.direction) {
        case "downleft":
            direction = "downright";
            break;
        case "downright":
            direction = "downleft";
            break;
        case "left":
            direction = "right";
            break;
        case "right":
            direction = "left";
            break;
        case "upleft":
            direction = "upright";
            break;
        case "upright":
            direction = "upleft";
            break;
        default:
            direction = obj.direction;
            break;
    }
    obj.direction = direction;
}

function flipXY(obj, xmin, ymin, xmax, ymax) {
    if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
        return;
    }

    obj.x = (xmax - obj.x) + xmin;
}

export function flipArea(backData, gameData, gameInfo, xmin, ymin, xmax, ymax) {
    let columns = 0;
    let rows = 0;

    if (xmin < 0 || ymin < 0 || xmax <= xmin || ymax < ymin) {
        // ymax may be equal to ymin
        return false;
    }

    rows = gameData.length;
    if (rows <= 0 || ymax >= rows) {
        return false;
    }

    columns = gameData[0].length;
    if (columns <= 0 || xmax >= columns) {
        return false;
    }

    let gdMap = null;

    gdMap = {
        7: 107,
        10: 11, 11: 10,
        15: 16, 16: 15, 17: 18, 18: 17,
        84: 85, 85: 84,
        95: 96, 96: 95,
        100: 101, 101: 100,
        107: 7,
        111: 112, 112: 111,
        121: 122, 122: 121,
        126: 127, 127: 126,
        138: 139, 139: 138,
        141: 142, 142: 141, 143: 144, 144: 143,
        145: 146, 146: 145,
        149: 150, 150: 149, 151: 152, 152: 151,
        153: 154, 154: 153,
        163: 165, 165: 163,
        164: 166, 166: 164,
        176: 177, 177: 176,
        210: 214, 214: 210,
        211: 217, 217: 211,
        212: 216, 216: 212,
        213: 215, 215: 214,
        218: 222, 222: 218,
        219: 225, 225: 219,
        220: 224, 224: 220,
        221: 223, 223: 221,
        246: 247, 247: 246,
        259: 260, 260: 259, 261: 262, 262: 261,
    };

    for (let i = ymin; i <= ymax; i++) {
        const newBackRow = [];
        const newGameRow = [];
        for (let j = xmin; j <= xmax; j++) {
            let bd = 0;
            let gd = 0;

            bd = backData[i][(xmax - j) + xmin];
            gd = gameData[i][(xmax - j) + xmin];

            if (Object.prototype.hasOwnProperty.call(gdMap, gd)) gd = gdMap[gd];

            newBackRow.push(bd);
            newGameRow.push(gd);
        }
        for (let j = xmin; j <= xmax; j++) {
            backData[i][j] = newBackRow[j - xmin];
            gameData[i][j] = newGameRow[j - xmin];
        }
    }

    // Answer balls
    for (let i = 0; i < gameInfo.answerBalls.length; i++) {
        flipXY(gameInfo.answerBalls[i], xmin, ymin, xmax, ymax);
    }

    // Blue ball
    flipXY(gameInfo.blueBall1, xmin, ymin, xmax, ymax);
    if (gameInfo.twoBlue) {
        flipXY(gameInfo.blueBall2, xmin, ymin, xmax, ymax);
    }

    // Brown balls
    for (let i = 0; i < gameInfo.brownBalls.length; i++) {
        flipXY(gameInfo.brownBalls[i], xmin, ymin, xmax, ymax);
    }

    // Changers
    for (let i = 0; i < gameInfo.changers.length; i++) {
        const obj = gameInfo.changers[i];
        if (obj.x < xmin || obj.y < ymin || obj.x > xmax || obj.y > ymax) {
            continue;
        }

        flipXY(obj, xmin, ymin, xmax, ymax);
        const c1 = obj.color1;
        const c2 = obj.color2;
        if (obj.horizontal) {
            obj.color1 = c2;
            obj.color2 = c1;
        }
    }

    // Copiers
    for (let i = 0; i < gameInfo.copiers.length; i++) {
        flipXY(gameInfo.copiers[i], xmin, ymin, xmax, ymax);
    }

    // ConveyorBelts
    for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        flipXY(gameInfo.conveyorBelts[i], xmin, ymin, xmax, ymax);
    }

    // Damaged stones
    for (let i = 0; i < gameInfo.damagedStones.length; i++) {
        flipXY(gameInfo.damagedStones[i], xmin, ymin, xmax, ymax);
    }

    // Delays
    for (let i = 0; i < gameInfo.delays.length; i++) {
        flipXY(gameInfo.delays[i], xmin, ymin, xmax, ymax);
    }

    // Detectors
    for (let i = 0; i < gameInfo.detectors.length; i++) {
        const obj = gameInfo.detectors[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipActiveSides(obj, xmin, ymin, xmax, ymax);
    }

    // Disappearing stones
    for (let i = 0; i < gameInfo.disappearingStones.length; i++) {
        flipXY(gameInfo.disappearingStones[i], xmin, ymin, xmax, ymax);
    }

    // Electricity
    for (let i = 0; i < gameInfo.electricity.length; i++) {
        flipXY(gameInfo.electricity[i], xmin, ymin, xmax, ymax);
    }

    // Elevators
    for (let i = 0; i < gameInfo.elevators.length; i++) {
        const elevator = gameInfo.elevators[i];
        flipXY(elevator, xmin, ymin, xmax, ymax);
    }
    for (let i = 0; i < gameInfo.horizontalElevators.length; i++) {
        const elevator = gameInfo.horizontalElevators[i];
        flipXY(elevator, xmin, ymin, xmax, ymax);

        if (elevator.x >= xmin && elevator.y >= ymin && elevator.x <= xmax && elevator.y <= ymax) {
            elevator.right = !elevator.right;
        }
    }

    // Elevator entrances and exits
    for (let i = 0; i < gameInfo.elevatorInOuts.length; i++) {
        flipXY(gameInfo.elevatorInOuts[i], xmin, ymin, xmax, ymax);
    }

    // Fish food
    for (let i = 0; i < gameInfo.fishFood.length; i++) {
        flipXY(gameInfo.fishFood[i], xmin, ymin, xmax, ymax);
    }

    // Flamethrowers
    for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
        const obj = gameInfo.flamethrowers[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Forces
    for (let i = 0; i < gameInfo.forces.length; i++) {
        const obj = gameInfo.forces[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Jellyfish
    for (let i = 0; i < gameInfo.jellyfish.length; i++) {
        flipXY(gameInfo.jellyfish[i], xmin, ymin, xmax, ymax);
    }

    // Keys
    for (let i = 0; i < gameInfo.keys.length; i++) {
        flipXY(gameInfo.keys[i], xmin, ymin, xmax, ymax);
    }

    // Locked doors
    for (let i = 0; i < gameInfo.lockedDoors.length; i++) {
        flipXY(gameInfo.lockedDoors[i], xmin, ymin, xmax, ymax);
    }

    // Lava
    for (let i = 0; i < gameInfo.lava.length; i++) {
        flipXY(gameInfo.lava[i], xmin, ymin, xmax, ymax);
    }

    // Magnets
    for (let i = 0; i < gameInfo.magnets.length; i++) {
        flipXY(gameInfo.magnets[i], xmin, ymin, xmax, ymax);
    }

    // Movers
    for (let i = 0; i < gameInfo.movers.length; i++) {
        const obj = gameInfo.movers[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
        flipActiveSides(obj, xmin, ymin, xmax, ymax);
    }

    // Music boxes
    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const obj = gameInfo.musicBoxes[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Orange balls
    for (let i = 0; i < gameInfo.orangeBalls.length; i++) {
        const obj = gameInfo.orangeBalls[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Pink balls
    for (let i = 0; i < gameInfo.pinkBalls.length; i++) {
        flipXY(gameInfo.pinkBalls[i], xmin, ymin, xmax, ymax);
    }

    // Pistons
    for (let i = 0; i < gameInfo.pistons.length; i++) {
        const obj = gameInfo.pistons[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Pushers
    for (let i = 0; i < gameInfo.pushers.length; i++) {
        const obj = gameInfo.pushers[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Question stones
    for (let i = 0; i < gameInfo.questionStones.length; i++) {
        flipXY(gameInfo.questionStones[i], xmin, ymin, xmax, ymax);
    }

    // Red balls
    for (let i = 0; i < gameInfo.redBalls.length; i++) {
        flipXY(gameInfo.redBalls[i], xmin, ymin, xmax, ymax);
    }

    // Red fish
    for (let i = 0; i < gameInfo.redFish.length; i++) {
        flipXY(gameInfo.redFish[i], xmin, ymin, xmax, ymax);
    }

    // Sea anemones
    for (let i = 0; i < gameInfo.seaAnemones.length; i++) {
        flipXY(gameInfo.seaAnemones[i], xmin, ymin, xmax, ymax);
    }

    // Teleports
    for (let i = 0; i < gameInfo.teleports.length; i++) {
        flipXY(gameInfo.teleports[i], xmin, ymin, xmax, ymax);
    }

    // Time bombs
    for (let i = 0; i < gameInfo.timeBombs.length; i++) {
        flipXY(gameInfo.timeBombs[i], xmin, ymin, xmax, ymax);
    }

    // Trap doors
    for (let i = 0; i < gameInfo.trapDoors.length; i++) {
        flipXY(gameInfo.trapDoors[i], xmin, ymin, xmax, ymax);
    }

    // Tropical fish
    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        flipXY(gameInfo.tropicalFish[i], xmin, ymin, xmax, ymax);
    }

    // User objects
    for (let i = 0; i < gameInfo.userObjects.length; i++) {
        const obj = gameInfo.userObjects[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
        flipActiveSides(obj, xmin, ymin, xmax, ymax);
    }

    // Water with ice
    for (let i = 0; i < gameInfo.waterWithIceObjects.length; i++) {
        flipXY(gameInfo.waterWithIceObjects[i], xmin, ymin, xmax, ymax);
    }

    // White ball synchronisers
    for (let i = 0; i < gameInfo.whiteBallSynchronisers.length; i++) {
        flipXY(gameInfo.whiteBallSynchronisers[i], xmin, ymin, xmax, ymax);
    }

    // Yellow balls
    for (let i = 0; i < gameInfo.yellowBalls.length; i++) {
        const obj = gameInfo.yellowBalls[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Yellow bars
    for (let i = 0; i < gameInfo.yellowBars.length; i++) {
        const obj = gameInfo.yellowBars[i];
        flipXY(obj, xmin, ymin, xmax, ymax);
        flipDirection(obj, xmin, ymin, xmax, ymax);
    }

    // Triggers, detonators etc
    flipXY(gameInfo.detonator, xmin, ymin, xmax, ymax);
    for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        flipXY(gameInfo.pistonsTriggers[i], xmin, ymin, xmax, ymax);
    }
    flipXY(gameInfo.travelGate, xmin, ymin, xmax, ymax);
    for (let i = 0; i < gameInfo.yellowBallPushers.length; i++) {
        flipXY(gameInfo.yellowBallPushers[i], xmin, ymin, xmax, ymax);
    }
    for (let i = 0; i < gameInfo.yellowBallPushersTriggers.length; i++) {
        flipXY(gameInfo.yellowBallPushersTriggers[i], xmin, ymin, xmax, ymax);
    }
    for (let i = 0; i < gameInfo.yellowStoppers.length; i++) {
        flipXY(gameInfo.yellowStoppers[i], xmin, ymin, xmax, ymax);
    }
    for (let i = 0; i < gameInfo.yellowPausers.length; i++) {
        flipXY(gameInfo.yellowPausers[i], xmin, ymin, xmax, ymax);
    }

    return true;
}

