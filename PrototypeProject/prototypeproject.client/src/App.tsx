import { Route, Routes } from "react-router-dom";
import EncryptionPage from "./pages/EncryptionPage/EncryptionPage";
import { Layout } from "./components/Layout/Layout";
import { PathFinding3DV3 } from "./pages/PathFinding/3DPathFindingV3/3DPathFindingV3";
import { PathFinding3DV4 } from "./pages/PathFinding/3DPathFindingV4/3DPathFindingV4";
import { PathFinding3DV2 } from "./pages/PathFinding/3DPathFindingV2/3DPathFindingV2";
import { PathFinding3DV1 } from "./pages/PathFinding/3DPathFindingV1/3DPathFindingV1";
import "./App.css";
import { PathFinding2DV1 } from "./pages/PathFinding/2DPathFindingV1/2DPathFindingV1";
import Heatmap from "./pages/Heatmap/Heatmap/Heatmap";
import HeatmapEditor from "./pages/Heatmap/Editor/HeatmapEditor";
import { GraphEditorPage } from "./pages/PathFinding/GraphEditor/GraphEditor";

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
        <Route path="/editor" element={<HeatmapEditor />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/graph-editor" element={<GraphEditorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
