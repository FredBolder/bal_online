import { booleanToString, stringToBoolean, tryParseInt } from "./utils.js"

let settings = {
    arrowButtons: true,
    lessQuestions: false,
    music: 50,
    nicerGraphics: true,
    sound: 50,
};

export function getSettings() {
    return settings;
}

export function loadSettings() {
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
    const nicerGraphics = localStorage.getItem("nicerGraphics")
    if (nicerGraphics !== null) {
        settings.nicerGraphics = stringToBoolean(nicerGraphics);
    }
    const sound = localStorage.getItem("sound")
    if (sound !== null) {
        settings.sound = tryParseInt(sound, 50);
    }
}

export function saveSettings() {
    localStorage.setItem("arrowButtons", booleanToString(settings.arrowButtons));
    localStorage.setItem("lessQuestions", booleanToString(settings.lessQuestions));
    localStorage.setItem("music", settings.music.toString());
    localStorage.setItem("nicerGraphics", booleanToString(settings.nicerGraphics));
    localStorage.setItem("sound", settings.sound.toString());
}

export function setSettings(arrowButtons, lessQuestions, music, nicerGraphics, sound) {
    settings.arrowButtons = arrowButtons;
    settings.lessQuestions = lessQuestions;
    settings.music = music;
    settings.nicerGraphics = nicerGraphics;
    settings.sound = sound;
}



