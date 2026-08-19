import { canFall, getGameDataValue } from "./balUtils.js";
import { hasForceDown, hasForceLeft, hasForceRight, hasForceUp, moveableByForceOrEmpty } from "./force.js";

export function drawSpikeBall(ctx, xc, yc, size, angle = 0) {
    const R = size * 0.5;
    const bodyR = size * 0.355;

    // ------------------------------------------------------------
    // Draw one spike
    //
    // distFromCenter = distance from the center to the spike tip
    // height         = length of the spike
    // ------------------------------------------------------------
    function drawSpike(spikeAngle, distFromCenter, height) {
        const cos = Math.cos(spikeAngle);
        const sin = Math.sin(spikeAngle);

        // Perpendicular direction
        const px = -sin;
        const py = cos;

        // The tip of the spike
        const tip = distFromCenter;

        // The base is "height" back from the tip
        const base = tip - height;

        // Width of the spike
        const halfWidth = size * 0.075;

        // Base coordinates
        const bx = xc + cos * base;
        const by = yc + sin * base;

        // Tip coordinates
        const tx = xc + cos * tip;
        const ty = yc + sin * tip;

        // Left and right sides of the base
        const leftX = bx + px * halfWidth;
        const leftY = by + py * halfWidth;

        const rightX = bx - px * halfWidth;
        const rightY = by - py * halfWidth;

        // Point where the sides start curving toward the tip
        const shoulder = base + height * 0.78;

        const slx = xc + cos * shoulder + px * halfWidth * 0.72;
        const sly = yc + sin * shoulder + py * halfWidth * 0.72;

        const srx = xc + cos * shoulder - px * halfWidth * 0.72;
        const sry = yc + sin * shoulder - py * halfWidth * 0.72;

        // Gradient for the slightly 3D appearance
        const gradient = ctx.createLinearGradient(leftX, leftY, rightX, rightY);

        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.48, "#f8f8f8");
        gradient.addColorStop(1, "#bdbdbd");

        ctx.beginPath();
        ctx.moveTo(leftX, leftY);
        ctx.quadraticCurveTo(slx, sly, tx, ty);
        ctx.quadraticCurveTo(srx, sry, rightX, rightY);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = "#202020";
        ctx.lineWidth = Math.max(2, size * 0.012);
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    // DIMENSIONS 

    // Normal outside spikes
    const outerTip = R * 0.9; // was 0.965
    const outerHeight = size * 0.18; // was 0.25

    // Inner spikes
    const innerTip = bodyR * 0.85; // was 0.90
    const innerHeight = size * 0.15; // was 0.18

    ctx.save();

    // 4 BACK SPIKES
    const diagonalAngle = angle + Math.PI / 4;

    for (let i = 0; i < 4; i++) {
        drawSpike(
            diagonalAngle + i * Math.PI / 2,
            outerTip,
            outerHeight
        );
    }

    // MAIN BODY
    const bodyGradient = ctx.createRadialGradient(
        xc - size * 0.13,
        yc - size * 0.15,
        size * 0.04,
        xc,
        yc,
        bodyR * 1.15
    );

    bodyGradient.addColorStop(0, "#606060");
    bodyGradient.addColorStop(0.55, "#4a4a4a");
    bodyGradient.addColorStop(1, "#303030");

    ctx.beginPath();
    ctx.arc(
        xc,
        yc,
        bodyR,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = bodyGradient;
    ctx.fill();

    ctx.strokeStyle = "#202020";
    ctx.lineWidth = Math.max(2, size * 0.018);
    ctx.stroke();

    // 4 INNER SPIKES
    for (let i = 0; i < 4; i++) {
        drawSpike(
            diagonalAngle + i * Math.PI / 2,
            innerTip,
            innerHeight
        );
    }

    // 4 FRONT SPIKES
    for (let i = 0; i < 4; i++) {
        drawSpike(
            angle + i * Math.PI / 2,
            outerTip,
            outerHeight
        );
    }

    ctx.restore();
}

export function hasSpikeBallWeightBelow(gameData, x, y) {
    const maxY = gameData.length - 1;
    for (let i = y + 1; i <= maxY; i++) {
        const obj = gameData[i][x];
        if (obj === 256) {
            return true;
        }
        if (obj === 0 || !canFall.includes(obj)) {
            return false;
        }
    }
    return false;
}

export function hasSpikeBallWeightAbove(gameData, x, y) {
    for (let i = y - 1; i >= 0; i--) {
        const obj = gameData[i][x];
        if (obj === 256) {
            return true;
        }
        if (obj === 0 || !canFall.includes(obj)) {
            return false;
        }
    }
    return false;
}

function canMoveDown(gameData, x, y) {
    const maxY = gameData.length - 1;
    for (let i = y + 1; i <= maxY; i++) {
        const obj = gameData[i][x];
        if (obj === 0) {
            return true;
        }
        if (!moveableByForceOrEmpty.includes(obj)) {
            return false;
        }
    }
    return false;
}

function canMoveLeft(gameData, x, y) {
    for (let i = x - 1; i >= 0; i--) {
        const obj = gameData[y][i];
        if (obj === 0) {
            return true;
        }
        if (!moveableByForceOrEmpty.includes(obj)) {
            return false;
        }
    }
    return false;
}

function canMoveRight(gameData, x, y) {
    const maxX = gameData[0].length - 1;
    for (let i = x + 1; i <= maxX; i++) {
        const obj = gameData[y][i];
        if (obj === 0) {
            return true;
        }
        if (!moveableByForceOrEmpty.includes(obj)) {
            return false;
        }
    }
    return false;
}

function canMoveUp(gameData, x, y) {
    for (let i = y - 1; i >= 0; i--) {
        const obj = gameData[i][x];
        if (obj === 0) {
            return true;
        }
        if (!moveableByForceOrEmpty.includes(obj)) {
            return false;
        }
    }
    return false;
}

export function checkSpikeBalls(backData, gameData, gameInfo, gameVars) {
    const points = [];
    const gravityDown = (gameVars.gravity === "down");
    const gravityUp = !gravityDown;

    if (gameInfo.twoBlue) {
        points.push({ x: gameInfo.blueBall1.x, y: gameInfo.blueBall1.y });
        points.push({ x: gameInfo.blueBall2.x, y: gameInfo.blueBall2.y });
    } else {
        points.push({ x: gameInfo.blueBall.x, y: gameInfo.blueBall.y });
    }

    for (let i = 0; i < points.length; i++) {
        let forceDown = false;
        let forceLeft = false;
        let forceRight = false;
        let forceUp = false;

        const x = points[i].x;
        const y = points[i].y;

        if ((x === -1) || (y === -1)) {
            continue;
        }

        const cellLeft = getGameDataValue(gameData, x - 1, y);
        const cellRight = getGameDataValue(gameData, x + 1, y);
        const cellAbove = getGameDataValue(gameData, x, y - 1);
        const cellBelow = getGameDataValue(gameData, x, y + 1);

        const spikeLeft = (cellLeft === 256);
        const spikeRight = (cellRight === 256);
        const spikeAbove = (cellAbove === 256);
        const spikeBelow = (cellBelow === 256);

        const blockedLeft = !canMoveLeft(gameData, x, y);
        const blockedRight = !canMoveRight(gameData, x, y);
        const blockedAbove = !canMoveUp(gameData, x, y);
        const blockedBelow = !canMoveDown(gameData, x, y);

        if (!spikeLeft && !spikeRight && !spikeAbove && !spikeBelow) {
            continue;
        }

        forceUp = (hasForceUp(gameData, gameInfo, x, y));
        forceDown = (hasForceDown(gameData, gameInfo, x, y));
        forceLeft = (hasForceLeft(gameData, gameInfo, x, y));
        forceRight = (hasForceRight(gameData, gameInfo, x, y));

        if (forceLeft && forceRight) {
            if (spikeLeft || spikeRight) {
                return true;
            }
        }
        if (forceDown && forceUp) {
            if (spikeAbove || spikeBelow) {
                return true;
            }
        }
        
        if ((forceDown || gravityDown) && spikeAbove && blockedBelow) {
            return true;
        }
        if ((forceUp || gravityUp) && spikeBelow && blockedAbove) {
            return true;
        }
        if (forceRight && spikeLeft && blockedRight) {
            return true;
        }
        if (forceLeft && spikeRight && blockedLeft) {
            return true;
        }

        if (forceDown && spikeBelow && blockedBelow) {
            return true;
        }
        if (forceUp && spikeAbove && blockedAbove) {
            return true;
        }
        if (forceRight && spikeRight && blockedRight) {
            return true;
        }
        if (forceLeft && spikeLeft && blockedLeft) {
            return true;
        }
    }
    return false;
}
