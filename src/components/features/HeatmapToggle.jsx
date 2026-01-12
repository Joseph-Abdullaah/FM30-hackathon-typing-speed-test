import React from "react";
import { useTSTStore } from "../../store/TSTStore";

function HeatmapToggle() {
  const { showHeatmap, toggleHeatmap } = useTSTStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-preset-5 text-neutral-0">Keyboard Heatmap</span>
        <span className="text-preset-6 text-neutral-400">
          Show keyboard visualization below typing area
        </span>
      </div>
      <button
        onClick={toggleHeatmap}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          showHeatmap ? "bg-blue-600" : "bg-neutral-700"
        }`}
        aria-label={showHeatmap ? "Hide heatmap" : "Show heatmap"}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-neutral-0 rounded-full transition-transform ${
            showHeatmap ? "translate-x-1" : "-translate-x-6"
          }`}
        />
      </button>
    </div>
  );
}

export default HeatmapToggle;
