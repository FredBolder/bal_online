import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// https://www.npmjs.com/package/react-confirm-alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MessageBox from './MessageBox';
import { loadFromMemory, saveToMemory } from '../memory.js'
import {
  stringArrayToNumberArray,
  checkElevatorInOuts,
  checkFalling,
  moveLeft,
  moveRight,
  jump,
  jumpLeft,
  jumpRight,
  getGameInfo,
  checkRedBalls,
  moveElevators,
  moveHorizontalElevators,
  moveRedBalls,
  moveYellowBalls,
  pushDown,
  moveDownLeft,
  moveDownRight,
  checkDetonator,
  rotateGame,
  moveFish,
  electricityTarget,
  inWater,
  checkTrapDoors,
  CheckDamagedStones,
  checkCopiers,
  findElementByCoordinate,
  initGameInfo,
  initGameVars,
} from "../balUtils.js";
import { checkForces } from "../force";
import { moveOrangeBalls } from "../orangeBalls";

import { booleanToString, stringToBoolean, tryParseInt } from "../utils.js";
import { clearBitMapLava, drawLevel } from "../drawLevel.js";
import { codeToNumber, numberToCode } from "../codes.js";
import { getLevel, getRandomLevel } from "../levels.js";
//import sndCatapult from "../Sounds/catapult.wav";
import sndBreaking1 from "../Sounds/breaking1.wav";
import sndBreaking2 from "../Sounds/breaking2.wav";
import sndEat1 from "../Sounds/eat1.wav";
import sndEat2 from "../Sounds/eat2.wav";
import sndEat3 from "../Sounds/eat3.wav";
import sndEat4 from "../Sounds/eat4.wav";
import sndElectricity from "../Sounds/electricity.wav";
import sndExplosion from "../Sounds/explosion.wav";
//import sndKey from "../Sounds/key.wav";
import sndLaserGun from "../Sounds/laser_gun.wav";
import sndPain from "../Sounds/pain.wav";
import sndPickaxe from "../Sounds/pickaxe.wav";
import sndSplash1 from "../Sounds/splash1.wav";
import sndSplash2 from "../Sounds/splash2.wav";
import sndTake from "../Sounds/take.wav";
import sndTeleport from "../Sounds/teleport.wav";
import sndTrapDoor from "../Sounds/trap_door.wav";
//import sndUnlock from "../Sounds/unlock.wav";
import imgBlueHappy from "../Images/blue_ball_happy.svg";
import imgBlueSad from "../Images/blue_ball_sad.svg";
import imgBlueDiving from "../Images/blue_ball_with_diving_glasses.svg";
import imgLightBlue from "../Images/light_blue_ball.svg";
import imgRed from "../Images/red_ball.svg";
import imgGray from "../Images/gray_ball.svg";
import imgGreen from "../Images/green_ball.svg";
import imgOrange from "../Images/orange_ball.svg";
import imgPurple from "../Images/purple_ball.svg";
import imgWhite from "../Images/white_ball.svg";
import imgYellow from "../Images/yellow_ball.svg";
import arrowJumpLeft from "../Images/arrow_topLeft.svg";
import arrowJumpRight from "../Images/arrow_topRight.svg";
import arrowDown from "../Images/arrow_down.svg";
import arrowUp from "../Images/arrow_up.svg";
import arrowLeft from "../Images/arrow_left.svg";
import arrowRight from "../Images/arrow_right.svg";

let kPressed = false;
let ctx;
let fred = false; // TODO: Set to false when publishing
let gameInterval;
let initialized = false;

let settings = {
  sound: true,
  nicerGraphics: true,
  lessQuestions: false,
  arrowButtons: true,
};

let gameData = [];
let backData = [];
let gameInfo = {};
initGameInfo(gameInfo);
let gameVars = {};
initGameVars(gameVars);

function BalPage() {
  const canvas = useRef(null);
  const cbArrowButtons = useRef(null);
  const cbGraphics = useRef(null);
  const cbQuestions = useRef(null);
  const cbSound = useRef(null);
  const elementDiving = useRef(null);
  const elementGray = useRef(null);
  const elementGreen = useRef(null);
  const elementHappy = useRef(null);
  const elementLightBlue = useRef(null);
  const elementMoveButtons = useRef(null);
  const elementOrange = useRef(null);
  const elementPurple = useRef(null);
  const elementRed = useRef(null);
  const elementSad = useRef(null);
  const elementWhite = useRef(null);
  const elementYellow = useRef(null);
  const elementHelp = useRef(null);
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

  function loadSettings() {
    const arrowButtons = localStorage.getItem("arrowButtons")
    if (arrowButtons !== null) {
      settings.arrowButtons = stringToBoolean(arrowButtons);
    }
    const lessQuestions = localStorage.getItem("lessQuestions")
    if (lessQuestions !== null) {
      settings.lessQuestions = stringToBoolean(lessQuestions);
    }
    const nicerGraphics = localStorage.getItem("nicerGraphics")
    if (nicerGraphics !== null) {
      settings.nicerGraphics = stringToBoolean(nicerGraphics);
    }
    const sound = localStorage.getItem("sound")
    if (sound !== null) {
      settings.sound = stringToBoolean(sound);
    }
  }

  function saveSettings() {
    localStorage.setItem("arrowButtons", booleanToString(settings.arrowButtons));
    localStorage.setItem("lessQuestions", booleanToString(settings.lessQuestions));
    localStorage.setItem("nicerGraphics", booleanToString(settings.nicerGraphics));
    localStorage.setItem("sound", booleanToString(settings.sound));
  }

  function playSound(sound) {
    let snd = null;
    let n = 0;

    if (settings.sound) {
      switch (sound) {
        case "breaking1":
          snd = sndBreaking1;
          break;
        case "breaking2":
          snd = sndBreaking2;
          break;
        case "eat":
          n = Math.trunc(Math.random() * 4) + 1;
          switch (n) {
            case 1:
              snd = sndEat1;
              break;
            case 2:
              snd = sndEat2;
              break;
            case 3:
              snd = sndEat3;
              break;
            case 4:
              snd = sndEat4;
              break;
            default:
              break;
          }
          break;
        case "electricity":
          snd = sndElectricity;
          break;
        case "explosion":
          snd = sndExplosion;
          break;
        case "laser":
          snd = sndLaserGun;
          break;
        case "pain":
          snd = sndPain;
          break;
        case "pickaxe":
          snd = sndPickaxe;
          break;
        case "splash1":
          snd = sndSplash1;
          break;
        case "splash2":
          snd = sndSplash2;
          break;
        case "take":
          snd = sndTake;
          break;
        case "teleport":
          snd = sndTeleport;
          break;
        case "trap":
          snd = sndTrapDoor;
          break;
        default:
          break;
      }
      if (snd !== sound) {
        try {
          const audio = new Audio(snd);
          audio.play();
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  function checkGameOver() {
    let target = -1;

    if (
      !gameVars.gameOver &&
      gameInfo.electricity.length > 0 &&
      gameInfo.electricityActive
    ) {
      for (let i = 0; i < gameInfo.electricity.length; i++) {
        const elec = gameInfo.electricity[i];
        target = electricityTarget(backData, gameData, elec.x, elec.y);
        if (target > 0) {
          if (gameData[target][elec.x] === 2) {
            gameVars.gameOver = true;
          }
          if (
            backData[target][elec.x] === 20 ||
            backData[target][elec.x] === 23
          ) {
            if (inWater(gameInfo.blueBall.x, gameInfo.blueBall.y, backData)) {
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
    if (!gameVars.gameOver) {
      let redInfo = checkRedBalls(gameData, gameInfo.redBalls);
      if (redInfo.length > 0) {
        gameVars.laser = redInfo;
        gameVars.gameOver = true;
        playSound("laser");
      } else {
        gameVars.laser = null;
      }
    }
    if (!gameVars.gameOver && gameInfo.hasWater && !gameInfo.hasDivingGlasses) {
      if (backData[gameInfo.blueBall.y][gameInfo.blueBall.x] === 20 || backData[gameInfo.blueBall.y][gameInfo.blueBall.x] === 23) {
        gameVars.gameOver = true;
      }
    }
    if (!gameVars.gameOver && gameInfo.redFish.length > 0) {
      for (let i = 0; i < gameInfo.redFish.length && !gameVars.gameOver; i++) {
        const fish = gameInfo.redFish[i];
        if (
          !fish.isDead &&
          Math.abs(gameInfo.blueBall.x - fish.x) < 2 &&
          Math.abs(gameInfo.blueBall.y - fish.y) < 2
        ) {
          gameVars.gameOver = true;
        }
      }
    }
    if (gameVars.gameOver) {
      updateScreen();
    }
  }

  function gameScheduler() {
    let info = {};
    let update = false;

    if (!gameVars.gameOver && gameData && backData) {
      info = checkTrapDoors(gameData, gameInfo);
      if (info.sound) {
        playSound("trap");
      }
      if (info.updated) {
        update = true;
      }
      info = CheckDamagedStones(gameData, gameInfo);
      if (info.sound === 1) {
        playSound("breaking1");
      }
      if (info.sound === 2) {
        playSound("breaking2");
      }
      if (info.updated) {
        update = true;
      }

      info = checkForces(gameData, gameInfo);
      if (info.playerX !== -1) {
        gameInfo.blueBall.x = info.playerX;
        gameInfo.blueBall.y = info.playerY;
      }
      if (info.update) {
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

      if (gameInfo.redFish.length > 0) {
        gameVars.fishCounter++;
        if (gameVars.fishCounter >= gameVars.fishCountTo) {
          gameVars.fishCounter = 0;
          moveFish(backData, gameData, gameInfo, gameInfo.blueBall.x, gameInfo.blueBall.y);
          update = true;
        }
      }

      if (gameInfo.hasWater) {
        gameVars.wave1++;
        if (gameVars.wave1 > 5) {
          gameVars.wave1 = 1;
          gameVars.wave2++;
          if (gameVars.wave2 > 3) {
            gameVars.wave2 = 1;
          }
          update = true;
        }
      }

      if (gameVars.elevatorCounter > 0) {
        gameVars.elevatorCounter--;
      } else {
        gameVars.elevatorCounter = 5;
        info = moveElevators(gameData, gameInfo.elevators, gameInfo.redBalls, gameInfo.orangeBalls);
        if (info.playerX !== -1 && info.playerY !== -1) {
          gameInfo.blueBall.x = info.playerX;
          gameInfo.blueBall.y = info.playerY;
        }
        if (gameInfo.elevators.length > 0) {
          update = true;
        }

        info = moveHorizontalElevators(
          gameData,
          gameInfo.horizontalElevators,
          gameInfo.redBalls,
          gameInfo.orangeBalls
        );
        if (info.playerX !== -1 && info.playerY !== -1) {
          gameInfo.blueBall.x = info.playerX;
          gameInfo.blueBall.y = info.playerY;
        }
        if (gameInfo.horizontalElevators.length > 0) {
          update = true;
        }
      }

      info = checkElevatorInOuts(gameData, gameInfo);
      if (info.playerX !== -1) {
        gameInfo.blueBall.x = info.playerX;
        gameInfo.blueBall.y = info.playerY;
      }
      if (info.update) {
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

      if (gameVars.yellowCounter > 0) {
        gameVars.yellowCounter--;
      } else {
        gameVars.yellowCounter = 1;
        if (moveYellowBalls(gameData, gameInfo.yellowBalls)) {
          update = true;
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
        info = checkDetonator(
          gameData,
          gameInfo.detonator.x,
          gameInfo.detonator.y
        );
        if (info.explosion) {
          playSound("explosion");
        }
        if (info.updated) {
          update = true;
        }
      }

      if (gameInfo.teleports.length > 0) {
        let teleport = -1;
        switch (gameVars.teleporting) {
          case 1:
            playSound("teleport");
            gameVars.teleporting = 2;
            break;
          case 2:
            teleport = findElementByCoordinate(gameInfo.blueBall.x, gameInfo.blueBall.y, gameInfo.teleports);
            if (teleport >= 0) {
              if (gameInfo.teleports[teleport].selfDestructing) {
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
              } else {
                gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 31;
              }
              for (let i = 0; i < gameInfo.teleports.length; i++) {
                if ((i !== teleport) && (gameInfo.teleports[i].selfDestructing === gameInfo.teleports[teleport].selfDestructing)) {
                  gameInfo.blueBall.x = gameInfo.teleports[i].x;
                  gameInfo.blueBall.y = gameInfo.teleports[i].y;
                }
              }
              if (gameInfo.teleports[teleport].selfDestructing) {
                // Delete all self-destructing teleports
                gameInfo.teleports = gameInfo.teleports.filter((teleport) => teleport.selfDestructing === false);
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

      if (gameInfo.electricity.length > 0) {
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

      if (gameVars.skipFalling <= 0) {
        info = checkFalling(backData, gameData, gameInfo);
        if (info.ballX !== -1) {
          gameInfo.blueBall.x = info.ballX;
          gameInfo.blueBall.y = info.ballY;
        }
        if (info.update) {
          update = true;
        }
        if (info.sound === 1) {
          playSound("splash1");
        }
        if (info.sound === 2) {
          gameVars.gameOver = true;
          updateScreen();
          playSound("pain");
        }
      } else {
        gameVars.skipFalling--;
      }


      if (update) {
        updateScreen();
        checkGameOver();
      }
    }
  }

  function closeHelp() {
    elementHelp.current.style.display = "none";
  }

  function help() {
    elementHelp.current.style.display = "block";
  }

  async function initLevel(n) {
    let color = "";
    let data = [];
    let gd;
    let h = -1;
    let p1 = -1;
    let w = -1;
    let x = -1;
    let y = -1;

    try {
      gameVars.currentLevel = n;
      setLevelNumber(n);
      gameInfo.blueBall.x = -1;
      gameInfo.blueBall.y = -1;
      data = await getLevel(gameVars.currentLevel);

      // Colors
      gameVars.bgcolor = null;
      gameVars.bgcolor = [];
      gameVars.fgcolor = null;
      gameVars.fgcolor = [];
      for (let i = 0; i < data.levelSettings.length; i++) {
        const setting = data.levelSettings[i];
        p1 = setting.indexOf(":");
        if (p1 >= 0) {
          const name = setting.slice(0, p1).toLowerCase().trim();
          const values = setting.slice(p1 + 1).split(",").map(value => value.trim());
          switch (name) {
            case "$bgcolor":
            case "$fgcolor":
              if (values.length === 5) {
                x = tryParseInt(values[0], -1);
                y = tryParseInt(values[1], -1);
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
            default:
              break;
          }
        }
      }

      gd = stringArrayToNumberArray(data.levelData);
      backData = gd.backData;
      gameData = gd.gameData;
      gameVars.laser = null;
      gameVars.gameOver = false;
      updateScreen();
      gameInfo = getGameInfo(backData, gameData);
      updateScreen();
      setGreen(gameInfo.greenBalls);
    } catch (err) {
      console.log(err);
    }
  }

  function clickCode() {
    let code = prompt("Enter the code");
    if (code !== null) {
      const level = codeToNumber(code);
      if (level > 0) {
        initLevel(level);
      }
    }
  }

  function clickSeries1() {
    if (settings.lessQuestions) {
      initLevel(200);
    } else {
      confirmAlert({
        title: "Question",
        message: "Load the first level of series 1?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(200);
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

  function clickSeries2() {
    if (settings.lessQuestions) {
      initLevel(700);
    } else {
      confirmAlert({
        title: "Question",
        message: "Load the first level of series 2?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(700);
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

  function clickSeriesSmall() {
    if (settings.lessQuestions) {
      initLevel(750);
    } else {
      confirmAlert({
        title: "Question",
        message: "Load the first level of series Small?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(750);
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

  function clickSeriesExtreme() {
    if (settings.lessQuestions) {
      initLevel(901);
    } else {
      confirmAlert({
        title: "Question",
        message: "Load the first level of series Extreme?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(901);
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
    if (settings.lessQuestions) {
      saveToMemory(gameData, backData, gameInfo, gameVars);
    } else {
      confirmAlert({
        title: "Question",
        message: "Save level to memory?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              saveToMemory(gameData, backData, gameInfo, gameVars);
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

  function clickLoadFromMemory() {
    function load() {
      const data = loadFromMemory();
      if (data === null) {
        alert("No level in memory!");
      } else {
        gameData = null;
        gameData = data.gameData;
        backData = null;
        backData = data.backData;
        gameInfo = null;
        gameInfo = data.gameInfo;
        gameVars = null;
        gameVars = data.gameVars;
        setLevelNumber(gameVars.currentLevel);
        setGreen(gameInfo.greenBalls);
      }
    }

    if (settings.lessQuestions) {
      load();
    } else {
      confirmAlert({
        title: "Question",
        message: "Load level from memory?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              load();
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

  function handleChangeSettings() {
    settings.arrowButtons = cbArrowButtons.current.checked;
    settings.lessQuestions = cbQuestions.current.checked;
    settings.nicerGraphics = cbGraphics.current.checked;
    settings.sound = cbSound.current.checked;
    saveSettings();
    updateMoveButtons();
    updateScreen();
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

  function handleKeyDown(e) {
    let info = {};
    info.player = false;
    info.breaking = false;
    info.divingGlasses = false;
    info.eating = false;
    info.takingKey = false;
    info.takingLadder = false;
    info.takingLightBulb = false;
    info.takingPickaxe = false;
    info.rotate = false;
    let rotate = false;

    // Ignore 
    if (["Alt", "Ctrl", "Shift"].includes(e.key)) {
      return;
    }

    if (gameVars.gameOver || gameVars.teleporting > 0) {
      return false;
    }
    if (gameInfo.blueBall.x === -1 || gameInfo.blueBall.y === -1 || gameData.length === 0) {
      return false;
    }
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
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
          if (info.player) {
            gameInfo.blueBall.x--;
            gameInfo.blueBall.y--;
          }
          break;
        case "ArrowRight":
          info = jumpRight(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.x++;
            gameInfo.blueBall.y--;
          }
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
          if (info.player) {
            gameInfo.blueBall.x--;
            if (info.moveOneMore) {
              gameInfo.blueBall.x--;
            }
            if (info.rotate) {
              gameInfo.blueBall.x--;
              rotate = rotateGame(backData, gameData, gameInfo);
            }
          }
          if (info.teleporting) {
            gameVars.teleporting = 1;
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case "6":
          info = moveRight(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.x++;
            if (info.moveOneMore) {
              gameInfo.blueBall.x++;
            }
            if (info.rotate) {
              gameInfo.blueBall.x++;
              // eslint-disable-next-line no-unused-vars
              rotate = rotateGame(backData, gameData, gameInfo);
            }
          }
          if (info.teleporting) {
            gameVars.teleporting = 1;
          }
          break;
        case "ArrowUp":
        case "w":
        case "W":
        case "8":
          info = jump(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.y--;
            if (info.moveOneMore) {
              gameInfo.blueBall.y--;
            }
            gameVars.elevatorCounter++; // To prevent that you fall from the elevator
          }
          break;
        case "q":
        case "Q":
        case "7":
          info = jumpLeft(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.x--;
            gameInfo.blueBall.y--;
          }
          break;
        case "e":
        case "E":
        case "9":
          info = jumpRight(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.x++;
            gameInfo.blueBall.y--;
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
        case "2":
          info = pushDown(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.y++;
            if (info.moveOneMore) {
              gameInfo.blueBall.y++;
            }
          }
          break;
        case "y":
        case "Y":
        case "1":
          info = moveDownLeft(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.y++;
            gameInfo.blueBall.x--;
          }
          break;
        case "c":
        case "C":
        case "3":
          info = moveDownRight(backData, gameData, gameInfo);
          if (info.player) {
            gameInfo.blueBall.y++;
            gameInfo.blueBall.x++;
          }
          break;
        default:
          break;
      }
    }
    if (info.player) {
      gameVars.skipFalling = 1;
      updateScreen();
      checkGameOver();
    }
    if (!Object.prototype.hasOwnProperty.call(info, "eating")) {
      info.eating = false;
    }
    if (!Object.prototype.hasOwnProperty.call(info, "divingGlasses")) {
      info.divingGlasses = false;
    }
    if (info.eating) {
      gameInfo.greenBalls--;
      setGreen(gameInfo.greenBalls);
      playSound("eat");
      checkGameOver();
      if (!gameVars.gameOver && gameInfo.greenBalls <= 0) {
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
    if (info.divingGlasses) {
      gameInfo.hasDivingGlasses = true;
      playSound("take");
    }
    if (info.takingKey) {
      gameInfo.hasKey = true;
      playSound("take");
    }
    if (info.takingLadder) {
      gameInfo.hasLadder = true;
      playSound("take");
    }
    if (info.takingLightBulb) {
      playSound("take");
    }
    if (info.takingPickaxe) {
      gameInfo.hasPickaxe = true;
      playSound("take");
    }
    if (info.takingWeakStone) {
      gameInfo.hasWeakStone = true;
      playSound("take");
    }
    if (info.breaking) {
      playSound("pickaxe");
    }

    if (!e.altKey && !e.ctrlKey) {
      if (kPressed) {
        if (!e.shiftKey) {
          switch (e.key) {
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
            case "L":
              // Move a 3-step stairs to the left
              pressKeysSequentially("qqaddedaqaeda");
              break;
            case "N":
              // Next level
              initLevel(gameVars.currentLevel + 1);
              break;
            case "P":
              // Previous level
              initLevel(gameVars.currentLevel - 1);
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
  }

  function handleResize() {
    updateScreen();
  }

  function tryAgain() {
    if (settings.lessQuestions) {
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
    if (!canvas.current) return;
    if (!initialized) {
      initialized = true;
      loadSettings();
      cbArrowButtons.current.checked = settings.arrowButtons;
      cbQuestions.current.checked = settings.lessQuestions;
      cbGraphics.current.checked = settings.nicerGraphics;
      cbSound.current.checked = settings.sound;
      updateMoveButtons();
      gameVars.currentLevel = 200;
      loadProgress();
      if (fred) {
        gameVars.currentLevel = 739;
      }
      initLevel(gameVars.currentLevel);
    }

    updateScreen();
    setLevelNumber(gameVars.currentLevel);
    setGreen(gameInfo.greenBalls);

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

  function updateMoveButtons() {
    elementMoveButtons.current.style.display = settings.arrowButtons ? "block" : "none";
  }

  function updateScreen() {
    if (!canvas.current) return;

    const displayWidth = canvas.current.clientWidth;
    const displayHeight = canvas.current.clientHeight;
    if (
      canvas.current.width !== displayWidth ||
      canvas.current.height !== displayHeight
    ) {
      canvas.current.width = displayWidth;
      canvas.current.height = displayHeight;
    }

    ctx = canvas.current.getContext("2d");
    //console.log("gameData: ", gameData);
    const elements = {
      elementDiving: elementDiving.current,
      elementGray: elementGray.current,
      elementGreen: elementGreen.current,
      elementHappy: elementHappy.current,
      elementLightBlue: elementLightBlue.current,
      elementOrange: elementOrange.current,
      elementPurple: elementPurple.current,
      elementRed: elementRed.current,
      elementSad: elementSad.current,
      elementWhite: elementWhite.current,
      elementYellow: elementYellow.current,
    };
    const status = {
      gameOver: gameVars.gameOver,
      laser: gameVars.laser,
    };
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawLevel(
      canvas.current,
      ctx,
      backData,
      gameData,
      settings.nicerGraphics,
      elements,
      status,
      gameInfo,
      gameVars
    );
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

  function buttonJump() {
    handleKeyDown({ key: "8", shiftKey: false });
  }

  function buttonDown() {
    handleKeyDown({ key: "2", shiftKey: false });
  }

  function putBallPosition(e) {
    if (!gameData || gameData.length < 1) {
      return false;
    }

    const rows = gameData.length;
    const columns = gameData[0].length;

    let size1 = canvas.current.width / columns;
    let size2 = canvas.current.height / rows;

    if (size2 < size1) {
      size1 = size2;
    }
    size1 = Math.trunc(size1);
    let gameWidth = columns * size1;
    let gameHeight = rows * size1;
    let leftMargin = Math.trunc((canvas.current.width - gameWidth) / 2);
    let topMargin = Math.trunc(canvas.current.height - gameHeight);

    let rect = canvas.current.getBoundingClientRect();
    let x = e.clientX - rect.left - leftMargin;
    let y = e.clientY - rect.top - topMargin;

    let squareX = Math.floor(x / size1);
    let squareY = Math.floor(y / size1);

    if (squareX >= 0 && squareX < columns && squareY >= 0 && squareY < rows) {
      if (!e.altKey && e.shiftKey && e.ctrlKey) {
        if (gameData[squareY][squareX] === 24) {
          alert("No, this is not The Net! The π indicates that this level is made by Panagiotis.");
        }
      }
      if (fred && e.altKey && e.shiftKey && e.ctrlKey) {
        if (gameData[squareY][squareX] === 0) {
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 0;
          gameInfo.blueBall.x = squareX;
          gameInfo.blueBall.y = squareY;
          gameData[gameInfo.blueBall.y][gameInfo.blueBall.x] = 2;
          updateScreen();
        }
      }
    }
  }

  return (
    <div>
      <div className="page">
        <header>
          <Navbar />
        </header>
        <main>
          <div className="balPanel">
            <div className="menu">
              <button className="balButton">Level: {levelNumber}</button>
              <div className="menu-content">
                <div onClick={clickSeries1}>
                  <label>Series 1</label>
                </div>
                <div onClick={clickSeries2}>
                  <label>Series 2</label>
                </div>
                <div onClick={clickSeriesSmall}>
                  <label>Series Small</label>
                </div>
                <div onClick={clickSeriesExtreme}>
                  <label>Extreme</label>
                </div>
                <div onClick={randomLevel}>
                  <label>Random level</label>
                </div>
                <div onClick={clickSaveToMemory}>
                  <label>Save to memory</label>
                </div>
                <div onClick={clickLoadFromMemory}>
                  <label>Load from memory</label>
                </div>
              </div>
            </div>
            <button className="balButton" onClick={tryAgain}>
              Try again
            </button>
            <button className="balButton" onClick={clickCode}>
              Code
            </button>
            <div className="balPanelText">
              Green: <span className="balPanelTextSpan">{green}</span>
            </div>

            <button
              className="balButton"
              onClick={() => {
                help();
              }}
            >
              ?
            </button>

            <div className="menu">
              <button className="balButton">Settings</button>
              <div className="menu-content">
                <div>
                  <input
                    type="checkbox"
                    id="sound"
                    ref={cbSound}
                    name="sound"
                    value="sound"
                    onChange={handleChangeSettings}
                  />
                  <label htmlFor="sound">Sound</label>
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
              ref={canvas}
              onClick={putBallPosition}
            />
            <div className="moveButtons">
              <div ref={elementMoveButtons}>
                <button className="moveButton" onClick={buttonJumpLeft}>
                  <img src={arrowJumpLeft} alt="ArrowJumpLeft" />
                </button>
                <button className="moveButton" onClick={buttonMoveLeft}>
                  <img src={arrowLeft} alt="ArrowLeft" />
                </button>
                <button className="moveButton" onClick={buttonJump}>
                  <img src={arrowUp} alt="ArrowUp" />
                </button>
                <button className="moveButton" onClick={buttonDown}>
                  <img src={arrowDown} alt="ArrowDown" />
                </button>
                <button className="moveButton" onClick={buttonMoveRight}>
                  <img src={arrowRight} alt="ArrowRight" />
                </button>
                <button className="moveButton" onClick={buttonJumpRight}>
                  <img src={arrowJumpRight} alt="ArrowJumpRight" />
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
            <img ref={elementWhite} src={imgWhite} />
          </div>
          <div style={{ display: "none" }}>
            <img ref={elementYellow} src={imgYellow} />
          </div>
        </main>
        <Footer />
      </div>
      <div className="help" ref={elementHelp}>
        <div className="help-content">
          <div className="help-header">
            <span className="help-close" onClick={closeHelp}>
              &times;
            </span>
            <h2>Help</h2>
          </div>
          <div className="help-main">
            <p>
              In every level you control the blue ball with the happy face. You
              have to eat all the little green balls. You can push the white
              balls and the light blue balls, but not more than 2 at the same
              time. The light blue balls are floating balls and they will always
              stay at the same height. Red balls and red fish are very
              dangerous. If you push a yellow ball, it will continue as far as
              possible. You cannot push more yellow balls at the same time or
              push a yellow ball together with another ball. You can push a
              yellow ball in the directions left, right, up and down. A purple
              ball is almost the same as a yellow ball, but when you push a
              purple ball, it will go only one position further. You cannot push
              a ball through a one direction, a teleport, a game rotator or a
              door with a lock. You can control the blue ball with the letter
              keys, the arrow keys, the number keys or the arrow buttons. In the
              water you can swim in every direction.
            </p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Letter key</th>
                  <th scope="col">Arrow key</th>
                  <th scope="col">Number key</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Walk left / Swim left</td>
                  <td>A</td>
                  <td>Arrow left</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Walk right / Swim right</td>
                  <td>D</td>
                  <td>Arrow right</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>Jump / Push up / Swim up</td>
                  <td>W</td>
                  <td>Arrow up</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>Jump left / Swim up left</td>
                  <td>Q</td>
                  <td>Shift + Arrow left</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>Jump right / Swim up right</td>
                  <td>E</td>
                  <td>Shift + Arrow right</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td>Push down / Swim down</td>
                  <td>S</td>
                  <td>Arrow down</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Swim down left</td>
                  <td>Y</td>
                  <td>-</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Swim down right</td>
                  <td>C</td>
                  <td>-</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
            <p>
              If you see for example a
              level number 750, it doesn&apos;t mean that there are 750 or even more
              levels. The number depends also on the series and on the&nbsp;
              <a
                className="link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://fredbolder.github.io/bal/"
              >
                original Bal game
              </a>
              .
              When you solve a level, you will get a code that gives you access
              to the next level whenever you want by pressing the Code button, so
              it is important to write down the code.
              Some levels are very difficult. If you can&apos;t solve a certain
              level, you can start with another series or load a random level.
            </p>
            <p>
              Download the <a className="link" target="_blank" rel="noopener noreferrer" href="./bal_online_manual.pdf">manual</a> for more information.
            </p>
          </div>
        </div>
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
