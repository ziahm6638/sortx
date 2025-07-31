export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined" || !(window as any).plausible) {
    return;
  }

  (window as any).plausible(event, {
    props: data,
  });
}
