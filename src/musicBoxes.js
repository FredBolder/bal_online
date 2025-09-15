import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { globalVars } from "./glob.js";
import { instruments, playNote, transpose } from "./music.js";
import { getPreDelay } from "./operator.js";
import { schedulerTime } from "./scheduler.js";
import { getSettings } from "./settings.js";
import { randomInt } from "./utils.js";

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

export function checkFirstCount(gameData, gameInfo) {
    let countOne = false;
    let gameOver = false;
    let step = 0;
    let time1 = 0;
    let time2 = 0;
    let time3 = 0;

    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const musicBox = gameInfo.musicBoxes[i];
        if ((musicBox.mode === "firstcount") && (musicBox.stepsPerMeasure > 1) && (musicBox.notes.length > 1)) {
            time1 = getPreDelay();
            time2 = musicBox.delayCounter * schedulerTime();
            step = (Math.max(0, musicBox.noteIndex) % musicBox.stepsPerMeasure) + 1;
            time2 += (step - 1) * musicBox.delay * schedulerTime();
            time3 = time2 - (musicBox.stepsPerMeasure * musicBox.delay * schedulerTime());
            countOne = ((Math.abs(time2 - time1) < 250) || (Math.abs(time3 - time1) < 250));
            if (blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y)) {
                if (countOne) {
                    musicBox.onOne = true;
                } else {
                    if (!musicBox.onOne) {
                        gameOver = true;
                    }
                }
            } else {
                musicBox.onOne = false;
            }
        }
    }
    return gameOver;
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
                    if ((music > 0) && (note !== "") && (note !== "-") && (note !== "_")) {
                        // volume and music are both percentages
                        playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note);
                    }
                }
            }
        }
        if ((musicBox.mode === "chord") || (musicBox.mode === "door")) {
            if (gameData[musicBox.y][musicBox.x] === 157) {
                if (!musicBox.active) {
                    if (blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y)) {
                        musicBox.noteIndex = -1;
                        musicBox.delayCounter = 0;
                        musicBox.ended = false;
                        musicBox.active = true;
                    }
                } else {
                    if (!blueBallIsCloseToXY(gameData, musicBox.x, musicBox.y)) {
                        musicBox.active = false;
                    }
                }
                if (musicBox.mode === "door") {
                    if (musicBox.notes.length < 2) {
                        randomSequence(musicBox.notes);
                    }
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
                } else {
                    if (musicBox.chordType === "?") {
                        randomMajorOrMinorChord(musicBox);
                    }
                }
            }
        }
        if (["chord", "door", "firstcount", "song"].includes(musicBox.mode) && musicBox.active && !musicBox.ended && (gameData[musicBox.y][musicBox.x] === 157)) {
            if ((musicBox.delayCounter >= musicBox.delay) || (musicBox.noteIndex === -1)) {
                musicBox.delayCounter = 0;
                musicBox.noteIndex++;
                if (musicBox.noteIndex >= musicBox.notes.length) {
                    musicBox.noteIndex = 0;
                    if ((musicBox.mode === "chord") || (musicBox.mode === "door")) {
                        musicBox.ended = true;
                    }
                    if (musicBox.ended && (musicBox.mode === "chord") && !musicBox.chordsPlaced) {
                        musicBox.chordsPlaced = true;
                        gameVars.lastChord = musicBox;
                        placeChordObjects(gameData, gameInfo, musicBox);
                        update = true;
                    }
                }
                if (musicBox.notes.length === 0) {
                    musicBox.notes.push("C4");
                    musicBox.noteIndex = 0;
                }
                if (!musicBox.ended) {
                    note = musicBox.notes[musicBox.noteIndex];
                    if ((music > 0) && (note !== "") && (note !== "-") && (note !== "_")) {
                        playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note);
                    }
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
    return ["chord", "door", "firstcount", "keyboard", "note", "song"];
}

function placeChordObjects(gameData, gameInfo, musicBox) {
    let f1 = 1;
    let x = 0;
    let x1 = -1;
    let x2 = -1;
    let y = 0;

    if (gameInfo.blueBall.x < musicBox.x) {
        f1 = -1;
    } else {
        f1 = 1;
    }
    if (musicBox.y > 0) {
        x = musicBox.x + f1;
        y = musicBox.y - 1;
        while ((x1 === -1) && (x >= 0) && (x < gameData[0].length)) {
            if (gameData[y][x] === 0) {
                x1 = x;
            }
            x += f1;
        }
        while ((x2 === -1) && (x >= 0) && (x < gameData[0].length)) {
            if (gameData[y][x] === 0) {
                x2 = x;
            }
            x += f1;
        }
        if ((x1 >= 0) && (x2 >= 0)) {
            gameData[y][x1] = 186;
            gameData[y][x2] = 187;
        }
    }
}

function randomMajorOrMinorChord(musicBox) {
    const n1 = randomInt(1, 10);
    let n2 = 0;

    const major = [
        ["C2", "G3", "C4", "E4"],
        ["D2", "F#3", "A3", "D4"],
        ["G1", "G3", "B3", "D4"],
        ["F1", "F3", "A3", "C4"],
        ["E1", "G#3", "B3", "E4"],
        ["A1", "A3", "C#4", "E4"],
        ["F#1", "F#3", "A#3", "C#4"],
        ["Ab#1", "Ab3", "C4", "Eb4"],
        ["Bb#1", "F3", "Bb3", "D4"],
    ];
    const minor = [
        ["C2", "G3", "C4", "Eb4"],
        ["D2", "F3", "A3", "D4"],
        ["G1", "G3", "Bb3", "D4"],
        ["F1", "F3", "Ab3", "C4"],
        ["E1", "G3", "B3", "E4"],
        ["A1", "A3", "C4", "E4"],
        ["F#1", "F#3", "A3", "C#4"],
        ["Ab#1", "Ab3", "B3", "Eb4"],
        ["Bb#1", "F3", "Bb3", "Db4"],
    ];

    musicBox.notes.length = 0;
    if (n1 > 5) {
        // major
        n2 = randomInt(0, major.length - 1);
        for (let i = 0; i < major[n2].length; i++) {
            musicBox.notes.push(major[n2][i]);
        }
        musicBox.chordType = "major";
    } else {
        // minor
        n2 = randomInt(0, minor.length - 1);
        for (let i = 0; i < minor[n2].length; i++) {
            musicBox.notes.push(minor[n2][i]);
        }
        musicBox.chordType = "minor";
    }
}

function randomSequence(notes) {
    let n = 0;
    const sequences = [
        ["C4", "E4", "G4"],
        ["G4", "E4", "C4"],
        ["C4", "E4", "A4"],
        ["A4", "E4", "C4"],
        ["D4", "F4", "A4"],
        ["A4", "F4", "D4"],
        ["E4", "G4", "B4"],
        ["B4", "G4", "E4"],
        ["C4", "F4", "A4"],
        ["A4", "F4", "C4"],
        ["C4", "E4", "G4", "C5"],
        ["C5", "G4", "E4", "C4"],
        ["C4", "G4", "E4", "G4"],
        ["D4", "A4", "F4", "A4"],
        ["E4", "B4", "G4", "B4"],
        ["C4", "D4", "E4", "G4"],
        ["D4", "E4", "F4", "A4"],
        ["G4", "E4", "C4", "E4"],
        ["A4", "F4", "D4", "F4"],
        ["B4", "G4", "E4", "G4"],
        ["C4", "D4", "E4", "F4", "G4"],
        ["G4", "F4", "E4", "D4", "C4"],
        ["C4", "E4", "D4", "F4", "E4", "G4"],
        ["D4", "F4", "E4", "G4", "F4", "A4"],
        ["C4", "E4", "G4", "C5", "G4", "E4", "C4"],
    ];
    n = randomInt(0, sequences.length - 1);
    notes.length = 0;
    for (let i = 0; i < sequences[n].length; i++) {
        notes.push(sequences[n][i]);
    }
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