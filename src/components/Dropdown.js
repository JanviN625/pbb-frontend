import React, { useState, useRef, useEffect } from "react";
import "../styles/Dropdown.css"; // Adjust the path as necessary

function Dropdown({ label, options, selected, onChange, multiSelect = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <h3>{label}</h3>

      {multiSelect ? (
        <div className="custom-dropdown">
          <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            {selected.length === 0
              ? "Select options"
              : selected.join(", ")}
            <span className="dropdown-arrow"></span>
          </div>

          {isOpen && (
            <div className="dropdown-options">
              <label>
                <input
                  type="checkbox"
                  checked={selected.length === options.length}
                  onChange={handleSelectAll}
                />
                {selected.length === options.length ? "Deselect All" : "Select All"}
              </label>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="select-wrapper">
          <select value={selected} onChange={onChange}>
            <option value="">Please choose an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow"></span>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
