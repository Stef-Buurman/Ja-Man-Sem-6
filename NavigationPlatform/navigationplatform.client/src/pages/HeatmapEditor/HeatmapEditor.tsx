import React, { useEffect, useState } from "react";
import "./HeatmapEditor.css";
import type { HeatpointArea, HeatpointAreaDto } from "../../api/data-contracts";
import {
  addHeatpointArea,
  deleteHeatpointArea,
  getHeatpointAreas,
  updateRangeHeatpointArea,
} from "../../api/methods/Heatmap.api";

const HeatmapEditor: React.FC = () => {
  const [areas, setAreas] = useState<HeatpointArea[]>([]);

  const handleAreaUpdate = async () => {
    let areasMap: HeatpointAreaDto[] = areas.map((a) => ({
      color: a.color,
      floor: a.floor?.number || 0,
      height: a.height,
      id: a.id,
      soundLevel: a.soundLevel,
      value: a.value,
      width: a.width,
      x: a.x,
      y: a.y,
    }));
    await updateRangeHeatpointArea(areasMap, {
      toastSuccess: {
        title: "Areas Updated",
        message: `Heatmap areas updated successfully!`,
      },
    });
  };

  const fetchHeatmapAreas = async () => {
    const res = await getHeatpointAreas();
    if (res.ok) setAreas(res.response);
  };

  useEffect(() => {
    fetchHeatmapAreas();
  }, []);

  const clampMin0 = (value: number) => Math.max(0, value || 0);

  const handleAddArea = async () => {
    const newArea: HeatpointAreaDto = {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      value: 0,
      soundLevel: 0,
      color: "rgba(0,0,255,0.6)",
      floor: 0,
      width: 50,
      height: 50,
    };
    var res = await addHeatpointArea(newArea, {
      toastSuccess: {
        title: "Area Added",
        message: `Area with ID ${newArea.id} added successfully!`,
      },
    });
    if (res.ok) setAreas([...areas, res.response]);
  };

  const handleDeleteArea = async (id: string) => {
    await deleteHeatpointArea(
      {
        id,
      },
      {
        toastSuccess: {
          title: "Area Deleted",
          message: `Area with ID ${id} deleted successfully!`,
        },
      },
    );
    setAreas(areas.filter((a) => a.id !== id));
  };

  const areYouSurePopup = (id: string) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      handleDeleteArea(id);
    }
  };

  return (
    <div className="heatmap-editor">
      <button className="heatmap-button save-button" onClick={handleAddArea}>
        Add Area
      </button>

      {areas.map((a) => (
        <div key={a.id} className="heatmap-area">
          <label>
            X:
            <input
              min={0}
              type="number"
              value={a.x}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) => (area.id === a.id ? { ...area, x: value } : area));

                setAreas(updated);
              }}
            />
          </label>

          <label>
            Y:
            <input
              min={0}
              type="number"
              value={a.y}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) => (area.id === a.id ? { ...area, y: value } : area));

                setAreas(updated);
              }}
            />
          </label>

          <label>
            Width:
            <input
              min={0}
              type="number"
              value={a.width}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) => (area.id === a.id ? { ...area, width: value } : area));

                setAreas(updated);
              }}
            />
          </label>

          <label>
            Height:
            <input
              min={0}
              type="number"
              value={a.height}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) => (area.id === a.id ? { ...area, height: value } : area));

                setAreas(updated);
              }}
            />
          </label>

          <label>
            Floor:
            <input
              min={0}
              type="number"
              value={a.floor?.number || 0}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) =>
                  area.id === a.id
                    ? {
                        ...area,
                        floor: area.floor
                          ? { ...area.floor, number: value }
                          : { id: "", fileName: "", number: value, graphNodes: [], heatpointAreas: [] },
                      }
                    : area,
                );
                console.log(updated);

                setAreas(updated);
              }}
            />
          </label>

          <label>
            Value:
            <input
              min={0}
              type="number"
              value={a.value}
              onChange={(e) => {
                const value = clampMin0(parseFloat(e.target.value));

                const updated = areas.map((area) => (area.id === a.id ? { ...area, value } : area));

                setAreas(updated);
              }}
            />
          </label>

          <div className="heatmap-actions">
            <button
              disabled={a.value >= 30}
              className="heatmap-button"
              onClick={() => {
                const updated = areas.map((area) => (area.id === a.id ? { ...area, value: area.value + 1 } : area));
                setAreas(updated);
                handleAreaUpdate();
              }}
            >
              +
            </button>

            <button
              disabled={a.value <= 0}
              className="heatmap-button"
              onClick={() => {
                const updated = areas.map((area) => (area.id === a.id ? { ...area, value: area.value - 1 } : area));
                setAreas(updated);
                handleAreaUpdate();
              }}
            >
              -
            </button>

            <button className="heatmap-button delete" onClick={() => areYouSurePopup(a.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        className="heatmap-button save-button"
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
