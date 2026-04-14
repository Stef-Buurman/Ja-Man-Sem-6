import { Route, Routes } from "react-router-dom";
import EncryptionPage from "./pages/EncryptionPage/EncryptionPage";
import { Layout } from "./components/Layout/Layout";
import { PathFinding3DV3 } from "./pages/PathFinding/3DPathFindingV3/3DPathFindingV3";
import { PathFinding3DV4 } from "./pages/PathFinding/3DPathFindingV4/3DPathFindingV4";
import { PathFinding3DV2 } from "./pages/PathFinding/3DPathFindingV2/3DPathFindingV2";
import { PathFinding3DV1 } from "./pages/PathFinding/3DPathFindingV1/3DPathFindingV1";
import { GraphEditor } from "./components/PathFinding/GraphEditor/GraphEditor";
import { graph3d2v4 } from "./components/data/graph3dv4";
import Verdieping3 from "./assets/Verdieping3_2.svg";
import "./App.css";
import { PathFinding2DV1 } from "./pages/PathFinding/2DPathFindingV1/2DPathFindingV1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="/2dV1" element={<PathFinding2DV1 />} />
        <Route path="Encryption" element={<EncryptionPage />} />
        <Route path="/3dV1" element={<PathFinding3DV1 />} />
        <Route path="/3dV2" element={<PathFinding3DV2 />} />
        <Route path="/3dV3" element={<PathFinding3DV3 />} />
        <Route path="/3dV4" element={<PathFinding3DV4 />} />
        <Route
          path="/editor"
          element={
            <GraphEditor
              curFloor={1}
              initialGraph={graph3d2v4}
              // doors={[
              //   { id: "H.3.403_door", x: 240, y: 320, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.319_door", x: 229, y: 383, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.312_door", x: 294, y: 673, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.308_door", x: 324, y: 812, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.306_door", x: 360, y: 974, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.206_door", x: 390, y: 1005, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.204_door", x: 477, y: 994, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.Trap1_door", x: 691, y: 1070, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.Lift1_door", x: 686, y: 1037, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.Lift2_door", x: 615, y: 972, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.Lift3_door", x: 609, y: 940, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.Trap2_door", x: 462, y: 242, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.117_door", x: 590, y: 819, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.116_door", x: 580, y: 775, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.114_door", x: 562, y: 695, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.111_door", x: 544, y: 611, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.109_door", x: 526, y: 530, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.107_door", x: 503, y: 396, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.104_door", x: 478, y: 275, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.318_door", x: 240, y: 434, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "H.3.405_door", x: 303, y: 309, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.023_door", x: 821, y: 1018, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.021_door", x: 923, y: 1002, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.019_door", x: 1024, y: 991, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.Trap1_door", x: 990, y: 906, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.lift_door", x: 922, y: 908, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.Trap2_door", x: 812, y: 732, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.028_door", x: 805, y: 859, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.029_door", x: 793, y: 810, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.030_door", x: 787, y: 778, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.033_door", x: 863, y: 829, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WD.03.005_door", x: 1308, y: 870, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.029_door", x: 1426, y: 758, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.028_door", x: 1462, y: 752, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.022_door", x: 1779, y: 786, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.017_door", x: 2004, y: 755, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.014_door", x: 2167, y: 733, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.007_door", x: 2189, y: 699, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.Trap1_door", x: 2156, y: 661, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.Lift_door", x: 2113, y: 624, floor: 1, type: "door", width: 20, height: 20 },
              //   { id: "WN.03.Trap2_door", x: 1422, y: 713, floor: 1, type: "door", width: 20, height: 20 },
              // ]}
              background={
                <>
                  <image href={Verdieping3} width={2412.61} height={1344.75} />
                </>
              }
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
