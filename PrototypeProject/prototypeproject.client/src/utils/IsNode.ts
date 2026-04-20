import { GraphNode } from "../Types/types";

export const IsNodeStairs = (node: GraphNode): boolean => {
  return node.type === "stairs" || node.id.toLowerCase().includes("trap");
};

export const IsNodeElevator = (node: GraphNode): boolean => {
  return node.type === "elevator" || node.id.toLowerCase().includes("lift");
};
