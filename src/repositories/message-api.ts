import AppMessageTypes from "@/message-types";
import type { MessageType } from "@/message-types";
import { AppConfig } from "@/types/config";
import { AppRepository, IRepository } from "@/types/repository";

class Api<T> implements IRepository<T> {
  private readonly type_: MessageType;
  constructor(type: MessageType) {
    this.type_ = type;
  }
  get = async (): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      chrome.runtime.sendMessage({ type: this.type_.GET }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  };
  set = async (value: T) => {
    const result = await chrome.runtime
      .sendMessage({
        type: this.type_.SET,
        value,
      })
      .catch((e) => {
        console.error(e);
      });
    return result;
  };
}
const AppApi: AppRepository = {
  config: new Api<AppConfig>(AppMessageTypes.config),
  isActivated: new Api<boolean>(AppMessageTypes.isActivated),
  sound: new Api<string>(AppMessageTypes.sound),
  probability: new Api<number>(AppMessageTypes.probability),
  fartMode: new Api<string>(AppMessageTypes.fartMode),
  soundList: new Api<string[]>(AppMessageTypes.soundList),
};

export default AppApi;
