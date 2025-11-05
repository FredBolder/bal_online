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

