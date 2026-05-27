import { useEffect, useMemo, useRef, useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import type { PathfindingSettings } from "../../Types/types";
import { buildPathSteps, findPathAStarMultiStart } from "../../services/pathfinding";
import { type FloorDto, type GraphDto, type GraphNodeDto, type HeatpointArea } from "../../api/data-contracts";
import { getWholeGraph } from "../../api/methods/Graph.api";
import { useParams } from "react-router-dom";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";
import { FloorCache } from "../../utils/CachedMethods";
import Toggle from "../../components/toggle/toggle";
import { GetNodeTypeFromInteger, GetTypeFromNodeType } from "../../utils/NodeTypeFromType";
import { CustomDestinationName, EmergencyNodeName, ToiletNodeName, UserLocationName } from "../../utils/Globals";

export const Pathfinding: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [startNodes, setStartNodes] = useState<string[]>([]);
  const [destinationNodeId, setDestinationNodeId] = useState<string | undefined>(undefined);
  const [isAccessibleRoute, setIsAccessibleRoute] = useState(false);
  const [graph, setGraph] = useState<GraphDto>({ nodes: [], edges: [] });
  const { floor, x, y, destination, destFloor, destX, destY } = useParams();

  const [floorsList, setFloorsList] = useState<FloorDto[]>([]);
  const [screen, setScreen] = useState<"settings" | "map">("settings");
  const hasAutoCalculatedPath = useRef(false);

  const pathSteps = useMemo(() => buildPathSteps(path, graph), [path, graph]);
  const activeStep = pathSteps.find((step) => step.floor === currentFloor) ?? pathSteps[0];

  const startPoint =
    floor && x && y
      ? {
          floor,
          x: Number(x),
          y: Number(y),
        }
      : null;
  const userLocationProvided = startPoint !== null;

  const destinationPoint = destination
    ? { type: "name", value: destination }
    : destFloor && destX && destY
      ? {
          type: "coordinates",
          floor: destFloor,
          x: Number(destX),
          y: Number(destY),
        }
      : null;
  const destinationProvided = destinationPoint !== null;

  const fetchFloors = async () => {
    const res = await FloorCache();
    if (res.ok) {
      setFloorsList(res.response);
    }
  };

  useEffect(() => {
    const floorNumber = floor ? parseInt(floor) : 0;

    setCurrentFloor(floorNumber);

    if (userLocationProvided) {
      setUserPosition({
        x: startPoint.x,
        y: startPoint.y,
        floor: floorNumber,
      });
    }

    if (destination) {
      if (destination.toLocaleLowerCase() === ToiletNodeName.toLocaleLowerCase()) {
        setDestinationNodeId(ToiletNodeName);
      } else if (destination.toLocaleLowerCase() === EmergencyNodeName.toLocaleLowerCase()) {
        setDestinationNodeId(EmergencyNodeName);
      }
    }
  }, [x, y, floor, destination]);

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
          const closestNode = getClosestNode(graphData.nodes, userPosition);

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

  const getClosestNode = (nodes: GraphNodeDto[], position: { x: number; y: number; floor: number }) => {
    return nodes
      .filter(
        (node) => node.x != null && node.y != null && node.floor === position.floor && !node.id?.includes("_door"),
      )
      .reduce<GraphNodeDto | undefined>((best, node) => {
        if (!best) return node;

        const bestDistance = Math.hypot((best.x ?? 0) - position.x, (best.y ?? 0) - position.y);
        const currentDistance = Math.hypot((node.x ?? 0) - position.x, (node.y ?? 0) - position.y);

        return currentDistance < bestDistance ? node : best;
      }, undefined);
  };

  const resolveDestinationNodes = (override?: string): string[] => {
    if (!graph.nodes) return [];

    if (override) {
      return [override, override + "_door", override + "A", override + "B"];
    }

    if (destinationPoint?.type === "coordinates") {
      const closestDestinationNode = getClosestNode(graph.nodes, {
        floor: Number(destinationPoint.floor),
        x: Number(destinationPoint.x),
        y: Number(destinationPoint.y),
      });

      return closestDestinationNode?.id ? [closestDestinationNode.id] : [];
    }

    if (destinationPoint?.type === "name" && destinationPoint.value) {
      return [destinationPoint.value, destinationPoint.value + "_door"];
    }

    if (destinationNodeId) {
      return [destinationNodeId, destinationNodeId + "_door"];
    }

    return [];
  };

  const destinationNode = useMemo<GraphNodeDto | undefined>(() => {
    if (!graph.nodes || graph.nodes.length === 0) {
      return undefined;
    }

    const lastPathNodeId = path.at(-1);

    if (lastPathNodeId) {
      const pathDestinationNode = graph.nodes.find((node) => node.id === lastPathNodeId);

      if (pathDestinationNode) {
        return pathDestinationNode;
      }
    }

    // Fallback: use selected destination
    const destinationNodes = resolveDestinationNodes();

    return graph.nodes.find((node) => destinationNodes.includes(node.id ?? ""));
  }, [graph.nodes, path, destinationNodeId, destinationPoint]);

  useEffect(() => {
    if (hasAutoCalculatedPath.current) return;
    if (!destinationNodeId && !destinationPoint) return;
    if (!userLocationProvided) return;
    if (!graph.nodes || graph.nodes.length === 0) return;

    let newStartNodes = [];
    if (startNodes.length === 0 && !userPosition) return;
    else if (startNodes.length === 0 && userPosition) {
      const closestNode = getClosestNode(graph.nodes, userPosition);
      if (closestNode?.id) {
        newStartNodes.push(closestNode.id);
        setStartNodes(newStartNodes);
      } else {
        console.warn("No valid start node found for user position:", userPosition);
        return;
      }
    }

    hasAutoCalculatedPath.current = true;
    calculatePathAndGoToMap(destinationNodeId, newStartNodes);
  }, [graph, startNodes, destinationNodeId, userLocationProvided]);

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
    setDestinationNodeId(roomId);
  };

  const roomOptions = useMemo(() => {
    return [
      ...(graph.nodes ?? [])
        .filter((node) => node.id?.includes("_door") && !node.id.toLowerCase().includes("nooduitgang"))
        .map((node) => node.roomId)
        .filter((roomId): roomId is string => !!roomId),

      ...(graph.nodes ?? [])
        .filter((node) => GetNodeTypeFromInteger(node.type) === "entrance")
        .map((node) => node.id)
        .filter((id): id is string => !!id),

      EmergencyNodeName,
      ToiletNodeName,
    ];
  }, [graph.nodes]);

  const currentUserPosition = useMemo(() => {
    return userPosition
      ? {
          x: Math.round(userPosition.x),
          y: Math.round(userPosition.y),
          floor: userPosition.floor,
        }
      : startNodes.length > 0
        ? (() => {
            const node = graph.nodes?.find((n) => n.id === startNodes[0]) as GraphNodeDto;
            if (node) {
              return {
                x: Math.round(node.x ?? 0),
                y: Math.round(node.y ?? 0),
                floor: node.floor ?? 0,
              };
            }
            return undefined;
          })()
        : undefined;
  }, [userPosition, startNodes, graph.nodes]);

  useEffect(() => {
    fetchFloors();
    fetchHeatmapAreas();
  }, []);

  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    if (res.ok) setAreas(res.response);
  };

  const calculatePathAndGoToMap = (destinationOverride?: string, startNodesOverride?: string[]) => {
    let destinationToUse = resolveDestinationNodes(destinationOverride);
    if (
      !destinationToUse ||
      destinationToUse.length === 0 ||
      (startNodesOverride ?? startNodes).length === 0 ||
      !graph.nodes
    )
      return;

    let startNodesToUse = (startNodesOverride ?? startNodes).concat(
      (startNodesOverride ?? startNodes).map((n) => n + "_door"),
    );
    let result: string[] = [];

    if (startNodesToUse[0] === UserLocationName && userPosition) {
      const closestNode = getClosestNode(graph.nodes, userPosition);
      if (closestNode?.id) {
        startNodesToUse = [closestNode.id];
      }
    }
    if (
      destinationToUse[0].toLocaleLowerCase() === ToiletNodeName.toLocaleLowerCase() ||
      destinationToUse[0].toLocaleLowerCase() === EmergencyNodeName.toLocaleLowerCase() ||
      destinationToUse[0].toLocaleLowerCase() === CustomDestinationName.toLocaleLowerCase()
    ) {
      let nodeName = destinationToUse[0];
      if (destinationToUse[0].toLocaleLowerCase() === ToiletNodeName.toLocaleLowerCase()) {
        destinationToUse =
          graph.nodes
            ?.filter((n) => n.label === "Toilet")
            .map((n) => n.id)
            .filter((v): v is string => !!v) ?? destinationToUse;
      } else if (destinationToUse[0].toLocaleLowerCase() === EmergencyNodeName.toLocaleLowerCase()) {
        destinationToUse =
          graph.nodes
            ?.filter(
              (n) => n.id?.toLocaleLowerCase().includes("nooduitgang") || n.type === GetTypeFromNodeType("entrance"),
            )
            .map((n) => n.id)
            .filter((v): v is string => !!v) ?? destinationToUse;
      } else if (
        destinationToUse[0].toLocaleLowerCase() === CustomDestinationName.toLocaleLowerCase() &&
        destinationPoint?.type === "coordinates"
      ) {
        const closestNode = getClosestNode(graph.nodes, {
          floor: Number(destinationPoint.floor),
          x: Number(destinationPoint.x),
          y: Number(destinationPoint.y),
        });
        if (closestNode?.id) {
          destinationToUse = [closestNode.id];
        }
      }
      result = findPathAStarMultiStart(startNodesToUse, destinationToUse, graph, {
        accessibleRoute: isAccessibleRoute,
      });
      setPath(result);

      const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0]?.number ?? 0;

      setCurrentFloor(floor);
      setDestinationNodeId(nodeName);
      setSelectedRoom(nodeName);
      setScreen("map");
      return;
    }
    result = findPathAStarMultiStart(startNodesToUse, destinationToUse, graph, {
      accessibleRoute: isAccessibleRoute,
    });
    setPath(result);

    const floor = (graph.nodes?.find((n) => n.id === result[0]) as GraphNodeDto)?.floor ?? floorsList[0]?.number ?? 0;

    setCurrentFloor(floor);
    setDestinationNodeId(destinationToUse[0]);
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
                      data={roomOptions.concat(destinationProvided ? [CustomDestinationName] : [])}
                      onSelect={handleDestinationClick}
                      value={
                        destinationNodeId && nodeAvailable(destinationNodeId)
                          ? destinationNodeId.replace("_door", "")
                          : destinationPoint != null && destinationPoint.type !== "name"
                            ? CustomDestinationName
                            : undefined
                      }
                    />
                  </div>
                </>
              )}

              <button
                className="pathfinding-button"
                disabled={(!destinationNodeId && destinationPoint === null) || startNodes.length === 0}
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
                currentPosition={currentUserPosition}
                destination={
                  destinationNode
                    ? {
                        x: destinationNode.x,
                        y: destinationNode.y,
                        floor: destinationNode.floor,
                      }
                    : undefined
                }
              />
            </section>
            {pathSteps.length > 0 && (
              <section className="pathfinding-route-steps">
                <div className="pathfinding-route-steps-header">
                  <span className="pathfinding-route-steps-label">Routebeschrijving</span>
                  <span className="pathfinding-route-steps-count">
                    {pathSteps.length} verdiepingstap{pathSteps.length === 1 ? "" : "pen"}
                  </span>
                </div>

                <ol className="pathfinding-route-steps-list">
                  {pathSteps.map((step, index) => (
                    <li
                      key={`${step.floor}-${index}`}
                      className={`pathfinding-route-step ${step.floor === currentFloor ? "pathfinding-route-step-active" : ""}`}
                    >
                      <button
                        type="button"
                        className="pathfinding-route-step-button"
                        onClick={() => setCurrentFloor(step.floor)}
                      >
                        <strong>
                          Stap {index + 1}: {step.title}
                        </strong>
                        <span>{step.instruction}</span>
                      </button>
                    </li>
                  ))}
                </ol>

                {activeStep && (
                  <p className="pathfinding-current-instruction">Huidige instructie: {activeStep.instruction}</p>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};
