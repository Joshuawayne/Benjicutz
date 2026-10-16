import type { Context } from "@oak/oak";
import { AppError } from "../../shared/errors/AppError.ts";
import { Logger } from "../../shared/utils/logger.ts";

export async function errorLoggerMiddleware(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err: any) {
    if (err instanceof AppError) {
      Logger.warn(`[AppError ${err.statusCode}] ${err.message}`, err.details);
      ctx.response.status = err.statusCode;
      ctx.response.body = {
        error: err.message,
        statusCode: err.statusCode,
        details: err.details,
      };
    } else {
      Logger.error(`[Unhandled Error] ${err?.message || err}`, err);
      ctx.response.status = 500;
      ctx.response.body = {
        error: "Internal Server Error",
        statusCode: 500,
      };
    }
  }
}
