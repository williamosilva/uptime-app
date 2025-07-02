"use client";

import { LiveClock } from "@/components/live-clock";
import ServicesTable from "@/components/services-table";
import { TabSelector } from "@/components/tab-selector";
import UptimeHeader from "@/components/uptime-header";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChartDataPoint,
  PeriodValue,
  ResponseTimeData,
  StatsResponse,
  ServicesData,
} from "@/interfaces";
import { uptimeService } from "@/services/uptime-service";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    null as boolean | null
  );
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Backend");
  const [uptime, setUptime] = useState(0);
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue>(7);
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("authenticated!");
    if (auth !== "true") {
      router.push("/");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  const generateChartData = (
    data: ResponseTimeData[],
    period: PeriodValue,
    tab: string
  ): ChartDataPoint[] => {
    return data
      .map((item) => {
        const date = new Date(item.timestamp);

        let dateFormat: string;
        let fullDateFormat: string;

        if (period === "today") {
          dateFormat = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          fullDateFormat =
            date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }) +
            ", " +
            dateFormat;
        } else if (period === "all") {
          dateFormat = date.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
          });
          fullDateFormat = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          });
        } else {
          dateFormat = date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          });
          fullDateFormat =
            date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }) +
            ", " +
            date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
        }

        const filterLower = tab.toLowerCase();
        let responseTime: number;
        let status: string;

        if (filterLower === "backend") {
          responseTime = item.backend_response_time || 0;
          status = item.backend_status || "unknown";
        } else if (filterLower === "frontend") {
          responseTime = item.frontend_response_time || 0;
          status = item.frontend_status || "unknown";
        } else if (filterLower === "supabase") {
          responseTime = item.supabase_response_time || 0;
          status = item.supabase_status || "unknown";
        } else {
          responseTime = item.backend_response_time || 0;
          status = item.backend_status || "unknown";
        }

        return {
          date: dateFormat,
          fullDate: fullDateFormat,
          responseTime,
          status,
        };
      })
      .reverse();
  };

  const fetchUptimeData = async (period: PeriodValue, tab: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await uptimeService.getHealthHistory(period, tab);
      const stats: StatsResponse = await uptimeService.getHealthStats(period);
      const processedData = generateChartData(result, period, tab);
      setChartData(processedData);

      const serviceKey = tab.toLowerCase() as keyof typeof stats.data.services;

      if (stats.data?.services && serviceKey in stats.data.services) {
        const serviceStats = stats.data.services[serviceKey];
        const uptimeFromStats = serviceStats?.uptime ?? 0;
        setUptime(uptimeFromStats);
      } else {
        setUptime(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setChartData([]);
      setUptime(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchServicesData = async (period: PeriodValue) => {
    setLoadingServices(true);
    setError(null);
    try {
      const stats: StatsResponse = await uptimeService.getHealthStats(period);

      setServicesData(stats.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setServicesData(null);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUptimeData(selectedPeriod, activeTab);
    }
  }, [selectedPeriod, activeTab, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchServicesData(selectedPeriod);
    }
  }, [selectedPeriod, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated!");
    router.push("/");
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-200 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="overflow-hidden mb-12">
          <div className="flex items-start justify-between">
            <div className="text-start">
              <h1 className="text-4xl font-semibold text-slate-200 mb-0">
                System Status
              </h1>
              <LiveClock />
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer bg-slate-800/50 hover:bg-red-600/20 border border-slate-700/50 hover:border-red-500/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <TabSelector
          tabs={["Backend", "Frontend", "Supabase"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <UptimeHeader
          uptime={uptime}
          chartData={chartData}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          loading={loading}
          error={error}
        />

        <ServicesTable servicesData={servicesData} loading={loadingServices} />
      </div>
    </div>
  );
}
