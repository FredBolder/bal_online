import { globalVars } from "./glob";
import { setArray } from "./utils";

export function drawNoteOnScore(context, x, y, lineDistance, type, dots, color) {
    const { ctx, yc } = context;

    const pxScale = window.devicePixelRatio || 1;
    const minDrawingWidth = 1 / pxScale;
    const lineWidth = Math.max(lineDistance * 0.267857, minDrawingWidth);

    const rX = lineDistance * 0.643;
    const rY = lineDistance * 0.5;

    const cx = x;
    const cy = y;
    const stemDown = y <= (yc + (0.1 * lineDistance));
    const stemSide = stemDown ? -1 : 1;
    const flagDirection = stemDown ? -1 : 1;

    let headRotation = -0.35;

    if (type === "whole") {
        headRotation = 0;
    }

    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    // ---- Extra lines ----
    const tolerance = lineDistance * 0.25;
    const halfWidth = rX + (lineDistance * 0.4);

    if (lineDistance > 0 && Number.isFinite(cy)) {
        ctx.lineWidth = 1;
        ctx.beginPath();

        if (cy < yc) {
            // Above the score
            for (let position = -6;
                yc + (position * lineDistance * 0.5) >= cy - tolerance;
                position -= 2) {

                const lineY = yc + (position * lineDistance * 0.5);

                ctx.moveTo(cx - halfWidth, lineY);
                ctx.lineTo(cx + halfWidth, lineY);
            }
        } else if (cy > yc) {
            // Below the score
            for (let position = 6;
                yc + (position * lineDistance * 0.5) <= cy + tolerance;
                position += 2) {

                const lineY = yc + (position * lineDistance * 0.5);

                ctx.moveTo(cx - halfWidth, lineY);
                ctx.lineTo(cx + halfWidth, lineY);
            }
        }

        ctx.stroke();
        ctx.lineWidth = lineWidth;
    }

    // ---- Note head ----
    ctx.beginPath();
    ctx.ellipse(cx, cy, rX, rY, headRotation, 0, Math.PI * 2);
    ctx.stroke();

    if ((type !== "whole") && (type !== "half")) {
        ctx.fill();
    }

    // ---- Stem ----
    const sin = Math.sin(headRotation);
    const cos = Math.cos(headRotation);

    const stemOffsetX = Math.hypot(rX * cos, rY * sin);
    const stemOffsetY = ((rX * rX) - (rY * rY)) * sin * cos / stemOffsetX;

    const stemX = cx + (stemSide * stemOffsetX);
    const stemStartY = cy + (stemSide * stemOffsetY);
    const stemEndY = cy + (stemDown ? 3 : -3) * lineDistance;

    if (type !== "whole") {
        ctx.beginPath();
        ctx.moveTo(stemX, stemStartY);
        ctx.lineTo(stemX, stemEndY);
        ctx.stroke();
    }

    // ---- Flags ----
    const flagControlX = stemX + (lineDistance * 1.366071);
    const flagEndX = stemX + (lineDistance * 0.919643);
    let flags = 0;
    if (type === "eighth") flags = 1;
    if (type === "sixteenth") flags = 2;

    for (let i = 0; i < flags; i++) {
        const flagSpacing = Math.max(lineDistance * 0.669643, ctx.lineWidth * 2);
        const offset = i * flagSpacing * flagDirection;

        ctx.beginPath();
        ctx.moveTo(stemX, stemEndY + offset);
        ctx.quadraticCurveTo(
            flagControlX,
            stemEndY + (lineDistance * 0.535714 * flagDirection) + offset,
            flagEndX,
            stemEndY + (lineDistance * 0.982143 * flagDirection) + offset
        );
        ctx.stroke();
    }

    // ---- Dots ----
    if (dots > 0) {
        ctx.beginPath();
        ctx.arc(cx + (rX * 2.15), cy - (rY * 0.15), rY * 0.45, 0, Math.PI * 2);
        ctx.fill();
    }

    if (dots > 1) {
        ctx.beginPath();
        ctx.arc(
            cx + (rX * 2.15) + (lineDistance * 0.837054),
            cy - (rY * 0.15),
            rY * 0.45,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    ctx.restore();
}

export function drawTimeSignature(context, x, y, lineDistance, topNumber, bottomNummer, color = "black") {
    const { ctx } = context;

    if (lineDistance <= 0) return;

    const referenceSize = 100;
    const digitHeight = lineDistance * 2.6;

    ctx.save();

    ctx.font = `${referenceSize}px Bravura`;

    const referenceMetrics = ctx.measureText("8");
    const referenceHeight =
        referenceMetrics.actualBoundingBoxAscent +
        referenceMetrics.actualBoundingBoxDescent;

    if (referenceHeight <= 0) {
        ctx.restore();
        return;
    }

    const fontSize = referenceSize * digitHeight / referenceHeight;

    ctx.font = `${fontSize}px Bravura`;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    const staffCenterY = y - (2 * lineDistance);

    function drawNumber(number, centerY) {
        const text = [...String(number)].map(
            digit => String.fromCharCode(0xE080 + Number(digit))
        ).join("");
        const metrics = ctx.measureText(text);

        const offsetX = (metrics.actualBoundingBoxLeft -
            metrics.actualBoundingBoxRight) * 0.5;

        const baselineY = centerY +
            (metrics.actualBoundingBoxAscent -
                metrics.actualBoundingBoxDescent) * 0.5;

        ctx.fillText(text, x + offsetX, baselineY);
    }

    drawNumber(topNumber, staffCenterY - lineDistance);
    drawNumber(bottomNummer, staffCenterY + lineDistance);

    ctx.restore();
}

export function drawTrebleClef(context, x, y, lineDistance, color = "black") {
    if (!globalVars.bravuraLoaded || lineDistance <= 0) return;

    const { ctx } = context;
    const symbol = "\uE050";
    const referenceSize = 100;
    const targetHeight = lineDistance * 7.2;

    ctx.save();

    ctx.font = `${referenceSize}px Bravura`;

    const metrics = ctx.measureText(symbol);
    const glyphHeight =
        metrics.actualBoundingBoxAscent +
        metrics.actualBoundingBoxDescent;

    if (glyphHeight <= 0) {
        ctx.restore();
        return;
    }

    const scale = targetHeight / glyphHeight;
    const fontSize = referenceSize * scale;

    ctx.font = `${fontSize}px Bravura`;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    const offsetX =
        (metrics.actualBoundingBoxLeft -
            metrics.actualBoundingBoxRight) * scale * 0.5;

    const baselineY =
        y - metrics.actualBoundingBoxDescent * scale;

    ctx.fillText(symbol, x + offsetX, baselineY);

    ctx.restore();
}

export function numberToNoteSymbol(n) {
    const v = n & 7;
    const value = ["whole", "half", "quarter", "eighth", "sixteenth", "", "", ""][v];
    let dots = 0;
    if ((n & 8) > 0) {
        dots = 1;
    }
    if ((n & 16) > 0) {
        dots = 2;
    }
    const rest = ((n & 32) > 0)
    return { value, dots, rest };
}

export function presetUserObject(userObject, preset) {
    switch (preset) {
        case "stretcherbond1":
            userObject.color1 = "#A64B35";
            userObject.color2 = "#C8BBA5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 1, 0]);
            userObject.shape = 6;
            break;
        case "stretcherbond2":
            userObject.color1 = "#46494B";
            userObject.color2 = "#9B9B95";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 1, 0]);
            userObject.shape = 6;
            break;
        case "flemishbond1":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 2, 0]);
            userObject.shape = 6;
            break;
        case "flemishbond2":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 3, 0]);
            userObject.shape = 6;
            break;
        case "englishbond":
            userObject.color1 = "#B66A45";
            userObject.color2 = "#D2C5AD";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 4, 0]);
            userObject.shape = 6;
            break;
        case "headerbond":
            userObject.color1 = "#93604B";
            userObject.color2 = "#B8AA96";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 5, 0]);
            userObject.shape = 6;
            break;
        case "longbricks1":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 6, 0]);
            userObject.shape = 6;
            break;
        case "longbricks2":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 7, 0]);
            userObject.shape = 6;
            break;
        case "monkbond1":
            userObject.color1 = "#E3DCCB";
            userObject.color2 = "#B8B3A8";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 8, 0]);
            userObject.shape = 6;
            break;
        case "monkbond2":
            userObject.color1 = "#E3DCCB";
            userObject.color2 = "#B8B3A8";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 9, 0]);
            userObject.shape = 6;
            break;
        default:
            break;
    }
}

export function userObjectDirections() {
    return ["left", "right", "up", "down"];
}

export const userObjectShapes = 7;
