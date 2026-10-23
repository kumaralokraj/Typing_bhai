import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function SpeedChart({ performance = [] }) {
  if (!performance.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-500">
        Not enough typing data to display a speed graph.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Speed Over Time
      </h2>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performance}>
            <defs>
              <linearGradient id="speedFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#22d3ee"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1e293b"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              unit="s"
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              width={35}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="wpm"
              name="WPM"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#speedFill)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Time (seconds) vs typing speed (WPM)
      </p>
    </div>
  );
}

export default SpeedChart;