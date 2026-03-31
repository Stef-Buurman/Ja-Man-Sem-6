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
import test3 from "./assets/2e_verdieping.svg";

const floors = [0, 1];

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
                doors={[
                  { id: "H.2.403", x: 134.7, y: 125.93, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.318", x: 139.7, y: 211.05, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.312", x: 150.44, y: 255.58, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.308", x: 167.58, y: 337.75, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.306", x: 191.52, y: 441.07, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.204", x: 210.59, y: 470.79, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.219", x: 333.09, y: 429.45, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.118", x: 327.33, y: 404.96, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.117", x: 322.67, y: 382.59, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.116", x: 317.49, y: 358.73, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.215", x: 311.16, y: 337.75, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.114", x: 301.44, y: 298.66, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.112", x: 295.97, y: 275.86, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.111", x: 290.7, y: 253.65, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.107", x: 272.37, y: 167.16, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.104", x: 261.76, y: 120.91, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.120", x: 336.6, y: 444.19, floor: 0, type: "door", width: 20, height: 20 },
                  { id: "H.2.409", x: 373.01, y: 478.86, floor: 0, type: "door", width: 20, height: 20 },
                ]}
                background={
                  <>
                    <image href={test3} width={453} height={627} />
                    <g id="Platte_3D" data-name="Platte 3D">
                      <polygon
                        id={"H." + currentFloor + ".318"}
                        className="cls-2 room"
                        points="37.81 140.19 120.83 128.43 145.72 236.77 62.08 248.78 37.81 140.19"
                      />
                      <polygon
                        id={"H." + currentFloor + ".312"}
                        className="cls-2 room"
                        points="62.52 249.8 145.83 237.89 164.75 319.59 80.88 331.54 62.52 249.8"
                      />
                      <polygon
                        id={"H." + currentFloor + ".308"}
                        className="cls-2 room"
                        points="81.19 332.36 164.39 320.48 189.3 429.41 105.61 441.25 81.19 332.36"
                      />
                      <polygon
                        id={"H." + currentFloor + ".306"}
                        className="cls-2 room"
                        points="105.94 442.03 114.94 483.25 198.14 471.14 188.95 430.2 105.94 442.03"
                      />
                      <polygon
                        id={"H." + currentFloor + ".204"}
                        className="cls-2 room"
                        points="115.3 483.96 135.18 573.09 316.44 547.12 296.32 457.91 115.3 483.96"
                      />
                      <polygon
                        id={"H." + currentFloor + ".118"}
                        className="cls-2 room"
                        points="325.27 393.59 363.39 388.06 368.56 409.89 330.18 415.86 325.27 393.59"
                      />
                      <polygon
                        id={"H." + currentFloor + ".117"}
                        className="cls-2 room"
                        points="319.31 369.22 362.69 363 365.29 373.78 375.69 372.2 378.56 384.73 324.48 392.45 319.31 369.22"
                      />
                      <polygon
                        id={"H." + currentFloor + ".116"}
                        className="cls-2 room"
                        points="313.88 345.47 357.87 339.43 363.39 361.95 319.31 368.35 313.88 345.47"
                      />
                      <polygon
                        id={"H." + currentFloor + ".215"}
                        className="cls-2 room"
                        points="309.32 327.68 313 345.04 338.64 341.44 334.65 324.27 309.32 327.68"
                      />
                      <polygon
                        id={"H." + currentFloor + ".114"}
                        className="cls-2 room"
                        points="299.22 285.09 352.98 277.44 366.56 337.47 339.56 341.18 335.44 323.47 308.42 327.16 299.22 285.09"
                      />
                      <polygon
                        id={"H." + currentFloor + ".112"}
                        className="cls-2 room"
                        points="293.9 263.19 298.59 284.4 353.16 276.61 348.41 255.37 293.9 263.19"
                      />
                      <polygon
                        id={"H." + currentFloor + ".111"}
                        className="cls-2 room"
                        points="293.67 262.34 347.75 254.75 333.32 190.49 279.59 197.97 293.67 262.34"
                      />
                      <polygon
                        id={"H." + currentFloor + ".107"}
                        className="cls-2 room"
                        points="274.6 175.8 322.31 169.01 312.82 127.28 296.19 129.5 294.75 124.28 264.07 128.72 274.6 175.8"
                      />
                      <polygon
                        id={"H." + currentFloor + ".104"}
                        className="cls-2 room"
                        points="313.78 126.44 296.61 129.05 295.42 123.6 263.54 128.21 255.35 91.34 304.27 84.41 313.78 126.44"
                      />
                      <polygon
                        id={"H." + currentFloor + ".219"}
                        className="cls-2 room"
                        points="331.99 422.61 366.59 417.6 369.52 429.5 334.76 434.46 331.99 422.61"
                      />
                      <polygon
                        id={"H." + currentFloor + ".120"}
                        className="cls-2 room"
                        points="335.28 437.02 337.99 448.87 372.65 443.86 369.99 432.06 335.28 437.02"
                      />
                      <polygon
                        id={"H." + currentFloor + ".409"}
                        className="cls-2 room"
                        points="359.61 458.52 374.27 456.59 379.28 477.47 364.4 479.45 359.61 458.52"
                      />
                      <polygon
                        id={"H." + currentFloor + ".403"}
                        className="cls-2 room"
                        points="17.66 50.15 204.92 23.19 225.07 112.53 37.31 139.5 17.66 50.15"
                      />
                    </g>
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
