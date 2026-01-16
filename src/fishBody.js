export function buildBodyPath(ctx, bodyLeft, bodyRight, top, bottom, connectionHeight, rearCurve, frontCurve, midX, yc) {
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
        bodyLeft, yc - connectionHeight / 2
    );

    // Tail connection
    ctx.lineTo(bodyLeft, yc + connectionHeight / 2);

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

export function getBodyBottomFrame(bodyCurves, t) {
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

    const normal = { x: -tan.y, y: tan.x };

    return { p, tan, normal };
}

export function getBodyTopFrame(bodyCurves, t) {
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

    const normal = { x: -tan.y, y: tan.x };

    return { p, tan, normal };
}

