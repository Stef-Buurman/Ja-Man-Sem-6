export type Floor = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  floorNumber: number;
};

export type PathfindingSettings = {
  accessibleRoute: boolean;
};

export type PathStep = {
  floor: number;
  title: string;
  instruction: string;
  nodeIds: string[];
};