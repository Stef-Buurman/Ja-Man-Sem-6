import type { FloorDto, GraphEdgeDto, GraphNodeDto, HeatpointArea } from "../../api/data-contracts";

export interface PathfindingMapProps {
  nodes: GraphNodeDto[];
  edges: GraphEdgeDto[];
  currentFloor: number;
  path?: string[];
  handleRoomClick?: (roomId: string) => void;
  floors?: FloorDto[];
  currentPosition?: {
    x: number;
    y: number;
    floor: number;
  };
  destination?: {
    x: number;
    y: number;
    floor: number;
  };
}
