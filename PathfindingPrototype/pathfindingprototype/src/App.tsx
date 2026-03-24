import React, { useState } from "react";
import { graph } from "./data/graph";
import { Node } from "./types";
import { findPath } from "./services/pathfinding";
import { FloorSelector } from "./FloorSelector";
import { MapView } from "./MapView";
import { RouteOverlay } from "./RouteOverlay";

const floors = [0, 1];

export const App: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [path, setPath] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleSelectRoom = () => {
    const newPath = findPath("entrance", selectedRoom, graph);
    setPath(newPath);
    const floor =
      (graph.nodes.find((n) => n.id === newPath[0]) as Node)?.floor ?? 0;
    setCurrentFloor(floor);
  };

  return (
    <div>
      <FloorSelector
        floors={floors}
        currentFloor={currentFloor}
        setFloor={setCurrentFloor}
      />
      <MapView
        nodes={graph.nodes}
        edges={graph.edges}
        currentFloor={currentFloor}
        path={path}
      />
      <RouteOverlay
        path={path}
        nodes={graph.nodes}
        currentFloor={currentFloor}
      />
      <label htmlFor="room-input">Enter Room ID:</label>
      <input
        type="text"
        id="room-input"
        onChange={(e) => setSelectedRoom(e.target.value)}
      />
      <button onClick={handleSelectRoom}>Go to Room</button>
    </div>
  );
};
