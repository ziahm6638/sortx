import { createAdminApiCaller } from "api/trpc/caller";
import { createHmac, timingSafeEqual } from "crypto";
import type { SubscriptionStatusType } from "database";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const text = await request.text();
    const hmac = createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET!);
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(request.headers.get("x-signature")!, "utf8");

    if (!timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = JSON.parse(text) as {
      meta: {
        event_name: string;
        custom_data?: {
          team_id: string;
        };
      };
      data: {
        id: string;
        attributes: {
          customer_id: string;
          product_id: string;
          variant_id: string;
          status: string;
          trial_ends_at?: number;
          renews_at?: number;
        };
      };
    } | null;

    if (!payload) {
      return new Response("Invalid payload.", {
        status: 400,
      });
    }

    const {
      meta: { event_name: eventName, custom_data: customData },
      data,
    } = payload;

    if (!customData?.team_id) {
      return new Response("Invalid team ID.", {
        status: 400,
      });
    }

    const statusMap: Record<string, SubscriptionStatusType> = {
      active: "ACTIVE",
      past_due: "PAST_DUE",
      unpaid: "UNPAID",
      cancelled: "CANCELED",
      expired: "EXPIRED",
      on_trial: "TRIALING",
      paused: "PAUSED",
    };

    const apiCaller = await createAdminApiCaller();

    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_cancelled":
      case "subscription_expired":
      case "subscription_resumed":
        // eslint-disable-next-line no-case-declarations
        const nextPaymentDate =
          data.attributes.trial_ends_at ?? data.attributes.renews_at;

        await apiCaller.billing.syncSubscription({
          id: String(data.id),
          teamId: customData?.team_id,
          customerId: String(data.attributes.customer_id),
          planId: String(data.attributes.product_id),
          variantId: String(data.attributes.variant_id),
          status: statusMap[data.attributes.status],
          nextPaymentDate: nextPaymentDate ? new Date(nextPaymentDate) : null,
        });
        break;
    }
  } catch (error: unknown) {
    return new Response(
      `Webhook error: ${error instanceof Error ? error.message : ""}`,
      {
        status: 400,
      },
    );
  }

  return new Response(null, {
    status: 204,
  });
};
