import React, { useEffect } from "react";
import { Node } from "../../Types/types";
import test3 from "../../assets/2e_verdieping.svg";
import "./MapView3dv4.css";
import Test3Svg from "../../assets/2e_verdieping.svg?react";

interface MapViewProps {
  nodes: Node[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
}

export const MapView3dV4: React.FC<MapViewProps> = ({ nodes, currentFloor, path, handleRoomClick = () => { } }) => {
  const svgElement = React.useRef<SVGSVGElement>(null);
  const [elements, setElements] = React.useState<SVGPolygonElement[]>([]);
  const [doors, setDoors] = React.useState<SVGCircleElement[]>([]);

  useEffect(() => {
    if (svgElement.current) {
      const element = svgElement.current.getElementById("Platte_3D");
      if (element) {
        const polygons = element.querySelectorAll("polygon");
        setElements(Array.from(polygons));
      }
      const doorGroup = svgElement.current.getElementById("Deuren");
      if (doorGroup) {
        const doors = doorGroup.querySelectorAll("circle");
        setDoors(Array.from(doors));
      }
    }
  }, []);

  const copyDoors = () => {
    const doorData = doors.map(door => {
      const id = door.id;
      const x = parseFloat(door.getAttribute("cx") || "0");
      const y = parseFloat(door.getAttribute("cy") || "0");
      return { id, x, y, floor: currentFloor, type: "door", width: 20, height: 20 };
    });
    const formattedData = doorData.map((d, index) => `{ id: "${elements[index]?.id}", x: ${d.x}, y: ${d.y}, floor: ${d.floor}, type: "${d.type}", width: ${d.width}, height: ${d.height} },`).join("\n");
    navigator.clipboard.writeText(formattedData).then(() => {
      alert("Door data copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy door data: ", err);
    });
  };

  return (
    <>
      <button onClick={copyDoors}>Copy doors</button>
      <svg width={1200} height={800} className="MapView3d2">
        <Test3Svg ref={svgElement} width={453} height={627} />
        {elements.map((el) => {
          const roomId = el.id;
          return (
            <polygon
              key={roomId}
              id={roomId}
              onClick={() => handleRoomClick(roomId)}
              className="cls-2 room"
              points={el.getAttribute("points") || undefined}
            />
          );
        })}
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
