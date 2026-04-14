export type NodeType =
  | "hallway"
  | "room"
  | "stairs"
  | "elevator"
  | "entrance"
  | "door";

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  floor: number;
  type: NodeType;

  width?: number;
  height?: number;
}

export interface Edge {
  from: string;
  to: string;
  weight?: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: Edge[];
}
