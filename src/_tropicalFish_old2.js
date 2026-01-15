import { findElementByCoordinates } from "./balUtils.js";

export const tropicalFishFinVariations = 1;
export const tropicalFishHeights = 3;
export const tropicalFishPalettes = 9;
export const tropicalFishStripes = 11;
export const tropicalFishTails = 3;

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
    function drawEmarginateTail() {
        ctx.moveTo(left + tailWidth, yc + connectionWidth * 0.5);
        ctx.lineTo(left, yc + tailHeight * 0.5);
        ctx.quadraticCurveTo(left + (tailWidth * 0.95), yc, left, yc - tailHeight * 0.5);
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

    function leftNormal(v) {
        return { x: -v.y, y: v.x };
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

    function getBodyTopPoint(t) {
        if (t < 0.5) {
            return quadBezierPoint(
                bodyCurves.topFront.p0,
                bodyCurves.topFront.p1,
                bodyCurves.topFront.p2,
                t * 2
            );
        } else {
            return quadBezierPoint(
                bodyCurves.topRear.p0,
                bodyCurves.topRear.p1,
                bodyCurves.topRear.p2,
                (t - 0.5) * 2
            );
        }
    }

    function getBodyBottomPoint(t) {
        if (t < 0.5) {
            return quadBezierPoint(
                bodyCurves.bottomFront.p0,
                bodyCurves.bottomFront.p1,
                bodyCurves.bottomFront.p2,
                t * 2
            );
        } else {
            return quadBezierPoint(
                bodyCurves.bottomRear.p0,
                bodyCurves.bottomRear.p1,
                bodyCurves.bottomRear.p2,
                (t - 0.5) * 2
            );
        }
    }

    // --- Fin functions ---


    function drawFinAlongCurve(ctx, opts) {
        let { startT, endT, height, taper = 0.5, lean = 0, overlap = 0, steps = 10, frameFunc } = opts;

        // Bottom curve runs tail → head, so invert t
        const isBottom = frameFunc === getBodyBottomFrame;

        if (isBottom) {
            startT = 1 - startT;
            endT = 1 - endT;

            // Keep order correct
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

            const h = height * (1 - taper * Math.abs(s - 0.5) * 2);

            const dir = frameFunc === getBodyBottomFrame ? -1 : 1;
            const lx = tan.x * lean * h * dir;
            const ly = tan.y * lean * h * dir;

            const ox = normal.x * (h + overlap) + lx;
            const oy = normal.y * (h + overlap) + ly;

            base.push({ x: p.x, y: p.y });
            tip.push({ x: p.x + ox, y: p.y + oy });
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

    // ---------- Fin system (replace existing dorsal/anal code with this) ----------
    // fin config parsing: supports number bitmask, preset string, or object.
    // Bit positions (if number used): 1=dorsal, 2=anal, 4=pectoral, 8=pelvic
    function parseFinsParam(fins) {
        // default: keep previous behavior (dorsal + anal visible)
        const defaultObj = { dorsal: true, anal: true, pectoral: false, pelvic: false };

        if (fins == null) return defaultObj;

        if (typeof fins === "string") {
            const s = fins.toLowerCase();
            if (s === "all") return { dorsal: true, anal: true, pectoral: true, pelvic: true };
            if (s === "none") return { dorsal: false, anal: false, pectoral: false, pelvic: false };
            if (s === "default") return defaultObj;
            const obj = { ...defaultObj };
            s.split(",").map(x => x.trim()).forEach(tok => {
                if (!tok) return;
                if (tok === "pectoral") obj.pectoral = true;
                if (tok === "pelvic") obj.pelvic = true;
                if (tok === "dorsal") obj.dorsal = true;
                if (tok === "anal") obj.anal = true;
                if (tok === "no-dorsal") obj.dorsal = false;
                if (tok === "no-anal") obj.anal = false;
            });
            return obj;
        }

        if (typeof fins === "number") {
            return {
                dorsal: !!(fins & 1),
                anal: !!(fins & 2),
                pectoral: !!(fins & 4),
                pelvic: !!(fins & 8),
            };
        }

        if (typeof fins === "object") {
            // normalize
            return {
                dorsal: fins.dorsal ?? defaultObj.dorsal,
                anal: fins.anal ?? defaultObj.anal,
                pectoral: fins.pectoral ?? defaultObj.pectoral,
                pelvic: fins.pelvic ?? defaultObj.pelvic
            };
        }

        return defaultObj;
    }

    function mapToBelly(t) {
        // 0 → start of belly
        // 1 → start of tail root
        const BELLY_START = 0.48;
        const BELLY_END = 0.80;

        return BELLY_START + t * (BELLY_END - BELLY_START);
    }

    function drawBackgroundFins() {
        ctx.fillStyle = colors.fin;

        // dorsal (top)
        drawFinAlongCurve(ctx, {
            frameFunc: getBodyTopFrame,
            startT: 0.38,
            endT: 0.62,
            height: bodyHeight * 0.45,
            taper: 0.65, // 0.65
            lean: 0.25, // 0.25
            overlap: bodyHeight * 0.04
        });

        // anal (bottom)
        if (finCfg.anal) {
            drawFinAlongCurve(ctx, {
                frameFunc: getBodyBottomFrame,
                startT: 0.48,
                endT: 0.68,
                height: bodyHeight * 0.32,
                taper: 0.55,
                lean: 0.35,
                overlap: bodyHeight * 0.04
            });
        }

        // pelvic fins - small pair near mid-lower belly
        if (finCfg.pelvic) {
            drawFinAlongCurve(ctx, {
                frameFunc: (t) => getBodyBottomFrame(mapToBelly(t)),
                startT: 0.00,
                endT: 0.25,
                height: bodyHeight * 0.22,
                taper: 0.75,
                lean: 0.55,
                overlap: bodyHeight * 0.05,
                steps: 6
            });
        }
    }

    function drawForeGroundFins() {
        ctx.fillStyle = colors.fin;

        // pectorals - located near the head/upper-mid area, angled back
        if (finCfg.pectoral) {
            const t = 0.22;
            const topPt = getBodyTopPoint(t);
            const bottomPt = getBodyBottomPoint(t);
            const midY = (topPt.y + bottomPt.y) * 0.5;

            drawFinShape(
                bodyRight - bodyLength * 0.12, // fixed anatomical X
                midY,
                bodyLength * 0.22,
                bodyHeight * 0.22,
                -0.8,
                { style: "pointy" }
            );
        }
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
    let colors = null;
    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",    // yellow-orange
                stripe: "#FF8C00",  // orange
                stripeOutline: null,
                fin: "#4CAF50",     // tropical green
                tail: "#4CAF50",
                eye: "#000000"
            }
            break;
        case 3:
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",    // rich golden yellow
                stripe: "#1A1A1A",  // near-black
                stripeOutline: null,
                fin: "#FFE680",     // pale golden / translucent yellow
                tail: "#FFE680",
                eye: "#000000"
            }
            break;
        case 4:
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",    // deeper gold
                stripe: "#000000",  // black
                stripeOutline: null,
                fin: "#FFEB99",     // lighter yellow
                tail: "#FFEB99",
                eye: "#000000"
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",    // soft tropical light blue
                stripe: "#2A6F97",  // deeper blue
                stripeOutline: null,
                fin: "#A9DCEC",     // pale translucent blue
                tail: "#A9DCEC",
                eye: "#000000"
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",    // silvery blue-gray
                stripe: "#5F6F7A",  // muted gray
                stripeOutline: null,
                fin: "#E3EDF2",     // very light translucent
                tail: "#E3EDF2",
                eye: "#000000"
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",    // deep ocean blue
                stripe: "#0B2F4A",  // very dark blue (almost black)
                stripeOutline: null,
                fin: "#3F7FA6",     // muted blue
                tail: "#3F7FA6",
                eye: "#000000"
            }
            break;
        case 8:
            // Clownfish
            colors = {
                body: "#FF8C1A",    // bright orange
                stripe: "#FFFFFF",  // clean white
                stripeOutline: "#000000",
                fin: "#FFB347",     // lighter orange
                tail: "#FFB347",
                eye: "#000000"
            }
            break;
        case 9:
            // Redtail shark
            colors = {
                body: "#222222",    // deep matte black
                stripe: "#222222",  // no stripe
                stripeOutline: null,
                fin: "#333333",     // very dark gray (almost black)
                tail: "#FF3B3B",    // vivid red
                eye: "#000000"
            }
            break;
        default:
            // 1
            colors = {
                body: "#FF6347",    // red-orange
                stripe: "#FF4500",  // red-orange
                stripeOutline: null,
                fin: "#FFD700",     // gold
                tail: "#FFD700",
                eye: "#000000"
            };
            break;
    }

    // Body dimensions
    const bodyLength = w * 0.7;
    let bodyHeight = 0;
    switch (height) {
        case 1:
            bodyHeight = h * 0.25;
            break;
        case 3:
            bodyHeight = h * 0.45;
            break;
        default:
            // 2
            bodyHeight = h * 0.35;
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
            // Truncate
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
            break;
        case 3:
            // Rounded
            tailWidth = bodyLength * 0.25;
            tailHeight = bodyHeight * 0.7;
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


    // ---- Fins ----
    // Decide positions & sizes relative to body
    const finCfg = parseFinsParam(7);
    drawBackgroundFins();


    // ---- Draw the body ----
    ctx.fillStyle = colors.body;
    ctx.strokeStyle = colors.body;

    // Delete everything (parts of fins) under the body
    // ctx.save();
    // ctx.globalCompositeOperation = "destination-out";
    // buildBodyPath(ctx);
    // ctx.fill();
    // ctx.restore();
    // ctx.globalCompositeOperation = "source-over";

    //buildBodyPath(ctx);
    //ctx.fill();

    // DEBUG
    // TODO: Comment out
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    buildBodyPath(ctx);
    ctx.stroke();
    stripes = 0;


    // ---- Stripes ----
    ctx.save();
    // Clip to body shape
    buildBodyPath(ctx);
    ctx.clip();

    let headMargin = 0.1;
    let numberOfStripes = 5;
    let stripeWidth = Math.max(1, size * 0.05);

    if (stripes > 7) {
        numberOfStripes = stripes - 7;
        stripeWidth = stripeWidth * 1.5;
        headMargin = 0.3;
    } else {
        numberOfStripes = stripes;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const tailMargin = 0;
    const bodyWidth = bodyRight - bodyLeft;
    for (let i = 0; i < numberOfStripes; i++) {
        const t = tailMargin + (i + 0.5) / numberOfStripes * (1 - tailMargin - headMargin);
        const x = bodyLeft + t * bodyWidth;
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

        if (colors.stripeOutline !== null) {
            ctx.strokeStyle = colors.stripeOutline;
            ctx.lineWidth = stripeWidth * 1.6;
            ctx.beginPath();
            ctx.moveTo(xTop, yTop);
            ctx.quadraticCurveTo(cpX, cpY, xBottom, yBottom);
            ctx.stroke();
        }
        ctx.strokeStyle = colors.stripe;
        ctx.lineWidth = stripeWidth;
        ctx.beginPath();
        ctx.moveTo(xTop, yTop);
        ctx.quadraticCurveTo(cpX, cpY, xBottom, yBottom);
        ctx.stroke();
    }
    ctx.restore();

    // ---- More fins ----
    drawForeGroundFins();

    // ---- Tail ----
    ctx.fillStyle = colors.tail;
    ctx.beginPath();
    switch (tail) {
        case 2:
            drawTruncateTail();
            break;
        case 3:
            drawRoundedTail();
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
    const eyeRadius = (height === 1) ? size * 0.03 : size * 0.04;
    ctx.beginPath();
    ctx.arc(right - bodyLength * 0.15, yc - bodyHeight * 0.1, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Restore transform if flipped
    if (flipHorizontally) {
        ctx.restore();
    }

    ctx.lineWidth = 1;
}

export function moveTropicalFish(backData, gameData, gameInfo) {
    let changed = false;
    let down = false;
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let up = false;
    let upOrDown = false;

    for (let i = 0; i < gameInfo.tropicalFish.length; i++) {
        down = false;
        up = false;
        upOrDown = false;
        const fish = gameInfo.tropicalFish[i];
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