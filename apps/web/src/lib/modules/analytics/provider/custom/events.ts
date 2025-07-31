import { logger } from "logs";

export function trackEvent(event: string, data: Record<string, unknown>) {
  // call your analytics service to track a custom event here
  logger.info("tracking event", event, data);
}
