import React from "react";
import type { Node } from "../../../Types/types";
import test3 from "../../../assets/2e_verdieping.svg";
import "./MapView3dv3.css";

interface MapViewProps {
  nodes: Node[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
}

export const MapView3dV3: React.FC<MapViewProps> = ({ nodes, currentFloor, path, handleRoomClick = () => {} }) => {
  return (
    <>
      <svg width={1200} height={800} className="MapView3d2">
        <image href={test3} width={453} height={627} />
        <g id="Platte_3D" data-name="Platte 3D">
          <polygon
            id={"H." + currentFloor + ".318"}
            onClick={() => handleRoomClick("H." + currentFloor + ".318")}
            className="cls-2 room"
            points="37.81 140.19 120.83 128.43 145.72 236.77 62.08 248.78 37.81 140.19"
          />
          <polygon
            id={"H." + currentFloor + ".312"}
            onClick={() => handleRoomClick("H." + currentFloor + ".312")}
            className="cls-2 room"
            points="62.52 249.8 145.83 237.89 164.75 319.59 80.88 331.54 62.52 249.8"
          />
          <polygon
            id={"H." + currentFloor + ".308"}
            onClick={() => handleRoomClick("H." + currentFloor + ".308")}
            className="cls-2 room"
            points="81.19 332.36 164.39 320.48 189.3 429.41 105.61 441.25 81.19 332.36"
          />
          <polygon
            id={"H." + currentFloor + ".306"}
            onClick={() => handleRoomClick("H." + currentFloor + ".306")}
            className="cls-2 room"
            points="105.94 442.03 114.94 483.25 198.14 471.14 188.95 430.2 105.94 442.03"
          />
          <polygon
            id={"H." + currentFloor + ".204"}
            onClick={() => handleRoomClick("H." + currentFloor + ".204")}
            className="cls-2 room"
            points="115.3 483.96 135.18 573.09 316.44 547.12 296.32 457.91 115.3 483.96"
          />
          <polygon
            id={"H." + currentFloor + ".118"}
            onClick={() => handleRoomClick("H." + currentFloor + ".118")}
            className="cls-2 room"
            points="325.27 393.59 363.39 388.06 368.56 409.89 330.18 415.86 325.27 393.59"
          />
          <polygon
            id={"H." + currentFloor + ".117"}
            onClick={() => handleRoomClick("H." + currentFloor + ".117")}
            className="cls-2 room"
            points="319.31 369.22 362.69 363 365.29 373.78 375.69 372.2 378.56 384.73 324.48 392.45 319.31 369.22"
          />
          <polygon
            id={"H." + currentFloor + ".116"}
            onClick={() => handleRoomClick("H." + currentFloor + ".116")}
            className="cls-2 room"
            points="313.88 345.47 357.87 339.43 363.39 361.95 319.31 368.35 313.88 345.47"
          />
          <polygon
            id={"H." + currentFloor + ".215"}
            onClick={() => handleRoomClick("H." + currentFloor + ".215")}
            className="cls-2 room"
            points="309.32 327.68 313 345.04 338.64 341.44 334.65 324.27 309.32 327.68"
          />
          <polygon
            id={"H." + currentFloor + ".114"}
            onClick={() => handleRoomClick("H." + currentFloor + ".114")}
            className="cls-2 room"
            points="299.22 285.09 352.98 277.44 366.56 337.47 339.56 341.18 335.44 323.47 308.42 327.16 299.22 285.09"
          />
          <polygon
            id={"H." + currentFloor + ".112"}
            onClick={() => handleRoomClick("H." + currentFloor + ".112")}
            className="cls-2 room"
            points="293.9 263.19 298.59 284.4 353.16 276.61 348.41 255.37 293.9 263.19"
          />
          <polygon
            id={"H." + currentFloor + ".111"}
            onClick={() => handleRoomClick("H." + currentFloor + ".111")}
            className="cls-2 room"
            points="293.67 262.34 347.75 254.75 333.32 190.49 279.59 197.97 293.67 262.34"
          />
          <polygon
            id={"H." + currentFloor + ".107"}
            onClick={() => handleRoomClick("H." + currentFloor + ".107")}
            className="cls-2 room"
            points="274.6 175.8 322.31 169.01 312.82 127.28 296.19 129.5 294.75 124.28 264.07 128.72 274.6 175.8"
          />
          <polygon
            id={"H." + currentFloor + ".104"}
            onClick={() => handleRoomClick("H." + currentFloor + ".104")}
            className="cls-2 room"
            points="313.78 126.44 296.61 129.05 295.42 123.6 263.54 128.21 255.35 91.34 304.27 84.41 313.78 126.44"
          />
          <polygon
            id={"H." + currentFloor + ".219"}
            onClick={() => handleRoomClick("H." + currentFloor + ".219")}
            className="cls-2 room"
            points="331.99 422.61 366.59 417.6 369.52 429.5 334.76 434.46 331.99 422.61"
          />
          <polygon
            id={"H." + currentFloor + ".120"}
            onClick={() => handleRoomClick("H." + currentFloor + ".120")}
            className="cls-2 room"
            points="335.28 437.02 337.99 448.87 372.65 443.86 369.99 432.06 335.28 437.02"
          />
          <polygon
            id={"H." + currentFloor + ".409"}
            onClick={() => handleRoomClick("H." + currentFloor + ".409")}
            className="cls-2 room"
            points="359.61 458.52 374.27 456.59 379.28 477.47 364.4 479.45 359.61 458.52"
          />
          <polygon
            id={"H." + currentFloor + ".403"}
            onClick={() => handleRoomClick("H." + currentFloor + ".403")}
            className="cls-2 room"
            points="17.66 50.15 204.92 23.19 225.07 112.53 37.31 139.5 17.66 50.15"
          />
        </g>
        {path && (
          <path
            d={(() => {
              const points = path.map((id) => nodes.find((n) => n.id === id && n.floor === currentFloor)).filter(Boolean) as {
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
    </>
  );
};
