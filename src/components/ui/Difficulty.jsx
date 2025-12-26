import React, { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
function Difficulty({
  difficulty: propDifficulty,
  setDifficulty: propSetDifficulty,
}) {
  const [localDifficulty, setLocalDifficulty] = useState("easy");

  // Use prop if available, otherwise fallback to local state
  const difficulty =
    propDifficulty !== undefined ? propDifficulty : localDifficulty;

  const setDifficulty = (level) => {
    if (propSetDifficulty) {
      propSetDifficulty(level);
    } else {
      setLocalDifficulty(level);
    }
  };

  const levels = ["easy", "medium", "hard"];

  return (
    <div className="relative z-50 w-full md:w-auto">
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <Dropdown
          options={levels}
          selected={difficulty}
          onSelect={setDifficulty}
          className="max-w-[166.5px] w-full"
        />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-preset-5 text-neutral-400">Difficulty: </span>
        <div className="flex gap-2">
          {levels.map((level) => (
            <Button
              variant="outline"
              size="sm"
              key={level}
              onClick={() => setDifficulty(level)}
              className={`capitalize ${
                difficulty === level ? "!text-blue-400 !border-blue-600" : ""
              }`}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
