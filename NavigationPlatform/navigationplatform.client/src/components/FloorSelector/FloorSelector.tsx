import downArrow from "../../assets/icons/DownArrow.svg";
import "./FloorSelector.css";

interface FloorSelectorProps {
  floors: number[];
  currentFloor: number;
  setFloor: (floor: number) => void;
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, currentFloor, setFloor }) => {
  const currentIndex = floors.indexOf(currentFloor);

  const goUp = () => {
    if (currentIndex < floors.length - 1) {
      setFloor(floors[currentIndex + 1]);
    }
  };

  const goDown = () => {
    if (currentIndex > 0) {
      setFloor(floors[currentIndex - 1]);
    }
  };

  return (
    <div className="full-floor-card">
      <div className="floor-title">Etage</div>
      <div className="floor-card">

        <button className="bg-black mb-2 border-0 p-0 m-0 cursor-pointer transition-all duration-150 ease-in-out floor-button-up" onClick={goUp} disabled={currentIndex === floors.length - 1}>
          <img
            className="floor-arrow"
            src={downArrow}
            alt="Up"
            style={{ transform: "rotate(180deg)" }}
          />
        </button>

        <span className="text-[60px] font-bold text-white my-[5px]">{currentFloor}</span>

        <button className="bg-black mt-2 border-0 p-0 m-0 cursor-pointer transition-all duration-150 ease-in-outfloor-button-down" onClick={goDown} disabled={currentIndex === 0}>
          <img
            className="floor-arrow"
            src={downArrow}
            alt="Down"
          />
        </button>
      </div>
    </div>
  );
};
