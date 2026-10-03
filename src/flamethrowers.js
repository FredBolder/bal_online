import { removeObject } from "./addRemoveObject";
import { findElementByCoordinates, getGameDataValue } from "./balUtils";
import { isSpike, isStone } from "./objects";

function isCombustible(objectNumber) {
    if (isSpike(objectNumber) || isStone(objectNumber)) {
        return false;
    }
    return ![20, 22, 23, 82, 83, 98, 99, 113, 114, 198, 256].includes(objectNumber);
}

export function checkFlames(backData, gameData, gameInfo) {
    let result = { update: false, sound: "", gameOver: false };
    let backNumber = -1;
    let dx = 0;
    let dy = 0;
    let idx = -1;
    let objectNumber = -1;
    let x = -1;
    let y = -1;

    for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
        const flamethrower = gameInfo.flamethrowers[i];
        if (flamethrower.active) {
            switch (flamethrower.direction) {
                case "down":
                    dx = 0;
                    dy = 1;
                    break;
                case "left":
                    dx = -1;
                    dy = 0;
                    break;
                case "right":
                    dx = 1;
                    dy = 0;
                    break;
                case "up":
                    dx = 0;
                    dy = -1;
                    break;
                default:
                    break;
            }
            x = flamethrower.x;
            y = flamethrower.y;
            for (let j = 0; j < flamethrower.range; j++) {
                x = x + dx;
                y = y + dy;
                backNumber = getGameDataValue(backData, x, y);
                objectNumber = getGameDataValue(gameData, x, y);
                if (backNumber === 0 && objectNumber === 0) {
                    continue;
                }
                if (!isCombustible(objectNumber)) {
                    break;
                }
                if (objectNumber > 0) {
                    result.update = true;
                    if (objectNumber === 2) {
                        result.gameOver = true;
                        result.sound = "pain";
                    }
                    if (objectNumber === 3) {
                        result.gameOver = true;
                    }
                    if (objectNumber === 206) {
                        // Water with a layer of ice on top
                        idx = findElementByCoordinates(x, y, gameInfo.waterWithIceObjects);
                        if (idx >= 0) {
                            backNumber = gameInfo.waterWithIceObjects[idx].objectNumber;
                            backData[y][x] = backNumber;
                        }
                    }
                    removeObject(backData, gameData, gameInfo, x, y, false);
                }
                if (backNumber > 0 && isCombustible(backNumber)) {
                    result.update = true;
                    removeObject(backData, gameData, gameInfo, x, y, true);
                }
            }
        }
    }

    return result;
}

function drawFlame(ctx, xStart, yStart, xEnd, yEnd, flameWidth) {
    const dx = xEnd - xStart;
    const dy = yEnd - yStart;
    const length = Math.hypot(dx, dy);

    if (length === 0) {
        return;
    }

    const startWidth = flameWidth * 0.22;

    // Unit vector perpendicular to the flame direction
    const px = -dy / length;
    const py = dx / length;

    const random = amount => (Math.random() * 2 - 1) * amount;

    const positions = [0.0, 0.18, 0.38, 0.58, 0.76, 0.90, 1.0];

    // Half-widths of the outer flame
    const widths = [
        startWidth / 2,
        flameWidth * 0.32,
        flameWidth * 0.48,
        flameWidth * 0.50,
        flameWidth * 0.38,
        flameWidth * 0.20,
        0
    ];

    // Random variation, but keep the start and tip fixed
    const variation = positions.map((t, i) => {
        if (i === 0 || i === positions.length - 1) {
            return { t, offset: 0 };
        }

        return {
            t: t + random(0.025),
            offset: random(flameWidth * 0.08)
        };
    });

    function point(t, width, side, offset) {
        return {
            x: xStart + dx * t + px * (width * side + offset),
            y: yStart + dy * t + py * (width * side + offset)
        };
    }

    function drawFlameShape(left, right, color) {
        ctx.fillStyle = color;
        ctx.beginPath();

        // Start at one side of the opening
        ctx.moveTo(left[0].x, left[0].y);

        // Keep the beginning straight and open
        ctx.lineTo(left[1].x, left[1].y);

        // Curved left side
        for (let i = 2; i < left.length; i++) {
            const previous = left[i - 1];
            const current = left[i];

            ctx.quadraticCurveTo(
                previous.x,
                previous.y,
                (previous.x + current.x) / 2,
                (previous.y + current.y) / 2
            );
        }

        // Reach the tip
        ctx.lineTo(
            left[left.length - 1].x,
            left[left.length - 1].y
        );

        // Curved right side
        ctx.lineTo(right[right.length - 1].x, right[right.length - 1].y);

        for (let i = right.length - 2; i >= 1; i--) {
            const previous = right[i + 1];
            const current = right[i];

            ctx.quadraticCurveTo(
                previous.x,
                previous.y,
                (previous.x + current.x) / 2,
                (previous.y + current.y) / 2
            );
        }

        // Keep the beginning straight and open
        ctx.lineTo(right[0].x, right[0].y);

        // Close the opening
        ctx.lineTo(left[0].x, left[0].y);

        ctx.closePath();
        ctx.fill();
    }

    // Outer orange flame
    const left = [];
    const right = [];

    for (let i = 0; i < positions.length; i++) {
        const { t, offset } = variation[i];

        left.push(point(t, widths[i], 1, offset));
        right.push(point(t, widths[i], -1, offset));
    }

    drawFlameShape(left, right, "orange");

    // Inner yellow flame
    const innerLeft = [];
    const innerRight = [];

    for (let i = 0; i < positions.length; i++) {
        const { t, offset } = variation[i];

        const innerWidth =
            i === 0
                ? startWidth * 0.35
                : widths[i] * 0.55;

        const innerOffset =
            i === 0 || i === positions.length - 1
                ? 0
                : offset * 0.5 + random(flameWidth * 0.025);

        innerLeft.push(point(t, innerWidth, 1, innerOffset));
        innerRight.push(point(t, innerWidth, -1, innerOffset));
    }

    drawFlameShape(innerLeft, innerRight, "yellow");
}

export function drawFlames(ctx, leftMargin, topMargin, cellSize, gameData, gameInfo) {
    let dx = 0;
    let dy = 0;
    let lastCell = { x: -1, y: -1 };
    let objectNumber = -1;
    let x = -1;
    let y = -1;
    let x1 = -1;
    let y1 = -1;
    let x2 = -1;
    let y2 = -1;

    for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
        const flamethrower = gameInfo.flamethrowers[i];
        if (flamethrower.active) {
            switch (flamethrower.direction) {
                case "down":
                    dx = 0;
                    dy = 1;
                    break;
                case "left":
                    dx = -1;
                    dy = 0;
                    break;
                case "right":
                    dx = 1;
                    dy = 0;
                    break;
                case "up":
                    dx = 0;
                    dy = -1;
                    break;
                default:
                    break;
            }
            x = flamethrower.x;
            y = flamethrower.y;
            lastCell.x = x;
            lastCell.y = y;
            for (let j = 0; j < flamethrower.range; j++) {
                x = x + dx;
                y = y + dy;
                objectNumber = getGameDataValue(gameData, x, y);
                if (!isCombustible(objectNumber)) {
                    break;
                }
                lastCell.x = x;
                lastCell.y = y;
            }
            if (lastCell.x !== flamethrower.x || lastCell.y !== flamethrower.y) {
                switch (flamethrower.direction) {
                    case "down":
                        x1 = Math.round(leftMargin + ((flamethrower.x + 0.5) * cellSize));
                        y1 = (flamethrower.y + 1) * cellSize + topMargin;
                        x2 = Math.round(leftMargin + ((lastCell.x + 0.5) * cellSize));
                        y2 = (lastCell.y + 1) * cellSize + topMargin;
                        break;
                    case "left":
                        x1 = leftMargin + (flamethrower.x * cellSize);
                        y1 = Math.round((flamethrower.y + 0.5) * cellSize + topMargin);
                        x2 = leftMargin + (lastCell.x * cellSize);
                        y2 = Math.round((lastCell.y + 0.5) * cellSize + topMargin);
                        break;
                    case "right":
                        x1 = leftMargin + ((flamethrower.x + 1) * cellSize);
                        y1 = Math.round((flamethrower.y + 0.5) * cellSize + topMargin);
                        x2 = leftMargin + ((lastCell.x + 1) * cellSize);
                        y2 = Math.round((lastCell.y + 0.5) * cellSize + topMargin);
                        break;
                    case "up":
                        x1 = Math.round(leftMargin + ((flamethrower.x + 0.5) * cellSize));
                        y1 = flamethrower.y * cellSize + topMargin;
                        x2 = Math.round(leftMargin + ((lastCell.x + 0.5) * cellSize));
                        y2 = lastCell.y * cellSize + topMargin;
                        break;
                    default:
                        break;
                }
                drawFlame(ctx, x1, y1, x2, y2, cellSize);
            }
        }
    }
}

export function flamethrowerDirections() {
    return ["left", "right", "up", "down"];
}

export function flamethrowerDisplayModes() {
    return ["default", "stone", "grayball"];
}

export const flamethrowerMaxRange = 10;

export function setFlamethrowers(gameInfo, activeGroups) {
    let active = false;
    let result = { updated: false };

    for (let i = 0; i < gameInfo.flamethrowers.length; i++) {
        const flamethrower = gameInfo.flamethrowers[i];
        active = activeGroups.includes(flamethrower.group);
        if (flamethrower.active !== active) {
            flamethrower.active = active;
            result.updated = true;
        }
    }
    return result;
}
