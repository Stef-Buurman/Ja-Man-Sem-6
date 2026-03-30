import React from "react";
import { Node } from "../../Types/types";

interface RouteOverlayProps {
  path: string[];
  nodes: Node[];
  currentFloor: number;
}

export const RouteOverlay: React.FC<RouteOverlayProps> = ({
  path,
  nodes,
  currentFloor,
}) => {
  const floorPath = path.filter(
    (id) => nodes.find((n) => n.id === id)?.floor === currentFloor,
  );
  const points = floorPath
    .map((id) => {
      const n = nodes.find((n) => n.id === id)!;
      return `${n.x},${n.y}`;
    })
    .join(" ");

  if (!points) return null;

  return <polyline points={points} fill="none" stroke="red" strokeWidth={3} />;
};
