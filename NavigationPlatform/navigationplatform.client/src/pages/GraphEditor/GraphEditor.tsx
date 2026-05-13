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
        doors={[
          {
            "id": "H.0.305 Receptie_door",
            "x": 362,
            "y": 1027,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.305 Receptie"
          },
          {
            "id": "H.0.304_door",
            "x": 282,
            "y": 948,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.304"
          },
          {
            "id": "H.0.309_door",
            "x": 311,
            "y": 812,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.309"
          },
          {
            "id": "H.0.319_door",
            "x": 219,
            "y": 405,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.319"
          },
          {
            "id": "H.0.321_door",
            "x": 204,
            "y": 320,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.321"
          },
          {
            "id": "H.0.405_door",
            "x": 351,
            "y": 252,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.405"
          },
          {
            "id": "H.0.104_door",
            "x": 448,
            "y": 267,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.104"
          },
          {
            "id": "H.0.103_door",
            "x": 441,
            "y": 226,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.103"
          },
          {
            "id": "H.0.107_door",
            "x": 498,
            "y": 360,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.107"
          },
          {
            "id": "H.0.110 Kantine_door",
            "x": 545,
            "y": 564,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.110 Kantine"
          },
          {
            "id": "H.0.115_door",
            "x": 547,
            "y": 723,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.115"
          },
          {
            "id": "H.0.116_door",
            "x": 556,
            "y": 767,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.116"
          },
          {
            "id": "H.0.117_door",
            "x": 567,
            "y": 811,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.117"
          },
          {
            "id": "H.0.118_door",
            "x": 578,
            "y": 859,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.118"
          },
          {
            "id": "H.0.119 Lift1_door",
            "x": 595,
            "y": 937,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.119 Lift1"
          },
          {
            "id": "H.0.120 Lift2_door",
            "x": 599,
            "y": 972,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.120 Lift2"
          },
          {
            "id": "H.0.409 Lift3_door",
            "x": 669,
            "y": 1026,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.409 Lift3"
          },
          {
            "id": "WD.00.032 Trap2_door",
            "x": 809,
            "y": 741,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.032 Trap2"
          },
          {
            "id": "WD.00.029_door",
            "x": 788,
            "y": 806,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.029"
          },
          {
            "id": "WD.00.034_door",
            "x": 1004,
            "y": 817,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.034"
          },
          {
            "id": "WD.00.004_door",
            "x": 1088,
            "y": 806,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.004"
          },
          {
            "id": "WD.00.018_door",
            "x": 1033,
            "y": 978,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.018"
          },
          {
            "id": "WD.00.000 Trap1_door",
            "x": 1000,
            "y": 912,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.000 Trap1"
          },
          {
            "id": "WD.00.015_door",
            "x": 1264,
            "y": 812,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.015"
          },
          {
            "id": "WN.00.029_door",
            "x": 1381,
            "y": 761,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.029"
          },
          {
            "id": "WN.00.030 Trap2_door",
            "x": 1417,
            "y": 724,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.030 Trap2"
          },
          {
            "id": "WN.00.024_door",
            "x": 1592,
            "y": 732,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.024"
          },
          {
            "id": "WN.00.099_door",
            "x": 1787,
            "y": 706,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.099"
          },
          {
            "id": "WN.00.019 Stadslab_door",
            "x": 1745,
            "y": 855,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.019 Stadslab"
          },
          {
            "id": "WN.00.021_door",
            "x": 1875,
            "y": 687,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.021"
          },
          {
            "id": "WN.00.004 Lift_door",
            "x": 2096,
            "y": 639,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.004 Lift"
          },
          {
            "id": "WN.00.003 Trap1_door",
            "x": 2120,
            "y": 669,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.003 Trap1"
          },
          {
            "id": "WN.00.005_door",
            "x": 2178,
            "y": 585,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.005"
          },
          {
            "id": "WN.00.008_door",
            "x": 2183,
            "y": 756,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.008"
          },
          {
            "id": "WN.00.028_door",
            "x": 1388,
            "y": 807,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WN.00.028"
          },
          {
            "id": "WD.00.000 Lift1_door",
            "x": 913,
            "y": 923,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "WD.00.000 Lift1"
          },
          {
            "id": "H.0.122 Trap1_door",
            "x": 677,
            "y": 1069,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.122 Trap1"
          },
          {
            "id": "H.0.322a2_door",
            "x": 133,
            "y": 259,
            "floor": 0,
            "type": 1,
            "width": 20,
            "height": 20,
            "roomId": "H.0.322a2"
          },
          {
            "id": "H.0.119 Lift1",
            "x": 595,
            "y": 937,
            "floor": 0,
            "type": 5,
            "width": 20,
            "height": 20
          },
          {
            "id": "H.0.120 Lift2",
            "x": 599,
            "y": 972,
            "floor": 0,
            "type": 5,
            "width": 20,
            "height": 20
          },
          {
            "id": "H.0.409 Lift3",
            "x": 669,
            "y": 1026,
            "floor": 0,
            "type": 5,
            "width": 20,
            "height": 20
          },
          {
            "id": "WD.00.032 Trap2",
            "x": 809,
            "y": 741,
            "floor": 0,
            "type": 4,
            "width": 20,
            "height": 20
          },
          {
            "id": "WD.00.000 Trap1",
            "x": 1000,
            "y": 912,
            "floor": 0,
            "type": 4,
            "width": 20,
            "height": 20
          },
          {
            "id": "WN.00.030 Trap2",
            "x": 1417,
            "y": 724,
            "floor": 0,
            "type": 4,
            "width": 20,
            "height": 20
          },
          {
            "id": "WN.00.004 Lift",
            "x": 2096,
            "y": 639,
            "floor": 0,
            "type": 5,
            "width": 20,
            "height": 20
          },
          {
            "id": "WN.00.003 Trap1",
            "x": 2120,
            "y": 669,
            "floor": 0,
            "type": 4,
            "width": 20,
            "height": 20
          },
          {
            "id": "WD.00.000 Lift1",
            "x": 913,
            "y": 923,
            "floor": 0,
            "type": 5,
            "width": 20,
            "height": 20
          },
          {
            "id": "H.0.122 Trap1",
            "x": 677,
            "y": 1069,
            "floor": 0,
            "type": 4,
            "width": 20,
            "height": 20
          }
        ]}
        floors={floors}
      />
    </>
  );
};
