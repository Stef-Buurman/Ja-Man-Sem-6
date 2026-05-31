import React, { useEffect, useRef, useState } from "react";
import "./HeatmapMap.css";
import type { HeatmapMapProps } from "./HeatmapMap.props";
import { useNavigate } from "react-router";
import type { HeatpointArea } from "../../api/data-contracts";

export const HeatmapMap: React.FC<HeatmapMapProps> = ({
  currentFloor,
  handleRoomClick = () => {},
  floors,
  currentPosition,
  areas = [],
}) => {
  const svgElement = useRef<SVGSVGElement>(null);
  const gottenSVGElement = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!gottenSVGElement.current) return;
    const vb = gottenSVGElement.current.getAttribute("viewBox");
    if (vb) setViewBox(vb);
  }, [currentFloor, floors, handleRoomClick]);

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
      const cleanId = roomGroup.id.replace(/-\\d+$/, "");
      handleRoomClick(cleanId);
    }
  };

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

  const areasForCurrentFloor = areas.filter((a) => a.floor?.number === currentFloor);
  const getGradientId = (areaId: string) => `heat-grad-${areaId}`;

  const [floorSvgContent, setFloorSvgContent] = useState<string>("");

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

  const navigateToRoom = (heatPointArea: HeatpointArea) => {
    const x = heatPointArea.x + heatPointArea.width / 2;
    const y = heatPointArea.y + heatPointArea.height / 2;

    navigate(`/to/${heatPointArea.floor?.number}/${x}/${y}`);
  };

  const BUILDING_SLOPE = 0.065;

  const getSlopedPoints = (width: number, height: number) => {
    const drop = width * BUILDING_SLOPE;

    return `
    0,0
    ${width},${drop}
    ${width},${height + drop}
    0,${height}
  `;
  };

  const HEATMAP_ROTATION = -12.1;

  return (
    <div className="map-view-v4">
      <div className="flex-1 min-h-[300px] max-h-[65vh] w-full rounded-lg overflow-x-auto overflow-y-hidden">
        <div className="w-[180%] md:w-[125%] lg:w-[120%] xl:w-[65%] h-full">
          <svg ref={svgElement} viewBox={viewBox || "0 0 1000 1000"} className="w-full h-full block" onClick={onSvgClick}>
            {floorSvgContent && <g dangerouslySetInnerHTML={{ __html: floorSvgContent }} />}

            {currentPosition && currentPosition.floor === currentFloor && (
              <g transform={`translate(${currentPosition.x}, ${currentPosition.y})`} style={{ pointerEvents: "none" }}>
                <circle cx={0} cy={0} r={14} fill="#2563eb" stroke="white" strokeWidth={5} />
              </g>
            )}

            <defs>
              {areasForCurrentFloor.map((a) => {
                const color = getColor(a.value);

                return (
                  <pattern
                    key={`pattern-${a.id}`}
                    id={`pattern-${a.id}`}
                    patternUnits="userSpaceOnUse"
                    width="32"
                    height="32"
                    patternTransform="rotate(45)"
                  >
                    <line x1="0" y1="0" x2="0" y2="32" stroke={color} strokeWidth="25" opacity="0.35" />
                  </pattern>
                );
              })}
            </defs>

            {areasForCurrentFloor.map((a) => {
              const color = getColor(a.value);
              const points = getSlopedPoints(a.width, a.height);

              return (
                <g
                  key={a.id}
                  onClick={() => navigateToRoom(a)}
                  transform={`translate(${a.x}, ${a.y}) rotate(${HEATMAP_ROTATION})`}
                  style={{ cursor: "pointer" }}
                >
                  <polygon points={points} fill={`url(#pattern-${a.id})`} />

                  <polygon points={points} fill="none" stroke={color} strokeWidth={4} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
