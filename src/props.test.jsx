
import { initGameInfo, initGameVars } from "./gameInfo.js";
import { setProp } from "./props.js";
import { beforeEach, describe, it, expect } from "vitest";

describe("levels", () => {
    let defaultGameInfo;
    let defaultGameVars;

    beforeEach(() => {
        defaultGameInfo = {};
        initGameInfo(defaultGameInfo);
        defaultGameVars = {};
        initGameVars(defaultGameVars);
    });

    it("setProp A", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            detectors: [
                {
                    x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                    display: "default", activated: false, activatedCount: 0, sequence: false, movable: true, condition: "", text: "", group: 1
                }
            ]
        };
        const gameData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 255, 1, 1, 1, 1, 1, 1],
        ];
        let msg = setProp(gameData, gameInfo, 2, 5, "movable", false, true);
        expect(msg).toBe("");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
            }
        ]);
        msg = setProp(gameData, gameInfo, 3, 5, "movable", true, true);
        expect(msg).toBe("Property movable does not exist on object.");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
            }
        ]);
        msg = setProp(gameData, gameInfo, 2, 5, "mode", "fred", true);
        expect(msg).toBe("Invalid value fred for detector property mode");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
            }
        ]);
        msg = setProp(gameData, gameInfo, 2, 5, "group", 900, true);
        expect(msg).toBe("Invalid value 900 for detector property group");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 1
            }
        ]);
        msg = setProp(gameData, gameInfo, 2, 5, "group", 32, true);
        expect(msg).toBe("");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 32
            }
        ]);
        msg = setProp(gameData, gameInfo, 3, 5, "group", 16, true);
        expect(msg).toBe("Property group does not exist on object.");
        expect(gameInfo.detectors).toEqual([
            {
                x: 2, y: 5, mode: "all", oneTime: false, activeSides: ["top"], range: 1, target: "group", value: "",
                display: "default", activated: false, activatedCount: 0, sequence: false, movable: false, condition: "", text: "", group: 32
            }
        ]);
    });

    it("setProp B", () => {
        const gameInfo = {
            ...defaultGameInfo,
            blueBall: { x: 2, y: 4 },
            greenBalls: 1,
            elevators: [
                { x: 3, y: 3, up: false, hasBlueBall: false }
            ],
            horizontalElevators: [
                { x: 6, y: 2, right: false, hasBlueBall: false }
            ]
        };
        const gameData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 6, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        let msg = setProp(gameData, gameInfo, 3, 3, "direction", "up", true);
        expect(msg).toBe("");
        expect(gameInfo.elevators).toEqual([
            { x: 3, y: 3, up: true, hasBlueBall: false }
        ]);
        expect(gameData).toEqual([
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 7, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]);
        msg = setProp(gameData, gameInfo, 6, 2, "direction", "right", true);
        expect(msg).toBe("");
        expect(gameInfo.horizontalElevators).toEqual([
            { x: 6, y: 2, right: true, hasBlueBall: false }
        ]);
        expect(gameData).toEqual([
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 107, 0, 1],
            [1, 0, 0, 106, 0, 0, 0, 0, 1],
            [1, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]);
        msg = setProp(gameData, gameInfo, 6, 2, "direction", "up", true);
        expect(msg).toBe("Invalid value up for horizontal elevator property direction");
        expect(gameInfo.horizontalElevators).toEqual([
            { x: 6, y: 2, right: true, hasBlueBall: false }
        ]);
    });


    // Insert new tests here
});

