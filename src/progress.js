import { getAllLevels, isChroniaPolla } from "./levels.js";
import { reverseString } from "./utils.js";


let initDbPromise = null;
let progressCurrentLevel = 200;
export const solvedLevels = [];

function levelNumberCode(n) {
    let result = 0;
    let s = (n + 2).toString();
    let sum = 0;

    for (let i = 0; i < s.length; i++) {
        sum += parseInt(s[i]);
    }
    sum += 3;
    sum = sum * 3;
    sum -= 2;
    s = reverseString(sum.toString());
    result = parseInt(s) + 1;
    return result;
}

export function initDB() {
    if (initDbPromise) return initDbPromise;

    initDbPromise = (async () => {
        const db = await initProgressDB();
        return db;
    })();

    return initDbPromise;
}

async function initProgressDB(dbName = 'game-db') {
    let firstRun = false;

    // Open once to check current DB and possibly create it if DB doesn't exist
    const openReq = indexedDB.open(dbName);

    openReq.onupgradeneeded = (ev) => {
        // This runs when DB didn't exist or an upgrade is required
        firstRun = true;
        const db = ev.target.result;
        if (!db.objectStoreNames.contains('progress')) {
            db.createObjectStore('progress', { keyPath: 'id' });
        }
    };

    const db = await new Promise((resolve, reject) => {
        openReq.onsuccess = () => resolve(openReq.result);
        openReq.onerror = () => reject(openReq.error);
    });

    // If DB existed (no onupgradeneeded) but store is missing, bump version and create it.
    if (!firstRun && !db.objectStoreNames.contains('progress')) {
        const newVersion = db.version + 1;
        db.close();

        const upgradeReq = indexedDB.open(dbName, newVersion);

        upgradeReq.onupgradeneeded = (ev) => {
            firstRun = true;
            const upgradedDb = ev.target.result;
            if (!upgradedDb.objectStoreNames.contains('progress')) {
                upgradedDb.createObjectStore('progress', { keyPath: 'id' });
            }
        };

        // wait for the upgraded DB
        const upgradedDb = await new Promise((resolve, reject) => {
            upgradeReq.onsuccess = () => resolve(upgradeReq.result);
            upgradeReq.onerror = () => reject(upgradeReq.error);
        });

        // replace db with upgradedDb for return and further use
        return await (async () => {
            // request persistent storage if we created the store now
            if (firstRun && navigator.storage && navigator.storage.persist) {
                try {
                    const already = await navigator.storage.persisted();
                    if (!already) {
                        const granted = await navigator.storage.persist(); // best-effort
                        console.log('persist() granted?', granted);
                    }
                } catch (err) {
                    console.warn('persist() failed', err);
                }
            }
            return upgradedDb;
        })();
    }

    // If we reach here, either the store already existed, or it was just created in the first open.
    if (firstRun && navigator.storage && navigator.storage.persist) {
        try {
            const already = await navigator.storage.persisted();
            if (!already) {
                const granted = await navigator.storage.persist(); // best-effort
                console.log('persist() granted?', granted);
            }
        } catch (err) {
            console.warn('persist() failed', err);
        }
    }

    return db;
}

export async function saveProgress(currentLevel) {
    progressCurrentLevel = currentLevel;
    const solvedLevelsDB = [];
    const solvedLevel = currentLevel - 1;
    if (!isChroniaPolla(solvedLevel) && !solvedLevels.includes(solvedLevel)) {
        solvedLevels.push(solvedLevel);
    }
    for (let i = 0; i < solvedLevels.length; i++) {
        solvedLevelsDB.push(solvedLevels[i]);
        solvedLevelsDB.push(levelNumberCode(solvedLevels[i]));
    }
    const db = await initDB();
    const tx = db.transaction('progress', 'readwrite');

    tx.objectStore('progress').put({ id: 'player1', currentLevel, currentLevelCode: levelNumberCode(currentLevel), solvedLevels: solvedLevelsDB });
    await new Promise((r, e) => { tx.oncomplete = r; tx.onerror = e; });
}

export async function loadProgress(gameVars = null) {
    const db = await initDB();
    const tx = db.transaction('progress', 'readonly');
    const getReq = tx.objectStore('progress').get('player1');
    const result = await new Promise((r, e) => { getReq.onsuccess = () => r(getReq.result); getReq.onerror = e; });
    if (result !== undefined) {
        if (Object.prototype.hasOwnProperty.call(result, "currentLevel") &&
            Object.prototype.hasOwnProperty.call(result, "currentLevelCode")) {
            if (result.currentLevelCode === levelNumberCode(result.currentLevel)) {
                progressCurrentLevel = result.currentLevel;
                if (gameVars !== null) {
                    gameVars.currentLevel = result.currentLevel;
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(result, "solvedLevels")) {
            solvedLevels.length = 0;
            if ((result.solvedLevels.length % 2) === 0) {
                for (let i = 0; i < (result.solvedLevels.length / 2); i++) {
                    const level = result.solvedLevels[i * 2];
                    const code = result.solvedLevels[(i * 2) + 1];
                    if (getAllLevels().includes(level) && (levelNumberCode(level) === code)) {
                        solvedLevels.push(level);
                    }
                }
            }
        }
    }
}

// Export / Import

export function progressLevel() {
    return progressCurrentLevel;
}

export async function exportProgress(currentLevel, solvedLevels) {
    try {
        if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
                suggestedName: "progress.txt",
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
            });
            return await processHandleExport(handle, currentLevel, solvedLevels);
        }

        // For Firefox
        return await fallbackFilePickerExport(currentLevel, solvedLevels);
    } catch (err) {
        console.log(err.message);
        return null;
    }
}

async function processHandleExport(handle, currentLevel, solvedLevels) {
    const text = buildLevelText(currentLevel, solvedLevels);
    const writable = await handle.createWritable();
    await writable.write(text);
    await writable.close();
    return { success: true };
}

// Fallback: trigger a download via an <a> + Blob
async function fallbackFilePickerExport(currentLevel, solvedLevels) {
    const text = buildLevelText(currentLevel, solvedLevels);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "progress.txt";
    document.body.appendChild(a);
    a.click(); // Download file
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return { success: true };
}

function buildLevelText(currentLevel, solvedLevels) {
    const lines = [];
    let line = "";
    const solvedLevelsDB = [];

    line = currentLevel.toString();
    lines.push(line);
    line = levelNumberCode(currentLevel).toString();
    lines.push(line);

    for (let i = 0; i < solvedLevels.length; i++) {
        solvedLevelsDB.push(solvedLevels[i]);
        solvedLevelsDB.push(levelNumberCode(solvedLevels[i]));
    }
    line = JSON.stringify(solvedLevelsDB);
    lines.push(line);

    return lines.join("\n");
}

export async function importProgress() {
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
    let code = 0;
    let level = 200;
    const lines = text.split("\n");
    let solved = null;

    if (lines.length !== 3) { return false }

    level = parseInt(lines[0]);
    code = parseInt(lines[1]);
    if (code === levelNumberCode(level)) {
        progressCurrentLevel = level;
    }
    solved = JSON.parse(lines[2]);
    if ((solved.length % 2) === 0) {
        for (let i = 0; i < (solved.length / 2); i++) {
            level = solved[i * 2];
            code = solved[(i * 2) + 1];
            if (getAllLevels().includes(level) && (levelNumberCode(level) === code) && !solvedLevels.includes(level)) {
                solvedLevels.push(level);
            }
        }
    }
    saveProgress(progressCurrentLevel);
    return true;
}

