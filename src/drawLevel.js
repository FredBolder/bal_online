import {
  drawBox,
  drawCircle,
  drawFilledBox,
  drawFilledCircle,
  drawLine,
  drawText,
} from "./drawUtils.js";
import { electricityTarget } from "./electricity.js";
import { booleanToInt, polar, randomInt } from "./utils.js";

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
  nicerGraphics,
  elements,
  status,
  gameInfo,
  gameVars,
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

  function drawAllRedFish() {
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;
    let d5 = 0;
    let d6 = 0;
    let pt1 = { x: 0, y: 0 };
    let pt2 = { x: 0, y: 0 };
    let pt3 = { x: 0, y: 0 };
    let pt4 = { x: 0, y: 0 };

    for (let i = 0; i < gameInfo.redFish.length; i++) {
      const fish = gameInfo.redFish[i];
      xmin = fish.x * size1 + leftMargin;
      xmax = xmin + size1 - 1;
      ymin = fish.y * size1 + topMargin;
      ymax = ymin + size1 - 1;
      w1 = xmax - xmin + 1;
      w2 = ymax - ymin + 1;
      xc = Math.round((xmax + xmin) / 2);
      yc = Math.round((ymax + ymin) / 2);
      let mirror = 1;
      if (fish.direction == 4) {
        mirror = -1;
      }
      d1 = (w1 / 2.3) * mirror;
      d2 = w1 / 2.3;
      d3 = 0;
      d4 = (w1 / 3.5) * mirror;
      d5 = w1 / 3;
      d6 = w1 / 12;
      pt1.x = Math.round(xc - d1);
      pt1.y = Math.round(yc - d2);
      pt2.x = Math.round(xc - d3);
      pt2.y = Math.round(yc - d6);
      pt3.x = Math.round(xc - d1);
      pt3.y = Math.round(yc + d5);
      pt4.x = Math.round(xc - d4);
      pt4.y = Math.round(yc);
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(pt1.x, pt1.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.lineTo(pt3.x, pt3.y);
      ctx.lineTo(pt4.x, pt4.y);
      ctx.lineTo(pt1.x, pt1.y);
      ctx.fill();
      ctx.stroke();
      if (mirror === 1) {
        d1 = w1 / 7;
      } else {
        d1 = w1 / 2.5;
      }
      d2 = w1 / 3;
      d3 = w1 / 3.2;
      d4 = w1 / 3.8;
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.beginPath();
      // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
      ctx.ellipse(xc - d1 + d3, yc - d2 + d4, d3, d4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  function drawAllTeleports() {
    ctx.lineWidth = 3;
    for (let i = 0; i < gameInfo.teleports.length; i++) {
      if (gameInfo.teleports[i].selfDestructing) {
        ctx.setLineDash([2, 2]);
      } else {
        ctx.setLineDash([]);
      }
      drawBox(
        ctx,
        gameInfo.teleports[i].x * size1 + leftMargin + 1,
        gameInfo.teleports[i].y * size1 + topMargin + 1,
        size1 - 2,
        size1 - 2,
        "white"
      );
    }
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
  }

  function drawBall(color) {
    drawFilledCircle(ctx, xc, yc, w1 * 0.5, color);
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
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let eye = 0;
    let scaleFactor = gameInfo.hasPropeller ? 0.9 : 1;
    if (nicerGraphics) {
      if (gameInfo.hasDivingGlasses) {
        ctx.drawImage(elements.elementDiving, xmin + ((1 - scaleFactor) * w1 * 0.5), ymin + ((1 - scaleFactor) * w2), w1 * scaleFactor, w2 * scaleFactor);
      } else {
        if (status.gameOver) {
          ctx.drawImage(elements.elementSad, xmin + ((1 - scaleFactor) * w1 * 0.5), ymin + ((1 - scaleFactor) * w2), w1 * scaleFactor, w2 * scaleFactor);
        } else {
          ctx.drawImage(elements.elementHappy, xmin + ((1 - scaleFactor) * w1 * 0.5), ymin + ((1 - scaleFactor) * w2), w1 * scaleFactor, w2 * scaleFactor);
        }
      }
    } else {
      drawFilledCircle(ctx, xc, yc + ((1 - scaleFactor) * w2 * 0.5), w1 * scaleFactor * 0.5, "blue");

      eye = Math.round(w1 * scaleFactor / 20);
      if (eye < 1) {
        eye = 1;
      }
      d1 = size1 / 3.25;
      d2 = Math.round(w1 * scaleFactor / 12);
      drawFilledCircle(ctx, xmin + d1, yc - d2 + ((1 - scaleFactor) * w2 * 0.5), eye, "white");
      drawFilledCircle(ctx, xmax - d1, yc - d2 + ((1 - scaleFactor) * w2 * 0.5), eye, "white");

      d1 = w1 * scaleFactor / 3.5;
      d2 = w1 * scaleFactor / 3;
      d3 = w1 * scaleFactor / 2;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      if (status.gameOver) {
        ctx.arc(xc, yc + d3 + ((1 - scaleFactor) * w2 * 0.5), (w1 * scaleFactor) - (2 * d1), 1.25 * Math.PI, 1.75 * Math.PI, false);
      } else {
        ctx.arc(xc, ymin + d2 + ((1 - scaleFactor) * w2 * 0.5), (w1 * scaleFactor) - (2 * d1), 0.25 * Math.PI, 0.75 * Math.PI, false);
      }
      ctx.stroke();
      if (gameInfo.hasDivingGlasses) {
        drawDivingGlasses("gray", scaleFactor);
      }
    }
    if (gameInfo.hasPropeller) {
      drawPropeller(-w2 * 0.17);
    }
  }

  function drawBomb(x, y) {
    const sticks = 3;
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    let factor = 0.1;
    let d1 = w1 / 6;
    let d2 = w2 / 2;
    let d3 = w1 / 6;
    for (let i = 0; i < sticks; i++) {
      drawFilledBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "red");
      drawBox(ctx, xmin + d1, ymin + d2 + (i * w2 * factor), w1 - 2 * d1, w2 * factor, "black");
    }
    drawLine(ctx, xc - d3, ymin + d2, xc - d3, ymin + d2 + (sticks * w2 * factor), "black");
    drawLine(ctx, xc + d3, ymin + d2, xc + d3, ymin + d2 + (sticks * w2 * factor), "black");
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

  function drawCopier() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "white");
    drawText(ctx, xc, yc, "2x", "middle", "black", w2 * 0.7, w1 * 0.8, "black", 1);
  }

  function drawDamagedStone(x, y) {
    let bgcolor = getBgcolor(x, y, "black");
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    drawLine(ctx, xmin + (w1 * 0.75), ymin, xmin + (w1 * 0.4), ymin + (w2 * 0.35), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.4), ymin + (w2 * 0.35), xc, ymin + (w2 * 0.6), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.7), yc, xmin + (w1 * 0.6), ymin + (w2 * 0.8), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.6), ymin + (w2 * 0.8), xmin + (w1 * 0.9), ymax, bgcolor);
    drawLine(ctx, xmin + (w1 * 0.1), ymin, xmin + (w1 * 0.2), ymin + (w2 * 0.3), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.25), ymin + (w2 * 0.6), xmin + (w1 * 0.1), ymin + (w2 * 0.7), bgcolor);
    drawLine(ctx, xmin + (w1 * 0.1), ymin + (w2 * 0.7), xmin, ymax, bgcolor);
  }

  function drawDetonator(x, y) {
    let color = getFgcolor(x, y, "rgb(220,220,220)");
    let d1 = w1 / 7;
    let d2 = w2 / 2;
    let d3 = w2 / 8;
    let d4 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "red");
    drawLine(ctx, xc, ymin + d3, xc, ymin + d2, color);
    drawLine(ctx, xc - d4, ymin + d3, xc + d4, ymin + d3, color);
    drawText(ctx, xc, ymin + w2 * 0.8, "TNT", "middle", "white", w2 * 0.4, w1 * 0.54, "white", 1);
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
  }

  function drawDirectionChanger2() {
    // Direction: \, code: 85, c
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
  }

  function drawDirectionChanger3() {
    // Direction: - and |, code: 86, +
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
  }

  function drawDirectionChanger4() {
    // Direction: /, code: 138, â
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
    ctx.setLineDash([2, 4]);
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
    ctx.setLineDash([]);
  }

  function drawDirectionChanger5() {
    // Direction: \, code: 139, Â
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
    drawLine(ctx, xmin, ymin, xmax, ymax, "black");
    ctx.setLineDash([2, 4]);
    drawLine(ctx, xmin, ymax, xmax, ymin, "black");
    ctx.setLineDash([]);
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

  function drawElectricity(x, y) {
    let d1 = Math.round(w1 * 0.06);
    let d2 = Math.round(w1 * 0.28);
    let d3 = Math.round(w1 * 0.14);
    let d4 = Math.round(w1 * 0.2);
    let d5 = Math.round(w1 * 0.3);
    let d6 = Math.round(w1 * 0.07);
    let d7 = Math.round(w1 * 0.04);
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
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
        ctx.strokeStyle = "rgb(207, 159, 255)";
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    for (let i = -1; i <= 1; i++) {
      d4 = (w1 / 3) * i;
      drawLine(ctx, xc + d4, ymin + d1, xc + d4, ymax - d1, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 - d2, ymin + d1 + d3, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 + d2, ymin + d1 + d3, "white");
    }
  }

  function drawGameOver() {
    let x = leftMargin + gameWidth / 2;
    let y = gameHeight / 2 + topMargin;
    drawText(
      ctx,
      x,
      y,
      "GAME OVER!",
      "middle",
      "white",
      Math.round(gameHeight * 0.6),
      Math.round(gameWidth * 0.9),
      "red",
      5
    );

    if (status.laser !== null) {
      drawLaser(status.laser);
    }
  }

  function drawGameRotator() {
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
    pt1 = polar(xc, yc, 45, d1);
    pt1.x -= 1;
    pt2 = polar(pt1.x, pt1.y, 0, d2);
    pt3 = polar(pt1.x, pt1.y, -90, d2);
    drawLine(ctx, pt1.x, pt1.y, pt2.x, pt2.y, "white");
    drawLine(ctx, pt1.x, pt1.y, pt3.x, pt3.y, "white");
  }

  function drawGrayBall(moves) {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementGray, xmin, ymin, w1, w2);
      if (moves > 0) {
        drawText(ctx, xc, yc, moves.toString(), "middle", "black", w2 * 0.7, w1 * 0.8, "black", 1);
      }
    } else {
      drawBall("rgb(70, 70, 70)");
      if (moves > 0) {
        drawText(ctx, xc, yc, moves.toString(), "middle", "black", w2 * 0.7, w1 * 0.8, "black", 1);
      }
    }
  }

  function drawGreenBall() {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementGreen, xmin + w1 * 0.25, ymin, w1 * 0.5, w2 * 0.5);
    } else {
      drawFilledCircle(ctx, w1 * 0.5 + xmin, w1 * 0.25 + ymin, w1 * 0.25, "green");
    }
  }

  function drawHalfStone(x, y, location) {
    const color = getFgcolor(x, y, "rgb(70, 70, 70)");
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
        x1 = laser[i - 1].x;
        y1 = laser[i - 1].y;
        x2 = laser[i].x;
        y2 = laser[i].y;
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
        drawLine(ctx, xp1, yp1, xp2, yp2, "yellow");
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
    if (nicerGraphics) {
      ctx.drawImage(elements.elementLightBlue, xmin, ymin, w1, w2);
    } else {
      drawBall("deepskyblue");
    }
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

  function drawLock(x, y) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    let d1 = w1 / 4;
    let d2 = w1 / 12;
    let d3 = w1 / 10;
    let d4 = w1 / 6;
    let d5 = w1 / 6;
    let d6 = ymin + d3 + d5;
    drawFilledBox(ctx, xmin + d1, yc, (xmax - d1) - (xmin + d1), (w2 / 2) - d2, "gold");
    ctx.strokeStyle = "silver";
    ctx.beginPath();
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(Math.round(xc), Math.round(d6), Math.round(d4), Math.round(d5), 0, Math.PI, 2 * Math.PI, false);
    ctx.stroke();
    drawLine(ctx, xc - d4, d6, xc - d4, yc, "silver");
    drawLine(ctx, xc + d4, d6, xc + d4, yc, "silver");
  }

  function drawMagnet(x, y, rectangular = false) {
    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;

    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    if (rectangular) {
      d1 = w1 / 3;
      d2 = w2 / 2.3;
      drawFilledBox(ctx, xc - (d1 * 0.5), yc - d2, d1, d2, getFgcolor(x, y, "blue"));
      drawFilledBox(ctx, xc - (d1 * 0.5), yc, d1, d2, getFgcolor(x, y, "red"));
      drawText(ctx, xc, yc - (d2 * 0.5), "S", "middle", "black", d2 * 0.7, d1 * 0.9, "black", 1);
      drawText(ctx, xc, yc + (d2 * 0.5), "N", "middle", "black", d2 * 0.7, d1 * 0.9, "black", 1);
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
      drawFilledBox(ctx, xc - d1, yc, d1 - d2 - 0.5, d3, "red");
      drawFilledBox(ctx, xc + d2, yc, d1 - d2 - 0.5, d3, "red");
      drawFilledBox(ctx, xc - d1, yc + d3, d1 - d2 - 0.5, d4, "silver");
      drawFilledBox(ctx, xc + d2, yc + d3, d1 - d2 - 0.5, d4, "silver");
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

  function drawOneDirectionDown() {
    drawBox(ctx, xmin, ymin, w1, w2, "white");
    drawLine(ctx, xmin, ymin, xc, ymax, "white");
    drawLine(ctx, xmax, ymin, xc, ymax, "white");
  }

  function drawOneDirectionLeft() {
    drawBox(ctx, xmin, ymin, w1, w2, "white");
    drawLine(ctx, xmax, ymin, xmin, ymin + w2 / 2, "white");
    drawLine(ctx, xmax, ymax, xmin, ymin + w2 / 2, "white");
  }

  function drawOneDirectionRight() {
    drawBox(ctx, xmin, ymin, w1, w2, "white");
    drawLine(ctx, xmin, ymin, xmax, ymin + w2 / 2, "white");
    drawLine(ctx, xmin, ymax, xmax, ymin + w2 / 2, "white");
  }

  function drawOneDirectionUp() {
    drawBox(ctx, xmin, ymin, w1, w2, "white");
    drawLine(ctx, xmin, ymax, xc, ymin, "white");
    drawLine(ctx, xmax, ymax, xc, ymin, "white");
  }

  function drawOrangeBall() {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementOrange, xmin, ymin, w1, w2);
    } else {
      drawBall("orange");
    }
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
    drawText(ctx, xc, yc, "π", "middle", "black", w2 * 0.7, w1 * 0.8, "black", 1);
  }

  function drawPickaxe() {
    let d1 = w1 / 4;
    let d2 = w1 / 4;
    let d3 = w1 / 3;
    ctx.lineWidth = 3;
    drawLine(ctx, xmin + d1, ymin + d1, xmax - d2, ymax - d2, "silver");
    ctx.lineWidth = 1;
    ctx.beginPath();
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.ellipse(xc + d3, yc + d3, w1 * 0.7, w2 * 0.7, 0, 1.1 * Math.PI, 1.4 * Math.PI, false);
    ctx.stroke();
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
    if (nicerGraphics) {
      ctx.drawImage(elements.elementPurple, xmin, ymin, w1, w2);
    } else {
      drawBall("darkmagenta");
    }
  }

  function drawQuarterCircleStoneBottomLeft(x, y) {
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(Math.round(xmin - 0.5), Math.round(ymax + 0.5), Math.round(w1 - 0.5), 2 * Math.PI, 1.5 * Math.PI, true);
    ctx.fill();
  }

  function drawQuarterCircleStoneBottomRight(x, y) {
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(Math.round(xmax + 0.5), Math.round(ymax + 0.5), Math.round(w1 - 0.5), 1.5 * Math.PI, 1 * Math.PI, true);
    ctx.fill();
  }

  function drawQuarterCircleStoneTopLeft(x, y) {
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    // arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.arc(Math.round(xmin - 0.5), Math.round(ymin - 0.5), Math.round(w1 - 0.5), 0.5 * Math.PI, 0 * Math.PI, true);
    ctx.fill();
  }

  function drawQuarterCircleStoneTopRight(x, y) {
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.arc(Math.round(xmax + 0.5), Math.round(ymin - 0.5), Math.round(w1 - 0.5), 1 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
  }

  function drawQuarterStone(x, y, location) {
    const color = getFgcolor(x, y, "rgb(70, 70, 70)");
    switch (location) {
      case "bottomLeft":
        drawFilledBox(ctx, xmin, yc, w1 / 2, w2 / 2, color);
        break;
      case "bottomRight":
        drawFilledBox(ctx, xc, yc, w1 / 2, w2 / 2, color);
        break;
      case "topLeft":
        drawFilledBox(ctx, xmin, ymin, w1 / 2, w2 / 2, color);
        break;
      case "topRight":
        drawFilledBox(ctx, xc, ymin, w1 / 2, w2 / 2, color);
        break;
      default:
        break;
    }
  }

  function drawRedBall() {
    let d1 = 0;
    let d2 = 0;
    let eye = 0;

    if (nicerGraphics) {
      ctx.drawImage(elements.elementRed, xmin, ymin, w1, w2);
    } else {
      drawBall("red");

      eye = Math.round(w1 / 20);
      if (eye < 1) {
        eye = 1;
      }
      d1 = size1 / 3.25;
      d2 = Math.round(w1 / 12);
      drawFilledCircle(
        ctx,
        Math.round(xmin + d1),
        Math.round(yc - d2),
        eye,
        "white"
      );
      drawFilledCircle(
        ctx,
        Math.round(xmax - d1),
        Math.round(yc - d2),
        eye,
        "white"
      );

      d1 = w1 / 6;
      d2 = w1 / 5;
      drawLine(ctx, xc - d1, yc + d2, xc + d1, yc + d2, "white");
    }
  }

  function drawSilverBall() {
    drawFilledCircle(ctx, w1 * 0.5 + xmin, w1 * 0.25 + ymin, w1 * 0.25, "#C0C0C0");
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

  function drawStone(x, y) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
  }

  function drawStonePattern(x, y, n) {
    let d1 = (w1 * 0.25) + 1;
    switch (n) {
      case 1:
        drawFilledBox(ctx, ((xmin + xc) / 2) - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, getFgcolor(x, y, "rgb(70, 70, 70)"));
        drawFilledBox(ctx, ((xmax + xc) / 2) - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, getFgcolor(x, y, "rgb(70, 70, 70)"));
        break;
      case 2:
        drawFilledBox(ctx, xmin - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, getFgcolor(x, y, "rgb(70, 70, 70)"));
        drawFilledBox(ctx, xc - 0.5, (ymin + yc) / 2, d1, w2 * 0.75, getFgcolor(x, y, "rgb(70, 70, 70)"));
        break;
      default:
        break;
    }
  }

  function drawTimeBomb(x, y) {
    const sticks = 4;
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
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
    drawLine(ctx, xmin, ymin + 1, xmax - 2, ymin + 1, "rgb(70, 70, 70)");
    ctx.lineWidth = 1;
  }

  function drawTrapDoorHalfOpen() {
    let d1 = Math.round(w1 / Math.sqrt(2));
    ctx.lineWidth = 3;
    drawLine(ctx, xmin - 1, ymin + 1, xmin + d1, ymin + d1, "rgb(70, 70, 70)");
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
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.fill();
  }

  function drawTriangleStoneBottomRight(x, y) {
    // Shape: /|, code: 16, H 
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.fill();
  }

  function drawTriangleStoneTopLeft(x, y) {
    // Shape: |/, code: 17, I
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymax + 0.5));
    ctx.fill();
  }

  function drawTriangleStoneTopRight(x, y) {
    // Shape: \|, code: 18, J
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymin - 0.5));
    ctx.lineTo(Math.round(xmax + 0.5), Math.round(ymax + 0.5));
    ctx.lineTo(Math.round(xmin - 0.5), Math.round(ymin - 0.5));
    ctx.fill();
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(0, 0, 90)");
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
    drawFilledBox(ctx, xmin, waterLevel2, w1, ymax - waterLevel2 + 1, "rgb(0, 0, 90)");
    ctx.fillStyle = "rgb(0, 0, 90)";
    ctx.strokeStyle = "rgb(0, 0, 90)";
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

  function drawWeakStone() {
    if (bitmapWeakStone === null) {
      bitmapWeakStone = createWeakStoneBitmap(32);
    }
    ctx.drawImage(bitmapWeakStone, xmin, ymin, w1, w2);
  }

  function drawWhiteBall() {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementWhite, xmin, ymin, w1, w2);
    } else {
      drawBall("white");
    }
  }

  function drawYellowBall() {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementYellow, xmin, ymin, w1, w2);
    } else {
      drawBall("yellow");
    }
  }

  function drawYellowBallSynchroniser() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
    drawText(ctx, xc, yc, "&", "middle", "black", w2 * 0.8, w1 * 0.8, "black", 1);
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
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
    let color = getFgcolor(x, y, "rgb(220,220,220)");
    let d1 = w1 / 7;
    let d2 = w1 / 2;
    let d3 = w1 / 8;
    let d4 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "yellow");
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

  if (
    !gameData ||
    gameData.length < 1 ||
    !backData ||
    backData.length < 1 ||
    !canvas
  ) {
    return false;
  }

  const rows = gameData.length;
  const columns = gameData[0].length;

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

      const backgroundColor = getBgcolor(col, row, "");
      if (backgroundColor !== "") {
        drawFilledBox(ctx, xmin, ymin, w1, w2, backgroundColor);
      }
      const bd = backData[row][col];
      const gd = gameData[row][col];
      switch (bd) {
        case 20:
          drawWaterSurface();
          break;
        case 23:
          drawWater();
          break;
        case 25:
          drawLadder(col, row);
          break;
        case 80:
          drawHorizontalRope()
          break;
        case 137:
          drawVerticalRope()
          break;
        case 90:
          drawHorizontalLadder(col, row);
          break;
        default:
          // empty
          break;
      }
      switch (gd) {
        case 0:
          // empty
          break;
        case 1:
          drawStone(col, row);
          break;
        case 2:
          drawBlueBall();
          break;
        case 3:
          drawGreenBall();
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
          drawOneDirectionRight();
          break;
        case 11:
          drawOneDirectionLeft();
          break;
        case 12:
          drawDamagedStone(col, row);
          break;
        case 13:
          drawTrapDoor();
          break;
        case 14:
          drawTrapDoorHalfOpen();
          break;
        case 15:
          drawTriangleStoneBottomLeft(col, row);
          break;
        case 16:
          drawTriangleStoneBottomRight(col, row);
          break;
        case 17:
          drawTriangleStoneTopLeft(col, row);
          break;
        case 18:
          drawTriangleStoneTopRight(col, row);
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
          drawKey(col, row);
          break;
        case 30:
          drawLock(col, row);
          break;
        case 31:
          // Teleport - will be drawn later
          break;
        case 34:
          drawPickaxe();
          break;
        case 35:
          drawWeakStone();
          break;
        case 36:
          drawBomb(col, row);
          break;
        case 37:
          drawDetonator(col, row);
          break;
        case 38:
          drawExplosion();
          break;
        case 39:
          drawElevatorEntranceAndExit(col, row);
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
          drawOneDirectionUp();
          break;
        case 88:
          drawOneDirectionDown();
          break;
        case 89:
          drawGameRotator();
          break;
        case 91:
          drawElectricity(col, row);
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
          drawCopier();
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
          drawWaterSurfaceLeftOrRight(col, row, false);
          break;
        case 114:
          drawWaterSurfaceLeftOrRight(col, row, true);
          break;
        case 115:
          drawYellowPusher();
          break;
        case 116:
          drawYellowPushersTrigger(col, row);
          break;
        case 117:
          drawTimeBomb(col, row);
          break;
        case 118:
          drawCoilSpring(col, row);
          break;
        case 119:
          drawMagnet();
          break;
        case 120:
          drawTimeFreezer(col, row);
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
          drawBarLeft("deepskyblue");
          break;
        case 127:
          drawBarRight("deepskyblue");
          break;
        case 128:
          drawBarMiddle("deepskyblue");
          break;
        case 129:
          drawBarTop("deepskyblue");
          break;
        case 130:
          drawBarBottom("deepskyblue");
          break;
        case 131:
          drawYellowStopper(col, row);
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
          drawYellowPauser(col, row);
          break;
        case 138:
          drawDirectionChanger4();
          break;
        case 139:
          drawDirectionChanger5();
          break;
        case 140:
          drawSilverBall();
          break;
        case 141:
          drawQuarterCircleStoneBottomLeft(col, row);
          break;
        case 142:
          drawQuarterCircleStoneBottomRight(col, row);
          break;
        case 143:
          drawQuarterCircleStoneTopLeft(col, row);
          break;
        case 144:
          drawQuarterCircleStoneTopRight(col, row);
          break;
        case 145:
          drawHalfStone(col, row, "left");
          break;
        case 146:
          drawHalfStone(col, row, "right");
          break;
        case 147:
          drawHalfStone(col, row, "top");
          break;
        case 148:
          drawHalfStone(col, row, "bottom");
          break;
        case 149:
          drawQuarterStone(col, row, "bottomLeft");
          break;
        case 150:
          drawQuarterStone(col, row, "bottomRight");
          break;
        case 151:
          drawQuarterStone(col, row, "topLeft");
          break;
        case 152:
          drawQuarterStone(col, row, "topRight");
          break;
        case 153:
          drawStonePattern(col, row, 1);
          break;
        case 154:
          drawStonePattern(col, row, 2);
          break;
        case 155:
          drawYellowBallSynchroniser();
          break;
        case 156:
          drawYellowSlowdowner();
          break;
        case 1000:
          // For manual only (empty)
          break;
        default:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          break;
      }

      // Foreground
      if ((gameInfo.travelGate.x === col) && (gameInfo.travelGate.y === row)) {
        drawTravelGate(col, row);
      }

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
