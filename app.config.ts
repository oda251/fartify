import soundsList from "./src/sounds-list.json";

const Config = {
  isActivated: {
    default: true,
    fallback: false,
  },
  fartMode: {
    default: "natural",
    fallback: "natural",
  },
  sound: {
    default: "",
    fallback: "sounds/fart/01 ブリッ！.mp3",
  },
  allSounds: {
    default: soundsList.files,
    fallback: soundsList.files,
  },
  probability: {
    default: 0.1,
    fallback: 0.1,
  },
  stainColor: {
    default: "#ffdead",
    fallback: "#ffdead",
  },
};

export default Config;
