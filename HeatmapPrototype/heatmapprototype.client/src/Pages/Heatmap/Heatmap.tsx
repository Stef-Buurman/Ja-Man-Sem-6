import React, { useEffect, useState } from "react";
import test3 from "../../assets/2EVerdieping.svg";
import * as signalR from "@microsoft/signalr";

type HeatPoint = {
  x: number;
  y: number;
  value: number;
  level: "green" | "yellow" | "red";
};

type HeatPointArea = {
  id: number;
  x: number;
  y: number;
  value: number;
  soundLevel: number;
  level: number;
  color: string;
};

const API_URL = "/api/heatmap";

const Heatmap: React.FC = () => {
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [areas, setAreas] = useState<HeatPointArea[]>([]);


  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5252/api/heatmapHub")
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log("SignalR connected"))
      .catch(err => console.error("Failed to start connection:", err));

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

  const handleClick = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const scaleX = 454 / rect.width;
    const scaleY = 627.31 / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    });
  };

  const handleAreaUpdate = async (area: HeatPointArea) => {
    await fetch(`${API_URL}/areas/${area.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(area),
    });
  }

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
    // const interval = setInterval(fetchHeatmap, 2000);
    // const areaInterval = setInterval(fetchHeatmapAreas, 2000);
    return () => {
      // clearInterval(interval);
      // clearInterval(areaInterval);
    };
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

  return (
    <div>
      <svg
        viewBox="0 0 454 627.31"
        style={{ width: "400px", border: "1px solid black" }}
        onClick={handleClick}
      >
        <image href={test3} x="0" y="0" width="454" height="627.31" />

        {areas.map((a) => (
          <rect
            key={a.id}
            x={a.x}
            y={a.y}
            width={50}
            height={50}
            fill={getColor(a.color)}
          />
        ))}

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
      {areas.map((a) => (
        <div key={a.id}>
          <label>
            X: <input type="number" value={a.x} onChange={(e) => {
              const updated = areas.map(area => 
                area.id === a.id ? { ...area, x: parseFloat(e.target.value) } : area
              );
              setAreas(updated);
            }} />
          </label>
          <label>
            Y: <input type="number" value={a.y} onChange={(e) => {
              const updated = areas.map(area => 
                area.id === a.id ? { ...area, y: parseFloat(e.target.value) } : area
              );
              setAreas(updated);
            }} />
          </label>
          <label>
            Value: <input type="number" value={a.value} onChange={(e) => {
              const updated = areas.map(area => 
                area.id === a.id ? { ...area, value: parseFloat(e.target.value) } : area
              );
              setAreas(updated);
            }} />
          </label>
        </div>
      ))}
            <button onClick={() => {
        areas.forEach(area => handleAreaUpdate(area));
      }}>Save Areas</button>
    </div>
  );
};

export default Heatmap;