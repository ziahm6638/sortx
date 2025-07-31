<script lang="ts">
  import SaasFooter from "$lib/modules/saas/shared/components/SaasFooter.svelte";
  import ColorModeToggle from "@shared/components/ColorModeToggle.svelte";
  import Logo from "@shared/components/Logo.svelte";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex min-h-screen w-full p-8">
  <div class="flex w-full flex-col items-center justify-between gap-8">
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

    <main class="w-full max-w-md">
      {@render children?.()}
    </main>

    <SaasFooter />
  </div>
</div>
