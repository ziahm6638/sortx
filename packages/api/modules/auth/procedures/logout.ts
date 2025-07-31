import { TRPCError } from "@trpc/server";
import { lucia } from "auth";
import { logger } from "logs";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

export const logout = protectedProcedure
  .input(z.void())
  .mutation(async ({ ctx: { session, event } }) => {
    try {
      await lucia.invalidateSession(session.id);
      const sessionCookie = lucia.createBlankSessionCookie();
      event?.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: "/",
      });
    } catch (e) {
      logger.error(e);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  });
