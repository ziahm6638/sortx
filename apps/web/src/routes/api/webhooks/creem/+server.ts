import { createAdminApiCaller } from "api/trpc/caller";
import type { SubscriptionStatusType } from "database";
import { createHmac } from "node:crypto";
import type { RequestHandler } from "./$types";
import type { CreemWebhookData } from "./types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const signature = request.headers.get("creem-signature");

    if (!signature) {
      return new Response("Missing signature.", {
        status: 400,
      });
    }

    const secret = process.env.CREEM_WEBHOOK_SECRET as string;

    if (!secret) {
      return new Response("Missing webhook secret.", {
        status: 400,
      });
    }

    const bodyText = await request.text();

    const computedSignature = createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex");

    if (computedSignature !== signature) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = (await request.json()) as CreemWebhookData | null;

    const type = payload?.eventType ?? null;

    if (
      !type ||
      ![
        "subscription.active",
        "subscription.canceled",
        "subscription.update",
      ].includes(type)
    ) {
      return new Response("Invalid event type.", {
        status: 400,
      });
    }

    const statusMap: Record<string, SubscriptionStatusType> = {
      active: "ACTIVE",
      unpaid: "UNPAID",
      canceled: "CANCELED",
      trialing: "TRIALING",
      paused: "PAUSED",
    };

    const apiCaller = await createAdminApiCaller();

    const subscription = payload?.object;

    if (!subscription?.metadata.teamId) {
      throw new Error("Invalid payload.");
    }
    const selectedPlanId = subscription?.product.id;

    await apiCaller.billing.syncSubscription({
      id: subscription.id,
      teamId: subscription.metadata.teamId,
      customerId: subscription.customer.id,
      planId: String(selectedPlanId),
      variantId: String(selectedPlanId),
      status: statusMap[subscription.status],
      nextPaymentDate: new Date(subscription.current_period_end_date),
    });
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
