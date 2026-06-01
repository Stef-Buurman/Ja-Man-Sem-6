import downArrow from "../../assets/icons/DownArrow.svg";
import "./FloorSelector.css";

interface FloorSelectorProps {
  floors: number[];
  currentFloor: number;
  setFloor: (floor: number) => void;
  disabled?: boolean;
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, currentFloor, setFloor, disabled }) => {
  const currentIndex = floors.indexOf(currentFloor);

  const goUp = () => {
    if (currentIndex < floors.length - 1 && !disabled) {
      setFloor(floors[currentIndex + 1]);
    }
  };

  const goDown = () => {
    if (currentIndex > 0 && !disabled) {
      setFloor(floors[currentIndex - 1]);
    }
  };

  return (
    <div className="full-floor-card">
      <div className="floor-title">Etage</div>
      <div className="floor-card">
        <button
          className="bg-black border-0 p-0 m-0 cursor-pointer transition-all duration-150 ease-in-out floor-button-up disabled:opacity-0 cursor-default"
          onClick={goUp}
          disabled={currentIndex === floors.length - 1 || disabled}
        >
          <img className="floor-arrow" src={downArrow} alt="Up" style={{ transform: "rotate(180deg)" }} />
        </button>

        <span className="text-[60px] leading-none font-bold text-white">{currentFloor}</span>

        <button
          className="bg-black border-0 p-0 m-0 cursor-pointer transition-all duration-150 ease-in-out floor-button-down disabled:opacity-0 cursor-default"
          onClick={goDown}
          disabled={currentIndex === 0 || disabled}
        >
          <img className="floor-arrow" src={downArrow} alt="Down" />
        </button>
      </div>
    </div>
  );
};
