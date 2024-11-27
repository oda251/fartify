import type { WxtStorageItem, WxtStorageItemOptions } from "wxt/storage";
import type { IRepository, AppRepository } from "@/types/repository";
import config from "@config";
import { type AppConfig } from "@/types/config";
import type FartMode from "@/types/fart-mode";
import Path, { strListToPathList } from "@/types/path";

interface StorageParams<T> {
  key: string;
  options: WxtStorageItemOptions<T>;
}

class Storage<T> implements IRepository<T> {
  private key_: string;
  private storage: WxtStorageItem<T, {}>;
  constructor(params: StorageParams<T>) {
    this.key_ = params.key;
    this.storage = storage.defineItem<T>(`local:${this.key_}`, params.options);
  }
  get = async (): Promise<T> => {
    const result = await this.storage.getValue();
    return result;
  };
  set = async (value: T) => {
    await this.storage.setValue(value);
  };
}

const AppStorage: AppRepository = {
  isActivated: new Storage<boolean>({
    key: "isActivated",
    options: {
      defaultValue: config.isActivated.default,
      fallback: config.isActivated.fallback,
    },
  }),
  sound: new Storage<string>({
    key: "sound",
    options: {
      defaultValue: config.sound.default,
      fallback: config.sound.fallback,
    },
  }),
  allSounds: new Storage<Path[]>({
    key: "allSounds",
    options: {
      defaultValue: strListToPathList(config.allSounds.default),
      fallback: strListToPathList(config.allSounds.fallback),
    },
  }),
  probability: new Storage<number>({
    key: "probability",
    options: {
      defaultValue: config.probability.default,
      fallback: config.probability.fallback,
    },
  }),
  fartMode: new Storage<FartMode>({
    key: "fartMode",
    options: {
      defaultValue: config.fartMode.default as FartMode,
      fallback: config.fartMode.fallback as FartMode,
    },
  }),
  config: {
    get: async (): Promise<AppConfig> => {
      const [isActivated, sound, probability, mode] = await Promise.all([
        AppStorage.isActivated.get(),
        AppStorage.sound.get(),
        AppStorage.probability.get(),
        AppStorage.fartMode.get(),
      ]);
      return { isActivated, sound, probability, mode };
    },
    set: async (config: AppConfig) => {
      await Promise.all([
        AppStorage.isActivated.set(config.isActivated),
        AppStorage.sound.set(config.sound),
        AppStorage.probability.set(config.probability),
        AppStorage.fartMode.set(config.mode),
      ]);
    },
  },
};

export default AppStorage;
