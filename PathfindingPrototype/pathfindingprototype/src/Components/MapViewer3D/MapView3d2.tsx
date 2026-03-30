import React, { useState } from "react";
import { Node, Edge } from "../../Types/types";
import test3 from "../../assets/2e_verdieping.svg";
import { findPath } from "../../services/pathfinding";
import { RouteOverlay } from "../RouteOverlay/RouteOverlay";
import { graph3d2 } from "../../data/graph3d2";
import "./MapView3d2.css";

interface MapViewProps {
  nodes: Node[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
}

export const MapView3d2: React.FC<MapViewProps> = ({
  nodes,
  edges,
  currentFloor,
  path,
}) => {
  const [path2, setPath] = useState<string[]>([]);

  const handleRoomClick = (roomId: string) => {
    const result = findPath('entrance', roomId, graph3d2);
    setPath(result);
  };
  return (
    <>
      <svg
        width={1200}
        height={800}
        className="MapView3d2"
      >
        <image href={test3}
          width={453}
          height={627} />
        <g id="Platte_3D" data-name="Platte 3D">
          <polygon id="H.2.318" onClick={() => handleRoomClick('H.2.318')} className="cls-2 room" points="37.81 140.19 120.83 128.43 145.72 236.77 62.08 248.78 37.81 140.19" />
          <polygon id="H.2.312" onClick={() => handleRoomClick('H.2.312')} className="cls-2 room" points="62.52 249.8 145.83 237.89 164.75 319.59 80.88 331.54 62.52 249.8" />
          <polygon id="H.2.308" onClick={() => handleRoomClick('H.2.308')} className="cls-2 room" points="81.19 332.36 164.39 320.48 189.3 429.41 105.61 441.25 81.19 332.36" />
          <polygon id="H.2.306" onClick={() => handleRoomClick('H.2.306')} className="cls-2 room" points="105.94 442.03 114.94 483.25 198.14 471.14 188.95 430.2 105.94 442.03" />
          <polygon id="H.2.204" onClick={() => handleRoomClick('H.2.204')} className="cls-2 room" points="115.3 483.96 135.18 573.09 316.44 547.12 296.32 457.91 115.3 483.96" />
          <polygon id="H.2.118" onClick={() => handleRoomClick('H.2.118')} className="cls-2 room" points="325.27 393.59 363.39 388.06 368.56 409.89 330.18 415.86 325.27 393.59" />
          <polygon id="H.2.117" onClick={() => handleRoomClick('H.2.117')} className="cls-2 room" points="319.31 369.22 362.69 363 365.29 373.78 375.69 372.2 378.56 384.73 324.48 392.45 319.31 369.22" />
          <polygon id="H.2.116" onClick={() => handleRoomClick('H.2.116')} className="cls-2 room" points="313.88 345.47 357.87 339.43 363.39 361.95 319.31 368.35 313.88 345.47" />
          <polygon id="H.2.215" onClick={() => handleRoomClick('H.2.215')} className="cls-2 room" points="309.32 327.68 313 345.04 338.64 341.44 334.65 324.27 309.32 327.68" />
          <polygon id="H.2.114" onClick={() => handleRoomClick('H.2.114')} className="cls-2 room" points="299.22 285.09 352.98 277.44 366.56 337.47 339.56 341.18 335.44 323.47 308.42 327.16 299.22 285.09" />
          <polygon id="H.2.112" onClick={() => handleRoomClick('H.2.112')} className="cls-2 room" points="293.9 263.19 298.59 284.4 353.16 276.61 348.41 255.37 293.9 263.19" />
          <polygon id="H.2.111" onClick={() => handleRoomClick('H.2.111')} className="cls-2 room" points="293.67 262.34 347.75 254.75 333.32 190.49 279.59 197.97 293.67 262.34" />
          <polygon id="H.2.107" onClick={() => handleRoomClick('H.2.107')} className="cls-2 room" points="274.6 175.8 322.31 169.01 312.82 127.28 296.19 129.5 294.75 124.28 264.07 128.72 274.6 175.8" />
          <polygon id="H.2.104" onClick={() => handleRoomClick('H.2.104')} className="cls-2 room" points="313.78 126.44 296.61 129.05 295.42 123.6 263.54 128.21 255.35 91.34 304.27 84.41 313.78 126.44" />
          <polygon id="H.2.219" onClick={() => handleRoomClick('H.2.219')} className="cls-2 room" points="331.99 422.61 366.59 417.6 369.52 429.5 334.76 434.46 331.99 422.61" />
          <polygon id="H.2.120" onClick={() => handleRoomClick('H.2.120')} className="cls-2 room" points="335.28 437.02 337.99 448.87 372.65 443.86 369.99 432.06 335.28 437.02" />
          <polygon id="H.2.409" onClick={() => handleRoomClick('H.2.409')} className="cls-2 room" points="359.61 458.52 374.27 456.59 379.28 477.47 364.4 479.45 359.61 458.52" />
          <polygon id="H.2.403" onClick={() => handleRoomClick('H.2.403')} className="cls-2 room" points="17.66 50.15 204.92 23.19 225.07 112.53 37.31 139.5 17.66 50.15" />
        </g>
        {/* <g id="Deuren">
          <circle className="cls-1" cx="134.7" cy="125.93" r="2.5" />
          <circle className="cls-1" cx="139.7" cy="211.05" r="2.5" />
          <circle className="cls-1" cx="150.44" cy="255.58" r="2.5" />
          <circle className="cls-1" cx="167.58" cy="337.75" r="2.5" />
          <circle className="cls-1" cx="191.52" cy="441.07" r="2.5" />
          <circle className="cls-1" cx="210.59" cy="470.79" r="2.5" />
          <circle className="cls-1" cx="333.09" cy="429.45" r="2.5" />
          <circle className="cls-1" cx="327.33" cy="404.96" r="2.5" />
          <circle className="cls-1" cx="322.67" cy="382.59" r="2.5" />
          <circle className="cls-1" cx="317.49" cy="358.73" r="2.5" />
          <circle className="cls-1" cx="311.16" cy="337.75" r="2.5" />
          <circle className="cls-1" cx="301.44" cy="298.66" r="2.5" />
          <circle className="cls-1" cx="295.97" cy="275.86" r="2.5" />
          <circle className="cls-1" cx="290.7" cy="253.65" r="2.5" />
          <circle className="cls-1" cx="272.37" cy="167.16" r="2.5" />
          <circle className="cls-1" cx="261.76" cy="120.91" r="2.5" />
          <circle className="cls-1" cx="336.6" cy="444.19" r="2.5" />
          <circle className="cls-1" cx="373.01" cy="478.86" r="2.5" />
        </g> */}
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
        })}
        {nodes
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
            stroke="blue"
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
      <RouteOverlay
        path={path2}
        nodes={graph3d2.nodes}
        currentFloor={0}
      />
    </>
  );
};
