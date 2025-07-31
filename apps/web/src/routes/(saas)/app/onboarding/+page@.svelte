<script lang="ts">
  import OnboardingForm from "@saas/onboarding/components/OnboardingForm.svelte";
  import Footer from "@saas/shared/components/Footer.svelte";
  import ColorModeToggle from "@shared/components/ColorModeToggle.svelte";
  import Logo from "@shared/components/Logo.svelte";
  import type { PageServerData } from "./$types";

  interface Props {
    data: PageServerData;
  }

  let { data }: Props = $props();
</script>

<div class="flex min-h-screen w-full bg-card p-8">
  <div class="flex w-full flex-col items-center justify-between">
    <div class="container">
      <div class="flex items-center justify-between">
        <a href="/" class="block">
          <Logo />
        </a>

        <div class="flex items-center justify-end gap-2">
          <ColorModeToggle />
        </div>
      </div>
    </div>

    <div class="container w-full max-w-md">
      <OnboardingForm user={data.user} />
    </div>

    <Footer />
  </div>
</div>
