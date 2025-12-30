import React from "react";

function StatRow({ label, value, className }) {
  return (
    <div className="flex flex-col gap-3 md:gap-5 py-4 px-6 border md:w-full lg:w-40 w-full border-neutral-700 rounded-lg">
      <span className="text-preset-3 text-neutral-400">{label}</span>
      <span className="text-preset-2">{value}</span>
    </div>
  );
}

export default StatRow;
