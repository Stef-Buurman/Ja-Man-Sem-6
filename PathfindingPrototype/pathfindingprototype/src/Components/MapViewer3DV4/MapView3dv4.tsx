import React, { useEffect } from "react";
import { Edge, Node } from "../../Types/types";
import "./MapView3dv4.css";

interface MapViewProps {
  nodes: Node[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: React.FC<React.SVGProps<SVGSVGElement>>[];
}

export const MapView3dV4: React.FC<MapViewProps> = ({ nodes, edges, currentFloor, path, handleRoomClick = () => { }, floors }) => {
  const svgElement = React.useRef<SVGSVGElement>(null);
  const [elements, setElements] = React.useState<SVGPolygonElement[]>([]);
  const [doors, setDoors] = React.useState<SVGCircleElement[]>([]);
  const [images, setImages] = React.useState<SVGImageElement[]>([]);
  const [grounds, setGrounds] = React.useState<SVGPolygonElement[]>([]);

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
      const imageGroup = svgElement.current.getElementById("_3D_blokken");
      if (imageGroup) {
        const images = imageGroup.querySelectorAll("image");
        setImages(Array.from(images));
      }
      const groundGroup = svgElement.current.getElementById("Ondergrond");
      if (groundGroup) {
        const grounds = groundGroup.querySelectorAll("polygon");
        setGrounds(Array.from(grounds));
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

  const SelectedFloor = floors?.[currentFloor - 1];

  return (
    <>
      <button onClick={copyDoors}>Copy doors</button>
      <svg width={1200} height={800} className="MapView3d2">
        {SelectedFloor && <SelectedFloor ref={svgElement} width={453} height={627} style={{ display: "none" }} />}
        {grounds.map((ground) => (
          <polygon
            key={ground.id}
            points={ground.getAttribute("points") || undefined}
            className="cls-3"
          />
        ))}
        {images.map((img) => {
          const x = parseFloat(img.getAttribute("x") || "0");
          const y = parseFloat(img.getAttribute("y") || "0");
          const width: number = parseInt(img.getAttribute("width") || "0") || 0;
          const height: number = parseInt(img.getAttribute("height") || "0") || 0;
          const randomInt = Math.floor(Math.random() * 10000);
          return (
            <image
              key={randomInt}
              x={x}
              y={y}
              transform={img.getAttribute("transform") || undefined}
              width={width}
              height={height}
              href={img.getAttribute("xlink:href") || undefined}
            />
          );
        })}
        {elements.map((el) => {
          const roomId = el.id;
          const parts = roomId.split(".");
          parts[1] = currentFloor.toString();
          const result = parts.join(".");
          return (
            <polygon
              key={result}
              id={result}
              onClick={() => handleRoomClick(result)}
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
      </svg>
    </>
  );
};
