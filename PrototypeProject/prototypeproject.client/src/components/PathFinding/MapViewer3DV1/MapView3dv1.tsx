import React, { useState } from "react";
import test3 from "../../../assets/test3.svg";
import type { Edge, GraphNode} from "../../../Types/types";
import { graph3dv1 } from "../../data/graph3dv1";
import { findPath } from "../../../services/pathfinding";

interface MapViewProps {
  nodes: GraphNode[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
}

export const MapViewer3DV1: React.FC<MapViewProps> = ({
  nodes,
  edges,
  currentFloor,
  path,
}) => {
  const [path2, setPath] = useState<string[]>([]);

  const handleRoomClick = (roomId: string) => {
    const result = findPath('entrance', roomId, graph3dv1);
    setPath(result);
  };
  return (
    <>
      <svg
        width={1200}
        height={800}
        style={{ border: "2px solid #333", backgroundColor: "#f0f0f0" }}
      >
        <image href={test3}
          width={457}
          height={455} />

        <g id="_1" data-name="1" onClick={() => handleRoomClick('class_101')}>
          <polygon className="cls-1" points="268.26 388.45 142.26 404.92 130.97 355.68 257.28 338.72 268.26 388.45" />
        </g>
        <g id="_2" data-name="2" onClick={() => handleRoomClick('class_102')}>
          <polygon className="cls-1" points="191.32 337.15 131.76 345.18 125.35 318.11 184.36 309.68 191.32 337.15" />
        </g>
        <g id="_3" data-name="3" onClick={() => handleRoomClick('class_103')}>
          <polygon className="cls-1" points="184.36 304.24 123.96 313.09 109.92 243.73 167.89 236.51 184.36 304.24" />
        </g>
        <g id="_4" data-name="4" onClick={() => handleRoomClick('class_104')}>
          <polygon className="cls-1" points="167.89 228.28 109.31 238.04 98.02 184.65 157.21 175.5 167.89 228.28" />
        </g>
        <g id="_5" data-name="5" onClick={() => handleRoomClick('class_105')}>
          <polygon className="cls-1" points="155.68 167.87 96.5 176.89 80.94 107.46 140.13 98.84 155.68 167.87" />
        </g>
        <g id="_6" data-name="6" onClick={() => handleRoomClick('class_106')}>
          <polygon className="cls-1" points="207.6 82.49 79.78 101.09 67.37 40.23 194.13 22.34 207.6 82.49" />
        </g>
        {/* Hallways (edges) */}
        {/* {edges.map((e) => {
          const from = nodes.find(
            (n) => n.id === e.from && n.floor === currentFloor,
          );
          const to = nodes.find((n) => n.id === e.to && n.floor === currentFloor);
          if (!from || !to) return null;

          // Hallway color: gray
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#aaa"
              strokeWidth={8}
              strokeLinecap="round"
            />
          );
        })} */}
        {/* Nodes */}
        {/* {nodes
          .filter((n) => n.floor === currentFloor) //&& n.type !== "hallway"
          .map((n) => {
            const fillColor =
              n.type === "room"
                ? "#ffd27f"
                : n.type === "hallway"
                  ? "#ccc"
                  : n.type === "stairs"
                    ? "#6b9fff"
                    : n.type === "entrance"
                      ? "#90ee90"
                      : n.type === "door"
                        ? "#8b8b8b" // gray for doors
                        : "#eee";
            return (
              <rect
                key={n.id}
                x={n.x}
                y={n.y}
                width={n.width ?? 40}
                height={n.height ?? 40}
                fill={fillColor}
                stroke="#333"
                strokeWidth={2}
                rx={5}
              />
            );
          })} */}
        {/* Path */}
        {path2 && (
          <polyline
            points={path2
              .map((id) => {
                const n = nodes.find(
                  (n) => n.id === id && n.floor === currentFloor,
                );
                return n ? `${n.x},${n.y}` : null;
              })
              .filter(Boolean)
              .join(" ")}
            fill="none"
            stroke="red"
            strokeWidth={6}
            strokeLinecap="round"
          />
        )}
        {/* Room labels */}
        {/* {nodes
          .filter((n) => n.floor === currentFloor && n.type === "room")
          .map((n) => (
            <text
              key={`label-${n.id}`}
              x={n.x + (n.width ?? 40) / 2}
              y={n.y - 10}
              textAnchor="middle"
              fontSize={12}
              fontWeight="bold"
              fill="#333"
            >
              {n.id.toUpperCase()}
            </text>
          ))} */}
        {/* <image
          href={SecondFloorImage}
          x={0}
          y={0}
          width={1200}
          height={800}
          opacity={0.3}
        /> */}
      </svg>
    </>
  );
};
