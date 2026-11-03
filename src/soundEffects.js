import { Operator } from "./operator.js";

export function createExplosion(context, variation = 0) {
    const { audioCtx, maxVolume, operators } = context;
    let brownNoiseDecay = 2000;
    let brownNoiseFreq = 300;
    let brownNoiseRelease = 500;
    let lfoAmount = 0.3;
    let lfoDelay = 250;
    let lfoFreq = 4;
    let whiteNoiseDecay = 40;
    let whiteNoiseFreq = 1500;
    let whiteNoiseRelease = 10;

    switch (variation) {
        case 1:
            brownNoiseDecay = 1800;
            brownNoiseFreq = 500;
            brownNoiseRelease = 500;
            lfoAmount = 0.25;
            lfoDelay = 300;
            lfoFreq = 5;
            whiteNoiseDecay = 35;
            whiteNoiseFreq = 1700;
            whiteNoiseRelease = 10;
            break;
        default:
            break;
    }
    operators.push(new Operator(audioCtx, "brownNoiseAndLPF", brownNoiseFreq, 0, maxVolume, 0, brownNoiseDecay, 0, brownNoiseRelease));
    operators[0].setWaveShaper(5, 65, 1);
    operators[0].setLfo("dca", "sine", lfoFreq, lfoAmount, lfoDelay);

    operators.push(new Operator(audioCtx, "noiseAndLPF", whiteNoiseFreq, 0, maxVolume, 0, whiteNoiseDecay, 0, whiteNoiseRelease));
}

export function createLaserGun(context, variation = 0) {
    const { audioCtx, filter1, maxVolume, operators } = context;
    let ampDecay = 180;
    let ampRelease = 60;
    let filterDecay = 120;
    let filterRelease = 40;
    let oscFreq = 120;
    let pitchDecay = 180;
    let pitchStart = 4252.8;
    let waveform = "sawtooth";

    switch (variation) {
        case 1:
            ampDecay = 350;
            ampRelease = 100;
            filterDecay = 300;
            filterRelease = 85;
            oscFreq = 60;
            pitchDecay = 350;
            pitchStart = 4252.8;
            break;
        case 2:
            ampDecay = 250;
            ampRelease = 80;
            filterDecay = 250;
            filterRelease = 80;
            oscFreq = 200;
            pitchDecay = 250;
            pitchStart = 2786.4;
            break;
        default:
            break;
    }
    operators.push(new Operator(audioCtx, waveform, oscFreq, 0, maxVolume * 1, 2, ampDecay, 0, ampRelease));
    operators[0].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[0].setReleasePitchEnvelope(pitchDecay, 0);
    operators[0].setLfo("dco", "sine", 35, 35 / 1200, 0);
    filter1.setFilter("lowpass", 5000, 48);
    filter1.setSimpleFilterEnvelope(5000, filterDecay, 500);
    filter1.setReleaseFilterEnvelope(filterRelease, 500);
}

export function createSqueakyDoor(context) {
    const { audioCtx, filter1, maxVolume, operators } = context;
    let ampAttack = 30;
    let ampDecay = 1200;
    let ampRelease = 300;

    let filterDecay = 1200;
    let filterRelease = 200;

    let oscFreq = 280;
    let pitchDecay = 1000;
    let pitchStart = 180;

    operators.push(new Operator(audioCtx, "sine", oscFreq, 0, maxVolume * 0.8, ampAttack, ampDecay, 0, ampRelease));
    operators[0].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[0].setReleasePitchEnvelope(pitchDecay, 0);

    operators.push(new Operator(audioCtx, "sawtooth", oscFreq, 0, maxVolume * 0.25, ampAttack, ampDecay, 0, ampRelease));
    operators[1].setSimplePitchEnvelope(pitchStart, pitchDecay, 0);
    operators[1].setReleasePitchEnvelope(pitchDecay, 0);

    filter1.setFilter("lowpass", 1800, 81);
    filter1.setSimpleFilterEnvelope(1800, filterDecay, 400);
    filter1.setReleaseFilterEnvelope(filterRelease, 400);

    operators[0].setLfo("dca", "square", 12, 0.8, 0);
    operators[1].setLfo("dca", "square", 12, 0.8, 0);
}

