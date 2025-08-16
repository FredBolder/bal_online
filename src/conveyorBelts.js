import { findElementByCoordinate, moveObject } from "./balUtils.js";

export function changeConveyorBeltMode(gameInfo, x, y, mode) {
  let idx = -1;

  if (conveyorBeltModes().includes(mode)) {
    if (idx === -1) {
      idx = findElementByCoordinate(x, y, gameInfo.conveyorBelts);
      if (idx >= 0) {
        gameInfo.conveyorBelts[idx].mode = mode;
      }
    }
  }
  return idx;
}

export function conveyorBeltModes() {
    return ["notrigger", "nonerightleft", "rightleft", "noneright", "noneleft", "none", "right", "left"];
}

export function moveConveyorBelts(gameData, gameInfo) {
    let updated = false;
    let stop = false;
    let xmin = -1;
    let xmax = -1;
    let columnMax = gameData[0].length;
    for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        const conveyorBelt = gameInfo.conveyorBelts[i];
        let y = conveyorBelt.y;
        if (conveyorBelt.direction !== "none") {
            xmin = conveyorBelt.x;
            xmax = conveyorBelt.x;
            if (xmin < (columnMax - 1)) {
                stop = false
                for (let j = xmin + 1; (j < columnMax - 1) && !stop; j++) {
                    switch (gameData[conveyorBelt.y][j]) {
                        case 172:
                            xmax = j;
                            break;
                        case 173:
                            xmax = j;
                            stop = true;
                            break;
                        default:
                            xmax = xmin; // Invalid
                            stop = true;
                            break;
                    }

                }
            }
            if (xmax > xmin) {
                if (conveyorBelt.direction === "right") {
                    for (let x = xmax; x >= xmin; x--) {
                        if (x < (columnMax - 1)) {
                            stop = false;
                            for (let j = y - 1; j >= 0 && !stop; j--) {
                                if ([2, 4, 8, 40, 93, 94].includes(gameData[j][x]) && gameData[j][x + 1] === 0) {
                                    moveObject(gameData, gameInfo, x, j, x + 1, j);
                                    updated = true;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
                if (conveyorBelt.direction === "left") {
                    for (let x = xmin; x <= xmax; x++) {
                        if (x > 0) {
                            stop = false;
                            for (let j = y - 1; j >= 0 && !stop; j--) {
                                if ([2, 4, 8, 40, 93, 94].includes(gameData[j][x]) && gameData[j][x - 1] === 0) {
                                    moveObject(gameData, gameInfo, x, j, x - 1, j);
                                    updated = true;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return updated;
}

export function nextConveyorBeltDirection(conveyorBelt) {
    switch (conveyorBelt.mode) {
        case "nonerightleft":
            switch (conveyorBelt.direction) {
                case "none":
                    conveyorBelt.direction = "right";
                    break;
                case "right":
                    conveyorBelt.direction = "left";
                    break;
                case "left":
                    conveyorBelt.direction = "none";
                    break;
                default:
                    break;
            }
            break;
        case "rightleft":
            switch (conveyorBelt.direction) {
                case "none":
                    conveyorBelt.direction = "right";
                    break;
                case "right":
                    conveyorBelt.direction = "left";
                    break;
                case "left":
                    conveyorBelt.direction = "right";
                    break;
                default:
                    break;
            }
            break;
        case "noneright":
            switch (conveyorBelt.direction) {
                case "none":
                    conveyorBelt.direction = "right";
                    break;
                case "right":
                    conveyorBelt.direction = "none";
                    break;
                case "left":
                    conveyorBelt.direction = "none";
                    break;
                default:
                    break;
            }
            break;
        case "noneleft":
            switch (conveyorBelt.direction) {
                case "none":
                    conveyorBelt.direction = "left";
                    break;
                case "right":
                    conveyorBelt.direction = "none";
                    break;
                case "left":
                    conveyorBelt.direction = "none";
                    break;
                default:
                    break;
            }
            break;
        case "none":
            conveyorBelt.direction = "none";
            break;
        case "right":
            conveyorBelt.direction = "right";
            break;
        case "left":
            conveyorBelt.direction = "left";
            break;
        default:
            break;
    }
}

