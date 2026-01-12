import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function Caret() {
  const { caretStyle, setCaretStyle } = useTSTStore();

  const carets = [
    { id: "none", label: "Off" },
    { id: "block", label: "█" },
    { id: "thin", label: "|" },
    { id: "underline", label: "_" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <span className="text-preset-5 text-neutral-400">Caret:</span>
      <div className="flex gap-2">
        {carets.map((caret) => (
          <Button
            key={caret.id}
            variant="outline"
            size="sm"
            onClick={() => setCaretStyle(caret.id)}
            className={`min-w-12 ${
              caretStyle === caret.id ? "!text-blue-400 !border-blue-600" : ""
            }`}
          >
            {caret.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Caret;
