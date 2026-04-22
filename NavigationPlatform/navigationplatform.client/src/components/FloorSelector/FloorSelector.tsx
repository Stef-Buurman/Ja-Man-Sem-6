import React from "react";
import "./FloorSelector.css";

interface FloorSelectorProps {
  floors: number[];
  currentFloor: number;
  setFloor: (floor: number) => void;
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({ floors, currentFloor, setFloor }) => (
  <select className="pathfinding-floor-select" value={currentFloor} onChange={(e) => setFloor(Number(e.target.value))}>
    {floors.map((floor) => (
      <option key={floor} value={floor}>
        Floor {floor}
      </option>
    ))}
  </select>
);
