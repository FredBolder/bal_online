import { findElementByCoordinates } from "./balUtils";

export const maxStonePatterns = 5;

export function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
    img.crossOrigin = "anonymous"; // optional if remote
  });
}

export function buildPatternLayer(img, cols, rows, cellSize, scale = 1) {
  const mapW = cols * cellSize;
  const mapH = rows * cellSize;

  const tileW = Math.max(1, Math.round(img.width * scale));
  const tileH = Math.max(1, Math.round(img.height * scale));
  const tileCanvas = document.createElement('canvas');
  tileCanvas.width = tileW;
  tileCanvas.height = tileH;
  const tctx = tileCanvas.getContext('2d');
  tctx.drawImage(img, 0, 0, tileW, tileH);

  const layer = document.createElement('canvas');
  layer.width = mapW;
  layer.height = mapH;
  const lctx = layer.getContext('2d');

  const pattern = lctx.createPattern(tileCanvas, 'repeat');
  lctx.fillStyle = pattern;
  lctx.fillRect(0, 0, mapW, mapH);

  return layer;
}

export function changeIgnoreByArea(gameVars, x, y, w, h, ignore) {
  const keep = [];

  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    // Keep the ignores that are outside or partly outside the area
    const obj = gameVars.ignorePattern[i];
    if ((obj.x < x) || (obj.y < y) || ((obj.x + obj.w - 1) > (x + w - 1)) || ((obj.y + obj.h - 1) > (y + h - 1))) {
      keep.push(obj);
    }
  }
  gameVars.ignorePattern.length = 0;
  for (let i = 0; i < keep.length; i++) {
    gameVars.ignorePattern.push(keep[i]);
  }
  if (ignore) {
    gameVars.ignorePattern.push({ x, y, w, h });
  }
}

export function changeIgnoreByCell(gameVars, x, y, ignore) {
  const idx = findElementByCoordinates(x, y, gameVars.ignorePattern);
  if (ignore && (idx < 0)) {
    gameVars.ignorePattern.push({ x, y, w: 1, h: 1 });
  }
  if (!ignore && (idx >= 0)) {
    gameVars.ignorePattern.splice(idx, 1);
  }
  return idx;
}

export function deleteIgnoreAtColumn(gameVars, column) {
  let keep = [];

  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if ((obj.w !== 1) || (obj.x !== column)) {
      keep.push({ ...obj });
    }
  }
  gameVars.ignorePattern.length = 0;
  for (let i = 0; i < keep.length; i++) {
    const obj = keep[i];
    if ((obj.x > 0) && (column < obj.x)) {
      obj.x--;
    } else if ((obj.w > 1) && (column >= obj.x) && (column <= (obj.x + obj.w - 1))) {
      obj.w--;
    }
    gameVars.ignorePattern.push(obj);
  }
}

export function deleteIgnoreAtRow(gameVars, row) {
  let keep = [];

  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if ((obj.h !== 1) || (obj.y !== row)) {
      keep.push({ ...obj });
    }
  }
  gameVars.ignorePattern.length = 0;
  for (let i = 0; i < keep.length; i++) {
    const obj = keep[i];
    if ((obj.y > 0) && (row < obj.y)) {
      obj.y--;
    } else if ((obj.h > 1) && (row >= obj.y) && (row <= (obj.y + obj.h - 1))) {
      obj.h--;
    }
    gameVars.ignorePattern.push(obj);
  }
}

export function ignorePatternForCell(gameVars, x, y) {
  let result = false;
  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if ((x >= obj.x) && (y >= obj.y) &&
      (x <= obj.x + obj.w - 1) && (y <= obj.y + obj.h - 1)) {
      result = true;
    }
  }
  return result;
}

export function insertIgnoreAtColumn(gameVars, column) {
  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if (obj.x >= column) {
      obj.x++;
    } else if ((column > obj.x) && (column <= (obj.x + obj.w - 1))) {
      obj.w++;
    }
  }
}

export function insertIgnoreAtRow(gameVars, row) {
  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if (obj.y >= row) {
      obj.y++;
    } else if ((row > obj.y) && (row <= (obj.y + obj.h - 1))) {
      obj.h++;
    }
  }
}

export function moveIgnore(gameVars, x1, y1, x2, y2) {
  for (let i = 0; i < gameVars.ignorePattern.length; i++) {
    const obj = gameVars.ignorePattern[i];
    if ((obj.x === x1) && (obj.y === y1) && (obj.w === 1) && (obj.h === 1)) {
      obj.x = x2;
      obj.y = y2;
    }
  }
}

