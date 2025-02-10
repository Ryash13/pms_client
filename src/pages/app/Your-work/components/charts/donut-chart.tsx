import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Backlog", value: 14, color: "#D3D3D3" }, // Gray
  { name: "Unstarted", value: 2, color: "#377DFF" }, // Blue
  { name: "Started", value: 5, color: "#F4A100" }, // Orange
  { name: "Completed", value: 4, color: "#1FAA59" }, // Green
  { name: "Canceled", value: 9, color: "#D32F2F" }, // Red
];

const DonutChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="flex justify-center items-center border-[0.5px] rounded-md hover:shadow-lg dark:hover:shadow-gray-400/55">
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={30} // Smaller hole
          outerRadius={45} // Default width for all slices
          paddingAngle={5}
          cornerRadius={10} // Rounded edges
          dataKey="value"
          isAnimationActive
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                transition: "all 0.3s ease-in-out",
                transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)", // Expands on hover
                transformOrigin: "center", // Keeps expansion centered
              }}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DonutChart;
