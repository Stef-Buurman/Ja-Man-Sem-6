export type Floor = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  floorNumber: number;
};

export type PathfindingSettings = {
  accessibleRoute: boolean;
};
