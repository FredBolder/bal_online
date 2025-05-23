import { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// https://www.npmjs.com/package/react-confirm-alert
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import MessageBox from './MessageBox';
import {
  stringArrayToNumberArray,
  checkFalling,
  moveLeft,
  moveRight,
  jump,
  jumpLeft,
  jumpRight,
  getGameInfo,
  checkRed,
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
  checkCopiers,
  findElementByCoordinate,
} from "../balUtils.js";

import { booleanToString, stringToBoolean, tryParseInt } from "../utils.js";
import { clearBitMapLava, drawLevel } from "../drawLevel.js";
import { codeToNumber, numberToCode } from "../codes.js";
import { getLevel } from "../levels.js";
//import sndCatapult from "../Sounds/catapult.wav";
import sndEat1 from "../Sounds/eat1.wav";
import sndEat2 from "../Sounds/eat2.wav";
import sndEat3 from "../Sounds/eat3.wav";
import sndEat4 from "../Sounds/eat4.wav";
import sndElectricity from "../Sounds/electricity.wav";
import sndExplosion from "../Sounds/explosion.wav";
//import sndFloor1 from "../Sounds/floor1.wav";
//import sndFloor2 from "../Sounds/floor2.wav";
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
import imgGreen from "../Images/green_ball.svg";
import imgPurple from "../Images/purple_ball.svg";
import imgWhite from "../Images/white_ball.svg";
import imgYellow from "../Images/yellow_ball.svg";
import arrowJumpLeft from "../Images/arrow_topLeft.svg";
import arrowJumpRight from "../Images/arrow_topRight.svg";
import arrowDown from "../Images/arrow_down.svg";
import arrowUp from "../Images/arrow_up.svg";
import arrowLeft from "../Images/arrow_left.svg";
import arrowRight from "../Images/arrow_right.svg";

let ctx;
let currentLevel = 200;
let fishCounter = 0;
let fishCountTo = 12;
let elecActiveSaved = false;
let electricityCounter = 0;
let elevatorCounter = 0;
let explosionCounter = 0;
let backData = [];
let gameData = [];
let gameInfo = {};
gameInfo.elevators = [];
gameInfo.horizontalElevators = [];
gameInfo.greenBalls = 0;
gameInfo.redBalls = [];
gameInfo.yellowBalls = [];
gameInfo.detonator = { x: -1, y: -1 };
gameInfo.teleports = [];
gameInfo.hasMirror = false;
gameInfo.hasWater = false;
gameInfo.hasDivingGlasses = false;
gameInfo.hasKey = false;
gameInfo.hasPickaxe = false;
gameInfo.redFish = [];
gameInfo.electricity = [];
gameInfo.electricityActive = false;
gameInfo.trapDoors = [];
gameInfo.copiers = [];
let gameInterval;
let gameOver = false;
let laser = null;
let posX = -1;
let posY = -1;
let redCounter = 0;
let refreshCounter = 0;
let refreshCountTo = 12;
let settings = {
  sound: true,
  nicerGraphics: true,
  lessQuestions: false,
};
let skipFalling = 0;
let teleporting = 0;
let wave1 = 0;
let wave2 = 0;
let yellowCounter = 0;

function BalPage() {
  const canvas = useRef(null);
  const cbGraphics = useRef(null);
  const cbQuestions = useRef(null);
  const cbSound = useRef(null);
  const elementDiving = useRef(null);
  const elementGreen = useRef(null);
  const elementHappy = useRef(null);
  const elementLightBlue = useRef(null);
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
        currentLevel = level;
      }
    }
  }

  function saveProgress() {
    localStorage.setItem("lastSolvedLevel", currentLevel.toString());
  }

  function loadSettings() {
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
    localStorage.setItem("lessQuestions", booleanToString(settings.lessQuestions));
    localStorage.setItem("nicerGraphics", booleanToString(settings.nicerGraphics));
    localStorage.setItem("sound", booleanToString(settings.sound));
  }

  function playSound(sound) {
    let snd = null;
    let n = 0;

    if (settings.sound) {
      switch (sound) {
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
      !gameOver &&
      gameInfo.electricity.length > 0 &&
      gameInfo.electricityActive
    ) {
      for (let i = 0; i < gameInfo.electricity.length; i++) {
        const elec = gameInfo.electricity[i];
        target = electricityTarget(backData, gameData, elec.x, elec.y);
        if (target > 0) {
          if (gameData[target][elec.x] === 2) {
            gameOver = true;
          }
          if (
            backData[target][elec.x] === 20 ||
            backData[target][elec.x] === 23
          ) {
            if (inWater(posX, posY, backData)) {
              gameOver = true;
            }
            for (let j = 0; j < gameInfo.redFish.length; j++) {
              const fish = gameInfo.redFish[j];
              fish.isDead = true;
            }
          }
        }
      }
    }
    if (!gameOver) {
      let redInfo = checkRed(gameData, posX, posY, gameInfo.redBalls);
      if (redInfo.length > 0) {
        laser = redInfo;
        gameOver = true;
        playSound("laser");
      } else {
        laser = null;
      }
    }
    if (!gameOver && gameInfo.hasWater && !gameInfo.hasDivingGlasses) {
      if (backData[posY][posX] === 20 || backData[posY][posX] === 23) {
        gameOver = true;
      }
    }
    if (!gameOver && gameInfo.redFish.length > 0) {
      for (let i = 0; i < gameInfo.redFish.length && !gameOver; i++) {
        const fish = gameInfo.redFish[i];
        if (
          !fish.isDead &&
          Math.abs(posX - fish.x) < 2 &&
          Math.abs(posY - fish.y) < 2
        ) {
          gameOver = true;
        }
      }
    }
    if (gameOver) {
      updateScreen();
    }
  }

  function gameScheduler() {
    let info = {};
    let update = false;

    if (!gameOver && gameData && backData) {
      info = checkTrapDoors(gameData, gameInfo);
      if (info.sound) {
        playSound("trap");
      }
      if (info.updated) {
        update = true;
      }

      if (skipFalling <= 0) {
        info = checkFalling(backData, gameData, gameInfo);
        if (info.ballX !== -1) {
          posX = info.ballX;
          posY = info.ballY;
        }
        if (info.update) {
          update = true;
        }
        if (info.sound === 1) {
          playSound("splash1");
        }
        if (info.sound === 2) {
          gameOver = true;
          updateScreen();
          playSound("pain");
        }
      } else {
        skipFalling--;
      }

      info = checkCopiers(gameData, gameInfo);
      if (info.updated) {
        update = true;
      }

      refreshCounter++;
      if (refreshCounter >= refreshCountTo) {
        refreshCounter = 0;
        clearBitMapLava();
        update = true;
      }

      if (gameInfo.redFish.length > 0) {
        fishCounter++;
        if (fishCounter >= fishCountTo) {
          fishCounter = 0;
          moveFish(backData, gameData, gameInfo, posX, posY);
          update = true;
        }
      }

      if (gameInfo.hasWater) {
        wave1++;
        if (wave1 > 5) {
          wave1 = 1;
          wave2++;
          if (wave2 > 3) {
            wave2 = 1;
          }
          update = true;
        }
      }

      if (elevatorCounter > 0) {
        elevatorCounter--;
      } else {
        elevatorCounter = 5;
        info = moveElevators(gameData, gameInfo.elevators, gameInfo.redBalls);
        if (info.playerX !== -1 && info.playerY !== -1) {
          posX = info.playerX;
          posY = info.playerY;
        }
        if (gameInfo.elevators.length > 0) {
          update = true;
        }

        info = moveHorizontalElevators(
          gameData,
          gameInfo.horizontalElevators,
          gameInfo.redBalls
        );
        if (info.playerX !== -1 && info.playerY !== -1) {
          posX = info.playerX;
          posY = info.playerY;
        }
        if (gameInfo.horizontalElevators.length > 0) {
          update = true;
        }
      }

      if (redCounter > 0) {
        redCounter--;
      } else {
        redCounter = 2;
        if (moveRedBalls(backData, gameData, posX, posY, gameInfo)) {
          update = true;
        }
      }

      if (yellowCounter > 0) {
        yellowCounter--;
      } else {
        yellowCounter = 1;
        if (moveYellowBalls(gameData, gameInfo.yellowBalls)) {
          update = true;
        }
      }

      if (explosionCounter > 0) {
        explosionCounter--;
      } else {
        explosionCounter = 2;
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
        switch (teleporting) {
          case 1:
            playSound("teleport");
            teleporting = 2;
            break;
          case 2:
            teleport = findElementByCoordinate(posX, posY, gameInfo.teleports);
            if (teleport >= 0) {
              if (gameInfo.teleports[teleport].selfDestructing) {
                gameData[posY][posX] = 0;
              } else {
                gameData[posY][posX] = 31;
              }
              for (let i = 0; i < gameInfo.teleports.length; i++) {
                if ((i !== teleport) && (gameInfo.teleports[i].selfDestructing === gameInfo.teleports[teleport].selfDestructing)) {
                  posX = gameInfo.teleports[i].x;
                  posY = gameInfo.teleports[i].y;
                }
              }
              if (gameInfo.teleports[teleport].selfDestructing) {
                // Delete all self-destructing teleports
                gameInfo.teleports = gameInfo.teleports.filter((teleport) => teleport.selfDestructing === false);
              }
            }
            gameData[posY][posX] = 2;
            update = true;
            teleporting = 0;
            break;
          default:
            break;
        }
      }

      if (gameInfo.electricity.length > 0) {
        if (electricityCounter > 110) {
          electricityCounter = 0;
        }
        gameInfo.electricityActive = false;
        if (
          (electricityCounter > 50 && electricityCounter < 60) ||
          (electricityCounter > 90 && electricityCounter < 100)
        ) {
          gameInfo.electricityActive = true;
        }
        if (!elecActiveSaved && gameInfo.electricityActive) {
          playSound("electricity");
        }
        if (
          gameInfo.electricityActive ||
          elecActiveSaved !== gameInfo.electricityActive
        ) {
          update = true;
        }
        elecActiveSaved = gameInfo.electricityActive;
        electricityCounter++;
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
    let data = [];
    let gd;

    try {
      currentLevel = n;
      setLevelNumber(n);
      posX = -1;
      posY = -1;
      data = await getLevel(currentLevel);
      gd = stringArrayToNumberArray(data);
      backData = gd.backData;
      gameData = gd.gameData;
      laser = null;
      gameOver = false;
      updateScreen();
      gameInfo = getGameInfo(backData, gameData);
      updateScreen();
      posX = gameInfo.blueBall.x;
      posY = gameInfo.blueBall.y;
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

  function handleChangeSettings() {
    settings.sound = cbSound.current.checked;
    settings.nicerGraphics = cbGraphics.current.checked;
    settings.lessQuestions = cbQuestions.current.checked;
    saveSettings();
    updateScreen();
  }

  function handleKeyDown(e) {
    let info = {};
    info.player = false;
    info.breaking = false;
    info.divingGlasses = false;
    info.eating = false;
    info.takingKey = false;
    info.takingPickaxe = false;
    info.rotate = false;
    let rotate = false;

    if (gameOver || teleporting > 0) {
      return false;
    }
    if (posX === -1 || posY === -1 || gameData.length === 0) {
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
        case "N":
          if (e.altKey) {
            initLevel(currentLevel + 1);
          }
          break;
        case "P":
          if (e.altKey) {
            initLevel(currentLevel - 1);
          }
          break;
        case "ArrowLeft":
          info = jumpLeft(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX--;
            posY--;
          }
          break;
        case "ArrowRight":
          info = jumpRight(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX++;
            posY--;
          }
          break;
        default:
          break;
      }
    } else {
      switch (e.key) {
        case "p":
        case "P":
          initLevel(991);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
        case "4":
          info = moveLeft(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX--;
            if (info.moveOneMore) {
              posX--;
            }
            if (info.rotate) {
              posX--;
              gameInfo.blueBall.x = posX;
              gameInfo.blueBall.y = posY;
              rotate = rotateGame(backData, gameData, gameInfo);
              posX = gameInfo.blueBall.x;
              posY = gameInfo.blueBall.y;
            }
          }
          if (info.teleporting) {
            teleporting = 1;
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case "6":
          info = moveRight(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX++;
            if (info.moveOneMore) {
              posX++;
            }
            if (info.rotate) {
              posX++;
              gameInfo.blueBall.x = posX;
              gameInfo.blueBall.y = posY;
              // eslint-disable-next-line no-unused-vars
              rotate = rotateGame(backData, gameData, gameInfo);
              posX = gameInfo.blueBall.x;
              posY = gameInfo.blueBall.y;
            }
          }
          if (info.teleporting) {
            teleporting = 1;
          }
          break;
        case "ArrowUp":
        case "w":
        case "W":
        case "8":
          info = jump(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posY--;
            if (info.moveOneMore) {
              posY--;
            }
            elevatorCounter++; // To prevent that you fall from the elevator
          }
          break;
        case "q":
        case "Q":
        case "7":
          info = jumpLeft(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX--;
            posY--;
          }
          break;
        case "e":
        case "E":
        case "9":
          info = jumpRight(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posX++;
            posY--;
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
        case "2":
          info = pushDown(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posY++;
            if (info.moveOneMore) {
              posY++;
            }
          }
          break;
        case "y":
        case "Y":
        case "1":
          info = moveDownLeft(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posY++;
            posX--;
          }
          break;
        case "c":
        case "C":
        case "3":
          info = moveDownRight(backData, gameData, posX, posY, gameInfo);
          if (info.player) {
            posY++;
            posX++;
          }
          break;
        default:
          break;
      }
    }
    if (info.player) {
      skipFalling = 1;
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
      if (!gameOver && gameInfo.greenBalls <= 0) {
        confirmAlert({
          title: "Congratulations!",
          message: `Write down the code ${numberToCode(currentLevel + 1)} to go to level ${currentLevel + 1} whenever you want.`,
          buttons: [
            {
              label: "OK",
              onClick: () => {
              },
            },
          ],
        });
        initLevel(currentLevel + 1);
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
    if (info.takingPickaxe) {
      gameInfo.hasPickaxe = true;
      playSound("take");
    }
    if (info.breaking) {
      playSound("pickaxe");
    }
  }

  function handleResize() {
    updateScreen();
  }

  function tryAgain() {
    if (settings.lessQuestions) {
      initLevel(currentLevel);
    } else {
      confirmAlert({
        title: "Question",
        message: "Initialize level?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              initLevel(currentLevel);
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
    loadSettings();
    cbSound.current.checked = settings.sound;
    cbGraphics.current.checked = settings.nicerGraphics;
    cbQuestions.current.checked = settings.lessQuestions;
    currentLevel = 200;
    loadProgress();
    //currentLevel = 991; // TODO: Comment out when publishing
    initLevel(currentLevel);
    updateScreen();
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

  function updateScreen() {
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
      elementGreen: elementGreen.current,
      elementHappy: elementHappy.current,
      elementLightBlue: elementLightBlue.current,
      elementPurple: elementPurple.current,
      elementRed: elementRed.current,
      elementSad: elementSad.current,
      elementWhite: elementWhite.current,
      elementYellow: elementYellow.current,
    };
    const status = {
      gameOver: gameOver,
      laser: laser,
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
      wave2
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
    if (e.altKey && e.shiftKey && e.ctrlKey) {
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
        if (gameData[squareY][squareX] === 0) {
          gameData[posY][posX] = 0;
          posX = squareX;
          posY = squareY;
          gameData[posY][posX] = 2;
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
            <div className="balPanelText">
              Level: <span className="balPanelTextSpan">{levelNumber}</span>
            </div>
            <div className="menu">
              <button className="balButton">Load</button>
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
              </div>
            </div>
          </div>
          <div className="canvasAndButtons">
            <canvas
              className="gameCanvas"
              ref={canvas}
              onClick={putBallPosition}
            ></canvas>
            <div className="moveButtons">
              <button onClick={buttonJumpLeft}>
                <img src={arrowJumpLeft} alt="ArrowJumpLeft" />
              </button>
              <button onClick={buttonMoveLeft}>
                <img src={arrowLeft} alt="ArrowLeft" />
              </button>
              <button onClick={buttonJump}>
                <img src={arrowUp} alt="ArrowUp" />
              </button>
              <button onClick={buttonDown}>
                <img src={arrowDown} alt="ArrowDown" />
              </button>
              <button onClick={buttonMoveRight}>
                <img src={arrowRight} alt="ArrowRight" />
              </button>
              <button onClick={buttonJumpRight}>
                <img src={arrowJumpRight} alt="ArrowJumpRight" />
              </button>
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
            <img ref={elementGreen} src={imgGreen} />
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
              water you can swim in every direction. If you see for example a
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
              When you solve a level, you will get a code that gives you access
              to the next level whenever you want by pressing the Code button, so
              it is important to write down the code.
              Some levels are very difficult. If you can&apos;t solve a certain
              level, you can start with another series.
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
