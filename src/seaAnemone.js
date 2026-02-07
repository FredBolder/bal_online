import { isClownFish } from "./tropicalFish.js";
import { getSeaAnemoneColors } from "./seaAnemoneColors.js";

export const seaAnemonesPalettes = 6;

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
    palette
) {
    const colors = getSeaAnemoneColors(palette);
    const time = performance.now() * 0.001;

    const HEIGHT_FACTOR = 1.0;
    const DESIGN_HEIGHT = 120 * HEIGHT_FACTOR;

    const BASE_RADIUS = 25;
    const TENTACLE_SPREAD = 48;
    const TENTACLE_COUNT = 25;
    const TENTACLE_THICKNESS_FACTOR = 1.2;

    const BACK_LEN = DESIGN_HEIGHT * 0.9;
    const BACK_THICKNESS = 4.5;
    const FRONT_LEN = DESIGN_HEIGHT * 0.8;
    const FRONT_THICKNESS = 5.7;

    const CONTROL_OVERSHOOT = TENTACLE_SPREAD * 0.25;

    const MAX_TIP_RADIUS = FRONT_THICKNESS * TENTACLE_THICKNESS_FACTOR * 0.5;

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

    const MAX_SWAY = TENTACLE_SPREAD * 0.35;
    const swayAmount = Math.min(swayAmountPercentage * 0.01 * TENTACLE_SPREAD * 0.7, MAX_SWAY);
    const swaySpeed = swaySpeedPercentage * 0.01 * 4 + 0.6;
    const maxLateral = (TENTACLE_SPREAD - BASE_RADIUS) + MAX_SWAY + CONTROL_OVERSHOOT + MAX_TIP_RADIUS;


    function drawTentacle(angle, len, thickness, color, depth) {
        const sway = Math.sin(time * swaySpeed + swayPhase + angle * 3.7) * swayAmount * depth;
        const baseX = Math.cos(angle) * BASE_RADIUS;
        const spreadX = Math.cos(angle) * TENTACLE_SPREAD;

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
        const x0 = baseX;
        const y0 = 0;

        // actual current tentacle height
        const actualLen = Math.abs(y3 - y0);

        // control points
        const cp1x = Math.min(CP1_X_MAX, Math.max(CP1_X_MIN, CP1_X_FACTOR));
        const cp2x = Math.min(CP2_X_MAX, Math.max(CP2_X_MIN, CP2_X_FACTOR));

        const cp1y = Math.min(CP1_Y_MAX, Math.max(CP1_Y_MIN, CP1_Y_FACTOR));
        const cp2y = Math.min(CP2_Y_MAX, Math.max(CP2_Y_MIN, CP2_Y_FACTOR));

        const cp1 = {
            x: baseX + (x3 - baseX) * cp1x,
            y: y0 - actualLen * cp1y
        };

        const cp2 = {
            x: baseX + (x3 - baseX) * cp2x + sway * 0.4,
            y: y0 - actualLen * cp2y
        };

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x3, y3);
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness * TENTACLE_THICKNESS_FACTOR;
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
    const maxX = TENTACLE_SPREAD + MAX_SWAY + CONTROL_OVERSHOOT + MAX_TIP_RADIUS;

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
        for (let i = 0; i < TENTACLE_COUNT; i++) {
            const a =
                (i / TENTACLE_COUNT) * Math.PI * 2 +
                Math.sin(i * 10.3) * 0.07;

            drawTentacle(
                a,
                BACK_LEN,
                BACK_THICKNESS,
                colors.back,
                0.6
            );
        }
    }

    // BODY
    if (mode === "all" || mode === "foreground") {
        ctx.beginPath();
        ctx.ellipse(
            0, 0,
            BASE_RADIUS * 1.1,
            BASE_RADIUS * 0.55,
            0,
            Math.PI,
            Math.PI * 2
        );
        ctx.closePath();
        ctx.fillStyle = colors.body;
        ctx.fill();
    }

    // FOREGROUND
    if (mode === "all" || mode === "foreground") {
        for (let i = 0; i < TENTACLE_COUNT; i++) {
            const a =
                (i / TENTACLE_COUNT) * Math.PI * 2 +
                Math.sin(i * 6.1) * 0.05;

            drawTentacle(
                a,
                FRONT_LEN,
                FRONT_THICKNESS,
                colors.front,
                1.0
            );
        }
    }

    ctx.restore(); // from clip
    ctx.restore();
}
