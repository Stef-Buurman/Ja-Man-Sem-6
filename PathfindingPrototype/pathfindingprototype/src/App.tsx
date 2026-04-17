import React, { useState } from "react";
import { graph } from "./data/graph";
import { Node } from "./Types/types";
import { findPath } from "./services/pathfinding";
import { FloorSelector } from "./Components/FloorSelector/FloorSelector";
import { MapView } from "./Components/MapViewer/MapView";
import { RouteOverlay } from "./Components/RouteOverlay/RouteOverlay";
import "./App.css";
import { graph3dv1 } from "./data/graph3dv1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapView3dV2 } from "./Components/MapViewer3DV2/MapView3dV2";
import { graph3d2v2 } from "./data/graph3dv2";
import { Layout } from "./Components/Layout/Layout";
import { PathFinding3DV2 } from "./Pages/3DPathFindingV2/3DPathFindingV2";
import { MapViewer3DV1 } from "./Components/MapViewer3Dv1/MapView3dv1";
import { GraphEditor } from "./Components/GraphEditor/GraphEditor";
import Verdieping3 from "./assets/Verdieping3_2.svg";
import { PathFinding3DV4 } from "./Pages/3DPathFindingV4/3DPathFindingV4";
import { graph3d2v4 } from "./data/graph3dv4";

const floors = [1];

export const App: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [path, setPath] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleSelectRoom = () => {
    const newPath = findPath("entrance", selectedRoom, graph);
    setPath(newPath);
    const floor = (graph.nodes.find((n) => n.id === newPath[0]) as Node)?.floor ?? 0;
    setCurrentFloor(floor);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/3d" element={<MapView3dV2 nodes={graph3d2v2.nodes} edges={graph3d2v2.edges} currentFloor={currentFloor} path={path} />} />
          <Route path="/3dV2" element={<PathFinding3DV2 />} />
          <Route path="/3dv3" element={<PathFinding3DV4 />} />
          <Route path="/test3d" element={<MapViewer3DV1 nodes={graph3dv1.nodes} edges={graph3dv1.edges} currentFloor={currentFloor} path={path} />} />
          <Route
            path="/2d"
            element={
              <>
                <FloorSelector floors={floors} currentFloor={currentFloor} setFloor={setCurrentFloor} />
                <MapView nodes={graph.nodes} edges={graph.edges} currentFloor={currentFloor} path={path} />
                <RouteOverlay path={path} nodes={graph.nodes} currentFloor={currentFloor} />
                <label htmlFor="room-input">Enter Room ID:</label>
                <input type="text" id="room-input" onChange={(e) => setSelectedRoom(e.target.value)} />
                <button onClick={handleSelectRoom}>Go to Room</button>
              </>
            }
          />
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
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
