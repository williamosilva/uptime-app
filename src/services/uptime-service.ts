import {
  ResponseTimeData,
  PeriodValue,
  StatsResponse,
  UptimeApiResponse,
} from "@/interfaces";

class UptimeService {
  private getBaseUrl(): string {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!backendUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    return backendUrl;
  }

  private getDaysParam(period: PeriodValue): string {
    if (period === "today") return "1";
    if (period === "all") return "999";
    return period.toString();
  }

  async getHealthHistory(
    period: PeriodValue,
    filter: string
  ): Promise<ResponseTimeData[]> {
    try {
      const baseUrl = this.getBaseUrl();
      const daysParam = this.getDaysParam(period);
      const filterParam = filter.toLowerCase();

      let apiUrl = `${baseUrl}/health/history/last-days?filter=${filterParam}`;

      if (daysParam) {
        apiUrl += `&days=${daysParam}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `API error: ${response.status} - ${response.statusText}`
        );
      }

      const json: UptimeApiResponse = await response.json();
      return json.data;
    } catch (error) {
      console.error("Error in UptimeService:", error);
      throw error;
    }
  }

  async getHealthStats(period: PeriodValue): Promise<StatsResponse> {
    try {
      const baseUrl = this.getBaseUrl();
      const daysParam = this.getDaysParam(period);
      const apiUrl = `${baseUrl}/health/stats/last-days?days=${daysParam}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} - ${response.statusText}`
        );
      }

      const json: StatsResponse = await response.json();
      return json;
    } catch (error) {
      console.error("Error in UptimeService (getHealthStats):", error);
      throw error;
    }
  }
}

export const uptimeService = new UptimeService();
