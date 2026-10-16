import type { Context } from "@oak/oak";
import { GetAdminDashboardMetricsUseCase } from "../../core/use-cases/GetAdminDashboardMetricsUseCase.ts";

export class AdminAnalyticsController {
  constructor(private readonly getMetricsUseCase: GetAdminDashboardMetricsUseCase) {}

  public async getMetrics(ctx: Context) {
    const metrics = await this.getMetricsUseCase.execute();
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: metrics.props,
    };
  }
}
