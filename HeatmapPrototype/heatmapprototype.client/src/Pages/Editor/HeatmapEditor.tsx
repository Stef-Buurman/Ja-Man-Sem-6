import React, { useEffect, useState } from "react";
import type { HeatPointArea } from "../../Types/HeatPointArea";

const API_URL = "/api/heatmap";

const HeatmapEditor: React.FC = () => {
    const [areas, setAreas] = useState<HeatPointArea[]>([]);

    const handleAreaUpdate = async () => {
        await fetch(`${API_URL}/areas`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(areas),
        });
    };

    const fetchHeatmapAreas = async () => {
        const res = await fetch(`${API_URL}/areas`);
        const data = await res.json();
        setAreas(data);
    };

    useEffect(() => {
        fetchHeatmapAreas();
    }, []);

    const handleAddArea = async () => {
        const newArea = {
            id: areas.length > 0 ? Math.max(...areas.map((a) => a.id)) + 1 : 1,
            x: 0,
            y: 0,
            value: 0,
            soundLevel: 0,
            level: 0,
            color: "rgba(0,0,255,0.6)",
        };
        await fetch(`${API_URL}/areas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newArea),
        });
        setAreas([...areas, newArea]);
    };

    const handleDeleteArea = async (id: number) => {
        await fetch(`${API_URL}/areas/${id}`, {
            method: "DELETE",
        });
        setAreas(areas.filter((a) => a.id !== id));
    };

    const areYouSurePopup = (id: number) => {
        if (window.confirm("Are you sure you want to delete this area?")) {
            handleDeleteArea(id);
        }
    };

    return (
        <div>
            <button onClick={handleAddArea}>Add Area</button>
            {areas.map((a) => (
                <div key={a.id}>
                    <label>
                        X:{" "}
                        <input
                            min={0}
                            type="number"
                            value={a.x}
                            onChange={(e) => {
                                const updated = areas.map((area) =>
                                    area.id === a.id
                                        ? { ...area, x: parseFloat(e.target.value) }
                                        : area,
                                );
                                setAreas(updated);
                            }}
                        />
                    </label>
                    <label>
                        Y:{" "}
                        <input
                            min={0}
                            type="number"
                            value={a.y}
                            onChange={(e) => {
                                const updated = areas.map((area) =>
                                    area.id === a.id
                                        ? { ...area, y: parseFloat(e.target.value) }
                                        : area,
                                );
                                setAreas(updated);
                            }}
                        />
                    </label>
                    <label>
                        Value:{" "}
                        <input
                            min={0}
                            type="number"
                            value={a.value}
                            onChange={(e) => {
                                const updated = areas.map((area) =>
                                    area.id === a.id
                                        ? { ...area, value: parseFloat(e.target.value) }
                                        : area,
                                );
                                setAreas(updated);
                            }}
                        />
                    </label>
                    <button onClick={() => areYouSurePopup(a.id)}>Delete</button>
                </div>
            ))}
            <button
                onClick={() => {
                    handleAreaUpdate();
                }}
            >
                Save Areas
            </button>
        </div>
    );
};

export default HeatmapEditor;
