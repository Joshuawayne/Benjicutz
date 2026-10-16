import type { AnalyticsMetrics } from "../entities/Analytics.ts";
import type { IAnalyticsRepository } from "../interfaces/IAnalyticsRepository.ts";

export class GetAdminDashboardMetricsUseCase {
  constructor(private readonly analyticsRepo: IAnalyticsRepository) {}

  public async execute(): Promise<AnalyticsMetrics> {
    return await this.analyticsRepo.getDashboardMetrics();
  }
}
