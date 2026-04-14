import "./3DPathFindingV2.css";
import { graph3d2v2 } from "../data/graph3dv2";
import { MapView3dV2 } from "../../components/PathFinding/MapViewer3DV2/MapView3dV2";

export const PathFinding3DV2: React.FC = () => {
  return (
    <MapView3dV2
      nodes={graph3d2v2.nodes}
      edges={graph3d2v2.edges}
      currentFloor={0}
      path={[]}
    />
  );
};
