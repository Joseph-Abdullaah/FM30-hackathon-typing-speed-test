import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function Themes() {
  const { theme, setTheme } = useTSTStore();

  const themes = [
    { id: "dark", name: "Dark", colors: ["#121212", "#262626", "#FFFFFF"] },
    {
      id: "monkeytype-dark",
      name: "Monkeytype",
      colors: ["#1A1D29", "#262A38", "#D4C5A0"],
    },
    { id: "retro", name: "Retro", colors: ["#1F1511", "#2D221D", "#E4C9AD"] },
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      colors: ["#140A1F", "#1F1426", "#F9A8E8"],
    },
    { id: "forest", name: "Forest", colors: ["#19291A", "#232D23", "#C4D9B5"] },
    { id: "ocean", name: "Ocean", colors: ["#192933", "#233039", "#C6E2E3"] },
  ];

  // Theme is now applied globally in App.jsx

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-preset-5 text-neutral-400">Theme:</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleThemeChange(t.id)}
            className={`flex flex-col items-start gap-2 p-3 rounded-lg border-2 transition-all ${
              theme === t.id
                ? "border-blue-600 bg-neutral-800"
                : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/50"
            }`}
          >
            <div className="flex gap-1.5 w-full">
              {t.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-6 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-preset-6 text-neutral-0 capitalize">
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Themes;
