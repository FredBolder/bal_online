import { buildBodyPath } from "./fishBody.js";

export function drawStripes(ctx, size, bodyLeft, bodyRight, bodyTop, bodyBottom, yc, connectionHeight, frontCurve, rearCurve, colors, stripes) {
    // stripes
    // 0 = no stripes
    // 1-7 = normal 1-7 stripes
    // 8-12 = thin / normal alternating 4 - 8 stripes
    // 13-16 = thick 1-4 stripes
    // 17 = horizontal stripe
    // 18 = 5 horizontal stripes
    const bodyHeight = bodyBottom - bodyTop;
    const bodyLength = bodyRight - bodyLeft;
    const bodyCenter = (bodyRight + bodyLeft) / 2;
    let numberOfStripes = 0;
    const positions = [];
    let stripePattern = 0;
    let stripeWidth = Math.max(1, size * 0.05);

    ctx.save();
    // Clip to body shape
    buildBodyPath(ctx, bodyLeft, bodyRight, bodyTop, bodyBottom, connectionHeight, rearCurve, frontCurve, bodyCenter, yc);
    ctx.clip();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (stripes === 17) {
        ctx.lineWidth = stripeWidth;
        ctx.strokeStyle = colors.stripe;
        ctx.beginPath();
        ctx.moveTo(bodyLeft, yc);
        ctx.lineTo(bodyRight, yc);
        ctx.stroke();
    } else if (stripes === 18) {
        ctx.lineWidth = stripeWidth * 0.25;
        ctx.strokeStyle = colors.stripe;
        const dist = bodyHeight / 2;
        for (let i = 0; i < 5; i++) {
            const y = yc + ((i - 2) / 5 * dist);
            const distFromCenter = (2 * (y - yc)) / dist; // 0..1
            console.log(distFromCenter);
            const curveStrength = distFromCenter * dist * 1;
            ctx.beginPath();
            ctx.moveTo(bodyLeft, y);
            ctx.quadraticCurveTo(bodyCenter, y + curveStrength, bodyRight, y);
            ctx.stroke();
        }
    } else if (stripes > 12) {
        numberOfStripes = stripes - 7;
        stripeWidth = stripeWidth * 1.3;
        // Custom stripe positions
        switch (stripes) {
            case 13:
                positions.push((bodyLength * 0.5) + bodyLeft);
                break;
            case 14:
                positions.push((bodyLength * 0.3) + bodyLeft);
                positions.push((bodyLength * 0.65) + bodyLeft);
                break;
            case 15:
                positions.push((bodyLength * 0.05) + bodyLeft);
                positions.push((bodyLength * 0.375) + bodyLeft);
                positions.push((bodyLength * 0.7) + bodyLeft);
                break;
            case 16:
                positions.push((bodyLength * 0.05) + bodyLeft);
                positions.push((bodyLength * 0.27) + bodyLeft);
                positions.push((bodyLength * 0.48) + bodyLeft);
                positions.push((bodyLength * 0.7) + bodyLeft);
                break;
            default:
                break;
        }
    } else {
        const headMargin = 0.1;
        const tailMargin = 0;
        if (stripes > 7) {
            numberOfStripes = stripes - 4;
            stripePattern = 1;
        } else {
            numberOfStripes = stripes;
        }
        for (let i = 0; i < numberOfStripes; i++) {
            const t = tailMargin + (i + 0.5) / numberOfStripes * (1 - tailMargin - headMargin);
            const x = bodyLeft + (t * bodyLength);
            positions.push(x);
        }
    }

    for (let i = 0; i < positions.length; i++) {
        const distFromCenter = (2 * Math.abs(positions[i] - bodyCenter)) / bodyLength; // 0..1
        const curveStrength = (0.12 - (distFromCenter * 0.08)) * bodyLength;
        if (colors.stripeOutline !== null) {
            ctx.strokeStyle = colors.stripeOutline;
            if ((stripePattern === 1) && (i % 2 !== 0)) {
                ctx.lineWidth = stripeWidth * 1.6 * 0.3;
            } else {
                ctx.lineWidth = stripeWidth * 1.6;
            }
            ctx.beginPath();
            ctx.moveTo(positions[i], bodyTop);
            ctx.quadraticCurveTo(positions[i] + curveStrength, yc, positions[i], bodyBottom);
            ctx.stroke();
        }
        ctx.strokeStyle = colors.stripe;
        if ((stripePattern === 1) && (i % 2 !== 0)) {
            ctx.lineWidth = stripeWidth * 0.3;
        } else {
            ctx.lineWidth = stripeWidth;
        }
        ctx.beginPath();
        ctx.moveTo(positions[i], bodyTop);
        ctx.quadraticCurveTo(positions[i] + curveStrength, yc, positions[i], bodyBottom);
        ctx.stroke();
    }
    ctx.restore();
}
