import { booleanToString, stringToBoolean } from "./utils.js"

let settings = {
    sound: true,
    nicerGraphics: true,
    lessQuestions: false,
    arrowButtons: true,
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
    localStorage.setItem("nicerGraphics", booleanToString(settings.nicerGraphics));
    localStorage.setItem("sound", booleanToString(settings.sound));
}

export function setSettings(arrowButtons, lessQuestions, nicerGraphics, sound) {
    settings.arrowButtons = arrowButtons;
    settings.lessQuestions = lessQuestions;
    settings.nicerGraphics = nicerGraphics;
    settings.sound = sound;
}



