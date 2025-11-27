import { beforeEach, describe, it, expect } from "vitest";
import { jump, moveLeft, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkMusicBoxes, clearPlayedNotes } from "./musicBoxes.js";
import { gameScheduler } from "./scheduler.js";

describe("music boxes", () => {
    let defaultGameInfo;
    let defaultGameVars;
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

    it("plays the melody step-by-step", async () => {
        clearPlayedNotes();
        const inputBack01_5_13 = zeroArray(5, 15);
        const gameInfo01a = {
            ...defaultGameInfo,
            blueBall1: { x: 5, y: 4 },
            blueBall: null,
            musicBoxes: [
                {
                    x: 1, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["C4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 2, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["D4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 3, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["E4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 4, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["F4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 5, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 6, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["A4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 7, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["B4"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 8, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["C5"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 10, y: 4, instrument: "xylophone", volume: 90, mode: "door", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4", "E4", "C4", "-"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 12, y: 4, instrument: "xylophone", volume: 90, mode: "door", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4", "E4", "C4", "-"], noteIndex: 0, noteOverride: "none", tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
            ]
        };
        gameInfo01a.blueBall = gameInfo01a.blueBall1;

        const input01a = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 157, 157, 157, 157, 157, 157, 157, 157, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 3, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 157, 0, 157, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        const flushPromises = () => new Promise(r => setTimeout(r, 0));

        // Check doors before playing the right melody
        expect(input01a[4][10]).toBe(157);
        expect(input01a[4][12]).toBe(157);
        // Play G4
        const info01a1 = jump(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a1.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        // Move two steps to the left
        const info01a2 = moveLeft(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a2.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        const info01a3 = moveLeft(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a3.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        // Check doors after playing one note
        expect(input01a[4][10]).toBe(157);
        expect(input01a[4][12]).toBe(157);
        // Play E4
        const info01a4 = jump(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a4.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        // Move two steps to the left
        const info01a5 = moveLeft(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a5.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        const info01a6 = moveLeft(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a6.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        // Check doors after playing two notes
        expect(input01a[4][10]).toBe(157);
        expect(input01a[4][12]).toBe(157);
        // Play C4
        const info01a7 = jump(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        expect(info01a7.player).toBe(true);
        checkMusicBoxes(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await gameScheduler(inputBack01_5_13, input01a, gameInfo01a, defaultGameVars);
        await flushPromises();
        // Check doors after playing the right melody
        expect(input01a[4][10]).toBe(0);
        expect(input01a[4][12]).toBe(0);
    });

    // Insert new tests here
});