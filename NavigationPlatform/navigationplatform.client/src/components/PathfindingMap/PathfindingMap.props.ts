import type { GraphNode, Edge, Floor } from "../../Types/types";

export interface PathfindingMapProps {
  nodes: GraphNode[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: Floor[];
}
