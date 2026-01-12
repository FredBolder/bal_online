import { findElementByCoordinates } from "./balUtils.js";

export const tropicalFishHeights = 3;
export const tropicalFishPalettes = 9;
export const tropicalFishStripes = 11;
export const tropicalFishTails = 3;

export function changeHeight(gameInfo, x, y) {
    let idx = -1;
    let height = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        height = gameInfo.tropicalFish[idx].height + 1;
        if (height > tropicalFishHeights) {
            height = 1;
        }
        gameInfo.tropicalFish[idx].height = height;
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
export function drawFish(ctx, xc, yc, size, flipHorizontally, palette, stripes, tail, height) {

    function drawEmarginateTail() {
        ctx.moveTo(left + tailWidth, yc + connectionWidth * 0.5);
        ctx.lineTo(left, yc + tailHeight * 0.5);
        ctx.quadraticCurveTo(left + (tailWidth * 0.95), yc, left, yc - tailHeight * 0.5);
        ctx.lineTo(left + tailWidth, yc - connectionWidth * 0.5);
    }

    function drawTruncateTail() {
        ctx.moveTo(left + tailWidth, yc + connectionWidth * 0.5);
        ctx.lineTo(left, yc + tailHeight * 0.5);
        ctx.lineTo(left, yc - tailHeight * 0.5);
        ctx.lineTo(left + tailWidth, yc - connectionWidth * 0.5);
    }

    function drawRoundedTail() {
        const tailBaseX = left + tailWidth;
        const arcCx = tailBaseX;
        const arcCy = yc;
        const radius = tailWidth;
        const topY = yc - tailHeight * 0.5;
        const bottomY = yc + tailHeight * 0.5;
        const connectionTop = yc - connectionWidth * 0.5;
        const connectionBottom = yc + connectionWidth * 0.5;
        const sTopRaw = (topY - arcCy) / radius;
        const sBottomRaw = (bottomY - arcCy) / radius;
        const sTop = Math.max(-1, Math.min(1, sTopRaw));
        const sBottom = Math.max(-1, Math.min(1, sBottomRaw));
        const startAngle = Math.PI - Math.asin(sTop);
        const endAngle = Math.PI - Math.asin(sBottom);
        const startX = arcCx + radius * Math.cos(startAngle);
        const startY = arcCy + radius * Math.sin(startAngle);
        ctx.moveTo(tailBaseX, connectionTop);
        ctx.lineTo(startX, startY);
        ctx.arc(arcCx, arcCy, radius, startAngle, endAngle, true);
        ctx.lineTo(tailBaseX, connectionBottom);
    }

    if (flipHorizontally) {
        ctx.save();
        ctx.translate(xc, 0);
        ctx.scale(-1, 1);
        ctx.translate(-xc, 0);
    }

    const w = size;
    const h = size;

    // Color palettes
    let colors = null;
    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",    // yellow-orange
                stripe: "#FF8C00",  // orange
                stripeOutline: null,
                fin: "#4CAF50",     // tropical green
                tail: "#4CAF50",
                eye: "#000000"
            }
            break;
        case 3:
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",    // rich golden yellow
                stripe: "#1A1A1A",  // near-black
                stripeOutline: null,
                fin: "#FFE680",     // pale golden / translucent yellow
                tail: "#FFE680",
                eye: "#000000"
            }
            break;
        case 4:
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",    // deeper gold
                stripe: "#000000",  // black
                stripeOutline: null,
                fin: "#FFEB99",     // lighter yellow
                tail: "#FFEB99",
                eye: "#000000"
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",    // soft tropical light blue
                stripe: "#2A6F97",  // deeper blue
                stripeOutline: null,
                fin: "#A9DCEC",     // pale translucent blue
                tail: "#A9DCEC",
                eye: "#000000"
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",    // silvery blue-gray
                stripe: "#5F6F7A",  // muted gray
                stripeOutline: null,
                fin: "#E3EDF2",     // very light translucent
                tail: "#E3EDF2",
                eye: "#000000"
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",    // deep ocean blue
                stripe: "#0B2F4A",  // very dark blue (almost black)
                stripeOutline: null,
                fin: "#3F7FA6",     // muted blue
                tail: "#3F7FA6",
                eye: "#000000"
            }
            break;
        case 8:
            // Clownfish
            colors = {
                body: "#FF8C1A",    // bright orange
                stripe: "#FFFFFF",  // clean white
                stripeOutline: "#000000",
                fin: "#FFB347",     // lighter orange
                tail: "#FFB347",
                eye: "#000000"
            }
            break;
        case 9:
            // Redtail shark
            colors = {
                body: "#222222",    // deep matte black
                stripe: "#222222",  // no stripe
                stripeOutline: null,
                fin: "#333333",     // very dark gray (almost black)
                tail: "#FF3B3B",    // vivid red
                eye: "#000000"
            }
            break;
        default:
            // 1
            colors = {
                body: "#FF6347",    // red-orange
                stripe: "#FF4500",  // red-orange
                stripeOutline: null,
                fin: "#FFD700",     // gold
                tail: "#FFD700",
                eye: "#000000"
            };
            break;
    }

    // Body dimensions
    const bodyLength = w * 0.7;
    let bodyHeight = 0;
    switch (height) {
        case 1:
            bodyHeight = h * 0.25;
            break;
        case 3:
            bodyHeight = h * 0.45;
            break;
        default:
            // 2
            bodyHeight = h * 0.35;
            break;
    }
    let tailWidth = 0;
    let tailHeight = 0;
    switch (tail) {
        case 1:
            // Emarginate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 2:
            // Truncate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
            break;
        case 3:
            // Rounded
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
            break;
        default:
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 1;
            break;
    }

    // Horizontal center
    const left = xc - ((bodyLength + tailWidth) / 2);
    const right = xc + ((bodyLength + tailWidth) / 2);

    const top = yc - bodyHeight / 2;
    const bottom = yc + bodyHeight / 2;

    // ---- Top fin ----
    // The fins have to be drawn before the body
    ctx.fillStyle = colors.fin;
    const dorsalHeight = bodyHeight * 0.5;
    ctx.beginPath();
    ctx.moveTo(right - bodyLength * 0.6, top + (0.05 * bodyHeight));
    ctx.lineTo(right - bodyLength * 0.8, top - dorsalHeight);
    ctx.quadraticCurveTo(right - bodyLength * 0.5, top - dorsalHeight / 2, right - bodyLength * 0.4, top + (0.05 * bodyHeight));
    ctx.closePath();
    ctx.fill();

    // ---- Bottom fin ----
    ctx.fillStyle = colors.fin;
    const analHeight = bodyHeight * 0.35;
    ctx.beginPath();
    ctx.moveTo(right - bodyLength * 0.6, bottom - (0.05 * bodyHeight));
    ctx.lineTo(right - bodyLength * 0.8, bottom + analHeight);
    ctx.quadraticCurveTo(right - bodyLength * 0.45, bottom + analHeight / 2, right - bodyLength * 0.35, bottom - (0.05 * bodyHeight));
    ctx.closePath();
    ctx.fill();

    // ---- Body outline ----
    const bodyLeft = left + tailWidth;
    const bodyRight = right;
    const midX = (bodyLeft + bodyRight) / 2;
    const connectionWidth = bodyHeight * 0.15;
    const frontCurve = (height === 3) ? bodyLength * 0.08 : bodyLength * 0.12;
    const rearCurve = bodyLength * 0.3;

    ctx.fillStyle = colors.body;
    ctx.beginPath();
    // Nose
    ctx.moveTo(bodyRight, yc);
    // Nose to mid-body
    ctx.quadraticCurveTo(bodyRight - frontCurve, top, midX, top);
    // Mid-body to tail root
    ctx.quadraticCurveTo(bodyLeft + rearCurve, top, bodyLeft, yc - connectionWidth / 2);
    // Tail connection
    ctx.lineTo(bodyLeft, yc + connectionWidth / 2);
    // Tail root to mid-body
    ctx.quadraticCurveTo(bodyLeft + rearCurve, bottom, midX, bottom);
    // Mid-body to nose
    ctx.quadraticCurveTo(bodyRight - frontCurve, bottom, bodyRight, yc);
    ctx.closePath();
    ctx.fill();

    // ---- Stripes ----
    ctx.save();

    // Clip to body shape
    ctx.beginPath();
    ctx.moveTo(bodyRight, yc);
    ctx.quadraticCurveTo(bodyRight - frontCurve, top, midX, top);
    ctx.quadraticCurveTo(bodyLeft + rearCurve, top, bodyLeft, yc - connectionWidth / 2);
    ctx.lineTo(bodyLeft, yc + connectionWidth / 2);
    ctx.quadraticCurveTo(bodyLeft + rearCurve, bottom, midX, bottom);
    ctx.quadraticCurveTo(bodyRight - frontCurve, bottom, bodyRight, yc);
    ctx.closePath();
    ctx.clip();

    let headMargin = 0.1;
    let numberOfStripes = 5;
    let stripeWidth = Math.max(1, size * 0.05);

    if (stripes > 7) {
        numberOfStripes = stripes - 7;
        stripeWidth = stripeWidth * 1.5;
        headMargin = 0.3;
    } else {
        numberOfStripes = stripes;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const tailMargin = 0;
    const bodyWidth = bodyRight - bodyLeft;
    for (let i = 0; i < numberOfStripes; i++) {
        const t = tailMargin + (i + 0.5) / numberOfStripes * (1 - tailMargin - headMargin);
        const x = bodyLeft + t * bodyWidth;
        const distFromCenter = Math.abs(t - 0.5);
        const curveStrength = (0.12 - distFromCenter * 0.08) * bodyLength;
        const tilt = bodyLength * 0.03;
        const topOffset = (0.02 + distFromCenter * 0.05) * bodyHeight;
        const bottomOffset = (0.02 + distFromCenter * 0.05) * bodyHeight;
        const xTop = x - tilt;
        const xBottom = x + tilt;
        const yTop = top + topOffset;
        const yBottom = bottom - bottomOffset;
        const cpX = x + curveStrength;
        const cpY = yc;

        if (colors.stripeOutline !== null) {
            ctx.strokeStyle = colors.stripeOutline;
            ctx.lineWidth = stripeWidth * 1.6;
            ctx.beginPath();
            ctx.moveTo(xTop, yTop);
            ctx.quadraticCurveTo(cpX, cpY, xBottom, yBottom);
            ctx.stroke();
        }
        ctx.strokeStyle = colors.stripe;
        ctx.lineWidth = stripeWidth;
        ctx.beginPath();
        ctx.moveTo(xTop, yTop);
        ctx.quadraticCurveTo(cpX, cpY, xBottom, yBottom);
        ctx.stroke();
    }

    ctx.restore();

    // ---- Tail ----
    ctx.fillStyle = colors.tail;
    ctx.beginPath();
    switch (tail) {
        case 2:
            drawTruncateTail();
            break;
        case 3:
            drawRoundedTail();
            break;
        default:
            // 1
            drawEmarginateTail();
            break;
    }
    ctx.closePath();
    ctx.fill();

    // ---- Eye ----
    ctx.fillStyle = colors.eye;
    const eyeRadius = (height === 1) ? size * 0.03 : size * 0.04;
    ctx.beginPath();
    ctx.arc(right - bodyLength * 0.15, yc - bodyHeight * 0.1, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Restore transform if flipped
    if (flipHorizontally) {
        ctx.restore();
    }

    ctx.lineWidth = 1;
}

export function moveTropicalFish(backData, gameData, gameInfo) {
    let changed = false;
    let down = false;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let up = false;
    let upOrDown = false;

    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        down = false;
        up = false;
        upOrDown = false;
        const fish = gameInfo.tropicalFish[i];
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