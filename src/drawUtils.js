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
  canvas,
  x,
  y,
  text,
  align,
  color,
  height,
  maxWidth,
  outline,
  outlineWidth
) {
  canvas.font = `${height}px sans-serif`;
  canvas.fillStyle = color;
  switch (align) {
    case "middle":
      canvas.textAlign = "center";
      canvas.textBaseline = "middle";
      break;
    case "left":
      canvas.textAlign = "left";
      canvas.textBaseline = "alphabetic";
      break;
    case "right":
      canvas.textAlign = "right";
      canvas.textBaseline = "alphabetic";
      break;
    case "center":
      canvas.textAlign = "center";
      canvas.textBaseline = "alphabetic";
      break;
    default:
      break;
  }

  canvas.fillText(text, Math.round(x), Math.round(y), Math.round(maxWidth));
  canvas.strokeStyle = outline;
  canvas.lineWidth = outlineWidth;
  canvas.strokeText(text, Math.round(x), Math.round(y), Math.round(maxWidth));
  canvas.lineWidth = 1;
}
