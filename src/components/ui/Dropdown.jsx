import React, { useState } from "react";
import DownArrowIcon from "../../assets/images/icon-down-arrow.svg";

function Dropdown({ options, selected, onSelect, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2.5 w-[166.5px] px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-neutral-200"
      >
        <span className="capitalize text-preset-5">{selected}</span>
        <img
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          src={DownArrowIcon}
          alt="down arrow icon"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-xl shadow-lg flex flex-col z-50 divide-y divide-neutral-700">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="flex items-center gap-3 w-full px-4.5 py-2.5 text-left text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  selected === option
                    ? "border-blue-400 border-5"
                    : "border-neutral-0 border"
                }`}
              >
                {selected === option && (
                  <div className="w-full h-full rounded-full bg-neutral-900" />
                )}
              </div>
              <span className="capitalize text-preset-5 text-neutral-0 divide-dashed">
                {option}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
