import sndBreaking1 from "./Sounds/breaking1.wav";
import sndBreaking2 from "./Sounds/breaking2.wav";
import sndCatapult from "./Sounds/catapult.wav";
import sndEat1 from "./Sounds/eat1.wav";
import sndEat2 from "./Sounds/eat2.wav";
import sndEat3 from "./Sounds/eat3.wav";
import sndEat4 from "./Sounds/eat4.wav";
import sndElectricity from "./Sounds/electricity.wav";
import sndExplosion from "./Sounds/explosion.wav";
import sndKey from "./Sounds/key.wav";
import sndLaserGun from "./Sounds/laser_gun.wav";
import sndMagnet from "./Sounds/magnet.wav";
import sndPain from "./Sounds/pain.wav";
import sndPickaxe from "./Sounds/pickaxe.wav";
import sndSplash1 from "./Sounds/splash1.wav";
import sndSplash2 from "./Sounds/splash2.wav";
import sndTake from "./Sounds/take.wav";
import sndTeleport from "./Sounds/teleport.wav";
import sndTrapDoor from "./Sounds/trap_door.wav";
import sndUnlock from "./Sounds/unlock.wav";

export function playSound(sound) {
    let snd = null;
    let n = 0;

    switch (sound) {
        case "breaking1":
            snd = sndBreaking1;
            break;
        case "breaking2":
            snd = sndBreaking2;
            break;
        case "catapult":
            snd = sndCatapult;
            break;
        case "eat":
            n = Math.trunc(Math.random() * 4) + 1;
            switch (n) {
                case 1:
                    snd = sndEat1;
                    break;
                case 2:
                    snd = sndEat2;
                    break;
                case 3:
                    snd = sndEat3;
                    break;
                case 4:
                    snd = sndEat4;
                    break;
                default:
                    break;
            }
            break;
        case "electricity":
            snd = sndElectricity;
            break;
        case "explosion":
            snd = sndExplosion;
            break;
        case "key":
            snd = sndKey;
            break;
        case "laser":
            snd = sndLaserGun;
            break;
        case "magnet":
            snd = sndMagnet;
            break;
        case "pain":
            snd = sndPain;
            break;
        case "pickaxe":
            snd = sndPickaxe;
            break;
        case "splash1":
            snd = sndSplash1;
            break;
        case "splash2":
            snd = sndSplash2;
            break;
        case "take":
            snd = sndTake;
            break;
        case "teleport":
            snd = sndTeleport;
            break;
        case "trap":
            snd = sndTrapDoor;
            break;
        case "unlock":
            snd = sndUnlock;
            break;
        default:
            break;
    }
    if (snd !== sound) {
        try {
            const audio = new Audio(snd);
            audio.play();
        } catch (error) {
            console.error(error);
        }
    }

}

