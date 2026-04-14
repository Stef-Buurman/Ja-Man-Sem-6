import React, { useEffect, useRef, useState } from "react";
import type { Node, Edge} from "../../../Types/types";
import "./MapView3dv4.css";

interface MapViewProps {
  nodes: Node[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: React.FC<React.SVGProps<SVGSVGElement>>[];
}

export const MapView3dV4: React.FC<MapViewProps> = ({ nodes, edges, currentFloor, path, handleRoomClick = () => {}, floors }) => {
  const svgElement = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!svgElement.current) return;

    const prefixes = ["H.", "WN.", "WD."];
    const allRooms = svgElement.current.querySelectorAll(prefixes.map((p) => `g[id^='${p}']`).join(", "));

    const cleanups: Array<() => void> = [];

    allRooms.forEach((room) => {
      const polygon = room.querySelector("polygon");
      const roomId = room.id;

      if (!polygon) return;

      const onClick = (event: Event) => {
        event.stopPropagation();
        handleRoomClick(roomId);
      };

      const onEnter = () => {
        polygon.style.fillOpacity = "0.8";
        polygon.style.stroke = "#ff5722";
        polygon.style.strokeWidth = "3";
      };

      const onLeave = () => {
        polygon.style.fillOpacity = "0.6";
        polygon.style.stroke = "";
        polygon.style.strokeWidth = "";
      };

      polygon.style.cursor = "pointer";
      polygon.style.transition = "all 0.2s ease";

      polygon.addEventListener("click", onClick);
      polygon.addEventListener("mouseenter", onEnter);
      polygon.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        polygon.removeEventListener("click", onClick);
        polygon.removeEventListener("mouseenter", onEnter);
        polygon.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [currentFloor, floors, handleRoomClick]);

  const copyDoors = () => {
    if (!svgElement.current) return;

    const doorGroup = svgElement.current.getElementById("DataPoints");
    if (!doorGroup) return;

    const doors = doorGroup.querySelectorAll("circle");

    const doorData = Array.from(doors).map((door) => {
      const rawId = door.getAttribute("data-name") || door.id;
      const cleanId = rawId.replace(/-\d+$/, "");

      const x = parseFloat(door.getAttribute("cx") || "0");
      const y = parseFloat(door.getAttribute("cy") || "0");

      return {
        id: `${cleanId}_door`,
        x: Math.round(x),
        y: Math.round(y),
        floor: currentFloor,
        type: "door",
        width: 20,
        height: 20,
      };
    });

    const formattedData = doorData
      .map((d) => `{ id: "${d.id}", x: ${d.x}, y: ${d.y}, floor: ${d.floor}, type: "${d.type}", width: ${d.width}, height: ${d.height} },`)
      .join("\n");

    navigator.clipboard.writeText(formattedData);
  };

  const SelectedFloor = floors?.[currentFloor - 1];

  return (
    <>
      <button onClick={copyDoors} style={{ margin: "10px", padding: "5px 10px" }}>
        Copy doors (original coordinates)
      </button>

      <div
        style={{
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <svg
          ref={svgElement}
          viewBox="0 0 2412.61 1344.75"
          className="MapView3d4"
          style={{ backgroundColor: "#f5f5f5", width: "100%", height: "auto", display: "block" }}
        >
          {SelectedFloor && <SelectedFloor />}

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

          {path && (
            <path
              d={(() => {
                const points = path.map((id) => nodes.find((n) => n.id === id && n.floor === currentFloor)).filter(Boolean) as {
                  x: number;
                  y: number;
                }[];

                console.log("=== PATH DEBUG INFO ===");
                console.log("Raw path IDs:", path);
                console.log("Mapped points:", points);

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
    </>
  );
};
