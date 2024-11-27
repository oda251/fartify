import { type AppConfig } from "@/types/config";
import type FartMode from "@/types/fart-mode";
import Path, { strListToPathList } from "@/types/path";
import type { AppRepository } from "@/types/repository";
import Config from "@config";

class Cache<T> {
  private value_: T;
  constructor(value: T) {
    this.value_ = value;
  }
  get = (): T => {
    return this.value_;
  };
  set = (value: T) => {
    this.value_ = value;
  };
}

const AppCache: AppRepository = {
  isActivated: new Cache<boolean>(Config.isActivated.default),
  sound: new Cache<string>(Config.sound.default),
  allSounds: new Cache<Path[]>(strListToPathList(Config.allSounds.default)),
  probability: new Cache<number>(Config.probability.default),
  fartMode: new Cache<FartMode>(Config.fartMode.default as FartMode),
  config: {
    get: (): AppConfig => {
      return {
        isActivated: AppCache.isActivated.get(),
        sound: AppCache.sound.get(),
        probability: AppCache.probability.get(),
        mode: AppCache.fartMode.get(),
      };
    },
    set: (config: AppConfig) => {
      AppCache.isActivated.set(config.isActivated);
      AppCache.sound.set(config.sound);
      AppCache.probability.set(config.probability);
      AppCache.fartMode.set(config.mode);
    },
  },
};

export default AppCache;
