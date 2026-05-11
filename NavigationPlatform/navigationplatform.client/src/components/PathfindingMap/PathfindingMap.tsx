import React, { useEffect, useRef, useState } from "react";
import "./PathfindingMap.css";
import type { PathfindingMapProps } from "./PathfindingMap.props";
import type { GraphNodeDto } from "../../api/data-contracts";
import type { NodeType } from "../../Types/nodeType";
import { GetTypeFromNodeType } from "../../utils/NodeTypeFromType";
// import type { GraphNode, NodeType } from "../../Types/types";

export const PathfindingMap: React.FC<PathfindingMapProps> = ({
  nodes,
  currentFloor,
  path,
  handleRoomClick = () => { },
  floors,
}) => {
  const svgElement = useRef<SVGSVGElement>(null);
  const gottenSVGElement = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [compassEnabled, setCompassEnabled] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position)
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
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
  const [userPosition, setUserPosition] = useState<{ x: number; y: number } | null>({
    x: 400,
    y: 700,
  });
  const MAP_NORTH_OFFSET = 65;

  useEffect(() => {
    startCompass();
  }, []);

  const startCompass = async () => {
    if (!("DeviceOrientationEvent" in window)) {
      alert("Compass is not supported on this device.");
      return;
    }

    const DeviceOrientation = DeviceOrientationEvent as any;

    if (typeof DeviceOrientation.requestPermission === "function") {
      const permission = await DeviceOrientation.requestPermission();
      if (permission !== "granted") return;
    }

    setCompassEnabled(true);
  };

  useEffect(() => {
    if (!compassEnabled) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const safariHeading = (event as any).webkitCompassHeading;

      let newHeading: number | null = null;

      if (typeof safariHeading === "number") {
        newHeading = safariHeading;
      } else if (typeof event.alpha === "number") {
        newHeading = 360 - event.alpha;
      }

      if (newHeading !== null) {
        setHeading(Math.round(newHeading));
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [compassEnabled]);

  useEffect(() => {
    if (!gottenSVGElement.current) return;
    const vb = gottenSVGElement.current.getAttribute("viewBox");
    if (vb) setViewBox(vb);
  }, [currentFloor, floors, handleRoomClick]);

  const copyDoors = () => {
    if (!svgElement.current) return;

    const doorGroup = svgElement.current.getElementById("DataPoints");
    if (!doorGroup) return;

    const doors = doorGroup.querySelectorAll("circle");

    var doorData: GraphNodeDto[] = Array.from(doors).map((door) => {
      const rawId = door.getAttribute("data-name") || door.id;
      const cleanId = rawId.replace(/-\d+$/, "");

      const x = parseFloat(door.getAttribute("cx") || "0");
      const y = parseFloat(door.getAttribute("cy") || "0");

      if (cleanId.includes("Trap")) {
        return {
          id: `${cleanId}_door`,
          x: Math.round(x),
          y: Math.round(y),
          floor: currentFloor,
          type: GetTypeFromNodeType("door"),
          width: 20,
          height: 20,
          roomId: cleanId,
        };
      } else if (cleanId.includes("Lift")) {
        return {
          id: `${cleanId}_door`,
          x: Math.round(x),
          y: Math.round(y),
          floor: currentFloor,
          type: GetTypeFromNodeType("door"),
          width: 20,
          height: 20,
          roomId: cleanId,
        };
      }

      return {
        id: `${cleanId}_door`,
        x: Math.round(x),
        y: Math.round(y),
        floor: currentFloor,
        type: GetTypeFromNodeType("door"),
        width: 20,
        height: 20,
        roomId: cleanId,
      };
    });
    doorData
      .filter((d) => d.id?.toLowerCase().includes("trap") || d.id?.toLowerCase().includes("lift"))
      .forEach((element) => {
        var type: NodeType = element.id?.toLowerCase().includes("trap") ? "stairs" : "elevator";
        doorData.push({
          id: element.roomId || (element.id ? element.id.replace("_door", "") : ""),
          x: element.x,
          y: element.y,
          floor: element.floor,
          type: GetTypeFromNodeType(type),
          width: element.width,
          height: element.height,
        });
      });

    const formattedData = doorData
      .map(
        (d) =>
          `{ id: "${d.id}", x: ${d.x}, y: ${d.y}, floor: ${d.floor}, type: "${d.type}", width: ${d.width}, height: ${d.height} ${d.roomId ? `,roomId: "${d.roomId}"` : ""} },`,
      )
      .join("\n");

    navigator.clipboard.writeText(formattedData);
  };

  const copyDoorsJson = () => {
    if (!svgElement.current) return;

    const doorGroup = svgElement.current.getElementById("DataPoints");
    if (!doorGroup) return;

    const doors = doorGroup.querySelectorAll("circle");

    const doorData: GraphNodeDto[] = Array.from(doors).map((door) => {
      const rawId = door.getAttribute("data-name") || door.id;
      const cleanId = rawId.replace(/-\d+$/, "");

      const x = parseFloat(door.getAttribute("cx") || "0");
      const y = parseFloat(door.getAttribute("cy") || "0");

      return {
        id: `${cleanId}_door`,
        x: Math.round(x),
        y: Math.round(y),
        floor: currentFloor,
        type: GetTypeFromNodeType("door"),
        width: 20,
        height: 20,
        roomId: cleanId,
      };
    });

    doorData
      .filter((d) => d.id?.toLowerCase().includes("trap") || d.id?.toLowerCase().includes("lift"))
      .forEach((element) => {
        const type: NodeType = element.id?.toLowerCase().includes("trap") ? "stairs" : "elevator";

        doorData.push({
          id: element.roomId || (element.id ? element.id.replace("_door", "") : ""),
          x: element.x,
          y: element.y,
          floor: element.floor,
          type: GetTypeFromNodeType(type),
          width: element.width,
          height: element.height,
        });
      });

    const jsonData = JSON.stringify(doorData, null, 2);
    navigator.clipboard.writeText(jsonData);
  };

  const SelectedFloor = floors?.find((f) => f.floorNumber === currentFloor)?.svg;

  const onSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as Element;
    const roomGroup = target.closest("g[id^='H.'], g[id^='WN.'], g[id^='WD.']");
    if (roomGroup?.id) {
      const cleanId = roomGroup.id.replace(/-\d+$/, "");
      handleRoomClick(cleanId);
    }
  };

  return (
    <div className="map-view-v4">
      {/* <button className="map-view-v4__copy-button" onClick={copyDoors}>
        📋 Copy doors
      </button> */}

      <button className="map-view-v4__copy-button" onClick={copyDoorsJson}>
        📋 Copy doors JSON
      </button>
      <button className="map-view-v4__compass-button" onClick={startCompass}>
        Enable compass
      </button>
      <button onClick={requestLocation}>
        Get location
      </button>
      {gpsCoordinates && (
        <div>
          Lat: {gpsCoordinates.latitude}
          <br />
          Lng: {gpsCoordinates.longitude}
        </div>
      )}

      <div className="map-view-v4__compass">
        <div
          className="map-view-v4__compass-arrow"
          style={{
            transform: `rotate(${heading ?? 0}deg)`,
          }}
        >
          ▲
        </div>
        <span>{heading !== null ? `${heading}°` : "Compass off"}</span>
      </div>

      <div className="map-view-v4__svg-wrapper">
        <svg ref={svgElement} viewBox={viewBox || "0 0 1000 1000"} className="MapView3d4" onClick={onSvgClick}>
          {SelectedFloor && <SelectedFloor ref={gottenSVGElement} />}
          {/* {nodes
            .filter((n) => n.floor === currentFloor)
            .map((n) => (
              <rect
                key={n.id}
                x={n.x - (n.width ?? 20) / 2}
                y={n.y - (n.height ?? 20) / 2}
                width={n.width ?? 20}
                height={n.height ?? 20}
                fill={n.type === "door" ? "#ff0000" : "#ffd27f"}
                stroke="#333"
                strokeWidth={2}
                rx={3}
                onClick={() => handleRoomClick(n.id)}
                style={{ cursor: "pointer", opacity: 0.8 }}
              />
            ))}

          {edges.map((e) => {
            const from = nodes.find((n) => n.id === e.from && n.floor === currentFloor);
            const to = nodes.find((n) => n.id === e.to && n.floor === currentFloor);
            if (!from || !to) return null;

            return <line key={`${e.from}-${e.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#aaa" strokeWidth={8} strokeLinecap="round" />;
          })} */}
          {userPosition && (
            <g transform={`translate(${userPosition.x}, ${userPosition.y})`} style={{ pointerEvents: "none" }}>
              <g transform={`rotate(${(heading ?? 0) + MAP_NORTH_OFFSET})`}>
                <polygon points="0,-35 14,10 0,3 -14,10" fill="#2563eb" stroke="white" strokeWidth={3} />
              </g>

              <circle cx={0} cy={0} r={14} fill="#2563eb" stroke="white" strokeWidth={5} />
            </g>
          )}

          {path && (
            <path
              d={(() => {
                const points = path
                  .map((id) => nodes.find((n) => n.id === id && n.floor === currentFloor))
                  .filter(Boolean) as {
                    x: number;
                    y: number;
                  }[];

                if (points.length === 0) return "";

                let d = `M ${points[0].x},${points[0].y}`;

                for (let i = 0; i < points.length - 1; i++) {
                  const p0 = points[i - 1] || points[i];
                  const p1 = points[i];
                  const p2 = points[i + 1];
                  const p3 = points[i + 2] || p2;

                  const cp1x = p1.x + (p2.x - p0.x) / 6;
                  const cp1y = p1.y + (p2.y - p0.y) / 6;

                  const cp2x = p2.x - (p3.x - p1.x) / 6;
                  const cp2y = p2.y - (p3.y - p1.y) / 6;

                  d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
                }

                return d;
              })()}
              fill="none"
              stroke="blue"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
