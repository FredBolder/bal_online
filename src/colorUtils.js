import { findElementByCoordinate } from "./balUtils";

export function changeColor(colors, x, y, colorIndex) {
  let idx = -1;
  let color = indexToColor(colorIndex);

  idx = findElementByCoordinate(x, y, colors);
  if (idx >= 0) {
    const colorObj = colors[idx];
    if ((colorObj.w === 1) && (colorObj.h === 1)) {
      colorObj.color = color;
    }
  } else {
    colors.push({ x, y, w: 1, h: 1, color });
  }
  return idx;
}

export function deleteColorAtColumn(colors, column) {
    let newColors = [];

    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.w !== 1) || (colorObj.h !== 1) || (colorObj.x !== column)) {
            newColors.push({ ...colorObj });
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        colors.push(newColors[i]);

    }
}

export function deleteColorAtPosition(colors, x, y) {
    let newColors = [];

    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.w !== 1) || (colorObj.h !== 1) || (colorObj.x !== x) || (colorObj.y !== y)) {
            newColors.push({ ...colorObj });
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        colors.push(newColors[i]);

    }
}

export function deleteColorAtRow(colors, row) {
    let newColors = [];

    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.w !== 1) || (colorObj.h !== 1) || (colorObj.y !== row)) {
            newColors.push({ ...colorObj });
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        colors.push(newColors[i]);

    }
}

export function indexToColor(idx) {
    let color = "white";
    let colors = [
        // white, gray, black
        "#FFFFFF",
        "#AAAAAA",
        "#464646",
        "#303030",
        "#000000",
        // blue
        "#87CEFA",
        "#87CEEB",
        "#00BFFF",
        "#0000FF",
        "#0000CD",
        "#00005A",
        // green
        "#00FF7F",
        "#00FF00",
        "#228B22",
        "#008000",
        "#006400",
        // brown
        "#D2691E",
        "#8B4513",
        "#A52A2A",
        // yellow, gold
        "#FFFF00",
        "#FFD700",
        // red
        "#FF0000",
        "#8B0000",
        // orange
        "#FFA500",
        // pink
        "#FFB6C1",
        "#FF69B4",
        "#FF00FF",
        "#AA336A",
        // purple
        "#7F00FF",
        "#800080",
    ];
    if ((idx >= 0) && (idx < colors.length)) {
        color = colors[idx];
    }
    return color;
}