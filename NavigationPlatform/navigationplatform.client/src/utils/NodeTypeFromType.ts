import type { NodeType } from "../Types/nodeType";

export const nodeTypes: NodeType[] = ["room", "door", "hallway", "intersection", "stairs", "elevator", "entrance"];

export const GetNodeTypeFromType = (type: string): NodeType => {
  return nodeTypes.includes(type as NodeType) ? (type as NodeType) : "room";
};

export const GetNodeTypeFromInteger = (type: number): NodeType => {
  if (type < 0 || type >= nodeTypes.length) {
    return "room";
  }
  return nodeTypes[type];
};

export const GetTypeFromNodeType = (reviewType: NodeType): number => {
  const index = nodeTypes.indexOf(reviewType);
  return index !== -1 ? index : -1;
};
