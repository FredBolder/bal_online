import { findElementByCoordinates } from "./balUtils.js";
import { getTropicalFishColor } from "./tropicalFishColors.js";

export const tropicalFishFinVariations = 5;
export const tropicalFishHeights = 4;
export const tropicalFishPalettes = 12;
export const tropicalFishStripes = 17;
export const tropicalFishTails = 7;

function quadBezierPoint(p0, p1, p2, t) {
    const mt = 1 - t;
    return {
        x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y
    };
}

function quadBezierTangent(p0, p1, p2, t) {
    return {
        x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
        y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y)
    };
}

function normalize(v) {
    const len = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / len, y: v.y / len };
}

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
export function drawFish(ctx, xc, yc, size, flipHorizontally, palette, height, tail, fins, stripes) {
    // --- Tail functions ---
    function drawEmarginateTail(variation = false) {
        const factor = variation ? 0.6 : 0.95;
        ctx.moveTo(left + tailWidth, yc + connectionWidth * 0.5);
        ctx.lineTo(left, yc + tailHeight * 0.5);
        ctx.quadraticCurveTo(left + (tailWidth * factor), yc, left, yc - tailHeight * 0.5);
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

    function cubicFromMid(p0, p3, bend, normalSign) {
        const dx = p3.x - p0.x;
        const dy = p3.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;

        // unit perpendicular
        const nx = -dy / len * normalSign;
        const ny = dx / len * normalSign;

        // points at 1/3 and 2/3 of the chord
        const c1 = {
            x: p0.x + dx / 3 + nx * bend,
            y: p0.y + dy / 3 + ny * bend
        };

        const c2 = {
            x: p0.x + dx * 2 / 3 + nx * bend,
            y: p0.y + dy * 2 / 3 + ny * bend
        };

        return { c1, c2 };
    }

    function drawForkedTail() {
        const rightX = left + tailWidth;

        const yTopConn = yc - connectionWidth * 0.5;
        const yBotConn = yc + connectionWidth * 0.5;

        const yTopTip = yc - tailHeight * 0.5;
        const yBotTip = yc + tailHeight * 0.5;

        const tipX = left;
        const notchX = left + tailWidth * 0.5;

        const bendOuter = tailWidth * 0.05;
        const bendInner = tailWidth * 0.08;

        const P0 = { x: rightX, y: yTopConn };
        const P1 = { x: tipX, y: yTopTip };
        const P2 = { x: notchX, y: yc };
        const P3 = { x: tipX, y: yBotTip };
        const P4 = { x: rightX, y: yBotConn };

        ctx.moveTo(P0.x, P0.y);

        // Change +1 to -1 for bending in other direction
        // Outer upper
        {
            const { c1, c2 } = cubicFromMid(P0, P1, bendOuter, +1);
            ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P1.x, P1.y);
        }
        // Inner upper
        {
            const { c1, c2 } = cubicFromMid(P1, P2, bendInner, +1);
            ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P2.x, P2.y);
        }
        // Inner lower
        {
            const { c1, c2 } = cubicFromMid(P2, P3, bendInner, +1);
            ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P3.x, P3.y);
        }
        // Outer lower
        {
            const { c1, c2 } = cubicFromMid(P3, P4, bendOuter, +1);
            ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, P4.x, P4.y);
        }
    }


    // --- Body functions ---

    function buildBodyPath(ctx) {
        ctx.beginPath();

        // Nose
        ctx.moveTo(bodyRight, yc);

        // Nose → mid top
        ctx.quadraticCurveTo(
            bodyRight - frontCurve, top,
            midX, top
        );

        // Mid top → tail root (top)
        ctx.quadraticCurveTo(
            bodyLeft + rearCurve, top,
            bodyLeft, yc - connectionWidth / 2
        );

        // Tail connection
        ctx.lineTo(bodyLeft, yc + connectionWidth / 2);

        // Tail root → mid bottom
        ctx.quadraticCurveTo(
            bodyLeft + rearCurve, bottom,
            midX, bottom
        );

        // Mid bottom → nose
        ctx.quadraticCurveTo(
            bodyRight - frontCurve, bottom,
            bodyRight, yc
        );

        ctx.closePath();
    }

    function getBodyBottomFrame(t) {
        let curve, lt;

        if (t < 0.5) {
            curve = bodyCurves.bottomRear;
            lt = t * 2;
        } else {
            curve = bodyCurves.bottomFront;
            lt = (t - 0.5) * 2;
        }

        const p = quadBezierPoint(curve.p0, curve.p1, curve.p2, lt);
        const tan = normalize(
            quadBezierTangent(curve.p0, curve.p1, curve.p2, lt)
        );

        // outward normal (downward)
        const normal = { x: -tan.y, y: tan.x };

        return { p, tan, normal };
    }

    function getBodyTopFrame(t) {
        let curve, lt;

        if (t < 0.5) {
            curve = bodyCurves.topFront;
            lt = t * 2;
        } else {
            curve = bodyCurves.topRear;
            lt = (t - 0.5) * 2;
        }

        const p = quadBezierPoint(curve.p0, curve.p1, curve.p2, lt);
        const tan = normalize(
            quadBezierTangent(curve.p0, curve.p1, curve.p2, lt)
        );

        // outward normal (top side)
        const normal = { x: -tan.y, y: tan.x };

        return { p, tan, normal };
    }

    // --- Fin functions ---

    function drawFinAlongCurve(ctx, opts) {
        let { startT, endT, height, taper = 0.5, lean = 0, overlap = 0, steps = 10, frameFunc } = opts;

        // Bottom curve runs tail → head, so invert t
        const isBottom = frameFunc === getBodyBottomFrame;

        if (isBottom) {
            startT = 1 - startT;
            endT = 1 - endT;

            if (startT > endT) {
                [startT, endT] = [endT, startT];
            }
        }

        const base = [];
        const tip = [];

        for (let i = 0; i <= steps; i++) {
            const s = i / steps;
            const t = startT + s * (endT - startT);

            const { p, normal, tan } = frameFunc(t);

            // taper along fin length
            const h = height * (1 - taper * Math.abs(s - 0.5) * 2);

            // lean along tangent
            const dir = frameFunc === getBodyBottomFrame ? -1 : 1;
            const lx = tan.x * lean * h * dir;
            const ly = tan.y * lean * h * dir;

            // base inside the body
            const bx = p.x - normal.x * overlap;
            const by = p.y - normal.y * overlap;

            // tip outside the body
            const tx = p.x + normal.x * h + lx;
            const ty = p.y + normal.y * h + ly;

            base.push({ x: bx, y: by });
            tip.push({ x: tx, y: ty });
        }

        ctx.beginPath();
        ctx.moveTo(base[0].x, base[0].y);
        base.forEach(p => ctx.lineTo(p.x, p.y));
        tip.reverse().forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fill();
    }


    // generic fin painter - center at cx,cy. rotation in radians.
    // width = side-to-side span, height = tip length.
    // options: {style: "rounded"|"pointy", curvature: 0..1}
    function drawFinShape(cx, cy, width, height, rotation = 0, options = {}) {
        const style = options.style || "rounded";
        const curvature = (options.curvature ?? 0.6); // how tall the curve is
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.beginPath();
        // base left -> tip -> base right -> back to left
        ctx.moveTo(-width * 0.5, 0);
        if (style === "pointy") {
            // stronger curve to a point
            ctx.quadraticCurveTo(0, -height * (curvature + 0.25), width * 0.5, 0);
            ctx.lineTo(-width * 0.5, 0);
        } else {
            // rounded: double quadratic for a soft fin
            ctx.quadraticCurveTo(-width * 0.15, -height * curvature, 0, -height);
            ctx.quadraticCurveTo(width * 0.15, -height * curvature, width * 0.5, 0);
            ctx.lineTo(-width * 0.5, 0);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawBackgroundFins() {
        ctx.fillStyle = colors.fin;

        switch (fins) {
            case 1:
                // Clownfish
                // Dorsal fins
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.38,
                    endT: 0.58,
                    height: bodyHeight * 0.25,
                    taper: 0.5,
                    lean: 0.0,
                    overlap: bodyHeight * 0.1
                });
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.7,
                    endT: 0.9,
                    height: bodyHeight * 0.25,
                    taper: 0.5,
                    lean: 0.0,
                    overlap: bodyHeight * 0.1
                });

                // Anal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.7,
                    endT: 0.9,
                    height: bodyHeight * 0.25,
                    taper: 0.5,
                    lean: 0.5,
                    overlap: bodyHeight * 0.1
                });

                // Pelvic fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.4,
                    endT: 0.5,
                    height: bodyHeight * 0.3,
                    taper: 0.7,
                    lean: 0.4,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });
                break;
            case 2:
                // Red Tail Shark
                // Dorsal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.4,
                    endT: 0.85,
                    height: bodyHeight * 0.35,
                    taper: 1,
                    lean: -0.96,
                    overlap: bodyHeight * 0.1,
                    steps: 2
                });

                // Anal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.8,
                    endT: 0.95,
                    height: bodyHeight * 0.25,
                    taper: 1,
                    lean: 0.7,
                    overlap: bodyHeight * 0.1
                });

                // Pelvic fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.5,
                    endT: 0.7,
                    height: bodyHeight * 0.3,
                    taper: 1,
                    lean: 0.6,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });
                break;
            case 3:
                // Juvenile Golden Trevally
                // Dorsal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.5,
                    endT: 0.75,
                    height: bodyHeight * 0.3,
                    taper: 1,
                    lean: 0.7,
                    overlap: bodyHeight * 0.1,
                    steps: 2
                });

                // Anal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.6,
                    endT: 0.8,
                    height: bodyHeight * 0.25,
                    taper: 1,
                    lean: 0.7,
                    overlap: bodyHeight * 0.1
                });

                // Pelvic fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.3,
                    endT: 0.4,
                    height: bodyHeight * 0.2,
                    taper: 1,
                    lean: 0.35,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });
                break;
            case 4:
                // Yellow Tail Acei Cichlid
                // Dorsal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.35,
                    endT: 0.8,
                    height: bodyHeight * 0.2,
                    taper: 0.7,
                    lean: 5,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });

                // Anal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.7,
                    endT: 0.9,
                    height: bodyHeight * 0.25,
                    taper: 1,
                    lean: 1.5,
                    overlap: bodyHeight * 0.1
                });

                // Pelvic fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.4,
                    endT: 0.5,
                    height: bodyHeight * 0.4,
                    taper: 0.8,
                    lean: 0.9,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });
                break;
            case 5:
                // Siamese Algae Eater
                // Dorsal fin
                // Dorsal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyTopFrame,
                    startT: 0.4,
                    endT: 0.65,
                    height: bodyHeight * 0.9,
                    taper: 1,
                    lean: 0.2,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });

                // Anal fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.75,
                    endT: 0.9,
                    height: bodyHeight * 0.55,
                    taper: 1,
                    lean: 0.7,
                    overlap: bodyHeight * 0.1
                });

                // Pelvic fin
                drawFinAlongCurve(ctx, {
                    frameFunc: getBodyBottomFrame,
                    startT: 0.45,
                    endT: 0.65,
                    height: bodyHeight * 0.7,
                    taper: 1,
                    lean: 0.8,
                    overlap: bodyHeight * 0.1,
                    steps: 6
                });
                break;
            default:
                break;
        }
    }

    function drawForeGroundFins() {
        ctx.fillStyle = colors.fin;
        let cx = 0;
        let cy = 0;
        let finWidth = 0;
        let finHeight = 0;
        let rotation = 0;
        // Pectoral fin
        switch (fins) {
            case 1:
                // Clownfish
                cx = bodyRight - (bodyLength * 0.37);
                cy = yc + (bodyHeight * 0.25);
                finWidth = bodyLength * 0.25;
                finHeight = bodyHeight * 0.7;
                rotation = 1.6 * Math.PI;
                break;
            case 2:
                // Red Tail Shark
                cx = bodyRight - (bodyLength * 0.3);
                cy = yc + (bodyHeight * 0.25);
                finWidth = bodyLength * 0.2;
                finHeight = bodyHeight * 0.5;
                rotation = 1.7 * Math.PI;
                break;
            case 3:
                // Juvenile Golden Trevally
                cx = bodyRight - (bodyLength * 0.3);
                cy = yc + (bodyHeight * 0.25);
                finWidth = bodyLength * 0.2;
                finHeight = bodyHeight * 0.5;
                rotation = 1.7 * Math.PI;
                break;
            case 4:
                // Yellow Tail Acei Cichlid
                cx = bodyRight - (bodyLength * 0.3);
                cy = yc + (bodyHeight * 0.25);
                finWidth = bodyLength * 0.15;
                finHeight = bodyHeight * 0.4;
                rotation = 1.7 * Math.PI;
                break;
            case 5:
                // Siamese Algae Eater
                cx = bodyRight - (bodyLength * 0.3);
                cy = yc + (bodyHeight * 0.4);
                finWidth = bodyLength * 0.2;
                finHeight = bodyHeight * 0.7;
                rotation = 1.7 * Math.PI;
                break;
            default:
                break;
        }
        drawFinShape(cx, cy, finWidth, finHeight, rotation, { style: "pointy" });
    }

    function drawStripes() {
        // stripes
        // 0 = no stripes
        // 1-7 = normal 1-7 stripes
        // 8-12 = thin / normal alternating 4 - 8 stripes
        // 13-16 = thick 1-4 stripes
        // 17 = horizontal stripe
        const bodyWidth = bodyRight - bodyLeft;
        const bodyCenter = (bodyRight + bodyLeft) / 2;
        let numberOfStripes = 0;
        const positions = [];
        let stripePattern = 0;
        let stripeWidth = Math.max(1, size * 0.05);

        ctx.save();
        // Clip to body shape
        buildBodyPath(ctx);
        ctx.clip();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (stripes === 17) {
            ctx.lineWidth = stripeWidth;
            ctx.strokeStyle = colors.stripe;
            ctx.beginPath();
            ctx.moveTo(left + tailWidth, yc);
            ctx.lineTo(right, yc);
            ctx.stroke();
        } else if (stripes > 12) {
            numberOfStripes = stripes - 7;
            stripeWidth = stripeWidth * 1.3;
            // Custom stripe positions
            switch (stripes) {
                case 13:
                    positions.push((bodyWidth * 0.5) + bodyLeft);
                    break;
                case 14:
                    positions.push((bodyWidth * 0.3) + bodyLeft);
                    positions.push((bodyWidth * 0.65) + bodyLeft);
                    break;
                case 15:
                    positions.push((bodyWidth * 0.05) + bodyLeft);
                    positions.push((bodyWidth * 0.375) + bodyLeft);
                    positions.push((bodyWidth * 0.7) + bodyLeft);
                    break;
                case 16:
                    positions.push((bodyWidth * 0.05) + bodyLeft);
                    positions.push((bodyWidth * 0.27) + bodyLeft);
                    positions.push((bodyWidth * 0.48) + bodyLeft);
                    positions.push((bodyWidth * 0.7) + bodyLeft);
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
                const x = bodyLeft + t * bodyWidth;
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
                ctx.moveTo(positions[i], top);
                ctx.quadraticCurveTo(positions[i] + curveStrength, yc, positions[i], bottom);
                ctx.stroke();
            }
            ctx.strokeStyle = colors.stripe;
            if ((stripePattern === 1) && (i % 2 !== 0)) {
                ctx.lineWidth = stripeWidth * 0.3;
            } else {
                ctx.lineWidth = stripeWidth;
            }
            ctx.beginPath();
            ctx.moveTo(positions[i], top);
            ctx.quadraticCurveTo(positions[i] + curveStrength, yc, positions[i], bottom);
            ctx.stroke();
        }
        ctx.restore();
    }

    // --- End of nested functions ---


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
    switch (height) {
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
        default:
            // 2
            bodyHeight = h * 0.3;
            bodyLength = w * 0.7;
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
            // Emarginate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 3:
            // Truncate
            tailWidth = bodyLength * 0.23;
            tailHeight = bodyHeight * 0.7;
            break;
        case 4:
            // Rounded
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
            break;
        case 5:
            // Rounded
            tailWidth = bodyLength * 0.24;
            tailHeight = bodyHeight * 0.6;
            break;
        case 6:
            // Forked
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.9;
            break;
        case 7:
            // Forked
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.6;
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

    // ---- Body outline ----
    const bodyLeft = left + tailWidth;
    const bodyRight = right;
    const midX = (bodyLeft + bodyRight) / 2;
    const connectionWidth = bodyHeight * 0.15;
    const frontCurve = (height === 3) ? bodyLength * 0.08 : bodyLength * 0.12;
    const rearCurve = bodyLength * 0.3;

    const bodyCurves = {
        topFront: {
            p0: { x: bodyRight, y: yc },
            p1: { x: bodyRight - frontCurve, y: top },
            p2: { x: midX, y: top }
        },
        topRear: {
            p0: { x: midX, y: top },
            p1: { x: bodyLeft + rearCurve, y: top },
            p2: { x: bodyLeft, y: yc - connectionWidth / 2 }
        },
        bottomRear: {
            p0: { x: bodyLeft, y: yc + connectionWidth / 2 },
            p1: { x: bodyLeft + rearCurve, y: bottom },
            p2: { x: midX, y: bottom }
        },
        bottomFront: {
            p0: { x: midX, y: bottom },
            p1: { x: bodyRight - frontCurve, y: bottom },
            p2: { x: bodyRight, y: yc }
        }
    };


    // ---- Dorsal, anal and pelvic fins ----
    drawBackgroundFins();


    // ---- Draw the body ----
    ctx.fillStyle = colors.body;
    ctx.strokeStyle = colors.body;

    buildBodyPath(ctx);
    ctx.fill();
    ctx.stroke();

    // DEBUG
    // TODO: Comment out
    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // buildBodyPath(ctx);
    // ctx.stroke();
    // stripes = 0;


    // ---- Stripes ----
    drawStripes();

    // ---- Pectoral fins ----
    drawForeGroundFins();

    // ---- Tail ----
    ctx.fillStyle = colors.tail;
    ctx.beginPath();
    switch (tail) {
        case 2:
            drawEmarginateTail(true);
            break;
        case 3:
            drawTruncateTail();
            break;
        case 4:
            drawRoundedTail();
            break;
        case 5:
            drawRoundedTail();
            break;
        case 6:
        case 7:
            drawForkedTail();
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
    ctx.strokeStyle = colors.body;
    ctx.lineWidth = 1;
    const eyeRadius = ([1, 4].includes(height)) ? size * 0.03 : size * 0.04;
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

export function moveTropicalFish(backData, gameData, gameInfo) {
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
        } else {
            switch (fish.tail) {
                case 3:
                    // truncate
                    countTo = 8;
                    break;
                case 1:
                case 2:
                    // emarginate
                    countTo = 7;
                    break;
                case 6:
                case 7:
                    // forked
                    countTo = 6;
                    break;
                default:
                    // normal (rounded)
                    countTo = 10;
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