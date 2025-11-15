export function hasBottomGlideLeftToRight(n) {
    return isTriangleTopLeft(n) || [143, 176, 219].includes(n);
}

export function hasBottomGlideRightToLeft(n) {
    return isTriangleTopRight(n) || [144, 177, 225].includes(n);
}

export function hasLeftGlideBottomToTop(n) {
    return isTriangleBottomRight(n) || [142, 174, 222].includes(n);
}

export function hasLeftGlideTopToBottom(n) {
    return isTriangleTopRight(n) || [144, 175, 220].includes(n);
}

export function hasRightGlideBottomToTop(n) {
    return isTriangleBottomLeft(n) || [141, 174, 218].includes(n);
}

export function hasRightGlideTopToBottom(n) {
    return isTriangleTopLeft(n) || [143, 175, 224].includes(n);
}

export function hasTopGlideLeftToRight(n) {
    return isTriangleBottomLeft(n) || [141, 176, 223].includes(n);
}

export function hasTopGlideRightToLeft(n) {
    return isTriangleBottomRight(n) || [142, 177, 221].includes(n);
}

export function isTriangleBottomLeft(n) {
    return [15, 210, 215].includes(n);
}

export function isTriangleBottomRight(n) {
    return [16, 214, 213].includes(n);
}

export function isTriangleTopLeft(n) {
    return [17, 216, 211].includes(n);
}

export function isTriangleTopRight(n) {
    return [18, 212, 217].includes(n);
}
