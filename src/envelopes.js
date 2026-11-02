import { getSettings } from "./settings.js";

export function changeZero(n) {
    return (n === 0) ? 0.0001 : n;
}

export function envelopeDuration(envelope) {
    let time = 0;

    for (const pt of envelope) {
        time += pt.time;
    }
    return time;
}

export function envelopeValue(target, startValue, envelope, time) {
    let elapsed = 0;
    let prevValue = startValue;

    if (getSettings().useBrowserAudioValues) {
        return target.value;
    }

    for (const pt of envelope) {
        const duration = pt.time;
        const value = changeZero(pt.value);

        if (duration <= 0) {
            if (time >= elapsed) {
                prevValue = value;
            }
            continue;
        }

        if (time < elapsed + duration) {
            const t = Math.max(0, (time - elapsed) / duration);

            if (pt.curveType === "exponential" && prevValue > 0 && value > 0) {
                return prevValue * Math.pow(value / prevValue, t);
            }

            return prevValue + (value - prevValue) * t;
        }

        elapsed += duration;
        prevValue = value;
    }

    return prevValue;
}


export function startEnvelope(target, startTime, startValue, envelope) {
    let time = startTime;
    let prevValue = startValue;

    target.setValueAtTime(startValue, startTime);

    for (const pt of envelope) {
        time += pt.time / 1000;
        const value = changeZero(pt.value);

        if (pt.curveType === "exponential" && prevValue > 0 && value > 0) {
            target.exponentialRampToValueAtTime(value, time);
        } else {
            target.linearRampToValueAtTime(value, time);
        }

        prevValue = value;
    }
}