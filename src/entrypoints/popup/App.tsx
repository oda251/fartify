import React, { useState } from "react";
import Manifest from "@manifest";
import "./App.css";
import SoundSelector from "./sound-selector";
import ModeSelector from "./mode-selector";
import ActivateButton from "./acitivate-button";

const App: React.FC = () => {
  return (
    <div className="body">
      <h1>{Manifest.name}</h1>
      <div id="config">
        <SoundSelector />
        <div className="buttons">
          <ModeSelector />
          <ActivateButton />
        </div>
      </div>
    </div>
  );
};

export default App;
