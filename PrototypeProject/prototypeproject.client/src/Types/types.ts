export type NodeType = "room" | "door" | "hallway" | "intersection" | "stairs" | "elevator" | "entrance";

export type GraphNode = {
  id: string;
  x: number;
  y: number;
  floor: number;
  type: NodeType;
  width?: number;
  height?: number;

  roomId?: string;
  label?: string;
};

export interface Edge {
  from: string;
  to: string;
  weight?: number;
}

export interface Graph {
  nodes: GraphNode[];
  edges: Edge[];
}

export type Floor = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  floorNumber: number;
};
