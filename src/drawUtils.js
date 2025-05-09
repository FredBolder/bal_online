export function drawBox(canvas, x, y, width, height, color) {
  canvas.strokeStyle = color;
  canvas.strokeRect(x, y, width, height);
}

export function drawFilledBox(canvas, x, y, width, height, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, width, height);
  canvas.strokeStyle = color;
  canvas.strokeRect(x, y, width, height);
}

export function drawFilledCircle(canvas, xc, yc, radius, color) {
  canvas.fillStyle = color;
  canvas.beginPath();
  canvas.arc(xc, yc, radius, 0, 2 * Math.PI, false);
  canvas.fill();
}

export function drawLine(canvas, x1, y1, x2, y2, color) {
  canvas.strokeStyle = color;
  canvas.beginPath();
  canvas.moveTo(x1, y1);
  canvas.lineTo(x2, y2);
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
      canvas.textAlign = "alphabetic";
      break;
    case "right":
      canvas.textAlign = "right";
      canvas.textAlign = "alphabetic";
      break;
    case "center":
      canvas.textAlign = "center";
      canvas.textAlign = "alphabetic";
      break;
    default:
      break;
  }

  canvas.fillText(text, x, y, maxWidth);
  canvas.strokeStyle = outline;
  canvas.lineWidth = outlineWidth;
  canvas.strokeText(text, x, y, maxWidth);
  canvas.lineWidth = 1;
}
