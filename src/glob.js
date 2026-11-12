export const globalVars = {
    balPageLoading: false,
    bravuraLoaded: false,
    bravuraLoading: null,
    clickedLevel: -1,
    createLevel: false,
    createLevelBallsPage: 1,
    createLevelColorPage: 1,
    createLevelDetectorPage: 1,
    createLevelEditMode: false,
    createLevelMenuPage: 1,
    createLevelStonesPage: 1,
    createLevelWaterPage: 1,
    createLevelZoom: 0,
    debug: false,
    elapsedSeconds: 0,
    elapsedMinutes: 0,
    input: "",
    instrumentInstances: [],
    isInOtherWorld: false,
    loading: true,
    otherWorldGreen: -1,
    playedNotes: ["", "", "", "", "", "", "", "", "" , "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    reading: false,
    startTime: null,
    patternImg01: null,
    patternImg02: null,
    patternImg03: null,
    patternImg04: null,
    patternImg05: null,
    patternImg06: null,
    patternImg07: null,
    patternImg08: null,
    patternImg09: null,
    patternImg10: null,
    thisWorldGreen: -1,
    uf: false,  // TODO: Set to false when publishing
    up: false  // TODO: Set to false when publishing
}

export function resetTime() {
    globalVars.startTime = performance.now();
}
