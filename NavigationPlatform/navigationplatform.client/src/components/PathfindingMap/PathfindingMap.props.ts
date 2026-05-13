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
    altitude?: number;
    accuracy?: number;
    latitude?: number;
    longitude?: number;
  };
  areas?: HeatpointArea[];
  showHeatmap?: boolean;
  showRoutes?: boolean;
}
