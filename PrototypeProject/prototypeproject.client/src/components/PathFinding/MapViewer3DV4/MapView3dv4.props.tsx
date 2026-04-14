import type { GraphNode, Edge, Floor } from "../../../Types/types";

export interface MapView3dv4Props {
  nodes: GraphNode[];
  edges: Edge[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: Floor[];
}
