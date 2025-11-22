function addSwappedNotes(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        arr.push([arr[i][1], arr[i][0]]);
    }
}

export function intervalMajor2() {
    const arr = [
        ["C4", "D4"],
        ["C#4", "D#4"],
        ["D4", "E4"],
        ["Eb4", "F4"],
        ["E4", "F#4"],
        ["F4", "G4"],
        ["F#4", "G#4"],
        ["G4", "A4"],
        ["G#4", "A#4"],
        ["A4", "B4"],
        ["Bb4", "C5"],
        ["B4", "C#5"],
    ];
    addSwappedNotes(arr);
    return arr;
}

export function intervalMajor3() {
    const arr = [
        ["C4", "E4"],
        ["C#4", "F4"],
        ["D4", "F#4"],
        ["Eb4", "G4"],
        ["E4", "G#4"],
        ["F4", "A4"],
        ["F#4", "A#4"],
        ["G4", "B4"],
        ["G#4", "C5"],
        ["A4", "C#5"],
        ["Bb4", "D5"],
        ["B4", "D#5"],
    ];
    addSwappedNotes(arr);
    return arr;
}

export function intervalMinor3() {
    const arr = [
        ["C4", "Eb4"],
        ["C#4", "E4"],
        ["D4", "F4"],
        ["Eb4", "Gb4"],
        ["E4", "G4"],
        ["F4", "Ab4"],
        ["F#4", "A4"],
        ["G4", "Bb4"],
        ["G#4", "B4"],
        ["A4", "C5"],
        ["Bb4", "Db5"],
        ["B4", "D5"],
    ];
    addSwappedNotes(arr);
    return arr;
}

export function intervalP4() {
    const arr = [
        ["C4", "F4"],
        ["C#4", "F#4"],
        ["D4", "G4"],
        ["Eb4", "Ab4"],
        ["E4", "A4"],
        ["F4", "Bb4"],
        ["F#4", "B4"],
        ["G4", "C5"],
        ["G#4", "C#5"],
        ["A4", "D5"],
        ["Bb4", "Eb5"],
        ["B4", "E5"],
    ];
    addSwappedNotes(arr);
    return arr;
}

export function intervalP5() {
    const arr = [
        ["C4", "G4"],
        ["C#4", "G#4"],
        ["D4", "A4"],
        ["Eb4", "Bb4"],
        ["E4", "B4"],
        ["F4", "C5"],
        ["F#4", "C#5"],
        ["G4", "D5"],
        ["G#4", "D#5"],
        ["A4", "E5"],
        ["Bb4", "F5"],
        ["B4", "F#5"],
    ];
    addSwappedNotes(arr);
    return arr;
}

export function intervalP8() {
    const arr = [
        ["C4", "C5"],
        ["C#4", "C#5"],
        ["D4", "D5"],
        ["Eb4", "Eb5"],
        ["E4", "E5"],
        ["F4", "F5"],
        ["F#4", "F#5"],
        ["G4", "G5"],
        ["G#4", "G#5"],
        ["A3", "A4"],
        ["Bb3", "Bb4"],
        ["B3", "B4"],
    ];
    addSwappedNotes(arr);
    return arr;
}