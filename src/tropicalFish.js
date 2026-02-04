import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";
import { freeToSwim } from "./fish.js";
import { buildBody, buildBodyCurves, drawBody } from "./fishBody.js";
import { drawBackgroundFins, drawForegroundFins } from "./fishFins.js";
import { nearestFoodPosition } from "./fishFood.js";
import { drawStripes } from "./fishStripes.js";
import { drawTail, getTailDimensions } from "./fishTails.js";
import { globalVars } from "./glob.js";
import { getTropicalFishColor } from "./tropicalFishColors.js";

export const tropicalFishFinVariations = 11;
export const tropicalFishPalettes = 34;
export const tropicalFishShapes = 9;
export const tropicalFishStripes = 21;
export const tropicalFishTails = 8;

export function changeFins(gameInfo, x, y, decrease) {
    const step = decrease ? -1 : 1;
    let idx = -1;
    let fins = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        fins = gameInfo.tropicalFish[idx].fins + step;
        if (fins > tropicalFishFinVariations) {
            fins = 1;
        }
        if (fins < 1) {
            fins = tropicalFishFinVariations;
        }
        gameInfo.tropicalFish[idx].fins = fins;
    }
    return idx;
}

export function changePalette(gameInfo, x, y, decrease) {
    const step = decrease ? -1 : 1;
    let idx = -1;
    let palette = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        palette = gameInfo.tropicalFish[idx].palette + step;
        if (palette > tropicalFishPalettes) {
            palette = 1;
        }
        if (palette < 1) {
            palette = tropicalFishPalettes;
        }
        gameInfo.tropicalFish[idx].palette = palette;
    }
    return idx;
}

export function changeShape(gameInfo, x, y, decrease) {
    const step = decrease ? -1 : 1;
    let idx = -1;
    let shape = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        shape = gameInfo.tropicalFish[idx].shape + step;
        if (shape > tropicalFishShapes) {
            shape = 1;
        }
        if (shape < 1) {
            shape = tropicalFishShapes;
        }
        gameInfo.tropicalFish[idx].shape = shape;
    }
    return idx;
}

export function changeStripes(gameInfo, x, y, decrease) {
    const step = decrease ? -1 : 1;
    let idx = -1;
    let stripes = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        stripes = gameInfo.tropicalFish[idx].stripes + step;
        if (stripes > tropicalFishStripes) {
            stripes = 0;
        }
        if (stripes < 0) {
            stripes = tropicalFishStripes;
        }
        gameInfo.tropicalFish[idx].stripes = stripes;
    }
    return idx;
}

export function changeTail(gameInfo, x, y, decrease) {
    const step = decrease ? -1 : 1;
    let idx = -1;
    let tail = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        tail = gameInfo.tropicalFish[idx].tail + step;
        if (tail > tropicalFishTails) {
            tail = 1;
        }
        if (tail < 1) {
            tail = tropicalFishTails;
        }
        gameInfo.tropicalFish[idx].tail = tail;
    }
    return idx;
}

// This drawing is also used for answer balls.
export function drawFish(ctx, xc, yc, size, flipHorizontally, palette, shape, tail, fins, stripes) {
    if (flipHorizontally) {
        ctx.save();
        ctx.translate(xc, 0);
        ctx.scale(-1, 1);
        ctx.translate(-xc, 0);
    }

    const w = size;
    const h = size;

    // Color palettes
    const colors = getTropicalFishColor(palette);

    // Body dimensions
    let bodyLength = 0;
    let bodyHeight = 0;
    switch (shape) {
        case 1:
            bodyHeight = h * 0.25;
            bodyLength = w * 0.74;
            break;
        case 3:
            bodyHeight = h * 0.3;
            bodyLength = w * 0.6;
            break;
        case 4:
            bodyHeight = h * 0.15;
            bodyLength = w * 0.74;
            break;
        case 5:
            bodyHeight = h * 0.45;
            bodyLength = w * 0.55;
            break;
        case 6:
            bodyHeight = h * 0.2;
            bodyLength = w * 0.74;
            break;
        case 7:
            // Tang
            bodyHeight = h * 0.45;
            bodyLength = w * 0.7;
            break;
        case 8:
            // Snapper
            bodyHeight = h * 0.25;
            bodyLength = w * 0.74;
            break;
        case 9:
            // Siamese Algae Eater
            bodyHeight = h * 0.15;
            bodyLength = w * 0.74;
            break;
        default:
            // 2
            bodyHeight = h * 0.3;
            bodyLength = w * 0.7;
            break;
    }

    const { tailWidth, tailHeight } = getTailDimensions(tail, bodyLength, bodyHeight);

    // Horizontal center
    const left = xc - ((bodyLength + tailWidth) / 2);
    const right = xc + ((bodyLength + tailWidth) / 2);

    const top = yc - bodyHeight / 2;
    const bottom = yc + bodyHeight / 2;

    // ---- Body outline ----
    const bodyLeft = left + tailWidth;
    const bodyRight = right;
    const connectionHeight = bodyHeight * 0.15;


    let bodyCurvature = null;
    let noseYOffset = 0;
    switch (shape) {
        case 3:
            // Yellow Tail Damselfish
            bodyCurvature = {
                topFrontBodyCpPos: 0.8,
                topFrontBodyCpDist: 0.3,
                topRearBodyCpPos: 0.6,
                topRearBodyCpDist: 0.2,
                bottomFrontBodyCpPos: 0.8,
                bottomFrontBodyCpDist: 0.3,
                bottomRearBodyCpPos: 0.6,
                bottomRearBodyCpDist: 0.2,
            };
            break;
        case 4:
            // Siamese Algae Eater
            bodyCurvature = {
                topFrontBodyCpPos: 0.9,
                topFrontBodyCpDist: 0.15,
                topRearBodyCpPos: 0.6,
                topRearBodyCpDist: 0.08,
                bottomFrontBodyCpPos: 0.9,
                bottomFrontBodyCpDist: 0.15,
                bottomRearBodyCpPos: 0.6,
                bottomRearBodyCpDist: 0.08,
            };
            break;
        case 5:
            // Angelfish and Discus
            bodyCurvature = {
                topFrontBodyCpPos: 0.5,
                topFrontBodyCpDist: 0.35,
                topRearBodyCpPos: 0.5,
                topRearBodyCpDist: 0.35,
                bottomFrontBodyCpPos: 0.5,
                bottomFrontBodyCpDist: 0.35,
                bottomRearBodyCpPos: 0.5,
                bottomRearBodyCpDist: 0.35,
            };
            break;
        case 6:
            // Black Neon Tetra
            bodyCurvature = {
                topFrontBodyCpPos: 0.8,
                topFrontBodyCpDist: 0.2,
                topRearBodyCpPos: 0.9,
                topRearBodyCpDist: 0.05,
                bottomFrontBodyCpPos: 0.8,
                bottomFrontBodyCpDist: 0.2,
                bottomRearBodyCpPos: 0.9,
                bottomRearBodyCpDist: 0.05,
            };
            break;
        case 7:
            // Tang
            bodyCurvature = {
                topFrontBodyCpPos: 0.95,
                topFrontBodyCpDist: 0.25,
                topRearBodyCpPos: 0.5,
                topRearBodyCpDist: 0.2,
                bottomFrontBodyCpPos: 0.5,
                bottomFrontBodyCpDist: 0.2,
                bottomRearBodyCpPos: 0.5,
                bottomRearBodyCpDist: 0.2,
            };
            break;
        case 8:
            // Snapper
            bodyCurvature = {
                topFrontBodyCpPos: 0.7,
                topFrontBodyCpDist: 0.35,
                topRearBodyCpPos: 0.5,
                topRearBodyCpDist: 0.1,
                bottomFrontBodyCpPos: 0.7,
                bottomFrontBodyCpDist: 0.3,
                bottomRearBodyCpPos: 0.5,
                bottomRearBodyCpDist: 0.1,
            };
            noseYOffset = bodyHeight * 0.1;
            break;
        case 9:
            // Siamese Algae Eater
            bodyCurvature = {
                topFrontBodyCpPos: 0.85,
                topFrontBodyCpDist: 0.23,
                topRearBodyCpPos: 0.6,
                topRearBodyCpDist: 0.08,
                bottomFrontBodyCpPos: 0.9,
                bottomFrontBodyCpDist: 0.15,
                bottomRearBodyCpPos: 0.6,
                bottomRearBodyCpDist: 0.08,
            };
            noseYOffset = bodyHeight * 0.15;
            break;
        default:
            bodyCurvature = {
                topFrontBodyCpPos: 0.7, // 0 = left, 1 = right (towards head)
                topFrontBodyCpDist: 0.3,
                topRearBodyCpPos: 0.5,
                topRearBodyCpDist: 0.1,
                bottomFrontBodyCpPos: 0.7,
                bottomFrontBodyCpDist: 0.3,
                bottomRearBodyCpPos: 0.5,
                bottomRearBodyCpDist: 0.1,
            };
            break;
    }

    // no bending
    // bodyCurvature = {
    //     topFrontBodyCpPos: 0.5,
    //     topFrontBodyCpDist: 0,
    //     topRearBodyCpPos: 0.5,
    //     topRearBodyCpDist: 0,
    //     bottomFrontBodyCpPos: 0.5,
    //     bottomFrontBodyCpDist: 0,
    //     bottomRearBodyCpPos: 0.5,
    //     bottomRearBodyCpDist: 0,
    // };

    // isTang (boolean)
    // noseLength (pixels): Range 0 .. 0.3 * bodyLength
    // noseTipYOffset (pixels): Range -0.25 .. 0.35 * bodyHeight
    // headTopYOffset (pixels): 0.06 * bodyHeight,
    // headBottomYOffset (pixels): 0.08 * bodyHeight,
    // noseCurvature: (factor) 0.10

    const bodyOptions = {
        isTang: (shape === 7) ? true : false,
        noseLength: bodyLength * 0.18, // was 0.18
        noseTipYOffset: bodyHeight * 0.18, // was 0.15 
        noseYOffset,
        headTopYOffset: bodyHeight * 0.25, // was 0.06
        headBottomYOffset: bodyHeight * 0.08, // was 0.08
        noseCurvature: 0.15, // was 0.1
        ...bodyCurvature,
    }

    const bodyPath = new Path2D();
    const geom = buildBody(bodyPath, bodyLeft, bodyRight, top, bottom, connectionHeight, yc, bodyOptions);

    const bodyCurves = buildBodyCurves(
        { ...geom, bodyLeft, top, bottom, yc, connectionHeight },
        bodyOptions
    );

    // ---- Dorsal, anal and pelvic fins ----
    let heightFactor = 1;
    if (((shape === 5) && (fins === 5)) || ((shape === 7) && [4, 5].includes(fins))) {
        heightFactor = 0.5;
    }
    drawBackgroundFins(ctx, fins, bodyHeight * heightFactor, bodyCurves, colors);


    // ---- Draw the body ----
    drawBody(ctx, bodyPath, bodyLeft, bodyRight, top, bottom, yc, colors);

    // ---- Stripes ----
    if (!globalVars.debug) {
        drawStripes(ctx, bodyPath, size, bodyLeft, bodyRight, top, bottom, yc, colors, stripes);
    }

    // ---- Pectoral fins ----
    if (!globalVars.debug) {
        drawForegroundFins(ctx, fins, yc, bodyHeight, bodyLength, bodyRight, colors);
    }

    // ---- Tail ----
    drawTail(ctx, left, yc, tail, tailWidth, tailHeight, connectionHeight, colors);

    // ---- Eye ----
    ctx.fillStyle = colors.eye;
    ctx.strokeStyle = colors.body;
    ctx.lineWidth = 1;
    const xEye = bodyOptions.isTang ? geom.headRight - bodyLength * 0.04 : geom.headRight - bodyLength * 0.15;
    const yEye = yc - bodyHeight * 0.1;
    const eyeRadius = ([1, 4, 9].includes(shape)) ? size * 0.03 : size * 0.04;
    ctx.beginPath();
    ctx.arc(xEye, yEye, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
    if (colors.upperBody === null) {
        ctx.stroke();
    }
    // Pupil
    ctx.fillStyle = colors.eyePupil;
    ctx.beginPath();
    ctx.arc(xEye, yEye, eyeRadius * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // ---- Barb ----
    if (bodyOptions.isTang) {
        const barbHeight = Math.max(1, size * 0.04);
        // Purple tang has thinner barb
        const barbWidth = (palette === 20) ? Math.max(1, size * 0.01) : Math.max(1, size * 0.025);
        ctx.strokeStyle = colors.barb;
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = Math.max(1, barbWidth);
        ctx.moveTo(bodyLeft - (barbHeight * 0.5), yc);
        ctx.lineTo(bodyLeft + (barbHeight * 0.5), yc);
        ctx.stroke();
    }

    // Restore transform if flipped
    if (flipHorizontally) {
        ctx.restore();
    }

    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
}

function nextToFood(gameData, x, y) {
    const elementLeft = getGameDataValue(gameData, x - 1, y);
    const elementRight = getGameDataValue(gameData, x + 1, y);
    return ((elementLeft === 251) || (elementRight === 251));
}

export function moveTropicalFish(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let changed = false;
    let countTo = 12;
    let down = false;
    let foodX = -1;
    let foodY = -1;
    let goToFood = false;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let up = false;
    let upOrDown = false;

    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        const fish = gameInfo.tropicalFish[i];
        goToFood = false;

        if (![20, 23].includes(backData[fish.y][fish.x])) continue;

        if (fish.isDead) {
            countTo = 12;
        } if (gameVars.tropicalFishCountToOverride > 0) {
            countTo = gameVars.tropicalFishCountToOverride;
        } else {
            switch (fish.tail) {
                case 4:
                    // truncate
                    countTo = 8;
                    break;
                case 1:
                case 2:
                case 3:
                    // emarginate
                    countTo = 7;
                    break;
                case 7:
                case 8:
                    // forked
                    countTo = 6;
                    break;
                default:
                    // normal (rounded)
                    countTo = 10;
                    break;
            }
            switch (fish.shape) {
                case 3:
                    countTo += 5;
                    break;
                case 4:
                case 9:
                    countTo -= 2;
                    break;
                case 5:
                    countTo += 10;
                    break;
                default:
                    break;
            }
        }
        if (fish.counter < countTo) {
            fish.counter++;
            continue;
        }

        update = true;
        fish.counter = 0;
        down = false;
        up = false;
        upOrDown = false;
        gameData[fish.y][fish.x] = 0;

        if (fish.isDead) {
            if (fish.y < maxY) {
                if ((gameData[fish.y + 1][fish.x] === 0) && (backData[fish.y + 1][fish.x] === 23)) {
                    fish.y++;
                }
            }
            gameData[fish.y][fish.x] = 243;
            continue;
        }

        const foodPosition = nearestFoodPosition(backData, gameInfo, fish.x, fish.y);
        if ((foodPosition.x >= 0) && (foodPosition.y >= 0)) {
            goToFood = true;
            foodX = foodPosition.x;
            foodY = foodPosition.y;
        }

        if (Math.random() < 0.1) {
            if (fish.direction === 6) {
                fish.direction = 4;
            } else {
                fish.direction = 6;
            }
        }
        if (goToFood) {
            if (fish.x > foodX + 1) {
                fish.direction = fish.blocked ? 6 : 4;
            }
            if (fish.x < foodX - 1) {
                fish.direction = fish.blocked ? 4 : 6;
            }
            if (fish.blocked) {
                upOrDown = true;
            }
            fish.blocked = false;
            if (fish.y > foodY) {
                if (freeToSwim(foodX, fish.x, fish.y - 1, gameData) && freeToSwim(foodX, fish.x, fish.y, gameData)) {
                    up = true;
                }
            }
            if (fish.y < foodY) {
                if (freeToSwim(foodX, fish.x, fish.y + 1, gameData) && freeToSwim(foodX, fish.x, fish.y, gameData)) {
                    down = true;
                }
            }
        }
        if (fish.direction === 6) {
            changed = false;
            if (fish.x < maxX) {
                if ((gameData[fish.y][fish.x + 1] === 0) && (backData[fish.y][fish.x + 1] === 23)) {
                    fish.x++;
                    changed = true;
                }
            }
            if (!changed) {
                if ((fish.x > 0) && !goToFood) {
                    if ((gameData[fish.y][fish.x - 1] === 0) && (backData[fish.y][fish.x - 1] === 23)) {
                        fish.direction = 4;
                        changed = true;
                    }
                }
                upOrDown = !changed;
            }
        } else if (fish.direction === 4) {
            changed = false;
            if (fish.x > 0) {
                if ((gameData[fish.y][fish.x - 1] === 0) && (backData[fish.y][fish.x - 1] === 23)) {
                    fish.x--;
                    changed = true;
                }
            }
            if (!changed) {
                if ((fish.x < maxX) && !goToFood) {
                    if ((gameData[fish.y][fish.x + 1] === 0) && (backData[fish.y][fish.x + 1] === 23)) {
                        fish.direction = 6;
                        changed = true;
                    }
                }
                upOrDown = !changed;
            }
        }
        if (upOrDown) {
            if (Math.random() > 0.5) {
                if (!down) {
                    up = true;
                }
            } else {
                if (!up) {
                    down = true;
                }
            }
        }
        if (up && !nextToFood(gameData, fish.x, fish.y)) {
            if (fish.y > 0) {
                if ((gameData[fish.y - 1][fish.x] === 0) && (backData[fish.y - 1][fish.x] === 23)) {
                    fish.y--;
                } else if (!changed) {
                    fish.blocked = true;
                }
            }
        }
        if (down && !nextToFood(gameData, fish.x, fish.y)) {
            if (fish.y < maxY) {
                if ((gameData[fish.y + 1][fish.x] === 0) && (backData[fish.y + 1][fish.x] === 23)) {
                    fish.y++;
                } else if (!changed) {
                    fish.blocked = true;
                }
            }
        }

        gameData[fish.y][fish.x] = 243;

        // check food
        for (let j = 0; j < gameInfo.fishFood.length; j++) {
            const food = gameInfo.fishFood[j];

            if ((food.foodLeft <= 0) || (fish.y !== food.y)) continue;

            if (fish.x - 1 === food.x) {
                fish.direction = 4;
                food.foodLeft--;
            }
            if (fish.x + 1 === food.x) {
                fish.direction = 6;
                food.foodLeft--;
            }
            if ((food.foodLeft <= 0) && (gameData[food.y][food.x] === 251)) {
                gameData[food.y][food.x] = 0; // object still exists, but foodLeft is 0
            }
        }
    }
    return update;
}