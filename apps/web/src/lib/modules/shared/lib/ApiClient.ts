import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";
import type { ApiRouter } from "api/trpc/router";
import superjson from "superjson";

let browserClient: ReturnType<typeof createTRPCClient<ApiRouter>>;

export function apiClient(init?: TRPCClientInit) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && browserClient) return browserClient;
  const client = createTRPCClient<ApiRouter>({ init, transformer: superjson });
  if (isBrowser) browserClient = client;
  return client;
}
