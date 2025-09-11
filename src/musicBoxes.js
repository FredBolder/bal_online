import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { instruments, playNote, transpose } from "./music.js";
import { getPreDelay } from "./operator.js";
import { schedulerTime } from "./scheduler.js";
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

export function changeMusicBoxProperty(gameInfo, x, y, property, value) {
    let idx = -1;

    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
        const musicBox = gameInfo.musicBoxes[idx];
        switch (property) {
            case "instrument":
                if (instruments().includes(value)) {
                    musicBox.instrument = value;
                }
                break;
            case "mode":
                if (musicBoxModes().includes(value)) {
                    musicBox.mode = value;
                }
                break;
            case "note":
                musicBox.notes.length = 0;
                musicBox.notes.push(value);
                break;
            case "stepspermeasure":
                musicBox.stepsPerMeasure = value;
                break;
            case "part":
                if (["top", "middle", "bottom"].includes(value)) {
                    musicBox.part = value;
                }
                break;
            default:
                break;
        }
    }
    return idx;
}

export function checkMusicBoxes(backData, gameData, gameInfo, gameVars) {
    let countOne = false;
    let note = "";
    let sequence = "";
    let step = 0;
    let time1 = 0;
    let time2 = 0;
    let time3 = 0;
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
                    if ((music > 0) && (note !== "") && (note !== "-") && (note !== "_")) {
                        // volume and music are both percentages
                        playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note);
                    }
                }
            }
        }
        if (musicBox.mode === "door") {
            if (gameData[musicBox.y][musicBox.x] === 157) {
                if (!musicBox.active) {
                    musicBox.noteIndex = -1;
                    musicBox.delayCounter = 0;
                }
                musicBox.active = blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y);
                sequence = "";
                for (let j = 0; j < musicBox.notes.length; j++) {
                    note = musicBox.notes[j];
                    if (note.startsWith("*") || note.startsWith(".")) {
                        note = note.slice(1);
                    }
                    if ((note !== "") && !note.includes("-") && !note.includes("_")) {
                        sequence += note;
                    }
                }
                if (globalVars.playedNotes[musicBox.group - 1].includes(sequence)) {
                    gameData[musicBox.y][musicBox.x] = 0;
                }
            }
        }
        if (["door", "firstcount", "song"].includes(musicBox.mode) && musicBox.active) {
            if ((musicBox.mode === "firstcount") && (musicBox.stepsPerMeasure > 1) && (musicBox.notes.length > 1)){
                time1 = getPreDelay();
                time2 = musicBox.delayCounter * schedulerTime();
                step = (Math.max(0, musicBox.noteIndex) % musicBox.stepsPerMeasure) + 1;
                time2 += (step - 1) * musicBox.delay * schedulerTime();
                time3 = time2 - (musicBox.stepsPerMeasure * musicBox.delay * schedulerTime());
                countOne = ((Math.abs(time2 - time1) < 250) || (Math.abs(time3 - time1) < 250));
                if (!countOne && blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y)) {
                    gameVars.gameOver = true;
                    update = true;
                }
            }
            if ((musicBox.delayCounter >= musicBox.delay) || (musicBox.noteIndex === -1)) {
                musicBox.delayCounter = 0;
                musicBox.noteIndex++;
                if (musicBox.noteIndex >= musicBox.notes.length) {
                    musicBox.noteIndex = 0;
                }
                if (musicBox.notes.length === 0) {
                    musicBox.notes.push("C4");
                    musicBox.noteIndex = 0;
                }
                note = musicBox.notes[musicBox.noteIndex];
                if ((music > 0) && (note !== "") && (note !== "-") && (note !== "_")) {
                    playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note);
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
                    playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note);
                    if (note.startsWith("*") || note.startsWith(".")) {
                        note = note.slice(1);
                    }
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

export function musicBoxModes() {
    return ["door", "firstcount", "keyboard", "note", "song"];
}

export function transposeMusicBox(gameInfo, x, y, semitones) {
    let idx = -1;
    idx = findElementByCoordinates(x, y, gameInfo.musicBoxes);
    if (idx >= 0) {
        const musicBox = gameInfo.musicBoxes[idx];
        for (let i = 0; i < musicBox.notes.length; i++) {
            if (!["-", "_"].includes(musicBox.notes[i])) {
                musicBox.notes[i] = transpose(musicBox.notes[i], semitones);
            }
        }
    }
    return idx;
}

export function validNotesForKeyboardMode(notes) {
    let result = true;
    if (notes.length === 1) {
        if ((notes[0] === "") || notes[0].includes("b") || notes[0].includes("#") || notes[0].includes("-") || notes[0].includes("_")) {
            result = false;
        }
    } else {
        result = false;
    }
    return result;
}