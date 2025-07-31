import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createApiCaller } from "api/trpc/caller";
import { createContext } from "api/trpc/context";
import { apiRouter } from "api/trpc/router";
import { lucia } from "auth";
import { createTRPCHandle } from "trpc-sveltekit";

const trpcHandle = createTRPCHandle({
  router: apiRouter,
  createContext,
});

const authHandle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  const { cookies, request } = event;
  const apiCaller = await createApiCaller({ cookies, request });
  event.locals.user = await apiCaller.auth.user();
  event.locals.session = session;
  return resolve(event);
};

export const handle: Handle = sequence(authHandle, trpcHandle);
