import { getBodyBottomFrame, getBodyTopFrame } from "./fishBody.js";

export function drawFinAlongCurve(ctx, bodyCurves, opts) {
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

        const { p, normal, tan } = frameFunc(bodyCurves, t);

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
export function drawFinShape(ctx, cx, cy, width, height, rotation = 0, options = {}) {
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

export function drawBackgroundFins(ctx, fins, bodyHeight, bodyCurves, colors) {
    ctx.fillStyle = colors.fin;

    switch (fins) {
        case 1:
            // Clownfish
            // Dorsal fins
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyTopFrame,
                startT: 0.38,
                endT: 0.58,
                height: bodyHeight * 0.25,
                taper: 0.5,
                lean: 0.0,
                overlap: bodyHeight * 0.1
            });
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyTopFrame,
                startT: 0.7,
                endT: 0.9,
                height: bodyHeight * 0.25,
                taper: 0.5,
                lean: 0.0,
                overlap: bodyHeight * 0.1
            });

            // Anal fin
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.7,
                endT: 0.9,
                height: bodyHeight * 0.25,
                taper: 0.5,
                lean: 0.5,
                overlap: bodyHeight * 0.1
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.8,
                endT: 0.95,
                height: bodyHeight * 0.25,
                taper: 1,
                lean: 0.7,
                overlap: bodyHeight * 0.1
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.6,
                endT: 0.8,
                height: bodyHeight * 0.25,
                taper: 1,
                lean: 0.7,
                overlap: bodyHeight * 0.1
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.7,
                endT: 0.9,
                height: bodyHeight * 0.25,
                taper: 1,
                lean: 1.5,
                overlap: bodyHeight * 0.1
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
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
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.75,
                endT: 0.9,
                height: bodyHeight * 0.55,
                taper: 1,
                lean: 0.7,
                overlap: bodyHeight * 0.1
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
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

export function drawForegroundFins(ctx, fins, yCenter, bodyHeight, bodyLength, bodyRight, colors) {
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
            cy = yCenter + (bodyHeight * 0.25);
            finWidth = bodyLength * 0.25;
            finHeight = bodyHeight * 0.7;
            rotation = 1.6 * Math.PI;
            break;
        case 2:
            // Red Tail Shark
            cx = bodyRight - (bodyLength * 0.3);
            cy = yCenter + (bodyHeight * 0.25);
            finWidth = bodyLength * 0.2;
            finHeight = bodyHeight * 0.5;
            rotation = 1.7 * Math.PI;
            break;
        case 3:
            // Juvenile Golden Trevally
            cx = bodyRight - (bodyLength * 0.3);
            cy = yCenter + (bodyHeight * 0.25);
            finWidth = bodyLength * 0.2;
            finHeight = bodyHeight * 0.5;
            rotation = 1.7 * Math.PI;
            break;
        case 4:
            // Yellow Tail Acei Cichlid
            cx = bodyRight - (bodyLength * 0.3);
            cy = yCenter + (bodyHeight * 0.25);
            finWidth = bodyLength * 0.15;
            finHeight = bodyHeight * 0.4;
            rotation = 1.7 * Math.PI;
            break;
        case 5:
            // Siamese Algae Eater
            cx = bodyRight - (bodyLength * 0.3);
            cy = yCenter + (bodyHeight * 0.4);
            finWidth = bodyLength * 0.2;
            finHeight = bodyHeight * 0.7;
            rotation = 1.7 * Math.PI;
            break;
        default:
            break;
    }
    drawFinShape(ctx, cx, cy, finWidth, finHeight, rotation, { style: "pointy" });
}



