import { useEffect, useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import type { PathfindingSettings } from "../../Types/types";
import { defaultStartNodes, floors } from "../../utils/Globals";
import { findPathAStarMultiStart } from "../../services/pathfinding";
import type { GraphDto, GraphNodeDto, HeatpointArea } from "../../api/data-contracts";
import { getGraph } from "../../api/methods/Graph.api";
import { useParams } from "react-router-dom";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";

export const Pathfinding: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>(defaultStartNodes);
  const [destinationNode, setDestinationNode] = useState<string | undefined>(undefined);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);
  const [graph, setGraph] = useState<GraphDto>({ nodes: [], edges: [] });
  let { x } = useParams<{ x: string }>();
  let { y } = useParams<{ y: string }>();
  let { floor } = useParams<{ floor: string }>();
  const startingPosition = x && y ? { x: parseInt(x), y: parseInt(y) } : { x: 400, y: 700 };
  const [gpsCoordinates, setGpsCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [altitude, setAltitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    setCurrentFloor(floor ? parseInt(floor) : 3);
  }, [x, y, floor]);

  const nodeAvailable = (nodeId: string) => {
    return roomOptions?.some((node) => node === nodeId);
  };

  const points: {
    x: number;
    y: number;
    latitude: number;
    longitude: number;
  }[] = [
      {
        x: 251.53619384765625,
        y: 1224.0107421875,
        latitude: 51.91715719790956,
        longitude: 4.483883238035342,
      },
      {
        x: 18.018529891967773,
        y: 199.71731567382812,
        latitude: 51.91752948335425,
        longitude: 4.483673268444348,
      },
      {
        x: 532.81884765625,
        y: 112.14818572998047,
        latitude: 51.91759879937042,
        longitude: 4.483997858981437,
      },
      {
        x: 673.4601440429688,
        y: 738.4000854492188,
        latitude: 51.91735398999769,
        longitude: 4.484133105081396,
      },
      {
        x: 2289.508544921875,
        y: 523.4577026367188,
        latitude: 51.91749814898966,
        longitude: 4.484866138799322,
      },
      {
        x: 2374.424072265625,
        y: 902.9238891601562,
        latitude: 51.91736715461671,
        longitude: 4.484931395104481,
      },
    ];

  const [userPosition, setUserPosition] = useState<{ x: number; y: number } | null>({ x: 400, y: 700 });

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
      const res = await getGraph(
        { Floor: currentFloor },
        {
          toastSuccess: {
            message: `Graph for floor ${currentFloor} loaded successfully!`,
          },
        },
      );
      if (res.ok) {
        let graphData = res.response;
        setGraph(graphData);
        if (startingPosition && graphData.nodes != null && graphData.nodes.length > 0) {
          const closestNode = graphData.nodes
            .filter((node) => node.x != null && node.y != null && !node.id?.includes("_door"))
            .reduce((best, node) => {
              const bestDistance = Math.hypot((best.x ?? 0) - startingPosition.x, (best.y ?? 0) - startingPosition.y);
              const currentDistance = Math.hypot(
                (node.x ?? 0) - startingPosition.x,
                (node.y ?? 0) - startingPosition.y,
              );
              return currentDistance < bestDistance ? node : best;
            });

          if (closestNode?.id) {
            setStartNodes([closestNode.id]);
          }
        }
      }
    };
    fetchGraph();
  }, [currentFloor]);

  const handleStartClick = (roomId: string) => {
    const updatedStartNodes = [roomId];
    setStartNodes(updatedStartNodes);
    var node = graph.nodes?.find((n) => n.id === roomId || n.id === roomId + "_door") as GraphNodeDto;
    if (node) setUserPosition({ x: node.x ?? 0, y: node.y ?? 0 });
    var settings = { accessibleRoute: isAccessibleRoute };
    if (destinationNode) {
      var result = findPathAStarMultiStart(
        updatedStartNodes.concat(updatedStartNodes.map((n) => n + "_door")),
        [destinationNode, destinationNode + "_door"],
        graph,
        settings,
      );
      setPath(result);

      const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floors[0].floorNumber;

      setCurrentFloor(floor);
      setSelectedRoom(destinationNode);
    }
  };

  const handleDestinationClick = (roomId: string) => {
    setDestinationNode(roomId);
    var result = findPathAStarMultiStart(
      startNodes.concat(startNodes.map((n) => n + "_door")),
      [roomId, roomId + "_door"],
      graph,
      {
        accessibleRoute: isAccessibleRoute,
      },
    );
    setPath(result);

    const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floors[0].floorNumber;

    setCurrentFloor(floor);
    setSelectedRoom(roomId);
  };

  const roomOptions = graph.nodes
    ?.filter((node) => node.id?.includes("_door"))
    .map((node) => node.roomId)
    .filter((roomId): roomId is string => roomId !== undefined);

  useEffect(() => {
    setUserPosition(startingPosition);
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
      .withUrl("https://localhost:59957/hubs/heatmaphub", {
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
              floors={floors.map((f) => f.floorNumber)}
              currentFloor={currentFloor}
              setFloor={setCurrentFloor}
            />
          </div>

          {/* <div className="pathfinding-control-group">
            <label className="pathfinding-checkbox">
              <input type="checkbox" checked={isAccessibleRoute} onChange={(e) => handleSettingChange({ accessibleRoute: e.target.checked })} />
              <span>Route for disabled persons</span>
            </label>
          </div> */}

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
            floors={floors}
            currentPosition={{
              x: userPosition?.x ?? 0,
              y: userPosition?.y ?? 0,
              altitude: altitude ?? undefined,
              accuracy: accuracy ?? undefined,
              latitude: gpsCoordinates?.latitude ?? undefined,
              longitude: gpsCoordinates?.longitude ?? undefined,
            }}
            areas={areas}
          />
        </section>
      </div>
    </div>
  );
};
