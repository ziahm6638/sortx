export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined" || !(window as any).umami) {
    return;
  }

  (window as any).umami.track(event, {
    props: data,
  });
}
