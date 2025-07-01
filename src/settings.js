import { booleanToString, stringToBoolean } from "./utils.js"

let settings = {
    arrowButtons: true,
    lessQuestions: false,
    music: true,
    nicerGraphics: true,
    sound: true,
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
        settings.music = stringToBoolean(music);
    }
    const nicerGraphics = localStorage.getItem("nicerGraphics")
    if (nicerGraphics !== null) {
        settings.nicerGraphics = stringToBoolean(nicerGraphics);
    }
    const sound = localStorage.getItem("sound")
    if (sound !== null) {
        settings.sound = stringToBoolean(sound);
    }
}

export function saveSettings() {
    localStorage.setItem("arrowButtons", booleanToString(settings.arrowButtons));
    localStorage.setItem("lessQuestions", booleanToString(settings.lessQuestions));
    localStorage.setItem("music", booleanToString(settings.music));
    localStorage.setItem("nicerGraphics", booleanToString(settings.nicerGraphics));
    localStorage.setItem("sound", booleanToString(settings.sound));
}

export function setSettings(arrowButtons, lessQuestions, music, nicerGraphics, sound) {
    settings.arrowButtons = arrowButtons;
    settings.lessQuestions = lessQuestions;
    settings.music = music;
    settings.nicerGraphics = nicerGraphics;
    settings.sound = sound;
}



