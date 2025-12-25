import React from "react";
import Button from "./Button";
function StartModal() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-full max-w-304 w-full backdrop-blur-lg">
      <Button variant="primary" size="lg">
        Start Typing Test
      </Button>
      <p className="text-preset-3-semibold text-neutral-0">
        Or click the test and start typing
      </p>
    </div>
  );
}

export default StartModal;
