import { useEffect, useState } from "react";
import { getGraph3dv2 } from "../../data/graph3dv3";
import { findPathAStar } from "../../services/pathfinding";
import "./3DPathFindingV4.css";
import { FloorSelector } from "../../Components/FloorSelector/FloorSelector";
import { Graph, Node } from "../../Types/types";
import { MapView3dV4 } from "../../Components/MapViewer3DV4/MapView3dv4";

const floors = [1, 2, 3];

export const PathFinding3DV4: React.FC = () => {
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
    const result = findPathAStar("hall_WN_1_1", roomId, graph);
    setPath(result);
    const floor = (graph.nodes.find((n) => n.id === result[0]) as Node)?.floor ?? floors[0];
    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const [currentFloor, setCurrentFloor] = useState<number>(floors[0]);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  return (
    graph && (
      <div className="PathFinding3DV2">
        <h1>3D Pathfinding Prototype V4</h1>
        <h2>Current Floor: {currentFloor} {selectedRoom && `(Rout send to: ${selectedRoom})`}</h2>
        <FloorSelector floors={floors} currentFloor={currentFloor} setFloor={setCurrentFloor} />
        <MapView3dV4 nodes={graph.nodes} currentFloor={currentFloor} path={path} handleRoomClick={handleRoomClick} />
      </div>
    )
  );
};
