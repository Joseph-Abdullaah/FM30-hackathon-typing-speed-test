import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTSTStore } from "../../store/TSTStore";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-md shadow-lg">
        <p className="text-neutral-400 mb-2">Time: {label}s</p>
        {payload.map((pld) => (
          <div
            key={pld.dataKey}
            style={{ color: pld.color }}
            className="text-sm font-bold"
          >
            {pld.name}: {pld.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const { history } = useTSTStore();

  const data = useMemo(() => {
    if (!history || history.length === 0) return [];

    return history.map((point, index) => {
      // Get previous point data (or 0 if start)
      const prevTotalChars = index > 0 ? history[index - 1].totalChars : 0;
      const prevTotalCorrect = index > 0 ? history[index - 1].totalCorrect : 0;

      // Calculate separate counts for THIS second
      const charsInSecond = point.totalChars - prevTotalChars;
      const correctInSecond = point.totalCorrect - prevTotalCorrect;

      // Calculate Instant WPM
      // Formula: (Chars / 5) * 60 (since interval is 1s)
      const raw = Math.round((charsInSecond / 5) * 60);
      const wpm = Math.round((correctInSecond / 5) * 60);

      // Prevent negative spikes if data is weird
      return {
        name: point.time,
        Raw: raw < 0 ? 0 : raw,
        WPM: wpm < 0 ? 0 : wpm,
        Errors: point.errors, // Cumulative errors
      };
    });
  }, [history]);

  // Calculate Burst (Max WPM)
  const burst = useMemo(() => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((d) => d.WPM));
  }, [data]);

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 mt-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-end mb-4 px-4 max-w-304">
        <h3 className="text-preset-3 text-neutral-400">Pace over time</h3>
        <span className="text-yellow-500 text-preset-4">
          Peak Burst: {burst} WPM
        </span>
      </div>

      <div className="w-full h-full max-w-304">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#404040"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#646669"
              tick={{ fill: "#646669" }}
              label={{
                value: "Time (s)",
                position: "insideBottom",
                offset: -5,
                fill: "#646669",
              }}
            />
            <YAxis yAxisId="left" stroke="#646669" tick={{ fill: "#646669" }} />
            {/* Secondary Y Axis for Errors (if we want to show errors as a line/bar) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ef4444"
              tick={{ fill: "#ef4444" }}
              label={{
                value: "Errors",
                angle: 90,
                position: "insideRight",
                fill: "#ef4444",
              }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />

            {/* Raw Speed Line (Grey/Subtle) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Raw"
              stroke="#646669"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />

            {/* Net WPM Line (Yellow/Main) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="WPM"
              stroke="#e2b714"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />

            {/* Errors Line (Red) */}
            <Line
              yAxisId="right"
              type="step"
              dataKey="Errors"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
