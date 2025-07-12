import { numberToChar, stringArrayToNumberArray } from "./balUtils.js";
import { checkLevel } from "./levels.js";

export async function exportLevel(backData, gameData, gameInfo, gameVars) {
    let code = "";
    let count = 0;
    let line = "";
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: "level.txt", // Default filename
            types: [
                {
                    description: "Text Files",
                    accept: { "text/plain": [".txt"] },
                },
            ],
        });
        const writable = await fileHandle.createWritable();

        if (gameVars.bgcolor !== null) {
            for (let i = 0; i < gameVars.bgcolor.length; i++) {
                const bg = gameVars.bgcolor[i];
                line = `$bgcolor: ${bg.x}, ${bg.y}, ${bg.w}, ${bg.h}, ${bg.color}`;
                await writable.write(`${line}\n`);
            }
        }
        if (gameVars.fgcolor !== null) {
            for (let i = 0; i < gameVars.fgcolor.length; i++) {
                const fg = gameVars.fgcolor[i];
                line = `$fgcolor: ${fg.x}, ${fg.y}, ${fg.w}, ${fg.h}, ${fg.color}`;
                await writable.write(`${line}\n`);
            }
        }

        if (gameVars.hint !== "") {
            line = `$hint: ${gameVars.hint}`;
            await writable.write(`${line}\n`);
        }

        if (gameVars.soundLava !== "default") {
            line = `$sound: 22, ${gameVars.soundLava}`;
            await writable.write(`${line}\n`);
        }

        if (gameVars.startlevelmessage !== "") {
            line = `$startlevelmessage: ${gameVars.startlevelmessage}`;
            await writable.write(`${line}\n`);
        }

        for (let i = 0; i < gameInfo.delays.length; i++) {
            const delay = gameInfo.delays[i];
            line = `$gameticks: ${delay.x}, ${delay.y}, ${delay.gameTicks}`;
            await writable.write(`${line}\n`);
        }

        for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
            const musicBox = gameInfo.musicBoxes[i];
            if (JSON.stringify(musicBox.notes) !== JSON.stringify(["C4"])) {
                line = `$notes: ${musicBox.x}, ${musicBox.y}`;
                count = 0;
                for (let j = 0; j < musicBox.notes.length; j++) {
                    count++;
                    if (count > 32) {
                        await writable.write(`${line}\n`);
                        line = `$addnotes: ${musicBox.x}, ${musicBox.y}`;
                        count = 0;
                    }
                    line += ", " + musicBox.notes[j];
                }
                await writable.write(`${line}\n`);
            }
            if ((musicBox.instrument !== "") || (musicBox.volume !== 90)) {
                line = `$instrument: ${musicBox.x}, ${musicBox.y}, ${musicBox.instrument}, ${musicBox.volume}`;
                await writable.write(`${line}\n`);
            }
        }

        for (let i = 0; i < gameInfo.pistons.length; i++) {
            const piston = gameInfo.pistons[i];
            if (piston.group > 1) {
                line = `$group: ${piston.x}, ${piston.y}, ${piston.group}`;
                await writable.write(`${line}\n`);
            }
            if (piston.inverted) {
                line = `$inverted: ${piston.x}, ${piston.y}, yes`;
                await writable.write(`${line}\n`);
            }
            if (piston.mode !== "toggle") {
                line = `$pistonmode: ${piston.x}, ${piston.y}, ${piston.mode}`;
                await writable.write(`${line}\n`);
            }
            if (piston.sticky) {
                line = `$sticky: ${piston.x}, ${piston.y}, yes`;
                await writable.write(`${line}\n`);
            }
        }

        for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
            const pistonTriggers = gameInfo.pistonsTriggers[i];
            if (pistonTriggers.group > 1) {
                line = `$group: ${pistonTriggers.x}, ${pistonTriggers.y}, ${pistonTriggers.group}`;
                await writable.write(`${line}\n`);
            }
        }

        for (let i = 0; i < gameData.length; i++) {
            line = "";
            for (let j = 0; j < gameData[i].length; j++) {
                const gd = gameData[i][j];
                const bd = backData[i][j];
                let data = gd;
                if ([38, 160, 162, 164, 166].includes(data)) {
                    data = 0;
                }
                if ((data === 0) && (bd !== 0)) {
                    data = bd;
                }
                code = numberToChar(data);
                if ((code === " ") && ((i === 0) || (i === gameData.length - 1) || (j === 0) || (j === gameData[i].length - 1))) {
                    code = "0";
                }
                line += code;
            }
            await writable.write(`${line}\n`);
        }

        await writable.close();
        return true;
    } catch (err) {
        console.error("Error saving file:", err);
        return false;
    }
}

export async function importLevel() {
    let result = {};
    let levelData = [];
    let levelSettings = [];
    let msg = "";
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: "Text Files",
                    accept: { "text/plain": [".txt"] },
                },
            ],
            multiple: false,
        });
        const file = await fileHandle.getFile();
        if (!file.name.toLowerCase().endsWith(".txt")) {
            alert("Invalid file type. Please select a .txt file.");
            return;
        }
        const text = await file.text();
        const data = text.split("\n");
        for (let i = 0; i < data.length; i++) {
            const line = data[i].trim();
            if (line !== "") {
                if (line.startsWith("$")) {
                    levelSettings.push(line);
                } else {
                    levelData.push(line);
                }
            }
        }

        msg = checkLevel(levelData, levelSettings);
        if (msg !== "") {
            throw new Error(msg);
        }

        const gd = stringArrayToNumberArray(levelData, true);

        result.backData = gd.backData;
        result.gameData = gd.gameData;
        result.levelSettings = levelSettings;
        return result;
    } catch (err) {
        alert(err.message);
        return null;
    }
}