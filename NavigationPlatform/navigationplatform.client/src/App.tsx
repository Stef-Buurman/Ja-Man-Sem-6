import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Pathfinding } from "./pages/Pathfinding/Pathfinding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home</div>} />
        <Route path="/pathfinding" element={<Pathfinding />} />
      </Route>
    </Routes>
  );
}

export default App;
