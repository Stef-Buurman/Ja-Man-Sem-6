import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Pathfinding } from "./pages/Pathfinding/Pathfinding";
import { GraphEditorPage } from "./pages/GraphEditor/GraphEditor";
import HeatmapEditor from "./pages/HeatmapEditor/HeatmapEditor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="/pathfinding" element={<Pathfinding />} />
        <Route path="/pathfinding/:floor/:x/:y" element={<Pathfinding />} />
        <Route path="/graph-editor" element={<GraphEditorPage />} />
        <Route path="/heatmap/editor" element={<HeatmapEditor />} />
      </Route>
    </Routes>
  );
}

export default App;
