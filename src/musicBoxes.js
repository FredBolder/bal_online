import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { playNote, transpose } from "./music.js";
import { getSettings } from "./settings.js";

function blueBallIsCloseToXY(gameData, x, y) {
    let result = false;
    const xmax = gameData[0].length - 1;
    const ymax = gameData.length - 1;

    if (!result && ((x + 1) >= 0) && (y >= 0) && ((x + 1) <= xmax) && (y <= ymax)) {
        if (gameData[y][(x + 1)] === 2) {
            result = true;
        }
    }
    if (!result && ((x - 1) >= 0) && (y >= 0) && ((x - 1) <= xmax) && (y <= ymax)) {
        if (gameData[y][(x - 1)] === 2) {
            result = true;
        }
    }
    if (!result && (x >= 0) && ((y + 1) >= 0) && (x <= xmax) && ((y + 1) <= ymax)) {
        if (gameData[(y + 1)][x] === 2) {
            result = true;
        }
    }
    if (!result && (x >= 0) && ((y - 1) >= 0) && (x <= xmax) && ((y - 1) <= ymax)) {
        if (gameData[(y - 1)][x] === 2) {
            result = true;
        }
    }
    return result;
}

export function changeMusicBoxInstrument(gameInfo, x, y, instrument) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
        gameInfo.musicBoxes[idx].instrument = instrument;
    }
    return idx;
}

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
    let sequence = "";
    let update = false;
    let x = -1;
    let y = -1;
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
        if (musicBox.mode === "door") {
            if (gameData[musicBox.y][musicBox.x] === 157) {
                if (!musicBox.active) {
                    musicBox.noteIndex = 0;
                }
                musicBox.active = blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y);
                sequence = "";
                for (let j = 0; j < musicBox.notes.length; j++) {
                    note = musicBox.notes[j];
                    if (!["-", ":"].includes(note)) {
                        sequence += note;
                    }
                }
                if (globalVars.playedNotes[musicBox.group - 1].includes(sequence)) {
                    gameData[musicBox.y][musicBox.x] = 0;
                }
            }
        }
        if (((musicBox.mode === "song") || (musicBox.mode === "door")) && musicBox.active) {
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
        if (musicBox.mode === "keyboard") {
            if ((musicBox.y < gameData.length - 1) && (musicBox.y < gameData.length - 1)) {
                switch (musicBox.direction) {
                    case "up":
                        x = musicBox.x;
                        y = musicBox.y + 1;
                        break;
                    case "down":
                        x = musicBox.x;
                        y = musicBox.y - 1;
                        break;
                    case "left":
                        x = musicBox.x + 1;
                        y = musicBox.y;
                        break;
                    case "right":
                        x = musicBox.x - 1;
                        y = musicBox.y;
                        break;
                    default:
                        break;
                }
                if (!musicBox.active && validNotesForKeyboardMode(musicBox.notes) && (gameData[y][x] === 2)) {
                    note = musicBox.notes[0];
                    playNote(musicBox.instrument, musicBox.volume * music * 0.01, note);
                    globalVars.playedNotes[musicBox.group - 1] += note;
                    if (globalVars.playedNotes[musicBox.group - 1].length > 100) {
                        globalVars.playedNotes[musicBox.group - 1] = globalVars.playedNotes[musicBox.group - 1].slice(globalVars.playedNotes[musicBox.group - 1].length - 100);
                    }
                    musicBox.active = true;
                }
                if (gameData[y][x] === 0) {
                    musicBox.active = false;
                }
            }
        }
    }
    return update;
}

export function instruments() {
    return ["accordion", "altsax", "bass", "bassdrum", "bell", "clarinet", "cowbell", "guitar", "harp", "harpsichord", "hihat", "kalimba",
        "piano", "pipeorgan", "snaredrum", "squarelead", "strings", "trombone", "trumpet", "vibraphone", "xylophone"]
}

export function transposeMusicBox(gameInfo, x, y, semitones) {
    let idx = -1;
    console.log("FRED transposeMusicBox");
    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
        const musicBox = gameInfo.musicBoxes[idx];
        for (let i = 0; i < musicBox.notes.length; i++) {
            musicBox.notes[i] = transpose(musicBox.notes[i], semitones);
        }
    }
    return idx;
}

export function validNotesForKeyboardMode(notes) {
    let result = true;
    if (notes.length === 1) {
        if (notes[0].includes("b") || notes[0].includes("#")) {
            result = false;
        }
    } else {
        result = false;
    }
    return result;
}