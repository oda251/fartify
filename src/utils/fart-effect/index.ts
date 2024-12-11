import AppApi from "@/repositories/message-api";
import sleep from "../sleep";
import { stainWindow } from "@/utils/fart-effect/stain-window";
import { FartModes } from "@/types/fart-mode";
import visualEffect from "./visual-effect";
import React from "react";
import "./style.css";
import getRelativeMousePosition from "../get-relative-mouse-pos";

const fart = async (
  event: MouseEvent | React.MouseEvent,
  probability?: number
) => {
  const config = await AppApi.config.get();
  if (!config.isActivated) {
    return;
  }
  if (probability === undefined) {
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
  const times = Math.ceil(probability!);
  if (probability! !== times) {
    probability = probability! - Math.floor(probability!);
  }
  const pos = getRelativeMousePosition(event);
  let count = 0;
  for (let i = 0; i < times; i++) {
    if (Math.random() > probability!) {
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

export default fart;
