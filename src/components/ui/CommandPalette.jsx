import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTSTStore } from "../../store/TSTStore";

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const {
    setTheme,
    setFontSize,
    setSoundSettings,
    setDifficulty,
    setTestConfig,
    setCaretStyle,
    toggleHeatmap,
    soundEnabled,
    testDuration,
  } = useTSTStore();

  const commands = useMemo(
    () => [
      // Themes
      {
        id: "theme-dark",
        category: "Appearance",
        name: "Theme: Dark",
        action: () => setTheme("dark"),
      },
      {
        id: "theme-monkeytype",
        category: "Appearance",
        name: "Theme: Monkeytype",
        action: () => setTheme("monkeytype-dark"),
      },
      {
        id: "theme-retro",
        category: "Appearance",
        name: "Theme: Retro",
        action: () => setTheme("retro"),
      },
      {
        id: "theme-cyberpunk",
        category: "Appearance",
        name: "Theme: Cyberpunk",
        action: () => setTheme("cyberpunk"),
      },
      {
        id: "theme-forest",
        category: "Appearance",
        name: "Theme: Forest",
        action: () => setTheme("forest"),
      },
      {
        id: "theme-ocean",
        category: "Appearance",
        name: "Theme: Ocean",
        action: () => setTheme("ocean"),
      },

      // Font Sizes
      {
        id: "font-sm",
        category: "Appearance",
        name: "Font Size: Small",
        action: () => setFontSize("sm"),
      },
      {
        id: "font-md",
        category: "Appearance",
        name: "Font Size: Medium",
        action: () => setFontSize("md"),
      },
      {
        id: "font-lg",
        category: "Appearance",
        name: "Font Size: Large",
        action: () => setFontSize("lg"),
      },
      {
        id: "font-xl",
        category: "Appearance",
        name: "Font Size: Extra Large",
        action: () => setFontSize("xl"),
      },

      // Caret Styles
      {
        id: "caret-block",
        category: "Appearance",
        name: "Caret: Block",
        action: () => setCaretStyle("block"),
      },
      {
        id: "caret-thin",
        category: "Appearance",
        name: "Caret: Thin",
        action: () => setCaretStyle("thin"),
      },
      {
        id: "caret-underline",
        category: "Appearance",
        name: "Caret: Underline",
        action: () => setCaretStyle("underline"),
      },
      {
        id: "caret-none",
        category: "Appearance",
        name: "Caret: None",
        action: () => setCaretStyle("none"),
      },

      // Difficulty
      {
        id: "diff-easy",
        category: "Settings",
        name: "Difficulty: Easy",
        action: () => setDifficulty("easy"),
      },
      {
        id: "diff-medium",
        category: "Settings",
        name: "Difficulty: Medium",
        action: () => setDifficulty("medium"),
      },
      {
        id: "diff-hard",
        category: "Settings",
        name: "Difficulty: Hard",
        action: () => setDifficulty("hard"),
      },

      // Modes
      {
        id: "mode-time",
        category: "Settings",
        name: "Mode: Time",
        action: () => setTestConfig("time", testDuration),
      },
      {
        id: "mode-passage",
        category: "Settings",
        name: "Mode: Passage",
        action: () => setTestConfig("passage", testDuration),
      },

      // Features
      {
        id: "toggle-heatmap",
        category: "Features",
        name: "Toggle Keyboard Heatmap",
        action: () => toggleHeatmap(),
      },
      {
        id: "toggle-sound",
        category: "Features",
        name: "Toggle Sound",
        action: () => setSoundSettings({ enabled: !soundEnabled }),
      },
      {
        id: "sound-mechanical",
        category: "Features",
        name: "Sound: Mechanical",
        action: () => setSoundSettings({ set: "mechanical", enabled: true }),
      },
      {
        id: "sound-soft",
        category: "Features",
        name: "Sound: Soft",
        action: () => setSoundSettings({ set: "soft", enabled: true }),
      },
    ],
    [
      setTheme,
      setFontSize,
      setSoundSettings,
      setDifficulty,
      setTestConfig,
      setCaretStyle,
      toggleHeatmap,
      soundEnabled,
      testDuration,
    ],
  );

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) % filteredCommands.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden pointer-events-auto animate-in slide-in-from-top-4 duration-200">
        <div className="p-4 border-b border-neutral-700 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-neutral-0 text-preset-5 placeholder:text-neutral-500"
            placeholder="Search settings (Ctrl + Shift + P)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-neutral-400">
              No settings found match your search.
            </div>
          ) : (
            <div className="py-2">
              {filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.id}
                  className={`w-full flex items-center justify-between px-5 py-3 transition-colors ${
                    index === selectedIndex
                      ? "bg-neutral-700 text-neutral-0"
                      : "text-neutral-400 hover:bg-neutral-700/50"
                  }`}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-preset-5 font-bold">{cmd.name}</span>
                    <span className="text-xs opacity-60 uppercase tracking-widest">
                      {cmd.category}
                    </span>
                  </div>
                  {index === selectedIndex && (
                    <span className="text-xs bg-neutral-600 px-2 py-1 rounded text-neutral-300">
                      Enter
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-neutral-900/50 border-t border-neutral-700 flex justify-between items-center text-xs text-neutral-500">
          <div className="flex gap-4">
            <span>
              <kbd className="bg-neutral-800 px-1 rounded border border-neutral-700">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="bg-neutral-800 px-1 rounded border border-neutral-700">
                ↵
              </kbd>{" "}
              to select
            </span>
          </div>
          <span>
            <kbd className="bg-neutral-800 px-1 rounded border border-neutral-700">
              ESC
            </kbd>{" "}
            to close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
