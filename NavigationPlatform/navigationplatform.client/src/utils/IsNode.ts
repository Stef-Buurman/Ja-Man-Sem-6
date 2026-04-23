import type { GraphNodeDto } from "../api/data-contracts";
import { GetNodeTypeFromInteger } from "./NodeTypeFromType";

export const IsNodeStairs = (node: GraphNodeDto): boolean => {
  return GetNodeTypeFromInteger(node.type) === "stairs" || (node.id != null && node.id.toLowerCase().includes("trap"));
};

export const IsNodeElevator = (node: GraphNodeDto): boolean => {
  return (
    GetNodeTypeFromInteger(node.type) === "elevator" || (node.id != null && node.id.toLowerCase().includes("lift"))
  );
};
