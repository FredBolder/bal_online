import { stringToCode } from "./codes.js";
import { globalVars } from "./glob.js";
import { booleanToString, stringToBoolean, tryParseInt } from "./utils.js"

export const settings = {
    arrowButtons: true,
    lessQuestions: false,
    music: 50,
    sound: 50,
    user: "",
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
        const user = localStorage.getItem("user")
        if (user !== null) {
            settings.user = user;
            const p = settings.user.indexOf(",");
            if (p >= 0) {
                const s1 = settings.user.slice(0, p).trim();
                const s2 = settings.user.slice(p + 1).trim();
                if ((s1.length >= 3) && (s2.length > 0) && (s2 === stringToCode(s1))) {
                    globalVars.userP = true;
                }
            }
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
        localStorage.setItem("user", settings.user);
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



