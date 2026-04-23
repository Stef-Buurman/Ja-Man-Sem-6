import type { GraphEdgeDto, GraphNodeDto } from "../../api/data-contracts";
import type { Floor } from "../../Types/types";

export interface PathfindingMapProps {
  nodes: GraphNodeDto[];
  edges: GraphEdgeDto[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: Floor[];
}
