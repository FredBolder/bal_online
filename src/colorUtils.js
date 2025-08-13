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

    switch (idx) {
        case 0:
            color = "white";
            break;
        case 1:
            color = "#AAAAAA";
            break;
        case 2:
            color = "#464646";
            break;
        case 3:
            color = "#303030";
            break;
        case 4:
            color = "black";
            break;
        case 5:
            color = "#87CEEB";
            break;
        case 6:
            color = "blue";
            break;
        case 7:
            color = "#00005A";
            break;
        case 8:
            color = "#00FF00";
            break;
        case 9:
            color = "#00AA00";
            break;
        case 10:
            color = "#007700";
            break;
        case 11:
            color = "#004400";
            break;
        case 12:
            color = "brown";
            break;
        case 13:
            color = "#5C4033";
            break;
        case 14:
            color = "yellow";
            break;
        case 15:
            color = "gold";
            break;
        case 16:
            color = "red";
            break;
        case 17:
            color = "#AA0000";
            break;
        case 18:
            color = "#FFA500";
            break;
        case 19:
            color = "#FFB6C1";
            break;
        case 20:
            color = "#FF69B4";
            break;
        case 21:
            color = "#FF00FF";
            break;
        case 22:
            color = "#AA336A";
            break;
        case 23:
            color = "#7F00FF";
            break;
        case 24:
            color = "#800080";
            break;
        case 25:
            color = "white";
            break;
        case 26:
            color = "white";
            break;
        case 27:
            color = "white";
            break;
        case 28:
            color = "white";
            break;
        case 29:
            color = "white";
            break;
        case 30:
            color = "white";
            break;
        case 31:
            color = "white";
            break;
        default:
            color = "white";
            break;
    }
    return color;
}