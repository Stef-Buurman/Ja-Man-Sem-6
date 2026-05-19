import React, { useEffect, useRef, useState } from "react";
import "./HeatmapMap.css";
import type { HeatmapMapProps } from "./HeatmapMap.props";

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
  const getGradientId = (areaId: number) => `heat-grad-${areaId}`;

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

  return (
    <div className="map-view-v4">
      {/* <button className="map-view-v4__copy-button" onClick={copyDoors}>
        📋 Copy doors
      </button> */}

      <div className="map-view-v4__svg-wrapper">
        <svg ref={svgElement} viewBox={viewBox || "0 0 1000 1000"} className="MapView3d4" onClick={onSvgClick}>
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
            transform="translate(-100 40) rotate(-8.4)"
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
    </div>
  );
};
