import { useAppState } from "@/context/AppState";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: { name: string; value: number; color: string }[];
}

const PriorityBarChart = ({ data }: ChartProps) => {
  const { isDarkMode } = useAppState();
  const maxValue = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 1;
  return (
    <div className="w-full h-64 flex items-center justify-center border rounded-lg p-4 hover:shadow-lg dark:hover:shadow-gray-400/55 transition-all">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: isDarkMode ? "white" : "black" }}
              axisLine={false} // Removes the border line
              tickLine={false} // Removes the tick line
            />
            <YAxis
              domain={[0, maxValue]}
              ticks={[0, maxValue]}
              tick={{ fill: isDarkMode ? "white" : "black" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="value" barSize={20} radius={[5, 5, 5, 5]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} /> // Dynamically setting color per bar
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center">No data found</p>
      )}
    </div>
  );
};

export default PriorityBarChart;

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border rounded-md text-sm">
        <p className="font-semibold">{payload[0].payload.name}</p>{" "}
        {/* Show category name */}
        <p>Value: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};
