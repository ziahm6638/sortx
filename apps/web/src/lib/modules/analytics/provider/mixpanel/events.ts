// @ts-expect-error package is not installed per default
import mixpanel from "mixpanel-browser";

export function trackEvent(event: string, data?: Record<string, unknown>) {
  mixpanel.track(event, data);
}
