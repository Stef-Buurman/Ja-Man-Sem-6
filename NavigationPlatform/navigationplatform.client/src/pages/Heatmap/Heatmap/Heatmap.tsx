import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { HeatpointArea } from "../../../api/data-contracts";
import { getHeatpointAreas } from "../../../api/methods/Heatmap.api";
import { floors } from "../../../utils/Globals";
import { FloorSelector } from "../../../components/FloorSelector/FloorSelector";

const Heatmap: React.FC = () => {
  const svgElement = useRef<SVGSVGElement>(null);
  const [areas, setAreas] = useState<HeatpointArea[]>([]);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<number>(3);

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    if (res.ok) setAreas(res.response);
  };

  useEffect(() => {
    if (!svgElement.current) return;
    const vb = svgElement.current.getAttribute("viewBox");
    if (vb) setViewBox(vb);
    let isActive = true;

    const connection = new signalR.HubConnectionBuilder().withUrl("/hubs/heatmaphub").withAutomaticReconnect().build();

    connection.on("ReceiveAreaUpdate", () => {
      if (isActive) {
        fetchHeatmapAreas();
      }
    });

    const start = async () => {
      try {
        await connection.start();
        console.log("SignalR connected");

        if (isActive) {
          await fetchHeatmapAreas();
        }
      } catch (err) {
        if (isActive) {
          console.error("Failed to start connection:", err);
        }
      }
    };

    void start();

    return () => {
      isActive = false;
      connection.off("ReceiveAreaUpdate");
      void connection.stop();
    };
  }, []);

  const getColor = (value: number) => {
    if (value <= 3) {
      const ratio = value / 3;
      const r = 0;
      const g = Math.round(150 + 105 * ratio);
      const b = 0;
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    if (value <= 10) {
      const ratio = (value - 3) / 7;
      const r = Math.round(255 * ratio);
      const g = 255;
      const b = 0;
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    const max = 20;
    const ratio = Math.min(1, (value - 10) / (max - 10));
    const r = 255;
    const g = Math.round(255 * (1 - ratio));
    const b = 0;
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  const getGradientId = (areaId: number) => `heat-grad-${areaId}`;
  const SelectedFloor = floors?.find((f) => f.floorNumber === currentFloor)?.svg;
  const areasForCurrentFloor = areas.filter((a) => a.floor?.number === currentFloor);

  return (
    <div>
      <div className="pathfinding-control-group">
        <FloorSelector
          floors={floors.map((f) => f.floorNumber)}
          currentFloor={currentFloor}
          setFloor={setCurrentFloor}
        />
      </div>
      <svg
        viewBox={viewBox || "0 0 454 627.31"}
        style={{ border: "1px solid black", margin: "20px auto", display: "block" }}
      >
        {SelectedFloor && <SelectedFloor ref={svgElement} />}
        <defs>
          {areasForCurrentFloor.map((a) => {
            const color = getColor(a.value);
            return (
              <radialGradient key={a.id} id={getGradientId(a.id)} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="45%" stopColor={color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </radialGradient>
            );
          })}
          {areasForCurrentFloor.map((a) => (
            <clipPath key={`clip-${a.id}`} id={`clip-${a.id}`}>
              <rect x={a.x} y={a.y} width={a.width} height={a.height} />
            </clipPath>
          ))}
        </defs>

        {areasForCurrentFloor.map((a) => (
          <rect
            key={a.id}
            x={a.x}
            y={a.y}
            width={a.width}
            height={a.height}
            fill={`url(#${getGradientId(a.id)})`}
            clipPath={`url(#clip-${a.id})`}
          />
        ))}
      </svg>
    </div>
  );
};

export default Heatmap;
