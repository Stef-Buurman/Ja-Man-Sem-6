import "./3DPathFindingV1.css";
import { MapViewer3DV1 } from "../../../components/PathFinding/MapViewer3DV1/MapView3dv1";
import { graph3dv1 } from "../../../components/data/graph3dv1";

export const PathFinding3DV1: React.FC = () => {
  return (
    <MapViewer3DV1
      nodes={graph3dv1.nodes}
      edges={graph3dv1.edges}
      currentFloor={0}
      path={[]}
    />
  );
};
