import { setArray } from "./utils";

export function presetUserObject(userObject, preset) {
    switch (preset) {
        case "stretcherbond1":
            userObject.color1 = "#A64B35";
            userObject.color2 = "#C8BBA5";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 1, 0]);
            userObject.shape = 6;
            break;
        case "stretcherbond2":
            userObject.color1 = "#46494B";
            userObject.color2 = "#9B9B95";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 1, 0]);
            userObject.shape = 6;
            break;
        case "flemishbond1":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 2, 0]);
            userObject.shape = 6;
            break;
        case "flemishbond2":
            userObject.color1 = "#984B38";
            userObject.color2 = "#BDB3A1";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 3, 0]);
            userObject.shape = 6;
            break;
        case "englishbond":
            userObject.color1 = "#B66A45";
            userObject.color2 = "#D2C5AD";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 4, 0]);
            userObject.shape = 6;
            break;
        case "headerbond":
            userObject.color1 = "#93604B";
            userObject.color2 = "#B8AA96";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 5, 0]);
            userObject.shape = 6;
            break;
        case "longbricks1":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 6, 0]);
            userObject.shape = 6;
            break;
        case "longbricks2":
            userObject.color1 = "#674638";
            userObject.color2 = "#B5A38D";
            userObject.direction = "top";
            setArray(userObject.parameters, [30, 30, 7, 0]);
            userObject.shape = 6;
            break;
        default:
            break;
    }
}

export function userObjectDirections() {
    return ["left", "right", "up", "down"];
}

export const userObjectShapes = 6;
