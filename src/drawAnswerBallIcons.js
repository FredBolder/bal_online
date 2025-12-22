export function drawCar(ctx, xc, yc, size) {
    // Proportions
    const bodyHeight = size * 0.25; // was 0.33
    const bodyWidth = size * 0.80;

    const bodyX = xc - bodyWidth / 2;
    const bodyY = yc - bodyHeight / 2;

    // Wheels
    const wheelRadius = size * 0.11; // was 0.12
    const wheelY = bodyY + bodyHeight;

    const leftWheelX = xc - (bodyWidth * 0.28);
    const rightWheelX = xc + (bodyWidth * 0.28);

    // Roof
    const roofHeight = size * 0.22; // was 0.19
    const roofLength = size * 0.40;

    const roofX1 = xc - (roofLength * 0.70);
    const roofX2 = roofX1 + roofLength;

    const roofY = bodyY - roofHeight + (size * 0.04);
    const windowInset = size * 0.03;

    // Body
    ctx.fillStyle = "#2d89ef";
    ctx.beginPath();

    // Back
    ctx.moveTo(bodyX, bodyY + bodyHeight);
    ctx.lineTo(bodyX, bodyY + (bodyHeight * 0.45));
    ctx.lineTo(bodyX + (size * 0.12), roofY + roofHeight);

    // Roof
    ctx.lineTo(roofX1, roofY + roofHeight);
    ctx.lineTo(roofX1 + (size * 0.05), roofY);
    ctx.lineTo(roofX2 - (size * 0.05), roofY);
    ctx.lineTo(roofX2, roofY + roofHeight);

    // Front
    ctx.lineTo(bodyX + bodyWidth - (size * 0.18), roofY + roofHeight);
    ctx.lineTo(bodyX + bodyWidth - (size * 0.05), bodyY + (bodyHeight * 0.40));
    ctx.lineTo(bodyX + bodyWidth, bodyY + (bodyHeight * 0.70));
    ctx.lineTo(bodyX + bodyWidth, bodyY + bodyHeight);

    ctx.closePath();
    ctx.fill();

    // Window
    ctx.fillStyle = "#d0e6f7";
    ctx.beginPath();
    ctx.lineTo(roofX1 + windowInset, roofY + roofHeight);
    ctx.lineTo(roofX1 + windowInset + (size * 0.04), roofY + windowInset);
    ctx.lineTo(roofX2 - windowInset - (size * 0.04), roofY + windowInset);
    ctx.lineTo(roofX2 - windowInset, roofY + roofHeight);
    ctx.fill();

    // Wheels
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(leftWheelX, wheelY, wheelRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightWheelX, wheelY, wheelRadius, 0, Math.PI * 2);
    ctx.fill();
}

// This drawing is not only used for answer balls.
export function drawFish(ctx, xc, yc, size, flipHorizontally = false, variation = false) {
    if (flipHorizontally) {
        ctx.save();
        ctx.translate(xc, 0);
        ctx.scale(-1, 1);
        ctx.translate(-xc, 0);
    }

    const w = size;
    const h = size;

    // Color palettes
    const palette = variation
        ? {
            body: "#FFD94A",       // yellow-orange
            stripe: "#FF8C00",     // orange
            fin: "#4CAF50",        // tropical green
            eye: "#000000"
        }
        : {
            body: "#FF6347",       // red-orange
            stripe: "#FF4500",     // red-orange
            fin: "#FFD700",        // gold
            eye: "#000000"
        };

    // Body dimensions
    const bodyLength = w * 0.7;
    const bodyHeight = h * 0.4;
    const tailWidth = bodyLength * 0.25;
    const tailHeight = bodyHeight * 1;

    // Compute horizontal shift to center the full fish including tail fin
    const tailExtension = tailWidth * 0.8;
    const centerShift = tailExtension / 2;
    const left = xc - bodyLength / 2 + centerShift;
    const right = xc + bodyLength / 2 + centerShift;
    const top = yc - bodyHeight / 2;
    const bottom = yc + bodyHeight / 2;

    // ---- Body outline ----
    ctx.fillStyle = palette.body;
    ctx.beginPath();

    // Nose
    ctx.moveTo(right, yc);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, top, right - bodyLength * 0.5, top);
    ctx.lineTo(left + tailWidth, top);

    // Tail connection
    const connectionWidth = bodyHeight * 0.15;
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left + tailWidth, bottom);

    // Bottom curve
    ctx.lineTo(right - bodyLength * 0.5, bottom);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, bottom, right, yc);

    ctx.closePath();
    ctx.fill();

    // ---- Stripes ----
    ctx.save();

    // Clip to body shape
    ctx.beginPath();
    ctx.moveTo(right, yc);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, top, right - bodyLength * 0.5, top);
    ctx.lineTo(left + tailWidth, top);
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left + tailWidth, bottom);
    ctx.lineTo(right - bodyLength * 0.5, bottom);
    ctx.quadraticCurveTo(right - bodyLength * 0.1, bottom, right, yc);
    ctx.closePath();
    ctx.clip();

    const stripeCount = 5;
    ctx.strokeStyle = palette.stripe;
    ctx.lineWidth = Math.max(1, size * 0.05);

    for (let i = 1; i <= stripeCount; i++) {
        const t = i / (stripeCount + 1);
        const x = left + t * (right - left);
        const distFromCenter = Math.abs(t - 0.5);
        const curveStrength = (0.12 - distFromCenter * 0.08) * bodyLength;
        const tilt = bodyLength * 0.03;
        const topOffset = (0.02 + distFromCenter * 0.05) * bodyHeight;
        const bottomOffset = (0.02 + distFromCenter * 0.05) * bodyHeight;
        const xTop = x - tilt;
        const xBottom = x + tilt;
        const yTop = top + topOffset;
        const yBottom = bottom - bottomOffset;
        const cpX = x + curveStrength;
        const cpY = yc;

        ctx.beginPath();
        ctx.moveTo(xTop, yTop);
        ctx.quadraticCurveTo(cpX, cpY, xBottom, yBottom);
        ctx.stroke();
    }

    ctx.restore();

    // ---- Tail fin ----
    ctx.fillStyle = palette.fin;
    ctx.beginPath();
    ctx.moveTo(left, yc + (0.5 * connectionWidth));
    ctx.lineTo(left, yc - (0.5 * connectionWidth));
    ctx.lineTo(left - tailWidth * 0.9, yc - tailHeight / 2);
    ctx.quadraticCurveTo(left - tailWidth * 0.4, yc, left - tailWidth * 0.8, yc + tailHeight / 3);
    ctx.closePath();
    ctx.fill();

    // ---- Top fin ----
    ctx.fillStyle = palette.fin;
    const dorsalHeight = bodyHeight * 0.5;
    ctx.beginPath();
    ctx.moveTo(right - bodyLength * 0.6, top);
    ctx.lineTo(right - bodyLength * 0.8, top - dorsalHeight);
    ctx.quadraticCurveTo(right - bodyLength * 0.5, top - dorsalHeight / 2, right - bodyLength * 0.4, top);
    ctx.closePath();
    ctx.fill();

    // ---- Bottom fin ----
    ctx.fillStyle = palette.fin;
    const analHeight = bodyHeight * 0.35;
    ctx.beginPath();
    ctx.moveTo(right - bodyLength * 0.6, bottom);
    ctx.lineTo(right - bodyLength * 0.8, bottom + analHeight);
    ctx.quadraticCurveTo(right - bodyLength * 0.45, bottom + analHeight / 2, right - bodyLength * 0.35, bottom);
    ctx.closePath();
    ctx.fill();

    // ---- Eye ----
    ctx.fillStyle = palette.eye;
    const eyeRadius = size * 0.04;
    ctx.beginPath();
    ctx.arc(right - bodyLength * 0.15, yc - bodyHeight * 0.1, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Restore transform if flipped
    if (flipHorizontally) {
        ctx.restore();
    }
}

export function drawFlower(ctx, xc, yc, size) {
    const petalCount = 5;
    const petalRadius = size * 0.2;
    const centerRadius = size * 0.15;
    const flowerRadius = (size / 2) - petalRadius;

    ctx.fillStyle = 'pink';
    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * 2 * Math.PI;
        const px = xc + flowerRadius * Math.cos(angle);
        const py = yc + flowerRadius * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(px, py, petalRadius, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(xc, yc, centerRadius, 0, 2 * Math.PI);
    ctx.fill();
}

export function drawHeart(ctx, xc, yc, size) {
    const r = size * 0.25;
    let cy = yc - size * 0.10; // will be corrected later
    const leftCx = xc - r;
    const rightCx = xc + r;
    const endAngle = Math.PI * 0.75;
    let leftEndX = leftCx + r * Math.cos(endAngle);
    let leftEndY = cy + r * Math.sin(endAngle);
    let rightEndX = rightCx + r * Math.cos(Math.PI - endAngle);
    let rightEndY = cy + r * Math.sin(Math.PI - endAngle);
    const leftTanAngle = endAngle + Math.PI / 2;
    const rightTanAngle = (Math.PI - endAngle) - Math.PI / 2;

    const denom =
        (Math.cos(leftTanAngle) * Math.sin(rightTanAngle) -
            Math.sin(leftTanAngle) * Math.cos(rightTanAngle));

    const u =
        ((rightEndX - leftEndX) * Math.sin(rightTanAngle) -
            (rightEndY - leftEndY) * Math.cos(rightTanAngle)) / denom;

    let tipX = leftEndX + u * Math.cos(leftTanAngle);
    let tipY = leftEndY + u * Math.sin(leftTanAngle);

    const topY = cy - r;
    const bottomY = tipY;
    const heartCenterY = (topY + bottomY) / 2;
    const verticalShift = yc - heartCenterY;
    cy += verticalShift;
    leftEndY += verticalShift;
    rightEndY += verticalShift;
    tipY += verticalShift;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xc, cy - r);
    ctx.arc(leftCx, cy, r, 0, endAngle, true);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(rightEndX, rightEndY);
    ctx.arc(rightCx, cy, r, Math.PI - endAngle, Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
}

// This drawing is not only used for answer balls.
export function drawStar(ctx, xc, yc, size, color) {
    const outerRadius = size * 0.5;
    const innerRatio = Math.sin(Math.PI * 18 / 180) / Math.sin(Math.PI * 54 / 180);
    const innerRadius = outerRadius * innerRatio;
    const cx = xc;
    const cy = yc;

    ctx.beginPath();
    const spikes = 5;
    const step = Math.PI / spikes;
    let angle = -Math.PI / 2;
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(angle) * outerRadius, cy + Math.sin(angle) * outerRadius);
        angle += step;
        ctx.lineTo(cx + Math.cos(angle) * innerRadius, cy + Math.sin(angle) * innerRadius);
        angle += step;
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

export function drawTree(ctx, xc, yc, size) {
    const trunkWidth = size * 0.1; // was 0.15
    const trunkHeight = size * 0.3; // was 0.35
    const trunkX = xc - trunkWidth / 2;
    const trunkY = yc + size / 2 - trunkHeight;
    ctx.fillStyle = "#8B5A2B"; // brown
    ctx.fillRect(trunkX, trunkY, trunkWidth, trunkHeight);

    const foliageCount = 4;
    const foliageHeight = (size - trunkHeight) / foliageCount;
    const foliageWidth = size * 0.6;
    ctx.fillStyle = "#228B22"; // green
    for (let i = 0; i < foliageCount; i++) {
        const overlap = foliageHeight * 0.2;
        const layerY = trunkY - foliageHeight * i + overlap * i;
        const layerWidth = foliageWidth * (1 - i * 0.15);
        ctx.beginPath();
        ctx.moveTo(xc - layerWidth / 2, layerY);
        ctx.lineTo(xc + layerWidth / 2, layerY);
        ctx.lineTo(xc, layerY - foliageHeight);
        ctx.closePath();
        ctx.fill();
    }
}

