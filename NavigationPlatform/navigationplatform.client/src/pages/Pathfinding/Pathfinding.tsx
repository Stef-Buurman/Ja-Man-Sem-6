import { useEffect, useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import type { PathfindingSettings } from "../../Types/types";
import { defaultStartNodes } from "../../utils/Globals";
import { findPathAStarMultiStart } from "../../services/pathfinding";
import type { FloorDto, GraphDto, GraphNodeDto, HeatpointArea } from "../../api/data-contracts";
import { getWholeGraph } from "../../api/methods/Graph.api";
import { useParams } from "react-router-dom";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";
import { FloorCache } from "../../utils/CachedMethods";
import Toggle from "../../components/toggle/toggle";
import { GetNodeTypeFromInteger, GetTypeFromNodeType } from "../../utils/NodeTypeFromType";

export const Pathfinding: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>(defaultStartNodes);
  const [destinationNode, setDestinationNode] = useState<string | undefined>(undefined);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);
  const [graph, setGraph] = useState<GraphDto>({ nodes: [], edges: [] });
  let { x } = useParams<{ x: string }>();
  let { y } = useParams<{ y: string }>();
  let { floor } = useParams<{ floor: string }>();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [floorsList, setFloorsList] = useState<FloorDto[]>([]);

  const fetchFloors = async () => {
    try {
      const res = await FloorCache();
      if (res.ok) {
        setFloorsList(res.response);
      }
    } catch (error) {
      console.error("Failed to fetch floors:", error);
    }
  };

  useEffect(() => {
    setCurrentFloor(floor ? parseInt(floor) : 0);
    x && y ? setUserPosition({ x: parseInt(x), y: parseInt(y), floor: floor ? parseInt(floor) : 0 }) : null;
  }, [x, y, floor]);

  const nodeAvailable = (nodeId: string) => {
    return roomOptions?.some((node) => node === nodeId);
  };

  const [userPosition, setUserPosition] = useState<{ x: number; y: number; floor: number } | null>(null);

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

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await getWholeGraph({
        toastSuccess: {
          message: `Graph for floor ${currentFloor} loaded successfully!`,
        },
      });
      if (res.ok) {
        let graphData = res.response;
        setGraph(graphData);
        if (userPosition && graphData.nodes != null && graphData.nodes.length > 0) {
          const closestNode = graphData.nodes
            .filter((node) => node.x != null && node.y != null && !node.id?.includes("_door"))
            .reduce((best, node) => {
              const bestDistance = Math.hypot((best.x ?? 0) - userPosition.x, (best.y ?? 0) - userPosition.y);
              const currentDistance = Math.hypot((node.x ?? 0) - userPosition.x, (node.y ?? 0) - userPosition.y);
              const isSameFloor = node.floor === userPosition.floor;
              if (!isSameFloor) return best;
              return currentDistance < bestDistance ? node : best;
            });

          if (closestNode?.id) {
            setStartNodes([closestNode.id]);
          }
        } else {
          var entranceNodes = graphData.nodes?.filter((n) => n.type === GetTypeFromNodeType("entrance"));
          console.log("Entrance nodes:", entranceNodes);
          if (entranceNodes && entranceNodes.length > 0) {
            setStartNodes(entranceNodes.map((n) => n.id ?? "").filter((id) => id !== "").slice(0, 1));
          }
        }
      }
    };
    fetchGraph();
  }, [currentFloor]);

  const handleStartClick = async (roomId: string) => {
    const updatedStartNodes = [roomId];
    setStartNodes(updatedStartNodes);

    var node = graph.nodes?.find((n) => n.id === roomId || n.id === roomId + "_door") as GraphNodeDto;
    if (node) setUserPosition({ x: node.x ?? 0, y: node.y ?? 0, floor: node.floor ?? 0 });
    var settings = { accessibleRoute: isAccessibleRoute };
    if (destinationNode) {
      var result = findPathAStarMultiStart(
        updatedStartNodes.concat(updatedStartNodes.map((n) => n + "_door")),
        [destinationNode, destinationNode + "_door"],
        graph,
        settings,
      );
      setPath(result);

      const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0].number;

      setCurrentFloor(floor);
      setUserPosition({ x: node.x ?? 0, y: node.y ?? 0, floor: node.floor ?? 0 });
      setSelectedRoom(destinationNode);
    }
  };

  const handleDestinationClick = async (roomId: string) => {
    console.log("Destination clicked:", roomId);
    setDestinationNode(roomId);

    console.log(startNodes);
    var result = findPathAStarMultiStart(
      startNodes.concat(startNodes.map((n) => n + "_door")),
      [roomId, roomId + "_door"],
      graph,
      {
        accessibleRoute: isAccessibleRoute,
      },
    );
    setPath(result);
    console.log("Pathfinding result:", result);

    const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0].number;

    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const roomOptions = graph.nodes
    ?.filter((node) => node.id?.includes("_door"))
    .map((node) => node.roomId)
    .filter((roomId): roomId is string => roomId !== undefined && roomId !== null)
    .concat(
      graph.nodes
        ?.filter((node) => GetNodeTypeFromInteger(node.type) === "entrance")
        .map((node) => node.id)
        .filter((id): id is string => id !== undefined && id !== null),
    );

  useEffect(() => {
    fetchFloors();
    fetchHeatmapAreas();
  }, []);

  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    console.log("Fetched heatmap areas:", res);
    if (res.ok) setAreas(res.response);
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/hubs/heatmaphub", {
        transport: signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    connection.onclose((err) => {
      console.log("SignalR closed", err);
    });

    connection.onreconnecting((err) => {
      console.log("SignalR reconnecting", err);
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
    });

    connection.on("ReceiveAreaUpdate", () => {
      fetchHeatmapAreas();
    });

    const start = async () => {
      try {
        await connection.start();
      } catch (err) {
        console.error("SignalR start failed:", err);
      }
    };

    void start();

    return () => {
      console.log("Stopping SignalR...");
      connection.off("ReceiveAreaUpdate");
      void connection.stop();
    };
  }, []);

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
            <FloorSelector
              floors={floorsList.map((f) => f.number)}
              currentFloor={currentFloor}
              setFloor={setCurrentFloor}
            />
          </div>

          <div className="pathfinding-control-group">
            <Toggle
              title="Route for disabled persons"
              handleCheckboxChange={(checked) => handleSettingChange({ accessibleRoute: checked })}
              currentValue={isAccessibleRoute}
            />
            <Toggle
              title="Show heatmap"
              handleCheckboxChange={(checked) => setShowHeatmap(checked)}
              currentValue={showHeatmap}
            />
            <Toggle
              title="Show routes"
              handleCheckboxChange={(checked) => setShowRoutes(checked)}
              currentValue={showRoutes}
            />
          </div>

          {roomOptions && (
            <>
              <div className="pathfinding-search">
                <SearchSelect
                  title="Enter start room"
                  data={roomOptions}
                  onSelect={handleStartClick}
                  value={nodeAvailable(startNodes[0]) ? startNodes[0].replace("_door", "") : undefined}
                />
              </div>
              <div className="pathfinding-search">
                <SearchSelect
                  title="Enter destination room"
                  data={roomOptions}
                  onSelect={handleDestinationClick}
                  value={
                    destinationNode && nodeAvailable(destinationNode)
                      ? destinationNode?.replace("_door", "")
                      : undefined
                  }
                />
              </div>
            </>
          )}
        </section>

        <section className="pathfinding-map-card">
          <PathfindingMap
            nodes={graph.nodes ?? []}
            edges={graph.edges ?? []}
            currentFloor={currentFloor}
            path={path}
            handleRoomClick={handleDestinationClick}
            floors={floorsList}
            currentPosition={
              userPosition
                ? {
                    x: userPosition.x,
                    y: userPosition.y,
                    floor: userPosition.floor,
                  }
                : undefined
            }
            areas={areas}
            showHeatmap={showHeatmap}
            showRoutes={showRoutes}
          />
        </section>
      </div>
    </div>
  );
};
