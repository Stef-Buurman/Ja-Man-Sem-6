import React, { useEffect, useState } from "react";
import test3 from "../../assets/2EVerdieping.svg";
import * as signalR from "@microsoft/signalr";
import type { HeatPointArea } from "../../Types/HeatPointArea";
import type { HeatPoint } from "../../Types/HeatPoint";

const API_URL = "/api/heatmap";

const Heatmap: React.FC = () => {
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [areas, setAreas] = useState<HeatPointArea[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5252/api/heatmapHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("Failed to start connection:", err));

    connection.on("ReceivePoint", (message: string) => {
      console.log("Received message from SignalR:", message);
      fetchHeatmap();
    });

    connection.on("ReceiveAreaUpdate", (message: string) => {
      console.log("Received message from SignalR:", message);
      fetchHeatmapAreas();
    });

    return () => {
      connection.stop();
    };
  }, []);

  const fetchHeatmap = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setPoints(data);
  };

  const fetchHeatmapAreas = async () => {
    const res = await fetch(`${API_URL}/areas`);
    const data = await res.json();
    setAreas(data);
  };

  useEffect(() => {
    fetchHeatmap();
    fetchHeatmapAreas();
  }, []);

  const getColor = (level: string) => {
    switch (level) {
      case "green":
        return "rgba(0,255,0,0.6)";
      case "yellow":
        return "rgba(255,255,0,0.6)";
      case "red":
        return "rgba(255,0,0,0.6)";
      default:
        return "rgba(0,0,255,0.6)";
    }
  };

  const getColor2 = (value: number) => {
    if (value <= 3) {
      const ratio = value / 3;
      const r = 0;
      const g = Math.round(150 + 105 * ratio);
      const b = 0;

      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    if (value <= 10) {
      const ratio = (value - 3) / (10 - 3);

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
    const points = [];
    const spread = 80;
    const density = 500;

    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * spread;

      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      points.push({
        x: x + offsetX,
        y: y + offsetY,
        opacity: 1 - radius / spread,
        value,
      });
    }

    return points;
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
              fill={getColor2(p.value)}
              opacity={p.opacity}
              filter="url(#heat-blur)"
            />
          )),
        )}

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={15 + p.value * 2}
            fill={getColor(p.level)}
          />
        ))}
      </svg>
    </div>
  );
};

export default Heatmap;
