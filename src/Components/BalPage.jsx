import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// https://www.npmjs.com/package/react-confirm-alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MessageBox from './MessageBox';

import {
  checkFalling,
  findElementByCoordinate,
  inWater,
  jump,
  jumpLeft,
  jumpRight,
  moveDownLeft,
  moveDownRight,
  moveLeft,
  moveObjects,
  moveRight,
  pushDown,
  stringArrayToNumberArray,
  zeroArray,
} from "../balUtils.js";
import { addObject, removeObject } from "../addRemoveObject.js";
import { codeToNumber, getFredCode, numberToCode, secretSeriesCodePart } from "../codes.js";
import { checkCopiers } from "../copiers.js";
import { checkDamagedStones } from "../damagedStones.js";
import { checkDelays } from "../delays.js";
import { checkDetonator } from "../detonator.js";
import { electricityTarget } from "../electricity.js";
import { checkForces } from "../force.js";
import { clearBitMapLava, drawLevel } from "../drawLevel.js";
import { checkElevatorInOuts, moveElevators, moveHorizontalElevators } from "../elevators.js";
import { exportLevel, importLevel } from "../files.js";
import { moveFish } from "../fish.js";
import { getGameInfo, initGameInfo, initGameVars, switchPlayer } from "../gameInfo.js";
import { getAllLevels, getLevel, getSecretStart, getRandomLevel } from "../levels.js";
import { checkMagnets } from "../magnets.js";
import { clearMemory, loadFromMemory, saveToMemory } from "../memory.js";
import { checkMusicBoxes } from "../musicBoxes.js"
import { moveOrangeBalls } from "../orangeBalls.js";
import { checkPistonsTriggers, pistonsRepeatFast, pistonsRepeatSlow } from "../pistons.js";
import { checkPurpleTeleports, deleteIfPurpleTeleport, deleteTeleports, findTheOtherTeleport } from "../teleports.js";
import { checkRedBalls, moveRedBalls } from "../redBalls.js";
import { rotateGame } from "../rotateGame.js";
import { getSettings, loadSettings, saveSettings, setSettings } from "../settings.js";
import { playSound } from "../sound.js";
import { moveObjectWithTelekineticPower } from "../telekinesis.js/";
import { checkTimeBombs } from "../timeBombs.js";
import { checkTrapDoors } from "../trapDoors.js";
import { tryParseInt } from "../utils.js";
import { moveYellowBalls, stopYellowBallsThatAreBlocked } from "../yellowBalls.js";
import { moveYellowBars } from "../yellowBars.js";
import { checkYellowPausers } from "../yellowPausers.js";
import { checkYellowPushersTriggers } from "../yellowPushers.js";
import { checkYellowStoppers } from "../yellowStoppers.js";

import imgBlueDiving from "../Images/blue_ball_with_diving_glasses.svg";
import imgBlueHappy from "../Images/blue_ball_happy.svg";
import imgBlueSad from "../Images/blue_ball_sad.svg";
import imgGray from "../Images/gray_ball.svg";
import imgGreen from "../Images/green_ball.svg";
import imgLightBlue from "../Images/light_blue_ball.svg";
import imgMusicNote from "../Images/music_note.svg";
import imgOrange from "../Images/orange_ball.svg";
import imgPurple from "../Images/purple_ball.svg";
import imgRed from "../Images/red_ball.svg";
import imgSlowDownYellow from "../Images/slow_down_yellow.png";
import imgWhite from "../Images/white_ball.svg";
import imgYellow from "../Images/yellow_ball.svg";
import actionButton from "../Images/action_button.png";
import arrowJumpLeft from "../Images/arrow_topLeft.svg";
import arrowJumpRight from "../Images/arrow_topRight.svg";
import arrowDown from "../Images/arrow_down.svg";
import arrowUp from "../Images/arrow_up.svg";
import arrowLeft from "../Images/arrow_left.svg";
import arrowRight from "../Images/arrow_right.svg";
import selectButton from "../Images/select_button.png";

const msgAtLeastFiveColumns = "There must be at least 5 columns.";
const msgAtLeastFiveRows = "There must be at least 5 rows.";
const msgNoCellSelected = "There is no cell selected. Hold the Shift button and click on a cell to select a cell.";
let kPressed = false;
let createLevel = false;
let createLevelSelectedCell = null;
let createLevelObject = -1;
let ctx;
let fred = false; // TODO: Set to false when publishing
let gameInterval;
let initialized = false;
let isInOtherWorld = false;
let loading = true;
let otherWorldGreen = -1;
let thisWorldGreen = -1;

let gameData = [];
let backData = [];
let gameInfo = {};
initGameInfo(gameInfo);
let gameVars = {};
initGameVars(gameVars);

let gameDataMenu = [];
let backDataMenu = [];
let gameInfoMenu = {};
initGameInfo(gameInfoMenu);
let gameVarsMenu = {};
initGameVars(gameVarsMenu);

function BalPage() {
  const cbArrowButtons = useRef(null);
  const cbCreateLevel = useRef(null);
  const cbGraphics = useRef(null);
  const cbMusic = useRef(null);
  const cbQuestions = useRef(null);
  const cbSound = useRef(null);
  const createLevelCanvas = useRef(null);
  const deleteColumn = useRef(null);
  const deleteRow = useRef(null);
  const elementDiving = useRef(null);
  const elementGray = useRef(null);
  const elementGreen = useRef(null);
  const elementHappy = useRef(null);
  const elementLightBlue = useRef(null);
  const elementGameButtons = useRef(null);
  const elementMusicNote = useRef(null);
  const elementOrange = useRef(null);
  const elementPurple = useRef(null);
  const elementRed = useRef(null);
  const elementSad = useRef(null);
  const elementSlowDownYellow = useRef(null);
  const elementWhite = useRef(null);
  const elementYellow = useRef(null);
  const gameCanvas = useRef(null);
  const insertColumn = useRef(null);
  const insertRow = useRef(null);
  const loadRandom = useRef(null);
  const newLevel = useRef(null);
  const series1 = useRef(null);
  const series2 = useRef(null);
  const series3 = useRef(null);
  const seriesEasy = useRef(null);
  const seriesExtreme = useRef(null);
  const seriesSmall = useRef(null);
  const tryAgainButton = useRef(null);
  const [green, setGreen] = useState(0);
  const [levelNumber, setLevelNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");

  // eslint-disable-next-line no-unused-vars
  const showMessage = (title, message) => {
    setMessageTitle(title);
    setMessageContent(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function loadProgress() {
    let level = -1;
    const levelStr = localStorage.getItem("lastSolvedLevel");
    if (levelStr !== null) {
      level = tryParseInt(levelStr, -1);
      if (level !== -1) {
        gameVars.currentLevel = level;
      }
    }
  }

  function saveProgress() {
    localStorage.setItem("lastSolvedLevel", gameVars.currentLevel.toString());
  }

  function checkGameOver() {
    let target = -1;

    if (!loading && !gameVars.gameOver && gameInfo.electricity.length > 0 && gameInfo.electricityActive) {
      for (let i = 0; i < gameInfo.electricity.length; i++) {
        const elec = gameInfo.electricity[i];
        target = electricityTarget(backData, gameData, elec.x, elec.y);
        if (target > 0) {
          if (gameData[target][elec.x] === 2) {
            gameVars.gameOver = true;
          }
          if (backData[target][elec.x] === 20 || backData[target][elec.x] === 23) {
            if (inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData) ||
              inWater(gameInfo.blueBall1.x, gameInfo.blueBall1.y, backData) ||
              (gameInfo.twoBlue && inWater(gameInfo.blueBall2.x, gameInfo.blueBall2.y, backData))) {
              gameVars.gameOver = true;
            }
            for (let j = 0; j < gameInfo.redFish.length; j++) {
              const fish = gameInfo.redFish[j];
              fish.isDead = true;
            }
          }
        }
      }
    }
    if ((gameVars.timeFreezer === 0) && (!gameVars.gameOver)) {
      let redInfo = checkRedBalls(gameData, gameInfo.redBalls);
      if (redInfo.length > 0) {
        gameVars.laser = redInfo;
        gameVars.gameOver = true;
        playSound("laser");
      } else {
        gameVars.laser = null;
      }
    }
    if (!gameVars.gameOver && !gameInfo.hasDivingGlasses) {
      if ([20, 23].includes(backData[gameInfo.blueBall1.y][gameInfo.blueBall1.x])) {
        gameVars.gameOver = true;
      }
      if (gameInfo.twoBlue && [20, 23].includes(backData[gameInfo.blueBall2.y][gameInfo.blueBall2.x])) {
        gameVars.gameOver = true;
      }
    }
    if ((gameVars.timeFreezer === 0) && !gameVars.gameOver && (gameInfo.redFish.length > 0)) {
      for (let i = 0; i < gameInfo.redFish.length && !gameVars.gameOver; i++) {
        const fish = gameInfo.redFish[i];
        if (!fish.isDead &&
          (((Math.abs(gameInfo.blueBall.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall.y - fish.y) < 2)) ||
            ((Math.abs(gameInfo.blueBall1.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall1.y - fish.y) < 2)) ||
            (gameInfo.twoBlue && (Math.abs(gameInfo.blueBall2.x - fish.x) < 2) && (Math.abs(gameInfo.blueBall2.y - fish.y) < 2)))
        ) {
          gameVars.gameOver = true;
        }
      }
    }
    if (gameVars.gameOver) {
      updateGameCanvas();
    }
  }

  async function gameScheduler() {
    let info = {};
    let saveCoilSpring = false;
    let saveDivingGlasses = false;
    let saveKey = false;
    let saveLadder = false;
    let savePickaxe = false;
    let savePropeller = false;
    let saveTelekineticPower = false;
    let saveWeakStone = false;
    let update = false;

    function loadItems() {
      gameInfo.hasCoilSpring = saveCoilSpring;
      gameInfo.hasDivingGlasses = saveDivingGlasses;
      gameInfo.hasKey = saveKey;
      gameInfo.hasLadder = saveLadder;
      gameInfo.hasPickaxe = savePickaxe;
      gameInfo.hasPropeller = savePropeller;
      gameInfo.hasTelekineticPower = saveTelekineticPower;
      gameInfo.hasWeakStone = saveWeakStone;
    }

    function saveItems() {
      saveCoilSpring = gameInfo.hasCoilSpring;
      saveDivingGlasses = gameInfo.hasDivingGlasses;
      saveKey = gameInfo.hasKey;
      saveLadder = gameInfo.hasLadder;
      savePickaxe = gameInfo.hasPickaxe;
      savePropeller = gameInfo.hasPropeller;
      saveTelekineticPower = gameInfo.hasTelekineticPower;
      saveWeakStone = gameInfo.hasWeakStone;
    }

    if (createLevel || loading || !gameData || !backData || !gameVars || !gameInfo) {
      return;
    }
    if (gameVars.gameOver || (gameData.length < 2) || (backData.length < 2) ||
      (gameInfo.blueBall.x === -1) || (gameInfo.blueBall.y === -1)) {
      return;
    }

    if (gameVars.timeFreezer > 0) {
      gameVars.timeFreezer--;
    }

    if (checkMagnets(gameInfo)) {
      playSound("magnet");
    }

    if (checkDelays(gameData, gameInfo)) {
      update = true;
    }

    if (checkMusicBoxes(gameData, gameInfo)) {
      update = true;
    }

    if (checkPurpleTeleports(backData, gameData, gameInfo)) {
      update = true;
      playSound("teleport");
    }

    info = checkTrapDoors(gameData, gameInfo);
    if (info.sound) {
      playSound("trap");
    }
    if (info.updated) {
      update = true;
    }
    info = checkDamagedStones(gameData, gameInfo);
    if (info.sound === 1) {
      playSound("breaking1");
    }
    if (info.sound === 2) {
      playSound("breaking2");
    }
    if (info.updated) {
      update = true;
    }

    if (checkForces(gameData, gameInfo)) {
      update = true;
    }

    info = checkCopiers(gameData, gameInfo);
    if (info.updated) {
      update = true;
    }

    gameVars.refreshCounter++;
    if (gameVars.refreshCounter >= gameVars.refreshCountTo) {
      gameVars.refreshCounter = 0;
      clearBitMapLava();
      update = true;
    }

    if ((gameVars.timeFreezer === 0) && (gameInfo.redFish.length > 0)) {
      if (gameVars.fishCounter >= gameVars.fishCountTo) {
        gameVars.fishCounter = 0;
        moveFish(backData, gameData, gameInfo, gameInfo.blueBall.x, gameInfo.blueBall.y);
        update = true;
      }
      gameVars.fishCounter++;
    }

    gameVars.wave1++;
    if (gameVars.wave1 > 5) {
      gameVars.wave1 = 1;
      gameVars.wave2++;
      if (gameVars.wave2 > 3) {
        gameVars.wave2 = 1;
      }
      update = true;
    }

    if (gameVars.timeFreezer === 0) {
      if (gameVars.elevatorCounter >= gameVars.elevatorCountTo) {
        gameVars.elevatorCounter = 0;
        if (moveElevators(gameData, gameInfo)) {
          update = true;
        }
        if (moveHorizontalElevators(gameData, gameInfo)) {
          update = true;
        }
      }
      gameVars.elevatorCounter++;

      if (checkElevatorInOuts(gameData, gameInfo)) {
        update = true;
      }

      if (gameVars.redCounter > 0) {
        gameVars.redCounter--;
      } else {
        gameVars.redCounter = 2;
        info = moveRedBalls(backData, gameData, gameInfo);
        if (info.updated) {
          update = true;
        }
        if (info.eating) {
          playSound("eat");
        }
      }
    }

    if (!gameVars.yellowPaused) {
      if (gameVars.yellowSlowCounter > 0) {
        gameVars.yellowSlowCounter--;
      }
      if (gameVars.yellowCounter > 0) {
        if (gameVars.yellowCounter === 1) {
          stopYellowBallsThatAreBlocked(gameData, gameInfo.yellowBalls);
        }
        gameVars.yellowCounter--;
      } else {
        if (gameVars.yellowSlowCounter > 0) {
          gameVars.yellowCounter = 5;
        } else {
          gameVars.yellowCounter = 1;
        }
        if (moveYellowBalls(gameData, gameInfo.yellowBalls)) {
          update = true;
        }
        if (moveYellowBars(backData, gameData, gameInfo)) {
          update = true;
        }
      }
    }
    if (gameVars.orangeCounter > 0) {
      gameVars.orangeCounter--;
    } else {
      gameVars.orangeCounter = 1;
      if (moveOrangeBalls(gameData, gameInfo.orangeBalls)) {
        update = true;
      }
    }

    if (gameVars.explosionCounter > 0) {
      gameVars.explosionCounter--;
    } else {
      gameVars.explosionCounter = 2;
      info = checkDetonator(backData, gameData, gameInfo, false);
      if (info.explosion) {
        playSound("explosion");
      }
      if (info.updated) {
        update = true;
      }
    }

    if (gameVars.timeFreezer === 0) {
      info = checkTimeBombs(gameData, backData, gameInfo);
      if (info.explosion) {
        playSound("explosion");
      }
      if (info.updated) {
        update = true;
      }
      if (info.gameOver) {
        gameVars.gameOver = true;
        updateGameCanvas();
      }
    }

    if (gameInfo.hasPiston) {
      info = checkPistonsTriggers(backData, gameData, gameInfo, gameVars, false);
      if (info.updated) {
        update = true;
      }
      if (gameVars.pistonsRepeatFastModeCounter > 0) {
        gameVars.pistonsRepeatFastModeCounter--;
      } else {
        gameVars.pistonsRepeatFastModeCounter = gameVars.pistonsRepeatFastModeCountTo;
        if (pistonsRepeatFast(gameData, gameInfo, gameVars)) {
          update = true;
        }
        if (gameVars.pistonsRepeatSlowModeCounter > 0) {
          gameVars.pistonsRepeatSlowModeCounter--;
        } else {
          gameVars.pistonsRepeatSlowModeCounter = gameVars.pistonsRepeatSlowModeCountTo;
          if (pistonsRepeatSlow(gameData, gameInfo, gameVars)) {
            update = true;
          }
        }
      }
    }

    info = checkYellowPushersTriggers(backData, gameData, gameInfo, gameVars, false);
    if (info.updated) {
      update = true;
    }
    checkYellowPausers(backData, gameData, gameInfo, gameVars, false);
    checkYellowStoppers(backData, gameData, gameInfo, gameVars, false);

    if (gameInfo.teleports.length > 0) {
      let teleport1 = -1;
      let teleport2 = -1;
      switch (gameVars.teleporting) {
        case 1:
          playSound("teleport");
          gameVars.teleporting = 2;
          break;
        case 2:
          teleport1 = findElementByCoordinate(gameInfo.blueBall.x, gameInfo.blueBall.y, gameInfo.teleports);
          if (teleport1 >= 0) {
            if (gameInfo.teleports[teleport1].selfDestructing) {
              gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
            } else {
              gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 31;
            }
            teleport2 = findTheOtherTeleport(teleport1, gameInfo.teleports);
            if (teleport2 >= 0) {
              gameInfo.blueBall.x = gameInfo.teleports[teleport2].x;
              gameInfo.blueBall.y = gameInfo.teleports[teleport2].y;
            }
            if (gameInfo.teleports[teleport1].selfDestructing) {
              deleteTeleports("white", true, gameInfo);
            }
          }
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
          update = true;
          gameVars.teleporting = 0;
          break;
        default:
          break;
      }
    }

    if (gameInfo.hasTravelGate) {
      switch (gameVars.gateTravelling) {
        case 1:
          playSound("teleport");
          gameVars.gateTravelling = 2;
          break;
        case 2:
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 132;
          clearMemory(0); // Prevent conflicts between two worlds          
          if (isInOtherWorld) {
            isInOtherWorld = false;
            saveToMemory(gameData, backData, gameInfo, gameVars, 2);
            saveItems();
            await clickLoadFromMemory(1);
            loadItems();
          } else {
            isInOtherWorld = true;
            saveToMemory(gameData, backData, gameInfo, gameVars, 1);
            saveItems();
            await clickLoadFromMemory(2);
            loadItems();
          }
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
          gameInfo.blueBall.x = gameInfo.travelGate.x;
          gameInfo.blueBall.y = gameInfo.travelGate.y;
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
          gameVars.gateTravelling = 0;
          updateGameCanvas();
          break;
        default:
          break;
      }
    }

    if ((gameVars.timeFreezer === 0) && (gameInfo.electricity.length > 0)) {
      if (gameVars.electricityCounter > 110) {
        gameVars.electricityCounter = 0;
      }
      gameInfo.electricityActive = false;
      if (
        (gameVars.electricityCounter > 50 && gameVars.electricityCounter < 60) ||
        (gameVars.electricityCounter > 90 && gameVars.electricityCounter < 100)
      ) {
        gameInfo.electricityActive = true;
      }
      if (!gameVars.elecActiveSaved && gameInfo.electricityActive) {
        playSound("electricity");
      }
      if (
        gameInfo.electricityActive ||
        gameVars.elecActiveSaved !== gameInfo.electricityActive
      ) {
        update = true;
      }
      gameVars.elecActiveSaved = gameInfo.electricityActive;
      gameVars.electricityCounter++;
    }

    info = checkFalling(backData, gameData, gameInfo, gameVars);
    if (info.update) {
      update = true;
    }
    if (info.sound !== "") {
      playSound(info.sound);
    }
    if (info.sound === "pain") {
      gameVars.gameOver = true;
      updateGameCanvas();
    }

    if (update) {
      updateGameCanvas();
      checkGameOver();
    }
  }

  function hint(gameVars) {
    let msg = "";

    msg = gameVars.hint;
    if (msg === "") {
      msg = "There is no hint available for this level."
    }
    showMessage("Info", msg);
  }

  function loadLevelSettings(backData, gameData, gameInfo, gameVars, levelSettings) {
    let color = "";
    let element = 0;
    let gameTicks = 0;
    let group = -1;
    let instrument = "kalimba";
    let h = -1;
    let idx = -1;
    let mode = "";
    let p1 = -1;
    let sound = "";
    let validXY = false;
    let volume = 90;
    let w = -1;
    let x = -1;
    let y = -1;

    gameVars.bgcolor = null;
    gameVars.bgcolor = [];
    gameVars.fgcolor = null;
    gameVars.fgcolor = [];
    for (let i = 0; i < levelSettings.length; i++) {
      const setting = levelSettings[i];
      p1 = setting.indexOf(":");
      if (p1 >= 0) {
        const name = setting.slice(0, p1).toLowerCase().trim();
        const value = setting.slice(p1 + 1).trim();
        const values = setting.slice(p1 + 1).split(",").map(value => value.trim());
        const valuesLowerCase = values.map(value => value.toLowerCase());
        if (values.length >= 2) {
          x = tryParseInt(values[0], -1);
          y = tryParseInt(values[1], -1);
          validXY = ((x >= 0) && (y >= 0) && (x < gameData[0].length) && (y < gameData.length));
        }
        switch (name) {
          case "$addnotes":
            if (values.length >= 3) {
              if (validXY) {
                idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
                if (idx >= 0) {
                  gameInfo.musicBoxes[idx].noteIndex = 0;
                  for (let note = 2; note < values.length; note++) {
                    gameInfo.musicBoxes[idx].notes.push(values[note]);
                  }
                }
              }
            }
            break;
          case "$background":
            if (values.length === 5) {
              w = tryParseInt(values[2], -1);
              h = tryParseInt(values[3], -1);
              element = tryParseInt(values[4], -1);
              if ((x >= 0) && (y >= 0) && ((x + w - 1) < backData[0].length) && ((y + h - 1) < backData.length) &&
                ([20, 23, 25, 80, 90, 137].includes(element))) {
                for (let posY = y; posY < (y + h); posY++) {
                  for (let posX = x; posX < (x + w); posX++) {
                    backData[posY][posX] = element;
                  }
                }
              }
            }
            break;
          case "$bgcolor":
          case "$fgcolor":
            if (values.length === 5) {
              w = tryParseInt(values[2], -1);
              h = tryParseInt(values[3], -1);
              color = values[4];
              if ((x >= 0) && (y >= 0) && (w > 0) && (h > 0) && (color !== "")) {
                if (name === "$bgcolor") {
                  gameVars.bgcolor.push({ x, y, w, h, color })
                } else {
                  gameVars.fgcolor.push({ x, y, w, h, color })
                }
              }
            }
            break;
          case "$gameticks":
            if (values.length === 2) {
              gameTicks = tryParseInt(values[1], -1);
              if (gameTicks >= 1) {
                switch (valuesLowerCase[0]) {
                  case "elevator":
                    gameVars.elevatorCountTo = gameTicks;
                    break;
                  case "fish":
                    gameVars.fishCountTo = gameTicks;
                    break;
                  default:
                    break;
                }
              }
            }
            break;
          case "$gameticksxy":
            if (values.length === 3) {
              gameTicks = tryParseInt(values[2], -1);
              if (validXY && (gameTicks >= 1)) {
                idx = findElementByCoordinate(x, y, gameInfo.delays);
                if (idx >= 0) {
                  gameInfo.delays[idx].gameTicks = gameTicks;
                }
              }
            }
            break;
          case "$group":
            if (values.length === 3) {
              group = tryParseInt(values[2], -1);
              if (validXY && (group >= 1) && (group <= 32)) {
                element = gameData[y][x];
                switch (element) {
                  case 157:
                    idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
                    if (idx >= 0) {
                      gameInfo.musicBoxes[idx].group = group;
                    }
                    break;
                  case 158:
                    idx = findElementByCoordinate(x, y, gameInfo.pistonsTriggers);
                    if (idx >= 0) {
                      gameInfo.pistonsTriggers[idx].group = group;
                    }
                    break;
                  case 159:
                  case 161:
                  case 163:
                  case 165:
                    idx = findElementByCoordinate(x, y, gameInfo.pistons);
                    if (idx >= 0) {
                      gameInfo.pistons[idx].group = group;
                    }
                    break;
                  default:
                    break;
                }
              }
            }
            break;
          case "$hint":
            gameVars.hint = value;
            break;
          case "$instrument":
            if (values.length >= 4) {
              instrument = valuesLowerCase[2];
              volume = tryParseInt(values[3], -1);
              if (validXY && (volume >= 0) && (volume <= 100)) {
                idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
                if (idx >= 0) {
                  gameInfo.musicBoxes[idx].instrument = instrument;
                  gameInfo.musicBoxes[idx].volume = volume;
                }
              }
            }
            break;
          case "$inverted":
            if (values.length === 3) {
              if (validXY) {
                idx = findElementByCoordinate(x, y, gameInfo.pistons);
                if (idx >= 0) {
                  switch (valuesLowerCase[2]) {
                    case "no":
                      gameInfo.pistons[idx].inverted = false;
                      break;
                    case "yes":
                      gameInfo.pistons[idx].inverted = true;
                      break;
                    default:
                      break;
                  }
                }
              }
            }
            break;
          case "$musicbox":
            if (values.length === 4) {
              mode = valuesLowerCase[2];
              gameTicks = tryParseInt(values[3], -1);
              if (validXY && ["note", "song"].includes(mode) && (gameTicks >= 1) && (gameTicks <= 100)) {
                idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
                if (idx >= 0) {
                  gameInfo.musicBoxes[idx].mode = mode;
                  gameInfo.musicBoxes[idx].delay = gameTicks;
                }
              }
            }
            break;
          case "$notes":
            if (values.length >= 3) {
              if (validXY) {
                idx = findElementByCoordinate(x, y, gameInfo.musicBoxes);
                if (idx >= 0) {
                  gameInfo.musicBoxes[idx].notes = [];
                  gameInfo.musicBoxes[idx].noteIndex = 0;
                  for (let note = 2; note < values.length; note++) {
                    gameInfo.musicBoxes[idx].notes.push(values[note]);
                  }
                }
              }
            }
            break;
          case "$pistonmode":
            if (values.length === 3) {
              if (validXY && (["momentary", "repeatfast", "repeatslow", "toggle"].includes(valuesLowerCase[2]))) {
                idx = findElementByCoordinate(x, y, gameInfo.pistons);
                if (idx >= 0) {
                  gameInfo.pistons[idx].mode = valuesLowerCase[2];
                }
              }
            }
            break;
          case "$sound":
            if (values.length === 2) {
              element = tryParseInt(values[0], -1);
              sound = valuesLowerCase[1];
              if (["default", "never", "player"].includes(sound)) {
                switch (element) {
                  case 22:
                    gameVars.soundLava = sound;
                    break;
                  default:
                    break;
                }
              }
            }
            break;
          case "$startlevelmessage":
            gameVars.startlevelmessage = value;
            break;
          case "$sticky":
            if (values.length === 3) {
              if (validXY) {
                idx = findElementByCoordinate(x, y, gameInfo.pistons);
                if (idx >= 0) {
                  switch (valuesLowerCase[2]) {
                    case "no":
                      gameInfo.pistons[idx].sticky = false;
                      break;
                    case "yes":
                      gameInfo.pistons[idx].sticky = true;
                      break;
                    default:
                      break;
                  }
                }
              }
            }
            break;
          default:
            break;
        }
      }
    }
  }

  async function initLevel(n, gateTravelling = false) {
    let data = [];
    let gd;

    try {
      if (!gateTravelling) {
        isInOtherWorld = false;
        otherWorldGreen = -1;
        clearMemory(1);
        clearMemory(2);
      }
      loading = true;
      initGameVars(gameVars);
      gameVars.currentLevel = n;
      setLevelNumber(n);
      gameInfo.blueBall.x = -1;
      gameInfo.blueBall.y = -1;
      data = await getLevel(gameVars.currentLevel, gateTravelling);
      gd = stringArrayToNumberArray(data.levelData);
      backData = null;
      backData = gd.backData;
      gameData = null;
      gameData = gd.gameData;
      gameInfo = null;
      gameInfo = getGameInfo(backData, gameData);
      loadLevelSettings(backData, gameData, gameInfo, gameVars, data.levelSettings);
      gameVars.laser = null;
      gameVars.gameOver = false;
      updateGameCanvas();
      updateGreen();
      if (gameVars.startlevelmessage !== "") {
        showMessage("Message", gameVars.startlevelmessage);
      }
      loading = false;
    } catch (err) {
      console.log(err);
    }
  }

  function clickCode() {
    let level = 0;
    let code = prompt("Enter the code");
    if (code !== null) {
      code = code.trim();
      if (code.length === 5) {
        level = codeToNumber(code);
      } else {
        if (code === (secretSeriesCodePart(1) + secretSeriesCodePart(2) + secretSeriesCodePart(3))) {
          level = getSecretStart();
        }
      }
      if (level > 0) {
        initLevel(level);
      }
      if (code === getFredCode()) {
        fred = true;
      }
      if ((code === "") || (code.toLowerCase === "logout")) {
        fred = false;
      }
    }
  }

  function clickNewLevel() {
    let level = 9999;

    if (getSettings().lessQuestions) {
      initLevel(level);
      createLevelSelectedCell = null;
    } else {
      confirmAlert({
        title: "Question",
        message: `Start with a new level?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(level);
              createLevelSelectedCell = null;
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    }
  }

  function clickDeleteColumn() {
    function del() {
      for (let i = 0; i < gameData.length; i++) {
        removeObject(gameData, gameInfo, createLevelSelectedCell.x, i);
        deleteIfPurpleTeleport(backData, gameInfo, createLevelSelectedCell.x, i);
        gameData[i].splice(createLevelSelectedCell.x, 1);
        backData[i].splice(createLevelSelectedCell.x, 1);
      }
      moveObjects(gameInfo, "deleteColumn", createLevelSelectedCell.x);
      createLevelSelectedCell = null;
      updateGameCanvas();
      updateGreen();
    }

    if (createLevelSelectedCell === null) {
      showMessage("Error", msgNoCellSelected);
    } else if (gameData[0].length <= 5) {
      showMessage("Error", msgAtLeastFiveColumns);
    } else {
      if (getSettings().lessQuestions) {
        del();
      } else {
        confirmAlert({
          title: "Question",
          message: `Delete current column?`,
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                del();
              },
            },
            {
              label: "No",
              onClick: () => { },
            },
          ],
        });
      }
    }
  }

  function clickDeleteRow() {
    function del() {
      for (let i = 0; i < gameData[createLevelSelectedCell.y].length; i++) {
        removeObject(gameData, gameInfo, i, createLevelSelectedCell.y);
        deleteIfPurpleTeleport(backData, gameInfo, i, createLevelSelectedCell.y);
      }
      gameData.splice(createLevelSelectedCell.y, 1);
      backData.splice(createLevelSelectedCell.y, 1);
      moveObjects(gameInfo, "deleteRow", createLevelSelectedCell.y);
      createLevelSelectedCell = null;
      updateGameCanvas();
      updateGreen();
    }

    if (createLevelSelectedCell === null) {
      showMessage("Error", msgNoCellSelected);
    } else if (gameData.length <= 5) {
      showMessage("Error", msgAtLeastFiveRows);
    } else {
      if (getSettings().lessQuestions) {
        del();
      } else {
        confirmAlert({
          title: "Question",
          message: `Delete current row?`,
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                del();
              },
            },
            {
              label: "No",
              onClick: () => { },
            },
          ],
        });
      }
    }
  }

  function clickInsertColumn() {
    function ins() {
      let value = 0;
      let n = gameData.length;
      for (let i = 0; i < n; i++) {
        if ((i === 0) || (i === (n - 1))) {
          value = 1;
        } else {
          value = 0;
        }
        gameData[i].splice(createLevelSelectedCell.x, 0, value);
        backData[i].splice(createLevelSelectedCell.x, 0, value);
      }
      moveObjects(gameInfo, "insertColumn", createLevelSelectedCell.y);
      createLevelSelectedCell = null;
      updateGameCanvas();
      updateGreen();
    }

    if (createLevelSelectedCell === null) {
      showMessage("Error", msgNoCellSelected);
    } else {
      if (getSettings().lessQuestions) {
        ins();
      } else {
        confirmAlert({
          title: "Question",
          message: `Insert column before the current column?`,
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                ins();
              },
            },
            {
              label: "No",
              onClick: () => { },
            },
          ],
        });
      }
    }
  }

  function clickInsertRow() {
    function ins() {
      let n = gameData[0].length;
      let newRow = [];
      for (let i = 0; i < n; i++) {
        if ((i === 0) || (i === (n - 1))) {
          newRow.push(1);
        } else {
          newRow.push(0);
        }
      }
      gameData.splice(createLevelSelectedCell.y, 0, newRow);
      backData.splice(createLevelSelectedCell.y, 0, newRow);
      moveObjects(gameInfo, "insertRow", createLevelSelectedCell.y);
      createLevelSelectedCell = null;
      updateGameCanvas();
      updateGreen();
    }

    if (createLevelSelectedCell === null) {
      showMessage("Error", msgNoCellSelected);
    } else {
      if (getSettings().lessQuestions) {
        ins();
      } else {
        confirmAlert({
          title: "Question",
          message: `Insert row before the current row?`,
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                ins();
              },
            },
            {
              label: "No",
              onClick: () => { },
            },
          ],
        });
      }
    }
  }

  function clickSeries(s) {
    let level = 200;

    switch (s) {
      case "1":
        level = 200;
        break;
      case "2":
        level = 300;
        break;
      case "3":
        level = 700;
        break;
      case "Small":
        level = 750;
        break;
      case "Easy":
        level = 3000;
        break;
      case "Extreme":
        level = 901;
        break;
      default:
        level = 200;
        break;
    }
    if (getSettings().lessQuestions) {
      initLevel(level);
    } else {
      confirmAlert({
        title: "Question",
        message: `Load the first level of series ${s}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(level);
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    }
  }

  function clickSaveToMemory() {
    if (getSettings().lessQuestions) {
      saveToMemory(gameData, backData, gameInfo, gameVars, 0);
    } else {
      confirmAlert({
        title: "Question",
        message: "Save level to memory?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              saveToMemory(gameData, backData, gameInfo, gameVars, 0);
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    }
  }

  async function clickLoadFromMemory(idx) {
    async function load() {
      const data = loadFromMemory(idx);
      if (data === null) {
        if (idx > 0) {
          await initLevel(gameVars.currentLevel, true);
        } else {
          showMessage("Info", "No level in memory.");
        }
      } else {
        gameData = null;
        gameData = data.gameData;
        backData = null;
        backData = data.backData;
        gameInfo = null;
        gameInfo = data.gameInfo;
        if (gameInfo.player === 2) {
          gameInfo.blueBall = gameInfo.blueBall2;
        } else {
          gameInfo.blueBall = gameInfo.blueBall1;
        }
        gameVars = null;
        gameVars = data.gameVars;
        setLevelNumber(gameVars.currentLevel);
        updateGameCanvas();
        updateGreen();
      }
    }

    if (getSettings().lessQuestions || (idx > 0)) {
      await load();
    } else {
      confirmAlert({
        title: "Question",
        message: "Load level from memory?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await load();
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    }
  }

  async function clickExportLevel() {
    const ok = await exportLevel(backData, gameData, gameInfo, gameVars);
    if (!ok) {
      console.log("Error while exporting level");
    }
  }

  async function clickImportLevel() {
    const result = await importLevel();
    if (result !== null) {
      clearMemory(1);
      clearMemory(2);
      isInOtherWorld = false;
      otherWorldGreen = -1;
      loading = true;
      initGameVars(gameVars);
      backData = null;
      backData = result.backData;
      gameData = null;
      gameData = result.gameData;
      gameInfo = null;
      gameInfo = getGameInfo(backData, gameData);
      loadLevelSettings(backData, gameData, gameInfo, gameVars, result.levelSettings);
      gameVars.laser = null;
      gameVars.gameOver = false;
      gameVars.currentLevel = 200;
      updateGameCanvas();
      updateGreen();
      setLevelNumber(gameVars.currentLevel);
      if (gameVars.startlevelmessage !== "") {
        showMessage("Message", gameVars.startlevelmessage);
      }
      loading = false;
    }
  }

  function randomLevel() {
    confirmAlert({
      title: "Question",
      message: "Load a random level?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            initLevel(getRandomLevel(gameVars.currentLevel));
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  }

  function showWhatBlueBallHas() {
    let msg = "";

    function addItem(item) {
      if (msg !== "") {
        msg += ", ";
      }
      msg += item;
    }

    if (gameInfo.hasCoilSpring) {
      addItem("coil spring");
    }
    if (gameInfo.hasDivingGlasses) {
      addItem("diving glasses");
    }
    if (gameInfo.hasKey) {
      addItem("key");
    }
    if (gameInfo.hasLadder) {
      addItem("ladder");
    }
    if (gameInfo.hasTelekineticPower) {
      addItem("telekinetic power");
    }
    if (gameInfo.hasPickaxe) {
      addItem("pickaxe");
    }
    if (gameInfo.hasPropeller) {
      addItem("propeller");
    }
    if (gameInfo.hasWeakStone) {
      addItem("weak stone");
    }

    if (msg === "") {
      msg = "You have nothing!";
    } else {
      msg = "You have the following: " + msg;
    }
    showMessage("Info", msg);
  }

  function handleChangeSettings() {
    setSettings(
      cbArrowButtons.current.checked,
      cbQuestions.current.checked,
      tryParseInt(cbMusic.current.value, 50),
      cbGraphics.current.checked,
      tryParseInt(cbSound.current.value, 50)
    );
    saveSettings();
    updateGameButtonsDisplay();
    updateGameCanvas();
  }

  function handleCreateLevel() {
    createLevelSelectedCell = null;
    createLevel = cbCreateLevel.current.checked;
    updateGameButtonsDisplay();
    updateCreateLevelCanvasDisplay();
    updateMenuItemsDisplay();
    updateGameCanvas();
    if (createLevel) {
      fillMenu(1);
      updateCreateLevelCanvas();
    }
  }

  function fillMenu(n) {
    let arr0 = null;
    let arr1 = null;
    let arr2 = null;

    gameDataMenu = null;
    gameDataMenu = [];
    backDataMenu = null;
    initGameInfo(gameInfoMenu);
    initGameVars(gameVarsMenu);

    for (let i = 0; i < 3; i++) {
      gameDataMenu.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    backDataMenu = zeroArray(gameDataMenu.length, gameDataMenu[0].length);

    arr0 = [0, 1, 4, 9, 159, 6, 10, 20, 91, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < arr0.length; i++) {
      if (i < gameDataMenu[0].length) {
        addObject(backDataMenu, gameDataMenu, gameInfoMenu, i, 0, arr0[i]);
      }
    }
    switch (n) {
      case 1:
        arr1 = [0];
        arr2 = [0];
        break;
      case 2:
        arr1 = [1, 15, 16, 17, 18, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151];
        arr2 = [152, 153, 154, 35, 12, 34, 99, 22, 36, 37, 117];
        break;
      case 3:
        arr1 = [2, 3, 140, 168, 4, 5, 126, 127, 128, 129, 130, 8, 95, 96, 105, 28];
        arr2 = [100, 101, 102, 103, 104, 83, 82, 98, 40];
        break;
      case 4:
        arr1 = [9, 84, 85, 86, 138, 139, 155, 115, 116, 131, 136, 156, 121, 122, 123, 124];
        arr2 = [125];
        break;
      case 5:
        arr1 = [158, 159, 161, 163, 165];
        arr2 = [0];
        break;
      case 6:
        arr1 = [6, 7, 39, 25, 90, 108, 80, 137, 118, 109, 110, 111, 112, 81];
        arr2 = [31, 92, 170, 132];
        break;
      case 7:
        arr1 = [10, 11, 87, 88, 13, 169, 30, 29];
        arr2 = [0];
        break;
      case 8:
        arr1 = [23, 20, 113, 114, 26, 27];
        arr2 = [0];
        break;
      case 9:
        arr1 = [91, 119, 120, 97, 157, 167, 89];
        arr2 = [0];
        break;
      default:
        arr1 = [0];
        arr2 = [0];
        break;
    }

    if ((arr0.length > 16) || (arr1.length > 16) || (arr2.length > 16)) {
      alert("Invalid Create level menu data!");
    }
    for (let i = 0; i < arr1.length; i++) {
      if (i < gameDataMenu[1].length) {
        addObject(backDataMenu, gameDataMenu, gameInfoMenu, i, 1, arr1[i]);
      }
    }
    for (let i = 0; i < arr2.length; i++) {
      if (i < gameDataMenu[2].length) {
        addObject(backDataMenu, gameDataMenu, gameInfoMenu, i, 2, arr2[i]);
      }
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function pressKeysSequentially(keys) {
    for (let i = 0; i < keys.length; i++) {
      const e = { key: keys[i], altKey: false, ctrlKey: false, shiftKey: false };
      handleKeyDown(e);
      await sleep(150);
    }
  }

  async function handleKeyDown(e) {
    let info = {};
    info.player = false;
    info.eating = false;
    info.sound = "";
    info.rotate = false;
    info.update = false;
    let codes = "";
    let rotate = false;

    // Ignore 
    if (["Alt", "Ctrl", "Shift"].includes(e.key)) {
      return;
    }

    if (loading || gameVars.gameOver || gameVars.teleporting > 0 || gameVars.gateTravelling > 0) {
      return false;
    }
    if (gameInfo.blueBall.x === -1 || gameInfo.blueBall.y === -1 || gameData.length === 0) {
      return false;
    }
    if (e.preventDefault) {
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === " "
      ) {
        e.preventDefault();
      }
    }

    if (createLevel) {

      return false;
    }

    switch (e.key) {
      case " ": {
        if (gameInfo.hasTelekineticPower) {
          info = moveObjectWithTelekineticPower(gameData, gameInfo);
        }
        break;
      }
      case "b":
      case "B": {
        if (gameInfo.twoBlue) {
          switchPlayer(gameInfo);
          info.update = true;
        }
        break;
      }
      default:
        break;
    }
    if (e.shiftKey) {
      switch (e.key) {
        case "R":
          if (!kPressed) {
            randomLevel();
          }
          break;
        case "ArrowLeft":
          info = jumpLeft(backData, gameData, gameInfo);
          break;
        case "ArrowRight":
          info = jumpRight(backData, gameData, gameInfo);
          break;
        default:
          break;
      }
    } else {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
        case "4":
          info = moveLeft(backData, gameData, gameInfo);
          if (info.rotate) {
            rotate = rotateGame(backData, gameData, gameInfo);
          }
          if (info.teleporting) {
            gameVars.teleporting = 1;
          }
          if (info.gateTravelling) {
            gameVars.gateTravelling = 1;
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case "6":
          info = moveRight(backData, gameData, gameInfo);
          if (info.rotate) {
            // eslint-disable-next-line no-unused-vars
            rotate = rotateGame(backData, gameData, gameInfo);
          }
          if (info.teleporting) {
            gameVars.teleporting = 1;
          }
          if (info.gateTravelling) {
            gameVars.gateTravelling = 1;
          }
          break;
        case "ArrowUp":
        case "w":
        case "W":
        case "8":
          info = jump(backData, gameData, gameInfo);
          if (info.player) {
            gameVars.elevatorCounter += 2; // To prevent that you fall from the elevator
          }
          break;
        case "q":
        case "Q":
        case "7":
          info = jumpLeft(backData, gameData, gameInfo);
          break;
        case "e":
        case "E":
        case "9":
          info = jumpRight(backData, gameData, gameInfo);
          break;
        case "ArrowDown":
        case "s":
        case "S":
        case "2":
          info = pushDown(backData, gameData, gameInfo, gameVars);
          break;
        case "y":
        case "Y":
        case "1":
          info = moveDownLeft(backData, gameData, gameInfo);
          break;
        case "c":
        case "C":
        case "3":
          if (!kPressed || (e.key === "3")) {
            info = moveDownRight(backData, gameData, gameInfo);
          }
          break;
        default:
          break;
      }
    }
    if (info.player) {
      gameVars.skipFalling = 1;
      updateGameCanvas();
      checkGameOver();
    }
    if (info.freezeTime > 0) {
      gameVars.timeFreezer = info.freezeTime;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "eating")) {
      info.eating = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "slowDownYellow")) {
      info.slowDownYellow = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "update")) {
      info.update = false;
    }
    if (info.update) {
      updateGameCanvas();
      checkGameOver();
    }
    if (info.slowDownYellow > 0) {
      gameVars.yellowSlowCounter = info.slowDownYellow;
    }
    if (info.eating) {
      gameInfo.greenBalls--;
      updateGreen();
      playSound("eat");
      checkGameOver();
      if (!gameVars.gameOver && ((!gameInfo.hasTravelGate && (gameInfo.greenBalls === 0)) ||
        ((thisWorldGreen === 0) && (otherWorldGreen === 0)))
      ) {
        confirmAlert({
          title: "Congratulations!",
          message: `Write down the code ${numberToCode(gameVars.currentLevel + 1)} to go to level ${gameVars.currentLevel + 1} whenever you want.`,
          buttons: [
            {
              label: "OK",
              onClick: () => {
              },
            },
          ],
        });
        initLevel(gameVars.currentLevel + 1);
        saveProgress();
      }
    }
    if (info.sound !== "") {
      if (info.message === "") {
        playSound(info.sound);
      } else {
        await playSound(info.sound);
      }
    }
    if (!Object.prototype.hasOwnProperty.call(info, "message")) {
      info.message = "";
    }
    if (info.message !== "") {
      showMessage("Message", info.message);
    }

    if (!e.altKey && !e.ctrlKey) {
      if (kPressed) {
        if ((fred) && (e.key === "%")) {
          codes = "";
          const allLevels = getAllLevels();
          for (let i = 0; i < allLevels.length; i++) {
            const level = allLevels[i];
            if (i > 0) {
              codes += ", ";
            }
            codes += `${level} = ${numberToCode(level)}`;
          }
          showMessage("Info", codes);
        }

        if (!e.shiftKey) {
          switch (e.key) {
            case "h":
              showWhatBlueBallHas();
              break;
            case "l":
              // Move a 2-step stairs to the left
              pressKeysSequentially("qaeda");
              break;
            case "r":
              // Move a 2-step stairs to the right
              pressKeysSequentially("edqad");
              break;
            default:
              break;
          }
        } else {
          switch (e.key) {
            case "C":
              if (fred) {
                showMessage("Info", numberToCode(gameVars.currentLevel));
              }
              break;
            case "H":
              hint(gameVars);
              break;
            case "L":
              // Move a 3-step stairs to the left
              pressKeysSequentially("qqaddedaqaeda");
              break;
            case "N":
              // Next level
              if (fred) {
                initLevel(gameVars.currentLevel + 1);
              }
              break;
            case "P":
              // Previous level
              if (fred) {
                initLevel(gameVars.currentLevel - 1);
              }
              break;
            case "R":
              // Move a 3-step stairs to the right
              pressKeysSequentially("eedaaqadedqad");
              break;
            default:
              break;
          }
        }
      }
      kPressed = ((e.key === "k") || (e.key === "K"));
    } else {
      kPressed = false;
    }

    // Extra check
    if (checkMagnets(gameInfo)) {
      playSound("magnet");
    }
  }

  function handleResize() {
    updateGameCanvas();
    updateCreateLevelCanvas();
  }

  function tryAgain() {
    if (getSettings().lessQuestions) {
      initLevel(gameVars.currentLevel);
    } else {
      confirmAlert({
        title: "Question",
        message: "Initialize level?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(gameVars.currentLevel);
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    }
  }

  const myRef = useRef(document);


  useEffect(() => {
    if (!gameCanvas.current) return;
    if (!initialized) {
      initialized = true;
      loadSettings();
      cbArrowButtons.current.checked = getSettings().arrowButtons;
      cbCreateLevel.current.checked = false;
      cbQuestions.current.checked = getSettings().lessQuestions;
      cbMusic.current.value = getSettings().music.toString();
      cbGraphics.current.checked = getSettings().nicerGraphics;
      cbSound.current.value = getSettings().sound.toString();
      updateGameButtonsDisplay();
      updateCreateLevelCanvasDisplay();
      updateMenuItemsDisplay();
      gameVars.currentLevel = 200;
      loadProgress();
      if (fred) {
        gameVars.currentLevel = 2014;
      }
      initLevel(gameVars.currentLevel);
    }

    updateGameCanvas();
    setLevelNumber(gameVars.currentLevel);
    updateGreen();

    const el = myRef.current;
    el.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    gameInterval = setInterval(gameScheduler, 50);
    return () => {
      el.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      clearInterval(gameInterval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function updateCreateLevelCanvasDisplay() {
    createLevelCanvas.current.style.display = createLevel ? "block" : "none";
  }

  function updateGameButtonsDisplay() {
    elementGameButtons.current.style.display = (getSettings().arrowButtons && !createLevel) ? "block" : "none";
  }

  function updateMenuItemsDisplay() {
    newLevel.current.style.display = (createLevel) ? "block" : "none";
    insertColumn.current.style.display = (createLevel) ? "block" : "none";
    insertRow.current.style.display = (createLevel) ? "block" : "none";
    deleteColumn.current.style.display = (createLevel) ? "block" : "none";
    deleteRow.current.style.display = (createLevel) ? "block" : "none";

    loadRandom.current.style.display = (!createLevel) ? "block" : "none";
    series1.current.style.display = (!createLevel) ? "block" : "none";
    series2.current.style.display = (!createLevel) ? "block" : "none";
    series3.current.style.display = (!createLevel) ? "block" : "none";
    seriesEasy.current.style.display = (!createLevel) ? "block" : "none";
    seriesExtreme.current.style.display = (!createLevel) ? "block" : "none";
    seriesSmall.current.style.display = (!createLevel) ? "block" : "none";
    tryAgainButton.current.style.display = (!createLevel) ? "block" : "none";
  }

  function updateGreen() {
    setGreen(gameInfo.greenBalls);
    if (isInOtherWorld) {
      otherWorldGreen = gameInfo.greenBalls;
    } else {
      thisWorldGreen = gameInfo.greenBalls;
    }
  }

  function updateCreateLevelCanvas() {
    if (!createLevelCanvas.current) return;

    const displayWidth = createLevelCanvas.current.clientWidth;
    const displayHeight = createLevelCanvas.current.clientHeight;
    if (
      createLevelCanvas.current.width !== displayWidth ||
      createLevelCanvas.current.height !== displayHeight
    ) {
      createLevelCanvas.current.width = displayWidth;
      createLevelCanvas.current.height = displayHeight;
    }

    ctx = createLevelCanvas.current.getContext("2d");
    const elements = {
      elementDiving: elementDiving.current,
      elementGray: elementGray.current,
      elementGreen: elementGreen.current,
      elementHappy: elementHappy.current,
      elementLightBlue: elementLightBlue.current,
      elementMusicNote: elementMusicNote.current,
      elementOrange: elementOrange.current,
      elementPurple: elementPurple.current,
      elementRed: elementRed.current,
      elementSad: elementSad.current,
      elementSlowDownYellow: elementSlowDownYellow.current,
      elementWhite: elementWhite.current,
      elementYellow: elementYellow.current,
    };
    const status = {
      gameOver: false,
      laser: null,
    };
    ctx.clearRect(0, 0, createLevelCanvas.current.width, createLevelCanvas.current.height);
    drawLevel(
      createLevelCanvas.current,
      ctx,
      backDataMenu,
      gameDataMenu,
      getSettings().nicerGraphics,
      elements,
      status,
      gameInfoMenu,
      gameVarsMenu,
      true,
      null
    );
  }

  function updateGameCanvas() {
    if (!gameCanvas.current) return;

    const displayWidth = gameCanvas.current.clientWidth;
    const displayHeight = gameCanvas.current.clientHeight;
    if (
      gameCanvas.current.width !== displayWidth ||
      gameCanvas.current.height !== displayHeight
    ) {
      gameCanvas.current.width = displayWidth;
      gameCanvas.current.height = displayHeight;
    }

    ctx = gameCanvas.current.getContext("2d");
    const elements = {
      elementDiving: elementDiving.current,
      elementGray: elementGray.current,
      elementGreen: elementGreen.current,
      elementHappy: elementHappy.current,
      elementLightBlue: elementLightBlue.current,
      elementMusicNote: elementMusicNote.current,
      elementOrange: elementOrange.current,
      elementPurple: elementPurple.current,
      elementRed: elementRed.current,
      elementSad: elementSad.current,
      elementSlowDownYellow: elementSlowDownYellow.current,
      elementWhite: elementWhite.current,
      elementYellow: elementYellow.current,
    };
    const status = {
      gameOver: gameVars.gameOver,
      laser: gameVars.laser,
    };
    ctx.clearRect(0, 0, gameCanvas.current.width, gameCanvas.current.height);
    drawLevel(
      gameCanvas.current,
      ctx,
      backData,
      gameData,
      getSettings().nicerGraphics,
      elements,
      status,
      gameInfo,
      gameVars,
      false,
      createLevelSelectedCell
    );
  }

  function buttonAction() {
    handleKeyDown({ key: " ", shiftKey: false });
  }

  function buttonDown() {
    handleKeyDown({ key: "2", shiftKey: false });
  }

  function buttonJump() {
    handleKeyDown({ key: "8", shiftKey: false });
  }

  function buttonJumpLeft() {
    handleKeyDown({ key: "7", shiftKey: false });
  }

  function buttonJumpRight() {
    handleKeyDown({ key: "9", shiftKey: false });
  }

  function buttonMoveLeft() {
    handleKeyDown({ key: "4", shiftKey: false });
  }

  function buttonMoveRight() {
    handleKeyDown({ key: "6", shiftKey: false });
  }

  function buttonSelect() {
    handleKeyDown({ key: "B", shiftKey: false });
  }

  function handleGameCanvasClick(e) {
    let idx = -1;
    let info = "";
    let obj = null;

    if (!gameData || !backData) {
      return false;
    }
    if ((gameData.length < 1) || (backData.length < 1)) {
      return false;
    }

    const rows = gameData.length;
    const columns = gameData[0].length;

    let size1 = gameCanvas.current.width / columns;
    let size2 = gameCanvas.current.height / rows;

    if (size2 < size1) {
      size1 = size2;
    }
    size1 = Math.trunc(size1);
    let gameWidth = columns * size1;
    let gameHeight = rows * size1;
    let leftMargin = Math.trunc((gameCanvas.current.width - gameWidth) / 2);
    let topMargin = Math.trunc(gameCanvas.current.height - gameHeight);

    let rect = gameCanvas.current.getBoundingClientRect();
    let x = e.clientX - rect.left - leftMargin;
    let y = e.clientY - rect.top - topMargin;

    let column = Math.floor(x / size1);
    let row = Math.floor(y / size1);

    if (column >= 0 && column < columns && row >= 0 && row < rows) {
      if (createLevel) {
        // CREATE
        if (!e.altKey && !e.shiftKey && !e.ctrlKey && (createLevelObject >= 0)) {
          if (createLevelObject > 0) {
            deleteIfPurpleTeleport(backData, gameInfo, column, row);
            addObject(backData, gameData, gameInfo, column, row, createLevelObject);
          } else {
            if (gameData[row][column] > 0) {
              removeObject(gameData, gameInfo, column, row);
            } else {
              deleteIfPurpleTeleport(backData, gameInfo, column, row);
              if ([20, 23, 25, 90].includes(backData[row][column])) {
                backData[row][column] = 0;
              }
            }
          }
          updateGameCanvas();
          updateGreen();
        }
        if (!e.altKey && e.shiftKey && !e.ctrlKey) {
          createLevelSelectedCell = { x: column, y: row };
          updateGameCanvas();
        }
      } else {
        // PLAY
        if (!e.altKey && !e.shiftKey && !e.ctrlKey) {
          info = "";
          switch (gameData[row][column]) {
            case 157:
              idx = findElementByCoordinate(column, row, gameInfo.musicBoxes);
              if (idx >= 0) {
                obj = gameInfo.musicBoxes[idx];
                info = `Object: Music box, Instrument: ${obj.instrument}, Volume: ${obj.volume}, Mode: ${obj.mode}, Active: ${obj.active}, Delay: ${obj.delay}, Number of notes: ${obj.notes.length}, Note index: ${obj.noteIndex}, Group: ${obj.group}, Position: ${obj.x}, ${obj.y}`;
              }
              break;
            case 158:
              idx = findElementByCoordinate(column, row, gameInfo.pistonsTriggers);
              if (idx >= 0) {
                obj = gameInfo.pistonsTriggers[idx];
                info = `Object: Pistons trigger, Pressed: ${obj.pressed}, Group: ${obj.group}, Position: ${obj.x}, ${obj.y}`;
              }
              break;
            case 159:
            case 161:
            case 163:
            case 165:
              idx = findElementByCoordinate(column, row, gameInfo.pistons);
              if (idx >= 0) {
                obj = gameInfo.pistons[idx];
                info = `Object: Piston, Activated: ${obj.activated}, Group: ${obj.group}, Direction: ${obj.direction}, Mode: ${obj.mode}, Sticky: ${obj.sticky}, Inverted: ${obj.inverted}, Position: ${obj.x}, ${obj.y}`;
              }
              break;
            case 167:
              idx = findElementByCoordinate(column, row, gameInfo.delays);
              if (idx >= 0) {
                obj = gameInfo.delays[idx];
                info = `Object: Delay, Game ticks: ${obj.gameTicks}, Position: ${obj.x}, ${obj.y}`;
              }
              break;
            default:
              break;
          }
          if (info !== "") {
            showMessage("Info", info);
          }
        }
        if (!e.altKey && e.shiftKey && e.ctrlKey) {
          info = "";
          switch (gameData[row][column]) {
            case 24:
              info = "No, this is not The Net! The π indicates that this level is made by Panagiotis.";
              break;
            default:
              break;
          }
          if (info !== "") {
            showMessage("Info", info);
          }
        }
        if (fred && e.altKey && e.shiftKey && e.ctrlKey) {
          if (gameData[row][column] === 0) {
            gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
            gameInfo.blueBall.x = column;
            gameInfo.blueBall.y = row;
            gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
            updateGameCanvas();
          }
        }
      }
    }
  }

  function handleCreateLevelCanvasClick(e) {
    if (!createLevel || !gameDataMenu || (gameDataMenu.length < 1)) {
      return false;
    }

    const rows = gameDataMenu.length;
    const columns = gameDataMenu[0].length;

    let size1 = createLevelCanvas.current.width / columns;
    let size2 = createLevelCanvas.current.height / rows;

    if (size2 < size1) {
      size1 = size2;
    }
    size1 = Math.trunc(size1);
    let gameWidth = columns * size1;
    let gameHeight = rows * size1;
    let leftMargin = Math.trunc((createLevelCanvas.current.width - gameWidth) / 2);
    let topMargin = Math.trunc(createLevelCanvas.current.height - gameHeight);

    let rect = createLevelCanvas.current.getBoundingClientRect();
    let x = e.clientX - rect.left - leftMargin;
    let y = e.clientY - rect.top - topMargin;

    let column = Math.floor(x / size1);
    let row = Math.floor(y / size1);

    if (column >= 0 && column < columns && row >= 0 && row < rows) {
      if (!e.altKey && !e.shiftKey && !e.ctrlKey) {
        if ((row === 0) && (column > 0)) {
          fillMenu(column + 1);
          updateCreateLevelCanvas();
        }
        createLevelObject = gameDataMenu[row][column];
        if (createLevelObject === 0) {
          createLevelObject = backDataMenu[row][column];
        }
      }
    }
  }

  return (
    <div>
      <div className="page">
        <main>
          <div className="balPanel">
            <Link className="menuButton" to="/">Back</Link>
            <div className="menu">
              <button className="menuButton">Level: {levelNumber}</button>
              <div className="menu-content">
                <div>
                  <input
                    type="checkbox"
                    id="createLevel"
                    ref={cbCreateLevel}
                    name="createLevel"
                    value="createLevel"
                    onChange={handleCreateLevel}
                  />
                  <label htmlFor="createLevel">Create level</label>
                </div>
                <div ref={newLevel} onClick={() => { clickNewLevel() }}>
                  <label>New level</label>
                </div>
                <div ref={insertColumn} onClick={() => { clickInsertColumn() }}>
                  <label>Insert column</label>
                </div>
                <div ref={insertRow} onClick={() => { clickInsertRow() }}>
                  <label>Insert row</label>
                </div>

                <div ref={deleteColumn} onClick={() => { clickDeleteColumn() }}>
                  <label>Delete column</label>
                </div>
                <div ref={deleteRow} onClick={() => { clickDeleteRow() }}>
                  <label>Delete row</label>
                </div>
                <div ref={series1} onClick={() => { clickSeries("1") }}>
                  <label>Series 1</label>
                </div>
                <div ref={series2} onClick={() => { clickSeries("2") }}>
                  <label>Series 2</label>
                </div>
                <div ref={series3} onClick={() => { clickSeries("3") }}>
                  <label>Series 3</label>
                </div>
                <div ref={seriesSmall} onClick={() => { clickSeries("Small") }}>
                  <label>Series Small</label>
                </div>
                <div ref={seriesEasy} onClick={() => { clickSeries("Easy") }}>
                  <label>Series Easy</label>
                </div>
                <div ref={seriesExtreme} onClick={() => { clickSeries("Extreme") }}>
                  <label>Series Extreme</label>
                </div>
                <div ref={loadRandom} onClick={randomLevel}>
                  <label>Random level</label>
                </div>
                <div onClick={clickSaveToMemory}>
                  <label>Save to memory</label>
                </div>
                <div onClick={() => { clickLoadFromMemory(0) }}>
                  <label>Load from memory</label>
                </div>
                <div onClick={clickExportLevel}>
                  <label>Export level</label>
                </div>
                <div onClick={clickImportLevel}>
                  <label>Import level</label>
                </div>
              </div>
            </div>
            <button ref={tryAgainButton} className="menuButton" onClick={tryAgain}>
              Try again
            </button>
            <button className="menuButton" onClick={clickCode}>
              Code
            </button>
            <div className="balPanelText">
              Green: <span className="balPanelTextSpan">{green}</span>
            </div>
            <button className="menuButton" onClick={() => { hint(gameVars) }}>
              ?
            </button>

            <div className="menu">
              <button className="menuButton">Settings</button>
              <div className="menu-content">
                <div>
                  <label className="rightmargin" htmlFor="sound">Sound volume</label>
                  <select name="sound" id="sound" ref={cbSound} onChange={handleChangeSettings}>
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div>
                  <label className="rightmargin" htmlFor="music">Music volume</label>
                  <select name="music" id="music" ref={cbMusic} onChange={handleChangeSettings}>
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="graphics"
                    ref={cbGraphics}
                    name="graphics"
                    value="graphics"
                    onChange={handleChangeSettings}
                  />
                  <label htmlFor="graphics">Nicer graphics</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="questions"
                    ref={cbQuestions}
                    name="questions"
                    value="questions"
                    onChange={handleChangeSettings}
                  />
                  <label htmlFor="questions">Less questions</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="arrowButtons"
                    ref={cbArrowButtons}
                    name="arrowButtons"
                    value="arrowButtons"
                    onChange={handleChangeSettings}
                  />
                  <label htmlFor="arrowButtons">Arrow buttons</label>
                </div>
              </div>
            </div>
          </div>
          <div className="canvasAndButtons">
            <canvas
              className="gameCanvas"
              ref={gameCanvas}
              onClick={handleGameCanvasClick}
            />
            <canvas
              className="createLevelCanvas"
              ref={createLevelCanvas}
              onClick={handleCreateLevelCanvasClick}
            />
            <div className="gameButtons">
              <div ref={elementGameButtons}>
                <button className="gameButton" onClick={buttonJumpLeft}>
                  <img src={arrowJumpLeft} alt="Arrow Up Left button" />
                </button>
                <button className="gameButton" onClick={buttonMoveLeft}>
                  <img src={arrowLeft} alt="Arrow Left button" />
                </button>
                <button className="gameButton" onClick={buttonJump}>
                  <img src={arrowUp} alt="Arrow Up button" />
                </button>
                <button className="gameButton" onClick={buttonDown}>
                  <img src={arrowDown} alt="Arrow Down button" />
                </button>
                <button className="gameButton" onClick={buttonMoveRight}>
                  <img src={arrowRight} alt="Arrow Right button" />
                </button>
                <button className="gameButton" onClick={buttonJumpRight}>
                  <img src={arrowJumpRight} alt="Arrow Up Right button" />
                </button>
                <button className="gameButton" onClick={buttonAction}>
                  <img src={actionButton} alt="Action button" />
                </button>
                <button className="gameButton" onClick={buttonSelect}>
                  <img src={selectButton} alt="Select button" />
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementDiving} src={imgBlueDiving} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementHappy} src={imgBlueHappy} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementSad} src={imgBlueSad} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementLightBlue} src={imgLightBlue} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementMusicNote} src={imgMusicNote} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementRed} src={imgRed} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementGray} src={imgGray} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementGreen} src={imgGreen} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementOrange} src={imgOrange} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementPurple} src={imgPurple} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementSlowDownYellow} src={imgSlowDownYellow} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementWhite} src={imgWhite} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementYellow} src={imgYellow} />
          </div>
        </main>
      </div>

      {showModal && (
        <MessageBox
          title={messageTitle}
          message={messageContent}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default BalPage;
