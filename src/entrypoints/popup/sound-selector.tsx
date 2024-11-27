import AppApi from "@/repositories/message-api";
import Path from "@/types/path";
import React from "react";
import PlayButton from "./play-button";

const RANDOM: Path = { full: "", name: "Random" };

const SoundSelector: React.FC = () => {
  // define states
  const [sound, setSound] = useState(RANDOM.name);
  const [soundOptions, setSoundOptions] = useState<Path[]>([]);
  // initialize states
  useEffect(() => {
    const update = async () => {
      let soundList: Path[] = await AppApi.soundList.get();
      const config = await AppApi.config.get();
      setSoundOptions(soundList);
      setSound(config.sound);
    };
    update();
  }, []);
  // define event handlers
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    await AppApi.sound.set(newValue);
    setSound(newValue);
  };
  // render
  return (
    <div className="sound-selector">
      <select value={sound} onChange={handleChange}>
        <option key={RANDOM.name} value={RANDOM.full} id={RANDOM.name}>
          Random
        </option>
        {soundOptions.map((option) => (
          <option key={option.name} value={option.full} id={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <PlayButton />
    </div>
  );
};

export default SoundSelector;
