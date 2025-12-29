import React from "react";

function StatItem({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col items-center md:flex-row gap-3 h-fit  ${className}`}>
      <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-400 ">{label}:</h3>
      <p className="text-preset-2 text-neutral-0">{value}</p>
    </div>
  );
}

export default StatItem;
