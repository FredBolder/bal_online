import { findElementByCoordinates, getGameDataValue } from "./balUtils.js";

export function coordinatesToFishName(gameData, gameInfo, x, y, generalName) {
    const objectNumber = getGameDataValue(gameData, x, y);
    if (objectNumber !== 243) {
        return "";
    }
    const idx = findElementByCoordinates(x, y, gameInfo.tropicalFish);
    if (idx < 0) {
        return "";
    }
    const fish = gameInfo.tropicalFish[idx];

    if (((fish.palette === 39) || (fish.palette === 40)) && (fish.shape === 1) && (fish.tail === 4) &&
        (fish.fins === 4) && (fish.stripes === 7) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Tilapia" : "Banded Tilapia";

    if ((fish.palette === 15) && (fish.shape === 1) && (fish.tail === 9) &&
        (fish.fins === 4) && (fish.stripes === 18) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Anthias" : "Bicolor Anthias";

    if ((fish.palette === 18) && (fish.shape === 6) && (fish.tail === 7) &&
        (fish.fins === 9) && (fish.stripes === 20) && (fish.eyePercentage === 55) && (fish.pupilPercentage === 40))
        return generalName ? "Tetra" : "Black Neon Tetra";

    if ((fish.palette === 35) && (fish.shape === 1) && (fish.tail === 9) &&
        (fish.fins === 4) && (fish.stripes === 0) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 60))
        return generalName ? "Chromis" : "Blue Chromis";

    if ((fish.palette === 16) && (fish.shape === 5) && (fish.tail === 4) &&
        (fish.fins === 8) && (fish.stripes === 0) && (fish.eyePercentage === 40) && (fish.pupilPercentage === 40))
        return generalName ? "Discus" : "Blue Diamond Discus";

    if ((fish.palette === 21) && (fish.shape === 8) && (fish.tail === 7) &&
        (fish.fins === 4) && (fish.stripes === 21) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Snapper" : "Brigham's Snapper";

    if ((fish.palette === 34) && (fish.shape === 2) && (fish.tail === 6) &&
        (fish.fins === 1) && (fish.stripes === 15) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Clownfish" : "Darwin Clownfish";

    if ((fish.palette === 38) && (fish.shape === 12) && (fish.tail === 5) &&
        (fish.fins === 14) && (fish.stripes === 18) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 35))
        return generalName ? "Catfish" : "Electric Catfish";

    if ((fish.palette === 3) && (fish.shape === 2) && (fish.tail === 7) &&
        (fish.fins === 3) && (fish.stripes === 12) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Golden Trevally" : "Juvenile Golden Trevally";

    if ((fish.palette === 17) && (fish.shape === 5) && (fish.tail === 3) &&
        (fish.fins === 8) && (fish.stripes === 5) && (fish.eyePercentage === 40) && (fish.pupilPercentage === 40))
        return generalName ? "Discus" : "Orange-red Discus";

    if ((fish.palette === 8) && (fish.shape === 2) && (fish.tail === 6) &&
        (fish.fins === 1) && (fish.stripes === 15) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40)) 
        return generalName ? "Clownfish" : "Percula Clownfish";
        
    if ((fish.palette === 20) && (fish.shape === 7) && (fish.tail === 4) &&
        (fish.fins === 10) && (fish.stripes === 0) && (fish.eyePercentage === 35) && (fish.pupilPercentage === 40))
        return generalName ? "Tang" : "Purple Tang";

    if ((fish.palette === 9) && (fish.shape === 1) && (fish.tail === 7) &&
        (fish.fins === 2) && (fish.stripes === 0) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return "Red Tail Shark";

    if ((fish.palette === 37) && (fish.shape === 11) && (fish.tail === 11) &&
        (fish.fins === 13) && (fish.stripes === 18) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 50))
        return generalName ? "Jobfish" : "Rusty Jobfish";

    if ((fish.palette === 11) && (fish.shape === 9) && (fish.tail === 7) &&
        (fish.fins === 5) && (fish.stripes === 17) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Algae Eater" : "Siamese Algae Eater";

    if ((fish.palette === 14) && (fish.shape === 2) && (fish.tail === 7) &&
        (fish.fins === 7) && (fish.stripes === 19) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Grunt" : "Smallmouth Grunt";

    if ((fish.palette === 36) && (fish.shape === 10) && (fish.tail === 10) &&
        (fish.fins === 12) && (fish.stripes === 18) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Tuna" : "Yellowfin Tuna";

    if ((fish.palette === 10) && (fish.shape === 1) && (fish.tail === 4) &&
        (fish.fins === 4) && (fish.stripes === 0) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Cichlid" : "Yellow Tail Acei Cichlid";

    if ((fish.palette === 12) && (fish.shape === 3) && (fish.tail === 8) &&
        (fish.fins === 11) && (fish.stripes === 0) && (fish.eyePercentage === 50) && (fish.pupilPercentage === 40))
        return generalName ? "Damselfish" : "Yellow Tail Damselfish";

    if ((fish.palette === 19) && (fish.shape === 7) && (fish.tail === 4) &&
        (fish.fins === 10) && (fish.stripes === 0) && (fish.eyePercentage === 35) && (fish.pupilPercentage === 40))
        return generalName ? "Tang" : "Yellow Tang";

    if ((fish.palette === 13) && (fish.shape === 5) && (fish.tail === 3) &&
        (fish.fins === 6) && (fish.stripes === 4) && (fish.eyePercentage === 40) && (fish.pupilPercentage === 40))
        return generalName ? "Angelfish" : "Zebra Angelfish";

    return "";
}


export function objectNumberToObjectGeneralName(objectNumber) {
    switch (objectNumber) {
        case 242:
        case 245: return "Answer ball";

        case 2:
        case 4:
        case 5:
        case 8:
        case 9:
        case 28:
        case 40:
        case 82:
        case 83:
        case 93:
        case 94:
        case 98:
        case 203:
        case 253:
        case 256: return "Ball";

        case 36:
        case 117: return "Bomb";

        case 186:
        case 187:
        case 188:
        case 189:
        case 190:
        case 191:
        case 226:
        case 227: return "Chord";

        case 171:
        case 172:
        case 173: return "Conveyor belt";

        case 97:
        case 208: return "Copier";

        case 133:
        case 134:
        case 135: return "Diamond";

        case 30:
        case 169: return "Door";

        case 6:
        case 7:
        case 106:
        case 107: return "Elevator";

        case 246:
        case 247: return "Elevator direction changer";

        case 27:
        case 243: return "Fish";

        case 250:
        case 251: return "Fish food";

        case 109:
        case 110:
        case 111:
        case 112: return "Force";

        case 89:
        case 183: return "Game rotator";

        case 184:
        case 185: return "Gravity changer";

        case 145:
        case 146:
        case 147:
        case 148: return "Half stone";

        case 228:
        case 229:
        case 230:
        case 231:
        case 232:
        case 233: return "Interval";

        case 126:
        case 127:
        case 128:
        case 129:
        case 130: return "Light blue bar";

        case 95:
        case 96: return "Mirror";

        case 10:
        case 11:
        case 87:
        case 88: return "One direction port";

        case 159:
        case 161:
        case 163:
        case 165: return "Piston";

        case 160:
        case 162:
        case 164:
        case 166: return "Piston extended part";

        case 100:
        case 101:
        case 102:
        case 103:
        case 104: return "Purple bar";

        case 141:
        case 142:
        case 143:
        case 144: return "Quarter circle stone";

        case 149:
        case 150:
        case 151:
        case 152: return "Quarter stone";

        case 3:
        case 140:
        case 168:
        case 192:
        case 195:
        case 196:
        case 197:
        case 201:
        case 202:
        case 204:
        case 254: return "Small ball";

        case 174:
        case 175:
        case 176:
        case 177: return "Spike";

        case 179:
        case 180:
        case 181:
        case 182: return "Star";

        case 153:
        case 154: return "Stone pattern";

        case 155:
        case 200: return "Synchroniser";

        case 31:
        case 92:
        case 170: return "Teleport";

        case 193:
        case 194: return "Teleports creator";

        case 13:
        case 14: return "Trap door";

        case 15:
        case 16:
        case 17:
        case 18: return "Triangle stone";

        case 113:
        case 114:
        case 206: return "Water surface";

        case 121:
        case 122:
        case 123:
        case 124:
        case 125: return "Yellow bar";

        case 84:
        case 85:
        case 86:
        case 138:
        case 139: return "Yellow direction changer";

        default:
            return objectNumberToObjectName(objectNumber);
    }
}

export function objectNumberToObjectName(objectNumber) {
    switch (objectNumber) {
        case 1: return "Stone";
        case 2: return "Blue ball";
        case 3: return "Small green ball";
        case 4: return "White ball";
        case 5: return "Light blue ball";

        case 6:
        case 106: return "Elevator";

        case 7:
        case 107: return "Horizontal elevator";

        case 8:
        case 93:
        case 94: return "Red ball";

        case 9: return "Yellow ball";
        case 10: return "One direction port right";
        case 11: return "One direction port left";
        case 12: return "Damaged stone";
        case 13: return "Trap door";
        case 14: return "Trap door half open";
        case 15: return "Triangle stone bottom left";
        case 16: return "Triangle stone bottom right";
        case 17: return "Triangle stone top left";
        case 18: return "Triangle stone top right";
        case 21: return "Palm tree trunk part";
        case 24: return "Panagiotis";
        case 26: return "Diving glasses";
        case 27: return "Red fish";
        case 28: return "Purple ball";
        case 29: return "Key";
        case 30: return "Locked door";
        case 31: return "Teleport";
        case 34: return "Pickaxe";
        case 35: return "Weak stone";
        case 36: return "Bomb";
        case 37: return "Detonator";
        case 38: return "Explosion";
        case 39: return "Elevator entrance and exit";
        case 40: return "Orange ball";
        case 81: return "Propeller";
        case 82: return "Gray ball one move";
        case 83: return "Gray ball";
        case 84: return "Yellow direction changer 1";
        case 85: return "Yellow direction changer 2";
        case 86: return "Yellow direction changer 3";
        case 87: return "One direction port up";
        case 88: return "One direction port down";
        case 89: return "Game rotator right";
        case 91: return "Electricity";
        case 92: return "Self-destructing teleport";
        case 95: return "Mirror 1";
        case 96: return "Mirror 2";
        case 97: return "Copier";
        case 98: return "Gray ball two moves";
        case 99: return "Small weak stone";
        case 100: return "Purple bar left";
        case 101: return "Purple bar right";
        case 102: return "Purple bar middle";
        case 103: return "Purple bar top";
        case 104: return "Purple bar bottom";
        case 105: return "Light bulb";
        case 108: return "Small ladder";
        case 109: return "Force up";
        case 110: return "Force down";
        case 111: return "Force right";
        case 112: return "Force left";
        case 113: return "Water surface right";
        case 114: return "Water surface left";
        case 115: return "Yellow pusher";
        case 116: return "Yellow pushers trigger";
        case 117: return "Time bomb";
        case 118: return "Coil spring";
        case 119: return "Magnet";
        case 120: return "Time freezer";
        case 121: return "Yellow bar left";
        case 122: return "Yellow bar right";
        case 123: return "Yellow bar middle";
        case 124: return "Yellow bar top";
        case 125: return "Yellow bar bottom";
        case 126: return "Light blue bar left";
        case 127: return "Light blue bar right";
        case 128: return "Light blue bar middle";
        case 129: return "Light blue bar top";
        case 130: return "Light blue bar bottom";
        case 131: return "Yellow stopper";
        case 132: return "Travel gate";
        case 133: return "Yellow diamond";
        case 134: return "Blue diamond";
        case 135: return "Red diamond";
        case 136: return "Yellow pauser";
        case 138: return "Yellow direction changer 4";
        case 139: return "Yellow direction changer 5";
        case 140: return "Small silver ball";
        case 141: return "Quarter circle stone bottom left";
        case 142: return "Quarter circle stone bottom right";
        case 143: return "Quarter circle stone top left";
        case 144: return "Quarter circle stone top right";
        case 145: return "Half stone left";
        case 146: return "Half stone right";
        case 147: return "Half stone top";
        case 148: return "Half stone bottom";
        case 149: return "Quarter stone bottom left";
        case 150: return "Quarter stone bottom right";
        case 151: return "Quarter stone top left";
        case 152: return "Quarter stone top right";
        case 153: return "Stone pattern 1";
        case 154: return "Stone pattern 2";
        case 155: return "Yellow ball synchroniser";
        case 156: return "Yellow slowdowner";
        case 157: return "Music box";
        case 158: return "Pistons trigger";
        case 159: return "Piston up";
        case 161: return "Piston down";
        case 163: return "Piston left";
        case 165: return "Piston right";
        case 160: return "Piston up extended part";
        case 162: return "Piston down extended part";
        case 164: return "Piston left extended part";
        case 166: return "Piston right extended part";
        case 167: return "Delay";
        case 168: return "Small blue ball";
        case 169: return "Door";
        case 170: return "Purple self-destructing teleport";
        case 171: return "Conveyor belt left";
        case 172: return "Conveyor belt middle";
        case 173: return "Conveyor belt right";
        case 174: return "Spike up";
        case 175: return "Spike down";
        case 176: return "Spike right";
        case 177: return "Spike left";
        case 178: return "Mover";
        case 179: return "Yellow star";
        case 180: return "Blue star";
        case 181: return "Silver star";
        case 182: return "Red star";
        case 183: return "Game rotator left";
        case 184: return "Gravity changer up";
        case 185: return "Gravity changer down";
        case 186: return "Major chord";
        case 187: return "Minor chord";
        case 188: return "Augmented chord";
        case 189: return "Diminished chord";
        case 190: return "Suspended second chord";
        case 191: return "Suspended fourth chord";
        case 192: return "Small white ball";
        case 193: return "Teleports creator";
        case 194: return "Self-destructing teleports creator";
        case 195: return "Small light blue ball";
        case 196: return "Small yellow ball";
        case 197: return "Small purple ball";
        case 198: return "Disappearing stone";
        case 199: return "Shrinker";
        case 200: return "White ball synchroniser";
        case 201: return "Small red ball";
        case 202: return "Small orange ball";
        case 203: return "Pink ball";
        case 204: return "Small pink ball";
        case 205: return "Freeze gun";
        case 206: return "Water with a layer of ice on top";
        case 207: return "Phase ability";
        case 208: return "Yellow copier";
        case 209: return "Pusher";

        case 210:
        case 211:
        case 212:
        case 213:
        case 214:
        case 215:
        case 216:
        case 217:
        case 218:
        case 219:
        case 220:
        case 221:
        case 222:
        case 223:
        case 224:
        case 225:
            return "Stone shape";

        case 226: return "Dominant seventh chord";
        case 227: return "Major seventh chord";
        case 228: return "Perfect fifth interval";
        case 229: return "Perfect eighth interval";
        case 230: return "Perfect fourth interval";
        case 231: return "Major second interval";
        case 232: return "Minor third interval";
        case 233: return "Major third interval";
        case 241: return "Question stone";
        case 242: return "Purple answer ball";
        case 245: return "White answer ball";
        case 243: return "Tropical fish";
        case 244: return "Changer";
        case 246: return "Elevator direction changer 1";
        case 247: return "Elevator direction changer 2";
        case 248: return "Jellyfish";
        case 249: return "Coral reef plant";
        case 250: return "Fish food in pot";
        case 251: return "Fish food";
        case 252: return "Sea anemone";
        case 253: return "Brown ball";
        case 254: return "Small brown ball";
        case 255: return "Detector";
        case 256: return "Spike ball";

        default:
            return "";
    }
}