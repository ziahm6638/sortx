<script lang="ts">
  import { onMount } from "svelte";

  const plausibleUrl = process.env.PUBLIC_PLAUSIBLE_URL as string;

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://plausible.io/js/script.js";
    script.defer = true;
    script.setAttribute("data-domain", plausibleUrl);
  });
</script>
