import React, { useState, useRef, useEffect } from "react";
import "../styles/Dropdown.css";

function Dropdown({
  label,
  options = [],
  selected = [],
  onChange,
  multiSelect = false,
  searchable = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm(""); // clear search on close if you want
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    if (multiSelect) {
      let newSelected;
      if (option === "__all__") {
        newSelected = selected.length === options.length ? [] : options;
      } else {
        newSelected = selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option];
      }
      onChange(newSelected);
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const isSelected = (option) =>
    multiSelect ? selected.includes(option) : selected === option;

  const getDisplayValue = () => {
    if (multiSelect) {
      return selected.length > 0 ? selected.join(", ") : "Select...";
    } else {
      return selected || "Select...";
    }
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>

      {!searchable && (
        <div className="dropdown-header" onClick={toggleDropdown}>
          <div className="dropdown-selected">{getDisplayValue()}</div>
          <span className="dropdown-arrow">&#9662;</span>
        </div>
      )}

      {searchable && (
        <input
          className="dropdown-search-input"
          type="text"
          placeholder={getDisplayValue()}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onClick={() => setIsOpen(true)}
          readOnly={multiSelect ? false : false} // multiSelect can type search
        />
      )}

      {isOpen && (
        <ul className="dropdown-options">
          {multiSelect && options.length > 1 && (
            <li onClick={() => handleOptionClick("__all__")}>
              <label>
                <input
                  type="checkbox"
                  checked={selected.length === options.length}
                  readOnly
                />
                {selected.length === options.length ? "Deselect All" : "Select All"}
              </label>
            </li>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {multiSelect ? (
                  <label>
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      readOnly
                    />
                    {option}
                  </label>
                ) : (
                  option
                )}
              </li>
            ))
          ) : (
            <li className="no-options">No results</li>
          )}
        </ul>
      )}

      <span className="dropdown-arrow">&#9662;</span>
    </div>
  );
}

export default Dropdown;
