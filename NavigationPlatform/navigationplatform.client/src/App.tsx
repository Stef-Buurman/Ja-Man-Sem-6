import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Pathfinding } from "./pages/Pathfinding/Pathfinding";
import { GraphEditorPage } from "./pages/GraphEditor/GraphEditor";
import HeatmapEditor from "./pages/HeatmapEditor/HeatmapEditor";
import { Heatmap } from "./pages/Heatmap/Heatmap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pathfinding />} />
        <Route path="/from/:floor/:x/:y" element={<Pathfinding />} />
        <Route path="/to/:destination" element={<Pathfinding />} />
        <Route path="/from/:floor/:x/:y/to/:destination" element={<Pathfinding />} />
        <Route path="/to/:destination/from/:floor/:x/:y" element={<Pathfinding />} />
        <Route path="/to/:destFloor/:destX/:destY" element={<Pathfinding />} />
        <Route path="/from/:floor/:x/:y/to/:destFloor/:destX/:destY" element={<Pathfinding />} />
        <Route path="/to/:destFloor/:destX/:destY/from/:floor/:x/:y" element={<Pathfinding />} />
        <Route path="/heatmap" element={<Heatmap />} />
      </Route>
      <Route path="/admin" element={<Layout />}>
        <Route path="/admin/graph-editor" element={<GraphEditorPage />} />
        <Route path="/admin/heatmap-editor" element={<HeatmapEditor />} />
      </Route>
    </Routes>
  );
}

export default App;
