export function cubicFromMid(p0, p3, curvature, normalSign) {
    const dx = p3.x - p0.x;
    const dy = p3.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;

    // unit perpendicular
    const nx = -dy / len * normalSign;
    const ny = dx / len * normalSign;

    // actual bend in pixels (scale-invariant)
    const bend = curvature * len;

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

export function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));
}

export function quadControlFromChordPosition(p0, p2, curvature, normalSign, position, useSecondPoint = false) {
    // position is point on line (0 = p0, 0.5 = mid, 1 = p2)
    const dx = p2.x - p0.x;
    const dy = p2.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;

    if (useSecondPoint) {
        // Use the second point as reference
        position = 1 - position;
    }
    const mx = ((p2.x - p0.x) * position) + p0.x;
    const my = ((p2.y - p0.y) * position) + p0.y;

    // unit perpendicular (normal)
    const nx = -dy / len * normalSign;
    const ny = dx / len * normalSign;

    // bend in pixels, scale with chord length
    const bend = curvature * len;

    return { x: mx + nx * bend, y: my + ny * bend };
}

export function quadControlFromMid(p0, p2, curvature, normalSign) {
    const dx = p2.x - p0.x;
    const dy = p2.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;

    const mp = midPoint(p0, p2);

    // unit perpendicular (normal)
    const nx = -dy / len * normalSign;
    const ny = dx / len * normalSign;

    // bend in pixels, scale with chord length
    const bend = curvature * len;

    return { x: mp.x + nx * bend, y: mp.y + ny * bend };
}

export function midPoint(p1, p2) {
    const x = (p1.x + p2.x) / 2;
    const y = (p1.y + p2.y) / 2;
    return { x, y };
}