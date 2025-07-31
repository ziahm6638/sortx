<script lang="ts">
  import { page } from "$app/state";
  import { AnalyticsScript } from "@analytics";
  import "@fontsource/poppins/latin.css";
  import GradientBackgroundWrapper from "@shared/components/GradientBackgroundWrapper.svelte";
  import InitialThemeSetter from "@shared/components/InitialThemeSetter.svelte";
  import { setThemeState } from "@shared/lib/ThemeContext.svelte";
  import { Toaster } from "@ui/components";
  import extend from "just-extend";
  import { MetaTags } from "svelte-meta-tags";
  import { SvelteKitTopLoader } from "sveltekit-top-loader";
  import "../app.css";

  let { data, children } = $props();
  let metaTags = $derived(
    extend(true, {}, data.baseMetaTags, page.data.pageMetaTags),
  );
  setThemeState(undefined);
</script>

<SvelteKitTopLoader color="var(--colors-primary)" />
<div class="font-sans">
  <GradientBackgroundWrapper>
    {@render children?.()}
  </GradientBackgroundWrapper>
</div>
<Toaster />
<InitialThemeSetter />
<MetaTags {...metaTags} />
<AnalyticsScript />
