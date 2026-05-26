import React, { useEffect, useMemo, useRef, useState } from "react";
import "./PathfindingMap.css";
import type { PathfindingMapProps } from "./PathfindingMap.props";
import type { GraphNodeDto } from "../../api/data-contracts";
import type { NodeType } from "../../Types/nodeType";
import { GetTypeFromNodeType } from "../../utils/NodeTypeFromType";

export const PathfindingMap: React.FC<PathfindingMapProps> = ({
  nodes,
  currentFloor,
  path,
  handleRoomClick = () => { },
  floors,
  currentPosition,
  destination,
}) => {
  const svgElement = useRef<SVGSVGElement>(null);
  const gottenSVGElement = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const [floorSvgContent, setFloorSvgContent] = useState<string>("");
  const pathColor = "blue";

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
          `{ id: "${d.id}", x: ${d.x}, y: ${d.y}, floor: ${d.floor}, type: ${d.type}, width: ${d.width}, height: ${d.height} ${d.roomId ? `,roomId: "${d.roomId}"` : ""} },`,
      )
      .join("\n");

    navigator.clipboard.writeText(formattedData);
  };

  const selectedFloor = floors?.find((f) => f.number === currentFloor);

  const onSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgElement.current) return;

    const svg = svgElement.current;

    const point = svg.createSVGPoint();

    point.x = e.clientX;
    point.y = e.clientY;

    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());

    console.log("SVG X:", svgPoint.x);
    console.log("SVG Y:", svgPoint.y);

    const target = e.target as Element;

    const roomGroup = target.closest("g[id^='H.'], g[id^='WN.'], g[id^='WD.']");

    console.log("Clicked room group:", roomGroup?.id);

    if (roomGroup?.id) {
      const cleanId = roomGroup.id.replace(/-\d+$/, "");
      handleRoomClick(cleanId);
      return;
    }

    const stadslabGroup = target.closest("g[id='Second_Draft']");

    if (stadslabGroup) {
      handleRoomClick("WN.00.019 Stadslab");
    }
  };

  useEffect(() => {
    if (!selectedFloor?.fileName) return;

    const loadSvg = async () => {
      const response = await fetch(`/floors/${selectedFloor.fileName}`);
      const svgText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");
      const svg = doc.querySelector("svg");

      if (!svg) return;

      const vb = svg.getAttribute("viewBox");
      if (vb) setViewBox(vb);

      setFloorSvgContent(svg.innerHTML);
    };

    loadSvg();
  }, [selectedFloor?.fileName]);

  const escapeCssAttribute = (value: string) =>
    value.replaceAll(/\\/g, "\\\\").replaceAll(/"/g, '\\"').replaceAll(" ", "_");

  const pathNodeIconCss = useMemo(() => {
    if (!path?.length) return "";

    const idsForCurrentFloor = path
      .map((nodeId) => nodes.find((n) => n.id === nodeId && n.floor === currentFloor))
      .filter((node): node is GraphNodeDto => Boolean(node))
      .flatMap((node) => {
        const ids = [node.id];

        if (node.roomId) ids.push(node.roomId);

        ids.push(`.${node.id}`);
        if (node.roomId) ids.push(`.${node.roomId}`);

        return ids;
      });

    const uniqueIds = [...new Set(idsForCurrentFloor)].filter((id) => id != null);

    if (uniqueIds.length === 0) return "";
    return uniqueIds
      .map((id) => {
        const safeId = escapeCssAttribute(id);
        return `
        [id="${safeId}"] .icon-background,
        [class~="${safeId}"] .icon-background {
          fill: ${pathColor} !important;
        }
      `;
      })
      .join("\n");
  }, [path, nodes, currentFloor]);

  return (
    <div className="map-view-v4">
      {/* <button className="map-view-v4__copy-button" onClick={copyDoors}>
        📋 Copy doors
      </button> */}

      <div className="map-view-v4__svg-wrapper">
        <svg ref={svgElement} viewBox={viewBox || "0 0 1000 1000"} className="MapView3d4" onClick={onSvgClick}>
          {floorSvgContent && <g dangerouslySetInnerHTML={{ __html: floorSvgContent }} />}
          <style>{pathNodeIconCss}</style>
          {currentPosition && currentPosition.floor === currentFloor && (
            <g transform={`translate(${currentPosition.x}, ${currentPosition.y})`} style={{ pointerEvents: "none" }}>
              <circle cx={0} cy={0} r={14} fill="#2563eb" stroke="white" strokeWidth={5} />
            </g>
          )}

          {path &&
            (() => {
              const segments: { x: number; y: number }[][] = [];
              let currentSegment: { x: number; y: number }[] = [];

              for (const id of path) {
                const node =
                  typeof id === "string" ? nodes.find((n) => n.id === id && n.floor === currentFloor) : undefined;

                if (!node) {
                  if (currentSegment.length > 0) {
                    segments.push(currentSegment);
                    currentSegment = [];
                  }
                  continue;
                }

                currentSegment.push({ x: node.x, y: node.y });
              }

              if (currentSegment.length > 0) {
                segments.push(currentSegment);
              }

              return segments.map((points, index) => {
                const pathPoints =
                  index === 0 && currentPosition && currentPosition.floor === currentFloor
                    ? [{ x: currentPosition.x, y: currentPosition.y }, ...points]
                    : points;

                if (pathPoints.length === 0) return null;

                let d = `M ${pathPoints[0].x},${pathPoints[0].y}`;

                for (let i = 0; i < pathPoints.length - 1; i++) {
                  const p0 = pathPoints[i - 1] || pathPoints[i];
                  const p1 = pathPoints[i];
                  const p2 = pathPoints[i + 1];
                  const p3 = pathPoints[i + 2] || p2;

                  const cp1x = p1.x + (p2.x - p0.x) / 6;
                  const cp1y = p1.y + (p2.y - p0.y) / 6;

                  const cp2x = p2.x - (p3.x - p1.x) / 6;
                  const cp2y = p2.y - (p3.y - p1.y) / 6;

                  d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
                }

                return (
                  <path
                    key={index}
                    d={d}
                    fill="none"
                    stroke={pathColor}
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              });
            })()}

          {destination && destination.floor === currentFloor && (
            <g
              id="SVGRepo_iconCarrier"
              transform={`translate(${destination.x - 33}, ${destination.y - 66}) scale(4)`}
            >
              <path
                className="destination-fill"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.37892 10.2236L8 16L12.6211 10.2236C13.5137 9.10788 14 7.72154 14 6.29266V6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6V6.29266C2 7.72154 2.4863 9.10788 3.37892 10.2236ZM8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
