import { TRPCError } from "@trpc/server";
import { lucia, validateOneTimePassword } from "auth";
import { UserOneTimePasswordTypeSchema, db } from "database";
import { logger } from "logs";
import { z } from "zod";
import { publicProcedure } from "../../../trpc/base";

export const verifyOtp = publicProcedure
  .input(
    z.object({
      type: UserOneTimePasswordTypeSchema,
      identifier: z.string(),
      code: z.string(),
    }),
  )
  .mutation(async ({ input: { type, identifier, code }, ctx: { event } }) => {
    try {
      const userId = await validateOneTimePassword({
        type,
        identifier,
        code,
      });

      const user = await db.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (!user.emailVerified) {
        await db.user.update({
          where: { id: user.id },
          data: {
            emailVerified: true,
          },
        });
      }

      const session = await lucia.createSession(userId, {});

      const sessionCookie = lucia.createSessionCookie(session.id);
      event?.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: "/",
      });

      return session;
    } catch (e) {
      logger.error(e);

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid one-time password",
      });
    }
  });
