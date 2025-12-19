import { findElementByCoordinates } from "./balUtils.js";

function complete(expr) {
    return !/[+\-*/]\s*$/.test(expr);
}

function calc(expr) {
    if (!complete(expr)) return null;
    try {
        return Function(`"use strict"; return (${expr})`)();
    } catch {
        return null;
    }
}

export function checkComparisons(gameData, gameInfo) {
    let update = false;
    let idx = -1;
    let indexList = [];
    const maxX = gameData[0].length - 1;
    const maxY = gameData.length - 1;
    let sHorizontal = "";
    let stop = false;
    let sVertical = "";
    let x = 0;
    let y = 0;
    let xMin = 0;
    let yMin = 0;
    let xMax = 0;
    let yMax = 0;

    function calcHorizontalRange(xStart) {
        stop = false;
        x = xStart;
        xMin = x;
        xMax = x;
        while (!stop) {
            x--;
            if ((x >= 0) && (gameData[y][x] === 242)) {
                xMin = x;
            } else {
                stop = true;
            }
        }
        stop = false;
        x = xStart;
        while (!stop) {
            x++;
            if ((x <= maxX) && (gameData[y][x] === 242)) {
                xMax = x;
            } else {
                stop = true;
            }
        }
    }

    function calcVerticalRange(yStart) {
        stop = false;
        y = yStart;
        yMin = y;
        yMax = y;
        while (!stop) {
            y--;
            if ((y >= 0) && (gameData[y][x] === 242)) {
                yMin = y;
            } else {
                stop = true;
            }
        }
        stop = false;
        y = yStart;
        while (!stop) {
            y++;
            if ((y <= maxY) && (gameData[y][x] === 242)) {
                yMax = y;
            } else {
                stop = true;
            }
        }
    }

    function check(comparison) {
        let expressions = null;

        expressions = comparison.split("=");
        if (expressions.length < 2) {
            return false;
        }
        for (let i = 0; i < expressions.length - 1; i++) {
            const expr1 = convert(expressions[i].trim());
            const expr2 = convert(expressions[i + 1].trim());
            if ((expr1 === "") || (expr2 === "")) {
                return false;
            }
            const calc1 = calc(expr1);
            const calc2 = calc(expr2);
            if ((calc1 === null) || (calc2 === null) || !equal(calc1, calc2)) {
                return false;
            }
        }
        return true;
    }

    function convert(s) {
        const chars = Array.from(s); // Unicode-safe
        let result = "";

        for (let i = 0; i < chars.length; i++) {
            const ch = chars[i];
            const next = chars[i + 1] ?? "";

            let value = "";
            if (ch === "%") {
                i++;
                switch (next) {
                    case "S":
                        value = "10";
                        break;
                    case "s":
                        value = "15";
                        break;
                    case "E":
                        value = "20";
                        break;
                    case "e":
                        value = "30";
                        break;
                    case "Q":
                        value = "40";
                        break;
                    case "q":
                        value = "60";
                        break;
                    case "H":
                        value = "80";
                        break;
                    case "h":
                        value = "120";
                        break;
                    case "W":
                        value = "160";
                        break;
                    case "w":
                        value = "240";
                        break;
                    default:
                        value = "%";
                        i--;
                        break;
                }
                result += value;
                continue;
            }

            if (ch === "x") {
                result += "*";
                continue;
            }

            // other characters
            result += ch;
        }

        return result;
    }

    function equal(a, b, tolerance = 1e-9) {
        return Math.abs(a - b) < tolerance;
    }

    for (let i = 0; i < gameInfo.answerBalls.length; i++) {
        const answerBall = gameInfo.answerBalls[i];

        // Horizontal
        sHorizontal = "";
        indexList.length = 0;
        y = answerBall.y;
        calcHorizontalRange(answerBall.x);
        for (let j = xMin; j <= xMax; j++) {
            x = j;
            idx = findElementByCoordinates(x, y, gameInfo.answerBalls);
            if (idx >= 0) {
                indexList.push(idx);
                sHorizontal += gameInfo.answerBalls[idx].answer;
            } else {
                break;
            }
        }
        if (check(sHorizontal)) {
            for (let j = 0; j < indexList.length; j++) {
                gameInfo.answerBalls[indexList[j]].delete = true;
            }
        }

        // Vertical
        sVertical = "";
        indexList.length = 0;
        x = answerBall.x;
        calcVerticalRange(answerBall.y);
        for (let j = yMin; j <= yMax; j++) {
            y = j;
            idx = findElementByCoordinates(x, y, gameInfo.answerBalls);
            if (idx >= 0) {
                indexList.push(idx);
                sVertical += gameInfo.answerBalls[idx].answer;
            } else {
                break;
            }
        }
        if (check(sVertical)) {
            for (let j = 0; j < indexList.length; j++) {
                gameInfo.answerBalls[indexList[j]].delete = true;
            }
        }
    }

    const answerBallsCopy = gameInfo.answerBalls.slice();
    gameInfo.answerBalls.length = 0;
    for (let i = 0; i < answerBallsCopy.length; i++) {
        if (!answerBallsCopy[i].delete) {
            gameInfo.answerBalls.push(answerBallsCopy[i]);
        } else {
            gameData[answerBallsCopy[i].y][answerBallsCopy[i].x] = 0;
            update = true;
        }
    }
    answerBallsCopy.length = 0;
    return update;
}