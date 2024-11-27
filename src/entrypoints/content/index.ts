import type { ContentScriptContext } from "wxt/client";
import {
  addCallbackToElements as addCallback,
  removeCallbackFromElements as removeCallback,
} from "@/utils/handle-callback-of-elements";
import AppApi from "@/repositories/message-api";
import AppMessageTypes from "@/message-types";
import fart from "@/utils/fart-effect";
import { clearStain } from "../../utils/fart-effect/stain-window";

const targetElement =
  'button, [href], input[type="submit"], input[type="button"], input[type="reset"]';

const callback = async <E extends Event>(e: E) => {
  if (e instanceof MouseEvent) {
    fart(e);
  }
};

class DOMObserver {
  observer: MutationObserver;
  constructor() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              addCallback(node as Element, targetElement, "click", callback);
            }
          });
        }
      });
    });
  }
  observe() {
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  disconnect() {
    this.observer.disconnect();
  }
}
let observer: DOMObserver;

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx: ContentScriptContext) {
    observer = new DOMObserver();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === AppMessageTypes.update.SET) {
        const activate = message.value;
        if (activate) {
          addCallback(document, targetElement, "click", callback);
          observer.observe();
        } else {
          removeCallback(targetElement, "click", callback);
          clearStain();
          observer.disconnect();
        }
      }
    });
    const isActivated = await AppApi.isActivated.get();
    if (isActivated) {
      addCallback(document, targetElement, "click", callback);
      observer.observe();
    }
  },
});
