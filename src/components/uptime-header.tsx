"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import PeriodDropdown from "./period-dropdown";
import { UptimeHeaderProps } from "@/interfaces";

export default function UptimeHeader({
  uptime,
  chartData,
  selectedPeriod,
  setSelectedPeriod,
  loading,
  error,
}: UptimeHeaderProps) {
  const getUptimeColor = (percentage: number) => {
    if (percentage >= 95) return "text-emerald-400";
    if (percentage >= 80) return "text-amber-400";
    return "text-red-400";
  };

  const getUptimeIcon = (percentage: number) => {
    if (percentage >= 95) {
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
    if (percentage >= 80) {
      return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    }
    return <XCircle className="w-5 h-5 text-red-400" />;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm p-4 border border-slate-600/50 rounded-xl shadow-2xl">
          <p className="text-slate-200 font-medium text-sm">
            {data.payload.fullDate}
          </p>
          <p
            className={`font-semibold text-base ${
              data.payload.status === "ok" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {`Response Time: ${data.value}ms`}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Status: {data.payload.status === "ok" ? "OK" : "Error"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-slate-200">Uptime</h2>
          <div className="flex items-center space-x-2">
            {getUptimeIcon(uptime)}
            <span className={`text-lg font-semibold ${getUptimeColor(uptime)}`}>
              {uptime.toFixed(2)} %
            </span>
          </div>
        </div>
        <PeriodDropdown
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          loading={loading}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
          <p className="text-red-400 text-sm">Error loading data: {error}</p>
        </div>
      )}

      <div className="h-72 w-full bg-gradient-to-b from-slate-800/30 to-slate-900/20 rounded-xl p-4 border border-slate-700/30">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-transparent border-t-blue-400 border-r-blue-300"></div>
          </div>
        ) : chartData.length === 0 && !error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">
              No data available for the selected period
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="backgroundGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1e293b" stopOpacity={0.3} />
                  <stop offset="30%" stopColor="#334155" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="#475569" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity={0.1} />
                </linearGradient>

                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="75%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>

                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#475569" }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                domain={[0, 5000]}
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#475569" }}
                label={{
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#94a3b8", fontSize: "12px" },
                }}
              />

              <CartesianGrid
                strokeDasharray="2 4"
                stroke="#374151"
                strokeOpacity={0.3}
                vertical={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <Area
                type="linear"
                dataKey="responseTime"
                stroke="none"
                fill="url(#area)"
              />

              <Line
                type="linear"
                dataKey="responseTime"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 8,
                  stroke: "#1e40af",
                  strokeWidth: 3,
                  fill: "#3b82f6",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
