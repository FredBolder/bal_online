import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { playNote } from "./music.js";
import { getSettings } from "./settings.js";

export function changeMusicBoxMode(gameInfo, x, y, mode) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
  if (idx >= 0) {
    gameInfo.musicBoxes[idx].mode = mode;
  }
  return idx;
}

export function changeMusicBoxNote(gameInfo, x, y, note) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
  if (idx >= 0) {
    gameInfo.musicBoxes[idx].notes.length = 0;
    gameInfo.musicBoxes[idx].notes.push(note);
  }
  return idx;
}

export function changeMusicBoxPart(gameInfo, x, y, part) {
  let idx = -1;

  idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
  if (idx >= 0) {
    gameInfo.musicBoxes[idx].part = part;
  }
  return idx;
}

export function checkMusicBoxes(backData, gameData, gameInfo, gameVars) {
    let note = "";
    let update = false;
    const music = getSettings().music;

    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const musicBox = gameInfo.musicBoxes[i];
        if (musicBox.mode === "note") {
            if ((musicBox.y > 0) && (musicBox.y < gameData.length - 1)) {
                if (hasWeightAbove(backData, gameData, gameInfo, gameVars, musicBox.x, musicBox.x, musicBox.y, false) && (gameData[musicBox.y + 1][musicBox.x] === 0)) {
                    update = true;
                    moveObject(gameData, gameInfo, musicBox.x, musicBox.y - 1, musicBox.x, musicBox.y + 1);
                    if (musicBox.notes.length === 0) {
                        musicBox.notes.push("C4");
                        musicBox.noteIndex = 0;
                    }
                    if (musicBox.noteIndex >= musicBox.notes.length) {
                        musicBox.noteIndex = 0;
                    }
                    note = musicBox.notes[musicBox.noteIndex];
                    musicBox.noteIndex++;
                    if ((music > 0) && (note !== "") && (note !== "-")) {
                        playNote(musicBox.instrument, musicBox.volume * music * 0.01, note);
                    }
                }
            }
        }
        if ((musicBox.mode === "song") && musicBox.active) {
            if (musicBox.delayCounter >= musicBox.delay) {
                musicBox.delayCounter = 0;
                if (musicBox.notes.length === 0) {
                    musicBox.notes.push("C4");
                    musicBox.noteIndex = 0;
                }
                if (musicBox.noteIndex >= musicBox.notes.length) {
                    musicBox.noteIndex = 0;
                }
                note = musicBox.notes[musicBox.noteIndex];
                musicBox.noteIndex++;
                if ((music > 0) && (note !== "") && (note !== "-")) {
                    playNote(musicBox.instrument, musicBox.volume * music * 0.01, note);
                }
            }
            musicBox.delayCounter++;
        }
    }
    return update;
}

export function validNotesForKeyboardMode(notes) {
    let result = true;
    if (notes.length === 1) {
        if (notes[0].includes("b") || notes[0].includes("#")) {
            result = false;
        }
    } else if (notes.length > 1) {
        result = false; // TODO
    } else {
        result = false;
    }
    return result;
}