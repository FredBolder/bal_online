export const globalVars = {
    createLevelColorPage: 1,
    createLevelMenuPage: 1,
    isInOtherWorld: false,
    loading: true,
    otherWorldGreen: -1,
    playedNotes: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    thisWorldGreen: -1
}

export function clearPlayedNotes() {
    for (let i = 0; i < 32; i++) {
        globalVars.playedNotes[i] = "";
    }
}