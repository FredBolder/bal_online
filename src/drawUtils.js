export function drawBox(canvas, x, y, width, height, color) {
  canvas.strokeStyle = color;
  canvas.strokeRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

export function drawCircle(canvas, xc, yc, radius, color) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.arc(Math.round(xc), Math.round(yc), Math.round(radius), 0, 2 * Math.PI, false);
  canvas.stroke();
}

export function drawFilledBox(canvas, x, y, width, height, color) {
  canvas.fillStyle = color;
  canvas.fillRect(Math.round(x - 0.5), Math.round(y), Math.round(width), Math.round(height));
}

export function drawFilledCircle(canvas, xc, yc, radius, color) {
  canvas.fillStyle = color;
  canvas.beginPath();
  canvas.arc(Math.round(xc), Math.round(yc), Math.round(radius - 0.5), 0, 2 * Math.PI, false);
  canvas.fill();
}

export function drawLine(canvas, x1, y1, x2, y2, color) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.moveTo(Math.round(x1), Math.round(y1));
  canvas.lineTo(Math.round(x2), Math.round(y2));
  canvas.stroke();
}

export function drawText(
  ctx,
  x,
  y,
  text,
  align,
  color,
  height,
  maxWidth,
  outline,
  outlineWidth,
  angle = 0 // radians
) {
  ctx.save();

  ctx.font = `${height}px sans-serif`;
  ctx.fillStyle = color;

  // set alignment/baseline
  switch (align) {
    case "middle":
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      break;
    case "left":
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      break;
    case "right":
      ctx.textAlign = "right";
      ctx.textBaseline = "alphabetic";
      break;
    case "center":
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      break;
    default:
      break;
  }

  // move the origin to (x,y) then rotate; draw at 0,0
  ctx.translate(Math.round(x), Math.round(y));
  if (angle !== 0) ctx.rotate(angle);

  ctx.fillText(text, 0, 0, Math.round(maxWidth));

  if (outline) {
    ctx.strokeStyle = outline;
    ctx.lineWidth = outlineWidth || 1;
    ctx.strokeText(text, 0, 0, Math.round(maxWidth));
    ctx.lineWidth = 1;
  }

  ctx.restore();
}
