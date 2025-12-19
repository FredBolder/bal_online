export function drawBox(ctx, x, y, width, height, color) {
  ctx.strokeStyle = color;
  ctx.strokeRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

export function drawCircle(ctx, xc, yc, radius, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(Math.round(xc), Math.round(yc), Math.round(radius), 0, 2 * Math.PI, false);
  ctx.stroke();
}

export function drawFilledBox(ctx, x, y, width, height, colorOrPattern, shadow = false) {
  const rx = Math.round(x);
  const ry = Math.round(y);
  const rw = Math.round(width);
  const rh = Math.round(height);
  const inset = 0; // was 0.5
  const drawX = rx - inset;
  const drawY = ry - inset;
  const drawW = rw + inset * 2;
  const drawH = rh + inset * 2;

  ctx.fillStyle = colorOrPattern;
  ctx.fillRect(drawX, drawY, drawW, drawH);

  if (!shadow) return;

  const edge = Math.max(1, Math.round(Math.min(drawW, drawH) * 0.06));
  const dark = "rgba(0,0,0,0.35)";
  const light = "rgba(255,255,255,0.25)";
  ctx.fillStyle = light;
  ctx.fillRect(drawX, drawY, drawW, edge); // top
  ctx.fillRect(drawX, drawY, edge, drawH); // left
  ctx.fillStyle = dark;
  ctx.fillRect(drawX, drawY + drawH - edge, drawW, edge); // bottom
  ctx.fillRect(drawX + drawW - edge, drawY, edge, drawH); // right
}

export function drawFilledCircle(ctx, xc, yc, radius, colorOrPattern, shadow = false) {
  const rxc = Math.round(xc);
  const ryc = Math.round(yc);
  const rradius = Math.max(1, Math.round(radius) - 0.5);

  ctx.fillStyle = colorOrPattern;
  ctx.beginPath();
  ctx.arc(rxc, ryc, rradius, 0, 2 * Math.PI);
  ctx.fill();

  if (!shadow) return;

  const edge = Math.max(1, Math.round(rradius * 0.2)); // was 0.06
  const dark = "rgba(0,0,0,0.2)"; // was 0.35
  const light = "rgba(255,255,255,0.1)"; // was 0.25

  // Lighter top-left arc
  ctx.beginPath();
  ctx.arc(rxc, ryc, rradius - edge / 2, Math.PI * 0.75, Math.PI * 1.75);
  ctx.lineWidth = edge;
  ctx.strokeStyle = light;
  ctx.stroke();

  // Darker bottom-right arc
  ctx.beginPath();
  ctx.arc(rxc, ryc, rradius - edge / 2, Math.PI * 1.75, Math.PI * 0.75);
  ctx.lineWidth = edge;
  ctx.strokeStyle = dark;
  ctx.stroke();

  ctx.lineWidth = 1;
}

export function drawLine(ctx, x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(Math.round(x1), Math.round(y1));
  ctx.lineTo(Math.round(x2), Math.round(y2));
  ctx.stroke();
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
  angle = 0
) {
  ctx.save();

  ctx.font = `${height}px sans-serif`;
  ctx.fillStyle = color;

  const m = ctx.measureText(text);
  const ascent = m.actualBoundingBoxAscent || 0;
  const descent = m.actualBoundingBoxDescent || 0;
  const rawWidth = m.width;

  // vertical true center
  const vOffset = (ascent - descent) / 2;

  // scale compensation for maxWidth
  let scaledWidth = rawWidth;
  if (maxWidth && rawWidth > maxWidth) {
    const scale = maxWidth / rawWidth;
    scaledWidth = rawWidth * scale; // the width after the browser applies scaling
  }

  // horizontal alignment
  let hOffset = 0;
  switch (align) {
    case "right":
      hOffset = -scaledWidth;
      break;
    case "center":
    case "middle":
      hOffset = -scaledWidth / 2;
      break;
    case "left":
    default:
      hOffset = 0;
  }

  ctx.translate(Math.round(x), Math.round(y));
  if (angle !== 0) ctx.rotate(angle);

  const drawX = Math.round(hOffset);
  const drawY = Math.round(vOffset);

  ctx.fillText(text, drawX, drawY, Math.round(maxWidth));

  if (outline) {
    ctx.strokeStyle = outline;
    ctx.lineWidth = outlineWidth || 1;
    ctx.strokeText(text, drawX, drawY, Math.round(maxWidth));
    ctx.lineWidth = 1;
  }

  ctx.restore();
}
