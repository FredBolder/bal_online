import { findElementByCoordinates, hasWeightAbove, moveObject } from "./balUtils.js";
import { augmentedChords, diminishedChords, dom7Chords, maj7Chords, majorChords, minorChords, sus2Chords, sus4Chords } from "./chords.js";
import { globalVars } from "./glob.js";
import { intervalMajor2, intervalMajor3, intervalMinor3, intervalP4, intervalP5, intervalP8 } from "./intervals.js";
import { getAudioContext, instruments, playNote, transpose } from "./music.js";
import { getPreDelay } from "./operator.js";
import { schedulerTime } from "./scheduler.js";
import { getSettings } from "./settings.js";
import { randomInt } from "./utils.js";

function addPlayedNote(group, note) {
    if (note.startsWith("*") || note.startsWith(".")) {
        note = note.slice(1);
    }
    globalVars.playedNotes[group] += note;
    if (globalVars.playedNotes[group].length > 100) {
        globalVars.playedNotes[group] = globalVars.playedNotes[group].slice(globalVars.playedNotes[group].length - 100);
    }
}

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
            case "octaves":
                musicBox.octaves = value;
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
    let chordStr = "";
    let note = "";
    let sequence = "";
    let update = false;
    let x = -1;
    let y = -1;
    const music = getSettings().music;
    const audioCtx = getAudioContext();

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
                        // volume and music are both percentages
                        playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note, musicBox.noteOverride);
                    }
                }
            }
        }
        if (isChordOrIntervalMode(musicBox.mode) || (musicBox.mode === "door") || (musicBox.mode === "near")) {
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
                    if ((musicBox.mode !== "near") && (musicBox.chordTypeOrInterval === "?")) {
                        switch (musicBox.mode) {
                            case "chord1":
                                randomMajorOrMinorChord(musicBox);
                                break;
                            case "chord2":
                                randomAugOrDimChord(musicBox);
                                break;
                            case "chord3":
                                randomSuspendedChord(musicBox);
                                break;
                            case "chord4":
                                randomSeventhChord(musicBox);
                                break;
                            case "interval1":
                                randomP4OrP5OrP8Interval(musicBox);
                                break;
                            case "interval2":
                                randomMajor2OrMinor3OrMajor3Interval(musicBox);
                                break;
                            default:
                                break;
                        }
                        if (musicBox.notes.length > 1) {
                            chordStr = "";
                            for (let j = 0; j < musicBox.notes.length; j++) {
                                if (j > 0) {
                                    chordStr += "&";
                                }
                                chordStr += musicBox.notes[j];
                            }
                            for (let j = 0; j < 2; j++) {
                                musicBox.notes.push("_");
                            }
                            musicBox.notes.push(chordStr);
                            for (let j = 0; j < 2; j++) {
                                musicBox.notes.push("-");
                            }
                            musicBox.notes.push("_");
                        }
                    }
                }
            }
        }
        if ((isChordOrIntervalMode(musicBox.mode) || ["door", "firstcount", "near", "song"].includes(musicBox.mode)) && musicBox.active && !musicBox.ended && (gameData[musicBox.y][musicBox.x] === 157)) {
            if ((musicBox.delayCounter >= musicBox.delay) || (musicBox.noteIndex === -1)) {
                musicBox.delayCounter = 0;
                musicBox.noteIndex++;
                if (musicBox.noteIndex >= musicBox.notes.length) {
                    musicBox.noteIndex = 0;
                    if (isChordOrIntervalMode(musicBox.mode) || (musicBox.mode === "door")) {
                        musicBox.ended = true;
                    }
                    if (musicBox.ended && isChordOrIntervalMode(musicBox.mode)) {
                        gameVars.lastMusicBox = musicBox;
                        if (!musicBox.chordsPlaced) {
                            musicBox.chordsPlaced = true;
                            placeChordObjects(gameData, gameInfo, musicBox);
                            update = true;
                        }
                    }
                }
                if (musicBox.tripletStart >= 0) {
                    if ((musicBox.noteIndex > (musicBox.tripletStart + 1)) || (musicBox.tripletStart > musicBox.noteIndex)) {
                        musicBox.tripletStart = -1;
                    }
                }
                if (musicBox.notes.length === 0) {
                    musicBox.notes.push("C4");
                    musicBox.noteIndex = 0;
                }
                if (!musicBox.ended && (musicBox.tripletStart === -1)) {
                    note = musicBox.notes[musicBox.noteIndex];
                    if (note.startsWith("T")) {
                        musicBox.tripletStart = musicBox.noteIndex;
                        const notes = note.slice(1).split("&");
                        note = "";
                        let n = notes.length;
                        if (n > 3) {
                            n = 3;
                        }
                        const tripletSpacingSec = (musicBox.delay * schedulerTime() * (2 / 3)) / 1000;

                        const startTime = audioCtx.currentTime;

                        for (let tripletNote = 0; tripletNote < n; tripletNote++) {
                            const note = notes[tripletNote].trim();
                            if (music > 0 && note !== "" && note !== "-") {

                                const noteTime = startTime + tripletSpacingSec * tripletNote;

                                // Convert audio time to wall-clock ms
                                const delayMs = Math.max(0, (noteTime - audioCtx.currentTime) * 1000);

                                setTimeout(() => {
                                    playNote(
                                        musicBox.instrument,
                                        musicBox.volume * (music * 0.01),
                                        note,
                                        musicBox.noteOverride
                                    );
                                }, delayMs);
                            }
                        }
                    }

                    if (note.startsWith("2") || note.startsWith("3")) {
                        const notes = note.slice(1).split("&").map(s => s.trim());
                        const audioCtx = getAudioContext();

                        const n = note.startsWith("3") ? 3 : 2;
                        const subdivision = musicBox.delay * schedulerTime() * (1 / n); // ms
                        const subdivisionSec = subdivision / 1000;

                        const startTime = audioCtx.currentTime;

                        for (let i = 0; i < n; i++) {
                            if (i >= notes.length) break;

                            const thisNote = notes[i];
                            if (music <= 0 || thisNote === "" || thisNote === "-") {
                                continue;
                            }
                            const targetTime = startTime + subdivisionSec * i;
                            const delay = Math.max(0, (targetTime - audioCtx.currentTime) * 1000);

                            setTimeout(() => {
                                playNote(
                                    musicBox.instrument,
                                    musicBox.volume * (music * 0.01),
                                    thisNote,
                                    musicBox.noteOverride
                                );
                            }, delay);
                        }
                        note = "";
                    }
                    if ((musicBox.tripletStart === -1) && (music > 0) && (note !== "") && (note !== "-")) {
                        playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note, musicBox.noteOverride);
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
                if (!musicBox.active && validNotesForKeyboardMode(musicBox.notes) && [2, 5].includes(gameData[y][x])) {
                    note = musicBox.notes[0];
                    playNote(musicBox.instrument, musicBox.volume * (music * 0.01), note, musicBox.noteOverride);
                    addPlayedNote(musicBox.group - 1, note);
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

export function clearPlayedNotes() {
    for (let i = 0; i < 32; i++) {
        globalVars.playedNotes[i] = "";
    }
}

export function fixDoors(gameInfo) {
    let found = false;

    if (globalVars.createLevel) {
        return;
    }

    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const musicBox = gameInfo.musicBoxes[i];
        if (musicBox.mode === "door") {
            found = false;
            for (let j = 0; j < i; j++) {
                const mb = gameInfo.musicBoxes[j];
                // More doors in the same group
                if ((mb.mode === "door") && (mb.group === musicBox.group)) {
                    found = true;
                    musicBox.notes.length = 0;
                    musicBox.notes = [];
                    for (let k = 0; k < mb.notes.length; k++) {
                        musicBox.notes.push(mb.notes[k]);
                    }
                    break;
                }
            }
            if (!found) {
                if (musicBox.notes.length < 2) {
                    if (musicBox.octaves == 2) {
                        randomSequenceTwoOctaves(musicBox.notes);
                    } else {
                        randomSequence(musicBox.notes);
                    }
                } else if (musicBox.notes.includes("|")) {
                    randomUserSequence(musicBox.notes);
                }
            }
        }
    }
}

function isChordOrIntervalMode(mode) {
    return ["chord1", "chord2", "chord3", "chord4", "interval1", "interval2"].includes(mode);
}

export function musicBoxModes() {
    return ["chord1", "chord2", "chord3", "chord4", "door", "firstcount", "interval1", "interval2", "keyboard",
        "near", "note", "song"];
}

function placeChordObjects(gameData, gameInfo, musicBox) {
    let f1 = 1;
    let x = 0;
    let x1 = -1;
    let x2 = -1;
    let x3 = -1;
    let y = 0;
    const isInterval = (["interval1", "interval2"].includes(musicBox.mode));

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
        if (isInterval) {
            while ((x3 === -1) && (x >= 0) && (x < gameData[0].length)) {
                if (gameData[y][x] === 0) {
                    x3 = x;
                }
                x += f1;
            }
        }
        if ((x1 >= 0) && (x2 >= 0) && ((x3 >= 0) || !isInterval)) {
            switch (musicBox.mode) {
                case "chord1":
                    gameData[y][x1] = 186;
                    gameData[y][x2] = 187;
                    break;
                case "chord2":
                    gameData[y][x1] = 188;
                    gameData[y][x2] = 189;
                    break;
                case "chord3":
                    gameData[y][x1] = 190;
                    gameData[y][x2] = 191;
                    break;
                case "chord4":
                    gameData[y][x1] = 226;
                    gameData[y][x2] = 227;
                    break;
                case "interval1":
                    gameData[y][x1] = 230;
                    gameData[y][x2] = 228;
                    gameData[y][x3] = 229;
                    break;
                case "interval2":
                    gameData[y][x1] = 231;
                    gameData[y][x2] = 232;
                    gameData[y][x3] = 233;
                    break;
                default:
                    break;
            }
        }
    }
}

function randomAugOrDimChord(musicBox) {
    const aug = augmentedChords();
    const dim = diminishedChords();
    const n1 = randomInt(1, 10);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 5) {
        // augmented
        n2 = randomInt(0, aug.length - 1);
        for (let i = 0; i < aug[n2].length; i++) {
            musicBox.notes.push(aug[n2][i]);
        }
        musicBox.chordTypeOrInterval = "augmented";
    } else {
        // diminished
        n2 = randomInt(0, dim.length - 1);
        for (let i = 0; i < dim[n2].length; i++) {
            musicBox.notes.push(dim[n2][i]);
        }
        musicBox.chordTypeOrInterval = "diminished";
    }
}

function randomMajor2OrMinor3OrMajor3Interval(musicBox) {
    const major2 = intervalMajor2();
    const minor3 = intervalMinor3();
    const major3 = intervalMajor3();
    const n1 = randomInt(1, 15);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 10) {
        // major second
        n2 = randomInt(0, major2.length - 1);
        for (let i = 0; i < major2[n2].length; i++) {
            musicBox.notes.push(major2[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval M2";
    } else if (n1 > 5) {
        // minor third
        n2 = randomInt(0, minor3.length - 1);
        for (let i = 0; i < minor3[n2].length; i++) {
            musicBox.notes.push(minor3[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval m3";
    } else {
        // major third
        n2 = randomInt(0, major3.length - 1);
        for (let i = 0; i < major3[n2].length; i++) {
            musicBox.notes.push(major3[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval M3";
    }
}

function randomMajorOrMinorChord(musicBox) {
    const major = majorChords();
    const minor = minorChords();
    const n1 = randomInt(1, 10);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 5) {
        // major
        n2 = randomInt(0, major.length - 1);
        for (let i = 0; i < major[n2].length; i++) {
            musicBox.notes.push(major[n2][i]);
        }
        musicBox.chordTypeOrInterval = "major";
    } else {
        // minor
        n2 = randomInt(0, minor.length - 1);
        for (let i = 0; i < minor[n2].length; i++) {
            musicBox.notes.push(minor[n2][i]);
        }
        musicBox.chordTypeOrInterval = "minor";
    }
}

function randomP4OrP5OrP8Interval(musicBox) {
    const P4 = intervalP4();
    const P5 = intervalP5();
    const P8 = intervalP8();
    const n1 = randomInt(1, 15);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 10) {
        // perfect fourth
        n2 = randomInt(0, P4.length - 1);
        for (let i = 0; i < P4[n2].length; i++) {
            musicBox.notes.push(P4[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval P4";
    } else if (n1 > 5) {
        // perfect fifth
        n2 = randomInt(0, P5.length - 1);
        for (let i = 0; i < P5[n2].length; i++) {
            musicBox.notes.push(P5[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval P5";
    } else {
        // perfect eighth
        n2 = randomInt(0, P8.length - 1);
        for (let i = 0; i < P8[n2].length; i++) {
            musicBox.notes.push(P8[n2][i]);
        }
        musicBox.chordTypeOrInterval = "interval P8";
    }
}

function randomSeventhChord(musicBox) {
    const dom7 = dom7Chords();
    const maj7 = maj7Chords();
    const n1 = randomInt(1, 10);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 5) {
        // 7
        n2 = randomInt(0, dom7.length - 1);
        for (let i = 0; i < dom7[n2].length; i++) {
            musicBox.notes.push(dom7[n2][i]);
        }
        musicBox.chordTypeOrInterval = "dominant seventh";
    } else {
        // maj7
        n2 = randomInt(0, maj7.length - 1);
        for (let i = 0; i < maj7[n2].length; i++) {
            musicBox.notes.push(maj7[n2][i]);
        }
        musicBox.chordTypeOrInterval = "major seventh";
    }
}

function randomSuspendedChord(musicBox) {
    const sus2 = sus2Chords();
    const sus4 = sus4Chords();
    const n1 = randomInt(1, 10);
    let n2 = 0;

    musicBox.notes.length = 0;
    if (n1 > 5) {
        // sus2
        n2 = randomInt(0, sus2.length - 1);
        for (let i = 0; i < sus2[n2].length; i++) {
            musicBox.notes.push(sus2[n2][i]);
        }
        musicBox.chordTypeOrInterval = "suspended second";
    } else {
        // sus4
        n2 = randomInt(0, sus4.length - 1);
        for (let i = 0; i < sus4[n2].length; i++) {
            musicBox.notes.push(sus4[n2][i]);
        }
        musicBox.chordTypeOrInterval = "suspended fourth";
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

function randomSequenceTwoOctaves(notes) {
    let n = 0;
    const sequences = [
        ["D4", "D4", "A4", "D5", "A5", "F5", "D5", "F5"],
        ["A4", "A4", "C5", "E5", "A5", "E5", "C5", "E5"],
        ["G5", "G5", "E5", "C5", "G4", "C5", "E5", "G5"],
        ["C4", "C4", "E4", "G4", "C5", "C5", "E5", "G5"],
        ["D4", "D4", "A4", "A4", "D5", "D5", "F5", "A5"],
        ["G5", "G5", "E5", "B4", "G4", "B4", "E5", "G5"],
        ["D4", "A4", "F4", "D5", "A4", "F5", "D5", "A5"],
        ["C4", "G4", "E4", "C5", "G4", "E5", "C5", "G5"],
    ];
    n = randomInt(0, sequences.length - 1);
    notes.length = 0;
    for (let i = 0; i < sequences[n].length; i++) {
        notes.push(sequences[n][i]);
    }
}

function randomUserSequence(notes) {
    let n = 0;
    const sequences = [];

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if ((i === 0) || ((sequences.length > 0) && (note === "|") && (sequences[sequences.length - 1].length > 0))) {
            sequences.push([]);
        }
        if (note !== "|") {
            sequences[sequences.length - 1].push(note);
        }
    }
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