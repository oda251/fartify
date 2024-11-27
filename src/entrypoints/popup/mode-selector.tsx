import AppApi from "@/repositories/message-api";
import { FartModes } from "@/types/fart-mode";
import type FartMode from "@/types/fart-mode";

const ModeSelector: React.FC = () => {
  // define states
  const [selectedMode, setSelectedMode] = useState<FartMode>(FartModes.NATURAL);
  // initialize states
  useEffect(() => {
    const update = async () => {
      const mode = await AppApi.fartMode.get();
      setSelectedMode(mode);
    };
    update();
  }, []);
  // define event handlers
  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    await AppApi.fartMode.set(newValue);
    setSelectedMode(newValue as FartMode);
  };
  return (
    <select
      value={selectedMode}
      onChange={handleChange}
      className="mode-selector"
    >
      {Object.values(FartModes).map((mode) => (
        <option key={mode} id={mode} value={mode}>
          {mode}
        </option>
      ))}
    </select>
  );
};

export default ModeSelector;
