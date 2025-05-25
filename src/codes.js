function LetterToNumberChar(n) {
    switch (n) {
        case "I":
            return "0";
        case "R":
            return "1";
        case "W":
            return "2";
        case "E":
            return "3";
        case "P":
            return "4";
        case "T":
            return "5";
        case "A":
            return "6";
        case "C":
            return "7";
        case "S":
            return "8";
        case "U":
            return "9";
        default:
            return "?";
    }
}

export function codeToNumber(code) {
    let extraChar = "";
    let s = "";
    let sum = 0;
    let result = -1;
    if (code.length === 4) {
        extraChar = code[3];
        s = LetterToNumberChar(code[1]) + LetterToNumberChar(code[2]) + LetterToNumberChar(code[0]);
        if (!s.includes("?")) {
            sum = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2])) % 10;
            if (sum === parseInt(LetterToNumberChar(extraChar))) {
                result = parseInt(s) - 2;
            }
        }
    }
    return result;
}

export function numberToCode(n) {
    // n = 1-997
    let extraChar = "";
    let sum = 0;
    let s = (n + 2).toString();
    while (s.length < 3) {
        s = "0" + s;
    }
    sum = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2])) % 10;
    extraChar = numberCharToLetter(sum.toString());
    s = numberCharToLetter(s[2]) + numberCharToLetter(s[0]) + numberCharToLetter(s[1]) + extraChar;
    return s;
}

function numberCharToLetter(n) {
    switch (n) {
        case "0":
            return "I";
        case "1":
            return "R";
        case "2":
            return "W";
        case "3":
            return "E";
        case "4":
            return "P";
        case "5":
            return "T";
        case "6":
            return "A";
        case "7":
            return "C";
        case "8":
            return "S";
        case "9":
            return "U";
        default:
            return "?";
    }
}