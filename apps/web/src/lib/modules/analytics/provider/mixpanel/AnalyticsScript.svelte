<script lang="ts">
  // @ts-expect-error package is not installed per default
  import mixpanel from "mixpanel-browser";
  import { onMount } from "svelte";

  const mixpanelToken = process.env.PUBLIC_MIXPANEL_TOKEN as string;

  onMount(() => {
    mixpanel.init(mixpanelToken, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  });
</script>
