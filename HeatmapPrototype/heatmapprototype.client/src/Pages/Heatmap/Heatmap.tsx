import React, { useEffect, useState } from "react";

type HeatPoint = {
  x: number;
  y: number;
  value: number;
};

const API_URL = "http://localhost:5252/api/heatmap";

const Heatmap: React.FC = () => {
  const [points, setPoints] = useState<HeatPoint[]>([]);

  const handleClick = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x, y }),
      });
    } catch (err) {
      console.error("Error sending point:", err);
    }
  };

  const fetchHeatmap = async () => {
    try {
      const res = await fetch(API_URL);
      const data: HeatPoint[] = await res.json();
      setPoints(data);
    } catch (err) {
      console.error("Error fetching heatmap:", err);
    }
  };

  useEffect(() => {
    fetchHeatmap();

    const interval = setInterval(fetchHeatmap, 2000);
    return () => clearInterval(interval);
  }, []);

  const maxValue = Math.max(...points.map((p) => p.value), 1);

  return (
    <svg
      width={800}
      height={500}
      style={{ border: "1px solid black" }}
      onClick={handleClick}
    >
      {points.map((p, index) => {
        const intensity = p.value / maxValue;

        return (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={25}
            fill="red"
            opacity={intensity}
          />
        );
      })}
    </svg>
  );
};

export default Heatmap;