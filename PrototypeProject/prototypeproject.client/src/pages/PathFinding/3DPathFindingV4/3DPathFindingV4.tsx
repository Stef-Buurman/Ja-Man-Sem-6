import { useState } from "react";
import { findPathAStarMultiStart } from "../../../services/pathfinding";
import "./3DPathFindingV4.css";
import Verdieping3 from "../../../assets/Verdieping3_2.svg?react";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import { MapView3dV4 } from "../../../components/PathFinding/MapViewer3DV4/MapView3dv4";
import { graph3d2v4 } from "../../../components/data/graph3dv4";
import type { Floor, GraphNode } from "../../../Types/types";
import SearchSelect from "../../../components/SearchSelect/SearchSelect";

const defaultStartNodes = ["H.3.Trap1_door"]; //, "H.3.Trap2_door", "WN.03.Trap1_door", "WD.03.Trap1_door"

export const PathFinding3DV4: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>(defaultStartNodes);
  const [destinationNode, setDestinationNode] = useState<string | undefined>(undefined);

  const [floors] = useState<Floor[]>([
    {
      svg: Verdieping3,
      floorNumber: 3,
    },
  ]);

  const graph = graph3d2v4;

  const handleStartClick = (roomId: string) => {
    const updatedStartNodes = [roomId];
    setStartNodes(updatedStartNodes);

    if (destinationNode) {
      var result = findPathAStarMultiStart(updatedStartNodes, destinationNode, graph);
      if (result.length === 0) {
        result = findPathAStarMultiStart(updatedStartNodes.map((n) => n + "_door"), destinationNode, graph);
        if (result.length === 0) {
          result = findPathAStarMultiStart(updatedStartNodes.map((n) => n + "_door"), destinationNode + "_door", graph);
          if (result.length === 0) {
            result = findPathAStarMultiStart(updatedStartNodes, destinationNode + "_door", graph);
          }
        }
      }
      setPath(result);

      const floor = (graph.nodes.find((n) => n.id === result[0]) as GraphNode)?.floor ?? floors[0].floorNumber;

      setCurrentFloor(floor);
      setSelectedRoom(destinationNode);
    }
  };

  const handleDestinationClick = (roomId: string) => {
    setDestinationNode(roomId);
    var result = findPathAStarMultiStart(startNodes, roomId, graph);
    if (result.length === 0) {
      result = findPathAStarMultiStart(startNodes.map((n) => n + "_door"), roomId, graph);
    }
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
            <SearchSelect title="Enter start room" data={roomOptions} onSelect={handleStartClick} />
          </div>
          <div className="pathfinding-search">
            <SearchSelect title="Enter destination room" data={roomOptions} onSelect={handleDestinationClick} value={destinationNode} />
          </div>
        </section>

        <section className="pathfinding-map-card">
          <MapView3dV4
            nodes={graph.nodes}
            edges={graph.edges}
            currentFloor={currentFloor}
            path={path}
            handleRoomClick={handleDestinationClick}
            floors={floors}
          />
        </section>
      </div>
    </div>
  );
};
