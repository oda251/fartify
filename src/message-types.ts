import Manifest from "@manifest";

const appName = Manifest.name!;
export class MessageType {
  private namespace: string;
  readonly GET: string;
  readonly SET: string;
  private format(type: string): string {
    return `${this.namespace}:${type}`;
  }
  constructor(namespace: string) {
    this.namespace = `${appName}:${namespace}`;
    this.GET = this.format("GET");
    this.SET = this.format("SET");
  }
  toString() {
    return this.namespace;
  }
}

class AppMessageTypes {
  static readonly config = new MessageType("config");
  static readonly isActivated = new MessageType("is-activated");
  static readonly sound = new MessageType("sound");
  static readonly soundList = new MessageType("sound-list");
  static readonly probability = new MessageType("probability");
  static readonly fartMode = new MessageType("fart-mode");
  static readonly update = new MessageType("update");
}

export const messageIsForThisApp = (type: string) => {
  return type.startsWith(appName);
};

export default AppMessageTypes;
