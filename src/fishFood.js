import { addObject } from "./addRemoveObject.js";
import { falling, findElementByCoordinates, inWater, moveObject } from "./balUtils.js";
import { hasForceUp } from "./force.js";
import { dist } from "./graphicUtils.js";
import { hasTopGlideLeftToRight, hasTopGlideRightToLeft } from "./triangleStones.js";
import { getConnectedWater } from "./water.js";

function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function drawFishFood(ctx, xc, yc, size, foodLeft) {
    const pelletRadius = size * 0.04;
    const seed = 27;

    ctx.fillStyle = "#c1440e";

    for (let i = 0; i < foodLeft; i++) {
        const r1 = seededRandom(seed + i * 13);
        const r2 = seededRandom(seed + i * 29);
        const px = xc + ((r1 - 0.5) * (size - pelletRadius) * 0.9);
        const py = yc + ((r2 - 0.5) * (size - pelletRadius) * 0.9);

        ctx.beginPath();
        ctx.arc(px, py, pelletRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function drawFishFoodInPot(ctx, xmin, ymin, size) {
    const cx = xmin + size / 2;
    const seed = 26;
    const ymax = ymin + size;

    const lineWidth = Math.max(1, size * 0.04);

    const potHeight = size * 0.95;
    const potWidthBottom = size * 0.45;
    const potWidthTop = size * 0.6;
    const rimOffset = size * 0.08;

    const yBottom = ymax - lineWidth / 2;
    const yTop = yBottom - potHeight;

    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    // Pot body
    ctx.beginPath();
    ctx.moveTo(cx - potWidthBottom / 2, yBottom);
    ctx.lineTo(cx - potWidthTop / 2, yTop + rimOffset);
    ctx.lineTo(cx + potWidthTop / 2, yTop + rimOffset);
    ctx.lineTo(cx + potWidthBottom / 2, yBottom);
    ctx.closePath();
    ctx.fillStyle = "#9c5a2e";
    ctx.fill();
    ctx.strokeStyle = "#6f3f1f";
    ctx.stroke();

    // Rim
    ctx.beginPath();
    ctx.moveTo(cx - potWidthTop / 2, yTop + rimOffset);
    ctx.lineTo(cx + potWidthTop / 2, yTop + rimOffset);
    ctx.strokeStyle = "#b86b36";
    ctx.stroke();

    // Fish food
    const pelletCount = 8;
    const pelletRadius = size * 0.04;

    ctx.fillStyle = "#c1440e";

    for (let i = 0; i < pelletCount; i++) {
        const r1 = seededRandom(seed + i * 13);
        const r2 = seededRandom(seed + i * 29);
        const py = yTop + potHeight * 0.35 + r2 * potHeight * 0.45;
        const t = (py - (yTop + rimOffset)) / (potHeight - rimOffset);
        const clampedT = Math.max(0, Math.min(1, t));
        const potWidthAtY = potWidthTop + (potWidthBottom - potWidthTop) * clampedT;
        const padding = pelletRadius + lineWidth * 0.6;
        const px = cx + (r1 - 0.5) * (potWidthAtY - padding * 2);

        ctx.beginPath();
        ctx.arc(px, py, pelletRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

export function feedFish(backData, gameData, gameInfo, direction) {
    let deltaX = 0;
    let deltaY = 0;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    const x = gameInfo.blueBall.x;
    const y = gameInfo.blueBall.y;
    let xTarget = -1;
    let yTarget = -1;

    switch (direction) {
        case "left":
            deltaX = -1;
            break;
        case "right":
            deltaX = 1;
            break;
        case "up":
            deltaY = -1;
            break;
        case "down":
            deltaY = 1;
            break;
        case "upleft":
            if ((y > 0) && (gameData[y - 1][x] === 0)) {
                deltaX = -1;
                deltaY = -1;
            }
            break;
        case "upright":
            if ((y > 0) && (gameData[y - 1][x] === 0)) {
                deltaX = 1;
                deltaY = -1;
            }
            break;
        case "downleft":
            if ((x > 0) && (y < maxY) && (gameData[y][x - 1] === 0)) {
                deltaX = -1;
                deltaY = 1;
            }
            break;
        case "downright":
            if ((x < maxX) && (y < maxY) && (gameData[y][x + 1] === 0)) {
                deltaX = 1;
                deltaY = 1;
            }
            break;
        default:
            break;
    }
    if ((deltaX === 0) && (deltaY === 0)) {
        return;
    }
    xTarget = x + deltaX;
    yTarget = y + deltaY;
    if ((xTarget < 0) || (xTarget > maxX) || (yTarget < 0) || (yTarget > maxY)) {
        return;
    }

    if (gameData[yTarget][xTarget] === 0) {
        addObject(backData, gameData, gameInfo, xTarget, yTarget, 251);
        gameInfo.hasFishFood = false;
    }
}

export function moveFishFood(backData, gameData, gameInfo, gameVars) {
    let update = false;
    let forceUp = false;
    let idx = -1;

    for (let i = gameData.length - 2; i >= 0; i--) {
        for (let j = 0; j < gameInfo.fishFood.length; j++) {
            const food = gameInfo.fishFood[j];
            
            if (food.floats && (backData[food.y][food.x] === 23)) continue;

            if (food.y === i) {
                let elementUnder = gameData[i + 1][food.x];

                if (elementUnder === 151) {
                    // Fall together
                    idx = findElementByCoordinates(food.x, i + 1, gameInfo.fishFood);
                    if (idx >= 0) {
                        if (gameInfo.fishFood[idx].counter > 0) {
                            food.counter = gameInfo.fishFood[idx].counter;
                        }
                    }
                }

                if (food.x < gameData[i].length - 1) {
                    // wall |\
                    if (hasTopGlideLeftToRight(elementUnder) && (gameData[i][food.x + 1] === 0) &&
                        (gameData[i + 1][food.x + 1] === 0) && !inWater(food.x, i, backData)) {
                        if (food.counter < gameVars.fishFoodCountTo) {
                            food.counter++;
                        } else {
                            food.counter = 0;
                            moveObject(gameData, gameInfo, food.x, i, food.x + 1, i + 1);
                            update = true;
                        }
                    }
                }

                if (food.x >= 1) {
                    // wall /|
                    if (hasTopGlideRightToLeft(elementUnder) && (gameData[i][food.x - 1]) === 0 &&
                        (gameData[i + 1][food.x - 1] === 0) && !inWater(food.x, i, backData)) {
                        if (food.counter < gameVars.fishFoodCountTo) {
                            food.counter++;
                        } else {
                            food.counter = 0;
                            moveObject(gameData, gameInfo, food.x, i, food.x - 1, i + 1);
                            update = true;
                        }
                    }
                }
            }
        }
    }

    for (let i = gameData.length - 2; i >= 0; i--) {
        for (let j = 0; j < gameInfo.fishFood.length; j++) {
            const food = gameInfo.fishFood[j];
            
            if (food.floats && (backData[food.y][food.x] === 23)) continue;

            if (food.y === i) {
                let elementUnder = gameData[i + 1][food.x];
                forceUp = hasForceUp(gameData, gameInfo, food.x, i);
                if (elementUnder === 0 && (falling(food.x, i, backData, gameData, gameInfo, gameVars) || !forceUp)) {
                    if (food.counter < gameVars.fishFoodCountTo) {
                        food.counter++;
                    } else {
                        food.counter = 0;
                        moveObject(gameData, gameInfo, food.x, i, food.x, i + 1);
                        update = true;
                    }
                } else {
                    if (!hasTopGlideLeftToRight(elementUnder) && !hasTopGlideRightToLeft(elementUnder)) {
                        food.counter = 0;
                    }
                }
            }
        }
    }

    return update;
}

export function nearestFoodPosition(backData, gameInfo, fishX, fishY) {
    const result = { x: -1, y: -1};
    let currentDist = -1;
    let lastDist = -1;

    if (gameInfo.fishFood.length === 0) return result;

    const connectedWater = getConnectedWater(backData, fishX, fishY);

    for (let i = 0; i < gameInfo.fishFood.length; i++) {
        const food = gameInfo.fishFood[i];

        if (food.foodLeft <= 0) continue;

        if (!connectedWater.has(`${food.x},${food.y}`)) continue;

        currentDist = dist(fishX, fishY, food.x, food.x);
        if ((lastDist === -1) || (currentDist < lastDist)) {
            result.x = food.x;
            result.y = food.y;
            lastDist = currentDist;
        }
    }

    return result;
}

