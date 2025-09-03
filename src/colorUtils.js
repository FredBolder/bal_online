import { findElementByCoordinates } from "./balUtils";

export function changeColor(colors, x, y, colorIndex) {
    let idx = -1;
    let color = indexToColor(colorIndex);

    idx = findElementByCoordinates(x, y, colors);
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

export function changeColors(colors, x, y, w, h, colorIndex) {
    let color = indexToColor(colorIndex);
    const newColors = [];

    for (let i = 0; i < colors.length; i++) {
        // Keep the colors that are outside or partly outside the area
        const colorObj = colors[i];
        if ((colorObj.x < x) || (colorObj.y < y) || ((colorObj.x + colorObj.w - 1) > (x + w - 1)) || ((colorObj.y + colorObj.h - 1) > (y + h - 1))) {
            newColors.push(colorObj);
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        colors.push(newColors[i]);
    }
    colors.push({ x, y, w, h, color });
}

export function deleteColorsAtColumn(colors, column) {
    let newColors = [];

    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.w !== 1) || (colorObj.x !== column)) {
            newColors.push({ ...colorObj });
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        const newColor = newColors[i];
        if ((newColor.x > 0) && (column < newColor.x)) {
            newColor.x--;
        } else if ((newColor.w > 1) && (column >= newColor.x) && (column <= (newColor.x + newColor.w - 1))) {
            newColor.w--;
        }
        colors.push(newColor);
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

export function deleteColorsAtRow(colors, row) {
    let newColors = [];

    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.h !== 1) || (colorObj.y !== row)) {
            newColors.push({ ...colorObj });
        }
    }
    colors.length = 0;
    for (let i = 0; i < newColors.length; i++) {
        const newColor = newColors[i];
        if ((newColor.y > 0) && (row < newColor.y)) {
            newColor.y--;
        } else if ((newColor.h > 1) && (row >= newColor.y) && (row <= (newColor.y + newColor.h - 1))) {
            newColor.h--;
        }
        colors.push(newColor);
    }
}

export function insertColorsAtColumn(colors, column) {
    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if (colorObj.x >= column) {
            colorObj.x++;
        } else if ((column > colorObj.x) && (column <= (colorObj.x + colorObj.w - 1))) {
            colorObj.w++;
        }
    }
}

export function insertColorsAtRow(colors, row) {
    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if (colorObj.y >= row) {
            colorObj.y++;
        } else if ((row > colorObj.y) && (row <= (colorObj.y + colorObj.h - 1))) {
            colorObj.h++;
        }
    }
}

export function deleteColors(colors, x, y, w, h) {
    const newColors = [];

    for (let i = 0; i < colors.length; i++) {
        // Keep the colors that are outside or partly outside the area
        const colorObj = colors[i];
        if ((colorObj.x < x) || (colorObj.y < y) || ((colorObj.x + colorObj.w - 1) > (x + w - 1)) || ((colorObj.y + colorObj.h - 1) > (y + h - 1))) {
            newColors.push(colorObj);
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

export function moveColor(colors, x1, y1, x2, y2) {
    for (let i = 0; i < colors.length; i++) {
        const colorObj = colors[i];
        if ((colorObj.x === x1) && (colorObj.y === y1)) {
            colorObj.x = x2;
            colorObj.y = y2;
        }
    }
}

