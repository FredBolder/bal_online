import {
  drawBox,
  drawFilledBox,
  drawFilledCircle,
  drawLine,
  drawText,
} from "./drawUtils";

import { booleanToInt, polar, randomInt } from "./utils";
import { electricityTarget } from "./balUtils";

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
  wave,
  bgcolor,
  fgcolor
) {

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

  function drawBall(color) {
    drawFilledCircle(ctx, xc, yc, w1 * 0.5, color);
  }

  function drawBlueBall() {
    if (nicerGraphics) {
      if (gameInfo.hasDivingGlasses) {
        ctx.drawImage(elements.elementDiving, xmin, ymin, w1, w2);
      } else {
        if (status.gameOver) {
          ctx.drawImage(elements.elementSad, xmin, ymin, w1, w2);
        } else {
          ctx.drawImage(elements.elementHappy, xmin, ymin, w1, w2);
        }
      }
    } else {
      drawBall("blue");

      eye = Math.round(w1 / 20);
      if (eye < 1) {
        eye = 1;
      }
      d1 = size1 / 3.25;
      d2 = Math.round(w1 / 12);
      drawFilledCircle(ctx, xmin + d1, yc - d2, eye, "white");
      drawFilledCircle(ctx, xmax - d1, yc - d2, eye, "white");

      d1 = w1 / 3.5;
      d2 = w1 / 3;
      d3 = w1 / 2;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      if (status.gameOver) {
        ctx.arc(xc, yc + d3, w1 - 2 * d1, 1.25 * Math.PI, 1.75 * Math.PI, false);
      } else {
        ctx.arc(xc, ymin + d2, w1 - 2 * d1, 0.25 * Math.PI, 0.75 * Math.PI, false);
      }
      ctx.stroke();
      if (gameInfo.hasDivingGlasses) {
        drawDivingGlasses("gray");
      }
    }
  }

  function drawBomb(x, y) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    let factor = 0.1;
    d1 = w1 / 6;
    d2 = w1 / 2;
    d3 = d2 + w2 * factor;
    d4 = d3 + w2 * factor;
    d5 = d4 + w2 * factor;
    d6 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 * factor, "red");
    drawBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 * factor, "black");
    drawFilledBox(ctx, xmin + d1, ymin + d3, w1 - 2 * d1, w2 * factor, "red");
    drawBox(ctx, xmin + d1, ymin + d3, w1 - 2 * d1, w2 * factor, "black");
    drawFilledBox(ctx, xmin + d1, ymin + d4, w1 - 2 * d1, w2 * factor, "red");
    drawBox(ctx, xmin + d1, ymin + d4, w1 - 2 * d1, w2 * factor, "black");
    drawLine(ctx, xc - d6, ymin + d2, xc - d6, ymin + d5);
    drawLine(ctx, xc + d6, ymin + d2, xc + d6, ymin + d5);
  }

  function drawCopier() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "white");
    drawText(ctx, xc, yc, "2x", "middle", "black", w2 * 0.7, w1 * 0.8, "black", 1);
  }

  function drawDetonator() {
    d1 = w1 / 7;
    d2 = w1 / 2;
    d3 = w1 / 1;
    d4 = w1 / 8;
    d5 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, ymin + d2, w1 - 2 * d1, w2 - d2, "red");
    drawLine(ctx, xc, ymin + d4, xc, ymin + d2, "rgb(220,220,220)");
    drawLine(ctx, xc - d5, ymin + d4, xc + d5, ymin + d4, "rgb(220,220,220)");
    drawText(ctx, xc, ymin + w2 * 0.8, "TNT", "middle", "white", w2 * 0.45, w1 * 0.65, "white", 1);
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

  function drawDivingGlasses(color) {
    d1 = w1 / 5;
    d2 = w1 / 4.5;
    d3 = w1 / 2.5;
    d4 = w1 / 10;
    d5 = w1 / 1.8;
    d6 = w1 / 10;
    d7 = w1 / 2.5;
    drawLine(ctx, xmin + d1, ymin + d2, xmax - d1, ymin + d2, color);
    drawLine(ctx, xmin + d1, ymin + d2, xmin + d4, ymin + d3, color);
    drawLine(ctx, xmax - d1, ymin + d2, xmax - d4, ymin + d3, color);
    drawLine(ctx, xmin + d4, ymin + d3, xmin + d1, ymin + d5, color);
    drawLine(ctx, xmax - d4, ymin + d3, xmax - d1, ymin + d5, color);
    drawLine(ctx, xmin + d1, ymin + d5, xc - d6, ymin + d5, color);
    drawLine(ctx, xmax - d1, ymin + d5, xc + d6, ymin + d5, color);
    drawLine(ctx, xc - d6, ymin + d5, xc, ymin + d7, color);
    drawLine(ctx, xc + d6, ymin + d5, xc, ymin + d7, color);
  }

  function drawElectricity(x, y) {
    drawFilledBox(ctx, xmin, ymin, w1, w2, getFgcolor(x, y, "rgb(70, 70, 70)"));
    d1 = Math.round(w1 * 0.06);
    d2 = Math.round(w1 * 0.28);
    d3 = Math.round(w1 * 0.14);
    d4 = Math.round(w1 * 0.2);
    d5 = Math.round(w1 * 0.3);
    d6 = Math.round(w1 * 0.07);
    d7 = Math.round(w1 * 0.04);
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

  function ElevatorEntranceAndExit(x, y) {
    const color = getFgcolor(x, y, "white");
    d1 = w1 / 3;
    d2 = w1 / 10;
    d3 = w1 / 8;
    d4 = w1 / 8;
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
    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    d1 = w1 / 3;
    d2 = w1 / 10;
    d3 = w1 / 8;
    drawLine(ctx, xc - d1, yc, xc + d1, yc, "white");
    drawLine(ctx, xc - d1, yc, xc - d3, yc - d2, "white");
    drawLine(ctx, xc - d1, yc, xc - d3, yc + d2, "white");
    drawLine(ctx, xc + d1, yc, xc + d3, yc - d2, "white");
    drawLine(ctx, xc + d1, yc, xc + d3, yc + d2, "white");
  }

  function drawElevatorUpDown() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    d1 = w1 / 3;
    d2 = w1 / 10;
    d3 = w1 / 8;
    drawLine(ctx, xc, yc - d1, xc, yc + d1, "white");
    drawLine(ctx, xc, yc - d1, xc - d2, yc - d3), "white";
    drawLine(ctx, xc, yc - d1, xc + d2, yc - d3), "white";
    drawLine(ctx, xc, yc + d1, xc - d2, yc + d3), "white";
    drawLine(ctx, xc, yc + d1, xc + d2, yc + d3), "white";
  }

  function drawExplosion() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    d1 = w1 / 10;
    d2 = w2 / 2;
    ctx.moveTo(xc - d1, yc - d2);
    d1 = w1 / 8;
    d2 = w2 / 7;
    ctx.lineTo(xc + d1, yc - d2);
    d1 = w1 / 2;
    d2 = 0;
    ctx.lineTo(xc + d1, yc - d2);
    d1 = w1 / 6;
    d2 = w2 / 7;
    ctx.lineTo(xc + d1, yc + d2);
    d1 = w1 / 8;
    d2 = w2 / 2;
    ctx.lineTo(xc + d1, yc + d2);
    d1 = w1 / 8;
    d2 = w2 / 9;
    ctx.lineTo(xc - d1, yc + d2);
    d1 = w1 / 2.5;
    d2 = 0;
    ctx.lineTo(xc - d1, yc - d2);
    d1 = w1 / 4;
    d2 = w2 / 12;
    ctx.lineTo(xc - d1, yc - d2);
    ctx.closePath();
    ctx.fill();
  }

  function drawForceDown() {
    d1 = w2 / 8;
    d2 = w1 / 8;
    d3 = w2 / 4;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    for (let i = -1; i <= 1; i++) {
      d4 = (w1 / 3) * i;
      drawLine(ctx, xc + d4, ymin + d1, xc + d4, ymax - d1, "white");
      drawLine(ctx, xc + d4, ymax - d1, xc + d4 - d2, ymax - d1 - d3, "white");
      drawLine(ctx, xc + d4, ymax - d1, xc + d4 + d2, ymax - d1 - d3, "white");
    }
  }

  function drawForceLeft() {
    d1 = w1 / 8;
    d2 = w2 / 8;
    d3 = w1 / 4;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    for (let i = -1; i <= 1; i++) {
      d4 = (w2 / 3) * i;
      drawLine(ctx, xmin + d1, yc + d4, xmax - d1, yc + d4, "white");
      drawLine(ctx, xmin + d1, yc + d4, xmin + d1 + d3, yc + d4 - d2, "white");
      drawLine(ctx, xmin + d1, yc + d4, xmin + d1 + d3, yc + d4 + d2, "white");
    }
  }

  function drawForceRight() {
    d1 = w1 / 8;
    d2 = w2 / 8;
    d3 = w1 / 4;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    for (let i = -1; i <= 1; i++) {
      d4 = (w2 / 3) * i;
      drawLine(ctx, xmin + d1, yc + d4, xmax - d1, yc + d4, "white");
      drawLine(ctx, xmax - d1, yc + d4, xmax - d1 - d3, yc + d4 - d2, "white");
      drawLine(ctx, xmax - d1, yc + d4, xmax - d1 - d3, yc + d4 + d2, "white");
    }
  }

  function drawForceUp() {
    d1 = w2 / 8;
    d2 = w1 / 8;
    d3 = w2 / 4;

    drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
    for (let i = -1; i <= 1; i++) {
      d4 = (w1 / 3) * i;
      drawLine(ctx, xc + d4, ymin + d1, xc + d4, ymax - d1, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 - d2, ymin + d1 + d3, "white");
      drawLine(ctx, xc + d4, ymin + d1, xc + d4 + d2, ymin + d1 + d3, "white");
    }
  }

  function drawGameRotator() {
    let pt1 = { x: 0, y: 0 };
    let pt2 = { x: 0, y: 0 };
    let pt3 = { x: 0, y: 0 };

    drawBox(ctx, xmin + 1, ymin + 1, w1 - 2, w2 - 2, "white");
    d1 = w1 * 0.3;
    d2 = w1 * 0.15;
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
      ctx.drawImage(
        elements.elementGreen,
        xmin + w1 * 0.25,
        ymin,
        w1 * 0.5,
        w2 * 0.5
      );
    } else {
      drawFilledCircle(
        ctx,
        w1 * 0.5 + xmin,
        w1 * 0.25 + ymin,
        w1 * 0.25,
        "green"
      );
    }
  }

  function drawHorizontalLadder() {
    // Code: 90, h
    drawLine(ctx, xmin - 0.5, ymin, xmax + 0.5, ymin, "white");
    drawLine(ctx, xmin - 0.5, ymax, xmax + 0.5, ymax, "white");
    drawLine(ctx, xc, ymin, xc, ymax, "white");
  }

  function drawKey() {
    d1 = w1 / 4;
    d2 = w1 / 7;
    d3 = w1 / 15; // Radius X
    d4 = w1 / 7;  // Radius Y
    d5 = w1 / 5;
    d6 = w1 / 4;
    d7 = w1 / 7;
    ctx.strokeStyle = "silver";
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.beginPath();
    ctx.ellipse(Math.round(xmin + d1), Math.round(yc), Math.round(d3), Math.round(d4), 0, 0, 2 * Math.PI, false);
    ctx.stroke();
    drawLine(ctx, xmin + d1 + d3, yc, xmax - d2, yc, "silver");
    drawLine(ctx, xmax - d2, yc, xmax - d2, yc + d5, "silver");
    drawLine(ctx, xmax - d6, yc, xmax - d6, yc + d7, "silver");
  }

  function drawLadder() {
    // Code: 25, =
    drawLine(ctx, xmin, ymin - 0.5, xmin, ymax + 0.5, "white");
    drawLine(ctx, xmax, ymin - 0.5, xmax, ymax + 0.5, "white");
    drawLine(ctx, xmin, yc, xmax, yc, "white");
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
    d1 = w1 / 2.5;
    d2 = w2 / 4;
    d3 = w2 / 4; // Length of screw
    d4 = d3 / 4;
    d5 = w2 / 15;
    d6 = w1 / 2.2;
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
    d1 = w1 / 4;
    d2 = w1 / 12;
    d3 = w1 / 10;
    d4 = w1 / 6;
    d5 = w1 / 6;
    drawFilledBox(ctx, xmin + d1, yc, (xmax - d1) - (xmin + d1), (w2 / 2) - d2, "gold");
    ctx.strokeStyle = "silver";
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.beginPath();
    d6 = ymin + d3 + d5;
    ctx.ellipse(Math.round(xc), Math.round(d6), Math.round(d4), Math.round(d5), 0, Math.PI, 2 * Math.PI, false);
    ctx.stroke();
    drawLine(ctx, xc - d4, d6, xc - d4, yc, "silver");
    drawLine(ctx, xc + d4, d6, xc + d4, yc, "silver");
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
    d1 = w1 / 4;
    d2 = w1 / 4;
    d3 = w1 / 3;
    ctx.lineWidth = 3;
    drawLine(ctx, xmin + d1, ymin + d1, xmax - d2, ymax - d2, "silver");
    ctx.lineWidth = 1;
    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
    ctx.beginPath();
    ctx.ellipse(xc + d3, yc + d3, w1 * 0.7, w2 * 0.7, 0, 1.1 * Math.PI, 1.4 * Math.PI, false);
    ctx.stroke();
  }

  function drawPurpleBall() {
    if (nicerGraphics) {
      ctx.drawImage(elements.elementPurple, xmin, ymin, w1, w2);
    } else {
      drawBall("darkmagenta");
    }
  }

  function drawPurpleBarBottom() {
    drawBall("darkmagenta");
    drawFilledBox(ctx, xmin, ymin, w1, w2 / 2, "darkmagenta");
  }

  function drawPurpleBarLeft() {
    drawBall("darkmagenta");
    drawFilledBox(ctx, xc, ymin, w1 / 2, w2, "darkmagenta");
  }

  function drawPurpleBarMiddle() {
    drawFilledBox(ctx, xmin, ymin, w1, w2, "darkmagenta");
  }

  function drawPurpleBarRight() {
    drawBall("darkmagenta");
    drawFilledBox(ctx, xmin, ymin, w1 / 2, w2, "darkmagenta");
  }

  function drawPurpleBarTop() {
    drawBall("darkmagenta");
    drawFilledBox(ctx, xmin, yc, w1, w2 / 2, "darkmagenta");
  }

  function drawRedBall() {
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

  function drawSmallLadder() {
    d1 = w1 / 8;
    d2 = w2 / 8;
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

  function drawStoneTriangle90BottomLeft(x, y) {
    // Shape: |\, code: 15, G 
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(xmin - 1, ymax + 1);
    ctx.lineTo(xmin - 1, ymin - 1);
    ctx.lineTo(xmax + 1, ymax + 1);
    ctx.lineTo(xmin - 1, ymax + 1);
    ctx.fill();
  }

  function drawStoneTriangle90BottomRight(x, y) {
    // Shape: /|, code: 16, H 
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(xmin - 1, ymax + 1);
    ctx.lineTo(xmax + 1, ymin - 1);
    ctx.lineTo(xmax + 1, ymax + 1);
    ctx.lineTo(xmin - 1, ymax + 1);
    ctx.fill();
  }

  function drawStoneTriangle90TopLeft(x, y) {
    // Shape: |/, code: 17, I
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(xmin - 1, ymax + 1);
    ctx.lineTo(xmin - 1, ymin - 1);
    ctx.lineTo(xmax + 1, ymin - 1);
    ctx.lineTo(xmin - 1, ymax + 1);
    ctx.fill();
  }

  function drawStoneTriangle90TopRight(x, y) {
    // Shape: \|, code: 18, J
    ctx.fillStyle = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.beginPath();
    ctx.moveTo(xmin - 1, ymin - 1);
    ctx.lineTo(xmax + 1, ymin - 1);
    ctx.lineTo(xmax + 1, ymax + 1);
    ctx.lineTo(xmin - 1, ymin - 1);
    ctx.fill();
  }

  function drawTrapDoor() {
    ctx.lineWidth = 3;
    drawLine(ctx, xmin, ymin + 1, xmax - 2, ymin + 1, "rgb(70, 70, 70)");
    ctx.lineWidth = 1;
  }

  function drawTrapDoorHalfOpen() {
    ctx.lineWidth = 3;
    d1 = Math.round(w1 / Math.sqrt(2));
    drawLine(ctx, xmin - 1, ymin + 1, xmin + d1, ymin + d1, "rgb(70, 70, 70)");
    ctx.lineWidth = 1;
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

  function drawWaterSurfaceRight(x, y) {
    let fg;
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
    // Wave
    ctx.fillStyle = "rgb(0, 0, 90)";
    ctx.strokeStyle = "rgb(0, 0, 90)";
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.lineTo(pt3.x, pt3.y);
    ctx.lineTo(pt1.x, pt1.y);
    ctx.fill();
    ctx.stroke();
    // Water
    ctx.fillStyle = "rgb(0, 0, 90)";
    ctx.strokeStyle = "rgb(0, 0, 90)";
    ctx.beginPath();
    ctx.moveTo(xmin, waterLevel2);
    ctx.lineTo(xmax + 0.5, waterLevel2);
    ctx.lineTo(xmax + 0.5, ymax);
    ctx.lineTo(xmin, waterLevel2);
    ctx.fill();
    ctx.stroke();
    // Stone or sand
    fg = getFgcolor(x, y, "rgb(70, 70, 70)");
    ctx.fillStyle = fg;
    ctx.strokeStyle = fg;
    ctx.beginPath();
    ctx.moveTo(xmin, waterLevel2);
    ctx.lineTo(xmax, ymax);
    ctx.lineTo(xmin, ymax);
    ctx.lineTo(xmin, waterLevel2);
    ctx.fill();
    ctx.stroke();
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
  let eye = 0;
  let d1 = 0;
  let d2 = 0;
  let d3 = 0;
  let d4 = 0;
  let d5 = 0;
  let d6 = 0;
  let d7 = 0;
  let pt1 = { x: 0, y: 0 };
  let pt2 = { x: 0, y: 0 };
  let pt3 = { x: 0, y: 0 };
  let pt4 = { x: 0, y: 0 };
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;

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
          drawLadder();
          break;
        case 90:
          drawHorizontalLadder();
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
        case 13:
          drawTrapDoor();
          break;
        case 14:
          drawTrapDoorHalfOpen();
          break;
        case 15:
          drawStoneTriangle90BottomLeft(col, row);
          break;
        case 16:
          drawStoneTriangle90BottomRight(col, row);
          break;
        case 17:
          drawStoneTriangle90TopLeft(col, row);
          break;
        case 18:
          drawStoneTriangle90TopRight(col, row);
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
          drawKey();
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
          drawDetonator();
          break;
        case 38:
          drawExplosion();
          break;
        case 39:
          ElevatorEntranceAndExit(col, row);
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
          drawPurpleBarLeft();
          break;
        case 101:
          drawPurpleBarRight();
          break;
        case 102:
          drawPurpleBarMiddle();
          break;
        case 103:
          drawPurpleBarTop();
          break;
        case 104:
          drawPurpleBarBottom();
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
          drawWaterSurfaceRight(col, row);
          break;
        case 1000:
          // For manual only (empty)
          break;
        default:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          break;
      }
      xmin += size1;
    }
    ymin += size1;
  }
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

  // Fish
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

  // Electricity
  if (gameInfo.electricityActive) {
    for (let i = 0; i < gameInfo.electricity.length; i++) {
      const elec = gameInfo.electricity[i];
      let elecTarget = electricityTarget(backData, gameData, elec.x, elec.y);
      if (elecTarget > 0 && Math.abs(elec.y - elecTarget) > 1) {
        x1 = Math.round(leftMargin + elec.x * size1 + 0.5 * size1);
        y1 = (elec.y + 1) * size1 + topMargin;
        ctx.strokeStyle = "rgb(207, 159, 255)";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        for (let j = elec.y + 1; j < elecTarget; j++) {
          x2 = x1;
          if (j < elecTarget - 1) {
            x2 += Math.round(size1 * 0.8 * (Math.random() - 0.5));
          }
          y1 += size1;
          ctx.lineTo(x2, y1);
        }
        ctx.stroke();
      }
    }
  }

  // Game Over
  if (status.gameOver) {
    x1 = leftMargin + gameWidth / 2;
    y1 = gameHeight / 2 + topMargin;
    drawText(
      ctx,
      x1,
      y1,
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
}

export { clearBitMapLava, drawLevel };
