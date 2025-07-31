<script lang="ts">
  import SubscriptionOverview from "$lib/modules/saas/settings/components/SubscriptionOverview.svelte";
  import UpgradePlan from "$lib/modules/saas/settings/components/UpgradePlan.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();

  let plans = $derived(data.plans);
  let teamSubscription = $derived(data.teamSubscription);
  let teamId = $derived(data.teamId);
</script>

<div>
  <SubscriptionOverview
    {plans}
    currentSubscription={teamSubscription}
    className="mb-4"
  />
  <UpgradePlan {plans} activePlanId={teamSubscription?.planId} {teamId} />
</div>
