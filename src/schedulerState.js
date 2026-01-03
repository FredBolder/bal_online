let schedulersRunning = false;
let stopGameClock = null;
let stopRenderLoop = null;

export function areSchedulersRunning() {
    return schedulersRunning;
}

export function startSchedulers(
    audioCtx,
    startGameClock,
    startRenderLoop,
    runMusicScheduler,
    runGameScheduler,
    schedulerTime
) {
    if (schedulersRunning) {
        return;
    }

    stopSchedulers();

    stopGameClock = startGameClock(
        audioCtx,
        runMusicScheduler,
        schedulerTime()
    );
    stopRenderLoop = startRenderLoop(
        audioCtx,
        runGameScheduler,
        schedulerTime()
    );

    schedulersRunning = true;
}

export function stopSchedulers() {
    if (!schedulersRunning) {
        return;
    }

    if (stopGameClock) stopGameClock();
    if (stopRenderLoop) stopRenderLoop();

    stopGameClock = null;
    stopRenderLoop = null;
    schedulersRunning = false;
}
