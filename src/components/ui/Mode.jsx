import React from "react";
import Dropdown from "./Dropdown";
import { useTSTStore } from "../../store/TSTStore";

function Mode() {
  const { testMode, testDuration, setTestConfig } = useTSTStore();

  const getCurrentModeLabel = () => {
    if (testMode === "passage") return "Passage";
    return `Timed (${testDuration}s)`;
  };

  const currentModeLabel = getCurrentModeLabel();

  const handleSelect = (value) => {
    if (value === "Passage") {
      setTestConfig("passage", 0);
    } else {
      // Extract number from "Timed (XXs)"
      const numberPart = value.match(/\d+/);
      const duration = numberPart ? parseInt(numberPart[0], 10) : 60;
      setTestConfig("time", duration);
    }
  };

  const modes = [
    "Timed (15s)",
    "Timed (30s)",
    "Timed (60s)",
    "Timed (120s)",
    "Passage",
  ];

  return (
    <div className="relative z-50 w-full md:w-auto flex items-center gap-3">
      <span className="hidden md:inline text-preset-5 text-neutral-400">
        Mode:{" "}
      </span>
      <Dropdown
        options={modes}
        selected={currentModeLabel}
        onSelect={handleSelect}
        className="w-[166.5px] md:w-fit"
      />
    </div>
  );
}

export default Mode;
