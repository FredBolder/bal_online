import { beforeEach, describe, it, expect } from "vitest";
import { jump, moveLeft, zeroArray } from "./balUtils.js";
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { checkMusicBoxes, clearPlayedNotes } from "./musicBoxes.js";
import { gameScheduler } from "./scheduler.js";

describe("music boxes", () => {
    let defaultGameInfo;
    let defaultGameVars;
    const inputBack = zeroArray(6, 15);
 
    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });    

    it("plays the melody step-by-step", async () => {
        clearPlayedNotes();
        const gameinfo = {
            ...defaultGameInfo,
            blueBall1: { x: 5, y: 4 },
            blueBall: null,
            musicBoxes: [
                {
                    x: 1, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["C4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 2, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["D4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 3, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["E4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 4, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["F4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 5, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 6, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["A4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 7, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["B4"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 8, y: 2, instrument: "xylophone", volume: 90, mode: "keyboard", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["C5"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 10, y: 4, instrument: "xylophone", volume: 90, mode: "door", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4", "E4", "C4", "-"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
                {
                    x: 12, y: 4, instrument: "xylophone", volume: 90, mode: "door", active: false, ended: false,
                    delay: 5, delayCounter: 0, notes: ["G4", "E4", "C4", "-"], noteIndex: 0, noteOverride: "none", octaves: 1, tripletStart: -1, part: "bottom", stepsPerMeasure: 0,
                    onOne: false, chordTypeOrInterval: "?", chordsPlaced: false, direction: "up", group: 1
                },
            ]
        };
        gameinfo.blueBall = gameinfo.blueBall1;

        const input = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 157, 157, 157, 157, 157, 157, 157, 157, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 3, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 157, 0, 157, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        const flushPromises = () => new Promise(r => setTimeout(r, 0));

        // Check doors before playing the right melody
        expect(input[4][10]).toBe(157);
        expect(input[4][12]).toBe(157);
        // Play G4
        const info1 = jump(inputBack, input, gameinfo, defaultGameVars);
        expect(info1.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        // Move two steps to the left
        const info2 = moveLeft(inputBack, input, gameinfo, defaultGameVars);
        expect(info2.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        const info3 = moveLeft(inputBack, input, gameinfo, defaultGameVars);
        expect(info3.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        // Check doors after playing one note
        expect(input[4][10]).toBe(157);
        expect(input[4][12]).toBe(157);
        // Play E4
        const info4 = jump(inputBack, input, gameinfo, defaultGameVars);
        expect(info4.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        // Move two steps to the left
        const info5 = moveLeft(inputBack, input, gameinfo, defaultGameVars);
        expect(info5.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        const info6 = moveLeft(inputBack, input, gameinfo, defaultGameVars);
        expect(info6.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        // Check doors after playing two notes
        expect(input[4][10]).toBe(157);
        expect(input[4][12]).toBe(157);
        // Play C4
        const info7 = jump(inputBack, input, gameinfo, defaultGameVars);
        expect(info7.player).toBe(true);
        checkMusicBoxes(inputBack, input, gameinfo, defaultGameVars);
        await gameScheduler(inputBack, input, gameinfo, defaultGameVars);
        await flushPromises();
        // Check doors after playing the right melody
        expect(input[4][10]).toBe(0);
        expect(input[4][12]).toBe(0);
    });

    // Insert new tests here
});