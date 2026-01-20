import { cubicFromMid } from "./graphicUtils.js";

export function getTailDimensions(tail, bodyLength, bodyHeight) {
    let tailWidth = 0;
    let tailHeight = 0;

    switch (tail) {
        case 1:
            // Emarginate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 2:
            // Emarginate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 3:
            // Emarginate
            tailWidth = bodyLength * 0.26;
            tailHeight = bodyHeight * 0.6;
            break;
        case 4:
            // Truncate
            tailWidth = bodyLength * 0.23;
            tailHeight = bodyHeight * 0.7;
            break;
        case 5:
            // Rounded
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
            break;
        case 6:
            // Rounded
            tailWidth = bodyLength * 0.24;
            tailHeight = bodyHeight * 0.6;
            break;
        case 7:
            // Forked
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 8:
            // Forked
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.6;
            break;
        default:
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 1;
            break;
    }
    return { tailWidth, tailHeight };
}

export function drawCross(ctx, x, y) {
    // for debug
    const l = 2;

    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(x - l, y - l);
    ctx.lineTo(x + l, y + l);
    ctx.moveTo(x - l, y + l);
    ctx.lineTo(x + l, y - l);
    ctx.stroke();
}

export function drawEmarginateTail(
    ctx,
    xLeft,
    yCenter,
    tailWidth,
    tailHeight,
    connectionHeight,
    color,
    variation = false
) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    const rightX = xLeft + tailWidth;

    const yTopConn = yCenter - connectionHeight * 0.5;
    const yBotConn = yCenter + connectionHeight * 0.5;

    const yTopTip = yCenter - tailHeight * 0.5;
    const yBotTip = yCenter + tailHeight * 0.5;

    const scale = Math.sqrt(tailWidth * tailHeight);

    const curvature = (variation ? 0.16 : 0.25) * scale / tailHeight;

    const P0 = { x: rightX, y: yBotConn };
    const P1 = { x: xLeft, y: yBotTip };
    const P2 = { x: xLeft, y: yTopTip };
    const P3 = { x: rightX, y: yTopConn };

    ctx.beginPath();
    ctx.moveTo(P0.x, P0.y);
    ctx.lineTo(P1.x, P1.y);
    const { c1, c2 } = cubicFromMid(P1, P2, curvature, +1);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P2.x, P2.y);
    ctx.lineTo(P3.x, P3.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function drawForkedTail(
    ctx,
    xLeft,
    yCenter,
    tailWidth,
    tailHeight,
    connectionHeight,
    color
) {
    const rightX = xLeft + tailWidth;

    const yTopConn = yCenter - connectionHeight * 0.5;
    const yBotConn = yCenter + connectionHeight * 0.5;

    const yTopTip = yCenter - tailHeight * 0.5;
    const yBotTip = yCenter + tailHeight * 0.5;

    const tipX = xLeft;
    const notchX = xLeft + tailWidth * 0.5;

    // Robust geometric scale
    const scale = Math.sqrt(tailWidth * tailHeight);

    // Dimensionless curvature parameters
    const outerCurvature = 0.08 * scale / tailWidth;
    const innerCurvature = 0.05 * scale / tailWidth;

    const P0 = { x: rightX, y: yTopConn };
    const P1 = { x: tipX, y: yTopTip };
    const P2 = { x: notchX, y: yCenter };
    const P3 = { x: tipX, y: yBotTip };
    const P4 = { x: rightX, y: yBotConn };

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(P0.x, P0.y);

    // Outer upper
    {
        const { c1, c2 } = cubicFromMid(P0, P1, outerCurvature, +1);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P1.x, P1.y);
    }

    // Inner upper
    {
        const { c1, c2 } = cubicFromMid(P1, P2, innerCurvature, +1);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P2.x, P2.y);
    }

    // Inner lower
    {
        const { c1, c2 } = cubicFromMid(P2, P3, innerCurvature, +1);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P3.x, P3.y);
    }

    // Outer lower
    {
        const { c1, c2 } = cubicFromMid(P3, P4, outerCurvature, +1);
        ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P4.x, P4.y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function drawRoundedTail(ctx, xLeft, yCenter, tailWidth, tailHeight, connectionHeight, color) {
    const tailBaseX = xLeft + tailWidth;
    const arcCx = tailBaseX;
    const arcCy = yCenter;
    const radius = tailWidth;
    const topY = yCenter - tailHeight * 0.5;
    const bottomY = yCenter + tailHeight * 0.5;
    const connectionTop = yCenter - connectionHeight * 0.5;
    const connectionBottom = yCenter + connectionHeight * 0.5;
    const sTopRaw = (topY - arcCy) / radius;
    const sBottomRaw = (bottomY - arcCy) / radius;
    const sTop = Math.max(-1, Math.min(1, sTopRaw));
    const sBottom = Math.max(-1, Math.min(1, sBottomRaw));
    const startAngle = Math.PI - Math.asin(sTop);
    const endAngle = Math.PI - Math.asin(sBottom);
    const startX = arcCx + radius * Math.cos(startAngle);
    const startY = arcCy + radius * Math.sin(startAngle);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(tailBaseX, connectionTop);
    ctx.lineTo(startX, startY);
    ctx.arc(arcCx, arcCy, radius, startAngle, endAngle, true);
    ctx.lineTo(tailBaseX, connectionBottom);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function drawTruncateTail(ctx, xLeft, yCenter, tailWidth, tailHeight, connectionHeight, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(xLeft + tailWidth, yCenter + connectionHeight * 0.5);
    ctx.lineTo(xLeft, yCenter + tailHeight * 0.5);
    ctx.lineTo(xLeft, yCenter - tailHeight * 0.5);
    ctx.lineTo(xLeft + tailWidth, yCenter - connectionHeight * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

