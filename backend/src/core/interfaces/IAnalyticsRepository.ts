import { AnalyticsMetrics } from "../entities/Analytics.ts";

export interface IAnalyticsRepository {
  getDashboardMetrics(): Promise<AnalyticsMetrics>;
}
