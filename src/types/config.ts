import config from "@config";
import Path from "./path";
import FartMode from "./fart-mode";

export interface AppConfig {
  isActivated: boolean;
  sound: string;
  probability: number;
  mode: FartMode;
  soundList?: Path[];
}

export const defaultConfig: AppConfig = {
  isActivated: config.isActivated.default,
  sound: config.sound.default,
  probability: config.probability.default,
  mode: config.fartMode.default as FartMode,
  soundList: [],
};
