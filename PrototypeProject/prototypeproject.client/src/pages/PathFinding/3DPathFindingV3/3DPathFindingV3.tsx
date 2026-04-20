import { useEffect, useState } from "react";
import { findPathAStar } from "../../../services/pathfinding";
import "./3DPathFindingV3.css";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import { MapView3dV3 } from "../../../components/PathFinding/MapViewer3DV3/MapView3dv3";
import type { Graph, GraphNode } from "../../../Types/types";
import { getGraph3dv2 } from "../../../components/data/graph3dv3";

const floors = [1, 2, 3];

export const PathFinding3DV3: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [graph, setGraph] = useState<Graph | undefined>(undefined);

  useEffect(() => {
    const gottenGraph: Graph = { nodes: [], edges: [] };
    floors.forEach((floor) => {
      const gr = getGraph3dv2(floor);
      gottenGraph.nodes.push(...gr.nodes);
      gottenGraph.edges.push(...gr.edges);
    });
    setGraph(gottenGraph);
  }, []);

  const handleRoomClick = (roomId: string) => {
    if (!graph) return;
    const result = findPathAStar("hall_WN_1_1", roomId, graph, { accessibleRoute: false });
    setPath(result);
    const floor = (graph.nodes.find((n) => n.id === result[0]) as GraphNode)?.floor ?? floors[0];
    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const [currentFloor, setCurrentFloor] = useState<number>(floors[0]);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  return (
    graph && (
      <div className="PathFinding3DV2">
        <h1>3D Pathfinding Prototype V2</h1>
        <h2>
          Current Floor: {currentFloor} {selectedRoom && `(Rout send to: ${selectedRoom})`}
        </h2>
        <FloorSelector floors={floors} currentFloor={currentFloor} setFloor={setCurrentFloor} />
        <MapView3dV3 nodes={graph.nodes} currentFloor={currentFloor} path={path} handleRoomClick={handleRoomClick} />
      </div>
    )
  );
};
