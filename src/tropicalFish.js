import { findElementByCoordinates } from "./balUtils.js";

export const tropicalFishPalettes = 8;
export const tropicalFishVariations = 5;

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
        if (stripes > 7) {
            stripes = 0;
        }
        gameInfo.tropicalFish[idx].stripes = stripes;
    }
    return idx;
}

export function changeVariation(gameInfo, x, y) {
    let idx = -1;
    let variation = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
        variation = gameInfo.tropicalFish[idx].variation + 1;
        if (variation > tropicalFishVariations) {
            variation = 0;
        }
        gameInfo.tropicalFish[idx].variation = variation;
    }
    return idx;
}

// This drawing is also used for answer balls.
export function drawFish(ctx, xc, yc, size, flipHorizontally, palette, stripes, variation) {
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
                eye: "#000000"
            }
            break;
        case 3:
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",    // rich golden yellow
                stripe: "#1A1A1A",  // near-black vertical bars
                stripeOutline: null,
                fin: "#FFE680",     // pale golden / translucent yellow
                eye: "#000000"
            }
            break;
        case 4:
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",    // deeper gold
                stripe: "#000000",  // true black stripes
                stripeOutline: null,
                fin: "#FFEB99",     // lighter yellow fins
                eye: "#000000"
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",    // soft tropical light blue
                stripe: "#2A6F97",  // deeper blue stripe
                stripeOutline: null,
                fin: "#A9DCEC",     // pale translucent blue
                eye: "#000000"
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",    // silvery blue-gray
                stripe: "#5F6F7A",  // muted gray stripe
                stripeOutline: null,
                fin: "#E3EDF2",     // very light translucent fin
                eye: "#000000"
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",    // deep ocean blue
                stripe: "#0B2F4A",  // very dark blue (almost black)
                stripeOutline: null,
                fin: "#3F7FA6",     // muted blue fins
                eye: "#000000"
            }
            break;
        case 8:
            colors = {
                body: "#FF8C1A",    // bright orange
                stripe: "#FFFFFF",  // clean white bands
                stripeOutline: "#000000",
                fin: "#FFB347",     // lighter orange fins
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
                eye: "#000000"
            };
            break;
    }

    // Body dimensions
    const bodyLength = w * 0.7;
    let bodyHeight = h * 0.4;
    switch (variation) {
        case 3:
        case 2:
            bodyHeight = h * 0.3;
            break;    
        case 4:
        case 5:
            bodyHeight = h * 0.5;
            break;    
        default:
            bodyHeight = h * 0.4;
            break;
    }
    const tailWidth = bodyLength * 0.25;
    const tailHeight = bodyHeight * 1;

    // Compute horizontal shift to center the full fish including tail fin
    const tailExtension = tailWidth * 0.8;
    const centerShift = tailExtension / 2;
    const left = xc - bodyLength / 2 + centerShift;
    const right = xc + bodyLength / 2 + centerShift;
    const top = yc - bodyHeight / 2;
    const bottom = yc + bodyHeight / 2;

    // ---- Top fin ----
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
    ctx.fillStyle = colors.body;
    ctx.beginPath();

    // Nose
    ctx.moveTo(right, yc);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, top, right - bodyLength * 0.5, top);
    ctx.lineTo(left + tailWidth, top);

    // Tail connection
    const connectionWidth = bodyHeight * 0.15;
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left + tailWidth, bottom);

    // Bottom curve
    ctx.lineTo(right - bodyLength * 0.5, bottom);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, bottom, right, yc);

    ctx.closePath();
    ctx.fill();

    // ---- Stripes ----
    ctx.save();

    // Clip to body shape
    ctx.beginPath();
    ctx.moveTo(right, yc);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, top, right - bodyLength * 0.5, top);
    ctx.lineTo(left + tailWidth, top);
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left + tailWidth, bottom);
    ctx.lineTo(right - bodyLength * 0.5, bottom);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, bottom, right, yc);
    ctx.closePath();
    ctx.clip();

    let stripeWidth = Math.max(1, size * 0.05);
    if ([1, 3, 5].includes(variation)) {
        stripeWidth = stripeWidth * 1.5;
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const headMargin = [1, 3].includes(variation) ? 0.3 : 0.1;
    const tailMargin = [1, 3].includes(variation) ? 0 : 0;
    const bodyWidth = right - left;
    for (let i = 0; i < stripes; i++) {
        const t = tailMargin + (i + 0.5) / stripes * (1 - tailMargin - headMargin);
        const x = left + t * bodyWidth;
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

    // ---- Tail fin ----
    ctx.fillStyle = colors.fin;
    ctx.beginPath();
    ctx.moveTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left - tailWidth * 0.9, yc - tailHeight / 2);
    ctx.quadraticCurveTo(left - tailWidth * 0.4, yc, left - tailWidth * 0.8, yc + tailHeight / 3);
    ctx.closePath();
    ctx.fill();

    // ---- Eye ----
    ctx.fillStyle = colors.eye;
    const eyeRadius = [2, 3].includes(variation) ? size * 0.03 : size * 0.04;
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