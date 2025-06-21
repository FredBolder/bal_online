import {
    numberToChar,
    stringArrayToNumberArray,
} from "./balUtils.js";

export async function exportLevel(backData, gameData, gameVars) {
    let code = "";
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

        for (let i = 0; i < gameData.length; i++) {
            line = "";
            for (let j = 0; j < gameData[i].length; j++) {
                const gd = gameData[i][j];
                const bd = backData[i][j];
                let data = gd;
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

        if (levelData.length > 0) {
            const lineLength = levelData[0].length;
            if (!levelData.every(line => line.length === lineLength)) {
                throw new Error("Inconsistent line lengths");
            }
        } else {
            throw new Error("Level is empty");
        }

        const gd = stringArrayToNumberArray(levelData, true);

        result.backData = gd.backData;
        result.gameData = gd.gameData;
        result.levelSettings = levelSettings;
        return result;
    } catch (err) {
        console.error("Error opening file:", err);
        return null;
    }
}