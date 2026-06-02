import React from "react";
import "./toggle.css";

export type ToggleProps = {
  title?: string;
  handleCheckboxChange: (event: boolean) => void;
  currentValue?: boolean;
};

const Toggle: React.FC<ToggleProps> = ({ title, handleCheckboxChange: handleToggleChange, currentValue = false }) => {
  return (
    <label>
      <div className="flex items-center gap-3 relative cursor-pointer">
        <input
          type="checkbox"
          checked={currentValue}
          onChange={(ev) => handleToggleChange(ev.target.checked)}
          className="toggle-input"
        />
        <div className="toggle-track"></div>
        <div className="toggle-dot"></div>
        <span className="text-xs">{title || "Edit:"}</span>
      </div>
    </label>
  );
};

export default Toggle;
