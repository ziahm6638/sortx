<script lang="ts">
  import CancelSubscriptionButton from "$lib/modules/saas/settings/components/CancelSubscriptionButton.svelte";
  import SubscriptionStatusBadge from "$lib/modules/saas/settings/components/SubscriptionStatusBadge.svelte";
  import CustomerPortalButton from "$lib/modules/saas/settings/components/CustomerPortalButton.svelte";
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import type { ApiOutput } from "api/trpc/router";

  type SubscriptionPlan = ApiOutput["billing"]["plans"][number];

  interface Props {
    plans: SubscriptionPlan[];
    currentSubscription?: 
    | ApiOutput["team"]["subscription"]
    | undefined;
    className?: string;
  }

  let { plans, currentSubscription = undefined, className = "" }: Props = $props();

  const freePlan: SubscriptionPlan = {
    id: "free",
    name: "Free",
    variants: [
      {
        id: "free",
        interval_count: 1,
        price: 0,
        interval: "month",
        // TODO: use local currency
        currency: "USD",
      },
    ],
  };

  const activePlanId = currentSubscription
    ? currentSubscription.planId
    : "free";
  const activeVariantId = currentSubscription
    ? currentSubscription.variantId
    : "free";

  const subscriptionPlan = [freePlan, ...plans].find(
    (plan) => plan.id === activePlanId,
  );
  const subscriptionVariant = subscriptionPlan?.variants.find(
    (variant) => variant.id === activeVariantId,
  );

  const formattedPrice = subscriptionVariant
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(subscriptionVariant?.price / 100)
    : undefined;
</script>

{#if subscriptionPlan && subscriptionVariant}
  <ActionBlock title="Your current subscription" {className}>
    <div class="flex items-center gap-2">
      <h4 class="text-primary text-lg font-bold">
        <span>{subscriptionPlan.name}</span>
        <small class="font-normal">
          ({formattedPrice}{subscriptionVariant.interval})
        </small>
      </h4>
      {#if currentSubscription?.status}
        <SubscriptionStatusBadge status={currentSubscription.status} />
      {/if}
    </div>

    {#if currentSubscription?.nextPaymentDate}
      <p class="text-muted-foreground mt-1">
        {#if currentSubscription.status === "CANCELED" || currentSubscription.status === "PAUSED"}
          Your subscription ends on <strong
            >{currentSubscription.nextPaymentDate}</strong
          >
        {:else}
          The next payment will be on <strong
            >{currentSubscription.nextPaymentDate}</strong
          >
        {/if}
      </p>
    {/if}

    {#if currentSubscription}
      <div class="-mx-6 -mb-6 mt-6 flex justify-end border-t px-6 py-3">
        <div class="flex w-full flex-col justify-between gap-3 md:flex-row">
          <div>
            <CustomerPortalButton subscriptionId={currentSubscription.id} />
          </div>

          <div class="flex flex-col gap-3 md:flex-row">
            {#if currentSubscription.status === "ACTIVE" || currentSubscription.status === "TRIALING"}
              <CancelSubscriptionButton
                id={currentSubscription.id}
                label="Cancel your subscription"
              />
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </ActionBlock>
{/if}
