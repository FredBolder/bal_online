export function setProp(gameInfo, x, y, prop, value, oneSelected) {
    let found = false;
    let msg = "";
    let objectsStr = "";
    const lists = [];
    const objects = [];

    if (["display", "group", "movable", "mode", "oneTime", "range", "sequence", "target", "text", "value"].includes(prop)) {
        lists.push("detectors");
        objects.push("detector");
    }

    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        for (let j = 0; j < gameInfo[list].length; j++) {
            const obj = gameInfo[list][j];
            if (obj.x === x && obj.y === y) {
                obj[prop] = value;
                found = true;
                break;
            }
        }
        if (found) {
            break;
        }
    }

    if (!found && oneSelected) {
        for (let i = 0; i < objects.length; i++) {
            if (i > 0) {
                if (i === (objects.length - 1)) {
                    objectsStr += " or ";
                } else {
                    objectsStr += ", ";
                }
            }
            objectsStr += "a " + objects[i];
        }
        msg = `Click on ${objectsStr} to set the property ${prop} to ${value}.`;
    }
    return msg;
}