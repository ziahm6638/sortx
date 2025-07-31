<script lang="ts">
  import { dev } from "$app/environment";
  // @ts-expect-error package is not installed per default
  import { inject } from "@vercel/analytics";
  import { onMount } from "svelte";

  onMount(() => {
    inject({
      mode: dev ? "development" : "production",
    });
  });
</script>
