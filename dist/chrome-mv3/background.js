var background = function() {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  var _a, _b, _c, _d;
  function defineBackground(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  var _MatchPattern = class {
    constructor(matchPattern) {
      if (matchPattern === "<all_urls>") {
        this.isAllUrls = true;
        this.protocolMatches = [..._MatchPattern.PROTOCOLS];
        this.hostnameMatch = "*";
        this.pathnameMatch = "*";
      } else {
        const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
        if (groups == null)
          throw new InvalidMatchPattern(matchPattern, "Incorrect format");
        const [_, protocol, hostname, pathname] = groups;
        validateProtocol(matchPattern, protocol);
        validateHostname(matchPattern, hostname);
        this.protocolMatches = protocol === "*" ? ["http", "https"] : [protocol];
        this.hostnameMatch = hostname;
        this.pathnameMatch = pathname;
      }
    }
    includes(url) {
      if (this.isAllUrls)
        return true;
      const u = typeof url === "string" ? new URL(url) : url instanceof Location ? new URL(url.href) : url;
      return !!this.protocolMatches.find((protocol) => {
        if (protocol === "http")
          return this.isHttpMatch(u);
        if (protocol === "https")
          return this.isHttpsMatch(u);
        if (protocol === "file")
          return this.isFileMatch(u);
        if (protocol === "ftp")
          return this.isFtpMatch(u);
        if (protocol === "urn")
          return this.isUrnMatch(u);
      });
    }
    isHttpMatch(url) {
      return url.protocol === "http:" && this.isHostPathMatch(url);
    }
    isHttpsMatch(url) {
      return url.protocol === "https:" && this.isHostPathMatch(url);
    }
    isHostPathMatch(url) {
      if (!this.hostnameMatch || !this.pathnameMatch)
        return false;
      const hostnameMatchRegexs = [
        this.convertPatternToRegex(this.hostnameMatch),
        this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, ""))
      ];
      const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
      return !!hostnameMatchRegexs.find((regex) => regex.test(url.hostname)) && pathnameMatchRegex.test(url.pathname);
    }
    isFileMatch(url) {
      throw Error("Not implemented: file:// pattern matching. Open a PR to add support");
    }
    isFtpMatch(url) {
      throw Error("Not implemented: ftp:// pattern matching. Open a PR to add support");
    }
    isUrnMatch(url) {
      throw Error("Not implemented: urn:// pattern matching. Open a PR to add support");
    }
    convertPatternToRegex(pattern) {
      const escaped = this.escapeForRegex(pattern);
      const starsReplaced = escaped.replace(/\\\*/g, ".*");
      return RegExp(`^${starsReplaced}$`);
    }
    escapeForRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  };
  var MatchPattern = _MatchPattern;
  MatchPattern.PROTOCOLS = ["http", "https", "file", "ftp", "urn"];
  var InvalidMatchPattern = class extends Error {
    constructor(matchPattern, reason) {
      super(`Invalid match pattern "${matchPattern}": ${reason}`);
    }
  };
  function validateProtocol(matchPattern, protocol) {
    if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== "*")
      throw new InvalidMatchPattern(
        matchPattern,
        `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(", ")})`
      );
  }
  function validateHostname(matchPattern, hostname) {
    if (hostname.includes(":"))
      throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);
    if (hostname.includes("*") && hostname.length > 1 && !hostname.startsWith("*."))
      throw new InvalidMatchPattern(
        matchPattern,
        `If using a wildcard (*), it must go at the start of the hostname`
      );
  }
  const strListToPathList = (strList) => {
    const pathList = [];
    strList.forEach((str) => {
      var _a2;
      const path = {
        full: str,
        name: ((_a2 = str.match(/([^\/]+)(?=\.[^\/]+$)|([^\/]+)$/)) == null ? void 0 : _a2[0]) || ""
      };
      pathList.push(path);
    });
    return pathList;
  };
  background;
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
  background;
  class Cache {
    constructor(value) {
      __publicField(this, "value_");
      __publicField(this, "get", () => {
        return this.value_;
      });
      __publicField(this, "set", (value) => {
        this.value_ = value;
      });
      this.value_ = value;
    }
  }
  const AppCache = {
    isActivated: new Cache(Config.isActivated.default),
    sound: new Cache(Config.sound.default),
    allSounds: new Cache(strListToPathList(Config.allSounds.default)),
    probability: new Cache(Config.probability.default),
    fartMode: new Cache(Config.fartMode.default),
    config: {
      get: () => {
        return {
          isActivated: AppCache.isActivated.get(),
          sound: AppCache.sound.get(),
          probability: AppCache.probability.get(),
          mode: AppCache.fartMode.get()
        };
      },
      set: (config) => {
        AppCache.isActivated.set(config.isActivated);
        AppCache.sound.set(config.sound);
        AppCache.probability.set(config.probability);
        AppCache.fartMode.set(config.mode);
      }
    }
  };
  background;
  var has = Object.prototype.hasOwnProperty;
  function dequal(foo, bar) {
    var ctor, len;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
      if (ctor === Date) return foo.getTime() === bar.getTime();
      if (ctor === RegExp) return foo.toString() === bar.toString();
      if (ctor === Array) {
        if ((len = foo.length) === bar.length) {
          while (len-- && dequal(foo[len], bar[len])) ;
        }
        return len === -1;
      }
      if (!ctor || typeof foo === "object") {
        len = 0;
        for (ctor in foo) {
          if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
          if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
        }
        return Object.keys(bar).length === len;
      }
    }
    return foo !== foo && bar !== bar;
  }
  const E_CANCELED = new Error("request for lock canceled");
  var __awaiter$2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result2) {
        result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  class Semaphore {
    constructor(_value, _cancelError = E_CANCELED) {
      this._value = _value;
      this._cancelError = _cancelError;
      this._queue = [];
      this._weightedWaiters = [];
    }
    acquire(weight = 1, priority = 0) {
      if (weight <= 0)
        throw new Error(`invalid weight ${weight}: must be positive`);
      return new Promise((resolve, reject) => {
        const task = { resolve, reject, weight, priority };
        const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
        if (i === -1 && weight <= this._value) {
          this._dispatchItem(task);
        } else {
          this._queue.splice(i + 1, 0, task);
        }
      });
    }
    runExclusive(callback_1) {
      return __awaiter$2(this, arguments, void 0, function* (callback, weight = 1, priority = 0) {
        const [value, release] = yield this.acquire(weight, priority);
        try {
          return yield callback(value);
        } finally {
          release();
        }
      });
    }
    waitForUnlock(weight = 1, priority = 0) {
      if (weight <= 0)
        throw new Error(`invalid weight ${weight}: must be positive`);
      if (this._couldLockImmediately(weight, priority)) {
        return Promise.resolve();
      } else {
        return new Promise((resolve) => {
          if (!this._weightedWaiters[weight - 1])
            this._weightedWaiters[weight - 1] = [];
          insertSorted(this._weightedWaiters[weight - 1], { resolve, priority });
        });
      }
    }
    isLocked() {
      return this._value <= 0;
    }
    getValue() {
      return this._value;
    }
    setValue(value) {
      this._value = value;
      this._dispatchQueue();
    }
    release(weight = 1) {
      if (weight <= 0)
        throw new Error(`invalid weight ${weight}: must be positive`);
      this._value += weight;
      this._dispatchQueue();
    }
    cancel() {
      this._queue.forEach((entry) => entry.reject(this._cancelError));
      this._queue = [];
    }
    _dispatchQueue() {
      this._drainUnlockWaiters();
      while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
        this._dispatchItem(this._queue.shift());
        this._drainUnlockWaiters();
      }
    }
    _dispatchItem(item) {
      const previousValue = this._value;
      this._value -= item.weight;
      item.resolve([previousValue, this._newReleaser(item.weight)]);
    }
    _newReleaser(weight) {
      let called = false;
      return () => {
        if (called)
          return;
        called = true;
        this.release(weight);
      };
    }
    _drainUnlockWaiters() {
      if (this._queue.length === 0) {
        for (let weight = this._value; weight > 0; weight--) {
          const waiters = this._weightedWaiters[weight - 1];
          if (!waiters)
            continue;
          waiters.forEach((waiter) => waiter.resolve());
          this._weightedWaiters[weight - 1] = [];
        }
      } else {
        const queuedPriority = this._queue[0].priority;
        for (let weight = this._value; weight > 0; weight--) {
          const waiters = this._weightedWaiters[weight - 1];
          if (!waiters)
            continue;
          const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
          (i === -1 ? waiters : waiters.splice(0, i)).forEach((waiter) => waiter.resolve());
        }
      }
    }
    _couldLockImmediately(weight, priority) {
      return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
    }
  }
  function insertSorted(a, v) {
    const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
    a.splice(i + 1, 0, v);
  }
  function findIndexFromEnd(a, predicate) {
    for (let i = a.length - 1; i >= 0; i--) {
      if (predicate(a[i])) {
        return i;
      }
    }
    return -1;
  }
  var __awaiter$1 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result2) {
        result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  class Mutex {
    constructor(cancelError) {
      this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
      return __awaiter$1(this, arguments, void 0, function* (priority = 0) {
        const [, releaser] = yield this._semaphore.acquire(1, priority);
        return releaser;
      });
    }
    runExclusive(callback, priority = 0) {
      return this._semaphore.runExclusive(() => callback(), 1, priority);
    }
    isLocked() {
      return this._semaphore.isLocked();
    }
    waitForUnlock(priority = 0) {
      return this._semaphore.waitForUnlock(1, priority);
    }
    release() {
      if (this._semaphore.isLocked())
        this._semaphore.release();
    }
    cancel() {
      return this._semaphore.cancel();
    }
  }
  const browser$1 = (
    // @ts-expect-error
    ((_b = (_a = globalThis.browser) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id) == null ? globalThis.chrome : (
      // @ts-expect-error
      globalThis.browser
    )
  );
  const storage = createStorage();
  function createStorage() {
    const drivers = {
      local: createDriver("local"),
      session: createDriver("session"),
      sync: createDriver("sync"),
      managed: createDriver("managed")
    };
    const getDriver = (area) => {
      const driver = drivers[area];
      if (driver == null) {
        const areaNames = Object.keys(drivers).join(", ");
        throw Error(`Invalid area "${area}". Options: ${areaNames}`);
      }
      return driver;
    };
    const resolveKey = (key) => {
      const deliminatorIndex = key.indexOf(":");
      const driverArea = key.substring(0, deliminatorIndex);
      const driverKey = key.substring(deliminatorIndex + 1);
      if (driverKey == null)
        throw Error(
          `Storage key should be in the form of "area:key", but received "${key}"`
        );
      return {
        driverArea,
        driverKey,
        driver: getDriver(driverArea)
      };
    };
    const getMetaKey = (key) => key + "$";
    const mergeMeta = (oldMeta, newMeta) => {
      const newFields = { ...oldMeta };
      Object.entries(newMeta).forEach(([key, value]) => {
        if (value == null)
          delete newFields[key];
        else
          newFields[key] = value;
      });
      return newFields;
    };
    const getValueOrFallback = (value, fallback) => value ?? fallback ?? null;
    const getMetaValue = (properties) => typeof properties === "object" && !Array.isArray(properties) ? properties : {};
    const getItem = async (driver, driverKey, opts) => {
      const res = await driver.getItem(driverKey);
      return getValueOrFallback(res, (opts == null ? void 0 : opts.fallback) ?? (opts == null ? void 0 : opts.defaultValue));
    };
    const getMeta = async (driver, driverKey) => {
      const metaKey = getMetaKey(driverKey);
      const res = await driver.getItem(metaKey);
      return getMetaValue(res);
    };
    const setItem = async (driver, driverKey, value) => {
      await driver.setItem(driverKey, value ?? null);
    };
    const setMeta = async (driver, driverKey, properties) => {
      const metaKey = getMetaKey(driverKey);
      const existingFields = getMetaValue(await driver.getItem(metaKey));
      await driver.setItem(metaKey, mergeMeta(existingFields, properties));
    };
    const removeItem = async (driver, driverKey, opts) => {
      await driver.removeItem(driverKey);
      if (opts == null ? void 0 : opts.removeMeta) {
        const metaKey = getMetaKey(driverKey);
        await driver.removeItem(metaKey);
      }
    };
    const removeMeta = async (driver, driverKey, properties) => {
      const metaKey = getMetaKey(driverKey);
      if (properties == null) {
        await driver.removeItem(metaKey);
      } else {
        const newFields = getMetaValue(await driver.getItem(metaKey));
        [properties].flat().forEach((field) => delete newFields[field]);
        await driver.setItem(metaKey, newFields);
      }
    };
    const watch = (driver, driverKey, cb) => {
      return driver.watch(driverKey, cb);
    };
    const storage2 = {
      getItem: async (key, opts) => {
        const { driver, driverKey } = resolveKey(key);
        return await getItem(driver, driverKey, opts);
      },
      getItems: async (keys) => {
        const areaToKeyMap = /* @__PURE__ */ new Map();
        const keyToOptsMap = /* @__PURE__ */ new Map();
        const orderedKeys = [];
        keys.forEach((key) => {
          let keyStr;
          let opts;
          if (typeof key === "string") {
            keyStr = key;
          } else if ("getValue" in key) {
            keyStr = key.key;
            opts = { fallback: key.fallback };
          } else {
            keyStr = key.key;
            opts = key.options;
          }
          orderedKeys.push(keyStr);
          const { driverArea, driverKey } = resolveKey(keyStr);
          const areaKeys = areaToKeyMap.get(driverArea) ?? [];
          areaToKeyMap.set(driverArea, areaKeys.concat(driverKey));
          keyToOptsMap.set(keyStr, opts);
        });
        const resultsMap = /* @__PURE__ */ new Map();
        await Promise.all(
          Array.from(areaToKeyMap.entries()).map(async ([driverArea, keys2]) => {
            const driverResults = await drivers[driverArea].getItems(keys2);
            driverResults.forEach((driverResult) => {
              const key = `${driverArea}:${driverResult.key}`;
              const opts = keyToOptsMap.get(key);
              const value = getValueOrFallback(
                driverResult.value,
                (opts == null ? void 0 : opts.fallback) ?? (opts == null ? void 0 : opts.defaultValue)
              );
              resultsMap.set(key, value);
            });
          })
        );
        return orderedKeys.map((key) => ({
          key,
          value: resultsMap.get(key)
        }));
      },
      getMeta: async (key) => {
        const { driver, driverKey } = resolveKey(key);
        return await getMeta(driver, driverKey);
      },
      getMetas: async (args) => {
        const keys = args.map((arg) => {
          const key = typeof arg === "string" ? arg : arg.key;
          const { driverArea, driverKey } = resolveKey(key);
          return {
            key,
            driverArea,
            driverKey,
            driverMetaKey: getMetaKey(driverKey)
          };
        });
        const areaToDriverMetaKeysMap = keys.reduce((map, key) => {
          var _a2;
          map[_a2 = key.driverArea] ?? (map[_a2] = []);
          map[key.driverArea].push(key);
          return map;
        }, {});
        const resultsMap = {};
        await Promise.all(
          Object.entries(areaToDriverMetaKeysMap).map(async ([area, keys2]) => {
            const areaRes = await browser$1.storage[area].get(
              keys2.map((key) => key.driverMetaKey)
            );
            keys2.forEach((key) => {
              resultsMap[key.key] = areaRes[key.driverMetaKey] ?? {};
            });
          })
        );
        return keys.map((key) => ({
          key: key.key,
          meta: resultsMap[key.key]
        }));
      },
      setItem: async (key, value) => {
        const { driver, driverKey } = resolveKey(key);
        await setItem(driver, driverKey, value);
      },
      setItems: async (items) => {
        const areaToKeyValueMap = {};
        items.forEach((item) => {
          const { driverArea, driverKey } = resolveKey(
            "key" in item ? item.key : item.item.key
          );
          areaToKeyValueMap[driverArea] ?? (areaToKeyValueMap[driverArea] = []);
          areaToKeyValueMap[driverArea].push({
            key: driverKey,
            value: item.value
          });
        });
        await Promise.all(
          Object.entries(areaToKeyValueMap).map(async ([driverArea, values]) => {
            const driver = getDriver(driverArea);
            await driver.setItems(values);
          })
        );
      },
      setMeta: async (key, properties) => {
        const { driver, driverKey } = resolveKey(key);
        await setMeta(driver, driverKey, properties);
      },
      setMetas: async (items) => {
        const areaToMetaUpdatesMap = {};
        items.forEach((item) => {
          const { driverArea, driverKey } = resolveKey(
            "key" in item ? item.key : item.item.key
          );
          areaToMetaUpdatesMap[driverArea] ?? (areaToMetaUpdatesMap[driverArea] = []);
          areaToMetaUpdatesMap[driverArea].push({
            key: driverKey,
            properties: item.meta
          });
        });
        await Promise.all(
          Object.entries(areaToMetaUpdatesMap).map(
            async ([storageArea, updates]) => {
              const driver = getDriver(storageArea);
              const metaKeys = updates.map(({ key }) => getMetaKey(key));
              console.log(storageArea, metaKeys);
              const existingMetas = await driver.getItems(metaKeys);
              const existingMetaMap = Object.fromEntries(
                existingMetas.map(({ key, value }) => [key, getMetaValue(value)])
              );
              const metaUpdates = updates.map(({ key, properties }) => {
                const metaKey = getMetaKey(key);
                return {
                  key: metaKey,
                  value: mergeMeta(existingMetaMap[metaKey] ?? {}, properties)
                };
              });
              await driver.setItems(metaUpdates);
            }
          )
        );
      },
      removeItem: async (key, opts) => {
        const { driver, driverKey } = resolveKey(key);
        await removeItem(driver, driverKey, opts);
      },
      removeItems: async (keys) => {
        const areaToKeysMap = {};
        keys.forEach((key) => {
          let keyStr;
          let opts;
          if (typeof key === "string") {
            keyStr = key;
          } else if ("getValue" in key) {
            keyStr = key.key;
          } else if ("item" in key) {
            keyStr = key.item.key;
            opts = key.options;
          } else {
            keyStr = key.key;
            opts = key.options;
          }
          const { driverArea, driverKey } = resolveKey(keyStr);
          areaToKeysMap[driverArea] ?? (areaToKeysMap[driverArea] = []);
          areaToKeysMap[driverArea].push(driverKey);
          if (opts == null ? void 0 : opts.removeMeta) {
            areaToKeysMap[driverArea].push(getMetaKey(driverKey));
          }
        });
        await Promise.all(
          Object.entries(areaToKeysMap).map(async ([driverArea, keys2]) => {
            const driver = getDriver(driverArea);
            await driver.removeItems(keys2);
          })
        );
      },
      removeMeta: async (key, properties) => {
        const { driver, driverKey } = resolveKey(key);
        await removeMeta(driver, driverKey, properties);
      },
      snapshot: async (base, opts) => {
        var _a2;
        const driver = getDriver(base);
        const data = await driver.snapshot();
        (_a2 = opts == null ? void 0 : opts.excludeKeys) == null ? void 0 : _a2.forEach((key) => {
          delete data[key];
          delete data[getMetaKey(key)];
        });
        return data;
      },
      restoreSnapshot: async (base, data) => {
        const driver = getDriver(base);
        await driver.restoreSnapshot(data);
      },
      watch: (key, cb) => {
        const { driver, driverKey } = resolveKey(key);
        return watch(driver, driverKey, cb);
      },
      unwatch() {
        Object.values(drivers).forEach((driver) => {
          driver.unwatch();
        });
      },
      defineItem: (key, opts) => {
        const { driver, driverKey } = resolveKey(key);
        const { version: targetVersion = 1, migrations = {} } = opts ?? {};
        if (targetVersion < 1) {
          throw Error(
            "Storage item version cannot be less than 1. Initial versions should be set to 1, not 0."
          );
        }
        const migrate = async () => {
          var _a2;
          const driverMetaKey = getMetaKey(driverKey);
          const [{ value }, { value: meta }] = await driver.getItems([
            driverKey,
            driverMetaKey
          ]);
          if (value == null)
            return;
          const currentVersion = (meta == null ? void 0 : meta.v) ?? 1;
          if (currentVersion > targetVersion) {
            throw Error(
              `Version downgrade detected (v${currentVersion} -> v${targetVersion}) for "${key}"`
            );
          }
          console.debug(
            `[@wxt-dev/storage] Running storage migration for ${key}: v${currentVersion} -> v${targetVersion}`
          );
          const migrationsToRun = Array.from(
            { length: targetVersion - currentVersion },
            (_, i) => currentVersion + i + 1
          );
          let migratedValue = value;
          for (const migrateToVersion of migrationsToRun) {
            try {
              migratedValue = await ((_a2 = migrations == null ? void 0 : migrations[migrateToVersion]) == null ? void 0 : _a2.call(migrations, migratedValue)) ?? migratedValue;
            } catch (err) {
              throw Error(`v${migrateToVersion} migration failed for "${key}"`, {
                cause: err
              });
            }
          }
          await driver.setItems([
            { key: driverKey, value: migratedValue },
            { key: driverMetaKey, value: { ...meta, v: targetVersion } }
          ]);
          console.debug(
            `[@wxt-dev/storage] Storage migration completed for ${key} v${targetVersion}`,
            { migratedValue }
          );
        };
        const migrationsDone = (opts == null ? void 0 : opts.migrations) == null ? Promise.resolve() : migrate().catch((err) => {
          console.error(
            `[@wxt-dev/storage] Migration failed for ${key}`,
            err
          );
        });
        const initMutex = new Mutex();
        const getFallback = () => (opts == null ? void 0 : opts.fallback) ?? (opts == null ? void 0 : opts.defaultValue) ?? null;
        const getOrInitValue = () => initMutex.runExclusive(async () => {
          const value = await driver.getItem(driverKey);
          if (value != null || (opts == null ? void 0 : opts.init) == null)
            return value;
          const newValue = await opts.init();
          await driver.setItem(driverKey, newValue);
          return newValue;
        });
        migrationsDone.then(getOrInitValue);
        return {
          key,
          get defaultValue() {
            return getFallback();
          },
          get fallback() {
            return getFallback();
          },
          getValue: async () => {
            await migrationsDone;
            if (opts == null ? void 0 : opts.init) {
              return await getOrInitValue();
            } else {
              return await getItem(driver, driverKey, opts);
            }
          },
          getMeta: async () => {
            await migrationsDone;
            return await getMeta(driver, driverKey);
          },
          setValue: async (value) => {
            await migrationsDone;
            return await setItem(driver, driverKey, value);
          },
          setMeta: async (properties) => {
            await migrationsDone;
            return await setMeta(driver, driverKey, properties);
          },
          removeValue: async (opts2) => {
            await migrationsDone;
            return await removeItem(driver, driverKey, opts2);
          },
          removeMeta: async (properties) => {
            await migrationsDone;
            return await removeMeta(driver, driverKey, properties);
          },
          watch: (cb) => watch(
            driver,
            driverKey,
            (newValue, oldValue) => cb(newValue ?? getFallback(), oldValue ?? getFallback())
          ),
          migrate
        };
      }
    };
    return storage2;
  }
  function createDriver(storageArea) {
    const getStorageArea = () => {
      if (browser$1.runtime == null) {
        throw Error(
          [
            "'wxt/storage' must be loaded in a web extension environment",
            "\n - If thrown during a build, see https://github.com/wxt-dev/wxt/issues/371",
            " - If thrown during tests, mock 'wxt/browser' correctly. See https://wxt.dev/guide/go-further/testing.html\n"
          ].join("\n")
        );
      }
      if (browser$1.storage == null) {
        throw Error(
          "You must add the 'storage' permission to your manifest to use 'wxt/storage'"
        );
      }
      const area = browser$1.storage[storageArea];
      if (area == null)
        throw Error(`"browser.storage.${storageArea}" is undefined`);
      return area;
    };
    const watchListeners = /* @__PURE__ */ new Set();
    return {
      getItem: async (key) => {
        const res = await getStorageArea().get(key);
        return res[key];
      },
      getItems: async (keys) => {
        const result2 = await getStorageArea().get(keys);
        return keys.map((key) => ({ key, value: result2[key] ?? null }));
      },
      setItem: async (key, value) => {
        if (value == null) {
          await getStorageArea().remove(key);
        } else {
          await getStorageArea().set({ [key]: value });
        }
      },
      setItems: async (values) => {
        const map = values.reduce(
          (map2, { key, value }) => {
            map2[key] = value;
            return map2;
          },
          {}
        );
        await getStorageArea().set(map);
      },
      removeItem: async (key) => {
        await getStorageArea().remove(key);
      },
      removeItems: async (keys) => {
        await getStorageArea().remove(keys);
      },
      snapshot: async () => {
        return await getStorageArea().get();
      },
      restoreSnapshot: async (data) => {
        await getStorageArea().set(data);
      },
      watch(key, cb) {
        const listener = (changes) => {
          const change = changes[key];
          if (change == null)
            return;
          if (dequal(change.newValue, change.oldValue))
            return;
          cb(change.newValue ?? null, change.oldValue ?? null);
        };
        getStorageArea().onChanged.addListener(listener);
        watchListeners.add(listener);
        return () => {
          getStorageArea().onChanged.removeListener(listener);
          watchListeners.delete(listener);
        };
      },
      unwatch() {
        watchListeners.forEach((listener) => {
          getStorageArea().onChanged.removeListener(listener);
        });
        watchListeners.clear();
      }
    };
  }
  class Storage {
    constructor(params) {
      __publicField(this, "key_");
      __publicField(this, "storage");
      __publicField(this, "get", async () => {
        const result2 = await this.storage.getValue();
        return result2;
      });
      __publicField(this, "set", async (value) => {
        await this.storage.setValue(value);
      });
      this.key_ = params.key;
      this.storage = storage.defineItem(`local:${this.key_}`, params.options);
    }
  }
  const AppStorage = {
    isActivated: new Storage({
      key: "isActivated",
      options: {
        defaultValue: Config.isActivated.default,
        fallback: Config.isActivated.fallback
      }
    }),
    sound: new Storage({
      key: "sound",
      options: {
        defaultValue: Config.sound.default,
        fallback: Config.sound.fallback
      }
    }),
    allSounds: new Storage({
      key: "allSounds",
      options: {
        defaultValue: strListToPathList(Config.allSounds.default),
        fallback: strListToPathList(Config.allSounds.fallback)
      }
    }),
    probability: new Storage({
      key: "probability",
      options: {
        defaultValue: Config.probability.default,
        fallback: Config.probability.fallback
      }
    }),
    fartMode: new Storage({
      key: "fartMode",
      options: {
        defaultValue: Config.fartMode.default,
        fallback: Config.fartMode.fallback
      }
    }),
    config: {
      get: async () => {
        const [isActivated, sound, probability, mode] = await Promise.all([
          AppStorage.isActivated.get(),
          AppStorage.sound.get(),
          AppStorage.probability.get(),
          AppStorage.fartMode.get()
        ]);
        return { isActivated, sound, probability, mode };
      },
      set: async (config2) => {
        await Promise.all([
          AppStorage.isActivated.set(config2.isActivated),
          AppStorage.sound.set(config2.sound),
          AppStorage.probability.set(config2.probability),
          AppStorage.fartMode.set(config2.mode)
        ]);
      }
    }
  };
  background;
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
  background;
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
  const messageIsForThisApp = (type) => {
    return type.startsWith(appName);
  };
  background;
  const getRandomSound = () => {
    const list = AppCache.allSounds.get();
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex].full;
  };
  const getter = (message, sender) => {
    const type = message.type;
    if (type === AppMessageTypes.config.GET) {
      return AppCache.config.get();
    } else if (type === AppMessageTypes.isActivated.GET) {
      return AppCache.isActivated.get();
    } else if (type === AppMessageTypes.sound.GET) {
      const value = AppCache.sound.get();
      return value ? value : getRandomSound();
    } else if (type === AppMessageTypes.fartMode.GET) {
      return AppCache.fartMode.get();
    } else if (type === AppMessageTypes.soundList.GET) {
      return AppCache.allSounds.get();
    } else {
      return void 0;
    }
  };
  const setter = async (message, sender) => {
    const type = message.type;
    const value = message.value;
    if (type === AppMessageTypes.config.SET) {
      await AppStorage.config.set(value);
      AppCache.config.set(value);
    } else if (type === AppMessageTypes.isActivated.SET) {
      await AppStorage.isActivated.set(value);
      AppCache.isActivated.set(value);
    } else if (type === AppMessageTypes.sound.SET) {
      await AppStorage.sound.set(value);
      AppCache.sound.set(value);
    } else if (type === AppMessageTypes.fartMode.SET) {
      await AppStorage.fartMode.set(value);
      AppCache.fartMode.set(value);
    } else {
      return void 0;
    }
  };
  async function initCache() {
    const initialConfig = await AppStorage.config.get();
    AppCache.config.set(initialConfig);
    const list = await AppStorage.allSounds.get();
    list.sort((a, b) => a.name.localeCompare(b.name));
    AppCache.allSounds.set(list);
  }
  initCache();
  const definition = defineBackground({
    main() {
      chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          if (messageIsForThisApp(message.type)) {
            const result2 = getter(message);
            if (result2 !== void 0) {
              sendResponse(result2);
            } else if (await setter(message) !== void 0) {
              sendResponse(true);
            }
          }
        }
      );
      chrome.tabs.onActivated.addListener((activeInfo) => {
        const tabId = activeInfo.tabId;
        chrome.tabs.sendMessage(tabId, {
          type: AppMessageTypes.update.SET,
          value: AppCache.isActivated.get()
        }).catch((e) => {
          console.log(e);
        });
      });
    }
  });
  background;
  function initPlugins() {
  }
  const browser = (
    // @ts-expect-error
    ((_d = (_c = globalThis.browser) == null ? void 0 : _c.runtime) == null ? void 0 : _d.id) == null ? globalThis.chrome : (
      // @ts-expect-error
      globalThis.browser
    )
  );
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
  let ws;
  function getDevServerWebSocket() {
    if (ws == null) {
      const serverUrl = `${"ws:"}//${"localhost"}:${8080}`;
      logger.debug("Connecting to dev server @", serverUrl);
      ws = new WebSocket(serverUrl, "vite-hmr");
      ws.addWxtEventListener = ws.addEventListener.bind(ws);
      ws.sendCustom = (event, payload) => ws == null ? void 0 : ws.send(JSON.stringify({ type: "custom", event, payload }));
      ws.addEventListener("open", () => {
        logger.debug("Connected to dev server");
      });
      ws.addEventListener("close", () => {
        logger.debug("Disconnected from dev server");
      });
      ws.addEventListener("error", (event) => {
        logger.error("Failed to connect to dev server", event);
      });
      ws.addEventListener("message", (e) => {
        try {
          const message = JSON.parse(e.data);
          if (message.type === "custom") {
            ws == null ? void 0 : ws.dispatchEvent(
              new CustomEvent(message.event, { detail: message.data })
            );
          }
        } catch (err) {
          logger.error("Failed to handle message", err);
        }
      });
    }
    return ws;
  }
  function keepServiceWorkerAlive() {
    setInterval(async () => {
      await browser.runtime.getPlatformInfo();
    }, 5e3);
  }
  function reloadContentScript(payload) {
    const manifest = browser.runtime.getManifest();
    if (manifest.manifest_version == 2) {
      void reloadContentScriptMv2();
    } else {
      void reloadContentScriptMv3(payload);
    }
  }
  async function reloadContentScriptMv3({
    registration,
    contentScript
  }) {
    if (registration === "runtime") {
      await reloadRuntimeContentScriptMv3(contentScript);
    } else {
      await reloadManifestContentScriptMv3(contentScript);
    }
  }
  async function reloadManifestContentScriptMv3(contentScript) {
    const id = `wxt:${contentScript.js[0]}`;
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const existing = registered.find((cs) => cs.id === id);
    if (existing) {
      logger.debug("Updating content script", existing);
      await browser.scripting.updateContentScripts([{ ...contentScript, id }]);
    } else {
      logger.debug("Registering new content script...");
      await browser.scripting.registerContentScripts([{ ...contentScript, id }]);
    }
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadRuntimeContentScriptMv3(contentScript) {
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const matches = registered.filter((cs) => {
      var _a2, _b2;
      const hasJs = (_a2 = contentScript.js) == null ? void 0 : _a2.find((js) => {
        var _a3;
        return (_a3 = cs.js) == null ? void 0 : _a3.includes(js);
      });
      const hasCss = (_b2 = contentScript.css) == null ? void 0 : _b2.find((css) => {
        var _a3;
        return (_a3 = cs.css) == null ? void 0 : _a3.includes(css);
      });
      return hasJs || hasCss;
    });
    if (matches.length === 0) {
      logger.log(
        "Content script is not registered yet, nothing to reload",
        contentScript
      );
      return;
    }
    await browser.scripting.updateContentScripts(matches);
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadTabsForContentScript(contentScript) {
    const allTabs = await browser.tabs.query({});
    const matchPatterns = contentScript.matches.map(
      (match) => new MatchPattern(match)
    );
    const matchingTabs = allTabs.filter((tab) => {
      const url = tab.url;
      if (!url)
        return false;
      return !!matchPatterns.find((pattern) => pattern.includes(url));
    });
    await Promise.all(
      matchingTabs.map(async (tab) => {
        try {
          await browser.tabs.reload(tab.id);
        } catch (err) {
          logger.warn("Failed to reload tab:", err);
        }
      })
    );
  }
  async function reloadContentScriptMv2(_payload) {
    throw Error("TODO: reloadContentScriptMv2");
  }
  {
    try {
      const ws2 = getDevServerWebSocket();
      ws2.addWxtEventListener("wxt:reload-extension", () => {
        browser.runtime.reload();
      });
      ws2.addWxtEventListener("wxt:reload-content-script", (event) => {
        reloadContentScript(event.detail);
      });
      if (true) {
        ws2.addEventListener(
          "open",
          () => ws2.sendCustom("wxt:background-initialized")
        );
        keepServiceWorkerAlive();
      }
    } catch (err) {
      logger.error("Failed to setup web socket connection with dev server", err);
    }
    browser.commands.onCommand.addListener((command) => {
      if (command === "wxt:reload-extension") {
        browser.runtime.reload();
      }
    });
  }
  let result;
  try {
    initPlugins();
    result = definition.main();
    if (result instanceof Promise) {
      console.warn(
        "The background's main() function return a promise, but it must be synchronous"
      );
    }
  } catch (err) {
    logger.error("The background crashed on startup!");
    throw err;
  }
  const result$1 = result;
  return result$1;
}();
background;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3d4dEAwLjE5LjE2X0B0eXBlcytub2RlQDIyLjkuM19yb2xsdXBANC4yNy40L25vZGVfbW9kdWxlcy93eHQvZGlzdC9zYW5kYm94L2RlZmluZS1iYWNrZ3JvdW5kLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9Ad2ViZXh0LWNvcmUrbWF0Y2gtcGF0dGVybnNAMS4wLjMvbm9kZV9tb2R1bGVzL0B3ZWJleHQtY29yZS9tYXRjaC1wYXR0ZXJucy9saWIvaW5kZXguanMiLCIuLi8uLi9zcmMvdHlwZXMvcGF0aC50cyIsIi4uLy4uL2FwcC5jb25maWcudHMiLCIuLi8uLi9zcmMvcmVwb3NpdG9yaWVzL2NhY2hlLnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RlcXVhbEAyLjAuMy9ub2RlX21vZHVsZXMvZGVxdWFsL2xpdGUvaW5kZXgubWpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2FzeW5jLW11dGV4QDAuNS4wL25vZGVfbW9kdWxlcy9hc3luYy1tdXRleC9pbmRleC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQHd4dC1kZXYrc3RvcmFnZUAxLjAuMS9ub2RlX21vZHVsZXMvQHd4dC1kZXYvc3RvcmFnZS9kaXN0L2luZGV4Lm1qcyIsIi4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvc3RvcmFnZS50cyIsIi4uLy4uL2FwcC5tYW5pZmVzdC50cyIsIi4uLy4uL3NyYy9tZXNzYWdlLXR5cGVzLnRzIiwiLi4vLi4vc3JjL2VudHJ5cG9pbnRzL2JhY2tncm91bmQvaW5kZXgudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vd3h0QDAuMTkuMTZfQHR5cGVzK25vZGVAMjIuOS4zX3JvbGx1cEA0LjI3LjQvbm9kZV9tb2R1bGVzL3d4dC9kaXN0L2Jyb3dzZXIvY2hyb21lLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZGVmaW5lQmFja2dyb3VuZChhcmcpIHtcbiAgaWYgKGFyZyA9PSBudWxsIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHsgbWFpbjogYXJnIH07XG4gIHJldHVybiBhcmc7XG59XG4iLCIvLyBzcmMvaW5kZXgudHNcbnZhciBfTWF0Y2hQYXR0ZXJuID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihtYXRjaFBhdHRlcm4pIHtcbiAgICBpZiAobWF0Y2hQYXR0ZXJuID09PSBcIjxhbGxfdXJscz5cIikge1xuICAgICAgdGhpcy5pc0FsbFVybHMgPSB0cnVlO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBbLi4uX01hdGNoUGF0dGVybi5QUk9UT0NPTFNdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gXCIqXCI7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ3JvdXBzID0gLyguKik6XFwvXFwvKC4qPykoXFwvLiopLy5leGVjKG1hdGNoUGF0dGVybik7XG4gICAgICBpZiAoZ3JvdXBzID09IG51bGwpXG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgXCJJbmNvcnJlY3QgZm9ybWF0XCIpO1xuICAgICAgY29uc3QgW18sIHByb3RvY29sLCBob3N0bmFtZSwgcGF0aG5hbWVdID0gZ3JvdXBzO1xuICAgICAgdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKTtcbiAgICAgIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSk7XG4gICAgICB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpO1xuICAgICAgdGhpcy5wcm90b2NvbE1hdGNoZXMgPSBwcm90b2NvbCA9PT0gXCIqXCIgPyBbXCJodHRwXCIsIFwiaHR0cHNcIl0gOiBbcHJvdG9jb2xdO1xuICAgICAgdGhpcy5ob3N0bmFtZU1hdGNoID0gaG9zdG5hbWU7XG4gICAgICB0aGlzLnBhdGhuYW1lTWF0Y2ggPSBwYXRobmFtZTtcbiAgICB9XG4gIH1cbiAgaW5jbHVkZXModXJsKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxVcmxzKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgdSA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyBuZXcgVVJMKHVybCkgOiB1cmwgaW5zdGFuY2VvZiBMb2NhdGlvbiA/IG5ldyBVUkwodXJsLmhyZWYpIDogdXJsO1xuICAgIHJldHVybiAhIXRoaXMucHJvdG9jb2xNYXRjaGVzLmZpbmQoKHByb3RvY29sKSA9PiB7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJodHRwc1wiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0h0dHBzTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiZmlsZVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbGVNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJmdHBcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdHBNYXRjaCh1KTtcbiAgICAgIGlmIChwcm90b2NvbCA9PT0gXCJ1cm5cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNVcm5NYXRjaCh1KTtcbiAgICB9KTtcbiAgfVxuICBpc0h0dHBNYXRjaCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgJiYgdGhpcy5pc0hvc3RQYXRoTWF0Y2godXJsKTtcbiAgfVxuICBpc0h0dHBzTWF0Y2godXJsKSB7XG4gICAgcmV0dXJuIHVybC5wcm90b2NvbCA9PT0gXCJodHRwczpcIiAmJiB0aGlzLmlzSG9zdFBhdGhNYXRjaCh1cmwpO1xuICB9XG4gIGlzSG9zdFBhdGhNYXRjaCh1cmwpIHtcbiAgICBpZiAoIXRoaXMuaG9zdG5hbWVNYXRjaCB8fCAhdGhpcy5wYXRobmFtZU1hdGNoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGhvc3RuYW1lTWF0Y2hSZWdleHMgPSBbXG4gICAgICB0aGlzLmNvbnZlcnRQYXR0ZXJuVG9SZWdleCh0aGlzLmhvc3RuYW1lTWF0Y2gpLFxuICAgICAgdGhpcy5jb252ZXJ0UGF0dGVyblRvUmVnZXgodGhpcy5ob3N0bmFtZU1hdGNoLnJlcGxhY2UoL15cXCpcXC4vLCBcIlwiKSlcbiAgICBdO1xuICAgIGNvbnN0IHBhdGhuYW1lTWF0Y2hSZWdleCA9IHRoaXMuY29udmVydFBhdHRlcm5Ub1JlZ2V4KHRoaXMucGF0aG5hbWVNYXRjaCk7XG4gICAgcmV0dXJuICEhaG9zdG5hbWVNYXRjaFJlZ2V4cy5maW5kKChyZWdleCkgPT4gcmVnZXgudGVzdCh1cmwuaG9zdG5hbWUpKSAmJiBwYXRobmFtZU1hdGNoUmVnZXgudGVzdCh1cmwucGF0aG5hbWUpO1xuICB9XG4gIGlzRmlsZU1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmaWxlOi8vIHBhdHRlcm4gbWF0Y2hpbmcuIE9wZW4gYSBQUiB0byBhZGQgc3VwcG9ydFwiKTtcbiAgfVxuICBpc0Z0cE1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiBmdHA6Ly8gcGF0dGVybiBtYXRjaGluZy4gT3BlbiBhIFBSIHRvIGFkZCBzdXBwb3J0XCIpO1xuICB9XG4gIGlzVXJuTWF0Y2godXJsKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWQ6IHVybjovLyBwYXR0ZXJuIG1hdGNoaW5nLiBPcGVuIGEgUFIgdG8gYWRkIHN1cHBvcnRcIik7XG4gIH1cbiAgY29udmVydFBhdHRlcm5Ub1JlZ2V4KHBhdHRlcm4pIHtcbiAgICBjb25zdCBlc2NhcGVkID0gdGhpcy5lc2NhcGVGb3JSZWdleChwYXR0ZXJuKTtcbiAgICBjb25zdCBzdGFyc1JlcGxhY2VkID0gZXNjYXBlZC5yZXBsYWNlKC9cXFxcXFwqL2csIFwiLipcIik7XG4gICAgcmV0dXJuIFJlZ0V4cChgXiR7c3RhcnNSZXBsYWNlZH0kYCk7XG4gIH1cbiAgZXNjYXBlRm9yUmVnZXgoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgXCJcXFxcJCZcIik7XG4gIH1cbn07XG52YXIgTWF0Y2hQYXR0ZXJuID0gX01hdGNoUGF0dGVybjtcbk1hdGNoUGF0dGVybi5QUk9UT0NPTFMgPSBbXCJodHRwXCIsIFwiaHR0cHNcIiwgXCJmaWxlXCIsIFwiZnRwXCIsIFwidXJuXCJdO1xudmFyIEludmFsaWRNYXRjaFBhdHRlcm4gPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWF0Y2hQYXR0ZXJuLCByZWFzb24pIHtcbiAgICBzdXBlcihgSW52YWxpZCBtYXRjaCBwYXR0ZXJuIFwiJHttYXRjaFBhdHRlcm59XCI6ICR7cmVhc29ufWApO1xuICB9XG59O1xuZnVuY3Rpb24gdmFsaWRhdGVQcm90b2NvbChtYXRjaFBhdHRlcm4sIHByb3RvY29sKSB7XG4gIGlmICghTWF0Y2hQYXR0ZXJuLlBST1RPQ09MUy5pbmNsdWRlcyhwcm90b2NvbCkgJiYgcHJvdG9jb2wgIT09IFwiKlwiKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKFxuICAgICAgbWF0Y2hQYXR0ZXJuLFxuICAgICAgYCR7cHJvdG9jb2x9IG5vdCBhIHZhbGlkIHByb3RvY29sICgke01hdGNoUGF0dGVybi5QUk9UT0NPTFMuam9pbihcIiwgXCIpfSlgXG4gICAgKTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlSG9zdG5hbWUobWF0Y2hQYXR0ZXJuLCBob3N0bmFtZSkge1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCI6XCIpKVxuICAgIHRocm93IG5ldyBJbnZhbGlkTWF0Y2hQYXR0ZXJuKG1hdGNoUGF0dGVybiwgYEhvc3RuYW1lIGNhbm5vdCBpbmNsdWRlIGEgcG9ydGApO1xuICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoXCIqXCIpICYmIGhvc3RuYW1lLmxlbmd0aCA+IDEgJiYgIWhvc3RuYW1lLnN0YXJ0c1dpdGgoXCIqLlwiKSlcbiAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihcbiAgICAgIG1hdGNoUGF0dGVybixcbiAgICAgIGBJZiB1c2luZyBhIHdpbGRjYXJkICgqKSwgaXQgbXVzdCBnbyBhdCB0aGUgc3RhcnQgb2YgdGhlIGhvc3RuYW1lYFxuICAgICk7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVBhdGhuYW1lKG1hdGNoUGF0dGVybiwgcGF0aG5hbWUpIHtcbiAgcmV0dXJuO1xufVxuZXhwb3J0IHtcbiAgSW52YWxpZE1hdGNoUGF0dGVybixcbiAgTWF0Y2hQYXR0ZXJuXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIFBhdGgge1xuICBmdWxsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHN0ckxpc3RUb1BhdGhMaXN0ID0gKHN0ckxpc3Q6IHN0cmluZ1tdKTogUGF0aFtdID0+IHtcbiAgY29uc3QgcGF0aExpc3Q6IFBhdGhbXSA9IFtdO1xuICBzdHJMaXN0LmZvckVhY2goKHN0cikgPT4ge1xuICAgIGNvbnN0IHBhdGg6IFBhdGggPSB7XG4gICAgICBmdWxsOiBzdHIsXG4gICAgICBuYW1lOiBzdHIubWF0Y2goLyhbXlxcL10rKSg/PVxcLlteXFwvXSskKXwoW15cXC9dKykkLyk/LlswXSB8fCBcIlwiLFxuICAgIH07XG4gICAgcGF0aExpc3QucHVzaChwYXRoKTtcbiAgfSk7XG4gIHJldHVybiBwYXRoTGlzdDtcbn07XG4iLCJpbXBvcnQgc291bmRzTGlzdCBmcm9tIFwiLi9zcmMvc291bmRzLWxpc3QuanNvblwiO1xuXG5jb25zdCBDb25maWcgPSB7XG4gIGlzQWN0aXZhdGVkOiB7XG4gICAgZGVmYXVsdDogdHJ1ZSxcbiAgICBmYWxsYmFjazogZmFsc2UsXG4gIH0sXG4gIGZhcnRNb2RlOiB7XG4gICAgZGVmYXVsdDogXCJuYXR1cmFsXCIsXG4gICAgZmFsbGJhY2s6IFwibmF0dXJhbFwiLFxuICB9LFxuICBzb3VuZDoge1xuICAgIGRlZmF1bHQ6IFwiXCIsXG4gICAgZmFsbGJhY2s6IFwic291bmRzL2ZhcnQvMDEg44OW44Oq44OD77yBLm1wM1wiLFxuICB9LFxuICBhbGxTb3VuZHM6IHtcbiAgICBkZWZhdWx0OiBzb3VuZHNMaXN0LmZpbGVzLFxuICAgIGZhbGxiYWNrOiBzb3VuZHNMaXN0LmZpbGVzLFxuICB9LFxuICBwcm9iYWJpbGl0eToge1xuICAgIGRlZmF1bHQ6IDAuMSxcbiAgICBmYWxsYmFjazogMC4xLFxuICB9LFxuICBzdGFpbkNvbG9yOiB7XG4gICAgZGVmYXVsdDogXCIjZmZkZWFkXCIsXG4gICAgZmFsbGJhY2s6IFwiI2ZmZGVhZFwiLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlnO1xuIiwiaW1wb3J0IHsgdHlwZSBBcHBDb25maWcgfSBmcm9tIFwiQC90eXBlcy9jb25maWdcIjtcbmltcG9ydCB0eXBlIEZhcnRNb2RlIGZyb20gXCJAL3R5cGVzL2ZhcnQtbW9kZVwiO1xuaW1wb3J0IFBhdGgsIHsgc3RyTGlzdFRvUGF0aExpc3QgfSBmcm9tIFwiQC90eXBlcy9wYXRoXCI7XG5pbXBvcnQgdHlwZSB7IEFwcFJlcG9zaXRvcnkgfSBmcm9tIFwiQC90eXBlcy9yZXBvc2l0b3J5XCI7XG5pbXBvcnQgQ29uZmlnIGZyb20gXCJAY29uZmlnXCI7XG5cbmNsYXNzIENhY2hlPFQ+IHtcbiAgcHJpdmF0ZSB2YWx1ZV86IFQ7XG4gIGNvbnN0cnVjdG9yKHZhbHVlOiBUKSB7XG4gICAgdGhpcy52YWx1ZV8gPSB2YWx1ZTtcbiAgfVxuICBnZXQgPSAoKTogVCA9PiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICB9O1xuICBzZXQgPSAodmFsdWU6IFQpID0+IHtcbiAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xuICB9O1xufVxuXG5jb25zdCBBcHBDYWNoZTogQXBwUmVwb3NpdG9yeSA9IHtcbiAgaXNBY3RpdmF0ZWQ6IG5ldyBDYWNoZTxib29sZWFuPihDb25maWcuaXNBY3RpdmF0ZWQuZGVmYXVsdCksXG4gIHNvdW5kOiBuZXcgQ2FjaGU8c3RyaW5nPihDb25maWcuc291bmQuZGVmYXVsdCksXG4gIGFsbFNvdW5kczogbmV3IENhY2hlPFBhdGhbXT4oc3RyTGlzdFRvUGF0aExpc3QoQ29uZmlnLmFsbFNvdW5kcy5kZWZhdWx0KSksXG4gIHByb2JhYmlsaXR5OiBuZXcgQ2FjaGU8bnVtYmVyPihDb25maWcucHJvYmFiaWxpdHkuZGVmYXVsdCksXG4gIGZhcnRNb2RlOiBuZXcgQ2FjaGU8RmFydE1vZGU+KENvbmZpZy5mYXJ0TW9kZS5kZWZhdWx0IGFzIEZhcnRNb2RlKSxcbiAgY29uZmlnOiB7XG4gICAgZ2V0OiAoKTogQXBwQ29uZmlnID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzQWN0aXZhdGVkOiBBcHBDYWNoZS5pc0FjdGl2YXRlZC5nZXQoKSxcbiAgICAgICAgc291bmQ6IEFwcENhY2hlLnNvdW5kLmdldCgpLFxuICAgICAgICBwcm9iYWJpbGl0eTogQXBwQ2FjaGUucHJvYmFiaWxpdHkuZ2V0KCksXG4gICAgICAgIG1vZGU6IEFwcENhY2hlLmZhcnRNb2RlLmdldCgpLFxuICAgICAgfTtcbiAgICB9LFxuICAgIHNldDogKGNvbmZpZzogQXBwQ29uZmlnKSA9PiB7XG4gICAgICBBcHBDYWNoZS5pc0FjdGl2YXRlZC5zZXQoY29uZmlnLmlzQWN0aXZhdGVkKTtcbiAgICAgIEFwcENhY2hlLnNvdW5kLnNldChjb25maWcuc291bmQpO1xuICAgICAgQXBwQ2FjaGUucHJvYmFiaWxpdHkuc2V0KGNvbmZpZy5wcm9iYWJpbGl0eSk7XG4gICAgICBBcHBDYWNoZS5mYXJ0TW9kZS5zZXQoY29uZmlnLm1vZGUpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBDYWNoZTtcbiIsInZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5leHBvcnQgZnVuY3Rpb24gZGVxdWFsKGZvbywgYmFyKSB7XG5cdHZhciBjdG9yLCBsZW47XG5cdGlmIChmb28gPT09IGJhcikgcmV0dXJuIHRydWU7XG5cblx0aWYgKGZvbyAmJiBiYXIgJiYgKGN0b3I9Zm9vLmNvbnN0cnVjdG9yKSA9PT0gYmFyLmNvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKGN0b3IgPT09IERhdGUpIHJldHVybiBmb28uZ2V0VGltZSgpID09PSBiYXIuZ2V0VGltZSgpO1xuXHRcdGlmIChjdG9yID09PSBSZWdFeHApIHJldHVybiBmb28udG9TdHJpbmcoKSA9PT0gYmFyLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY3RvciA9PT0gQXJyYXkpIHtcblx0XHRcdGlmICgobGVuPWZvby5sZW5ndGgpID09PSBiYXIubGVuZ3RoKSB7XG5cdFx0XHRcdHdoaWxlIChsZW4tLSAmJiBkZXF1YWwoZm9vW2xlbl0sIGJhcltsZW5dKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuID09PSAtMTtcblx0XHR9XG5cblx0XHRpZiAoIWN0b3IgfHwgdHlwZW9mIGZvbyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGxlbiA9IDA7XG5cdFx0XHRmb3IgKGN0b3IgaW4gZm9vKSB7XG5cdFx0XHRcdGlmIChoYXMuY2FsbChmb28sIGN0b3IpICYmICsrbGVuICYmICFoYXMuY2FsbChiYXIsIGN0b3IpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICghKGN0b3IgaW4gYmFyKSB8fCAhZGVxdWFsKGZvb1tjdG9yXSwgYmFyW2N0b3JdKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKGJhcikubGVuZ3RoID09PSBsZW47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZvbyAhPT0gZm9vICYmIGJhciAhPT0gYmFyO1xufVxuIiwiY29uc3QgRV9USU1FT1VUID0gbmV3IEVycm9yKCd0aW1lb3V0IHdoaWxlIHdhaXRpbmcgZm9yIG11dGV4IHRvIGJlY29tZSBhdmFpbGFibGUnKTtcbmNvbnN0IEVfQUxSRUFEWV9MT0NLRUQgPSBuZXcgRXJyb3IoJ211dGV4IGFscmVhZHkgbG9ja2VkJyk7XG5jb25zdCBFX0NBTkNFTEVEID0gbmV3IEVycm9yKCdyZXF1ZXN0IGZvciBsb2NrIGNhbmNlbGVkJyk7XG5cbnZhciBfX2F3YWl0ZXIkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY2xhc3MgU2VtYXBob3JlIHtcbiAgICBjb25zdHJ1Y3RvcihfdmFsdWUsIF9jYW5jZWxFcnJvciA9IEVfQ0FOQ0VMRUQpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgIHRoaXMuX2NhbmNlbEVycm9yID0gX2NhbmNlbEVycm9yO1xuICAgICAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnMgPSBbXTtcbiAgICB9XG4gICAgYWNxdWlyZSh3ZWlnaHQgPSAxLCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgaWYgKHdlaWdodCA8PSAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIHdlaWdodCAke3dlaWdodH06IG11c3QgYmUgcG9zaXRpdmVgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB7IHJlc29sdmUsIHJlamVjdCwgd2VpZ2h0LCBwcmlvcml0eSB9O1xuICAgICAgICAgICAgY29uc3QgaSA9IGZpbmRJbmRleEZyb21FbmQodGhpcy5fcXVldWUsIChvdGhlcikgPT4gcHJpb3JpdHkgPD0gb3RoZXIucHJpb3JpdHkpO1xuICAgICAgICAgICAgaWYgKGkgPT09IC0xICYmIHdlaWdodCA8PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIE5lZWRzIGltbWVkaWF0ZSBkaXNwYXRjaCwgc2tpcCB0aGUgcXVldWVcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEl0ZW0odGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zcGxpY2UoaSArIDEsIDAsIHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVuRXhjbHVzaXZlKGNhbGxiYWNrXzEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlciQyKHRoaXMsIGFyZ3VtZW50cywgdm9pZCAwLCBmdW5jdGlvbiogKGNhbGxiYWNrLCB3ZWlnaHQgPSAxLCBwcmlvcml0eSA9IDApIHtcbiAgICAgICAgICAgIGNvbnN0IFt2YWx1ZSwgcmVsZWFzZV0gPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0LCBwcmlvcml0eSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3YWl0Rm9yVW5sb2NrKHdlaWdodCA9IDEsIHByaW9yaXR5ID0gMCkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICBpZiAodGhpcy5fY291bGRMb2NrSW1tZWRpYXRlbHkod2VpZ2h0LCBwcmlvcml0eSkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpbnNlcnRTb3J0ZWQodGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdLCB7IHJlc29sdmUsIHByaW9yaXR5IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSA8PSAwO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaFF1ZXVlKCk7XG4gICAgfVxuICAgIHJlbGVhc2Uod2VpZ2h0ID0gMSkge1xuICAgICAgICBpZiAod2VpZ2h0IDw9IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICB0aGlzLl92YWx1ZSArPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoUXVldWUoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5mb3JFYWNoKChlbnRyeSkgPT4gZW50cnkucmVqZWN0KHRoaXMuX2NhbmNlbEVycm9yKSk7XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgfVxuICAgIF9kaXNwYXRjaFF1ZXVlKCkge1xuICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3F1ZXVlLmxlbmd0aCA+IDAgJiYgdGhpcy5fcXVldWVbMF0ud2VpZ2h0IDw9IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEl0ZW0odGhpcy5fcXVldWUuc2hpZnQoKSk7XG4gICAgICAgICAgICB0aGlzLl9kcmFpblVubG9ja1dhaXRlcnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZGlzcGF0Y2hJdGVtKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSAtPSBpdGVtLndlaWdodDtcbiAgICAgICAgaXRlbS5yZXNvbHZlKFtwcmV2aW91c1ZhbHVlLCB0aGlzLl9uZXdSZWxlYXNlcihpdGVtLndlaWdodCldKTtcbiAgICB9XG4gICAgX25ld1JlbGVhc2VyKHdlaWdodCkge1xuICAgICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbGVhc2Uod2VpZ2h0KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2RyYWluVW5sb2NrV2FpdGVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgd2VpZ2h0ID0gdGhpcy5fdmFsdWU7IHdlaWdodCA+IDA7IHdlaWdodC0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FpdGVycyA9IHRoaXMuX3dlaWdodGVkV2FpdGVyc1t3ZWlnaHQgLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAoIXdhaXRlcnMpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHdhaXRlcnMuZm9yRWFjaCgod2FpdGVyKSA9PiB3YWl0ZXIucmVzb2x2ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHRlZFdhaXRlcnNbd2VpZ2h0IC0gMV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXVlZFByaW9yaXR5ID0gdGhpcy5fcXVldWVbMF0ucHJpb3JpdHk7XG4gICAgICAgICAgICBmb3IgKGxldCB3ZWlnaHQgPSB0aGlzLl92YWx1ZTsgd2VpZ2h0ID4gMDsgd2VpZ2h0LS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3YWl0ZXJzID0gdGhpcy5fd2VpZ2h0ZWRXYWl0ZXJzW3dlaWdodCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmICghd2FpdGVycylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IHdhaXRlcnMuZmluZEluZGV4KCh3YWl0ZXIpID0+IHdhaXRlci5wcmlvcml0eSA8PSBxdWV1ZWRQcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgKGkgPT09IC0xID8gd2FpdGVycyA6IHdhaXRlcnMuc3BsaWNlKDAsIGkpKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaCgod2FpdGVyID0+IHdhaXRlci5yZXNvbHZlKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY291bGRMb2NrSW1tZWRpYXRlbHkod2VpZ2h0LCBwcmlvcml0eSkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9xdWV1ZVswXS5wcmlvcml0eSA8IHByaW9yaXR5KSAmJlxuICAgICAgICAgICAgd2VpZ2h0IDw9IHRoaXMuX3ZhbHVlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluc2VydFNvcnRlZChhLCB2KSB7XG4gICAgY29uc3QgaSA9IGZpbmRJbmRleEZyb21FbmQoYSwgKG90aGVyKSA9PiB2LnByaW9yaXR5IDw9IG90aGVyLnByaW9yaXR5KTtcbiAgICBhLnNwbGljZShpICsgMSwgMCwgdik7XG59XG5mdW5jdGlvbiBmaW5kSW5kZXhGcm9tRW5kKGEsIHByZWRpY2F0ZSkge1xuICAgIGZvciAobGV0IGkgPSBhLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoYVtpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxudmFyIF9fYXdhaXRlciQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jbGFzcyBNdXRleCB7XG4gICAgY29uc3RydWN0b3IoY2FuY2VsRXJyb3IpIHtcbiAgICAgICAgdGhpcy5fc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxLCBjYW5jZWxFcnJvcik7XG4gICAgfVxuICAgIGFjcXVpcmUoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIkMSh0aGlzLCBhcmd1bWVudHMsIHZvaWQgMCwgZnVuY3Rpb24qIChwcmlvcml0eSA9IDApIHtcbiAgICAgICAgICAgIGNvbnN0IFssIHJlbGVhc2VyXSA9IHlpZWxkIHRoaXMuX3NlbWFwaG9yZS5hY3F1aXJlKDEsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIHJldHVybiByZWxlYXNlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgcHJpb3JpdHkgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUucnVuRXhjbHVzaXZlKCgpID0+IGNhbGxiYWNrKCksIDEsIHByaW9yaXR5KTtcbiAgICB9XG4gICAgaXNMb2NrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZW1hcGhvcmUuaXNMb2NrZWQoKTtcbiAgICB9XG4gICAgd2FpdEZvclVubG9jayhwcmlvcml0eSA9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbWFwaG9yZS53YWl0Rm9yVW5sb2NrKDEsIHByaW9yaXR5KTtcbiAgICB9XG4gICAgcmVsZWFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NlbWFwaG9yZS5pc0xvY2tlZCgpKVxuICAgICAgICAgICAgdGhpcy5fc2VtYXBob3JlLnJlbGVhc2UoKTtcbiAgICB9XG4gICAgY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VtYXBob3JlLmNhbmNlbCgpO1xuICAgIH1cbn1cblxudmFyIF9fYXdhaXRlciA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZnVuY3Rpb24gd2l0aFRpbWVvdXQoc3luYywgdGltZW91dCwgdGltZW91dEVycm9yID0gRV9USU1FT1VUKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNxdWlyZTogKHdlaWdodE9yUHJpb3JpdHksIHByaW9yaXR5KSA9PiB7XG4gICAgICAgICAgICBsZXQgd2VpZ2h0O1xuICAgICAgICAgICAgaWYgKGlzU2VtYXBob3JlKHN5bmMpKSB7XG4gICAgICAgICAgICAgICAgd2VpZ2h0ID0gd2VpZ2h0T3JQcmlvcml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlaWdodCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwcmlvcml0eSA9IHdlaWdodE9yUHJpb3JpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgd2VpZ2h0IDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgd2VpZ2h0ICR7d2VpZ2h0fTogbXVzdCBiZSBwb3NpdGl2ZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpY2tldCA9IHlpZWxkIChpc1NlbWFwaG9yZShzeW5jKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzeW5jLmFjcXVpcmUod2VpZ2h0LCBwcmlvcml0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc3luYy5hY3F1aXJlKHByaW9yaXR5KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbGVhc2UgPSBBcnJheS5pc0FycmF5KHRpY2tldCkgPyB0aWNrZXRbMV0gOiB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGlja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bkV4Y2x1c2l2ZShjYWxsYmFjaywgd2VpZ2h0LCBwcmlvcml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVsZWFzZSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXQgPSB5aWVsZCB0aGlzLmFjcXVpcmUod2VpZ2h0LCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRpY2tldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXRbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2sodGlja2V0WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGVhc2UgPSB0aWNrZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlKHdlaWdodCkge1xuICAgICAgICAgICAgc3luYy5yZWxlYXNlKHdlaWdodCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzeW5jLmNhbmNlbCgpO1xuICAgICAgICB9LFxuICAgICAgICB3YWl0Rm9yVW5sb2NrOiAod2VpZ2h0T3JQcmlvcml0eSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgICAgIGxldCB3ZWlnaHQ7XG4gICAgICAgICAgICBpZiAoaXNTZW1hcGhvcmUoc3luYykpIHtcbiAgICAgICAgICAgICAgICB3ZWlnaHQgPSB3ZWlnaHRPclByaW9yaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VpZ2h0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gd2VpZ2h0T3JQcmlvcml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3ZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB3ZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCB3ZWlnaHQgJHt3ZWlnaHR9OiBtdXN0IGJlIHBvc2l0aXZlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9IHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KHRpbWVvdXRFcnJvciksIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIChpc1NlbWFwaG9yZShzeW5jKVxuICAgICAgICAgICAgICAgICAgICA/IHN5bmMud2FpdEZvclVubG9jayh3ZWlnaHQsIHByaW9yaXR5KVxuICAgICAgICAgICAgICAgICAgICA6IHN5bmMud2FpdEZvclVubG9jayhwcmlvcml0eSkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzTG9ja2VkOiAoKSA9PiBzeW5jLmlzTG9ja2VkKCksXG4gICAgICAgIGdldFZhbHVlOiAoKSA9PiBzeW5jLmdldFZhbHVlKCksXG4gICAgICAgIHNldFZhbHVlOiAodmFsdWUpID0+IHN5bmMuc2V0VmFsdWUodmFsdWUpLFxuICAgIH07XG59XG5mdW5jdGlvbiBpc1NlbWFwaG9yZShzeW5jKSB7XG4gICAgcmV0dXJuIHN5bmMuZ2V0VmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saXNuZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB0cnlBY3F1aXJlKHN5bmMsIGFscmVhZHlBY3F1aXJlZEVycm9yID0gRV9BTFJFQURZX0xPQ0tFRCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgcmV0dXJuIHdpdGhUaW1lb3V0KHN5bmMsIDAsIGFscmVhZHlBY3F1aXJlZEVycm9yKTtcbn1cblxuZXhwb3J0IHsgRV9BTFJFQURZX0xPQ0tFRCwgRV9DQU5DRUxFRCwgRV9USU1FT1VULCBNdXRleCwgU2VtYXBob3JlLCB0cnlBY3F1aXJlLCB3aXRoVGltZW91dCB9O1xuIiwiaW1wb3J0IHsgZGVxdWFsIH0gZnJvbSAnZGVxdWFsL2xpdGUnO1xuaW1wb3J0IHsgTXV0ZXggfSBmcm9tICdhc3luYy1tdXRleCc7XG5cbmNvbnN0IGJyb3dzZXIgPSAoXG4gIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgZ2xvYmFsVGhpcy5icm93c2VyPy5ydW50aW1lPy5pZCA9PSBudWxsID8gZ2xvYmFsVGhpcy5jaHJvbWUgOiAoXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIGdsb2JhbFRoaXMuYnJvd3NlclxuICApXG4pO1xuY29uc3Qgc3RvcmFnZSA9IGNyZWF0ZVN0b3JhZ2UoKTtcbmZ1bmN0aW9uIGNyZWF0ZVN0b3JhZ2UoKSB7XG4gIGNvbnN0IGRyaXZlcnMgPSB7XG4gICAgbG9jYWw6IGNyZWF0ZURyaXZlcihcImxvY2FsXCIpLFxuICAgIHNlc3Npb246IGNyZWF0ZURyaXZlcihcInNlc3Npb25cIiksXG4gICAgc3luYzogY3JlYXRlRHJpdmVyKFwic3luY1wiKSxcbiAgICBtYW5hZ2VkOiBjcmVhdGVEcml2ZXIoXCJtYW5hZ2VkXCIpXG4gIH07XG4gIGNvbnN0IGdldERyaXZlciA9IChhcmVhKSA9PiB7XG4gICAgY29uc3QgZHJpdmVyID0gZHJpdmVyc1thcmVhXTtcbiAgICBpZiAoZHJpdmVyID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGFyZWFOYW1lcyA9IE9iamVjdC5rZXlzKGRyaXZlcnMpLmpvaW4oXCIsIFwiKTtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGFyZWEgXCIke2FyZWF9XCIuIE9wdGlvbnM6ICR7YXJlYU5hbWVzfWApO1xuICAgIH1cbiAgICByZXR1cm4gZHJpdmVyO1xuICB9O1xuICBjb25zdCByZXNvbHZlS2V5ID0gKGtleSkgPT4ge1xuICAgIGNvbnN0IGRlbGltaW5hdG9ySW5kZXggPSBrZXkuaW5kZXhPZihcIjpcIik7XG4gICAgY29uc3QgZHJpdmVyQXJlYSA9IGtleS5zdWJzdHJpbmcoMCwgZGVsaW1pbmF0b3JJbmRleCk7XG4gICAgY29uc3QgZHJpdmVyS2V5ID0ga2V5LnN1YnN0cmluZyhkZWxpbWluYXRvckluZGV4ICsgMSk7XG4gICAgaWYgKGRyaXZlcktleSA9PSBudWxsKVxuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBTdG9yYWdlIGtleSBzaG91bGQgYmUgaW4gdGhlIGZvcm0gb2YgXCJhcmVhOmtleVwiLCBidXQgcmVjZWl2ZWQgXCIke2tleX1cImBcbiAgICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRyaXZlckFyZWEsXG4gICAgICBkcml2ZXJLZXksXG4gICAgICBkcml2ZXI6IGdldERyaXZlcihkcml2ZXJBcmVhKVxuICAgIH07XG4gIH07XG4gIGNvbnN0IGdldE1ldGFLZXkgPSAoa2V5KSA9PiBrZXkgKyBcIiRcIjtcbiAgY29uc3QgbWVyZ2VNZXRhID0gKG9sZE1ldGEsIG5ld01ldGEpID0+IHtcbiAgICBjb25zdCBuZXdGaWVsZHMgPSB7IC4uLm9sZE1ldGEgfTtcbiAgICBPYmplY3QuZW50cmllcyhuZXdNZXRhKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBkZWxldGUgbmV3RmllbGRzW2tleV07XG4gICAgICBlbHNlXG4gICAgICAgIG5ld0ZpZWxkc1trZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld0ZpZWxkcztcbiAgfTtcbiAgY29uc3QgZ2V0VmFsdWVPckZhbGxiYWNrID0gKHZhbHVlLCBmYWxsYmFjaykgPT4gdmFsdWUgPz8gZmFsbGJhY2sgPz8gbnVsbDtcbiAgY29uc3QgZ2V0TWV0YVZhbHVlID0gKHByb3BlcnRpZXMpID0+IHR5cGVvZiBwcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHByb3BlcnRpZXMpID8gcHJvcGVydGllcyA6IHt9O1xuICBjb25zdCBnZXRJdGVtID0gYXN5bmMgKGRyaXZlciwgZHJpdmVyS2V5LCBvcHRzKSA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZHJpdmVyLmdldEl0ZW0oZHJpdmVyS2V5KTtcbiAgICByZXR1cm4gZ2V0VmFsdWVPckZhbGxiYWNrKHJlcywgb3B0cz8uZmFsbGJhY2sgPz8gb3B0cz8uZGVmYXVsdFZhbHVlKTtcbiAgfTtcbiAgY29uc3QgZ2V0TWV0YSA9IGFzeW5jIChkcml2ZXIsIGRyaXZlcktleSkgPT4ge1xuICAgIGNvbnN0IG1ldGFLZXkgPSBnZXRNZXRhS2V5KGRyaXZlcktleSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZHJpdmVyLmdldEl0ZW0obWV0YUtleSk7XG4gICAgcmV0dXJuIGdldE1ldGFWYWx1ZShyZXMpO1xuICB9O1xuICBjb25zdCBzZXRJdGVtID0gYXN5bmMgKGRyaXZlciwgZHJpdmVyS2V5LCB2YWx1ZSkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5zZXRJdGVtKGRyaXZlcktleSwgdmFsdWUgPz8gbnVsbCk7XG4gIH07XG4gIGNvbnN0IHNldE1ldGEgPSBhc3luYyAoZHJpdmVyLCBkcml2ZXJLZXksIHByb3BlcnRpZXMpID0+IHtcbiAgICBjb25zdCBtZXRhS2V5ID0gZ2V0TWV0YUtleShkcml2ZXJLZXkpO1xuICAgIGNvbnN0IGV4aXN0aW5nRmllbGRzID0gZ2V0TWV0YVZhbHVlKGF3YWl0IGRyaXZlci5nZXRJdGVtKG1ldGFLZXkpKTtcbiAgICBhd2FpdCBkcml2ZXIuc2V0SXRlbShtZXRhS2V5LCBtZXJnZU1ldGEoZXhpc3RpbmdGaWVsZHMsIHByb3BlcnRpZXMpKTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlSXRlbSA9IGFzeW5jIChkcml2ZXIsIGRyaXZlcktleSwgb3B0cykgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5yZW1vdmVJdGVtKGRyaXZlcktleSk7XG4gICAgaWYgKG9wdHM/LnJlbW92ZU1ldGEpIHtcbiAgICAgIGNvbnN0IG1ldGFLZXkgPSBnZXRNZXRhS2V5KGRyaXZlcktleSk7XG4gICAgICBhd2FpdCBkcml2ZXIucmVtb3ZlSXRlbShtZXRhS2V5KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlbW92ZU1ldGEgPSBhc3luYyAoZHJpdmVyLCBkcml2ZXJLZXksIHByb3BlcnRpZXMpID0+IHtcbiAgICBjb25zdCBtZXRhS2V5ID0gZ2V0TWV0YUtleShkcml2ZXJLZXkpO1xuICAgIGlmIChwcm9wZXJ0aWVzID09IG51bGwpIHtcbiAgICAgIGF3YWl0IGRyaXZlci5yZW1vdmVJdGVtKG1ldGFLZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdGaWVsZHMgPSBnZXRNZXRhVmFsdWUoYXdhaXQgZHJpdmVyLmdldEl0ZW0obWV0YUtleSkpO1xuICAgICAgW3Byb3BlcnRpZXNdLmZsYXQoKS5mb3JFYWNoKChmaWVsZCkgPT4gZGVsZXRlIG5ld0ZpZWxkc1tmaWVsZF0pO1xuICAgICAgYXdhaXQgZHJpdmVyLnNldEl0ZW0obWV0YUtleSwgbmV3RmllbGRzKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHdhdGNoID0gKGRyaXZlciwgZHJpdmVyS2V5LCBjYikgPT4ge1xuICAgIHJldHVybiBkcml2ZXIud2F0Y2goZHJpdmVyS2V5LCBjYik7XG4gIH07XG4gIGNvbnN0IHN0b3JhZ2UyID0ge1xuICAgIGdldEl0ZW06IGFzeW5jIChrZXksIG9wdHMpID0+IHtcbiAgICAgIGNvbnN0IHsgZHJpdmVyLCBkcml2ZXJLZXkgfSA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgIHJldHVybiBhd2FpdCBnZXRJdGVtKGRyaXZlciwgZHJpdmVyS2V5LCBvcHRzKTtcbiAgICB9LFxuICAgIGdldEl0ZW1zOiBhc3luYyAoa2V5cykgPT4ge1xuICAgICAgY29uc3QgYXJlYVRvS2V5TWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICAgIGNvbnN0IGtleVRvT3B0c01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgICBjb25zdCBvcmRlcmVkS2V5cyA9IFtdO1xuICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbGV0IGtleVN0cjtcbiAgICAgICAgbGV0IG9wdHM7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAga2V5U3RyID0ga2V5O1xuICAgICAgICB9IGVsc2UgaWYgKFwiZ2V0VmFsdWVcIiBpbiBrZXkpIHtcbiAgICAgICAgICBrZXlTdHIgPSBrZXkua2V5O1xuICAgICAgICAgIG9wdHMgPSB7IGZhbGxiYWNrOiBrZXkuZmFsbGJhY2sgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBrZXlTdHIgPSBrZXkua2V5O1xuICAgICAgICAgIG9wdHMgPSBrZXkub3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBvcmRlcmVkS2V5cy5wdXNoKGtleVN0cik7XG4gICAgICAgIGNvbnN0IHsgZHJpdmVyQXJlYSwgZHJpdmVyS2V5IH0gPSByZXNvbHZlS2V5KGtleVN0cik7XG4gICAgICAgIGNvbnN0IGFyZWFLZXlzID0gYXJlYVRvS2V5TWFwLmdldChkcml2ZXJBcmVhKSA/PyBbXTtcbiAgICAgICAgYXJlYVRvS2V5TWFwLnNldChkcml2ZXJBcmVhLCBhcmVhS2V5cy5jb25jYXQoZHJpdmVyS2V5KSk7XG4gICAgICAgIGtleVRvT3B0c01hcC5zZXQoa2V5U3RyLCBvcHRzKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzdWx0c01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgQXJyYXkuZnJvbShhcmVhVG9LZXlNYXAuZW50cmllcygpKS5tYXAoYXN5bmMgKFtkcml2ZXJBcmVhLCBrZXlzMl0pID0+IHtcbiAgICAgICAgICBjb25zdCBkcml2ZXJSZXN1bHRzID0gYXdhaXQgZHJpdmVyc1tkcml2ZXJBcmVhXS5nZXRJdGVtcyhrZXlzMik7XG4gICAgICAgICAgZHJpdmVyUmVzdWx0cy5mb3JFYWNoKChkcml2ZXJSZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2RyaXZlckFyZWF9OiR7ZHJpdmVyUmVzdWx0LmtleX1gO1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IGtleVRvT3B0c01hcC5nZXQoa2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWVPckZhbGxiYWNrKFxuICAgICAgICAgICAgICBkcml2ZXJSZXN1bHQudmFsdWUsXG4gICAgICAgICAgICAgIG9wdHM/LmZhbGxiYWNrID8/IG9wdHM/LmRlZmF1bHRWYWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3VsdHNNYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJldHVybiBvcmRlcmVkS2V5cy5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5LFxuICAgICAgICB2YWx1ZTogcmVzdWx0c01hcC5nZXQoa2V5KVxuICAgICAgfSkpO1xuICAgIH0sXG4gICAgZ2V0TWV0YTogYXN5bmMgKGtleSkgPT4ge1xuICAgICAgY29uc3QgeyBkcml2ZXIsIGRyaXZlcktleSB9ID0gcmVzb2x2ZUtleShrZXkpO1xuICAgICAgcmV0dXJuIGF3YWl0IGdldE1ldGEoZHJpdmVyLCBkcml2ZXJLZXkpO1xuICAgIH0sXG4gICAgZ2V0TWV0YXM6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gYXJncy5tYXAoKGFyZykgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgYXJnID09PSBcInN0cmluZ1wiID8gYXJnIDogYXJnLmtleTtcbiAgICAgICAgY29uc3QgeyBkcml2ZXJBcmVhLCBkcml2ZXJLZXkgfSA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgZHJpdmVyQXJlYSxcbiAgICAgICAgICBkcml2ZXJLZXksXG4gICAgICAgICAgZHJpdmVyTWV0YUtleTogZ2V0TWV0YUtleShkcml2ZXJLZXkpXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGFyZWFUb0RyaXZlck1ldGFLZXlzTWFwID0ga2V5cy5yZWR1Y2UoKG1hcCwga2V5KSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgbWFwW19hID0ga2V5LmRyaXZlckFyZWFdID8/IChtYXBbX2FdID0gW10pO1xuICAgICAgICBtYXBba2V5LmRyaXZlckFyZWFdLnB1c2goa2V5KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sIHt9KTtcbiAgICAgIGNvbnN0IHJlc3VsdHNNYXAgPSB7fTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhhcmVhVG9Ecml2ZXJNZXRhS2V5c01hcCkubWFwKGFzeW5jIChbYXJlYSwga2V5czJdKSA9PiB7XG4gICAgICAgICAgY29uc3QgYXJlYVJlcyA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZVthcmVhXS5nZXQoXG4gICAgICAgICAgICBrZXlzMi5tYXAoKGtleSkgPT4ga2V5LmRyaXZlck1ldGFLZXkpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBrZXlzMi5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHNNYXBba2V5LmtleV0gPSBhcmVhUmVzW2tleS5kcml2ZXJNZXRhS2V5XSA/PyB7fTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICByZXR1cm4ga2V5cy5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAga2V5OiBrZXkua2V5LFxuICAgICAgICBtZXRhOiByZXN1bHRzTWFwW2tleS5rZXldXG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiBhc3luYyAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgeyBkcml2ZXIsIGRyaXZlcktleSB9ID0gcmVzb2x2ZUtleShrZXkpO1xuICAgICAgYXdhaXQgc2V0SXRlbShkcml2ZXIsIGRyaXZlcktleSwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2V0SXRlbXM6IGFzeW5jIChpdGVtcykgPT4ge1xuICAgICAgY29uc3QgYXJlYVRvS2V5VmFsdWVNYXAgPSB7fTtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgeyBkcml2ZXJBcmVhLCBkcml2ZXJLZXkgfSA9IHJlc29sdmVLZXkoXG4gICAgICAgICAgXCJrZXlcIiBpbiBpdGVtID8gaXRlbS5rZXkgOiBpdGVtLml0ZW0ua2V5XG4gICAgICAgICk7XG4gICAgICAgIGFyZWFUb0tleVZhbHVlTWFwW2RyaXZlckFyZWFdID8/IChhcmVhVG9LZXlWYWx1ZU1hcFtkcml2ZXJBcmVhXSA9IFtdKTtcbiAgICAgICAgYXJlYVRvS2V5VmFsdWVNYXBbZHJpdmVyQXJlYV0ucHVzaCh7XG4gICAgICAgICAga2V5OiBkcml2ZXJLZXksXG4gICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhhcmVhVG9LZXlWYWx1ZU1hcCkubWFwKGFzeW5jIChbZHJpdmVyQXJlYSwgdmFsdWVzXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRyaXZlciA9IGdldERyaXZlcihkcml2ZXJBcmVhKTtcbiAgICAgICAgICBhd2FpdCBkcml2ZXIuc2V0SXRlbXModmFsdWVzKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgICBzZXRNZXRhOiBhc3luYyAoa2V5LCBwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICBjb25zdCB7IGRyaXZlciwgZHJpdmVyS2V5IH0gPSByZXNvbHZlS2V5KGtleSk7XG4gICAgICBhd2FpdCBzZXRNZXRhKGRyaXZlciwgZHJpdmVyS2V5LCBwcm9wZXJ0aWVzKTtcbiAgICB9LFxuICAgIHNldE1ldGFzOiBhc3luYyAoaXRlbXMpID0+IHtcbiAgICAgIGNvbnN0IGFyZWFUb01ldGFVcGRhdGVzTWFwID0ge307XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZHJpdmVyQXJlYSwgZHJpdmVyS2V5IH0gPSByZXNvbHZlS2V5KFxuICAgICAgICAgIFwia2V5XCIgaW4gaXRlbSA/IGl0ZW0ua2V5IDogaXRlbS5pdGVtLmtleVxuICAgICAgICApO1xuICAgICAgICBhcmVhVG9NZXRhVXBkYXRlc01hcFtkcml2ZXJBcmVhXSA/PyAoYXJlYVRvTWV0YVVwZGF0ZXNNYXBbZHJpdmVyQXJlYV0gPSBbXSk7XG4gICAgICAgIGFyZWFUb01ldGFVcGRhdGVzTWFwW2RyaXZlckFyZWFdLnB1c2goe1xuICAgICAgICAgIGtleTogZHJpdmVyS2V5LFxuICAgICAgICAgIHByb3BlcnRpZXM6IGl0ZW0ubWV0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGFyZWFUb01ldGFVcGRhdGVzTWFwKS5tYXAoXG4gICAgICAgICAgYXN5bmMgKFtzdG9yYWdlQXJlYSwgdXBkYXRlc10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRyaXZlciA9IGdldERyaXZlcihzdG9yYWdlQXJlYSk7XG4gICAgICAgICAgICBjb25zdCBtZXRhS2V5cyA9IHVwZGF0ZXMubWFwKCh7IGtleSB9KSA9PiBnZXRNZXRhS2V5KGtleSkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3RvcmFnZUFyZWEsIG1ldGFLZXlzKTtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTWV0YXMgPSBhd2FpdCBkcml2ZXIuZ2V0SXRlbXMobWV0YUtleXMpO1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdNZXRhTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgICAgICAgICBleGlzdGluZ01ldGFzLm1hcCgoeyBrZXksIHZhbHVlIH0pID0+IFtrZXksIGdldE1ldGFWYWx1ZSh2YWx1ZSldKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFVcGRhdGVzID0gdXBkYXRlcy5tYXAoKHsga2V5LCBwcm9wZXJ0aWVzIH0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbWV0YUtleSA9IGdldE1ldGFLZXkoa2V5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBrZXk6IG1ldGFLZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lcmdlTWV0YShleGlzdGluZ01ldGFNYXBbbWV0YUtleV0gPz8ge30sIHByb3BlcnRpZXMpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IGRyaXZlci5zZXRJdGVtcyhtZXRhVXBkYXRlcyk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogYXN5bmMgKGtleSwgb3B0cykgPT4ge1xuICAgICAgY29uc3QgeyBkcml2ZXIsIGRyaXZlcktleSB9ID0gcmVzb2x2ZUtleShrZXkpO1xuICAgICAgYXdhaXQgcmVtb3ZlSXRlbShkcml2ZXIsIGRyaXZlcktleSwgb3B0cyk7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtczogYXN5bmMgKGtleXMpID0+IHtcbiAgICAgIGNvbnN0IGFyZWFUb0tleXNNYXAgPSB7fTtcbiAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCBrZXlTdHI7XG4gICAgICAgIGxldCBvcHRzO1xuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGtleVN0ciA9IGtleTtcbiAgICAgICAgfSBlbHNlIGlmIChcImdldFZhbHVlXCIgaW4ga2V5KSB7XG4gICAgICAgICAga2V5U3RyID0ga2V5LmtleTtcbiAgICAgICAgfSBlbHNlIGlmIChcIml0ZW1cIiBpbiBrZXkpIHtcbiAgICAgICAgICBrZXlTdHIgPSBrZXkuaXRlbS5rZXk7XG4gICAgICAgICAgb3B0cyA9IGtleS5vcHRpb25zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGtleVN0ciA9IGtleS5rZXk7XG4gICAgICAgICAgb3B0cyA9IGtleS5vcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgZHJpdmVyQXJlYSwgZHJpdmVyS2V5IH0gPSByZXNvbHZlS2V5KGtleVN0cik7XG4gICAgICAgIGFyZWFUb0tleXNNYXBbZHJpdmVyQXJlYV0gPz8gKGFyZWFUb0tleXNNYXBbZHJpdmVyQXJlYV0gPSBbXSk7XG4gICAgICAgIGFyZWFUb0tleXNNYXBbZHJpdmVyQXJlYV0ucHVzaChkcml2ZXJLZXkpO1xuICAgICAgICBpZiAob3B0cz8ucmVtb3ZlTWV0YSkge1xuICAgICAgICAgIGFyZWFUb0tleXNNYXBbZHJpdmVyQXJlYV0ucHVzaChnZXRNZXRhS2V5KGRyaXZlcktleSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3QuZW50cmllcyhhcmVhVG9LZXlzTWFwKS5tYXAoYXN5bmMgKFtkcml2ZXJBcmVhLCBrZXlzMl0pID0+IHtcbiAgICAgICAgICBjb25zdCBkcml2ZXIgPSBnZXREcml2ZXIoZHJpdmVyQXJlYSk7XG4gICAgICAgICAgYXdhaXQgZHJpdmVyLnJlbW92ZUl0ZW1zKGtleXMyKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcbiAgICByZW1vdmVNZXRhOiBhc3luYyAoa2V5LCBwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICBjb25zdCB7IGRyaXZlciwgZHJpdmVyS2V5IH0gPSByZXNvbHZlS2V5KGtleSk7XG4gICAgICBhd2FpdCByZW1vdmVNZXRhKGRyaXZlciwgZHJpdmVyS2V5LCBwcm9wZXJ0aWVzKTtcbiAgICB9LFxuICAgIHNuYXBzaG90OiBhc3luYyAoYmFzZSwgb3B0cykgPT4ge1xuICAgICAgY29uc3QgZHJpdmVyID0gZ2V0RHJpdmVyKGJhc2UpO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRyaXZlci5zbmFwc2hvdCgpO1xuICAgICAgb3B0cz8uZXhjbHVkZUtleXM/LmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBkZWxldGUgZGF0YVtrZXldO1xuICAgICAgICBkZWxldGUgZGF0YVtnZXRNZXRhS2V5KGtleSldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIHJlc3RvcmVTbmFwc2hvdDogYXN5bmMgKGJhc2UsIGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGRyaXZlciA9IGdldERyaXZlcihiYXNlKTtcbiAgICAgIGF3YWl0IGRyaXZlci5yZXN0b3JlU25hcHNob3QoZGF0YSk7XG4gICAgfSxcbiAgICB3YXRjaDogKGtleSwgY2IpID0+IHtcbiAgICAgIGNvbnN0IHsgZHJpdmVyLCBkcml2ZXJLZXkgfSA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgIHJldHVybiB3YXRjaChkcml2ZXIsIGRyaXZlcktleSwgY2IpO1xuICAgIH0sXG4gICAgdW53YXRjaCgpIHtcbiAgICAgIE9iamVjdC52YWx1ZXMoZHJpdmVycykuZm9yRWFjaCgoZHJpdmVyKSA9PiB7XG4gICAgICAgIGRyaXZlci51bndhdGNoKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlZmluZUl0ZW06IChrZXksIG9wdHMpID0+IHtcbiAgICAgIGNvbnN0IHsgZHJpdmVyLCBkcml2ZXJLZXkgfSA9IHJlc29sdmVLZXkoa2V5KTtcbiAgICAgIGNvbnN0IHsgdmVyc2lvbjogdGFyZ2V0VmVyc2lvbiA9IDEsIG1pZ3JhdGlvbnMgPSB7fSB9ID0gb3B0cyA/PyB7fTtcbiAgICAgIGlmICh0YXJnZXRWZXJzaW9uIDwgMSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBcIlN0b3JhZ2UgaXRlbSB2ZXJzaW9uIGNhbm5vdCBiZSBsZXNzIHRoYW4gMS4gSW5pdGlhbCB2ZXJzaW9ucyBzaG91bGQgYmUgc2V0IHRvIDEsIG5vdCAwLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBtaWdyYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBkcml2ZXJNZXRhS2V5ID0gZ2V0TWV0YUtleShkcml2ZXJLZXkpO1xuICAgICAgICBjb25zdCBbeyB2YWx1ZSB9LCB7IHZhbHVlOiBtZXRhIH1dID0gYXdhaXQgZHJpdmVyLmdldEl0ZW1zKFtcbiAgICAgICAgICBkcml2ZXJLZXksXG4gICAgICAgICAgZHJpdmVyTWV0YUtleVxuICAgICAgICBdKTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IG1ldGE/LnYgPz8gMTtcbiAgICAgICAgaWYgKGN1cnJlbnRWZXJzaW9uID4gdGFyZ2V0VmVyc2lvbikge1xuICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgYFZlcnNpb24gZG93bmdyYWRlIGRldGVjdGVkICh2JHtjdXJyZW50VmVyc2lvbn0gLT4gdiR7dGFyZ2V0VmVyc2lvbn0pIGZvciBcIiR7a2V5fVwiYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcbiAgICAgICAgICBgW0B3eHQtZGV2L3N0b3JhZ2VdIFJ1bm5pbmcgc3RvcmFnZSBtaWdyYXRpb24gZm9yICR7a2V5fTogdiR7Y3VycmVudFZlcnNpb259IC0+IHYke3RhcmdldFZlcnNpb259YFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtaWdyYXRpb25zVG9SdW4gPSBBcnJheS5mcm9tKFxuICAgICAgICAgIHsgbGVuZ3RoOiB0YXJnZXRWZXJzaW9uIC0gY3VycmVudFZlcnNpb24gfSxcbiAgICAgICAgICAoXywgaSkgPT4gY3VycmVudFZlcnNpb24gKyBpICsgMVxuICAgICAgICApO1xuICAgICAgICBsZXQgbWlncmF0ZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBmb3IgKGNvbnN0IG1pZ3JhdGVUb1ZlcnNpb24gb2YgbWlncmF0aW9uc1RvUnVuKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1pZ3JhdGVkVmFsdWUgPSBhd2FpdCBtaWdyYXRpb25zPy5bbWlncmF0ZVRvVmVyc2lvbl0/LihtaWdyYXRlZFZhbHVlKSA/PyBtaWdyYXRlZFZhbHVlO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYHYke21pZ3JhdGVUb1ZlcnNpb259IG1pZ3JhdGlvbiBmYWlsZWQgZm9yIFwiJHtrZXl9XCJgLCB7XG4gICAgICAgICAgICAgIGNhdXNlOiBlcnJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBkcml2ZXIuc2V0SXRlbXMoW1xuICAgICAgICAgIHsga2V5OiBkcml2ZXJLZXksIHZhbHVlOiBtaWdyYXRlZFZhbHVlIH0sXG4gICAgICAgICAgeyBrZXk6IGRyaXZlck1ldGFLZXksIHZhbHVlOiB7IC4uLm1ldGEsIHY6IHRhcmdldFZlcnNpb24gfSB9XG4gICAgICAgIF0pO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFxuICAgICAgICAgIGBbQHd4dC1kZXYvc3RvcmFnZV0gU3RvcmFnZSBtaWdyYXRpb24gY29tcGxldGVkIGZvciAke2tleX0gdiR7dGFyZ2V0VmVyc2lvbn1gLFxuICAgICAgICAgIHsgbWlncmF0ZWRWYWx1ZSB9XG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgY29uc3QgbWlncmF0aW9uc0RvbmUgPSBvcHRzPy5taWdyYXRpb25zID09IG51bGwgPyBQcm9taXNlLnJlc29sdmUoKSA6IG1pZ3JhdGUoKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFtAd3h0LWRldi9zdG9yYWdlXSBNaWdyYXRpb24gZmFpbGVkIGZvciAke2tleX1gLFxuICAgICAgICAgIGVyclxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBpbml0TXV0ZXggPSBuZXcgTXV0ZXgoKTtcbiAgICAgIGNvbnN0IGdldEZhbGxiYWNrID0gKCkgPT4gb3B0cz8uZmFsbGJhY2sgPz8gb3B0cz8uZGVmYXVsdFZhbHVlID8/IG51bGw7XG4gICAgICBjb25zdCBnZXRPckluaXRWYWx1ZSA9ICgpID0+IGluaXRNdXRleC5ydW5FeGNsdXNpdmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IGRyaXZlci5nZXRJdGVtKGRyaXZlcktleSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IG9wdHM/LmluaXQgPT0gbnVsbClcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gYXdhaXQgb3B0cy5pbml0KCk7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zZXRJdGVtKGRyaXZlcktleSwgbmV3VmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgICB9KTtcbiAgICAgIG1pZ3JhdGlvbnNEb25lLnRoZW4oZ2V0T3JJbml0VmFsdWUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5LFxuICAgICAgICBnZXQgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICAgIHJldHVybiBnZXRGYWxsYmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgZmFsbGJhY2soKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEZhbGxiYWNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFZhbHVlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgbWlncmF0aW9uc0RvbmU7XG4gICAgICAgICAgaWYgKG9wdHM/LmluaXQpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRPckluaXRWYWx1ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0SXRlbShkcml2ZXIsIGRyaXZlcktleSwgb3B0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRNZXRhOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgbWlncmF0aW9uc0RvbmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IGdldE1ldGEoZHJpdmVyLCBkcml2ZXJLZXkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZTogYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgYXdhaXQgbWlncmF0aW9uc0RvbmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNldEl0ZW0oZHJpdmVyLCBkcml2ZXJLZXksIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0TWV0YTogYXN5bmMgKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICBhd2FpdCBtaWdyYXRpb25zRG9uZTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2V0TWV0YShkcml2ZXIsIGRyaXZlcktleSwgcHJvcGVydGllcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZVZhbHVlOiBhc3luYyAob3B0czIpID0+IHtcbiAgICAgICAgICBhd2FpdCBtaWdyYXRpb25zRG9uZTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgcmVtb3ZlSXRlbShkcml2ZXIsIGRyaXZlcktleSwgb3B0czIpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVNZXRhOiBhc3luYyAocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgIGF3YWl0IG1pZ3JhdGlvbnNEb25lO1xuICAgICAgICAgIHJldHVybiBhd2FpdCByZW1vdmVNZXRhKGRyaXZlciwgZHJpdmVyS2V5LCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IChjYikgPT4gd2F0Y2goXG4gICAgICAgICAgZHJpdmVyLFxuICAgICAgICAgIGRyaXZlcktleSxcbiAgICAgICAgICAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiBjYihuZXdWYWx1ZSA/PyBnZXRGYWxsYmFjaygpLCBvbGRWYWx1ZSA/PyBnZXRGYWxsYmFjaygpKVxuICAgICAgICApLFxuICAgICAgICBtaWdyYXRlXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHN0b3JhZ2UyO1xufVxuZnVuY3Rpb24gY3JlYXRlRHJpdmVyKHN0b3JhZ2VBcmVhKSB7XG4gIGNvbnN0IGdldFN0b3JhZ2VBcmVhID0gKCkgPT4ge1xuICAgIGlmIChicm93c2VyLnJ1bnRpbWUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIFtcbiAgICAgICAgICBcIid3eHQvc3RvcmFnZScgbXVzdCBiZSBsb2FkZWQgaW4gYSB3ZWIgZXh0ZW5zaW9uIGVudmlyb25tZW50XCIsXG4gICAgICAgICAgXCJcXG4gLSBJZiB0aHJvd24gZHVyaW5nIGEgYnVpbGQsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vd3h0LWRldi93eHQvaXNzdWVzLzM3MVwiLFxuICAgICAgICAgIFwiIC0gSWYgdGhyb3duIGR1cmluZyB0ZXN0cywgbW9jayAnd3h0L2Jyb3dzZXInIGNvcnJlY3RseS4gU2VlIGh0dHBzOi8vd3h0LmRldi9ndWlkZS9nby1mdXJ0aGVyL3Rlc3RpbmcuaHRtbFxcblwiXG4gICAgICAgIF0uam9pbihcIlxcblwiKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGJyb3dzZXIuc3RvcmFnZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJZb3UgbXVzdCBhZGQgdGhlICdzdG9yYWdlJyBwZXJtaXNzaW9uIHRvIHlvdXIgbWFuaWZlc3QgdG8gdXNlICd3eHQvc3RvcmFnZSdcIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgYXJlYSA9IGJyb3dzZXIuc3RvcmFnZVtzdG9yYWdlQXJlYV07XG4gICAgaWYgKGFyZWEgPT0gbnVsbClcbiAgICAgIHRocm93IEVycm9yKGBcImJyb3dzZXIuc3RvcmFnZS4ke3N0b3JhZ2VBcmVhfVwiIGlzIHVuZGVmaW5lZGApO1xuICAgIHJldHVybiBhcmVhO1xuICB9O1xuICBjb25zdCB3YXRjaExpc3RlbmVycyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCk7XG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbTogYXN5bmMgKGtleSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2V0U3RvcmFnZUFyZWEoKS5nZXQoa2V5KTtcbiAgICAgIHJldHVybiByZXNba2V5XTtcbiAgICB9LFxuICAgIGdldEl0ZW1zOiBhc3luYyAoa2V5cykgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0U3RvcmFnZUFyZWEoKS5nZXQoa2V5cyk7XG4gICAgICByZXR1cm4ga2V5cy5tYXAoKGtleSkgPT4gKHsga2V5LCB2YWx1ZTogcmVzdWx0W2tleV0gPz8gbnVsbCB9KSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiBhc3luYyAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgYXdhaXQgZ2V0U3RvcmFnZUFyZWEoKS5yZW1vdmUoa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGdldFN0b3JhZ2VBcmVhKCkuc2V0KHsgW2tleV06IHZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0SXRlbXM6IGFzeW5jICh2YWx1ZXMpID0+IHtcbiAgICAgIGNvbnN0IG1hcCA9IHZhbHVlcy5yZWR1Y2UoXG4gICAgICAgIChtYXAyLCB7IGtleSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgIG1hcDJba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBtYXAyO1xuICAgICAgICB9LFxuICAgICAgICB7fVxuICAgICAgKTtcbiAgICAgIGF3YWl0IGdldFN0b3JhZ2VBcmVhKCkuc2V0KG1hcCk7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiBhc3luYyAoa2V5KSA9PiB7XG4gICAgICBhd2FpdCBnZXRTdG9yYWdlQXJlYSgpLnJlbW92ZShrZXkpO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbXM6IGFzeW5jIChrZXlzKSA9PiB7XG4gICAgICBhd2FpdCBnZXRTdG9yYWdlQXJlYSgpLnJlbW92ZShrZXlzKTtcbiAgICB9LFxuICAgIHNuYXBzaG90OiBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgZ2V0U3RvcmFnZUFyZWEoKS5nZXQoKTtcbiAgICB9LFxuICAgIHJlc3RvcmVTbmFwc2hvdDogYXN5bmMgKGRhdGEpID0+IHtcbiAgICAgIGF3YWl0IGdldFN0b3JhZ2VBcmVhKCkuc2V0KGRhdGEpO1xuICAgIH0sXG4gICAgd2F0Y2goa2V5LCBjYikge1xuICAgICAgY29uc3QgbGlzdGVuZXIgPSAoY2hhbmdlcykgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzW2tleV07XG4gICAgICAgIGlmIChjaGFuZ2UgPT0gbnVsbClcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChkZXF1YWwoY2hhbmdlLm5ld1ZhbHVlLCBjaGFuZ2Uub2xkVmFsdWUpKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2IoY2hhbmdlLm5ld1ZhbHVlID8/IG51bGwsIGNoYW5nZS5vbGRWYWx1ZSA/PyBudWxsKTtcbiAgICAgIH07XG4gICAgICBnZXRTdG9yYWdlQXJlYSgpLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB3YXRjaExpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZ2V0U3RvcmFnZUFyZWEoKS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICB3YXRjaExpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHVud2F0Y2goKSB7XG4gICAgICB3YXRjaExpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgICBnZXRTdG9yYWdlQXJlYSgpLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB9KTtcbiAgICAgIHdhdGNoTGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgfVxuICB9O1xufVxuY2xhc3MgTWlncmF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGtleSwgdmVyc2lvbiwgb3B0aW9ucykge1xuICAgIHN1cGVyKGB2JHt2ZXJzaW9ufSBtaWdyYXRpb24gZmFpbGVkIGZvciBcIiR7a2V5fVwiYCwgb3B0aW9ucyk7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgfVxufVxuXG5leHBvcnQgeyBNaWdyYXRpb25FcnJvciwgc3RvcmFnZSB9O1xuIiwiaW1wb3J0IHR5cGUgeyBXeHRTdG9yYWdlSXRlbSwgV3h0U3RvcmFnZUl0ZW1PcHRpb25zIH0gZnJvbSBcInd4dC9zdG9yYWdlXCI7XG5pbXBvcnQgdHlwZSB7IElSZXBvc2l0b3J5LCBBcHBSZXBvc2l0b3J5IH0gZnJvbSBcIkAvdHlwZXMvcmVwb3NpdG9yeVwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiQGNvbmZpZ1wiO1xuaW1wb3J0IHsgdHlwZSBBcHBDb25maWcgfSBmcm9tIFwiQC90eXBlcy9jb25maWdcIjtcbmltcG9ydCB0eXBlIEZhcnRNb2RlIGZyb20gXCJAL3R5cGVzL2ZhcnQtbW9kZVwiO1xuaW1wb3J0IFBhdGgsIHsgc3RyTGlzdFRvUGF0aExpc3QgfSBmcm9tIFwiQC90eXBlcy9wYXRoXCI7XG5cbmludGVyZmFjZSBTdG9yYWdlUGFyYW1zPFQ+IHtcbiAga2V5OiBzdHJpbmc7XG4gIG9wdGlvbnM6IFd4dFN0b3JhZ2VJdGVtT3B0aW9uczxUPjtcbn1cblxuY2xhc3MgU3RvcmFnZTxUPiBpbXBsZW1lbnRzIElSZXBvc2l0b3J5PFQ+IHtcbiAgcHJpdmF0ZSBrZXlfOiBzdHJpbmc7XG4gIHByaXZhdGUgc3RvcmFnZTogV3h0U3RvcmFnZUl0ZW08VCwge30+O1xuICBjb25zdHJ1Y3RvcihwYXJhbXM6IFN0b3JhZ2VQYXJhbXM8VD4pIHtcbiAgICB0aGlzLmtleV8gPSBwYXJhbXMua2V5O1xuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZGVmaW5lSXRlbTxUPihgbG9jYWw6JHt0aGlzLmtleV99YCwgcGFyYW1zLm9wdGlvbnMpO1xuICB9XG4gIGdldCA9IGFzeW5jICgpOiBQcm9taXNlPFQ+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBzZXQgPSBhc3luYyAodmFsdWU6IFQpID0+IHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0VmFsdWUodmFsdWUpO1xuICB9O1xufVxuXG5jb25zdCBBcHBTdG9yYWdlOiBBcHBSZXBvc2l0b3J5ID0ge1xuICBpc0FjdGl2YXRlZDogbmV3IFN0b3JhZ2U8Ym9vbGVhbj4oe1xuICAgIGtleTogXCJpc0FjdGl2YXRlZFwiLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnLmlzQWN0aXZhdGVkLmRlZmF1bHQsXG4gICAgICBmYWxsYmFjazogY29uZmlnLmlzQWN0aXZhdGVkLmZhbGxiYWNrLFxuICAgIH0sXG4gIH0pLFxuICBzb3VuZDogbmV3IFN0b3JhZ2U8c3RyaW5nPih7XG4gICAga2V5OiBcInNvdW5kXCIsXG4gICAgb3B0aW9uczoge1xuICAgICAgZGVmYXVsdFZhbHVlOiBjb25maWcuc291bmQuZGVmYXVsdCxcbiAgICAgIGZhbGxiYWNrOiBjb25maWcuc291bmQuZmFsbGJhY2ssXG4gICAgfSxcbiAgfSksXG4gIGFsbFNvdW5kczogbmV3IFN0b3JhZ2U8UGF0aFtdPih7XG4gICAga2V5OiBcImFsbFNvdW5kc1wiLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogc3RyTGlzdFRvUGF0aExpc3QoY29uZmlnLmFsbFNvdW5kcy5kZWZhdWx0KSxcbiAgICAgIGZhbGxiYWNrOiBzdHJMaXN0VG9QYXRoTGlzdChjb25maWcuYWxsU291bmRzLmZhbGxiYWNrKSxcbiAgICB9LFxuICB9KSxcbiAgcHJvYmFiaWxpdHk6IG5ldyBTdG9yYWdlPG51bWJlcj4oe1xuICAgIGtleTogXCJwcm9iYWJpbGl0eVwiLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGRlZmF1bHRWYWx1ZTogY29uZmlnLnByb2JhYmlsaXR5LmRlZmF1bHQsXG4gICAgICBmYWxsYmFjazogY29uZmlnLnByb2JhYmlsaXR5LmZhbGxiYWNrLFxuICAgIH0sXG4gIH0pLFxuICBmYXJ0TW9kZTogbmV3IFN0b3JhZ2U8RmFydE1vZGU+KHtcbiAgICBrZXk6IFwiZmFydE1vZGVcIixcbiAgICBvcHRpb25zOiB7XG4gICAgICBkZWZhdWx0VmFsdWU6IGNvbmZpZy5mYXJ0TW9kZS5kZWZhdWx0IGFzIEZhcnRNb2RlLFxuICAgICAgZmFsbGJhY2s6IGNvbmZpZy5mYXJ0TW9kZS5mYWxsYmFjayBhcyBGYXJ0TW9kZSxcbiAgICB9LFxuICB9KSxcbiAgY29uZmlnOiB7XG4gICAgZ2V0OiBhc3luYyAoKTogUHJvbWlzZTxBcHBDb25maWc+ID0+IHtcbiAgICAgIGNvbnN0IFtpc0FjdGl2YXRlZCwgc291bmQsIHByb2JhYmlsaXR5LCBtb2RlXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgQXBwU3RvcmFnZS5pc0FjdGl2YXRlZC5nZXQoKSxcbiAgICAgICAgQXBwU3RvcmFnZS5zb3VuZC5nZXQoKSxcbiAgICAgICAgQXBwU3RvcmFnZS5wcm9iYWJpbGl0eS5nZXQoKSxcbiAgICAgICAgQXBwU3RvcmFnZS5mYXJ0TW9kZS5nZXQoKSxcbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIHsgaXNBY3RpdmF0ZWQsIHNvdW5kLCBwcm9iYWJpbGl0eSwgbW9kZSB9O1xuICAgIH0sXG4gICAgc2V0OiBhc3luYyAoY29uZmlnOiBBcHBDb25maWcpID0+IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgQXBwU3RvcmFnZS5pc0FjdGl2YXRlZC5zZXQoY29uZmlnLmlzQWN0aXZhdGVkKSxcbiAgICAgICAgQXBwU3RvcmFnZS5zb3VuZC5zZXQoY29uZmlnLnNvdW5kKSxcbiAgICAgICAgQXBwU3RvcmFnZS5wcm9iYWJpbGl0eS5zZXQoY29uZmlnLnByb2JhYmlsaXR5KSxcbiAgICAgICAgQXBwU3RvcmFnZS5mYXJ0TW9kZS5zZXQoY29uZmlnLm1vZGUpLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFN0b3JhZ2U7XG4iLCJpbXBvcnQgeyBVc2VyTWFuaWZlc3QgfSBmcm9tIFwid3h0XCI7XG5cbmNvbnN0IE1hbmlmZXN0OiBVc2VyTWFuaWZlc3QgPSB7XG4gIG5hbWU6IFwiRmFydGlmeVwiLFxuICB2ZXJzaW9uOiBcIjEuMC4wXCIsXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCIsIFwiYWN0aXZlVGFiXCIsIFwiYmFja2dyb3VuZFwiXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbXCJzb3VuZHMvKlwiXSxcbiAgICAgIG1hdGNoZXM6IFtcIjxhbGxfdXJscz5cIl0sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmlmZXN0O1xuIiwiaW1wb3J0IE1hbmlmZXN0IGZyb20gXCJAbWFuaWZlc3RcIjtcblxuY29uc3QgYXBwTmFtZSA9IE1hbmlmZXN0Lm5hbWUhO1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2VUeXBlIHtcbiAgcHJpdmF0ZSBuYW1lc3BhY2U6IHN0cmluZztcbiAgcmVhZG9ubHkgR0VUOiBzdHJpbmc7XG4gIHJlYWRvbmx5IFNFVDogc3RyaW5nO1xuICBwcml2YXRlIGZvcm1hdCh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLm5hbWVzcGFjZX06JHt0eXBlfWA7XG4gIH1cbiAgY29uc3RydWN0b3IobmFtZXNwYWNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWVzcGFjZSA9IGAke2FwcE5hbWV9OiR7bmFtZXNwYWNlfWA7XG4gICAgdGhpcy5HRVQgPSB0aGlzLmZvcm1hdChcIkdFVFwiKTtcbiAgICB0aGlzLlNFVCA9IHRoaXMuZm9ybWF0KFwiU0VUXCIpO1xuICB9XG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZTtcbiAgfVxufVxuXG5jbGFzcyBBcHBNZXNzYWdlVHlwZXMge1xuICBzdGF0aWMgcmVhZG9ubHkgY29uZmlnID0gbmV3IE1lc3NhZ2VUeXBlKFwiY29uZmlnXCIpO1xuICBzdGF0aWMgcmVhZG9ubHkgaXNBY3RpdmF0ZWQgPSBuZXcgTWVzc2FnZVR5cGUoXCJpcy1hY3RpdmF0ZWRcIik7XG4gIHN0YXRpYyByZWFkb25seSBzb3VuZCA9IG5ldyBNZXNzYWdlVHlwZShcInNvdW5kXCIpO1xuICBzdGF0aWMgcmVhZG9ubHkgc291bmRMaXN0ID0gbmV3IE1lc3NhZ2VUeXBlKFwic291bmQtbGlzdFwiKTtcbiAgc3RhdGljIHJlYWRvbmx5IHByb2JhYmlsaXR5ID0gbmV3IE1lc3NhZ2VUeXBlKFwicHJvYmFiaWxpdHlcIik7XG4gIHN0YXRpYyByZWFkb25seSBmYXJ0TW9kZSA9IG5ldyBNZXNzYWdlVHlwZShcImZhcnQtbW9kZVwiKTtcbiAgc3RhdGljIHJlYWRvbmx5IHVwZGF0ZSA9IG5ldyBNZXNzYWdlVHlwZShcInVwZGF0ZVwiKTtcbn1cblxuZXhwb3J0IGNvbnN0IG1lc3NhZ2VJc0ZvclRoaXNBcHAgPSAodHlwZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB0eXBlLnN0YXJ0c1dpdGgoYXBwTmFtZSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBcHBNZXNzYWdlVHlwZXM7XG4iLCJpbXBvcnQgQXBwQ2FjaGUgZnJvbSBcIkAvcmVwb3NpdG9yaWVzL2NhY2hlXCI7XG5pbXBvcnQgQXBwU3RvcmFnZSBmcm9tIFwiQC9yZXBvc2l0b3JpZXMvc3RvcmFnZVwiO1xuaW1wb3J0IG1lc3NhZ2VUeXBlLCB7IG1lc3NhZ2VJc0ZvclRoaXNBcHAgfSBmcm9tIFwiQC9tZXNzYWdlLXR5cGVzXCI7XG5pbXBvcnQgUGF0aCBmcm9tIFwiQC90eXBlcy9wYXRoXCI7XG5cbmNvbnN0IGdldFJhbmRvbVNvdW5kID0gKCkgPT4ge1xuICBjb25zdCBsaXN0OiBQYXRoW10gPSBBcHBDYWNoZS5hbGxTb3VuZHMuZ2V0KCk7XG4gIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdC5sZW5ndGgpO1xuICByZXR1cm4gbGlzdFtyYW5kb21JbmRleF0uZnVsbDtcbn07XG5cbmNvbnN0IGdldHRlciA9IChtZXNzYWdlOiBhbnksIHNlbmRlcjogY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcikgPT4ge1xuICBjb25zdCB0eXBlID0gbWVzc2FnZS50eXBlO1xuICBpZiAodHlwZSA9PT0gbWVzc2FnZVR5cGUuY29uZmlnLkdFVCkge1xuICAgIHJldHVybiBBcHBDYWNoZS5jb25maWcuZ2V0KCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gbWVzc2FnZVR5cGUuaXNBY3RpdmF0ZWQuR0VUKSB7XG4gICAgcmV0dXJuIEFwcENhY2hlLmlzQWN0aXZhdGVkLmdldCgpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLnNvdW5kLkdFVCkge1xuICAgIGNvbnN0IHZhbHVlID0gQXBwQ2FjaGUuc291bmQuZ2V0KCk7XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUgOiBnZXRSYW5kb21Tb3VuZCgpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLmZhcnRNb2RlLkdFVCkge1xuICAgIHJldHVybiBBcHBDYWNoZS5mYXJ0TW9kZS5nZXQoKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSBtZXNzYWdlVHlwZS5zb3VuZExpc3QuR0VUKSB7XG4gICAgcmV0dXJuIEFwcENhY2hlLmFsbFNvdW5kcy5nZXQoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuY29uc3Qgc2V0dGVyID0gYXN5bmMgKG1lc3NhZ2U6IGFueSwgc2VuZGVyOiBjaHJvbWUucnVudGltZS5NZXNzYWdlU2VuZGVyKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBtZXNzYWdlLnR5cGU7XG4gIGNvbnN0IHZhbHVlID0gbWVzc2FnZS52YWx1ZTtcbiAgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLmNvbmZpZy5TRVQpIHtcbiAgICBhd2FpdCBBcHBTdG9yYWdlLmNvbmZpZy5zZXQodmFsdWUpO1xuICAgIEFwcENhY2hlLmNvbmZpZy5zZXQodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLmlzQWN0aXZhdGVkLlNFVCkge1xuICAgIGF3YWl0IEFwcFN0b3JhZ2UuaXNBY3RpdmF0ZWQuc2V0KHZhbHVlKTtcbiAgICBBcHBDYWNoZS5pc0FjdGl2YXRlZC5zZXQodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLnNvdW5kLlNFVCkge1xuICAgIGF3YWl0IEFwcFN0b3JhZ2Uuc291bmQuc2V0KHZhbHVlKTtcbiAgICBBcHBDYWNoZS5zb3VuZC5zZXQodmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IG1lc3NhZ2VUeXBlLmZhcnRNb2RlLlNFVCkge1xuICAgIGF3YWl0IEFwcFN0b3JhZ2UuZmFydE1vZGUuc2V0KHZhbHVlKTtcbiAgICBBcHBDYWNoZS5mYXJ0TW9kZS5zZXQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXRDYWNoZSgpIHtcbiAgY29uc3QgaW5pdGlhbENvbmZpZyA9IGF3YWl0IEFwcFN0b3JhZ2UuY29uZmlnLmdldCgpO1xuICBBcHBDYWNoZS5jb25maWcuc2V0KGluaXRpYWxDb25maWcpO1xuICBjb25zdCBsaXN0OiBQYXRoW10gPSBhd2FpdCBBcHBTdG9yYWdlLmFsbFNvdW5kcy5nZXQoKTtcbiAgbGlzdC5zb3J0KChhLCBiKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcbiAgQXBwQ2FjaGUuYWxsU291bmRzLnNldChsaXN0KTtcbn1cblxuaW5pdENhY2hlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUJhY2tncm91bmQoe1xuICBtYWluKCkge1xuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgICAgIGFzeW5jIChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAobWVzc2FnZUlzRm9yVGhpc0FwcChtZXNzYWdlLnR5cGUpKSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2V0dGVyKG1lc3NhZ2UsIHNlbmRlcik7XG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKChhd2FpdCBzZXR0ZXIobWVzc2FnZSwgc2VuZGVyKSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gICAgY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKGFjdGl2ZUluZm8pID0+IHtcbiAgICAgIGNvbnN0IHRhYklkID0gYWN0aXZlSW5mby50YWJJZDtcbiAgICAgIGNocm9tZS50YWJzXG4gICAgICAgIC5zZW5kTWVzc2FnZSh0YWJJZCwge1xuICAgICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLnVwZGF0ZS5TRVQsXG4gICAgICAgICAgdmFsdWU6IEFwcENhY2hlLmlzQWN0aXZhdGVkLmdldCgpLFxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG59KTtcbiIsImV4cG9ydCBjb25zdCBicm93c2VyID0gKFxuICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gIGdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZT8uaWQgPT0gbnVsbCA/IGdsb2JhbFRoaXMuY2hyb21lIDogKFxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICBnbG9iYWxUaGlzLmJyb3dzZXJcbiAgKVxuKTtcbiJdLCJuYW1lcyI6WyJfYSIsInJlc3VsdCIsImJyb3dzZXIiLCJjb25maWciLCJtZXNzYWdlVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sV0FBUyxpQkFBaUIsS0FBSztBQUNwQyxRQUFJLE9BQU8sUUFBUSxPQUFPLFFBQVEsV0FBWSxRQUFPLEVBQUUsTUFBTSxJQUFLO0FBQ2xFLFdBQU87QUFBQSxFQUNUO0FDRkEsTUFBSSxnQkFBZ0IsTUFBTTtBQUFBLElBQ3hCLFlBQVksY0FBYztBQUN4QixVQUFJLGlCQUFpQixjQUFjO0FBQ2pDLGFBQUssWUFBWTtBQUNqQixhQUFLLGtCQUFrQixDQUFDLEdBQUcsY0FBYyxTQUFTO0FBQ2xELGFBQUssZ0JB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RUo7QUFDQSxhQUFPLEtBQUssWUFBWSxZQUFZLENBQUMsZUFBZTtBQUNsRCxjQUFNLFFBQVEsV0FBVztBQUNsQixlQUFBLEtBQ0osWUFBWSxPQUFPO0FBQUEsVUFDbEIsTUFBTUcsZ0JBQVksT0FBTztBQUFBLFVBQ3pCLE9BQU8sU0FBUyxZQUFZLElBQUk7QUFBQSxRQUFBLENBQ2pDLEVBQ0EsTUFBTSxDQUFDLE1BQU07QUFDWixrQkFBUSxJQUFJLENBQUM7QUFBQSxRQUFBLENBQ2Q7QUFBQSxNQUFBLENBQ0o7QUFBQSxJQUFBO0FBQUEsRUFFTCxDQUFDOzs7O0FDcEZNLFFBQU07QUFBQTtBQUFBLE1BRVgsc0JBQVcsWUFBWCxtQkFBb0IsWUFBcEIsbUJBQTZCLE9BQU0sT0FBTyxXQUFXO0FBQUE7QUFBQSxNQUVuRCxXQUFXO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSw1LDYsNywxMl19
