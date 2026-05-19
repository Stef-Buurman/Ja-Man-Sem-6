import type { FloorDto, HeatpointArea } from "../../api/data-contracts";

export interface HeatmapMapProps {
  currentFloor: number;
  handleRoomClick?: (roomId: string) => void;
  floors?: FloorDto[];
  currentPosition?: {
    x: number;
    y: number;
    floor: number;
  };
  areas?: HeatpointArea[];
}
