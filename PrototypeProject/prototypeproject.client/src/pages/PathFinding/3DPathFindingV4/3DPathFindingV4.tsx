import { useState } from "react";
import { findPathAStarMultiStart } from "../../../services/pathfinding";
import "./3DPathFindingV4.css";
import Verdieping3 from "../../../assets/Verdieping3_2.svg?react";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import { MapView3dV4 } from "../../../components/PathFinding/MapViewer3DV4/MapView3dv4";
import { graph3d2v4 } from "../../../components/data/graph3dv4";
import type { Floor, GraphNode } from "../../../Types/types";

export const PathFinding3DV4: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [floors] = useState<Floor[]>([
    {
      svg: Verdieping3,
      floorNumber: 3,
    },
  ]);

  const handleRoomClick = (roomId: string) => {
    const result = findPathAStarMultiStart(["H.3.Trap1_door"], roomId, graph3d2v4);
    setPath(result);
    const floor = (graph3d2v4.nodes.find((n) => n.id === result[0]) as GraphNode)?.floor ?? floors[0].floorNumber;
    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  return (
    <div className="PathFinding3DV2">
      <h1>3D Pathfinding Prototype V4</h1>
      <h2>
        Current Floor: {currentFloor} {selectedRoom && `(Rout send to: ${selectedRoom})`}
      </h2>
      <FloorSelector floors={floors.map((f) => f.floorNumber)} currentFloor={currentFloor} setFloor={setCurrentFloor} />
      <MapView3dV4
        nodes={graph3d2v4.nodes}
        edges={graph3d2v4.edges}
        currentFloor={currentFloor}
        path={path}
        handleRoomClick={handleRoomClick}
        floors={floors}
      />
    </div>
  );
};
