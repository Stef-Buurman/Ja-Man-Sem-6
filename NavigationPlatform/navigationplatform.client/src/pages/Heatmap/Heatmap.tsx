import { useEffect, useState } from "react";
import "./Heatmap.css";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import { type FloorDto, type HeatpointArea } from "../../api/data-contracts";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";
import { FloorCache } from "../../utils/CachedMethods";
import { HeatmapMap } from "../../components/HeatmapMap/HeatmapMap";

export const Heatmap: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
  const [floorsList, setFloorsList] = useState<FloorDto[]>([]);

  const fetchFloors = async () => {
    const res = await FloorCache();
    if (res.ok) {
      setFloorsList(res.response);
    }
  };

  useEffect(() => {
    fetchFloors();
    fetchHeatmapAreas();
  }, []);

  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    if (res.ok) setAreas(res.response);
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/hubs/heatmaphub", {
        transport: signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    connection.onclose((err) => {
      console.log("SignalR closed", err);
    });

    connection.onreconnecting((err) => {
      console.log("SignalR reconnecting", err);
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
    });

    connection.on("ReceiveAreaUpdate", () => {
      fetchHeatmapAreas();
    });

    const start = async () => {
      try {
        await connection.start();
      } catch (err) {
        console.error("SignalR start failed:", err);
      }
    };

    void start();

    return () => {
      console.log("Stopping SignalR...");
      connection.off("ReceiveAreaUpdate");
      void connection.stop();
    };
  }, []);

  return (
    <div className="pathfinding-page">
      <div className="pathfinding-shell">
        <header className="pathfinding-header">
          <h1>Heatmap</h1>
        </header>
        <section className="pathfinding-map-toolbar">
          <div className="pathfinding-map-toolbar-right">
            <FloorSelector
              floors={floorsList.map((f) => f.number)}
              currentFloor={currentFloor}
              setFloor={setCurrentFloor}
            />
          </div>
        </section>

        <section className="pathfinding-map-card">
          <HeatmapMap currentFloor={currentFloor} floors={floorsList} areas={areas} />
        </section>
      </div>
    </div>
  );
};
