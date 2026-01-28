export const actionList = [
    "Create teleports",
    "Create self-destructing teleports",
    "Drop white ball",
    "Drop light blue ball",
    "Drop yellow ball",
    "Drop red ball",
    "Drop purple ball",
    "Drop orange ball",
    "Drop pink ball",
    "Shrink object",
    "Freeze water",
    "Use telekinetic power",
    "Feed fish"
];

export const actionKeys = [11, 1, 10, 9, 2, 3, 4, 6, 7, 8];

export function hasAction(gameInfo, actionIndex) {
    switch (actionIndex) {
        case 0:
            return gameInfo.hasTeleportsCreator;
        case 1:
            return gameInfo.hasSelfDestructingTeleportsCreator;
        case 2:
            return gameInfo.hasWhiteBall;
        case 3:
            return gameInfo.hasLightBlueBall;
        case 4:
            return gameInfo.hasYellowBall;
        case 5:
            return gameInfo.hasRedBall;
        case 6:
            return gameInfo.hasPurpleBall;
        case 7:
            return gameInfo.hasOrangeBall;
        case 8:
            return gameInfo.hasPinkBall;
        case 9:
            return gameInfo.hasShrinker;
        case 10:
            return gameInfo.hasFreezeGun;
        case 11:
            return gameInfo.hasTelekineticPower;
        case 12:
            return gameInfo.hasFishFood;
        default:
            return false;
    }
}