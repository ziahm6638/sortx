<script lang="ts">
  import { Button, Tabs, TabsList, TabsTrigger } from "@ui/components";
  import type { ApiOutput } from "api/trpc/router";
  import { twMerge } from "tailwind-merge";

  type SubscriptionPlan = ApiOutput["billing"]["plans"][number] & {
    features?: Array<string>;
  };

  interface Labels {
    yearly: string;
    monthly: string;
    month: string;
    year: string;
    subscribe: string;
    currentPlan?: string;
    switchToPlan?: string;
  }

  interface Props {
    plans: SubscriptionPlan[];
    activePlanId?: string | undefined;
    onSelectPlan: (planId: string, variantId: string) => void | Promise<void>;
    className?: string;
    labels: Labels;
  }

  let {
    plans,
    activePlanId = undefined,
    onSelectPlan,
    className = "",
    labels,
  }: Props = $props();

  let interval: "month" | "year" = $state("month");
  let selectedPlan: string | null = $state(null);

  const isActivePlan = (plan: (typeof plans)[number]) => {
    return activePlanId === plan.id;
  };

  let sortedAndFilteredPlans = $derived(
    [...plans]
      .map((plan) => {
        const variants = plan.variants
          .filter(
            (v) =>
              v.interval === interval &&
              v.currency.toLowerCase() === "USD".toLowerCase(),
          )
          .sort((a, b) => a.price - b.price);

        return {
          ...plan,
          variants,
        };
      })
      .filter((plan) => plan.variants.length > 0)
      .sort((a, b) => {
        const lowestPriceA = a.variants.reduce(
          (lowest, variant) => Math.min(lowest, variant.price),
          Infinity,
        );
        const lowestPriceB = b.variants.reduce(
          (lowest, variant) => Math.min(lowest, variant.price),
          Infinity,
        );

        return lowestPriceA - lowestPriceB;
      }),
  );

  function updateInterval(value: string | undefined) {
    if (value !== undefined) {
      interval = value as typeof interval;
    }
  }

  async function handleSelectPlan(planId: string, variantId: string) {
    selectedPlan = planId;
    await onSelectPlan(planId, variantId);
    selectedPlan = null;
  }
</script>

<div class={twMerge(className, "@container")}>
  <div class="flex justify-end">
    <Tabs
      value={interval}
      onValueChange={updateInterval}
      class="mb-4"
      data-test="price-table-interval-tabs"
    >
      <TabsList>
        <TabsTrigger value="month">{labels.monthly}</TabsTrigger>
        <TabsTrigger value="year">{labels.yearly}</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>

  <div class="@2xl:grid-cols-3 grid gap-4">
    {#each sortedAndFilteredPlans as plan}
      {#each plan.variants as variant}
        {#if variant.interval === interval}
          <div class="rounded-xl border p-6" data-test="price-table-plan">
            <div class="flex h-full flex-col justify-between gap-4">
              <div>
                <h3 class="mb-4 text-2xl font-bold">{plan.name}</h3>
                {#if plan.description}
                  <div class="prose text-muted-foreground mb-2">
                    {@html plan.description}
                  </div>
                {/if}

                {#if plan.features?.length}
                  <ul class="text-muted-foreground grid list-disc gap-2 pl-4">
                    {#each plan.features as feature}
                      <li>{feature}</li>
                    {/each}
                  </ul>
                {/if}
              </div>

              <div>
                <strong
                  class="text-primary text-2xl font-bold"
                  data-test="price-table-plan-price"
                >
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: variant.currency,
                  }).format(variant.price / 100)}
                  <span class="text-sm font-normal opacity-70">
                    {" "}
                    / {labels[interval]}
                  </span>
                </strong>

                <Button
                  disabled={isActivePlan(plan)}
                  loading={selectedPlan === plan.id}
                  class="mt-4 w-full"
                  onclick={async () => {
                    handleSelectPlan(plan.id, String(variant.id));
                  }}
                >
                  {isActivePlan(plan)
                    ? labels.currentPlan
                    : activePlanId
                      ? labels.switchToPlan
                      : labels.subscribe}
                </Button>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>
