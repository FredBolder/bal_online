import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "./useModal.js";
import { ModalContext } from "./ModalContext";

import {
  changeGroup,
  changeDirection,
  changeIntelligence,
  changePistonInverted,
  changePistonMode,
  changePistonSticky,
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
import { changeColor, changeColors, deleteColorsAtColumn, deleteColorAtPosition, deleteColorsAtRow, deleteColors, 
  insertColorsAtColumn, insertColorsAtRow, moveColor } from "../colorUtils.js";
import { changeConveyorBeltMode } from "../conveyorBelts.js";
import { copyCell, loadCellForUndo, menuToNumber, saveCellForUndo } from "../createLevelMode.js";
import { checkGameOver } from "../gameOver.js";
import { drawLevel } from "../drawLevel.js";
import { exportLevel, importLevel } from "../files.js";
import { getGameInfo, initGameInfo, initGameVars, switchPlayer } from "../gameInfo.js";
import { globalVars } from "../glob.js";
import { fixLevel, getLevel, getAllLevels, getSecretStart, getRandomLevel, loadLevelSettings } from "../levels.js";
import { checkMagnets } from "../magnets.js";
import { clearMemory, loadFromMemory, memoryIsEmpty, saveToMemory } from "../memory.js";
import { gameScheduler } from "../scheduler.js";
import { rotateGame } from "../rotateGame.js";
import { getSettings, loadSettings, saveSettings, setSettings } from "../settings.js";
import { playSound } from "../sound.js";
import { moveObjectWithTelekineticPower } from "../telekinesis.js/";
import { deleteIfPurpleTeleport } from "../teleports.js";
import { tryParseInt } from "../utils.js";

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
let createLevelMenu = -1;
let createLevelObject = -1;
let ctx;
let fred = false; // TODO: Set to false when publishing
let gameInterval;
let initialized = false;
let modalOpen = false;
let redoPossible = false;
let undoBuffer = [];

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
  const { showMessage, showConfirm, showInput, showSelect } = useModal();
  const { modalState } = useContext(ModalContext);

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
  const levelSetting = useRef(null);
  const loadLevel = useRef(null);
  const loadRandom = useRef(null);
  const newLevel = useRef(null);
  const redo = useRef(null);
  const tryAgainButton = useRef(null);
  const undo = useRef(null);
  const [green, setGreen] = useState(0);
  const [levelNumber, setLevelNumber] = useState(0);


  const modalStateRef = useRef(null);

  useEffect(() => {
    modalStateRef.current = modalState; // update ref whenever modal changes
    modalOpen = (modalStateRef.current !== null);
  }, [modalState]);

  useEffect(() => {
    const handleKeyDownEvent = (e) => {
      if (modalStateRef.current) return; // Ignore when modal is open

      handleKeyDown(e);
    };

    document.addEventListener("keydown", handleKeyDownEvent);
    return () => document.removeEventListener("keydown", handleKeyDownEvent);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  async function runGameScheduler() {
    let saveCoilSpring = false;
    let saveDivingGlasses = false;
    let saveKey = false;
    let saveLadder = false;
    let savePickaxe = false;
    let savePropeller = false;
    let saveTelekineticPower = false;
    let saveWeakStone = false;

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



    if (modalOpen || createLevel || globalVars.loading || !gameData || !backData || !gameVars || !gameInfo) {
      return;
    }
    if (gameVars.gameOver || (gameData.length < 2) || (backData.length < 2) ||
      (gameInfo.blueBall.x === -1) || (gameInfo.blueBall.y === -1)) {
      return;
    }
    const info = await gameScheduler(backData, gameData, gameInfo, gameVars);
    if (info.gateTravelling) {
      switch (gameVars.gateTravelling) {
        case 1:
          playSound("teleport");
          gameVars.gateTravelling = 2;
          break;
        case 2:
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 132;
          clearMemory(0); // Prevent conflicts between two worlds          
          if (globalVars.isInOtherWorld) {
            globalVars.isInOtherWorld = false;
            saveToMemory(gameData, backData, gameInfo, gameVars, 2);
            saveItems();
            await clickLoadFromMemory(1);
            loadItems();
          } else {
            globalVars.isInOtherWorld = true;
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
          info.updateCanvas = true;
          info.updateGreen = true;
          info.updateLevelNumber = true;
          break;
        default:
          break;
      }
    }

    if (info.playSounds.length > 0) {
      for (let i = 0; i < info.playSounds.length; i++) {
        const snd = info.playSounds[i];
        playSound(snd);
      }
    }
    if (info.updateCanvas) {
      updateGameCanvas();
    }
    if (info.updateGreen) {
      updateGreen();
    }
    if (info.updateLevelNumber) {
      setLevelNumber(gameVars.currentLevel);
    }
  }

  function saveProgress() {
    localStorage.setItem("lastSolvedLevel", gameVars.currentLevel.toString());
  }

  async function hint(gameVars) {
    let msg = "";
    let value = "";

    if (createLevel) {
      value = await showInput("Hint", "Enter the hint for this level.", gameVars.hint);
      if (value !== null) {
        gameVars.hint = value.trim();
      }
    } else {
      msg = gameVars.hint;
      if (msg === "") {
        msg = "There is no hint available for this level."
      }
      showMessage("Info", msg);
    }
  }

  async function clickCode() {
    let code = 0;
    let level = 0;

    code = await showInput("Code", "Enter the code for the level that you want to play.", "");
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

  async function clickNewLevel(silent = false) {
    let level = 9999;
    let value = null;

    if (silent) {
      value = "Normal (32 x 20)";
    } else {
      value = await showSelect("New level", "Size", ["Normal (32 x 20)", "Small (10 x 10)", "Square (20 x 20)"], 0);
    }
    if (value !== null) {
      createLevelSelectedCell = null;
      switch (value) {
        case "Normal (32 x 20)":
          level = 9999;
          break;
        case "Small (10 x 10)":
          level = 9998;
          break;
        case "Square (20 x 20)":
          level = 9997;
          break;
        default:
          level = 9999;
          break;
      }
      if (!silent) {
        saveUndo("New level", "level");
      }
      await initLevel(level);
      // 9999 has a special meaning
      gameVars.currentLevel = 9999;
      setLevelNumber(9999);
    }
  }

  async function clickDeleteColumn() {
    function del() {
      saveUndo("Delete column", "level");
      for (let i = 0; i < gameData.length; i++) {
        removeObject(gameData, gameInfo, createLevelSelectedCell.x, i);
        deleteIfPurpleTeleport(backData, gameInfo, createLevelSelectedCell.x, i);
        gameData[i].splice(createLevelSelectedCell.x, 1);
        backData[i].splice(createLevelSelectedCell.x, 1);
      }
      deleteColorsAtColumn(gameVars.fgcolor, createLevelSelectedCell.x);
      deleteColorsAtColumn(gameVars.bgcolor, createLevelSelectedCell.x);
      moveObjects(gameInfo, "deleteColumn", createLevelSelectedCell.x, 0, 0, 0);
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
        const confirm = await showConfirm("Question", "Delete current column?");
        if (confirm === "YES") {
          del();
        }
      }
    }
  }

  async function clickDeleteRow() {
    function del() {
      saveUndo("Delete row", "level");
      for (let i = 0; i < gameData[createLevelSelectedCell.y].length; i++) {
        removeObject(gameData, gameInfo, i, createLevelSelectedCell.y);
        deleteIfPurpleTeleport(backData, gameInfo, i, createLevelSelectedCell.y);
      }
      gameData.splice(createLevelSelectedCell.y, 1);
      backData.splice(createLevelSelectedCell.y, 1);
      deleteColorsAtRow(gameVars.fgcolor, createLevelSelectedCell.y);
      deleteColorsAtRow(gameVars.bgcolor, createLevelSelectedCell.y);
      moveObjects(gameInfo, "deleteRow", 0, createLevelSelectedCell.y, 0, 0);
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
        const confirm = await showConfirm("Question", "Delete current row?");
        if (confirm === "YES") {
          del();
        }
      }
    }
  }

  async function clickInsertColumn() {
    function ins() {
      saveUndo("Insert column", "level");
      let value = 0;
      let n = gameData.length;
      for (let i = 0; i < n; i++) {
        if ((i === 0) || (i === (n - 1))) {
          value = 1;
        } else {
          value = 0;
        }
        gameData[i].splice(createLevelSelectedCell.x, 0, value);
        backData[i].splice(createLevelSelectedCell.x, 0, 0);
      }
      insertColorsAtColumn(gameVars.fgcolor, createLevelSelectedCell.x);
      insertColorsAtColumn(gameVars.bgcolor, createLevelSelectedCell.x);
      moveObjects(gameInfo, "insertColumn", createLevelSelectedCell.x, 0, 0, 0);
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
        const confirm = await showConfirm("Question", "Insert column before the current column?");
        if (confirm === "YES") {
          ins();
        }
      }
    }
  }

  async function clickInsertRow() {
    function ins() {
      saveUndo("Insert row", "level");
      let n = gameData[0].length;
      let newRow = [];
      let newRowBackData = [];
      for (let i = 0; i < n; i++) {
        newRowBackData.push(0);
        if ((i === 0) || (i === (n - 1))) {
          newRow.push(1);
        } else {
          newRow.push(0);
        }
      }
      gameData.splice(createLevelSelectedCell.y, 0, newRow);
      backData.splice(createLevelSelectedCell.y, 0, newRowBackData);
      insertColorsAtRow(gameVars.fgcolor, createLevelSelectedCell.y);
      insertColorsAtRow(gameVars.bgcolor, createLevelSelectedCell.y);
      moveObjects(gameInfo, "insertRow", 0, createLevelSelectedCell.y, 0, 0);
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
        const confirm = await showConfirm("Question", "Insert row before the current row?");
        if (confirm === "YES") {
          ins();
        }
      }
    }
  }

  async function clickLevelSetting() {
    let setting = null;

    setting = await showInput("Level setting", "Enter a setting (example: $gameticks: conveyorbelt, 10).", "");
    if (setting !== null) {
      loadLevelSettings(backData, gameData, gameInfo, gameVars, [setting], false);
      updateGameCanvas();
    }
  }

  async function clickLoadLevel() {
    let level = 200;

    const value = await showSelect(
      "Load level",
      "Load the first level of series:",
      ["1", "2", "3", "4", "Small", "Easy", "Extreme"],
      0
    );

    if (value !== null) {
      switch (value) {
        case "1":
          level = 200;
          break;
        case "2":
          level = 300;
          break;
        case "3":
          level = 400;
          break;
        case "4":
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
      initLevel(level);
    }
  }

  async function clickSaveToMemory() {
    if (getSettings().lessQuestions) {
      saveToMemory(gameData, backData, gameInfo, gameVars, 0);
    } else {
      const confirm = await showConfirm("Question", "Save level to memory?");
      if (confirm === "YES") {
        saveToMemory(gameData, backData, gameInfo, gameVars, 0);
      }
    }
  }

  async function clickLoadFromMemory(idx) {
    async function load() {
      if ((idx === 0) && createLevel) {
        saveUndo("Load from memory", "level");
      }
      const data = loadFromMemory(idx);
      if (data === null) {
        if (idx > 0) {
          // Gate travelling for the first time
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
      const confirm = await showConfirm("Question", "Load level from memory?");
      if (confirm === "YES") {
        load();
      }
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

    if (result.error) {
      showMessage("Error", result.error);
      return;
    }

    if (result !== null) {
      if (createLevel) {
        saveUndo("Import level", "level");
      }
      clearMemory(1);
      clearMemory(2);
      globalVars.isInOtherWorld = false;
      globalVars.otherWorldGreen = -1;
      globalVars.loading = true;
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
      gameVars.currentLevel = 9999;
      updateGameCanvas();
      updateGreen();
      setLevelNumber(gameVars.currentLevel);
      if (gameVars.startlevelmessage !== "") {
        showMessage("Message", gameVars.startlevelmessage);
      }
      globalVars.loading = false;
    }
  }

  async function clickRedo() {
    if (redoPossible) {
      const confirm = await showConfirm("Question", "Redo?");
      if (confirm === "YES") {
        saveUndo("Redo", "level", null);
        redoPossible = false;
        clickLoadFromMemory(5);
        updateGameCanvas();
        updateGreen();
      }
    } else {
      showMessage("Message", "There is nothing to redo.");
    }
  }

  async function clickUndo() {
    if (undoBuffer.length > 0) {
      const confirm = await showConfirm("Question", `Undo ${undoBuffer[undoBuffer.length - 1].action}?`);
      if (confirm === "YES") {
        saveToMemory(gameData, backData, gameInfo, gameVars, 5);
        redoPossible = true;
        const undoItem = undoBuffer.pop();
        const obj = JSON.parse(undoItem.objString);
        switch (undoItem.type) {
          case "level":
            clickLoadFromMemory(4);
            break;
          case "single":
            loadCellForUndo(backData, gameData, gameInfo, obj);
            break;
          case "move":
            if (obj !== null) {
              moveSelectedObject({ x: obj.x1, y: obj.y1 }, "position", { x: obj.x2, y: obj.y2 }, false);
            }
            break;
          case "bgcolors":
            if (obj !== null) {
              gameVars.bgcolor.length = 0;
              gameVars.bgcolor = obj.colors;
            }
            break;
          case "fgcolors":
            if (obj !== null) {
              gameVars.fgcolor.length = 0;
              gameVars.fgcolor = obj.colors;
            }
            break;
          default:
            break;
        }
        updateGameCanvas();
        updateGreen();
      }
    } else {
      showMessage("Message", "There is nothing to undo.")
    }
  }

  async function randomLevel() {
    const confirm = await showConfirm("Question", "Load a random level?");
    if (confirm === "YES") {
      initLevel(getRandomLevel(gameVars.currentLevel));
    }
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

  async function handleCreateLevel() {
    let msg = "";

    createLevelSelectedCell = null;
    createLevel = cbCreateLevel.current.checked;
    if (createLevel) {
      if (memoryIsEmpty(3)) {
        clickNewLevel(true);
      } else {
        await clickLoadFromMemory(3);
      }
      fillMenu(1);
    } else {
      msg = fixLevel(gameData, gameInfo);
      updateGreen();
      if (msg !== "") {
        showMessage("Error", msg);
      }
      saveToMemory(gameData, backData, gameInfo, gameVars, 3);
    }
    updateGameButtonsDisplay();
    updateCreateLevelCanvasDisplay();
    updateMenuItemsDisplay();
    updateGameCanvas();
    updateCreateLevelCanvas();
  }

  function fillMenu(n) {
    let arr0 = null;
    let arr1 = null;
    let arr2 = null;

    createLevelMenu = n;
    gameDataMenu = null;
    gameDataMenu = [];
    backDataMenu = null;
    initGameInfo(gameInfoMenu);
    initGameVars(gameVarsMenu);

    for (let i = 0; i < 3; i++) {
      gameDataMenu.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    backDataMenu = zeroArray(gameDataMenu.length, gameDataMenu[0].length);

    arr0 = [2083, 2038, 1, 4, 9, 159, 6, 171, 10, 20, 91, 2033, 2050, 2051, 0, 0];
    for (let i = 0; i < arr0.length; i++) {
      if (i < gameDataMenu[0].length) {
        addObject(backDataMenu, gameDataMenu, gameInfoMenu, i, 0, arr0[i]);
      }
    }
    switch (n) {
      case 1:
        arr1 = [2050, 2051];
        arr2 = [0];
        break;
      case 2:
        arr1 = [2040, 2041, 2042, 2043, 2096, 2035];
        arr2 = [0];
        break;
      case 3:
        arr1 = [1, 15, 16, 17, 18, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151];
        arr2 = [152, 153, 154, 174, 175, 176, 177, 35, 12, 34, 99, 22, 36, 37, 117];
        break;
      case 4:
        arr1 = [2, 3, 140, 168, 4, 5, 126, 127, 128, 129, 130, 8, 2045, 2046, 2047, 105];
        arr2 = [95, 96, 28, 100, 101, 102, 103, 104, 83, 82, 98, 40];
        break;
      case 5:
        arr1 = [9, 84, 85, 86, 138, 139, 155, 115, 116, 131, 136, 156, 121, 122, 123, 124];
        arr2 = [125];
        break;
      case 6:
        arr1 = [158, 159, 161, 163, 165, 2034, 2035, 2036, 2037, 2038, 2039];
        arr2 = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
        break;
      case 7:
        arr1 = [6, 7, 2040, 2041, 2042, 2043, 39, 25, 90, 108, 80, 137, 118, 109, 110, 111];
        arr2 = [112, 81, 31, 92, 170, 178, 2092, 2093, 2094, 2095];
        break;
      case 8:
        arr1 = [171, 172, 173, 2040, 2041, 2044, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091];
        arr2 = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
        break;
      case 9:
        arr1 = [10, 11, 87, 88, 13, 169, 30, 29];
        arr2 = [0];
        break;
      case 10:
        arr1 = [23, 20, 113, 114, 26, 27];
        arr2 = [0];
        break;
      case 11:
        arr1 = [91, 119, 120, 97, 157, 167, 89, 183];
        arr2 = [0];
        break;
      case 12:
        arr1 = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
        arr2 = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
        break;
      case 13:
      case 14:
        arr1 = [2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067];
        arr2 = [2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083];
        break;
      default:
        arr1 = [0];
        arr2 = [0];
        break;
    }

    if ((arr0.length > 16) || (arr1.length > 16) || (arr2.length > 16)) {
      showMessage("Error", "Invalid Create level menu data!");
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

  async function initLevel(n, gateTravelling = false) {
    let data = [];
    let gd;

    try {
      if (!gateTravelling) {
        globalVars.isInOtherWorld = false;
        globalVars.otherWorldGreen = -1;
        clearMemory(1);
        clearMemory(2);
      }
      globalVars.loading = true;
      initGameVars(gameVars);
      gameVars.currentLevel = n;
      setLevelNumber(n);
      gameInfo.blueBall.x = -1;
      gameInfo.blueBall.y = -1;
      data = await getLevel(gameVars.currentLevel, gateTravelling);
      if (data.error !== "") {
        showMessage("Error", data.error);
      }
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
      globalVars.loading = false;
    } catch (err) {
      console.log(err);
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
    let info = {
      eating: false,
      freezeTime: 0,
      message: "",
      player: false,
      slowDownYellow: false,
      sound: "",
      rotateLeft: false,
      rotateRight: false,
      update: false,
    };

    let codes = "";
    let isJumping = false;

    if (modalOpen) {
      return;
    }

    // Ignore 
    if (["Alt", "Ctrl", "Shift"].includes(e.key)) {
      return;
    }
    if (e.altKey || e.ctrlKey) {
      return;
    }


    if (globalVars.loading || gameVars.gameOver || gameVars.teleporting > 0 || gameVars.gateTravelling > 0) {
      return;
    }
    if (gameInfo.blueBall.x === -1 || gameInfo.blueBall.y === -1 || gameData.length === 0) {
      return;
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
      if (!e.shiftKey) {
        let direction = "";
        switch (e.key) {
          case "ArrowLeft":
            direction = "left";
            break;
          case "ArrowRight":
            direction = "right";
            break;
          case "ArrowUp":
            direction = "up";
            break;
          case "ArrowDown":
            direction = "down";
            break;
          default:
            break;
        }
        if (direction !== "") {
          moveSelectedObject(createLevelSelectedCell, direction, null, true);
        }
      }
      return;
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
          if (info.rotateRight) {
            if (rotateGame(backData, gameData, gameInfo)) {
              info.update = true;
            }
          }
          if (info.rotateLeft) {
            if (rotateGame(backData, gameData, gameInfo, true)) {
              info.update = true;
            }
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
          if (info.rotateRight) {
            if (rotateGame(backData, gameData, gameInfo)) {
              info.update = true;
            }
          }
          if (info.rotateLeft) {
            if (rotateGame(backData, gameData, gameInfo, true)) {
              info.update = true;
            }
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
          if (info.player && !gameInfo.hasPropeller && !inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData)) {
            isJumping = true;
          }
          break;
        case "q":
        case "Q":
        case "7":
          info = jumpLeft(backData, gameData, gameInfo);
          if (info.player && !gameInfo.hasPropeller && !inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData)) {
            isJumping = true;
          }
          break;
        case "e":
        case "E":
        case "9":
          info = jumpRight(backData, gameData, gameInfo);
          if (info.player && !gameInfo.hasPropeller && !inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData)) {
            isJumping = true;
          }
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

    if (isJumping) {
      // To prevent that you fall from the elevator
      if (gameVars.elevatorCounter >= (gameVars.elevatorCountTo - 3)) {
        gameVars.elevatorCounter -= 2;
      }
    }

    // Create non-existing properties
    if (!Object.prototype.hasOwnProperty.call(info, "eating")) {
      info.eating = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "freezeTime")) {
      info.freezeTime = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "message")) {
      info.message = "";
    }
    if (!Object.prototype.hasOwnProperty.call(info, "player")) {
      info.player = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "slowDownYellow")) {
      info.slowDownYellow = 0;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "sound")) {
      info.sound = "";
    }
    if (!Object.prototype.hasOwnProperty.call(info, "rotateLeft")) {
      info.rotateLeft = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "rotateRight")) {
      info.rotateRight = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "update")) {
      info.update = false;
    }

    // Game over must be checked before checking if the level is solved
    const gameOverResult = checkGameOver(backData, gameData, gameInfo, gameVars);
    if (gameOverResult.updateCanvas) {
      info.update = true;
    }
    for (let i = 0; i < gameOverResult.playSounds.length; i++) {
      const snd = gameOverResult.playSounds[i];
      playSound(snd);
    }
    if (info.freezeTime > 0) {
      gameVars.timeFreezer = info.freezeTime;
    }
    if (info.slowDownYellow > 0) {
      gameVars.yellowSlowCounter = info.slowDownYellow;
    }
    if (info.player) {
      gameVars.skipFalling = 1;
      updateGameCanvas();
    }
    if (info.update) {
      updateGameCanvas();
    }


    // Check if level is solved
    if (info.eating) {
      gameInfo.greenBalls--;
      updateGreen();
      playSound("eat");
      if (!gameVars.gameOver && ((!gameInfo.hasTravelGate && (gameInfo.greenBalls === 0)) ||
        ((globalVars.thisWorldGreen === 0) && (globalVars.otherWorldGreen === 0)))
      ) {
        if (gameVars.currentLevel === 9999) {
          showMessage("Congratulations!", "You have solved the level!");
          initLevel(gameVars.currentLevel);
        } else {
          showMessage("Congratulations!", `Write down the code ${numberToCode(gameVars.currentLevel + 1)} to go to level ${gameVars.currentLevel + 1} whenever you want.`);
          initLevel(gameVars.currentLevel + 1);
          saveProgress();
        }
      }
    }

    if (info.sound !== "") {
      playSound(info.sound);
    }

    if (info.message !== "") {
      showMessage("Message", info.message);
    }

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

    // Extra check
    if (checkMagnets(gameInfo)) {
      playSound("magnet");
    }
  }

  function handleResize() {
    updateGameCanvas();
    updateCreateLevelCanvas();
  }

  async function tryAgain() {
    async function again() {
      if ((gameVars.currentLevel === 9999) && !memoryIsEmpty(3)) {
        await clickLoadFromMemory(3);
      } else {
        initLevel(gameVars.currentLevel);
      }
    }

    if (getSettings().lessQuestions) {
      again();
    } else {
      const confirm = await showConfirm("Question", "Initialize level?");
      if (confirm === "YES") {
        again();
      }
    }
  }

  function saveUndo(action, type, obj = null) {
    // type
    // bgcolors, fgcolors, level, move, single
    let idx = -1;
    redoPossible = false;
    if (type === "level") {
      saveToMemory(gameData, backData, gameInfo, gameVars, 4);
      for (let i = 0; i < undoBuffer.length; i++) {
        if (undoBuffer[i].type === "level") {
          idx = i;
        }
        if (idx >= 0) {
          // There can only be one item with type level
          undoBuffer.splice(0, idx + 1);
        }
      }
    }
    while (undoBuffer.length >= 10) {
      undoBuffer.splice(0, 1);
    }
    const undoItem = {
      action,
      type,
      objString: JSON.stringify(obj)
    };
    undoBuffer.push(undoItem);
  }

  //const myRef = useRef(document);


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
      gameVars.currentLevel = 200;
      loadProgress();
      if (fred) {
        gameVars.currentLevel = 426;
      }
      initLevel(gameVars.currentLevel);
    }

    updateGameButtonsDisplay();
    updateCreateLevelCanvasDisplay();
    updateMenuItemsDisplay();
    updateGameCanvas();
    setLevelNumber(gameVars.currentLevel);
    updateGreen();

    //const el = myRef.current;
    //el.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    gameInterval = setInterval(runGameScheduler, 50);
    return () => {
      //el.removeEventListener("keydown", handleKeyDown);
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
    levelSetting.current.style.display = (createLevel) ? "block" : "none";
    newLevel.current.style.display = (createLevel) ? "block" : "none";
    insertColumn.current.style.display = (createLevel) ? "block" : "none";
    insertRow.current.style.display = (createLevel) ? "block" : "none";
    deleteColumn.current.style.display = (createLevel) ? "block" : "none";
    deleteRow.current.style.display = (createLevel) ? "block" : "none";
    undo.current.style.display = (createLevel) ? "block" : "none";
    redo.current.style.display = (createLevel) ? "block" : "none";

    loadRandom.current.style.display = (!createLevel) ? "block" : "none";
    loadLevel.current.style.display = (!createLevel) ? "block" : "none";
    tryAgainButton.current.style.display = (!createLevel) ? "block" : "none";
  }

  function updateGreen() {
    setGreen(gameInfo.greenBalls);
    if (globalVars.isInOtherWorld) {
      globalVars.otherWorldGreen = gameInfo.greenBalls;
    } else {
      globalVars.thisWorldGreen = gameInfo.greenBalls;
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
    let move = false;
    let obj = null;

    if (!gameData || !backData) {
      return;
    }
    if ((gameData.length < 1) || (backData.length < 1)) {
      return;
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

    let oneSelected = true;
    let singleCellAction = false;
    let xmin = -1;
    let ymin = -1;
    let xmax = -1;
    let ymax = -1;

    let column = Math.floor(x / size1);
    let row = Math.floor(y / size1);

    if ((column < 0) || (column >= columns) || (row < 0) || (row >= rows)) {
      return;
    }

    if (createLevel) {
      // CREATE
      if (!e.altKey && !e.ctrlKey && (e.shiftKey || (createLevelObject === -2))) {
        // SELECT
        createLevelSelectedCell = { x: column, y: row };
        updateGameCanvas();
        fillMenu(2);
        updateCreateLevelCanvas();
        return;
      }
      if (!e.altKey && !e.shiftKey) {
        move = ((createLevelMenu === menuToNumber("select")) && (createLevelObject === 2035));
        xmin = column;
        xmax = xmin;
        ymin = row;
        ymax = ymin;
        if (e.ctrlKey && (createLevelSelectedCell !== null) && !move) {
          if (column > createLevelSelectedCell.x) {
            xmin = createLevelSelectedCell.x;
            xmax = column;
          } else {
            xmin = column;
            xmax = createLevelSelectedCell.x;
          }
          if (row > createLevelSelectedCell.y) {
            ymin = createLevelSelectedCell.y;
            ymax = row;
          } else {
            ymin = row;
            ymax = createLevelSelectedCell.y;
          }
        }
        oneSelected = ((xmin === xmax) && (ymin === ymax));
        if (oneSelected) {
          // Single cell
          singleCellAction = true;
          switch (createLevelObject) {
            case 2:
              if ((gameInfo.blueBall.x >= 0) && (gameInfo.blueBall.y >= 0)) {
                saveUndo("Move blue ball", "move", { x1: column, y1: row, x2: gameInfo.blueBall.x, y2: gameInfo.blueBall.y });
                singleCellAction = false;
              }
              break;
            case 37:
              if ((gameInfo.detonator.x >= 0) && (gameInfo.detonator.y >= 0)) {
                saveUndo("Move detonator", "move", { x1: column, y1: row, x2: gameInfo.detonator.x, y2: gameInfo.detonator.y });
                singleCellAction = false;
              }
              break;
            case 132:
              // Not possible yet in level creator
              if ((gameInfo.travelGate.x >= 0) && (gameInfo.travelGate.y >= 0)) {
                saveUndo("Move travel gate", "move", { x1: column, y1: row, x2: gameInfo.travelGate.x, y2: gameInfo.travelGate.y });
                singleCellAction = false;
              }
              break;
            default:
              break;
          }
          if ((createLevelMenu === menuToNumber("backgroundcolors")) || (createLevelMenu === menuToNumber("foregroundcolors"))) {
            if ((createLevelObject >= 2052) && (createLevelObject <= 2083)) {
              singleCellAction = false;
            }
          }
          if (move) {
              singleCellAction = false;
          }
          if (singleCellAction) {
            saveUndo("Single cell action", "single", saveCellForUndo(backData, gameData, gameInfo, column, row));
          }
        } else {
          // Multiple cells
          if (createLevelMenu === menuToNumber("backgroundcolors") && (createLevelObject >= 2052) && (createLevelObject <= 2083)) {
            if (createLevelObject === 2083) {
              saveUndo("Delete background colors", "bgcolors", { colors: gameVars.bgcolor });
              deleteColors(gameVars.bgcolor, xmin, ymin, xmax - xmin + 1, ymax - ymin + 1);
            } else {
              saveUndo("Change background colors", "bgcolors", { colors: gameVars.bgcolor });
              changeColors(gameVars.bgcolor, xmin, ymin, xmax - xmin + 1, ymax - ymin + 1, createLevelObject - 2052);
            }
            updateGameCanvas();
            return;
          }
          if (createLevelMenu === menuToNumber("foregroundcolors") && (createLevelObject >= 2052) && (createLevelObject <= 2083)) {
            if (createLevelObject === 2083) {
              saveUndo("Delete foreground colors", "fgcolors", { colors: gameVars.fgcolor });
              deleteColors(gameVars.fgcolor, xmin, ymin, xmax - xmin + 1, ymax - ymin + 1);
            } else {
              saveUndo("Change foreground colors", "fgcolors", { colors: gameVars.fgcolor });
              changeColors(gameVars.fgcolor, xmin, ymin, xmax - xmin + 1, ymax - ymin + 1, createLevelObject - 2052);
            }
            updateGameCanvas();
            return;
          }
          saveUndo("Multiple cells action", "level");
        }

        for (let r = ymin; r <= ymax; r++) {
          for (let c = xmin; c <= xmax; c++) {
            row = r;
            column = c;

            if (createLevelObject >= 2000) {
              if (createLevelMenu === menuToNumber("select")) {
                if (createLevelSelectedCell !== null) {
                  switch (createLevelObject) {
                    case 2035:
                      moveSelectedObject(createLevelSelectedCell, "position", { x: column, y: row }, true);
                      break;
                    case 2096:
                      if ((createLevelSelectedCell.x !== column) || (createLevelSelectedCell.y !== row)) {
                        copyCell(backData, gameData, gameInfo, createLevelSelectedCell.x, createLevelSelectedCell.y, column, row);
                      }
                      break;
                    default:
                      break;
                  }
                }
              }

              if ((createLevelMenu === menuToNumber("balls")) && (createLevelObject >= 2045) && (createLevelObject <= 2047)) {
                if (changeIntelligence(gameData, gameInfo, column, row, createLevelObject - 2045) === -1) {
                  if (oneSelected) {
                    showMessage("Info", "Click on a red ball to set the intelligence.");
                  }
                }
              }

              if (createLevelMenu === menuToNumber("pistons")) {
                if ((createLevelObject >= 2001) && (createLevelObject <= 2016)) {
                  changeGroup(gameInfo, column, row, createLevelObject - 2000);
                }
                if ((createLevelObject >= 2034) && (createLevelObject <= 2037)) {
                  if (changePistonMode(gameInfo, column, row, ["toggle", "momentary", "repeatfast", "repeatslow"][createLevelObject - 2034]) === -1) {
                    if (oneSelected) {
                      showMessage("Info", "Click on a piston to set the piston mode.");
                    }
                  }
                }
                if (createLevelObject === 2038) {
                  if (changePistonSticky(gameInfo, column, row) === -1) {
                    if (oneSelected) {
                      showMessage("Info", "Click on a piston to toggle between sticky and not sticky.");
                    }
                  }
                }
                if (createLevelObject === 2039) {
                  if (changePistonInverted(gameInfo, column, row) === -1) {
                    if (oneSelected) {
                      showMessage("Info", "Click on a piston to toggle between inverted and not inverted.");
                    }
                  }
                }
              }

              if (((createLevelMenu === menuToNumber("elevators")) || (createLevelMenu === menuToNumber("conveyorbelts"))) && (createLevelObject >= 2040) && (createLevelObject <= 2044)) {
                if (changeDirection(gameData, gameInfo, column, row, ["left", "right", "up", "down", "none"][createLevelObject - 2040]) === -1) {
                  if (oneSelected) {
                    showMessage("Info", "Click on an elevator, a conveyor belt or a mover to set a valid direction.");
                  }
                }
              }

              if ((createLevelMenu === menuToNumber("elevators")) && (createLevelObject >= 2092) && (createLevelObject <= 2095)) {
                if (changeDirection(gameData, gameInfo, column, row, ["upleft", "upright", "downleft", "downright"][createLevelObject - 2092]) === -1) {
                  if (oneSelected) {
                    showMessage("Info", "Click on an elevator, a conveyor belt or a mover to set a valid direction.");
                  }
                }
              }

              if (createLevelMenu === menuToNumber("conveyorbelts")) {
                if ((createLevelObject >= 2084) && (createLevelObject <= 2091)) {
                  if (changeConveyorBeltMode(gameInfo, column, row, ["notrigger", "rightleft", "noneright", "noneleft", "nonerightleft", "none", "right", "left"][createLevelObject - 2084]) === -1) {
                    if (oneSelected) {
                      showMessage("Info", "Click on a conveyor belt to set the mode of it.");
                    }
                  }
                }
                if ((createLevelObject >= 2001) && (createLevelObject <= 2016)) {
                  changeGroup(gameInfo, column, row, createLevelObject - 2000);
                }
              }

              if ((createLevelMenu === menuToNumber("groups")) && (createLevelObject >= 2001) && (createLevelObject <= 2032)) {
                changeGroup(gameInfo, column, row, createLevelObject - 2000);
              }

              if (createLevelMenu === menuToNumber("foregroundcolors")) {
                if ((createLevelObject >= 2052) && (createLevelObject <= 2082)) {
                  saveUndo("Change foreground color", "fgcolors", { colors: gameVars.fgcolor });
                  changeColor(gameVars.fgcolor, column, row, createLevelObject - 2052);
                }
                if (createLevelObject === 2083) {
                  saveUndo("Delete foreground color", "fgcolors", { colors: gameVars.fgcolor });
                  deleteColorAtPosition(gameVars.fgcolor, column, row);
                }
              }

              if (createLevelMenu === menuToNumber("backgroundcolors")) {
                if ((createLevelObject >= 2052) && (createLevelObject <= 2082)) {
                  saveUndo("Change background color", "bgcolors", { colors: gameVars.bgcolor });
                  changeColor(gameVars.bgcolor, column, row, createLevelObject - 2052);
                }
                if (createLevelObject === 2083) {
                  saveUndo("Delete background color", "bgcolors", { colors: gameVars.bgcolor });
                  deleteColorAtPosition(gameVars.bgcolor, column, row);
                }
              }
            } else if (createLevelObject > 0) {
              deleteIfPurpleTeleport(backData, gameInfo, column, row);
              addObject(backData, gameData, gameInfo, column, row, createLevelObject);
            } else if (createLevelObject === -3) {
              // DELETE
              if (gameData[row][column] > 0) {
                removeObject(gameData, gameInfo, column, row);
              } else {
                deleteIfPurpleTeleport(backData, gameInfo, column, row);
                if ([20, 23, 25, 90].includes(backData[row][column])) {
                  backData[row][column] = 0;
                }
              }
            }
          }
        }
        updateGameCanvas();
        updateGreen();
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
          case 171:
            idx = findElementByCoordinate(column, row, gameInfo.conveyorBelts);
            if (idx >= 0) {
              obj = gameInfo.conveyorBelts[idx];
              info = `Object: Conveyor belt, Direction: ${obj.direction}, Mode: ${obj.mode}, Group: ${obj.group}, Position: ${obj.x}, ${obj.y}`;
            }
            break;
          case 178:
            idx = findElementByCoordinate(column, row, gameInfo.movers);
            if (idx >= 0) {
              obj = gameInfo.movers[idx];
              info = `Object: Mover, Direction: ${obj.direction}, Position: ${obj.x}, ${obj.y}`;
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

  async function handleCreateLevelCanvasClick(e) {
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

    let confirm = null;
    let direction = "";

    if (column >= 0 && column < columns && row >= 0 && row < rows) {
      if (!e.altKey && !e.shiftKey && !e.ctrlKey) {
        if (row === 0) {
          fillMenu(column + 1);
          updateCreateLevelCanvas();
        }
        createLevelObject = gameDataMenu[row][column];

        if (createLevelMenu === menuToNumber("delete")) {
          switch (createLevelObject) {
            case 2050:
              confirm = await showConfirm("Question", "Delete all foreground color settings?");
              if (confirm === "YES") {
                saveUndo("Delete all foreground color settings", "fgcolors", { colors: gameVars.fgcolor });
                gameVars.fgcolor.length = 0;
                gameVars.fgcolor = [];
                updateGameCanvas();
              }
              break;
            case 2051:
              confirm = await showConfirm("Question", "Delete all background color settings?");
              if (confirm === "YES") {
                saveUndo("Delete all background color settings", "bgcolors", { colors: gameVars.bgcolor });
                gameVars.bgcolor.length = 0;
                gameVars.bgcolor = [];
                updateGameCanvas();
              }
              break;
            default:
              break;
          }
        }

        if ((createLevelMenu === menuToNumber("select")) && (createLevelSelectedCell !== null)) {
          direction = "";
          switch (createLevelObject) {
            case 2040:
              direction = "left";
              break;
            case 2041:
              direction = "right";
              break;
            case 2042:
              direction = "up";
              break;
            case 2043:
              direction = "down";
              break;
            default:
              break;
          }
          if (direction !== "") {
            moveSelectedObject(createLevelSelectedCell, direction, null, true);
          }
        }

        switch (createLevelObject) {
          case 0:
            createLevelObject = backDataMenu[row][column];
            break;
          case 2038:
            if (row === 0) {
              // Select
              createLevelObject = -2;
            }
            break;
          case 2083:
            if (row === 0) {
              // Delete
              createLevelObject = -3;
            }
            break;
          default:
            break;
        }
      }
    }
  }

  function moveSelectedObject(cell, mode, position, addUndo) {
    let xNew = -1;
    let yNew = -1;

    if (cell !== null) {
      xNew = cell.x;
      yNew = cell.y;
      switch (mode) {
        case "left":
          xNew--;
          break;
        case "right":
          xNew++;
          break;
        case "up":
          yNew--;
          break;
        case "down":
          yNew++;
          break;
        case "position":
          if (position !== null) {
            xNew = position.x;
            yNew = position.y;
          }
          break;
        default:
          break;
      }
      if (xNew >= 0 && xNew < gameData[0].length && yNew >= 0 && yNew < gameData.length) {
        if ((gameData[yNew][xNew] === 0) && (backData[yNew][xNew] === 0)) {
          if (addUndo) {
            saveUndo("Move object", "move", { x1: xNew, y1: yNew, x2: cell.x, y2: cell.y });
          }
          gameData[yNew][xNew] = gameData[cell.y][cell.x];
          backData[yNew][xNew] = backData[cell.y][cell.x];
          gameData[cell.y][cell.x] = 0;
          backData[cell.y][cell.x] = 0;
          moveColor(gameVars.bgcolor, cell.x, cell.y, xNew, yNew);
          moveColor(gameVars.fgcolor, cell.x, cell.y, xNew, yNew);
          moveObjects(gameInfo, "moveCell", cell.x, cell.y, xNew, yNew);
          cell.x = xNew;
          cell.y = yNew;
          updateGameCanvas();
        }
      }
      createLevelObject = 0;
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
                <div ref={levelSetting} onClick={() => { clickLevelSetting() }}>
                  <label>Level setting</label>
                </div>
                <div ref={undo} onClick={() => { clickUndo() }}>
                  <label>Undo</label>
                </div>
                <div ref={redo} onClick={() => { clickRedo() }}>
                  <label>Redo</label>
                </div>

                <div ref={loadLevel} onClick={() => { clickLoadLevel() }}>
                  <label>Load level</label>
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

    </div>
  );
}

export default BalPage;
