export function checkDetonator(arr, x, y) {
    let info = { updated: false, explosion: false };
    let detonator = false;

    if (y > 0) {
        detonator = [2, 4, 8, 40, 93, 94].includes(arr[y - 1][x]);
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === 36 && detonator) {
                    info.explosion = true;
                    info.updated = true;
                    arr[i][j] = 38;
                } else if (arr[i][j] === 38) {
                    info.updated = true;
                    arr[i][j] = 0;
                }
            }
        }
    }
    return info;
}

