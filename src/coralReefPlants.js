export function drawCoralReefPlant(ctx, xc, yc, size, swayAmountPercentage, swaySpeedPercentage, swayPhase = 0) {
    // swayPhase 0 .. 2*PI
    const time = performance.now() * 0.001;
    const plantTop = -40;
    const plantBottom = 40;
    const plantWidth = 28;

    // animation
    const swayAmount = swayAmountPercentage * 0.01 * 0.4;  // 0 .. 0.4  (fraction of size; higher = more motion)
    const swaySpeed = (swaySpeedPercentage * 0.01 * 5) + 0.5 // normal 1.2

    const branchSpecs = [
        { t: 0.20, dir: -1, len: 20 },
        { t: 0.36, dir: 1, len: 24 },
        { t: 0.52, dir: -1, len: 20 },
        { t: 0.68, dir: 1, len: 16 },
    ];

    const stemThickness = 5;
    const branchThickness = 3;
    const tipRadius = 2;

    // base cubic stem (design-space units)
    const p0 = { x: 0, y: plantBottom };
    const p1 = { x: -8, y: 10 };
    const p2 = { x: 8, y: -20 };
    const tipSway =
        Math.sin(time * swaySpeed + swayPhase + 0.6) *
        swayAmount * size * 1.25;
        const p3 = {
        x: tipSway,
        y: plantTop
    };


    function cubicPoint(a, b, c, d, t) {
        const mt = 1 - t, mt2 = mt * mt, t2 = t * t;
        return {
            x: a.x * (mt2 * mt) + 3 * b.x * (mt2 * t) + 3 * c.x * (mt * t2) + d.x * (t2 * t),
            y: a.y * (mt2 * mt) + 3 * b.y * (mt2 * t) + 3 * c.y * (mt * t2) + d.y * (t2 * t)
        };
    }
    function cubicTangent(a, b, c, d, t) {
        const mt = 1 - t;
        return {
            x: 3 * ((b.x - a.x) * (mt * mt) + 2 * (c.x - b.x) * (mt * t) + (d.x - c.x) * (t * t)),
            y: 3 * ((b.y - a.y) * (mt * mt) + 2 * (c.y - b.y) * (mt * t) + (d.y - c.y) * (t * t))
        };
    }

    const pixelSway = Math.sin(time * swaySpeed + swayPhase) * swayAmount * size;
    const approxDesignWidth = plantWidth * 2 + 20; // approximate safe design width
    const approxDesignHeight = Math.abs(plantTop) + Math.abs(plantBottom) + 20;
    const approxFinalScale = size / Math.max(approxDesignWidth, approxDesignHeight);
    const swayDesign = pixelSway / Math.max(approxFinalScale, 1e-6);

    // apply swayDesign to control points
    const h = plantBottom - plantTop;

    const sp1 = {
        x: p1.x + swayDesign * 0.5 * ((plantBottom - p1.y) / h),
        y: p1.y
    };

    const sp2 = {
        x: p2.x + swayDesign * ((plantBottom - p2.y) / h),
        y: p2.y
    };

    // --- compute exact design-space bounding box by sampling geometry ---
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const stemSamples = 60;
    for (let i = 0; i <= stemSamples; i++) {
        const t = i / stemSamples;
        const p = cubicPoint(p0, sp1, sp2, p3, t);
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }

    // sample branches
    for (let j = 0; j < branchSpecs.length; j++) {
        const spec = branchSpecs[j];
        const tAttach = Math.max(0, Math.min(1, spec.t));
        const attach = cubicPoint(p0, sp1, sp2, p3, tAttach);
        const tang = cubicTangent(p0, sp1, sp2, p3, tAttach);
        const mag = Math.hypot(tang.x, tang.y) || 1;
        const tx = tang.x / mag, ty = tang.y / mag;
        const nx = -ty * spec.dir, ny = tx * spec.dir;
        const branchLen = spec.len;
        const end = {
            x: attach.x + nx * branchLen + tx * (branchLen * 0.12),
            y: attach.y + ny * branchLen + ty * (branchLen * 0.12)
        };
        const cp1 = {
            x: attach.x + tx * (branchLen * 0.18) + nx * (branchLen * 0.08),
            y: attach.y + ty * (branchLen * 0.18) + ny * (branchLen * 0.08)
        };
        const cp2 = {
            x: attach.x + tx * (branchLen * 0.6) + nx * (branchLen * 0.32),
            y: attach.y + ty * (branchLen * 0.6) + ny * (branchLen * 0.32)
        };

        const branchSamples = 24;
        for (let s = 0; s <= branchSamples; s++) {
            const u = s / branchSamples;
            const mt = 1 - u;
            const x = attach.x * (mt * mt * mt) + 3 * cp1.x * (mt * mt * u) + 3 * cp2.x * (mt * u * u) + end.x * (u * u * u);
            const y = attach.y * (mt * mt * mt) + 3 * cp1.y * (mt * mt * u) + 3 * cp2.y * (mt * u * u) + end.y * (u * u * u);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
        if (end.x - tipRadius < minX) minX = end.x - tipRadius;
        if (end.x + tipRadius > maxX) maxX = end.x + tipRadius;
        if (end.y - tipRadius < minY) minY = end.y - tipRadius;
        if (end.y + tipRadius > maxY) maxY = end.y + tipRadius;
    }

    const margin = Math.max(stemThickness, branchThickness, tipRadius) * 1.2;
    const leftPad = margin;
    const rightPad = margin;
    const topPad = margin;
    const bottomPad = 2;

    minX -= leftPad; maxX += rightPad;
    minY -= topPad; maxY += bottomPad;

    const designWidth = maxX - minX;
    const designHeight = maxY - minY;
    const finalScale = size / Math.max(designWidth, designHeight);

    // align
    const translateX = xc;
    const translateY = (yc + size / 2) - maxY * finalScale;
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.scale(finalScale, finalScale);

    // draw stem
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(sp1.x, sp1.y, sp2.x, sp2.y, p3.x, p3.y);
    ctx.lineCap = "round"; 
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(60,140,110,0.95)";
    ctx.lineWidth = stemThickness;
    ctx.stroke();

    // highlight
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(sp1.x, sp1.y, sp2.x, sp2.y, p3.x, p3.y);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = stemThickness * 0.35;
    ctx.stroke();

    // branches
    ctx.lineWidth = branchThickness;
    ctx.strokeStyle = "rgba(90,200,160,0.95)";
    ctx.fillStyle = "rgba(110,230,180,0.95)";

    for (let i = 0; i < branchSpecs.length; i++) {
        const spec = branchSpecs[i];
        const t = Math.max(0, Math.min(1, spec.t));
        const attach = cubicPoint(p0, sp1, sp2, p3, t);
        const tang = cubicTangent(p0, sp1, sp2, p3, t);
        const mag = Math.hypot(tang.x, tang.y) || 1;
        const tx = tang.x / mag, ty = tang.y / mag;
        const nx = -ty * spec.dir, ny = tx * spec.dir;
        const branchLen = spec.len;
        const end = {
            x: attach.x + nx * branchLen + tx * (branchLen * 0.12),
            y: attach.y + ny * branchLen + ty * (branchLen * 0.12)
        };
        const cp1 = {
            x: attach.x + tx * (branchLen * 0.18) + nx * (branchLen * 0.08),
            y: attach.y + ty * (branchLen * 0.18) + ny * (branchLen * 0.08)
        };
        const cp2 = {
            x: attach.x + tx * (branchLen * 0.6) + nx * (branchLen * 0.32),
            y: attach.y + ty * (branchLen * 0.6) + ny * (branchLen * 0.32)
        };

        ctx.beginPath();
        ctx.moveTo(attach.x, attach.y);
        ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        ctx.stroke();

        // tip
        ctx.beginPath();
        ctx.arc(end.x, end.y, tipRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
    ctx.lineCap = "butt"; 
    ctx.lineJoin = "miter";
}
