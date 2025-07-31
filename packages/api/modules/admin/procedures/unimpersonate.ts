import { TRPCError } from "@trpc/server";
import { lucia } from "auth";
import { db } from "database";
import { logger } from "logs";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";

// this procedure has to be "non-admin" because we are requesting it with a regular user session
export const unimpersonate = protectedProcedure
  .input(z.void())
  .output(z.void())
  .mutation(async ({ ctx: { session, event } }) => {
    try {
      const currentSession = await db.userSession.findUnique({
        where: {
          id: session.id,
        },
      });

      if (!currentSession?.impersonatorId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await lucia.invalidateSession(session.id);

      const newSession = await lucia.createSession(
        currentSession.impersonatorId,
        {},
      );

      const sessionCookie = lucia.createSessionCookie(newSession.id);
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
