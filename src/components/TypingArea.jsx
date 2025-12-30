import { useRef, useEffect } from "react";
import { useTSTStore } from "../store/TSTStore";

const TypingArea = ({ className = "", children }) => {
  const {
    userInput,
    text,
    handleInput,
    difficulty,
    resetTest,
    pauseTest,
    gameState,
  } = useTSTStore();
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    handleInput(e.target.value);
  };

  // Focus the hidden input when the component mounts or game state indicates readiness
  useEffect(() => {
    inputRef.current?.focus();
  }, [difficulty]);

  useEffect(() => {
    if (gameState === "running" || gameState === "ready") {
      inputRef.current?.focus();
    }
  }, [gameState]);

  // Listen for global restart events to reset the typing area
  useEffect(() => {
    const onRestart = () => {
      resetTest();
      inputRef.current?.focus();
    };

    window.addEventListener("restartTest", onRestart);
    return () => window.removeEventListener("restartTest", onRestart);
  }, [difficulty, resetTest]);

  const handleAreaClick = () => {
    inputRef.current?.focus();
  };

  const handleBlur = (e) => {
    // If we clicked the restart button, don't pause!
    // check if the relatedTarget (the element receiving focus) has data-action="restart"
    // or if the click was on the restart button (which might be the relatedTarget's parent due to the image inside)
    const related = e.relatedTarget;
    const isRestart = related?.closest?.('[data-action="restart"]');

    if (isRestart) {
      return;
    }

    if (gameState === "running" || gameState === "ready") {
      pauseTest();
    }
  };

  const characters = text.split("");

  return (
    <div
      className={`relative w-full max-w-304 mx-auto outline-none cursor-text pb-8 md:pb-10 lg:pb-16 mt-8 ${className}`}
      onClick={handleAreaClick}
    >
      {children}
      {/* Hidden input to capture typing events */}
      <input
        ref={inputRef}
        type="text"
        className={`absolute opacity-0 border top-0 left-0 h-0 w-0 pointer-events-none`}
        value={userInput}
        onChange={handleInputChange}
        onBlur={handleBlur}
        autoFocus
        aria-label="Typing input"
      />

      {/* Text Display Area */}
      {/* Using text-preset-1-mobile-regular for large (32px), regular weight text */}
      <div className="text-preset-1-mobile-regular md:text-preset-1-regular text-neutral-500 wrap-break-words select-none">
        {characters.map((char, index) => {
          const isCurrent = index === userInput.length;
          const isTyped = index < userInput.length;
          const isCorrect = isTyped && char === userInput[index];
          const isIncorrect = isTyped && !isCorrect;

          let charClass = isCorrect
            ? "text-green-500"
            : isIncorrect
            ? "text-red-500 underline decoration-red-500 underline-offset-8 bg-red-500/10 rounded-sm"
            : "";

          // Cursor styling: A blinking yellow vertical bar to the left of the current character
          const cursorClass = isCurrent
            ? "relative before:content-[''] before:absolute before:inset-0 before:bg-neutral-400/50 before:rounded-sm before:animate-pulse"
            : "";

          return (
            <span key={index} className={`${charClass} ${cursorClass}`}>
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TypingArea;
