import { getSecretStart } from "./levels.js";
import { reverseString } from "./utils.js";

export function getFredCode() {
    const minutes = new Date().getMinutes().toString();
    return `${reverseString("bhgf")}${minutes}!`;
}

function LetterToNumberChar(letter) {
    let result = { secret: false, char: "?" };

    const letters = "IRWEPTACSUFKGDMBJHNL";
    let idx = letters.indexOf(letter);
    if (idx > 9) {
        result.secret = true;
        idx = idx - 10;
    }
    if (idx >= 0) {
        result.char = idx.toString();
    } else {
        result.char = "?";
    }
    return result;
}

export function codeToNumber(code) {
    let nc1 = null;
    let nc2 = null;
    let nc3 = null;
    let nc4 = null;
    let nc5 = null;
    let s = "";
    let sum = 0;
    let result = -1;
    if (code.length === 5) {
        nc1 = LetterToNumberChar(code[1]);
        nc2 = LetterToNumberChar(code[2]);
        nc3 = LetterToNumberChar(code[0]);
        nc4 = LetterToNumberChar(code[3]);
        nc5 = LetterToNumberChar(code[4]); // Extra char (sum)
        s = nc1.char + nc2.char + nc3.char + nc4.char;
        if (!s.includes("?") && (nc5.char !== "?")) {
            sum = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2]) + parseInt(s[3])) % 10;
            if (sum === parseInt(nc5.char)) {
                result = parseInt(s) - 2;
            }
        }
        if ((result >= getSecretStart()) && (!nc1.secret || !nc2.secret || !nc3.secret || !nc4.secret || !nc5.secret)) {
            result = -1;
        }
    }
    return result;
}

export function numberToCode(n) {
    // n = 1-9997
    let extraChar = "";
    const secretSeries = (n >= getSecretStart());
    let sum = 0;
    let s = (n + 2).toString();
    while (s.length < 4) {
        s = "0" + s;
    }
    sum = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2]) + parseInt(s[3])) % 10;
    extraChar = numberCharToLetter(sum.toString(), secretSeries);
    s = numberCharToLetter(s[2], secretSeries) + numberCharToLetter(s[0], secretSeries) + numberCharToLetter(s[1], secretSeries) + numberCharToLetter(s[3], secretSeries) + extraChar;
    return s;
}

function numberCharToLetter(n, secretSeries = false) {
    if (secretSeries) {
        switch (n) {
            case "0":
                return "F";
            case "1":
                return "K";
            case "2":
                return "G";
            case "3":
                return "D";
            case "4":
                return "M";
            case "5":
                return "B";
            case "6":
                return "J";
            case "7":
                return "H";
            case "8":
                return "N";
            case "9":
                return "L";
            default:
                return "?";
        }
    } else {
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
}

export function secretSeriesCodePart(n) {
    // n = 1-3
    let extraChar = "";
    let sum = 0;
    let s = ((n + 1) * 53).toString();
    while (s.length < 3) {
        s = "0" + s;
    }
    sum = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2])) % 10;
    extraChar = numberCharToLetter(sum.toString(), true);
    s = numberCharToLetter(s[2], true) + numberCharToLetter(s[0], true) + numberCharToLetter(s[1], true) + extraChar;
    return s;
}

export function stringToCode(str) {
    let n = 0;
    let s = "";

    if (str.length < 3) {
        return s;
    }
    for (let i = 0; i < str.length; i++) {
        n += str.charCodeAt(i);
    }
    if (n % 2 === 0) {
        n += 10;
    } else {
        n += 20;
    }
    n = n % 256;
    s += n.toString(); 
    if (n > 200) {
        s += "r";
    } else if (n > 150) {
        s += "T";
    } else if (n > 100) {
        s += "c";
    } else if (n > 50) {
        s += "B";
    } else {
        s += "k";
    }
    if (s.length % 2 === 0) {
        s += "q";
    } else {
        s += "W";
    }
    s += str[1].toUpperCase();
    n = 0;
    for (let i = 0; i < s.length; i++) {
        n += s.charCodeAt(i);
    }
    if (n % 2 === 0) {
        n += 5;
    } else {
        n += 7;
    }
    n = n % 256;
    s += reverseString(n.toString()); 
    if (n > 111) {
        s += "6";
    } else {
        s += "3";
    }
    return s;
}
