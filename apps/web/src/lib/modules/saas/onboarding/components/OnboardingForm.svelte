<script lang="ts">
  import { goto, invalidateAll, replaceState } from "$app/navigation";
  import { page } from "$app/state";
  import type { User } from "$lib/types";
  import { apiClient } from "@shared/lib/ApiClient";
  import { Progress } from "@ui/components";
  import { onMount } from "svelte";
  import OnboardingStep1 from "./OnboardingStep1.svelte";
  import OnboardingStep2 from "./OnboardingStep2.svelte";

  interface Props {
    user: User;
  }

  let { user }: Props = $props();

  const totalSteps = 2;
  let onboardingStep = $state(1);

  onMount(() => {
    const searchParams = new URLSearchParams(page.url.searchParams);
    const stepSearchParam = searchParams.get("step");
    onboardingStep = stepSearchParam ? parseInt(stepSearchParam, 10) : 1;
  });

  function goToStep(step: number) {
    replaceState(`?step=${step}`, {});
    onboardingStep = step;
  }

  const onCompleted = async () => {
    await apiClient(page).auth.update.mutate({
      onboardingComplete: true,
    });
    await invalidateAll();
    goto("/app/dashboard");
  };
</script>

<div>
  <h1 class="text-3xl font-bold md:text-4xl">Set up your account</h1>
  <p class="mb-6 mt-2 text-muted-foreground">
    Just a few quick steps to get you started.
  </p>

  <div class="mb-6 flex items-center gap-3">
    <Progress value={(onboardingStep / totalSteps) * 100} class="h-2" />
    <span class="shrink-0 text-xs text-muted-foreground">
      Step {onboardingStep} / {totalSteps}
    </span>
  </div>

  {#if onboardingStep === 1}
    <OnboardingStep1 onCompleted={() => goToStep(2)} {user} />
  {:else if onboardingStep === 2}
    <OnboardingStep2 {onCompleted} onBack={() => goToStep(1)} {user} />
  {/if}
</div>
