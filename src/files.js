import { numberToChar, stringArrayToNumberArray } from "./balUtils.js";
import { checkLevel } from "./levels.js";

export async function exportLevel(backData, gameData, gameInfo, gameVars) {
    try {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: "level.txt",
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
            });
            return await processHandleExport(handle, backData, gameData, gameInfo, gameVars);
        }

        // For Firefox
        return await fallbackFilePickerExport(backData, gameData, gameInfo, gameVars);
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function processHandleExport(handle, backData, gameData, gameInfo, gameVars) {
    const text = buildLevelText(backData, gameData, gameInfo, gameVars);
    const writable = await handle.createWritable();
    await writable.write(text);
    await writable.close();
    return { success: true };
}

// Fallback: trigger a download via an <a> + Blob
async function fallbackFilePickerExport(backData, gameData, gameInfo, gameVars) {
    const text = buildLevelText(backData, gameData, gameInfo, gameVars);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "level.txt";
    document.body.appendChild(a);
    a.click(); // Download file
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true };
}

function buildLevelText(backData, gameData, gameInfo, gameVars) {
    const lines = [];
    let code = "";
    let count = 0;
    let first = true;
    let h = 1;
    let line = "";
    let w = 1;
    let x = -1;
    let y = -1;

    if (gameVars.bgcolor !== null) {
        for (let i = 0; i < gameVars.bgcolor.length; i++) {
            const bg = gameVars.bgcolor[i];
            line = `$bgcolor: ${bg.x}, ${bg.y}, ${bg.w}, ${bg.h}, ${bg.color}`;
            lines.push(line);
        }
    }

    if (gameVars.fgcolor !== null) {
        for (let i = 0; i < gameVars.fgcolor.length; i++) {
            const fg = gameVars.fgcolor[i];
            line = `$fgcolor: ${fg.x}, ${fg.y}, ${fg.w}, ${fg.h}, ${fg.color}`;
            lines.push(line);
        }
    }

    if (gameVars.conveyorBeltCountTo !== 5) {
        line = `$gameticks: conveyorbelt, ${gameVars.conveyorBeltCountTo}`;
        lines.push(line);
    }

    if (gameVars.elevatorCountTo !== 5) {
        line = `$gameticks: elevator, ${gameVars.elevatorCountTo}`;
        lines.push(line);
    }

    if (gameVars.fishCountTo !== 12) {
        line = `$gameticks: fish, ${gameVars.fishCountTo}`;
        lines.push(line);
    }

    if (gameVars.hint !== "") {
        line = `$hint: ${gameVars.hint}`;
        lines.push(line);
    }

    if (gameVars.soundLava !== "default") {
        line = `$sound: 22, ${gameVars.soundLava}`;
        lines.push(line);
    }

    if (gameVars.startlevelmessage !== "") {
        line = `$startlevelmessage: ${gameVars.startlevelmessage}`;
        lines.push(line);
    }

    if (gameInfo.hasCoilSpring) {
        line = `$has: coilspring`;
        lines.push(line);
    }
    if (gameInfo.hasDivingGlasses) {
        line = `$has: divingglasses`;
        lines.push(line);
    }
    if (gameInfo.hasKey) {
        line = `$has: key`;
        lines.push(line);
    }
    if (gameInfo.hasLadder) {
        line = `$has: ladder`;
        lines.push(line);
    }
    if (gameInfo.hasLightBlueBall) {
        line = `$has: lightblueball`;
        lines.push(line);
    }
    if (gameInfo.hasPickaxe) {
        line = `$has: pickaxe`;
        lines.push(line);
    }
    if (gameInfo.hasPropeller) {
        line = `$has: propeller`;
        lines.push(line);
    }
    if (gameInfo.hasPurpleBall) {
        line = `$has: purpleball`;
        lines.push(line);
    }
    if (gameInfo.hasSelfDestructingTeleportsCreator) {
        line = `$has: selfdestructingteleportscreator`;
        lines.push(line);
    }
    if (gameInfo.hasTelekineticPower) {
        line = `$has: telekineticpower`;
        lines.push(line);
    }
    if (gameInfo.hasTeleportsCreator) {
        line = `$has: teleportscreator`;
        lines.push(line);
    }
    if (gameInfo.hasWeakStone) {
        line = `$has: weakstone`;
        lines.push(line);
    }
    if (gameInfo.hasWhiteBall) {
        line = `$has: whiteball`;
        lines.push(line);
    }
    if (gameInfo.hasYellowBall) {
        line = `$has: yellowball`;
        lines.push(line);
    }

    for (let i = 0; i < gameInfo.conveyorBelts.length; i++) {
        const conveyorBelt = gameInfo.conveyorBelts[i];
        if (conveyorBelt.direction !== "right") {
            line = `$direction: ${conveyorBelt.x}, ${conveyorBelt.y}, ${conveyorBelt.direction}`;
            lines.push(line);
        }
        if (conveyorBelt.group > 1) {
            line = `$group: ${conveyorBelt.x}, ${conveyorBelt.y}, ${conveyorBelt.group}`;
            lines.push(line);
        }
        if (conveyorBelt.mode !== "notrigger") {
            line = `$conveyorbeltmode: ${conveyorBelt.x}, ${conveyorBelt.y}, ${conveyorBelt.mode}`;
            lines.push(line);
        }
    }

    for (let i = 0; i < gameInfo.delays.length; i++) {
        const delay = gameInfo.delays[i];
        line = `$gameticksxy: ${delay.x}, ${delay.y}, ${delay.gameTicks}`;
        lines.push(line);
    }

    for (let i = 0; i < gameInfo.movers.length; i++) {
        const mover = gameInfo.movers[i];
        if (mover.direction !== "right") {
            line = `$direction: ${mover.x}, ${mover.y}, ${mover.direction}`;
            lines.push(line);
        }
    }

    for (let i = 0; i < gameInfo.musicBoxes.length; i++) {
        const musicBox = gameInfo.musicBoxes[i];
        if (musicBox.mode !== "note") {
            line = `$musicbox: ${musicBox.x}, ${musicBox.y}, ${musicBox.mode}, ${musicBox.delay}`;
            lines.push(line);
        }
        if (JSON.stringify(musicBox.notes) !== JSON.stringify(["C4"])) {
            line = `$notes: ${musicBox.x}, ${musicBox.y}`;
            count = 0;
            for (let j = 0; j < musicBox.notes.length; j++) {
                count++;
                if (count > 32) {
                    lines.push(line);
                    line = `$addnotes: ${musicBox.x}, ${musicBox.y}`;
                    count = 0;
                }
                line += ", " + musicBox.notes[j];
            }
            lines.push(line);
        }
        if ((musicBox.instrument !== "xylophone") || (musicBox.volume !== 90)) {
            line = `$instrument: ${musicBox.x}, ${musicBox.y}, ${musicBox.instrument}, ${musicBox.volume}`;
            lines.push(line);
        }
        if (musicBox.part !== "bottom") {
            line = `$part: ${musicBox.x}, ${musicBox.y}, ${musicBox.part}`;
            lines.push(line);
        }
        if (musicBox.stepsPerMeasure !== 0) {
            line = `$stepspermeasure: ${musicBox.x}, ${musicBox.y}, ${musicBox.stepsPerMeasure}`;
            lines.push(line);
        }
        if (musicBox.direction !== "up") {
            line = `$direction: ${musicBox.x}, ${musicBox.y}, ${musicBox.direction}`;
            lines.push(line);
        }
        if (musicBox.group > 1) {
            line = `$group: ${musicBox.x}, ${musicBox.y}, ${musicBox.group}`;
            lines.push(line);
        }
    }

    for (let i = 0; i < gameInfo.pistons.length; i++) {
        const piston = gameInfo.pistons[i];
        if (piston.group > 1) {
            line = `$group: ${piston.x}, ${piston.y}, ${piston.group}`;
            lines.push(line);
        }
        if (piston.inverted) {
            line = `$inverted: ${piston.x}, ${piston.y}, yes`;
            lines.push(line);
        }
        if (piston.mode !== "toggle") {
            line = `$pistonmode: ${piston.x}, ${piston.y}, ${piston.mode}`;
            lines.push(line);
        }
        if (piston.sticky) {
            line = `$sticky: ${piston.x}, ${piston.y}, yes`;
            lines.push(line);
        }
    }

    for (let i = 0; i < gameInfo.pistonsTriggers.length; i++) {
        const pistonTriggers = gameInfo.pistonsTriggers[i];
        if (pistonTriggers.group > 1) {
            line = `$group: ${pistonTriggers.x}, ${pistonTriggers.y}, ${pistonTriggers.group}`;
            lines.push(line);
        }
    }

    for (let i = 0; i < gameInfo.teleports.length; i++) {
        const teleport = gameInfo.teleports[i];
        if (teleport.group > 1) {
            line = `$group: ${teleport.x}, ${teleport.y}, ${teleport.group}`;
            lines.push(line);
        }
    }

    first = true;
    h = 1;
    w = 1;
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData[i].length; j++) {
            const gd = gameData[i][j];
            const bd = backData[i][j];
            let gdNext = 0;
            let bdNext = 0;
            if (j < (gameData[i].length - 1)) {
                gdNext = gameData[i][j + 1];
                bdNext = backData[i][j + 1];
            }
            if ((gd !== 0) && (bd !== 0)) {
                if (first) {
                    x = j;
                    y = i;
                }
                first = false;
                if ((bd === bdNext) && (gdNext !== 0)) {
                    w++;
                } else {
                    line = `$background: ${x}, ${y}, ${w}, ${h}, ${bd}`;
                    lines.push(line);
                    first = true;
                    h = 1;
                    w = 1;
                }
            }
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
        lines.push(line);
    }

    return lines.join("\n");
}

export async function importLevel() {
    try {
        if (window.showOpenFilePicker) {
            const [handle] = await window.showOpenFilePicker({
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
                multiple: false,
            });
            return await processHandleImport(handle);
        }

        // For Firefox
        return await fallbackFilePickerImport();
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function fallbackFilePickerImport() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";
        input.style.display = "none";
        document.body.appendChild(input);

        input.addEventListener("change", async () => {
            if (!input.files || input.files.length === 0) {
                cleanup();
                return resolve(null);
            }
            const file = input.files[0];
            // Reset, so there will be always a change event when there is a file selected
            input.value = "";

            try {
                const txt = await file.text();
                const result = parseLevelText(txt);
                cleanup();
                resolve(result);
            } catch (e) {
                cleanup();
                reject(e);
            }
        });

        // Dialog
        input.click();

        function cleanup() {
            document.body.removeChild(input);
        }
    });
}

async function processHandleImport(handle) {
    const file = await handle.getFile();
    if (!file.name.toLowerCase().endsWith(".txt")) {
        throw new Error("Invalid file type. Please select a .txt file.");
    }
    const text = await file.text();
    return parseLevelText(text);
}

function parseLevelText(text) {
    const lines = text.split("\n"),
        levelData = [],
        levelSettings = [];

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith("//")) continue;
        if (line.startsWith("$")) {
            levelSettings.push(line);
        } else {
            levelData.push(line);
        }
    }

    const msg = checkLevel(levelData, levelSettings);
    if (msg !== "") {
        return {
            error: msg
        };
    }

    const gd = stringArrayToNumberArray(levelData, true);
    return {
        backData: gd.backData,
        gameData: gd.gameData,
        levelSettings: levelSettings,
    };
}
