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
        console.warn("Schedulers already running");
        return;
    }

    // stop defensively
    stopSchedulers();

    console.log("Schedulers started");

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
        console.warn("Schedulers already stopped");
        return;
    }

    console.log("Schedulers stopped");

    if (stopGameClock) stopGameClock();
    if (stopRenderLoop) stopRenderLoop();

    stopGameClock = null;
    stopRenderLoop = null;
    schedulersRunning = false;
}
