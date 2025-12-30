import React from "react";
import Button from "./Button";
import { useTSTStore } from "../../store/TSTStore";
function StartModal() {
  const { prepareTest, resumeTest, gameState } = useTSTStore();

  const isPaused = gameState === "paused";

  const handleAction = () => {
    if (isPaused) {
      resumeTest();
    } else {
      prepareTest();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center gap-5 h-full max-w-304 w-full backdrop-blur-lg cursor-pointer transition-colors hover:backdrop-blur-xl"
      onClick={handleAction}
    >
      <Button
        variant="primary"
        size="lg"
        onClick={(e) => {
          e.stopPropagation();
          handleAction();
        }}
      >
        {isPaused ? "Resume Test" : "Start Typing Test"}
      </Button>
      <p className="text-preset-3-semibold text-neutral-0">
        {isPaused ? "Click to resume" : "Or click the test and start typing"}
      </p>
    </div>
  );
}

export default StartModal;
