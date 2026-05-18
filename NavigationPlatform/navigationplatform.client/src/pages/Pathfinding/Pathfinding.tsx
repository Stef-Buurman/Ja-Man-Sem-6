import { useEffect, useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import type { PathfindingSettings } from "../../Types/types";
import { findPathAStarMultiStart } from "../../services/pathfinding";
import { type FloorDto, type GraphDto, type GraphNodeDto, type HeatpointArea } from "../../api/data-contracts";
import { getWholeGraph } from "../../api/methods/Graph.api";
import { useParams } from "react-router-dom";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";
import { FloorCache } from "../../utils/CachedMethods";
import Toggle from "../../components/toggle/toggle";
import { GetNodeTypeFromInteger, GetTypeFromNodeType } from "../../utils/NodeTypeFromType";
import { EmergencyNodeName, ToiletNodeName, UserLocationName } from "../../utils/Globals";

export const Pathfinding: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>([]);
  const [destinationNode, setDestinationNode] = useState<string | undefined>(undefined);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);
  const [graph, setGraph] = useState<GraphDto>({ nodes: [], edges: [] });
  let { x } = useParams<{ x: string }>();
  let { y } = useParams<{ y: string }>();
  let { floor } = useParams<{ floor: string }>();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showRoutes, setShowRoutes] = useState(true);
  const [floorsList, setFloorsList] = useState<FloorDto[]>([]);
  const [screen, setScreen] = useState<"settings" | "map">("settings");
  const userLocationProvided = x !== undefined && y !== undefined && floor !== undefined;

  const fetchFloors = async () => {
    const res = await FloorCache();
    if (res.ok) {
      setFloorsList(res.response);
    }
  };

  useEffect(() => {
    setCurrentFloor(floor ? parseInt(floor) : 0);
    if (userLocationProvided) {
      setUserPosition({ x: parseInt(x), y: parseInt(y), floor: parseInt(floor) });
      setStartNodes([UserLocationName]);
    }
  }, [x, y, floor]);

  const nodeAvailable = (nodeId: string) => {
    return roomOptions?.some((node) => node === nodeId);
  };

  const [userPosition, setUserPosition] = useState<{ x: number; y: number; floor: number } | null>(null);

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
          if (!userLocationProvided) return;
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
          if (entranceNodes && entranceNodes.length > 0 && !userLocationProvided) {
            setStartNodes(
              entranceNodes
                .map((n) => n.id ?? "")
                .filter((id) => id !== "")
                .slice(0, 1),
            );
          }
        }
      }
    };
    fetchGraph();
  }, [currentFloor]);

  const handleSettingChange = (settings: PathfindingSettings) => {
    setIsAccessibleRoute(settings.accessibleRoute);
  };

  const handleStartClick = (roomId: string) => {
    const updatedStartNodes = [roomId];
    setStartNodes(updatedStartNodes);

    const node = graph.nodes?.find((n) => n.id === roomId || n.id === roomId + "_door") as GraphNodeDto;

    if (node) {
      setUserPosition({
        x: node.x ?? 0,
        y: node.y ?? 0,
        floor: node.floor ?? 0,
      });
    }
  };

  const handleDestinationClick = (roomId: string) => {
    setDestinationNode(roomId);
  };

  const roomOptions = graph.nodes
    ?.filter((node) => node.id?.includes("_door") && !node.id?.toLocaleLowerCase().includes("nooduitgang"))
    .map((node) => node.roomId)
    .filter((roomId): roomId is string => roomId !== undefined && roomId !== null)
    .concat(
      graph.nodes
        ?.filter((node) => GetNodeTypeFromInteger(node.type) === "entrance")
        .map((node) => node.id)
        .filter((id): id is string => id !== undefined && id !== null),
    )
    .concat([EmergencyNodeName, ToiletNodeName]);

  useEffect(() => {
    fetchFloors();
    fetchHeatmapAreas();
  }, []);

  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    if (res.ok) setAreas(res.response);
  };

  const calculatePathAndGoToMap = (destinationOverride?: string) => {
    let destinationToUse = [destinationOverride ?? destinationNode ?? ""];

    if (!destinationToUse || destinationToUse.length === 0 || startNodes.length === 0 || !graph.nodes) return;

    let startNodesToUse = startNodes.concat(startNodes.map((n) => n + "_door"));
    let result: string[] = [];

    if (startNodesToUse[0] === UserLocationName && userPosition) {
      const closestNode = graph.nodes
        .filter((node) => node.x != null && node.y != null && !node.id?.includes("_door"))
        .reduce((best, node) => {
          const bestDistance = Math.hypot((best.x ?? 0) - userPosition.x, (best.y ?? 0) - userPosition.y);
          const currentDistance = Math.hypot((node.x ?? 0) - userPosition.x, (node.y ?? 0) - userPosition.y);
          const isSameFloor = node.floor === userPosition.floor;

          if (!isSameFloor) return best;
          return currentDistance < bestDistance ? node : best;
        });
      if (closestNode?.id) {
        startNodesToUse = [closestNode.id];
      }
    }
    if (destinationToUse[0] === ToiletNodeName || destinationToUse[0] === EmergencyNodeName) {
      let nodeName = destinationToUse[0];
      if (destinationToUse[0] === ToiletNodeName) {
        destinationToUse =
          graph.nodes
            ?.filter((n) => n.label === "Toilet")
            .map((n) => n.id)
            .filter((v): v is string => !!v) ?? destinationToUse;
      } else if (destinationToUse[0] === EmergencyNodeName) {
        destinationToUse =
          graph.nodes
            ?.filter(
              (n) => n.id?.toLocaleLowerCase().includes("nooduitgang") || n.type === GetTypeFromNodeType("entrance"),
            )
            .map((n) => n.id)
            .filter((v): v is string => !!v) ?? destinationToUse;
      }
      result = findPathAStarMultiStart(startNodesToUse, destinationToUse, graph, {
        accessibleRoute: isAccessibleRoute,
      });
      setPath(result);

      const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0]?.number ?? 0;

      setCurrentFloor(floor);
      setDestinationNode(nodeName);
      setSelectedRoom(nodeName);
      setScreen("map");
      return;
    }
    result = findPathAStarMultiStart(startNodesToUse, [...destinationToUse, destinationToUse[0] + "_door"], graph, {
      accessibleRoute: isAccessibleRoute,
    });
    setPath(result);

    const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0]?.number ?? 0;

    setCurrentFloor(floor);
    setDestinationNode(destinationToUse[0]);
    setSelectedRoom(destinationToUse[0]);
    setScreen("map");
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
          <h1 className="pathfinding-title">{screen === "settings" ? "Waar wil je heen?" : "Map"}</h1>

          {screen === "map" && (
            <h2 className="pathfinding-subtitle">
              Huidige verdieping: {currentFloor}
              {selectedRoom && ` (Route sent to: ${selectedRoom})`}
            </h2>
          )}
        </header>

        {screen === "settings" && (
          <section className="pathfinding-controls">
            <div className="pathfinding-control-group">
              <Toggle
                title="Route toegankelijk voor rolstoelgebruikers"
                handleCheckboxChange={(checked) => handleSettingChange({ accessibleRoute: checked })}
                currentValue={isAccessibleRoute}
              />
            </div>

            <div className="pathfinding-search-wrapper">
              {roomOptions && (
                <>
                  <div className="pathfinding-search">
                    <SearchSelect
                      title="Vul je startlocatie in"
                      data={roomOptions.concat(userLocationProvided ? [UserLocationName] : [])}
                      onSelect={handleStartClick}
                      value={
                        nodeAvailable(startNodes[0])
                          ? startNodes[0].replace("_door", "")
                          : userLocationProvided
                            ? UserLocationName
                            : undefined
                      }
                    />
                  </div>

                  <div className="pathfinding-search">
                    <SearchSelect
                      title="Vul je bestemming in"
                      data={roomOptions}
                      onSelect={handleDestinationClick}
                      value={
                        destinationNode && nodeAvailable(destinationNode)
                          ? destinationNode.replace("_door", "")
                          : undefined
                      }
                    />
                  </div>
                </>
              )}

              <button
                className="pathfinding-button"
                disabled={!destinationNode || startNodes.length === 0}
                onClick={() => calculatePathAndGoToMap()}
              >
                Naar de kaart
              </button>
            </div>
          </section>
        )}

        {screen === "map" && (
          <>
            <section className="pathfinding-map-toolbar">
              <div className="pathfinding-map-toolbar-left">
                <button
                  className="pathfinding-button"
                  onClick={() => {
                    setScreen("settings");
                  }}
                >
                  Terug naar instellingen
                </button>
              </div>

              <div className="pathfinding-map-toolbar-center">
                <Toggle
                  title="Heatmap tonen"
                  handleCheckboxChange={(checked) => setShowHeatmap(checked)}
                  currentValue={showHeatmap}
                />

                <Toggle
                  title="Routes tonen"
                  handleCheckboxChange={(checked) => setShowRoutes(checked)}
                  currentValue={showRoutes}
                />
              </div>

              <div className="pathfinding-map-toolbar-right">
                <FloorSelector
                  floors={floorsList.map((f) => f.number)}
                  currentFloor={currentFloor}
                  setFloor={setCurrentFloor}
                />
              </div>
            </section>

            <section className="pathfinding-map-card">
              <PathfindingMap
                nodes={graph.nodes ?? []}
                edges={graph.edges ?? []}
                currentFloor={currentFloor}
                path={path}
                handleRoomClick={(roomId) => {
                  handleDestinationClick(roomId);
                  calculatePathAndGoToMap(roomId);
                }}
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
          </>
        )}
      </div>
    </div>
  );
};
