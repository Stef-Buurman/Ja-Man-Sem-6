import "./2DPathFindingV1.css";
import { useState } from "react";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import { MapView } from "../../../components/PathFinding/MapViewer/MapView";
import { graph } from "../../../components/data/graph";
import { findPath } from "../../../services/pathfinding";
import type { GraphNode } from "../../../Types/types";

const floors = [1];

export const PathFinding2DV1: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [path, setPath] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleSelectRoom = () => {
    const newPath = findPath("entrance", selectedRoom, graph);
    setPath(newPath);
    const floor = (graph.nodes.find((n) => n.id === newPath[0]) as GraphNode)?.floor ?? 0;
    setCurrentFloor(floor);
  };

  return (
    <>
      <FloorSelector floors={floors} currentFloor={currentFloor} setFloor={setCurrentFloor} />
      <MapView nodes={graph.nodes} edges={graph.edges} currentFloor={currentFloor} path={path} />
      <label htmlFor="room-input">Enter Room ID:</label>
      <input type="text" id="room-input" onChange={(e) => setSelectedRoom(e.target.value)} />
      <button onClick={handleSelectRoom}>Go to Room</button>
    </>
  );
};
