import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useTSTStore } from "../../store/TSTStore";

function KeyboardHeatmap() {
  const { text, userInput } = useTSTStore();
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => setActiveKey(e.key.toLowerCase());
    const handleKeyUp = () => setActiveKey(null);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const rows = [
    [
      { label: "q", value: "q" },
      { label: "w", value: "w" },
      { label: "e", value: "e" },
      { label: "r", value: "r" },
      { label: "t", value: "t" },
      { label: "y", value: "y" },
      { label: "u", value: "u" },
      { label: "i", value: "i" },
      { label: "o", value: "o" },
      { label: "p", value: "p" },
      { label: "[", value: "[" },
      { label: "]", value: "]" },
    ],
    [
      { label: "a", value: "a" },
      { label: "s", value: "s" },
      { label: "d", value: "d" },
      { label: "f", value: "f" },
      { label: "g", value: "g" },
      { label: "h", value: "h" },
      { label: "j", value: "j" },
      { label: "k", value: "k" },
      { label: "l", value: "l" },
      { label: ";", value: ";" },
      { label: "'", value: "'" },
    ],
    [
      { label: "z", value: "z" },
      { label: "x", value: "x" },
      { label: "c", value: "c" },
      { label: "v", value: "v" },
      { label: "b", value: "b" },
      { label: "n", value: "n" },
      { label: "m", value: "m" },
      { label: ",", value: "," },
      { label: ".", value: "." },
      { label: "/", value: "/" },
    ],
  ];

  const getKeyStyle = (keyVal) => {
    if (activeKey === keyVal.toLowerCase()) {
      const currentIdx = userInput.length;
      const charCurrent = text[currentIdx]?.toLowerCase();
      const charPrev =
        currentIdx > 0 ? text[currentIdx - 1]?.toLowerCase() : null;

      if (activeKey === charCurrent || activeKey === charPrev) {
        return "!bg-neutral-700";
      } else {
        return "!bg-red-500";
      }
    }
    return "";
  };

  const getSpaceStyle = () => {
    if (activeKey === " ") {
      const currentIdx = userInput.length;
      const charCurrent = text[currentIdx];
      const charPrev = currentIdx > 0 ? text[currentIdx - 1] : null;

      if (charCurrent === " " || charPrev === " ") {
        return "!bg-neutral-700";
      } else {
        return "!bg-red-500";
      }
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-1 md:gap-2 p-2 md:p-4 w-full mx-auto max-w-150 select-none">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex gap-1 md:gap-2 justify-center items-center"
        >
          {row.map((key, j) => (
            <Button
              variant="ghost"
              size="sm"
              key={j}
              className={`flex items-center justify-center w-6 h-6 md:max-w-10 md:h-10 md:w-full rounded-lg text-[6px] md:text-sm min-w-0 transition-colors duration-75 ${getKeyStyle(
                key.value
              )}`}
            >
              {key.label}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center justify-center text-sm w-48 md:max-w-70 md:w-full h-6 md:h-auto transition-colors duration-75 ${getSpaceStyle()}`}
        >
          space
        </Button>
      </div>
    </div>
  );
}

export default KeyboardHeatmap;
