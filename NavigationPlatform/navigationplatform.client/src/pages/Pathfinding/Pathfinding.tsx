import { useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import { Verdieping3Graph } from "../../data/Verdieping3";
import type { PathfindingSettings, GraphNode } from "../../Types/types";
import { defaultStartNodes, floors } from "../../utils/Globals";
import { findPathAStarMultiStart } from "../../services/pathfinding";

export const Pathfinding: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>(defaultStartNodes);
  const [destinationNode, setDestinationNode] = useState<string | undefined>(undefined);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);

  const handleSettingChange = (settings: PathfindingSettings) => {
    if (settings.accessibleRoute !== isAccessibleRoute) {
      setIsAccessibleRoute(settings.accessibleRoute);
      if (destinationNode) {
        var result = findPathAStarMultiStart(
          startNodes.concat(startNodes.map((n) => n + "_door")),
          [destinationNode, destinationNode + "_door"],
          graph,
          { accessibleRoute: settings.accessibleRoute },
        );
        setPath(result);
      }
    }
  };

  const graph = Verdieping3Graph;

  const handleStartClick = (roomId: string) => {
    const updatedStartNodes = [roomId];
    setStartNodes(updatedStartNodes);
    var settings = { accessibleRoute: isAccessibleRoute };
    if (destinationNode) {
      var result = findPathAStarMultiStart(
        updatedStartNodes.concat(updatedStartNodes.map((n) => n + "_door")),
        [destinationNode, destinationNode + "_door"],
        graph,
        settings,
      );
      setPath(result);

      const floor = (graph.nodes.find((n) => n.id === result[0]) as GraphNode)?.floor ?? floors[0].floorNumber;

      setCurrentFloor(floor);
      setSelectedRoom(destinationNode);
    }
  };

  const handleDestinationClick = (roomId: string) => {
    setDestinationNode(roomId);
    var result = findPathAStarMultiStart(startNodes.concat(startNodes.map((n) => n + "_door")), [roomId, roomId + "_door"], graph, {
      accessibleRoute: isAccessibleRoute,
    });
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

          {/* <div className="pathfinding-control-group">
            <label className="pathfinding-checkbox">
              <input type="checkbox" checked={isAccessibleRoute} onChange={(e) => handleSettingChange({ accessibleRoute: e.target.checked })} />
              <span>Route for disabled persons</span>
            </label>
          </div> */}

          <div className="pathfinding-search">
            <SearchSelect title="Enter start room" data={roomOptions} onSelect={handleStartClick} value={defaultStartNodes[0].replace("_door", "")} />
          </div>
          <div className="pathfinding-search">
            <SearchSelect
              title="Enter destination room"
              data={roomOptions}
              onSelect={handleDestinationClick}
              value={destinationNode?.replace("_door", "")}
            />
          </div>
        </section>

        <section className="pathfinding-map-card">
          <PathfindingMap
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
