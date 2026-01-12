import React from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function FontSize() {
  const { fontSize, setFontSize } = useTSTStore();

  const sizes = [
    { id: "sm", name: "Small", preview: "Aa" },
    { id: "md", name: "Medium", preview: "Aa" },
    { id: "lg", name: "Large", preview: "Aa" },
    { id: "xl", name: "Extra Large", preview: "Aa" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-preset-5 text-neutral-400">Font Size:</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outline"
            size="sm"
            onClick={() => setFontSize(size.id)}
            className={`flex flex-col items-center gap-1 py-3 ${
              fontSize === size.id ? "!text-blue-400 !border-blue-600" : ""
            }`}
          >
            <span
              className={`font-bold ${
                size.id === "sm"
                  ? "text-lg"
                  : size.id === "md"
                  ? "text-xl"
                  : size.id === "lg"
                  ? "text-2xl"
                  : "text-3xl"
              }`}
            >
              {size.preview}
            </span>
            <span className="text-preset-6">{size.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default FontSize;
