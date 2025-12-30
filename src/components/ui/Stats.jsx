import React from "react";
import StatItem from "./StatItem.jsx";
import Difficulty from "./Difficulty.jsx";
import Mode from "./Mode.jsx";
function Stats() {
  const labels = ["WPM", "Accuracy", "Time"];
  return (
    <div className="max-w-304 w-full border-b border-neutral-700 pb-4 mx-auto h-fit flex justify-center md:justify-between shrink-0 grow-0 flex-wrap content-between gap-4 md:gap-5">
      <div className="w-full md:w-fit flex justify-evenly md:justify-start gap-5 md:gap-6">
        {labels.map((label, index) => (
          <StatItem
            key={index}
            className={
              label === "Accuracy"
                ? "w-31.75 md:w-56.25 justify-center border-neutral-700 border-x"
                : ""
            }
            label={label}
            value={
              label === "WPM" ? "0" : label === "Accuracy" ? "100%" : "60s"
            }
          />
        ))}
      </div>
      <div className="w-[602.25px] flex justify-center">
        <div className="w-fit flex justify-start md:border-neutral-700 md:border-r pr-2.5 md:pr-3">
          <Difficulty />
        </div>
        <div className="w-fit flex justify-end pl-0 md:pl-3">
          <Mode />
        </div>
      </div>
    </div>
  );
}

export default Stats;
