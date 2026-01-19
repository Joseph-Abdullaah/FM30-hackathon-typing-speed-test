import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { useTSTStore } from "../store/TSTStore";
import soundManager from "../utils/soundManager";

const TypingArea = ({ className = "", children }) => {
  const {
    userInput,
    text,
    handleInput,
    difficulty,
    resetTest,
    pauseTest,
    gameState,
    fontSize,
    caretStyle,
    soundEnabled,
    soundSet,
    soundVolume,
  } = useTSTStore();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const activeCharRef = useRef(null);
  const [caretPos, setCaretPos] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });

  // Sync the hidden input with the store state only when necessary (e.g. resets)
  const lastKnownValue = useRef("");

  useEffect(() => {
    if (userInput === "" && inputRef.current) {
      inputRef.current.value = "";
      lastKnownValue.current = "";
    }
  }, [userInput]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    lastKnownValue.current = newValue;

    if (newValue.length > userInput.length && soundEnabled) {
      soundManager.play(soundSet, soundVolume);
    }

    handleInput(newValue);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [difficulty]);

  useEffect(() => {
    if (gameState === "running" || gameState === "ready") {
      inputRef.current?.focus();
    }
  }, [gameState]);

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
    const related = e.relatedTarget;
    const isRestart = related?.closest?.('[data-action="restart"]');

    if (isRestart) {
      return;
    }

    if (gameState === "running" || gameState === "ready") {
      pauseTest();
    }
  };

  // Update caret position and handle auto-scroll
  useLayoutEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const activeRect = activeCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setCaretPos({
        top: activeCharRef.current.offsetTop,
        left: activeCharRef.current.offsetLeft,
        height: activeRect.height,
        width: activeRect.width,
      });

      // Auto-scroll logic for mobile/overflow
      const isMobile = window.innerWidth < 768;
      if (
        isMobile ||
        activeCharRef.current.offsetTop > containerRect.height / 2
      ) {
        activeCharRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [userInput.length, fontSize]);

  const characters = text.split("");

  const fontSizeClass = `text-preset-1-mobile-regular md:text-preset-1-regular`;
  const fontSizeStyle = {
    fontSize: `var(--typing-font-size-${fontSize})`,
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Caret Styles Mapping
  const getCaretStyle = () => {
    if (caretStyle === "none") return { opacity: 0 };

    const base = {
      position: "absolute",
      top: `${caretPos.top}px`,
      left: `${caretPos.left}px`,
      height: `${caretPos.height}px`,
      transition: prefersReducedMotion ? "none" : "all 0.1s ease-out",
      zIndex: 5,
    };

    switch (caretStyle) {
      case "thin":
        return {
          ...base,
          width: "2px",
          backgroundColor: "var(--color-neutral-400)",
        };
      case "block":
        return {
          ...base,
          width: `${caretPos.width || 20}px`,
          backgroundColor: "rgba(163, 163, 163, 0.4)",
          borderRadius: "2px",
        };
      case "underline":
        return {
          ...base,
          width: `${caretPos.width || 20}px`,
          height: "2px",
          top: `${caretPos.top + caretPos.height - 2}px`,
          backgroundColor: "var(--color-neutral-400)",
        };
      default:
        return base;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-304 mx-auto outline-none cursor-text pb-8 md:pb-10 lg:pb-16 mt-8 overflow-hidden ${className}`}
      onClick={handleAreaClick}
    >
      {children}
      <input
        ref={inputRef}
        type="text"
        className="absolute inset-0 w-full h-full opacity-0 cursor-default z-0"
        style={{ caretColor: "transparent" }}
        defaultValue=""
        onChange={handleInputChange}
        onBlur={handleBlur}
        autoFocus
        aria-label="Typing input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      <div className={fontSizeClass} style={fontSizeStyle}>
        <div className="relative text-neutral-500 wrap-break-words select-none leading-relaxed">
          {/* Smooth Caret */}
          {(gameState === "running" ||
            gameState === "ready" ||
            gameState === "idle") && (
            <div
              style={getCaretStyle()}
              className={prefersReducedMotion ? "" : "animate-pulse"}
            />
          )}

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

            return (
              <span
                key={index}
                ref={isCurrent ? activeCharRef : null}
                className={`${charClass} transition-colors duration-150`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TypingArea;
