import React, { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";

function Mode({ mode: propMode, setMode: propSetMode }) {
  const [localMode, setLocalMode] = useState("Timed (60s)");

  // Use prop if available, otherwise fallback to local state
  const mode = propMode !== undefined ? propMode : localMode;

  const setMode = (value) => {
    if (propSetMode) {
      propSetMode(value);
    } else {
      setLocalMode(value);
    }
  };

  const modes = ["Timed (60s)", "Passage"];

  return (
    <div className="relative z-50 w-full md:w-auto">
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <Dropdown
          options={modes}
          selected={mode}
          onSelect={setMode}
          className="max-w-[166.5px] w-full"
        />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-preset-5 text-neutral-400">Mode: </span>
        <div className="flex gap-2">
          {modes.map((m) => (
            <Button
              variant="outline"
              size="sm"
              key={m}
              onClick={() => setMode(m)}
              className={`capitalize ${
                mode === m ? "!text-blue-400 !border-blue-600" : ""
              }`}
            >
              {m}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mode;
