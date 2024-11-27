import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import fart from "@/utils/fart-effect";

const PlayButton: React.FC = () => {
  // define event handlers
  const handlePlay = async (e: React.MouseEvent) => {
    fart(e, 1);
  };
  // render
  return (
    <FontAwesomeIcon
      onClick={handlePlay}
      className="play-icon"
      icon={faPlayCircle}
    />
  );
};

export default PlayButton;
