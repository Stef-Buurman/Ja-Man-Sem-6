import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Pathfinding } from "./pages/Pathfinding/Pathfinding";
import { GraphEditorPage } from "./pages/GraphEditor/GraphEditor";
import HeatmapEditor from "./pages/HeatmapEditor/HeatmapEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout isAdmin={false} />}>
        <Route index element={<Pathfinding />} />
        <Route path="/:floor/:x/:y" element={<Pathfinding />} />
        <Route path="/:destination" element={<Pathfinding />} />
        <Route path="/:floor/:x/:y/:destination" element={<Pathfinding />} />
      </Route>
      <Route path="/admin" element={<Layout isAdmin={true} />}>
        <Route path="/admin/graph-editor" element={<GraphEditorPage  />} />
        <Route path="/admin/heatmap-editor" element={<HeatmapEditor />} />
      </Route>
    </Routes>
  );
}

export default App;
