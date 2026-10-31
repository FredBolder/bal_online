export function envelopeValue(startValue, envelope, time) {
    let elapsed = 0;
    let prevValue = startValue;

    for (const curr of envelope) {
        const duration = curr.time;

        if (time <= elapsed + duration) {
            if (duration <= 0) {
                return curr.value;
            }

            const t = Math.max(0, (time - elapsed) / duration);

            if (curr.curveType === "exponential" && prevValue > 0 && curr.value > 0) {
                return prevValue * Math.pow(curr.value / prevValue, t);
            }

            return prevValue + (curr.value - prevValue) * t;
        }

        elapsed += duration;
        prevValue = curr.value;
    }

    return prevValue;
}

export function startEnvelope(target, startTime, startValue, envelope) {
    let time = startTime;
    let prevValue = startValue;

    target.setValueAtTime(startValue, startTime);

    for (const pt of envelope) {
        time += pt.time / 1000;

        if (pt.curveType === "exponential" && prevValue > 0 && pt.value > 0) {
            target.exponentialRampToValueAtTime(pt.value, time);
        } else {
            target.linearRampToValueAtTime(pt.value, time);
        }

        prevValue = pt.value;
    }
}