import React, { useState } from "react";
import { graph } from "./data/graph";
import { Node } from "./Types/types";
import { findPath } from "./services/pathfinding";
import { FloorSelector } from "./Components/FloorSelector/FloorSelector";
import { MapView } from "./Components/MapViewer/MapView";
import { RouteOverlay } from "./Components/RouteOverlay/RouteOverlay";
import "./App.css";
import { MapViewer3DTest } from "./Components/MapViewer3DTest/MapView3d";
import { graph3d } from "./data/graph3d";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapView3d2 } from "./Components/MapViewer3D/MapView3d2";
import { graph3d2 } from "./data/graph3d2";
import { Layout } from "./Components/Layout/Layout";

const floors = [0, 1];

export const App: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [path, setPath] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleSelectRoom = () => {
    const newPath = findPath("entrance", selectedRoom, graph);
    setPath(newPath);
    const floor =
      (graph.nodes.find((n) => n.id === newPath[0]) as Node)?.floor ?? 0;
    setCurrentFloor(floor);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            path="/3d"
            element={<MapView3d2
              nodes={graph3d2.nodes}
              edges={graph3d2.edges}
              currentFloor={currentFloor}
              path={path}
            />}
          />
          <Route
            path="/test3d"
            element={<MapViewer3DTest
              nodes={graph3d.nodes}
              edges={graph3d.edges}
              currentFloor={currentFloor}
              path={path}
            />}
          />
          <Route
            path="/2d"
            element={<>
              <FloorSelector
                floors={floors}
                currentFloor={currentFloor}
                setFloor={setCurrentFloor}
              />
              <MapView
                nodes={graph.nodes}
                edges={graph.edges}
                currentFloor={currentFloor}
                path={path}
              />
              <RouteOverlay
                path={path}
                nodes={graph.nodes}
                currentFloor={currentFloor}
              />
              <label htmlFor="room-input">Enter Room ID:</label>
              <input
                type="text"
                id="room-input"
                onChange={(e) => setSelectedRoom(e.target.value)}
              />
              <button onClick={handleSelectRoom}>Go to Room</button>
            </>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
