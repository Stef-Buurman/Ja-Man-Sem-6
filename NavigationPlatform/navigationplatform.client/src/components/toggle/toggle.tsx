import React from "react";
import "./toggle.css";

export type ToggleProps = {
    title?: string;
    handleCheckboxChange: (event: boolean) => void;
    currentValue?: boolean;
};

const Toggle: React.FC<ToggleProps> = ({
    title,
    handleCheckboxChange: handleToggleChange,
    currentValue = false,
}) => {
    return (
        <label>
            <span>{title || "Edit:"}</span>
            <div className="toggle-container">
                <input
                    type="checkbox"
                    checked={currentValue}
                    onChange={(ev) => handleToggleChange(ev.target.checked)}
                    className="toggle-input"
                />
                <div className="toggle-track"></div>
                <div className="toggle-dot"></div>
            </div>
        </label>
    );
};

export default Toggle;
