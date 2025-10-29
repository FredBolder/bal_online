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
    "Use telekinetic power"
];

export const actionKeys = [11, 1, 10, 9, 2, 3, 4, 6, 7, 8];

export function hasAction(gameInfo, actionIndex) {
    switch (actionIndex) {
        case 0:
            return gameInfo.hasTeleportsCreator;
            break;
        case 1:
            return gameInfo.hasSelfDestructingTeleportsCreator;
            break;
        case 2:
            return gameInfo.hasWhiteBall;
            break;
        case 3:
            return gameInfo.hasLightBlueBall;
            break;
        case 4:
            return gameInfo.hasYellowBall;
            break;
        case 5:
            return gameInfo.hasRedBall;
            break;
        case 6:
            return gameInfo.hasPurpleBall;
            break;
        case 7:
            return gameInfo.hasOrangeBall;
            break;
        case 8:
            return gameInfo.hasPinkBall;
            break;
        case 9:
            return gameInfo.hasShrinker;
            break;
        case 10:
            return gameInfo.hasFreezeGun;
            break;
        case 11:
            return gameInfo.hasTelekineticPower;
            break;
        default:
            return false;
            break;
    }
}