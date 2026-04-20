import "./GraphEditor.css";
import Verdieping3 from "../../../assets/Verdieping3_2.svg?react";
import { GraphEditor } from "../../../components/PathFinding/GraphEditor/GraphEditor";
import { graph3d2v4 } from "../../../components/data/graph3dv4";
import { useState } from "react";
import { FloorSelector } from "../../../components/PathFinding/FloorSelector/FloorSelector";
import type { Floor } from "../../../Types/types";

export const GraphEditorPage: React.FC = () => {
  const [floors] = useState<Floor[]>([{ svg: Verdieping3, floorNumber: 3 }]);
  const [currentFloor, setCurrentFloor] = useState<number>(3);
  return (
    <>
      <FloorSelector floors={floors.map((f) => f.floorNumber)} currentFloor={currentFloor} setFloor={setCurrentFloor} />
      <GraphEditor
        curFloor={currentFloor}
        initialGraph={graph3d2v4}
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
