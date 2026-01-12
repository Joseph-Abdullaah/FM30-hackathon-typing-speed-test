import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function Sound() {
  const { soundEnabled, soundSet, soundVolume, setSoundSettings } =
    useTSTStore();

  const soundSets = ["mechanical", "soft", "silent"];

  const handleToggle = () => {
    setSoundSettings({ enabled: !soundEnabled });
  };

  const handleSoundSetChange = (set) => {
    setSoundSettings({ set });
  };

  const handleVolumeChange = (e) => {
    setSoundSettings({ volume: parseInt(e.target.value) });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Sound Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-preset-5 text-neutral-400">Typing Sound:</span>
        <button
          onClick={handleToggle}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            soundEnabled ? "bg-blue-600" : "bg-neutral-700"
          }`}
          aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        >
          <span
            className={`absolute top-1 w-5 h-5 bg-neutral-0 rounded-full transition-transform ${
              soundEnabled ? "translate-x-1" : "-translate-x-6"
            }`}
          />
        </button>
      </div>

      {/* Sound Set Selection */}
      {soundEnabled && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-preset-5 text-neutral-400">Sound Set:</span>
            <div className="flex gap-2">
              {soundSets.map((set) => (
                <Button
                  key={set}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSoundSetChange(set)}
                  className={`capitalize ${
                    soundSet === set ? "text-blue-400! border-blue-600!" : ""
                  }`}
                >
                  {set}
                </Button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-preset-5 text-neutral-400">Volume:</span>
              <span className="text-preset-6 text-neutral-0">
                {soundVolume}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Sound;
