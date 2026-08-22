import { zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { readFileSync } from "fs";
import { beforeEach, describe, it, expect } from "vitest";
import { checkLevel, loadLevelSettings, seriesEasy1Start, seriesEasy1End, seriesEasy2Start, seriesEasy2End } from "./levels.js";

describe("levels", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    const backData = zeroArray(20, 20); // bigger array, so it can be used for all

    it("checkLevel A info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("");
    });

    it("checkLevel B info", () => {
        const data = [
            "1111111111",
            "1        1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("There is no small green ball.\n");
    });

    it("checkLevel C info", () => {
        const data = [
            "1111111111",
            "1        1",
            "1        1",
            "1        1",
            "1  4     1",
            "1111111111"
        ];
        const settings = [];
        const info = checkLevel(data, settings);
        expect(info).toBe("There is no blue ball (player).\nThere is no small green ball.\n");
    });

    it("checkLevel D info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1  2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast"];
        const info = checkLevel(data, settings);
        expect(info).toBe("Setting 1: No piston found at the coordinates 1, 4.\n");
    });

    it("checkLevel E info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1Ù 2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 2"];
        const info = checkLevel(data, settings);
        expect(info).toBe("");
    });

    it("checkLevel F info", () => {
        const data = [
            "1111111111",
            "13       1",
            "1        1",
            "1        1",
            "1Ù 2     1",
            "1111111111"
        ];
        const settings = ["$pistonmode: 1, 4, repeatfast", "$group: 1, 4, 1000"];
        const info = checkLevel(data, settings);
        expect(info).toBe("Setting 2: Invalid value 1000 for group.\n");
    });

    it("loadLevelSettings A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            detectors: [
                { x: 1, y: 4, mode: "all", oneTime: false, activeSides: ["top"], target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 1 },
                { x: 4, y: 5, mode: "all", oneTime: false, activeSides: ["top"], target: "group", value: "", display: "default", activated: false, activatedCount: 0, group: 1 }
            ],
            greenBalls: 1,
            movers: [
                { x: 5, y: 2, direction: "right", activeSides: ["top"], mode: "all", inverted: false, counter: 0 }
            ],
            pistons: [
                { x: 8, y: 4, activated: false, sticky: false, inverted: false, direction: "up", mode: "toggle", group: 1 }
            ],
            pushers: [
                { x: 6, y: 4, direction: "right", group: 1 }
            ],
        }
        const data = [
            "1111111111",
            "13       1",
            "1    η   1",
            "1        1",
            "1ђ 2  њ Ù1",
            "1111ђ11111"
        ];
        const settings = [
            "$detectormode: 1, 4, yellowball", "$activeSides: 1, 4, bottom", "$group: 1, 4, 3", "$display: 1, 4, stone",
            "$detectormode: 4, 5, whiteball", "$target: 4, 5, setting", "$value: 4, 5, $message: White ball detected",
            "$movermode: 5, 2, purpleball", "$activeSides: 5, 2, left, right", "$direction: 5, 2, up", "$inverted: 5, 2, yes",
            "$pistonmode: 8, 4, momentary", "$sticky: 8, 4, yes", "$group: 8, 4, 10", "$inverted: 8, 4, yes",
            "$direction: 6, 4, left", "$group: 6, 4, 5"
        ];
        loadLevelSettings(backData, data, gameInfo, { ...defaultGameVars }, settings, true)
        expect(gameInfo.detectors).toEqual([
            { x: 1, y: 4, mode: "yellowball", oneTime: false, activeSides: ["bottom"], target: "group", value: "", display: "stone", activated: false, activatedCount: 0, group: 3 },
            { x: 4, y: 5, mode: "whiteball", oneTime: false, activeSides: ["top"], target: "setting", value: "$message: White ball detected", display: "default", activated: false, activatedCount: 0, group: 1 }
        ]);
        expect(gameInfo.movers).toEqual([
            { x: 5, y: 2, direction: "up", activeSides: ["left", "right"], mode: "purpleball", inverted: true, counter: 0 }
        ]);
        expect(gameInfo.pistons).toEqual([
            { x: 8, y: 4, activated: false, sticky: true, inverted: true, direction: "up", mode: "momentary", group: 10 }
        ]);
        expect(gameInfo.pushers).toEqual([
            { x: 6, y: 4, direction: "left", group: 5 }
        ]);
    });

    it("loadLevelSettings B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 3, y: 4 },
            conveyorBelts: [
                { x: 3, y: 2, mode: "notrigger", direction: "right", group: 1 }
            ],
            greenBalls: 1,
            pistonsTriggers: [
                { x: 6, y: 4, pressed: false, group: 1 }
            ]
        }
        const data = [
            "1111111111",
            "13  4    1",
            "1  {ØØ}  1",
            "1        1",
            "1  2  m  1",
            "1111111111"
        ];
        const settings = [
            "$conveyorbeltmode: 3, 2, noneright", "$direction: 3, 2, none", "$group: 3, 2, 3", "$display: 3, 2, stone",
            "$group: 6, 4, 3"
        ];
        loadLevelSettings(backData, data, gameInfo, { ...defaultGameVars }, settings, true)
        expect(gameInfo.conveyorBelts).toEqual([
            { x: 3, y: 2, mode: "noneright", direction: "none", group: 3 },
        ]);
        expect(gameInfo.pistonsTriggers).toEqual([
            { x: 6, y: 4, pressed: false, group: 3 }
        ]);
    });

    it("Hints in all easy levels", () => {
        const levels = [];
        const missing = [];
        for (let i = seriesEasy1Start; i <= seriesEasy1End; i++) {
            levels.push(i);
        }
        for (let i = seriesEasy2Start; i <= seriesEasy2End; i++) {
            levels.push(i);
        }
        for (let i = 0; i < levels.length; i++) {
            const filePath = `Public/Levels/${levels[i]}.dat`;
            const text = readFileSync(filePath, "utf8");
            const found = text.includes("$hint:");
            if (!found) {
                missing.push(levels[i]);
            }
        }
        expect(missing).toEqual([]);
    });

    // Insert new tests here
});