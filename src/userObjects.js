import { findElementByCoordinates, getGameDataValue, hasWeightAbove, hasWeightBelow } from "./balUtils";
import { drawBricks } from "./bricks.js";
import { drawStone } from "./drawObjects";
import { hasForceLeft, hasForceRight } from "./force.js";
import { globalVars } from "./glob";
import { midPoint } from "./graphicUtils.js";
import { setArray } from "./utils";

export function checkUserObjects(backData, gameData, gameInfo, gameVars) {
  let gameOver = false;
  let update = false;

  for (let i = 0; i < gameInfo.userObjects.length; i++) {
    const userObject = gameInfo.userObjects[i];

    if (!userObject.delIfNearSameId) {
      continue;
    }

    const x = userObject.x;
    const y = userObject.y;

    const points = [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y],
      [x + 1, y]
    ];

    for (let j = 0; j < points.length; j++) {
      const [x, y] = points[j];
      const gd = getGameDataValue(gameData, x, y);

      if (gd !== 263) {
        continue;
      }
      const idx = findElementByCoordinates(x, y, gameInfo.userObjects);
      if (idx < 0) {
        continue;
      }
      const obj = gameInfo.userObjects[idx];
      if (userObject.id !== obj.id) {
        continue;
      }
      userObject.delete = true;
      update = true;
      break;
    }
  }

  if (update) {
    for (let i = 0; i < gameInfo.userObjects.length; i++) {
      const userObject = gameInfo.userObjects[i];
      if (userObject.delete) {
        gameData[userObject.y][userObject.x] = 0;
      }
    }

    gameInfo.userObjects.splice(0, gameInfo.userObjects.length,
      ...gameInfo.userObjects.filter(obj => !obj.delete)
    );
  }

  // Check game over
  for (let i = 0; i < gameInfo.userObjects.length; i++) {
    const userObject = gameInfo.userObjects[i];
    if (userObject.gameOverMode === "none") {
      continue;
    }
    for (let j = 0; j < userObject.activeSides.length; j++) {
      const side = userObject.activeSides[j];
      let x = -1;
      let y = -1;
      switch (side) {
        case "bottom":
          x = userObject.x;
          y = userObject.y + 1;
          break;
        case "left":
          x = userObject.x - 1;
          y = userObject.y;
          break;
        case "right":
          x = userObject.x + 1;
          y = userObject.y;
          break;
        case "top":
          x = userObject.x;
          y = userObject.y - 1;
          break;
        default:
          break;
      }
      const gd = getGameDataValue(gameData, x, y);
      if (gd !== 2) {
        continue;
      }
      switch (userObject.gameOverMode) {
        case "nearactiveside":
          return { gameOver: true, update: true };
        case "forceonactiveside": {
          let force = false;
          switch (side) {
            case "bottom":
              force = hasWeightBelow(backData, gameData, gameInfo, gameVars, userObject.x, userObject.x, userObject.y, false);
              break;
            case "left":
              force = hasForceRight(gameData, gameInfo, userObject.x, userObject.y);
              break;
            case "right":
              force = hasForceLeft(gameData, gameInfo, userObject.x, userObject.y);
              break;
            case "top":
              force = hasWeightAbove(backData, gameData, gameInfo, gameVars, userObject.x, userObject.x, userObject.y, false);
              break;
            default:
              break;
          }
          if (force) {
            return { gameOver: true, update: true };
          }
          break;
        }
        default:
          break;
      }
    }
  }

  return { gameOver, update };
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

function drawClef(context, x, y, lineDistance, color, clef) {
  let baselineOffset = 1;
  let symbol = "\uE050";

  switch (clef) {
    case 1:
      // F clef
      baselineOffset = -1;
      symbol = "\uE062";
      break;
    case 2:
      // Percussion clef
      baselineOffset = 0;
      symbol = "\uE069";
      break;
    default:
      // G clef
      baselineOffset = 1;
      symbol = "\uE050";
      break;
  }

  drawMusicGlyph(context, x, y, lineDistance, color, symbol, baselineOffset);
}

export function drawGhost(ctx, xmin, ymin, xmax, ymax, parameters) {
  if (!Array.isArray(parameters)) {
    return;
  }

  if (parameters.length !== 4) {
    return;
  }

  const p1 = parameters[0] * 0.01;
  const p2 = parameters[1] * 0.01;

  const w = xmax - xmin;
  const h = ymax - ymin;
  const size = Math.min(w, h);

  const xc = (xmin + xmax) * 0.5;
  const yc = (ymin + ymax) * 0.5;

  const ghostWidth = size * 0.5;
  const ghostHeight = size * 0.85;

  const topY = yc - size * 0.455;
  const middleY = topY + ghostHeight * 0.5;
  const bottomY = topY + ghostHeight;

  const rx = ghostWidth * 0.5;
  const leftX = xc - rx;
  const rightX = xc + rx;

  // Sides
  const sideRadius = ghostHeight * 2;
  const sideAngle = Math.asin((bottomY - middleY) / sideRadius);
  const offset = sideRadius * (1 - Math.cos(sideAngle));

  const bottomLeft = leftX + offset;
  const bottomRight = rightX - offset;

  ctx.beginPath();
  ctx.fillStyle = "white";

  // Top
  ctx.ellipse(xc, middleY, rx, ghostHeight * 0.5, 0, Math.PI, 0, false);

  // Right side
  ctx.arc(rightX - sideRadius, middleY, sideRadius, 0, sideAngle);

  // Bottom
  const segments = 3;
  const segmentWidth = (bottomRight - bottomLeft) / segments;

  for (let i = 0; i < segments; i++) {
    const x = bottomRight - segmentWidth * (i + 0.5);
    ctx.arc(x, bottomY, segmentWidth * 0.5, 0, Math.PI);
  }

  // Left side
  ctx.arc(leftX + sideRadius, middleY, sideRadius, Math.PI - sideAngle, Math.PI);

  ctx.closePath();
  ctx.fill();

  // Eyes
  ctx.beginPath();
  ctx.fillStyle = "black";

  const eyeAngle = p1 * Math.PI;
  const eyeY = topY + ghostHeight * 0.3;
  const eyeX = ghostWidth * 0.2;
  const eyeRX = ghostWidth * (0.07 + (0.05 * p2));
  const eyeRY = ghostHeight * 0.09;

  ctx.ellipse(xc - eyeX, eyeY, eyeRX, eyeRY, eyeAngle, 0, Math.PI * 2);
  ctx.ellipse(xc + eyeX, eyeY, eyeRX, eyeRY, Math.PI - eyeAngle, 0, Math.PI * 2);
  ctx.fill();

  // Mouth

  // Default (1)
  let mouthAngleStart = Math.PI;
  let mouthAngleEnd = 0;
  let mouthRX = ghostWidth * 0.1;
  let mouthRY = ghostHeight * 0.14;
  let mouthY = eyeY + (ghostHeight * 0.22);

  switch (parameters[2]) {
    case 2:
      mouthAngleStart = 0;
      mouthAngleEnd = 2 * Math.PI;
      mouthRX = ghostWidth * 0.08;
      mouthRY = ghostHeight * 0.1;
      mouthY = eyeY + (ghostHeight * 0.18);
      break;
    default:
      break;
  }
  if (parameters[2] > 0) {
    ctx.beginPath();
    ctx.ellipse(xc, mouthY, mouthRX, mouthRY, 0, mouthAngleStart, mouthAngleEnd, false);
    ctx.fill();
  }
}

export function drawMeander(ctx, xmin, ymin, xmax, ymax, pattern, flip, position) {
  let n = 10;

  switch (pattern) {
    case 2:
    case 4:
      n = 6;
      break;
    case 5:
    case 6:
    case 9:
      n = 20;
      break;
    case 7:
      n = 14;
      break;
    default:
      n = 10;
      break;
  }

  const dx = (xmax - xmin) / n;
  const dy = (ymax - ymin) / n;
  const lineWidth = Math.min(dx, dy);
  let flipH = false;
  let flipV = false;

  function x(n) {
    return flipH ? xmax - (n * dx) : xmin + (n * dx);
  }

  function y(n) {
    return flipV ? ymax - (n * dy) : ymin + (n * dy);
  }

  switch (flip) {
    case 1:
      flipH = true;
      flipV = false;
      break;
    case 2:
      flipH = false;
      flipV = true;
      break;
    case 3:
      flipH = true;
      flipV = true;
      break;
    default:
      flipH = false;
      flipV = false;
      break;
  }

  ctx.save();

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';

  ctx.beginPath();

  switch (pattern) {
    case 2:
      ctx.moveTo(x(0), y(5));
      ctx.lineTo(x(1), y(5));
      ctx.lineTo(x(1), y(1));
      ctx.lineTo(x(5), y(1));
      ctx.lineTo(x(5), y(3));
      ctx.lineTo(x(3), y(3));
      ctx.lineTo(x(3), y(5));
      ctx.lineTo(x(6), y(5));
      ctx.stroke();
      break;
    case 3:
      ctx.moveTo(x(0), y(1));
      ctx.lineTo(x(10), y(1));
      ctx.moveTo(x(0), y(9));
      ctx.lineTo(x(10), y(9));
      ctx.moveTo(x(0), y(7));
      ctx.lineTo(x(4), y(7));
      ctx.lineTo(x(4), y(5));
      ctx.lineTo(x(1), y(5));
      ctx.lineTo(x(1), y(3));
      ctx.lineTo(x(9), y(3));
      ctx.lineTo(x(9), y(5));
      ctx.lineTo(x(6), y(5));
      ctx.lineTo(x(6), y(7));
      ctx.lineTo(x(10), y(7));
      ctx.stroke();
      break;
    case 4:
      ctx.moveTo(x(0), y(5));
      ctx.lineTo(x(2), y(5));
      ctx.lineTo(x(2), y(3));
      ctx.lineTo(x(1), y(3));
      ctx.lineTo(x(1), y(1));
      ctx.lineTo(x(5), y(1));
      ctx.lineTo(x(5), y(3));
      ctx.lineTo(x(4), y(3));
      ctx.lineTo(x(4), y(5));
      ctx.lineTo(x(6), y(5));
      ctx.stroke();
      break;
    case 5: {
      const d2 = Math.min(10, position);
      for (let i = 0; i < 2; i++) {
        const d1 = i === 0 ? 0 : 10;
        ctx.moveTo(x(10 + d1), y(9 + d2));
        ctx.lineTo(x(3 + d1), y(9 + d2));
        ctx.lineTo(x(3 + d1), y(3 + d2));
        ctx.lineTo(x(7 + d1), y(3 + d2));
        ctx.lineTo(x(7 + d1), y(5 + d2));
        ctx.lineTo(x(5 + d1), y(5 + d2));
        ctx.lineTo(x(5 + d1), y(7 + d2));
        ctx.lineTo(x(9 + d1), y(7 + d2));
        ctx.lineTo(x(9 + d1), y(1 + d2));
        ctx.lineTo(x(1 + d1), y(1 + d2));
        ctx.lineTo(x(1 + d1), y(1 + d2));
        ctx.lineTo(x(1 + d1), y(9 + d2));
        ctx.lineTo(x(0 + d1), y(9 + d2));
      }
      ctx.stroke();
      break;
    }
    case 1:
    case 6: {
      const d2 = (pattern === 1) ? 0 : Math.min(10, position);
      const n = (pattern === 1) ? 1 : 2;

      ctx.moveTo(x(0), y(1 + d2));
      ctx.lineTo(x(10 * n), y(1 + d2));
      ctx.moveTo(x(0), y(9 + d2));
      ctx.lineTo(x(10 * n), y(9 + d2));

      for (let i = 0; i < n; i++) {
        const d1 = i === 0 ? 0 : 10;
        ctx.moveTo(x(0 + d1), y(7 + d2));
        ctx.lineTo(x(1 + d1), y(7 + d2));
        ctx.lineTo(x(1 + d1), y(3 + d2));
        ctx.lineTo(x(4 + d1), y(3 + d2));
        ctx.lineTo(x(4 + d1), y(5 + d2));
        ctx.lineTo(x(3 + d1), y(5 + d2));
        ctx.lineTo(x(3 + d1), y(7 + d2));
        ctx.lineTo(x(6 + d1), y(7 + d2));
        ctx.lineTo(x(6 + d1), y(3 + d2));
        ctx.lineTo(x(9 + d1), y(3 + d2));
        ctx.lineTo(x(9 + d1), y(5 + d2));
        ctx.lineTo(x(8 + d1), y(5 + d2));
        ctx.lineTo(x(8 + d1), y(7 + d2));
        ctx.lineTo(x(10 + d1), y(7 + d2));
      }
      ctx.stroke();
      break;
    }
    case 7:
      ctx.moveTo(x(2.5), y(3));
      ctx.lineTo(x(5), y(3));
      ctx.lineTo(x(5), y(5));
      ctx.lineTo(x(1), y(5));
      ctx.lineTo(x(1), y(1));
      ctx.lineTo(x(7), y(1));
      ctx.lineTo(x(7), y(13));
      ctx.lineTo(x(13), y(13));
      ctx.lineTo(x(13), y(9));
      ctx.lineTo(x(9), y(9));
      ctx.lineTo(x(9), y(11));
      ctx.lineTo(x(11.5), y(11));
      ctx.moveTo(x(3), y(11.5));
      ctx.lineTo(x(3), y(9));
      ctx.lineTo(x(5), y(9));
      ctx.lineTo(x(5), y(13));
      ctx.lineTo(x(1), y(13));
      ctx.lineTo(x(1), y(7));
      ctx.lineTo(x(13), y(7));
      ctx.lineTo(x(13), y(1));
      ctx.lineTo(x(9), y(1));
      ctx.lineTo(x(9), y(5));
      ctx.lineTo(x(11), y(5));
      ctx.lineTo(x(11), y(2.5));
      ctx.stroke();
      break;
    case 8:
    case 9: {
      const d2 = (pattern === 8) ? 0 : Math.min(10, position);
      for (let i = 0; i < (pattern - 7); i++) {
        const d1 = i === 0 ? 0 : 10;
        ctx.moveTo(x(0 + d1), y(1 + d2));
        ctx.lineTo(x(1 + d1), y(1 + d2));
        ctx.lineTo(x(1 + d1), y(7 + d2));
        ctx.lineTo(x(5 + d1), y(7 + d2));
        ctx.lineTo(x(5 + d1), y(3 + d2));
        ctx.lineTo(x(9 + d1), y(3 + d2));
        ctx.lineTo(x(9 + d1), y(9 + d2));
        ctx.lineTo(x(10 + d1), y(9 + d2));
        ctx.moveTo(x(0 + d1), y(9 + d2));
        ctx.lineTo(x(7 + d1), y(9 + d2));
        ctx.lineTo(x(7 + d1), y(5 + d2));
        ctx.lineTo(x(3 + d1), y(5 + d2));
        ctx.lineTo(x(3 + d1), y(1 + d2));
        ctx.lineTo(x(10 + d1), y(1 + d2));
      }
      ctx.stroke();
      break;
    }
    default:
      ctx.moveTo(x(10), y(9));
      ctx.lineTo(x(3), y(9));
      ctx.lineTo(x(3), y(3));
      ctx.lineTo(x(7), y(3));
      ctx.lineTo(x(7), y(5));
      ctx.lineTo(x(5), y(5));
      ctx.lineTo(x(5), y(7));
      ctx.lineTo(x(9), y(7));
      ctx.lineTo(x(9), y(1));
      ctx.lineTo(x(1), y(1));
      ctx.lineTo(x(1), y(1));
      ctx.lineTo(x(1), y(9));
      ctx.lineTo(x(0), y(9));
      ctx.stroke();
      break;
  }

  ctx.restore();
}

function drawMusicGlyph(context, x, y, lineDistance, color, symbol, baselineOffset = 0) {
  if (!globalVars.bravuraLoaded || lineDistance <= 0) return;

  const { ctx } = context;

  ctx.save();

  ctx.font = `${lineDistance * 4}px Bravura`;
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.fillText(symbol, x, y + baselineOffset * lineDistance);

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

  if (preset !== null) {
    color1 = preset.color1;
    color2 = preset.color2;
    direction = preset.direction;
    setArray(parameters, preset.parameters);
    shape = preset.shape;
  } else {
    idx = findElementByCoordinates(x, y, gameInfo.userObjects);
    if (idx >= 0) {
      const userObject = gameInfo.userObjects[idx];
      color1 = userObject.color1;
      color2 = userObject.color2;
      direction = userObject.direction;
      setArray(parameters, userObject.parameters);
      shape = userObject.shape;
    }
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

  if (shape === 6 || shape === 7 || shape === 8) {
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

  if (shape !== 6 && shape !== 7 && shape !== 8) {
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

  const objectContext = {
    get cx() { return cx; },
    get cy() { return cy; },
    get parameters() { return parameters; },
    get p1() { return p1; },
    get p2() { return p2; },
    get x1() { return x1; },
    get x2() { return x2; },
    get y1() { return y1; },
    get y2() { return y2; },
  };

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
    case 6:
      drawBricks(context, objectContext);
      ready = true;
      break;
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
        case 21:
        case 22:
          drawClef(context, x1 + (w1 * 0.1), cy, lineDist, "black", parameters[0] - 20);
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
    case 8:
      drawMeander(ctx, x1, y1, x2, y2, parameters[0], parameters[1], parameters[2]);
      ready = true;
      break;
    case 9: {
      const curveBend = 0.25 * p1 * (1 - (p2 * 0.5));
      const dx = 0.25 * w1 * p2;
      const pt1 = { x: x1 + dx, y: y2 };
      const pt2 = { x: cx, y: y1 };
      const pt3 = { x: x2 - dx, y: y2 };
      path.moveTo(pt1.x, pt1.y);
      const cp1 = midPoint(pt1, pt2);
      cp1.x += (pt1.y - pt2.y) * curveBend;
      cp1.y += (pt2.x - pt1.x) * curveBend;
      path.quadraticCurveTo(cp1.x, cp1.y, pt2.x, pt2.y);
      // Mirror cp1 around the vertical center line
      const cp2 = { x: (2 * pt2.x) - cp1.x, y: cp1.y };
      path.quadraticCurveTo(cp2.x, cp2.y, pt3.x, pt3.y);
      path.closePath();
      break;
    }
    case 10:
      drawGhost(ctx, x1, y1, x2, y2, parameters);
      ready = true;
      break;
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

export function gameOverModes() {
  return ["forceonactiveside", "nearactiveside", "none"];
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
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 1, 1]);
      userObject.shape = 6;
      break;
    case "stretcherbond2":
      userObject.color1 = "#46494B";
      userObject.color2 = "#9B9B95";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 1, 1]);
      userObject.shape = 6;
      break;
    case "stretcherbond3":
      userObject.color1 = "#A64B35";
      userObject.color2 = "#C8BBA5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 18, 1]);
      userObject.shape = 6;
      break;
    case "stretcherbond4":
      userObject.color1 = "#A64B35";
      userObject.color2 = "#C8BBA5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 19, 1]);
      userObject.shape = 6;
      break;
    case "flemishbond1":
      userObject.color1 = "#984B38";
      userObject.color2 = "#BDB3A1";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 2, 1]);
      userObject.shape = 6;
      break;
    case "flemishbond2":
      userObject.color1 = "#984B38";
      userObject.color2 = "#BDB3A1";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 3, 1]);
      userObject.shape = 6;
      break;
    case "englishbond":
      userObject.color1 = "#B66A45";
      userObject.color2 = "#D2C5AD";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 4, 1]);
      userObject.shape = 6;
      break;
    case "headerbond":
      userObject.color1 = "#93604B";
      userObject.color2 = "#B8AA96";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 5, 1]);
      userObject.shape = 6;
      break;
    case "longbricks1":
      userObject.color1 = "#674638";
      userObject.color2 = "#B5A38D";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 6, 1]);
      userObject.shape = 6;
      break;
    case "longbricks2":
      userObject.color1 = "#674638";
      userObject.color2 = "#B5A38D";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 7, 1]);
      userObject.shape = 6;
      break;
    case "monkbond1":
      userObject.color1 = "#E3DCCB";
      userObject.color2 = "#B8B3A8";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 8, 1]);
      userObject.shape = 6;
      break;
    case "monkbond2":
      userObject.color1 = "#E3DCCB";
      userObject.color2 = "#B8B3A8";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 9, 1]);
      userObject.shape = 6;
      break;
    case "blockbond1":
      userObject.color1 = "#C6A77A";
      userObject.color2 = "#D8CEB9";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 10, 1]);
      userObject.shape = 6;
      break;
    case "blockbond2":
      userObject.color1 = "#C6A77A";
      userObject.color2 = "#D8CEB9";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 11, 1]);
      userObject.shape = 6;
      break;
    case "stackbond":
      userObject.color1 = "#713B32";
      userObject.color2 = "#C5B9A5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 10, 1]);
      userObject.shape = 6;
      break;
    case "verticalstackbond":
      userObject.color1 = "#713B32";
      userObject.color2 = "#C5B9A5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 12, 1]);
      userObject.shape = 6;
      break;
    case "stretcherbondquarteroffset":
      userObject.color1 = "#A64B35";
      userObject.color2 = "#C8BBA5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 13, 1]);
      userObject.shape = 6;
      break;
    case "squaretile":
      userObject.color1 = "#858585";
      userObject.color2 = "#C0BDB5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 14, 1]);
      userObject.shape = 6;
      break;
    case "basketweave1":
      userObject.color1 = "#713B32";
      userObject.color2 = "#C5B9A5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 15, 1]);
      userObject.shape = 6;
      break;
    case "basketweave2":
      userObject.color1 = "#713B32";
      userObject.color2 = "#C5B9A5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 16, 1]);
      userObject.shape = 6;
      break;
    case "spanishbond":
      userObject.color1 = "#B65335";
      userObject.color2 = "#D7C5A5";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 17, 1]);
      userObject.shape = 6;
      break;
    case "naturalstones1":
      userObject.color1 = "#BBA58A";
      userObject.color2 = "#9B8B78";
      userObject.direction = "up";
      setArray(userObject.parameters, [30, 30, 1, 5]);
      userObject.shape = 6;
      break;
    case "meander1":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [0, 0, 0, 0]);
      userObject.shape = 8;
      break;
    case "meander2":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [5, 0, 5, 0]);
      userObject.shape = 8;
      break;
    case "meander3":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [8, 0, 0, 0]);
      userObject.shape = 8;
      break;
    case "meander4":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [9, 0, 5, 0]);
      userObject.shape = 8;
      break;
    case "meander5":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [1, 0, 0, 0]);
      userObject.shape = 8;
      break;
    case "meander6":
      userObject.color1 = "#173D65";
      userObject.color2 = "#F3E8D0";
      userObject.direction = "up";
      setArray(userObject.parameters, [6, 0, 5, 0]);
      userObject.shape = 8;
      break;
    case "spike1":
      setArray(userObject.activeSides, ["top"]);
      userObject.color1 = "#464646";
      userObject.color2 = "#000000";
      userObject.direction = "up";
      userObject.gameOverMode = "forceonactiveside";
      setArray(userObject.parameters, [70, 0, 0, 0]);
      userObject.shape = 9;
      break;
    default:
      break;
  }
}

export function userObjectDirections() {
  return ["left", "right", "up", "down"];
}

export const userObjectShapes = 10;
