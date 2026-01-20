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

export function midPoint(p1, p2) {
    const x = (p1.x + p2.x) / 2;
    const y = (p1.y + p2.y) / 2;
    return { x, y };
}