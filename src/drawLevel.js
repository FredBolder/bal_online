import { drawCar, drawFish, drawFlower, drawHeart, drawHouse, drawStar, drawTrain, drawTree } from "./drawAnswerBallIcons.js"
import { displayColor, findElementByCoordinates } from "./balUtils.js";
import { indexToColor } from "./colorUtils.js";
import {
  drawBox,
  drawCircle,
  drawFilledBox,
  drawFilledCircle,
  drawLine,
  drawText,
} from "./drawUtils.js";
import { fixScroll } from "./createLevelMode.js";
import { electricityTarget } from "./electricity.js";
import { globalVars } from "./glob.js";
import { moverModes } from "./movers.js";
import { validNotesForKeyboardMode } from "./musicBoxes.js";
import { buildPatternLayer, ignorePatternForCell } from "./stonePatterns.js";
import { getObjectCoordinates } from "./telekinesis.js";
import { booleanToInt, polar, randomInt, rotatePoints } from "./utils.js";

let bitmapLava = null;
let bitmapWeakStone = null;

function clearBitMapLava() {
  bitmapLava = null;
}

function drawLevel(
  canvas,
  ctx,
  backData,
  gameData,
  elements,
  status,
  gameInfo,
  gameVars,
  raster,
  selectedCell,
  isMenu
) {
  let wave = gameVars.wave2;
  let bgcolor = gameVars.bgcolor;
  let fgcolor = gameVars.fgcolor;

  function createLavaBitmap(size = 32) {
    const bmpCanvas = document.createElement('canvas');
    bmpCanvas.width = size;
    bmpCanvas.height = size;
    const bmpCtx = bmpCanvas.getContext('2d');
    const imageData = bmpCtx.createImageData(size, size);
    const data = imageData.data;
    const colors = [[255, 0, 0], [255, 255, 0], [255, 69, 0]];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const color = colors[randomInt(0, 2)];
        const index = (y * size + x) * 4;
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255; // Full opacity
      }
    }
    bmpCtx.putImageData(imageData, 0, 0);
    return bmpCanvas;
  }

  function createWeakStoneBitmap(size = 32) {
    const bmpCanvas = document.createElement('canvas');
    bmpCanvas.width = size;
    bmpCanvas.height = size;
    const bmpCtx = bmpCanvas.getContext('2d');
    const imageData = bmpCtx.createImageData(size, size);
    const data = imageData.data;
    const colors = [[70, 70, 70], [20, 20, 20], [40, 40, 40]];
    const colorNumbers = [1, 3, 2, 2, 1, 3, 1, 2, 1, 1, 2, 3, 3, 3, 2, 1, 3, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 3, 3, 2, 2, 1, 3, 2];
    let c = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const color = colors[colorNumbers[c % colorNumbers.length] - 1];
        const index = (y * size + x) * 4;
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = 255; // Full opacity
        c++;
      }
    }
    bmpCtx.putImageData(imageData, 0, 0);
    return bmpCanvas;
  }

  function getBgcolor(x, y, defaultValue) {
    let result = defaultValue;
    for (let i = 0; i < bgcolor.length; i++) {
      const colorSetting = bgcolor[i];
      if ((x >= colorSetting.x) && (y >= colorSetting.y) &&
        (x <= colorSetting.x + colorSetting.w - 1) && (y <= colorSetting.y + colorSetting.h - 1)) {
        result = colorSetting.color;
      }
    }
    return result;
  }

  function getFgcolor(x, y, defaultValue) {
    let result = defaultValue;
    for (let i = 0; i < fgcolor.length; i++) {
      const colorSetting = fgcolor[i];
      if ((x >= colorSetting.x) && (y >= colorSetting.y) &&
        (x <= colorSetting.x + colorSetting.w - 1) && (y <= colorSetting.y + colorSetting.h - 1)) {
        result = colorSetting.color;
      }
    }
    return result;
  }

  function drawAbbreviation(s) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
    drawText(ctx, xc, yc, s, "middle", "white", w2 * 0.7, w1 * 0.8);
  }

  function drawAllRedFish() {
    for (let i = 0; i < gameInfo.redFish.length; i++) {
      const fish = gameInfo.redFish[i];
      const x = fish.x - gameVars.scroll.x;
      const y = fish.y - gameVars.scroll.y;
      if ((x >= 0) && (x < columns) && (y >= 0) && (y < rows)) {
        const xmin = x * size1 + leftMargin;
        const xmax = xmin + size1 - 1;
        const ymin = y * size1 + topMargin;
        const ymax = ymin + size1 - 1;
        const w1 = xmax - xmin + 1;
        const w2 = ymax - ymin + 1;
        if (fish.direction == 4) {
          ctx.drawImage(elements.elementRedFishLeft, xmin, ymin, w1, w2);
        } else {
          ctx.drawImage(elements.elementRedFishRight, xmin, ymin, w1, w2);
        }
      }
    }
  }

  function drawAllTeleports() {
    for (let i = 0; i < gameInfo.teleports.length; i++) {
      const teleport = gameInfo.teleports[i];
      const x = teleport.x - gameVars.scroll.x;
      const y = teleport.y - gameVars.scroll.y;
      if ((x >= 0) && (x < columns) && (y >= 0) && (y < rows)) {
        const xmin = x * size1 + leftMargin;
        const xmax = xmin + size1 - 1;
        const ymin = y * size1 + topMargin;
        const ymax = ymin + size1 - 1;
        const xc = Math.round((xmax + xmin) / 2);
        const yc = Math.round((ymax + ymin) / 2);

        ctx.lineWidth = 3;
        if (teleport.selfDestructing) {
          ctx.setLineDash([2, 2]);
        } else {
          ctx.setLineDash([]);
        }
        drawBox(ctx, xmin + 1, ymin + 1, size1 - 2, size1 - 2, teleport.color);
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        if ([0, 31, 92].includes(gameData[teleport.y][teleport.x])) {
          drawText(ctx, xc, yc, teleport.group.toString(), "middle", teleport.color, w2 * 0.7, w1 * 0.8);
        }
      }
    }
  }

  function drawAnswerBall(x, y, color) {
    let answer = "2";
    let foreColor = color === "purple" ? "white" : "black";
    let idx = 0;
    let mode = "answerball";

    idx = findElementByCoordinates(x, y, gameInfo.answerBalls);
    if (idx >= 0) {
      answer = gameInfo.answerBalls[idx].answer;
      mode = gameInfo.answerBalls[idx].mode;
    }

    if (mode === "scale") {
      const distFromAbove = w2 * 0.2;
      const distFromSide = w1 * 0.2;
      const textDistFromBottom = w2 * 0.1;
      ctx.fillStyle = displayColor(color);
      ctx.strokeStyle = displayColor(color);
      ctx.beginPath();
      ctx.moveTo(xmin + distFromSide, ymin + distFromAbove);
      ctx.lineTo(xmax - distFromSide, ymin + distFromAbove);
      ctx.lineTo(xmax, ymax + 0.5);
      ctx.lineTo(xmin, ymax + 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      drawFilledBox(ctx, xmin, ymin, w1, distFromAbove, "#777777");
      drawText(ctx, xc, ymax - textDistFromBottom, answer, "center", foreColor, w2 * 0.6, w1 * 0.6);
    } else {
      if (color === "purple") {
        drawPurpleBall();
      } else {
        drawWhiteBall();
      }
      switch (answer) {
        case "%car":
          drawCar(ctx, xc, yc, w1 * 0.8);
          break;
        case "%fish":
          drawFish(ctx, xc, yc, w1 * 0.8, false, false);
          break;
        case "%flower":
          drawFlower(ctx, xc, yc, w1 * 0.65);
          break;
        case "%heart":
          drawHeart(ctx, xc, yc, w1 * 0.65);
          break;
        case "%house":
          drawHouse(ctx, xc, yc, w1 * 0.8);
          break;
        case "%star":
          drawStar(ctx, xc, yc, w1 * 0.65, "yellow");
          break;
        case "%train":
          drawTrain(ctx, xc, yc, w1 * 0.85, true);
          break;
        case "%tree":
          drawTree(ctx, xc, yc, w1 * 0.75);
          break;
        case "%w":
          drawNote(xc, yc, "whole", 0, foreColor);
          break;
        case "%h":
          drawNote(xc, yc, "half", 0, foreColor);
          break;
        case "%q":
          drawNote(xc, yc, "quarter", 0, foreColor);
          break;
        case "%e":
          drawNote(xc, yc, "eighth", 0, foreColor);
          break;
        case "%s":
          drawNote(xc, yc, "sixteenth", 0, foreColor);
          break;
        case "%w.":
          drawNote(xc, yc, "whole", 1, foreColor);
          break;
        case "%h.":
          drawNote(xc, yc, "half", 1, foreColor);
          break;
        case "%q.":
          drawNote(xc, yc, "quarter", 1, foreColor);
          break;
        case "%e.":
          drawNote(xc, yc, "eighth", 1, foreColor);
          break;
        case "%s.":
          drawNote(xc, yc, "sixteenth", 1, foreColor);
          break;
        case "%w..":
          drawNote(xc, yc, "whole", 2, foreColor);
          break;
        case "%h..":
          drawNote(xc, yc, "half", 2, foreColor);
          break;
        case "%q..":
          drawNote(xc, yc, "quarter", 2, foreColor);
          break;
        case "%e..":
          drawNote(xc, yc, "eighth", 2, foreColor);
          break;
        case "%s..":
          drawNote(xc, yc, "sixteenth", 2, foreColor);
          break;
        case "%black":
          drawAnswerColor("black");
          break;
        case "%brown":
          drawAnswerColor("brown");
          break;
        case "%blue":
          drawAnswerColor("blue");
          break;
        case "%gray":
          drawAnswerColor("gray");
          break;
        case "%green":
          drawAnswerColor("green");
          break;
        case "%orange":
          drawAnswerColor(displayColor("orange"));
          break;
        case "%pink":
          drawAnswerColor(displayColor("pink"));
          break;
        case "%purple":
          drawAnswerColor(displayColor("purple"));
          break;
        case "%red":
          drawAnswerColor("red");
          break;
        case "%white":
          drawAnswerColor("white");
          break;
        case "%yellow":
          drawAnswerColor("yellow");
          break;
        default:
          drawText(ctx, xc, yc, answer, "middle", foreColor, w2 * 0.6, w1 * 0.7);
          break;
      }
    }
  }

  function drawAnswerColor(color) {
    const size = w1 * 0.5;
    drawFilledBox(ctx, xc - (0.5 * size), yc - (0.5 * size), size, size, color);
    drawBox(ctx, xc - (0.5 * size), yc - (0.5 * size), size, size, "black");
  }

  function drawArrow(direction, frontColor, backColor, options = {}) {
    let angle = 0;
    let d1 = w1 / 3;
    let d2 = w1 / 10;
    let d3 = w1 / 8;

    const defaults = {
      box: true,
      shadow: false
    }
    const opt = Object.assign({}, defaults, options);
    const points = [
      { x: xc - d1, y: yc },
      { x: xc + d1, y: yc },
      { x: xc + d3, y: yc - d2 },
      { x: xc + d3, y: yc + d2 },
    ];

    if (opt.box) {
      drawFilledBox(ctx, xmin, ymin, w1, w2, backColor, opt.shadow);
    }
    switch (direction) {
      case "left":
        angle = 180;
        break;
      case "right":
        angle = 0;
        break;
      case "up":
        angle = -90;
        break;
      case "down":
        angle = 90;
        break;
      case "upleft":
        angle = -135;
        break;
      case "upright":
        angle = -45;
        break;
      case "downleft":
        angle = 135;
        break;
      case "downright":
        angle = 45;
        break;
      default:
        angle = 0;
        break;
    }
    const rotatedPoints = rotatePoints(points, { x: xc, y: yc }, angle);
    drawLine(ctx, rotatedPoints[0].x, rotatedPoints[0].y, rotatedPoints[1].x, rotatedPoints[1].y, frontColor);
    drawLine(ctx, rotatedPoints[1].x, rotatedPoints[1].y, rotatedPoints[2].x, rotatedPoints[2].y, frontColor);
    drawLine(ctx, rotatedPoints[1].x, rotatedPoints[1].y, rotatedPoints[3].x, rotatedPoints[3].y, frontColor);
  }

  function drawBall(color, shadow = false) {
    drawFilledCircle(ctx, xc, yc, w1 * 0.5, color, shadow);
  }

  function drawBallSynchroniser(color) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, color, true);
    drawText(ctx, xc, yc, "&", "middle", "black", w2 * 0.8, w1 * 0.8);
  }

  function drawBarBottom(color) {
    drawBall(color);
    drawFilledBox(ctx, xmin, ymin, w1, w2 / 2, color);
  }

  function drawBarLeft(color) {
    drawBall(color);
    drawFilledBox(ctx, xc, ymin, w1 / 2, w2, color);
  }

  function drawBarMiddle(color) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, color);
  }

  function drawBarRight(color) {
    drawBall(color);
    drawFilledBox(ctx, xmin, ymin, w1 / 2, w2, color);
  }

  function drawBarTop(color) {
    drawBall(color);
    drawFilledBox(ctx, xmin, yc, w1, w2 / 2, color);
  }


  function drawBlueBall() {
    const scaleFactor = gameInfo.hasPropeller ? 0.9 : 1;
    const offsetX = (1 - scaleFactor) * w1 * 0.5;
    const offsetY = (1 - scaleFactor) * w2;
    if (gameVars.gravity === "up") {
      ctx.save();
      // The rotation center point is always the canvas origin. 
      // To change the center point, the canvas has to be moved by using the translate() method.
      ctx.translate(Math.round(xc), Math.round(yc));
      ctx.rotate(Math.PI);
      ctx.translate(-Math.round(xc), -Math.round(yc));
    }

    if (gameInfo.hasDivingGlasses) {
      ctx.drawImage(elements.elementDiving, xmin + offsetX, ymin + offsetY, w1 * scaleFactor, w2 * scaleFactor);
    } else {
      if (status.gameOver) {
        ctx.drawImage(elements.elementSad, xmin + offsetX, ymin + offsetY, w1 * scaleFactor, w2 * scaleFactor);
      } else {
        ctx.drawImage(elements.elementHappy, xmin + offsetX, ymin + offsetY, w1 * scaleFactor, w2 * scaleFactor);
      }
    }
    if (gameInfo.hasPropeller) {
      drawPropeller(-w2 * 0.17);
    }
    if (gameVars.remainingPhaseTicks > 0) {
      ctx.save();
      // Clip to the circular area of the ball
      const radius = (w1 * scaleFactor) / 2;
      ctx.beginPath();
      ctx.arc(xc, (ymin + offsetY) + (w2 * scaleFactor * 0.5), radius, 0, Math.PI * 2);
      ctx.clip();

      const stripeWidth = Math.max(1, Math.round((w1 * scaleFactor) / 15));
      const phase = (performance.now() / 50) % (stripeWidth * 2);
      for (let x = xmin - phase; x < xmin + w1; x += stripeWidth * 2) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, ymin, stripeWidth, w2);
      }
      ctx.restore();
    }

    if (gameVars.gravity === "up") {
      ctx.restore();
    }
  }

  function drawBomb(x, y) {
    const sticks = 3;
    let factor = 0.1;
    let d1 = w1 / 6;
    let d2 = w2 / 2;
    let d3 = w1 / 6;
    drawStone(x, y);
    for (let i = 0; i < sticks; i++) {
      drawFilledBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "red");
      drawBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "black");
    }
    drawLine(ctx, xc - d3, ymin + d2, xc - d3, ymin + d2 + (sticks * w2 * factor), "black");
    drawLine(ctx, xc + d3, ymin + d2, xc + d3, ymin + d2 + (sticks * w2 * factor), "black");
  }

  function drawChanger(x, y) {
    let color1 = "blue";
    let color2 = "white";
    let horizontal = false;
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.changers);
    if (idx >= 0) {
      color1 = gameInfo.changers[idx].color1;
      color2 = gameInfo.changers[idx].color2;
      horizontal = gameInfo.changers[idx].horizontal;
    }

    if (horizontal) {
      drawChangerColor(xmin, ymin, w1 * 0.5, w2, color1);
      drawChangerColor(xc, ymin, w1 * 0.5, w2, color2);
    } else {
      drawChangerColor(xmin, ymin, w1, w2 * 0.5, color1);
      drawChangerColor(xmin, yc, w1, w2 * 0.5, color2);
    }
  }

  function drawChangerColor(x, y, w, h, color) {
    const colors = ["lightblue", "orange", "pink", "purple", "red", "white", "yellow"];
    let dist = 0;

    if (color === "all") {
      if (w > h) {
        dist = w / colors.length;
        for (let c = 0; c < colors.length; c++) {
          drawFilledBox(ctx, x + (c * dist), y, dist, h, displayColor(colors[c]));
        }
      } else {
        dist = h / colors.length;
        for (let c = 0; c < colors.length; c++) {
          drawFilledBox(ctx, x, y + (c * dist), w, dist, displayColor(colors[c]));
        }
      }
    } else {
      drawFilledBox(ctx, x, y, w, h, displayColor(color));
    }
  }

  function drawChangerColors() {
    drawFilledBox(ctx, xmin, ymin, w1 * 0.5, w2 * 0.5, displayColor("white"));
    drawFilledBox(ctx, xc, ymin, w1 * 0.5, w2 * 0.5, displayColor("lightblue"));
    drawFilledBox(ctx, xmin, yc, w1 * 0.5, w2 * 0.5, displayColor("yellow"));
    drawFilledBox(ctx, xc, yc, w1 * 0.5, w2 * 0.5, displayColor("pink"));
    drawText(ctx, xc, yc, "sel", "middle", "black", w2 * 0.7, w1 * 0.8);
  }

  function drawChordTypeOrInterval(chordTypeOrInterval) {
    drawFilledCircle(ctx, xc, yc, w1 * 0.5, "green", true);
    drawText(ctx, xc, yc, chordTypeOrInterval, "middle", "white", w2 * 0.7, w1 * 0.7);
  }

  function drawCoilSpring(x, y) {
    let color = getFgcolor(x, y, "white");
    let d1 = w1 / 4;
    let d2 = 0;
    let d3 = w2 / 8;
    const n = 3;

    drawLine(ctx, xmin + d1, ymin + d2, xmax - d1, ymin + d2, color);
    for (let i = 0; i < n; i++) {
      drawLine(ctx, xmin + d1, ymin + d2, xmax - d1, ymin + d2 + d3, color);
      if (i < n - 1) {
        drawLine(ctx, xmin + d1, ymin + d2 + d3 + d3, xmax - d1, ymin + d2 + d3, color);
        d2 += (d3 * 2);
      } else {
        d2 += d3;
      }
    }
    drawLine(ctx, xmin + d1, ymin + d2, xmax - d1, ymin + d2, color);
  }

  function drawColor(n) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, indexToColor(globalVars.createLevelColorPage, n));
  }

  function drawConveyorBelt(x, y, part) {
    let angle = 0;
    let color = getFgcolor(x, y, "#464646");
    let d1 = w2 * 0.35;
    let d2 = w2 * 0.1;
    let idx = -1;
    let yBottom = Math.round(ymax - d2);
    let yCenter = Math.round((ymin + yBottom) / 2);
    let d3 = Math.round((yBottom - ymin) * 0.5) - 1;
    if (d3 < 0) {
      d3 = 0;
    }
    let txt = "";
    drawFilledCircle(ctx, xc, yCenter, d1, color);
    switch (part) {
      case "left":
        ctx.beginPath();
        // arc(x, y, radius, startAngle, endAngle, counterclockwise)
        ctx.strokeStyle = color;
        ctx.arc(xc, yCenter, d3, 0.5 * Math.PI, 1.5 * Math.PI, false);
        ctx.stroke();
        drawLine(ctx, xc, ymin, xmax + 0.5, ymin, color);
        drawLine(ctx, xc, yBottom, xmax + 0.5, yBottom, color);
        idx = findElementByCoordinates(x, y, gameInfo.conveyorBelts);
        if (idx >= 0) {
          switch (gameInfo.conveyorBelts[idx].direction) {
            case "left":
              txt = "L";
              angle = gameVars.conveyorBeltAngleLeft;
              break;
            case "right":
              txt = "R";
              angle = gameVars.conveyorBeltAngleRight;
              break;
            default:
              break;
          }
          if (txt !== "") {
            drawText(ctx, xc, yCenter, txt, "middle", "white", w2 * 0.4, w1 * 0.5, null, 1, angle);
          }
        }
        break;
      case "middle":
        drawLine(ctx, xmin - 0.5, ymin, xmax + 0.5, ymin, color);
        drawLine(ctx, xmin - 0.5, yBottom, xmax + 0.5, yBottom, color);
        break;
      case "right":
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(xc, yCenter, d3, 0.5 * Math.PI, 1.5 * Math.PI, true);
        ctx.stroke();
        drawLine(ctx, xmin - 0.5, ymin, xc, ymin, color);
        drawLine(ctx, xmin - 0.5, yBottom, xc, yBottom, color);
        break;
      default:
        break;
    }
  }

  function drawCopier(color) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, color, true);
    drawText(ctx, xc, yc, "2x", "middle", "black", w2 * 0.7, w1 * 0.8);
  }

  function drawDamagedStone(x, y) {
    let bgcolor = getBgcolor(x, y, "black");
    drawStone(x, y);
    ctx.lineWidth = 2;
    drawLine(ctx, xmin + (w1 * 0.75), ymin, xmin + (w1 * 0.4), ymin + (w2 * 0.35), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.4), ymin + (w2 * 0.35), xc, ymin + (w2 * 0.6), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.7), yc, xmin + (w1 * 0.6), ymin + (w2 * 0.8), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.6), ymin + (w2 * 0.8), xmin + (w1 * 0.9), ymax, bgcolor);
    drawLine(ctx, xmin + (w1 * 0.1), ymin, xmin + (w1 * 0.2), ymin + (w2 * 0.3), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.25), ymin + (w2 * 0.6), xmin + (w1 * 0.1), ymin + (w2 * 0.7), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.1), ymin + (w2 * 0.7), xmin, ymax, bgcolor);
    ctx.lineWidth = 1;
  }

  function drawDelay() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "white", true);
    drawText(ctx, xc, yc, "t", "middle", "black", w2 * 0.7, w1 * 0.8);
  }

  function drawDetonator(x, y) {
    let color = getFgcolor(x, y, "#DCDCDC");
    let d1 = w1 / 7;
    let d2 = w2 / 2;
    let d3 = w2 / 8;
    let d4 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "red", true);
    drawLine(ctx, xc, ymin + d3, xc, ymin + d2, color);
    drawLine(ctx, xc - d4, ymin + d3, xc + d4, ymin + d3, color);
    drawText(ctx, xc, ymin + w2 * 0.75, "TNT", "middle", "white", w2 * 0.4, w1 * 0.54);
  }

  function drawDiamant(color) {
    let fillColor = "white";
    let lineColor = "gray";

    switch (color.toLowerCase()) {
      case "blue":
        fillColor = "#0000FF";
        lineColor = "#000077";
        break;
      case "green":
        fillColor = "#00FF00";
        lineColor = "#007700";
        break;
      case "red":
        fillColor = "#FF0000";
        lineColor = "#770000";
        break;
      case "white":
        fillColor = "#FFFFFF";
        lineColor = "#777777";
        break;
      case "yellow":
        fillColor = "#FFFF00";
        lineColor = "#777700";
        break;
      default:
        break;
    }
    let d1 = Math.round(w1 / 3); // first distance from side
    let d2 = Math.round(w2 / 12); // first distance from top
    let d3 = Math.round(w1 / 5); // second distance from side
    let d4 = Math.round(w2 / 4.5); // second distance from top
    let d5 = Math.round(w1 / 2.7); // third distance from side
    let d6 = Math.round(w1 / 1.7); // third distance from top
    let pt1 = { x: xmin + d1, y: ymin + d2 };
    let pt2 = { x: xmax - d1, y: ymin + d2 };
    let pt3 = { x: xmax - d3, y: ymin + d4 };
    let pt4 = { x: xc, y: ymin + d6 };
    let pt5 = { x: xmin + d3, y: ymin + d4 };
    let pt6 = { x: xmax - d5, y: ymin + d4 };
    let pt7 = { x: xmin + d5, y: ymin + d4 };
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.lineTo(pt5.x, pt5.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.fill();
    ctx.stroke();
    drawLine(ctx, pt3.x, pt3.y, pt5.x, pt5.y, lineColor);
    drawLine(ctx, pt6.x, pt6.y, pt4.x, pt4.y, lineColor);
    drawLine(ctx, pt7.x, pt7.y, pt4.x, pt4.y, lineColor);
    drawLine(ctx, pt6.x, pt6.y, pt4.x, pt1.y, lineColor);
    drawLine(ctx, pt7.x, pt7.y, pt4.x, pt1.y, lineColor);
  }

  function drawDirectionChanger1() {
    // Direction: /, code: 84, C
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
  }

  function drawDirectionChanger2() {
    // Direction: \, code: 85, c
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
  }

  function drawDirectionChanger3() {
    // Direction: - and |, code: 86, +
    const d1 = w1 * 0.1;
    const d2 = w1 * 0.1;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xmin + d1 + d2, ymin + d1, xmax - d1 - d2, ymin + d1, "black");
    drawLine(ctx, xmin + d1 + d2, ymax - d1, xmax - d1 - d2, ymax - d1, "black");
    drawLine(ctx, xmin + d1, ymin + d1 + d2, xmin + d1, ymax - d1 - d2, "black");
    drawLine(ctx, xmax - d1, ymin + d1 + d2, xmax - d1, ymax - d1 - d2, "black");
  }

  function drawDirectionChanger4() {
    // Direction: /, code: 138, â
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
    ctx.setLineDash([2, 4]);
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
    ctx.setLineDash([]);
  }

  function drawDirectionChanger5() {
    // Direction: \, code: 139, Â
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
    ctx.setLineDash([2, 4]);
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
    ctx.setLineDash([]);
  }

  function drawDirections() {
    let angle = 0;
    let d1 = w1 / 10;
    let d2 = w1 / 2.5;
    let d3 = w1 / 10; // was 14
    let d4 = w1 / 3.5; // was 4
    let offsetX = 0;
    let offsetY = 0;

    const points = [
      { x: xc + d1, y: yc },
      { x: xc + d2, y: yc },
      { x: xc + d4, y: yc - d3 },
      { x: xc + d4, y: yc + d3 },
    ];

    drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
    for (let i = 0; i < 4; i++) {
      angle = (i * 90);
      offsetX = 0;
      offsetY = 0;
      switch (i) {
        case 0:
        case 2:
          offsetY = - w2 * 0.25;
          break;
        case 1:
          offsetX = w1 * 0.25;
          break;
        case 3:
          offsetX = -w1 * 0.25;
          offsetY = w2 * 0.5;
          break;
        default:
          break;
      }
      const rotatedPoints = rotatePoints(points, { x: xc, y: yc }, angle);
      drawLine(ctx, rotatedPoints[0].x + offsetX, rotatedPoints[0].y + offsetY, rotatedPoints[1].x + offsetX, rotatedPoints[1].y + offsetY, "white");
      drawLine(ctx, rotatedPoints[1].x + offsetX, rotatedPoints[1].y + offsetY, rotatedPoints[2].x + offsetX, rotatedPoints[2].y + offsetY, "white");
      drawLine(ctx, rotatedPoints[1].x + offsetX, rotatedPoints[1].y + offsetY, rotatedPoints[3].x + offsetX, rotatedPoints[3].y + offsetY, "white");
    }
  }

  function drawDisappearingStone(x, y) {
    const color = getFgcolor(x, y, "#464646");
    const idx = findElementByCoordinates(x, y, gameInfo.disappearingStones);
    let status = 0;

    if (idx >= 0) {
      status = gameInfo.disappearingStones[idx].status;
    }
    drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
    // status 3 = disappeared
    if (status < 3) {
      ctx.lineWidth = w2;
      switch (status) {
        case 0:
          ctx.setLineDash([3, 1]);
          break;
        case 1:
          ctx.setLineDash([2, 2]);
          break;
        case 2:
          ctx.setLineDash([1, 3]);
          break;
        default:
          break;
      }
      drawLine(ctx, xmin, yc, xmax, yc, color);
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
    }
  }

  function drawDivingGlasses(color, scaleFactor = 1) {
    let d1 = w1 * scaleFactor / 5;
    let d2 = w1 * scaleFactor / 4.5;
    let d3 = w1 * scaleFactor / 2.5;
    let d4 = w1 * scaleFactor / 10;
    let d5 = w1 * scaleFactor / 1.8;
    let d6 = w1 * scaleFactor / 10;
    let d7 = w1 * scaleFactor / 2.5;
    let dx = (1 - scaleFactor) * w1 * 0.5;
    let dy = (1 - scaleFactor) * w2;
    drawLine(ctx, xmin + d1 + dx, ymin + d2 + dy, xmax - d1 - dx, ymin + d2 + dy, color);
    drawLine(ctx, xmin + d1 + dx, ymin + d2 + dy, xmin + d4 + dx, ymin + d3 + dy, color);
    drawLine(ctx, xmax - d1 - dx, ymin + d2 + dy, xmax - d4 - dx, ymin + d3 + dy, color);
    drawLine(ctx, xmin + d4 + dx, ymin + d3 + dy, xmin + d1 + dx, ymin + d5 + dy, color);
    drawLine(ctx, xmax - d4 - dx, ymin + d3 + dy, xmax - d1 - dx, ymin + d5 + dy, color);
    drawLine(ctx, xmin + d1 + dx, ymin + d5 + dy, xc - d6, ymin + d5 + dy, color);
    drawLine(ctx, xmax - d1 - dx, ymin + d5 + dy, xc + d6, ymin + d5 + dy, color);
    drawLine(ctx, xc - d6, ymin + d5 + dy, xc, ymin + d7 + dy, color);
    drawLine(ctx, xc + d6, ymin + d5 + dy, xc, ymin + d7 + dy, color);
  }

  function drawDoor() {
    let d1 = w1 / 6;
    drawFilledBox(ctx, xc - d1, ymin, 2 * d1, w2, "brown");
  }

  function drawElectricity(x, y) {
    let d1 = Math.round(w1 * 0.06);
    let d2 = Math.round(w1 * 0.28);
    let d3 = Math.round(w1 * 0.14);
    let d4 = Math.round(w1 * 0.2);
    let d5 = Math.round(w1 * 0.3);
    let d6 = Math.round(w1 * 0.07);
    let d7 = Math.round(w1 * 0.04);
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "#464646"));
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(xc, ymin + d1);
    ctx.lineTo(xc - d3, yc - d6);
    ctx.lineTo(xc + d3, yc - d6);
    ctx.lineTo(xc + d7, ymax - d2);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(xc, ymax - d1);
    ctx.lineTo(xc - d4, ymax - d2);
    ctx.lineTo(xc + d5, ymax - d2);
    ctx.lineTo(xc, ymax - d1);
    ctx.fill();
  }

  function drawElectricityActive() {
    let elecTarget = 0;
    let x1 = 0;
    let x2 = 0;
    let y = 0;

    for (let i = 0; i < gameInfo.electricity.length; i++) {
      const elec = gameInfo.electricity[i];
      elecTarget = electricityTarget(backData, gameData, elec.x, elec.y);
      if (elecTarget > 0 && Math.abs(elec.y - elecTarget) > 1) {
        x1 = Math.round(leftMargin + elec.x * size1 + 0.5 * size1);
        y = (elec.y + 1) * size1 + topMargin;
        ctx.strokeStyle = "#CF9FFF";
        ctx.beginPath();
        ctx.moveTo(x1, y);
        for (let j = elec.y + 1; j < elecTarget; j++) {
          x2 = x1;
          if (j < elecTarget - 1) {
            x2 += Math.round(size1 * 0.8 * (Math.random() - 0.5));
          }
          y += size1;
          ctx.lineTo(x2, y);
        }
        ctx.stroke();
      }
    }
  }

  function drawElevatorEntranceAndExit(x, y) {
    const color = getFgcolor(x, y, "white");
    let d1 = w1 / 3;
    let d2 = w1 / 10;
    let d3 = w1 / 8;
    let d4 = w1 / 8;
    drawLine(ctx, xc, ymin, xmax, ymin, color);
    drawLine(ctx, xmax, ymin, xmax, ymax, color);
    drawLine(ctx, xmax, ymax, xc, ymax, color);
    drawLine(ctx, xc, ymin, xc, ymin + d4, color);
    drawLine(ctx, xc, ymax - d4, xc, ymax, color);
    drawLine(ctx, xc - d1, yc, xc + d1, yc, color);
    drawLine(ctx, xc - d1, yc, xc - d3, yc - d2, color);
    drawLine(ctx, xc - d1, yc, xc - d3, yc + d2, color);
    drawLine(ctx, xc + d1, yc, xc + d3, yc - d2, color);
    drawLine(ctx, xc + d1, yc, xc + d3, yc + d2, color);
  }

  function drawElevatorLeftRight() {
    let d1 = w1 / 3;
    let d2 = w1 / 10;
    let d3 = w1 / 8;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    drawLine(ctx, xc - d1, yc, xc + d1, yc, "white");
    drawLine(ctx, xc - d1, yc, xc - d3, yc - d2, "white");
    drawLine(ctx, xc - d1, yc, xc - d3, yc + d2, "white");
    drawLine(ctx, xc + d1, yc, xc + d3, yc - d2, "white");
    drawLine(ctx, xc + d1, yc, xc + d3, yc + d2, "white");
  }

  function drawElevatorUpDown() {
    let d1 = w1 / 3;
    let d2 = w1 / 10;
    let d3 = w1 / 8;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    drawLine(ctx, xc, yc - d1, xc, yc + d1, "white");
    drawLine(ctx, xc, yc - d1, xc - d2, yc - d3), "white";
    drawLine(ctx, xc, yc - d1, xc + d2, yc - d3), "white";
    drawLine(ctx, xc, yc + d1, xc - d2, yc + d3), "white";
    drawLine(ctx, xc, yc + d1, xc + d2, yc + d3), "white";
  }

  function drawExplosion() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(xc - (w1 / 10), yc - (w2 / 2));
    ctx.lineTo(xc + (w1 / 8), yc - (w2 / 7));
    ctx.lineTo(xc + (w1 / 2), yc);
    ctx.lineTo(xc + (w1 / 6), yc + (w2 / 7));
    ctx.lineTo(xc + (w1 / 8), yc + (w2 / 2));
    ctx.lineTo(xc - (w1 / 8), yc + (w2 / 9));
    ctx.lineTo(xc - (w1 / 2.5), yc);
    ctx.lineTo(xc - (w1 / 4), yc - (w2 / 12));
    ctx.closePath();
    ctx.fill();
  }

  function drawForceDown() {
    let d1 = w2 / 8;
    let d2 = w1 / 8;
    let d3 = w2 / 4;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    for (let i = -1; i <= 1; i++) {
      d4 = (w1 / 3) * i;
      drawLine(ctx, xc + d4, ymin + d1, xc + d4, ymax - d1, "white");
      drawLine(ctx, xc + d4, ymax - d1, xc + d4 - d2, ymax - d1 - d3, "white");
      drawLine(ctx, xc + d4, ymax - d1, xc + d4 + d2, ymax - d1 - d3, "white");
    }
  }

  function drawForceLeft() {
    let d1 = w1 / 8;
    let d2 = w2 / 8;
    let d3 = w1 / 4;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    for (let i = -1; i <= 1; i++) {
      d4 = (w2 / 3) * i;
      drawLine(ctx, xmin + d1, yc + d4, xmax - d1, yc + d4, "white");
      drawLine(ctx, xmin + d1, yc + d4, xmin + d1 + d3, yc + d4 - d2, "white");
      drawLine(ctx, xmin + d1, yc + d4, xmin + d1 + d3, yc + d4 + d2, "white");
    }
  }

  function drawForceRight() {
    let d1 = w1 / 8;
    let d2 = w2 / 8;
    let d3 = w1 / 4;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    for (let i = -1; i <= 1; i++) {
      d4 = (w2 / 3) * i;
      drawLine(ctx, xmin + d1, yc + d4, xmax - d1, yc + d4, "white");
      drawLine(ctx, xmax - d1, yc + d4, xmax - d1 - d3, yc + d4 - d2, "white");
      drawLine(ctx, xmax - d1, yc + d4, xmax - d1 - d3, yc + d4 + d2, "white");
    }
  }

  function drawForceUp() {
    let d1 = w2 / 8;
    let d2 = w1 / 8;
    let d3 = w2 / 4;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    for (let i = -1; i <= 1; i++) {
      d4 = (w1 / 3) * i;
      drawLine(ctx, xc + d4, ymin + d1, xc + d4, ymax - d1, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 - d2, ymin + d1 + d3, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 + d2, ymin + d1 + d3, "white");
    }
  }

  function drawFreezeGun() {
    ctx.drawImage(elements.elementFreezeGun, xmin + (0.1 * w1), ymin, w1 * 0.8, w2 * 0.8);
  }

  function drawGameOver() {
    // let x = leftMargin + gameWidth / 2;
    // let y = gameHeight / 2 + topMargin;
    // drawText(
    //   ctx,
    //   x,
    //   y,
    //   "GAME OVER!",
    //   "middle",
    //   "white",
    //   Math.round(gameHeight * 0.6),
    //   Math.round(gameWidth * 0.9),
    //   "red",
    //   5
    // );

    if (status.laser !== null) {
      drawLaser(status.laser);
    }
  }

  function drawGameRotator(rotateLeft = false) {
    let d1 = w1 * 0.3;
    let d2 = w1 * 0.15;
    let pt1 = { x: 0, y: 0 };
    let pt2 = { x: 0, y: 0 };
    let pt3 = { x: 0, y: 0 };

    drawBox(ctx, xmin + 1, ymin + 1, w1 - 2, w2 - 2, "white");
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(xc, yc, d1, 0.75 * Math.PI, 0.25 * Math.PI, false);
    ctx.stroke();
    if (rotateLeft) {
      pt1 = polar(xc, yc, 135, d1);
      pt1.x += 1;
      pt2 = polar(pt1.x, pt1.y, 180, d2);
      pt3 = polar(pt1.x, pt1.y, -90, d2);
    } else {
      pt1 = polar(xc, yc, 45, d1);
      pt1.x -= 1;
      pt2 = polar(pt1.x, pt1.y, 0, d2);
      pt3 = polar(pt1.x, pt1.y, -90, d2);
    }
    drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y, "white");
    drawLine(ctx, pt1.x, pt1.y, pt3.x, pt3.y, "white");
  }

  function drawGravityChangerDown(x, y) {
    const color = getFgcolor(x, y, "#464646");
    const d1 = w1 * 0.07;
    const d2 = w1 * 0.15;
    drawFilledBox(ctx, xmin, ymin, w1, w2, color);
    drawFilledCircle(ctx, xc, (yc + ymax) * 0.5, w1 * 0.25, "white");
    drawLine(ctx, xmin, ymax, xmax, ymax, "white");
    drawLine(ctx, xc, ymin, xc, yc - (d1 * 2), "white");
    drawLine(ctx, xc - d2, ymin + d1, xc - d2, yc - d1, "white");
    drawLine(ctx, xc + d2, ymin + d1, xc + d2, yc - d1, "white");
  }

  function drawGravityChangerUp(x, y) {
    const color = getFgcolor(x, y, "#464646");
    const d1 = w1 * 0.07;
    const d2 = w1 * 0.15;
    drawFilledBox(ctx, xmin, ymin, w1, w2, color);
    drawFilledCircle(ctx, xc, (ymin + yc) * 0.5, w1 * 0.25, "white");
    drawLine(ctx, xmin, ymax, xmax, ymax, "white");
    drawLine(ctx, xc, ymax, xc, yc + (d1 * 2), "white");
    drawLine(ctx, xc - d2, ymax - d1, xc - d2, yc + d1, "white");
    drawLine(ctx, xc + d2, ymax - d1, xc + d2, yc + d1, "white");
  }

  function drawGrayBall(moves) {
    ctx.drawImage(elements.elementGray, xmin, ymin, w1, w2);
    if (moves > 0) {
      drawText(ctx, xc, yc, moves.toString(), "middle", "black", w2 * 0.7, w1 * 0.8);
    }
  }

  function drawHalfStone(x, y, location) {
    const color = getFgcolor(x, y, "#464646");
    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      switch (location) {
        case "left":
          drawFilledBox(ctx, xmin, ymin, w1 / 2, w2, color);
          break;
        case "right":
          drawFilledBox(ctx, xc, ymin, w1 / 2, w2, color);
          break;
        case "top":
          drawFilledBox(ctx, xmin, ymin, w1, w2 / 2, color);
          break;
        case "bottom":
          drawFilledBox(ctx, xmin, yc, w1, w2 / 2, color);
          break;
        default:
          break;
      }
    } else {
      switch (location) {
        case "left":
          ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1 / 2, w2, xmin, ymin, w1 / 2, w2);
          break;
        case "right":
          ctx.drawImage(stoneLayer, xc - leftMargin, ymin - topMargin, w1 / 2, w2, xc, ymin, w1 / 2, w2);
          break;
        case "top":
          ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2 / 2, xmin, ymin, w1, w2 / 2);
          break;
        case "bottom":
          ctx.drawImage(stoneLayer, xmin - leftMargin, yc - topMargin, w1, w2 / 2, xmin, yc, w1, w2 / 2);
          break;
        default:
          break;
      }
    }
  }

  function drawHorizontalLadder(x, y) {
    // Code: 90, h
    let color = getFgcolor(x, y, "white");
    drawLine(ctx, xmin - 0.5, ymin, xmax + 0.5, ymin, color);
    drawLine(ctx, xmin - 0.5, ymax, xmax + 0.5, ymax, color);
    drawLine(ctx, xc, ymin, xc, ymax, color);
  }

  function drawHorizontalRope() {
    let d1 = w2 * 0.15;
    let d2 = w1 / 3;
    let x1 = 0;
    let x2 = 0;
    let y1 = yc - d1;
    let y2 = yc + d1;
    drawFilledBox(ctx, xmin, y1, w1, 2 * d1, "#B9A379");
    x1 = xmin;
    for (let i = 0; i < 3; i++) {
      x2 = x1 + d2;
      drawLine(ctx, x1, y1, x2, y2, "#201B11");
      x1 = x1 + d2;
    }
  }

  function drawKey(x, y) {
    let color = getFgcolor(x, y, "silver");
    let d1 = w1 / 4;
    let d2 = w1 / 7;
    let d3 = w1 / 15; // Radius X
    let d4 = w1 / 7;  // Radius Y
    let d5 = w1 / 5;
    let d6 = w1 / 4;
    let d7 = w1 / 7;
    ctx.strokeStyle = color;
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.beginPath();
    ctx.ellipse(Math.round(xmin + d1), Math.round(yc), Math.round(d3), Math.round(d4), 0, 0, 2 * Math.PI, false);
    ctx.stroke();
    drawLine(ctx, xmin + d1 + d3, yc, xmax - d2, yc, color);
    drawLine(ctx, xmax - d2, yc, xmax - d2, yc + d5, color);
    drawLine(ctx, xmax - d6, yc, xmax - d6, yc + d7, color);
  }

  function drawLadder(x, y) {
    // Code: 25, =
    let color = getFgcolor(x, y, "white");
    drawLine(ctx, xmin, ymin - 0.5, xmin, ymax + 0.5, color);
    drawLine(ctx, xmax, ymin - 0.5, xmax, ymax + 0.5, color);
    drawLine(ctx, xmin, yc, xmax, yc, color);
  }

  function drawLaser(laser) {
    let isMirror1 = 0;
    let isMirror2 = 0;
    let maxX = 0;
    let maxY = 0;
    let temp = 0;
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    let xp1 = 0;
    let yp1 = 0;
    let xp2 = 0;
    let yp2 = 0;

    if (laser.length >= 2) {
      for (let i = 1; i < laser.length; i++) {
        isMirror1 = booleanToInt(i !== 1);
        isMirror2 = booleanToInt(i !== (laser.length - 1));
        x1 = laser[i - 1].x - gameVars.scroll.x;
        y1 = laser[i - 1].y - gameVars.scroll.y;
        x2 = laser[i].x - gameVars.scroll.x;
        y2 = laser[i].y - gameVars.scroll.y;
        if (x1 > x2) {
          temp = x1;
          x1 = x2;
          x2 = temp;
          temp = isMirror1;
          isMirror1 = isMirror2;
          isMirror2 = temp;
        }
        if (y1 > y2) {
          temp = y1;
          y1 = y2;
          y2 = temp;
          temp = isMirror1;
          isMirror1 = isMirror2;
          isMirror2 = temp;
        }
        if (((x1 >= 0) && (y1 >= 0) && (x1 < columns) && (y1 < rows)) ||
          ((x2 >= 0) && (y2 >= 0) && (x2 < columns) && (y2 < rows))) {
          // At least one point in displayed area
          if (y1 === y2) {
            // Horizontal line
            xp1 = leftMargin + (x1 * size1) + size1 - (0.5 * size1 * isMirror1);
            xp2 = leftMargin + (x2 * size1) + (0.5 * size1 * isMirror2);
            yp1 = Math.round(topMargin + (y1 * size1) + (0.5 * size1));
            yp2 = yp1;
          } else {
            // Vertical line
            xp1 = leftMargin + (x1 * size1) + (0.5 * size1);
            xp2 = xp1;
            yp1 = Math.round(topMargin + (y1 * size1) + size1 - (0.5 * size1 * isMirror1));
            yp2 = Math.round(topMargin + (y2 * size1) + (0.5 * size1 * isMirror2));
          }
          if (xp1 < leftMargin) { xp1 = leftMargin }
          if (yp1 < topMargin) { yp1 = topMargin }
          if (xp2 < leftMargin) { xp2 = leftMargin }
          if (yp2 < topMargin) { yp2 = topMargin }
          maxX = leftMargin + (columns * size1);
          maxY = topMargin + (rows * size1);
          if (xp1 > maxX) { xp1 = maxX }
          if (yp1 > maxY) { yp1 = maxY }
          if (xp2 > maxX) { xp2 = maxX }
          if (yp2 > maxY) { yp2 = maxY }
          drawLine(ctx, xp1, yp1, xp2, yp2, "yellow");
        }
      }
    }
  }

  function drawLava() {
    if (bitmapLava === null) {
      bitmapLava = createLavaBitmap(32);
    }
    ctx.drawImage(bitmapLava, xmin, ymin, w1, w2);
  }

  function drawLightBlueBall() {
    ctx.drawImage(elements.elementLightBlue, xmin, ymin, w1, w2);
  }

  function drawLightBulb() {
    let d1 = w1 / 2.5;
    let d2 = w2 / 4;
    let d3 = w2 / 4; // Length of screw
    let d4 = d3 / 4;
    let d5 = w2 / 15;
    let d6 = w1 / 2.2;
    drawFilledCircle(ctx, xc, (ymin + yc) / 2, w1 / 4, "#FFFFC5");
    drawFilledBox(ctx, xmin + d1, yc - d2, w1 - (d1 * 2), d2, "#FFFFC5");
    drawFilledBox(ctx, xmin + d1, yc, w1 - (d1 * 2), d3, "silver");
    drawFilledBox(ctx, xmin + d6, yc + d3, w1 - (d6 * 2), d5, "silver");
    for (let i = 0; i < 4; i++) {
      drawLine(ctx, xmin + d1, yc + (d4 * i) + (d4 / 2), xmax - d1, yc + (d4 * i) + d4, "black");
    }
  }

  function drawLockedDoor(x, y) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "brown"));
    const d1 = w2 * 0.35;
    const d2 = w1 * 0.15;
    const d3 = w1 * 0.1;
    const d4 = w1 * 0.25;
    drawFilledCircle(ctx, xc, ymin + d1, d2, "black");
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(xc, ymin + d4);
    ctx.lineTo(xc - d2, ymax - d3);
    ctx.lineTo(xc + d2, ymax - d3);
    ctx.lineTo(xc, ymin + d4);
    ctx.stroke();
    ctx.fill();
  }

  function drawMagnet(x, y, rectangular = false) {
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "#464646"));
    if (rectangular) {
      d1 = w1 / 3;
      d2 = w2 / 2.3;
      drawFilledBox(ctx, xc - (d1 * 0.5), yc - d2, d1, d2, "blue");
      drawFilledBox(ctx, xc - (d1 * 0.5), yc, d1, d2, "red");
      drawText(ctx, xc, yc - (d2 * 0.5), "S", "middle", "black", d2 * 0.7, d1 * 0.9);
      drawText(ctx, xc, yc + (d2 * 0.5), "N", "middle", "black", d2 * 0.7, d1 * 0.9);
    } else {
      d1 = w1 * 0.4; // Outer radius
      d2 = w1 * 0.1; // Inner radius
      d3 = w2 * 0.2; // Height of red part from center
      d4 = w2 * 0.2; // Height of silver color
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(Math.round(xc), Math.round(yc), Math.round(d1), 1 * Math.PI, 0 * Math.PI, false);
      ctx.lineTo(Math.round(xc + d2), Math.round(yc));
      ctx.arc(Math.round(xc), Math.round(yc), Math.round(d2), 0 * Math.PI, 1 * Math.PI, true);
      ctx.lineTo(Math.round(xc - d1), Math.round(yc));
      ctx.fill();
      drawFilledBox(ctx, xc - d1 + 0.5, yc, d1 - d2, d3, "red");
      drawFilledBox(ctx, xc + d2 + 0.5, yc, d1 - d2, d3, "red");
      drawFilledBox(ctx, xc - d1 + 0.5, yc + d3, d1 - d2, d4, "silver");
      drawFilledBox(ctx, xc + d2 + 0.5, yc + d3, d1 - d2, d4, "silver");
    }
  }

  function drawMirror(bottomLeftToUpperRight = true) {
    ctx.lineWidth = 3;
    if (bottomLeftToUpperRight) {
      drawLine(ctx, xmin + 1, ymax - 1, xmax - 1, ymin + 1, "silver");
    } else {
      drawLine(ctx, xmin + 1, ymin + 1, xmax - 1, ymax - 1, "silver");
    }
    ctx.lineWidth = 1;
  }

  function drawMover(x, y) {
    const activeColor = "#16cc16ff";
    let color = "white";
    const d1 = w1 * 0.1;
    const d2 = w1 * 0.1;
    const d3 = w1 * 0.13;
    const d4 = w1 * 0.12;
    let activeSides = ["top"];
    let direction = "right";
    let idx = -1;
    let inverted = false;
    let mode = "all";
    let showInverted = false;
    let xObject = -1;
    let yObject = -1;

    idx = findElementByCoordinates(x, y, gameInfo.movers);
    if (idx >= 0) {
      activeSides = gameInfo.movers[idx].activeSides;
      direction = gameInfo.movers[idx].direction;
      inverted = gameInfo.movers[idx].inverted;
      mode = gameInfo.movers[idx].mode.toLowerCase();
    }
    drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646", true);
    if (activeSides.includes("top")) {
      drawLine(ctx, xmin + d1 + d2, ymin + d1, xmax - d1 - d2, ymin + d1, activeColor);
    }
    if (activeSides.includes("bottom")) {
      drawLine(ctx, xmin + d1 + d2, ymax - d1, xmax - d1 - d2, ymax - d1, activeColor);
    }
    if (activeSides.includes("left")) {
      drawLine(ctx, xmin + d1, ymin + d1 + d2, xmin + d1, ymax - d1 - d2, activeColor);
    }
    if (activeSides.includes("right")) {
      drawLine(ctx, xmax - d1, ymin + d1 + d2, xmax - d1, ymax - d1 - d2, activeColor);
    }
    drawArrow(direction, "white", "#464646", { box: false });

    xObject = xc;
    yObject = yc;
    if (mode !== "all") {
      switch (direction) {
        case "left":
          xObject += w1 * 0.23;
          break;
        case "right":
          xObject -= w1 * 0.23;
          break;
        case "up":
          yObject += w2 * 0.23;
          break;
        case "down":
          yObject -= w2 * 0.23;
          break;
        case "upleft":
          xObject += w1 * 0.15;
          yObject += w2 * 0.15;
          break;
        case "upright":
          xObject -= w1 * 0.15;
          yObject += w2 * 0.15;
          break;
        case "downleft":
          xObject += w1 * 0.15;
          yObject -= w2 * 0.15;
          break;
        case "downright":
          xObject -= w1 * 0.15;
          yObject -= w2 * 0.15;
          break;
        default:
          break;
      }
    }
    showInverted = false;
    if (moverModes().includes(mode) && mode.endsWith("ball")) {
      drawFilledCircle(ctx, xObject, yObject, w1 * 0.14, displayColor(mode.slice(0, mode.length - 4)));
      showInverted = true;
    }
    if (mode === "directionchanger") {
      drawFilledBox(ctx, xObject - d3, yObject - d3, d3 + d3, d3 + d3, displayColor("yellow"), false);
      showInverted = true;
    }
    if (showInverted && inverted) {
      if (mode === "redball") {
        color = "yellow";
      } else {
        color = "red";
      }
      drawLine(ctx, xObject - d4, yObject - d4, xObject + d4, yObject + d4, color);
      drawLine(ctx, xObject - d4, yObject + d4, xObject + d4, yObject - d4, color);
    }
  }

  function drawMusicBox(x, y) {
    let angle = 0;
    let black1start = null;
    let black1width = null;
    let black2start = null;
    let black2width = null;
    let blackHalfWidth = null;
    let direction = "up";
    let idx = -1;
    let lineY = null;
    let line1y1 = null;
    let line1y2 = null;
    let line2y1 = null;
    let line2y2 = null;
    let mode = "note";
    let note = "";
    let notes = ["C4"];
    let part = "bottom";
    let stepsPerMeasure = 0;
    let width3div5 = null;
    let width4div7 = null;

    const musicNoteRatio = 241 / 450;
    const musicNoteMargin = 0.1;
    const musicNoteHeight = w2 * (1 - musicNoteMargin - musicNoteMargin) * 0.9;
    const musicNoteWidth = musicNoteHeight * musicNoteRatio;

    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
      direction = gameInfo.musicBoxes[idx].direction;
      mode = gameInfo.musicBoxes[idx].mode;
      notes = gameInfo.musicBoxes[idx].notes;
      stepsPerMeasure = gameInfo.musicBoxes[idx].stepsPerMeasure;
      part = gameInfo.musicBoxes[idx].part;
    }

    if (mode === "keyboard") {
      if (!validNotesForKeyboardMode(notes)) {
        mode = "note";
      }
    }
    if (mode === "firstcount") {
      if ((notes.length < 2) || (stepsPerMeasure < 2)) {
        mode = "note";
      }
    }

    drawFilledBox(ctx, xmin, ymin, w1, w2, "white");

    switch (mode) {
      case "near":
      case "note":
      case "song":
        drawBox(ctx, xmin, ymin, w1, w2, "black");
        ctx.drawImage(elements.elementMusicNote, xmin + (0.5 * (w1 - musicNoteWidth)), ymin + (musicNoteMargin * w2), musicNoteWidth, musicNoteHeight);
        break;
      case "firstcount":
        drawFilledBox(ctx, xmin, ymin, w1, w2, "red");
        drawText(ctx, xc, yc, "one", "middle", "yellow", w2 * 0.7, w1 * 0.8);
        break;
      case "chord1":
      case "chord2":
      case "chord3":
      case "chord4":
      case "interval1":
      case "interval2":
      case "door":
        drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "brown"));
        drawText(ctx, xc, yc, "♫", "middle", "white", w2 * 0.7, w1 * 0.8);
        break;
      case "keyboard":
        if (notes.length === 1) {
          note = notes[0][0];
          switch (direction) {
            case "down":
              angle = Math.PI;
              break;
            case "left":
              angle = -0.5 * Math.PI;
              break;
            case "right":
              angle = 0.5 * Math.PI;
              break;
            default:
              angle = 0;
              break;
          }
          if (angle !== 0) {
            ctx.save();
            // The rotation center point is always the canvas origin. 
            // To change the center point, the canvas has to be moved by using the translate() method.
            ctx.translate(Math.round(xc), Math.round(yc));
            ctx.rotate(angle);
            ctx.translate(-Math.round(xc), -Math.round(yc));
          }
          if ((part === "top") || (part === "middle")) {
            blackHalfWidth = w1 * (13.7642 / 23.5) * 0.5;
            width3div5 = (w1 * 3) / 5;
            width4div7 = (w1 * 4) / 7;
            black1start = null;
            black1width = null;
            black2start = null;
            black2width = null;
            switch (note) {
              case "C":
                black1start = xmin + (1.5 * width3div5) - blackHalfWidth;
                black1width = w1 - (black1start - xmin);
                break;
              case "D":
                black1start = xmin;
                black1width = (xmin - w1) + (1.5 * width3div5) + blackHalfWidth - xmin;
                black2start = (xmin - w1) + (3.5 * width3div5) - blackHalfWidth;
                black2width = w1 - (black2start - xmin);
                break;
              case "E":
                black1start = xmin;
                black1width = (xmin - (w1 * 2)) + (3.5 * width3div5) + blackHalfWidth - xmin;
                break;
              case "F":
                black1start = xmin + (1.5 * width4div7) - blackHalfWidth;
                black1width = w1 - (black1start - xmin);
                break;
              case "G":
                black1start = xmin;
                black1width = (xmin - w1) + (1.5 * width4div7) + blackHalfWidth - xmin;
                black2start = (xmin - w1) + (3.5 * width4div7) - blackHalfWidth;
                black2width = w1 - (black2start - xmin);
                break;
              case "A":
                black1start = xmin;
                black1width = (xmin - (w1 * 2)) + (3.5 * width4div7) + blackHalfWidth - xmin;
                black2start = (xmin - (w1 * 2)) + (5.5 * width4div7) - blackHalfWidth;
                black2width = w1 - (black2start - xmin);
                break;
              case "B":
                black1start = xmin;
                black1width = (xmin - (w1 * 3)) + (5.5 * width4div7) + blackHalfWidth - xmin;
                break;
              default:
                break;
            }
            if ((black1start !== null) && (black1width !== null)) {
              if (part === "top") {
                drawFilledBox(ctx, black1start - 0.5, ymin - 0.5, black1width + 1, w2 + 1, "black");
              } else {
                drawFilledBox(ctx, black1start - 0.5, ymin - 0.5, black1width + 1, w2 * 0.5, "black");
              }
            }
            if ((black2start !== null) && (black2width !== null)) {
              if (part === "top") {
                drawFilledBox(ctx, black2start - 0.5, ymin - 0.5, black2width + 1, w2 + 1, "black");
              } else {
                drawFilledBox(ctx, black2start - 0.5, ymin - 0.5, black2width + 1, w2 * 0.5, "black");
              }
            }
          }
          // Draw lines
          switch (part) {
            case "top":
              lineY = null;
              break;
            case "middle":
              lineY = yc;
              break;
            case "bottom":
              lineY = ymin - 0.5;
              break;
            default:
              lineY = null;
              break;
          }
          line1y1 = null;
          line1y2 = ymax + 0.5;
          line2y1 = null;
          line2y2 = ymax + 0.5;
          switch (note) {
            case "C":
              line1y1 = ymin - 0.5;
              line2y1 = lineY;
              break;
            case "D":
              line1y1 = lineY;
              line2y1 = lineY;
              break;
            case "E":
              line1y1 = lineY;
              line2y1 = ymin - 0.5;
              break;
            case "F":
              line1y1 = ymin - 0.5;
              line2y1 = lineY;
              break;
            case "G":
              line1y1 = lineY;
              line2y1 = lineY;
              break;
            case "A":
              line1y1 = lineY;
              line2y1 = lineY;
              break;
            case "B":
              line1y1 = lineY;
              line2y1 = ymin - 0.5;
              break;
            default:
              line1y1 = null;
              line2y1 = null;
              break;
          }
          if ((line1y1 !== null) && (line1y2 !== null)) {
            drawLine(ctx, xmin - 0.5, line1y1, xmin - 0.5, line1y2, "black");
          }
          if ((line2y1 !== null) && (line2y2 !== null)) {
            drawLine(ctx, xmax + 0.5, line2y1, xmax + 0.5, line2y2, "black");
          }
          if (angle !== 0) {
            ctx.restore();
          }
        }
        break;
      default:
        break;
    }
  }

  function drawNext() {
    const d1 = w1 * 0.2;
    const d2 = w1 * 0.1;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "darkgreen");
    ctx.lineWidth = 3;
    drawLine(ctx, xc - d2, ymin + d1, xmax - d1 - d2, yc, "white");
    drawLine(ctx, xmax - d1 - d2, yc, xc - d2, ymax - d1, "white");
    ctx.lineWidth = 1;
  }

  function drawNote(x, y, type, dots, color) {
    const size = w1 * 0.8;
    const pxScale = window.devicePixelRatio || 1;
    const minDrawingWidth = 1 / pxScale;
    const lineWidth = Math.max(size * 0.06, minDrawingWidth);
    const rX = size * 0.18 * 0.8;
    const rY = size * 0.14 * 0.8;
    let cx = 0;
    let cy = 0;
    let headRotation = -0.35;
    let offsetX = 0;
    let offsetY = 0;

    switch (type) {
      case "whole":
        offsetX = 0;
        offsetY = 0;
        break;
      case "half":
        offsetX = -0.04;
        offsetY = 0.2;
        break;
      case "quarter":
        offsetX = -0.05;
        offsetY = 0.25;
        break;
      case "eighth":
        offsetX = -0.05;
        offsetY = 0.25;
        break;
      case "sixteenth":
        offsetX = -0.05;
        offsetY = 0.25;
        break;
      default:
        break;
    }
    if (dots > 1) {
      offsetX -= 0.1;
    }
    offsetX = offsetX * size;
    offsetY = offsetY * size;
    cx = x + offsetX;
    cy = y + offsetY;

    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    // ---- Note head ----
    if (type === "whole") {
      headRotation = 0;
    }
    ctx.beginPath();
    ctx.ellipse(cx, cy, rX, rY, headRotation, 0, Math.PI * 2);
    ctx.stroke();
    if ((type !== "whole") && (type !== "half")) {
      ctx.fill();
    }

    // ---- Stem ----
    let stemX = cx + rX;
    let stemBottomY = cy - (size * 0.05);
    let stemTopY = cy - (size * 0.6);

    if (type !== "whole") {
      ctx.beginPath();
      ctx.moveTo(stemX, stemBottomY);
      ctx.lineTo(stemX, stemTopY);
      ctx.stroke();
    }

    // ---- Flags ----
    let flags = 0;
    if (type === "eighth") flags = 1;
    if (type === "sixteenth") flags = 2;

    for (let i = 0; i < flags; i++) {
      const flagSpacing = Math.max(size * 0.15, ctx.lineWidth * 2);
      const offset = i * flagSpacing;
      ctx.beginPath();
      ctx.moveTo(stemX, stemTopY + offset);
      ctx.quadraticCurveTo(
        cx + size * 0.45,
        stemTopY + (size * 0.12) + offset,
        cx + size * 0.35,
        stemTopY + (size * 0.22) + offset
      );
      ctx.stroke();
    }

    // ---- Dot ----
    if (dots > 0) {
      ctx.beginPath();
      ctx.arc(cx + (rX * 2.15), cy - (rY * 0.15), rY * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }
    if (dots > 1) {
      ctx.beginPath();
      ctx.arc(cx + (rX * 2.15) + (w1 * 0.15), cy - (rY * 0.15), rY * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function drawNumber(n) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
    drawText(ctx, xc, yc, n.toString(), "middle", "white", w2 * 0.7, w1 * 0.8);
  }

  function drawOneDirectionDown(x, y) {
    let color = getFgcolor(x, y, "white");
    drawBox(ctx, xmin, ymin, w1, w2, color);
    drawLine(ctx, xmin, ymin, xc, ymax, color);
    drawLine(ctx, xmax, ymin, xc, ymax, color);
  }

  function drawOneDirectionLeft(x, y) {
    let color = getFgcolor(x, y, "white");
    drawBox(ctx, xmin, ymin, w1, w2, color);
    drawLine(ctx, xmax, ymin, xmin, ymin + w2 / 2, color);
    drawLine(ctx, xmax, ymax, xmin, ymin + w2 / 2, color);
  }

  function drawOneDirectionRight(x, y) {
    let color = getFgcolor(x, y, "white");
    drawBox(ctx, xmin, ymin, w1, w2, color);
    drawLine(ctx, xmin, ymin, xmax, ymin + w2 / 2, color);
    drawLine(ctx, xmin, ymax, xmax, ymin + w2 / 2, color);
  }

  function drawOneDirectionUp(x, y) {
    let color = getFgcolor(x, y, "white");
    drawBox(ctx, xmin, ymin, w1, w2, color);
    drawLine(ctx, xmin, ymax, xc, ymin, color);
    drawLine(ctx, xmax, ymax, xc, ymin, color);
  }

  function drawOrangeBall() {
    ctx.drawImage(elements.elementOrange, xmin, ymin, w1, w2);
  }

  function drawPalmTreeTrunkPart() {
    ctx.fillStyle = "brown";
    ctx.strokeStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(xmin + Math.round(w1 * 0.2), ymax + 0.5);
    ctx.lineTo(xmin, ymin);
    ctx.lineTo(xmax, ymin);
    ctx.lineTo(xmin + Math.round(w1 * 0.8), ymax + 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawPanagiotis() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "white");
    drawText(ctx, xc, yc, "π", "middle", "black", w2 * 0.7, w1 * 0.8);
  }

  function drawPart(part) {
    const d1 = w1 * 0.1;
    const d2 = w2 * 0.1;
    const d3 = (w2 - d2 - d2) / 3;
    const d4 = w1 * 0.1;
    const d5 = w1 * 0.1;
    let y = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
    for (let i = 0; i < 4; i++) {
      y = (d3 * i) + ymin + d2;
      drawLine(ctx, xmin + d1, y, xc - d1, y, "white");
    }
    drawLine(ctx, xmin + d1, ymin + d2, xmin + d1, ymax - d2, "white");
    drawLine(ctx, xc - d1, ymin + d2, xc - d1, ymax - d2, "white");
    // arrow
    switch (part) {
      case "top":
        y = yc - d3;
        break;
      case "middle":
        y = yc;
        break;
      case "bottom":
        y = yc + d3;
        break;
      default:
        y = yc;
        break;
    }
    drawLine(ctx, xc, y, xmax - d4, y, "white");
    drawLine(ctx, xc, y, xc + d5, y - d5, "white");
    drawLine(ctx, xc, y, xc + d5, y + d5, "white");
  }

  function drawPattern(x, y, n) {
    let color = getFgcolor(x, y, "#464646");
    let d1 = 0;
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;

    switch (n) {
      case 1:
        d1 = (w1 * 0.25) + 1;
        drawFilledBox(ctx, ((xmin + xc) / 2) - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, color);
        drawFilledBox(ctx, ((xmax + xc) / 2) - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, color);
        break;
      case 2:
        d1 = (w1 * 0.25) + 1;
        drawFilledBox(ctx, xmin - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, color);
        drawFilledBox(ctx, xc - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, color);
        break;
      case 3:
        ctx.lineWidth = w2 * 0.25;
        drawLine(ctx, xmin - 0.5, (ymin + yc) / 2, xmax + 0.5, (ymin + yc) / 2, color);
        drawLine(ctx, xmin - 0.5, (yc + ymax) / 2, xmax + 0.5, (yc + ymax) / 2, color);
        break;
      case 4:
        ctx.lineWidth = w1 * 0.25;
        drawLine(ctx, (xmin + xc) / 2, ymin - 0.5, (xmin + xc) / 2, ymax + 0.5, color);
        drawLine(ctx, (xc + xmax) / 2, ymin - 0.5, (xc + xmax) / 2, ymax + 0.5, color);
        break;
      case 5:
      case 7:
        d1 = w2 * 0.05;
        y1 = ((ymin + yc) / 2) - d1;
        y2 = ((ymin + yc) / 2) + d1;
        drawLine(ctx, xmin - 0.5, y1, xmax + 0.5, y1, color);
        drawLine(ctx, xmin - 0.5, y2, xmax + 0.5, y2, color);
        y1 = ((yc + ymax) / 2) - d1;
        y2 = ((yc + ymax) / 2) + d1;
        drawLine(ctx, xmin - 0.5, y1, xmax + 0.5, y1, color);
        drawLine(ctx, xmin - 0.5, y2, xmax + 0.5, y2, color);
        if (n === 7) {
          ctx.lineWidth = 2;
          drawLine(ctx, xc, ymin - 0.5, xc, ymax + 0.5, color);
        }
        break;
      case 6:
      case 8:
        d1 = w2 * 0.05;
        x1 = ((xmin + xc) / 2) - d1;
        x2 = ((xmin + xc) / 2) + d1;
        drawLine(ctx, x1, ymin - 0.5, x1, ymax + 0.5, color);
        drawLine(ctx, x2, ymin - 0.5, x2, ymax + 0.5, color);
        x1 = ((xc + xmax) / 2) - d1;
        x2 = ((xc + xmax) / 2) + d1;
        drawLine(ctx, x1, ymin - 0.5, x1, ymax + 0.5, color);
        drawLine(ctx, x2, ymin - 0.5, x2, ymax + 0.5, color);
        if (n === 8) {
          ctx.lineWidth = 2;
          drawLine(ctx, xmin - 0.5, yc, xmax + 0.5, yc, color);
        }
        break;
      case 9:
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(xc, ymin);
        ctx.lineTo(xmax, yc);
        ctx.lineTo(xc, ymax);
        ctx.lineTo(xmin, yc);
        ctx.lineTo(xc, ymin);
        ctx.fill();
        break;
      default:
        break;
    }
    ctx.lineWidth = 1;
  }

  function drawPhaseAbility() {
    const patternCanvas = document.createElement("canvas");
    const width = Math.max(1, Math.round(w1 / 15));
    patternCanvas.width = width * 2;
    patternCanvas.height = width * 2;
    const pctx = patternCanvas.getContext("2d");
    pctx.fillStyle = "blue";
    pctx.fillRect(0, 0, width, width * 2);
    const pattern = ctx.createPattern(patternCanvas, "repeat");

    drawFilledCircle(ctx, w1 * 0.5 + xmin, w1 * 0.25 + ymin, w1 * 0.25, pattern);
    const d1 = w1 * 0.09;
    const d2 = w1 * 0.22;
    const d3 = w1 * 0.05;
    drawFilledCircle(ctx, xc - d1, ymin + d2, d3, "white");
    drawFilledCircle(ctx, xc + d1, ymin + d2, d3, "white");
    ctx.strokeStyle = "white";
    ctx.beginPath();
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(xc, ymin + (w2 * 0.17), w1 * 0.2, w1 * 0.2, 0, 0.3 * Math.PI, 0.7 * Math.PI, false);
    ctx.stroke();
  }

  function drawPickaxe(x, y) {
    let color = getFgcolor(x, y, "silver");
    let d1 = w1 / 4;
    let d2 = w1 / 4;
    let d3 = w1 / 3;
    ctx.lineWidth = 3;
    drawLine(ctx, xmin + d1, ymin + d1, xmax - d2, ymax - d2, color);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.beginPath();
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(xc + d3, yc + d3, w1 * 0.7, w2 * 0.7, 0, 1.1 * Math.PI, 1.4 * Math.PI, false);
    ctx.stroke();
  }

  function drawPinkBall() {
    ctx.drawImage(elements.elementPink, xmin, ymin, w1, w2);
  }

  function drawPiston(x, y, direction) {
    let color = "gray";
    let d1 = w1 * 0.1;
    let d2 = w1 * 0.75; // Height of box
    let d3 = w1 * 0.1;
    let d4 = 0;
    let d5 = 0;
    let d6 = 0.5;
    let idx = -1;
    let activated = false;
    let group = 0;
    let inverted = false;
    let mode = "toggle";
    let showGroup = false;
    let sticky = false;
    let triesToActivate = false;
    let triggerPressed = false;
    let text = "";
    const textHeight = w2 * 0.6;
    const textMaxWidth = w1 * 0.6;

    idx = findElementByCoordinates(x, y, gameInfo.pistons);
    if (idx >= 0) {
      activated = gameInfo.pistons[idx].activated;
      group = gameInfo.pistons[idx].group;
      inverted = gameInfo.pistons[idx].inverted;
      mode = gameInfo.pistons[idx].mode;
      sticky = gameInfo.pistons[idx].sticky;
    }
    showGroup = !mode.includes("ball");
    switch (mode) {
      case "blueball":
        color = "blue";
        break;
      case "whiteball":
        color = "white";
        break;
      case "lightblueball":
        color = displayColor("lightblue");
        break;
      case "yellowball":
        color = "yellow";
        break;
      case "redball":
        color = "red";
        break;
      case "purpleball":
        color = displayColor("purple");
        break;
      case "orangeball":
        color = displayColor("orange");
        break;
      case "pinkball":
        color = displayColor("pink");
        break;
      default:
        color = "gray";
        break;
    }
    if ((mode === "toggle") && (gameVars.pistonGroupsActivated[group - 1] !== inverted)) {
      triesToActivate = true;
    }
    if (mode === "momentary") {
      triggerPressed = false;
      for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        const pistonsTrigger = gameInfo.pistonsTriggers[i];
        if (pistonsTrigger.pressed && (pistonsTrigger.group === group)) {
          triggerPressed = true;
        }
      }
      if (triggerPressed !== inverted) {
        triesToActivate = true;
      }
    }
    text = group.toString();
    if (sticky) {
      text += "S";
    }
    if (triesToActivate && !activated) {
      text += "!";
    }
    if (activated) {
      d4 = 0;
    } else {
      d4 = d3 * 0.5;
    }
    switch (direction) {
      case "down":
        drawFilledBox(ctx, xmin, ymin, w1, d2, color, true);
        if (!activated) {
          drawFilledBox(ctx, xmin + d1, ymax - d3, w1 - d1 - d1, d3 + d6, "brown");
        }
        drawFilledBox(ctx, xc - d1, ymin + d2 + d5, d1 + d1, w2 - (d2 + d4 + d5), "brown");
        if (showGroup) {
          drawText(ctx, xc, yc - d3, text, "middle", "black", textHeight, textMaxWidth);
        }
        break;
      case "left":
        drawFilledBox(ctx, xmax - d2, ymin, d2, w2, color, true);
        if (!activated) {
          drawFilledBox(ctx, xmin, ymin + d1, d3 + d6, w2 - d1 - d1, "brown");
        }
        drawFilledBox(ctx, xmin + d4, yc - d1, w1 - (d2 + d4 + d5), d1 + d1, "brown");
        if (showGroup) {
          drawText(ctx, xc + d3, yc, text, "middle", "black", textHeight, textMaxWidth);
        }
        break;
      case "right":
        drawFilledBox(ctx, xmin, ymin, d2, w2, color, true);
        if (!activated) {
          drawFilledBox(ctx, xmax - d3, ymin + d1, d3 + d6, w2 - d1 - d1, "brown");
        }
        drawFilledBox(ctx, xmin + d2 + d5, yc - d1, w1 - (d2 + d4 + d5), d1 + d1, "brown");
        if (showGroup) {
          drawText(ctx, xc - d3, yc, text, "middle", "black", textHeight, textMaxWidth);
        }
        break;
      case "up":
        drawFilledBox(ctx, xmin, ymax - d2, w1, d2, color, true);
        if (!activated) {
          drawFilledBox(ctx, xmin + d1, ymin, w1 - d1 - d1, d3 + d6, "brown");
        }
        drawFilledBox(ctx, xc - d1, ymin + d4, d1 + d1, w2 - (d2 + d4 + d5), "brown");
        if (showGroup) {
          drawText(ctx, xc, yc + d3, text, "middle", "black", textHeight, textMaxWidth);
        }
        break;
      default:
        break;
    }
  }

  function drawPistonExtendedPart(direction) {
    let d1 = w1 * 0.1;
    let d2 = w1 * 0.1;
    let d3 = 0.5;

    switch (direction) {
      case "down":
        drawFilledBox(ctx, xmin + d1, ymax - d2, w1 - d1 - d1, d2 + d3, "brown");
        drawFilledBox(ctx, xc - d1, ymin, d1 + d1, w2 - (d2 * 0.5), "brown");
        break;
      case "left":
        drawFilledBox(ctx, xmin, ymin + d1, d2 + d3, w2 - d1 - d1, "brown");
        drawFilledBox(ctx, xmin + (d2 * 0.5), yc - d1, w1 - (d2 * 0.5), d1 + d1, "brown");
        break;
      case "right":
        drawFilledBox(ctx, xmax - d2, ymin + d1, d2 + d3, w2 - d1 - d1, "brown");
        drawFilledBox(ctx, xmin, yc - d1, w1 - (d2 * 0.5), d1 + d1, "brown");
        break;
      case "up":
        drawFilledBox(ctx, xmin + d1, ymin, w1 - d1 - d1, d2 + d3, "brown");
        drawFilledBox(ctx, xc - d1, ymin + (d2 * 0.5), d1 + d1, w2 - (d2 * 0.5), "brown");
        break;
      default:
        break;
    }
  }

  function drawPistonsTrigger(x, y) {
    let color = getFgcolor(x, y, "#DCDCDC");
    let d1 = w1 / 7;
    let d2 = w1 / 2;
    let d3 = w1 / 8;
    let d4 = w1 / 6;
    let group = 0;
    let idx = 0;

    idx = findElementByCoordinates(x, y, gameInfo.pistonsTriggers);
    if (idx >= 0) {
      group = gameInfo.pistonsTriggers[idx].group;
    }
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "gray", true);
    drawLine(ctx, xc, ymin + d3, xc, ymin + d2, color);
    drawLine(ctx, xc - d4, ymin + d3, xc + d4, ymin + d3, color);
    drawText(ctx, xc, ymin + w2 * 0.75, group.toString(), "middle", "black", w2 * 0.4, w1 * 0.54);
  }

  function drawPrevious() {
    const d1 = w1 * 0.2;
    const d2 = w1 * 0.1;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "darkgreen");
    ctx.lineWidth = 3;
    drawLine(ctx, xc + d2, ymin + d1, xmin + d1 + d2, yc, "white");
    drawLine(ctx, xmin + d1 + d2, yc, xc + d2, ymax - d1, "white");
    ctx.lineWidth = 1;
  }


  function drawPropeller(offsetY = 0) {
    let d1 = w1 * 0.1;
    let d2 = w1 * 0.05;
    let d3 = w1 * 0.2;
    let pt1 = { x: 0, y: 0 };
    let pt2 = { x: 0, y: 0 };
    let pt3 = { x: 0, y: 0 };
    let pt4 = { x: 0, y: 0 };

    drawLine(ctx, xc, Math.round(ymin + d3 + (d2 * 0.5) + offsetY), xc, Math.round(ymin + d3 + d1 + offsetY), "lightgray");
    pt1.x = xmin;
    pt1.y = Math.round(ymin + d3 + (d2 * 0.5) + offsetY);
    pt2.x = Math.round(xc - d1);
    pt2.y = Math.round(ymin + d3 + offsetY);
    pt3.x = xc;
    pt3.y = Math.round(ymin + d3 + (d2 * 0.5) + offsetY);
    pt4.x = Math.round(xc - d1);
    pt4.y = Math.round(ymin + d3 + d2) + offsetY;
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.fillStyle = "lightgray";
    ctx.strokeStyle = "gray";
    ctx.fill();
    ctx.stroke();
    pt1.x = xmax;
    pt2.x = Math.round(xc + d1);
    pt3.x = xc;
    pt4.x = Math.round(xc + d1);
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt4.x, pt4.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.fill();
    ctx.stroke();
  }

  function drawPurpleBall() {
    ctx.drawImage(elements.elementPurple, xmin, ymin, w1, w2);
  }

  function drawPusher(x, y) {
    let fillColor = "#464646";
    let direction = "right";
    let group = 1;
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.pushers);
    if (idx >= 0) {
      direction = gameInfo.pushers[idx].direction;
      group = gameInfo.pushers[idx].group;
    }

    const width = w1;
    const height = w2;
    const radius = Math.max(1, Math.round(Math.min(width, height) / 2) - 0.5);

    switch (direction) {
      case "left":
        drawFilledBox(ctx, xc, ymin, width / 2, height, fillColor, false);
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        // arc(x, y, radius, startAngle, endAngle, counterclockwise)
        ctx.arc(xc, yc, radius, 0.5 * Math.PI, 1.5 * Math.PI);
        ctx.fill();
        break;
      case "right":
        drawFilledBox(ctx, xmin, ymin, width / 2, height, fillColor, false);
        ctx.beginPath();
        ctx.arc(xc, yc, radius, 1.5 * Math.PI, 0.5 * Math.PI);
        ctx.fill();
        break;
      case "up":
        drawFilledBox(ctx, xmin, yc, width, height / 2, fillColor, false);
        ctx.beginPath();
        ctx.arc(xc, yc, radius, 1 * Math.PI, 2 * Math.PI);
        ctx.fill();
        break;
      case "down":
        drawFilledBox(ctx, xmin, ymin, width, height / 2, fillColor, false);
        ctx.beginPath();
        ctx.arc(xc, yc, radius, 2 * Math.PI, 1 * Math.PI);
        ctx.fill();
        break;
      default:
        drawFilledBox(ctx, xmin, ymin, width, height, fillColor, true);
        break;
    }

    // Draw shadows

    const edge = Math.max(1, Math.round(Math.min(w1, w2) * 0.06));

    // base colours (box / arc)
    const lightBox = "rgba(255,255,255,0.25)";
    const darkBox = "rgba(0,0,0,0.35)";
    const lightArc = "rgba(255,255,255,0.10)";
    const darkArc = "rgba(0,0,0,0.20)";

    let rectX = 0, rectY = 0, rectW = 0, rectH = 0;
    let a1 = 0, a2 = 0;
    switch (direction) {
      case "left":
        rectX = Math.round(xc); rectY = Math.round(ymin); rectW = Math.round(width / 2); rectH = Math.round(height);
        a1 = Math.PI / 2; a2 = Math.PI * 1.5;
        break;
      case "right":
        rectX = Math.round(xmin); rectY = Math.round(ymin); rectW = Math.round(width / 2); rectH = Math.round(height);
        a1 = -Math.PI / 2; a2 = Math.PI / 2;
        break;
      case "up":
        rectX = Math.round(xmin); rectY = Math.round(yc); rectW = Math.round(width); rectH = Math.round(height / 2);
        a1 = Math.PI; a2 = Math.PI * 2;
        break;
      case "down":
        rectX = Math.round(xmin); rectY = Math.round(ymin); rectW = Math.round(width); rectH = Math.round(height / 2);
        a1 = 0; a2 = Math.PI;
        break;
      default:
        rectW = rectH = 0;
        break;
    }

    let seamSide = null;
    if (direction === "left") seamSide = "left";
    if (direction === "right") seamSide = "right";
    if (direction === "up") seamSide = "top";
    if (direction === "down") seamSide = "bottom";

    let rectTopCol = lightBox;
    let rectLeftCol = lightBox;
    let rectBottomCol = darkBox;
    let rectRightCol = darkBox;
    let arcLightCol = lightArc;
    let arcDarkCol = darkArc;

    if (direction === "left") {
      const tmp = rectTopCol; rectTopCol = arcLightCol; arcLightCol = tmp;
    }
    if (direction === "up") {
      const tmp = rectLeftCol; rectLeftCol = arcLightCol; arcLightCol = tmp;
    }
    if (direction === "down") {
      const tmp = rectRightCol; rectRightCol = arcDarkCol; arcDarkCol = tmp;
    }

    // Rectangle shadows
    if (rectW > 0 && rectH > 0) {
      if (seamSide !== "top") {
        ctx.fillStyle = rectTopCol;
        ctx.fillRect(rectX, rectY, rectW, edge);
      }
      if (seamSide !== "left") {
        ctx.fillStyle = rectLeftCol;
        ctx.fillRect(rectX, rectY, edge, rectH);
      }
      if (seamSide !== "bottom") {
        ctx.fillStyle = rectBottomCol;
        ctx.fillRect(rectX, rectY + rectH - edge, rectW, edge);
      }
      if (seamSide !== "right") {
        ctx.fillStyle = rectRightCol;
        ctx.fillRect(rectX + rectW - edge, rectY, edge, rectH);
      }
    }

    // Semicircle shadows
    const lightStart = Math.PI * 0.75;  // 135°
    const lightEnd = Math.PI * 1.75;  // 315°
    const darkStart = lightEnd;
    const darkEnd = lightStart + Math.PI * 2; // wrap-around
    const rStroke = Math.max(0.5, radius - edge / 2 - 0.5);

    // clip to semicircle
    ctx.save();
    ctx.beginPath();
    ctx.arc(xc, yc, Math.max(0.5, radius - 0.5), a1, a2, false); // outer semicircle path
    ctx.lineTo(xc, yc);
    ctx.closePath();
    ctx.clip();

    ctx.beginPath();
    ctx.arc(xc, yc, rStroke, lightStart, lightEnd, false);
    ctx.lineWidth = edge;
    ctx.strokeStyle = arcLightCol;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(xc, yc, rStroke, darkStart, darkEnd, false);
    ctx.lineWidth = edge;
    ctx.strokeStyle = arcDarkCol;
    ctx.stroke();

    ctx.restore();

    ctx.lineWidth = 1;
    drawText(ctx, xc, yc, group.toString(), "middle", "white", w2 * 0.7, w1 * 0.8);
  }

  function drawQuarterCircleStoneBottomLeft(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(Math.round(xmin - 0.5), Math.round(ymax + 0.5), Math.round(w1 - 0.5), 2 * Math.PI, 1.5 * Math.PI, true);
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawQuarterCircleStoneBottomRight(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.arc(Math.round(xmax + 0.5), Math.round(ymax + 0.5), Math.round(w1 - 0.5), 1.5 * Math.PI, 1 * Math.PI, true);
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawQuestionStone(x, y) {
    let question = "1+1";
    let idx = 0;

    idx = findElementByCoordinates(x, y, gameInfo.questionStones);
    if (idx >= 0) {
      question = gameInfo.questionStones[idx].question;
    }
    drawStone(x, y);
    drawText(ctx, xc, yc, question, "middle", "white", w2 * 0.7, w1 * 0.8);
  }

  function drawQuarterCircleStoneTopLeft(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.arc(Math.round(xmin - 0.5), Math.round(ymin - 0.5), Math.round(w1 - 0.5), 0.5 * Math.PI, 0 * Math.PI, true);
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawQuarterCircleStoneTopRight(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.arc(Math.round(xmax + 0.5), Math.round(ymin - 0.5), Math.round(w1 - 0.5), 1 * Math.PI, 0.5 * Math.PI, true);
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawQuarterStone(x, y, location) {
    const color = getFgcolor(x, y, "#464646");
    const half = w1 / 2;

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      switch (location) {
        case "bottomLeft":
          drawFilledBox(ctx, xmin, yc, half, half, color);
          break;
        case "bottomRight":
          drawFilledBox(ctx, xc, yc, half, half, color);
          break;
        case "topLeft":
          drawFilledBox(ctx, xmin, ymin, half, half, color);
          break;
        case "topRight":
          drawFilledBox(ctx, xc, ymin, half, half, color);
          break;
        default:
          break;
      }
    } else {
      switch (location) {
        case "bottomLeft":
          ctx.drawImage(stoneLayer, xmin - leftMargin, yc - topMargin, half, half, xmin, yc, half, half);
          break;
        case "bottomRight":
          ctx.drawImage(stoneLayer, xc - leftMargin, yc - topMargin, half, half, xc, yc, half, half);
          break;
        case "topLeft":
          ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, half, half, xmin, ymin, half, half);
          break;
        case "topRight":
          ctx.drawImage(stoneLayer, xc - leftMargin, ymin - topMargin, half, half, xc, ymin, half, half);
          break;
        default:
          break;
      }
    }
  }

  function drawRaster() {
    let d1 = w1 / 3;

    //drawBox(ctx, xmin, ymin, w1, w2, "white");
    drawLine(ctx, xmin + d1, ymin, xmin + d1, ymax, "#777777");
    drawLine(ctx, xmin + d1 + d1, ymin, xmin + d1 + d1, ymax, "#777777");
    drawLine(ctx, xmin, ymin + d1, xmax, ymin + d1, "#777777");
    drawLine(ctx, xmin, ymin + d1 + d1, xmax, ymin + d1 + d1, "#777777");
  }

  function drawRedBall() {
    if (gameVars.gravity === "up") {
      ctx.save();
      ctx.translate(Math.round(xc), Math.round(yc));
      ctx.rotate(Math.PI);
      ctx.translate(-Math.round(xc), -Math.round(yc));
    }
    ctx.drawImage(elements.elementRed, xmin, ymin, w1, w2);
    if (gameVars.gravity === "up") {
      ctx.restore();
    }
  }

  function drawShrinker() {
    const d1 = 0.05;
    ctx.lineWidth = 2;
    ctx.setLineDash([2, 2]);
    drawCircle(ctx, w1 * (0.25 + d1) + xmin, w1 * (0.25 + d1) + ymin, w1 * 0.25, "white");
    ctx.setLineDash([]);
    drawCircle(ctx, xmax - (w1 * (0.125 + d1)), w1 * (0.125 + d1) + ymin, w1 * 0.125, "white");
    ctx.lineWidth = 1;
  }

  function drawSides() {
    const color = "white";
    const d1 = w1 * 0.1;
    const d2 = w1 * 0.1;
    drawLine(ctx, xmin + d1 + d2, ymin + d1, xmax - d1 - d2, ymin + d1, color);
    ctx.setLineDash([2, 2]);
    drawLine(ctx, xmin + d1 + d2, ymax - d1, xmax - d1 - d2, ymax - d1, color);
    drawLine(ctx, xmin + d1, ymin + d1 + d2, xmin + d1, ymax - d1 - d2, color);
    drawLine(ctx, xmax - d1, ymin + d1 + d2, xmax - d1, ymax - d1 - d2, color);
    ctx.setLineDash([]);
  }

  function drawSmallBall(color) {
    drawFilledCircle(ctx, w1 * 0.5 + xmin, w1 * 0.25 + ymin, w1 * 0.25, color, true);
    if (color === "red") {
      const d1 = w1 * 0.09;
      const d2 = w1 * 0.22;
      const d3 = w1 * 0.05;
      const d4 = w1 * 0.12;
      const d5 = w1 * 0.35;
      drawFilledCircle(ctx, xc - d1, ymin + d2, d3, "white");
      drawFilledCircle(ctx, xc + d1, ymin + d2, d3, "white");
      drawLine(ctx, xc - d4, ymin + d5, xc + d4, ymin + d5, "white");
    }
  }

  function drawSmallGreenBall() {
    ctx.drawImage(elements.elementGreen, xmin + w1 * 0.25, ymin, w1 * 0.5, w2 * 0.5);
  }

  function drawSmallLadder() {
    let d1 = w1 / 8;
    let d2 = w2 / 8;
    drawLine(ctx, xc - d1, ymin, xc - d1, yc, "white");
    drawLine(ctx, xc + d1, ymin, xc + d1, yc, "white");
    drawLine(ctx, xc - d1, ymin + d2, xc + d1, ymin + d2, "white");
    drawLine(ctx, xc - d1, yc - d2, xc + d1, yc - d2, "white");
  }

  function drawSmallWeakStone() {
    if (bitmapWeakStone === null) {
      bitmapWeakStone = createWeakStoneBitmap(32);
    }
    ctx.drawImage(bitmapWeakStone, xmin + (w1 / 4), ymin, w1 / 2, w2 / 2);
  }

  function drawSpike(x, y, direction) {
    ctx.fillStyle = getFgcolor(x, y, "#464646");
    ctx.beginPath();
    switch (direction) {
      case "down":
        ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
        ctx.lineTo(Math.round(xc), Math.round(ymax + 0.5));
        ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
        ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
        break;
      case "right":
        ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
        ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
        ctx.lineTo(Math.round(xmax + 0.5), Math.round(yc));
        ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
        break;
      case "left":
        ctx.moveTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
        ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
        ctx.lineTo(Math.round(xmin - 0.5), Math.round(yc));
        ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
        break;
      default:
        // up
        ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
        ctx.lineTo(Math.round(xc), Math.round(ymin - 0.5));
        ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
        ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
        break;
    }
    ctx.fill();
  }

  function drawStone(x, y) {
    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "#464646"));
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }
  }

  function drawStonePatternIcon(icon) {
    const d1 = w1 * 0.25;
    const d2 = w1 * 0.2;
    const d3 = w1 * 0.1;

    ctx.drawImage(elements.elementPattern, xmin, ymin, w1, w2);
    ctx.lineWidth = 3;
    switch (icon) {
      case "ignore":
        drawLine(ctx, xmin + d1, ymin + d1, xmax - d1, ymax - d1, "white");
        drawLine(ctx, xmax - d1, ymin + d1, xmin + d1, ymax - d1, "white");
        break;
      case "next":
        drawLine(ctx, xc - d3, ymin + d2, xmax - d2 - d3, yc, "white");
        drawLine(ctx, xmax - d2 - d3, yc, xc - d3, ymax - d2, "white");
        break;
      default:
        break;
    }
    ctx.lineWidth = 1;
  }

  function drawStoneShape(x, y, shape) {
    let points = null;
    const x_c = xc;
    const y_c = yc;
    const x_min = Math.round(xmin - 0.5);
    const y_min = Math.round(ymin - 0.5);
    const x_max = Math.round(xmax + 0.5);
    const y_max = Math.round(ymax + 0.5);

    switch (shape) {
      case -1:
        // For making new shapes
        points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        break;
      case 210:
        points = [{ x: x_min, y: y_max }, { x: x_min, y: y_min }, { x: x_c, y: y_max }];
        break;
      case 211:
        points = [{ x: x_min, y: y_min }, { x: x_max, y: y_min }, { x: x_min, y: y_c }];
        break;
      case 212:
        points = [{ x: x_max, y: y_min }, { x: x_max, y: y_max }, { x: x_c, y: y_min }];
        break;
      case 213:
        points = [{ x: x_max, y: y_max }, { x: x_min, y: y_max }, { x: x_max, y: y_c }];
        break;
      case 214:
        points = [{ x: x_max, y: y_max }, { x: x_c, y: y_max }, { x: x_max, y: y_min }];
        break;
      case 215:
        points = [{ x: x_min, y: y_max }, { x: x_min, y: y_c }, { x: x_max, y: y_max }];
        break;
      case 216:
        points = [{ x: x_min, y: y_min }, { x: x_c, y: y_min }, { x: x_min, y: y_max }];
        break;
      case 217:
        points = [{ x: x_max, y: y_min }, { x: x_max, y: y_c }, { x: x_min, y: y_min }];
        break;
      case 218:
        points = [{ x: x_min, y: y_max }, { x: x_min, y: y_min }, { x: x_c, y: y_min }, { x: x_max, y: y_max }];
        break;
      case 219:
        points = [{ x: x_min, y: y_min }, { x: x_max, y: y_min }, { x: x_max, y: y_c }, { x: x_min, y: y_max }];
        break;
      case 220:
        points = [{ x: x_max, y: y_min }, { x: x_max, y: y_max }, { x: x_c, y: y_max }, { x: x_min, y: y_min }];
        break;
      case 221:
        points = [{ x: x_max, y: y_max }, { x: x_min, y: y_max }, { x: x_min, y: y_c }, { x: x_max, y: y_min }];
        break;
      case 222:
        points = [{ x: x_max, y: y_max }, { x: x_min, y: y_max }, { x: x_c, y: y_min }, { x: x_max, y: y_min }];
        break;
      case 223:
        points = [{ x: x_min, y: y_max }, { x: x_min, y: y_min }, { x: x_max, y: y_c }, { x: x_max, y: y_max }];
        break;
      case 224:
        points = [{ x: x_min, y: y_min }, { x: x_max, y: y_min }, { x: x_c, y: y_max }, { x: x_min, y: y_max }];
        break;
      case 225:
        points = [{ x: x_max, y: y_min }, { x: x_max, y: y_max }, { x: x_min, y: y_c }, { x: x_min, y: y_min }];
        break;
      default:
        points = null;
        break;
    }

    if (!points) {
      return;
    }

    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];
      if (i === 0) {
        ctx.moveTo(pt.x, pt.y);
      } else {
        ctx.lineTo(pt.x, pt.y);
      }
    }
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawTeleportsCreator(selfDestructing) {
    const d1 = w1 * 0.1;
    const d2 = w1 * 0.2;
    ctx.lineWidth = 2;
    if (selfDestructing) {
      ctx.setLineDash([2, 2]);
    } else {
      ctx.setLineDash([]);
    }
    drawBox(ctx, xc - d2, ymin + d1, d2 * 2, d2 * 2, "white");
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
  }

  function drawTimeBomb(x, y) {
    const sticks = 4;
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "#464646"), true);
    let factor = 0.1;
    let d1 = w1 / 6;
    let d2 = w2 / 2.5;
    let d3 = w1 / 6;
    for (let i = 0; i < sticks; i++) {
      drawFilledBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "red");
      drawBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "black");
    }
    drawLine(ctx, xc - d3, ymin + d2, xc - d3, ymin + d2 + (sticks * w2 * factor), "black");
    drawLine(ctx, xc + d3, ymin + d2, xc + d3, ymin + d2 + (sticks * w2 * factor)), "black";
    drawFilledCircle(ctx, xc, ymin + d2 + (sticks * 0.5 * w2 * factor), w1 * 0.15, "white");
    drawCircle(ctx, xc, ymin + d2 + (sticks * 0.5 * w2 * factor), w1 * 0.15, "black");
    drawLine(ctx, xc, ymin + d2 + (sticks * 0.5 * w2 * factor), xc, ymin + d2 + (sticks * 0.5 * w2 * factor) - (w2 * 0.12), "black");
    drawLine(ctx, xc, ymin + d2 + (sticks * 0.5 * w2 * factor), xc + (w1 * 0.08), ymin + d2 + (sticks * 0.5 * w2 * factor), "black");
  }

  function drawTimeFreezer(x, y) {
    let color = getFgcolor(x, y, "white");
    let radius = w1 * 0.25;
    let xCenter = xc;
    let yCenter = (ymin + yc) / 2;
    // clock
    drawCircle(ctx, xCenter, yCenter, radius, color);
    drawLine(ctx, xCenter, yCenter, xCenter, yCenter - (radius * 0.8), color);
    drawLine(ctx, xCenter, yCenter, xCenter + (radius * 0.7), yCenter, color);
    // cross
    radius = w1 * 0.2
    xCenter = xmax - (w1 * 0.3);
    yCenter = ymax - (w2 * 0.5);
    ctx.lineWidth = 2;
    drawLine(ctx, xCenter - radius, yCenter + radius, xCenter + radius, yCenter - radius, "red");
    drawLine(ctx, xCenter - radius, yCenter - radius, xCenter + radius, yCenter + radius, "red");
    ctx.lineWidth = 1;
  }

  function drawTrapDoor() {
    ctx.lineWidth = 3;
    drawLine(ctx, xmin, ymin + 1, xmax - 2, ymin + 1, "#464646");
    ctx.lineWidth = 1;
  }

  function drawTrapDoorHalfOpen() {
    let d1 = Math.round(w1 / Math.sqrt(2));
    ctx.lineWidth = 3;
    drawLine(ctx, xmin - 1, ymin + 1, xmin + d1, ymin + d1, "#464646");
    ctx.lineWidth = 1;
  }

  function drawTravelGate(x, y) {
    let color = getFgcolor(x, y, "white");
    ctx.lineWidth = 3;
    drawCircle(ctx, xc, yc, (w1 * 0.5) - 1, color);
    ctx.lineWidth = 1;
  }

  function drawTriangleStoneBottomLeft(x, y) {
    // Shape: |\, code: 15, G
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawTriangleStoneBottomRight(x, y) {
    // Shape: /|, code: 16, H
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawTriangleStoneTopLeft(x, y) {
    // Shape: |/, code: 17, I
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawTriangleStoneTopRight(x, y) {
    // Shape: \|, code: 18, J
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.closePath();
    ctx.clip();

    if ((gameVars.stonePattern === 0) || ignorePatternForCell(gameVars, x, y)) {
      ctx.fillStyle = getFgcolor(x, y, "#464646");
      ctx.fill();
    } else {
      ctx.drawImage(stoneLayer, xmin - leftMargin, ymin - topMargin, w1, w2, xmin, ymin, w1, w2);
    }

    ctx.restore();
  }

  function drawTropicalFish(x, y) {
    let direction = -1
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx >= 0) {
      direction = gameInfo.tropicalFish[idx].direction;
    }
    drawFish(ctx, xc, yc, w1, direction !== 6, true);
  }

  function drawVerticalRope() {
    let d1 = w2 / 3;
    let d2 = w1 * 0.15;
    let x1 = xc - d2;
    let x2 = xc + d2;
    let y1 = 0;
    let y2 = 0;
    drawFilledBox(ctx, x1, ymin, 2 * d2, w2, "#B9A379");
    y1 = ymin;
    for (let i = 0; i < 3; i++) {
      y2 = y1 + d1;
      drawLine(ctx, x1, y1, x2, y2, "#201B11");
      y1 = y1 + d1;
    }
  }

  function drawWater() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "#00005A");
  }

  function drawWaterSurface() {
    let pt1 = { x: 0, y: 0 };
    let pt2 = { x: 0, y: 0 };
    let pt3 = { x: 0, y: 0 };
    let waterLevel1 = ymin + 1;
    let waterLevel2 = Math.round(ymin + (ymax - ymin) * 0.2);

    pt1.x = xmin;
    pt1.y = waterLevel2;
    switch (wave) {
      case 1:
        pt2.x = (xmin + xc) / 2;
        break;
      case 2:
        pt2.x = xc;
        break;
      case 3:
        pt2.x = (xc + xmax) / 2;
        break;
      case 4:
        pt2.x = xmax;
        break;
      default:
        pt2.x = xc;
        break;
    }
    pt2.y = waterLevel1;
    pt3.x = xmax;
    pt3.y = waterLevel2;
    drawFilledBox(ctx, xmin, waterLevel2, w1, ymax - waterLevel2 + 1, "#00005A");
    ctx.fillStyle = "#00005A";
    ctx.strokeStyle = "#00005A";
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.fill();
    ctx.stroke();
  }

  function drawWaterSurfaceLeftOrRight(x, y, left) {
    drawWaterSurface();
    if (left) {
      drawTriangleStoneBottomRight(x, y);
    } else {
      drawTriangleStoneBottomLeft(x, y);
    }
  }

  function drawWaterWithIce(x, y) {
    let idx = -1;
    let objectNumber = 20;
    const d1 = Math.round(w2 * 0.4);
    const d2 = Math.round(w1 * 0.1);
    const d3 = Math.round(w1 * 0.4);
    const d4 = Math.round(w1 * 0.6);
    const d5 = Math.round(w1 * 0.9);
    const d6 = Math.round(w1 * 0.2);
    const d7 = Math.round(w1 * 0.5);

    idx = findElementByCoordinates(x, y, gameInfo.waterWithIceObjects);
    if (idx >= 0) {
      objectNumber = gameInfo.waterWithIceObjects[idx].objectNumber;
    }

    drawFilledBox(ctx, xmin, ymin + d1, w1, w2 - d1, "#00005A");
    drawFilledBox(ctx, xmin, ymin, w1, d1, "#D6FFFA");
    ctx.lineWidth = 3;
    if (x % 2 == 0) {
      drawLine(ctx, xmin + d2, ymin + d1, xmin + d3, ymin + d1, "#D6FFFA");
      drawLine(ctx, xmin + d4, ymin + d1, xmin + d5, ymin + d1, "#00005A");
    } else {
      drawLine(ctx, xmin + d6, ymin + d1, xmin + d7, ymin + d1, "#D6FFFA");
    }
    ctx.lineWidth = 1;
    if (objectNumber === 113) {
      drawTriangleStoneBottomLeft(x, y);
    }
    if (objectNumber === 114) {
      drawTriangleStoneBottomRight(x, y);
    }
  }

  function drawWeakStone() {
    if (bitmapWeakStone === null) {
      bitmapWeakStone = createWeakStoneBitmap(32);
    }
    ctx.drawImage(bitmapWeakStone, xmin, ymin, w1, w2);
  }

  function drawWhiteBall() {
    ctx.drawImage(elements.elementWhite, xmin, ymin, w1, w2);
  }

  function drawYellowBall() {
    ctx.drawImage(elements.elementYellow, xmin, ymin, w1, w2);
  }

  function drawYellowPauser(x, y) {
    let d1 = w1 / 4;
    let d2 = w2 / 1.9;
    let d3 = w2 / 12;
    drawYellowPushersTrigger(x, y);
    drawBox(ctx, xmin + d2, yc + (d1 * 0.5), d3, d1, "black");
    drawBox(ctx, xmax - (d2 + d3), yc + (d1 * 0.5), d3, d1, "black");
  }

  function drawYellowPusher() {
    let d1 = w1 / 2.5;
    let d2 = w1 / 10;
    let d3 = w1 / 4;
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow", true);
    drawLine(ctx, xc - d1, yc, xc + d1, yc, "black");
    drawLine(ctx, xc - d1, yc, xc - d3, yc - d2, "black");
    drawLine(ctx, xc - d1, yc, xc - d3, yc + d2, "black");
    drawLine(ctx, xc + d1, yc, xc + d3, yc - d2, "black");
    drawLine(ctx, xc + d1, yc, xc + d3, yc + d2, "black");
    drawLine(ctx, xc, yc - d1, xc, yc + d1, "black");
    drawLine(ctx, xc, yc - d1, xc - d2, yc - d3), "black";
    drawLine(ctx, xc, yc - d1, xc + d2, yc - d3), "black";
    drawLine(ctx, xc, yc + d1, xc - d2, yc + d3), "black";
    drawLine(ctx, xc, yc + d1, xc + d2, yc + d3), "black";
  }

  function drawYellowPushersTrigger(x, y) {
    let color = getFgcolor(x, y, "#DCDCDC");
    let d1 = w1 / 7;
    let d2 = w1 / 2;
    let d3 = w1 / 8;
    let d4 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "yellow", true);
    drawLine(ctx, xc, ymin + d3, xc, ymin + d2, color);
    drawLine(ctx, xc - d4, ymin + d3, xc + d4, ymin + d3, color);
  }

  function drawYellowSlowdowner() {
    ctx.drawImage(elements.elementSlowDownYellow, xmin + (0.1 * w1), ymin, w1 * 0.8, w2 * 0.8);
  }

  function drawYellowStopper(x, y) {
    let d1 = w1 / 4;
    drawYellowPushersTrigger(x, y);
    drawBox(ctx, xc - (d1 * 0.5), yc + (d1 * 0.5), d1, d1, "black");
  }

  function highlight() {
    drawBox(ctx, xmin, ymin, w1, w2, "white");
    ctx.setLineDash([2, 2]);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(Math.round(xmin), Math.round(ymin), Math.round(w1), Math.round(w2));
    ctx.setLineDash([]);
  }

  function highlightBlueBall(x, y) {
    if (!gameInfo.twoBlue) {
      return;
    }

    const blueX = gameInfo.blueBall.x;
    const blueY = gameInfo.blueBall.y;

    if ((blueX === x) && (blueY === y)) {
      highlight();
    }
  }

  function highlightSelectedCell(x, y) {
    if (selectedCell === null) {
      return;
    }

    if ((selectedCell.x === x) && (selectedCell.y === y)) {
      highlight();
    }
  }

  function highlightTelekinesisObject(x, y) {
    const blueX = gameInfo.blueBall.x;
    const blueY = gameInfo.blueBall.y;
    let info = null;

    if (!gameInfo.hasTelekineticPower || (Math.abs(blueX - x) > 3) || (Math.abs(blueY - y) > 3)) {
      return;
    }

    info = getObjectCoordinates(gameData, gameInfo, gameVars);
    if ((info.x === x) && (info.y === y)) {
      highlight();
    }
  }


  if (
    !gameData ||
    gameData.length < 1 ||
    !backData ||
    backData.length < 1 ||
    !canvas
  ) {
    return false;
  }

  const gameRows = gameData.length;
  const gameColumns = gameData[0].length;
  let rows = gameRows;
  let columns = gameColumns;
  if (!isMenu && ((!globalVars.createLevel && (gameVars.displaySize.columns > 0) && (gameVars.displaySize.rows > 0) && (gameVars.displaySize.columns <= gameColumns) && (gameVars.displaySize.rows <= gameRows)) ||
    (globalVars.createLevel && (globalVars.createLevelZoom > 0)))) {
    if (globalVars.createLevel) {
      rows = Math.ceil(gameRows / Math.pow(2, globalVars.createLevelZoom));
      columns = Math.ceil(gameColumns / Math.pow(2, globalVars.createLevelZoom));
      fixScroll(gameData, gameVars, columns, rows);
    } else {
      rows = gameVars.displaySize.rows;
      columns = gameVars.displaySize.columns;
      if ((gameInfo.blueBall.x - 3 < gameVars.scroll.x) || (gameInfo.blueBall.x + 3 > columns - 1 + gameVars.scroll.x)) {
        gameVars.scroll.x = Math.min(gameColumns - columns, Math.max(0, gameInfo.blueBall.x - (columns / 2)));
      }
      if ((gameInfo.blueBall.y - 3 < gameVars.scroll.y) || (gameInfo.blueBall.y + 3 > rows - 1 + gameVars.scroll.y)) {
        gameVars.scroll.y = Math.min(gameRows - rows, Math.max(0, gameInfo.blueBall.y - (rows / 2)));
      }
    }
  } else {
    gameVars.scroll.x = 0;
    gameVars.scroll.y = 0;
  }

  let size1 = canvas.width / columns;
  let size2 = canvas.height / rows;

  if (size2 < size1) {
    size1 = size2;
  }
  size1 = Math.trunc(size1);
  let gameWidth = columns * size1;
  let gameHeight = rows * size1;
  let leftMargin = Math.trunc((canvas.width - gameWidth) / 2);
  let topMargin = Math.trunc(canvas.height - gameHeight);
  drawFilledBox(ctx, leftMargin, topMargin, gameWidth, gameHeight, "black");
  let xmin = 0;
  let xmax = 0;
  let ymin = 0;
  let ymax = 0;
  let xc = 0;
  let yc = 0;
  let w1 = 0;
  let w2 = 0;

  // Stone pattern
  let stoneImg = null;
  let stoneLayer = null;
  switch (gameVars.stonePattern) {
    case 1:
      stoneImg = globalVars.stoneImg01;
      break;
    case 2:
      stoneImg = globalVars.stoneImg02;
      break;
    case 3:
      stoneImg = globalVars.stoneImg03;
      break;
    case 4:
      stoneImg = globalVars.stoneImg04;
      break;
    case 5:
      stoneImg = globalVars.stoneImg05;
      break;
    default:
      break;
  }
  if (stoneImg !== null) {
    stoneLayer = buildPatternLayer(stoneImg, columns, rows, size1, size1 / 100);
  } else {
    gameVars.stonePattern = 0;
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.imageSmoothingEnabled = false;


  ymin = topMargin;
  for (let row = 0; row < rows; row++) {
    ymax = ymin + size1 - 1;
    xmin = leftMargin;
    for (let col = 0; col < columns; col++) {
      xmax = xmin + size1 - 1;
      w1 = xmax - xmin + 1;
      w2 = ymax - ymin + 1;
      xc = Math.round((xmax + xmin) / 2);
      yc = Math.round((ymax + ymin) / 2);

      const currentCol = col + gameVars.scroll.x;
      const currentRow = row + gameVars.scroll.y;
      const bd = backData[currentRow][currentCol];
      const gd = gameData[currentRow][currentCol];
      const backgroundColor = getBgcolor(currentCol, currentRow, "");
      if (backgroundColor !== "") {
        drawFilledBox(ctx, xmin, ymin, w1, w2, backgroundColor);
      }
      switch (bd) {
        case 20:
          drawWaterSurface();
          break;
        case 23:
          drawWater();
          break;
        case 25:
          drawLadder(currentCol, currentRow);
          break;
        case 80:
          drawHorizontalRope()
          break;
        case 137:
          drawVerticalRope()
          break;
        case 90:
          drawHorizontalLadder(currentCol, currentRow);
          break;
        case 170:
          // Teleport - will be drawn later
          break;
        default:
          // empty
          break;
      }

      let switchNumber = -1;
      if ((gd >= 210) && (gd <= 225)) {
        switchNumber = -10;
      } else if ((gd >= 2000) && (gd <= 2032)) {
        switchNumber = -11;
      } else if ((gd >= 2052) && (gd <= 2081)) {
        switchNumber = -12;
      } else {
        switchNumber = gd;
      }
      switch (switchNumber) {
        case 0:
          // empty
          break;
        case -10:
          drawStoneShape(currentCol, currentRow, gd);
          break;
        case -11:
          drawNumber(gd - 2000);
          break;
        case -12:
          drawColor(gd - 2052);
          break;
        case 1:
          drawStone(currentCol, currentRow);
          break;
        case 2:
          drawBlueBall();
          break;
        case 3:
          drawSmallGreenBall();
          break;
        case 4:
          drawWhiteBall();
          break;
        case 5:
          drawLightBlueBall();
          break;
        case 6:
        case 106:
          drawElevatorUpDown();
          break;
        case 7:
        case 107:
          drawElevatorLeftRight();
          break;
        case 8:
          drawRedBall();
          break;
        case 9:
          drawYellowBall();
          break;
        case 10:
          drawOneDirectionRight(currentCol, currentRow);
          break;
        case 11:
          drawOneDirectionLeft(currentCol, currentRow);
          break;
        case 12:
          drawDamagedStone(currentCol, currentRow);
          break;
        case 13:
          drawTrapDoor();
          break;
        case 14:
          drawTrapDoorHalfOpen();
          break;
        case 15:
          drawTriangleStoneBottomLeft(currentCol, currentRow);
          break;
        case 16:
          drawTriangleStoneBottomRight(currentCol, currentRow);
          break;
        case 17:
          drawTriangleStoneTopLeft(currentCol, currentRow);
          break;
        case 18:
          drawTriangleStoneTopRight(currentCol, currentRow);
          break;
        case 21:
          drawPalmTreeTrunkPart();
          break;
        case 22:
          drawLava();
          break;
        case 24:
          drawPanagiotis();
          break;
        case 26:
          drawDivingGlasses("gray");
          break;
        case 27:
          // Red fish - will be drawn later
          break;
        case 28:
          drawPurpleBall();
          break;
        case 29:
          drawKey(currentCol, currentRow);
          break;
        case 30:
          drawLockedDoor(currentCol, currentRow);
          break;
        case 31:
          // Teleport - will be drawn later
          break;
        case 34:
          drawPickaxe(currentCol, currentRow);
          break;
        case 35:
          drawWeakStone();
          break;
        case 36:
          drawBomb(currentCol, currentRow);
          break;
        case 37:
          drawDetonator(currentCol, currentRow);
          break;
        case 38:
          drawExplosion();
          break;
        case 39:
          drawElevatorEntranceAndExit(currentCol, currentRow);
          break;
        case 40:
          drawOrangeBall();
          break;
        case 81:
          drawPropeller();
          break;
        case 82:
          drawGrayBall(1);
          break;
        case 83:
          drawGrayBall(0);
          break;
        case 84:
          drawDirectionChanger1();
          break;
        case 85:
          drawDirectionChanger2();
          break;
        case 86:
          drawDirectionChanger3();
          break;
        case 87:
          drawOneDirectionUp(currentCol, currentRow);
          break;
        case 88:
          drawOneDirectionDown(currentCol, currentRow);
          break;
        case 89:
          drawGameRotator();
          break;
        case 91:
          drawElectricity(currentCol, currentRow);
          break;
        case 92:
          // Teleport - will be drawn later
          break;
        case 93:
          // Smart red ball (smart level 1)
          drawRedBall();
          break;
        case 94:
          // Smart red ball (smart level 2)
          drawRedBall();
          break;
        case 95:
          drawMirror(true);
          break;
        case 96:
          drawMirror(false);
          break;
        case 97:
          drawCopier("white");
          break;
        case 98:
          drawGrayBall(2);
          break;
        case 99:
          drawSmallWeakStone();
          break;
        case 100:
          drawBarLeft("darkmagenta");
          break;
        case 101:
          drawBarRight("darkmagenta");
          break;
        case 102:
          drawBarMiddle("darkmagenta");
          break;
        case 103:
          drawBarTop("darkmagenta");
          break;
        case 104:
          drawBarBottom("darkmagenta");
          break;
        case 105:
          drawLightBulb();
          break;
        case 108:
          drawSmallLadder();
          break;
        case 109:
          drawForceUp();
          break;
        case 110:
          drawForceDown();
          break;
        case 111:
          drawForceRight();
          break;
        case 112:
          drawForceLeft();
          break;
        case 113:
          drawWaterSurfaceLeftOrRight(currentCol, currentRow, false);
          break;
        case 114:
          drawWaterSurfaceLeftOrRight(currentCol, currentRow, true);
          break;
        case 115:
          drawYellowPusher();
          break;
        case 116:
          drawYellowPushersTrigger(currentCol, currentRow);
          break;
        case 117:
          drawTimeBomb(currentCol, currentRow);
          break;
        case 118:
          drawCoilSpring(currentCol, currentRow);
          break;
        case 119:
          drawMagnet();
          break;
        case 120:
          drawTimeFreezer(currentCol, currentRow);
          break;
        case 121:
          drawBarLeft("yellow");
          break;
        case 122:
          drawBarRight("yellow");
          break;
        case 123:
          drawBarMiddle("yellow");
          break;
        case 124:
          drawBarTop("yellow");
          break;
        case 125:
          drawBarBottom("yellow");
          break;
        case 126:
          drawBarLeft(displayColor("lightblue"));
          break;
        case 127:
          drawBarRight(displayColor("lightblue"));
          break;
        case 128:
          drawBarMiddle(displayColor("lightblue"));
          break;
        case 129:
          drawBarTop(displayColor("lightblue"));
          break;
        case 130:
          drawBarBottom(displayColor("lightblue"));
          break;
        case 131:
          drawYellowStopper(currentCol, currentRow);
          break;
        case 132:
          // Travel gate - will be drawn later
          break;
        case 133:
          drawDiamant("yellow");
          break;
        case 134:
          drawDiamant("blue");
          break;
        case 135:
          drawDiamant("red");
          break;
        case 136:
          drawYellowPauser(currentCol, currentRow);
          break;
        case 138:
          drawDirectionChanger4();
          break;
        case 139:
          drawDirectionChanger5();
          break;
        case 140:
          drawSmallBall(displayColor("silver"));
          break;
        case 141:
          drawQuarterCircleStoneBottomLeft(currentCol, currentRow);
          break;
        case 142:
          drawQuarterCircleStoneBottomRight(currentCol, currentRow);
          break;
        case 143:
          drawQuarterCircleStoneTopLeft(currentCol, currentRow);
          break;
        case 144:
          drawQuarterCircleStoneTopRight(currentCol, currentRow);
          break;
        case 145:
          drawHalfStone(currentCol, currentRow, "left");
          break;
        case 146:
          drawHalfStone(currentCol, currentRow, "right");
          break;
        case 147:
          drawHalfStone(currentCol, currentRow, "top");
          break;
        case 148:
          drawHalfStone(currentCol, currentRow, "bottom");
          break;
        case 149:
          drawQuarterStone(currentCol, currentRow, "bottomLeft");
          break;
        case 150:
          drawQuarterStone(currentCol, currentRow, "bottomRight");
          break;
        case 151:
          drawQuarterStone(currentCol, currentRow, "topLeft");
          break;
        case 152:
          drawQuarterStone(currentCol, currentRow, "topRight");
          break;
        case 153:
          drawPattern(currentCol, currentRow, 1);
          break;
        case 154:
          drawPattern(currentCol, currentRow, 2);
          break;
        case 155:
          drawBallSynchroniser("yellow");
          break;
        case 156:
          drawYellowSlowdowner();
          break;
        case 157:
          drawMusicBox(currentCol, currentRow);
          break;
        case 158:
          drawPistonsTrigger(currentCol, currentRow);
          break;
        case 159:
          drawPiston(currentCol, currentRow, "up");
          break;
        case 160:
          drawPistonExtendedPart("up");
          break;
        case 161:
          drawPiston(currentCol, currentRow, "down");
          break;
        case 162:
          drawPistonExtendedPart("down");
          break;
        case 163:
          drawPiston(currentCol, currentRow, "left");
          break;
        case 164:
          drawPistonExtendedPart("left");
          break;
        case 165:
          drawPiston(currentCol, currentRow, "right");
          break;
        case 166:
          drawPistonExtendedPart("right");
          break;
        case 167:
          drawDelay();
          break;
        case 168:
          drawSmallBall("blue");
          break;
        case 169:
          drawDoor();
          break;
        case 171:
          drawConveyorBelt(currentCol, currentRow, "left");
          break;
        case 172:
          drawConveyorBelt(currentCol, currentRow, "middle");
          break;
        case 173:
          drawConveyorBelt(currentCol, currentRow, "right");
          break;
        case 174:
          drawSpike(currentCol, currentRow, "up");
          break;
        case 175:
          drawSpike(currentCol, currentRow, "down");
          break;
        case 176:
          drawSpike(currentCol, currentRow, "right");
          break;
        case 177:
          drawSpike(currentCol, currentRow, "left");
          break;
        case 178:
          drawMover(currentCol, currentRow);
          break;
        case 179:
          drawStar(ctx, xc, yc - (w2 * 0.25), w1 * 0.5, "yellow");
          break;
        case 180:
          drawStar(ctx, xc, yc - (w2 * 0.25), w1 * 0.5, "blue");
          break;
        case 181:
          drawStar(ctx, xc, yc - (w2 * 0.25), w1 * 0.5, "silver");
          break;
        case 182:
          drawStar(ctx, xc, yc - (w2 * 0.25), w1 * 0.5, "red");
          break;
        case 183:
          // Game rotator left
          drawGameRotator(true);
          break;
        case 184:
          drawGravityChangerUp(currentCol, currentRow);
          break;
        case 185:
          drawGravityChangerDown(currentCol, currentRow);
          break;
        case 186:
          drawChordTypeOrInterval("maj");
          break;
        case 187:
          drawChordTypeOrInterval("min");
          break;
        case 188:
          drawChordTypeOrInterval("aug");
          break;
        case 189:
          drawChordTypeOrInterval("dim");
          break;
        case 190:
          drawChordTypeOrInterval("sus2");
          break;
        case 191:
          drawChordTypeOrInterval("sus4");
          break;
        case 192:
          drawSmallBall("white");
          break;
        case 193:
          drawTeleportsCreator(false);
          break;
        case 194:
          drawTeleportsCreator(true);
          break;
        case 195:
          drawSmallBall(displayColor("lightblue"));
          break;
        case 196:
          drawSmallBall("yellow");
          break;
        case 197:
          drawSmallBall(displayColor("purple"));
          break;
        case 198:
          drawDisappearingStone(currentCol, currentRow);
          break;
        case 199:
          drawShrinker();
          break;
        case 200:
          drawBallSynchroniser("white");
          break;
        case 201:
          drawSmallBall("red");
          break;
        case 202:
          drawSmallBall(displayColor("orange"));
          break;
        case 203:
          drawPinkBall();
          break;
        case 204:
          drawSmallBall(displayColor("pink"));
          break;
        case 205:
          drawFreezeGun();
          break;
        case 206:
          drawWaterWithIce(currentCol, currentRow);
          break;
        case 207:
          drawPhaseAbility();
          break;
        case 208:
          drawCopier("yellow");
          break;
        case 209:
          drawPusher(currentCol, currentRow);
          break;
        case 226:
          drawChordTypeOrInterval("7");
          break;
        case 227:
          drawChordTypeOrInterval("maj7");
          break;
        case 228:
          drawChordTypeOrInterval("P5");
          break;
        case 229:
          drawChordTypeOrInterval("P8");
          break;
        case 230:
          drawChordTypeOrInterval("P4");
          break;
        case 231:
          drawChordTypeOrInterval("M2");
          break;
        case 232:
          drawChordTypeOrInterval("m3");
          break;
        case 233:
          drawChordTypeOrInterval("M3");
          break;
        case 234:
          drawPattern(currentCol, currentRow, 3);
          break;
        case 235:
          drawPattern(currentCol, currentRow, 4);
          break;
        case 236:
          drawPattern(currentCol, currentRow, 5);
          break;
        case 237:
          drawPattern(currentCol, currentRow, 6);
          break;
        case 238:
          drawPattern(currentCol, currentRow, 7);
          break;
        case 239:
          drawPattern(currentCol, currentRow, 8);
          break;
        case 240:
          drawPattern(currentCol, currentRow, 9);
          break;
        case 241:
          drawQuestionStone(currentCol, currentRow);
          break;
        case 242:
          drawAnswerBall(currentCol, currentRow, "purple");
          break;
        case 243:
          drawTropicalFish(currentCol, currentRow);
          break;
        case 244:
          drawChanger(currentCol, currentRow);
          break;
        case 245:
          drawAnswerBall(currentCol, currentRow, "white");
          break;
        case 1000:
          // For manual only (empty)
          break;
        case 2033:
          // Group  
          drawAbbreviation("gr");
          break;
        case 2034:
          drawPart("top");
          break;
        case 2035:
          drawPart("middle");
          break;
        case 2038:
          // Sticky
          drawAbbreviation("s");
          break;
        case 2039:
          // Piston - inverted OR Music box instrument
          drawAbbreviation("i");
          break;
        case 2040:
          drawArrow("left", "white", "black");
          break;
        case 2041:
          drawArrow("right", "white", "black");
          break;
        case 2042:
          drawArrow("up", "white", "black");
          break;
        case 2043:
          drawArrow("down", "white", "black");
          break;
        case 2045:
          // Not smart
          drawAbbreviation("s0");
          break;
        case 2046:
          // A little smart
          drawAbbreviation("s1");
          break;
        case 2047:
          // Smart
          drawAbbreviation("s2");
          break;
        case 2050:
          // Foreground color
          drawAbbreviation("fg");
          break;
        case 2051:
          // Background color
          drawAbbreviation("bg");
          break;
        case 2083:
          // Delete
          drawAbbreviation("del");
          break;
        case 2084:
          // Select
          drawAbbreviation("sel");
          break;
        case 2092:
          // mode
          drawAbbreviation("mode");
          break;
        case 2095:
          drawAbbreviation("move");
          break;
        case 2096:
          drawAbbreviation("copy");
          break;
        case 2097:
          // Toggle raster
          drawRaster();
          break;
        case 2098:
          // Show coordinates
          drawAbbreviation("x, y");
          break;
        case 2099:
          // Show info
          drawAbbreviation("?");
          break;
        case 2100:
          drawPrevious();
          break;
        case 2101:
          drawNext();
          break;
        case 2103:
          drawPart("bottom");
          break;
        case 2104:
          drawAbbreviation("C4");
          break;
        case 2105:
          drawAbbreviation("D4");
          break;
        case 2106:
          drawAbbreviation("E4");
          break;
        case 2107:
          drawAbbreviation("F4");
          break;
        case 2108:
          drawAbbreviation("G4");
          break;
        case 2109:
          drawAbbreviation("A4");
          break;
        case 2110:
          drawAbbreviation("B4");
          break;
        case 2111:
          drawAbbreviation("C5");
          break;
        case 2112:
          drawAbbreviation("D5");
          break;
        case 2113:
          drawAbbreviation("E5");
          break;
        case 2114:
          drawAbbreviation("F5");
          break;
        case 2115:
          drawAbbreviation("G5");
          break;
        case 2116:
          drawAbbreviation("A5");
          break;
        case 2117:
          drawAbbreviation("B5");
          break;
        case 2131:
          // Music box transpose
          drawAbbreviation("tr");
          break;
        case 2133:
          drawDirections()
          break;
        case 2134:
          drawAbbreviation("zoom");
          break;
        case 2135:
          // Pan left
          drawAbbreviation("⇦");
          break;
        case 2136:
          // Pan up
          drawAbbreviation("⇧");
          break;
        case 2137:
          // Pan down
          drawAbbreviation("⇩");
          break;
        case 2138:
          // Pan right
          drawAbbreviation("⇨");
          break;
        case 2139:
          drawStonePatternIcon("next");
          break;
        case 2140:
          drawStonePatternIcon("ignore");
          break;
        case 2141:
          drawStonePatternIcon("");
          break;
        case 2142:
          drawAbbreviation("Q");
          break;
        case 2143:
          drawAbbreviation("A");
          break;
        case 2144:
          drawSides();
          break;
        case 2145:
          drawAbbreviation("t=");
          break;
        case 2146:
          drawAbbreviation("1 oct");
          break;
        case 2147:
          drawAbbreviation("2 oct");
          break;
        case 2148:
          drawChangerColors();
          break;
        default:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646");
          break;
      }

      // Foreground
      if ((gameInfo.travelGate.x === col) && (gameInfo.travelGate.y === row)) {
        drawTravelGate(currentCol, currentRow);
      }
      if (raster !== null) {
        if (raster.dash.length > 0) {
          drawBox(ctx, xmin, ymin, w1, w2, "black");
          ctx.setLineDash(raster.dash);
        }
        drawBox(ctx, xmin, ymin, w1, w2, raster.color);
        ctx.setLineDash([]);
      }

      highlightBlueBall(currentCol, currentRow);
      highlightSelectedCell(currentCol, currentRow);
      highlightTelekinesisObject(currentCol, currentRow);

      xmin += size1;
    }
    ymin += size1;
  }

  drawAllTeleports();
  drawAllRedFish();

  // Electricity
  if (gameInfo.electricityActive) {
    drawElectricityActive();
  }

  if (status.gameOver) {
    drawGameOver();
  }
}


export { clearBitMapLava, drawLevel };
