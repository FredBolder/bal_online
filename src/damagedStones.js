export function checkDamagedStones(arr, gameInfo) {
    let result = { update: false, sound: 0 };
    let data = 0;

    for (let i = 0; i < gameInfo.damagedStones.length; i++) {
        const damagedStone = gameInfo.damagedStones[i];
        if (damagedStone.status !== -1) {
            data = arr[damagedStone.y - 1][damagedStone.x];
            if ([2, 4, 8, 40, 93, 94].includes(data)) {
                damagedStone.status++;
                if ((damagedStone.status === 5) && (result.sound === 0)) {
                    result.sound = 1;
                }
                if (damagedStone.status === 12) {
                    result.sound = 2;
                }
                if (damagedStone.status >= 12) {
                    damagedStone.status = -1;
                    arr[damagedStone.y][damagedStone.x] = 0;
                    result.update = true;
                }
            } else {
                damagedStone.status = 0;
            }
        }
    }
    return result;
}

