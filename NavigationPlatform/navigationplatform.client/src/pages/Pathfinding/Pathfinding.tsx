import { useEffect, useState } from "react";
import "./Pathfinding.css";
import { PathfindingMap } from "../../components/PathfindingMap/PathfindingMap";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import SearchSelect from "../../components/SearchSelect/SearchSelect";
import type { PathfindingSettings } from "../../Types/types";
import { defaultStartNodes, floors } from "../../utils/Globals";
import { findPathAStarMultiStart } from "../../services/pathfinding";
import type { GraphDto, GraphNodeDto } from "../../api/data-contracts";
import { getGraph } from "../../api/methods/Graph.api";
import { useParams } from "react-router-dom";

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
  }

  const points: {
    x: number;
    y: number;
    latitude: number;
    longitude: number;
  }[] = [{
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
  }, {
    x: 532.81884765625,
    y: 112.14818572998047,
    latitude: 51.91759879937042,
    longitude: 4.483997858981437,
  }, {
    x: 673.4601440429688,
    y: 738.4000854492188,
    latitude: 51.91735398999769,
    longitude: 4.484133105081396,
  }, {
    x: 2289.508544921875,
    y: 523.4577026367188,
    latitude: 51.91749814898966,
    longitude: 4.484866138799322,
  }, {
    x: 2374.424072265625,
    y: 902.9238891601562,
    latitude: 51.91736715461671,
    longitude: 4.484931395104481,
  }];
  type CalibrationPoint = {
    x: number;
    y: number;
    latitude: number;
    longitude: number;
  };

  function distanceGps(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) {
    return Math.sqrt(
      Math.pow(lat1 - lat2, 2) +
      Math.pow(lng1 - lng2, 2),
    );
  }

  function gpsToMapPosition(
    latitude: number,
    longitude: number,
    points: CalibrationPoint[],
  ): { x: number; y: number } {
    const nearest = [...points]
      .map((p) => ({
        ...p,
        distance: distanceGps(latitude, longitude, p.latitude, p.longitude),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    let totalWeight = 0;
    let resultX = 0;
    let resultY = 0;

    for (const point of nearest) {
      const weight = 1 / Math.pow(
        Math.max(point.distance, 0.000000001),
        2,
      );

      resultX += point.x * weight;
      resultY += point.y * weight;
      totalWeight += weight;
    }

    const calculated = {
      x: resultX / totalWeight,
      y: resultY / totalWeight,
    };

    return {
      x: calculated.x + 265,
      y: calculated.y - 60,
    };
  }
  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setGpsCoordinates({ latitude, longitude });
        setAltitude(position.coords.altitude);
        setAccuracy(position.coords.accuracy);

        const calculatedPosition = gpsToMapPosition(
          latitude,
          longitude,
          points,
        );

        setUserPosition(calculatedPosition);

        console.log("Calculated position:", calculatedPosition);
      },
      (error) => {
        console.error(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };
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
              const currentDistance = Math.hypot((node.x ?? 0) - startingPosition.x, (node.y ?? 0) - startingPosition.y);
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
    if (floor === undefined && x === undefined && y === undefined) {
      requestLocation();
    }
    else {
      setUserPosition(startingPosition);
    }
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
                  value={destinationNode && nodeAvailable(destinationNode) ? destinationNode?.replace("_door", "") : undefined}
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
          />
        </section>
      </div>
    </div>
  );
};
