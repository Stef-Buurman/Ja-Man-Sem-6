import React from "react";
import { Node, Edge } from "../../Types/types";
import SecondFloorImage from "../../assets/2e_verdieping.png";

interface MapViewProps {
  nodes: Node[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
}

export const MapView: React.FC<MapViewProps> = ({
  nodes,
  edges,
  currentFloor,
  path,
}) => {
  return (
    <>
      <svg
        width={1200}
        height={800}
        style={{ border: "2px solid #333", backgroundColor: "#f0f0f0" }}
      >
        {/* Hallways (edges) */}
        {edges.map((e) => {
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
        })}
        {/* Nodes */}
        {nodes
          .filter((n) => n.floor === currentFloor && n.type !== "hallway")
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
            if (n.type === "room") {
              return (<>
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
                                {/* <rect
                  key={n.id + "-door"}
                  x={n.x + (n.door_x_offset ?? 0)}
                  y={n.y}
                  width={n.width ?? 40}
                  height={n.height ?? 40}
                  fill={fillColor}
                  stroke="#333"
                  strokeWidth={2}
                  rx={5}
                /> */}
                </>
              );
            }
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
          })}
        {/* Path */}
        {path && (
          <polyline
            points={path
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
        {nodes
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
          ))}
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
