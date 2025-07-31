<script lang="ts">
  import ActionBlock from "$lib/modules/saas/shared/components/ActionBlock.svelte";
  import PricingTable from "@shared/components/PricingTable.svelte";
  import { apiClient } from "@shared/lib/ApiClient";
  import type { ApiOutput } from "api/trpc/router";
  import { page } from "$app/state";

  type SubscriptionPlan = ApiOutput["billing"]["plans"][number];

  interface Props {
    plans: SubscriptionPlan[];
    activePlanId: string | undefined;
    teamId: string;
  }

  let { plans, activePlanId, teamId }: Props = $props();

  async function onSelectPlan(planId: string, variantId: string) {
    const checkoutLink = await apiClient(
      page,
    ).billing.createCheckoutLink.mutate({
      planId,
      variantId,
      teamId,
      redirectUrl: window.location.href,
    });

    window.location.href = checkoutLink;
  }
</script>

<ActionBlock title="Upgrade your plan">
  <PricingTable
    className="md:-mt-12"
    {plans}
    {activePlanId}
    {onSelectPlan}
    labels={{
      currentPlan: "Your current plan",
      yearly: "Yearly",
      monthly: "Monthly",
      year: "year",
      month: "month",
      subscribe: "Subscribe",
      switchToPlan: "Switch to this plan",
    }}
  />
</ActionBlock>
