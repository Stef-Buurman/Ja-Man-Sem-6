import type { GraphDto, GraphNodeDto } from "../../api/data-contracts";
import type { Floor } from "../../Types/types";

export type Door = Omit<GraphNodeDto, "type"> & { type: 1 };
export type Stairs = Omit<GraphNodeDto, "type"> & { type: 4 };
export type Elevator = Omit<GraphNodeDto, "type"> & { type: 5 };

export type GraphEditorProps = {
  floors?: Floor[];
  doors?: (Door | Stairs | Elevator)[];
  curFloor?: number;
  initialGraph?: GraphDto;
};
