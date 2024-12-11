var content = function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  var _a, _b;
  function defineContentScript(definition2) {
    return definition2;
  }
  async function addCallbackToElements(target, query, event, callback2) {
    let elements = Array.from(target.querySelectorAll(query));
    elements.forEach((elem) => {
      elem.removeEventListener(event, callback2);
      elem.addEventListener(event, callback2);
    });
  }
  async function removeCallbackFromElements(query, event, callback2) {
    let elements = Array.from(document.querySelectorAll(query));
    elements.forEach((elem) => {
      elem.removeEventListener(event, callback2);
    });
  }
  content;
  const Manifest = {
    name: "Fartify",
    version: "1.0.0",
    permissions: ["storage", "activeTab", "background"],
    web_accessible_resources: [
      {
        resources: ["sounds/*"],
        matches: ["<all_urls>"]
      }
    ]
  };
  content;
  const appName = Manifest.name;
  class MessageType {
    constructor(namespace) {
      __publicField(this, "namespace");
      __publicField(this, "GET");
      __publicField(this, "SET");
      this.namespace = `${appName}:${namespace}`;
      this.GET = this.format("GET");
      this.SET = this.format("SET");
    }
    format(type) {
      return `${this.namespace}:${type}`;
    }
    toString() {
      return this.namespace;
    }
  }
  class AppMessageTypes {
  }
  __publicField(AppMessageTypes, "config", new MessageType("config"));
  __publicField(AppMessageTypes, "isActivated", new MessageType("is-activated"));
  __publicField(AppMessageTypes, "sound", new MessageType("sound"));
  __publicField(AppMessageTypes, "soundList", new MessageType("sound-list"));
  __publicField(AppMessageTypes, "probability", new MessageType("probability"));
  __publicField(AppMessageTypes, "fartMode", new MessageType("fart-mode"));
  __publicField(AppMessageTypes, "update", new MessageType("update"));
  content;
  class Api {
    constructor(type) {
      __publicField(this, "type_");
      __publicField(this, "get", async () => {
        return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage({ type: this.type_.GET }, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              resolve(response);
            }
          });
        });
      });
      __publicField(this, "set", async (value) => {
        const result2 = await chrome.runtime.sendMessage({
          type: this.type_.SET,
          value
        }).catch((e) => {
          console.error(e);
        });
        return result2;
      });
      this.type_ = type;
    }
  }
  const AppApi = {
    config: new Api(AppMessageTypes.config),
    isActivated: new Api(AppMessageTypes.isActivated),
    sound: new Api(AppMessageTypes.sound),
    probability: new Api(AppMessageTypes.probability),
    fartMode: new Api(AppMessageTypes.fartMode),
    soundList: new Api(AppMessageTypes.soundList)
  };
  content;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  content;
  const files = [
    "sounds/fart/06 ブビィッ！.mp3",
    "sounds/fart/57 プゥゥァァ！.mp3",
    "sounds/fart/41 ヴゥィッ！.mp3",
    "sounds/fart/33 ブリリィ、プロォォ.mp3",
    "sounds/fart/27 ポ、ポ、プィィィ！.mp3",
    "sounds/fart/20 ブゥゥ→ビィィィ↑ブゥゥ↓.mp3",
    "sounds/fart/29 ブゥーー！.mp3",
    "sounds/fart/46 ビィィヴゥォォオオオヴァアア！.mp3",
    "sounds/fart/37 プィッ！・・ポピィィ！↑.mp3",
    "sounds/fart/02 ブゥゥゥ！（低音系）.mp3",
    "sounds/fart/10 プリッ！（小さめ）.mp3",
    "sounds/fart/25 ビリリリィ・・ビリィ・・・ブビッ！.mp3",
    "sounds/fart/28 ヴゥボオ、スィィ〜.mp3",
    "sounds/fart/50 ブゥ！.mp3",
    "sounds/fart/43 ブリッ！.mp3",
    "sounds/fart/49 ヴィッ！.mp3",
    "sounds/fart/19 ブリリリィ.mp3",
    "sounds/fart/12 ポスッ！.mp3",
    "sounds/fart/38 ポォウィィィ！！！・・プィィ！.mp3",
    "sounds/fart/42 ブゥー！.mp3",
    "sounds/fart/17 プップッ・・・プリリィ.mp3",
    "sounds/fart/05 ブビッ・・ブビッ・・・ビィー・・・ブリ！.mp3",
    "sounds/fart/15 ブヴィィィ・・・ビィッ！.mp3",
    "sounds/fart/48 ピィァァァ！.mp3",
    "sounds/fart/53 ブゥ…ヴィ！.mp3",
    "sounds/fart/11 ピッ！・・・プーウィィー！.mp3",
    "sounds/fart/44 ブリッ、ピリッ、プリッ！.mp3",
    "sounds/fart/26 ブリリィィリ！.mp3",
    "sounds/fart/45 ブリリィ！ヴルォォ！.mp3",
    "sounds/fart/09 ブゥォッ！.mp3",
    "sounds/fart/52 ブゥヴィ…ヴィリィィ！.mp3",
    "sounds/fart/24 ブリ！・・・ヴィィ.mp3",
    "sounds/fart/23 ビリィ・・ブリィィィィ・・・・・・ブリ.mp3",
    "sounds/fart/31 ブビィィ・・ブロォロォオ！.mp3",
    "sounds/fart/55 プィポッ！.mp3",
    "sounds/fart/54 ヴゥィッチ！.mp3",
    "sounds/fart/56 ヴイッ！.mp3",
    "sounds/fart/03 ブィィィボォォ・・・・・ブゥー！.mp3",
    "sounds/fart/14 ブゥゥゥプリッ！.mp3",
    "sounds/fart/16 ポピッ・・・プリッ・・・ピッ！.mp3",
    "sounds/fart/47 ヴィヴォヴァ！.mp3",
    "sounds/fart/04 ヴィッ・・・ブリリィ・・・ブリィ（若干水気あり）.mp3",
    "sounds/fart/13 プルリィィィィ.mp3",
    "sounds/fart/21 ブィィィィ（ミチミチ）.mp3",
    "sounds/fart/30 プィィー！（すかし気味）.mp3",
    "sounds/fart/32 プッ！クロォロロ・・クリィ・・プリ.mp3",
    "sounds/fart/22 プゥゥゥ！.mp3",
    "sounds/fart/08 ビィボゥオ・・・ビィ！.mp3",
    "sounds/fart/34 ボォォブィィ！・・・ブルルルゥ・・・・ブリィ.mp3",
    "sounds/fart/07 ヴィッー！.mp3",
    "sounds/fart/58 プシッピーピ！.mp3",
    "sounds/fart/18 ブィィィ！.mp3",
    "sounds/fart/36 プゥスゥォォォオ！（すかし）.mp3",
    "sounds/fart/39 ブゥィ！・・・ブィッ！.mp3",
    "sounds/fart/01 ブリッ！.mp3",
    "sounds/fart/35 ブビィィ！.mp3",
    "sounds/fart/40 ブゥィィ！.mp3",
    "sounds/fart/51 ビー！.mp3"
  ];
  const soundsList = {
    files
  };
  const Config = {
    isActivated: {
      default: true,
      fallback: false
    },
    fartMode: {
      default: "natural",
      fallback: "natural"
    },
    sound: {
      default: "",
      fallback: "sounds/fart/01 ブリッ！.mp3"
    },
    allSounds: {
      default: soundsList.files,
      fallback: soundsList.files
    },
    probability: {
      default: 0.1,
      fallback: 0.1
    },
    stainColor: {
      default: "#ffdead",
      fallback: "#ffdead"
    }
  };
  content;
  let depth = 0;
  const maxOpacity = 0.4;
  const calcOpacity = (depth2) => {
    const opacity = depth2 / 90 - 0.1;
    return opacity < 0 ? 0 : opacity > maxOpacity ? maxOpacity : opacity;
  };
  const stainWindow = (count) => {
    const stains = Array.from(
      document.querySelectorAll(".fart-stain")
    );
    if (stains.length === 0) {
      depth = 0;
      const stain = document.createElement("div");
      stain.classList.add("fart-stain");
      stain.style.backgroundColor = Config.stainColor.default;
      document.body.appendChild(stain);
    } else {
      if (count) {
        depth += count;
      } else {
        depth++;
      }
      stains.forEach((stain) => {
        stain.style.opacity = calcOpacity(depth).toString();
      });
    }
  };
  const clearStain = () => {
    const stains = Array.from(
      document.querySelectorAll(".fart-stain")
    );
    stains.forEach((stain) => {
      stain.remove();
    });
    depth = 0;
  };
  content;
  const FartModes = {
    NATURAL: "sometimes",
    FREQUENT: "frequently",
    ALLWAYS: "allways",
    BAZOOKA: "bazooka"
  };
  content;
  const createChildEffect = (scale = 1) => {
    const size = (Math.random() * 0.5 + 0.1) * scale;
    const angle = Math.random() * 360;
    const elem = document.createElement("div");
    elem.className = "click-effect-fragment";
    elem.style.cssText = `
    --angle: ${angle}deg;
    --blur: ${0.5 * scale}rem;
    top: ${-size / 2}rem;
    left: ${-size / 2}rem;
    width: ${size}rem;
    height: ${size}rem;
  `;
    return elem;
  };
  const visualEffect = async (pos, scale) => {
    const div = document.createElement("div");
    div.className = "click-effect-container";
    div.style.cssText = `
    top: ${pos.y}px;
    left: ${pos.x}px;
    --angle: ${Math.random() * 120 - 60}deg;
    --distance: ${18 * (scale ? scale : 1)}rem;
    --pre-timespan: ${3 * (scale ? scale : 1)}s;
    --after-timespan: 1s;
  `;
    const fragment = document.createDocumentFragment();
    const fSize = 3 + 2 * (scale ? scale : 1);
    const animations = [];
    for (let i = 0; i < fSize; i++) {
      fragment.appendChild(createChildEffect(scale));
    }
    div.appendChild(fragment);
    document.body.appendChild(div);
    for (let i = 0; i < fSize; i++) {
      animations.push(
        ...div.children[i].getAnimations().map((animation) => animation.finished)
      );
    }
    animations.push(
      ...div.getAnimations().map((animation) => animation.finished)
    );
    console.log(animations.length);
    Promise.all(animations).then(() => div.remove());
  };
  content;
  const getRelativeMousePosition = (event) => {
    const rect = document.body.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };
  content;
  const fart = async (event, probability) => {
    const config = await AppApi.config.get();
    if (!config.isActivated) {
      return;
    }
    if (probability === void 0) {
      switch (config.mode) {
        case FartModes.NATURAL:
          probability = 0.1;
          break;
        case FartModes.FREQUENT:
          probability = 0.5;
          break;
        case FartModes.ALLWAYS:
          probability = 1;
          break;
        case FartModes.BAZOOKA:
          probability = 10.9;
          break;
        default:
          probability = 0.1;
          break;
      }
    }
    const times = Math.ceil(probability);
    if (probability !== times) {
      probability = probability - Math.floor(probability);
    }
    const pos = getRelativeMousePosition(event);
    let count = 0;
    for (let i = 0; i < times; i++) {
      if (Math.random() > probability) {
        return;
      }
      count++;
    }
    if (count > 0) {
      const p = visualEffect(pos, count);
      for (let i = 0; i < count; i++) {
        const uri = chrome.runtime.getURL(await AppApi.sound.get());
        const audio = new Audio(uri);
        audio.play();
        await sleep(Math.random() * 60 + 40);
      }
      stainWindow(count);
      await p;
    }
  };
  content;
  const targetElement = 'button, [href], input[type="submit"], input[type="button"], input[type="reset"]';
  const callback = async (e) => {
    if (e instanceof MouseEvent) {
      fart(e);
    }
  };
  class DOMObserver {
    constructor() {
      __publicField(this, "observer");
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                addCallbackToElements(node, targetElement, "click", callback);
              }
            });
          }
        });
      });
    }
    observe() {
      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    disconnect() {
      this.observer.disconnect();
    }
  }
  let observer;
  const definition = defineContentScript({
    matches: ["<all_urls>"],
    async main(ctx) {
      observer = new DOMObserver();
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === AppMessageTypes.update.SET) {
          const activate = message.value;
          if (activate) {
            addCallbackToElements(document, targetElement, "click", callback);
            observer.observe();
          } else {
            removeCallbackFromElements(targetElement, "click", callback);
            clearStain();
            observer.disconnect();
          }
        }
      });
      const isActivated = await AppApi.isActivated.get();
      if (isActivated) {
        addCallbackToElements(document, targetElement, "click", callback);
        observer.observe();
      }
    }
  });
  content;
  const browser = (
    // @ts-expect-error
    ((_b = (_a = globalThis.browser) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id) == null ? globalThis.chrome : (
      // @ts-expect-error
      globalThis.browser
    )
  );
  function print$1(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger$1 = {
    debug: (...args) => print$1(console.debug, ...args),
    log: (...args) => print$1(console.log, ...args),
    warn: (...args) => print$1(console.warn, ...args),
    error: (...args) => print$1(console.error, ...args)
  };
  const __vite_import_meta_env__ = { "BASE_URL": "/", "BROWSER": "chrome", "CHROME": true, "COMMAND": "serve", "DEV": true, "EDGE": false, "ENTRYPOINT": "content", "FIREFOX": false, "MANIFEST_VERSION": 3, "MODE": "development", "OPERA": false, "PROD": false, "SAFARI": false, "SSR": false, "VITE_CJS_IGNORE_WARNING": "true" };
  const _WxtLocationChangeEvent = class _WxtLocationChangeEvent extends Event {
    constructor(newUrl, oldUrl) {
      super(_WxtLocationChangeEvent.EVENT_NAME, {});
      this.newUrl = newUrl;
      this.oldUrl = oldUrl;
    }
  };
  __publicField(_WxtLocationChangeEvent, "EVENT_NAME", getUniqueEventName("wxt:locationchange"));
  let WxtLocationChangeEvent = _WxtLocationChangeEvent;
  function getUniqueEventName(eventName) {
    var _a2;
    const entrypointName = typeof __vite_import_meta_env__ === "undefined" ? "build" : "content";
    return `${(_a2 = browser == null ? void 0 : browser.runtime) == null ? void 0 : _a2.id}:${entrypointName}:${eventName}`;
  }
  function createLocationWatcher(ctx) {
    let interval;
    let oldUrl;
    return {
      /**
       * Ensure the location watcher is actively looking for URL changes. If it's already watching,
       * this is a noop.
       */
      run() {
        if (interval != null) return;
        oldUrl = new URL(location.href);
        interval = ctx.setInterval(() => {
          let newUrl = new URL(location.href);
          if (newUrl.href !== oldUrl.href) {
            window.dispatchEvent(new WxtLocationChangeEvent(newUrl, oldUrl));
            oldUrl = newUrl;
          }
        }, 1e3);
      }
    };
  }
  const _ContentScriptContext = class _ContentScriptContext {
    constructor(contentScriptName, options) {
      __publicField(this, "isTopFrame", window.self === window.top);
      __publicField(this, "abortController");
      __publicField(this, "locationWatcher", createLocationWatcher(this));
      this.contentScriptName = contentScriptName;
      this.options = options;
      this.abortController = new AbortController();
      if (this.isTopFrame) {
        this.listenForNewerScripts({ ignoreFirstEvent: true });
        this.stopOldScripts();
      } else {
        this.listenForNewerScripts();
      }
    }
    get signal() {
      return this.abortController.signal;
    }
    abort(reason) {
      return this.abortController.abort(reason);
    }
    get isInvalid() {
      if (browser.runtime.id == null) {
        this.notifyInvalidated();
      }
      return this.signal.aborted;
    }
    get isValid() {
      return !this.isInvalid;
    }
    /**
     * Add a listener that is called when the content script's context is invalidated.
     *
     * @returns A function to remove the listener.
     *
     * @example
     * browser.runtime.onMessage.addListener(cb);
     * const removeInvalidatedListener = ctx.onInvalidated(() => {
     *   browser.runtime.onMessage.removeListener(cb);
     * })
     * // ...
     * removeInvalidatedListener();
     */
    onInvalidated(cb) {
      this.signal.addEventListener("abort", cb);
      return () => this.signal.removeEventListener("abort", cb);
    }
    /**
     * Return a promise that never resolves. Useful if you have an async function that shouldn't run
     * after the context is expired.
     *
     * @example
     * const getValueFromStorage = async () => {
     *   if (ctx.isInvalid) return ctx.block();
     *
     *   // ...
     * }
     */
    block() {
      return new Promise(() => {
      });
    }
    /**
     * Wrapper around `window.setInterval` that automatically clears the interval when invalidated.
     */
    setInterval(handler, timeout) {
      const id = setInterval(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearInterval(id));
      return id;
    }
    /**
     * Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.
     */
    setTimeout(handler, timeout) {
      const id = setTimeout(() => {
        if (this.isValid) handler();
      }, timeout);
      this.onInvalidated(() => clearTimeout(id));
      return id;
    }
    /**
     * Wrapper around `window.requestAnimationFrame` that automatically cancels the request when
     * invalidated.
     */
    requestAnimationFrame(callback2) {
      const id = requestAnimationFrame((...args) => {
        if (this.isValid) callback2(...args);
      });
      this.onInvalidated(() => cancelAnimationFrame(id));
      return id;
    }
    /**
     * Wrapper around `window.requestIdleCallback` that automatically cancels the request when
     * invalidated.
     */
    requestIdleCallback(callback2, options) {
      const id = requestIdleCallback((...args) => {
        if (!this.signal.aborted) callback2(...args);
      }, options);
      this.onInvalidated(() => cancelIdleCallback(id));
      return id;
    }
    /**
     * Call `target.addEventListener` and remove the event listener when the context is invalidated.
     *
     * Includes additional events useful for content scripts:
     *
     * - `"wxt:locationchange"` - Triggered when HTML5 history mode is used to change URL. Content
     *   scripts are not reloaded when navigating this way, so this can be used to reset the content
     *   script state on URL change, or run custom code.
     *
     * @example
     * ctx.addEventListener(document, "visibilitychange", () => {
     *   // ...
     * });
     * ctx.addEventListener(document, "wxt:locationchange", () => {
     *   // ...
     * });
     */
    addEventListener(target, type, handler, options) {
      var _a2;
      if (type === "wxt:locationchange") {
        if (this.isValid) this.locationWatcher.run();
      }
      (_a2 = target.addEventListener) == null ? void 0 : _a2.call(
        target,
        type.startsWith("wxt:") ? getUniqueEventName(type) : type,
        // @ts-expect-error: Event don't match, but that's OK, EventTarget doesn't allow custom types in the callback
        handler,
        {
          ...options,
          signal: this.signal
        }
      );
    }
    /**
     * @internal
     * Abort the abort controller and execute all `onInvalidated` listeners.
     */
    notifyInvalidated() {
      this.abort("Content script context invalidated");
      logger$1.debug(
        `Content script "${this.contentScriptName}" context invalidated`
      );
    }
    stopOldScripts() {
      window.postMessage(
        {
          type: _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE,
          contentScriptName: this.contentScriptName
        },
        "*"
      );
    }
    listenForNewerScripts(options) {
      let isFirst = true;
      const cb = (event) => {
        var _a2, _b2;
        if (((_a2 = event.data) == null ? void 0 : _a2.type) === _ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE && ((_b2 = event.data) == null ? void 0 : _b2.contentScriptName) === this.contentScriptName) {
          const wasFirst = isFirst;
          isFirst = false;
          if (wasFirst && (options == null ? void 0 : options.ignoreFirstEvent)) return;
          this.notifyInvalidated();
        }
      };
      addEventListener("message", cb);
      this.onInvalidated(() => removeEventListener("message", cb));
    }
  };
  __publicField(_ContentScriptContext, "SCRIPT_STARTED_MESSAGE_TYPE", getUniqueEventName(
    "wxt:content-script-started"
  ));
  let ContentScriptContext = _ContentScriptContext;
  function initPlugins() {
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  const result = (async () => {
    try {
      initPlugins();
      const { main, ...options } = definition;
      const ctx = new ContentScriptContext("content", options);
      return await main(ctx);
    } catch (err) {
      logger.error(
        `The content script "${"content"}" crashed on startup!`,
        err
      );
      throw err;
    }
  })();
  return result;
}();
content;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3d4dEAwLjE5LjE2X0B0eXBlcytub2RlQDIyLjkuM19yb2xsdXBANC4yNy40L25vZGVfbW9kdWxlcy93eHQvZGlzdC9zYW5kYm94L2RlZmluZS1jb250ZW50LXNjcmlwdC5tanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvaGFuZGxlLWNhbGxiYWNrLW9mLWVsZW1lbnRzLnRzIiwiLi4vLi4vLi4vYXBwLm1hbmlmZXN0LnRzIiwiLi4vLi4vLi4vc3JjL21lc3NhZ2UtdHlwZXMudHMiLCIuLi8uLi8uLi9zcmMvcmVwb3NpdG9yaWVzL21lc3NhZ2UtYXBpLnRzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL3NsZWVwLnRzIiwiLi4vLi4vLi4vYXBwLmNvbmZpZy50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9mYXJ0LWVmZmVjdC9zdGFpbi13aW5kb3cudHMiLCIuLi8uLi8uLi9zcmMvdHlwZXMvZmFydC1tb2RlLnRzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL2ZhcnQtZWZmZWN0L3Zpc3VhbC1lZmZlY3QudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZ2V0LXJlbGF0aXZlLW1vdXNlLXBvcy50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9mYXJ0LWVmZmVjdC9pbmRleC50cyIsIi4uLy4uLy4uL3NyYy9lbnRyeXBvaW50cy9jb250ZW50L2luZGV4LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3d4dEAwLjE5LjE2X0B0eXBlcytub2RlQDIyLjkuM19yb2xsdXBANC4yNy40L25vZGVfbW9kdWxlcy93eHQvZGlzdC9icm93c2VyL2Nocm9tZS5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMTZfQHR5cGVzK25vZGVAMjIuOS4zX3JvbGx1cEA0LjI3LjQvbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3NhbmRib3gvdXRpbHMvbG9nZ2VyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4xNl9AdHlwZXMrbm9kZUAyMi45LjNfcm9sbHVwQDQuMjcuNC9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvY2xpZW50L2NvbnRlbnQtc2NyaXB0cy9jdXN0b20tZXZlbnRzLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4xNl9AdHlwZXMrbm9kZUAyMi45LjNfcm9sbHVwQDQuMjcuNC9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvY2xpZW50L2NvbnRlbnQtc2NyaXB0cy9sb2NhdGlvbi13YXRjaGVyLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4xNl9AdHlwZXMrbm9kZUAyMi45LjNfcm9sbHVwQDQuMjcuNC9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvY2xpZW50L2NvbnRlbnQtc2NyaXB0cy9jb250ZW50LXNjcmlwdC1jb250ZXh0Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZGVmaW5lQ29udGVudFNjcmlwdChkZWZpbml0aW9uKSB7XG4gIHJldHVybiBkZWZpbml0aW9uO1xufVxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZENhbGxiYWNrVG9FbGVtZW50cyhcbiAgdGFyZ2V0OiBEb2N1bWVudCB8IEVsZW1lbnQsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIGV2ZW50OiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkXG4pIHtcbiAgLy8gZ2V0IGNvbmZpZyBhbmQgYmxpbmRzXG4gIGxldCBlbGVtZW50cyA9IEFycmF5LmZyb20odGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpKTtcbiAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ2FsbGJhY2tGcm9tRWxlbWVudHMoXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIGV2ZW50OiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkXG4pIHtcbiAgLy8gZ2V0IGNvbmZpZyBhbmQgYmxpbmRzXG4gIGxldCBlbGVtZW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4ocXVlcnkpKTtcbiAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgVXNlck1hbmlmZXN0IH0gZnJvbSBcInd4dFwiO1xuXG5jb25zdCBNYW5pZmVzdDogVXNlck1hbmlmZXN0ID0ge1xuICBuYW1lOiBcIkZhcnRpZnlcIixcbiAgdmVyc2lvbjogXCIxLjAuMFwiLFxuICBwZXJtaXNzaW9uczogW1wic3RvcmFnZVwiLCBcImFjdGl2ZVRhYlwiLCBcImJhY2tncm91bmRcIl0sXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogW1wic291bmRzLypcIl0sXG4gICAgICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxuICAgIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5pZmVzdDtcbiIsImltcG9ydCBNYW5pZmVzdCBmcm9tIFwiQG1hbmlmZXN0XCI7XG5cbmNvbnN0IGFwcE5hbWUgPSBNYW5pZmVzdC5uYW1lITtcbmV4cG9ydCBjbGFzcyBNZXNzYWdlVHlwZSB7XG4gIHByaXZhdGUgbmFtZXNwYWNlOiBzdHJpbmc7XG4gIHJlYWRvbmx5IEdFVDogc3RyaW5nO1xuICByZWFkb25seSBTRVQ6IHN0cmluZztcbiAgcHJpdmF0ZSBmb3JtYXQodHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5uYW1lc3BhY2V9OiR7dHlwZX1gO1xuICB9XG4gIGNvbnN0cnVjdG9yKG5hbWVzcGFjZTogc3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UgPSBgJHthcHBOYW1lfToke25hbWVzcGFjZX1gO1xuICAgIHRoaXMuR0VUID0gdGhpcy5mb3JtYXQoXCJHRVRcIik7XG4gICAgdGhpcy5TRVQgPSB0aGlzLmZvcm1hdChcIlNFVFwiKTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2U7XG4gIH1cbn1cblxuY2xhc3MgQXBwTWVzc2FnZVR5cGVzIHtcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZyA9IG5ldyBNZXNzYWdlVHlwZShcImNvbmZpZ1wiKTtcbiAgc3RhdGljIHJlYWRvbmx5IGlzQWN0aXZhdGVkID0gbmV3IE1lc3NhZ2VUeXBlKFwiaXMtYWN0aXZhdGVkXCIpO1xuICBzdGF0aWMgcmVhZG9ubHkgc291bmQgPSBuZXcgTWVzc2FnZVR5cGUoXCJzb3VuZFwiKTtcbiAgc3RhdGljIHJlYWRvbmx5IHNvdW5kTGlzdCA9IG5ldyBNZXNzYWdlVHlwZShcInNvdW5kLWxpc3RcIik7XG4gIHN0YXRpYyByZWFkb25seSBwcm9iYWJpbGl0eSA9IG5ldyBNZXNzYWdlVHlwZShcInByb2JhYmlsaXR5XCIpO1xuICBzdGF0aWMgcmVhZG9ubHkgZmFydE1vZGUgPSBuZXcgTWVzc2FnZVR5cGUoXCJmYXJ0LW1vZGVcIik7XG4gIHN0YXRpYyByZWFkb25seSB1cGRhdGUgPSBuZXcgTWVzc2FnZVR5cGUoXCJ1cGRhdGVcIik7XG59XG5cbmV4cG9ydCBjb25zdCBtZXNzYWdlSXNGb3JUaGlzQXBwID0gKHR5cGU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdHlwZS5zdGFydHNXaXRoKGFwcE5hbWUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwTWVzc2FnZVR5cGVzO1xuIiwiaW1wb3J0IEFwcE1lc3NhZ2VUeXBlcyBmcm9tIFwiQC9tZXNzYWdlLXR5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIkAvbWVzc2FnZS10eXBlc1wiO1xuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSBcIkAvdHlwZXMvY29uZmlnXCI7XG5pbXBvcnQgeyBBcHBSZXBvc2l0b3J5LCBJUmVwb3NpdG9yeSB9IGZyb20gXCJAL3R5cGVzL3JlcG9zaXRvcnlcIjtcblxuY2xhc3MgQXBpPFQ+IGltcGxlbWVudHMgSVJlcG9zaXRvcnk8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IHR5cGVfOiBNZXNzYWdlVHlwZTtcbiAgY29uc3RydWN0b3IodHlwZTogTWVzc2FnZVR5cGUpIHtcbiAgICB0aGlzLnR5cGVfID0gdHlwZTtcbiAgfVxuICBnZXQgPSBhc3luYyAoKTogUHJvbWlzZTxUPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogdGhpcy50eXBlXy5HRVQgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBzZXQgPSBhc3luYyAodmFsdWU6IFQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaHJvbWUucnVudGltZVxuICAgICAgLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlXy5TRVQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbmNvbnN0IEFwcEFwaTogQXBwUmVwb3NpdG9yeSA9IHtcbiAgY29uZmlnOiBuZXcgQXBpPEFwcENvbmZpZz4oQXBwTWVzc2FnZVR5cGVzLmNvbmZpZyksXG4gIGlzQWN0aXZhdGVkOiBuZXcgQXBpPGJvb2xlYW4+KEFwcE1lc3NhZ2VUeXBlcy5pc0FjdGl2YXRlZCksXG4gIHNvdW5kOiBuZXcgQXBpPHN0cmluZz4oQXBwTWVzc2FnZVR5cGVzLnNvdW5kKSxcbiAgcHJvYmFiaWxpdHk6IG5ldyBBcGk8bnVtYmVyPihBcHBNZXNzYWdlVHlwZXMucHJvYmFiaWxpdHkpLFxuICBmYXJ0TW9kZTogbmV3IEFwaTxzdHJpbmc+KEFwcE1lc3NhZ2VUeXBlcy5mYXJ0TW9kZSksXG4gIHNvdW5kTGlzdDogbmV3IEFwaTxzdHJpbmdbXT4oQXBwTWVzc2FnZVR5cGVzLnNvdW5kTGlzdCksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBBcGk7XG4iLCJjb25zdCBzbGVlcCA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG5leHBvcnQgZGVmYXVsdCBzbGVlcDtcbiIsImltcG9ydCBzb3VuZHNMaXN0IGZyb20gXCIuL3NyYy9zb3VuZHMtbGlzdC5qc29uXCI7XG5cbmNvbnN0IENvbmZpZyA9IHtcbiAgaXNBY3RpdmF0ZWQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlLFxuICAgIGZhbGxiYWNrOiBmYWxzZSxcbiAgfSxcbiAgZmFydE1vZGU6IHtcbiAgICBkZWZhdWx0OiBcIm5hdHVyYWxcIixcbiAgICBmYWxsYmFjazogXCJuYXR1cmFsXCIsXG4gIH0sXG4gIHNvdW5kOiB7XG4gICAgZGVmYXVsdDogXCJcIixcbiAgICBmYWxsYmFjazogXCJzb3VuZHMvZmFydC8wMSDjg5bjg6rjg4PvvIEubXAzXCIsXG4gIH0sXG4gIGFsbFNvdW5kczoge1xuICAgIGRlZmF1bHQ6IHNvdW5kc0xpc3QuZmlsZXMsXG4gICAgZmFsbGJhY2s6IHNvdW5kc0xpc3QuZmlsZXMsXG4gIH0sXG4gIHByb2JhYmlsaXR5OiB7XG4gICAgZGVmYXVsdDogMC4xLFxuICAgIGZhbGxiYWNrOiAwLjEsXG4gIH0sXG4gIHN0YWluQ29sb3I6IHtcbiAgICBkZWZhdWx0OiBcIiNmZmRlYWRcIixcbiAgICBmYWxsYmFjazogXCIjZmZkZWFkXCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWc7XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gXCJAY29uZmlnXCI7XG5cbmxldCBkZXB0aCA9IDA7XG5jb25zdCBtYXhPcGFjaXR5ID0gMC40O1xuXG5jb25zdCBjYWxjT3BhY2l0eSA9IChkZXB0aDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IG9wYWNpdHkgPSBkZXB0aCAvIDkwIC0gMC4xO1xuICByZXR1cm4gb3BhY2l0eSA8IDAgPyAwIDogb3BhY2l0eSA+IG1heE9wYWNpdHkgPyBtYXhPcGFjaXR5IDogb3BhY2l0eTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFpbldpbmRvdyA9IChjb3VudD86IG51bWJlcikgPT4ge1xuICBjb25zdCBzdGFpbnMgPSBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLmZhcnQtc3RhaW5cIilcbiAgKTtcbiAgaWYgKHN0YWlucy5sZW5ndGggPT09IDApIHtcbiAgICBkZXB0aCA9IDA7XG4gICAgY29uc3Qgc3RhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN0YWluLmNsYXNzTGlzdC5hZGQoXCJmYXJ0LXN0YWluXCIpO1xuICAgIHN0YWluLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IENvbmZpZy5zdGFpbkNvbG9yLmRlZmF1bHQ7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFpbik7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBkZXB0aCArPSBjb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVwdGgrKztcbiAgICB9XG4gICAgc3RhaW5zLmZvckVhY2goKHN0YWluKSA9PiB7XG4gICAgICBzdGFpbi5zdHlsZS5vcGFjaXR5ID0gY2FsY09wYWNpdHkoZGVwdGgpLnRvU3RyaW5nKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBjbGVhclN0YWluID0gKCkgPT4ge1xuICBjb25zdCBzdGFpbnMgPSBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLmZhcnQtc3RhaW5cIilcbiAgKTtcbiAgc3RhaW5zLmZvckVhY2goKHN0YWluKSA9PiB7XG4gICAgc3RhaW4ucmVtb3ZlKCk7XG4gIH0pO1xuICBkZXB0aCA9IDA7XG59O1xuIiwiZXhwb3J0IGNvbnN0IEZhcnRNb2RlcyA9IHtcbiAgTkFUVVJBTDogXCJzb21ldGltZXNcIixcbiAgRlJFUVVFTlQ6IFwiZnJlcXVlbnRseVwiLFxuICBBTExXQVlTOiBcImFsbHdheXNcIixcbiAgQkFaT09LQTogXCJiYXpvb2thXCIsXG59IGFzIGNvbnN0O1xudHlwZSBGYXJ0TW9kZSA9ICh0eXBlb2YgRmFydE1vZGVzKVtrZXlvZiB0eXBlb2YgRmFydE1vZGVzXTtcblxuZXhwb3J0IGRlZmF1bHQgRmFydE1vZGU7XG4iLCJjb25zdCBjcmVhdGVDaGlsZEVmZmVjdCA9IChzY2FsZSA9IDEpOiBIVE1MRWxlbWVudCA9PiB7XG4gIGNvbnN0IHNpemUgPSAoTWF0aC5yYW5kb20oKSAqIDAuNSArIDAuMSkgKiBzY2FsZTtcbiAgY29uc3QgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogMzYwO1xuICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZWxlbS5jbGFzc05hbWUgPSBcImNsaWNrLWVmZmVjdC1mcmFnbWVudFwiO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgLS1hbmdsZTogJHthbmdsZX1kZWc7XG4gICAgLS1ibHVyOiAkezAuNSAqIHNjYWxlfXJlbTtcbiAgICB0b3A6ICR7LXNpemUgLyAyfXJlbTtcbiAgICBsZWZ0OiAkey1zaXplIC8gMn1yZW07XG4gICAgd2lkdGg6ICR7c2l6ZX1yZW07XG4gICAgaGVpZ2h0OiAke3NpemV9cmVtO1xuICBgO1xuICByZXR1cm4gZWxlbTtcbn07XG5cbmNvbnN0IHZpc3VhbEVmZmVjdCA9IGFzeW5jIChwb3M6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSwgc2NhbGU/OiBudW1iZXIpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGl2LmNsYXNzTmFtZSA9IFwiY2xpY2stZWZmZWN0LWNvbnRhaW5lclwiO1xuICBkaXYuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICB0b3A6ICR7cG9zLnl9cHg7XG4gICAgbGVmdDogJHtwb3MueH1weDtcbiAgICAtLWFuZ2xlOiAke01hdGgucmFuZG9tKCkgKiAxMjAgLSA2MH1kZWc7XG4gICAgLS1kaXN0YW5jZTogJHsxOCAqIChzY2FsZSA/IHNjYWxlIDogMSl9cmVtO1xuICAgIC0tcHJlLXRpbWVzcGFuOiAkezMgKiAoc2NhbGUgPyBzY2FsZSA6IDEpfXM7XG4gICAgLS1hZnRlci10aW1lc3BhbjogMXM7XG4gIGA7XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjb25zdCBmU2l6ZSA9IDMgKyAyICogKHNjYWxlID8gc2NhbGUgOiAxKTtcbiAgY29uc3QgYW5pbWF0aW9uczogUHJvbWlzZTxBbmltYXRpb24+W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmU2l6ZTsgaSsrKSB7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlQ2hpbGRFZmZlY3Qoc2NhbGUpKTtcbiAgfVxuICBkaXYuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZlNpemU7IGkrKykge1xuICAgIGFuaW1hdGlvbnMucHVzaChcbiAgICAgIC4uLmRpdi5jaGlsZHJlbltpXS5nZXRBbmltYXRpb25zKCkubWFwKChhbmltYXRpb24pID0+IGFuaW1hdGlvbi5maW5pc2hlZClcbiAgICApO1xuICB9XG4gIGFuaW1hdGlvbnMucHVzaChcbiAgICAuLi5kaXYuZ2V0QW5pbWF0aW9ucygpLm1hcCgoYW5pbWF0aW9uKSA9PiBhbmltYXRpb24uZmluaXNoZWQpXG4gICk7XG4gIGNvbnNvbGUubG9nKGFuaW1hdGlvbnMubGVuZ3RoKTtcbiAgUHJvbWlzZS5hbGwoYW5pbWF0aW9ucykudGhlbigoKSA9PiBkaXYucmVtb3ZlKCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmlzdWFsRWZmZWN0O1xuIiwiY29uc3QgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICBjb25zdCByZWN0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgIHk6IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJlbGF0aXZlTW91c2VQb3NpdGlvbjtcbiIsImltcG9ydCBBcHBBcGkgZnJvbSBcIkAvcmVwb3NpdG9yaWVzL21lc3NhZ2UtYXBpXCI7XG5pbXBvcnQgc2xlZXAgZnJvbSBcIi4uL3NsZWVwXCI7XG5pbXBvcnQgeyBzdGFpbldpbmRvdyB9IGZyb20gXCJAL3V0aWxzL2ZhcnQtZWZmZWN0L3N0YWluLXdpbmRvd1wiO1xuaW1wb3J0IHsgRmFydE1vZGVzIH0gZnJvbSBcIkAvdHlwZXMvZmFydC1tb2RlXCI7XG5pbXBvcnQgdmlzdWFsRWZmZWN0IGZyb20gXCIuL3Zpc3VhbC1lZmZlY3RcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uIGZyb20gXCIuLi9nZXQtcmVsYXRpdmUtbW91c2UtcG9zXCI7XG5cbmNvbnN0IGZhcnQgPSBhc3luYyAoXG4gIGV2ZW50OiBNb3VzZUV2ZW50IHwgUmVhY3QuTW91c2VFdmVudCxcbiAgcHJvYmFiaWxpdHk/OiBudW1iZXJcbikgPT4ge1xuICBjb25zdCBjb25maWcgPSBhd2FpdCBBcHBBcGkuY29uZmlnLmdldCgpO1xuICBpZiAoIWNvbmZpZy5pc0FjdGl2YXRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocHJvYmFiaWxpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgIHN3aXRjaCAoY29uZmlnLm1vZGUpIHtcbiAgICAgIGNhc2UgRmFydE1vZGVzLk5BVFVSQUw6XG4gICAgICAgIHByb2JhYmlsaXR5ID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRmFydE1vZGVzLkZSRVFVRU5UOlxuICAgICAgICBwcm9iYWJpbGl0eSA9IDAuNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZhcnRNb2Rlcy5BTExXQVlTOlxuICAgICAgICBwcm9iYWJpbGl0eSA9IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGYXJ0TW9kZXMuQkFaT09LQTpcbiAgICAgICAgcHJvYmFiaWxpdHkgPSAxMC45O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHByb2JhYmlsaXR5ID0gMC4xO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgY29uc3QgdGltZXMgPSBNYXRoLmNlaWwocHJvYmFiaWxpdHkhKTtcbiAgaWYgKHByb2JhYmlsaXR5ISAhPT0gdGltZXMpIHtcbiAgICBwcm9iYWJpbGl0eSA9IHByb2JhYmlsaXR5ISAtIE1hdGguZmxvb3IocHJvYmFiaWxpdHkhKTtcbiAgfVxuICBjb25zdCBwb3MgPSBnZXRSZWxhdGl2ZU1vdXNlUG9zaXRpb24oZXZlbnQpO1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IHByb2JhYmlsaXR5ISkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb3VudCsrO1xuICB9XG4gIGlmIChjb3VudCA+IDApIHtcbiAgICBjb25zdCBwID0gdmlzdWFsRWZmZWN0KHBvcywgY291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgdXJpID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKGF3YWl0IEFwcEFwaS5zb3VuZC5nZXQoKSk7XG4gICAgICBjb25zdCBhdWRpbyA9IG5ldyBBdWRpbyh1cmkpO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgYXdhaXQgc2xlZXAoTWF0aC5yYW5kb20oKSAqIDYwICsgNDApO1xuICAgIH1cbiAgICBzdGFpbldpbmRvdyhjb3VudCk7XG4gICAgYXdhaXQgcDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmFydDtcbiIsImltcG9ydCB0eXBlIHsgQ29udGVudFNjcmlwdENvbnRleHQgfSBmcm9tIFwid3h0L2NsaWVudFwiO1xuaW1wb3J0IHtcbiAgYWRkQ2FsbGJhY2tUb0VsZW1lbnRzIGFzIGFkZENhbGxiYWNrLFxuICByZW1vdmVDYWxsYmFja0Zyb21FbGVtZW50cyBhcyByZW1vdmVDYWxsYmFjayxcbn0gZnJvbSBcIkAvdXRpbHMvaGFuZGxlLWNhbGxiYWNrLW9mLWVsZW1lbnRzXCI7XG5pbXBvcnQgQXBwQXBpIGZyb20gXCJAL3JlcG9zaXRvcmllcy9tZXNzYWdlLWFwaVwiO1xuaW1wb3J0IEFwcE1lc3NhZ2VUeXBlcyBmcm9tIFwiQC9tZXNzYWdlLXR5cGVzXCI7XG5pbXBvcnQgZmFydCBmcm9tIFwiQC91dGlscy9mYXJ0LWVmZmVjdFwiO1xuaW1wb3J0IHsgY2xlYXJTdGFpbiB9IGZyb20gXCIuLi8uLi91dGlscy9mYXJ0LWVmZmVjdC9zdGFpbi13aW5kb3dcIjtcblxuY29uc3QgdGFyZ2V0RWxlbWVudCA9XG4gICdidXR0b24sIFtocmVmXSwgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSwgaW5wdXRbdHlwZT1cImJ1dHRvblwiXSwgaW5wdXRbdHlwZT1cInJlc2V0XCJdJztcblxuY29uc3QgY2FsbGJhY2sgPSBhc3luYyA8RSBleHRlbmRzIEV2ZW50PihlOiBFKSA9PiB7XG4gIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgIGZhcnQoZSk7XG4gIH1cbn07XG5cbmNsYXNzIERPTU9ic2VydmVyIHtcbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcbiAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09IFwiY2hpbGRMaXN0XCIpIHtcbiAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICBhZGRDYWxsYmFjayhub2RlIGFzIEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIFwiY2xpY2tcIiwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBvYnNlcnZlKCkge1xuICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xuICB9XG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH1cbn1cbmxldCBvYnNlcnZlcjogRE9NT2JzZXJ2ZXI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbnRlbnRTY3JpcHQoe1xuICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxuICBhc3luYyBtYWluKGN0eDogQ29udGVudFNjcmlwdENvbnRleHQpIHtcbiAgICBvYnNlcnZlciA9IG5ldyBET01PYnNlcnZlcigpO1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IEFwcE1lc3NhZ2VUeXBlcy51cGRhdGUuU0VUKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2YXRlID0gbWVzc2FnZS52YWx1ZTtcbiAgICAgICAgaWYgKGFjdGl2YXRlKSB7XG4gICAgICAgICAgYWRkQ2FsbGJhY2soZG9jdW1lbnQsIHRhcmdldEVsZW1lbnQsIFwiY2xpY2tcIiwgY2FsbGJhY2spO1xuICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVDYWxsYmFjayh0YXJnZXRFbGVtZW50LCBcImNsaWNrXCIsIGNhbGxiYWNrKTtcbiAgICAgICAgICBjbGVhclN0YWluKCk7XG4gICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgaXNBY3RpdmF0ZWQgPSBhd2FpdCBBcHBBcGkuaXNBY3RpdmF0ZWQuZ2V0KCk7XG4gICAgaWYgKGlzQWN0aXZhdGVkKSB7XG4gICAgICBhZGRDYWxsYmFjayhkb2N1bWVudCwgdGFyZ2V0RWxlbWVudCwgXCJjbGlja1wiLCBjYWxsYmFjayk7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKCk7XG4gICAgfVxuICB9LFxufSk7XG4iLCJleHBvcnQgY29uc3QgYnJvd3NlciA9IChcbiAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICBnbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWU/LmlkID09IG51bGwgPyBnbG9iYWxUaGlzLmNocm9tZSA6IChcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgZ2xvYmFsVGhpcy5icm93c2VyXG4gIClcbik7XG4iLCJmdW5jdGlvbiBwcmludChtZXRob2QsIC4uLmFyZ3MpIHtcbiAgaWYgKGltcG9ydC5tZXRhLmVudi5NT0RFID09PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuO1xuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJncy5zaGlmdCgpO1xuICAgIG1ldGhvZChgW3d4dF0gJHttZXNzYWdlfWAsIC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIG1ldGhvZChcIlt3eHRdXCIsIC4uLmFyZ3MpO1xuICB9XG59XG5leHBvcnQgY29uc3QgbG9nZ2VyID0ge1xuICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZGVidWcsIC4uLmFyZ3MpLFxuICBsb2c6ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLmxvZywgLi4uYXJncyksXG4gIHdhcm46ICguLi5hcmdzKSA9PiBwcmludChjb25zb2xlLndhcm4sIC4uLmFyZ3MpLFxuICBlcnJvcjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUuZXJyb3IsIC4uLmFyZ3MpXG59O1xuIiwiaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gXCJ3eHQvYnJvd3NlclwiO1xuZXhwb3J0IGNsYXNzIFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIGNvbnN0cnVjdG9yKG5ld1VybCwgb2xkVXJsKSB7XG4gICAgc3VwZXIoV3h0TG9jYXRpb25DaGFuZ2VFdmVudC5FVkVOVF9OQU1FLCB7fSk7XG4gICAgdGhpcy5uZXdVcmwgPSBuZXdVcmw7XG4gICAgdGhpcy5vbGRVcmwgPSBvbGRVcmw7XG4gIH1cbiAgc3RhdGljIEVWRU5UX05BTUUgPSBnZXRVbmlxdWVFdmVudE5hbWUoXCJ3eHQ6bG9jYXRpb25jaGFuZ2VcIik7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5pcXVlRXZlbnROYW1lKGV2ZW50TmFtZSkge1xuICBjb25zdCBlbnRyeXBvaW50TmFtZSA9IHR5cGVvZiBpbXBvcnQubWV0YS5lbnYgPT09IFwidW5kZWZpbmVkXCIgPyBcImJ1aWxkXCIgOiBpbXBvcnQubWV0YS5lbnYuRU5UUllQT0lOVDtcbiAgcmV0dXJuIGAke2Jyb3dzZXI/LnJ1bnRpbWU/LmlkfToke2VudHJ5cG9pbnROYW1lfToke2V2ZW50TmFtZX1gO1xufVxuIiwiaW1wb3J0IHsgV3h0TG9jYXRpb25DaGFuZ2VFdmVudCB9IGZyb20gXCIuL2N1c3RvbS1ldmVudHMubWpzXCI7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb25XYXRjaGVyKGN0eCkge1xuICBsZXQgaW50ZXJ2YWw7XG4gIGxldCBvbGRVcmw7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBsb2NhdGlvbiB3YXRjaGVyIGlzIGFjdGl2ZWx5IGxvb2tpbmcgZm9yIFVSTCBjaGFuZ2VzLiBJZiBpdCdzIGFscmVhZHkgd2F0Y2hpbmcsXG4gICAgICogdGhpcyBpcyBhIG5vb3AuXG4gICAgICovXG4gICAgcnVuKCkge1xuICAgICAgaWYgKGludGVydmFsICE9IG51bGwpIHJldHVybjtcbiAgICAgIG9sZFVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG4gICAgICBpbnRlcnZhbCA9IGN0eC5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGxldCBuZXdVcmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAobmV3VXJsLmhyZWYgIT09IG9sZFVybC5ocmVmKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQobmV3VXJsLCBvbGRVcmwpKTtcbiAgICAgICAgICBvbGRVcmwgPSBuZXdVcmw7XG4gICAgICAgIH1cbiAgICAgIH0sIDFlMyk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gXCJ3eHQvYnJvd3NlclwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4uLy4uL3NhbmRib3gvdXRpbHMvbG9nZ2VyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0VW5pcXVlRXZlbnROYW1lIH0gZnJvbSBcIi4vY3VzdG9tLWV2ZW50cy5tanNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvY2F0aW9uV2F0Y2hlciB9IGZyb20gXCIuL2xvY2F0aW9uLXdhdGNoZXIubWpzXCI7XG5leHBvcnQgY2xhc3MgQ29udGVudFNjcmlwdENvbnRleHQge1xuICBjb25zdHJ1Y3Rvcihjb250ZW50U2NyaXB0TmFtZSwgb3B0aW9ucykge1xuICAgIHRoaXMuY29udGVudFNjcmlwdE5hbWUgPSBjb250ZW50U2NyaXB0TmFtZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGlmICh0aGlzLmlzVG9wRnJhbWUpIHtcbiAgICAgIHRoaXMubGlzdGVuRm9yTmV3ZXJTY3JpcHRzKHsgaWdub3JlRmlyc3RFdmVudDogdHJ1ZSB9KTtcbiAgICAgIHRoaXMuc3RvcE9sZFNjcmlwdHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdlclNjcmlwdHMoKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIFNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSA9IGdldFVuaXF1ZUV2ZW50TmFtZShcbiAgICBcInd4dDpjb250ZW50LXNjcmlwdC1zdGFydGVkXCJcbiAgKTtcbiAgaXNUb3BGcmFtZSA9IHdpbmRvdy5zZWxmID09PSB3aW5kb3cudG9wO1xuICBhYm9ydENvbnRyb2xsZXI7XG4gIGxvY2F0aW9uV2F0Y2hlciA9IGNyZWF0ZUxvY2F0aW9uV2F0Y2hlcih0aGlzKTtcbiAgZ2V0IHNpZ25hbCgpIHtcbiAgICByZXR1cm4gdGhpcy5hYm9ydENvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG4gIGFib3J0KHJlYXNvbikge1xuICAgIHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydChyZWFzb24pO1xuICB9XG4gIGdldCBpc0ludmFsaWQoKSB7XG4gICAgaWYgKGJyb3dzZXIucnVudGltZS5pZCA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNpZ25hbC5hYm9ydGVkO1xuICB9XG4gIGdldCBpc1ZhbGlkKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0ludmFsaWQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbnRlbnQgc2NyaXB0J3MgY29udGV4dCBpcyBpbnZhbGlkYXRlZC5cbiAgICpcbiAgICogQHJldHVybnMgQSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGNiKTtcbiAgICogY29uc3QgcmVtb3ZlSW52YWxpZGF0ZWRMaXN0ZW5lciA9IGN0eC5vbkludmFsaWRhdGVkKCgpID0+IHtcbiAgICogICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLnJlbW92ZUxpc3RlbmVyKGNiKTtcbiAgICogfSlcbiAgICogLy8gLi4uXG4gICAqIHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIoKTtcbiAgICovXG4gIG9uSW52YWxpZGF0ZWQoY2IpIHtcbiAgICB0aGlzLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgY2IpO1xuICAgIHJldHVybiAoKSA9PiB0aGlzLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgY2IpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgbmV2ZXIgcmVzb2x2ZXMuIFVzZWZ1bCBpZiB5b3UgaGF2ZSBhbiBhc3luYyBmdW5jdGlvbiB0aGF0IHNob3VsZG4ndCBydW5cbiAgICogYWZ0ZXIgdGhlIGNvbnRleHQgaXMgZXhwaXJlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgZ2V0VmFsdWVGcm9tU3RvcmFnZSA9IGFzeW5jICgpID0+IHtcbiAgICogICBpZiAoY3R4LmlzSW52YWxpZCkgcmV0dXJuIGN0eC5ibG9jaygpO1xuICAgKlxuICAgKiAgIC8vIC4uLlxuICAgKiB9XG4gICAqL1xuICBibG9jaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldEludGVydmFsYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2xlYXJzIHRoZSBpbnRlcnZhbCB3aGVuIGludmFsaWRhdGVkLlxuICAgKi9cbiAgc2V0SW50ZXJ2YWwoaGFuZGxlciwgdGltZW91dCkge1xuICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuICAgIH0sIHRpbWVvdXQpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhckludGVydmFsKGlkKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKlxuICAgKiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldFRpbWVvdXRgIHRoYXQgYXV0b21hdGljYWxseSBjbGVhcnMgdGhlIGludGVydmFsIHdoZW4gaW52YWxpZGF0ZWQuXG4gICAqL1xuICBzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpIHtcbiAgICBjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuICAgIH0sIHRpbWVvdXQpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhclRpbWVvdXQoaWQpKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgLyoqXG4gICAqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGUgcmVxdWVzdCB3aGVuXG4gICAqIGludmFsaWRhdGVkLlxuICAgKi9cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzVmFsaWQpIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgIH0pO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShpZCkpO1xuICAgIHJldHVybiBpZDtcbiAgfVxuICAvKipcbiAgICogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGUgcmVxdWVzdCB3aGVuXG4gICAqIGludmFsaWRhdGVkLlxuICAgKi9cbiAgcmVxdWVzdElkbGVDYWxsYmFjayhjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGNvbnN0IGlkID0gcmVxdWVzdElkbGVDYWxsYmFjaygoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNpZ25hbC5hYm9ydGVkKSBjYWxsYmFjayguLi5hcmdzKTtcbiAgICB9LCBvcHRpb25zKTtcbiAgICB0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkKSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKlxuICAgKiBDYWxsIGB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiB0aGUgY29udGV4dCBpcyBpbnZhbGlkYXRlZC5cbiAgICpcbiAgICogSW5jbHVkZXMgYWRkaXRpb25hbCBldmVudHMgdXNlZnVsIGZvciBjb250ZW50IHNjcmlwdHM6XG4gICAqXG4gICAqIC0gYFwid3h0OmxvY2F0aW9uY2hhbmdlXCJgIC0gVHJpZ2dlcmVkIHdoZW4gSFRNTDUgaGlzdG9yeSBtb2RlIGlzIHVzZWQgdG8gY2hhbmdlIFVSTC4gQ29udGVudFxuICAgKiAgIHNjcmlwdHMgYXJlIG5vdCByZWxvYWRlZCB3aGVuIG5hdmlnYXRpbmcgdGhpcyB3YXksIHNvIHRoaXMgY2FuIGJlIHVzZWQgdG8gcmVzZXQgdGhlIGNvbnRlbnRcbiAgICogICBzY3JpcHQgc3RhdGUgb24gVVJMIGNoYW5nZSwgb3IgcnVuIGN1c3RvbSBjb2RlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjdHguYWRkRXZlbnRMaXN0ZW5lcihkb2N1bWVudCwgXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcbiAgICogICAvLyAuLi5cbiAgICogfSk7XG4gICAqIGN0eC5hZGRFdmVudExpc3RlbmVyKGRvY3VtZW50LCBcInd4dDpsb2NhdGlvbmNoYW5nZVwiLCAoKSA9PiB7XG4gICAqICAgLy8gLi4uXG4gICAqIH0pO1xuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZSA9PT0gXCJ3eHQ6bG9jYXRpb25jaGFuZ2VcIikge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZCkgdGhpcy5sb2NhdGlvbldhdGNoZXIucnVuKCk7XG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyPy4oXG4gICAgICB0eXBlLnN0YXJ0c1dpdGgoXCJ3eHQ6XCIpID8gZ2V0VW5pcXVlRXZlbnROYW1lKHR5cGUpIDogdHlwZSxcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IEV2ZW50IGRvbid0IG1hdGNoLCBidXQgdGhhdCdzIE9LLCBFdmVudFRhcmdldCBkb2Vzbid0IGFsbG93IGN1c3RvbSB0eXBlcyBpbiB0aGUgY2FsbGJhY2tcbiAgICAgIGhhbmRsZXIsXG4gICAgICB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogdGhpcy5zaWduYWxcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQWJvcnQgdGhlIGFib3J0IGNvbnRyb2xsZXIgYW5kIGV4ZWN1dGUgYWxsIGBvbkludmFsaWRhdGVkYCBsaXN0ZW5lcnMuXG4gICAqL1xuICBub3RpZnlJbnZhbGlkYXRlZCgpIHtcbiAgICB0aGlzLmFib3J0KFwiQ29udGVudCBzY3JpcHQgY29udGV4dCBpbnZhbGlkYXRlZFwiKTtcbiAgICBsb2dnZXIuZGVidWcoXG4gICAgICBgQ29udGVudCBzY3JpcHQgXCIke3RoaXMuY29udGVudFNjcmlwdE5hbWV9XCIgY29udGV4dCBpbnZhbGlkYXRlZGBcbiAgICApO1xuICB9XG4gIHN0b3BPbGRTY3JpcHRzKCkge1xuICAgIHdpbmRvdy5wb3N0TWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgdHlwZTogQ29udGVudFNjcmlwdENvbnRleHQuU0NSSVBUX1NUQVJURURfTUVTU0FHRV9UWVBFLFxuICAgICAgICBjb250ZW50U2NyaXB0TmFtZTogdGhpcy5jb250ZW50U2NyaXB0TmFtZVxuICAgICAgfSxcbiAgICAgIFwiKlwiXG4gICAgKTtcbiAgfVxuICBsaXN0ZW5Gb3JOZXdlclNjcmlwdHMob3B0aW9ucykge1xuICAgIGxldCBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICBjb25zdCBjYiA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmRhdGE/LnR5cGUgPT09IENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSAmJiBldmVudC5kYXRhPy5jb250ZW50U2NyaXB0TmFtZSA9PT0gdGhpcy5jb250ZW50U2NyaXB0TmFtZSkge1xuICAgICAgICBjb25zdCB3YXNGaXJzdCA9IGlzRmlyc3Q7XG4gICAgICAgIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgaWYgKHdhc0ZpcnN0ICYmIG9wdGlvbnM/Lmlnbm9yZUZpcnN0RXZlbnQpIHJldHVybjtcbiAgICAgICAgdGhpcy5ub3RpZnlJbnZhbGlkYXRlZCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgY2IpO1xuICAgIHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiByZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBjYikpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZGVmaW5pdGlvbiIsImNhbGxiYWNrIiwicmVzdWx0IiwiZGVwdGgiLCJhZGRDYWxsYmFjayIsInJlbW92ZUNhbGxiYWNrIiwicHJpbnQiLCJsb2dnZXIiLCJfYSIsIl9iIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxXQUFTLG9CQUFvQkEsYUFBWTtBQUM5QyxXQUFPQTtBQUFBLEVBQ1Q7QUNGQSxpQkFBc0Isc0JBQ3BCLFFBQ0EsT0FDQSxPQUNBQyxXQUNBO0FBRUEsUUFBSSxXQUFXLE1BQU0sS0FBSyxPQUFPLGlCQUFpQixLQUFLLENBQUM7QUFFL0MsYUFBQSxRQUFRLENBQUMsU0FBUztBQUNwQixXQUFBLG9CQUFvQixPQUFPQSxTQUFRO0FBQ25DLFdBQUEsaUJBQWlCLE9BQU9BLFNBQVE7QUFBQSxJQUFBLENBQ3RDO0FBQUEsRUFDSDtBQUVzQixpQkFBQSwyQkFDcEIsT0FDQSxPQUNBQSxXQUNBO0FBRUEsUUFBSSxXQUFXLE1BQU0sS0FBSyxTQUFTLGlCQUE4QixLQUFLLENBQUM7QUFFOUQsYUFBQSxRQUFRLENBQUMsU0FBUztBQUNwQixXQUFBLG9CQUFvQixPQUFPQSxTQUFRO0FBQUEsSUFBQSxDQUN6QztBQUFBLEVBQ0g7O0FDeEJBLFFBQU0sV0FBeUI7QUFBQSxJQUM3QixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxhQUFhLENBQUMsV0FBVyxhQUFhLFlBQVk7QUFBQSxJQUNsRCwwQkFBMEI7QUFBQSxNQUN4QjtBQUFBLFFBQ0UsV0FBVyxDQUFDLFVBQVU7QUFBQSxRQUN0QixTQUFTLENB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
