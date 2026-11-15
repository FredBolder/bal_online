import { findElementByCoordinates } from "./balUtils";
import { drawStone } from "./drawObjects";
import { globalVars } from "./glob";
import { setArray } from "./utils";

export const BRICK_SHADOW_ALL       = 15;
export const BRICK_SHADOW_BOTTOM    = 8;
export const BRICK_SHADOW_LEFT      = 1;
export const BRICK_SHADOW_NOT_LEFT  = 14;
export const BRICK_SHADOW_RIGHT     = 2;
export const BRICK_SHADOW_NOT_RIGHT = 13;
export const BRICK_SHADOW_TOP       = 4;

export function drawBrick(ctx, x, y, w, h, shadowSize, shadowLines, style) {
    const s = Math.max(0, Math.min(shadowSize, w * 0.5, h * 0.5));
    const half = s * 0.5;
    let opacity1 = 0.1;
    let opacity2 = 0.08;

    // Main brick
    ctx.fillRect(x, y, w, h);

    if (style === 0) {
        return;
    }

    if (s <= 0 || shadowLines === 0) return;

    const left   = shadowLines & BRICK_SHADOW_LEFT;
    const right  = shadowLines & BRICK_SHADOW_RIGHT;
    const top    = shadowLines & BRICK_SHADOW_TOP;
    const bottom = shadowLines & BRICK_SHADOW_BOTTOM;

    ctx.lineWidth = s;
    ctx.lineCap = 'butt';

    if (style === 2) {
        opacity1 = 0.18;
        opacity2 = 0.28;
    }

    // Top and left highlights
    if (top || left) {
        ctx.beginPath();

        if (top) {
            ctx.moveTo(x, y + half);
            ctx.lineTo(x + w, y + half);
        }

        if (left) {
            ctx.moveTo(x + half, y);
            ctx.lineTo(x + half, y + h);
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity1})`;
        ctx.stroke();
    }

    // Bottom and right shadows
    if (bottom || right) {
        ctx.beginPath();

        if (bottom) {
            ctx.moveTo(x, y + h - half);
            ctx.lineTo(x + w, y + h - half);
        }

        if (right) {
            ctx.moveTo(x + w - half, y);
            ctx.lineTo(x + w - half, y + h);
        }

        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity2})`;
        ctx.stroke();
    }

    ctx.lineWidth = 1;
}

function drawNoteOnScore(context, x, y, lineDistance, type, dots, color) {
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

function drawTimeSignature(context, x, y, lineDistance, topNumber, bottomNummer, color = "black") {
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

function drawTrebleClef(context, x, y, lineDistance, color = "black") {
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

export function drawUserObject(context, x, y, preset = null) {
  const { ctx, gameInfo, w1, w2, xmin, xmax, ymin, ymax } = context;
  let background = false;
  let color1 = "stone";
  let color2 = "stone";
  let direction = 0;
  let idx = -1;
  let path = null;
  let parameters = [50, 50, 50, 50];
  let ready = false;
  let rotation = 0;
  let shape = 1;
  let stone = false;

  const x1 = Math.round(xmin - 0.5);
  const y1 = Math.round(ymin - 0.5);
  const x2 = Math.round(xmax + 0.5);
  const y2 = Math.round(ymax + 0.5);

  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;

  idx = findElementByCoordinates(x, y, gameInfo.userObjects);
  if (idx >= 0) {
    const userObject = gameInfo.userObjects[idx];
    color1 = userObject.color1;
    color2 = userObject.color2;
    direction = userObject.direction;
    setArray(parameters, userObject.parameters);
    shape = userObject.shape;
  }
  if (preset !== null) {
    color1 = preset.color1;
    color2 = preset.color2;
    direction = preset.direction;
    setArray(parameters, preset.parameters);
    shape = preset.shape;
  }

  if (color1.toLowerCase() === "stone") {
    stone = true;
  }

  if (color2.toLowerCase() === "stone") {
    color2 = "#464646";
  }

  if (shape === 7) {
    stone = false;
    color1 = "black";
    color2 = "white";
  }

  if (parameters.length !== 4) {
    setArray(parameters, [50, 50, 50, 50]);
  }
  const p1 = parameters[0] * 0.01;
  const p2 = parameters[1] * 0.01;
  const p3 = parameters[2] * 0.01;
  const p4 = parameters[3] * 0.01;

  switch (direction) {
    case "down":
      rotation = 2;
      break;
    case "left":
      rotation = 3;
      break;
    case "right":
      rotation = 1;
      break;
    case "up":
      rotation = 0;
      break;
    default:
      rotation = 0;
      break;
  }

  if (shape === 6 || shape === 7) {
    background = true;
  }

  if (background) {
    ctx.fillStyle = color2;
    ctx.fillRect(x1, y1, w1, w2);
  }

  ctx.save();

  ctx.translate(cx, cy);
  ctx.rotate(rotation * Math.PI / 2);
  ctx.translate(-cx, -cy);

  if (shape !== 6 && shape !== 7) {
    path = new Path2D();
  }

  ctx.lineWidth = 1;
  if (stone) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
  } else {
    ctx.fillStyle = color1;
    ctx.strokeStyle = color1;
  }

  switch (shape) {
    case 2:
      path.moveTo(x1 + (w1 * 0.5 * p1), y1 + (w2 * 0.25 * p3));
      path.lineTo(cx + (w1 * 0.5 * p1), y1 + (w2 * 0.25 * p3));
      path.lineTo(cx + (w1 * 0.5 * p2), y2 - (w2 * 0.25 * p4));
      path.lineTo(x1 + (w1 * 0.5 * p2), y2 - (w2 * 0.25 * p4));
      path.closePath();
      break;
    case 3:
      path.moveTo(x1 + (w1 * 0.5 * p1), y1 + (w2 * 0.25 * p3));
      path.lineTo(x2 - (w1 * 0.5 * p1), y1 + (w2 * 0.25 * p3));
      path.lineTo(x2, cy);
      path.lineTo(x2 - (w1 * 0.5 * p2), y2 - (w2 * 0.25 * p4));
      path.lineTo(x1 + (w1 * 0.5 * p2), y2 - (w2 * 0.25 * p4));
      path.lineTo(x1, cy);
      path.closePath();
      break;
    case 4: {
      const radius = Math.min(w1 * 0.5, w2 / Math.sqrt(3));
      const halfWidth = radius * Math.max(0.1, Math.min(1, p1));
      const halfHeight = radius * Math.sqrt(3) * 0.5 * Math.max(0.1, Math.min(1, p2));
      const freeSpaceX = w1 - halfWidth * 2;
      const freeSpaceY = w2 - halfHeight * 2;
      const polygonCx = x1 + halfWidth + freeSpaceX * Math.max(0, Math.min(1, p3));
      const polygonCy = y1 + halfHeight + freeSpaceY * (1 - Math.max(0, Math.min(1, p4)));
      path.moveTo(polygonCx - halfWidth * 0.5, polygonCy - halfHeight);
      path.lineTo(polygonCx + halfWidth * 0.5, polygonCy - halfHeight);
      path.lineTo(polygonCx + halfWidth, polygonCy);
      path.lineTo(polygonCx + halfWidth * 0.5, polygonCy + halfHeight);
      path.lineTo(polygonCx - halfWidth * 0.5, polygonCy + halfHeight);
      path.lineTo(polygonCx - halfWidth, polygonCy);
      break;
    }
    case 5:
      path.moveTo(x1 + (w1 * p1), y1);
      path.lineTo(x2, y1 + (w2 * p2));
      path.lineTo(x2 - (w1 * p3), y2);
      path.lineTo(x1, y2 - (w1 * p4));
      path.closePath();
      break;
    case 6: {
      const brickStyle = parameters[3];
      const freeSpaceX = w1 * 0.2 * p1;
      const freeSpaceY = w2 * 0.2 * p2;
      const halfFreeSpaceX = freeSpaceX * 0.5;
      const halfFreeSpaceY = freeSpaceY * 0.5;
      const pattern = parameters[2];
      const shadowSize = w1 * 0.05;  
      const stoneHeight = (w2 * 0.5) - freeSpaceY;
      let stoneWidth = w1 - freeSpaceX;

      switch (pattern) {
        case 2:
        case 3:
          stoneWidth = w1 * (1.33 - (0.33 * p1));
          break;
        default:
          stoneWidth = w1 - freeSpaceX;
          break;
      }

      const halfStoneWidth = stoneWidth * 0.5;

      switch (pattern) {
        case 2: {
          // Flemish bond - part 1
          const d1 = (stoneWidth - w1) / 2;
          drawBrick(ctx, cx - (halfStoneWidth * 0.5), y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x2 - d1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1, cy, w1, stoneHeight, shadowSize, BRICK_SHADOW_TOP + BRICK_SHADOW_BOTTOM, brickStyle);
          break;
        }
        case 3: {
          // Flemish bond - part 2
          const d1 = (stoneWidth - w1) / 2;
          drawBrick(ctx, x1, y1, w1, stoneHeight, shadowSize, BRICK_SHADOW_TOP + BRICK_SHADOW_BOTTOM, brickStyle);
          drawBrick(ctx, cx - (halfStoneWidth * 0.5), cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1, cy, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x2 - d1, cy, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          break;
        }
        case 4: {
          // English bond
          const headerWidth = (stoneWidth - freeSpaceX) * 0.5;
          drawBrick(ctx, cx - (headerWidth * 0.5), y1, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1, y1, headerWidth * 0.5, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x2 - headerWidth * 0.5, y1, headerWidth * 0.5, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
        }
        case 5: {
          // Header bond
          const headerWidth = (stoneWidth - freeSpaceX) * 0.5;
          const d1 = (w1 * 0.5) - ((headerWidth * 0.5) + freeSpaceX);
          drawBrick(ctx, cx - (headerWidth * 0.5), y1, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x2 - d1, y1, d1, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, cx + halfFreeSpaceX, cy, headerWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
        }
        case 6:
          // Long bricks - part 1
          drawBrick(ctx, x1, y1, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          break;
        case 7:
          // Long bricks - part 2
          drawBrick(ctx, x1 + halfFreeSpaceX, y1, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1, cy, w1 - halfFreeSpaceX, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          break;
        case 8: {
          // Monk bond - part 1
          const d1 = w1 - (1.5 * freeSpaceX);
          const d2 = (4 / 5) * d1;
          const d3 = (1 / 5) * d1;
          drawBrick(ctx, x1 + halfFreeSpaceX, y1, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x2 - d3, y1, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1, cy, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x1 + d3 + freeSpaceX, cy, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
        }
        case 9: {
          // Monk bond - part 2
          const d1 = w1 - (1.5 * freeSpaceX);
          const d2 = (4 / 5) * d1;
          const d3 = (1 / 5) * d1;
          drawBrick(ctx, x1, y1, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, x1 + d3 + freeSpaceX, y1, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, d2, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x2 - d3, cy, d3, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          break;
        }
        case 10:
          // Stack bond / Block bond 1
          drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
        case 11:
          // Stack bond / Block bond 2
          drawBrick(ctx, x1, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, cx + halfFreeSpaceX, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1, cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, cx + halfFreeSpaceX, cy, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          break;
        case 12:
          // Vertical stack bond
          drawBrick(ctx, x1 + halfFreeSpaceX, y1, stoneHeight, stoneWidth, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          drawBrick(ctx, cx + halfFreeSpaceX, y1, stoneHeight, stoneWidth, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
        case 13:
            // Stretcher bond with a 1/4 brick offset
            drawBrick(ctx, x1, y1, stoneWidth * 0.75, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
            drawBrick(ctx, x2 - (stoneWidth * 0.25), y1, stoneWidth * 0.25, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
            drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;  
        case 14:
            // Square tile
            drawBrick(ctx, x1 + halfFreeSpaceX, y1 + halfFreeSpaceY, stoneWidth, stoneWidth, shadowSize, BRICK_SHADOW_ALL, brickStyle);
            break;  
        default:
          // 1: Stretcher bond
          drawBrick(ctx, x1, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_LEFT, brickStyle);
          drawBrick(ctx, cx + halfFreeSpaceX, y1, halfStoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_NOT_RIGHT, brickStyle);
          drawBrick(ctx, x1 + halfFreeSpaceX, cy, stoneWidth, stoneHeight, shadowSize, BRICK_SHADOW_ALL, brickStyle);
          break;
      }

      ready = true;
      break;
    }
    case 7: {
      const lineDist = w2 / 10;
      let bottomNumber = 0;
      let noteX = cx;
      let noteY = cy;
      let topNumber = 0;

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(x1, cy + (i * lineDist));
        ctx.lineTo(x2, cy + (i * lineDist));
        ctx.stroke();
      }

      // parameters[0] = 8; // 9 = B
      // parameters[1] = 3 + 8 + 16;
      // parameters[2] = 8; // 9 = B
      // parameters[3] = 4 + 8 + 16;
      const position1 = -Math.max(-8, Math.min(8, parameters[0] - 9));
      const noteInfo1 = numberToNoteSymbol(parameters[1]);
      const position2 = -Math.max(-8, Math.min(8, parameters[2] - 9));
      const noteInfo2 = numberToNoteSymbol(parameters[3]);

      switch (parameters[0]) {
        case 20:
          drawTrebleClef(context, cx - (w1 * 0.25), cy + (w1 * 0.37), lineDist, "black");
          topNumber = parameters[1] & 31;
          bottomNumber = 4;
          if ((parameters[1] & 32) > 0) {
            bottomNumber = 8;
          }
          if (topNumber > 0 && bottomNumber > 0) {
            drawTimeSignature(context, cx + (w1 * 0.2), cy + (2 * lineDist), lineDist, topNumber, bottomNumber, "black")
          }
          break;
        default:
          if (parameters[0] > 0 && noteInfo1.value !== "") {
            noteX = cx - (w1 * 0.3);
            noteY = cy + (position1 * lineDist * 0.5);
            drawNoteOnScore(context, noteX, noteY, lineDist, noteInfo1.value, noteInfo1.dots, "black");
          }
          if (parameters[2] > 0 && noteInfo2.value !== "") {
            noteX = cx + (w1 * 0.1);
            noteY = cy + (position2 * lineDist * 0.5);
            drawNoteOnScore(context, noteX, noteY, lineDist, noteInfo2.value, noteInfo2.dots, "black");
          }
          break;
      }

      ready = true;
      break;
    }
    default:
      // 1
      path.moveTo(x1, cy);
      path.arcTo(x1, y1, cx, y1, w1 * 0.5 * p1);
      path.arcTo(x2, y1, x2, cy, w1 * 0.5 * p2);
      path.arcTo(x2, y2, cx, y2, w1 * 0.5 * p3);
      path.arcTo(x1, y2, x1, cy, w1 * 0.5 * p4);
      path.closePath();
      break;
  }

  if (!ready && (path !== null)) {
    if (stone) {
      ctx.clip(path);
    } else {
      ctx.fill(path);
      ctx.stroke(path);
    }
  }

  ctx.translate(cx, cy);
  ctx.rotate(-rotation * Math.PI / 2);
  ctx.translate(-cx, -cy);

  if (stone && !ready) {
    drawStone(context, x, y);
  }

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
            setArray(userObject.parameters, [30, 30, 1, 1]);
            userObject.shape = 6;
            break;
        case "stretcherbond2":
            userObject.color1 = "#46494B";
            userObject.color2 = "#9B9B95";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 1, 1]);
            userObject.shape = 6;
            break;
        case "flemishbond1":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 2, 1]);
            userObject.shape = 6;
            break;
        case "flemishbond2":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 3, 1]);
            userObject.shape = 6;
            break;
        case "englishbond":
            userObject.color1 = "#B66A45";
            userObject.color2 = "#D2C5AD";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 4, 1]);
            userObject.shape = 6;
            break;
        case "headerbond":
            userObject.color1 = "#93604B";
            userObject.color2 = "#B8AA96";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 5, 1]);
            userObject.shape = 6;
            break;
        case "longbricks1":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 6, 1]);
            userObject.shape = 6;
            break;
        case "longbricks2":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 7, 1]);
            userObject.shape = 6;
            break;
        case "monkbond1":
            userObject.color1 = "#E3DCCB";
            userObject.color2 = "#B8B3A8";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 8, 1]);
            userObject.shape = 6;
            break;
        case "monkbond2":
            userObject.color1 = "#E3DCCB";
            userObject.color2 = "#B8B3A8";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 9, 1]);
            userObject.shape = 6;
            break;
        case "blockbond1":
            userObject.color1 = "#C6A77A";
            userObject.color2 = "#D8CEB9";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 10, 1]);
            userObject.shape = 6;
            break;
        case "blockbond2":
            userObject.color1 = "#C6A77A";
            userObject.color2 = "#D8CEB9";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 11, 1]);
            userObject.shape = 6;
            break;
        case "stackbond":
            userObject.color1 = "#713B32";
            userObject.color2 = "#C5B9A5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 10, 1]);
            userObject.shape = 6;
            break;
        case "verticalstackbond":
            userObject.color1 = "#713B32";
            userObject.color2 = "#C5B9A5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 12, 1]);
            userObject.shape = 6;
            break;
        case "stretcherbondquarteroffset":
            userObject.color1 = "#A64B35";
            userObject.color2 = "#C8BBA5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 13, 1]);
            userObject.shape = 6;
            break;
        case "squaretile":
            userObject.color1 = "#858585";
            userObject.color2 = "#C0BDB5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 14, 1]);
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
