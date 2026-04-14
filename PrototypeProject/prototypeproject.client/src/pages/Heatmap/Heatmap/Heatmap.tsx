import React, { useEffect, useState } from "react";
import test3 from "../../../assets/2e_verdieping.svg";
import * as signalR from "@microsoft/signalr";
import type { HeatPoint, HeatpointArea } from "../../../api/data-contracts";

const API_URL = "/api/heatmap";

const Heatmap: React.FC = () => {
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const fetchHeatmap = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPoints(data);
    } catch (err) {
      console.error("Failed to fetch heatmap points:", err);
    }
  };

  const fetchHeatmapAreas = async () => {
    try {
      const res = await fetch(`${API_URL}/areas`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAreas(data);
    } catch (err) {
      console.error("Failed to fetch heatmap areas:", err);
    }
  };

  useEffect(() => {
    let isActive = true;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/api/heatmapHub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceivePoint", () => {
      if (isActive) {
        fetchHeatmap();
      }
    });

    connection.on("ReceiveAreaUpdate", () => {
      if (isActive) {
        fetchHeatmapAreas();
      }
    });

    const start = async () => {
      try {
        await connection.start();
        console.log("SignalR connected");

        if (isActive) {
          await fetchHeatmap();
          await fetchHeatmapAreas();
        }
      } catch (err) {
        if (isActive) {
          console.error("Failed to start connection:", err);
        }
      }
    };

    void start();

    return () => {
      isActive = false;
      connection.off("ReceivePoint");
      connection.off("ReceiveAreaUpdate");
      void connection.stop();
    };
  }, []);

  const getColor = (value: number) => {
    if (value <= 3) {
      const ratio = value / 3;
      const r = 0;
      const g = Math.round(150 + 105 * ratio);
      const b = 0;
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    if (value <= 10) {
      const ratio = (value - 3) / 7;
      const r = Math.round(255 * ratio);
      const g = 255;
      const b = 0;
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    const max = 20;
    const ratio = Math.min(1, (value - 10) / (max - 10));
    const r = 255;
    const g = Math.round(255 * (1 - ratio));
    const b = 0;
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  const generateHeatPoints = (x: number, y: number, value: number) => {
    const generatedPoints = [];
    const spread = 80;
    const density = 500;

    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * spread;

      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      generatedPoints.push({
        x: x + offsetX,
        y: y + offsetY,
        opacity: 1 - radius / spread,
        value,
      });
    }

    return generatedPoints;
  };

  return (
    <div>
      <svg
        viewBox="0 0 454 627.31"
        style={{ width: "400px", border: "1px solid black" }}
      >
        <image href={test3} x="0" y="0" width="454" height="627.31" />

        <defs>
          <filter id="heat-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {areas.flatMap((a) =>
          generateHeatPoints(a.x + 25, a.y + 25, a.value).map((p, i) => (
            <circle
              key={`${a.id}-${i}`}
              cx={p.x}
              cy={p.y}
              r={5}
              fill={getColor(p.value)}
              opacity={p.opacity}
              filter="url(#heat-blur)"
            />
          )),
        )}
      </svg>
    </div>
  );
};

export default Heatmap;
