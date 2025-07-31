import { type Cookies, type RequestEvent } from "@sveltejs/kit";
import { t } from "./base";
import { createContext } from "./context";
import { apiRouter } from "./router";

export const createApiCaller = async (
  event?: RequestEvent | { cookies: Cookies; request: Request },
) => {
  const context = await createContext(event);
  const createCaller = t.createCallerFactory(apiRouter);
  return createCaller(context);
};

export const createAdminApiCaller = async () => {
  const context = await createContext({ isAdmin: true });
  const createCaller = t.createCallerFactory(apiRouter);
  return createCaller(context);
};
