<script lang="ts">
  import { goto } from "$app/navigation";
  import PricingTable from "@shared/components/PricingTable.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();

  const plans = data.plans;

  function onSelectPlan() {
    goto("/auth/signup");
  }

  const labels = {
    year: "year",
    month: "month",
    yearly: "Yearly",
    monthly: "Monthly",
    subscribe: "Subscribe",
  };
</script>

<main>
  <div class="px-8 pb-24 pt-40">
    <div class="container">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">Pricing</h1>
        <p class="mt-3 text-lg opacity-50">
          Choose the plan that works best for you.
        </p>
      </div>

      <div class="container max-w-4xl">
        <PricingTable {plans} {onSelectPlan} {labels} />
      </div>
    </div>
  </div>
</main>
