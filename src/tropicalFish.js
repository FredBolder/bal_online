import { findElementByCoordinates } from "./balUtils.js";
import { buildBodyPath } from "./fishBody.js";
import { drawBackgroundFins, drawForegroundFins } from "./fishFins.js";
import { drawStripes } from "./fishStripes.js";
import { drawEmarginateTail, drawForkedTail, drawRoundedTail, drawTruncateTail, getTailDimensions } from "./fishTails.js";
import { getTropicalFishColor } from "./tropicalFishColors.js";

export const tropicalFishFinVariations = 7;
export const tropicalFishPalettes = 14;
export const tropicalFishShapes = 5;
export const tropicalFishStripes = 18;
export const tropicalFishTails = 8;

export function changeFins(gameInfo, x, y) {
    let idx = -1;
    let fins = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        fins = gameInfo.tropicalFish[idx].fins + 1;
        if (fins > tropicalFishFinVariations) {
            fins = 1;
        }
        gameInfo.tropicalFish[idx].fins = fins;
    }
    return idx;
}

export function changePalette(gameInfo, x, y) {
    let idx = -1;
    let palette = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        palette = gameInfo.tropicalFish[idx].palette + 1;
        if (palette > tropicalFishPalettes) {
            palette = 1;
        }
        gameInfo.tropicalFish[idx].palette = palette;
    }
    return idx;
}

export function changeShape(gameInfo, x, y) {
    let idx = -1;
    let shape = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        shape = gameInfo.tropicalFish[idx].shape + 1;
        if (shape > tropicalFishShapes) {
            shape = 1;
        }
        gameInfo.tropicalFish[idx].shape = shape;
    }
    return idx;
}

export function changeStripes(gameInfo, x, y) {
    let idx = -1;
    let stripes = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        stripes = gameInfo.tropicalFish[idx].stripes + 1;
        if (stripes > tropicalFishStripes) {
            stripes = 0;
        }
        gameInfo.tropicalFish[idx].stripes = stripes;
    }
    return idx;
}

export function changeTail(gameInfo, x, y) {
    let idx = -1;
    let tail = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        tail = gameInfo.tropicalFish[idx].tail + 1;
        if (tail > tropicalFishTails) {
            tail = 1;
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
    const bodyCenter = (bodyLeft + bodyRight) / 2;
    const connectionHeight = bodyHeight * 0.15;
    let frontCurve = bodyLength * 0.12;
    let rearCurve = bodyLength * 0.3;
    switch (shape) {
        case 3:
            frontCurve = bodyLength * 0.08;
            break;
        case 5:
            frontCurve = bodyLength * 0.2;
            rearCurve = bodyLength * 0.2;
            break;
        default:
            break;
    }

    const bodyCurves = {
        topFront: {
            p0: { x: bodyRight, y: yc },
            p1: { x: bodyRight - frontCurve, y: top },
            p2: { x: bodyCenter, y: top }
        },
        topRear: {
            p0: { x: bodyCenter, y: top },
            p1: { x: bodyLeft + rearCurve, y: top },
            p2: { x: bodyLeft, y: yc - connectionHeight / 2 }
        },
        bottomRear: {
            p0: { x: bodyLeft, y: yc + connectionHeight / 2 },
            p1: { x: bodyLeft + rearCurve, y: bottom },
            p2: { x: bodyCenter, y: bottom }
        },
        bottomFront: {
            p0: { x: bodyCenter, y: bottom },
            p1: { x: bodyRight - frontCurve, y: bottom },
            p2: { x: bodyRight, y: yc }
        }
    };


    // ---- Dorsal, anal and pelvic fins ----
    drawBackgroundFins(ctx, fins, bodyHeight, bodyCurves, colors);


    // ---- Draw the body ----
    ctx.fillStyle = colors.body;
    ctx.strokeStyle = colors.body;

    buildBodyPath(ctx, bodyLeft, bodyRight, top, bottom, connectionHeight, rearCurve, frontCurve, bodyCenter, yc);
    ctx.fill();
    ctx.stroke();

    // DEBUG
    // TODO: Comment out
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // buildBodyPath(ctx, bodyLeft, bodyRight, top, bottom, connectionHeight, rearCurve, frontCurve, bodyCenter, yc);
    // ctx.stroke();
    // stripes = 0;


    // ---- Stripes ----
    drawStripes(ctx, size, bodyLeft, bodyRight, top, bottom, yc, connectionHeight, frontCurve, rearCurve, colors, stripes);

    // ---- Pectoral fins ----
    drawForegroundFins(ctx, fins, yc, bodyHeight, bodyLength, bodyRight, colors);

    // ---- Tail ----
    switch (tail) {
        case 2:
        case 3:
            drawEmarginateTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail, true);
            break;
        case 4:
            drawTruncateTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail);
            break;
        case 5:
            drawRoundedTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail);
            break;
        case 6:
            drawRoundedTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail);
            break;
        case 7:
        case 8:
            drawForkedTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail);
            break;
        default:
            // 1
            drawEmarginateTail(ctx, left, yc, tailWidth, tailHeight, connectionHeight, colors.tail);
            break;
    }

    // ---- Eye ----
    ctx.fillStyle = colors.eye;
    ctx.strokeStyle = colors.body;
    ctx.lineWidth = 1;
    const eyeRadius = ([1, 4].includes(shape)) ? size * 0.03 : size * 0.04;
    ctx.beginPath();
    ctx.arc(right - bodyLength * 0.15, yc - bodyHeight * 0.1, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Restore transform if flipped
    if (flipHorizontally) {
        ctx.restore();
    }

    ctx.lineWidth = 1;
}

export function moveTropicalFish(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let changed = false;
    let countTo = 12;
    let down = false;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let up = false;
    let upOrDown = false;

    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        const fish = gameInfo.tropicalFish[i];
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
        } else {
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
            } else {
                if (Math.random() < 0.1) {
                    if (fish.direction === 6) {
                        fish.direction = 4;
                    } else {
                        fish.direction = 6;
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
                        if (fish.x > 0) {
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
                        if (fish.x < maxX) {
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
                if (up) {
                    if (fish.y > 0) {
                        if ((gameData[fish.y - 1][fish.x] === 0) && (backData[fish.y - 1][fish.x] === 23)) {
                            fish.y--;
                        }
                    }
                }
                if (down) {
                    if (fish.y < maxY) {
                        if ((gameData[fish.y + 1][fish.x] === 0) && (backData[fish.y + 1][fish.x] === 23)) {
                            fish.y++;
                        }
                    }
                }
            }
            gameData[fish.y][fish.x] = 243;
        }
    }
    return update;
}