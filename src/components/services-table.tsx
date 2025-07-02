"use client";
import React from "react";
import { Monitor, Server, Database, ExternalLink } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ServicesTableProps } from "@/interfaces";

function ServicesTable({ servicesData, loading = false }: ServicesTableProps) {
  const getServiceIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case "frontend":
        return <Monitor className="w-5 h-5 text-slate-400" />;
      case "backend":
        return <Server className="w-5 h-5 text-slate-400" />;
      case "supabase":
        return <Database className="w-5 h-5 text-slate-400" />;
      default:
        return <Server className="w-5 h-5 text-slate-400" />;
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 95) return "text-emerald-400";
    if (uptime >= 80) return "text-amber-400";
    return "text-red-400";
  };

  const UptimePie = ({ percentage }: { percentage: number }) => {
    const data = [
      { name: "Uptime", value: percentage },
      { name: "Downtime", value: 100 - percentage },
    ];

    const COLORS = [
      percentage >= 95 ? "#10b981" : percentage >= 80 ? "#f59e0b" : "#ef4444",
      "#374151",
    ];

    return (
      <div className="w-5 h-5 mr-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={10}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const formatServiceName = (serviceName: string) => {
    return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  };

  const formatResponseTime = (time: number) => {
    return Math.round(time);
  };

  const handleServiceCheck = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-200">
            Services Status
          </h2>
        </div>
        <div className="bg-slate-800/30 rounded-b-2xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-transparent border-t-blue-400 border-r-blue-300"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!servicesData) {
    return (
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-200">
            Services Status
          </h2>
        </div>
        <div className="bg-slate-800/30 rounded-b-2xl">
          <div className="text-center text-slate-400 py-8">
            Error loading service data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-300">
                  {servicesData.statusCounts.ok} OK
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-slate-300">
                  {servicesData.statusCounts.degraded} Degraded
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-slate-300">
                  {servicesData.statusCounts.down} Down
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            Total Checks: {servicesData.totalChecks}
          </div>
        </div>
      </div>

      {/* Tabela com background */}
      <div className="bg-slate-800/30 rounded-b-2xl border-t border-slate-700/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700/20 border-b border-slate-600/30">
                <th className="text-left py-4 px-6 font-semibold text-slate-200">
                  Service
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">
                  Response Time Average
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-200">
                  Uptime
                </th>
                <th className="text-center py-4 px-6 font-semibold text-slate-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(servicesData.services).map(
                ([serviceName, service]) => (
                  <tr
                    key={serviceName}
                    className="border-b border-slate-700/20 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {getServiceIcon(serviceName)}
                        <span className="font-medium text-slate-200">
                          {formatServiceName(serviceName)}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-200">
                        {formatResponseTime(service.avgResponseTime)}ms
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <UptimePie percentage={service.uptime} />
                        <span
                          className={`font-semibold ${getUptimeColor(
                            service.uptime
                          )}`}
                        >
                          {service.uptime.toFixed(1)}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleServiceCheck(service.url)}
                        className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-blue-400 hover:bg-slate-700/30 rounded-full transition-colors"
                        title={`Check ${formatServiceName(
                          serviceName
                        )} manually`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ServicesTable);
