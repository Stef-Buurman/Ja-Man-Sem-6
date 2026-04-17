import { useState } from "react";
import { findPathAStarMultiStart } from "../../../services/pathfinding";
import "./3DPathFindingV4.css";
import Verdieping3 from "../../../assets/Verdieping3_2.svg?react";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import { MapView3dV4 } from "../../../components/PathFinding/MapViewer3DV4/MapView3dv4";
import { graph3d2v4 } from "../../../components/data/graph3dv4";
import type { Floor, GraphNode } from "../../../Types/types";
import SearchSelect from "../../../components/SearchSelect/SearchSelect";

export const PathFinding3DV4: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);

  const [floors] = useState<Floor[]>([
    {
      svg: Verdieping3,
      floorNumber: 3,
    },
  ]);

  const startNodes = ["H.3.Trap1_door", "H.3.Trap2_door", "WN.03.Trap1_door", "WD.03.Trap1_door"];

  const graph = graph3d2v4;

  const handleRoomClick = (roomId: string) => {
    const result = findPathAStarMultiStart(startNodes, roomId, graph);
    setPath(result);

    const floor = (graph.nodes.find((n) => n.id === result[0]) as GraphNode)?.floor ?? floors[0].floorNumber;

    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const roomOptions = graph.nodes
    .filter((node) => node.id.includes("_door"))
    .map((node) => node.roomId)
    .filter((roomId): roomId is string => roomId !== undefined);

  return (
    <div className="pathfinding-page">
      <div className="pathfinding-shell">
        <header className="pathfinding-header">
          <h1 className="pathfinding-title">3D Pathfinding Prototype V4</h1>
          <h2 className="pathfinding-subtitle">
            Current Floor: {currentFloor}
            {selectedRoom && ` (Route sent to: ${selectedRoom})`}
          </h2>
        </header>

        <section className="pathfinding-controls">
          <div className="pathfinding-control-group">
            <FloorSelector floors={floors.map((f) => f.floorNumber)} currentFloor={currentFloor} setFloor={setCurrentFloor} />
          </div>

          <div className="pathfinding-search">
            <SearchSelect title="Search for a classroom" data={roomOptions} onSelect={(value) => handleRoomClick(value)} />
          </div>
        </section>

        <section className="pathfinding-map-card">
          <MapView3dV4
            nodes={graph.nodes}
            edges={graph.edges}
            currentFloor={currentFloor}
            path={path}
            handleRoomClick={handleRoomClick}
            floors={floors}
          />
        </section>
      </div>
    </div>
  );
};
