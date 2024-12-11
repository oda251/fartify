import AppCache from "@/repositories/cache";
import AppStorage from "@/repositories/storage";
import messageType, { messageIsForThisApp } from "@/message-types";
import Path from "@/types/path";

const getRandomSound = () => {
  const list: Path[] = AppCache.allSounds.get();
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex].full;
};

const getter = (message: any, sender: chrome.runtime.MessageSender) => {
  const type = message.type;
  if (type === messageType.config.GET) {
    return AppCache.config.get();
  } else if (type === messageType.isActivated.GET) {
    return AppCache.isActivated.get();
  } else if (type === messageType.sound.GET) {
    const value = AppCache.sound.get();
    return value ? value : getRandomSound();
  } else if (type === messageType.fartMode.GET) {
    return AppCache.fartMode.get();
  } else if (type === messageType.soundList.GET) {
    return AppCache.allSounds.get();
  } else {
    return undefined;
  }
};
const setter = async (message: any, sender: chrome.runtime.MessageSender) => {
  const type = message.type;
  const value = message.value;
  if (type === messageType.config.SET) {
    await AppStorage.config.set(value);
    AppCache.config.set(value);
  } else if (type === messageType.isActivated.SET) {
    await AppStorage.isActivated.set(value);
    AppCache.isActivated.set(value);
  } else if (type === messageType.sound.SET) {
    await AppStorage.sound.set(value);
    AppCache.sound.set(value);
  } else if (type === messageType.fartMode.SET) {
    await AppStorage.fartMode.set(value);
    AppCache.fartMode.set(value);
  } else {
    return undefined;
  }
};

async function initCache() {
  const initialConfig = await AppStorage.config.get();
  AppCache.config.set(initialConfig);
  const list: Path[] = await AppStorage.allSounds.get();
  list.sort((a, b) => a.name.localeCompare(b.name));
  AppCache.allSounds.set(list);
}

initCache();

export default defineBackground({
  main() {
    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        if (messageIsForThisApp(message.type)) {
          const result = getter(message, sender);
          if (result !== undefined) {
            sendResponse(result);
          } else if ((await setter(message, sender)) !== undefined) {
            sendResponse(true);
          }
        }
      }
    );
    chrome.tabs.onActivated.addListener((activeInfo) => {
      const tabId = activeInfo.tabId;
      chrome.tabs
        .sendMessage(tabId, {
          type: messageType.update.SET,
          value: AppCache.isActivated.get(),
        })
        .catch((e) => {
          console.log(e);
        });
    });
  },
});
