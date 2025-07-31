<script lang="ts">
  import { onMount } from "svelte";

  const umamiTrackingId = process.env.PUBLIC_UMAMI_TRACKING_ID as string;

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://analytics.eu.umami.is/script.js";
    script.async = true;
    script.setAttribute("data-website-id", umamiTrackingId);
  });
</script>
