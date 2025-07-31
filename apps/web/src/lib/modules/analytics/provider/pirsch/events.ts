export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined" || !(window as any).pirsch) {
    return;
  }

  (window as any).pirsch(event, {
    meta: data,
  });
}
