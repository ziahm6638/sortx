export function getBaseUrl() {
  if (import.meta.env.PUBLIC_SITE_URL) return import.meta.env.PUBLIC_SITE_URL;
  if (process?.env?.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${import.meta.env.PORT ?? 5173}`;
}
