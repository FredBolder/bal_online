import { getGameDataValue } from "./balUtils.js";

export function checkFishOutOfWater(backData, gameInfo) {
    const animalLists = [ "tropicalFish", "redFish", "jellyfish" ];
    for (let i = 0; i < animalLists.length; i++) {
        const animalList = animalLists[i];
        for (let j = 0; j < gameInfo[animalList].length; j++) {
            const animal = gameInfo[animalList][j];
            if (animal.isDead) continue;
            if (isWater(backData[animal.y][animal.x])) {
                animal.outOfWater = 0;
            } else {
                animal.outOfWater++;
                if (animal.outOfWater > 20) {
                    animal.isDead = true;
                }
            }
        }
    }
}

function inBounds(x, y, maxX, maxY) {
    return x >= 0 && y >= 0 && x <= maxX && y <= maxY;
}

function isWater(objectNumber) {
    return [20, 23, 252].includes(objectNumber);
}

export function getConnectedWater(backData, x, y) {
    const water = new Set();
    const stack = [[x, y]];
    const visited = new Set();

    const maxX = backData[0].length - 1;
    const maxY = backData.length - 1;

    if (!isWater(getGameDataValue(backData, x, y))) {
        return water;
    }

    while (stack.length) {
        const [cx, cy] = stack.pop();

        if (!inBounds(cx, cy, maxX, maxY)) continue;

        const key = `${cx},${cy}`;
        if (visited.has(key)) continue;

        const objectNumber = getGameDataValue(backData, cx, cy);
        if (!isWater(objectNumber)) continue;

        visited.add(key);
        water.add(key);

        stack.push([cx - 1, cy]);
        stack.push([cx + 1, cy]);
        stack.push([cx, cy - 1]);
        stack.push([cx, cy + 1]);
    }

    return water;
}


