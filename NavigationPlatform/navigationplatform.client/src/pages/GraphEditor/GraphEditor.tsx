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
      <FloorSelector
        floors={floors.map((f) => f.number)}
        currentFloor={currentFloor}
        setFloor={floorChangeHandler}
      />
      <GraphEditor
        curFloor={currentFloor}
        initialGraph={currentGraph}
        //         doors={[
        // { id: "H.3.403_door", x: 240, y: 320, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.403" },
        // { id: "H.3.319_door", x: 229, y: 383, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.319" },
        // { id: "H.3.312_door", x: 294, y: 673, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.312" },
        // { id: "H.3.308_door", x: 324, y: 812, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.308" },
        // { id: "H.3.306_door", x: 360, y: 974, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.306" },
        // { id: "H.3.206_door", x: 390, y: 1005, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.206" },
        // { id: "H.3.204_door", x: 477, y: 994, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.204" },
        // { id: "H.3.Trap1_door", x: 691, y: 1070, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.Trap1" },
        // { id: "H.3.Lift1_door", x: 686, y: 1037, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.Lift1" },
        // { id: "H.3.Lift2_door", x: 615, y: 972, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.Lift2" },
        // { id: "H.3.Lift3_door", x: 609, y: 940, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.Lift3" },
        // { id: "H.3.Trap2_door", x: 462, y: 242, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.Trap2" },
        // { id: "H.3.117_door", x: 590, y: 819, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.117" },
        // { id: "H.3.116_door", x: 580, y: 775, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.116" },
        // { id: "H.3.114_door", x: 562, y: 695, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.114" },
        // { id: "H.3.111_door", x: 544, y: 611, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.111" },
        // { id: "H.3.109_door", x: 526, y: 530, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.109" },
        // { id: "H.3.107_door", x: 503, y: 396, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.107" },
        // { id: "H.3.104_door", x: 478, y: 275, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.104" },
        // { id: "H.3.318_door", x: 240, y: 434, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.318" },
        // { id: "H.3.405_door", x: 303, y: 309, floor: 3, type: "door", width: 20, height: 20 ,roomId: "H.3.405" },
        // { id: "WD.03.023_door", x: 821, y: 1018, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.023" },
        // { id: "WD.03.021_door", x: 923, y: 1002, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.021" },
        // { id: "WD.03.019_door", x: 1024, y: 991, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.019" },
        // { id: "WD.03.Trap1_door", x: 990, y: 906, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.Trap1" },
        // { id: "WD.03.lift_door", x: 922, y: 908, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.lift" },
        // { id: "WD.03.Trap2_door", x: 812, y: 732, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.Trap2" },
        // { id: "WD.03.028_door", x: 805, y: 859, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.028" },
        // { id: "WD.03.029_door", x: 793, y: 810, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.029" },
        // { id: "WD.03.030_door", x: 787, y: 778, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.030" },
        // { id: "WD.03.033_door", x: 863, y: 829, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.033" },
        // { id: "WD.03.005_door", x: 1308, y: 870, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WD.03.005" },
        // { id: "WN.03.029_door", x: 1426, y: 758, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.029" },
        // { id: "WN.03.028_door", x: 1462, y: 752, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.028" },
        // { id: "WN.03.022_door", x: 1779, y: 786, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.022" },
        // { id: "WN.03.017_door", x: 2004, y: 755, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.017" },
        // { id: "WN.03.014_door", x: 2167, y: 733, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.014" },
        // { id: "WN.03.007_door", x: 2189, y: 699, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.007" },
        // { id: "WN.03.Trap1_door", x: 2156, y: 661, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.Trap1" },
        // { id: "WN.03.Lift_door", x: 2113, y: 624, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.Lift" },
        // { id: "WN.03.Trap2_door", x: 1422, y: 713, floor: 3, type: "door", width: 20, height: 20 ,roomId: "WN.03.Trap2" },
        // { id: "H.3.Trap1", x: 691, y: 1070, floor: 3, type: "stairs", width: 20, height: 20  },
        // { id: "H.3.Lift1", x: 686, y: 1037, floor: 3, type: "elevator", width: 20, height: 20  },
        // { id: "H.3.Lift2", x: 615, y: 972, floor: 3, type: "elevator", width: 20, height: 20  },
        // { id: "H.3.Lift3", x: 609, y: 940, floor: 3, type: "elevator", width: 20, height: 20  },
        // { id: "H.3.Trap2", x: 462, y: 242, floor: 3, type: "stairs", width: 20, height: 20  },
        // { id: "WD.03.Trap1", x: 990, y: 906, floor: 3, type: "stairs", width: 20, height: 20  },
        // { id: "WD.03.lift", x: 922, y: 908, floor: 3, type: "elevator", width: 20, height: 20  },
        // { id: "WD.03.Trap2", x: 812, y: 732, floor: 3, type: "stairs", width: 20, height: 20  },
        // { id: "WN.03.Trap1", x: 2156, y: 661, floor: 3, type: "stairs", width: 20, height: 20  },
        // { id: "WN.03.Lift", x: 2113, y: 624, floor: 3, type: "elevator", width: 20, height: 20  },
        // { id: "WN.03.Trap2", x: 1422, y: 713, floor: 3, type: "stairs", width: 20, height: 20  },
        //         ]}
        floors={floors}
      />
    </>
  );
};
