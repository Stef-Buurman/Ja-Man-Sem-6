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
    <div className="floor-card">
      <div className="floor-title">Etage</div>

      <button className="floor-button floor-button-up" onClick={goUp} disabled={currentIndex === floors.length - 1}>
        ▲
      </button>

      <div className="floor-number">{currentFloor}</div>

      <button className="floor-button floor-button-down" onClick={goDown} disabled={currentIndex === 0}>
        ▼
      </button>
    </div>
  );
};
