import { getGameInfo } from "./balUtils";
import {
  drawBox,
  drawFilledBox,
  drawFilledCircle,
  drawLine,
  drawText,
} from "./drawUtils";

import { polar } from "./utils";
import { electricityTarget } from "./balUtils";

export default function drawLevel(
  canvas,
  ctx,
  backData,
  gameData,
  nicerGraphics,
  elements,
  status,
  gameInfo,
  wave
) {
  function drawDivingGlasses(color) {
    d1 = w1 / 5;
    d2 = w1 / 4.5;
    d3 = w1 / 2.5;
    d4 = w1 / 10;
    d5 = w1 / 1.8;
    d6 = w1 / 10;
    d7 = w1 / 2.5;
    drawLine(
      ctx,
      Math.round(xmin + d1),
      Math.round(ymin + d2),
      Math.round(xmax - d1),
      Math.round(ymin + d2),
      color
    );
    drawLine(
      ctx,
      Math.round(xmin + d1),
      Math.round(ymin + d2),
      Math.round(xmin + d4),
      Math.round(ymin + d3),
      color
    );
    drawLine(
      ctx,
      Math.round(xmax - d1),
      Math.round(ymin + d2),
      Math.round(xmax - d4),
      Math.round(ymin + d3),
      color
    );
    drawLine(
      ctx,
      Math.round(xmin + d4),
      Math.round(ymin + d3),
      Math.round(xmin + d1),
      Math.round(ymin + d5),
      color
    );
    drawLine(
      ctx,
      Math.round(xmax - d4),
      Math.round(ymin + d3),
      Math.round(xmax - d1),
      Math.round(ymin + d5),
      color
    );
    drawLine(
      ctx,
      Math.round(xmin + d1),
      Math.round(ymin + d5),
      Math.round(xc - d6),
      Math.round(ymin + d5),
      color
    );
    drawLine(
      ctx,
      Math.round(xmax - d1),
      Math.round(ymin + d5),
      Math.round(xc + d6),
      Math.round(ymin + d5),
      color
    );
    drawLine(
      ctx,
      Math.round(xc - d6),
      Math.round(ymin + d5),
      Math.round(xc),
      Math.round(ymin + d7),
      color
    );
    drawLine(
      ctx,
      Math.round(xc + d6),
      Math.round(ymin + d5),
      Math.round(xc),
      Math.round(ymin + d7),
      color
    );
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
  let pt5 = { x: 0, y: 0 };
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

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

      const bd = backData[row][col];
      const gd = gameData[row][col];
      switch (bd) {
        case 20:
          let waterLevel1 = ymin + 1;
          let waterLevel2 = Math.round(ymin + (ymax - ymin) * 0.2);
          pt1.x = xmin;
          pt1.y = ymax;
          pt2.x = xmin;
          pt2.y = waterLevel2;
          switch (wave) {
            case 1:
              pt3.x = (xmin + xc) / 2;
              break;
            case 2:
              pt3.x = xc;
              break;
            case 3:
              pt3.x = (xc + xmax) / 2;
              break;
            case 4:
              pt3.x = xmax;
              break;
            default:
              pt3.x = xc;
              break;
          }
          pt3.y = waterLevel1;
          pt4.x = xmax;
          pt4.y = waterLevel2;
          pt5.x = xmax;
          pt5.y = ymax;
          drawFilledBox(
            ctx,
            xmin,
            waterLevel2,
            w1,
            ymax - waterLevel2 + 1,
            "rgb(0, 0, 90)"
          );
          ctx.fillStyle = "rgb(0, 0, 90)";
          ctx.strokeStyle = "rgb(0, 0, 90)";
          ctx.beginPath();
          //ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.lineTo(pt3.x, pt3.y);
          ctx.lineTo(pt4.x, pt4.y);
          //ctx.lineTo(pt5.x, pt5.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.fill();
          ctx.stroke();
          break;
        case 23:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(0, 0, 90)");
          break;
        case 25:
          drawLine(ctx, xmin, ymin - 0.5, xmin, ymax + 0.5, "white");
          drawLine(ctx, xmax, ymin - 0.5, xmax, ymax + 0.5, "white");
          drawLine(ctx, xmin, yc, xmax, yc, "white");
          break;
        case 90:
          drawLine(ctx, xmin - 0.5, ymin, xmax + 0.5, ymin, "white");
          drawLine(ctx, xmin - 0.5, ymax, xmax + 0.5, ymax, "white");
          drawLine(ctx, xc, ymin, xc, ymax, "white");
          break;
        default:
          // empty
          break;
      }
      switch (gd) {
        case 0:
          // empty
          //drawFilledBox(ctx, xmin, ymin, w1, w2, "black");
          break;
        case 1:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          break;
        case 2:
          // blue ball
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
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "blue"
            );

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

            d1 = w1 / 3.5;
            d2 = w1 / 3;
            d3 = w1 / 2;
            ctx.strokeStyle = "white";
            ctx.beginPath();
            if (status.gameOver) {
              ctx.arc(
                Math.round(xc),
                Math.round(yc + d3),
                Math.round(w1 - 2 * d1),
                1.25 * Math.PI,
                1.75 * Math.PI,
                false
              );
            } else {
              ctx.arc(
                Math.round(xc),
                Math.round(ymin + d2),
                Math.round(w1 - 2 * d1),
                0.25 * Math.PI,
                0.75 * Math.PI,
                false
              );
            }
            ctx.stroke();
            if (gameInfo.hasDivingGlasses) {
              drawDivingGlasses("gray");
            }
          }
          break;
        case 3:
          // green ball
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
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.75,
              w1 * 0.25,
              "green"
            );
          }
          break;
        case 4:
          // white ball
          if (nicerGraphics) {
            ctx.drawImage(elements.elementWhite, xmin, ymin, w1, w2);
          } else {
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "white"
            );
          }
          break;
        case 5:
          //light blue ball
          if (nicerGraphics) {
            ctx.drawImage(elements.elementLightBlue, xmin, ymin, w1, w2);
          } else {
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "deepskyblue"
            );
          }
          break;
        case 6:
        case 106:
          // Elevator up/down
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          d1 = w1 / 3;
          d2 = w1 / 10;
          d3 = w1 / 8;
          drawLine(
            ctx,
            xc,
            Math.round(yc - d1),
            xc,
            Math.round(yc + d1),
            "white"
          );
          drawLine(
            ctx,
            xc,
            Math.round(yc - d1),
            Math.round(xc - d2),
            Math.round(yc - d3),
            "white"
          );
          drawLine(
            ctx,
            xc,
            Math.round(yc - d1),
            Math.round(xc + d2),
            Math.round(yc - d3),
            "white"
          );
          drawLine(
            ctx,
            xc,
            Math.round(yc + d1),
            Math.round(xc - d2),
            Math.round(yc + d3),
            "white"
          );
          drawLine(
            ctx,
            xc,
            Math.round(yc + d1),
            Math.round(xc + d2),
            Math.round(yc + d3),
            "white"
          );
          break;
        //elevator left/right
        case 7:
        case 107:
          // Elevator left/right
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          d1 = w1 / 3;
          d2 = w1 / 10;
          d3 = w1 / 8;
          drawLine(
            ctx,
            Math.round(xc - d1),
            yc,
            Math.round(xc + d1),
            yc,
            "white"
          );
          drawLine(
            ctx,
            Math.round(xc - d1),
            yc,
            Math.round(xc - d3),
            Math.round(yc - d2),
            "white"
          );
          drawLine(
            ctx,
            Math.round(xc - d1),
            yc,
            Math.round(xc - d3),
            Math.round(yc + d2),
            "white"
          );
          drawLine(
            ctx,
            Math.round(xc + d1),
            yc,
            Math.round(xc + d3),
            Math.round(yc - d2),
            "white"
          );
          drawLine(
            ctx,
            Math.round(xc + d1),
            yc,
            Math.round(xc + d3),
            Math.round(yc + d2),
            "white"
          );
          break;
        case 8:
          // red ball
          if (nicerGraphics) {
            ctx.drawImage(elements.elementRed, xmin, ymin, w1, w2);
          } else {
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "red"
            );

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
          break;
        case 9:
          // yellow ball
          if (nicerGraphics) {
            ctx.drawImage(elements.elementYellow, xmin, ymin, w1, w2);
          } else {
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "yellow"
            );
          }
          break;
        case 10:
          // one direction to right >
          drawBox(ctx, xmin, ymin, w1, w2, "white");
          drawLine(ctx, xmin, ymin, xmax, ymin + w2 / 2, "white");
          drawLine(ctx, xmin, ymax, xmax, ymin + w2 / 2, "white");
          break;
        case 11:
          // one direction to left <
          drawBox(ctx, xmin, ymin, w1, w2, "white");
          drawLine(ctx, xmax, ymin, xmin, ymin + w2 / 2, "white");
          drawLine(ctx, xmax, ymax, xmin, ymin + w2 / 2, "white");
          break;
        case 13:
          // Trap door
          ctx.lineWidth = 3;
          drawLine(ctx, xmin, ymin + 1, xmax - 2, ymin + 1, "rgb(70, 70, 70)");
          ctx.lineWidth = 1;
          break;
        case 14:
          // Trap door half open
          ctx.lineWidth = 3;
          d1 = Math.round(w1 / Math.sqrt(2));
          drawLine(
            ctx,
            xmin - 1,
            ymin + 1,
            Math.round(xmin + d1),
            Math.round(ymin + d1),
            "rgb(70, 70, 70)"
          );
          ctx.lineWidth = 1;
          break;
        case 15:
          // wall |\
          ctx.fillStyle = "#464646";
          ctx.beginPath();
          ctx.moveTo(xmin - 1, ymax + 1);
          ctx.lineTo(xmin - 1, ymin - 1);
          ctx.lineTo(xmax + 1, ymax + 1);
          ctx.lineTo(xmin - 1, ymax + 1);
          ctx.fill();
          break;
        case 16:
          // wall /|
          ctx.fillStyle = "#464646";
          ctx.beginPath();
          ctx.moveTo(xmin - 1, ymax + 1);
          ctx.lineTo(xmax + 1, ymin - 1);
          ctx.lineTo(xmax + 1, ymax + 1);
          ctx.lineTo(xmin - 1, ymax + 1);
          ctx.fill();
          break;
        case 17:
          // wall |/
          ctx.fillStyle = "#464646";
          ctx.beginPath();
          ctx.moveTo(xmin - 1, ymax + 1);
          ctx.lineTo(xmin - 1, ymin - 1);
          ctx.lineTo(xmax + 1, ymin - 1);
          ctx.lineTo(xmin - 1, ymax + 1);
          ctx.fill();
          break;
        case 18:
          // wall \|
          ctx.fillStyle = "#464646";
          ctx.beginPath();
          ctx.moveTo(xmin - 1, ymin - 1);
          ctx.lineTo(xmax + 1, ymin - 1);
          ctx.lineTo(xmax + 1, ymax + 1);
          ctx.lineTo(xmin - 1, ymin - 1);
          ctx.fill();
          break;
        case 26:
          drawDivingGlasses("gray");
          break;
        case 27:
          // Red fish - will be drawn later
          break;
        case 28:
          // purple ball
          if (nicerGraphics) {
            ctx.drawImage(elements.elementPurple, xmin, ymin, w1, w2);
          } else {
            drawFilledCircle(
              ctx,
              xmin + w1 * 0.5,
              (row + 1) * w1 - w1 * 0.5,
              w1 * 0.5,
              "darkmagenta"
            );
          }
          break;
        case 31:
          // teleport - will be drawn later
          break;
        case 36:
          // Bomb
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          let factor = 0.1;
          d1 = w1 / 6;
          d2 = w1 / 2;
          d3 = d2 + Math.round(w2 * factor);
          d4 = d3 + Math.round(w2 * factor);
          d5 = d4 + Math.round(w2 * factor);
          d6 = w1 / 6;
          drawFilledBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d2),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "red"
          );
          drawBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d2),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "black"
          );
          drawFilledBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d3),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "red"
          );
          drawBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d3),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "black"
          );
          drawFilledBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d4),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "red"
          );
          drawBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d4),
            w1 - Math.round(2 * d1),
            Math.round(w2 * factor),
            "black"
          );
          drawLine(
            ctx,
            Math.round(xc - d6),
            Math.round(ymin + d2),
            Math.round(xc - d6),
            Math.round(ymin + d5)
          );
          drawLine(
            ctx,
            Math.round(xc + d6),
            Math.round(ymin + d2),
            Math.round(xc + d6),
            Math.round(ymin + d5)
          );
          break;
        case 37:
          // Detonator
          d1 = w1 / 7;
          d2 = w1 / 2;
          d3 = w1 / 1;
          d4 = w1 / 8;
          d5 = w1 / 6;
          drawFilledBox(
            ctx,
            Math.round(xmin + d1),
            Math.round(ymin + d2),
            w1 - Math.round(2 * d1),
            Math.round(w2 - d2),
            "red"
          );
          drawLine(
            ctx,
            xc,
            Math.round(ymin + d4),
            xc,
            Math.round(ymin + d2),
            "rgb(220,220,220)"
          );
          drawLine(
            ctx,
            Math.round(xc - d5),
            Math.round(ymin + d4),
            Math.round(xc + d5),
            Math.round(ymin + d4),
            "rgb(220,220,220)"
          );
          drawText(
            ctx,
            xc,
            ymin + w2 * 0.8,
            "TNT",
            "middle",
            "white",
            Math.round(w2 * 0.45),
            Math.round(w1 * 0.65),
            "white",
            1
          );
          break;
        case 38:
          // Explosion
          ctx.fillStyle = "yellow";
          ctx.beginPath();
          d1 = w1 / 10;
          d2 = w2 / 2;
          ctx.moveTo(Math.round(xc - d1), Math.round(yc - d2));
          d1 = w1 / 8;
          d2 = w2 / 7;
          ctx.lineTo(Math.round(xc + d1), Math.round(yc - d2));
          d1 = w1 / 2;
          d2 = 0;
          ctx.lineTo(Math.round(xc + d1), Math.round(yc - d2));
          d1 = w1 / 6;
          d2 = w2 / 7;
          ctx.lineTo(Math.round(xc + d1), Math.round(yc + d2));
          d1 = w1 / 8;
          d2 = w2 / 2;
          ctx.lineTo(Math.round(xc + d1), Math.round(yc + d2));
          d1 = w1 / 8;
          d2 = w2 / 9;
          ctx.lineTo(Math.round(xc - d1), Math.round(yc + d2));
          d1 = w1 / 2.5;
          d2 = 0;
          ctx.lineTo(Math.round(xc - d1), Math.round(yc - d2));
          d1 = w1 / 4;
          d2 = w2 / 12;
          ctx.lineTo(Math.round(xc - d1), Math.round(yc - d2));
          ctx.closePath();
          ctx.fill();
          break;
        case 84:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
          drawLine(ctx, xmin, ymax, xmax, ymin, "black");
          break;
        case 85:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
          drawLine(ctx, xmin, ymin, xmax, ymax, "black");
          break;
        case 86:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "yellow");
          break;
        case 87:
          // one direction up ^
          drawBox(ctx, xmin, ymin, w1, w2, "white");
          drawLine(ctx, xmin, ymax, xc, ymin, "white");
          drawLine(ctx, xmax, ymax, xc, ymin, "white");
          break;
        case 88:
          // one direction down v
          drawBox(ctx, xmin, ymin, w1, w2, "white");
          drawLine(ctx, xmin, ymin, xc, ymax, "white");
          drawLine(ctx, xmax, ymin, xc, ymax, "white");
          break;
        case 89:
          // rotate game t
          drawBox(ctx, xmin + 1, ymin + 1, w1 - 2, w2 - 2, "white");
          d1 = w1 * 0.3;
          d2 = w1 * 0.15;
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.arc(
            Math.round(xc),
            Math.round(yc),
            Math.round(d1),
            0.75 * Math.PI,
            0.25 * Math.PI,
            false
          );
          ctx.stroke();
          pt1 = polar(xc, yc, 45, d1);
          pt1.x -= 1;
          pt2 = polar(pt1.x, pt1.y, 0, d2);
          pt3 = polar(pt1.x, pt1.y, -90, d2);
          drawLine(
            ctx,
            Math.round(pt1.x),
            Math.round(pt1.y),
            Math.round(pt2.x),
            Math.round(pt2.y),
            "white"
          );
          drawLine(
            ctx,
            Math.round(pt1.x),
            Math.round(pt1.y),
            Math.round(pt3.x),
            Math.round(pt3.y),
            "white"
          );
          break;
        case 91:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
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
          break;
        default:
          // empty
          drawFilledBox(ctx, xmin, ymin, w1, w2, "rgb(70, 70, 70)");
          break;
      }
      xmin += size1;
    }
    ymin += size1;
  }
  ctx.lineWidth = 3;
  for (let i = 0; i < gameInfo.teleports.length; i++) {
    drawBox(
      ctx,
      gameInfo.teleports[i].x * size1 + leftMargin + 1,
      gameInfo.teleports[i].y * size1 + topMargin + 1,
      size1 - 2,
      size1 - 2,
      "white"
    );
  }
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

    if (status.laserX1 >= 0 && status.laserX2 >= 0 && status.laserY >= 0) {
      x1 = leftMargin + status.laserX1 * size1;
      x2 = leftMargin + size1 + status.laserX2 * size1;
      y1 = Math.round(status.laserY * size1 + size1 / 2 + topMargin);
      drawLine(ctx, x1, y1, x2, y1, "yellow");
    }
  }
}
