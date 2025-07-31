import { TRPCError } from "@trpc/server";
import { logger } from "logs";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc/base";
import { createCheckoutLink as createCheckoutLinkResolver } from "../provider";

export const createCheckoutLink = protectedProcedure
  .input(
    z.object({
      planId: z.string(),
      variantId: z.string(),
      teamId: z.string(),
      redirectUrl: z.string().optional(),
    }),
  )
  .output(z.string())
  .mutation(
    async ({
      input: { planId, variantId, redirectUrl, teamId },
      ctx: { user },
    }) => {
      try {
        const checkoutLink = await createCheckoutLinkResolver({
          planId,
          variantId,
          email: user.email,
          name: user.name ?? "",
          teamId,
          redirectUrl,
        });

        if (!checkoutLink) {
          throw new Error("Could not create checkout link");
        }

        return checkoutLink;
      } catch (e) {
        logger.error(e);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    },
  );
