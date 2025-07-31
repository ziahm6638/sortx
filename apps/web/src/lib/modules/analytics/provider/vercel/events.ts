// @ts-expect-error package is not installed per default
import { track } from "@vercel/analytics";

export function trackEvent(event: string, data?: Record<string, unknown>) {
  track(event, data);
}
