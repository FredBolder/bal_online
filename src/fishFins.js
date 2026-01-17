import { getBodyBottomFrame, getBodyTopFrame } from "./fishBody.js";

function midPoint(p1, p2) {
    let x = 0;
    let y = 0;

    x = (p1.x + p2.x) / 2;
    y = (p1.y + p2.y) / 2;
    return { x, y };
}

function normalize(v) {
    const L = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / L, y: v.y / L };
}

export function drawAngelfishFin(ctx, bodyCurves, opts) {
    let {
        startT,
        endT,
        height,
        bendOuter = 0.3,
        bendInner = 0.3,
        overlap = 0,
        frameFunc,
        filamentLength = 0,          // pixels
        filamentCurved = false,      // straight lines or small curves
        filamentBendFactor = 0.2     // how strongly the filament curve bends relative to length
    } = opts;

    const isBottom = frameFunc === getBodyBottomFrame;
    const bendSign = isBottom ? +1 : -1;

    if (isBottom) {
        startT = 1 - startT;
        endT = 1 - endT;
        if (startT > endT) {
            [startT, endT] = [endT, startT];
        }
    }

    const top = frameFunc(bodyCurves, 0.5).p;
    const right = frameFunc(bodyCurves, isBottom ? 0 : 1).p;

    const f0 = frameFunc(bodyCurves, startT);
    const f2 = frameFunc(bodyCurves, endT);
    const p0 = f0.p;
    const p2 = f2.p;

    function bodyCenterAtT(t) {
        const ft = getBodyTopFrame(bodyCurves, t).p;
        const fb = getBodyBottomFrame(bodyCurves, t).p;
        return {
            x: (ft.x + fb.x) * 0.5,
            y: (ft.y + fb.y) * 0.5
        };
    }

    function inwardNormal(frame, t) {
        let nx = frame.normal.x;
        let ny = frame.normal.y;

        const c = bodyCenterAtT(t);

        const vx = c.x - frame.p.x;
        const vy = c.y - frame.p.y;

        if (nx * vx + ny * vy < 0) {
            nx = -nx;
            ny = -ny;
        }
        return { x: nx, y: ny };
    }


    // fin apex
    const p1 = {
        x: right.x,
        y: top.y + bendSign * height
    };

    const n0 = inwardNormal(f0, startT);
    const n2 = inwardNormal(f2, endT);

    const p0o = {
        x: p0.x + n0.x * overlap,
        y: p0.y + n0.y * overlap
    };

    const p2o = {
        x: p2.x + n2.x * overlap,
        y: p2.y + n2.y * overlap
    };

    const firstCurveBend = isBottom ? bendInner : bendOuter;
    const secondCurveBend = isBottom ? bendOuter : bendInner;

    const cp1 = midPoint(p0, p1);
    cp1.x += Math.abs(p0.y - p1.y) * firstCurveBend;
    cp1.y += bendSign * Math.abs(p0.x - p1.x) * firstCurveBend;

    const cp2 = midPoint(p1, p2);
    cp2.x += Math.abs(p1.y - p2.y) * secondCurveBend;
    cp2.y += bendSign * Math.abs(p1.x - p2.x) * secondCurveBend;

    // fin 
    ctx.beginPath();
    if (overlap > 0) {
        ctx.moveTo(p0o.x, p0o.y);
        ctx.lineTo(p0.x, p0.y);
    } else {
        ctx.moveTo(p0.x, p0.y);
    }
    ctx.quadraticCurveTo(cp1.x, cp1.y, p1.x, p1.y);
    ctx.quadraticCurveTo(cp2.x, cp2.y, p2.x, p2.y);
    if (overlap > 0) {
        ctx.lineTo(p2o.x, p2o.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // filaments
    if (filamentLength > 0) {
        const tanTop = normalize({ x: p1.x - cp1.x, y: p1.y - cp1.y });
        const tanBottom = normalize({ x: cp2.x - p1.x, y: cp2.y - p1.y });
        let tan = isBottom ? tanBottom : tanTop;

        // ensure tangent points away from the fin apex
        {
            const testX = p1.x + tan.x;
            const testY = p1.y + tan.y;
            const vx = testX - p1.x;
            const vy = testY - p1.y;
            const bx = top.x - p1.x;
            const by = top.y - p1.y;
            // if tangent points toward body, flip it
            if (vx * bx + vy * by > 0) {
                tan.x = -tan.x;
                tan.y = -tan.y;
            }
        }
        // perpendicular normal
        let n = { x: -tan.y, y: tan.x };

        // make normal point toward fin interior first
        {
            const vx = top.x - p1.x;
            const vy = top.y - p1.y;
            if (n.x * vx + n.y * vy < 0) {
                n.x = -n.x;
                n.y = -n.y;
            }
        }

        // filament bends away from fin curvature
        n.x *= -1;
        n.y *= -1;

        const end = {
            x: p1.x + tan.x * filamentLength,
            y: p1.y + tan.y * filamentLength
        };

        if (filamentCurved) {
            const c = {
                x: p1.x + tan.x * (filamentLength * 0.5) + n.x * (filamentBendFactor * filamentLength),
                y: p1.y + tan.y * (filamentLength * 0.5) + n.y * (filamentBendFactor * filamentLength)
            };

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(c.x, c.y, end.x, end.y);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}


function drawFinAlongCurve(ctx, bodyCurves, opts) {
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
    ctx.stroke();
}

// generic fin painter - center at cx,cy. rotation in radians.
// width = side-to-side span, height = tip length.
// options: {style: "rounded"|"pointy", curvature: 0..1}
function drawFinShape(ctx, cx, cy, width, height, rotation = 0, options = {}) {
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
    ctx.strokeStyle = colors.fin;

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
        case 6:
            // Zebra Angelfish
            // Dorsal fin
            drawAngelfishFin(ctx, bodyCurves, {
                frameFunc: getBodyTopFrame,
                startT: 0.3,
                endT: 0.8,
                height: bodyHeight * 0.3,
                bendOuter: 0.1,
                bendInner: 0.2,
                filamentLength: bodyHeight * 0.2,
                filamentCurved: true,
                filamentBendFactor: 0.1,
                overlap: bodyHeight * 0.1,
            });

            // Anal fin
            drawAngelfishFin(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.45,
                endT: 0.85,
                height: bodyHeight * 0.3,
                bendOuter: 0.1,
                bendInner: 0.2,
                filamentLength: bodyHeight * 0.2,
                filamentCurved: true,
                filamentBendFactor: 0.1,
                overlap: bodyHeight * 0.1,
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.25,
                endT: 0.3,
                height: bodyHeight * 0.4,
                taper: 1,
                lean: 0.9,
                overlap: bodyHeight * 0.1,
                steps: 10
            });
            break;
        case 7:
            // Smallmouth Grunt
            // Dorsal fins
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyTopFrame,
                startT: 0.35,
                endT: 0.7,
                height: bodyHeight * 0.1,
                taper: 0.8,
                lean: 0.0,
                overlap: bodyHeight * 0.1,
                steps: 10
            });

            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyTopFrame,
                startT: 0.7,
                endT: 0.95,
                height: bodyHeight * 0.2,
                taper: 1,
                lean: -0.1,
                overlap: bodyHeight * 0.1,
                steps: 10
            });

            // Anal fin
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.7,
                endT: 0.95,
                height: bodyHeight * 0.2,
                taper: 1,
                lean: 0.9,
                overlap: bodyHeight * 0.1,
                steps: 10
            });

            // Pelvic fin
            drawFinAlongCurve(ctx, bodyCurves, {
                frameFunc: getBodyBottomFrame,
                startT: 0.4,
                endT: 0.5,
                height: bodyHeight * 0.2,
                taper: 1,
                lean: 0.8,
                overlap: bodyHeight * 0.1,
                steps: 10
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
        case 6:
            // Zebra Angelfish
            cx = bodyRight - (bodyLength * 0.25);
            cy = yCenter + (bodyHeight * 0.15);
            finWidth = bodyLength * 0.15;
            finHeight = bodyHeight * 0.5;
            rotation = 1.6 * Math.PI;
            break;
        case 7:
            // Smallmouth Grunt
            cx = bodyRight - (bodyLength * 0.3);
            cy = yCenter + (bodyHeight * 0.15);
            finWidth = bodyLength * 0.15;
            finHeight = bodyHeight * 0.5;
            rotation = 1.6 * Math.PI;
            break;
        default:
            break;
    }
    drawFinShape(ctx, cx, cy, finWidth, finHeight, rotation, { style: "pointy" });
}



