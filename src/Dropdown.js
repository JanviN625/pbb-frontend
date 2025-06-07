import React from "react";

function Dropdown({ label, options, selected, onChange }) {
  return (
    <div>
      <h3>{label}</h3>
      <select value={selected} onChange={onChange}>
        <option value="">Please choose an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
