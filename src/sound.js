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

import { getSettings } from "./settings.js";

const SOUND_FILES = {
  breaking1: sndBreaking1,
  breaking2: sndBreaking2,
  catapult: sndCatapult,
  electricity: sndElectricity,
  explosion: sndExplosion,
  key: sndKey,
  laser: sndLaserGun,
  magnet: sndMagnet,
  pain: sndPain,
  pickaxe: sndPickaxe,
  splash1: sndSplash1,
  splash2: sndSplash2,
  take: sndTake,
  teleport: sndTeleport,
  trap: sndTrapDoor,
  unlock: sndUnlock,
};

const EAT_SOUNDS = [sndEat1, sndEat2, sndEat3, sndEat4];

const audioCache = {};

function preloadSounds() {
  Object.entries(SOUND_FILES).forEach(([key, src]) => {
    const audio = new Audio(src);
    audio.load();
    audioCache[key] = audio;
  });
  EAT_SOUNDS.forEach((src, idx) => {
    const key = `eat${idx + 1}`;
    const audio = new Audio(src);
    audio.load();
    audioCache[key] = audio;
  });
}

preloadSounds();

export function playSound(sound) {
  const settings = getSettings();
  if (!settings.sound) return;

  let key = sound;

  if (sound === 'eat') {
    const idx = Math.floor(Math.random() * EAT_SOUNDS.length) + 1;
    key = `eat${idx}`;
  }

  const audio = audioCache[key];
  if (audio) {
    try {
      audio.currentTime = 0;
      audio.play();
    } catch (err) {
      console.error(`Failed to play sound ${key}:`, err);
    }
  }
}
