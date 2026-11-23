export const BRICK_SHADOW_ALL = 15;
export const BRICK_SHADOW_BOTTOM = 8;
export const BRICK_SHADOW_LEFT = 1;
export const BRICK_SHADOW_NOT_LEFT = 14;
export const BRICK_SHADOW_RIGHT = 2;
export const BRICK_SHADOW_NOT_RIGHT = 13;
export const BRICK_SHADOW_TOP = 4;

export function drawBrick(ctx, x, y, w, h, shadowSize, shadowLines, style) {
    const s = Math.max(0, Math.min(shadowSize, w * 0.5, h * 0.5));
    const half = s * 0.5;

    if (style >= 3 && style <= 6) {
        drawNaturalBrick(ctx, x, y, w, h, s, shadowLines, style - 3);
        return;
    }

    let opacity1 = 0.1;
    let opacity2 = 0.08;

    // Main brick
    ctx.fillRect(x, y, w, h);

    if (style === 0) {
        return;
    }

    if (s <= 0 || shadowLines === 0) return;

    const left = shadowLines & BRICK_SHADOW_LEFT;
    const right = shadowLines & BRICK_SHADOW_RIGHT;
    const top = shadowLines & BRICK_SHADOW_TOP;
    const bottom = shadowLines & BRICK_SHADOW_BOTTOM;

    ctx.lineWidth = s;
    ctx.lineCap = 'butt';

    if (style === 2) {
        opacity1 = 0.18;
        opacity2 = 0.28;
    }

    // Top and left highlights
    if (top || left) {
        ctx.beginPath();

        if (top) {
            ctx.moveTo(x, y + half);
            ctx.lineTo(x + w, y + half);
        }

        if (left) {
            ctx.moveTo(x + half, y);
            ctx.lineTo(x + half, y + h);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity1})`;
        ctx.stroke();
    }

    // Bottom and right shadows
    if (bottom || right) {
        ctx.beginPath();

        if (bottom) {
            ctx.moveTo(x, y + h - half);
            ctx.lineTo(x + w, y + h - half);
        }

        if (right) {
            ctx.moveTo(x + w - half, y);
            ctx.lineTo(x + w - half, y + h);
        }

        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity2})`;
        ctx.stroke();
    }

    ctx.lineWidth = 1;
}

export function drawBricks(context, objectContext) {
    const { ctx, w1, w2 } = context;
    const { cx, cy, parameters, p1, p2, x1, x2, y1 } = objectContext;

    const brickStyle = parameters[3];
    const freeSpaceX = w1 * 0.2 * p1;
    const freeSpaceY = w2 * 0.2 * p2;
    const halfFreeSpaceX = freeSpaceX * 0.5;
    const pattern = parameters[2];
    const shadowSize = w1 * 0.05;
    let stoneHeight = (w2 * 0.5) - freeSpaceY;
    let stoneWidth = w1 - freeSpaceX;

    switch (pattern) {
        case 2:
        case 3:
            stoneWidth = w1 * (1.33 - (0.33 * p1));
            break;
        case 12:
            stoneHeight = w2 - freeSpaceY;
            stoneWidth = (w1 * 0.5) - freeSpaceX;
            break;
        case 14:
            stoneHeight = w2 - freeSpaceY;
            stoneWidth = w1 - freeSpaceX;
            break;
        case 15:
            stoneHeight = (w2 / 3) - freeSpaceY;
            break;
        case 16:
            stoneHeight = w2 - freeSpaceY;
            stoneWidth = (w1 / 3) - freeSpaceX;
            break;
        case 18:
        case 19:
            stoneHeight = (w2 / 3) - freeSpaceY;
            stoneWidth = (w1 / 2) - freeSpaceX;
            break;
        default:
            stoneHeight = (w2 * 0.5) - freeSpaceY;
            stoneWidth = w1 - freeSpaceX;
            break;
    }

    const halfStoneWidth = stoneWidth * 0.5;

    switch (pattern) {
        case 2: {
            // Flemish bond - part 1
            const d1 = (stoneWidth - w1) / 2;
            drawBrick(ctx, cx - (halfStoneWidth * 0.5), y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - d1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1, cy, w1, stoneHeight, shadowSize, BRICK_SHADOW_TOP + BRICK_SHADOW_BOTTOM, brickStyle);
            break;
        }
        case 3: {
            // Flemish bond - part 2
            const d1 = (stoneWidth - w1) / 2;
            drawBrick(ctx, x1, y1, w1, stoneHeight, shadowSize, BRICK_SHADOW_TOP + BRICK_SHADOW_BOTTOM, brickStyle);
            drawBrick(ctx, cx - (halfStoneWidth * 0.5), cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1, cy, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - d1, cy, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            break;
        }
        case 4: {
            // English bond
            const headerWidth = (stoneWidth - freeSpaceX) * 0.5;
            drawBrick(ctx, cx - (headerWidth * 0.5), y1, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1, y1, headerWidth * 0.5, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - headerWidth * 0.5, y1, headerWidth * 0.5, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        }
        case 5: {
            // Header bond
            const headerWidth = (stoneWidth - freeSpaceX) * 0.5;
            const d1 = (w1 * 0.5) - ((headerWidth * 0.5) + freeSpaceX);
            drawBrick(ctx, cx - (headerWidth * 0.5), y1, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - d1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, cx + halfFreeSpaceX, cy, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        }
        case 6:
            // Long bricks - part 1
            drawBrick(ctx, x1, y1, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            break;
        case 7:
            // Long bricks - part 2
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1, cy, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            break;
        case 8: {
            // Monk bond - part 1
            const d1 = w1 - (1.5 * freeSpaceX);
            const d2 = (4 / 5) * d1;
            const d3 = (1 / 5) * d1;
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x2 - d3, y1, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1, cy, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + d3 + freeSpaceX, cy, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        }
        case 9: {
            // Monk bond - part 2
            const d1 = w1 - (1.5 * freeSpaceX);
            const d2 = (4 / 5) * d1;
            const d3 = (1 / 5) * d1;
            drawBrick(ctx, x1, y1, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + d3 + freeSpaceX, y1, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x2 - d3, cy, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            break;
        }
        case 10:
            // Stack bond / Block bond 1
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 11:
            // Stack bond / Block bond 2
            drawBrick(ctx, x1, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, cx + halfFreeSpaceX, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1, cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, cx + halfFreeSpaceX, cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            break;
        case 12:
            // Vertical stack bond
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, cx + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 13:
            // Stretcher bond with a 1/4 brick offset
            drawBrick(ctx, x1, y1, stoneWidth * 0.75, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - (stoneWidth * 0.25), y1, stoneWidth * 0.25, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 14:
            // Square tile
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 15:
            // Basket waeve bond with 3 bricks per cell 1  
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + stoneHeight + freeSpaceY, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + ((stoneHeight + freeSpaceY) * 2), stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 16:
            // Basket waeve bond with 3 bricks per cell 2  
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + stoneWidth + freeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + ((stoneWidth + freeSpaceX) * 2), y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        case 17: {
            // Spanish bond
            const d1 = (w1 / 3) - freeSpaceX;
            const d2 = (w2 / 3) - freeSpaceY;
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, d1, (d2 * 2) + freeSpaceY, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + d1 + freeSpaceX, y1, (d1 * 2) + freeSpaceX, d2, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + ((freeSpaceX + d1) * 2), y1 + d2 + freeSpaceY, d1, (d2 * 2) + freeSpaceY, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + (d2 + freeSpaceY) * 2, (d1 * 2) + freeSpaceX, d2, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + d1 + freeSpaceX, y1 + d2 + freeSpaceY, d1, d2, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        }
        case 18: {
            // Stretcher bond with 3 layers per cell 1
            drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + stoneWidth + freeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);

            drawBrick(ctx, x1, y1 + stoneHeight + freeSpaceY, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + halfStoneWidth + freeSpaceX, y1 + stoneHeight + freeSpaceY, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x2 - halfStoneWidth, y1 + stoneHeight + freeSpaceY, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);

            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + ((stoneHeight + freeSpaceY) * 2), stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + stoneWidth + freeSpaceX, y1 + ((stoneHeight + freeSpaceY) * 2), stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
        }
        case 19: {
            // Stretcher bond with 3 layers per cell 2
            drawBrick(ctx, x1, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + halfStoneWidth + freeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x2 - halfStoneWidth, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);

            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + stoneHeight + freeSpaceY, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX + stoneWidth + freeSpaceX, y1 + stoneHeight + freeSpaceY, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);

            drawBrick(ctx, x1, y1 + ((stoneHeight + freeSpaceY) * 2), halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x1 + halfStoneWidth + freeSpaceX, y1 + ((stoneHeight + freeSpaceY) * 2), stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            drawBrick(ctx, x2 - halfStoneWidth, y1 + ((stoneHeight + freeSpaceY) * 2), halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            break;
        }
        default:
            // 1: Stretcher bond
            drawBrick(ctx, x1, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, cx + halfFreeSpaceX, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;
    }
}

function drawNaturalBrick(ctx, x, y, w, h, s, shadowLines, ellipseStyle = 0) {
    if (w <= 0 || h <= 0) return;

    const T = BRICK_SHADOW_TOP;
    const R = BRICK_SHADOW_RIGHT;
    const B = BRICK_SHADOW_BOTTOM;
    const L = BRICK_SHADOW_LEFT;

    const straight = [T, R, B, L].filter(
        side => !(shadowLines & side)
    );

    // Two or more straight sides: draw a rectangle.
    if (straight.length >= 2) {
        ctx.fillRect(x, y, w, h);
        return;
    }

    const cx = x + w * 0.5;
    const cy = y + h * 0.5;

    ctx.beginPath();

    // No straight sides: full ellipse.
    if (straight.length === 0) {
        drawEllipseVariant(ctx, cx, cy, w * 0.5, h * 0.5,
            0, 0, Math.PI * 2, false, ellipseStyle);
    }

    // Exactly one straight side: half ellipse.
    else {
        switch (straight[0]) {
            case T:
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y);
                drawEllipseVariant(ctx, cx, y, w * 0.5, h,
                    0, 0, Math.PI, false, ellipseStyle);
                break;

            case R:
                ctx.moveTo(x + w, y);
                ctx.lineTo(x + w, y + h);
                drawEllipseVariant(ctx, x + w, cy, w, h * 0.5,
                    0, Math.PI * 0.5, Math.PI * 1.5, false, ellipseStyle);
                break;

            case B:
                ctx.moveTo(x, y + h);
                ctx.lineTo(x + w, y + h);
                drawEllipseVariant(ctx, cx, y + h, w * 0.5, h,
                    0, 0, Math.PI, true, ellipseStyle);
                break;

            case L:
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + h);
                drawEllipseVariant(ctx, x, cy, w, h * 0.5,
                    0, Math.PI * 0.5, Math.PI * 1.5, true, ellipseStyle);
                break;
        }
    }

    ctx.closePath();
    ctx.fill();
}

function drawEllipseVariant(
    ctx, cx, cy, rx, ry, rotation,
    startAngle, endAngle, anticlockwise, style = 0
) {
    // Standard ellipse.
    if (style === 0) {
        ctx.ellipse(
            cx, cy, rx, ry, rotation,
            startAngle, endAngle, anticlockwise
        );
        return;
    }

    // Shape exponent: smaller values produce squarer shapes.
    const powers = [1, 0.85, 0.7, 0.55];
    const power = powers[style] ?? 1;

    if (power === 1) {
        ctx.ellipse(
            cx, cy, rx, ry, rotation,
            startAngle, endAngle, anticlockwise
        );
        return;
    }

    // Determine the direction and angular range.
    const fullCircle = Math.PI * 2;
    let sweep = endAngle - startAngle;

    if (Math.abs(sweep) < fullCircle) {
        if (anticlockwise && sweep > 0) sweep -= fullCircle;
        if (!anticlockwise && sweep < 0) sweep += fullCircle;
    } else {
        sweep = anticlockwise ? -fullCircle : fullCircle;
    }

    const steps = Math.max(
        12,
        Math.min(512, Math.ceil(
            Math.abs(sweep) * Math.max(rx, ry) / 2
        ))
    );

    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);

    for (let i = 0; i <= steps; i++) {
        const angle = startAngle + sweep * i / steps;

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Superellipse coordinates.
        const px = rx * Math.sign(cos) *
            Math.pow(Math.abs(cos), power);

        const py = ry * Math.sign(sin) *
            Math.pow(Math.abs(sin), power);

        // Apply rotation.
        const pxRotated = px * cosRotation - py * sinRotation;
        const pyRotated = px * sinRotation + py * cosRotation;

        ctx.lineTo(
            cx + pxRotated,
            cy + pyRotated
        );
    }
}
