import React, { useState } from "react";
import { useTSTStore } from "../../store/TSTStore";
import Button from "../ui/Button";

function Category() {
  const { category, setCategory, setCustomText } = useTSTStore();
  const [customInput, setCustomInput] = useState("");

  const categories = ["general", "programming", "quotes", "numbers", "custom"];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleCustomTextSubmit = () => {
    if (customInput.trim()) {
      setCustomText(customInput);
      setCategory("custom");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-preset-5 text-neutral-400">Category:</span>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            variant="outline"
            size="sm"
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`capitalize ${
              category === cat ? "!text-blue-400 !border-blue-600" : ""
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Custom text input */}
      {category === "custom" && (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter your custom text here..."
            className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded-lg text-preset-5 text-neutral-0 resize-none focus:outline-none focus:border-blue-600"
            rows="4"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleCustomTextSubmit}
            disabled={!customInput.trim()}
            className="w-fit"
          >
            Save Custom Text
          </Button>
        </div>
      )}
    </div>
  );
}

export default Category;
