import React, { useEffect, useState } from "react";
import "./Heatmap.css";
import { FloorSelector } from "../../components/FloorSelector/FloorSelector";
import { type FloorDto, type HeatpointArea } from "../../api/data-contracts";
import { getHeatpointAreas } from "../../api/methods/Heatmap.api";
import * as signalR from "@microsoft/signalr";
import { FloorCache } from "../../utils/CachedMethods";
import { HeatmapMap } from "../../components/HeatmapMap/HeatmapMap";
import { Link } from "react-router-dom";
import { NavigationComponent } from "../../components/NavigationComponent/NavigationComponent";

export const Heatmap: React.FC = () => {
  const [currentFloor, setCurrentFloor] = useState<number>(0);
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

  const [activeTab, setActiveTab] = useState<"route" | "werkplek">("route");

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col">
      <div className="w-full flex justify-start px-4 relative z-50">
        <Link to="/" className="text-xs text-black font-semibold inline-block">
          {"< Vorige"}
        </Link>
      </div>

      <NavigationComponent activeTab="werkplek" />

      <div className="px-8 py-2 text-left">
        <h1 className="text-2xl font-bold text-black">Vind jouw werkplek!</h1>

        <p className="text-sm text-black">
          Klik op een gebied om de <span className="font-bold">route</span> hiernaartoe te vinden!
        </p>
      </div>

      <div className="pathfinding-shell">
        <div className="absolute top-70 right-10 xl:top-70 xl:right-100">
          <FloorSelector
            floors={floorsList.map((f) => f.number)}
            currentFloor={currentFloor}
            setFloor={setCurrentFloor}
          />
        </div>

        <section className="flex-1 min-h-0 w-full rounded-2xl overflow-hidden flex items-center justify-center">
          <HeatmapMap currentFloor={currentFloor} floors={floorsList} areas={areas} />
        </section>
        <div className="flex items-center gap-4 px-4 py-2 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>Rustig</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400" />
            <span>Gemiddeld</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>Druk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
