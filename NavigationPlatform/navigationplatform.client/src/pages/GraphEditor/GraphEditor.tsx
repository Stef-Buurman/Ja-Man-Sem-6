import "./GraphEditor.css";
import { GraphEditor } from "../../components/GraphEditor/GraphEditor";
import { useEffect, useState } from "react";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import type { FloorDto, GraphDto } from "../../api/data-contracts";
import { getGraph } from "../../api/methods/Graph.api";
import { FloorCache } from "../../utils/CachedMethods";

export const GraphEditorPage: React.FC = () => {
  const [floors, setFloors] = useState<FloorDto[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  const [currentGraph, setCurrentGraph] = useState<GraphDto | undefined>(undefined);
  const floorChangeHandler = (floor: number) => {
    setCurrentFloor(floor);
  };
  useEffect(() => {
    const fetchGraph = async () => {
      const res = await getGraph(
        { Floor: currentFloor },
        {
          toastSuccess: {
            message: `Graph for floor ${currentFloor} loaded successfully!`,
          },
        },
      );
      if (res.ok) {
        setCurrentGraph(res.response);
      }
    };
    fetchGraph();
  }, [currentFloor]);

  const fetchFloors = async () => {
    try {
      const res = await FloorCache();
      if (res.ok) {
        const sortedFloors = res.response.sort((a, b) => a.number - b.number);
        setFloors(sortedFloors);
      }
    } catch (error) {
      console.error("Failed to fetch floors:", error);
    }
  };

  useEffect(() => {
    fetchFloors();
  }, []);
  return (
    <>
      <FloorSelector floors={floors.map((f) => f.number)} currentFloor={currentFloor} setFloor={floorChangeHandler} />
      <GraphEditor curFloor={currentFloor} initialGraph={currentGraph} floors={floors} doors={[{ id: "WN.02.029_door", x: 1431, y: 761, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.029" },
      { id: "WN.02.028_door", x: 1488, y: 754, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.028" },
      { id: "WN.02.022_door", x: 1779, y: 786, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.022" },
      { id: "WN.02.026_door", x: 1565, y: 820, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.026" },
      { id: "WN.02.017_door", x: 2004, y: 755, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.017" },
      { id: "WN.02.014_door", x: 2167, y: 733, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.014" },
      { id: "WN.02.007_door", x: 2189, y: 699, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.007" },
      { id: "WN.02.Trap1_door", x: 2161, y: 663, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.Trap1" },
      { id: "WN.02.Lift_door", x: 2113, y: 630, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.Lift" },
      { id: "WN.02.Trap2_door", x: 1429, y: 724, floor: 2, type: 1, width: 20, height: 20, roomId: "WN.02.Trap2" },
      { id: "WD.02.019_door", x: 965, y: 974, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.019" },
      { id: "WD.02.016_door", x: 1148, y: 931, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.016" },
      { id: "WD.02.Trap1_door", x: 990, y: 906, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.Trap1" },
      { id: "WD.02.lift_door", x: 922, y: 908, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.lift" },
      { id: "WD.02.Trap2_door", x: 819, y: 730, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.Trap2" },
      { id: "WD.02.028_door", x: 816, y: 854, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.028" },
      { id: "WD.02.029_door", x: 805, y: 808, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.029" },
      { id: "WD.02.030_door", x: 798, y: 768, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.030" },
      { id: "WD.02.002_door", x: 863, y: 829, floor: 2, type: 1, width: 20, height: 20, roomId: "WD.02.002" },
      { id: "H.2.403_door", x: 240, y: 320, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.403" },
      { id: "H.2.318_door", x: 229, y: 383, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.318" },
      { id: "H.2.312_door", x: 294, y: 673, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.312" },
      { id: "H.2.308_door", x: 324, y: 812, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.308" },
      { id: "H.2.306_door", x: 360, y: 974, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.306" },
      { id: "H.2.204_door", x: 390, y: 1005, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.204" },
      { id: "H.2.Trap1_door", x: 691, y: 1070, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.Trap1" },
      { id: "H.2.Lift1_door", x: 686, y: 1037, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.Lift1" },
      { id: "H.2.Lift2_door", x: 615, y: 972, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.Lift2" },
      { id: "H.2.Lift3_door", x: 609, y: 940, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.Lift3" },
      { id: "H.2.Trap2_door", x: 462, y: 242, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.Trap2" },
      { id: "H.2.117_door", x: 590, y: 819, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.117" },
      { id: "H.2.116_door", x: 580, y: 775, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.116" },
      { id: "H.2.114_door", x: 562, y: 695, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.114" },
      { id: "H.2.112_door", x: 544, y: 611, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.112" },
      { id: "H.2.111_door", x: 526, y: 530, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.111" },
      { id: "H.2.107_door", x: 503, y: 396, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.107" },
      { id: "H.2.104_door", x: 478, y: 275, floor: 2, type: 1, width: 20, height: 20, roomId: "H.2.104" },
      { id: "WN.02.Trap1", x: 2161, y: 663, floor: 2, type: 4, width: 20, height: 20 },
      { id: "WN.02.Lift", x: 2113, y: 630, floor: 2, type: 5, width: 20, height: 20 },
      { id: "WN.02.Trap2", x: 1429, y: 724, floor: 2, type: 4, width: 20, height: 20 },
      { id: "WD.02.Trap1", x: 990, y: 906, floor: 2, type: 4, width: 20, height: 20 },
      { id: "WD.02.lift", x: 922, y: 908, floor: 2, type: 5, width: 20, height: 20 },
      { id: "WD.02.Trap2", x: 819, y: 730, floor: 2, type: 4, width: 20, height: 20 },
      { id: "H.2.Trap1", x: 691, y: 1070, floor: 2, type: 4, width: 20, height: 20 },
      { id: "H.2.Lift1", x: 686, y: 1037, floor: 2, type: 5, width: 20, height: 20 },
      { id: "H.2.Lift2", x: 615, y: 972, floor: 2, type: 5, width: 20, height: 20 },
      { id: "H.2.Lift3", x: 609, y: 940, floor: 2, type: 5, width: 20, height: 20 },
      { id: "H.2.Trap2", x: 462, y: 242, floor: 2, type: 4, width: 20, height: 20 },]} />
    </>
  );
};
