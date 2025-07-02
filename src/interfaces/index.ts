import { Dispatch, SetStateAction } from "react";

export interface Option {
  value: PeriodValue;
  label: string;
}

export type PeriodValue = "today" | 7 | 30 | "all";

export interface PeriodDropdownProps {
  selectedPeriod: PeriodValue;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<PeriodValue>>;
  loading: boolean;
}

export interface ServiceData {
  avgResponseTime: number;
  uptime: number;
  url: string;
}

export interface ServicesData {
  totalChecks: number;
  statusCounts: {
    ok: number;
    degraded: number;
    down: number;
  };
  services: {
    [key: string]: ServiceData;
  };
}

export interface UptimeApiResponse {
  data: ResponseTimeData[];
}

export interface ResponseTimeData {
  id: string;
  timestamp: string;
  created_at: string;
  overall_status: string;
  backend_status?: string;
  backend_response_time?: number;
  backend_error?: string | null;
  frontend_status?: string;
  frontend_response_time?: number;
  frontend_error?: string | null;
  supabase_status?: string;
  supabase_response_time?: number;
  supabase_error?: string | null;
}

export interface StatsResponse {
  data: {
    totalChecks: number;
    statusCounts: StatusCounts;
    services: Services;
  };
}

export interface StatusCounts {
  ok: number;
  degraded: number;
  down: number;
}

export interface Services {
  frontend: Frontend;
  backend: Backend;
  supabase: Supabase;
  [key: string]: {
    avgResponseTime: number;
    uptime: number;
    url: string;
  };
}

export interface Frontend {
  avgResponseTime: number;
  uptime: number;
  url: string;
}

export interface Backend {
  avgResponseTime: number;
  uptime: number;
  url: string;
}

export interface Supabase {
  avgResponseTime: number;
  uptime: number;
  url: string;
}

export interface ChartDataPoint {
  date: string;
  fullDate: string;
  responseTime: number | null | undefined;
  status: string | null | undefined;
}

export interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface UptimeHeaderProps {
  uptime: number;
  chartData: ChartDataPoint[];
  selectedPeriod: PeriodValue;
  setSelectedPeriod: Dispatch<SetStateAction<PeriodValue>>;
  loading: boolean;
  error: string | null;
}

export interface ServicesTableProps {
  servicesData: ServicesData | null;
  loading?: boolean;
}
