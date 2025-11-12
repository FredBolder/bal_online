import { booleanToString, stringToBoolean, tryParseInt } from "./utils.js"

let settings = {
    arrowButtons: true,
    lessQuestions: false,
    music: 50,
    sound: 50,
};

export function getSettings() {
    return settings;
}

export function loadSettings() {
    try {
        const arrowButtons = localStorage.getItem("arrowButtons")
        if (arrowButtons !== null) {
            settings.arrowButtons = stringToBoolean(arrowButtons);
        }
        const lessQuestions = localStorage.getItem("lessQuestions")
        if (lessQuestions !== null) {
            settings.lessQuestions = stringToBoolean(lessQuestions);
        }
        const music = localStorage.getItem("music")
        if (music !== null) {
            settings.music = tryParseInt(music, 50);
        }
        const sound = localStorage.getItem("sound")
        if (sound !== null) {
            settings.sound = tryParseInt(sound, 50);
        }
    } catch (error) {
        console.log("Local storage is not available yet for loadSettings");
    }
}

export function saveSettings() {
    try {
        localStorage.setItem("arrowButtons", booleanToString(settings.arrowButtons));
        localStorage.setItem("lessQuestions", booleanToString(settings.lessQuestions));
        localStorage.setItem("music", settings.music.toString());
        localStorage.setItem("sound", settings.sound.toString());
    } catch (error) {
        console.log("Local storage is not available yet for saveSettings");
    }
}

export function setSettings(arrowButtons, lessQuestions, music, sound) {
    settings.arrowButtons = arrowButtons;
    settings.lessQuestions = lessQuestions;
    settings.music = music;
    settings.sound = sound;
}



