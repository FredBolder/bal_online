import { drawStar } from "./drawAnswerBallIcons.js";
import { displayColor } from "./balUtils.js";
import { drawCoralReefPlant } from "./coralReefPlants.js";
import { drawBox, drawFilledBox, drawText } from "./drawUtils.js";
import { fixScroll } from "./createLevelMode.js";
import { drawFishFoodInPot } from "./fishFood.js";
import { drawTail } from "./fishTails.js";
import { drawFlames } from "./flamethrowers.js";
import { globalVars } from "./glob.js";
import { drawSpikeBall } from "./spikeBalls.js"
import { buildPatternLayer } from "./stonePatterns.js";
import { drawFish, presetTropicalFish } from "./tropicalFish.js";

import {
  clearBitMapLava,
  drawAbbreviation,
  drawAllTeleports,
  drawAnemone,
  drawAnswerBall,
  drawArrow,
  drawBallSynchroniser,
  drawBarBottom,
  drawBarLeft,
  drawBarMiddle,
  drawBarRight,
  drawBarTop,
  drawBlueBall,
  drawBomb,
  drawBrownBall,
  drawChanger,
  drawChangerColors,
  drawChordTypeOrInterval,
  drawCoilSpring,
  drawColor,
  drawConveyorBelt,
  drawCopier,
  drawDamagedStone,
  drawDelay,
  drawDetector,
  drawDetonator,
  drawDiamant,
  drawDirectionChanger1,
  drawDirectionChanger2,
  drawDirectionChanger3,
  drawDirectionChanger4,
  drawDirectionChanger5,
  drawDirections,
  drawDisappearingStone,
  drawDivingGlasses,
  drawDoor,
  drawElectricity,
  drawElectricityActive,
  drawElevatorDirectionChanger1,
  drawElevatorDirectionChanger2,
  drawElevatorEntranceAndExit,
  drawElevatorLeftRight,
  drawElevatorUpDown,
  drawExplosion,
  drawFishColors,
  drawFishFoodObject,
  drawFlamethrower,
  drawForceDown,
  drawForceLeft,
  drawForceRight,
  drawForceUp,
  drawFreezeGun,
  drawGameOver,
  drawGameRotator,
  drawGravityChangerDown,
  drawGravityChangerUp,
  drawGrayBall,
  drawHalfStone,
  drawHorizontalLadder,
  drawHorizontalRope,
  drawJellyfish,
  drawKey,
  drawLadder,
  drawLava,
  drawLightBlueBall,
  drawLightBulb,
  drawLockedDoor,
  drawLockedDoorColors,
  drawMagnet,
  drawMirror,
  drawMover,
  drawMusicBox,
  drawNext,
  drawNumber,
  drawOneDirectionDown,
  drawOneDirectionLeft,
  drawOneDirectionRight,
  drawOneDirectionUp,
  drawOrangeBall,
  drawPalmTreeTrunkPart,
  drawPanagiotis,
  drawPart,
  drawPattern,
  drawPhaseAbility,
  drawPickaxe,
  drawPinkBall,
  drawPiston,
  drawPistonExtendedPart,
  drawPistonsTrigger,
  drawPrevious,
  drawPropeller,
  drawPurpleBall,
  drawPusher,
  drawQuarterCircleStoneBottomLeft,
  drawQuarterCircleStoneBottomRight,
  drawQuarterCircleStoneConcave,
  drawQuarterCircleStoneTopLeft,
  drawQuarterCircleStoneTopRight,
  drawQuarterStone,
  drawQuestionStone,
  drawRaster,
  drawRedBall,
  drawRedFish,
  drawShrinker,
  drawSides,
  drawSmallBall,
  drawSmallGreenBall,
  drawSmallLadder,
  drawSmallWeakStone,
  drawSpike,
  drawStone,
  drawStonePatternIcon,
  drawStoneShape,
  drawTeleportsCreator,
  drawTimeBomb,
  drawTimeFreezer,
  drawTrapDoor,
  drawTrapDoorHalfOpen,
  drawTravelGate,
  drawTriangleStoneBottomLeft,
  drawTriangleStoneBottomRight,
  drawTriangleStoneTopLeft,
  drawTriangleStoneTopRight,
  drawTropicalFish,
  drawUserObject,
  drawVerticalRope,
  drawWater,
  drawWaterColors,
  drawWaterSurface,
  drawWaterSurfaceLeftOrRight,
  drawWaterWithIce,
  drawWeakStone,
  drawWhiteBall,
  drawYellowBall,
  drawYellowPauser,
  drawYellowPusher,
  drawYellowPushersTrigger,
  drawYellowSlowdowner,
  drawYellowStopper,
  getBgcolor,
  highlightBlueBall,
  highlightSelectedCell,
  highlightTelekinesisObject,
} from "./drawObjects.js";
import { presetUserObject } from "./userObjects.js";

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
  let swayPhase = 0;
  let wavelengthInCols = 8;



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

  // Pattern
  let patternImg = null;
  let stoneLayer = null;
  const context = {
    get backData() { return backData; },
    get bgcolor() { return bgcolor; },
    get columns() { return columns; },
    get ctx() { return ctx; },
    get elements() { return elements; },
    get fgcolor() { return fgcolor; },
    get gameData() { return gameData; },
    get gameInfo() { return gameInfo; },
    get gameVars() { return gameVars; },
    get leftMargin() { return leftMargin; },
    get rows() { return rows; },
    get selectedCell() { return selectedCell; },
    get size1() { return size1; },
    get status() { return status; },
    get stoneLayer() { return stoneLayer; },
    get topMargin() { return topMargin; },
    get w1() { return w1; },
    get w2() { return w2; },
    get wave() { return wave; },
    get xc() { return xc; },
    get xmax() { return xmax; },
    get xmin() { return xmin; },
    get yc() { return yc; },
    get ymax() { return ymax; },
    get ymin() { return ymin; },
  };

  if (gameVars.stonePattern > 0) {
    let numberStr = gameVars.stonePattern.toString();
    if (numberStr.length === 1) {
      numberStr = "0" + numberStr;
    }
    patternImg = globalVars[`patternImg${numberStr}`];
  }
  if (patternImg !== null) {
    stoneLayer = buildPatternLayer(patternImg, columns, rows, size1, size1 / 100);
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
      const backgroundColor = getBgcolor(context, currentCol, currentRow, "");

      const fish = {};
      const userObject = { parameters: [50, 50, 50, 50] };

      if (backgroundColor !== "") {
        drawFilledBox(ctx, xmin, ymin, w1, w2, backgroundColor);
      }
      switch (bd) {
        case 20:
          drawWaterSurface(context);
          break;
        case 22:
          drawLava(context);
          break;
        case 23:
          drawWater(context);
          break;
        case 25:
          drawLadder(context, currentCol, currentRow);
          break;
        case 80:
          drawHorizontalRope(context)
          break;
        case 137:
          drawVerticalRope(context)
          break;
        case 90:
          drawHorizontalLadder(context, currentCol, currentRow);
          break;
        case 170:
          // Teleport - will be drawn later
          break;
        case 252:
          drawWater(context);
          drawAnemone(context, currentCol, currentRow, "background");
          break;
        case 258:
          drawStone(context, currentCol, currentRow);
          if (globalVars.createLevel) {
            drawText(ctx, xc, ymax - (w2 * 0.2), "bg", "center", "white", w2 * 0.7, w1 * 0.8);
          }
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
          drawStoneShape(context, currentCol, currentRow, gd);
          break;
        case -11:
          drawNumber(context, gd - 2000);
          break;
        case -12:
          drawColor(context, gd - 2052);
          break;
        case 1:
          drawStone(context, currentCol, currentRow);
          break;
        case 2:
          drawBlueBall(context);
          break;
        case 3:
          drawSmallGreenBall(context);
          break;
        case 4:
          drawWhiteBall(context, currentCol, currentRow, true);
          break;
        case 5:
          drawLightBlueBall(context);
          break;
        case 6:
        case 106:
          drawElevatorUpDown(context);
          break;
        case 7:
        case 107:
          drawElevatorLeftRight(context);
          break;
        case 8:
          drawRedBall(context, currentCol, currentRow, true);
          break;
        case 9:
          drawYellowBall(context);
          break;
        case 10:
          drawOneDirectionRight(context, currentCol, currentRow);
          break;
        case 11:
          drawOneDirectionLeft(context, currentCol, currentRow);
          break;
        case 12:
          drawDamagedStone(context, currentCol, currentRow);
          break;
        case 13:
          drawTrapDoor(context);
          break;
        case 14:
          drawTrapDoorHalfOpen(context);
          break;
        case 15:
          drawTriangleStoneBottomLeft(context, currentCol, currentRow);
          break;
        case 16:
          drawTriangleStoneBottomRight(context, currentCol, currentRow);
          break;
        case 17:
          drawTriangleStoneTopLeft(context, currentCol, currentRow);
          break;
        case 18:
          drawTriangleStoneTopRight(context, currentCol, currentRow);
          break;
        case 21:
          drawPalmTreeTrunkPart(context);
          break;
        case 24:
          drawPanagiotis(context);
          break;
        case 26:
          drawDivingGlasses(context, "gray");
          break;
        case 27:
          drawRedFish(context, currentCol, currentRow);
          break;
        case 28:
          drawPurpleBall(context);
          break;
        case 29:
          drawKey(context, currentCol, currentRow);
          break;
        case 30:
          drawLockedDoor(context, currentCol, currentRow);
          break;
        case 31:
          // Teleport - will be drawn later
          break;
        case 34:
          drawPickaxe(context, currentCol, currentRow);
          break;
        case 35:
          drawWeakStone(context);
          break;
        case 36:
          drawBomb(context, currentCol, currentRow);
          break;
        case 37:
          drawDetonator(context, currentCol, currentRow);
          break;
        case 38:
          drawExplosion(context);
          break;
        case 39:
          drawElevatorEntranceAndExit(context, currentCol, currentRow);
          break;
        case 40:
          drawOrangeBall(context);
          break;
        case 81:
          drawPropeller(context);
          break;
        case 82:
          drawGrayBall(context, 1);
          break;
        case 83:
          drawGrayBall(context, 0);
          break;
        case 84:
          drawDirectionChanger1(context);
          break;
        case 85:
          drawDirectionChanger2(context);
          break;
        case 86:
          drawDirectionChanger3(context);
          break;
        case 87:
          drawOneDirectionUp(context, currentCol, currentRow);
          break;
        case 88:
          drawOneDirectionDown(context, currentCol, currentRow);
          break;
        case 89:
          drawGameRotator(context);
          break;
        case 91:
          drawElectricity(context, currentCol, currentRow);
          break;
        case 92:
          // Teleport - will be drawn later
          break;
        case 93:
          // Smart red ball (smart level 1)
          drawRedBall(context, currentCol, currentRow, true);
          break;
        case 94:
          // Smart red ball (smart level 2)
          drawRedBall(context, currentCol, currentRow, true);
          break;
        case 95:
          drawMirror(context, true);
          break;
        case 96:
          drawMirror(context, false);
          break;
        case 97:
          drawCopier(context, "white");
          break;
        case 98:
          drawGrayBall(context, 2);
          break;
        case 99:
          drawSmallWeakStone(context);
          break;
        case 100:
          drawBarLeft(context, "darkmagenta");
          break;
        case 101:
          drawBarRight(context, "darkmagenta");
          break;
        case 102:
          drawBarMiddle(context, "darkmagenta");
          break;
        case 103:
          drawBarTop(context, "darkmagenta");
          break;
        case 104:
          drawBarBottom(context, "darkmagenta");
          break;
        case 105:
          drawLightBulb(context);
          break;
        case 108:
          drawSmallLadder(context);
          break;
        case 109:
          drawForceUp(context);
          break;
        case 110:
          drawForceDown(context);
          break;
        case 111:
          drawForceRight(context);
          break;
        case 112:
          drawForceLeft(context);
          break;
        case 113:
          drawWaterSurfaceLeftOrRight(context, currentCol, currentRow, false);
          break;
        case 114:
          drawWaterSurfaceLeftOrRight(context, currentCol, currentRow, true);
          break;
        case 115:
          drawYellowPusher(context);
          break;
        case 116:
          drawYellowPushersTrigger(context, currentCol, currentRow);
          break;
        case 117:
          drawTimeBomb(context, currentCol, currentRow);
          break;
        case 118:
          drawCoilSpring(context, currentCol, currentRow);
          break;
        case 119:
          drawMagnet(context);
          break;
        case 120:
          drawTimeFreezer(context, currentCol, currentRow);
          break;
        case 121:
          drawBarLeft(context, "yellow");
          break;
        case 122:
          drawBarRight(context, "yellow");
          break;
        case 123:
          drawBarMiddle(context, "yellow");
          break;
        case 124:
          drawBarTop(context, "yellow");
          break;
        case 125:
          drawBarBottom(context, "yellow");
          break;
        case 126:
          drawBarLeft(context, displayColor("lightblue"));
          break;
        case 127:
          drawBarRight(context, displayColor("lightblue"));
          break;
        case 128:
          drawBarMiddle(context, displayColor("lightblue"));
          break;
        case 129:
          drawBarTop(context, displayColor("lightblue"));
          break;
        case 130:
          drawBarBottom(context, displayColor("lightblue"));
          break;
        case 131:
          drawYellowStopper(context, currentCol, currentRow);
          break;
        case 132:
          // Travel gate - will be drawn later
          break;
        case 133:
          drawDiamant(context, "yellow");
          break;
        case 134:
          drawDiamant(context, "blue");
          break;
        case 135:
          drawDiamant(context, "red");
          break;
        case 136:
          drawYellowPauser(context, currentCol, currentRow);
          break;
        case 138:
          drawDirectionChanger4(context);
          break;
        case 139:
          drawDirectionChanger5(context);
          break;
        case 140:
          drawSmallBall(context, displayColor("silver"));
          break;
        case 141:
          drawQuarterCircleStoneBottomLeft(context, currentCol, currentRow);
          break;
        case 142:
          drawQuarterCircleStoneBottomRight(context, currentCol, currentRow);
          break;
        case 143:
          drawQuarterCircleStoneTopLeft(context, currentCol, currentRow);
          break;
        case 144:
          drawQuarterCircleStoneTopRight(context, currentCol, currentRow);
          break;
        case 145:
          drawHalfStone(context, currentCol, currentRow, "left");
          break;
        case 146:
          drawHalfStone(context, currentCol, currentRow, "right");
          break;
        case 147:
          drawHalfStone(context, currentCol, currentRow, "top");
          break;
        case 148:
          drawHalfStone(context, currentCol, currentRow, "bottom");
          break;
        case 149:
          drawQuarterStone(context, currentCol, currentRow, "bottomLeft");
          break;
        case 150:
          drawQuarterStone(context, currentCol, currentRow, "bottomRight");
          break;
        case 151:
          drawQuarterStone(context, currentCol, currentRow, "topLeft");
          break;
        case 152:
          drawQuarterStone(context, currentCol, currentRow, "topRight");
          break;
        case 153:
          drawPattern(context, currentCol, currentRow, 1);
          break;
        case 154:
          drawPattern(context, currentCol, currentRow, 2);
          break;
        case 155:
          drawBallSynchroniser(context, "yellow");
          break;
        case 156:
          drawYellowSlowdowner(context);
          break;
        case 157:
          drawMusicBox(context, currentCol, currentRow);
          break;
        case 158:
          drawPistonsTrigger(context, currentCol, currentRow);
          break;
        case 159:
          drawPiston(context, currentCol, currentRow, "up");
          break;
        case 160:
          drawPistonExtendedPart(context, "up");
          break;
        case 161:
          drawPiston(context, currentCol, currentRow, "down");
          break;
        case 162:
          drawPistonExtendedPart(context, "down");
          break;
        case 163:
          drawPiston(context, currentCol, currentRow, "left");
          break;
        case 164:
          drawPistonExtendedPart(context, "left");
          break;
        case 165:
          drawPiston(context, currentCol, currentRow, "right");
          break;
        case 166:
          drawPistonExtendedPart(context, "right");
          break;
        case 167:
          drawDelay(context);
          break;
        case 168:
          drawSmallBall(context, "blue");
          break;
        case 169:
          drawDoor(context);
          break;
        case 171:
          drawConveyorBelt(context, currentCol, currentRow, "left");
          break;
        case 172:
          drawConveyorBelt(context, currentCol, currentRow, "middle");
          break;
        case 173:
          drawConveyorBelt(context, currentCol, currentRow, "right");
          break;
        case 174:
          drawSpike(context, currentCol, currentRow, "up");
          break;
        case 175:
          drawSpike(context, currentCol, currentRow, "down");
          break;
        case 176:
          drawSpike(context, currentCol, currentRow, "right");
          break;
        case 177:
          drawSpike(context, currentCol, currentRow, "left",);
          break;
        case 178:
          drawMover(context, currentCol, currentRow);
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
          drawGameRotator(context, true);
          break;
        case 184:
          drawGravityChangerUp(context, currentCol, currentRow);
          break;
        case 185:
          drawGravityChangerDown(context, currentCol, currentRow);
          break;
        case 186:
          drawChordTypeOrInterval(context, "maj");
          break;
        case 187:
          drawChordTypeOrInterval(context, "min");
          break;
        case 188:
          drawChordTypeOrInterval(context, "aug");
          break;
        case 189:
          drawChordTypeOrInterval(context, "dim");
          break;
        case 190:
          drawChordTypeOrInterval(context, "sus2");
          break;
        case 191:
          drawChordTypeOrInterval(context, "sus4");
          break;
        case 192:
          drawSmallBall(context, "white");
          break;
        case 193:
          drawTeleportsCreator(context, false);
          break;
        case 194:
          drawTeleportsCreator(context, true);
          break;
        case 195:
          drawSmallBall(context, displayColor("lightblue"));
          break;
        case 196:
          drawSmallBall(context, "yellow");
          break;
        case 197:
          drawSmallBall(context, displayColor("purple"));
          break;
        case 198:
          drawDisappearingStone(context, currentCol, currentRow);
          break;
        case 199:
          drawShrinker(context);
          break;
        case 200:
          drawBallSynchroniser(context, "white");
          break;
        case 201:
          drawSmallBall(context, "red");
          break;
        case 202:
          drawSmallBall(context, displayColor("orange"));
          break;
        case 203:
          drawPinkBall(context);
          break;
        case 204:
          drawSmallBall(context, displayColor("pink"));
          break;
        case 205:
          drawFreezeGun(context);
          break;
        case 206:
          drawWaterWithIce(context, currentCol, currentRow);
          break;
        case 207:
          drawPhaseAbility(context);
          break;
        case 208:
          drawCopier(context, "yellow");
          break;
        case 209:
          drawPusher(context, currentCol, currentRow);
          break;
        case 226:
          drawChordTypeOrInterval(context, "7");
          break;
        case 227:
          drawChordTypeOrInterval(context, "maj7");
          break;
        case 228:
          drawChordTypeOrInterval(context, "P5");
          break;
        case 229:
          drawChordTypeOrInterval(context, "P8");
          break;
        case 230:
          drawChordTypeOrInterval(context, "P4");
          break;
        case 231:
          drawChordTypeOrInterval(context, "M2");
          break;
        case 232:
          drawChordTypeOrInterval(context, "m3");
          break;
        case 233:
          drawChordTypeOrInterval(context, "M3");
          break;
        case 234:
          drawPattern(context, currentCol, currentRow, 3);
          break;
        case 235:
          drawPattern(context, currentCol, currentRow, 4);
          break;
        case 236:
          drawPattern(context, currentCol, currentRow, 5);
          break;
        case 237:
          drawPattern(context, currentCol, currentRow, 6);
          break;
        case 238:
          drawPattern(context, currentCol, currentRow, 7);
          break;
        case 239:
          drawPattern(context, currentCol, currentRow, 8);
          break;
        case 240:
          drawPattern(context, currentCol, currentRow, 9);
          break;
        case 241:
          drawQuestionStone(context, currentCol, currentRow);
          break;
        case 242:
          drawAnswerBall(context, currentCol, currentRow, "purple");
          break;
        case 243:
          drawTropicalFish(context, currentCol, currentRow);
          break;
        case 244:
          drawChanger(context, currentCol, currentRow);
          break;
        case 245:
          drawAnswerBall(context, currentCol, currentRow, "white");
          break;
        case 246:
          drawElevatorDirectionChanger1(context);
          break;
        case 247:
          drawElevatorDirectionChanger2(context);
          break;
        case 248:
          drawJellyfish(context, currentCol, currentRow);
          break;
        case 249:
          wavelengthInCols = 10; // how many columns per full 2π wave
          swayPhase = (currentCol / wavelengthInCols) * Math.PI * 2;
          drawCoralReefPlant(ctx, xc, yc, w1, gameVars.plantsSwayAmount, gameVars.plantsSwaySpeed, swayPhase);
          break;
        case 250:
          drawFishFoodInPot(ctx, xmin, ymin, w1);
          break;
        case 251:
          drawFishFoodObject(context, currentCol, currentRow);
          break;
        case 253:
          drawBrownBall(context);
          break;
        case 254:
          drawSmallBall(context, displayColor("brown"));
          break;
        case 255:
          drawDetector(context, currentCol, currentRow);
          break;
        case 256:
          if (gameInfo.spikeBallLooksLikeStone) {
            drawStone(context, currentCol, currentRow);
          } else {
            drawSpikeBall(ctx, xc, yc, w1, 0.125 * Math.PI);
          }
          break;
        case 257:
          drawFlamethrower(context, currentCol, currentRow);
          break;
        case 259:
          drawQuarterCircleStoneConcave(context, currentCol, currentRow, 0);
          break;
        case 260:
          drawQuarterCircleStoneConcave(context, currentCol, currentRow, 3);
          break;
        case 261:
          drawQuarterCircleStoneConcave(context, currentCol, currentRow, 1);
          break;
        case 262:
          drawQuarterCircleStoneConcave(context, currentCol, currentRow, 2);
          break;
        case 263:
          drawUserObject(context, currentCol, currentRow);
          break;
        case 1000:
          // For manual only (empty)
          break;
        case 2033:
          // Group  
          drawAbbreviation(context, "gr");
          break;
        case 2034:
          drawPart(context, "top");
          break;
        case 2035:
          drawPart(context, "middle");
          break;
        case 2038:
          // Sticky
          drawAbbreviation(context, "s");
          break;
        case 2039:
          drawAbbreviation(context, "inv");
          break;
        case 2040:
          drawArrow(context, "left", "white", "black");
          break;
        case 2041:
          drawArrow(context, "right", "white", "black");
          break;
        case 2042:
          drawArrow(context, "up", "white", "black");
          break;
        case 2043:
          drawArrow(context, "down", "white", "black");
          break;
        case 2045:
          // Not smart
          drawAbbreviation(context, "s0");
          break;
        case 2046:
          // A little smart
          drawAbbreviation(context, "s1");
          break;
        case 2047:
          // Smart
          drawAbbreviation(context, "s2");
          break;
        case 2050:
          // Foreground color
          drawAbbreviation(context, "fg");
          break;
        case 2051:
          // Background color
          drawAbbreviation(context, "bg");
          break;
        case 2083:
          // Delete
          drawAbbreviation(context, "del");
          break;
        case 2084:
          // Select
          drawAbbreviation(context, "sel");
          break;
        case 2092:
          // mode
          drawAbbreviation(context, "mode");
          break;
        case 2095:
          drawAbbreviation(context, "move");
          break;
        case 2096:
          drawAbbreviation(context, "copy");
          break;
        case 2097:
          // Toggle raster
          drawRaster(context);
          break;
        case 2098:
          // Show coordinates
          drawAbbreviation(context, "x, y");
          break;
        case 2099:
          // Show info
          drawAbbreviation(context, "?");
          break;
        case 2100:
          drawPrevious(context);
          break;
        case 2101:
          drawNext(context);
          break;
        case 2103:
          drawPart(context, "bottom");
          break;
        case 2104:
          drawAbbreviation(context, "C4", "black", "green");
          break;
        case 2105:
          drawAbbreviation(context, "D4", "black", "green");
          break;
        case 2106:
          drawAbbreviation(context, "E4", "black", "green");
          break;
        case 2107:
          drawAbbreviation(context, "F4", "black", "green");
          break;
        case 2108:
          drawAbbreviation(context, "G4", "black", "green");
          break;
        case 2109:
          drawAbbreviation(context, "A4", "black", "green");
          break;
        case 2110:
          drawAbbreviation(context, "B4", "black", "green");
          break;
        case 2111:
          drawAbbreviation(context, "C5", "black", "green");
          break;
        case 2112:
          drawAbbreviation(context, "D5", "black", "green");
          break;
        case 2113:
          drawAbbreviation(context, "E5", "black", "green");
          break;
        case 2114:
          drawAbbreviation(context, "F5", "black", "green");
          break;
        case 2115:
          drawAbbreviation(context, "G5", "black", "green");
          break;
        case 2116:
          drawAbbreviation(context, "A5", "black", "green");
          break;
        case 2117: "tr"
          drawAbbreviation(context, "B5", "black", "green");
          break;
        case 2118:
          drawAbbreviation(context, "hold", "black", "green");
          break;
        case 2119:
          drawAbbreviation(context, "rest", "black", "green");
          break;
        case 2131:
          // Music box transpose
          drawAbbreviation(context, "♪↕");
          break;
        case 2132:
          drawAbbreviation(context, "instr");
          break;
        case 2133:
          drawDirections(context)
          break;
        case 2134:
          drawAbbreviation(context, "zoom");
          break;
        case 2135:
          // Pan left
          drawAbbreviation(context, "⇦");
          break;
        case 2136:
          // Pan up
          drawAbbreviation(context, "⇧");
          break;
        case 2137:
          // Pan down
          drawAbbreviation(context, "⇩");
          break;
        case 2138:
          // Pan right
          drawAbbreviation(context, "⇨");
          break;
        case 2139:
          drawStonePatternIcon(context, "next");
          break;
        case 2140:
          drawStonePatternIcon(context, "ignore");
          break;
        case 2141:
          drawStonePatternIcon(context, "");
          break;
        case 2142:
          drawAbbreviation(context, "Q", "black", "green");
          break;
        case 2143:
          drawAbbreviation(context, "A", "black", "green");
          break;
        case 2144:
          drawSides(context);
          break;
        case 2145:
          drawAbbreviation(context, "t=");
          break;
        case 2146:
          drawAbbreviation(context, "1 oct");
          break;
        case 2147:
          drawAbbreviation(context, "2 oct");
          break;
        case 2148:
          drawChangerColors(context);
          break;
        case 2149:
          drawFishColors(context);
          break;
        case 2150:
          drawAbbreviation(context, ")))");
          break;
        case 2151:
          drawAbbreviation(context, "shp");
          break;
        case 2152:
          drawAbbreviation(context, "tail");
          break;
        case 2153:
          drawAbbreviation(context, "fins");
          break;
        case 2154:
          drawWater(context);
          presetTropicalFish(fish, "clownfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2155:
          presetTropicalFish(fish, "redtailshark")
          drawWater(context);
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2156:
          drawWater(context);
          presetTropicalFish(fish, "juvenilegoldentrevally")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2157:
          drawWater(context);
          presetTropicalFish(fish, "yellowtailaceicichlid")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2158:
          drawWater(context);
          presetTropicalFish(fish, "siamesealgaeeater")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2159:
          drawWater(context);
          presetTropicalFish(fish, "yellowtaildamselfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2160:
          drawWater(context);
          presetTropicalFish(fish, "zebraangelfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2161:
          drawWater(context);
          presetTropicalFish(fish, "smallmouthgrunt")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2162:
          drawWater(context);
          presetTropicalFish(fish, "bicoloranthias")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2163:
          drawWater(context);
          presetTropicalFish(fish, "bluediamonddiscus")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2164:
          drawWater(context);
          presetTropicalFish(fish, "orangereddiscus")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2165:
          drawWater(context);
          presetTropicalFish(fish, "blackneontetra")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2166:
          drawWater(context);
          presetTropicalFish(fish, "yellowtang")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2167:
          drawWater(context);
          presetTropicalFish(fish, "purpletang")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2168:
          drawWater(context);
          presetTropicalFish(fish, "brighamssnapper")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2169:
          drawWater(context);
          presetTropicalFish(fish, "bluechromis")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2170:
          drawWater(context);
          presetTropicalFish(fish, "yellowfintuna")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2171:
          drawWater(context);
          presetTropicalFish(fish, "rustyjobfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2172:
          drawWater(context);
          presetTropicalFish(fish, "electriccatfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2173:
          drawWater(context);
          presetTropicalFish(fish, "bandedtilapia")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2174:
          drawWater(context);
          presetTropicalFish(fish, "rainbowrunner")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2175:
          drawWater(context);
          presetTropicalFish(fish, "caribbeanreefshark")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2176:
          drawWater(context);
          presetTropicalFish(fish, "flagtailprochilodus")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2177:
          drawWater(context);
          presetTropicalFish(fish, "longtailredsnapper")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2178:
          drawWater(context);
          presetTropicalFish(fish, "albinoangelfish")
          drawFish(ctx, xc, yc, w1, false, fish);
          break;
        case 2200:
          drawWaterColors(context);
          break;
        case 2201:
          drawAbbreviation(context, "TA");
          break;
        case 2202:
          drawAbbreviation(context, "disp");
          break;
        case 2203:
          drawAbbreviation(context, "msg");
          break;
        case 2204:
          drawAbbreviation(context, "targ");
          break;
        case 2205:
          drawAbbreviation(context, "if", "black", "green");
          break;
        case 2206:
          drawAbbreviation(context, "cmd", "black", "green");
          break;
        case 2207:
          drawAbbreviation(context, "1x");
          break;
        case 2208:
          drawAbbreviation(context, "mov");
          break;
        case 2209:
          drawAbbreviation(context, "seq");
          break;
        case 2210:
          drawAbbreviation(context, "evt", "black", "green");
          break;
        case 2211:
          drawAbbreviation(context, "1cmd");
          break;
        case 2212:
          drawAbbreviation(context, "rep");
          break;
        case 2213:
          drawWater(context);
          drawTail(ctx, xmin + (w1 * 0.25), yc, 1, w1 * 0.5, w2 * 0.6, w2 * 0.1, {
            stripe: "#000000", tail: "#DDDDDD", tailStripe: "#000000", upperTail: null
          }, 5);
          break;
        case 2214:
          drawLockedDoorColors(context);
          break;
        case 2215:
          drawAbbreviation(context, "range");
          break;
        case 2216:
          drawAbbreviation(context, "notes");
          break;
        case 2217:
          drawAbbreviation(context, "st/m");
          break;
        case 2218:
          drawAbbreviation(context, "vol");
          break;
        case 2219:
          drawAbbreviation(context, "pat");
          break;
        case 2220:
          drawStonePatternIcon(context, "previous");
          break;
        case 2221:
          drawAbbreviation(context, "gr. 2");
          break;
        case 2222:
          drawAbbreviation(context, globalVars.createLevelEditMode ? "EDIT" : "REPL", "darkgreen", "white");
          break;
        case 2223:
          drawAbbreviation(context, "rand");
          break;
        case 2224:
          drawAbbreviation(context, "par", "black", "green");
          break;
        case 2225:
          drawAbbreviation(context, "col 1", "black", "green");
          break;
        case 2226:
          drawAbbreviation(context, "col 2", "black", "green");
          break;
        case 2227:
          presetUserObject(userObject, "stretcherbond1");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2228:
          presetUserObject(userObject, "stretcherbond2");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2229:
          presetUserObject(userObject, "flemishbond1");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2230:
          presetUserObject(userObject, "flemishbond2");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2231:
          presetUserObject(userObject, "englishbond");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2232:
          presetUserObject(userObject, "headerbond");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2233:
          presetUserObject(userObject, "longbricks1");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2234:
          presetUserObject(userObject, "longbricks2");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2235:
          presetUserObject(userObject, "monkbond1");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2236:
          presetUserObject(userObject, "monkbond2");
          drawUserObject(context, currentCol, currentRow, userObject);
          break;
        case 2240:
          drawAbbreviation(context, "id");
          break;
        default:
          drawFilledBox(ctx, xmin, ymin, w1, w2, "#464646");
          break;
      }

      // Foreground
      switch (bd) {
        case 252:
          drawAnemone(context, currentCol, currentRow, "foreground");
          break;
        default:
          break;
      }

      if ((gameInfo.travelGate.x === col) && (gameInfo.travelGate.y === row)) {
        drawTravelGate(context, currentCol, currentRow);
      }
      if (raster !== null) {
        if (raster.dash.length > 0) {
          drawBox(ctx, xmin, ymin, w1, w2, "black");
          ctx.setLineDash(raster.dash);
        }
        drawBox(ctx, xmin, ymin, w1, w2, raster.color);
        ctx.setLineDash([]);
      }

      highlightBlueBall(context, currentCol, currentRow);
      highlightSelectedCell(context, currentCol, currentRow);
      highlightTelekinesisObject(context, currentCol, currentRow);

      xmin += size1;
    }
    ymin += size1;
  }

  drawAllTeleports(context);

  if (gameVars.darkPercentage > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${gameVars.darkPercentage / 100})`;
    ctx.fillRect(leftMargin, topMargin, gameWidth, gameHeight);
  }

  // Electricity
  if (gameInfo.electricityActive) {
    drawElectricityActive(context);
  }

  drawFlames(ctx, leftMargin, topMargin, size1, gameData, gameInfo);

  if (status.gameOver) {
    drawGameOver(context);
  }

  if (gameVars.message !== "") {
    const bottom = topMargin + gameHeight;
    let boxTop = 0;
    let textY = 0;
    switch (gameVars.messagePosition) {
      case "top":
        boxTop = topMargin;
        textY = topMargin + size1 - (size1 * 0.25);
        break;
      default:
        boxTop = bottom - size1;
        textY = bottom - (size1 * 0.25);
        break;
    }
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    if (gameVars.messageBackground !== "none") {
      ctx.fillStyle = gameVars.messageBackground;
      ctx.fillRect(leftMargin, boxTop, gameWidth, size1);
    }
    if (gameVars.messageBorder !== "none") {
      ctx.strokeStyle = gameVars.messageBorder;
      ctx.strokeRect(leftMargin, boxTop, gameWidth, size1);
    }
    drawText(ctx, leftMargin + (size1 * 0.5), textY, gameVars.message, "left", gameVars.messageColor, size1 * 0.7, gameWidth * 0.8);
  }
}


export { clearBitMapLava, drawLevel };
