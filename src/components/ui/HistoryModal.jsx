import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function HistoryModal({ onClose }) {
  const { testHistory, clearHistory } = useTSTStore();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div
        className="bg-neutral-800 border border-neutral-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/50 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-preset-2 text-neutral-0">Test History</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              Clear All
            </Button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-neutral-0 hover:border-neutral-0 transition-all text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          {testHistory.length === 0 ? (
            <div className="text-center py-20 text-neutral-400 flex flex-col items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-20"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              No tests completed yet. Start typing to see your history!
            </div>
          ) : (
            testHistory.map((entry, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-900/50 rounded-xl border border-neutral-700/50 hover:border-neutral-500 transition-colors gap-4"
              >
                <div className="flex flex-col">
                  <span className="text-neutral-0 text-preset-4 font-bold">
                    {entry.wpm} WPM
                  </span>
                  <span className="text-neutral-400 text-preset-6">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <div className="flex gap-4 sm:gap-8 items-center">
                  <div className="flex flex-col items-center sm:items-end">
                    <span className="text-neutral-400 text-preset-6">
                      Accuracy
                    </span>
                    <span
                      className={
                        entry.accuracy < 95 ? "text-red-500" : "text-green-500"
                      }
                    >
                      {entry.accuracy}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center sm:items-end">
                    <span className="text-neutral-400 text-preset-6">Mode</span>
                    <span className="text-neutral-0 capitalize text-sm">
                      {entry.mode} ({entry.duration}s)
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export default HistoryModal;
