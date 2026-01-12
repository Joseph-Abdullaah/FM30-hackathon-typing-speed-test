import React, { useState } from "react";
import { useTSTStore } from "../../store/TSTStore";
import logoLarge from "/src/assets/images/logo-large.svg";
import logoSmall from "/src/assets/images/logo-small.svg";
import personalBestIcon from "/src/assets/images/icon-personal-best.svg";
import HistoryModal from "../ui/HistoryModal";
import CommandPalette from "../ui/CommandPalette";
import { useEffect } from "react";

function Header() {
  const { bestWPM } = useTSTStore();
  const [showHistory, setShowHistory] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setShowPalette((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleSettingsClick = () => {
    window.dispatchEvent(new CustomEvent("navigateToSettings"));
  };

  return (
    <header className="p-4 sm:pt-8 sm:pb-5 lg:px-28 lg:py-8">
      <div className="flex justify-between items-center max-w-304 mx-auto">
        <picture>
          <source media="(min-width: 768px)" srcSet={logoLarge} />
          <img src={logoSmall} alt="logo" />
        </picture>

        {/* Command Palette Trigger - LG only */}
        <div className="hidden lg:flex flex-1 justify-center max-w-md mx-4">
          <button
            onClick={() => setShowPalette(true)}
            className="w-full flex items-center justify-between px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-400 hover:text-neutral-0 hover:border-neutral-500 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="text-sm">Search settings...</span>
            </div>
            <div className="flex gap-1">
              <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] border border-neutral-700">
                Ctrl
              </kbd>
              <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] border border-neutral-700">
                Shift
              </kbd>
              <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] border border-neutral-700">
                P
              </kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex justify-center items-center gap-2.5">
            <img
              className="w-[20.25px] h-4.5"
              src={personalBestIcon}
              alt="personal best icon"
            />
            <p className="flex gap-1 text-preset-4 text-neutral-400">
              <span className="hidden md:block">Personal</span>{" "}
              <span className="capitalize md:lowercase">best</span>:{" "}
              <span className="text-neutral-0 block">{bestWPM} WPM</span>
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-0"
              aria-label="View history"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>

            <button
              onClick={handleSettingsClick}
              className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-0"
              aria-label="Open settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 0-2-2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 0-2-2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 0-2-2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 0-2-2"></path>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
      <CommandPalette
        key={showPalette ? "open" : "closed"}
        isOpen={showPalette}
        onClose={() => setShowPalette(false)}
      />
    </header>
  );
}

export default Header;
