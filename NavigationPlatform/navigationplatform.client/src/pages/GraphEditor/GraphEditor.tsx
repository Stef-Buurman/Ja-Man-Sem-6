import "./GraphEditor.css";
import { GraphEditor } from "../../components/GraphEditor/GraphEditor";
import React, { useEffect, useState } from "react";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import type { FloorDto, GraphDto } from "../../api/data-contracts";
import { getGraph } from "../../api/methods/Graph.api";
import { FloorCache } from "../../utils/CachedMethods";

export const GraphEditorPage: React.FC = () => {
  const [floors, setFloors] = useState<FloorDto[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
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
      <div className="absolute top-30 right-10">
        <FloorSelector floors={floors.map((f) => f.number)} currentFloor={currentFloor} setFloor={floorChangeHandler} />
      </div>
      <GraphEditor curFloor={currentFloor} initialGraph={currentGraph} floors={floors} />
    </>
  );
};
