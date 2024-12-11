import React, { useState } from "react";
import Config from "@config";
import "./App.css";
import AppApi from "@/repositories/message-api";
import AppMessageTypes from "@/message-types";
import fart from "@/utils/fart-effect";
import { MEPByTime } from "@/utils/prevent-multipul-execution";
import { FartModes } from "@/types/fart-mode";

const preventer = new MEPByTime(100);

const ActivateButton: React.FC = () => {
  // define states
  const [isActivated, setisActivated] = useState(Config.isActivated.default);
  // initialize states
  useEffect(() => {
    const update = async () => {
      const result = await AppApi.config.get();
      setisActivated(result.isActivated);
    };
    update();
  }, []);
  // define functions to handle events
  const toggleIsActivated = async (e: React.MouseEvent): Promise<void> =>
    preventer.exec(async () => {
      const newValue = !isActivated;
      await AppApi.isActivated.set(newValue);
      const mode = await AppApi.fartMode.get();
      setisActivated(newValue);
      if (newValue) {
        if (mode === FartModes.BAZOOKA) fart(e, 5);
        else fart(e, 1);
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs
          .sendMessage(tabs[0].id as number, {
            type: AppMessageTypes.update.SET,
            value: newValue,
          })
          .catch((e) => {
            console.error(e);
          });
      });
    });
  // render
  return (
    <button
      onClick={toggleIsActivated}
      className={isActivated ? "active" : "disabled"}
    >
      {isActivated ? "Fart" : "Quiet"}
    </button>
  );
};

export default ActivateButton;
