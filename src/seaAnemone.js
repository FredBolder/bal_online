import { isClownFish } from "./tropicalFish.js";
import { getSeaAnemoneColors } from "./seaAnemoneColors.js";

export const seaAnemonesPalettes = 6;
export const seaAnemonesShapes = 3;

export function checkSeaAnemones(backData, gameInfo, gameVars) {
    if (!gameVars.gameOver) {
        if (backData[gameInfo.blueBall1.y][gameInfo.blueBall1.x] === 252) {
            gameVars.gameOver = true;
        }
        if (gameInfo.twoBlue && (backData[gameInfo.blueBall2.y][gameInfo.blueBall2.x] === 252)) {
            gameVars.gameOver = true;
        }
    }
    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        const fish = gameInfo.tropicalFish[i];
        if ((backData[fish.y][fish.x] === 252) && !isClownFish(fish)) {
            fish.isDead = true;
        }
    }
    for (let i = 0; i < gameInfo.redFish.length; i++) {
        const fish = gameInfo.redFish[i];
        if (backData[fish.y][fish.x] === 252) {
            fish.isDead = true;
        }
    }
}

export function drawSeaAnemone(
    ctx,
    xc, yc,
    size,
    swayAmountPercentage,
    swaySpeedPercentage,
    swayPhase,
    mode,
    palette,
    shape
) {
    const colors = getSeaAnemoneColors(palette);
    const time = performance.now() * 0.001;

    const HEIGHT_FACTOR = 1.0;
    const DESIGN_HEIGHT = 120 * HEIGHT_FACTOR;

    let baseRadius = 25;
    let tentacleSpread = 48;
    let tentacleCount = 25;
    let tentacleThicknessFactor = 1.2;

    let backLength = DESIGN_HEIGHT * 0.9;
    let backThickness = 5; // was 4.5
    let frontLength = DESIGN_HEIGHT * 0.8;
    let frontThickness = 5.5; // was 5.7

    switch (shape) {
        case 2:
            backLength = DESIGN_HEIGHT * 1;
            frontLength = DESIGN_HEIGHT * 0.95;
            break;
        case 3:
            tentacleCount = 20;
            tentacleThicknessFactor = 1.5;
            baseRadius = 60;
            tentacleSpread = 70;
            break;
        default:
            break;
    }

    const CONTROL_OVERSHOOT = tentacleSpread * 0.25;

    const MAX_TIP_RADIUS = frontThickness * tentacleThicknessFactor * 0.5;

    // Control point tuning

    const CP1_X_FACTOR = 0.22;
    const CP2_X_FACTOR = 1.25;

    const CP1_Y_FACTOR = 0.32;
    const CP2_Y_FACTOR = 0.60;

    const CP1_X_MIN = 0.12;
    const CP1_X_MAX = 0.45;

    const CP2_X_MIN = 0.85;
    const CP2_X_MAX = 1.35;

    const CP1_Y_MIN = 0.20;
    const CP1_Y_MAX = 0.45;

    const CP2_Y_MIN = 0.50;
    const CP2_Y_MAX = 0.80;


    // SWAY

    const MAX_SWAY = tentacleSpread * 0.35;
    const swayAmount = Math.min(swayAmountPercentage * 0.01 * tentacleSpread * 0.7, MAX_SWAY);
    const swaySpeed = swaySpeedPercentage * 0.01 * 4 + 0.6;
    const maxLateral = (tentacleSpread - baseRadius) + MAX_SWAY + CONTROL_OVERSHOOT + MAX_TIP_RADIUS;


    function drawTentacle(angle, len, thickness, color, depth, phase) {
        const effectiveSway = Math.min(swayAmount, MAX_SWAY) * depth;
        const sway = Math.sin(time * swaySpeed + swayPhase + phase + angle * 3.7) * effectiveSway;

        const baseX = Math.cos(angle) * baseRadius;
        const spreadX = Math.cos(angle) * tentacleSpread;

        // tip position
        const x3 = spreadX + sway;

        // lateral distance measured from the tentacle bottom (baseX) -> tipX
        const lateral = Math.abs(x3 - baseX);

        // ---- Linear shortening  ----
        const bendAmount = Math.min(lateral / Math.max(1e-6, maxLateral), 1.0);

        // how much of the original length we allow to be removed at max bend
        // 0.40 means at full lateral bend tip Y becomes 60% of len
        const MAX_SHORTENING_FRAC = 0.40;

        // linear shortening
        const y3 = -len * (1 - MAX_SHORTENING_FRAC * bendAmount);

        // base point
        const baseRx = baseRadius * 1.1;
        const baseRy = baseRadius * 0.55;
        const x0 = Math.cos(angle) * baseRx;
        const y0 = Math.sin(angle) * baseRy;

        // actual current tentacle height
        const actualLen = Math.abs(y3 - y0);

        // control points
        const cp1x = Math.min(CP1_X_MAX, Math.max(CP1_X_MIN, CP1_X_FACTOR));
        const cp2x = Math.min(CP2_X_MAX, Math.max(CP2_X_MIN, CP2_X_FACTOR));

        const cp1y = Math.min(CP1_Y_MAX, Math.max(CP1_Y_MIN, CP1_Y_FACTOR));
        const cp2y = Math.min(CP2_Y_MAX, Math.max(CP2_Y_MIN, CP2_Y_FACTOR));

        const cp1 = {
            x: x0 + (x3 - x0) * cp1x,
            y: y0 - actualLen * cp1y
        };

        const cp2 = {
            x: x0 + (x3 - x0) * cp2x + sway * 0.4,
            y: y0 - actualLen * cp2y
        };

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x3, y3);
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness * tentacleThicknessFactor;
        ctx.lineCap = "round";
        ctx.stroke();

        // tip
        const tipRadius = Math.max(1, thickness * 0.5);
        ctx.beginPath();
        ctx.arc(x3, y3, tipRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // HARD BOUNDS
    const maxX = tentacleSpread + MAX_SWAY + CONTROL_OVERSHOOT + MAX_TIP_RADIUS;

    const designWidth = maxX * 2;
    const designHeight = DESIGN_HEIGHT;

    const scale = size / Math.max(designWidth, designHeight);

    ctx.save();
    ctx.translate(xc, yc + size / 2);
    ctx.scale(scale, scale);

    // CLIP IN DESIGN-SPACE
    const EPS = 1e-9;
    const safeScale = Math.max(EPS, scale);
    const dsSize = size / safeScale;
    const squareX = -dsSize * 0.5;
    const squareY = -dsSize;
    ctx.save();
    ctx.beginPath();
    ctx.rect(squareX, squareY, dsSize, dsSize);
    ctx.clip();

    // BACKGROUND
    if (mode === "all" || mode === "background") {
        for (let i = 0; i < tentacleCount; i++) {
            const t = i / (tentacleCount - 1);
            const angle = t * Math.PI + Math.PI;
            const phaseOffset = i * 0.10;
            drawTentacle(
                angle,
                backLength,
                backThickness,
                colors.back,
                0.5,
                phaseOffset
            );
        }
    }

    // FOREGROUND
    if (mode === "all" || mode === "foreground") {
        for (let i = 0; i < tentacleCount; i++) {
            const t = i / (tentacleCount - 1);
            const angle = t * Math.PI + Math.PI;
            const phaseOffset = i * 0.15 + 1.2;
            drawTentacle(
                angle,
                frontLength,
                frontThickness,
                colors.front,
                0.6,
                phaseOffset
            );
        }
    }

    // BODY
    if (mode === "all" || mode === "foreground") {
        ctx.beginPath();
        ctx.ellipse(
            0, 0,
            baseRadius * 1.1,
            baseRadius * 0.55,
            0,
            Math.PI,
            Math.PI * 2
        );
        ctx.closePath();
        ctx.strokeStyle = colors.body;
        ctx.lineWidth = 1;
        ctx.fillStyle = colors.body;
        ctx.fill();
        ctx.fill();
        ctx.stroke();
        ctx.stroke();
    }

    ctx.restore(); // from clip
    ctx.restore();
}
