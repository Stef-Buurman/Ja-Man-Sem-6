import type { FloorDto, GraphDto, GraphNodeDto } from "../../api/data-contracts";

export type Door = Omit<GraphNodeDto, "type"> & { type: 1 };
export type Stairs = Omit<GraphNodeDto, "type"> & { type: 4 };
export type Elevator = Omit<GraphNodeDto, "type"> & { type: 5 };

export type GraphEditorProps = {
  floors?: FloorDto[];
  doors?: (Door | Stairs | Elevator)[];
  curFloor?: number;
  initialGraph?: GraphDto;
};
